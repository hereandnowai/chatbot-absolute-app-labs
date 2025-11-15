# Absolute App Labs - Website Clone with AI Chat Widget

> Complete local clone of `https://absoluteapplabs.com` with an integrated production-ready chat widget powered by Google Gemini 2.0 Flash-Lite via LangChain.

## 🚀 Project Overview

This project provides:
- ✅ Complete clone of the Absolute App Labs website (HTML, CSS, JS, assets)
- ✅ Production-grade AI chatbot powered by **Gemini 2.0 Flash-Lite** (mandatory model)
- ✅ FastAPI backend with LangChain integration
- ✅ Google Custom Search API integration for enhanced responses
- ✅ Beautiful, responsive chat UI matching the site's design
- ✅ Session management with SQLite
- ✅ Rate limiting and security features

## 📁 Project Structure

```
absolute-app-labs/
├── frontend/                    # Static website files
│   ├── index.html              # Main homepage
│   ├── wp-content/             # WordPress theme assets (CSS, JS, images)
│   ├── wp-includes/            # WordPress core assets
│   ├── components/
│   │   └── chat-widget/        # Chat widget component
│   │       ├── chat-widget.css
│   │       ├── chat-widget.js
│   │       └── example-integration.html
│   └── style-guide.md          # Design tokens and guidelines
│
├── backend/                     # Python FastAPI backend
│   ├── main.py                 # FastAPI application
│   ├── config.py               # Configuration management
│   ├── database.py             # SQLAlchemy models
│   ├── llm.py                  # LangChain + Gemini integration
│   ├── search.py               # Google Custom Search integration
│   └── requirements.txt        # Python dependencies
│
├── scraped/                     # Original scraped content (read-only)
│   ├── original/               # Raw mirror of absoluteapplabs.com
│   └── download_assets.py      # Asset download script
│
├── config/                      # Configuration templates
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🛠️ Setup Instructions

### Prerequisites

- Python 3.9 or higher
- pip (Python package manager)
- Google API Key with access to Gemini 2.0 Flash-Lite
- (Optional) Google Custom Search Engine ID for web search augmentation

### 1. Clone and Navigate

```bash
cd absolute-app-labs
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
GOOGLE_API_KEY=your-google-api-key-here
GOOGLE_CSE_ID=your-custom-search-engine-id-here  # Optional
```

**Important**: Never commit `.env` to version control. It's already in `.gitignore`.

### 3. Set Up Python Backend

Create a virtual environment:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### 4. Run the Backend Server

```bash
python main.py
```

The API will be available at `http://localhost:8000`

API Documentation: `http://localhost:8000/docs`

### 5. Run the Frontend

You can use any static file server. Here are a few options:

**Option A: Python HTTP Server**
```bash
cd frontend
python3 -m http.server 3000
```

**Option B: Node.js http-server**
```bash
cd frontend
npx http-server -p 3000
```

**Option C: VS Code Live Server**
- Install the "Live Server" extension
- Right-click `index.html` and select "Open with Live Server"

Visit: `http://localhost:3000`

## 🎨 Chat Widget Integration

### Quick Start

Add these lines before the closing `</body>` tag in your HTML:

```html
<!-- Chat Widget CSS -->
<link rel="stylesheet" href="/components/chat-widget/chat-widget.css">

<!-- Chat Widget Configuration -->
<script>
    window.chatWidgetConfig = {
        apiUrl: 'http://localhost:8000',
        welcomeMessage: 'Hi! How can I help you today?',
        quickQuestions: [
            'What services does Absolute App Labs offer?',
            'Tell me about your AI capabilities',
            'How can I get started?'
        ]
    };
</script>

<!-- Chat Widget JavaScript -->
<script src="/components/chat-widget/chat-widget.js"></script>
```

### Manual Initialization

```javascript
document.addEventListener('DOMContentLoaded', function() {
    new ChatWidget({
        apiUrl: 'http://localhost:8000',
        welcomeMessage: 'Custom welcome message',
        quickQuestions: ['Question 1', 'Question 2']
    });
});
```

## 🔐 Security Best Practices

### Environment Variables
- **Never** commit `.env` files to Git
- **Never** expose `GOOGLE_API_KEY` in client-side code
- All API calls must go through the backend server
- The backend handles authentication and API key management

### Rate Limiting
- Default: 10 requests per minute per IP
- Configurable in `.env` via `RATE_LIMIT_PER_MINUTE`

### CORS Configuration
- Configure allowed origins in `.env` via `CORS_ORIGINS`
- Default: `http://localhost:3000,http://localhost:8000`

## 📡 API Endpoints

### POST `/api/chat`
Send a message to the chatbot.

**Request:**
```json
{
    "session_id": "optional-session-id",
    "message": "What services do you offer?"
}
```

**Response:**
```json
{
    "reply": "We offer mobile app development, web applications...",
    "sources": [
        {
            "title": "Source Title",
            "snippet": "Relevant excerpt",
            "link": "https://example.com"
        }
    ],
    "session_id": "unique-session-id"
}
```

### GET `/api/session/{session_id}`
Retrieve session information.

**Response:**
```json
{
    "session_id": "session-id",
    "created_at": "2025-11-15T10:00:00",
    "message_count": 5
}
```

### DELETE `/api/session/{session_id}`
Delete a session and all its messages.

**Response:**
```json
{
    "message": "Session reset successfully"
}
```

## 🤖 AI Model Configuration

**Critical**: This project uses **Google Gemini 2.0 Flash-Lite** exclusively.

The model is configured in `backend/llm.py`:

```python
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash-lite",
    google_api_key=GOOGLE_API_KEY,
    temperature=0.7,
    max_output_tokens=1024,
)
```

### Google Custom Search Integration

When enabled (with `GOOGLE_CSE_ID` set), the chatbot:
1. Analyzes user queries to determine if web search is needed
2. Fetches top 3 relevant results from Google
3. Passes curated context to Gemini
4. Returns responses with source citations

## 🎨 Customization

### Design Tokens

All design tokens are documented in `frontend/style-guide.md`:
- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Button styles

### Customize Chat Widget Appearance

Edit `frontend/components/chat-widget/chat-widget.css`:

```css
:root {
    --chat-primary-blue: #274DA1;     /* Primary brand color */
    --chat-light-blue: #74D0F1;       /* Accent color */
    --chat-dark-text: #3D3C45;        /* Text color */
    /* ... more variables ... */
}
```

### Customize Bot Personality

Edit the system prompt in `backend/llm.py`:

```python
SYSTEM_PROMPT = """You are an intelligent AI assistant for...
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest
```

### Manual Testing Checklist

- [ ] Chat widget opens and closes smoothly
- [ ] Messages send and display correctly
- [ ] Typing indicator appears
- [ ] Sources display when available
- [ ] Feedback buttons work
- [ ] Session persists across page reloads
- [ ] Reset conversation works
- [ ] Mobile responsive
- [ ] Keyboard navigation works
- [ ] Screen reader accessible

## 📦 Deployment

See [deploy.md](deploy.md) for detailed deployment instructions.

### Quick Deployment Tips

**Frontend:**
- Deploy to: Netlify, Vercel, GitHub Pages, AWS S3, or any static host
- Update `apiUrl` in chat widget config to point to production backend

**Backend:**
- Deploy to: Railway, Render, Heroku, AWS Lambda, or any Python hosting
- Set environment variables in hosting platform
- Enable HTTPS
- Configure CORS for production domain

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## 📄 License

This project is for demonstration purposes. The cloned website content belongs to Absolute App Labs.

## 🆘 Troubleshooting

### Backend won't start
```bash
# Check if environment variables are set
cat .env

# Verify Python version
python --version  # Should be 3.9+

# Reinstall dependencies
pip install -r backend/requirements.txt
```

### Chat widget not appearing
- Check browser console for errors
- Verify CSS and JS files are loading
- Ensure backend is running
- Check CORS configuration

### API errors
- Verify `GOOGLE_API_KEY` is set correctly
- Check API quota limits
- Review backend logs for detailed errors

### Database errors
- Delete `chat_sessions.db` and restart backend
- Check file permissions

## 📞 Support

For issues with the chat integration:
1. Check the troubleshooting section above
2. Review API documentation at `http://localhost:8000/docs`
3. Check backend logs for error messages

For Absolute App Labs services:
- Website: https://www.absoluteapplabs.com
- Email: contact@absoluteapplabs.com
- Phone: +91-044 4596 7630

---

**Built with ❤️ using:**
- Google Gemini 2.0 Flash-Lite
- LangChain
- FastAPI
- SQLAlchemy
- Vanilla JavaScript
- Modern CSS

**Last Updated:** November 2025
