import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check, ExternalLink } from 'lucide-react'

import { GEN_COMPARISONS, getGenComparison } from '@/lib/models-hub/comparisons'
import {
  categoryAccent,
  getCategory,
  getGenModel,
  getOrg,
} from '@/lib/models-hub/registry'

export const dynamicParams = false

export function generateStaticParams() {
  return GEN_COMPARISONS.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cmp = getGenComparison(slug)
  if (!cmp) return { title: 'Comparison not found' }
  return {
    title: `${cmp.title}: Verdict, Specs & Picks (2026)`,
    description: cmp.description,
    keywords: cmp.keywords,
    alternates: { canonical: `https://frankx.ai/models/compare/${slug}` },
    openGraph: {
      title: `${cmp.title} — which to use in 2026`,
      description: cmp.description,
      url: `https://frankx.ai/models/compare/${slug}`,
      type: 'article',
    },
  }
}

export default async function ModelComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cmp = getGenComparison(slug)
  if (!cmp) notFound()

  const a = getGenModel(cmp.models[0])
  const b = getGenModel(cmp.models[1])
  if (!a || !b) notFound()

  const orgA = getOrg(a.organization)
  const orgB = getOrg(b.organization)
  const accentA = orgA?.accent_color || categoryAccent(a.category)
  const accentB = orgB?.accent_color || categoryAccent(b.category)
  const catA = getCategory(a.category)

  const specRows: { label: string; a: string; b: string }[] = [
    { label: 'Provider', a: orgA?.name || a.organization, b: orgB?.name || b.organization },
    { label: 'Category', a: catA?.label || a.category, b: getCategory(b.category)?.label || b.category },
    { label: 'Released', a: a.released || '—', b: b.released || '—' },
    { label: 'I/O', a: a.io || '—', b: b.io || '—' },
    { label: 'License', a: a.license || '—', b: b.license || '—' },
    { label: 'Pricing', a: a.pricing_note || '—', b: b.pricing_note || '—' },
    { label: 'Edge', a: a.highlight || '—', b: b.highlight || '—' },
  ]

  const faq = [
    { q: `Is ${a.name} better than ${b.name}?`, a: cmp.verdict },
    { q: `When should I pick ${a.name}?`, a: cmp.pickFirst.join('; ') + '.' },
    { q: `When should I pick ${b.name}?`, a: cmp.pickSecond.join('; ') + '.' },
  ]

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai/' },
      { '@type': 'ListItem', position: 2, name: 'Models', item: 'https://frankx.ai/models' },
      { '@type': 'ListItem', position: 3, name: cmp.title, item: `https://frankx.ai/models/compare/${slug}` },
    ],
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <main className="relative z-10 mx-auto max-w-4xl px-6 py-10">
        <nav className="mb-8">
          <Link href="/models" className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Generative Model Hub
          </Link>
        </nav>

        <header className="mb-8">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-white/40">Head-to-head · 2026</p>
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            <Link href={`/models/${a.category}/${a.id}`} style={{ color: accentA }} className="hover:underline">
              {a.name}
            </Link>
            <span className="text-white/30"> vs </span>
            <Link href={`/models/${b.category}/${b.id}`} style={{ color: accentB }} className="hover:underline">
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

        <section className="mb-10">
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="py-3 pl-4 pr-6 text-xs font-medium uppercase tracking-wider text-white/40"></th>
                  <th className="py-3 pr-6 font-semibold" style={{ color: accentA }}>{a.name}</th>
                  <th className="py-3 pr-4 font-semibold" style={{ color: accentB }}>{b.name}</th>
                </tr>
              </thead>
              <tbody>
                {specRows.map((r) => (
                  <tr key={r.label} className="border-b border-white/5 last:border-0">
                    <td className="py-3 pl-4 pr-6 text-xs uppercase tracking-wider text-white/40">{r.label}</td>
                    <td className="py-3 pr-6 text-white/80">{r.a}</td>
                    <td className="py-3 pr-4 text-white/80">{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

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

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">Run them</h2>
          <p className="mb-4 text-sm text-white/55">
            Both models are available through their official platforms — and the FrankX ecosystem runs generation via{' '}
            <a href="https://github.com/frankxai/arcanea-studio" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">arcanea-studio</a>.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {[a, b].map((m) => (
              <Link key={m.id} href={`/models/${m.category}/${m.id}`} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/25">
                <p className="font-medium text-white">{m.name}</p>
                <p className="mt-1 text-xs text-white/45">{m.tagline || m.highlight}</p>
                <p className="mt-2 inline-flex items-center gap-1 text-xs text-white/50">
                  Full page <ExternalLink className="h-3 w-3" />
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-white/5 pt-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">More comparisons</h2>
          <div className="flex flex-wrap gap-2">
            {GEN_COMPARISONS.filter((c) => c.slug !== slug).map((c) => (
              <Link key={c.slug} href={`/models/compare/${c.slug}`} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/60 transition-colors hover:border-white/30 hover:text-white">
                {c.title}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
