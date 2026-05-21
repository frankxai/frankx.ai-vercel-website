#!/usr/bin/env bash
# ao-spawn-win.sh — Spawn an autonomous Claude Code agent in a worktree
# Works on Windows (no tmux needed). Uses ao for worktree management,
# then runs claude directly in --print mode.
#
# Usage: ./scripts/ao-spawn-win.sh "Fix the bug in app/foo/bar.tsx"

set -euo pipefail

PROMPT="${1:?Usage: ao-spawn-win.sh \"<task description>\"}"
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# 1. Create worktree via ao (handles branch naming + isolation)
SESSION_LINE=$(ao-fork spawn "$PROMPT" 2>&1 | grep "SESSION=")
SESSION="${SESSION_LINE#SESSION=}"

if [ -z "$SESSION" ]; then
  echo "ERROR: ao spawn failed"
  exit 1
fi

# 2. Find worktree path
WORKTREE="$HOME/.worktrees/frankx/$SESSION"
if [ ! -d "$WORKTREE" ]; then
  echo "ERROR: Worktree not found at $WORKTREE"
  exit 1
fi

echo "=== Session: $SESSION ==="
echo "=== Worktree: $WORKTREE ==="
echo "=== Running Claude Code headless... ==="

# 3. Run Claude Code one-shot in the worktree
cd "$WORKTREE"
claude --print --dangerously-skip-permissions -p "$PROMPT" 2>&1 | tee "/tmp/ao-$SESSION-output.log"

echo ""
echo "=== Session $SESSION complete ==="
echo "=== Output: /tmp/ao-$SESSION-output.log ==="
echo "=== Worktree: $WORKTREE ==="
echo "=== Check: cd $WORKTREE && git log --oneline -3 ==="
