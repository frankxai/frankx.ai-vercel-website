import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check } from 'lucide-react'

import { COMPARISONS, getComparison } from '@/lib/llm-hub/comparisons'
import { formatContext, getModel, getProviders, type ModelEntry, type OrganizationEntry } from '@/lib/llm-hub/registry'
import { getEditorial } from '@/lib/llm-hub/editorial'
import { fetchLivePricing, type LivePricingMap } from '@/lib/llm-hub/openrouter'

export const revalidate = 3600

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }))
}

function orgForModel(modelOrg: string): OrganizationEntry | undefined {
  return getProviders().find((p) => p.org.slug === modelOrg || p.org.slug.includes(modelOrg))?.org
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cmp = getComparison(slug)
  if (!cmp) return { title: 'Comparison not found' }
  return {
    title: `${cmp.title}: Benchmarks, Pricing & Verdict (2026)`,
    description: cmp.description,
    keywords: cmp.keywords,
    alternates: { canonical: `https://frankx.ai/llm-hub/compare/${slug}` },
    openGraph: {
      title: `${cmp.title} — which to use in 2026`,
      description: cmp.description,
      url: `https://frankx.ai/llm-hub/compare/${slug}`,
      type: 'article',
    },
  }
}

function priceStr(m: ModelEntry, live: LivePricingMap, key: 'input' | 'output'): string {
  const lp = live[m.id]
  const v =
    key === 'input'
      ? lp?.inputPer1m ?? (typeof m.pricing?.input_per_1m === 'number' ? m.pricing.input_per_1m : null)
      : lp?.outputPer1m ?? (typeof m.pricing?.output_per_1m === 'number' ? m.pricing.output_per_1m : null)
  if (v === null) return '—'
  if (v === 0) return 'Open'
  return `$${v.toFixed(2)}`
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cmp = getComparison(slug)
  if (!cmp) notFound()

  const a = getModel(cmp.models[0])
  const b = getModel(cmp.models[1])
  if (!a || !b) notFound()

  const live = await fetchLivePricing()
  const orgA = orgForModel(a.organization)
  const orgB = orgForModel(b.organization)
  const accentA = orgA?.accent_color || '#a855f7'
  const accentB = orgB?.accent_color || '#10b981'

  const faq = [
    { q: `Is ${a.name} better than ${b.name}?`, a: cmp.verdict },
    { q: `When should I pick ${a.name}?`, a: cmp.pickFirst.join('; ') + '.' },
    { q: `When should I pick ${b.name}?`, a: cmp.pickSecond.join('; ') + '.' },
  ]

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai/' },
      { '@type': 'ListItem', position: 2, name: 'LLM Hub', item: 'https://frankx.ai/llm-hub' },
      { '@type': 'ListItem', position: 3, name: cmp.title, item: `https://frankx.ai/llm-hub/compare/${slug}` },
    ],
  }

  const specRows: { label: string; a: string; b: string }[] = [
    { label: 'Provider', a: orgA?.name || a.organization, b: orgB?.name || b.organization },
    { label: 'Released', a: a.released || '—', b: b.released || '—' },
    { label: 'Context', a: formatContext(a.context_window_beta || a.context_window), b: formatContext(b.context_window_beta || b.context_window) },
    { label: 'Max output', a: formatContext(a.max_output_tokens), b: formatContext(b.max_output_tokens) },
    { label: 'Input /1M', a: priceStr(a, live, 'input'), b: priceStr(b, live, 'input') },
    { label: 'Output /1M', a: priceStr(a, live, 'output'), b: priceStr(b, live, 'output') },
    { label: 'Modalities', a: (a.modalities || []).join(', ') || '—', b: (b.modalities || []).join(', ') || '—' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <main className="relative z-10 mx-auto max-w-4xl px-6 py-10">
        <nav className="mb-8">
          <Link href="/llm-hub" className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> LLM Provider Hub
          </Link>
        </nav>

        <header className="mb-8">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-white/40">Head-to-head · 2026</p>
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            <Link href={`/llm-hub/${a.id}`} style={{ color: accentA }} className="hover:underline">
              {a.name}
            </Link>
            <span className="text-white/30"> vs </span>
            <Link href={`/llm-hub/${b.id}`} style={{ color: accentB }} className="hover:underline">
              {b.name}
            </Link>
          </h1>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm leading-relaxed text-white/80">
              <span className="font-semibold text-white">Verdict. </span>
              {cmp.verdict}
            </p>
          </div>
        </header>

        {/* Spec table */}
        <section className="mb-10">
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="py-3 pl-4 pr-6 text-xs font-medium uppercase tracking-wider text-white/40"></th>
                  <th className="py-3 pr-6 font-semibold" style={{ color: accentA }}>
                    {a.name}
                  </th>
                  <th className="py-3 pr-4 font-semibold" style={{ color: accentB }}>
                    {b.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {specRows.map((r) => (
                  <tr key={r.label} className="border-b border-white/5 last:border-0">
                    <td className="py-3 pl-4 pr-6 text-xs uppercase tracking-wider text-white/40">{r.label}</td>
                    <td className="py-3 pr-6 font-mono text-white/80">{r.a}</td>
                    <td className="py-3 pr-4 font-mono text-white/80">{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Analysis */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">The analysis</h2>
          <div className="space-y-4">
            {cmp.analysis.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-white/65">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* Pick A / Pick B */}
        <section className="mb-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6" style={{ borderTopColor: `${accentA}66`, borderTopWidth: 2 }}>
            <h3 className="mb-3 font-bold">
              Pick <span style={{ color: accentA }}>{a.name}</span> if…
            </h3>
            <ul className="space-y-2 text-sm text-white/65">
              {cmp.pickFirst.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accentA }} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6" style={{ borderTopColor: `${accentB}66`, borderTopWidth: 2 }}>
            <h3 className="mb-3 font-bold">
              Pick <span style={{ color: accentB }}>{b.name}</span> if…
            </h3>
            <ul className="space-y-2 text-sm text-white/65">
              {cmp.pickSecond.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accentB }} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Editorial taglines */}
        <section className="mb-10 grid gap-3 md:grid-cols-2 text-sm text-white/55">
          {[a, b].map((m) => {
            const ed = getEditorial(m.id)
            if (!ed) return null
            return (
              <Link key={m.id} href={`/llm-hub/${m.id}`} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/25">
                <p className="font-medium text-white">{m.name}</p>
                <p className="mt-1 text-xs">{ed.tagline}</p>
              </Link>
            )
          })}
        </section>

        {/* Other comparisons */}
        <section className="border-t border-white/5 pt-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">More comparisons</h2>
          <div className="flex flex-wrap gap-2">
            {COMPARISONS.filter((c) => c.slug !== slug).map((c) => (
              <Link
                key={c.slug}
                href={`/llm-hub/compare/${c.slug}`}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/60 transition-colors hover:border-white/30 hover:text-white"
              >
                {c.title}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
