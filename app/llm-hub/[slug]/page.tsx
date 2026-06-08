import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, Zap } from 'lucide-react'

import {
  formatContext,
  getAllModels,
  getModel,
  getPlatform,
  getProviders,
  type OrganizationEntry,
} from '@/lib/llm-hub/registry'
import { getEditorial } from '@/lib/llm-hub/editorial'
import { comparisonsForModel } from '@/lib/llm-hub/comparisons'
import { articleForModel } from '@/lib/llm-hub/articles'
import { fetchLivePricing } from '@/lib/llm-hub/openrouter'
import { ldJson } from '@/lib/seo/jsonld'
import { CapabilityBadge } from '@/components/llm-hub/CapabilityBadge'

export const revalidate = 3600

export function generateStaticParams() {
  return getAllModels().map((m) => ({ slug: m.id }))
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
  const model = getModel(slug)
  if (!model) return { title: 'Model not found' }
  const ed = getEditorial(slug)
  const org = orgForModel(model.organization)
  const title = `${model.name} — Benchmarks, Pricing & Capabilities (2026)`
  const description =
    ed?.tagline ||
    `${model.name} by ${org?.name || model.organization}: context window, pricing, benchmarks, and what to use it for in 2026.`
  return {
    title,
    description,
    keywords: [
      `${model.name.toLowerCase()} benchmarks`,
      `${model.name.toLowerCase()} pricing`,
      `${model.name.toLowerCase()} context window`,
      `${model.name.toLowerCase()} vs`,
      'best llm 2026',
    ],
    alternates: { canonical: `https://frankx.ai/llm-hub/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://frankx.ai/llm-hub/${slug}`,
      type: 'article',
    },
  }
}

export default async function ModelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const model = getModel(slug)
  if (!model) notFound()

  const ed = getEditorial(slug)
  const org = orgForModel(model.organization)
  const accent = org?.accent_color || '#a855f7'
  const live = (await fetchLivePricing())[slug]

  const inputPrice = live?.inputPer1m ?? (typeof model.pricing?.input_per_1m === 'number' ? model.pricing.input_per_1m : null)
  const outputPrice = live?.outputPer1m ?? (typeof model.pricing?.output_per_1m === 'number' ? model.pricing.output_per_1m : null)

  const comparisons = comparisonsForModel(slug)
  const articleSlug = articleForModel(model.id)
  const platforms = (org?.agentic_platforms || [])
    .map((id) => getPlatform(id))
    .filter(Boolean)

  // Related: other models from same org + flagship of other orgs
  const related = getAllModels()
    .filter((m) => m.id !== slug && m.organization === model.organization)
    .slice(0, 4)

  const benchmarkEntries = model.benchmarks
    ? Object.entries(model.benchmarks).filter(([, v]) => typeof v === 'number')
    : []

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: model.name,
    applicationCategory: 'AIApplication',
    operatingSystem: 'Cloud',
    description: ed?.tagline,
    datePublished: model.released,
    softwareVersion: model.id,
    author: { '@type': 'Organization', name: org?.name || model.organization, url: org?.url },
    ...(inputPrice !== null
      ? {
          offers: {
            '@type': 'Offer',
            price: inputPrice,
            priceCurrency: 'USD',
            description: `${inputPrice} USD per 1M input tokens`,
          },
        }
      : {}),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai/' },
      { '@type': 'ListItem', position: 2, name: 'LLM Hub', item: 'https://frankx.ai/llm-hub' },
      { '@type': 'ListItem', position: 3, name: model.name, item: `https://frankx.ai/llm-hub/${slug}` },
    ],
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(breadcrumb) }} />

      <main className="relative z-10 mx-auto max-w-4xl px-6 py-10">
        <nav className="mb-8">
          <Link href="/llm-hub" className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> LLM Provider Hub
          </Link>
        </nav>

        {/* Hero */}
        <header className="mb-10">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: accent }} aria-hidden />
            <span className="text-sm text-white/50">{org?.name || model.organization}</span>
            {model.status === 'preview' ? (
              <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-300">
                Preview
              </span>
            ) : model.status === 'ga' ? (
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-300">
                GA
              </span>
            ) : null}
          </div>
          <h1 className="mb-3 text-4xl font-bold md:text-5xl">{model.name}</h1>
          {ed?.tagline ? <p className="max-w-2xl text-lg text-white/60">{ed.tagline}</p> : null}
          {articleSlug ? (
            <Link
              href={`/blog/${articleSlug}`}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
              style={{ borderColor: `${accent}55`, color: accent, backgroundColor: `${accent}14` }}
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" /> Read the full {model.name} analysis
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
          {org?.capability_focus && org.capability_focus.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {org.capability_focus.map((c) => (
                <CapabilityBadge key={c} capability={c} href={`/llm-hub#${c}`} />
              ))}
            </div>
          ) : null}
        </header>

        {/* Spec grid */}
        <section className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Spec label="Context" value={formatContext(model.context_window_beta || model.context_window)} />
          <Spec label="Max output" value={formatContext(model.max_output_tokens)} />
          <Spec
            label="Input /1M"
            value={inputPrice === null ? '—' : inputPrice === 0 ? 'Open' : `$${inputPrice.toFixed(2)}`}
            live={Boolean(live)}
          />
          <Spec
            label="Output /1M"
            value={outputPrice === null ? '—' : outputPrice === 0 ? 'Open' : `$${outputPrice.toFixed(2)}`}
            live={Boolean(live)}
          />
        </section>

        {live ? (
          <p className="-mt-6 mb-10 inline-flex items-center gap-1.5 text-xs text-emerald-400/70">
            <Zap className="h-3 w-3" /> Live pricing via{' '}
            <a href="https://openrouter.ai/models" target="_blank" rel="noopener noreferrer" className="underline">
              OpenRouter
            </a>
          </p>
        ) : null}

        {/* Editorial: best for / watch out */}
        {ed ? (
          <section className="mb-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: accent }}>
                Best for
              </h2>
              <ul className="space-y-2 text-sm text-white/65">
                {ed.bestFor.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: accent }} aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            {ed.watchOut ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-300/80">Watch out</h2>
                <p className="text-sm leading-relaxed text-white/60">{ed.watchOut}</p>
                {ed.creatorUse ? (
                  <p className="mt-4 border-t border-white/5 pt-4 text-sm leading-relaxed text-white/60">
                    <span className="font-semibold text-white/70">For creators. </span>
                    {ed.creatorUse}
                  </p>
                ) : null}
              </div>
            ) : null}
          </section>
        ) : null}

        {/* Benchmarks */}
        {benchmarkEntries.length > 0 ? (
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">Benchmarks</h2>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <tbody>
                  {benchmarkEntries.map(([k, v]) => (
                    <tr key={k} className="border-b border-white/5 last:border-0">
                      <td className="py-3 pl-4 pr-6 font-mono text-white/60">{k.replace(/_/g, ' ')}</td>
                      <td className="py-3 pr-4 text-right font-mono font-medium text-white">{String(v)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {/* Key capabilities */}
        {model.key_capabilities && model.key_capabilities.length > 0 ? (
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">Capabilities</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {model.key_capabilities.map((c) => (
                <li key={c} className="flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-sm text-white/65">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: accent }} aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Agentic platforms */}
        {platforms.length > 0 ? (
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">Where it runs</h2>
            <div className="flex flex-wrap gap-2">
              {platforms.map((p) => (
                <a
                  key={p!.id}
                  href={p!.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/70 transition-colors hover:border-white/30 hover:text-white"
                >
                  {p!.name}
                  <ExternalLink className="h-3 w-3 text-white/30" />
                </a>
              ))}
            </div>
          </section>
        ) : null}

        {/* Comparisons */}
        {comparisons.length > 0 ? (
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">Compare {model.name}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {comparisons.map((c) => (
                <Link
                  key={c.slug}
                  href={`/llm-hub/compare/${c.slug}`}
                  className="group rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/25"
                >
                  <p className="text-sm font-medium text-white transition-colors group-hover:text-emerald-300">{c.title}</p>
                  <p className="mt-1 text-xs text-white/45">{c.verdict}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {/* Related */}
        {related.length > 0 ? (
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">More from {org?.name || model.organization}</h2>
            <div className="flex flex-wrap gap-2">
              {related.map((m) => (
                <Link
                  key={m.id}
                  href={`/llm-hub/${m.id}`}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/70 transition-colors hover:border-white/30 hover:text-white"
                >
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
                  <a
                    href={s}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-white/40 transition-colors hover:text-white/70"
                  >
                    {s} <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <footer className="flex items-center justify-between border-t border-white/5 pt-6 text-sm">
          <Link href="/llm-hub" className="inline-flex items-center gap-1 text-white/50 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All providers
          </Link>
          <Link href="/ai-ops/models-2026" className="inline-flex items-center gap-1 text-white/50 transition-colors hover:text-white">
            Benchmark arena <ArrowRight className="h-4 w-4" />
          </Link>
        </footer>
      </main>
    </div>
  )
}

function Spec({ label, value, live }: { label: string; value: string; live?: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <p className="mb-1 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-white/40">
        {live ? <Zap className="h-3 w-3 text-emerald-400/70" /> : null}
        {label}
      </p>
      <p className="font-mono text-lg font-bold text-white">{value}</p>
    </div>
  )
}
