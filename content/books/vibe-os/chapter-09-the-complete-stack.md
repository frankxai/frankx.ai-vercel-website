# The Complete Stack — Architecture Reference

> "Simplicity is the ultimate sophistication."
> — Leonardo da Vinci

---

## I. The Architecture Map

This chapter is the technical reference for the complete Vibe OS stack. Every tool, every service, every cost, every connection — documented in a single chapter.

Print this. Bookmark this. Reference this when building your own stack.

---

## II. The Stack Diagram

```
┌─────────────────────────────────────────────┐
│              CREATOR (You)                  │
│         Vision · Taste · Judgment           │
├─────────────────────────────────────────────┤
│           COMPUTE LAYER                     │
│  Claude Code ($20/mo) · Suno · Gemini       │
├─────────────────────────────────────────────┤
│         APPLICATION LAYER                   │
│    Next.js 16 (App Router) · React · MDX    │
├─────────────────────────────────────────────┤
│          DELIVERY LAYER                     │
│     Vercel ($20/mo) · Vercel Blob           │
├─────────────────────────────────────────────┤
│            DATA LAYER                       │
│   Supabase (Free/$25) · GitHub (Free)       │
├─────────────────────────────────────────────┤
│        AUTOMATION LAYER                     │
│   n8n on Railway ($7/mo) · 25 workflows     │
├─────────────────────────────────────────────┤
│        INTEGRATION LAYER                    │
│    21 MCP Servers · Custom tools            │
├─────────────────────────────────────────────┤
│       COMMUNICATION LAYER                   │
│   Resend (Free) · Slack · Newsletter        │
└─────────────────────────────────────────────┘
```

---

## III. Cost Summary

| Layer | Service | Plan | Monthly Cost |
|-------|---------|------|-------------|
| Compute | Claude Pro | Pro | $20.00 |
| Delivery | Vercel | Pro | $20.00 |
| Data | Supabase | Free | $0.00 |
| Data | GitHub | Free | $0.00 |
| Automation | n8n (Railway) | Starter | $7.00 |
| Communication | Resend | Free (3K/mo) | $0.00 |
| Domain | IONOS | Annual | ~$1.00 |
| **TOTAL** | | | **~$48.00/mo** |

**Enterprise equivalent cost:** $450K-1.15M/year for comparable output capacity with human team.

**Cost ratio:** 1:780 (monthly) to 1:24,000 (annually, including human labor costs).

The $48/month stack does not produce identical output to the enterprise team. It produces comparable output per person — one creator with this stack produces at the rate of 5-10 enterprise team members working without AI.

---

## IV. Service Details

### Claude Code

**Role:** Primary AI compute. Code generation, content drafting, research, analysis, agent orchestration.

**Configuration:**
- CLAUDE.md at project root (identity, architecture, rules)
- Skill files in `.claude/skills/` (domain expertise)
- Agent profiles in `.claude/agents/` (role definitions)
- Commands in `.claude/commands/` (workflow shortcuts)

**Key capabilities:**
- Read and write files on the local filesystem
- Execute bash commands
- Call MCP tools (21 servers configured)
- Maintain conversation context (1M tokens)
- Spawn sub-agents for parallel work

**Cost optimization:** Use Sonnet for routine tasks, Opus for complex reasoning. The CLI defaults to the optimal model for most tasks.

### Vercel

**Role:** Application hosting, serverless functions, blob storage, analytics.

**Configuration:**
- `next.config.mjs`: App Router config, image optimization, output file tracing excludes
- `vercel.json`: Redirects, headers, function configuration
- Environment variables: API keys, database URLs, secrets

**Key capabilities:**
- Git-push deployment (commit to main → automatic production deploy)
- Preview deployments for every PR
- Serverless functions (API routes)
- Blob storage for PDFs, music, product files
- Edge functions for latency-sensitive operations
- Analytics (Web Vitals, page views, referrers)

**Limits:** 250MB serverless function size. Mitigate with `outputFileTracingExcludes` in next.config.mjs.

### Supabase

**Role:** PostgreSQL database, authentication, real-time subscriptions.

**Configuration:**
- Row-Level Security policies for data access control
- Database schema: subscribers, products, purchases, content_signals
- Auth: email/password + OAuth providers

**Key capabilities:**
- Full SQL with PostGIS, full-text search, JSON columns
- Real-time subscriptions via WebSocket
- Auto-generated REST and GraphQL APIs
- Built-in auth with JWT tokens

### n8n

**Role:** Workflow automation. 25 active workflows handling content distribution, email sequences, monitoring, and orchestration.

**Deployment:** Self-hosted on Railway (~$7/month).

**Key workflows:**
1. Content Atomizer: blog → social → newsletter
2. Email Nurture: 3-email welcome sequence
3. Music Catalog Sync: daily Suno check
4. Morning Brief: AI-curated intelligence report
5. RSS Monitor: content feed tracking

**Webhook pattern:** Always set `httpMethod: "POST"`, always include `webhookId`, deactivate/reactivate after workflow updates.

### Resend

**Role:** Transactional and marketing email.

**Configuration:**
- React Email templates in `/email-templates/`
- DNS records: SPF, DKIM, DMARC for deliverability
- API key in Vercel environment variables

**Key capabilities:**
- React-based email templates (JSX → cross-client HTML)
- Transactional email (welcome, delivery, confirmation)
- Newsletter sending
- Analytics (opens, clicks, bounces)

### MCP Servers (21 configured)

**Development cluster:** GitHub, Vercel, Playwright, Supabase
**Content cluster:** Nano Banana (image generation), Resend, Memory
**Automation cluster:** n8n, Sequential Thinking
**Intelligence cluster:** Figma, Linear, Notion, Slack, Canva, v0

**Memory budget:** ~600MB-1.7GB for all 21 servers. On 12GB RAM, maintain a maximum of 3 concurrent Claude Code sessions.

---

## V. The Two-Repo Architecture

| Repo | Purpose | Location |
|------|---------|----------|
| `frankxai/FrankX` | Private development | Main workspace |
| `frankxai/frankx.ai-vercel-website` | Production | `.worktrees/vercel-ui-ux` |

**Workflow:**
1. Develop in FrankX (private)
2. Copy production files to worktree
3. Commit and push from worktree
4. Vercel auto-deploys from production repo

**What syncs to production:** `app/`, `components/`, `content/`, `public/`, `lib/`, `data/`
**What stays private:** `.claude/`, `.agent/`, `docs/`, `research/`, `.env`, API keys

**Git worktree setup:**
```bash
cd /mnt/c/Users/Frank/FrankX
git worktree add .worktrees/vercel-ui-ux \
  --track -b main origin/main
```

---

## VI. The Build Verification Flow

1. **TypeScript check:** `npx tsc --noEmit` (~60 seconds, catches type errors)
2. **ESLint:** Runs automatically on commit via lint-staged
3. **Vercel build:** Push to main → Vercel builds → check via Vercel MCP or dashboard
4. **Production verification:** Visit frankx.ai → verify pages render correctly

**Do not run `npm run build` locally on WSL/NTFS.** The I/O overhead makes builds take 15+ minutes. Use `tsc --noEmit` for type checking and Vercel for full builds.

---

## VII. Deploying Your Own Stack

If you are building your own Vibe OS stack from scratch:

**Hour 1:** Create a Next.js project. Deploy to Vercel. Verify it works.

**Hour 2:** Add a Supabase project. Connect to Next.js. Create the subscriber table.

**Hour 3:** Configure Resend. Add DNS records. Build a welcome email template.

**Hour 4:** Set up Claude Code. Write your CLAUDE.md. Install 5 essential MCP servers.

**Hour 5:** Deploy n8n to Railway. Create your first automation (new subscriber → welcome email).

**Hour 6:** Write your first piece of content. Publish it. Distribute it. Log it.

Six hours. One sitting. From zero to a fully operational creator infrastructure.

The tools are ready. The configuration is documented. The architecture is proven.

Build your stack. Ship your work. Let the infrastructure compound.

The $50 architecture is waiting.

Build it.
