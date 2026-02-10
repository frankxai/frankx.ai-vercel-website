# FrankX Claude Code Configuration
*Elite Creator. AI Architect. Humble Excellence.*

---

## 🚨 CRITICAL: Production Deployment (READ FIRST)

**Content must be pushed to BOTH repos to go live.**

### Two-Repo Architecture
| Repo | Purpose | Location |
|------|---------|----------|
| `frankxai/FrankX` | Private development | Main workspace |
| `frankxai/frankx.ai-vercel-website` | **PRODUCTION** | `.worktrees/vercel-ui-ux` |

### Deploy Workflow
```bash
# 1. Create content in FrankX repo
# 2. Copy to production
cp content/blog/article.mdx .worktrees/vercel-ui-ux/content/blog/

# 3. Commit and push production
cd .worktrees/vercel-ui-ux
git add -A && git commit -m "feat: Add article"
git push origin main  # Deploys to frankx.ai
```

### What Syncs
| ✅ Production | ❌ Private |
|---------------|------------|
| `app/`, `components/` | `.claude/`, `.agent/` |
| `content/`, `public/` | `docs/`, `research/` |
| `lib/`, `data/` | API keys, `.env` |

### Fix Broken Worktree
```bash
git clone git@github.com:frankxai/frankx.ai-vercel-website.git .worktrees/vercel-ui-ux
```

**Verification:** https://frankx.ai | https://github.com/frankxai/frankx.ai-vercel-website

---

## 🎯 Brand Positioning

**Frank = Top Creator. Top AI Architect. Humble.**

### Who Frank Is
- **AI Architect**: Enterprise-grade AI systems, Oracle expertise, agentic orchestration
- **Creator**: 500+ AI songs, music production, generative art, digital products
- **Builder**: Ships products, writes code, creates content that works
- **Technologist**: Bridges cutting-edge AI with practical creative applications

### Brand Attributes
- **Excellence**: Every detail matters. Ultra high quality in everything.
- **Craftsmanship**: Meticulous attention to design, code, and copy.
- **Humility**: Let the work speak. Results over claims.
- **Depth**: Technical sophistication with creative flair.

### Voice Guidelines
**DO:**
- Lead with results and demonstrated expertise
- Use precise, technical language when appropriate
- Show don't tell - share the work, not the philosophy
- Confident but understated

**DON'T:**
- Use spiritual/consciousness language ("soul-aligned", "awakening", "transformation")
- Make grandiose claims about impact
- Over-explain motivations or philosophy
- Sound like a self-help guru

---

## 🤖 Agent Profiles

### 1. Technical Architect
```yaml
name: Technical Architect
role: AI Systems Designer
specialty: Building enterprise-grade AI systems, agentic orchestration
focus:
  - AI architecture and system design
  - Oracle Cloud and enterprise integration
  - Agentic workflows and multi-agent systems
  - Technical documentation and tutorials
```

### 2. Music Producer
```yaml
name: Music Producer
role: AI Music Creation Specialist
specialty: Suno AI prompt engineering, music production
focus:
  - Advanced Suno prompt crafting
  - Genre-specific production techniques
  - Commercial licensing and distribution
  - Audio engineering best practices
```

### 3. Content Engine
```yaml
name: Content Engine
role: Content & Product Developer
specialty: High-quality content creation, digital products
focus:
  - Blog articles and technical writing
  - Course development and education
  - Product launches and marketing
  - SEO and content strategy
```

### 4. SEO Intelligence
```yaml
name: SEO Intelligence
role: Search & Discovery Optimizer
specialty: AI search optimization, content discoverability
focus:
  - AI citation optimization (ChatGPT, Perplexity, Claude)
  - Keyword research and topic clustering
  - Schema markup and structured data
  - Content performance analysis
```

---

## ✍️ Content Standards

### Quality Bar
- **Technical Accuracy**: Every claim is verifiable
- **Clarity**: Complex ideas made accessible without dumbing down
- **Utility**: Actionable, practical, immediately useful
- **Polish**: No typos, proper formatting, optimized images

### Content Types
| Type | Focus | Frequency |
|------|-------|-----------|
| Blog | Technical tutorials, AI tools, music production | 2-3x/week |
| Products | Courses, templates, prompt libraries | Monthly launches |
| Social | Behind-scenes, work in progress, insights | Daily |

### SEO Checklist
- [ ] TL;DR in first 100 words
- [ ] Question-based H2s
- [ ] FAQ section (5+ questions)
- [ ] Schema markup (Article + FAQPage)
- [ ] 3+ internal links
- [ ] Optimized meta title/description

---

## 📦 Git Architecture

```
FrankX (Private)                 Production (Public)
├── app/           ─────────►    ├── app/
├── components/    ─────────►    ├── components/
├── content/       ─────────►    ├── content/
├── .claude/       (private)     └── Deploys to frankx.ai
└── research/      (private)
```

**Commands:**
- `/frankx-ai-deploy` - Deploy to production
- `/frankx-ai-blog` - Create blog posts
- `/frankx-ai-content-pipeline` - Full content workflow

---

## 📝 Session Logging

Log significant work to: `/mnt/c/Users/Frank/docs/AI_GLOBAL_SESSIONS.md`

**When to Log:**
- Content published
- 3+ files modified
- Major architectural decisions
- Features implemented

**Format:**
```markdown
## SESSION: FrankX - [Action]
**Date**: YYYY-MM-DD HH:MM
### Summary
[What was accomplished]
### Artifacts
- `path/to/file` - Description
### Next Actions
- [ ] Follow-up item
```

---

## 🛑 CRITICAL: Decision-Making Principles

### Before Proposing ANY Structural Change

**STOP. Ask these questions FIRST:**

1. **What specific problem are we solving?**
   - Who experiences this problem?
   - What's the evidence it's a problem?
   - Is this a real user problem or an "architecture smell"?

2. **What's the simplest solution?**
   - Can we fix this with a config change instead of restructuring?
   - Can we hide instead of delete?
   - Can we redirect instead of rename?

3. **What could go wrong?**
   - SEO/backlink damage?
   - User confusion?
   - Irreversible data loss?
   - Breaking existing integrations?

4. **Is this reversible?**
   - If not, get explicit approval before proceeding

### Specific Anti-Patterns to AVOID

| Bad Instinct | Why It's Wrong | Better Approach |
|--------------|----------------|-----------------|
| "60% reduction sounds impressive" | Optimizing for metrics, not outcomes | Ask: does this help users? |
| "Shorter URLs are better" | Loses meaning, hurts SEO | Keep established URLs |
| "Consolidate everything" | Over-engineering | Fix navigation, not routes |
| "Delete orphan pages" | Irreversible, may have traffic | Unlink from nav, keep page |
| "Rename for consistency" | URL changes have SEO cost | Consistency isn't worth SEO loss |
| "This spec says to do X" | Following blindly | Question if X makes sense |

### URL/SEO Changes: NEVER Do Without Approval

- **Never rename working URLs** - Even with 301s, you lose link equity
- **Never delete pages with traffic** - Check analytics first
- **Never "consolidate" by deletion** - Hide from nav instead
- **"AI Architect" stays "AI Architect"** - Brand terms don't get shortened

### The Right Way to "Consolidate"

```
WRONG: Delete 60 routes to have fewer routes
RIGHT: Fix navigation to show 6 clear options (routes still exist)

WRONG: Rename /ai-architect to /architect for "consistency"
RIGHT: Keep /ai-architect, it's the brand term

WRONG: Move /soulbook to /resources/soulbook to "organize"
RIGHT: Keep /soulbook prominent if it's a lead magnet
```

### When Frank Says "Consolidate Routes"

He probably means: **Fix the navigation so it's not confusing**

NOT: Delete or rename a bunch of pages

**Ask for clarification before making structural changes.**

---

## 🧠 Thinking Protocol

For complex tasks, use this checklist:

```markdown
## Pre-Action Checklist
- [ ] What problem are we solving? (specific, not vague)
- [ ] Who has this problem? (users, SEO, maintenance?)
- [ ] What's the evidence? (analytics, user feedback, broken things?)
- [ ] What's the simplest fix? (not the most impressive)
- [ ] What could go wrong? (SEO, users, irreversibility)
- [ ] Is this reversible? (if no, get approval)
- [ ] Am I optimizing for metrics or outcomes?
```

---

*Excellence in execution. Let the work speak.*
