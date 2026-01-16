#!/bin/bash

# FrankX CMS Comparison - Start Both Systems
# This script launches both Payload and Tina CMS side-by-side

echo "🚀 Starting FrankX CMS Comparison..."
echo ""

# Check MongoDB
echo "📦 Checking MongoDB..."
if podman ps | grep -q payload-mongodb; then
    echo "✅ MongoDB running"
else
    echo "❌ MongoDB not running - starting now..."
    podman start payload-mongodb || podman run -d -p 27017:27017 --name payload-mongodb mongo:latest
    sleep 3
fi

echo ""
echo "🎯 Starting both CMS systems..."
echo ""

# Start Payload CMS on port 3001
echo "1️⃣  Payload CMS (port 3001)"
cd payload-cms-eval
PORT=3001 npm run dev > ../payload-logs.txt 2>&1 &
PAYLOAD_PID=$!
echo "   PID: $PAYLOAD_PID"
cd ..

# Wait a moment
sleep 2

# Start Tina CMS on port 3002
echo "2️⃣  Tina CMS (port 3002)"
cd tina-cms-eval
PORT=3002 npm run dev > ../tina-logs.txt 2>&1 &
TINA_PID=$!
echo "   PID: $TINA_PID"
cd ..

echo ""
echo "✅ Both systems starting..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 ACCESS POINTS:"
echo ""
echo "   Payload CMS Admin:"
echo "   → http://localhost:3001/admin"
echo "   → Create your first admin user"
echo ""
echo "   Tina CMS Site:"
echo "   → http://localhost:3002"
echo "   → Click 'Edit This Page' to start"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 VIEW LOGS:"
echo "   Payload: tail -f payload-logs.txt"
echo "   Tina:    tail -f tina-logs.txt"
echo ""
echo "🛑 STOP BOTH:"
echo "   kill $PAYLOAD_PID $TINA_PID"
echo "   (or run: ./STOP-BOTH-CMS.sh)"
echo ""
echo "📖 COMPARISON GUIDE:"
echo "   Read: CMS-COMPARISON-SHOWCASE.md"
echo ""

# Save PIDs for stop script
echo "$PAYLOAD_PID" > .payload-pid
echo "$TINA_PID" > .tina-pid

echo "⏳ Waiting 30 seconds for systems to boot..."
sleep 30

echo ""
echo "✅ Both systems should be ready now!"
echo ""
echo "🎯 START TESTING:"
echo "   1. Open Payload: http://localhost:3001/admin"
echo "   2. Open Tina:    http://localhost:3002"
echo "   3. Follow CMS-COMPARISON-SHOWCASE.md for tests"
echo ""
