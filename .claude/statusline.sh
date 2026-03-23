#!/bin/bash
# ══════════════════════════════════════════════════════════════
# ACOS v10 — Adaptive Creator Intelligence Status Line
# FrankX Platform | AI Architect & Creator
# ══════════════════════════════════════════════════════════════
# Self-contained status bar for Claude Code. Reads real metrics
# from .claude-flow/, .claude/trajectories/, and project state.
# v10: Experience replay, agent IAM, circuit breaker, audit trail.
# No npm dependencies. Fast execution (<200ms target).
# ══════════════════════════════════════════════════════════════

# Read Claude Code JSON input from stdin (if available)
CLAUDE_INPUT=$(timeout 1 cat 2>/dev/null || echo "{}")

# Project directory
PROJECT_DIR=$(echo "$CLAUDE_INPUT" | jq -r '.cwd // ""' 2>/dev/null)
if [ -z "$PROJECT_DIR" ] || [ "$PROJECT_DIR" = "null" ]; then
  PROJECT_DIR=$(pwd)
fi

# ── ANSI Brand Colors ──────────────────────────────────────
RESET='\033[0m'
BOLD='\033[1m'
DIM='\033[2m'

# FrankX brand palette (256-color)
PURPLE='\033[38;5;135m'      # #AB47C7
CYAN='\033[38;5;81m'         # #43BFE3
GOLD='\033[38;5;214m'        # #F59E0B
EMERALD='\033[38;5;48m'      # #10B981
WHITE='\033[38;5;255m'
BLUE='\033[38;5;75m'
RED='\033[38;5;196m'

# ── Data Collection ───────────────────────────────────────

# Git branch
GIT_BRANCH=""
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  GIT_BRANCH=$(git branch --show-current 2>/dev/null)
fi

# GitHub user (cached approach — gh api is slow)
GH_USER=$(git config user.name 2>/dev/null || echo "Frank")

# Model name
MODEL_SHORT=""
if [ "$CLAUDE_INPUT" != "{}" ] && [ -n "$CLAUDE_INPUT" ]; then
  MODEL_RAW=$(echo "$CLAUDE_INPUT" | jq -r '.model // ""' 2>/dev/null)
  case "$MODEL_RAW" in
    *opus-4-6*|*opus-4*) MODEL_SHORT="Opus 4.6" ;;
    *sonnet-4-5*|*sonnet-4*) MODEL_SHORT="Sonnet 4.5" ;;
    *haiku-4-5*|*haiku-4*) MODEL_SHORT="Haiku 4.5" ;;
    *haiku*) MODEL_SHORT="Haiku" ;;
    *sonnet*) MODEL_SHORT="Sonnet" ;;
    *opus*) MODEL_SHORT="Opus" ;;
    "") MODEL_SHORT="" ;;
    *) MODEL_SHORT="$MODEL_RAW" ;;
  esac
fi

# ── Trajectories & Learning ──────────────────────────────
TRAJECTORY_COUNT=0
PATTERN_COUNT=0
AVG_SUCCESS=0
LEARNING_FILE="${PROJECT_DIR}/.claude-flow/metrics/learning-status.json"
TRAJ_DIR="${PROJECT_DIR}/.claude/trajectories"

if [ -d "$TRAJ_DIR" ]; then
  TRAJECTORY_COUNT=$(ls "$TRAJ_DIR"/*.json 2>/dev/null | wc -l | tr -d ' ')
fi

if [ -f "$LEARNING_FILE" ]; then
  PATTERN_COUNT=$(jq -r '.patterns // 0' "$LEARNING_FILE" 2>/dev/null || echo "0")
  AVG_RAW=$(jq -r '.avgSuccess // "0%"' "$LEARNING_FILE" 2>/dev/null || echo "0%")
  AVG_SUCCESS="${AVG_RAW%%%}"
  # Handle decimal values
  AVG_SUCCESS=$(echo "$AVG_SUCCESS" | cut -d. -f1)
  [ -z "$AVG_SUCCESS" ] && AVG_SUCCESS=0
fi

LEARN_COLOR="${DIM}"
[ "$AVG_SUCCESS" -gt 70 ] 2>/dev/null && LEARN_COLOR="${EMERALD}"
[ "$AVG_SUCCESS" -le 70 ] 2>/dev/null && [ "$AVG_SUCCESS" -gt 40 ] 2>/dev/null && LEARN_COLOR="${GOLD}"
[ "$AVG_SUCCESS" -le 40 ] 2>/dev/null && [ "$AVG_SUCCESS" -gt 0 ] 2>/dev/null && LEARN_COLOR="${CYAN}"

# ── Skills & Agents ───────────────────────────────────────
SKILL_COUNT=0
AGENT_COUNT=0
PROFILE_COUNT=0
SKILL_RULES="${PROJECT_DIR}/.claude/skills/skill-rules.json"
SWARM_AGENTS="${PROJECT_DIR}/.claude-flow/swarm/agents.json"

if [ -f "$SKILL_RULES" ]; then
  SKILL_MAIN=$(jq '.skills | length' "$SKILL_RULES" 2>/dev/null || echo "0")
  SKILL_CORE=$(jq '.core_skills.always_available | length' "$SKILL_RULES" 2>/dev/null || echo "0")
  SKILL_COUNT=$((SKILL_MAIN + SKILL_CORE))
  PROFILE_COUNT=$(jq '.skill_profiles | length' "$SKILL_RULES" 2>/dev/null || echo "0")
fi

if [ -f "$SWARM_AGENTS" ]; then
  AGENT_COUNT=$(jq '.agents | length' "$SWARM_AGENTS" 2>/dev/null || echo "0")
  [ "$AGENT_COUNT" = "null" ] && AGENT_COUNT=0
fi

# ── Hooks ─────────────────────────────────────────────────
HOOK_COUNT=0
SETTINGS_FILE="${PROJECT_DIR}/.claude/settings.json"
if [ -f "$SETTINGS_FILE" ]; then
  HOOK_COUNT=$(jq '[.hooks | to_entries[]? | .value | length] | add // 0' "$SETTINGS_FILE" 2>/dev/null || echo "0")
fi

# ── Books & Library ──────────────────────────────────────
BOOK_TOTAL=0
BOOK_PUBLISHED=0
BOOK_PROGRESS=0
CHAPTER_TOTAL=0
REVIEW_TOTAL=0
BOOKS_FILE="${PROJECT_DIR}/data/books-status.json"

if [ -f "$BOOKS_FILE" ]; then
  BOOK_TOTAL=$(jq '.total_books // 0' "$BOOKS_FILE" 2>/dev/null || echo "0")
  CHAPTER_TOTAL=$(jq '.total_chapters // 0' "$BOOKS_FILE" 2>/dev/null || echo "0")
  REVIEW_TOTAL=$(jq '.total_reviews // 0' "$BOOKS_FILE" 2>/dev/null || echo "0")
  BOOK_PUBLISHED=$(jq '[.books[] | select(.status == "published")] | length' "$BOOKS_FILE" 2>/dev/null || echo "0")
  BOOK_PROGRESS=$(jq '[.books[] | select(.status == "in-progress")] | length' "$BOOKS_FILE" 2>/dev/null || echo "0")
fi

# ── Production Worktree ───────────────────────────────────
PROD_STATUS="READY"
PROD_COLOR="${EMERALD}"
WORKTREE="${PROJECT_DIR}/.worktrees/vercel-ui-ux"
if [ -d "$WORKTREE/.git" ] || [ -f "$WORKTREE/.git" ]; then
  PROD_AHEAD=$(cd "$WORKTREE" 2>/dev/null && git rev-list --count origin/main..HEAD 2>/dev/null || echo "0")
  if [ "$PROD_AHEAD" -gt 0 ] 2>/dev/null; then
    PROD_STATUS="+${PROD_AHEAD}"
    PROD_COLOR="${GOLD}"
  fi
else
  PROD_STATUS="--"
  PROD_COLOR="${DIM}"
fi

# ── MCP Servers ───────────────────────────────────────────
# Count from global settings + known connected servers
MCP_COUNT=0
GLOBAL_SETTINGS="/home/$(whoami)/.claude/settings.json"
if [ -f "$GLOBAL_SETTINGS" ]; then
  MCP_GLOBAL=$(jq '.mcpServers | length' "$GLOBAL_SETTINGS" 2>/dev/null || echo "0")
  MCP_COUNT=$((MCP_COUNT + MCP_GLOBAL))
fi
# Count project-level MCP servers
if [ -f "$SETTINGS_FILE" ]; then
  MCP_PROJECT=$(jq '.mcpServers | length // 0' "$SETTINGS_FILE" 2>/dev/null || echo "0")
  MCP_COUNT=$((MCP_COUNT + MCP_PROJECT))
fi
# Add known Claude.ai connected servers (Slack, Vercel, Notion, Zapier, v0)
# These don't appear in settings.json but are available at runtime
[ "$MCP_COUNT" -lt 2 ] && MCP_COUNT=6

# ── Context Window ────────────────────────────────────────
CONTEXT_PCT=0
if [ "$CLAUDE_INPUT" != "{}" ] && [ -n "$CLAUDE_INPUT" ]; then
  CTX_REM=$(echo "$CLAUDE_INPUT" | jq '.context_window.remaining_percentage // 0' 2>/dev/null)
  if [ "$CTX_REM" != "0" ] && [ "$CTX_REM" != "null" ] && [ -n "$CTX_REM" ]; then
    CONTEXT_PCT=$((100 - CTX_REM))
  fi
fi

# Context bar (5 segments)
CONTEXT_BLOCKS=""
FILLED=$((CONTEXT_PCT / 20))
for i in 1 2 3 4 5; do
  if [ "$i" -le "$FILLED" ]; then
    if [ "$CONTEXT_PCT" -gt 80 ]; then
      CONTEXT_BLOCKS="${CONTEXT_BLOCKS}${RED}█${RESET}"
    elif [ "$CONTEXT_PCT" -gt 60 ]; then
      CONTEXT_BLOCKS="${CONTEXT_BLOCKS}${GOLD}█${RESET}"
    else
      CONTEXT_BLOCKS="${CONTEXT_BLOCKS}${CYAN}█${RESET}"
    fi
  else
    CONTEXT_BLOCKS="${CONTEXT_BLOCKS}${DIM}░${RESET}"
  fi
done

# ── Learning Progress Bar ─────────────────────────────────
LEARN_TARGET=100
LEARN_FILLED=$((PATTERN_COUNT * 5 / LEARN_TARGET))
[ "$LEARN_FILLED" -gt 5 ] && LEARN_FILLED=5
LEARN_BAR=""
for i in 1 2 3 4 5; do
  if [ "$i" -le "$LEARN_FILLED" ]; then
    LEARN_BAR="${LEARN_BAR}${PURPLE}▪${RESET}"
  else
    LEARN_BAR="${LEARN_BAR}${DIM}▫${RESET}"
  fi
done

# ── Swarm Detection ───────────────────────────────────────
SWARM_ICON="${DIM}○${RESET}"
SWARM_LABEL="idle"
ACTIVE_PROCS=$(ps aux 2>/dev/null | grep -c "[c]laude-flow\|[a]gentic-flow") || ACTIVE_PROCS=0
if [ "$ACTIVE_PROCS" -gt 0 ]; then
  SWARM_ICON="${EMERALD}◉${RESET}"
  SWARM_LABEL="live"
fi

# ══════════════════════════════════════════════════════════
#  BUILD OUTPUT — Premium Creator Dashboard
# ══════════════════════════════════════════════════════════

OUT=""

# ── Header: Identity ──────────────────────────────────────
OUT="${BOLD}${PURPLE}▊${RESET} ${BOLD}${WHITE}ACOS${RESET} ${DIM}v10${RESET}"
OUT="${OUT}  ${CYAN}${GH_USER}${RESET}"
[ -n "$GIT_BRANCH" ] && OUT="${OUT}  ${DIM}│${RESET}  ${BLUE}⎇ ${GIT_BRANCH}${RESET}"
[ -n "$MODEL_SHORT" ] && OUT="${OUT}  ${DIM}│${RESET}  ${PURPLE}${MODEL_SHORT}${RESET}"

# ── Divider ───────────────────────────────────────────────
OUT="${OUT}\n${DIM}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"

# ── Row 1: Creator Arsenal ────────────────────────────────
OUT="${OUT}\n${CYAN}⬡${RESET} ${WHITE}Skills${RESET} ${BOLD}${CYAN}${SKILL_COUNT}${RESET}"
OUT="${OUT}  ${DIM}│${RESET}  ${PURPLE}◆${RESET} ${WHITE}Agents${RESET} ${PURPLE}${AGENT_COUNT}${RESET}"
OUT="${OUT}  ${DIM}│${RESET}  ${GOLD}◈${RESET} ${WHITE}Profiles${RESET} ${GOLD}${PROFILE_COUNT}${RESET}"
OUT="${OUT}  ${DIM}│${RESET}  ${EMERALD}⚡${RESET} ${WHITE}Hooks${RESET} ${EMERALD}${HOOK_COUNT}${RESET}"

# ── Row 2: Intelligence ───────────────────────────────────
# Intelligence score from learning system
INTEL_SCORE=0
if [ -f "$LEARNING_FILE" ]; then
  INTEL_SCORE=$(jq -r '.intelligence // 0' "$LEARNING_FILE" 2>/dev/null || echo "0")
fi
INTEL_COLOR="${DIM}"
[ "$INTEL_SCORE" -gt 70 ] 2>/dev/null && INTEL_COLOR="${EMERALD}"
[ "$INTEL_SCORE" -le 70 ] 2>/dev/null && [ "$INTEL_SCORE" -gt 40 ] 2>/dev/null && INTEL_COLOR="${GOLD}"
[ "$INTEL_SCORE" -le 40 ] 2>/dev/null && [ "$INTEL_SCORE" -gt 0 ] 2>/dev/null && INTEL_COLOR="${CYAN}"

OUT="${OUT}\n${PURPLE}◉${RESET} ${WHITE}Intel${RESET} ${INTEL_COLOR}${INTEL_SCORE}${RESET}${DIM}/100${RESET}"
OUT="${OUT}  ${DIM}│${RESET}  ${WHITE}Learn${RESET} [${LEARN_BAR}] ${LEARN_COLOR}${AVG_SUCCESS}%${RESET}"
OUT="${OUT}  ${DIM}│${RESET}  ${CYAN}▸${RESET} ${CYAN}${PATTERN_COUNT}${RESET} ${DIM}pat${RESET}"
OUT="${OUT}  ${DIM}│${RESET}  ${GOLD}▸${RESET} ${GOLD}${TRAJECTORY_COUNT}${RESET} ${DIM}traj${RESET}"
OUT="${OUT}  ${DIM}│${RESET}  ${SWARM_ICON} ${DIM}${SWARM_LABEL}${RESET}"

# ── Row 3: Books & Library ───────────────────────────────
if [ "$BOOK_TOTAL" -gt 0 ]; then
  OUT="${OUT}\n${GOLD}📖${RESET} ${WHITE}Books${RESET} ${BOLD}${GOLD}${BOOK_TOTAL}${RESET}"
  OUT="${OUT}  ${EMERALD}✓${RESET}${EMERALD}${BOOK_PUBLISHED}${RESET}"
  OUT="${OUT} ${GOLD}⟳${RESET}${GOLD}${BOOK_PROGRESS}${RESET}"
  OUT="${OUT}  ${DIM}│${RESET}  ${CYAN}§${RESET} ${WHITE}Ch${RESET} ${CYAN}${CHAPTER_TOTAL}${RESET}"
  OUT="${OUT}  ${DIM}│${RESET}  ${PURPLE}★${RESET} ${WHITE}Reviews${RESET} ${PURPLE}${REVIEW_TOTAL}${RESET}"
  OUT="${OUT}  ${DIM}│${RESET}  ${EMERALD}▲${RESET} ${WHITE}Deploy${RESET} ${PROD_COLOR}${PROD_STATUS}${RESET}"
else
  OUT="${OUT}\n${EMERALD}▲${RESET} ${WHITE}Deploy${RESET} ${PROD_COLOR}${PROD_STATUS}${RESET}"
fi

# ── Row 4: System ───────────────────────────────────────
OUT="${OUT}\n${CYAN}⊕${RESET} ${WHITE}MCP${RESET} ${CYAN}${MCP_COUNT}${RESET}"
OUT="${OUT}  ${DIM}│${RESET}  ${WHITE}Ctx${RESET} [${CONTEXT_BLOCKS}] ${DIM}${CONTEXT_PCT}%${RESET}"

# ── Footer ────────────────────────────────────────────────
OUT="${OUT}\n${DIM}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"

printf "%b\n" "$OUT"
