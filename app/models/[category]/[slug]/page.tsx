import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'

import {
  getAllGenModels,
  getCategory,
  getGenModel,
  getGenModelsByCategory,
  getOrg,
} from '@/lib/models-hub/registry'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllGenModels().map((m) => ({ category: m.category, slug: m.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const model = getGenModel(slug)
  if (!model) return { title: 'Model not found' }
  const org = getOrg(model.organization)
  const title = `${model.name} — Capabilities, Pricing & Verdict (2026)`
  return {
    title,
    description: model.tagline || `${model.name} by ${org?.name}: what it's best for, how to access it, and where it fits in 2026.`,
    keywords: [`${model.name.toLowerCase()}`, `${model.name.toLowerCase()} pricing`, `${model.name.toLowerCase()} vs`, `best ${model.category} ai 2026`],
    alternates: { canonical: `https://frankx.ai/models/${model.category}/${slug}` },
    openGraph: { title, description: model.tagline, url: `https://frankx.ai/models/${model.category}/${slug}`, type: 'article' },
  }
}

export default async function GenModelPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { slug } = await params
  const model = getGenModel(slug)
  if (!model) notFound()

  const cat = getCategory(model.category)
  const accent = cat?.accent || '#10b981'
  const org = getOrg(model.organization)
  const related = getGenModelsByCategory(model.category).filter((m) => m.id !== slug).slice(0, 5)

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: model.name,
    applicationCategory: 'AIApplication',
    applicationSubCategory: cat?.label,
    operatingSystem: 'Cloud',
    description: model.tagline,
    datePublished: model.released,
    author: { '@type': 'Organization', name: org?.name || model.organization, url: org?.url },
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai/' },
      { '@type': 'ListItem', position: 2, name: 'Models', item: 'https://frankx.ai/models' },
      { '@type': 'ListItem', position: 3, name: cat?.label, item: `https://frankx.ai/models/${model.category}` },
      { '@type': 'ListItem', position: 4, name: model.name, item: `https://frankx.ai/models/${model.category}/${slug}` },
    ],
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <main className="relative z-10 mx-auto max-w-4xl px-6 py-10">
        <nav className="mb-8 flex items-center gap-2 text-sm text-white/50">
          <Link href="/models" className="transition-colors hover:text-white">Models</Link>
          <span className="text-white/20">/</span>
          <Link href={`/models/${model.category}`} className="transition-colors hover:text-white">{cat?.label}</Link>
        </nav>

        <header className="mb-10">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: org?.accent_color || accent }} aria-hidden />
            <span className="text-sm text-white/50">{org?.name || model.organization}</span>
            <span className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider" style={{ backgroundColor: `${accent}1a`, color: accent }}>
              {cat?.label}
            </span>
            {model.status === 'preview' ? (
              <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-amber-300">Preview</span>
            ) : model.status === 'legacy' ? (
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/50">Legacy</span>
            ) : null}
          </div>
          <h1 className="mb-3 text-4xl font-bold md:text-5xl">{model.name}</h1>
          {model.tagline ? <p className="max-w-2xl text-lg text-white/60">{model.tagline}</p> : null}
          {model.highlight ? (
            <span className="mt-4 inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider" style={{ backgroundColor: `${accent}1a`, color: accent }}>
              {model.highlight}
            </span>
          ) : null}
        </header>

        {/* Specs */}
        <section className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Spec label="Input → Output" value={model.io || '—'} />
          <Spec label="Released" value={model.released || '—'} />
          <Spec label="License" value={model.license || '—'} />
          <Spec label="Pricing" value={model.pricing_note || '—'} />
        </section>

        {/* Best for / watch out */}
        <section className="mb-10 grid gap-4 md:grid-cols-2">
          {model.best_for && model.best_for.length > 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: accent }}>Best for</h2>
              <ul className="space-y-2 text-sm text-white/65">
                {model.best_for.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: accent }} aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {model.watch_out || model.frankx_note ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              {model.watch_out ? (
                <>
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-300/80">Watch out</h2>
                  <p className="text-sm leading-relaxed text-white/60">{model.watch_out}</p>
                </>
              ) : null}
              {model.frankx_note ? (
                <p className={`text-sm leading-relaxed text-white/60 ${model.watch_out ? 'mt-4 border-t border-white/5 pt-4' : ''}`}>
                  <span className="font-semibold text-white/70">FrankX note. </span>
                  {model.frankx_note}
                </p>
              ) : null}
            </div>
          ) : null}
        </section>

        {/* Access */}
        {model.access && model.access.length > 0 ? (
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">Where to run it</h2>
            <div className="flex flex-wrap gap-2">
              {model.access.map((a) => (
                <a key={a.name} href={a.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/70 transition-colors hover:border-white/30 hover:text-white">
                  {a.name}
                  <ExternalLink className="h-3 w-3 text-white/30" />
                </a>
              ))}
              <a href="https://github.com/frankxai/arcanea-studio" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors" style={{ borderColor: `${accent}40`, color: accent }}>
                Generate via Arcanea Studio
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </section>
        ) : null}

        {/* Related */}
        {related.length > 0 ? (
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">More {cat?.label.toLowerCase()}</h2>
            <div className="flex flex-wrap gap-2">
              {related.map((m) => (
                <Link key={m.id} href={`/models/${m.category}/${m.id}`} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/70 transition-colors hover:border-white/30 hover:text-white">
                  {m.name}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {/* Sources */}
        {model.sources && model.sources.length > 0 ? (
          <section className="mb-10 border-t border-white/5 pt-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/40">Sources</h2>
            <ul className="space-y-1.5">
              {model.sources.map((s) => (
                <li key={s}>
                  <a href={s} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-white/40 transition-colors hover:text-white/70">
                    {s} <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <footer className="flex items-center justify-between border-t border-white/5 pt-6 text-sm">
          <Link href={`/models/${model.category}`} className="inline-flex items-center gap-1 text-white/50 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All {cat?.label.toLowerCase()}
          </Link>
          <Link href="/models" className="inline-flex items-center gap-1 text-white/50 transition-colors hover:text-white">
            Model Hub <ArrowRight className="h-4 w-4" />
          </Link>
        </footer>
      </main>
    </div>
  )
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <p className="mb-1 text-[10px] uppercase tracking-wider text-white/40">{label}</p>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  )
}
