#!/usr/bin/env bash
set -euo pipefail

REMOTE="${1:-vercel-website}"
TARGET_BRANCH="${2:-main}"
REPO_SLUG="${3:-frankxai/frankx.ai-vercel-website}"

if ! command -v gh >/dev/null 2>&1; then
  echo "Error: gh CLI is required."
  exit 1
fi

if ! gh auth status -h github.com >/dev/null 2>&1; then
  echo "Error: gh auth is not configured. Run: gh auth login"
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "Error: working tree is not clean. Commit/stash changes first."
  git status --short
  exit 1
fi

echo "Running validation..."
npm run type-check -- --pretty false
npm run lint

SHA="$(git rev-parse HEAD)"
echo "Pushing ${SHA} to ${REMOTE}/${TARGET_BRANCH}..."
git -c credential.helper= -c credential.helper='!gh auth git-credential' push "${REMOTE}" "HEAD:${TARGET_BRANCH}"

echo "Polling deployment status for ${SHA}..."
for i in $(seq 1 40); do
  STATE="$(gh api "repos/${REPO_SLUG}/commits/${SHA}/status" --jq '.state' 2>/dev/null || echo pending)"
  echo "[${i}] ${STATE}"

  if [ "${STATE}" = "success" ]; then
    gh api "repos/${REPO_SLUG}/commits/${SHA}/status" \
      --jq '.statuses[] | [.context,.state,.target_url] | @tsv'
    exit 0
  fi

  if [ "${STATE}" = "failure" ] || [ "${STATE}" = "error" ]; then
    gh api "repos/${REPO_SLUG}/commits/${SHA}/status" \
      --jq '.statuses[] | [.context,.state,.target_url] | @tsv'
    exit 1
  fi

  sleep 10
done

echo "Timed out waiting for deployment status; showing latest contexts:"
gh api "repos/${REPO_SLUG}/commits/${SHA}/status" \
  --jq '.statuses[] | [.context,.state,.target_url] | @tsv'
