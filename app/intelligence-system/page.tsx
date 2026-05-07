import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Github,
  Shield,
  Layers,
  Brain,
  Compass,
  Workflow,
  FileText,
  Network,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Database,
  Calendar,
  Circle,
} from 'lucide-react'

// Force static generation — page has no per-request data; this guarantees
// Vercel CDN edge caching (per docs/ops/VERCEL-COST-MASSIVE-ACTION.md).
export const dynamic = 'force-static'

const IIS_REPO = 'https://github.com/frankxai/investment-intelligence-system'
const SIS_REPO = 'https://github.com/frankxai/Starlight-Intelligence-System'
const LIBRARY_OS_REPO = 'https://github.com/frankxai/library-os'

export const metadata: Metadata = {
  title: 'Investment Intelligence System — The Kata for Personal Capital Stewardship | FrankX',
  description:
    'A markdown-first, MIT-licensed substrate that turns any code agent into a sophisticated decision-support engine for personal wealth management. Multi-agent debate team, retrospective learning loop, mandatory human-gate. Not a trading bot.',
  alternates: { canonical: 'https://frankx.ai/intelligence-system' },
  openGraph: {
    title: 'Investment Intelligence System — The Kata for Personal Capital Stewardship',
    description:
      'Decision-support and discipline-imposition substrate for personal wealth management. Open source. MIT.',
    url: 'https://frankx.ai/intelligence-system',
    siteName: 'FrankX',
    type: 'website',
    images: [
      {
        url: 'https://frankx.ai/og/intelligence-system.jpg',
        width: 1200,
        height: 630,
        alt: 'Investment Intelligence System — the kata for personal capital stewardship',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investment Intelligence System — The Kata for Personal Capital Stewardship',
    description:
      'Decision-support and discipline-imposition substrate for personal wealth management. Open source. MIT.',
    images: ['https://frankx.ai/og/intelligence-system.jpg'],
  },
}

const tiers = [
  {
    n: '0',
    name: 'Markdown only',
    audience: 'Anyone',
    tooling: 'Markdown + any agent CLI',
    time: '30 min/week',
    outcome: 'Strategy Session journal + DCA discipline + tax calendar',
  },
  {
    n: '1',
    name: 'OSS install',
    audience: 'Intermediate',
    tooling: 'Multi-agent debate runtime, OpenBB feeds, Notion hub',
    time: '2 hr/week',
    outcome: 'Weekly debate transcripts + portfolio drift alerts',
  },
  {
    n: '2',
    name: 'Live execution',
    audience: 'Advanced',
    tooling: 'AgentKit / Alpaca live, Freqtrade, custom MCPs, ReasoningBank',
    time: 'Engineering effort, ongoing',
    outcome: 'Autonomous DCA + thesis-tracked execution',
  },
]

const layers = [
  { name: 'Analysis', count: 5, agents: ['Macro-Risk', 'Crypto-DCA', 'DeFi-Yield', 'Fundamentals', 'Technical'] },
  { name: 'Risk', count: 3, agents: ['Risk-Manager', 'Tax-Optimizer', 'Regulatory-Risk'] },
  { name: 'Synthesis', count: 2, agents: ['Portfolio-Manager', 'Chief-of-Staff'] },
  { name: 'Cross-cutting', count: 1, agents: ['Researcher (cited primary sources)'] },
]

const loops = [
  { num: '1', name: 'Daily Pulse', cadence: 'Weekday morning', time: '~2 min', purpose: 'One-screen digest: top movers, renewals, due actions' },
  { num: '2', name: 'Weekly Review', cadence: 'Sunday', time: '15-45 min', purpose: 'The heartbeat. Multi-agent Strategy Session. Run this if nothing else.' },
  { num: '3', name: 'Monthly Close', cadence: '1st of month', time: '~30 min', purpose: 'Net worth snapshot, runway, subscription audit, Box 3 running total' },
  { num: '4', name: 'Quarterly Tax & Strategy', cadence: 'Jan/Apr/Jul/Oct', time: '~45 min', purpose: 'Box 3 vs BV analysis, BTW prep, cost basis reconciliation, security audit' },
  { num: '5', name: 'Annual Architecture', cadence: 'December', time: '~2 hours', purpose: 'Year of sessions distilled. Pre-Jan-1 position optimization. Inheritance protocol freshness.' },
]

const quickstart = [
  { step: '1', title: 'Clone', body: 'git clone the repo. Read README, architecture/00-overview.md, architecture/10-honest-limits.md.' },
  { step: '2', title: 'Read one example', body: 'examples/jane-freelance/sessions/2026-W18.md (Tier 0) or examples/marcus-founder/sessions/2026-W18.md (Tier 1).' },
  { step: '3', title: 'Initialize private store', body: 'Outside the substrate repo: ~/iis-private/{sessions,snapshots,theses,retrospectives,trajectories}.' },
  { step: '4', title: 'Run first session', body: 'In your agent CLI, invoke /weekly-strategy. Provide portfolio context. Read draft. Mark verdict.' },
]

const honestLimits = {
  isNot: [
    'NOT an alpha-generation system',
    'NOT a trading bot',
    'NOT a robo-advisor',
    'NOT financial, tax, or legal advice',
    'NOT a guarantee of returns',
    'NOT secure if you skip the security model',
  ],
  is: [
    'A decision-support framework that imposes structure on weekly decisions',
    'A discipline-enforcement scaffolding that catches biases through structured debate',
    'A journal that compounds — sessions accumulate into a learning corpus',
    'A tax-aware position planner that surfaces jurisdiction-specific implications',
    'An audit trail of past decisions with retrospective outcome tracking',
  ],
}

const plausible = [
  'One catastrophic decision avoided in a 5-10 year horizon',
  'One tax mistake caught before year-end',
  'One position-size error surfaced before you took it',
  'One biased pattern in your thinking identified through retrospectives',
]

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Investment Intelligence System — The Kata for Personal Capital Stewardship',
  description:
    'A markdown-first, MIT-licensed substrate that turns any code agent into a sophisticated decision-support engine for personal wealth management.',
  author: { '@type': 'Person', name: 'Frank Riemer', url: 'https://frankx.ai' },
  publisher: { '@type': 'Organization', name: 'FrankX', url: 'https://frankx.ai' },
  datePublished: '2026-05-06',
  dateModified: '2026-05-07',
  mainEntityOfPage: 'https://frankx.ai/intelligence-system',
  inLanguage: 'en',
  keywords: 'wealth management, decision support, multi-agent, AI architect, MIT open source, personal finance, Box 3, BV, DCA discipline',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this a trading bot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The Investment Intelligence System is a decision-support and discipline-imposition substrate, not an alpha-generation system. Multi-agent debate catches biases and surfaces trade-offs; it does not generate market-beating signals. Read architecture/10-honest-limits.md for the explicit anti-positioning.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does it actually deliver?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Plausibly: one catastrophic decision avoided in a 5-10 year horizon, one tax mistake caught before year-end, one position-size error surfaced before action, one biased pattern in your thinking identified through retrospectives. None guaranteed. All require running the substrate consistently for 12+ weeks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is it different from Wealthfront or Betterment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Robo-advisors have fiduciary regulatory standing, bucket-based risk-profile assignment, and tax-loss harvesting automation. The IIS substrate is opinionated scaffolding you operate yourself, with full human responsibility. It is not a robo-advisor.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why open source?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The architecture is the value, not the data. Real positions, real tax filings, real strategies stay private in operator vaults. The substrate documents the patterns — security tiers, agent personas, schemas, MCP integration — so any creator with similar profile can boot the same discipline. MIT-licensed for maximum adoption.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does it relate to the Starlight Intelligence System?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IIS is the buildout of SIS Layer 6 (Wealth / Freedom IS). When SIS MCP propagation lands (target W23+), IIS sessions become Memory Palace entries, enabling cross-domain queries between wealth decisions, content production (ACOS), and book intelligence (Library OS). IIS works stand-alone today; SIS integration is additive.',
      },
    },
    {
      '@type': 'Question',
      name: 'What jurisdictions does the tax overlay support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The substrate ships Dutch (NL) tax overlay as the reference jurisdiction — Box 3, BV/DGA, NHG, startersvrijstelling. Other jurisdictions can be added via PR following the overlay schema. US, UK, DE, EE, SG planned per contributor demand.',
      },
    },
  ],
}

export default function IntelligenceSystemPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* JSON-LD as raw script tags — server component renders inline,
          no hydration cost, Googlebot sees them in initial HTML. */}
      <script
        id="iis-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        id="iis-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section aria-labelledby="iis-hero-heading" className="border-b border-zinc-800/60">
        <div className="mx-auto max-w-5xl px-6 pt-24 pb-20 sm:pt-32 sm:pb-28">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-800/40 bg-emerald-900/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <Shield className="h-3 w-3" aria-hidden="true" />
            <span>MIT — Open Source — Substrate, not service</span>
          </div>
          <h1 id="iis-hero-heading" className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-br from-emerald-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              The kata for personal
            </span>
            <br />
            <span className="text-zinc-100">capital stewardship.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-zinc-400 sm:text-xl">
            A markdown-first, MIT-licensed substrate that turns any code agent — Claude Code, Cowork, Codex, Gemini CLI, OpenCode — into a sophisticated decision-support engine for personal wealth management.
          </p>
          <p className="mt-4 max-w-3xl text-base text-zinc-500">
            Not a trading bot. Not a robo-advisor. Not alpha. The discipline-imposing scaffolding that turns intuition + checklists into outperforming intuition alone — borrowed from medicine (Gawande), aviation (cockpit cross-checks), and software engineering (RFC + post-mortem).
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#quickstart"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
            >
              Quickstart
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={IIS_REPO}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/40 px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
            <Link
              href="#honest-limits"
              className="inline-flex items-center gap-2 rounded-lg border border-amber-900/40 bg-amber-950/20 px-5 py-3 text-sm font-medium text-amber-200 transition hover:border-amber-800/60"
            >
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              Read honest limits first
            </Link>
          </div>
        </div>
      </section>

      {/* What it is / What it isn't */}
      <section
        id="honest-limits"
        tabIndex={-1}
        aria-labelledby="iis-honest-limits-heading"
        className="border-b border-zinc-800/60 bg-zinc-950/60 outline-none"
      >
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 id="iis-honest-limits-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            What this <span className="text-emerald-400">is</span> — and isn&apos;t.
          </h2>
          <p className="mt-4 max-w-3xl text-zinc-400">
            Most retail &quot;AI trading systems&quot; lose money to brokers, slippage, bias, and overconfidence. The compounding edge for a part-time investor is <strong className="text-zinc-200">not making catastrophic decisions</strong>, more than alpha generation. This substrate is built for that, and only that.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-900/40 bg-emerald-950/10 p-6">
              <div className="mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-semibold text-emerald-300">What this is</h3>
              </div>
              <ul className="space-y-3 text-sm text-zinc-300">
                {honestLimits.is.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-rose-900/40 bg-rose-950/10 p-6">
              <div className="mb-4 flex items-center gap-2">
                <XCircle className="h-5 w-5 text-rose-400" />
                <h3 className="text-lg font-semibold text-rose-300">What this is NOT</h3>
              </div>
              <ul className="space-y-3 text-sm text-zinc-300">
                {honestLimits.isNot.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h3 className="text-base font-semibold text-zinc-200">The four plausible outcomes (no guarantees)</h3>
            <p className="mt-2 text-sm text-zinc-400">
              After 12+ weeks of consistent use, the substrate <em>plausibly</em> delivers:
            </p>
            <ul className="mt-4 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
              {plausible.map((p) => (
                <li key={p} className="flex gap-2">
                  <Circle aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 fill-amber-400/30 text-amber-400" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The atomic unit */}
      <section aria-labelledby="iis-atomic-unit-heading" className="border-b border-zinc-800/60">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 id="iis-atomic-unit-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            The atomic unit: the <span className="text-emerald-400">Strategy Session</span>.
          </h2>
          <p className="mt-4 max-w-3xl text-zinc-400">
            A closed, dated, JSON-schema-validated artifact that captures everything needed to make and remember a wealth decision. Every command, every loop, every agent ultimately produces or consumes one.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Compass, label: 'Macro context', body: 'Fed funds, yield curve, M2, F&G, BTC dominance' },
              { icon: Brain, label: 'Agent debate', body: 'Stance + evidence + confidence per agent' },
              { icon: Workflow, label: 'Proposed actions', body: 'With conditions, deadlines, human-gate' },
              { icon: FileText, label: 'Outcome (90d later)', body: 'Retrospective scoring + lessons' },
            ].map((card) => (
              <div key={card.label} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
                <card.icon aria-hidden="true" className="mb-3 h-5 w-5 text-emerald-400" />
                <div className="text-sm font-semibold text-zinc-200">{card.label}</div>
                <div className="mt-1 text-sm text-zinc-400">{card.body}</div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-zinc-400">
            Sessions are append-only after settlement. Outcome backfilling happens 30/60/90/180 days later as a separate write event — preserving the audit trail.
          </p>
        </div>
      </section>

      {/* Multi-agent team */}
      <section
        id="agents"
        tabIndex={-1}
        aria-labelledby="iis-agents-heading"
        className="border-b border-zinc-800/60 bg-zinc-950/60 outline-none"
      >
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 id="iis-agents-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            The <span className="text-emerald-400">11-agent</span> strategy team.
          </h2>
          <p className="mt-4 max-w-3xl text-zinc-400">
            Three layers (Analysis → Risk → Synthesis) plus a cross-cutting Researcher. Each agent is a structured prompt + tool budget + output schema, not a separately-trained model. Swap the underlying LLM per agent based on cost vs capability.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {layers.map((layer) => (
              <div key={layer.name} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
                <div className="mb-4 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold text-zinc-100">{layer.name} layer</h3>
                  <span className="text-xs text-zinc-400">{layer.count} agent{layer.count > 1 ? 's' : ''}</span>
                </div>
                <ul className="space-y-2 text-sm text-zinc-300">
                  {layer.agents.map((agent) => (
                    <li key={agent} className="flex gap-2">
                      <span aria-hidden="true" className="text-emerald-400">·</span>
                      <span>{agent}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 text-sm text-zinc-400">
            <strong className="text-zinc-200">The handoff protocol:</strong> Analysis agents run in parallel (independent reads, no groupthink). Risk agents sequentially review. Synthesis renders the session. The Researcher is available cross-cutting — but every claim it returns must cite primary sources.
          </div>
        </div>
      </section>

      {/* Three tiers */}
      <section aria-labelledby="iis-tiers-heading" className="border-b border-zinc-800/60">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 id="iis-tiers-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            Three tiers. Start at <span className="text-emerald-400">Tier 0</span>.
          </h2>
          <p className="mt-4 max-w-3xl text-zinc-400">
            Tier 0 is bootable in 10 minutes with any agent CLI — no Python, no Docker, no API keys. Tier 2 is engineering effort. Most operators live at Tier 1.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div key={tier.n} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-900/20 px-3 py-1 text-xs font-medium text-emerald-300">
                  Tier {tier.n}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-zinc-100">{tier.name}</h3>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex gap-2">
                    <dt className="text-zinc-400">Audience:</dt>
                    <dd className="text-zinc-300">{tier.audience}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-zinc-400">Tooling:</dt>
                    <dd className="text-zinc-300">{tier.tooling}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-zinc-400">Time:</dt>
                    <dd className="text-zinc-300">{tier.time}</dd>
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-zinc-800/50">
                    <dt className="text-zinc-400">Outcome:</dt>
                    <dd className="text-emerald-300">{tier.outcome}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Five loops */}
      <section aria-labelledby="iis-loops-heading" className="border-b border-zinc-800/60 bg-zinc-950/60">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 id="iis-loops-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            Five operating <span className="text-emerald-400">loops</span>.
          </h2>
          <p className="mt-4 max-w-3xl text-zinc-400">
            Each loop runs at a fixed cadence with a defined output. Most operators run only Loop 2 (Weekly Review) at first; Loops 3-5 add value as the substrate matures.
          </p>

          <div className="mt-10 space-y-3">
            {loops.map((loop) => (
              <div key={loop.num} className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
                <div
                  aria-hidden="true"
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-900/30 text-sm font-semibold text-emerald-300"
                >
                  {loop.num}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="text-base font-semibold text-zinc-100">
                      <span className="sr-only">Loop {loop.num}: </span>
                      {loop.name}
                    </h3>
                    <span className="text-xs text-zinc-400">{loop.cadence} · {loop.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-300">{loop.purpose}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-zinc-400">
            <strong className="text-zinc-200">Skipping Loop 5 is the most common operator failure.</strong> The annual review compounds the value of every weekly session. Without it, the corpus accumulates without distillation.
          </p>
        </div>
      </section>

      {/* Quickstart */}
      <section
        id="quickstart"
        tabIndex={-1}
        aria-labelledby="iis-quickstart-heading"
        className="border-b border-zinc-800/60 outline-none"
      >
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 id="iis-quickstart-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            Quickstart — <span className="text-emerald-400">10 minutes</span>.
          </h2>
          <p className="mt-4 max-w-3xl text-zinc-400">
            Tier 0 setup is markdown + agent CLI. No infrastructure.
          </p>

          <ol className="mt-10 space-y-6">
            {quickstart.map((step) => (
              <li key={step.step} className="flex gap-5">
                <div
                  aria-hidden="true"
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-emerald-800/50 bg-emerald-950/30 text-sm font-bold text-emerald-300"
                >
                  {step.step}
                </div>
                <div className="pt-1">
                  <h3 className="text-base font-semibold text-zinc-100">{step.title}</h3>
                  <p className="mt-1 text-sm text-zinc-300">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
            <p className="text-sm text-zinc-300">
              <strong className="text-zinc-100">Sunday cadence (after first session):</strong> Run <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-emerald-300">/weekly-strategy</code>. Read the draft. Mark verdict. Schedule retrospective for any thesis-driven action (90 days). 15 minutes per week.
            </p>
          </div>
        </div>
      </section>

      {/* Why this exists / sibling systems */}
      <section aria-labelledby="iis-why-heading" className="border-b border-zinc-800/60 bg-zinc-950/60">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 id="iis-why-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why this exists.
          </h2>
          <p className="mt-4 max-w-3xl text-zinc-400">
            A 28-year-old AI Architect in Amsterdam, building a living legacy for godchildren and nieces, found that the wealth-decision scaffolding he&apos;d battle-tested privately was generalizable. The architecture (not the positions) is now extracted, sanitized, and published under MIT so other creators with similar profiles can boot the same discipline.
          </p>

          <div className="mt-12">
            <h3 className="text-lg font-semibold text-zinc-100">Sibling systems</h3>
            <p className="mt-2 text-sm text-zinc-400">
              IIS is part of a unified memory ecosystem. SIS is the substrate&apos;s substrate; Library OS is the book-intelligence sibling; IIS is the wealth-decision domain.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <a
                href={SIS_REPO}
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-zinc-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Network aria-hidden="true" className="mb-3 h-5 w-5 text-violet-400" />
                <div className="text-sm font-semibold text-zinc-200">Starlight Intelligence System</div>
                <div className="mt-1 text-xs text-zinc-400">9-layer foundational substrate. IIS is the buildout of Layer 6 (Wealth / Freedom IS).</div>
              </a>
              <a
                href={LIBRARY_OS_REPO}
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-zinc-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Database aria-hidden="true" className="mb-3 h-5 w-5 text-rose-400" />
                <div className="text-sm font-semibold text-zinc-200">Library OS</div>
                <div className="mt-1 text-xs text-zinc-400">Book intelligence — same pattern (markdown-first, MIT, agent-CLI-native), different domain.</div>
              </a>
              <Link
                href="/os"
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-zinc-700"
              >
                <Layers aria-hidden="true" className="mb-3 h-5 w-5 text-emerald-400" />
                <div className="text-sm font-semibold text-zinc-200">FrankX OS</div>
                <div className="mt-1 text-xs text-zinc-400">All systems map. Watch / Workshop / ACO / ACOS / CoE Hub / Library OS / IIS.</div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section aria-labelledby="iis-cta-heading" className="bg-zinc-950">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 id="iis-cta-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-zinc-100">Discipline beats intuition.</span>
            <br />
            <span className="text-emerald-400">Process beats prediction.</span>
            <br />
            <span className="text-zinc-100">Audit beats optimism.</span>
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-zinc-400">
            Internalize that, and the substrate gives you what it can give you. Reject it, and look elsewhere — there are better tools for whatever else you want.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={IIS_REPO}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              Clone the repo
            </a>
            <Link
              href="/os"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/40 px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-900"
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              See all FrankX systems
            </Link>
          </div>
          <p className="mt-12 text-xs text-zinc-400">
            MIT License. No financial advice. No alpha guarantee. Decision support only. Read{' '}
            <Link href="/intelligence-system#honest-limits" className="text-zinc-300 underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400">
              honest limits
            </Link>{' '}
            before use.
          </p>
        </div>
      </section>
    </main>
  )
}
