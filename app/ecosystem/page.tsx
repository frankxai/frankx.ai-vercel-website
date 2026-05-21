import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight,
  Sparkles,
  Layers,
  ExternalLink,
  Globe,
  Github,
} from 'lucide-react'
import {
  ecosystemEntries,
  ECOSYSTEM_TIERS,
  ECOSYSTEM_LAYERS,
  type EcosystemEntry,
  type EcosystemTier,
} from '@/data/ecosystem'

export const metadata: Metadata = {
  title: 'FrankX Ecosystem — The Complete System Map',
  description:
    'Every shipped system across the FrankX ecosystem — Watch OS, Workshop OS, ACOS, Library OS, the Build First funnel, the Starlight Intelligence System, and more. 28 entries across 4 tiers.',
  openGraph: {
    title: 'FrankX Ecosystem — The Complete System Map',
    description: '28 systems across 4 tiers — public surfaces, open-source substrate, operational layer, ops tooling.',
    type: 'website',
  },
  alternates: { canonical: 'https://frankx.ai/ecosystem' },
}

const COLOR_TOKENS = {
  cyan: { ring: 'ring-cyan-400/30 hover:ring-cyan-400/60', text: 'text-cyan-300', bg: 'bg-cyan-500/10', glow: 'from-cyan-500/[0.08]' },
  violet: { ring: 'ring-violet-400/30 hover:ring-violet-400/60', text: 'text-violet-300', bg: 'bg-violet-500/10', glow: 'from-violet-500/[0.08]' },
  amber: { ring: 'ring-amber-400/30 hover:ring-amber-400/60', text: 'text-amber-300', bg: 'bg-amber-500/10', glow: 'from-amber-500/[0.08]' },
  emerald: { ring: 'ring-emerald-400/30 hover:ring-emerald-400/60', text: 'text-emerald-300', bg: 'bg-emerald-500/10', glow: 'from-emerald-500/[0.08]' },
  rose: { ring: 'ring-rose-400/30 hover:ring-rose-400/60', text: 'text-rose-300', bg: 'bg-rose-500/10', glow: 'from-rose-500/[0.08]' },
  slate: { ring: 'ring-zinc-400/30 hover:ring-zinc-400/60', text: 'text-zinc-200', bg: 'bg-zinc-500/10', glow: 'from-zinc-500/[0.08]' },
  sky: { ring: 'ring-sky-400/30 hover:ring-sky-400/60', text: 'text-sky-300', bg: 'bg-sky-500/10', glow: 'from-sky-500/[0.08]' },
  fuchsia: { ring: 'ring-fuchsia-400/30 hover:ring-fuchsia-400/60', text: 'text-fuchsia-300', bg: 'bg-fuchsia-500/10', glow: 'from-fuchsia-500/[0.08]' },
  lime: { ring: 'ring-lime-400/30 hover:ring-lime-400/60', text: 'text-lime-300', bg: 'bg-lime-500/10', glow: 'from-lime-500/[0.08]' },
  orange: { ring: 'ring-orange-400/30 hover:ring-orange-400/60', text: 'text-orange-300', bg: 'bg-orange-500/10', glow: 'from-orange-500/[0.08]' },
} as const

const STATUS_LABEL: Record<EcosystemEntry['status'], string> = {
  live: 'Live',
  active: 'Active',
  scaffolded: 'Scaffolded',
  designed: 'Designed',
  frozen: 'Frozen',
  archived: 'Archived',
}

const STATUS_STYLE: Record<EcosystemEntry['status'], string> = {
  live: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  active: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
  scaffolded: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
  designed: 'bg-violet-500/15 text-violet-300 border-violet-500/25',
  frozen: 'bg-sky-500/15 text-sky-300 border-sky-500/25',
  archived: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/25',
}

function EcosystemSchema() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FrankX Ecosystem',
    description: 'The complete map of every system across the FrankX ecosystem — 28 entries across 4 tiers.',
    url: 'https://frankx.ai/ecosystem',
    author: {
      '@type': 'Person',
      name: 'Frank Riemer',
      url: 'https://frankx.ai',
      jobTitle: 'AI Architect',
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
}

function EntryCard({ entry }: { entry: EcosystemEntry }) {
  const tokens = COLOR_TOKENS[entry.color]

  return (
    <Link
      href={`/ecosystem/${entry.slug}`}
      className={`group relative block overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 ring-1 ${tokens.ring} transition-all hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black`}
      aria-label={`Open ${entry.name} deep-dive`}
    >
      <div
        className={`absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${tokens.glow} to-transparent blur-2xl opacity-50 group-hover:opacity-90 transition-opacity`}
        aria-hidden="true"
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-semibold text-zinc-50 leading-tight">{entry.name}</h3>
          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium whitespace-nowrap ${STATUS_STYLE[entry.status]}`}>
            {STATUS_LABEL[entry.status]}
          </span>
        </div>
        <p className={`text-xs ${tokens.text} mb-2 leading-snug`}>{entry.summary}</p>
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.04] text-[11px] text-zinc-500">
          <span className="font-mono">{entry.layer.split('-')[0]}</span>
          <span>{entry.shipped}</span>
        </div>
      </div>
    </Link>
  )
}

function TierSection({ tierId, label, description }: { tierId: EcosystemTier; label: string; description: string }) {
  const entries = ecosystemEntries.filter((e) => e.tier === tierId)
  if (entries.length === 0) return null

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-50 mb-1">{label}</h2>
            <p className="text-sm text-zinc-500 max-w-2xl">{description}</p>
          </div>
          <span className="text-xs font-mono text-zinc-500 whitespace-nowrap">{entries.length} systems</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function EcosystemPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <EcosystemSchema />

      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/[0.04] via-cyan-500/[0.02] to-transparent" aria-hidden="true" />
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-fuchsia-500/[0.04] rounded-full blur-[140px]" aria-hidden="true" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-cyan-500/[0.04] rounded-full blur-[120px]" aria-hidden="true" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 mb-5">
            <Layers className="h-3.5 w-3.5" aria-hidden="true" />
            <span>FrankX Ecosystem Map</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-50 leading-tight tracking-tight mb-6">
            Every system, in one map
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 max-w-3xl leading-relaxed mb-6">
            {ecosystemEntries.length} systems across 4 tiers — public surfaces on frankx.ai, open-source substrate
            you can fork, internal operational layers, and the daily ops tooling that keeps it all running.
          </p>

          <p className="text-base text-zinc-500 max-w-3xl leading-relaxed">
            For the operational subset Frank uses to run the business day-to-day, see{' '}
            <Link href="/os" className="text-cyan-300 hover:text-cyan-200 underline decoration-cyan-300/30 hover:decoration-cyan-300/60 underline-offset-2">
              FrankX OS
            </Link>
            . For the architectural model behind it,{' '}
            <Link href="/starlight-intelligence-system" className="text-sky-300 hover:text-sky-200 underline decoration-sky-300/30 hover:decoration-sky-300/60 underline-offset-2">
              Starlight Intelligence System
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Layer model strip */}
      <section className="relative py-6 border-y border-white/[0.04] bg-white/[0.01]">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 mb-4">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            <span>The 6-layer model</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {ECOSYSTEM_LAYERS.map((layer) => (
              <div key={layer.id} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                <div className="text-[11px] font-mono text-zinc-300 mb-1">{layer.label}</div>
                <p className="text-[11px] text-zinc-500 leading-snug">{layer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier sections */}
      {ECOSYSTEM_TIERS.map((tier) => (
        <TierSection key={tier.id} tierId={tier.id} label={tier.label} description={tier.description} />
      ))}

      {/* Footer */}
      <section className="py-16 border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-zinc-500 leading-relaxed mb-4">
            This map is generated from <code className="rounded bg-white/[0.04] px-1.5 py-0.5 font-mono text-xs">data/ecosystem.ts</code> —
            a typed registry of every shipped system. Update there, the page updates here.
          </p>
          <div className="flex items-center justify-center gap-3 text-xs text-zinc-600">
            <Link href="/os" className="inline-flex items-center gap-1.5 hover:text-zinc-400 transition-colors">
              FrankX OS
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/starlight-intelligence-system" className="inline-flex items-center gap-1.5 hover:text-zinc-400 transition-colors">
              Starlight Intelligence System
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/library/approach" className="hover:text-zinc-400 transition-colors">
              Library OS approach
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
