import Link from 'next/link'
import { ArrowRight, Compass, Zap, Code2, FileJson } from 'lucide-react'
import { CapabilityCategoryGrid } from '@/components/llm-hub/CapabilityCategoryGrid'
import { ProviderCard } from '@/components/llm-hub/ProviderCard'
import { AgenticPlatformPill } from '@/components/llm-hub/AgenticPlatformPill'
import { ModelExplorer } from '@/components/llm-hub/ModelExplorer'
import { DecisionMatrix } from '@/components/llm-hub/DecisionMatrix'
import { CreatorStackCard } from '@/components/llm-hub/CreatorStackCard'
import { TaskRoutingPlayground } from '@/components/research/TaskRoutingPlayground'
import { getAllPlatforms, getProviders } from '@/lib/llm-hub/registry'
import { buildModelRows } from '@/lib/llm-hub/rows'
import { fetchLivePricing } from '@/lib/llm-hub/openrouter'
import { ldJson } from '@/lib/seo/jsonld'
import { CREATOR_STACKS } from '@/lib/llm-hub/creator-stacks'

export const revalidate = 3600

const SOURCES = [
  { name: 'OpenRouter', role: 'Live per-token pricing & availability (300+ models)', url: 'https://openrouter.ai/models' },
  { name: 'Artificial Analysis', role: 'Independent Intelligence Index, speed, latency', url: 'https://artificialanalysis.ai/leaderboards/models' },
  { name: 'LMArena', role: 'Crowdsourced human-preference Elo', url: 'https://lmarena.ai/' },
  { name: 'ARC Prize Foundation', role: 'ARC-AGI abstract reasoning benchmark', url: 'https://arcprize.org/' },
  { name: 'SWE-bench', role: 'Real-world software engineering tasks', url: 'https://www.swebench.com/' },
  { name: 'Vendor model cards', role: 'Self-reported benchmarks (labelled as such)', url: 'https://frankx.ai/ai-ops/models-2026' },
]

const FAQ = [
  {
    q: 'What is the best LLM in 2026?',
    a: 'There is no single winner. Claude Opus 4.6 leads reasoning (68.8% ARC-AGI-2) and agentic coding. GPT-5.2 Pro dominates broad multimodal + voice. Gemini 3.5 Flash (Google I/O ’26) sets a new cost/intelligence frontier at less than half the cost of comparable flagships. Gemini 3.5 Pro ships next month for the highest-tier reasoning. Pick by task — use the decision matrix above.',
  },
  {
    q: 'How is this different from OpenRouter or Artificial Analysis?',
    a: 'Those are the raw-data sources — OpenRouter for live pricing and routing, Artificial Analysis for independent benchmarks, LMArena for human preference. We cite all three. The FrankX LLM Hub adds the decision layer they don’t: task-first navigation, the agentic-platform comparison (Claude Code vs Antigravity vs Cursor vs Codex), curated verdicts, and a creator-stack lens — for humans and agents.',
  },
  {
    q: 'Which is the cheapest frontier reasoning model?',
    a: 'DeepSeek V3.2 leads on pure cost ($0.27 / $1.10 per 1M tokens, MIT license). Gemini 3.5 Flash is the cheapest closed-frontier option at $0.30 / $2.50. Both deliver frontier-class reasoning for production agentic workloads.',
  },
  {
    q: 'What is the best agentic LLM in 2026?',
    a: 'By category: coding agents — Gemini 3.5 Flash (76.2% Terminal-Bench 2.1) and Claude Opus 4.6; long-horizon enterprise — Gemini Spark and Claude Agent Teams; computer-use — GPT-5.2 Operator and Claude Opus 4.6 (72.7% OSWorld).',
  },
  {
    q: 'Is the pricing live?',
    a: 'Where a model maps to OpenRouter, pricing is fetched live (hourly) and marked with a ⚡ icon and "via OpenRouter." Otherwise it comes from our curated registry. Always verify against the provider before relying on it for billing.',
  },
  {
    q: 'Can AI agents consume this hub?',
    a: 'Yes. The full curated dataset — models, pricing, verdicts, decision matrix, comparisons — is available as clean JSON at /llm-hub.json, plus JSON-LD structured data on every page and deep links in /llms.txt.',
  },
]

export default async function LlmHubPage() {
  const providers = getProviders()
  const platforms = getAllPlatforms()
  const live = await fetchLivePricing()
  const rows = buildModelRows(live)
  const liveCount = rows.filter((r) => r.live).length

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'LLM Provider Hub 2026',
    description: 'Categorized directory of every major LLM provider — frontier models, agentic platforms, pricing, capabilities.',
    itemListElement: providers.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Organization',
        '@id': `https://frankx.ai/llm-hub#${p.org.slug}`,
        name: p.org.name,
        url: p.org.url,
        description: p.org.one_liner,
        foundingDate: p.org.founded?.toString(),
        address: p.org.headquarters,
      },
    })),
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai/' },
      { '@type': 'ListItem', position: 2, name: 'LLM Hub', item: 'https://frankx.ai/llm-hub' },
    ],
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(breadcrumbJsonLd) }} />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div
          className="absolute left-0 top-0 h-[40%] w-[60%]"
          style={{ background: 'radial-gradient(ellipse at top left, rgba(16,185,129,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <main className="relative z-10">
        {/* Hero */}
        <section className="px-6 pb-12 pt-16">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 font-mono text-sm uppercase tracking-wider text-emerald-400">
              Frontier Intelligence Directory · Updated May 20, 2026
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
              LLM Provider Hub <span className="text-white/40">2026</span>
            </h1>
            <p className="mb-4 max-w-3xl text-lg text-white/60">
              The decision layer on top of the raw data. Every frontier provider, model, and agentic platform — categorized
              by capability, priced live, and paired with a verdict. Built for humans and agents.
            </p>
            <p className="mb-8 max-w-3xl text-sm text-white/40">
              We cite OpenRouter, Artificial Analysis, and LMArena as sources, and add what they don’t: task-first navigation,
              the agentic-platform comparison, curated verdicts, and a creator-stack lens.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#explorer"
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300 transition-colors hover:border-emerald-500/50"
              >
                <Compass className="h-4 w-4" /> Explore all models
              </Link>
              <Link
                href="/blog/frontier-model-routing-without-fable-5"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/25"
              >
                <Zap className="h-4 w-4" /> Frontier routing guide
              </Link>
              <Link
                href="/research/model-arena"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/25"
              >
                <Code2 className="h-4 w-4" /> Model Arena receipts
              </Link>
              <a
                href="/llm-hub.json"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/25"
              >
                <FileJson className="h-4 w-4" /> Agent JSON
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              <Stat label="Providers tracked" value={providers.length.toString()} />
              <Stat label="Frontier models" value={rows.length.toString()} />
              <Stat label="Agentic platforms" value={platforms.length.toString()} />
              <Stat label="Live-priced" value={liveCount > 0 ? `${liveCount}` : 'registry'} />
            </div>
          </div>
        </section>

        {/* Decision matrix — start here */}
        <section className="border-t border-white/5 px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Start here: pick your constraint</h2>
              <p className="text-sm text-white/40">
                The fastest path from “which model?” to an answer. One dominant constraint → a recommendation.
              </p>
            </div>
            <div className="grid gap-8">
              <TaskRoutingPlayground />
              <div className="mt-6">
                <h3 className="text-base font-semibold text-white/80 mb-3">Curated Routing Table</h3>
                <DecisionMatrix />
              </div>
            </div>
          </div>
        </section>

        {/* Capability category grid */}
        <section className="border-t border-white/5 px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Browse by capability</h2>
              <p className="text-sm text-white/40">Pick the job, jump to the providers that lead.</p>
            </div>
            <CapabilityCategoryGrid />
          </div>
        </section>

        {/* Model explorer */}
        <section id="explorer" className="scroll-mt-20 border-t border-white/5 px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Model explorer</h2>
              <p className="text-sm text-white/40">
                Sort and filter every tracked model. {liveCount > 0 ? 'Live pricing via OpenRouter where available.' : 'Pricing from the curated registry.'} Click a model for the full breakdown.
              </p>
            </div>
            <ModelExplorer rows={rows} />
          </div>
        </section>

        {/* Creator stacks */}
        <section className="border-t border-white/5 px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-1">
              <h2 className="flex items-center gap-2 text-2xl font-bold">
                <Code2 className="h-5 w-5 text-amber-400" /> Creator stacks
              </h2>
              <p className="text-sm text-white/40">
                Creators don’t pick a model — they assemble a stack. Here’s what to use across each modality, and the workflow.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {CREATOR_STACKS.map((s) => (
                <CreatorStackCard key={s.slug} stack={s} />
              ))}
            </div>
          </div>
        </section>

        {/* Provider directory */}
        <section className="border-t border-white/5 px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Provider directory</h2>
              <p className="text-sm text-white/40">Flagship model, capability focus, agentic platforms, and notable tech for every tracked provider.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {providers.map((provider) => (
                <ProviderCard key={provider.org.slug} provider={provider} />
              ))}
            </div>
          </div>
        </section>

        {/* Agentic platforms */}
        <section className="border-t border-white/5 px-6 py-14" id="agentic-platforms">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Agentic platforms</h2>
              <p className="text-sm text-white/40">Where the models actually do work — IDEs, CLIs, desktops, agent platforms, managed runtimes. The layer the data sites skip.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {platforms.map((p) => {
                const accent =
                  providers.find((pr) => pr.org.slug === p.org || pr.org.slug.includes(p.org))?.org.accent_color || '#a855f7'
                return <AgenticPlatformPill key={p.id} platform={p} accent={accent} />
              })}
            </div>
          </div>
        </section>

        {/* Sources & methodology */}
        <section className="border-t border-white/5 px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Sources & methodology</h2>
              <p className="text-sm text-white/40">
                We synthesize; we don’t fabricate. Live pricing is attributed; benchmarks are sourced; vendor-reported figures are
                labelled as such and flagged pending independent reproduction.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {SOURCES.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/25"
                >
                  <p className="text-sm font-medium text-white">{s.name}</p>
                  <p className="mt-1 text-xs text-white/45">{s.role}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-white/5 px-6 py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold">Frequently asked</h2>
            <div className="space-y-3">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors open:border-white/20 hover:border-white/15"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-white">
                    {f.q}
                    <span className="text-white/30 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="border-t border-white/5 px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-6 text-2xl font-bold">Related research & analysis</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <RelatedLink
                href="/blog/frontier-model-routing-without-fable-5"
                label="Research"
                title="Frontier Model Freedom Guide"
                description="Fable 5, Kilo Code, Grok 4.3, Gemini 3.5, and fallback routing"
                accent="#06b6d4"
              />
              <RelatedLink
                href="/research/model-arena"
                label="Arena"
                title="Starlight Model Arena"
                description="Open JSON receipts for routing claims and model behavior"
                accent="#10b981"
              />
              <RelatedLink
                href="/blog/ai-model-routing-guide"
                label="Blog"
                title="AI Model Routing Guide"
                description="Which model to use by task, constraint, and evidence grade"
                accent="#a855f7"
              />
            </div>
          </div>
        </section>

        <footer className="border-t border-white/5 px-6 py-12">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm text-white/30">FrankX Intelligence Pipeline · Last refreshed May 20, 2026</p>
            <p className="mt-2 text-xs text-white/15">
              Source of truth: <code>data/model-registry.json</code> · Agent surface: <a href="/llm-hub.json" className="underline">/llm-hub.json</a> · Add a model via <code>/new-model</code>
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <p className="font-mono text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wider text-white/40">{label}</p>
    </div>
  )
}

function RelatedLink({ href, label, title, description, accent }: { href: string; label: string; title: string; description: string; accent: string }) {
  return (
    <Link href={href} className="group block rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/25">
      <p className="mb-2 font-mono text-xs uppercase tracking-wider" style={{ color: accent }}>
        {label}
      </p>
      <h3 className="mb-1 text-sm font-semibold text-white">{title}</h3>
      <p className="text-xs text-white/45">{description}</p>
    </Link>
  )
}
