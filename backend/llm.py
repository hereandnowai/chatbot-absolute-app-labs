"""
LangChain integration with Google Gemini 2.0 Flash-Lite
CRITICAL: This module MUST use Gemini 2.0 Flash-Lite model ONLY
"""
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.schema import HumanMessage, AIMessage, SystemMessage
from typing import List, Dict, Tuple
from config import GOOGLE_API_KEY, MAX_HISTORY_LENGTH
from search import google_search, format_search_context

# Initialize Gemini 2.0 Flash-Lite model
# MANDATORY: Must use gemini-2.0-flash-lite model
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash-lite",
    google_api_key=GOOGLE_API_KEY,
    temperature=0.7,
    max_output_tokens=1024,
)

# System prompt for the chatbot
SYSTEM_PROMPT = """You are an intelligent AI assistant for Absolute App Labs, a leading AI-powered product development company in Chennai, India.

Company Overview:
- Absolute App Labs specializes in custom mobile & web app development, AI-powered solutions, GIS platforms, and predictive battery management systems
- Founded in 2020 with 6+ years of experience
- 50+ expert developers
- 10M+ active users on built applications
- Based in Chennai, Tamil Nadu, India
- Services include: Mobile App Development, Web Applications, AI Integration, Cloud & DevOps, Product Modernization

Your Role:
- Provide helpful, accurate information about Absolute App Labs services and capabilities
- Answer technical questions about software development
- Guide users on how to engage with the company
- Be professional, friendly, and knowledgeable
- When web search results are provided, cite sources appropriately
- If you don't know something, admit it rather than making up information

Contact Information:
- Website: https://www.absoluteapplabs.com
- Phone: +91-044 4596 7630
- Address: AJ Block 4th Street, 35, 9th Main Rd, A J Block, Shanthi Colony, Anna Nagar, Chennai, Tamil Nadu 600040, India
"""

def create_chat_prompt(
    user_message: str,
    chat_history: List[Dict[str, str]],
    search_context: str = ""
) -> List:
    """
    Create a prompt for the LLM with context
    
    Args:
        user_message: Current user message
        chat_history: List of previous messages
        search_context: Optional web search context
    
    Returns:
        List of messages for the LLM
    """
    messages = [SystemMessage(content=SYSTEM_PROMPT)]
    
    # Add search context if available
    if search_context:
        context_message = f"\n\n{search_context}\n\nPlease use these search results to provide accurate, up-to-date information and cite sources when relevant."
        messages.append(SystemMessage(content=context_message))
    
    # Add chat history (last N messages)
    for msg in chat_history[-MAX_HISTORY_LENGTH:]:
        if msg["role"] == "user":
            messages.append(HumanMessage(content=msg["content"]))
        elif msg["role"] == "assistant":
            messages.append(AIMessage(content=msg["content"]))
    
    # Add current user message
    messages.append(HumanMessage(content=user_message))
    
    return messages

async def generate_response(
    user_message: str,
    chat_history: List[Dict[str, str]],
    enable_search: bool = True
) -> Tuple[str, List[Dict[str, str]]]:
    """
    Generate a response using Gemini 2.0 Flash-Lite
    
    Args:
        user_message: User's message
        chat_history: Previous conversation history
        enable_search: Whether to perform web search for augmentation
    
    Returns:
        Tuple of (response_text, sources)
    """
    sources = []
    search_context = ""
    
    # Perform web search if enabled and query seems to need external info
    if enable_search and should_search(user_message):
        search_results = google_search(user_message, num_results=3)
        if search_results:
            search_context = format_search_context(search_results)
            sources = search_results
    
    # Create prompt with context
    messages = create_chat_prompt(user_message, chat_history, search_context)
    
    # Generate response using Gemini 2.0 Flash-Lite
    try:
        response = await llm.ainvoke(messages)
        response_text = response.content
        return response_text, sources
    except Exception as e:
        print(f"Error generating response: {e}")
        return "I apologize, but I encountered an error processing your request. Please try again.", []

def should_search(message: str) -> bool:
    """
    Determine if a message should trigger a web search
    
    Args:
        message: User message
    
    Returns:
        Boolean indicating if search should be performed
    """
    # Keywords that might indicate need for external search
    search_keywords = [
        "latest", "recent", "news", "update", "current",
        "2024", "2025", "today", "now",
        "price", "cost", "compare", "vs", "versus",
        "best", "top", "trending"
    ]
    
    message_lower = message.lower()
    return any(keyword in message_lower for keyword in search_keywords)
