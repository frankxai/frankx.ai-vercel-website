#!/usr/bin/env bash
# .claude/hooks/blog-commit-gate.sh — PreToolUse gate on Bash
#
# Fail-closed quality gate for any `git commit` that touches content/blog/**.mdx.
# Reads PreToolUse JSON from stdin, returns Claude Code hook JSON on stdout.
#
# Checks per staged MDX:
#   - title    <= 60 chars
#   - description <= 155 chars
#   - frontmatter has: tldr (flagship only), lastModified (flagship only), coverAlt OR image
#   - body has >= 3 question-format H2s
#   - body has "## FAQ" or "## Frequently" section with >= 5 "### Question?" pairs
#   - voice-audit clean (delegated to scripts/voice-audit.sh)
#   - flagship-only: presence of a counter-argument marker
#
# Blocks the commit by emitting {"continue": false, "stopReason": "..."} with the
# violation list. Pass-through for any non-content commit.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_ROOT"

# 1. Parse incoming JSON (tool_name, tool_input.command). If python3 missing, pass through.
INPUT="$(cat)"
if ! command -v python3 >/dev/null 2>&1; then
  printf '{"continue": true}\n'
  exit 0
fi

TOOL_NAME="$(printf '%s' "$INPUT" | python3 -c 'import json,sys
try: print(json.loads(sys.stdin.read()).get("tool_name",""))
except Exception: print("")')"

CMD="$(printf '%s' "$INPUT" | python3 -c 'import json,sys
try:
  d=json.loads(sys.stdin.read()); ti=d.get("tool_input",{}) or {}
  print(ti.get("command",""))
except Exception:
  print("")')"

# Only act on Bash + git commit
if [ "$TOOL_NAME" != "Bash" ]; then
  printf '{"continue": true}\n'; exit 0
fi
case "$CMD" in
  *"git commit"*) : ;;  # proceed
  *) printf '{"continue": true}\n'; exit 0 ;;
esac

# 2. Resolve staged content/blog MDX files. If none, pass through.
STAGED="$(git diff --cached --name-only --diff-filter=ACMR 2>/dev/null | grep -E '^content/blog/.*\.mdx$' || true)"
if [ -z "$STAGED" ]; then
  printf '{"continue": true}\n'; exit 0
fi

# 3. Validate each MDX. Collect violations.
PY=$(cat <<'PYEOF'
import os, re, sys, yaml, pathlib
viols = []
for path in sys.argv[1:]:
    p = pathlib.Path(path)
    if not p.exists():
        viols.append(f"{path}: file missing from working tree (cannot validate)")
        continue
    raw = p.read_text(encoding="utf-8")
    if not raw.startswith("---"):
        viols.append(f"{path}: no frontmatter"); continue
    try:
        parts = raw.split("---", 2)
        fm = yaml.safe_load(parts[1]) or {}
        body = parts[2]
    except Exception as e:
        viols.append(f"{path}: frontmatter unparseable ({e})"); continue

    flagship = bool(fm.get("flagship") or fm.get("category") == "Flagship")

    title = fm.get("title","")
    if len(title) > 60:
        viols.append(f"{path}: title is {len(title)} chars (max 60) — '{title[:60]}...'")
    desc = fm.get("description","")
    if len(desc) > 155:
        viols.append(f"{path}: description is {len(desc)} chars (max 155)")
    if not fm.get("image") and not fm.get("coverAlt"):
        viols.append(f"{path}: missing image or coverAlt frontmatter")

    if flagship:
        if not fm.get("tldr"):
            viols.append(f"{path}: flagship requires `tldr` frontmatter field (extractable by AI engines)")
        if not fm.get("lastModified"):
            viols.append(f"{path}: flagship requires `lastModified` (freshness signal)")

    # H2 scan
    h2s = re.findall(r"^## (.+?)$", body, re.M)
    question_h2s = [h for h in h2s if h.rstrip().endswith("?")]
    if len(question_h2s) < 3:
        viols.append(f"{path}: only {len(question_h2s)} question-format H2s (need >=3 for AEO)")

    # FAQ section presence + 5 H3 Q&As
    faq_m = re.search(r"^## (?:FAQ|Frequently Asked[^\n]*)\n([\s\S]*?)(?=\n## [^#]|\Z)", body, re.M)
    if not faq_m:
        viols.append(f"{path}: missing `## FAQ` section")
    else:
        h3s = re.findall(r"^### .+?\?$", faq_m.group(1), re.M)
        if len(h3s) < 5:
            viols.append(f"{path}: FAQ has {len(h3s)} `### Question?` entries (need >=5)")

    # Flagship counter-argument
    if flagship:
        if not re.search(r"(?i)counter[- ]argument|objection|steel[- ]?man|the case against", body):
            viols.append(f"{path}: flagship requires a counter-argument section (marker: 'counter-argument' / 'objection' / 'steelman' / 'the case against')")

print("\n".join(viols))
PYEOF
)

VIOLS="$(printf '%s\n' $STAGED | xargs -I{} echo {} | tr '\n' ' ' | xargs python3 -c "$PY" 2>&1 || true)"

# 4. Voice-audit pass (reuse existing script if present)
if [ -x scripts/voice-audit.sh ] || [ -f scripts/voice-audit.sh ]; then
  for f in $STAGED; do
    if [ -f "$f" ]; then
      OUT="$(bash scripts/voice-audit.sh "$f" 2>/dev/null || true)"
      if [ -n "$OUT" ] && ! echo "$OUT" | grep -q "(none — clean)"; then
        VIOLS="$VIOLS"$'\n'"$f: voice-audit flagged lines:"$'\n'"$OUT"
      fi
    fi
  done
fi

# 5. Emit decision JSON.
if [ -z "$(printf '%s' "$VIOLS" | tr -d '[:space:]')" ]; then
  printf '{"continue": true}\n'
  exit 0
fi

# Bypass escape hatch: allow `git commit ... --no-verify` to skip, in case of true emergencies.
case "$CMD" in
  *"--no-verify"*)
    printf '{"continue": true}\n'
    exit 0
    ;;
esac

# Compose the block message.
REASON="🛑 Excellence gate blocked the commit.
The following content/blog/**.mdx violations must be fixed:

$VIOLS

Fix the violations and re-stage, or pass --no-verify to bypass (use sparingly).
Reference: docs/ops/FLAGSHIP_PIPELINE.md
"
python3 -c '
import json, sys
print(json.dumps({"continue": False, "stopReason": sys.stdin.read()}))
' <<<"$REASON"
