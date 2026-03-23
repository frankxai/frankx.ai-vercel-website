#!/bin/bash
# Stop AFFiNE workspace services
# Usage: ./stop_affine.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$(dirname "$SCRIPT_DIR")"

echo "🛑 Stopping AFFiNE Workspace..."
echo "================================"

cd "$INFRA_DIR"

# Stop services
docker compose down

echo ""
echo "✅ AFFiNE stopped successfully!"
echo ""
echo "💾 Data is preserved in Docker volumes."
echo "   To completely remove volumes, run: docker compose down -v"
echo ""
