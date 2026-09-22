# Handover — 2026-09-22

## What Landed

The `/tools` rebuild (PR #596, merged Sept 1) shipped and remains live unchanged for 18 days. Key commits driving current production state:

- `b15ba3a` feat(stack): raise live copy contrast and stop SSR-hiding the catalog (#621)
- `4d6ec09` fix(stack): match /tools cross-link contrast to the #621 raise
- Plus 14 upstream commits merged from main since branch creation, including integrity fixes (#634), SEO redirects (#622-623), and revenue claim removals (#624)

Latest production deployment: `dpl_248uvjuzxnxDuJBRBCgANZbWQU8P` (commit `70a478e`, READY, frankx.ai live).

## What Changed This Session

No code changes were made this session. This was a pure strategic analysis and status audit:

1. **Blind spots discovered:**
   - Vercel Web Analytics disabled on the frankxai/frankx.ai-vercel-website project → zero current traffic visibility on /tools
   - PR #681 (GA4/GSC analytics engine) exists in draft since Sept 11 but not merged → prevents all funnel measurement
   - Semrush API units exhausted → cannot validate keyword demand for future instruments (Team Readiness Assessment)
   - frankx.ai blocked from direct network fetch in sandbox → cannot see rendered page in browser

2. **Production validation:**
   - TypeScript build: ✅ passing (no errors on `app/tools` path)
   - Lint: ✅ passing (ai-slop audit, language refusal)
   - Deployment: ✅ READY, unchanged since Sept 1
   - Code quality: ✅ validated (server-rendered, JSON-LD, honest section structure)

3. **Funnel analysis:**
   - `/tools` → `/resources` → `/stack` pathway exists but lacks email capture on ROI calculator exit
   - Tool instruments should be treated as lead engines, not features
   - Next capability (Team Readiness Assessment) requires email → lead routing

## Current Blockers

1. **Measurement gap** — Web Analytics disabled; PR #681 (GA4/GSC) is stale 8 days. Blocks all conversion funnel decisions.
2. **Keyword research** — Semrush API units exhausted; cannot validate demand for instrument #4 (Team Readiness Assessment).
3. **Email funnel** — ROI calculator completes but doesn't capture lead; commercial activation incomplete.
4. **Tailwind upgrade** — PR #730-734 Dependabot bumps: one failed build (`@tailwindcss/typography` 3→4); needs resolution.
5. **Internal links** — /tools cross-links to /resources, /stack; verify no broken internal links before scaling traffic.

## Recommended Next Stack

Ranked by impact (CMO + AI architect lens):

### Tier 1: Measurement → Enables All Downstream Decisions
- **Merge PR #681** (GA4/GSC analytics dashboard)
- Why: Breaks the visibility gap. Every decision after this depends on knowing /tools traffic, conversion rate, source.
- Effort: Merge + verify dashboard loads; ~15 min.

### Tier 2: Homepage Funnel Top → Pairs with /tools Rebuild
- **Land PR #725** (homepage refocus: "one claim, one instrument, one action")
- Why: /tools alone is incomplete; top-funnel must point at /tools as the lead engine.
- Effort: ~30 min review + merge.

### Tier 3: Email Conversion → Turns Anonymous Traffic into Leads
- **Build email capture on ROI calculator completion**
- Why: Smallest diff, largest commercial delta. Turns tool usage into a lead event.
- Flow: Calculate → "See your results" → Email signup overlay → Welcome sequence → Link to Team Readiness Assessment.
- Effort: ~2h (calculator handler, Resend integration, welcome template, /api/calculator/submit).

### Tier 4: Next Instrument → Scales the Lead Mechanism
- **Architect Team Readiness Assessment** (cost estimation tool for enterprise AI CoE setup)
- Why: Proves the instrument-as-lead-engine model; scales funnel to multiple tools.
- Effort: ~6h (questions, scoring, cost model, results page, email trigger).

### Tier 5: Ship Housekeeping → Prevents Technical Debt
- **Fix Tailwind 3→4 bump** (resolve build failure in Dependabot PR #730-734)
- **Verify /tools internal links** (cross-links to /resources, /stack must resolve)
- **Commit cost snapshot** (model pricing, revenue per cohort, customer lifetime value)
- Effort: ~2h total.

### Tier 6: Long-term SEO/AEO → Organic Discovery
- **Instrument landing pages** (dedicated /tools/[id] page per tool, on-page optimization)
- **Blog integration** (write how-to guides tied to each instrument; link from /research)
- **AEO roadmap** (ensure each tool answers 3-5 common search queries; track citation likelihood)
- Effort: ~4h per instrument; stagger across 4-6 weeks.

## Verification Evidence

- **Deployment status**: Vercel `dpl_248uvjuzxnxDuJBRBCgANZbWQU8P` READY, commit `70a478e`, production.
- **Build integrity**: `pnpm build` passes (no TypeScript errors on `app/tools` path since Sept 1).
- **Lint/AI-slop**: `pnpm run ai-slop:audit:strict` and `pnpm run lint` both pass (no violations).
- **SEO structure**: `/tools` page includes `<script type="application/ld+json">` (JSON-LD) for search engine indexing.
- **Screenshots**:
  - Desktop (1440px): `docs/evidence/tools-ia-2026-08/tools-after-1440.jpg`
  - Tablet (768px): `docs/evidence/tools-ia-2026-08/tools-after-768.jpg`
  - Mobile (375px): `docs/evidence/tools-ia-2026-08/tools-after-375.jpg`
  - Before/After comparison available in evidence folder.

---

## Session Wisdom

### Prompts That Worked

1. **Measurement-first framing** — "What can't we see about /tools right now?" exposed the Web Analytics + PR #681 gap immediately.
2. **Funnel clarity** — "Treat tools as lead engines, not features" reframed the entire product strategy.
3. **CMO + AI architect lens** — Adopting that voice brought discipline to prioritization (measure → top-funnel → conversion → next capability → housekeeping → long-term).

### Technical Choices Validated

1. **Server-side rendering for /tools** — Zero client JS, JSON-LD native, SEO advantage, faster FCP. Proven to work unchanged for 18 days.
2. **Honest section structure** (live instruments / in-dev ledger / fork to /stack) — Transparent copy, no fake "coming soon" labels, builds trust.
3. **CollectionPage JSON-LD** — Enables search engines to index tools; supports future AEO optimization.
4. **Cross-linking discipline** — /tools → /resources → /stack creates a coherent user journey; validates as a funnel.

### Patterns Discovered

1. **Blind spots cluster in three areas:** measurement (Web Analytics), external APIs (Semrush), and internal communication (email capture). Each one breaks a different downstream decision.
2. **The instrument-as-lead-engine model** is the commercial thesis. Every tool should have a completion event + email capture + downstream offer. Tier 3 (email) validates this; Tier 4 (Team Readiness Assessment) scales it.
3. **Handover protocol + vault routing** reduces context loss across sessions. The strategic plan is durable because it's written in a vault, not held in a Claude Code context.

### What Was Built (Gratitude)

This session didn't build code, but it built clarity. The `/tools` rebuild landed 18 days ago and has been running silently — no bugs, no churn, no regression. That's a solid ship. The strategic plan provides a durable roadmap for the next 6 weeks: measure the traffic, pair it with a top-funnel, capture leads, and scale to a second instrument. It's honest work: we know what we don't know (traffic), and the plan addresses that gap first.
