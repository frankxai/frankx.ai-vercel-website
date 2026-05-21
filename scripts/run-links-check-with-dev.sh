#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-3000}"
SERVER_URL="http://localhost:${PORT}"
STARTED_SERVER=0
DEV_PID=""
DEV_LOG="${TMPDIR:-/tmp}/frankx-links-check-dev.log"

cleanup() {
  if [[ "$STARTED_SERVER" -eq 1 && -n "$DEV_PID" ]]; then
    kill "$DEV_PID" 2>/dev/null || true
    wait "$DEV_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT

if curl -fsS "$SERVER_URL" >/dev/null 2>&1; then
  npm run links:check
  exit 0
fi

: >"$DEV_LOG"
npm run dev >"$DEV_LOG" 2>&1 &
DEV_PID=$!
STARTED_SERVER=1

READY=0
for _ in $(seq 1 90); do
  if curl -fsS "$SERVER_URL" >/dev/null 2>&1; then
    READY=1
    break
  fi
  sleep 1
done

if [[ "$READY" -ne 1 ]]; then
  echo "ERROR: Dev server did not become ready on ${SERVER_URL}"
  echo "Recent dev log:"
  tail -n 120 "$DEV_LOG" || true
  exit 1
fi

npm run links:check
