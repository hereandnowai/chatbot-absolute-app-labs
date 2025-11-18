"""
FastAPI backend for Absolute App Labs chatbot
Powered by Google Gemini 2.0 Flash
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
from conversation_state import ConversationState, ConversationStage
from lead_collector import LeadCollector

# Initialize FastAPI app
app = FastAPI(
    title="Absolute App Labs Chat API",
    description="AI-powered chat widget backend using Google Gemini 2.0 Flash",
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

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "absolute-app-labs-chatbot"}

# Request/Response models
class ChatRequest(BaseModel):
    session_id: Optional[str] = None
    message: str

class ChatResponse(BaseModel):
    text: str  # Changed from 'reply' to 'text' for consistency
    sources: List[Dict[str, str]] = []
    session_id: str
    quick_replies: List[Dict[str, str]] = []  # New: for product bubbles
    slots: Dict = {}  # New: conversation state
    actions: List[Dict] = []  # New: for HubSpot actions

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
        "model": "Google Gemini 2.0 Flash"
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
    Process a chat message with lead collection and return structured AI response
    
    Args:
        chat_request: Chat request with message and optional session_id
        db: Database session
    
    Returns:
        ChatResponse with text, sources, quick_replies, slots, actions, and session_id
    """
    try:
        # Get or create session
        session_id = chat_request.session_id
        session = None
        
        if not session_id:
            session_id = str(uuid.uuid4())
            # Create new session
            session = ChatSession(
                id=session_id,
                ip_address=get_remote_address(request),
                conversation_state="{}"  # Empty state for new session
            )
            db.add(session)
            db.commit()
        else:
            # Verify session exists, create if not found
            session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
            if not session:
                # Session doesn't exist (maybe expired or DB was reset)
                # Create a new session with the provided ID
                session = ChatSession(
                    id=session_id,
                    ip_address=get_remote_address(request),
                    conversation_state="{}"
                )
                db.add(session)
                db.commit()
        
        # Load conversation state
        state_data = json.loads(session.conversation_state or "{}")
        conv_state = ConversationState(state_data)
        
        # Initialize lead collector
        lead_collector = LeadCollector(conv_state)
        
        # Process message through lead collector first
        lead_response, quick_replies, actions = lead_collector.process_message(
            chat_request.message
        )
        
        # Get chat history for context
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
        
        sources = []
        
        # If lead collector returned a response, use it
        if lead_response:
            response_text = lead_response
        else:
            # Otherwise, use Gemini for general Q&A
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
        
        # Update session with new conversation state
        session.conversation_state = json.dumps(conv_state.to_dict())
        session.updated_at = datetime.utcnow()
        
        db.commit()
        
        return ChatResponse(
            text=response_text,
            sources=sources,
            session_id=session_id,
            quick_replies=quick_replies,
            slots=conv_state.to_dict(),
            actions=actions
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
