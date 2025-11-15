"""
FastAPI backend for Absolute App Labs chat widget
Powered by Google Gemini 2.0 Flash-Lite with LangChain
"""
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Verify required environment variables
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY must be set in .env file")

# Configuration
API_HOST = os.getenv("API_HOST", "0.0.0.0")
API_PORT = int(os.getenv("API_PORT", "8000"))
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./chat_sessions.db")
GOOGLE_CSE_ID = os.getenv("GOOGLE_CSE_ID", "")
SESSION_TIMEOUT = int(os.getenv("SESSION_TIMEOUT", "3600"))
MAX_HISTORY_LENGTH = int(os.getenv("MAX_HISTORY_LENGTH", "6"))
RATE_LIMIT_PER_MINUTE = int(os.getenv("RATE_LIMIT_PER_MINUTE", "10"))
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:8000").split(",")
