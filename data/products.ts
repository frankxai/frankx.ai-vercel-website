/**
 * Source-of-truth product catalog for the Build Your First AI Agent funnel.
 *
 * Pattern mirrors data/workshops.ts. Pages, pricing tables, schema.org markup,
 * and Lemon Squeezy configs all read from this registry.
 *
 * Add a product → all surfaces update. Single source of truth.
 */

export type ProductTier = 'free' | 'pack' | 'toolkit' | 'mastery' | 'architect' | 'founders'

export interface ProductInclusion {
  /** Short label (e.g. "Pocket book"). */
  label: string
  /** What it actually is — one sentence. */
  description: string
  /** Optional: which lower tier this was added at (for the "everything below plus" display). */
  introducedAt?: ProductTier
}

export interface ProductPricing {
  /** Display amount in euros. 0 for free. */
  eur: number
  /** Optional USD mirror for international display. */
  usd?: number
  /** "lifetime" for one-time, "subscription" if recurring. */
  cadence: 'lifetime' | 'subscription' | 'application'
  /** Lemon Squeezy variant ID — populated after product is created in dashboard. */
  lemonSqueezyVariantId?: string
}

export interface Product {
  slug: string
  tier: ProductTier
  /** Short title (40 chars max). */
  title: string
  /** One-line subtitle. */
  subtitle: string
  /** "Yellow text under price" hook. */
  hook: string
  pricing: ProductPricing
  /** Single-paragraph positioning — who it's for, in their words. */
  positioning: string
  /** Honest "this is not for you if..." list — clarity > broad appeal. */
  notFor: string[]
  /** 3-5 outcomes the buyer leaves with — specific and testable. */
  outcomes: string[]
  /** Itemized inclusions — what you actually receive. */
  includes: ProductInclusion[]
  /** Optional bonus stack — listed after main inclusions. */
  bonuses?: ProductInclusion[]
  /** Single-sentence guarantee statement. */
  guarantee: string
  /** Refund window in days. Standard: 30. */
  refundDays: number
  /** Time from purchase → access. */
  delivery: 'instant' | 'staged' | 'cohort' | 'application-review'
  /** Whether Frank's involvement is required for value delivery. */
  decoupledFromFrank: boolean
  /** Estimated Frank time per buyer per quarter. */
  frankTimePerBuyerPerQuarter: string
  /** Visual accent color (matches Tailwind palette). */
  color: 'cyan' | 'violet' | 'amber' | 'emerald' | 'rose' | 'zinc'
  /** Recommended for stage of funnel. */
  funnelStage: 'top' | 'mid' | 'bottom' | 'premium'
  /** Primary CTA text. */
  ctaText: string
  /** Secondary CTA text (optional). */
  secondaryCtaText?: string
  /** "Most popular" badge for hub-page emphasis. */
  featured?: boolean
  /** Hard limit on seats — for Founder's Circle real-scarcity. */
  seatsPerQuarter?: number
}

export const products: Product[] = [
  {
    slug: 'six-primitives-primer',
    tier: 'free',
    title: 'Six Primitives Primer',
    subtitle: 'Free 8-page handout + 10-day email course',
    hook: 'No card. No login. Just useful.',
    pricing: { eur: 0, cadence: 'lifetime' },
    positioning:
      'You are curious about AI agents. You have read enough opinions; you want a clean mental model. The Primer gives you the six primitives (model, tool, memory, loop, spec, deploy) and a daily nudge for ten days while the framework lands.',
    notFor: [
      'Builders who already shipped 5+ agents — start at the Pack',
      'Teams shopping for enterprise pilots — go to /architects',
    ],
    outcomes: [
      'Name the six primitives without notes',
      'Diagram an agent loop in 60 seconds',
      'Decide which framework to start with based on the transfer matrix',
    ],
    includes: [
      {
        label: 'The Six Primitives handout',
        description: '8-page PDF reference. Print it, pin it, photograph it. CC-BY-SA.',
      },
      {
        label: '10-day email primer course',
        description: 'One short, opinionated email per day. Each one teaches one primitive with code samples and a tiny exercise.',
      },
      {
        label: 'Public starter repo on GitHub',
        description: 'MIT-licensed reference implementation. Clone and ship in 10 minutes.',
      },
      {
        label: 'One Agent Card template',
        description: 'A validated Google A2A Agent Card you can adapt for a research-assistant agent.',
      },
    ],
    guarantee: 'Reciprocity. If a primer helps you, you owe attention — not money.',
    refundDays: 0,
    delivery: 'instant',
    decoupledFromFrank: true,
    frankTimePerBuyerPerQuarter: '0 minutes',
    color: 'zinc',
    funnelStage: 'top',
    ctaText: 'Get the free primer',
  },
  {
    slug: 'six-primitives-pack',
    tier: 'pack',
    title: 'Six Primitives Pack',
    subtitle: 'The pocket book + the templates that make a first agent ship cleanly',
    hook: 'A polished, opinionated bundle for the price of a coffee.',
    pricing: { eur: 7, usd: 8, cadence: 'lifetime' },
    positioning:
      'You read the Primer and you want the polished version — the pocket book that fits your bag, the Agent Card library you can fork, the eval cases you can copy. The Pack is the convenience tier: it removes friction so you ship.',
    notFor: [
      'Teams building 10+ agents in production — go to the Toolkit',
      'Anyone who hasn\'t read the free Primer — read it first',
    ],
    outcomes: [
      'Read a structured 60-page pocket book on the six primitives',
      'Fork a 5-card Agent Card library (research, support, scheduling, sales qual, code review)',
      'Run a 15-case eval suite with judge templates',
      'Deploy to Vercel with a one-page checklist',
    ],
    includes: [
      {
        label: 'Everything in the free Primer',
        description: 'Handout PDF, 10-day email course, public starter, one Agent Card.',
        introducedAt: 'free',
      },
      {
        label: 'The Six Primitives — the pocket book',
        description: '60-page polished PDF + EPUB. The full mental-model reference, organized for re-reading.',
        introducedAt: 'pack',
      },
      {
        label: '5-Card Agent Card library',
        description: 'Validated A2A cards for research, support triage, scheduling, sales qualification, code review.',
        introducedAt: 'pack',
      },
      {
        label: 'Eval cases starter library — 15 cases',
        description: 'Success / edge / refusal cases across the five Agent Card domains, with judge templates.',
        introducedAt: 'pack',
      },
      {
        label: 'Vercel deploy checklist',
        description: 'One-page reference. Take a working agent from laptop to public URL with auth + observability.',
        introducedAt: 'pack',
      },
      {
        label: '30-day email follow-up',
        description: 'Case studies, common mistakes, what to build next. Less marketing, more craft.',
        introducedAt: 'pack',
      },
    ],
    guarantee: '30-day no-questions refund. If the Pack doesn\'t earn the €7 back in clarity, you don\'t pay for it.',
    refundDays: 30,
    delivery: 'instant',
    decoupledFromFrank: true,
    frankTimePerBuyerPerQuarter: '0 minutes',
    color: 'cyan',
    funnelStage: 'mid',
    ctaText: 'Buy the Pack — €7',
    secondaryCtaText: 'Read the free Primer first',
    featured: false,
  },
  {
    slug: 'six-primitives-toolkit',
    tier: 'toolkit',
    title: 'Six Primitives Toolkit',
    subtitle: 'Branch deep-dives, production patterns, and the community of builders shipping agents',
    hook: 'The workhorse tier. Most buyers stop here and get years of value.',
    pricing: { eur: 197, usd: 215, cadence: 'lifetime' },
    positioning:
      'You ship agents. You want the cookbook of patterns that separates demos from production. You want six branch deep-dives so you can re-implement the same agent on Claude / OpenAI / Google ADK / no-code / AI-builds-AI / Oracle. You want a community of practitioners — not a Discord full of beginners.',
    notFor: [
      'Curious readers who haven\'t shipped a first agent — start with the Pack',
      'Enterprise teams needing governance + compliance — go to Architect',
      'Solo founders looking for 1:1 strategic AI advisory — Founder\'s Circle',
    ],
    outcomes: [
      'Re-implement the same research-assistant agent on six different stacks',
      'Apply 50+ production patterns from a structured cookbook',
      'Run a 100-case eval harness across multiple agents',
      'Stand up observability that catches runaway loops + cost spikes',
      'Ship faster because 30+ Agent Cards cover most production use cases',
    ],
    includes: [
      {
        label: 'Everything in the Pack',
        description: 'Pocket book, 5-card library, 15-case evals, Vercel checklist, 30-day email.',
        introducedAt: 'pack',
      },
      {
        label: '6 branch deep-dive videos',
        description: '20-30 min each: Vercel AI SDK, Claude Agent SDK + MCP, OpenAI Agents + AgentKit, Google ADK + A2A, no-code (n8n/Notion/Dify), AI-builds-AI (Claude Code).',
        introducedAt: 'toolkit',
      },
      {
        label: '30+ Agent Card library',
        description: 'Validated A2A cards covering most common production use cases — research, support, scheduling, ops, sales, marketing, devops, finance, legal.',
        introducedAt: 'toolkit',
      },
      {
        label: 'Production patterns cookbook',
        description: '50 patterns, ~120 pages. Memory architectures, tool design, retry/backoff, cost management, observability, refusal patterns.',
        introducedAt: 'toolkit',
      },
      {
        label: 'Eval cookbook — 100 cases',
        description: 'Success, edge, refusal, multi-step orchestration, multi-agent handoff. Judge templates for each.',
        introducedAt: 'toolkit',
      },
      {
        label: 'Observability templates',
        description: 'Langfuse + OpenTelemetry + Grafana dashboards for agent traces, costs, and latency.',
        introducedAt: 'toolkit',
      },
      {
        label: 'Cost-tracking spreadsheet',
        description: 'Multi-provider — track Anthropic + OpenAI + Google spend per session, per agent, per customer.',
        introducedAt: 'toolkit',
      },
      {
        label: 'Discord community access — 90 days',
        description: 'Practitioners shipping agents. Code review, intros, real questions. €19/mo after to keep access (cancel anytime).',
        introducedAt: 'toolkit',
      },
      {
        label: 'Private GitHub access',
        description: 'Commercial templates not in the public repo — Agent Card variants, deploy scripts, eval extensions.',
        introducedAt: 'toolkit',
      },
    ],
    guarantee: '30-day no-questions refund. Built on the Starlight Intelligence Protocol — the foundation is open and free; what you pay for is curation, depth, and time saved.',
    refundDays: 30,
    delivery: 'instant',
    decoupledFromFrank: true,
    frankTimePerBuyerPerQuarter: '~5 minutes (community moderation, monthly)',
    color: 'cyan',
    funnelStage: 'mid',
    ctaText: 'Get the Toolkit — €197',
    secondaryCtaText: 'See what\'s in the Pack first',
    featured: true,
  },
  {
    slug: 'six-primitives-mastery',
    tier: 'mastery',
    title: 'Six Primitives Mastery',
    subtitle: 'Cohort, code review queue, advanced patterns — for consultants and senior practitioners',
    hook: 'For builders whose hour rate makes the Toolkit pay back in a week.',
    pricing: { eur: 497, usd: 540, cadence: 'lifetime' },
    positioning:
      'You build agents for clients or your team — multiple per quarter. You need patterns for multi-agent orchestration, MCP server building, vector + typed-KV memory, and a code-review queue that catches what your AI assistant misses. Mastery adds a structured 6-week cohort, an AI-assisted code-review queue, and lifetime access to the office-hours archive.',
    notFor: [
      'Solo learners who haven\'t shipped 1+ agent yet — start with the Pack or Toolkit',
      'Enterprise architects needing governance frameworks — Architect tier',
    ],
    outcomes: [
      'Run multi-agent orchestrations with explicit state machines',
      'Build a custom MCP server and expose it to Claude Code',
      'Architect agent memory across short-term, working, and long-term boundaries',
      'Submit 3 agents per quarter for AI-assisted code review',
      'Design + ship a custom Agent Card per month with rationale',
    ],
    includes: [
      {
        label: 'Everything in the Toolkit',
        description: 'All branches, 30+ cards, 100-case evals, observability, community.',
        introducedAt: 'toolkit',
      },
      {
        label: '6-week structured cohort',
        description: 'Recorded — works async. Live cohorts run quarterly with limited seats.',
        introducedAt: 'mastery',
      },
      {
        label: 'Code review queue — 3 reviews per quarter',
        description: 'AI-reviewed first against Frank\'s pattern library; sanity-checked async by Frank. Results within 5 business days.',
        introducedAt: 'mastery',
      },
      {
        label: 'Office Hours recordings library',
        description: 'New recordings added monthly. Lifetime access — your archive grows even if you stop attending live.',
        introducedAt: 'mastery',
      },
      {
        label: 'Advanced patterns deep-dives',
        description: 'Multi-agent orchestration, MCP server building, agent memory architectures (vector DB + typed KV).',
        introducedAt: 'mastery',
      },
      {
        label: 'Custom Agent Card consulting — 1 per month',
        description: 'Submit a spec. AI agent + Frank\'s pattern library produce a custom Card with rationale and validation report.',
        introducedAt: 'mastery',
      },
      {
        label: 'Lifetime Discord + GitHub access',
        description: 'No subscription — paid once, kept forever. Toolkit\'s 90-day window upgraded to lifetime.',
        introducedAt: 'mastery',
      },
      {
        label: 'Certificate of completion',
        description: 'Signed; useful for LinkedIn, consulting bios, internal team-lead applications.',
        introducedAt: 'mastery',
      },
    ],
    guarantee: '30-day no-questions refund. After day 30, refund pro-rated against cohort progress (rare — most buyers complete and retain).',
    refundDays: 30,
    delivery: 'staged',
    decoupledFromFrank: true,
    frankTimePerBuyerPerQuarter: '~15 minutes (group cohort calls, recorded)',
    color: 'violet',
    funnelStage: 'bottom',
    ctaText: 'Buy Mastery — €497',
    secondaryCtaText: 'Compare with the Toolkit',
  },
  {
    slug: 'six-primitives-architect',
    tier: 'architect',
    title: 'Six Primitives Architect',
    subtitle: 'AI Center of Excellence in a box — for lead architects and CTOs',
    hook: 'The day-job framework that Frank ships at Oracle EMEA — yours to use.',
    pricing: { eur: 997, usd: 1080, cadence: 'lifetime' },
    positioning:
      'Your problem isn\'t "how do I build an agent." Your problem is "how do I roll agents into a 500-person engineering org with governance, compliance, and a clear executive narrative." The Architect tier is Frank\'s actual day-job framework: a 6-pillar AI Center of Excellence (Strategy, Governance, Talent, Technology, Data, Ethics) that translates from large-enterprise AI pilots to your team. The same framework. 1/5000th the consultancy price.',
    notFor: [
      'Solo builders without organizational scope — Mastery is the right tier',
      'Founders looking for 1:1 strategic AI advisory — Founder\'s Circle',
    ],
    outcomes: [
      'Stand up a 6-pillar AI CoE with phase plans for 30/60/90/180 days',
      'Brief a board / C-suite / engineering org with stakeholder-aligned deliverables',
      'Apply Oracle ADK + Open Agent Specification for portable agent definitions',
      'Pass SOC2 / GDPR / EU AI Act-ready compliance reviews with templated governance',
      'Deploy a personalized AI advisor agent for your stack (FrankX team agent sets it up)',
      'Receive quarterly intelligence reports on the agent ecosystem',
    ],
    includes: [
      {
        label: 'Everything in Mastery',
        description: 'Toolkit + cohort + code reviews + custom cards + lifetime community.',
        introducedAt: 'mastery',
      },
      {
        label: 'AI Center of Excellence — full template suite',
        description: '6-pillar framework as templates. Strategy, Governance, Talent, Technology, Data, Ethics. Phase plans for 30/60/90/180 days. Stakeholder briefings for board, C-suite, engineering.',
        introducedAt: 'architect',
      },
      {
        label: 'Oracle ADK + Open Agent Specification — full-day video',
        description: 'Frank\'s deep dive on portable agent definitions. From a single OAS file, generate stacks across Oracle ADK, LangGraph, and roll-your-own.',
        introducedAt: 'architect',
      },
      {
        label: 'Compliance + governance templates',
        description: 'SOC2-ready, GDPR-aligned, EU AI Act considerations. BCG-style governance frameworks. Audit logs, data subject requests, model cards.',
        introducedAt: 'architect',
      },
      {
        label: 'Private "Architects" Slack',
        description: 'Curated — max 50 members at a time. Senior practitioners, lead architects, CTOs. Real questions, no beginners.',
        introducedAt: 'architect',
      },
      {
        label: 'Personalized AI advisor agent for your stack',
        description: 'FrankX team agent (fully automated) onboards your stack and configures a custom advisor agent that knows your tools and policies.',
        introducedAt: 'architect',
      },
      {
        label: 'Quarterly intelligence reports',
        description: 'Frank\'s Oracle-grade trend distillation on the agent ecosystem — what shipped, what failed, what enterprises are deploying.',
        introducedAt: 'architect',
      },
      {
        label: 'Priority feature requests',
        description: 'Vote on the FrankX intelligence system roadmap. Enterprise needs influence what ships next.',
        introducedAt: 'architect',
      },
      {
        label: 'Lifetime updates + new branches',
        description: 'As the agent ecosystem evolves, new branches and patterns are added. Architect-tier members get lifetime updates.',
        introducedAt: 'architect',
      },
    ],
    guarantee: '30-day no-questions refund. After day 30, the templates are yours to use indefinitely — even if you cancel. Built on the open Starlight Intelligence Protocol.',
    refundDays: 30,
    delivery: 'instant',
    decoupledFromFrank: true,
    frankTimePerBuyerPerQuarter: '~30 minutes (architects\' Slack)',
    color: 'amber',
    funnelStage: 'bottom',
    ctaText: 'Become an Architect — €997',
    secondaryCtaText: 'See if Mastery is enough',
  },
  {
    slug: 'founders-circle',
    tier: 'founders',
    title: 'Founder\'s Circle',
    subtitle: 'Frank\'s actual time. Quarterly strategic AI retainer.',
    hook: '10 seats per quarter. By application. Frank\'s time is the constraint.',
    pricing: { eur: 2997, usd: 3245, cadence: 'application' },
    positioning:
      'You are a founder, family-office advisor, or C-level architect. Your problem is not artifacts — you can buy artifacts. Your problem is judgment under uncertainty: which AI moves matter, which are noise, and how to make calls that compound across years. Founder\'s Circle is four hours of Frank\'s time per quarter. Calls when you need them, async support windows after, and a quarterly strategic AI retainer scoped to your business.',
    notFor: [
      'Anyone for whom the price is a stretch — the Architect tier delivers most of the value at 1/3 the price',
      'Buyers looking for on-demand 24/7 access — this is structured, scheduled, async-first',
      'Anyone who hasn\'t shipped at least one agent yet — start with the Pack or Toolkit',
    ],
    outcomes: [
      'Have Frank\'s direct input on your AI strategy 4 hours per quarter',
      'Use a 30-day async support window after each call for follow-up questions',
      'Receive a quarterly strategic AI retainer document scoped to your business',
      'Get direct introductions where Frank\'s network adds genuine value',
      'Apply Frank\'s Oracle EMEA AI CoE judgment to your specific decisions',
    ],
    includes: [
      {
        label: 'Everything in the Architect tier',
        description: 'CoE templates, ADK deep-dive, compliance, Architects Slack, advisor agent, quarterly intelligence.',
        introducedAt: 'architect',
      },
      {
        label: '4 hours of Frank\'s time per quarter',
        description: 'Calls — typically 1 hour per month or batched. Calendly access, prep doc per call. Calls are recorded for your reference.',
        introducedAt: 'founders',
      },
      {
        label: '30-day async support window after each call',
        description: 'Slack + email follow-up. Frank responds within 48h on weekdays. Continuity matters; emails don\'t become orphan threads.',
        introducedAt: 'founders',
      },
      {
        label: 'Quarterly strategic AI retainer document',
        description: 'A 4-8 page brief scoped to your specific situation. What to do this quarter, what to avoid, what to revisit next quarter.',
        introducedAt: 'founders',
      },
      {
        label: 'Direct email — answered within 48h',
        description: 'Not a generic support inbox. Frank reads it personally. Reserved for Founder\'s Circle members only.',
        introducedAt: 'founders',
      },
      {
        label: 'Priority intros where Frank\'s network adds value',
        description: 'Real intros — not LinkedIn handoffs. Frank\'s Oracle network, AI partner network, and select FrankX customers.',
        introducedAt: 'founders',
      },
    ],
    guarantee: 'After the first call, if the fit isn\'t right, full refund. After call 1, refunds are pro-rated against calls used.',
    refundDays: 30,
    delivery: 'application-review',
    decoupledFromFrank: false,
    frankTimePerBuyerPerQuarter: '4 hours (calls + async support)',
    color: 'rose',
    funnelStage: 'premium',
    ctaText: 'Apply for the Circle',
    seatsPerQuarter: 10,
  },
]

/** Helper: get a product by slug. Returns undefined if not found. */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

/** Helper: get all products in funnel-stage order (top → premium). */
export function productsByStage(): Product[] {
  const order: Product['funnelStage'][] = ['top', 'mid', 'bottom', 'premium']
  return [...products].sort((a, b) => order.indexOf(a.funnelStage) - order.indexOf(b.funnelStage))
}

/** Helper: paid products only (excludes free Primer). */
export function paidProducts(): Product[] {
  return products.filter((p) => p.tier !== 'free')
}

/** Helper: get the next tier up from a given product (for upsell logic). */
export function getUpsellTier(currentSlug: string): Product | undefined {
  const order: ProductTier[] = ['free', 'pack', 'toolkit', 'mastery', 'architect', 'founders']
  const current = getProductBySlug(currentSlug)
  if (!current) return undefined
  const currentIndex = order.indexOf(current.tier)
  if (currentIndex === -1 || currentIndex === order.length - 1) return undefined
  const nextTier = order[currentIndex + 1]
  return products.find((p) => p.tier === nextTier)
}
