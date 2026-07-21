import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Award, Compass, ShieldCheck } from 'lucide-react'

import { ArenaInterface } from '@/components/llm-hub/ArenaInterface'
import { fetchLivePricing } from '@/lib/llm-hub/openrouter'
import { buildModelRows } from '@/lib/llm-hub/rows'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'LLM Arena — Side-by-Side Frontier Model Comparison (2026)',
  description:
    'Pick any two frontier LLMs and see the head-to-head: specs, pricing, capabilities, who wins what. Live OpenRouter pricing where available. Real-time comparison for humans and agents.',
  keywords: [
    'llm arena',
    'compare llms',
    'frontier model comparison',
    'claude vs gpt vs gemini',
    'side by side llm comparison',
    'live ai pricing',
  ],
  alternates: { canonical: 'https://frankx.ai/llm-hub/arena' },
  openGraph: {
    title: 'LLM Arena — Side-by-Side Frontier Model Comparison',
    description: 'Pick any two LLMs, see the head-to-head with live pricing.',
    url: 'https://frankx.ai/llm-hub/arena',
    type: 'website',
  },
}

export default async function LlmArenaPage() {
  const live = await fetchLivePricing()
  const rows = buildModelRows(live)
  const liveCount = rows.filter((r) => r.live).length

  // Default contestants: most recent two frontier picks.
  const sorted = [...rows].sort((a, b) => (b.released || '').localeCompare(a.released || ''))
  const initialLeft = sorted[0]?.id
  const initialRight = sorted.find((r) => r.org !== sorted[0]?.org)?.id || sorted[1]?.id

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai/' },
      { '@type': 'ListItem', position: 2, name: 'LLM Hub', item: 'https://frankx.ai/llm-hub' },
      { '@type': 'ListItem', position: 3, name: 'Arena', item: 'https://frankx.ai/llm-hub/arena' },
    ],
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute left-0 top-0 h-[50%] w-[60%]"
          style={{ background: 'radial-gradient(ellipse at top left, rgba(168,85,247,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute bottom-0 right-0 h-[50%] w-[60%]"
          style={{ background: 'radial-gradient(ellipse at bottom right, rgba(16,185,129,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-10">
        <nav className="mb-8 flex items-center gap-2 text-sm text-white/50">
          <Link href="/llm-hub" className="inline-flex items-center gap-1 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> LLM Hub
          </Link>
        </nav>

        <header className="mb-10">
          <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-400">
            <Award className="h-3.5 w-3.5" /> The decision arena · Updated continuously
          </p>
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
            LLM Arena <span className="text-white/40">— two models in, a verdict out</span>
          </h1>
          <p className="max-w-3xl text-lg text-white/60">
            Pick any two frontier LLMs. Instantly see the spec deltas, pricing deltas, capability overlap, and who wins
            what — with live OpenRouter pricing where available and curated tagline / verdict beneath each pick.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-white/40">
            This is the decision arena, not LMArena. We don&apos;t run blind votes — we surface the data, fast, with provenance.
            For independently-measured benchmarks see{' '}
            <a href="https://artificialanalysis.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/70">Artificial Analysis</a>{' '}
            (we cite their Intelligence Index where relevant) and{' '}
            <a href="https://lmarena.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/70">LMArena</a>{' '}
            for crowd-preference Elo.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/llm-hub" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-white/25">
              <Compass className="h-3.5 w-3.5" /> All providers
            </Link>
            <Link href="/llm-hub/sources" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-white/25">
              <ShieldCheck className="h-3.5 w-3.5" /> Sources &amp; provenance
            </Link>
            {liveCount > 0 ? (
              <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300">
                {liveCount} models live-priced via OpenRouter
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-300">
                Live pricing unavailable — showing static registry values
              </span>
            )}
          </div>
        </header>

        <ArenaInterface rows={rows} initialLeft={initialLeft} initialRight={initialRight} />

        <footer className="mt-12 border-t border-white/5 pt-6 text-xs text-white/30">
          <p>
            Source of truth: <code>data/model-registry.json</code> · Live pricing from{' '}
            <a href="https://openrouter.ai/models" target="_blank" rel="noopener noreferrer" className="underline">OpenRouter</a>{' '}
            (hourly). Agent surface: <a href="/llm-hub.json" className="underline">/llm-hub.json</a>.
          </p>
        </footer>
      </main>
    </div>
  )
}
