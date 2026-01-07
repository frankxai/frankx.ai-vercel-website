#!/bin/bash
# Start AFFiNE workspace services
# Usage: ./start_affine.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$(dirname "$SCRIPT_DIR")"

echo "🚀 Starting AFFiNE Workspace..."
echo "================================"

# Navigate to infra directory
cd "$INFRA_DIR"

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found!"
    echo "📋 Copying .env.example to .env..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Edit .env and change all secrets before continuing!"
    echo "   - DB_PASSWORD"
    echo "   - SERVER_SECRET"
    echo ""
    read -p "Press Enter after you've updated .env, or Ctrl+C to exit..."
fi

# Pull latest images
echo ""
echo "📥 Pulling latest Docker images..."
docker compose pull

# Start services
echo ""
echo "🔧 Starting services..."
docker compose up -d

# Wait for services to be healthy
echo ""
echo "⏳ Waiting for services to be healthy..."
sleep 5

# Check status
echo ""
echo "📊 Service Status:"
docker compose ps

echo ""
echo "✅ AFFiNE is starting up!"
echo ""
echo "🌐 Access your workspace at: http://localhost:8787"
echo ""
echo "📝 Useful commands:"
echo "   - View logs:    docker compose logs -f"
echo "   - Stop:         ./stop_affine.sh"
echo "   - Restart:      ./restart_affine.sh"
echo "   - Backup:       ./backup_affine.sh"
echo ""
