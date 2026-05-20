import Link from 'next/link'
import { ArrowRight, Compass, Zap } from 'lucide-react'
import { CapabilityCategoryGrid } from '@/components/llm-hub/CapabilityCategoryGrid'
import { ProviderCard } from '@/components/llm-hub/ProviderCard'
import { AgenticPlatformPill } from '@/components/llm-hub/AgenticPlatformPill'
import {
  getAllPlatforms,
  getProviders,
} from '@/lib/llm-hub/registry'

const FAQ = [
  {
    q: 'What is the best LLM in 2026?',
    a: 'There is no single winner. Claude Opus 4.6 leads reasoning (68.8% ARC-AGI-2) and agentic coding. GPT-5.2 Pro dominates broad multimodal + voice. Gemini 3.5 Flash (announced at Google I/O ’26) sets a new cost/intelligence frontier at less than half the cost of comparable flagships. Gemini 3.5 Pro is shipping next month for the highest-tier reasoning. Pick by task, not brand.',
  },
  {
    q: 'Which is the cheapest frontier reasoning model?',
    a: 'DeepSeek V3.2 leads on pure cost at $0.27 input / $1.10 output per million tokens with MIT licensing. Gemini 3.5 Flash is the cheapest closed-frontier option at $0.30 / $2.50. Both deliver frontier-class reasoning for production agentic workloads.',
  },
  {
    q: 'What is Antigravity 2.0?',
    a: 'Google’s enterprise agent-building platform announced at I/O ’26. Includes a standalone desktop app, a lightweight CLI, and integration into the Gemini Enterprise Agent Platform — agent runs stay inside your Google Cloud trust boundary by default. Direct competitor to Claude Code, Cursor, and OpenAI Codex.',
  },
  {
    q: 'What is the best agentic LLM in 2026?',
    a: 'Three contenders by category. Coding agents: Claude Opus 4.6 (65.4% Terminal-Bench 2.0) and Gemini 3.5 Flash (76.2% Terminal-Bench 2.1). Long-horizon enterprise agents: Gemini Spark (24/7 background) and Claude Agent Teams (parallel). Computer-use: GPT-5.2 Pro Operator and Claude Opus 4.6 (72.7% OSWorld).',
  },
  {
    q: 'How does Gemini 3.5 Flash compare to Claude Opus 4.6?',
    a: 'Different tiers, different jobs. Gemini 3.5 Flash beats Opus 4.6 on Terminal-Bench 2.1 (76.2 vs 65.4) at a fraction of the cost, optimised for long-horizon agentic tasks. Opus 4.6 leads on ARC-AGI-2 (68.8 vs ~45) and BigLaw Bench (90.2), with a 1M context window in beta. Flash = cost-effective agent runtime. Opus = high-stakes reasoning + 1M-context synthesis.',
  },
  {
    q: 'Which providers offer EU data sovereignty?',
    a: 'Mistral AI (Paris-based, full EU residency), Cohere (EU residency on Command A), and selected Anthropic Opus 4.6 deployments via AWS Bedrock EU. Google Cloud and Azure offer EU regions but data may transit globally depending on configuration.',
  },
  {
    q: 'How often is this hub updated?',
    a: 'Continuously. The model registry (data/model-registry.json) is the source of truth and is updated within 48 hours of every frontier release. Last refreshed May 20, 2026 (Google I/O ’26).',
  },
]

export default function LlmHubPage() {
  const providers = getProviders()
  const platforms = getAllPlatforms()

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'LLM Provider Hub 2026',
    description:
      'Categorized directory of every major LLM provider — frontier models, agentic platforms, pricing, capabilities.',
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
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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
          style={{
            background:
              'radial-gradient(ellipse at top left, rgba(16,185,129,0.07) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
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
            <p className="mb-8 max-w-3xl text-lg text-white/60">
              Every frontier LLM provider, every flagship model, every agentic platform — categorized by capability and refreshed continuously. Built from the same model registry that powers our Intelligence Pipeline.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/blog/google-io-26-cloud-innovations-gemini-3-5-omni-antigravity"
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300 transition-colors hover:border-emerald-500/50"
              >
                <Zap className="h-4 w-4" /> New: Decoding Google I/O ’26
              </Link>
              <Link
                href="/ai-ops/models-2026"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/25"
              >
                <Compass className="h-4 w-4" /> Benchmark arena
              </Link>
              <Link
                href="/research/frontier-llm-landscape-2026"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/25"
              >
                Research domain <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              <Stat label="Providers tracked" value={providers.length.toString()} />
              <Stat
                label="Frontier models"
                value={providers.reduce((acc, p) => acc + p.models.length, 0).toString()}
              />
              <Stat label="Agentic platforms" value={platforms.length.toString()} />
              <Stat label="Capability categories" value="7" />
            </div>
          </div>
        </section>

        {/* Capability category grid */}
        <section className="border-t border-white/5 px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Browse by capability</h2>
              <p className="text-sm text-white/40">
                Pick the job, jump to the providers that lead. Tap a provider chip to scroll to the full card.
              </p>
            </div>
            <CapabilityCategoryGrid />
          </div>
        </section>

        {/* Provider directory */}
        <section className="border-t border-white/5 px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Provider directory</h2>
              <p className="text-sm text-white/40">
                Flagship model, capability focus, agentic platforms, and notable tech for every tracked provider.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {providers.map((provider) => (
                <ProviderCard key={provider.org.slug} provider={provider} />
              ))}
            </div>
          </div>
        </section>

        {/* Agentic platforms strip */}
        <section className="border-t border-white/5 px-6 py-14" id="agentic-platforms">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Agentic platforms</h2>
              <p className="text-sm text-white/40">
                Where the models actually do work — IDEs, CLIs, desktops, agent platforms, and managed runtimes.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {platforms.map((p) => {
                const accent =
                  providers.find((pr) => pr.org.slug === p.org || pr.org.slug.includes(p.org))?.org
                    .accent_color || '#a855f7'
                return <AgenticPlatformPill key={p.id} platform={p} accent={accent} />
              })}
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
                    <span className="text-white/30 transition-transform group-open:rotate-45">
                      +
                    </span>
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
                href="/research/frontier-llm-landscape-2026"
                label="Research"
                title="Frontier LLM Landscape 2026"
                description="Methodology, evidence grades, and what we don’t yet know"
                accent="#06b6d4"
              />
              <RelatedLink
                href="/ai-ops/models-2026"
                label="Arena"
                title="Frontier Model Benchmark Arena"
                description="Head-to-head benchmark, pricing, and ACOS routing"
                accent="#10b981"
              />
              <RelatedLink
                href="/blog/google-io-26-cloud-innovations-gemini-3-5-omni-antigravity"
                label="Blog"
                title="Google I/O ’26: Cloud Innovations Decoded"
                description="Gemini 3.5 Flash, Omni, Antigravity 2.0 in production context"
                accent="#a855f7"
              />
            </div>
          </div>
        </section>

        <footer className="border-t border-white/5 px-6 py-12">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm text-white/30">
              FrankX Intelligence Pipeline · Last refreshed May 20, 2026
            </p>
            <p className="mt-2 text-xs text-white/15">
              Source of truth: <code>data/model-registry.json</code> · Add a model via{' '}
              <code>/new-model</code>
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

function RelatedLink({
  href,
  label,
  title,
  description,
  accent,
}: {
  href: string
  label: string
  title: string
  description: string
  accent: string
}) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/25"
    >
      <p
        className="mb-2 font-mono text-xs uppercase tracking-wider"
        style={{ color: accent }}
      >
        {label}
      </p>
      <h3 className="mb-1 text-sm font-semibold text-white transition-colors group-hover:text-white">
        {title}
      </h3>
      <p className="text-xs text-white/45">{description}</p>
    </Link>
  )
}
