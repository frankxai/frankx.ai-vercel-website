import { Metadata } from 'next'
import Link from 'next/link'
import { travelJourneys, getJourneysByMonth } from '@/data/travel-journeys'
import type { TravelJourney } from '@/data/travel-journeys'

const SITE_URL = 'https://frankx.ai'
const TRAVEL_URL = `${SITE_URL}/travel`

export const metadata: Metadata = {
  title: 'Travel | Work-and-Travel Routes for Digital Nomads | FrankX',
  description:
    'Seven curated work-and-travel routes for the rest of 2026 — one city per month, each timed to a real festival or art event, with the work setup, museums, hidden corners, and beautiful experiences worth the flight.',
  keywords: [
    'digital nomad 2026',
    'work and travel',
    'remote work cities',
    'nomad itinerary',
    'best cities for digital nomads',
    'Sónar Barcelona',
    'Web Summit Lisbon',
    'Edinburgh Fringe',
  ],
  alternates: { canonical: TRAVEL_URL },
  openGraph: {
    title: 'Travel | Work-and-Travel Routes for the Rest of 2026',
    description:
      'One city a month, timed to the event worth being there for. Work setup, art, hidden corners, and the beautiful stuff — through Frank’s lens.',
    type: 'website',
    url: TRAVEL_URL,
    siteName: 'FrankX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel | Work-and-Travel Routes for the Rest of 2026',
    description: 'One city a month, timed to the event worth being there for.',
  },
}

function CollectionJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Travel', item: TRAVEL_URL },
        ],
      },
      {
        '@type': 'CollectionPage',
        name: 'FrankX Travel — Work-and-Travel Routes',
        description:
          'Curated work-and-travel routes for digital nomads, one city per month for the rest of 2026, each timed to a real cultural event.',
        url: TRAVEL_URL,
        isPartOf: { '@type': 'WebSite', name: 'FrankX', url: SITE_URL },
      },
      {
        '@type': 'ItemList',
        name: 'Work-and-Travel Routes',
        numberOfItems: travelJourneys.length,
        itemListElement: getJourneysByMonth().map((j, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${TRAVEL_URL}/${j.slug}`,
          name: `${j.city}, ${j.country} — ${j.month}`,
        })),
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

const regionColors: Record<TravelJourney['region'], string> = {
  Europe: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  Asia: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
  Americas: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  Africa: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
}

function ArrowIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  )
}

export default function TravelPage() {
  const journeys = getJourneysByMonth()

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <CollectionJsonLd />

      {/* Hero */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-amber-400/80 text-[11px] sm:text-xs tracking-[0.25em] uppercase mb-4">
            Work + Travel · The rest of 2026
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white mb-6">
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-400 bg-clip-text text-transparent">
              Travel
            </span>
          </h1>
          <p className="text-[17px] md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            One city a month, each timed to the event worth being there for. The work setup, the
            museums and art, the hidden corners locals keep, and the beautiful stuff — picked the way
            I would actually plan a year of working from the road.
          </p>
          <p className="text-sm text-white/45 max-w-xl mx-auto mt-4 leading-relaxed">
            Built for makers, architects, and creators who want the working day to keep ticking while
            the rest of life gets a great deal more interesting.
          </p>
        </div>
      </section>

      {/* Routes grid */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {journeys.map((j) => (
            <Link key={j.slug} href={`/travel/${j.slug}`} className="group block focus-visible:outline-none">
              <article className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-amber-500/20 hover:bg-amber-500/[0.03] group-focus-visible:ring-2 group-focus-visible:ring-amber-300 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[#0a0a0b]">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-amber-400/70">{j.month}</span>
                  <span className={`px-2.5 py-0.5 text-[10px] font-medium rounded-full border ${regionColors[j.region] || 'bg-white/5 text-white/50 border-white/10'}`}>
                    {j.region}
                  </span>
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-white group-hover:text-amber-200 transition-colors">
                  {j.city}
                  <span className="text-white/35 font-normal">, {j.country}</span>
                </h2>

                <p className="mt-2 text-sm text-white/60 leading-relaxed">{j.hook}</p>

                <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/55">
                    {j.stayLength}
                  </span>
                  {j.events[0] && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/[0.07] border border-amber-500/15 text-amber-200/80">
                      {j.events[0].name}
                    </span>
                  )}
                </div>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-amber-400/80 group-hover:text-amber-300 transition-colors">
                  See the route
                  <ArrowIcon />
                </span>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* How to use this */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8">
          <p className="text-[11px] uppercase tracking-[0.25em] text-amber-400/60 mb-3">Pick your length</p>
          <h2 className="text-2xl font-semibold text-white mb-4">Long weekend, two weeks, or a month</h2>
          <p className="text-sm text-white/60 leading-relaxed mb-6">
            Every route has three lengths. A long weekend is built around the event itself. Two weeks
            lets a real work rhythm settle. A month turns the city into a base, with day trips and a
            second neighbourhood. Each detail page lays out what to optimise for at each length.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-4">
              <p className="text-sm font-semibold text-white mb-1">Long weekend</p>
              <p className="text-xs text-white/55 leading-relaxed">The event, one museum, one sunset. Fly in for the thing worth flying for.</p>
            </div>
            <div className="rounded-xl border border-amber-500/[0.12] bg-amber-500/[0.03] p-4">
              <p className="text-sm font-semibold text-amber-200 mb-1">Two weeks</p>
              <p className="text-xs text-white/55 leading-relaxed">The sweet spot — work rhythm, the event, and time to know one neighbourhood.</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-4">
              <p className="text-sm font-semibold text-white mb-1">A month</p>
              <p className="text-xs text-white/55 leading-relaxed">A real base — day trips, a second neighbourhood, the city as routine.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-link to Studio Travel producer */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <Link
          href="/studio/travel"
          className="group block rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
        >
          <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 mb-2">After the trip</p>
          <h3 className="text-base font-semibold text-white mb-1 group-hover:text-amber-200 transition-colors">
            Turn the photos into content — Studio Travel
          </h3>
          <p className="text-sm text-white/55 leading-relaxed">
            The travel producer takes location-tagged photos and builds the carousel, the blog entry,
            and the stories. Plan the route here; ship the story there.
          </p>
        </Link>
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <div className="rounded-3xl border border-amber-500/10 bg-amber-500/[0.03] p-10 lg:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-3">
            Plan the year, not just the next flight
          </h2>
          <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
            New routes, timing notes, and what is actually worth the trip — in the weekly note for
            builders working from the road.
          </p>
          <Link
            href="/inner-circle"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium hover:bg-amber-500/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
          >
            Join the Inner Circle
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </div>
  )
}
