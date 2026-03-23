#!/bin/bash

# Stop both CMS systems

echo "🛑 Stopping both CMS systems..."

if [ -f .payload-pid ]; then
    PAYLOAD_PID=$(cat .payload-pid)
    kill $PAYLOAD_PID 2>/dev/null && echo "✅ Stopped Payload CMS (PID: $PAYLOAD_PID)" || echo "⚠️  Payload already stopped"
    rm .payload-pid
fi

if [ -f .tina-pid ]; then
    TINA_PID=$(cat .tina-pid)
    kill $TINA_PID 2>/dev/null && echo "✅ Stopped Tina CMS (PID: $TINA_PID)" || echo "⚠️  Tina already stopped"
    rm .tina-pid
fi

echo ""
echo "✅ Both systems stopped"
echo ""
echo "MongoDB still running (use 'podman stop payload-mongodb' to stop)"
