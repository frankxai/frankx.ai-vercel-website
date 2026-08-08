import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { GenModelCard } from '@/components/models-hub/GenModelCard'
import { GenModelExplorer } from '@/components/models-hub/GenModelExplorer'
import {
  CATEGORY_ORDER,
  buildGenRows,
  getCategories,
  getCategory,
  getGenModelsByCategory,
} from '@/lib/models-hub/registry'

export const dynamicParams = false

export function generateStaticParams() {
  return CATEGORY_ORDER.map((category) => ({ category }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  const meta = getCategory(category)
  if (!meta) return { title: 'Category not found' }
  const title = `Best AI ${meta.label} Models 2026 — Compared & Ranked`
  return {
    title,
    description: `${meta.blurb} Verdicts, picks, pricing, and sources for ${meta.label.toLowerCase()} in 2026.`,
    keywords: [meta.query, `${meta.label.toLowerCase()} models`, `best ${meta.label.toLowerCase()} 2026`, 'ai model comparison'],
    alternates: { canonical: `https://frankx.ai/models/${category}` },
    openGraph: { title, description: meta.blurb, url: `https://frankx.ai/models/${category}`, type: 'website' },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const meta = getCategory(category)
  if (!meta) notFound()

  const models = getGenModelsByCategory(category)
  const rows = buildGenRows().filter((r) => r.category === category)
  const otherCategories = getCategories().filter((c) => c.id !== category)

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best AI ${meta.label} Models 2026`,
    description: meta.blurb,
    itemListElement: models.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: { '@type': 'SoftwareApplication', name: m.name, applicationCategory: 'AIApplication', url: `https://frankx.ai/models/${category}/${m.id}` },
    })),
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai/' },
      { '@type': 'ListItem', position: 2, name: 'Models', item: 'https://frankx.ai/models' },
      { '@type': 'ListItem', position: 3, name: meta.label, item: `https://frankx.ai/models/${category}` },
    ],
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        <nav className="mb-8">
          <Link href="/models" className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Generative Model Hub
          </Link>
        </nav>

        <header className="mb-10">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider" style={{ color: meta.accent }}>
            {models.length} models · 2026
          </p>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{meta.label}</h1>
          <p className="max-w-3xl text-lg text-white/60">{meta.tagline}</p>
          <p className="mt-3 max-w-3xl text-sm text-white/45">{meta.blurb}</p>
        </header>

        {/* Directory */}
        <section className="mb-12">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {models.map((m) => (
              <GenModelCard key={m.id} model={m} accent={meta.accent} />
            ))}
          </div>
        </section>

        {/* Explorer locked to category */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Compare {meta.label.toLowerCase()}</h2>
          <GenModelExplorer rows={rows} lockCategory={category} />
        </section>

        {/* Other categories */}
        <section className="border-t border-white/5 pt-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">Other modalities</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/llm-hub" className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/70 transition-colors hover:border-white/30 hover:text-white">
              Text & Reasoning →
            </Link>
            {otherCategories.map((c) => (
              <Link key={c.id} href={`/models/${c.id}`} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/70 transition-colors hover:border-white/30 hover:text-white">
                {c.label}
              </Link>
            ))}
          </div>
        </section>

        <footer className="mt-10 flex items-center justify-between border-t border-white/5 pt-6 text-sm">
          <Link href="/models" className="inline-flex items-center gap-1 text-white/50 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All modalities
          </Link>
          <a href="/models.json" className="inline-flex items-center gap-1 text-white/50 transition-colors hover:text-white">
            Agent JSON <ArrowRight className="h-4 w-4" />
          </a>
        </footer>
      </main>
    </div>
  )
}
