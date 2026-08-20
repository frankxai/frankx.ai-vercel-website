import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, CheckCircle2, AlertTriangle } from 'lucide-react'
import {
  evidenceGradeLabel,
  getAgentEntry,
  getAgentOrganization,
  getAllAgentEntries,
} from '@/lib/agent-hub/registry'
import { ldJson } from '@/lib/seo/jsonld'

export const revalidate = 3600

export function generateStaticParams() {
  return getAllAgentEntries().map((entry) => ({ slug: entry.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = getAgentEntry(slug)
  if (!entry) return { title: 'Not found' }
  const org = getAgentOrganization(entry.organization)
  const title = `${entry.name} — what it is for, and what to watch out for`
  return {
    title,
    description: entry.one_liner,
    alternates: { canonical: `https://frankx.ai/agent-hub/${entry.id}` },
    openGraph: {
      title,
      description: `${entry.name} by ${org?.name ?? entry.organization}: ${entry.one_liner}`,
      url: `https://frankx.ai/agent-hub/${entry.id}`,
      type: 'article',
    },
  }
}

export default async function AgentEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = getAgentEntry(slug)
  if (!entry) notFound()

  const org = getAgentOrganization(entry.organization)
  const siblings = getAllAgentEntries()
    .filter((candidate) => candidate.kind === entry.kind && candidate.id !== entry.id)
    .slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: entry.name,
    applicationCategory: 'DeveloperApplication',
    description: entry.one_liner,
    url: `https://frankx.ai/agent-hub/${entry.id}`,
    author: org ? { '@type': 'Organization', name: org.name, url: org.url } : undefined,
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai/' },
      { '@type': 'ListItem', position: 2, name: 'Agent Hub', item: 'https://frankx.ai/agent-hub' },
      {
        '@type': 'ListItem',
        position: 3,
        name: entry.name,
        item: `https://frankx.ai/agent-hub/${entry.id}`,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(breadcrumbJsonLd) }} />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/agent-hub"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Agent Hub
        </Link>

        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-emerald-400">
          {entry.kind === 'platform' ? 'Agent platform' : 'Agent framework'} · {org?.name ?? entry.organization}
        </p>
        <h1 className="mb-4 text-4xl font-bold leading-tight">{entry.name}</h1>
        <p className="mb-8 text-lg text-white/60">{entry.one_liner}</p>

        <dl className="mb-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <dt className="text-xs uppercase tracking-wider text-white/40">MCP support</dt>
            <dd className="mt-1 text-sm text-white/80">{entry.mcp}</dd>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <dt className="text-xs uppercase tracking-wider text-white/40">Where it runs</dt>
            <dd className="mt-1 text-sm text-white/80">{entry.interfaces.join(', ')}</dd>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <dt className="text-xs uppercase tracking-wider text-white/40">Pricing</dt>
            <dd className="mt-1 text-sm text-white/80">{entry.pricing_note}</dd>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <dt className="text-xs uppercase tracking-wider text-white/40">
              Evidence grade {entry.evidence_grade}
            </dt>
            <dd className="mt-1 text-sm text-white/80">{evidenceGradeLabel(entry.evidence_grade)}</dd>
          </div>
        </dl>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold">Best for</h2>
          <ul className="space-y-2">
            {entry.best_for.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {entry.watch_out ? (
          <section className="mb-8 rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-5">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-bold text-amber-200">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" /> Watch out
            </h2>
            <p className="text-sm leading-relaxed text-white/70">{entry.watch_out}</p>
          </section>
        ) : null}

        {entry.frankx_note ? (
          <section className="mb-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-5">
            <h2 className="mb-2 text-lg font-bold text-emerald-200">In the FrankX stack</h2>
            <p className="text-sm leading-relaxed text-white/70">{entry.frankx_note}</p>
          </section>
        ) : null}

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold">Where to get it</h2>
          <ul className="space-y-2">
            {entry.access.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-cyan-300 transition-colors hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                >
                  {link.name} <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-bold">Sources</h2>
          <ul className="space-y-1">
            {entry.sources.map((source) => (
              <li key={source}>
                <a
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-xs text-white/40 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  {source}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {siblings.length > 0 ? (
          <section className="border-t border-white/10 pt-8">
            <h2 className="mb-4 text-lg font-bold">Also in this category</h2>
            <div className="flex flex-wrap gap-2">
              {siblings.map((sibling) => (
                <Link
                  key={sibling.id}
                  href={`/agent-hub/${sibling.id}`}
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/70 transition-colors hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                >
                  {sibling.name}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
