#!/bin/bash
# Restart AFFiNE workspace services
# Usage: ./restart_affine.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🔄 Restarting AFFiNE Workspace..."
echo "================================="

# Stop services
"$SCRIPT_DIR/stop_affine.sh"

echo ""

# Start services
"$SCRIPT_DIR/start_affine.sh"
