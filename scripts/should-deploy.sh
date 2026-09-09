#!/usr/bin/env bash
# Vercel ignoreCommand — exit 0 SKIPS the build, non-zero PROCEEDS.
# Skips when (a) the triggering PR is a draft, or (b) only docs/internal/
# research paths changed since the previous deploy.
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

# 0a. Agents may push intermediate preview checkpoints without spending build
#     minutes, including branch pushes made before a pull request exists.
#     The final coherent commit MUST omit [agent-wip].
#
#     Subject line only. CLAUDE.md puts the marker in the commit subject, and
#     scanning the whole body means any commit that merely *describes* the marker
#     matches it. Measured 2026-09-08 on starlight-intelligence-web, which had
#     been given a copy of this file: commit f0abfcb explained what [agent-wip]
#     does, and deployment dpl_DFrAVq1r2rpZkTpQtiKgz9U4orcc was cancelled in 3.3
#     seconds by this very check. A body scan fails toward NOT building, so the
#     preview that would have verified the change never ran.
COMMIT_SUBJECT="${VERCEL_GIT_COMMIT_MESSAGE:-}"
if [ -z "$COMMIT_SUBJECT" ]; then
  COMMIT_SUBJECT="$(git log -1 --format=%s HEAD 2>/dev/null)"
fi
COMMIT_SUBJECT="$(printf '%s\n' "$COMMIT_SUBJECT" | head -n 1)"
if printf '%s' "$COMMIT_SUBJECT" | grep -Fq "[agent-wip]"; then
  echo "[should-deploy] Explicit agent work-in-progress checkpoint — SKIPPING build."
  exit 0
fi

# 0b. If the parent was an ignored checkpoint, force the first coherent commit
#     to build before draft/path filters can skip it. Subject only, to match 0a:
#     a body scan here errs toward building, so it is wasteful rather than
#     dangerous, but two definitions of "is a checkpoint" is worse than either.
if git log -1 --format=%s HEAD^ 2>/dev/null | grep -Fq "[agent-wip]"; then
  echo "[should-deploy] Coherent checkpoint follows [agent-wip] — PROCEEDING."
  exit 1
fi

# 0c. Draft PR check — cheapest remaining skip, runs before path diff work.
#    VERCEL_GIT_PULL_REQUEST_ID is only set for PR-linked preview builds
#    (empty for production and non-PR previews), so this never touches
#    production. Repo is public — unauthenticated GitHub API call, no token.
#    Fail-safe to PROCEED: any curl/parse hiccup falls through to the
#    existing path-diff logic below rather than risking a false skip.
if [ -n "${VERCEL_GIT_PULL_REQUEST_ID:-}" ] && [ -n "${VERCEL_GIT_REPO_OWNER:-}" ] && [ -n "${VERCEL_GIT_REPO_SLUG:-}" ]; then
  PR_JSON=$(curl -sf --max-time 5 \
    "https://api.github.com/repos/${VERCEL_GIT_REPO_OWNER}/${VERCEL_GIT_REPO_SLUG}/pulls/${VERCEL_GIT_PULL_REQUEST_ID}" 2>/dev/null)
  if [ -n "$PR_JSON" ] && echo "$PR_JSON" | grep -q '"draft"[[:space:]]*:[[:space:]]*true'; then
    echo "[should-deploy] PR #${VERCEL_GIT_PULL_REQUEST_ID} is a draft — SKIPPING build."
    exit 0
  fi
fi

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

# 1b. Preview whose branch differs from main in no way that changes rendered
#     output. Measured 2026-09-01: with six harnesses working, "Merge branch
#     'main' into agent/..." commits rebuilt previews that reviewed nothing —
#     the branch had merely caught up to main, and production already built
#     that content.
#
#     "Is this a merge from main" is the wrong question: once a feature branch
#     lands, BOTH its parents are ancestors of main, so ancestry cannot tell the
#     two merge directions apart after the fact. What matters for a preview is
#     simpler — does this branch differ from main at all?
#
#     Vercel clones previews shallow and without a remote-tracking origin/main,
#     so the ref this needs is normally absent. An earlier version of this check
#     was conditioned on origin/main already resolving and therefore never fired.
#     A depth-1 fetch is enough: `git diff A B -- paths` compares two trees
#     directly and needs no merge base.
#
#     Fail-safe to PROCEED: a failed fetch, an absent ref, or a git error all
#     fall through to the base-SHA diff below rather than risking a false skip.
if [ -n "${VERCEL_GIT_COMMIT_REF:-}" ] && [ "${VERCEL_GIT_COMMIT_REF:-}" != "main" ]; then
  MAIN_REF=""
  if git rev-parse --verify -q origin/main >/dev/null 2>&1; then
    MAIN_REF="origin/main"
  elif command -v timeout >/dev/null 2>&1 \
       && timeout 45 git fetch --no-tags --depth=1 origin main >/dev/null 2>&1; then
    MAIN_REF="FETCH_HEAD"
  elif ! command -v timeout >/dev/null 2>&1 \
       && git fetch --no-tags --depth=1 origin main >/dev/null 2>&1; then
    MAIN_REF="FETCH_HEAD"
  fi

  if [ -z "$MAIN_REF" ]; then
    echo "[should-deploy] main not reachable for branch comparison — continuing to base-SHA diff."
  elif git diff --quiet "$MAIN_REF" HEAD -- "${RELEVANT_PATHS[@]}" 2>/dev/null; then
    echo "[should-deploy] Branch has no relevant diff against main ($MAIN_REF) — SKIPPING build."
    echo "[should-deploy] Nothing to preview that production has not already built."
    exit 0
  fi
fi

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
