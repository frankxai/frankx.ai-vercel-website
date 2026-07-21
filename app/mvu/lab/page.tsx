import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Check, Clock, MapPin, Users } from 'lucide-react'

import { createMetadata } from '@/lib/seo'
import { MVU_LAB, getLabRsvpUrl } from '@/lib/mvu/lab'
import { LabRsvp } from '@/components/mvu/LabRsvp'

const SITE_URL = 'https://frankx.ai'

export const metadata: Metadata = createMetadata({
  title: `${MVU_LAB.title} — an independent lab in Tallinn`,
  description: MVU_LAB.tagline,
  path: '/mvu/lab',
})

const LEAVE_WITH = [
  'One inbox for captures — not five apps you rotate between.',
  'A ten-minute weekly pass that turns notes into at most three commitments.',
  'One place those commitments resurface when you can actually act on them.',
  'The whole loop on paper first, so it works without any particular tool.',
]

const RUN_OF_SHOW = [
  { t: '0–15', what: 'The leak — where event value actually disappears, and why capture isn’t the fix.' },
  { t: '15–45', what: 'Build your spine — inbox, weekly pass, resurfacing. Paper first, live.' },
  { t: '45–75', what: 'Run one real capture through the whole loop with your own material.' },
  { t: '75–90', what: 'Your Friday commitment + how to keep the spine after Tallinn.' },
]

function LabJsonLd({ rsvpUrl }: { rsvpUrl: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: MVU_LAB.title,
    description: MVU_LAB.tagline,
    ...(MVU_LAB.dateLabel && { startDate: '2026-07-20' }),
    endDate: '2026-08-02',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: MVU_LAB.venueLabel || `${MVU_LAB.city}, Estonia`,
      address: `${MVU_LAB.city}, Estonia`,
    },
    // Frank runs THIS independent lab — organizer is correct here, unlike the
    // third-party events on /connect where he is only an attendee.
    organizer: { '@type': 'Person', name: 'Frank Riemer', url: SITE_URL },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/LimitedAvailability',
      ...(rsvpUrl && { url: rsvpUrl }),
    },
    url: `${SITE_URL}/mvu/lab`,
    isAccessibleForFree: true,
    maximumAttendeeCapacity: MVU_LAB.capacity,
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

export default function MvuLabPage() {
  const rsvpUrl = getLabRsvpUrl()

  const facts = [
    { icon: Clock, label: MVU_LAB.timeLabel ? `${MVU_LAB.dateLabel} · ${MVU_LAB.timeLabel}` : '90 minutes · week two' },
    { icon: MapPin, label: MVU_LAB.venueLabel || `${MVU_LAB.city} — address in the confirmation` },
    { icon: Users, label: `${MVU_LAB.capacity} people · ${MVU_LAB.price}` },
  ]

  return (
    <main className="min-h-screen bg-void">
      <LabJsonLd rsvpUrl={rsvpUrl} />

      <div className="mx-auto w-full max-w-2xl px-5 py-16 sm:py-24">
        <Link
          href="/mvu"
          className="inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-tech-light"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          MVU journal
        </Link>

        <header className="mt-8">
          <p className="text-xs font-medium uppercase tracking-widest text-tech-primary">
            {MVU_LAB.confirmed ? 'Independent lab · Tallinn' : 'Independent lab · gauging interest'}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {MVU_LAB.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-white/70">{MVU_LAB.tagline}</p>
        </header>

        <dl className="mt-8 grid gap-3 sm:grid-cols-3">
          {facts.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.label} className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-tech-light" aria-hidden />
                <dd className="text-sm leading-snug text-white/70">{f.label}</dd>
              </div>
            )
          })}
        </dl>

        {/* RSVP */}
        <section className="mt-10 rounded-2xl border border-tech-primary/20 bg-gradient-to-br from-tech-primary/[0.06] to-transparent p-6">
          <h2 className="text-lg font-semibold text-white">
            {rsvpUrl ? 'Reserve your seat' : 'Want this to happen?'}
          </h2>
          <p className="mb-5 mt-1.5 text-sm leading-relaxed text-white/55">
            {rsvpUrl
              ? `Capped at ${MVU_LAB.capacity}, approval-gated to keep the room working. Free.`
              : 'I only run this if enough people genuinely want it. Register interest and I’ll decide by mid-week.'}
          </p>
          <LabRsvp rsvpUrl={rsvpUrl} />
        </section>

        {/* What you leave with */}
        <section className="mt-14">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40">
            What you leave with
          </h2>
          <ul className="mt-5 space-y-3">
            {LEAVE_WITH.map((item) => (
              <li key={item} className="flex items-start gap-3 text-white/75">
                <Check className="mt-1 h-4 w-4 flex-shrink-0 text-tech-light" aria-hidden />
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Run of show */}
        <section className="mt-14">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40">
            The 90 minutes
          </h2>
          <ul className="mt-5 space-y-4">
            {RUN_OF_SHOW.map((row) => (
              <li key={row.t} className="flex gap-4">
                <span className="w-16 flex-shrink-0 pt-0.5 text-xs font-medium tabular-nums text-tech-light/70">
                  {row.t}
                </span>
                <span className="text-sm leading-relaxed text-white/70">{row.what}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Who it's for */}
        <section className="mt-14 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40">
            Who it’s for
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Creators, founders, and operators who leave events full of insight and
            watch it evaporate by the following week. No tools to install, no prior
            system required. Bring a notebook and one real thing you learned here.
          </p>
        </section>

        <hr className="my-12 border-white/10" />

        <p className="text-sm leading-relaxed text-white/45">
          This is an independent session I host — not organized, sponsored, or
          endorsed by Mindvalley, and not part of the official program. It’s open to
          anyone in Tallinn, whether or not they’re at the University.
        </p>
      </div>
    </main>
  )
}
