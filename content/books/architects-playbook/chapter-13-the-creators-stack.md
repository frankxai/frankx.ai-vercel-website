# The Creator's Stack

> "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away."
> — Antoine de Saint-Exupéry

---

Here is the complete technology stack that powers frankx.ai — a platform with 250+ production pages, 90+ articles, 15 books, 12,000+ songs, an education ecosystem serving four professional audiences, and an open-source operating system with seventy-five skills.

The monthly cost is fifty dollars.

---

## I. The Stack

```
COMPUTE + HOSTING
├── Vercel (Pro: $20/month)
│   ├── Next.js 16 App Router — 250+ pages, SSG + SSR
│   ├── Edge Functions — API routes, middleware
│   ├── Blob Storage — PDFs, music files, assets
│   ├── Analytics — traffic, Core Web Vitals
│   └── SpeedInsights — performance monitoring
│
├── Railway ($5/month)
│   ├── n8n — 9 automation workflows
│   └── Background services — cron jobs, webhooks
│
└── Cloudflare (Free)
    ├── DNS — domain management
    └── CDN — edge caching

AI LAYER
├── Claude Pro ($20/month)
│   ├── Claude Code — primary development tool
│   ├── Claude Chat — writing, analysis, research
│   └── MCP — 21 server connections
│
├── Suno (subscription)
│   └── Music generation — 12,000+ tracks
│
└── Nano Banana MCP (pay-per-use)
    └── Gemini 3 Pro Image — book covers, hero images

DATA
├── Supabase (Free tier)
│   ├── PostgreSQL — structured data
│   ├── Auth — NextAuth.js integration
│   └── Realtime — live updates
│
├── Vercel Blob (included in Pro)
│   ├── PDFs — 6 book downloads
│   ├── Music — 61 MP3 files
│   └── Products — digital assets
│
└── Git (Free)
    ├── GitHub — code + content version control
    └── 2 repos — dev + production

AUTOMATION
├── n8n (self-hosted on Railway)
│   ├── Content Atomizer — blog → social distribution
│   ├── Newsletter Engine — weekly dispatch via Resend
│   ├── Morning Brief — daily intelligence
│   ├── Mega Orchestrator — intent routing
│   └── 5 more workflows
│
└── Claude Code Hooks
    ├── Pre-commit — lint, format
    ├── Quality gates — brand voice, author name
    └── Session logging — trajectory capture

EMAIL
└── Resend (Free tier: 3K/month)
    ├── Newsletter — weekly dispatch
    ├── Welcome sequences — per-product onboarding
    └── Transactional — PDF delivery, confirmations

MONITORING
├── Vercel Analytics (included)
├── Vercel SpeedInsights (included)
└── n8n execution logs
```

---

## II. What Each Component Does

**Vercel** is the foundation. It hosts the Next.js application, serves 250+ statically generated pages, handles API routes through edge functions, stores binary assets in Blob storage, and provides analytics. The Pro tier at twenty dollars per month includes everything a creator needs — custom domains, unlimited bandwidth, team features, and production-grade infrastructure.

**Railway** runs the services that need to be always-on but do not need to be fast. n8n — the workflow automation platform — runs here, executing nine workflows that handle content distribution, newsletter generation, intelligence briefings, and system orchestration. Railway's pricing is usage-based; my nine workflows cost approximately five dollars per month.

**Claude Pro** is the intelligence layer. Claude Code is my primary development tool — used for writing code, creating content, generating books, and orchestrating deployments. Claude Chat handles analysis, research, and ideation. MCP connects Claude to twenty-one external services. Twenty dollars per month for the most capable AI system available.

**Supabase** provides the database and authentication layer. The free tier includes a PostgreSQL database, authentication via NextAuth.js, and real-time subscriptions. For a creator operation, the free tier is more than sufficient — my database stores user data, newsletter subscriptions, and content metadata.

**Resend** handles email. Three thousand emails per month on the free tier covers newsletter distribution, welcome sequences, and transactional messages (PDF delivery, purchase confirmations). The developer experience is excellent — React-based email templates that render consistently across clients.

**Git** provides version control for everything. Content, code, configuration, and planning documents are all version-controlled in two GitHub repositories — one private (development) and one public (production). This means every change is traceable, every mistake is reversible, and the entire system can be reconstructed from the repository alone.

---

## III. What This Stack Replaces

| Enterprise Tool | Monthly Cost | Creator Stack Equivalent | Monthly Cost |
|----------------|-------------|-------------------------|-------------|
| AWS/GCP hosting | $500-5,000 | Vercel Pro | $20 |
| Salesforce CRM | $300+ | Supabase + custom forms | $0 |
| Mailchimp/HubSpot | $100-500 | Resend | $0 |
| Zapier Pro | $49-299 | n8n on Railway | $5 |
| Adobe Creative Suite | $55-85 | Gemini Image + Suno | ~$5 |
| Contentful/Sanity CMS | $100-500 | MDX files in Git | $0 |
| DataDog/New Relic | $200-1,000 | Vercel Analytics | $0 |
| Notion/Confluence | $10-20/user | Markdown in Git | $0 |
| **Total** | **$1,300-7,400** | **Total** | **~$50** |

The ratio is approximately 1:100. The enterprise stack costs one hundred times more for similar capabilities at the individual scale.

---

## IV. The Design Principles

Five principles govern every technology decision in this stack:

**1. Managed over self-hosted.** If someone else will run the infrastructure, let them. Vercel manages hosting. Supabase manages the database. Resend manages email delivery. My job is to create, not to maintain servers.

**2. Free tiers are real products.** Supabase's free tier is not a demo — it is a production-grade PostgreSQL database. Resend's free tier is not a trial — it sends real emails. Vercel's free tier is not a toy — it hosts real websites. Use free tiers until you outgrow them. Most creators never will.

**3. Markdown is the universal format.** Every piece of content in this system is markdown — blog posts, book chapters, documentation, planning files. Markdown is human-readable, version-controllable, portable, and understood by every tool in the stack. No proprietary format locks. No migration costs. No vendor dependency.

**4. Git is the system of record.** If it is not in git, it does not exist. Code, content, configuration, and planning — all version-controlled. This means complete history, easy rollback, collaborative workflows, and the confidence that comes from knowing the system can be rebuilt from a single repository clone.

**5. AI handles the mechanical work.** The stack is designed to let AI do what AI does well — write code, generate content, automate workflows — while I do what I do well — make decisions, set direction, maintain quality standards, and create original work that no AI can produce from training data alone.

---

## V. Building Your Version

You do not need this exact stack. You need the principles.

Start with three components:
1. **A hosting platform** — Vercel (free tier)
2. **An AI tool** — Claude Pro ($20/month)
3. **Version control** — GitHub (free)

This gives you a website, an intelligence layer, and a system of record. Total cost: twenty dollars per month. Total capability: you can build, deploy, and iterate on any digital product.

Add components only when you need them:
- Need a database? Add Supabase (free)
- Need email? Add Resend (free)
- Need automation? Add n8n on Railway ($5/month)
- Need music? Add Suno (subscription)
- Need images? Add Nano Banana MCP (pay-per-use)

Each addition solves a specific problem. No addition is made speculatively. The stack grows as the work demands it, not as the technology marketing suggests.

The creator's stack is not about having more tools. It is about having the right tools, connected intelligently, at a cost that makes the work sustainable indefinitely.

Fifty dollars per month. Everything you need. Nothing you don't.
