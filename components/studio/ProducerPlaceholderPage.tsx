import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Mic, Video, Music, FileText, MonitorPlay, Utensils, Plane, Layers } from 'lucide-react'
import { getProducer, getCaptureType, getPersona } from '@/lib/intake'
import type { ProducerMeta } from '@/lib/intake'

const ICON_MAP: Record<string, typeof Layers> = {
  'vis-producer': Layers,
  'video-producer': Video,
  'audio-producer': Mic,
  'music-producer': Music,
  'prose-producer': FileText,
  'screen-producer': MonitorPlay,
  'food-producer': Utensils,
  'travel-producer': Plane,
}

const STATUS_LABEL = {
  shipped: 'Live',
  partial: 'Live (existing infra)',
  'planned-w20': 'W20 — May 19–25',
  'planned-w21': 'W21 — May 26–Jun 1',
} as const

interface ProducerPageProps {
  producerId: ProducerMeta['id']
  /** Optional override: provide a different exampleSentence for the hero. */
  exampleSentence?: string
  /**
   * Optional override: replace the default above-fold primary CTA.
   * Default = /newsletter for planned producers, /inner-circle for shipped producers.
   */
  primaryCta?: { label: string; href: string }
}

export function ProducerPlaceholderPage({ producerId, exampleSentence, primaryCta }: ProducerPageProps) {
  const producer = getProducer(producerId)

  if (!producer) {
    return (
      <main className="min-h-screen bg-[#0a0a0b] text-white px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <p>Unknown producer: {producerId}</p>
        </div>
      </main>
    )
  }

  const Icon = ICON_MAP[producer.id] ?? Layers
  const captureTypes = producer.acceptedCaptureTypes.map((c) => getCaptureType(c)).filter(Boolean)
  const platforms = producer.targetPlatforms.map((p) => getPersona(p)).filter(Boolean)

  // Default CTA based on producer status — gravity-surface routing per /hub-audit gate 8
  const defaultPrimary =
    producer.status === 'shipped' || producer.status === 'partial'
      ? { label: 'Join Inner Circle beta', href: '/inner-circle' }
      : { label: 'Get launch updates', href: '/newsletter' }
  const cta = primaryCta ?? defaultPrimary

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${producer.label} Producer — FrankX Studio`,
    description: producer.description,
    author: { '@type': 'Person', name: 'Frank Riemer', url: 'https://frankx.ai' },
    publisher: { '@type': 'Organization', name: 'FrankX', url: 'https://frankx.ai' },
    datePublished: '2026-05-13',
    mainEntityOfPage: `https://frankx.ai${producer.studioRoute}`,
    inLanguage: 'en',
  }

  return (
    <main id="main" className="min-h-screen bg-[#0a0a0b] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* HERO */}
      <section className="relative px-6 pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mb-8"
          >
            <ArrowRight className="h-4 w-4 rotate-180" aria-hidden />
            Studio
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-md bg-emerald-500/10 ring-1 ring-emerald-400/30">
              <Icon className="h-5 w-5 text-emerald-400" aria-hidden />
            </div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium">
              {producer.label} Producer · {STATUS_LABEL[producer.status]}
            </p>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-6 max-w-4xl">
            {producer.label}.
          </h1>
          <p className="text-lg md:text-xl text-white/65 leading-relaxed max-w-2xl mb-8">
            {producer.description}
          </p>
          {exampleSentence && (
            <p className="text-base text-white/55 italic max-w-2xl mb-10">{exampleSentence}</p>
          )}
          {/* Above-fold primary CTA — added 2026-05-21 per /hub-audit studio P0 (gravity routing) */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90 transition-colors"
            >
              {cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-5 py-2.5 text-sm font-medium text-white/80 ring-1 ring-white/10 hover:bg-white/10 hover:text-white transition-colors"
            >
              See all producers
            </Link>
            <Link
              href="/studio/visual"
              className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              vis-producer (live reference)
              <ArrowRight className="h-3 w-3" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-2">
          {/* Inputs */}
          <article className="rounded-xl bg-[#111113] border border-white/5 p-6">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
              Accepts
            </p>
            <h2 className="font-display text-xl font-semibold text-white mb-4">Capture types</h2>
            <ul className="space-y-3">
              {captureTypes.map(
                (c) =>
                  c && (
                    <li key={c.id} className="border-t border-white/5 pt-3 first:border-0 first:pt-0">
                      <p className="font-mono text-[12px] text-emerald-400/80 mb-1">{c.id}</p>
                      <p className="text-sm text-white/70 mb-1">{c.label}</p>
                      <p className="text-xs text-white/50 leading-relaxed">{c.description}</p>
                    </li>
                  ),
              )}
            </ul>
          </article>

          {/* Outputs */}
          <article className="rounded-xl bg-[#111113] border border-white/5 p-6">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
              Produces for
            </p>
            <h2 className="font-display text-xl font-semibold text-white mb-4">Target platforms</h2>
            <ul className="space-y-3">
              {platforms.map(
                (p) =>
                  p && (
                    <li key={p.platform} className="border-t border-white/5 pt-3 first:border-0 first:pt-0">
                      <div className="flex items-baseline justify-between gap-3 mb-1">
                        <p className="text-sm text-white font-medium">{p.label}</p>
                        <p className="text-[10px] tracking-[0.15em] uppercase text-white/40">
                          {p.spectrum} · {p.archetype}
                        </p>
                      </div>
                      <p className="text-xs text-emerald-400/80 italic mb-1">{p.persona}</p>
                      <p className="text-xs text-white/50 leading-relaxed">{p.cadence}</p>
                    </li>
                  ),
              )}
            </ul>
          </article>
        </div>
      </section>

      {/* HOW IT FITS */}
      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
            How it fits
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight mb-6">
            Drop → classify → orchestrate → produce → ship.
          </h2>
          <p className="text-base text-white/60 max-w-2xl mb-10">
            {producer.label} is one of 8 L4 producer specialists. It reads from the canonical
            substrate (<code className="font-mono text-emerald-400/80">lib/intake/</code>), follows
            the persona matrix, and produces operator-reviewable drafts. Nothing publishes without
            human approval.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <RuntimeChip label="Command" value={producer.command} />
            <RuntimeChip label="Skill" value={producer.skill === '—' ? 'Ships W20–W21' : producer.skill} />
            <RuntimeChip label="Status" value={STATUS_LABEL[producer.status]} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
            See the full architecture.
          </h2>
          <p className="text-base text-white/60 leading-relaxed mb-8">
            VIS, the first producer, ships in production today. The rest ship W20–W21. The
            substrate they all read from is the source of truth.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90 transition-colors"
            >
              All producers
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/os"
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-5 py-2.5 text-sm font-medium text-white/80 ring-1 ring-white/10 hover:bg-white/10 hover:text-white transition-colors"
            >
              FrankX OS
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function RuntimeChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-[#111113] border border-white/5 p-4">
      <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-medium mb-2">{label}</p>
      <p className="font-mono text-sm text-white">{value}</p>
    </div>
  )
}

export function makeProducerMetadata(producerId: ProducerMeta['id']): Metadata {
  const producer = getProducer(producerId)
  if (!producer) {
    return { title: 'FrankX Studio', robots: { index: false, follow: false } }
  }
  const title = `${producer.label} Producer — FrankX Studio`
  return {
    title: `${title} | FrankX`,
    description: producer.description,
    alternates: { canonical: `https://frankx.ai${producer.studioRoute}` },
    openGraph: {
      title,
      description: producer.description,
      url: `https://frankx.ai${producer.studioRoute}`,
      siteName: 'FrankX',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: producer.description,
    },
    robots: { index: false, follow: false },
  }
}
