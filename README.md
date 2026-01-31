# FrankX.ai - Elite Creator & AI Architect Platform

Modern creator platform built on Next.js 16 with AI-powered content generation, multi-agent orchestration, and enterprise-grade architecture patterns. Powers [frankx.ai](https://frankx.ai).

## Live Site

| Hub | URL | Description |
|-----|-----|-------------|
| Homepage | [frankx.ai](https://frankx.ai) | Elite creator value prop |
| Products | [/products](https://frankx.ai/products) | Digital products & tools |
| Blog | [/blog](https://frankx.ai/blog) | AI tutorials & insights |
| AI Architect | [/ai-architect](https://frankx.ai/ai-architect) | Enterprise AI patterns |
| Music Lab | [/music-lab](https://frankx.ai/music-lab) | Suno AI & music production |
| Resources | [/resources](https://frankx.ai/resources) | Free downloads & templates |
| Links | [/links](https://frankx.ai/links) | Social links hub |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | **Next.js 16.1** with App Router & Turbopack |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 + custom design tokens |
| Content | MDX with custom components |
| Hosting | Vercel (Edge Functions, ISR) |
| Email | Resend + React Email templates |
| Analytics | Vercel Analytics + Plausible |
| AI | Claude Code + ACOS skill system |

## AI-Powered Development

This site is built and maintained with **Agentic Creator OS (ACOS)** - a multi-agent system for content creation and site development.

### Key Commands

```bash
# Content generation
/infogenius          # Research-grounded visual generation
/superintelligence   # Deep analysis for complex decisions
/article-creator     # Blog post generation pipeline
/suno-prompt         # Music prompt engineering

# Development
/code-review         # Automated code review
/verify-deploy       # Deployment verification
/planning-with-files # Structured task planning
```

### Skill System

40+ specialized skills organized into pillars:
- **Creative**: Content, music, visuals
- **Technical**: Architecture, development, DevOps
- **Business**: Strategy, products, marketing
- **Personal**: Productivity, learning
- **System**: Orchestration, planning, memory

## Architecture

```
app/                    # Next.js App Router pages
├── products/           # Product landing pages
├── blog/               # Blog with MDX content
├── ai-architect/       # Enterprise AI hub
├── music-lab/          # Music production hub
├── resources/          # Downloads & templates
└── api/                # API routes

components/             # React components
├── ui/                 # Design system primitives
├── sections/           # Page sections
├── home/               # Homepage variants
└── blog/               # Blog components

content/                # MDX content
├── blog/               # 50+ articles
└── guides/             # Resource guides

lib/                    # Utilities
├── blog.ts             # Blog utilities
├── prompts.ts          # Prompt library (400+)
└── team-members.ts     # AI team definitions

public/                 # Static assets
├── images/             # Optimized images
└── reading/            # Generated reading site
```

## Development

```bash
# Install
npm install

# Dev server (localhost:3000)
npm run dev

# Quality checks
npm run lint && npm run type-check

# Production build
npm run build

# Preview production
npm run start
```

## Deployment

Two-repo architecture for security:

```
FrankX (Private)                    Production (Public)
├── .claude/         ─── private
├── research/        ─── private
├── app/             ───────────►   ├── app/
├── components/      ───────────►   ├── components/
├── content/         ───────────►   ├── content/
└── public/          ───────────►   └── public/
```

**Deploy workflow:**
```bash
# 1. Develop in FrankX repo
# 2. Copy to production worktree
cp -r content/blog/* .worktrees/vercel-ui-ux/content/blog/

# 3. Commit and push
cd .worktrees/vercel-ui-ux
git add -A && git commit -m "feat: update" && git push
```

## Products

| Product | Price | Description |
|---------|-------|-------------|
| Vibe OS | $37 | Life design system in Notion |
| Creative AI Toolkit | $47 | Prompt templates & workflows |
| Suno Prompt Library | $27 | 400+ music prompts |
| ACOS | $297+ | Multi-agent creator system |
| Creation Chronicles | $497+ | Premium content course |

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse | >90 |
| LCP | <2.5s |
| FID | <100ms |
| CLS | <0.1 |

## Brand

**Frank = Elite Creator + AI Architect**

- 500+ AI songs created
- Oracle AI Architect certified
- Enterprise-grade systems
- Humble excellence in execution

---

Built with Next.js 16, TypeScript, and Claude Code.

Copyright FrankX. All rights reserved.
