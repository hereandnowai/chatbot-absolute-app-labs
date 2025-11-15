#!/bin/bash

# Quick Start Script for Absolute App Labs Chat Widget
# This script helps you get started quickly

set -e

echo "🚀 Absolute App Labs - Chat Widget Setup"
echo "=========================================="
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp .env.example .env
    echo "✓ Created .env file"
    echo ""
    echo "⚡ IMPORTANT: Please edit .env and add your GOOGLE_API_KEY"
    echo "   Open .env in your editor and replace 'your-google-api-key-here'"
    echo ""
    read -p "Press Enter once you've added your API key..."
fi

# Check Python version
echo "🔍 Checking Python version..."
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version | cut -d' ' -f2)
    echo "✓ Python $PYTHON_VERSION found"
else
    echo "❌ Python 3 not found. Please install Python 3.9 or higher"
    exit 1
fi

# Set up backend
echo ""
echo "📦 Setting up backend..."
cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing dependencies..."
pip install -q -r requirements.txt

echo "✓ Backend setup complete"

# Start backend in background
echo ""
echo "🚀 Starting backend server..."
python main.py &
BACKEND_PID=$!
echo "✓ Backend running on http://localhost:8000 (PID: $BACKEND_PID)"

cd ..

# Wait for backend to start
echo ""
echo "⏳ Waiting for backend to initialize..."
sleep 3

# Start frontend
echo ""
echo "🌐 Starting frontend server..."
cd frontend
python3 -m http.server 3000 &
FRONTEND_PID=$!
echo "✓ Frontend running on http://localhost:3000 (PID: $FRONTEND_PID)"

cd ..

# Open browser
echo ""
echo "🎉 Setup complete!"
echo ""
echo "📝 URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Keep script running and handle Ctrl+C
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT

# Open browser (macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:3000
fi

# Wait for user interrupt
wait
