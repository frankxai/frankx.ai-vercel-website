# FrankX Membership & Realm Blueprint

## Strategic Intent
- Position *FrankX Realm* as the connective tissue between free Creation Chronicles, premium intelligence drops, and high-touch agentic engagements.
- Deliver a guided, measurable journey from first signal (newsletter) to inner circle investment without fragmenting UX across brands.
- Maintain a single customer spine (Supabase + Stripe) so tiers, automation, and analytics remain coherent as new academies spin up.

## Experience Pillars
1. **Signal** – public content + Creation Chronicles newsletter establishing trust, cadence, and ethos.
2. **Activation** – paid Inner Circle unlocking vault, music rituals, and live ops (hosted inside Realm dashboard).
3. **Transformation** – premium programs (Creative AI Toolkit, Vibe OS, Agentic Creator OS) orchestrated via guided funnels.
4. **Alliance** – enterprise partnerships + bespoke agent teams with governance, reporting, and on-call support.

## Tier Architecture
| Tier | Promise | Core Access | Pricing Target | Success Metric |
| --- | --- | --- | --- | --- |
| **Signal (Free)** | Weekly Creation Chronicles + drop alerts | Newsletter, podcast feed, sample prompts | $0 | 35% open rate, 15% CTR |
| **Inner Circle ($29/mo or $290/yr)** | Private Realm vault with templates, Suno drops, live ritual labs | Notion/DB vault, gated Discord channels, monthly Q&A | LTV > $350 | 70% monthly active within first 60 days |
| **Launchpad ($297 one-time)** | Cohort-style onboarding into Creative AI Toolkit + Creation Chronicles systems | Guided 30-day sprint, office hours, accountability loops | ARPU $400 | 65% completion rate, 30% upsell to Inner Circle |
| **Alliance (Custom)** | Agentic Creator OS + enterprise AI governance | Supabase tenant, analytics dashboard, shared OKR board | $25k–$120k retainers | ROI >= 3x, governance scorecard passed |

## Infrastructure Stack
- **Auth & Profile**: Supabase (Email + OAuth), row-level security for tiered data. Use `profiles` table with `tier`, `stripe_customer_id`, `community_handle`.
- **Billing**: Stripe Checkout & Customer Portal. Products: `inner-circle-monthly`, `inner-circle-annual`, `launchpad`, `enterprise-retainer` (manual invoice).
- **Content Delivery**: Notion database synced via scheduled job (Supabase edge function) → static JSON for vault; for real-time editing consider Next.js app routes with on-demand revalidation.
- **Email & Automation**: Resend for transactional (welcome, OTP); ConvertKit/Customer.io for drips triggered by Supabase webhooks.
- **Community & Events**: Discord + automation (SaaS like Memberful bots) to map Stripe tier to role. Consider Luma for event scheduling.
- **Analytics & Telemetry**: PostHog for funnel + feature usage; Supabase storage for session logs; BigQuery (optional) for cross-brand analysis.

## Post-Purchase Journey
1. **Checkout Success** → Stripe webhook `checkout.session.completed` → Supabase function `sync_stripe_customer` updates tier, logs event.
2. **Welcome Email** (Resend): includes onboarding video, two quick wins, Discord invite.
3. **Realm Dashboard** (Next.js route `/realm`): contextualizes tier benefits, surfaces next action (watch primer, join live lab, download playbook).
4. **Cadences**:
   - Week 1: “Activation Sprint” – daily micro-briefs to ensure first success moment.
   - Week 2 onwards: Monday intelligence digest, Thursday prompt pack, Saturday ritual reflection.
   - Monthly: Inner Circle calibration call + drop roadmap preview.
5. **NPS & Churn Loop**: At day 45 send micro-survey; if risk flagged trigger agent follow-up and recommend new ritual path.

## Operational Workstreams
- **Vault Operations**: Owner – Content Ops. Weekly update to Notion database, monthly curation of “what’s new” block, automation to update `/realm` highlights.
- **Community Flow**: Owner – Community Lead. Discord onboarding script, event calendar, accountability pods.
- **Support & Escalation**: Intercom/HelpScout with response SLA (24h for Inner Circle, 4h for Alliance). Integrate knowledge base articles surfaced within `/realm` via searchable index.
- **Compliance & Governance**: For enterprise tiers ensure SOC2-ready data flow, DPA templates, and optional on-prem data segregation.

## Immediate Implementation Tasks
1. Provision Supabase project, configure Auth + profiles schema.
2. Build `/realm` protected route in Next.js with middleware reading Supabase session cookie.
3. Ship Stripe Checkout links + webhook handler (Next.js API route, add signature verification).
4. Draft onboarding emails + ConvertKit automations mapped to tiers.
5. Assemble vault initial drop (top 5 templates, 3 Suno tracks, playbook summary) and document monthly release calendar.
6. Define KPIs in PostHog: `realm_login`, `vault_asset_download`, `event_rsvp`, tie to dashboard.

## Dependencies & Risks
- Need GDPR-compliant handling for EU members (Supabase + Stripe covered; ensure privacy policy updated).
- Discord role automation requires server bots (consider `supa-discord-sync`).
- Notion API quotas; consider caching to Supabase `realm_assets` table.
- Support load: inner circle scaling beyond 150 members requires part-time community success agent.

## Next Milestones
- **M1 (2 weeks)**: Soft-launch Inner Circle to existing buyers; gather baseline metrics.
- **M2 (6 weeks)**: Public `/realm` landing + onboarding wizard; integrate Creation Chronicles gating for premium essays.
- **M3 (Q2 2025)**: Expand to multi-brand (AIArchitectAcademy, AIMusicAcademy) via shared Supabase tenant + brand-specific surface areas.
