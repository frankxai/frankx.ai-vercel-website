# FrankX.ai Product Development Blueprint

## Mission
Create a product organization that turns vision into launch-ready systems with predictable cadence and measurable outcomes. Every squad knows its charter, hand-offs, and telemetry so agents can jump in and ship without friction.

## Org Structure
| Group | Charter | Key Outputs | Lead Agents |
| --- | --- | --- | --- |
| Product Strategy Guild | Set narrative arcs, price ladders, sequencing of launches | Product roadmap, opportunity briefs, pricing experiments | Visionary, Strategist, Market Intelligence Agent |
| Product Pods | Build and evolve a single offer end-to-end (research → assets → launch) | Feature specs, assets, release notes, customer feedback loops | Pod Product Owner, Builder Agent, Guardian Agent |
| Experience & Funnel Engineering | Maintain reusable funnels, analytics, and design system | Shared components, tracking plans, A/B experiments | Engineer, Design Agent, Analytics Steward |
| Agent Systems & Automation | Ship automations, agent templates, orchestration workflows | n8n blueprints, Supabase functions, agent health dashboards | Automation Architect, QA Guardian |
| Lifecycle & Community Ops | Operate Creation Chronicles, Inner Circle, support, and community rituals | Editorial calendar, support SLAs, retention metrics | Content Ops, Community Success Agent |

## Product Pod Operating System
Each product pod owns one offer and lives inside **docs/pods/<product>.md**.

**Standard Pod Roles**
- **Product Owner** – prioritises work, maintains pod backlog, interfaces with Strategy Guild.
- **Research Lead** – surfaces user insight, validates demand, runs interviews.
- **Builder Agent** – ships product assets (code, prompts, automations) with specs.
- **Guardian** – QA, accessibility, structured data, performance checks.
- **Launch Captain** – coordinates GTM, emails, social drops, Creation Chronicles tie-ins.

**Core Rituals**
- **Weekly Shiproom** (30m): review metrics, blockers, next drops.
- **Backlog Grooming** (bi-weekly): refine upcoming work, retire stale items.
- **Post-Launch Retro**: record learnings, update SSOT, log analytics in **docs/DAILY_INTELLIGENCE_OPERATIONS.md**.

## Cadence & Operating Rhythm
1. **Monday Ship Brief** – Strategy Guild circulates a one-page brief summarising priorities and metrics.
2. **Daily Build Loops** – Pods work in 90-minute loops, logging context-heavy updates in their README.
3. **Wednesday Atlas Sync** – cross-pod checkpoint to realign funnels, Creation Chronicles narrative, and support load.
4. **Friday Demo & Retro** – demo shipped assets, capture data, queue Creation Chronicles recap.
5. **Monthly Roadmap Review** – revisit **data/specs-roadmap.json**, adjust launch sequencing, archive completed experiments.

## Shared Artifacts
- **data/products.json** – single source of truth for product metadata.
- **docs/pods/<product>.md** – pod charter, KPIs, current focus, and team roster.
- **docs/pods/<product>-backlog.md** – living backlog + decisions, reviewed every Monday shiproom.
- **docs/agents/** – capabilities, inputs, outputs, and triggers for every specialist agent.
- **docs/ROADMAP_AUTOMATION.md** – automation and reporting harness.
- **docs/DAILY_INTELLIGENCE_OPERATIONS.md** – daily log of shipped drops and pending actions.
- **app/realm/page.tsx** – Inner Circle surface referenced by home hero and Creation Chronicles.

## Implementation Checklist
- [ ] Create or update pod README & backlog.
- [ ] Define success metrics (conversion, retention, velocity) with baselines.
- [ ] Ensure CTA tracking events exist (see **lib/analytics.ts**) for key actions.
- [ ] Automate status pings (Supabase/Discord/Notion) so pods know when briefs update.
- [ ] Document support plans & SLAs before each launch.

## Launch Readiness Definition
A pod may ship when:
1. Customer story, offer copy, and structured data are complete.
2. Funnel instrumentation (CTA, waitlist, purchase) is tracked and verified.
3. QA checklist passes (design systems, accessibility, performance, device matrix).
4. Support + community updates are written and scheduled.
5. Post-launch observation plan is logged (analytics queries, feedback forms).

## Appendices
- **Pod Template**: see **docs/pods/_TEMPLATE.md**.
- **Agent Index**: see **Agent.md** for current roster and responsibilities.
- **Cadence Calendar**: maintain shared calendar link in Notion (link TBD).
