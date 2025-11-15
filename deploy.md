# Deployment Guide - Absolute App Labs Chat Widget

This guide provides step-by-step instructions for deploying both the frontend (static site + chat widget) and backend (FastAPI + Gemini) to production.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [DNS & SSL Configuration](#dns--ssl-configuration)
- [Monitoring & Maintenance](#monitoring--maintenance)

---

## Prerequisites

### Required Accounts
- [ ] Google Cloud Account (for Gemini API)
- [ ] (Optional) Google Custom Search Engine configured
- [ ] Hosting provider account (choose one):
  - Backend: Railway, Render, Heroku, AWS, or GCP
  - Frontend: Netlify, Vercel, GitHub Pages, or AWS S3

### Required Tools
- Git
- Python 3.9+
- Node.js (optional, for frontend build tools)

---

## Environment Setup

### 1. Obtain Google API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Get API Key"
3. Create a new API key
4. **Important**: Restrict the key to only Gemini API
5. Note down your API key

### 2. (Optional) Set Up Google Custom Search

1. Go to [Google Custom Search](https://programmablesearchengine.google.com/)
2. Click "Add" to create a new search engine
3. Configure:
   - Search the entire web: ON
   - Image search: ON (optional)
4. Get your Search Engine ID (cx parameter)
5. Enable Custom Search API in [Google Cloud Console](https://console.cloud.google.com/)
6. Use the same API key or create a new one

### 3. Prepare Environment Variables

Create a production `.env` file with these values:

```env
# API Keys
GOOGLE_API_KEY=your-production-google-api-key
GOOGLE_CSE_ID=your-custom-search-engine-id

# Database (use PostgreSQL in production)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Server Configuration
API_HOST=0.0.0.0
API_PORT=8000

# CORS (update with your frontend domain)
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Session & Rate Limiting
SESSION_TIMEOUT=3600
MAX_HISTORY_LENGTH=6
RATE_LIMIT_PER_MINUTE=10
RATE_LIMIT_PER_HOUR=100
```

---

## Backend Deployment

### Option A: Deploy to Railway (Recommended)

**Step 1: Prepare for Deployment**

Create `railway.json` in backend directory:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn main:app --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

Create `Procfile`:
```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

**Step 2: Deploy**

1. Go to [Railway.app](https://railway.app/)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Click "Add variables" and add all environment variables from `.env`
6. Deploy will start automatically
7. Railway will provide a URL like `https://your-app.railway.app`

**Step 3: Upgrade Database** (Optional but recommended)

1. In Railway project, click "New" → "Database" → "Add PostgreSQL"
2. Copy the DATABASE_URL from the PostgreSQL service
3. Update your backend's DATABASE_URL environment variable

### Option B: Deploy to Render

**Step 1: Create `render.yaml`**

```yaml
services:
  - type: web
    name: absolute-chat-backend
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: PYTHON_VERSION
        value: 3.11.0
      - key: GOOGLE_API_KEY
        sync: false
      - key: GOOGLE_CSE_ID
        sync: false
      - key: DATABASE_URL
        fromDatabase:
          name: chat-db
          property: connectionString

databases:
  - name: chat-db
    databaseName: chatdb
    user: chatuser
```

**Step 2: Deploy**

1. Go to [Render.com](https://render.com/)
2. Sign in with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Set build command: `pip install -r backend/requirements.txt`
6. Set start command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
7. Add environment variables
8. Click "Create Web Service"

### Option C: Deploy to AWS Lambda + API Gateway

**Step 1: Install Mangum** (FastAPI adapter for AWS Lambda)

Add to `requirements.txt`:
```
mangum==0.17.0
```

**Step 2: Create Lambda Handler**

Create `backend/lambda_handler.py`:
```python
from mangum import Mangum
from main import app

handler = Mangum(app)
```

**Step 3: Package and Deploy**

```bash
cd backend
pip install -r requirements.txt -t ./package
cd package
zip -r ../deployment-package.zip .
cd ..
zip -g deployment-package.zip *.py
```

**Step 4: Create Lambda Function**

1. Go to AWS Lambda Console
2. Create function → Author from scratch
3. Runtime: Python 3.11
4. Upload deployment-package.zip
5. Set handler: `lambda_handler.handler`
6. Add environment variables
7. Create API Gateway trigger

---

## Frontend Deployment

### Option A: Deploy to Netlify (Recommended)

**Step 1: Create `netlify.toml`**

```toml
[build]
  publish = "frontend"
  command = "echo 'No build required'"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

**Step 2: Deploy**

1. Go to [Netlify.com](https://netlify.com/)
2. Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select repository
5. Build settings:
   - Build command: (leave empty)
   - Publish directory: `frontend`
6. Click "Deploy site"
7. Your site will be live at `https://your-site.netlify.app`

**Step 3: Update Chat Widget Configuration**

Edit `frontend/index.html` to update the API URL:

```html
<script>
    window.chatWidgetConfig = {
        apiUrl: 'https://your-backend.railway.app', // Your production backend URL
        // ... rest of config
    };
</script>
```

### Option B: Deploy to Vercel

**Step 1: Create `vercel.json`**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ]
}
```

**Step 2: Deploy**

```bash
npx vercel --prod
```

Or use Vercel dashboard:
1. Go to [Vercel.com](https://vercel.com/)
2. Import project from GitHub
3. Set root directory: `frontend`
4. Deploy

### Option C: Deploy to AWS S3 + CloudFront

**Step 1: Create S3 Bucket**

```bash
aws s3 mb s3://your-website-bucket
aws s3 sync frontend s3://your-website-bucket --acl public-read
```

**Step 2: Enable Static Website Hosting**

```bash
aws s3 website s3://your-website-bucket --index-document index.html
```

**Step 3: Create CloudFront Distribution** (for HTTPS)

1. Go to CloudFront Console
2. Create distribution
3. Origin: your S3 bucket
4. Enable HTTPS
5. Set default root object: `index.html`

---

## DNS & SSL Configuration

### 1. Custom Domain Setup

**For Netlify:**
1. Go to Site settings → Domain management
2. Add custom domain
3. Follow DNS configuration instructions

**For Railway:**
1. Go to Settings → Domains
2. Add custom domain
3. Add CNAME record:
   ```
   api.yourdomain.com → your-app.railway.app
   ```

### 2. SSL Certificates

- **Netlify/Vercel**: Automatic SSL via Let's Encrypt
- **Railway**: Automatic SSL
- **AWS**: Use ACM (AWS Certificate Manager)

### 3. Update CORS Configuration

Once your frontend domain is set, update backend environment:

```env
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

---

## Monitoring & Maintenance

### 1. Set Up Logging

**Backend Logging:**

Add to `backend/main.py`:
```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
```

**Production Log Services:**
- Railway: Built-in logs dashboard
- Render: Logs in dashboard
- AWS: CloudWatch Logs

### 2. Monitor API Usage

Track Gemini API usage:
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- APIs & Services → Gemini API
- View quotas and usage

### 3. Set Up Alerts

**For Railway:**
- Settings → Observability
- Add health check endpoint
- Configure notifications

**For AWS:**
- CloudWatch Alarms for Lambda errors
- SNS for notifications

### 4. Database Backups

**PostgreSQL on Railway:**
- Automatic daily backups
- Manual backup: Project Settings → Backups

**PostgreSQL on Render:**
- Automatic backups on paid plans
- Export manually for free tier

### 5. Performance Optimization

**Enable Caching:**
```python
# In backend/search.py - already implemented
from cachetools import TTLCache
search_cache = TTLCache(maxsize=100, ttl=1800)  # 30 min cache
```

**Enable CDN for Frontend:**
- Netlify/Vercel: Automatic CDN
- AWS: CloudFront

---

## Security Checklist

- [ ] HTTPS enabled on all domains
- [ ] API keys stored in environment variables (never in code)
- [ ] CORS configured with specific origins
- [ ] Rate limiting enabled
- [ ] Database uses SSL connection
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (using SQLAlchemy ORM)
- [ ] XSS prevention in chat widget
- [ ] Regular dependency updates

---

## Rollback Procedure

If deployment fails:

**Backend (Railway/Render):**
1. Go to Deployments
2. Select previous successful deployment
3. Click "Redeploy"

**Frontend (Netlify/Vercel):**
1. Go to Deploys
2. Find last working deploy
3. Click "Publish deploy"

**Emergency Fix:**
```bash
git revert HEAD
git push origin main
```

---

## Cost Estimation

### Google Gemini API
- Gemini 2.0 Flash-Lite: Pricing TBD (check Google AI pricing)
- Free tier available for testing

### Hosting Costs

**Backend:**
- Railway: $5/month (Hobby plan)
- Render: $7/month (Starter plan)
- AWS Lambda: Pay per request (very cost-effective for low traffic)

**Frontend:**
- Netlify: Free for 100GB/month bandwidth
- Vercel: Free for personal projects
- AWS S3 + CloudFront: ~$1-5/month for small sites

**Database:**
- Railway PostgreSQL: Included in hobby plan
- Render PostgreSQL: $7/month
- AWS RDS: Starting at $15/month

**Total Estimated Cost:** $5-15/month for small to medium traffic

---

## Support

If you encounter issues during deployment:

1. Check service status pages
2. Review deployment logs
3. Verify environment variables
4. Test API endpoints with Postman/curl
5. Check CORS configuration
6. Verify SSL certificates

---

**Deployment Checklist:**
- [ ] Google API key obtained
- [ ] Backend deployed and accessible
- [ ] Database set up (if using external DB)
- [ ] Frontend deployed
- [ ] Chat widget API URL updated
- [ ] CORS configured correctly
- [ ] Custom domain configured (optional)
- [ ] SSL/HTTPS enabled
- [ ] Monitoring set up
- [ ] Backups configured
- [ ] Rate limiting tested
- [ ] Full integration tested

**Last Updated:** November 2025
