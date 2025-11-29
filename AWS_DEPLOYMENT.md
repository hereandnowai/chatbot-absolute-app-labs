# AWS Deployment Guide for Absolute App Labs Chatbot

## Prerequisites
- AWS EC2 instance with Ubuntu
- Python 3.11+ installed
- Port 8000 open in security group (for backend API)
- Port 80/443 open (for frontend)

## Deployment Steps

### 1. Clone/Pull Latest Code
```bash
cd ~/chatbot-absolute-app-labs
git pull origin main
```

### 2. Set Up Python Virtual Environment
```bash
# Create venv with Python 3.11 (or 3.9/3.10)
python3.11 -m venv venv

# Activate venv
source venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt
```

### 3. Configure Environment Variables
Create `.env` file in the root directory:
```bash
nano .env
```

Add the following:
```env
GOOGLE_API_KEY=your_google_api_key_here
HUBSPOT_API_KEY=your_hubspot_api_key_here  # Optional
CORS_ORIGINS=*
API_HOST=0.0.0.0
API_PORT=8000
```

### 4. Start the Backend Server
```bash
# Option 1: Direct run (for testing)
source venv/bin/activate
cd backend
python main.py

# Option 2: Run in background with nohup
nohup python backend/main.py > backend.log 2>&1 &

# Option 3: Use systemd service (recommended for production)
# See systemd section below
```

### 5. Serve the Frontend

#### Option A: Using Python HTTP Server (Simple)
```bash
cd frontend
python3 -m http.server 80  # Requires sudo for port 80
# or
sudo python3 -m http.server 80
```

#### Option B: Using Nginx (Recommended)
```bash
# Install nginx
sudo apt update && sudo apt install nginx -y

# Create nginx config
sudo nano /etc/nginx/sites-available/absoluteapplabs
```

Add:
```nginx
server {
    listen 80;
    server_name 43.204.18.67;  # Replace with your IP or domain
    
    # Frontend
    root /home/ubuntu/chatbot-absolute-app-labs/frontend;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API Proxy to backend
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/absoluteapplabs /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 6. Create Systemd Service for Backend (Production)
```bash
sudo nano /etc/systemd/system/chatbot-backend.service
```

Add:
```ini
[Unit]
Description=Absolute App Labs Chatbot Backend
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/chatbot-absolute-app-labs
Environment="PATH=/home/ubuntu/chatbot-absolute-app-labs/venv/bin"
ExecStart=/home/ubuntu/chatbot-absolute-app-labs/venv/bin/python backend/main.py
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable chatbot-backend
sudo systemctl start chatbot-backend
sudo systemctl status chatbot-backend
```

## Troubleshooting

### Check if backend is running
```bash
curl http://localhost:8000/
# Should return: {"message":"Absolute App Labs Chat API","version":"1.0"}
```

### Check backend logs
```bash
# If using systemd
sudo journalctl -u chatbot-backend -f

# If using nohup
tail -f backend.log
```

### Port already in use
```bash
# Find process using port 8000
sudo lsof -i :8000
# Kill it
sudo kill -9 <PID>
```

### CORS Issues
If you see CORS errors in browser console:
1. Add your domain/IP to CORS_ORIGINS in `.env`
2. Restart the backend

### Frontend assets not loading
1. Check nginx error logs: `sudo tail -f /var/log/nginx/error.log`
2. Verify file permissions: `sudo chown -R ubuntu:ubuntu /home/ubuntu/chatbot-absolute-app-labs`

## Architecture

```
Browser → Port 80/443 (Nginx)
            ├── /            → frontend/index.html (static files)
            └── /api/*       → Port 8000 (FastAPI backend)
```

## Security Notes
- Keep `.env` file secure and never commit it to git
- Use HTTPS in production (Let's Encrypt)
- Restrict CORS_ORIGINS to your actual domain in production
