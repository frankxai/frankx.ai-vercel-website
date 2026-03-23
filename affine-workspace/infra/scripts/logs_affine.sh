#!/bin/bash
# View AFFiNE logs
# Usage: ./logs_affine.sh [service_name]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$(dirname "$SCRIPT_DIR")"

cd "$INFRA_DIR"

SERVICE="${1:-}"

if [ -z "$SERVICE" ]; then
    echo "📋 Viewing logs for all services (Ctrl+C to exit)..."
    docker compose logs -f
else
    echo "📋 Viewing logs for $SERVICE (Ctrl+C to exit)..."
    docker compose logs -f "$SERVICE"
fi
