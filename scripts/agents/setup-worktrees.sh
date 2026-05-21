#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  scripts/agents/setup-worktrees.sh <task-slug> [base-branch]

Examples:
  scripts/agents/setup-worktrees.sh agent-sync
  scripts/agents/setup-worktrees.sh blog-refresh main

Creates one worktree per core agent:
  - claude
  - codex
  - gemini

Branch naming:
  agent/<task-slug>/<agent>
EOF
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

TASK_SLUG="${1:-}"
if [[ -z "$TASK_SLUG" ]]; then
  usage
  exit 1
fi

BASE_BRANCH="${2:-$(git branch --show-current)}"
ROOT="$(git rev-parse --show-toplevel)"
WORKTREE_DIR="${ROOT}/.worktrees"

if ! git check-ignore -q .worktrees; then
  echo "ERROR: .worktrees is not ignored by git. Add '.worktrees/' to .gitignore before using this script."
  exit 1
fi

mkdir -p "$WORKTREE_DIR"

AGENTS=(claude codex gemini)

echo "Task: ${TASK_SLUG}"
echo "Base branch: ${BASE_BRANCH}"
echo "Worktree root: ${WORKTREE_DIR}"
echo

for AGENT in "${AGENTS[@]}"; do
  BRANCH="agent/${TASK_SLUG}/${AGENT}"
  PATHNAME="${WORKTREE_DIR}/${TASK_SLUG}-${AGENT}"

  if [[ -d "$PATHNAME" ]]; then
    echo "[skip] ${AGENT}: worktree already exists at ${PATHNAME}"
    continue
  fi

  if git show-ref --verify --quiet "refs/heads/${BRANCH}"; then
    echo "[add]  ${AGENT}: existing branch ${BRANCH}"
    git worktree add "$PATHNAME" "$BRANCH"
  else
    echo "[new]  ${AGENT}: creating branch ${BRANCH} from ${BASE_BRANCH}"
    git worktree add -b "$BRANCH" "$PATHNAME" "$BASE_BRANCH"
  fi
done

echo
echo "Worktrees created. Suggested next step:"
echo "  npm run agents:locks -- init --task ${TASK_SLUG}"
