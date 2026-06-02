#!/usr/bin/env bash
# Brand-voice / AI-slop scanner for frankx.ai
# Usage:
#   bash scripts/voice-audit.sh                  # rank all app/ + components/ files by slop density
#   bash scripts/voice-audit.sh <local-path>     # show flagged lines in one local file/dir (e.g. app/about)
# Note: pass a LOCAL filesystem path (app/about, content/blog), NOT a URL route (/about).
# See docs/MODEL_UPGRADE_PLAYBOOK.md for the ruleset. "AI transformation" is intentionally
# NOT flagged (legitimate enterprise term). Guru-slop and LLM tells are.

set -euo pipefail

PAT='soul-aligned|soul purpose|transformation ritual|awakening|consciousness|unlock the power|unleash|supercharge|elevate your|harness the power|synergy|seamless|cutting-edge|game-chang|revolutioniz|revolutionary|next level|in today.?s (fast|world|digital)|fast-paced|ever-evolving|deep dive|delve|embark on|tapestry|testament to|look no further|in the realm of|realm of|skyrocket|effortless|paradigm shift|world-class|level up|dive into'

TARGET="${1:-}"
INCLUDES=(--include=*.tsx --include=*.ts --include=*.mdx --include=*.md)

if [ -n "$TARGET" ]; then
  echo "Flagged lines in: $TARGET"
  grep -rnEi "$PAT" "$TARGET" "${INCLUDES[@]}" 2>/dev/null || echo "  (none — clean)"
  exit 0
fi

echo "Top files by slop-term density (app/ + components/, excluding api routes & prompt templates):"
grep -rEil "$PAT" app components "${INCLUDES[@]}" 2>/dev/null \
  | grep -vE '^app/api/' \
  | while read -r f; do
      n=$(grep -Eio "$PAT" "$f" 2>/dev/null | wc -l | tr -d ' ')
      echo "$n $f"
    done | sort -rn | head -50 || true
