# AI Architect — moat and monetization

_Strategy proposal, 21 August 2026. Decisions here are proposals until Frank ratifies them.
Rates and program terms marked **[verify]** could not be fetch-checked from the build sandbox._

## The position

The moat is the free layer. One sentence carries the whole strategy:

> **The rubric travels; the judgement doesn't.**

Everything that travels — the field guide, the skill file, the browser review, the diagrams,
the report format — stays free, because a rubric is only worth something if it spreads, and a
paywall stops it spreading. What cannot travel is applying it to a system with real
constraints, real history, and a real team. That is the paid layer, and it needs no
engineering to sell: the free layer is its demonstration.

"Known as the world's best AI architect" is not a claim to print anywhere — it is an outcome
of three measurable loops below. The site never says it; the work has to.

## The three moat loops

| Loop | Mechanism | Measured by |
|---|---|---|
| **Citation** | The guide + blog are the source AI assistants quote for "AI architecture" questions (FAQ JSON-LD, primary-source discipline, dated verification lines) | Referrals from AI surfaces, branded search |
| **Residency** | The skill file lives inside other people's repositories. Every `/ai-architect-review` run re-anchors the vocabulary (four decisions, seven planes) to frankx.ai | Skill downloads (`/skills/…/SKILL.md` hits), `ai_architect_review_completed` events |
| **Distribution** | Templates published on Vercel's gallery and Railway's marketplace put the name on platforms with existing traffic | Template deploys, marketplace listing views |

The vocabulary is the actual asset. When "the four decisions" and "the seven planes" are how
people talk about the problem, every conversation routes here.

## Revenue ladder, ordered by effort

### 1. Railway template kickback — the literal "effortless" lane

Railway pays template authors a share of the usage costs of projects deployed from their
template **[verify current rate and terms at railway.com/templates before building]**. This is
the only channel on this list that is genuinely passive after day one.

Build one template: **the seven-plane starter** — the durable-runtime lane of the reference
as a one-click deploy. Composition:

- a worker process with a bounded agent loop (exit condition in code, per the guide)
- a queue + Postgres (durable state, idempotency keys)
- a stub MCP service behind narrow scopes
- an env template for the model gateway seam (bring-your-own key — the user's spend, not ours)

Effort: 1–2 focused days in a new public repository (needs a repo outside the current session
scope — `frankxai/ai-architecture-starters` or similar, Frank creates or authorizes).
Then it earns per deploy without touching it. The template README points back to the guide,
closing the distribution loop.

### 2. Vercel template gallery listing

Publish the same starter's request-scoped sibling (Next.js UI + gateway seam) to the Vercel
template gallery. No revenue share — the payment is distribution and the deploy button on a
page Vercel maintains. Effort: mostly the same repo, plus the gallery submission.

### 3. Productized review — the first real revenue

"The rubric, applied." A fixed-scope, fixed-price architecture review: Frank (or Frank +
agent) runs the skill against the client's actual repository and delivers the report plus a
one-hour walkthrough. The `/ai-architect` page already frames this honestly ("what is free,
and what is not") — the only addition needed is a request path (a `mailto:` or booking link;
no checkout build). Price it as advisory, not as a document.

The free browser review is the funnel: it ends by telling the user their review ran against
memory, not the codebase. The skill runs against the codebase. The paid tier runs against the
codebase *with judgement attached*.

### 4. Hosted agentic architect — phase 2, only after the above

A free hosted agent ("paste your repo, get a review") is buildable but is the one item here
with real marginal cost and real attack surface. Prerequisites, all non-negotiable, all from
the guide's own rules:

- a model gateway seam with a per-run budget capped in code, not in the prompt
- rate limiting per IP + a daily global spend ceiling
- the trust boundary: repository content is untrusted input; no tool with side effects
- keys Frank provisions (`AI_GATEWAY_API_KEY` path) — never shipped in a PR unreviewed

Cost envelope at small-model routing: order of $1–10 per thousand reviews depending on
context size **[verify against current gateway pricing]** — cheap, but not zero, and abuse
scales it. Ship it only when review-runner analytics prove demand, and ship it as the funnel
into tier 3, not as a product of its own.

### 5. Platform co-marketing — later, evidence first

Once template deploys exist, Railway and Vercel developer relations both amplify template
authors. Free distribution, but only after loops 1–2 produce numbers worth showing.

## What stays out

- **No paywall on the rubric, the skill, or the review runner.** Ever. That is the moat.
- **No countdown timers, no fake scarcity** — taste.md already bans them; the honest version
  of urgency here is "founder pricing on the first review cohort" if and only if it is true.
- **No "world's best" copy.** The claim is earned in other people's mouths or not at all.

## Immediate next actions

1. **Frank:** verify the Railway kickback terms; create/authorize the starters repository.
2. **Agent (on request):** build the seven-plane Railway starter + Vercel sibling in that repo.
3. **Agent (on request):** mirror `ai-architect-review` into `frankxai/claude-skills-library`
   as a pack, so it installs through the existing `install.sh` path alongside web-excellence.
4. **Frank:** pick the request path for tier 3 (booking link vs. mailto) — one line to add.
5. **Both:** revisit after 30 days of `ai_architect_review_completed` / skill-download data.
