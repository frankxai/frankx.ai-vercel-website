import Link from 'next/link'
import Script from 'next/script'
import { Metadata } from 'next'
import { PILLARS, pillarCounts } from '@/data/acos/agents'
import { ArrowRight, CircleDashed, Hammer, CircleCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: '99 Agents — The Complete Creator OS | ACOS',
  description: 'Every agent, skill, and command in the ACOS Creator OS — organized into 11 pillars × 9 specialists = 99 agents. Open source, MIT licensed.',
  alternates: { canonical: 'https://frankx.ai/acos/agents' },
  openGraph: {
    title: '99 Agents — The Complete Creator OS',
    description: 'The full specialist catalog inside ACOS. Shipped, in-progress, and planned.',
    url: 'https://frankx.ai/acos/agents',
    siteName: 'FrankX',
    type: 'website',
  },
}

const STATUS_STYLE: Record<string, { label: string; className: string; Icon: typeof CircleCheck }> = {
  shipped: {
    label: 'Shipped',
    className: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300',
    Icon: CircleCheck,
  },
  'in-progress': {
    label: 'In progress',
    className: 'border-amber-400/30 bg-amber-500/10 text-amber-300',
    Icon: Hammer,
  },
  gap: {
    label: 'Gap',
    className: 'border-slate-400/20 bg-slate-500/10 text-slate-300',
    Icon: CircleDashed,
  },
}

const ACCENT_GRADIENTS: Record<string, string> = {
  emerald: 'from-emerald-500/20 via-transparent to-transparent',
  cyan: 'from-cyan-500/20 via-transparent to-transparent',
  violet: 'from-violet-500/20 via-transparent to-transparent',
  amber: 'from-amber-500/20 via-transparent to-transparent',
  rose: 'from-rose-500/20 via-transparent to-transparent',
  sky: 'from-sky-500/20 via-transparent to-transparent',
  teal: 'from-teal-500/20 via-transparent to-transparent',
  fuchsia: 'from-fuchsia-500/20 via-transparent to-transparent',
  indigo: 'from-indigo-500/20 via-transparent to-transparent',
  lime: 'from-lime-500/20 via-transparent to-transparent',
  orange: 'from-orange-500/20 via-transparent to-transparent',
}

const ACCENT_RINGS: Record<string, string> = {
  emerald: 'ring-emerald-400/20',
  cyan: 'ring-cyan-400/20',
  violet: 'ring-violet-400/20',
  amber: 'ring-amber-400/20',
  rose: 'ring-rose-400/20',
  sky: 'ring-sky-400/20',
  teal: 'ring-teal-400/20',
  fuchsia: 'ring-fuchsia-400/20',
  indigo: 'ring-indigo-400/20',
  lime: 'ring-lime-400/20',
  orange: 'ring-orange-400/20',
}

export default function ACOSAgentsPage() {
  const counts = pillarCounts()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '99 Agents — The Complete Creator OS',
    description: 'Full catalog of ACOS agents, skills, and commands organized into 11 pillars.',
    url: 'https://frankx.ai/acos/agents',
    isPartOf: {
      '@type': 'WebSite',
      name: 'FrankX',
      url: 'https://frankx.ai',
    },
    about: {
      '@type': 'SoftwareApplication',
      name: 'Agentic Creator OS',
      url: 'https://frankx.ai/acos',
    },
    hasPart: PILLARS.map((p) => ({
      '@type': 'Collection',
      name: p.title,
      description: p.tagline,
      url: `https://frankx.ai/acos/agents#${p.id}`,
    })),
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      <Script
        id="acos-agents-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-[#02030b] to-cyan-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(161,72,221,0.15),transparent_55%)]" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-purple-200">
            99 Agents · Open Source
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent">
              99 agents for a complete Creator OS.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
            Eleven pillars. Nine specialists per pillar. Every agent, skill, and command Frank
            uses to build frankx.ai — open-sourced and organized so you can run the same stack.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatTile value={counts.total} label="Total slots" accent="from-white/10 to-white/5" />
            <StatTile value={counts.shipped} label="Shipped" accent="from-emerald-500/20 to-emerald-500/5" />
            <StatTile value={counts.inProgress} label="In progress" accent="from-amber-500/20 to-amber-500/5" />
            <StatTile value={counts.gap} label="Gap" accent="from-slate-500/20 to-slate-500/5" />
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/acos"
              className="inline-flex items-center gap-2 rounded-xl border border-purple-400/30 bg-purple-500/10 px-5 py-3 text-sm font-semibold text-purple-100 transition hover:bg-purple-500/20"
            >
              Back to ACOS overview <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://github.com/frankxai/agentic-creator-os"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              target="_blank"
              rel="noopener"
            >
              Clone on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Pillar index */}
      <section className="border-t border-white/5 bg-[#06060a] py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {PILLARS.map((p) => {
              const s = p.specialists.filter((x) => x.status === 'shipped').length
              return (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className={`rounded-xl border border-white/10 bg-gradient-to-br ${ACCENT_GRADIENTS[p.accent]} px-3 py-4 text-left transition hover:border-white/20`}
                >
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                    Pillar {String(p.number).padStart(2, '0')}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">{p.title}</div>
                  <div className="mt-2 text-xs text-slate-400">{s}/9 shipped</div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl space-y-20 px-6 py-20">
        {PILLARS.map((p) => (
          <article key={p.id} id={p.id} className="scroll-mt-20">
            <header className={`relative rounded-2xl border border-white/10 bg-gradient-to-br ${ACCENT_GRADIENTS[p.accent]} p-8`}>
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Pillar {String(p.number).padStart(2, '0')}
              </div>
              <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">{p.title}</h2>
                <Link
                  href={p.surface}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
                >
                  {p.surface} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <p className="mt-3 max-w-3xl text-base text-slate-300">{p.tagline}</p>
            </header>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {p.specialists.map((s) => {
                const { label, className, Icon } = STATUS_STYLE[s.status]
                return (
                  <div
                    key={s.name}
                    className={`rounded-xl border border-white/10 bg-white/[0.02] p-5 ring-1 ${ACCENT_RINGS[p.accent]} transition hover:bg-white/[0.04]`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-white">{s.name}</div>
                        {s.ref && (
                          <div className="mt-0.5 font-mono text-[11px] text-slate-400">{s.ref}</div>
                        )}
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${className}`}
                      >
                        <Icon className="h-3 w-3" />
                        {label}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{s.one_liner}</p>
                    <div className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                      {s.kind}
                    </div>
                  </div>
                )
              })}
            </div>
          </article>
        ))}
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 bg-gradient-to-b from-[#0a0a0b] to-[#02030b] py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Run the same stack Frank runs.</h2>
          <p className="mt-4 text-lg text-slate-300">
            Every agent on this page is a markdown file or a config block. Clone the repo, read the
            source, fork what fits, leave what doesn&apos;t. MIT license. No lock-in.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://github.com/frankxai/agentic-creator-os"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0a0a0b] transition hover:bg-slate-100"
              target="_blank"
              rel="noopener"
            >
              Clone on GitHub
            </a>
            <Link
              href="/newsletter?ref=acos-agents"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Join the newsletter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function StatTile({ value, label, accent }: { value: number; label: string; accent: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${accent} p-5 text-center`}>
      <div className="text-3xl font-bold text-white sm:text-4xl">{value}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </div>
    </div>
  )
}
