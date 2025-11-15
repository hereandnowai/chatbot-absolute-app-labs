"""
FastAPI backend for Absolute App Labs chatbot
Powered by Google Gemini 2.0 Flash-Lite
"""
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional, Dict
import uuid
import json
from datetime import datetime
from sqlalchemy.orm import Session
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from config import API_HOST, API_PORT, CORS_ORIGINS, RATE_LIMIT_PER_MINUTE
from database import init_db, get_db, ChatSession, ChatMessage
from llm import generate_response

# Initialize FastAPI app
app = FastAPI(
    title="Absolute App Labs Chat API",
    description="AI-powered chat widget backend using Gemini 2.0 Flash-Lite",
    version="1.0.0"
)

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
@app.on_event("startup")
async def startup_event():
    """Initialize database on startup"""
    init_db()
    print("Database initialized")
    print(f"Server starting on {API_HOST}:{API_PORT}")

# Request/Response models
class ChatRequest(BaseModel):
    session_id: Optional[str] = None
    message: str

class ChatResponse(BaseModel):
    reply: str
    sources: List[Dict[str, str]]
    session_id: str

class SessionInfo(BaseModel):
    session_id: str
    created_at: str
    message_count: int

# Health check endpoint
@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "ok",
        "service": "Absolute App Labs Chat API",
        "model": "Google Gemini 2.0 Flash-Lite"
    }

# Chat endpoint
@app.post("/api/chat", response_model=ChatResponse)
@limiter.limit(f"{RATE_LIMIT_PER_MINUTE}/minute")
async def chat(
    request: Request,
    chat_request: ChatRequest,
    db: Session = Depends(get_db)
):
    """
    Process a chat message and return AI response
    
    Args:
        chat_request: Chat request with message and optional session_id
        db: Database session
    
    Returns:
        ChatResponse with reply, sources, and session_id
    """
    try:
        # Get or create session
        session_id = chat_request.session_id
        if not session_id:
            session_id = str(uuid.uuid4())
            # Create new session
            new_session = ChatSession(
                id=session_id,
                ip_address=get_remote_address(request)
            )
            db.add(new_session)
            db.commit()
        else:
            # Verify session exists
            session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
            if not session:
                raise HTTPException(status_code=404, detail="Session not found")
        
        # Get chat history
        messages = db.query(ChatMessage).filter(
            ChatMessage.session_id == session_id
        ).order_by(ChatMessage.timestamp).all()
        
        chat_history = [
            {
                "role": msg.role,
                "content": msg.content
            }
            for msg in messages
        ]
        
        # Generate response using Gemini 2.0 Flash-Lite
        response_text, sources = await generate_response(
            chat_request.message,
            chat_history,
            enable_search=True
        )
        
        # Save user message
        user_message = ChatMessage(
            session_id=session_id,
            role="user",
            content=chat_request.message
        )
        db.add(user_message)
        
        # Save assistant response
        assistant_message = ChatMessage(
            session_id=session_id,
            role="assistant",
            content=response_text,
            sources=json.dumps(sources) if sources else None
        )
        db.add(assistant_message)
        
        # Update session timestamp
        session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
        session.updated_at = datetime.utcnow()
        
        db.commit()
        
        return ChatResponse(
            reply=response_text,
            sources=sources,
            session_id=session_id
        )
    
    except Exception as e:
        db.rollback()
        print(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Get session info
@app.get("/api/session/{session_id}", response_model=SessionInfo)
async def get_session(session_id: str, db: Session = Depends(get_db)):
    """
    Get session information
    
    Args:
        session_id: Session ID
        db: Database session
    
    Returns:
        Session information
    """
    session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    message_count = db.query(ChatMessage).filter(
        ChatMessage.session_id == session_id
    ).count()
    
    return SessionInfo(
        session_id=session.id,
        created_at=session.created_at.isoformat(),
        message_count=message_count
    )

# Reset session
@app.delete("/api/session/{session_id}")
async def reset_session(session_id: str, db: Session = Depends(get_db)):
    """
    Delete a session and all its messages
    
    Args:
        session_id: Session ID to delete
        db: Database session
    
    Returns:
        Success message
    """
    # Delete messages
    db.query(ChatMessage).filter(ChatMessage.session_id == session_id).delete()
    
    # Delete session
    db.query(ChatSession).filter(ChatSession.id == session_id).delete()
    
    db.commit()
    
    return {"message": "Session reset successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=API_HOST, port=API_PORT)
