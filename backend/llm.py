"""
Google Gemini AI integration for chatbot
Using google-generativeai SDK directly (no LangChain)
"""
import google.generativeai as genai
from typing import List, Dict, Tuple
from config import GOOGLE_API_KEY, MAX_HISTORY_LENGTH
from search import google_search, format_search_context

# Configure Gemini API
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize Gemini model with system instructions
model = genai.GenerativeModel(
    model_name='gemini-2.0-flash',
    generation_config={
        'temperature': 0.7,
        'top_p': 0.95,
        'top_k': 40,
        'max_output_tokens': 2048,
    },
    system_instruction="""You are an intelligent AI assistant for Absolute App Labs, a leading AI-powered product development company in Chennai, India.

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

def format_chat_history(chat_history: List[Dict[str, str]]) -> List[Dict[str, str]]:
    """
    Format chat history for Gemini API
    
    Args:
        chat_history: List of previous messages
    
    Returns:
        Formatted history for Gemini
    """
    formatted = []
    for msg in chat_history[-MAX_HISTORY_LENGTH:]:
        role = "user" if msg["role"] == "user" else "model"
        formatted.append({
            "role": role,
            "parts": [msg["content"]]
        })
    return formatted

async def generate_response(
    user_message: str,
    chat_history: List[Dict[str, str]],
    enable_search: bool = True
) -> Tuple[str, List[Dict[str, str]]]:
    """
    Generate a response using Google Gemini
    
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
    
    try:
        # Format history for Gemini
        formatted_history = format_chat_history(chat_history)
        
        # Prepare the message with optional search context
        enhanced_message = user_message
        if search_context:
            enhanced_message = f"{search_context}\n\nUser question: {user_message}"
        
        # If no history, generate directly; otherwise use chat
        if not formatted_history:
            response = model.generate_content(enhanced_message)
            response_text = response.text
        else:
            chat = model.start_chat(history=formatted_history)
            response = chat.send_message(enhanced_message)
            response_text = response.text
        
        return response_text, sources
    
    except Exception as e:
        # Print full traceback to aid debugging when the model call fails
        import traceback
        print(f"Error generating response: {e}")
        traceback.print_exc()
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
