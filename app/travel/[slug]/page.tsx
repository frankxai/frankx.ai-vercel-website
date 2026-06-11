import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getJourneyBySlug,
  getAllJourneySlugs,
  getJourneysByMonth,
} from '@/data/travel-journeys'
import type { TravelJourney, TravelExperience, TravelEvent } from '@/data/travel-journeys'

const SITE_URL = 'https://frankx.ai'

export function generateStaticParams() {
  return getAllJourneySlugs().map((slug) => ({ slug }))
}

function truncate(text: string, limit = 158) {
  if (text.length <= limit) return text
  return text.slice(0, limit - 1).trimEnd() + '…'
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const j = getJourneyBySlug(slug)
  if (!j) return {}

  const canonical = `${SITE_URL}/travel/${j.slug}`
  const description = truncate(j.tldr)

  return {
    title: `${j.city} in ${j.month.split(' ')[0]} — Work-and-Travel Route | FrankX Travel`,
    description,
    keywords: [
      `${j.city} digital nomad`,
      `${j.city} remote work`,
      `things to do in ${j.city}`,
      `${j.city} ${j.month.split(' ')[0]}`,
      ...j.events.map((e) => e.name),
      'work and travel',
      'nomad itinerary',
    ],
    authors: [{ name: 'Frank' }],
    alternates: { canonical },
    openGraph: {
      title: `${j.city} in ${j.month.split(' ')[0]} — ${j.subtitle}`,
      description,
      type: 'article',
      url: canonical,
      siteName: 'FrankX Travel',
      authors: ['Frank'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${j.city} in ${j.month.split(' ')[0]} | FrankX Travel`,
      description,
    },
  }
}

function JsonLd({ j }: { j: TravelJourney }) {
  const url = `${SITE_URL}/travel/${j.slug}`
  const attractions = [...j.museumsAndArt, ...j.deepSecrets, ...j.beautifulExperiences]

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Travel', item: `${SITE_URL}/travel` },
          { '@type': 'ListItem', position: 3, name: `${j.city}, ${j.country}`, item: url },
        ],
      },
      {
        '@type': 'TouristTrip',
        name: j.title,
        description: j.tldr,
        url,
        touristType: 'Digital nomad / remote worker',
        itinerary: {
          '@type': 'ItemList',
          numberOfItems: attractions.length,
          itemListElement: attractions.map((a, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'TouristAttraction',
              name: a.title,
              description: a.detail,
              address: { '@type': 'PostalAddress', addressLocality: j.city, addressCountry: j.country },
            },
          })),
        },
      },
      {
        '@type': 'Article',
        headline: j.title,
        description: j.tldr,
        author: { '@type': 'Person', name: 'Frank' },
        publisher: { '@type': 'Organization', name: 'FrankX', url: SITE_URL },
        mainEntityOfPage: url,
        about: `${j.city}, ${j.country}`,
      },
      {
        '@type': 'FAQPage',
        mainEntity: j.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

const eventTypeColors: Record<TravelEvent['type'], string> = {
  festival: 'text-violet-300 border-violet-500/20 bg-violet-500/[0.06]',
  art: 'text-rose-300 border-rose-500/20 bg-rose-500/[0.06]',
  culture: 'text-amber-300 border-amber-500/20 bg-amber-500/[0.06]',
  food: 'text-orange-300 border-orange-500/20 bg-orange-500/[0.06]',
  tech: 'text-emerald-300 border-emerald-500/20 bg-emerald-500/[0.06]',
  music: 'text-cyan-300 border-cyan-500/20 bg-cyan-500/[0.06]',
  seasonal: 'text-yellow-300 border-yellow-500/20 bg-yellow-500/[0.06]',
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-6">
      <p className="text-[11px] uppercase tracking-[0.25em] text-amber-400/60 mb-2">{eyebrow}</p>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{title}</h2>
    </div>
  )
}

function ExperienceList({ items }: { items: TravelExperience[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.title} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <h3 className="text-base font-semibold text-white mb-1.5">{item.title}</h3>
          <p className="text-sm text-white/60 leading-relaxed">{item.detail}</p>
        </div>
      ))}
    </div>
  )
}

export default async function TravelJourneyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const j = getJourneyBySlug(slug)
  if (!j) notFound()

  const ordered = getJourneysByMonth()
  const idx = ordered.findIndex((x) => x.slug === j.slug)
  const prev = idx > 0 ? ordered[idx - 1] : null
  const next = idx < ordered.length - 1 ? ordered[idx + 1] : null

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <JsonLd j={j} />

      {/* Hero */}
      <section className="relative pt-28 pb-12 lg:pt-32 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <Link href="/travel" className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-amber-300 transition-colors mb-6">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            All routes
          </Link>
          <p className="text-amber-400/80 text-[11px] tracking-[0.25em] uppercase mb-3">
            {j.month} · {j.stayLength} · {j.region}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.12] text-white mb-4">
            {j.title}
          </h1>
          <p className="text-lg text-white/70 leading-relaxed">{j.subtitle}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-24 space-y-16">
        {/* TL;DR */}
        <section>
          <div className="rounded-2xl border border-amber-500/[0.14] bg-amber-500/[0.03] p-6">
            <p className="text-[11px] uppercase tracking-[0.25em] text-amber-400/70 mb-2">The short version</p>
            <p className="text-[15px] text-white/75 leading-relaxed">{j.tldr}</p>
          </div>
        </section>

        {/* Why now */}
        <section>
          <SectionHeading eyebrow="Timing" title="Why this month" />
          <p className="text-[15px] text-white/65 leading-relaxed">{j.whyNow}</p>
        </section>

        {/* Work setup */}
        <section>
          <SectionHeading eyebrow="The work" title="Working from here" />
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Timezone</p>
              <p className="text-sm font-semibold text-white">{j.workSetup.timezone}</p>
              <p className="text-xs text-white/55 mt-1 leading-relaxed">{j.workSetup.overlap}</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Monthly cost</p>
              <p className="text-sm font-semibold text-white">{j.workSetup.monthlyCostUsd}</p>
              <p className="text-xs text-white/55 mt-1 leading-relaxed">{j.workSetup.connectivity}</p>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Coworking</p>
            <div className="flex flex-wrap gap-2">
              {j.workSetup.coworking.map((c) => (
                <span key={c} className="px-2.5 py-1 text-xs rounded-full bg-white/[0.04] border border-white/10 text-white/60">
                  {c}
                </span>
              ))}
            </div>
            <p className="text-xs text-white/55 mt-3 leading-relaxed">
              <span className="text-white/40">Best for:</span> {j.workSetup.bestFor}
            </p>
          </div>
        </section>

        {/* Events */}
        <section>
          <SectionHeading eyebrow="What’s on" title="The events worth timing it to" />
          <div className="space-y-4">
            {j.events.map((e) => (
              <div key={e.name} className={`rounded-xl border p-5 ${eventTypeColors[e.type]}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
                  <h3 className="text-base font-semibold text-white">{e.name}</h3>
                  <span className="text-xs text-white/50">{e.window}</span>
                </div>
                <p className="text-sm text-white/65 leading-relaxed">{e.why}</p>
                {e.url && (
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-white/55 hover:text-white mt-2 transition-colors"
                  >
                    Official site
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Museums & art */}
        <section>
          <SectionHeading eyebrow="Art & museums" title="Where the art is" />
          <ExperienceList items={j.museumsAndArt} />
        </section>

        {/* Deep secrets */}
        <section>
          <SectionHeading eyebrow="Local secrets" title="The corners locals keep" />
          <ExperienceList items={j.deepSecrets} />
        </section>

        {/* Beautiful experiences */}
        <section>
          <SectionHeading eyebrow="The beautiful stuff" title="Worth the flight on its own" />
          <ExperienceList items={j.beautifulExperiences} />
        </section>

        {/* Stay variants */}
        <section>
          <SectionHeading eyebrow="How long" title="Long weekend, two weeks, or a month" />
          <div className="space-y-3">
            {j.stayVariants.map((v) => (
              <div key={v.length} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                <p className="text-sm font-semibold text-amber-200 sm:w-32 shrink-0">{v.length}</p>
                <p className="text-sm text-white/60 leading-relaxed">{v.focus}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sample rhythm */}
        <section>
          <SectionHeading eyebrow="A day here" title="The rhythm" />
          <ol className="space-y-3">
            {j.rhythm.map((r, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-white/65 leading-relaxed">{r}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Best for */}
        <section>
          <SectionHeading eyebrow="Who it’s for" title="Best for" />
          <ul className="space-y-2">
            {j.bestFor.map((b) => (
              <li key={b} className="flex gap-2.5 text-sm text-white/65 leading-relaxed">
                <span className="text-amber-400/70 mt-0.5">→</span>
                {b}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section>
          <SectionHeading eyebrow="Questions" title="Before you book" />
          <div className="space-y-4">
            {j.faq.map((f) => (
              <div key={f.q} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                <h3 className="text-base font-semibold text-white mb-1.5">{f.q}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Prev / next month */}
        <nav className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.06]">
          {prev ? (
            <Link href={`/travel/${prev.slug}`} className="group rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] p-5 transition-colors">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">{prev.month}</p>
              <p className="text-sm font-semibold text-white group-hover:text-amber-200 transition-colors">← {prev.city}</p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/travel/${next.slug}`} className="group rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] p-5 transition-colors text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">{next.month}</p>
              <p className="text-sm font-semibold text-white group-hover:text-amber-200 transition-colors">{next.city} →</p>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </div>
  )
}
