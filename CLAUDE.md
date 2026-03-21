# FrankX Claude Code Configuration v3.0

_Elite Creator. AI Architect. Humble Excellence._

---

## Quick Reference

| Action               | Command                       |
| -------------------- | ----------------------------- |
| Deploy to production | `/frankx-ai-deploy`           |
| Create blog post     | `/frankx-ai-blog`             |
| Full build session   | `/frankx-ai-build`            |
| Content pipeline     | `/frankx-ai-content-pipeline` |
| UI components        | `/frankx-ai-components`       |
| SEO optimization     | `/frankx-ai-seo`              |

---

## Production Deployment (READ FIRST)

**Content must be pushed to BOTH repos to go live.**

### Two-Repo Architecture

| Repo                                | Purpose             | Location                  |
| ----------------------------------- | ------------------- | ------------------------- |
| `frankxai/FrankX`                   | Private development | Main workspace            |
| `frankxai/frankx.ai-vercel-website` | **PRODUCTION**      | `.worktrees/vercel-ui-ux` |

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

| Production            | Private               |
| --------------------- | --------------------- |
| `app/`, `components/` | `.claude/`, `.agent/` |
| `content/`, `public/` | `docs/`, `research/`  |
| `lib/`, `data/`       | API keys, `.env`      |

**Verification:** https://frankx.ai | https://github.com/frankxai/frankx.ai-vercel-website

---

## Brand Positioning

**Frank = Top Creator. Top AI Architect. Humble.**

### Who Frank Is

- **AI Architect**: AI Architect at Oracle EMEA AI Center of Excellence. Enterprise-grade AI systems, agentic orchestration
- **Creator**: 12,000+ AI songs, music production, generative art, digital products
- **Builder**: Ships products, writes code, creates content that works
- **Bridge**: Builds AI CoE proposals for enterprises at Oracle — provides the same frameworks free on frankx.ai for individuals, creators, and families

### Core Narrative: The Personal AI CoE

The defining story: Frank builds AI Center of Excellence frameworks for Fortune 500 companies at Oracle. He realized the same 6-pillar architecture (Strategy, Governance, Talent, Technology, Data, Ethics) translates directly to personal use — at 1/5000th the cost. On frankx.ai, he makes enterprise-grade AI frameworks freely available to everyone.

- **ACOS** = the implementation of a personal AI CoE
- **GenCreator** = the creator-specific CoE application
- **Prompt Library** = the tool library within your CoE
- **Research Hub** = the knowledge foundation
- Title: "AI Architect" (never "AI Systems Architect")

### Brand Attributes

| Attribute     | Meaning                                       |
| ------------- | --------------------------------------------- |
| Excellence    | Every detail matters. Ultra high quality.     |
| Craftsmanship | Meticulous attention to design, code, copy.   |
| Humility      | Let the work speak. Results over claims.      |
| Depth         | Technical sophistication with creative flair. |

### Voice Guidelines

**DO:** Lead with results. Precise technical language. Show don't tell. Confident but understated.

**DON'T:** Spiritual language. Grandiose claims. Over-explain philosophy. Self-help guru tone.

---

## Global Skills Library (500+)

Skills are installed globally at `~/.agents/skills/` and available across all projects.

### Vercel/Next.js Stack

| Skill                             | Purpose                           |
| --------------------------------- | --------------------------------- |
| `vercel-react-best-practices`     | 40+ React optimization rules      |
| `vercel-composition-patterns`     | Component composition patterns    |
| `next-best-practices`             | Next.js App Router fundamentals   |
| `next-cache-components`           | Next.js 16 Cache Components & PPR |
| `next-upgrade`                    | Version migration guides          |
| `nextjs-advanced-routing`         | Complex routing patterns          |
| `nextjs-server-client-components` | RSC best practices                |
| `vercel-ai-sdk`                   | AI SDK integration                |

### Design & UI

| Skill                       | Purpose                  |
| --------------------------- | ------------------------ |
| `web-design-guidelines`     | Visual design principles |
| `baseline-ui`               | UI component patterns    |
| `shadcn-ui`                 | shadcn/ui integration    |
| `tailwind-css-patterns`     | Utility-first CSS        |
| `react-patterns`            | Component architecture   |
| `fixing-accessibility`      | WCAG 2.2 compliance      |
| `fixing-motion-performance` | Animation optimization   |
| `fixing-metadata`           | Meta & OG tags           |

### Development Patterns

| Skill                   | Purpose                   |
| ----------------------- | ------------------------- |
| `typescript-docs`       | TypeScript best practices |
| `nestjs`                | Backend patterns          |
| `api-design-principles` | API architecture          |
| `architecture-patterns` | System design             |
| `clean-code`            | Code quality              |

### AI & Agents

| Skill                         | Purpose             |
| ----------------------------- | ------------------- |
| `ai-agents-architect`         | Multi-agent design  |
| `autonomous-agents`           | Autonomous patterns |
| `agent-memory-systems`        | Memory management   |
| `langgraph-patterns`          | Graph workflows     |
| `prompt-engineering-patterns` | Prompt design       |

### SEO & Content

| Skill                    | Purpose              |
| ------------------------ | -------------------- |
| `seo-fundamentals`       | Core SEO principles  |
| `seo-content-writer`     | Content optimization |
| `seo-keyword-strategist` | Keyword research     |
| `schema-markup`          | Structured data      |
| `programmatic-seo`       | Scaled SEO           |

### Skill Management

```bash
# List installed skills
npx skills list -g

# Add new skill globally
npx skills add <owner/repo> -y -g

# Add to current project only
npx skills add <owner/repo> -y
```

---

## Agent Profiles

### 1. Technical Architect

```yaml
role: AI Systems Designer
skills:
  [
    vercel-react-best-practices,
    next-best-practices,
    architecture-patterns,
    ai-agents-architect,
  ]
focus: Enterprise AI, Oracle Cloud, agentic orchestration, technical docs
triggers: architecture, system design, backend, API
```

### 2. Music Producer

```yaml
role: AI Music Creation Specialist
skills: [suno-ai-mastery, suno-prompt-architect]
focus: Suno prompts, genre production, commercial licensing
triggers: suno, music, song, audio
```

### 3. Content Engine

```yaml
role: Content & Product Developer
skills: [frankx-brand, seo-content-writer, schema-markup]
focus: Blog articles, courses, products, SEO
triggers: article, blog, content, post
```

### 4. SEO Intelligence

```yaml
role: Search & Discovery Optimizer
skills: [seo-fundamentals, seo-keyword-strategist, schema-markup]
focus: AI citations, topic clusters, structured data
triggers: seo, keywords, rankings
```

### 5. Frontend Designer

```yaml
role: UI/UX Development Specialist
skills:
  [
    vercel-react-best-practices,
    web-design-guidelines,
    shadcn-ui,
    tailwind-css-patterns,
    fixing-accessibility,
  ]
focus: Glassmorphic design, accessibility, performance
triggers: component, design, ui, ux
```

### 6. DevOps Engineer

```yaml
role: Deployment & Infrastructure
skills: [vercel-deployment, docker-expert, github-actions-templates]
focus: Vercel deployments, CI/CD, monitoring
triggers: deploy, build, ci, pipeline
```

---

## Content Standards

### Quality Bar

- **Technical Accuracy**: Every claim verifiable
- **Clarity**: Complex ideas accessible without dumbing down
- **Utility**: Actionable, practical, immediately useful
- **Polish**: No typos, proper formatting, optimized images

### SEO Checklist

- [ ] TL;DR in first 100 words
- [ ] Question-based H2s
- [ ] FAQ section (5+ questions)
- [ ] Schema markup (Article + FAQPage)
- [ ] 3+ internal links
- [ ] Optimized meta title/description

---

## Decision-Making Principles

### Before ANY Structural Change

**STOP. Ask these questions FIRST:**

1. **What specific problem are we solving?**
   - Who experiences this problem?
   - What's the evidence?

2. **What's the simplest solution?**
   - Can we fix with config instead of restructuring?
   - Can we hide instead of delete?

3. **What could go wrong?**
   - SEO/backlink damage?
   - User confusion?
   - Irreversible data loss?

4. **Is this reversible?**
   - If not, get explicit approval

### Anti-Patterns to AVOID

| Bad Instinct                      | Better Approach                  |
| --------------------------------- | -------------------------------- |
| "60% reduction sounds impressive" | Does this help users?            |
| "Shorter URLs are better"         | Keep established URLs            |
| "Consolidate everything"          | Fix navigation, not routes       |
| "Delete orphan pages"             | Unlink from nav, keep page       |
| "Rename for consistency"          | Consistency isn't worth SEO loss |

### URL/SEO Rules: NEVER Without Approval

- Never rename working URLs
- Never delete pages with traffic
- Never "consolidate" by deletion
- "AI Architect" stays "AI Architect"

### The Prime Directive

**Don't optimize for impressive metrics. Optimize for actual outcomes.**

**When Frank says "consolidate routes" he means fix navigation, not delete pages.**

---

## Thinking Protocol

For complex tasks:

```markdown
## Pre-Action Checklist

- [ ] What problem? (specific, not vague)
- [ ] Who has it? (users, SEO, maintenance?)
- [ ] What's the evidence? (analytics, feedback, broken things?)
- [ ] Simplest fix? (not most impressive)
- [ ] What could go wrong? (SEO, users, irreversibility)
- [ ] Reversible? (if no, get approval)
- [ ] Metrics or outcomes?
```

---

## Session Logging

Log significant work to: `/mnt/c/Users/Frank/docs/AI_GLOBAL_SESSIONS.md`

**When to Log:** Content published, 3+ files modified, major decisions, features implemented.

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

## File Structure

```
FrankX/
├── .claude/
│   ├── agents/           # Agent definitions
│   ├── commands/         # Slash commands (40+)
│   ├── context/          # Decision framework, identity
│   ├── settings/         # Visual preferences
│   ├── skills/           # Local skill rules
│   └── hooks/            # Automation hooks
├── app/                  # Next.js App Router
├── components/           # React components
├── content/              # MDX content
│   └── blog/            # Blog articles
├── lib/                  # Utilities
├── public/               # Static assets
└── .worktrees/
    └── vercel-ui-ux/    # Production repo
```

---

## Sources

Skill repositories integrated:

- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) - Vercel official
- [vercel-labs/next-skills](https://github.com/vercel-labs/next-skills) - Next.js patterns
- [wsimmonds/claude-nextjs-skills](https://github.com/wsimmonds/claude-nextjs-skills) - Next.js evals
- [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) - 500+ skills
- [ibelick/ui-skills](https://github.com/ibelick/ui-skills) - UI patterns
- [giuseppe-trisciuoglio/developer-kit](https://github.com/giuseppe-trisciuoglio/developer-kit) - Dev tools

---

_Excellence in execution. Let the work speak._
