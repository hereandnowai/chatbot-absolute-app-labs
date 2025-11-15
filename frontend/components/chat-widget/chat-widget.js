/**
 * Chat Widget JavaScript - Absolute App Labs
 * Connects to FastAPI backend powered by Gemini 2.0 Flash-Lite
 */

class ChatWidget {
    constructor(config = {}) {
        this.config = {
            apiUrl: config.apiUrl || 'http://localhost:8000',
            position: config.position || 'bottom-right',
            welcomeMessage: config.welcomeMessage || 'Hi! How can I help you today?',
            quickQuestions: config.quickQuestions || [
                'What services does Absolute App Labs offer?',
                'Tell me about your AI capabilities',
                'How can I get started with a project?'
            ],
            ...config
        };
        
        this.sessionId = this.getOrCreateSession();
        this.isOpen = false;
        this.isTyping = false;
        
        this.init();
    }
    
    init() {
        this.injectStyles();
        this.createWidget();
        this.attachEventListeners();
    }
    
    injectStyles() {
        if (document.getElementById('chat-widget-styles')) return;
        
        const link = document.createElement('link');
        link.id = 'chat-widget-styles';
        link.rel = 'stylesheet';
        link.href = '/components/chat-widget/chat-widget.css';
        document.head.appendChild(link);
        
        // Inject Google Fonts
        if (!document.getElementById('chat-widget-fonts')) {
            const fontLink = document.createElement('link');
            fontLink.id = 'chat-widget-fonts';
            fontLink.rel = 'stylesheet';
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap';
            document.head.appendChild(fontLink);
        }
    }
    
    createWidget() {
        const container = document.createElement('div');
        container.className = 'chat-widget-container';
        container.innerHTML = `
            <button class="chat-widget-button" aria-label="Open chat" aria-expanded="false">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                </svg>
            </button>
            
            <div class="chat-window" role="dialog" aria-label="Chat window">
                <div class="chat-header">
                    <div class="chat-header-content">
                        <div class="chat-header-avatar">AI</div>
                        <div class="chat-header-info">
                            <h3>Absolute App Labs</h3>
                            <p>AI Assistant • Online</p>
                        </div>
                    </div>
                    <div class="chat-header-actions">
                        <button class="chat-header-btn chat-reset-btn" aria-label="Reset conversation" title="Reset conversation">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                            </svg>
                        </button>
                        <button class="chat-header-btn chat-minimize-btn" aria-label="Minimize chat" title="Minimize">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 13H5v-2h14v2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="chat-messages" role="log" aria-live="polite" aria-atomic="false">
                    ${this.createWelcomeMessage()}
                </div>
                
                <div class="chat-input-container">
                    <div class="chat-input-wrapper">
                        <textarea 
                            class="chat-input" 
                            placeholder="Type your message..." 
                            aria-label="Chat message input"
                            rows="1"
                        ></textarea>
                        <button class="chat-send-btn" aria-label="Send message" disabled>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(container);
        this.container = container;
        this.button = container.querySelector('.chat-widget-button');
        this.window = container.querySelector('.chat-window');
        this.messages = container.querySelector('.chat-messages');
        this.input = container.querySelector('.chat-input');
        this.sendBtn = container.querySelector('.chat-send-btn');
    }
    
    createWelcomeMessage() {
        return `
            <div class="chat-welcome">
                <div class="chat-welcome-icon">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                </div>
                <h4>Welcome to Absolute App Labs!</h4>
                <p>${this.config.welcomeMessage}</p>
                <div class="chat-quick-questions">
                    ${this.config.quickQuestions.map(q => `
                        <button class="quick-question-btn" data-question="${this.escapeHtml(q)}">
                            ${this.escapeHtml(q)}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    attachEventListeners() {
        // Toggle chat window
        this.button.addEventListener('click', () => this.toggle());
        
        // Minimize button
        this.window.querySelector('.chat-minimize-btn').addEventListener('click', () => this.close());
        
        // Reset conversation
        this.window.querySelector('.chat-reset-btn').addEventListener('click', () => this.resetConversation());
        
        // Quick questions
        this.messages.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-question-btn')) {
                const question = e.target.dataset.question;
                this.sendMessage(question);
            }
        });
        
        // Input handling
        this.input.addEventListener('input', () => {
            this.autoResize();
            this.sendBtn.disabled = !this.input.value.trim();
        });
        
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (this.input.value.trim()) {
                    this.sendMessage(this.input.value);
                }
            }
        });
        
        // Send button
        this.sendBtn.addEventListener('click', () => {
            if (this.input.value.trim()) {
                this.sendMessage(this.input.value);
            }
        });
    }
    
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    open() {
        this.isOpen = true;
        this.window.classList.add('active');
        this.button.classList.add('active');
        this.button.setAttribute('aria-expanded', 'true');
        this.input.focus();
    }
    
    close() {
        this.isOpen = false;
        this.window.classList.remove('active');
        this.button.classList.remove('active');
        this.button.setAttribute('aria-expanded', 'false');
    }
    
    async sendMessage(message) {
        if (!message.trim() || this.isTyping) return;
        
        // Clear welcome message if present
        const welcome = this.messages.querySelector('.chat-welcome');
        if (welcome) welcome.remove();
        
        // Add user message
        this.addMessage(message, 'user');
        
        // Clear input
        this.input.value = '';
        this.input.style.height = 'auto';
        this.sendBtn.disabled = true;
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            const response = await fetch(`${this.config.apiUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session_id: this.sessionId,
                    message: message
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Update session ID
            this.sessionId = data.session_id;
            this.saveSession(data.session_id);
            
            // Hide typing indicator
            this.hideTypingIndicator();
            
            // Add bot response
            this.addMessage(data.reply, 'bot', data.sources);
            
        } catch (error) {
            console.error('Error sending message:', error);
            this.hideTypingIndicator();
            this.addMessage(
                'Sorry, I encountered an error. Please try again later.',
                'bot'
            );
        }
    }
    
    addMessage(text, role, sources = []) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${role}`;
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.textContent = text;
        
        messageDiv.appendChild(bubble);
        
        // Add sources if available
        if (sources && sources.length > 0) {
            const sourcesDiv = document.createElement('div');
            sourcesDiv.className = 'message-sources';
            sources.forEach(source => {
                const link = document.createElement('a');
                link.className = 'source-link';
                link.href = source.link;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.innerHTML = `
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                    </svg>
                    <span>${this.escapeHtml(source.title)}</span>
                `;
                sourcesDiv.appendChild(link);
            });
            messageDiv.appendChild(sourcesDiv);
        }
        
        // Add feedback for bot messages
        if (role === 'bot') {
            const feedback = document.createElement('div');
            feedback.className = 'message-feedback';
            feedback.innerHTML = `
                <button class="feedback-btn" data-feedback="positive" aria-label="Helpful response">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                    </svg>
                </button>
                <button class="feedback-btn" data-feedback="negative" aria-label="Not helpful response">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>
                    </svg>
                </button>
            `;
            
            // Attach feedback event listeners
            feedback.querySelectorAll('.feedback-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const feedbackType = e.currentTarget.dataset.feedback;
                    this.submitFeedback(feedbackType, text);
                    e.currentTarget.classList.add('active');
                    // Disable other button
                    feedback.querySelectorAll('.feedback-btn').forEach(b => {
                        if (b !== e.currentTarget) b.disabled = true;
                    });
                });
            });
            
            messageDiv.appendChild(feedback);
        }
        
        // Add timestamp
        const timestamp = document.createElement('div');
        timestamp.className = 'message-timestamp';
        timestamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        messageDiv.appendChild(timestamp);
        
        this.messages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    showTypingIndicator() {
        this.isTyping = true;
        const indicator = document.createElement('div');
        indicator.className = 'chat-message bot typing-indicator-container';
        indicator.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        this.messages.appendChild(indicator);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        this.isTyping = false;
        const indicator = this.messages.querySelector('.typing-indicator-container');
        if (indicator) indicator.remove();
    }
    
    async resetConversation() {
        if (!confirm('Are you sure you want to reset the conversation?')) return;
        
        try {
            await fetch(`${this.config.apiUrl}/api/session/${this.sessionId}`, {
                method: 'DELETE'
            });
            
            // Clear session and create new
            this.sessionId = this.createNewSession();
            
            // Clear messages
            this.messages.innerHTML = this.createWelcomeMessage();
            
        } catch (error) {
            console.error('Error resetting conversation:', error);
        }
    }
    
    submitFeedback(type, message) {
        console.log(`Feedback: ${type} for message: "${message}"`);
        // Could send to analytics endpoint
    }
    
    autoResize() {
        this.input.style.height = 'auto';
        this.input.style.height = Math.min(this.input.scrollHeight, 120) + 'px';
    }
    
    scrollToBottom() {
        this.messages.scrollTop = this.messages.scrollHeight;
    }
    
    getOrCreateSession() {
        let sessionId = localStorage.getItem('chat_session_id');
        if (!sessionId) {
            sessionId = this.createNewSession();
        }
        return sessionId;
    }
    
    createNewSession() {
        const sessionId = this.generateUUID();
        this.saveSession(sessionId);
        return sessionId;
    }
    
    saveSession(sessionId) {
        localStorage.setItem('chat_session_id', sessionId);
    }
    
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// Auto-initialize if config is provided
if (window.chatWidgetConfig) {
    document.addEventListener('DOMContentLoaded', () => {
        new ChatWidget(window.chatWidgetConfig);
    });
}

// Export for manual initialization
window.ChatWidget = ChatWidget;
