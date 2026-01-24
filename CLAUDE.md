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

*Excellence in execution. Let the work speak.*
