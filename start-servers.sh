#!/bin/bash
echo "🚀 Starting Absolute App Labs Servers"
echo "======================================"

# Start backend
cd backend
./venv/bin/python main.py > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
echo "✓ Backend started (PID: $BACKEND_PID)"

# Wait for backend
sleep 3

# Start frontend
cd ../frontend
python3 -m http.server 3000 > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "✓ Frontend started (PID: $FRONTEND_PID)"

echo ""
echo "📍 URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Test Page: http://localhost:3000/test-chat.html"
echo "   Backend: http://localhost:8000"
echo ""
echo "To stop servers:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "Backend logs: tail -f /tmp/backend.log"
