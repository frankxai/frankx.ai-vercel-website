#!/usr/bin/env bash
# Vercel ignoreCommand — exit 0 SKIPS the build, non-zero PROCEEDS.
# Preview policy (2026-10-21, estate Vercel build budget): previews are opt-in for
# agent branches and need proof the PR is ready; bots and catch-up merges never build;
# production is never skipped. Measured 2026-10-07..21: 77% of this project's build
# minutes were non-main, and 41% of preview minutes were 'Merge branch main into ...'.
# Opt in with [preview] in the commit subject, or push the branch as preview/<name>.
# After the gate, docs/internal-only changes are still skipped by the path diff below.
#
# IMPORTANT — fail safe to PROCEED for production and unknown refs: skipping a build
# that should have run is a correctness bug (stale prod); an extra build is only money.

set +e  # Don't auto-abort on non-zero — we control exit codes explicitly.

# Vercel-provided env vars (when running as ignoreCommand):
#   VERCEL_GIT_COMMIT_SHA   = the SHA being deployed
#   VERCEL_GIT_PREVIOUS_SHA = SHA of the previously-deployed commit on this target
#                             (production target only; not set for previews)
#   VERCEL_ENV              = production | preview | development
CURRENT_SHA="${VERCEL_GIT_COMMIT_SHA:-$(git rev-parse HEAD 2>/dev/null)}"
PREVIOUS_SHA="${VERCEL_GIT_PREVIOUS_SHA:-}"

# 0. Production is never skipped. This must run before preview-only guards.
if [ "${VERCEL_ENV:-}" = "production" ]; then
  echo "[should-deploy] Production deployment — PROCEEDING."
  exit 1
fi

# An explicit same-SHA redeploy must take precedence over preview cost guards.
# Operators use it after changing environment variables without changing files.
if [ -n "$PREVIOUS_SHA" ] && [ "$CURRENT_SHA" = "$PREVIOUS_SHA" ]; then
  echo "[should-deploy] Manual redeploy on same commit ($CURRENT_SHA) — PROCEEDING (likely env-var change)."
  exit 1
fi

REF="${VERCEL_GIT_COMMIT_REF:-}"
MESSAGE="${VERCEL_GIT_COMMIT_MESSAGE:-}"
SUBJECT="$(printf '%s\n' "$MESSAGE" | head -n 1)"

# Unknown ref or main builds (production was handled above).
if [ -z "$REF" ] || [ "$REF" = "main" ]; then
  echo "[preview-gate] main/unknown ref — BUILDING."
  exit 1
fi

# 1. Explicit opt-in beats every skip rule below.
case "$REF" in
  preview/*) echo "[preview-gate] preview/* branch — BUILDING."; exit 1 ;;
esac
# Subject line only: a commit body that merely describes the marker must not
# opt in. Measured 2026-10-22: the commit introducing this gate explained
# [preview] in its body and built itself on all three projects.
case "$SUBJECT" in
  *"[preview]"*) echo "[preview-gate] [preview] requested — BUILDING."; exit 1 ;;
esac

# 2. Bots and tooling branches never need a preview.
case "$REF" in
  dependabot/*|renovate/*|copilot/*|changeset-release/*|backup/*|worktree-*)
    echo "[preview-gate] bot/tooling branch $REF — SKIPPING. Add [preview] to build."
    exit 0 ;;
esac

# 3. Catching a branch up with main reviews nothing new (41% of one sibling
#    project's preview minutes were exactly this). Subject line only.
case "$SUBJECT" in
  "Merge branch 'main'"*|"Merge remote-tracking branch 'origin/main'"*)
    echo "[preview-gate] catch-up merge from main — SKIPPING. Add [preview] to build."
    exit 0 ;;
esac

# 4. [agent-wip] in the subject line is an explicit checkpoint.
case "$SUBJECT" in
  *"[agent-wip]"*) echo "[preview-gate] [agent-wip] checkpoint — SKIPPING."; exit 0 ;;
esac

# 5. Draft / no-PR check through the public GitHub API (repo is public, no token).
#    PR_STATE: ready | draft | none | unknown. Rate limits and network errors
#    land on "unknown", never on a skip.
PR_STATE="unknown"
OWNER="${VERCEL_GIT_REPO_OWNER:-}"
SLUG="${VERCEL_GIT_REPO_SLUG:-}"
if [ -n "$OWNER" ] && [ -n "$SLUG" ]; then
  if [ -n "${VERCEL_GIT_PULL_REQUEST_ID:-}" ]; then
    PR_JSON="$(curl -sf --max-time 5 "https://api.github.com/repos/${OWNER}/${SLUG}/pulls/${VERCEL_GIT_PULL_REQUEST_ID}" 2>/dev/null)"
    if [ -n "$PR_JSON" ]; then
      if printf '%s' "$PR_JSON" | grep -q '"draft"[[:space:]]*:[[:space:]]*true'; then
        PR_STATE="draft"
      elif printf '%s' "$PR_JSON" | grep -q '"draft"[[:space:]]*:[[:space:]]*false'; then
        PR_STATE="ready"
      fi
    fi
  else
    PR_JSON="$(curl -sf --max-time 5 "https://api.github.com/repos/${OWNER}/${SLUG}/pulls?head=${OWNER}:${REF}&state=open" 2>/dev/null)"
    if [ -n "$PR_JSON" ]; then
      CLEAN="$(printf '%s' "$PR_JSON" | tr -d '[:space:]')"
      if [ "$CLEAN" = "[]" ]; then
        PR_STATE="none"
      elif printf '%s' "$PR_JSON" | grep -q '"draft"[[:space:]]*:[[:space:]]*false'; then
        PR_STATE="ready"
      elif printf '%s' "$PR_JSON" | grep -q '"draft"[[:space:]]*:[[:space:]]*true'; then
        PR_STATE="draft"
      fi
    fi
  fi
fi

case "$PR_STATE" in
  draft) echo "[preview-gate] PR is a draft — SKIPPING. Add [preview] to build."; exit 0 ;;
  none)  echo "[preview-gate] no open PR for $REF — SKIPPING. Add [preview] to build."; exit 0 ;;
esac

# 6. Agent branches need positive proof the PR is ready. "unknown" (API down,
#    rate-limited) is not proof, so it skips; the opt-in above is the way through.
case "$REF" in
  agent/*|codex/*|grok/*|grok-bot/*|claude/*|jules/*|antigravity/*|hermes/*|gemini/*|v0/*|ccr-*)
    if [ "$PR_STATE" != "ready" ]; then
      echo "[preview-gate] agent branch $REF without a confirmed ready PR — SKIPPING. Add [preview] to build."
      exit 0
    fi ;;
esac


# The first coherent commit after an ignored [agent-wip] checkpoint builds before the
# path diff can skip it: HEAD^ alone would miss the code the checkpoint carried.
if git log -1 --format=%s HEAD^ 2>/dev/null | grep -Fq "[agent-wip]"; then
  echo "[should-deploy] Coherent checkpoint follows [agent-wip] — PROCEEDING."
  exit 1
fi

# Past the gate: this branch is allowed a preview. Skip it only if no rendered output changed.
# 1. Pick a base SHA to diff against:
#    - Prefer VERCEL_GIT_PREVIOUS_SHA (handles merge commits + multi-commit pushes correctly)
#    - Fall back to HEAD^ only when Vercel did not supply a previous SHA.
#      An explicit but unavailable base may precede relevant changes that HEAD^
#      cannot see. Do not turn missing history into a docs-only verdict.
BASE_SHA=""
if [ -n "$PREVIOUS_SHA" ]; then
  if ! git cat-file -e "${PREVIOUS_SHA}^{commit}" 2>/dev/null; then
    echo "[should-deploy] Previous deployment commit is unavailable — PROCEEDING."
    exit 1
  fi
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
  # Exports runtime constants (CATEGORY_META, AI_PROVIDER_META, ...), not only
  # type declarations, and is imported by checkout and product routes. Omitting
  # it made a types-only commit skip the production build.
  types
  package.json
  pnpm-lock.yaml
  # Dependency overrides and lifecycle approvals affect every install.
  pnpm-workspace.yaml
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

# 2. Run the diff. Capture the exit code explicitly so we can distinguish:
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
