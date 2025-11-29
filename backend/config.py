"""
Configuration for Absolute App Labs Chat Backend
Using Google Gemini API
"""
import os
from dotenv import load_dotenv

# Load environment variables from .env file in parent directory
env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
load_dotenv(env_path)

# Verify required environment variables
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY must be set in .env file")

print(f"✓ Loaded GOOGLE_API_KEY: {GOOGLE_API_KEY[:10]}...")

# Configuration
API_HOST = os.getenv("API_HOST", "0.0.0.0")
API_PORT = int(os.getenv("API_PORT", "8000"))
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./chat_sessions.db")
GOOGLE_CSE_ID = os.getenv("GOOGLE_CSE_ID", "")
HUBSPOT_API_KEY = os.getenv("HUBSPOT_API_KEY", "")
SESSION_TIMEOUT = int(os.getenv("SESSION_TIMEOUT", "3600"))
MAX_HISTORY_LENGTH = int(os.getenv("MAX_HISTORY_LENGTH", "6"))
RATE_LIMIT_PER_MINUTE = int(os.getenv("RATE_LIMIT_PER_MINUTE", "10"))

# CORS Origins - default includes localhost and allows * for development
# For production, set CORS_ORIGINS environment variable with specific domains
DEFAULT_CORS = "http://localhost:3000,http://localhost:8000,http://127.0.0.1:3000,http://127.0.0.1:8000,http://43.204.18.67,http://43.204.18.67:443,http://43.204.18.67:80"
CORS_ORIGINS = os.getenv("CORS_ORIGINS", DEFAULT_CORS).split(",")

# Add wildcard support - if "*" is in the list, allow all origins
if "*" in CORS_ORIGINS:
    CORS_ORIGINS = ["*"]

print(f"✓ Configuration loaded successfully")
print(f"  - API: {API_HOST}:{API_PORT}")
print(f"  - Database: {DATABASE_URL}")
print(f"  - CORS Origins: {CORS_ORIGINS}")
