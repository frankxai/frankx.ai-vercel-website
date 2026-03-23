# FrankX Content Workflow

## Repository Architecture

```
/mnt/c/Users/Frank/FrankX/                    # Main FrankX Repo
├── content/blog/                             # Draft/staging area (18 posts)
├── content-universe/                         # Content creation system
├── soulbook/                                 # Book content
├── docs/                                     # Documentation
│
└── FrankX.AI - Vercel Website/               # Production Website (separate git repo)
    ├── content/blog/                         # Production blog (33 posts)
    ├── app/                                  # Next.js pages
    ├── components/                           # UI components
    └── (deployed to frankx.ai via Vercel)
```

## Two-Repo Model

| Repo | Purpose | Git Remote |
|------|---------|------------|
| **FrankX (main)** | Archive, drafting, staging, all content ideas | `frankxai/FrankX.git` |
| **Vercel Website** | Production website, deploys to frankx.ai | `frankxai/frankx.ai-vercel-website.git` |

## Content Flow

```
DRAFT (Main Repo) → STAGE → PUBLISH (Vercel Repo) → DEPLOY (frankx.ai)
```

### 1. Draft Content

Work in the main FrankX repo:
```bash
cd /mnt/c/Users/Frank/FrankX

# Create draft blog post
# Use content-universe or manually create in content/blog/
```

### 2. Polish & Review

Use the available commands:
```bash
/frankx-ai-blog           # Create blog article
/polish-content           # Refine voice (FrankX brand)
/review-content           # Review before publishing
```

### 3. Publish to Production

Sync approved content to the Vercel website:
```bash
# Option A: Use the publish script
node scripts/publish-to-vercel.js --sync

# Option B: Manual copy
cp content/blog/article.mdx "FrankX.AI - Vercel Website/content/blog/"
```

### 4. Deploy

```bash
cd "FrankX.AI - Vercel Website"
git add .
git commit -m "feat(blog): Add new article"
git push origin staging    # Preview at staging URL
# After testing:
git push origin main       # Deploy to production
```

Or use the command:
```bash
/frankx-ai-deploy
```

## Available Commands

### Website Commands (in .claude/commands/)

| Command | Purpose |
|---------|---------|
| `/frankx-ai-daily` | Daily intelligence operations |
| `/frankx-ai-build` | Comprehensive build session |
| `/frankx-ai-blog` | Create and publish blog articles |
| `/frankx-ai-content-pipeline` | End-to-end content workflow |
| `/frankx-ai-deploy` | Deploy to Vercel |
| `/frankx-ai-seo` | SEO optimization |
| `/frankx-ai-products` | Update product pages |
| `/frankx-ai-prompts` | Manage prompt library |
| `/frankx-ai-components` | UI component development |
| `/frankx-ai-analytics` | Performance analysis |

### Global Commands

| Command | Purpose |
|---------|---------|
| `/polish-content` | Refine content with FrankX voice |
| `/generate-images` | Create images via Nano Banana |
| `/generate-social` | Create social media content |
| `/review-content` | Review and approve content |

## Branches

### Main FrankX Repo
- `main` - Stable archive
- `feature/*` - Feature development

### Vercel Website
- `main` - Production (auto-deploys to frankx.ai)
- `staging` - Preview/testing

## Quick Reference

### Check Status
```bash
# Main repo
cd /mnt/c/Users/Frank/FrankX
git status

# Vercel website
cd "FrankX.AI - Vercel Website"
git status
```

### Sync Content
```bash
node scripts/publish-to-vercel.js        # List ready files
node scripts/publish-to-vercel.js --sync # Sync all approved
```

### Full Publish Cycle
```bash
/frankx-ai-content-pipeline   # Complete end-to-end workflow
```

---

*Last updated: 2026-01-13*
