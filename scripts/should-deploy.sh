#!/usr/bin/env bash
# Vercel ignoreCommand — exit 0 SKIPS the build, non-zero PROCEEDS.
# Skips when only docs/internal/research paths changed since the previous deploy.
# Phase 3.5 of VERCEL-COST-MASSIVE-ACTION — cuts ~30-50% of preview-deploy spend
# on docs-only commits without touching site behavior.
#
# IMPORTANT — fail safe to PROCEED: any unexpected condition (git error, missing
# parent, env-var redeploy, etc.) returns non-zero so the build runs. Skipping a
# build that should have run is a correctness bug (stale prod); building a build
# that could have been skipped is just a small cost. Bias toward correctness.
#
# 2026-05-05 review hardened: handles VERCEL_GIT_PREVIOUS_SHA, env-var redeploys
# (commit SHA == previous SHA), merge commits, shallow clones, git errors.

set +e  # Don't auto-abort on non-zero — we control exit codes explicitly.

# Vercel-provided env vars (when running as ignoreCommand):
#   VERCEL_GIT_COMMIT_SHA   = the SHA being deployed
#   VERCEL_GIT_PREVIOUS_SHA = SHA of the previously-deployed commit on this target
#                             (production target only; not set for previews)
#   VERCEL_ENV              = production | preview | development
CURRENT_SHA="${VERCEL_GIT_COMMIT_SHA:-$(git rev-parse HEAD 2>/dev/null)}"
PREVIOUS_SHA="${VERCEL_GIT_PREVIOUS_SHA:-}"

# 1. Env-var-only redeploy (Vercel dashboard "Redeploy"): same SHA twice.
#    The user clicked redeploy precisely because something changed (env vars).
#    File diff would be empty → would falsely SKIP. Always PROCEED in this case.
if [ -n "$PREVIOUS_SHA" ] && [ "$CURRENT_SHA" = "$PREVIOUS_SHA" ]; then
  echo "[should-deploy] Manual redeploy on same commit ($CURRENT_SHA) — PROCEEDING (likely env-var change)."
  exit 1
fi

# 2. Pick a base SHA to diff against:
#    - Prefer VERCEL_GIT_PREVIOUS_SHA (handles merge commits + multi-commit pushes correctly)
#    - Fall back to HEAD^ (for previews where Vercel doesn't set the env var)
BASE_SHA=""
if [ -n "$PREVIOUS_SHA" ] && git cat-file -e "$PREVIOUS_SHA" 2>/dev/null; then
  BASE_SHA="$PREVIOUS_SHA"
  echo "[should-deploy] Diffing against VERCEL_GIT_PREVIOUS_SHA $BASE_SHA"
elif git rev-parse HEAD^ >/dev/null 2>&1; then
  BASE_SHA="HEAD^"
  echo "[should-deploy] Diffing against HEAD^ (no VERCEL_GIT_PREVIOUS_SHA)"
else
  echo "[should-deploy] No base commit available — PROCEEDING (first build or shallow clone)."
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
  styles
  package.json
  package-lock.json
  pnpm-lock.yaml
  next.config.mjs
  vercel.json
  tailwind.config.js
  tsconfig.json
  proxy.ts
  middleware.ts
  middleware.js
  .vercelignore
  .npmrc
  postcss.config.js
  postcss.config.mjs
  eslint.config.js
  eslint.config.mjs
  .eslintrc.json
  instrumentation.ts
)

# 3. Run the diff. Capture the exit code explicitly so we can distinguish:
#    rc=0 → no diff → SKIP
#    rc=1 → diff exists → PROCEED
#    rc=other → git error (corrupt repo, missing object, shallow clone parent unreachable) → PROCEED safely
git diff --quiet "$BASE_SHA" HEAD -- "${RELEVANT_PATHS[@]}"
RC=$?

case $RC in
  0)
    echo "[should-deploy] No relevant paths changed. SKIPPING build."
    echo "[should-deploy] Changed files (all internal/docs):"
    git diff --name-only "$BASE_SHA" HEAD 2>/dev/null | sed 's/^/  - /' || true
    exit 0
    ;;
  1)
    echo "[should-deploy] Relevant changes detected — PROCEEDING with build:"
    git diff --name-only "$BASE_SHA" HEAD -- "${RELEVANT_PATHS[@]}" | sed 's/^/  - /'
    exit 1
    ;;
  *)
    echo "[should-deploy] git diff returned unexpected rc=$RC — failing safe to PROCEEDING."
    exit 1
    ;;
esac
