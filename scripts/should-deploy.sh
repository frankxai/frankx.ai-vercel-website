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

# 5. Only a successful, structurally valid GitHub response establishes PR readiness.
#    The public lookup has no credentials. API failures remain unknown.
PR_STATE="unknown"
OWNER="${VERCEL_GIT_REPO_OWNER:-}"
SLUG="${VERCEL_GIT_REPO_SLUG:-}"
if [ -n "$OWNER" ] && [ -n "$SLUG" ]; then
  MODE="list"
  if [ -n "${VERCEL_GIT_PULL_REQUEST_ID:-}" ]; then
    MODE="single"
    URL="https://api.github.com/repos/${OWNER}/${SLUG}/pulls/${VERCEL_GIT_PULL_REQUEST_ID}"
    PR_JSON="$(curl -sf --max-time 5 "$URL" 2>/dev/null)"
    CURL_RC=$?
  else
    PR_JSON="$(curl -sfG --max-time 5 --data-urlencode "head=${OWNER}:${REF}" --data-urlencode "state=open" "https://api.github.com/repos/${OWNER}/${SLUG}/pulls" 2>/dev/null)"
    CURL_RC=$?
  fi
  if [ "$CURL_RC" -eq 0 ]; then
    PR_STATE="$(printf '%s' "$PR_JSON" | node -e '
      let state = "unknown";
      try {
        const value = JSON.parse(require("node:fs").readFileSync(0, "utf8"));
        const list = process.argv[1] === "list";
        const valid = (pr) => pr && typeof pr === "object" && !Array.isArray(pr) && pr.state === "open" && typeof pr.draft === "boolean";
        if (list && Array.isArray(value) && value.length === 0) state = "none";
        else {
          const rows = list ? value : [value];
          if (Array.isArray(rows) && rows.length && rows.every(valid)) {
            state = rows.some((pr) => !pr.draft) ? "ready" : "draft";
          }
        }
      } catch {}
      process.stdout.write(state);
    ' "$MODE" 2>/dev/null)"
    PR_STATE="${PR_STATE:-unknown}"
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
