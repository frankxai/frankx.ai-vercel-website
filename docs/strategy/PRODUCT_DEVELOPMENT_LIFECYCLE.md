# Product Development Lifecycle
**Template Monetization System — Blueprint to Revenue**
**Last Updated:** 2026-02-14

---

## Overview

This document defines the complete lifecycle from designing an AI architecture blueprint
to generating recurring revenue through template sales and affiliate partnerships.

**Core principle:** Blueprints are free educational content (SEO + authority).
Templates and deploy buttons are the monetization layer.

---

## The Pipeline

```
1. BLUEPRINT          2. TEMPLATE           3. DEPLOY              4. REVENUE
(Free, SEO)           (Paid product)        (Affiliate buttons)    (Recurring)

Architecture doc  →   Production code   →   Railway deploy    →   15% kickback
Interactive diagram   GitHub template       Vercel deploy     →   $5/lead
Cost breakdown        Lemon Squeezy         n8n workflow      →   30% recurring
Implementation guide  License key           Better Stack      →   25% recurring
```

---

## Phase 1: Blueprint Creation

### What Goes In a Blueprint
| Element | Purpose | SEO Value |
|---------|---------|-----------|
| Problem/Solution framing | User intent match | H2 question keywords |
| Architecture diagram | Visual engagement | Image SEO, dwell time |
| Component breakdown | Technical depth | Long-tail keywords |
| Implementation steps | Actionable content | Featured snippets |
| Code examples | Developer trust | Code block rich results |
| Cost breakdown | Decision support | Comparison keywords |
| Use cases | ICP targeting | Industry + "AI" clusters |

### Blueprint Quality Bar
- [ ] Problem statement matches search intent
- [ ] Architecture diagram renders correctly
- [ ] Cost estimates are realistic (not aspirational)
- [ ] Code examples are runnable
- [ ] Implementation steps are actionable (not vague)
- [ ] At least 3 deploy platforms mapped

### SEO Target Keywords per Blueprint
| Blueprint | Primary Keyword | Monthly Search Volume |
|-----------|----------------|----------------------|
| Enterprise RAG Platform | "rag architecture production" | ~1.2K |
| Multi-Agent Code Assistant | "multi agent ai system" | ~800 |
| Content Platform | "ai content pipeline" | ~400 |
| Game Engine | "ai game engine architecture" | ~300 |
| Misinfo Guardian | "ai misinformation detection" | ~500 |

---

## Phase 2: Template Productization

### From Blueprint to Template
```
Blueprint (free)           Template (paid, $29-199)
─────────────────────     ──────────────────────────
Architecture overview  →  Full working codebase
Diagram + components   →  Docker/Railway configs
Code snippets          →  Complete modules + tests
Cost estimates         →  Terraform/IaC scripts
Implementation steps   →  README setup guide
```

### Template Package Contents
Every template includes:
1. **Source code** — Full repo, no obfuscation
2. **Deploy configs** — `railway.json`, `vercel.json`, `render.yaml`
3. **Environment setup** — `.env.example` with all required vars
4. **README** — Setup guide, architecture overview, customization tips
5. **Tests** — Basic test suite for core functionality
6. **License** — Commercial use permitted

### Pricing Strategy
| Tier | Price | What's Included | ICP |
|------|-------|-----------------|-----|
| Starter | $29-49 | Single-focus template, 1 deploy target | Solo devs |
| Professional | $79-99 | Multi-component, 2+ deploy targets | Startup CTOs |
| Enterprise | $199+ | Full platform, Terraform, team auth | Enterprise teams |

### Template Creation Workflow
```
1. Fork blueprint codebase into template repo
2. Add deploy configs (railway.json, vercel.json)
3. Write comprehensive README
4. Add .env.example with all vars
5. Test deploy to Railway + Vercel
6. Create Lemon Squeezy product + variant
7. Set variant ID in deploy-targets.json
8. Change template status to 'active'
9. Push to production
```

---

## Phase 3: Deploy Integration

### Platform Selection per Blueprint

| Blueprint | Railway | Vercel | n8n | Rationale |
|-----------|---------|--------|-----|-----------|
| Enterprise RAG | Backend services | Frontend dashboard | Ingestion workflows | Full-stack split |
| Multi-Agent | Agent services | — | Orchestration flows | Backend-heavy |
| Content Platform | — | Full-stack Next.js | Content automation | Vercel-native |
| Game Engine | Game services | — | Quest workflows | Compute-heavy |
| Misinfo Guardian | Processing pipeline | Dashboard | Alert workflows | Full-stack split |

### Deploy Button Configuration

Each blueprint in `data/deploy-targets.json` has:
```json
{
  "blueprintSlug": "enterprise-rag-platform",
  "deployTargets": [
    { "platform": "railway", "label": "Deploy Backend to Railway", "variant": "primary" },
    { "platform": "vercel", "label": "Deploy Frontend to Vercel", "variant": "secondary" },
    { "platform": "n8n", "label": "Import n8n Workflow", "variant": "outline" }
  ],
  "githubTemplateUrl": "https://github.com/frankxai/rag-starter-kit",
  "purchaseUrl": ""
}
```

### Affiliate Tracking

Referral codes injected at runtime via environment variables:
- `NEXT_PUBLIC_RAILWAY_REFERRAL_CODE` — Railway 15% + template kickbacks
- `NEXT_PUBLIC_N8N_AFFILIATE_ID` — n8n 30% for 12 months
- `NEXT_PUBLIC_VERCEL_AFFILIATE_ID` — Vercel $5/lead + 30%

GA4 custom event: `deploy_click` with dimensions `{platform, blueprint}`

---

## Phase 4: Revenue Streams

### Stream 1: Template Sales (Direct)
- **Platform:** Lemon Squeezy (5% + $0.50) or Polar.sh (4% + $0.40)
- **Delivery:** GitHub repo access + license key
- **Revenue:** $29-199 per sale, you keep 95-96%
- **Conversion rate target:** 1-2% of blueprint page visitors

### Stream 2: Deploy Affiliate Commissions (Recurring)
- **Railway:** 15% of referred customer invoices for 12 months
- **Railway Templates:** 15-25% kickback on ALL usage costs (lifetime)
- **n8n Cloud:** 30% of subscription for 12 months
- **Vercel:** $5/lead + 30% of Pro/Team for 6 months
- **Better Stack:** 25% for 12 months

### Stream 3: Content Affiliates (Embedded)
- **Blog posts:** Tool recommendations with affiliate links
- **Tutorials:** "How to deploy X on Railway" → affiliate button
- **Research pages:** Tool comparisons with tracked links

### Revenue Projection (Monthly)
| Stage | Template Sales | Deploy Affiliates | Content Affiliates | Total |
|-------|---------------|-------------------|-------------------|-------|
| Month 1 | $100 | $50 | $20 | $170 |
| Month 3 | $300 | $200 | $80 | $580 |
| Month 6 | $600 | $800 | $200 | $1,600 |
| Month 12 | $1,200 | $2,500 | $500 | $4,200 |

---

## ICP Alignment

### Who Visits Blueprint Pages
| Persona | Intent | Monetization Path |
|---------|--------|-------------------|
| **AI Engineer** (30%) | Building RAG/agent systems | Railway template deploy → kickbacks |
| **Startup CTO** (25%) | Evaluating architecture options | Pro template purchase ($99-199) |
| **Enterprise Architect** (20%) | Research + vendor evaluation | Better Stack for monitoring |
| **Solo Developer** (15%) | Quick start on side project | Free GitHub template → paid upgrade |
| **Student/Learner** (10%) | Learning AI architecture | Newsletter → future customer |

### Content-to-Revenue Mapping
```
                      ┌─── Deploy Button (affiliate) ──── $5-50/user/year
Blueprint (free) ─────┼─── Template Purchase (direct) ─── $29-199 one-time
                      └─── Newsletter Signup ───────────── Future conversion

                      ┌─── Deploy Button (affiliate) ──── $5-50/user/year
Tutorial Blog Post ───┤
                      └─── Tool Recommendation Link ───── 10-30% recurring

                      ┌─── Railway Template Click ─────── 15-25% kickback
n8n Workflow Page ────┤
                      └─── n8n Cloud Signup ────────────── 30% for 12 months
```

---

## Oracle Non-Compete Compliance

### Safe Platforms (App Layer / SaaS)
Railway, Vercel, n8n, Better Stack, Render, Polar.sh, Lemon Squeezy

### Excluded (IaaS Competitors)
AWS, GCP, Azure, DigitalOcean, Vultr, Linode, Hetzner

### Rule
All deploy buttons and affiliate links MUST go through the `affiliate-manager.ts`
registry which only contains Oracle-compatible entries. The AVOID list is documented
but never instantiated in code.

---

## Implementation Checklist

### Affiliate Signups (Manual, One-Time)
- [ ] Railway: Dashboard > Refer (instant approval)
- [ ] n8n: https://n8n.io/affiliates/ (PartnerStack, ~24h approval)
- [ ] Better Stack: https://betterstack.com/affiliates (~48h approval)
- [ ] Vercel/v0: https://partners.dub.co/v0 (~48h approval)
- [ ] Lemon Squeezy: Create store at lemonsqueezy.com
- [ ] Polar.sh: Create org at polar.sh (instant)

### Environment Variables to Set
```bash
# .env.local (private, never committed)
NEXT_PUBLIC_RAILWAY_REFERRAL_CODE=xxx
NEXT_PUBLIC_N8N_AFFILIATE_ID=xxx
NEXT_PUBLIC_VERCEL_AFFILIATE_ID=xxx
BETTERSTACK_AFFILIATE_ID=xxx
LEMON_SQUEEZY_API_KEY=xxx
LEMON_SQUEEZY_STORE_ID=xxx
LEMON_SQUEEZY_WEBHOOK_SECRET=xxx
POLAR_ACCESS_TOKEN=xxx
```

### Code Complete (This Session)
- [x] `types/affiliates.ts` — Extended with deploy types
- [x] `lib/affiliates/affiliate-manager.ts` — Real platforms + Oracle compliance
- [x] `components/deploy/DeployButtonGroup.tsx` — Reusable deploy buttons
- [x] `data/deploy-targets.json` — Blueprint-to-platform mapping
- [x] `app/blueprint/[slug]/page.tsx` — Deploy buttons integrated
- [x] `app/ai-architecture/templates/page.tsx` — Checkout-ready buttons

### Still Needed
- [ ] Create Lemon Squeezy products (6 templates)
- [ ] Create Railway templates (deploy configs in template repos)
- [ ] Create n8n workflow templates
- [ ] Set up webhook endpoint for Lemon Squeezy order fulfillment
- [ ] Record video walkthroughs per template
- [ ] Set up Discord support channel
- [ ] Create GitHub template repos (free tier)
- [ ] GA4 conversion tracking + funnel dashboards

---

## Files Reference

| File | Purpose |
|------|---------|
| `types/affiliates.ts` | Type definitions for affiliate + deploy system |
| `lib/affiliates/affiliate-manager.ts` | Affiliate registry with Oracle compliance |
| `lib/affiliates/link-builder.ts` | UTM link builder |
| `lib/affiliates/tracking.ts` | Click tracking (GA4 integration) |
| `lib/lemon-squeezy.ts` | Lemon Squeezy checkout + webhook verification |
| `components/deploy/DeployButtonGroup.tsx` | Deploy button UI component |
| `components/affiliates/AffiliateLink.tsx` | Generic affiliate link component |
| `data/deploy-targets.json` | Blueprint → platform → affiliate config |
| `data/ai-architecture/prototypes.json` | Blueprint definitions |
| `docs/strategy/AFFILIATE_MONETIZATION_STRATEGY.md` | Private monetization strategy |

---

*This document is living. Update as products ship and revenue data comes in.*
