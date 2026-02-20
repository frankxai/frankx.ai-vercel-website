#!/bin/bash
# ACOS Repository Sync Script
# Syncs ACOS files to the public testing repository

set -e

ACOS_REPO_PATH="${ACOS_REPO_PATH:-/mnt/c/Users/Frank/acos-intelligence-system}"
SOURCE_PATH="/mnt/c/Users/Frank/FrankX"

echo "═══ ACOS Repository Sync ═══"
echo "Source: $SOURCE_PATH"
echo "Target: $ACOS_REPO_PATH"
echo ""

# Clone if not exists
if [ ! -d "$ACOS_REPO_PATH" ]; then
  echo "Cloning ACOS repository..."
  git clone git@github.com:frankxai/acos-intelligence-system.git "$ACOS_REPO_PATH"
fi

cd "$ACOS_REPO_PATH"

# Sync hooks
echo "Syncing hooks..."
mkdir -p hooks
cp -r "$SOURCE_PATH/.claude/hooks/"* hooks/ 2>/dev/null || true

# Sync skills
echo "Syncing skills..."
mkdir -p skills
cp -r "$SOURCE_PATH/.claude/skills/"* skills/ 2>/dev/null || true

# Sync commands
echo "Syncing commands..."
mkdir -p commands
cp -r "$SOURCE_PATH/.claude/commands/"* commands/ 2>/dev/null || true

# Sync monitor script
echo "Syncing monitor..."
mkdir -p scripts
cp "$SOURCE_PATH/scripts/acos-activity-monitor.mjs" scripts/ 2>/dev/null || true

# Sync image ops router scripts
echo "Syncing image ops..."
mkdir -p scripts/image-ops
cp -r "$SOURCE_PATH/scripts/image-ops/"* scripts/image-ops/ 2>/dev/null || true

# Sync image routing data
mkdir -p data/ai-ops
cp "$SOURCE_PATH/data/ai-ops/image-model-router.json" data/ai-ops/ 2>/dev/null || true

# Sync docs
echo "Syncing documentation..."
mkdir -p docs
cp "$SOURCE_PATH/docs/ACOS_MONITORING_GUIDE.md" docs/ 2>/dev/null || true
mkdir -p docs/ai-ops
cp "$SOURCE_PATH/docs/ai-ops/IMAGE_MODEL_ROUTING_2026.md" docs/ai-ops/ 2>/dev/null || true

# Create README if not exists
if [ ! -f "README.md" ]; then
  cat <<'EOF' > README.md
# ACOS Intelligence System v10.0

**Autonomous Creative Operating System** — Self-learning intelligence for Claude Code with safety guarantees.

## Features

- **Experience Replay**: Injects successful trajectories as context
- **Agent IAM**: Per-profile tool/directory scoping
- **Circuit Breaker**: Tracks failures, restricts on threshold
- **Self-Modify Gate**: Validates intelligence before config changes
- **Immutable Audit Trail**: JSONL logging of all tool use and decisions

## Intelligence Score: 93/100

From v8 (52) → v9.0 (65) → v9.3 (72) → v10.0 (93)

## Structure

\`\`\`
acos-intelligence-system/
├── hooks/          # Lifecycle hooks (SessionStart, PreToolUse, PostToolUse, Stop)
├── skills/         # 22 curated skills with auto-activation rules
├── commands/       # 40+ slash commands
├── scripts/        # Activity monitor and utilities
└── docs/           # Monitoring guide and architecture docs
\`\`\`

## Quick Start

### Monitor Live Activity

\`\`\`bash
npm install
npm run monitor  # Real-time hook/trajectory dashboard
\`\`\`

### Integration

1. Copy \`hooks/\` to your \`.claude/hooks/\`
2. Copy \`skills/\` to your \`.claude/skills/\`
3. Copy \`commands/\` to your \`.claude/commands/\`
4. Run \`npm run monitor\` to verify activation

## Documentation

- [Monitoring Guide](docs/ACOS_MONITORING_GUIDE.md)
- [Architecture Overview](docs/ARCHITECTURE.md) _(coming soon)_
- [Skill System](docs/SKILLS.md) _(coming soon)_

## License

MIT

---

**Built by [FrankX](https://frankx.ai)** — AI Architect & Creator
EOF
fi

# Create package.json if not exists
if [ ! -f "package.json" ]; then
  cat <<'EOF' > package.json
{
  "name": "acos-intelligence-system",
  "version": "10.0.0",
  "description": "Autonomous Creative Operating System with self-learning intelligence",
  "type": "module",
  "scripts": {
    "monitor": "node scripts/acos-activity-monitor.mjs --watch"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/frankxai/acos-intelligence-system.git"
  },
  "keywords": ["ai", "claude", "intelligence", "automation", "learning"],
  "author": "Frank",
  "license": "MIT"
}
EOF
fi

echo ""
echo "✅ Sync complete!"
echo ""
echo "Next steps:"
echo "1. cd $ACOS_REPO_PATH"
echo "2. git add -A"
echo "3. git commit -m 'sync: ACOS v10 files'"
echo "4. git push origin main"
