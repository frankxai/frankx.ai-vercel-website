# Makers of Light — governing record

_Created 2026-11-11. Public expression: `/makers-of-light` (`app/makers-of-light/`). Copy of record: `app/makers-of-light/content.ts`._

The line "Next gen of the makers of light" closes the chorus of _Vibe Gods of Arcanea_ (Suno id `83163f8a-bc3f-4f67-83e1-05c077472bd1`, created 2026-01-29, in `data/music/suno-catalog.json`). Frank adopted it as the founding philosophy for his work. The page states the commitments in public. This file holds the operating rule and the parts that are plans, so nobody mistakes a plan for a shipped system.

**Status of everything below:** commitments and target architecture. Nothing in the "Human and agent layer" section is verified as deployed. Check live source before repeating any of it as current state.

---

## The decision rule

Run both tests before choosing what to build, publish, buy, or automate.

1. Does this make the next generation more capable of creating a future worth living in?
2. Can we show that value, protect the people involved, and pay for the system?

A proposal that fails either test goes back. A proposal that passes the first and fails the second is a wish; one that passes the second and fails the first is a business with no reason to exist under this name.

"We are the vibe gods" is the energy of the music. "Makers of light" is the responsibility behind it. Keep both in the work: joy, humor, music, friendship, and people enjoying the making. Purpose language with the music removed is a failure of this document.

## The five commitments

Each has a check question. If the answer is no, the work is not done.

| Commitment | Check |
|---|---|
| Creation over consumption | Did the person leave with a finished piece of work? |
| Agency over dependency | Can they export everything and leave this week? |
| Abundance through cooperation | Who else got paid or got better because this shipped? |
| Intelligence with responsibility | Could we show them everything the system holds about them, and why? |
| Beauty with utility | Would they come back if nobody reminded them? |

Commercial consequence: people who meet this work should become more capable and more economically independent because it exists. That is the loyalty model. Engagement is a by-product.

## Reach and relationship

Planning targets, labelled as targets wherever they appear: 10M content views a year, 100K engaged people, 1K superfans. The 1K is the core objective. None of the three is measured reach or a forecast, and views count plays.

Community value does not depend on purchase. Buying, collaborating, learning for free, and building elsewhere all count as success.

## Who carries which part

| House | Job |
|---|---|
| Arcanea | Meaning, music, story, the cultural home |
| FrankX | Frank's own work in public, where trust is earned |
| GenCreator | Production and distribution for makers |
| Starlight Intelligence | Agents, knowledge, workflows, evidence |
| Agentic Income | Repeatable capabilities turned into business methods |

The first paid product is one change: a person arrives with an idea and leaves with a finished, owned, market-ready asset or offer. The platform waits for that to work.

## Rights

Every collaboration carries a creator-controlled rights record, agreed before work starts: attribution, ownership, source assets, license terms, AI contributions, collaborator permissions, revenue splits, permitted reuse.

- Creators can export their assets and the record.
- Community work enters model training or Arcanea canon only with written consent.
- Proprietary orchestration can stay private. Creator rights stay with the creator.

Not shipped: the record format.

## Knowledge and data rules

Four separately governed stores.

| Store | Holds | Rule |
|---|---|---|
| Humanity knowledge graph | Historical figures, ideas, works, discoveries, movements | Public evidence, licenses, provenance. Start from Wikidata and Wikipedia. |
| Cultural intelligence | Trends, communities, creative needs, public conversations | Aggregate and permitted data |
| Creator relationship graph | People who choose to join, their projects, skills, goals | Consent, export, deletion, access controls |
| Opportunity graph | Who can help whom, what needs solving, what can be built | Explainable matching, permission on both sides |

Refusals: mass harvesting of personal profiles, hidden psychological scoring, covert persuasion, and invented identities for people not yet born. For the future, model scenarios, demographic projections, and emerging needs. On social platforms, use official APIs, permitted public information, creator submissions, and aggregate analytics.

## The scorecard

Central metric: makers who shipped something they own.

| # | Measure | Evidence |
|---|---|---|
| 1 | People reached | Unique reach where available, retention, qualified engagement |
| 2 | People helped | Completed lessons, useful answers, problems solved |
| 3 | Creators activated | First published work, launched project, finished prototype |
| 4 | Economic value created | Creator earnings, sales, paid collaborations, hours saved |
| 5 | Trust and ownership | Rights clarity, successful exports, satisfaction, privacy incidents |
| 6 | Business sustainability | Revenue, contribution margin, retention, cost per activated creator |

Loop: Listen → Understand → Create → Distribute → Help → Measure → Learn → Improve.

No baseline exists yet. When numbers exist they go on `/makers-of-light` with their source.

## Human and agent layer (Starlight Intelligence)

This section belongs to the Starlight Intelligence System repo. It is recorded here because the philosophy page names it. Port it there as a named file with a PR; do not treat this copy as the engineering source.

Starlight's job is trusted cooperation between people and agents, and between agents. Five systems:

1. **Intelligence registry.** Own agents, outside agents, tools, models, services, collaborators. Each entry carries identity, owner, permissions, version, evidence of capability, cost, health.
2. **Agent communication network.** Task delegation, discovery, messaging, result exchange. MCP for tools and resources, A2A-style protocols between agents, durable queues for async work. No single model or vendor required.
3. **Collective learning and memory.** What was attempted, what worked, what failed, what it cost, what was verified. Versioned and searchable. Private knowledge isolated by tenant and permission.
4. **Trust, rights, and economic protocol.** Identity verification, scoped delegation, spending limits, IP provenance, licensing, audit trails, reputation from verifiable outcomes, dispute handling. A recommendation from another agent grants no access.
5. **Continuous opportunity engine.** Detect needs, match capabilities, propose collaborations, launch authorized workflows, measure, improve.

**Control plane and execution plane are separate.** The control plane knows which agents exist, which tasks matter, which budgets apply, and what is authorized. The execution plane runs work on whichever runtime fits. Agents do not run continuously; awareness comes from event streams, scheduled checks, durable state, and selective activation.

| Cadence | Responsibility |
|---|---|
| Event-driven | Incoming tasks, failures, opportunities, collaboration requests |
| Every minute | Queue, security, spend, and health checks where justified |
| Hourly | Consolidate evidence, research changes, detect blockers, prioritize |
| Daily | Ship approved improvements, evaluate outcomes, reconcile costs and IP records |
| Weekly | Retire weak agents, promote proven skills, review partnerships and economics |

**Mission contract, per agent:** owner, capabilities, authorized actions, budget, memory scope, success criteria, escalation policy, termination conditions. No anonymous agents, no unbounded recursive delegation, no silent cross-business access. For outside agents, trust is established per interaction; a published agent card is discovery, and proves neither identity nor permission.

**First product:** a trusted agent gateway. An authorized human or agent discovers, evaluates, and invokes one proven capability with transparent pricing and a verifiable result. The gateway is the transaction and trust boundary: workflows stay protected, the customer owns inputs and contractually defined outputs, payment and rights are explicit. Money fails closed (AGENTS.md, non-waivable).

**Next cycle delivers four artifacts:**

1. A canonical agent registry.
2. A signed, policy-checked delegation contract.
3. An event-driven operational ledger.
4. One externally callable paid capability with an end-to-end evaluation suite.

**Acceptance test:** an authorized outside agent discovers a Starlight capability, verifies its terms, receives permission, executes within budget, gets a useful result, and receives a verifiable receipt. The owner can inspect, revoke, and audit the transaction. Until this passes, adding agents adds operational complexity.

Scale order: agents we control, then trusted partners, then open discovery. Federated discovery and selective indexing; no central database of every agent identity.

Infrastructure recommendations (recommendations only): Cloudflare R2 for governed knowledge and assets, D1 or the existing relational database for operational records, vector retrieval for semantic discovery, GitHub for versioned architecture and policy, Notion or Drive as the editorial interface. Use what exists before adding a platform.

## Open decisions for Frank

- Which single capability goes behind the gateway first.
- Whether `/makers-of-light` gets a place in primary navigation or stays linked from `/the-future-we-choose` and the music surfaces.
- When the scorecard gets its first baseline, and from which analytics source.
