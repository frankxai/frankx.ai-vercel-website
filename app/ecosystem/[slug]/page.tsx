import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, ExternalLink, Github, Globe, Layers } from 'lucide-react'
import {
  getEntryBySlug,
  getRelated,
  isPublicEcosystemEntry,
  publicEcosystemEntries,
  type EcosystemEntry,
} from '@/data/ecosystem'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return publicEcosystemEntries.map((e) => ({ slug: e.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const entry = getEntryBySlug(slug)
  if (!entry || !isPublicEcosystemEntry(entry)) {
    return { title: 'System not found — FrankX Ecosystem' }
  }
  return {
    title: `${entry.name} — FrankX Ecosystem`,
    description: entry.summary,
    openGraph: {
      title: `${entry.name} — FrankX Ecosystem`,
      description: entry.summary,
      type: 'website',
    },
    alternates: { canonical: `https://frankx.ai/ecosystem/${entry.slug}` },
  }
}

const COLOR_TOKENS = {
  cyan: { text: 'text-cyan-300', bg: 'bg-cyan-500/10', glow: 'from-cyan-500/[0.10]', border: 'border-cyan-500/25' },
  violet: { text: 'text-violet-300', bg: 'bg-violet-500/10', glow: 'from-violet-500/[0.10]', border: 'border-violet-500/25' },
  amber: { text: 'text-amber-300', bg: 'bg-amber-500/10', glow: 'from-amber-500/[0.10]', border: 'border-amber-500/25' },
  emerald: { text: 'text-emerald-300', bg: 'bg-emerald-500/10', glow: 'from-emerald-500/[0.10]', border: 'border-emerald-500/25' },
  rose: { text: 'text-rose-300', bg: 'bg-rose-500/10', glow: 'from-rose-500/[0.10]', border: 'border-rose-500/25' },
  slate: { text: 'text-zinc-200', bg: 'bg-zinc-500/10', glow: 'from-zinc-500/[0.10]', border: 'border-zinc-500/25' },
  sky: { text: 'text-sky-300', bg: 'bg-sky-500/10', glow: 'from-sky-500/[0.10]', border: 'border-sky-500/25' },
  fuchsia: { text: 'text-fuchsia-300', bg: 'bg-fuchsia-500/10', glow: 'from-fuchsia-500/[0.10]', border: 'border-fuchsia-500/25' },
  lime: { text: 'text-lime-300', bg: 'bg-lime-500/10', glow: 'from-lime-500/[0.10]', border: 'border-lime-500/25' },
  orange: { text: 'text-orange-300', bg: 'bg-orange-500/10', glow: 'from-orange-500/[0.10]', border: 'border-orange-500/25' },
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

const TIER_LABEL = {
  'tier-1-frankx-surface': 'FrankX Surface',
  'tier-2-substrate': 'Open-Source Substrate',
  'tier-3-operational': 'Operational',
  'tier-4-ops-tooling': 'Ops Tooling',
}

function EntrySchema({ entry }: { entry: EcosystemEntry }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: entry.name,
    description: entry.summary,
    url: `https://frankx.ai/ecosystem/${entry.slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Ecosystem', item: 'https://frankx.ai/ecosystem' },
        { '@type': 'ListItem', position: 3, name: entry.name, item: `https://frankx.ai/ecosystem/${entry.slug}` },
      ],
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
}

export default async function EcosystemEntryPage({ params }: PageProps) {
  const { slug } = await params
  const entry = getEntryBySlug(slug)
  if (!entry || !isPublicEcosystemEntry(entry)) notFound()

  const tokens = COLOR_TOKENS[entry.color]
  const related = getRelated(entry.id).filter(isPublicEcosystemEntry)

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <EntrySchema entry={entry} />

      {/* Hero */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-cyan-300/40" aria-hidden="true" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/ecosystem"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-6"
          >
            <ArrowLeft className="h-3 w-3" aria-hidden="true" />
            <span>Back to ecosystem</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${STATUS_STYLE[entry.status]}`}>
              {STATUS_LABEL[entry.status]}
            </span>
            <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-0.5 text-[11px] font-mono text-zinc-400">
              {TIER_LABEL[entry.tier]}
            </span>
            <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-0.5 text-[11px] font-mono text-zinc-400">
              {entry.layer}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500">
              <span aria-hidden="true">·</span>
              <span>Shipped {entry.shipped}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-50 leading-tight tracking-tight mb-4">
            {entry.name}
          </h1>

          <p className={`text-lg ${tokens.text} mb-5`}>{entry.summary}</p>

          <p className="text-base text-zinc-400 leading-relaxed max-w-3xl">{entry.description}</p>

          {(entry.publicUrl || entry.repoUrl) && (
            <div className="flex flex-wrap items-center gap-3 mt-6">
              {entry.publicUrl && (
                <a
                  href={entry.publicUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1.5 rounded-lg border ${tokens.border} ${tokens.bg} px-4 py-2 text-sm ${tokens.text} hover:bg-white/[0.05] transition-colors`}
                >
                  <Globe className="h-4 w-4" aria-hidden="true" />
                  <span>Open</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              )}
              {entry.repoUrl && (
                <a
                  href={entry.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-sm text-zinc-300 hover:bg-white/[0.05] transition-colors"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>Repo</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Boundary + Related */}
      <section className="py-12 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-6">
            <p className="text-sm font-medium text-zinc-500">Operating boundary</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Public pages describe the architecture and proof available today. Credentials, private records, production authority,
              and high-stakes decisions remain outside the public system.
            </p>
          </div>

          {related.length > 0 && (
            <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-6">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 mb-4">
                <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Connects to</span>
              </div>
              <ul className="space-y-2">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/ecosystem/${r.slug}`}
                      className="group inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-zinc-100 transition-colors"
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${COLOR_TOKENS[r.color].bg.replace('/10', '/40')}`} aria-hidden="true" />
                      <span>{r.name}</span>
                      <ArrowRight className="h-3 w-3 text-zinc-600 group-hover:text-zinc-400 transition-colors" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Evidence + maturity */}
      <section className="py-12 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-6">
            <h3 className="text-sm font-semibold text-zinc-50 mb-3">Evidence and maturity</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs text-zinc-500 mb-1">Maturity</dt>
                <dd className="text-zinc-300">{STATUS_LABEL[entry.status]}</dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-500 mb-1">Public role</dt>
                <dd className="text-zinc-300">{TIER_LABEL[entry.tier]}</dd>
              </div>
              {entry.repoUrl && (
                <div className="sm:col-span-2">
                  <dt className="text-xs text-zinc-500 mb-1">Open repository</dt>
                  <dd>
                    <a href={entry.repoUrl} target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-cyan-300">
                      {entry.repo}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-16 border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/ecosystem"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>All systems</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
