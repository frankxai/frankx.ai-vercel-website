# ACOS Creator Hub Architecture
*Private Development → Public Production Content Flow*

---

## The Problem

Creators need to:
1. **Draft content privately** before publishing
2. **Stage content** for review/polish
3. **Publish to production** when ready
4. **Separate brands** (FrankX, AI Architect Academy, Arcanea)
5. **Track inventories** across private and public

## The Solution: Dual-Repo Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     ACOS CREATOR HUB                                │
│              (Your Private Development Space)                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  📁 FrankX/ (Private Repo)                                         │
│  ├── .claude/              ← PRIVATE: Agent configs, commands      │
│  ├── .agent/               ← PRIVATE: Agent memory, state          │
│  ├── docs/                 ← PRIVATE: Strategy, notes, planning    │
│  ├── research/             ← PRIVATE: Research outputs             │
│  ├── backups/              ← PRIVATE: Backups                      │
│  │                                                                  │
│  ├── app/                  → SYNCS: Pages, routes                  │
│  ├── components/           → SYNCS: UI components                  │
│  ├── lib/                  → SYNCS: Utilities                      │
│  ├── content/              → SYNCS: Published content              │
│  │   ├── blog/             → SYNCS: Published articles             │
│  │   └── drafts/           ← PRIVATE: Unpublished drafts           │
│  ├── public/               → SYNCS: Public assets                  │
│  ├── data/                 → SYNCS: Inventories, configs           │
│  │                                                                  │
│  └── .worktrees/                                                    │
│      └── vercel-ui-ux/     → Production clone (frankx.ai)          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              │ sync-to-production.sh
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    PRODUCTION WEBSITE                               │
│              (Public Deployment Repo)                               │
├─────────────────────────────────────────────────────────────────────┤
│  📁 frankx.ai-vercel-website/                                       │
│  ├── app/                  ← From FrankX/app/                      │
│  ├── components/           ← From FrankX/components/               │
│  ├── lib/                  ← From FrankX/lib/                      │
│  ├── content/blog/         ← From FrankX/content/blog/             │
│  ├── public/               ← From FrankX/public/                   │
│  └── data/                 ← From FrankX/data/                     │
│                                                                     │
│  Deployed to: https://frankx.ai                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Content Status Flow

```
PRIVATE                    STAGING                    PUBLIC
(drafts/)                  (content/)                 (production)

┌──────────────┐          ┌──────────────┐          ┌──────────────┐
│   DRAFTS     │  review  │   READY      │  deploy  │  PUBLISHED   │
│              │ ───────► │              │ ───────► │              │
│ content/     │          │ content/     │          │ frankx.ai/   │
│ drafts/      │          │ blog/        │          │ blog/        │
│              │          │ (draft:false)│          │              │
└──────────────┘          └──────────────┘          └──────────────┘
```

### Status Definitions

| Status | Location | Visible on Site? | Description |
|--------|----------|------------------|-------------|
| `draft` | `content/drafts/` | ❌ No | Private work in progress |
| `staged` | `content/blog/` with `draft: true` | ❌ No | Ready for review, not published |
| `published` | `content/blog/` with `draft: false` | ✅ Yes | Live on frankx.ai |

---

## Folder Structure for ACOS Creators

### Root Level

```
creator-hub/
├── .claude/                  # PRIVATE - Claude Code configuration
│   ├── commands/             # Slash commands
│   ├── skills/               # Skill configurations
│   └── settings.json         # Claude settings
│
├── .agent/                   # PRIVATE - Agent runtime state
│   ├── memory/               # Persistent memory
│   └── context/              # Session context
│
├── docs/                     # PRIVATE - Internal documentation
│   ├── strategy/             # Business strategy
│   ├── planning/             # Weekly/monthly plans
│   └── research/             # Research outputs
│
├── content/                  # MIXED - Content by status
│   ├── drafts/               # PRIVATE - Work in progress
│   │   ├── blog/
│   │   ├── products/
│   │   └── courses/
│   └── blog/                 # PUBLIC - Published articles
│       └── *.mdx
│
├── data/                     # PUBLIC - Inventories and configs
│   └── inventories/
│       ├── creation-pipeline.json
│       ├── frankx/
│       ├── ai-architect-academy/
│       └── arcanea/          # Mark as private in index.json
│
├── app/                      # PUBLIC - Website pages
├── components/               # PUBLIC - UI components
├── lib/                      # PUBLIC - Utilities
├── public/                   # PUBLIC - Static assets
│
├── scripts/                  # PRIVATE - Automation scripts
│   ├── sync-to-production.sh
│   └── generate-blog-inventory.mjs
│
└── .worktrees/               # PRIVATE - Production repo clone
    └── vercel-ui-ux/
```

### Brand-Specific Content

```
content/
├── drafts/                   # PRIVATE - All brands' drafts
│   ├── frankx/
│   │   ├── blog/
│   │   └── products/
│   ├── ai-architect-academy/
│   │   ├── courses/
│   │   └── tutorials/
│   └── arcanea/
│       ├── lore/
│       └── chapters/
│
└── blog/                     # PUBLIC - Published FrankX articles
    └── *.mdx
```

---

## Inventory Sync Configuration

### data/inventories/index.json

```json
{
  "_description": "ACOS Content Inventory Index",
  "_lastUpdated": "2026-01-23",

  "brands": {
    "frankx": {
      "syncToProduction": true,
      "inventories": ["music", "blog-articles", "art", "videos", "social"]
    },
    "ai-architect-academy": {
      "syncToProduction": true,
      "inventories": ["courses", "tutorials", "resources"]
    },
    "arcanea": {
      "syncToProduction": false,
      "inventories": ["lore", "music", "art", "implementations"]
    }
  },

  "contentPaths": {
    "drafts": "content/drafts/",
    "published": "content/blog/",
    "assets": "public/"
  },

  "syncRules": {
    "include": [
      "app/",
      "components/",
      "lib/",
      "hooks/",
      "content/blog/",
      "public/",
      "data/inventories/frankx/",
      "data/inventories/ai-architect-academy/",
      "data/inventories/profiles.json",
      "data/inventories/index.json"
    ],
    "exclude": [
      ".claude/",
      ".agent/",
      "docs/",
      "research/",
      "backups/",
      "content/drafts/",
      "data/inventories/arcanea/",
      "scripts/",
      ".worktrees/"
    ]
  }
}
```

---

## ACOS Content Workflow

### 1. Create Draft

```bash
# Use guided creation command
/create-article

# Creates file at: content/drafts/frankx/blog/my-article.mdx
# Status: draft (not synced)
```

### 2. Polish & Review

```bash
# Polish the draft
/polish-content content/drafts/frankx/blog/my-article.mdx

# Preview locally
npm run dev
# Visit: http://localhost:3000/blog/my-article
```

### 3. Stage for Publication

```bash
# Move from drafts to content/blog
mv content/drafts/frankx/blog/my-article.mdx content/blog/my-article.mdx

# Update frontmatter: draft: false
```

### 4. Publish to Production

```bash
# Regenerate inventory
node scripts/generate-blog-inventory.mjs

# Sync to production and deploy
./scripts/sync-to-production.sh "feat: Add article - My Article Title"
```

---

## Creator Experience: New vs Existing Sites

### Scenario A: Creator with Existing Website

If you already have a website folder (e.g., `my-website/`):

```bash
# 1. Initialize ACOS in your existing project
cd my-website

# 2. Create ACOS folders
mkdir -p .claude/commands .claude/skills
mkdir -p content/drafts
mkdir -p data/inventories

# 3. Copy ACOS configuration files
# (These would come from an ACOS starter template)
cp -r /path/to/acos-template/.claude ./
cp -r /path/to/acos-template/data/inventories ./data/

# 4. Your site keeps working, ACOS adds:
#    - /content/drafts/ for private drafts
#    - /data/inventories/ for content tracking
#    - /.claude/ for commands and skills
```

### Scenario B: New Creator Starting Fresh

```bash
# 1. Clone ACOS Creator Starter
npx create-acos-hub my-creator-hub
# OR
git clone https://github.com/frankxai/acos-creator-starter my-creator-hub

# 2. Configure your brand
cd my-creator-hub
# Edit data/inventories/index.json with your brand info

# 3. Start creating
npm run dev
/acos  # Activate ACOS launcher
```

### Folder Structure Comparison

**Minimal ACOS Setup (Existing Site):**
```
my-website/
├── .claude/              # ADD: Agent commands
├── content/
│   ├── drafts/           # ADD: Private drafts
│   └── blog/             # EXISTING: Published content
├── data/
│   └── inventories/      # ADD: Content tracking
└── [your existing files]
```

**Full ACOS Hub (New Project):**
```
my-creator-hub/
├── .claude/              # Full agent configuration
├── .agent/               # Agent state
├── docs/                 # Strategy & planning
├── content/drafts/       # Private drafts
├── content/blog/         # Published content
├── data/inventories/     # Full inventory system
├── app/                  # Next.js pages
├── components/           # UI components
├── scripts/              # Automation
└── .worktrees/           # Production clone
```

---

## Commands for Content Status Management

### /move-to-staging

```bash
# Move draft to staging (content/blog with draft: true)
/move-to-staging content/drafts/frankx/blog/article.mdx
```

### /publish

```bash
# Set draft: false and sync to production
/publish content/blog/article.mdx
```

### /unpublish

```bash
# Move published article back to drafts
/unpublish content/blog/article.mdx
```

---

## Multi-Brand Content Routing

### Public Brands (Sync to Production)

**FrankX** (`data/inventories/frankx/`):
- Music inventory → frankx.ai/music
- Blog articles → frankx.ai/blog
- Products → frankx.ai/products

**AI Architect Academy** (`data/inventories/ai-architect-academy/`):
- Courses → frankx.ai/academy/courses
- Tutorials → frankx.ai/academy/tutorials
- Resources → frankx.ai/academy/resources

### Private Brands (Stay Local)

**Arcanea** (`data/inventories/arcanea/`):
- Lore → NOT synced (private world-building)
- Music → Cross-referenced in FrankX (public tracks only)
- Art → NOT synced
- Implementations → NOT synced

---

## Sync Script Enhancement

### Updated sync-to-production.sh

```bash
#!/bin/bash
# Respect index.json syncRules

# Read exclude patterns from index.json
EXCLUDES=$(cat data/inventories/index.json | jq -r '.syncRules.exclude[]' | sed 's/^/--exclude=/')

rsync -av --delete $EXCLUDES "$FRANKX_ROOT/" "$PROD_ROOT/"
```

---

## Summary: What Goes Where

| Content Type | Private Location | Public Location | Syncs? |
|--------------|------------------|-----------------|--------|
| Agent configs | `.claude/` | - | ❌ |
| Strategy docs | `docs/` | - | ❌ |
| Draft articles | `content/drafts/` | - | ❌ |
| Published articles | - | `content/blog/` | ✅ |
| Arcanea content | `data/inventories/arcanea/` | - | ❌ |
| FrankX inventory | - | `data/inventories/frankx/` | ✅ |
| Scripts | `scripts/` | - | ❌ |
| App pages | - | `app/` | ✅ |
| Components | - | `components/` | ✅ |
| Public assets | - | `public/` | ✅ |

---

## Next Steps

1. Create `content/drafts/` folder structure
2. Update `sync-to-production.sh` to respect syncRules
3. Create `/move-to-staging` and `/publish` commands
4. Build ACOS Creator Starter template for other creators

---

*Part of the FrankX Superintelligent Agent System*
