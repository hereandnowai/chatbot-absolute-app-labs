#!/bin/bash

echo "🔧 Restarting Backend..."

# Kill all Python processes running main.py
pkill -9 -f "python.*main.py" 2>/dev/null

# Kill anything on port 8000
lsof -ti:8000 | xargs kill -9 2>/dev/null

# Wait for port to be free
sleep 2

# Start backend
cd /Users/hnai/Desktop/absolute-app-labs/backend
./venv/bin/python main.py > /tmp/backend.log 2>&1 &
BACKEND_PID=$!

echo "✅ Backend started (PID: $BACKEND_PID)"
echo "📝 Logs: tail -f /tmp/backend.log"

# Wait and test
sleep 5

echo ""
echo "Testing backend..."
curl -s http://localhost:8000/ | python3 -c "import sys,json; data=json.load(sys.stdin); print('Status:', data['status'], '| Model:', data['model'])" 2>/dev/null && echo "✅ Backend is healthy" || echo "❌ Backend not responding"

echo ""
echo "Test chat with: curl -X POST http://localhost:8000/api/chat -H 'Content-Type: application/json' -d '{\"message\":\"test\"}'"
