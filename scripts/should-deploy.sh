#!/usr/bin/env bash
# Vercel ignoreCommand — exit 0 SKIPS the build, non-zero PROCEEDS.
# Skips when only docs/internal/research paths changed since the previous deploy.
# Phase 3.5 of VERCEL-COST-MASSIVE-ACTION — cuts ~30-50% of preview-deploy spend
# on docs-only commits without touching site behavior.

set -e

# First commit on a branch has no HEAD^ — always proceed.
if ! git rev-parse HEAD^ >/dev/null 2>&1; then
  echo "[should-deploy] First commit — proceeding with build."
  exit 1
fi

# A relevant path is anything that can change rendered output.
# If any of these changed → build. Otherwise → skip.
RELEVANT_PATHS=(
  app
  components
  lib
  content
  data
  public
  scripts
  package.json
  package-lock.json
  pnpm-lock.yaml
  next.config.mjs
  vercel.json
  tailwind.config.js
  tsconfig.json
  middleware.ts
  middleware.js
)

if git diff --quiet HEAD^ HEAD -- "${RELEVANT_PATHS[@]}"; then
  echo "[should-deploy] No relevant paths changed. SKIPPING build."
  echo "[should-deploy] Changed files (all internal/docs):"
  git diff --name-only HEAD^ HEAD | sed 's/^/  - /'
  exit 0
fi

echo "[should-deploy] Relevant changes detected — PROCEEDING with build:"
git diff --name-only HEAD^ HEAD -- "${RELEVANT_PATHS[@]}" | sed 's/^/  - /'
exit 1
