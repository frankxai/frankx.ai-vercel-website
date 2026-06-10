#!/bin/bash
set -euo pipefail

# FrankX SessionStart hook — installs deps so newsletter tooling and tsx
# scripts work immediately in fresh remote (Claude Code on the Web) sessions.
#
# Local sessions skip this — they manage their own node_modules.

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

# Idempotent — skip if deps already there.
if [ -d node_modules ] && [ -d node_modules/next ] && [ -d node_modules/resend ]; then
  echo "deps already installed, skipping"
  exit 0
fi

echo "installing npm dependencies..."
npm install --no-audit --no-fund --prefer-offline
echo "done"
