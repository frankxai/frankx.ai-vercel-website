#!/bin/bash
# Sync public/runtime files from FrankX dev repo into production worktree and push.
# Usage: ./scripts/sync-to-production.sh [commit-message]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRANKX_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
PROD_ROOT="${FRANKX_ROOT}/.worktrees/vercel-ui-ux"
COMMIT_MSG="${1:-sync: update production from dev repo}"

RSYNC_COMMON_EXCLUDES=(
  --exclude='.git'
  --exclude='node_modules'
  --exclude='CLAUDE.md'
  --exclude='AGENTS.md'
  --exclude='notes.md'
  --exclude='task_plan.md'
)

echo "=== FrankX -> Production Sync ==="

if [ ! -d "${PROD_ROOT}/.git" ]; then
  echo "ERROR: Production worktree not found at ${PROD_ROOT}"
  exit 1
fi

echo "1. Updating production worktree..."
cd "${PROD_ROOT}"
git -c credential.helper= -c credential.helper='!gh auth git-credential' fetch origin main || git fetch origin main
git rebase origin/main || { echo "Rebase failed. Resolve manually in ${PROD_ROOT}."; exit 1; }

echo "2. Syncing runtime files..."

rsync -av --delete "${RSYNC_COMMON_EXCLUDES[@]}" \
  "${FRANKX_ROOT}/app/" "${PROD_ROOT}/app/"

rsync -av --delete "${RSYNC_COMMON_EXCLUDES[@]}" \
  "${FRANKX_ROOT}/components/" "${PROD_ROOT}/components/"

rsync -av --delete "${RSYNC_COMMON_EXCLUDES[@]}" \
  "${FRANKX_ROOT}/lib/" "${PROD_ROOT}/lib/"

rsync -av --delete "${RSYNC_COMMON_EXCLUDES[@]}" \
  "${FRANKX_ROOT}/hooks/" "${PROD_ROOT}/hooks/" 2>/dev/null || true

rsync -av --delete "${RSYNC_COMMON_EXCLUDES[@]}" \
  --exclude='drafts' \
  --exclude='.worktrees' \
  "${FRANKX_ROOT}/content/" "${PROD_ROOT}/content/"

rsync -av --delete "${RSYNC_COMMON_EXCLUDES[@]}" \
  --exclude='.worktrees' \
  --exclude='reading' \
  "${FRANKX_ROOT}/public/" "${PROD_ROOT}/public/"

rsync -av --delete "${RSYNC_COMMON_EXCLUDES[@]}" \
  --exclude='inventories/arcanea' \
  --exclude='.worktrees' \
  "${FRANKX_ROOT}/data/" "${PROD_ROOT}/data/" 2>/dev/null || true

for file in package.json package-lock.json tsconfig.json next.config.mjs postcss.config.js tailwind.config.js; do
  if [ -f "${FRANKX_ROOT}/${file}" ]; then
    cp "${FRANKX_ROOT}/${file}" "${PROD_ROOT}/${file}"
  fi
done

echo "3. Verifying parity..."
bash "${FRANKX_ROOT}/scripts/pre-deploy-sync-check.sh" --sync >/dev/null || true

echo "4. Checking for changes..."
cd "${PROD_ROOT}"
if git diff --quiet && git diff --staged --quiet; then
  echo "No changes to sync."
  exit 0
fi

echo "5. Changes to commit:"
git status --short

echo "6. Committing and pushing..."
git add -A
git commit -m "${COMMIT_MSG}"

if ! git -c credential.helper= -c credential.helper='!gh auth git-credential' push origin main; then
  git push origin main
fi

echo ""
echo "=== Sync Complete ==="
echo "Production repo updated: https://github.com/frankxai/frankx.ai-vercel-website"
echo "Vercel auto-deploy target: https://frankx.ai"
