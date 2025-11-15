# Contributing to Absolute App Labs Chat Widget

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

---

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inspiring community for everyone. We expect all participants to:

- Be respectful and inclusive
- Exercise empathy and kindness
- Give and receive constructive feedback gracefully
- Focus on what is best for the community
- Show courtesy and respect towards others

### Unacceptable Behavior
- Harassment, discrimination, or personal attacks
- Trolling, insulting comments, or inflammatory language
- Publishing others' private information
- Any conduct that could reasonably be considered inappropriate

---

## Getting Started

### Prerequisites
- Familiarity with Python, FastAPI, and JavaScript
- Understanding of REST APIs
- Basic knowledge of AI/LLM concepts
- Git and GitHub workflow experience

### First-Time Contributors
If you're new to open source:
1. Read the [README.md](README.md) thoroughly
2. Set up the development environment
3. Look for issues labeled `good first issue`
4. Ask questions! We're here to help

---

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub first
git clone https://github.com/YOUR-USERNAME/absolute-app-labs.git
cd absolute-app-labs
```

### 2. Set Up Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
pip install pytest black flake8  # Development dependencies
```

### 3. Set Up Environment

```bash
cp .env.example .env
# Edit .env with your API keys
```

### 4. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
python3 -m http.server 3000
```

### 5. Verify Setup

- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Frontend: http://localhost:3000

---

## How to Contribute

### Types of Contributions

We welcome:
- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- ♿ Accessibility improvements
- 🌐 Internationalization
- 🧪 Test coverage
- ⚡ Performance optimizations

### Contribution Workflow

1. **Check Existing Issues**
   - Search for existing issues
   - Comment on an issue to claim it
   - Ask for clarification if needed

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

3. **Make Changes**
   - Write clean, documented code
   - Follow coding standards (see below)
   - Test your changes thoroughly

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature" # Follow commit conventions
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub

---

## Coding Standards

### Python (Backend)

**Style Guide:**
- Follow PEP 8
- Use type hints
- Maximum line length: 100 characters
- Use docstrings for functions and classes

**Example:**
```python
from typing import List, Dict

def process_message(message: str, history: List[Dict[str, str]]) -> str:
    """
    Process a user message and return a response.
    
    Args:
        message: The user's input message
        history: List of previous conversation messages
        
    Returns:
        The generated response string
        
    Raises:
        ValueError: If message is empty
    """
    if not message.strip():
        raise ValueError("Message cannot be empty")
    
    # Implementation here
    return response
```

**Code Formatting:**
```bash
# Format code with Black
black backend/*.py

# Check with flake8
flake8 backend/*.py --max-line-length=100
```

### JavaScript (Frontend)

**Style Guide:**
- Use ES6+ features
- Prefer `const` over `let`, avoid `var`
- Use meaningful variable names
- Add JSDoc comments for functions
- Maximum line length: 100 characters

**Example:**
```javascript
/**
 * Send a message to the chat API
 * @param {string} message - The message to send
 * @param {string} sessionId - The session identifier
 * @returns {Promise<Object>} The API response
 */
async function sendMessage(message, sessionId) {
    if (!message.trim()) {
        throw new Error('Message cannot be empty');
    }
    
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, session_id: sessionId })
    });
    
    return response.json();
}
```

### CSS

**Style Guide:**
- Use CSS custom properties (variables)
- Follow BEM naming convention
- Mobile-first approach
- Organize by component

**Example:**
```css
/* Component: Chat Message */
.chat-message {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--spacing-md);
}

.chat-message__bubble {
    padding: var(--spacing-sm);
    border-radius: var(--border-radius-md);
    background: var(--color-gray-100);
}

.chat-message--user .chat-message__bubble {
    background: var(--color-primary);
    color: var(--color-white);
}
```

### Git Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

**Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(chat): add voice input support
fix(backend): resolve session timeout issue
docs(readme): update installation instructions
style(widget): improve button hover effects
refactor(api): simplify error handling
test(llm): add unit tests for prompt generation
chore(deps): update LangChain to v0.1.1
```

---

## Testing Guidelines

### Backend Tests

**Unit Tests:**
```python
# backend/tests/test_llm.py
import pytest
from llm import generate_response

@pytest.mark.asyncio
async def test_generate_response():
    """Test basic response generation"""
    response, sources = await generate_response(
        "What services do you offer?",
        [],
        enable_search=False
    )
    
    assert isinstance(response, str)
    assert len(response) > 0
```

**Run Tests:**
```bash
cd backend
pytest
pytest --cov=. --cov-report=html  # With coverage
```

### Frontend Tests

**Manual Testing Checklist:**
- [ ] Chat opens/closes smoothly
- [ ] Messages send correctly
- [ ] Typing indicator appears
- [ ] Sources display properly
- [ ] Feedback buttons work
- [ ] Session persists on reload
- [ ] Mobile responsive
- [ ] Keyboard navigation
- [ ] Screen reader compatible

### Integration Tests

Test the full flow:
1. Open chat widget
2. Send a message
3. Receive response
4. Click source link
5. Submit feedback
6. Reset conversation

---

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Tested on multiple browsers (if frontend)
- [ ] Commit messages follow convention
- [ ] Branch is up to date with main

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe testing done

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### Review Process

1. Automated checks run (linting, tests)
2. Code review by maintainer
3. Requested changes (if any)
4. Approval and merge

**Review Timeline:**
- Simple fixes: 1-2 days
- Features: 3-7 days
- Major changes: 1-2 weeks

---

## Issue Reporting

### Bug Reports

Use the bug report template:

**Title:** Clear, concise description

**Description:**
```markdown
## Bug Description
What happened vs what should happen

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., macOS 13.0]
- Browser: [e.g., Chrome 120]
- Backend Version: [e.g., 1.0.0]

## Screenshots
If applicable

## Additional Context
Any other relevant information
```

### Feature Requests

**Title:** Clear feature name

**Description:**
```markdown
## Feature Description
What feature do you want?

## Use Case
Why is this feature needed?

## Proposed Solution
How should it work?

## Alternatives Considered
Other approaches considered

## Additional Context
Mock-ups, examples, etc.
```

---

## Development Tips

### Debugging Backend

```python
# Add logging
import logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

logger.debug(f"Processing message: {message}")
```

### Debugging Frontend

```javascript
// Use console methods
console.log('Message sent:', message);
console.error('Error occurred:', error);
console.table(messages);  // For arrays/objects
```

### Testing API Endpoints

```bash
# Using curl
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "session_id": "test-123"}'

# Using httpie
http POST localhost:8000/api/chat message="Hello" session_id="test-123"
```

---

## Questions?

- Open a GitHub issue with the `question` label
- Check existing documentation
- Review closed issues for similar questions

---

## Recognition

Contributors will be:
- Listed in CHANGELOG.md
- Recognized in release notes
- Added to CONTRIBUTORS file (coming soon)

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for contributing!** 🎉

Every contribution, no matter how small, makes this project better.
