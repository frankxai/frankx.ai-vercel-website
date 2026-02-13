#!/bin/bash
# Pre-deploy sync checker for FrankX two-repo architecture.
# Compares critical public/runtime files between dev repo and production worktree.

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEV_REPO="$(cd "${SCRIPT_DIR}/.." && pwd)"
PROD_REPO="${DEV_REPO}/.worktrees/vercel-ui-ux"

SYNC_DIRS=(
  "app"
  "components"
  "content"
  "lib"
  "data"
  "public/images"
)

SYNC_FILES=(
  "package.json"
  "package-lock.json"
  "tsconfig.json"
  "next.config.mjs"
  "postcss.config.js"
  "tailwind.config.js"
)

FILTER_NAMES=(
  "*.tsx"
  "*.ts"
  "*.jsx"
  "*.js"
  "*.mjs"
  "*.json"
  "*.mdx"
  "*.md"
  "*.css"
)

should_ignore_path() {
  local rel_path="$1"

  case "${rel_path}" in
    content/drafts/*)
      return 0
      ;;
    */CLAUDE.md|*/AGENTS.md)
      return 0
      ;;
    */notes.md|*/task_plan.md|repo-health-remediation-report.md)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  FrankX Pre-Deploy Sync Checker${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

if [ ! -d "${PROD_REPO}/.git" ]; then
  echo -e "${RED}ERROR: Production worktree not found at ${PROD_REPO}${NC}"
  exit 1
fi

declare -a DRIFT_FILES=()
declare -A DRIFT_INDEX=()

add_drift() {
  local rel_path="$1"

  if should_ignore_path "${rel_path}"; then
    return
  fi

  if [[ -n "${DRIFT_INDEX["${rel_path}"]:-}" ]]; then
    return
  fi

  DRIFT_INDEX["${rel_path}"]=1
  DRIFT_FILES+=("${rel_path}")
}

compare_file() {
  local rel_path="$1"
  local dev_file="${DEV_REPO}/${rel_path}"
  local prod_file="${PROD_REPO}/${rel_path}"

  if should_ignore_path "${rel_path}"; then
    return
  fi

  if [ ! -f "${prod_file}" ]; then
    add_drift "${rel_path}"
    return
  fi

  if ! cmp -s "${dev_file}" "${prod_file}"; then
    add_drift "${rel_path}"
  fi
}

echo -e "${BLUE}Checking for drift between repos...${NC}"
echo ""

for dir in "${SYNC_DIRS[@]}"; do
  if [ ! -d "${DEV_REPO}/${dir}" ]; then
    continue
  fi

  find_cmd=(find "${DEV_REPO}/${dir}" -type f \()
  for i in "${!FILTER_NAMES[@]}"; do
    if [ "${i}" -gt 0 ]; then
      find_cmd+=(-o)
    fi
    find_cmd+=(-name "${FILTER_NAMES[$i]}")
  done
  find_cmd+=(\) -print0)

  while IFS= read -r -d '' file; do
    rel_path="${file#${DEV_REPO}/}"
    compare_file "${rel_path}"
  done < <("${find_cmd[@]}" 2>/dev/null)
done

for file in "${SYNC_FILES[@]}"; do
  if [ -f "${DEV_REPO}/${file}" ]; then
    compare_file "${file}"
  fi
done

DRIFT_COUNT=${#DRIFT_FILES[@]}

if [ "${DRIFT_COUNT}" -eq 0 ]; then
  echo -e "${GREEN}No drift detected. Repos are in sync.${NC}"
  exit 0
fi

echo -e "${YELLOW}Found ${DRIFT_COUNT} file(s) with drift:${NC}"
for file in "${DRIFT_FILES[@]}"; do
  echo -e "  ${RED}-${NC} ${file}"
done
echo ""

if [ "${1:-}" = "--sync" ]; then
  echo -e "${BLUE}Syncing files to production...${NC}"

  for file in "${DRIFT_FILES[@]}"; do
    mkdir -p "$(dirname "${PROD_REPO}/${file}")"
    cp "${DEV_REPO}/${file}" "${PROD_REPO}/${file}"
    echo -e "  ${GREEN}Synced:${NC} ${file}"
  done

  echo -e "${GREEN}Sync complete.${NC}"
  exit 0
fi

if [ "${1:-}" = "--diff" ]; then
  echo -e "${BLUE}Showing diffs...${NC}"
  echo ""

  for file in "${DRIFT_FILES[@]}"; do
    echo -e "${YELLOW}=== ${file} ===${NC}"

    if [ -f "${PROD_REPO}/${file}" ]; then
      diff --color=always "${DEV_REPO}/${file}" "${PROD_REPO}/${file}" || true
    else
      echo "Missing in production worktree"
    fi

    echo ""
  done

  exit 1
fi

echo -e "${BLUE}Options:${NC}"
echo "  --sync    Sync all drifted files to production"
echo "  --diff    Show detailed diffs"
echo ""
echo -e "${YELLOW}Tip: Run with --sync to fix drift before deploying${NC}"
exit 1
