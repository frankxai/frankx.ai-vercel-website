# FrankX.ai

**Elite Creator & AI Architect Platform**

![Next.js 16](https://img.shields.io/badge/Next.js-16.1-43BFE3?style=for-the-badge&logo=nextdotjs&logoColor=white&labelColor=0F172A)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-43BFE3?style=for-the-badge&logo=typescript&logoColor=white&labelColor=0F172A)
![ACOS](https://img.shields.io/badge/ACOS-v7.0-AB47C7?style=for-the-badge&labelColor=0F172A)
![Agents](https://img.shields.io/badge/Agents-40+-F59E0B?style=for-the-badge&labelColor=0F172A)
![Skills](https://img.shields.io/badge/Skills-630+-10B981?style=for-the-badge&labelColor=0F172A)

![FrankX Platform](public/images/readme-hero.png)

Modern creator platform with AI-powered content generation, multi-agent orchestration, and enterprise-grade architecture patterns. Powers [frankx.ai](https://frankx.ai).

---

## Live Site

| Hub          | URL                                             | Description                |
| ------------ | ----------------------------------------------- | -------------------------- |
| Homepage     | [frankx.ai](https://frankx.ai)                  | Elite creator value prop   |
| Products     | [/products](https://frankx.ai/products)         | Digital products & tools   |
| Blog         | [/blog](https://frankx.ai/blog)                 | AI tutorials & insights    |
| AI Architect | [/ai-architect](https://frankx.ai/ai-architect) | Enterprise AI patterns     |
| Music Lab    | [/music-lab](https://frankx.ai/music-lab)       | Suno AI & music production |
| Resources    | [/resources](https://frankx.ai/resources)       | Free downloads & templates |
| Links        | [/links](https://frankx.ai/links)               | Social links hub           |

## Tech Stack

| Layer     | Technology                                   |
| --------- | -------------------------------------------- |
| Framework | **Next.js 16.1** with App Router & Turbopack |
| Language  | TypeScript (strict mode)                     |
| Styling   | Tailwind CSS v4 + custom design tokens       |
| Content   | MDX with custom components                   |
| Hosting   | Vercel (Edge Functions, ISR)                 |
| Email     | Resend + React Email templates               |
| Analytics | Vercel Analytics + Plausible                 |
| AI        | Claude Code + ACOS skill system              |

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

**Deploy workflow (recommended):**

```bash
# 1. Develop in FrankX repo
# 2. Run local quality guards
npm run ci:check

# 3. Sync runtime files to production worktree and push
./scripts/sync-to-production.sh "feat: production sync"
```

Manual fallback:

```bash
# Preview drift
bash scripts/pre-deploy-sync-check.sh --diff

# Sync drifted runtime files
bash scripts/pre-deploy-sync-check.sh --sync

# Commit + push production repo
cd .worktrees/vercel-ui-ux
git add -A && git commit -m "sync: update from dev repo" && git push
```

## Products

| Product             | Price | Description                  |
| ------------------- | ----- | ---------------------------- |
| Vibe OS             | $37   | Life design system in Notion |
| Creative AI Toolkit | $47   | Prompt templates & workflows |
| Suno Prompt Library | $27   | 400+ music prompts           |
| ACOS                | $297+ | Multi-agent creator system   |
| Creation Chronicles | $497+ | Premium content course       |

## Performance Targets

| Metric     | Target |
| ---------- | ------ |
| Lighthouse | >90    |
| LCP        | <2.5s  |
| FID        | <100ms |
| CLS        | <0.1   |

## Brand

**Frank = Elite Creator + AI Architect**

- 500+ AI songs created
- Oracle AI Architect certified
- Enterprise-grade systems
- Humble excellence in execution

---

Built with Next.js 16, TypeScript, and Claude Code.

Copyright FrankX. All rights reserved.
