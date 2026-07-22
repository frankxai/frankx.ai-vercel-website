import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Check, Clock, MapPin, Users } from 'lucide-react'

import { createMetadata } from '@/lib/seo'
import { MVU_LAB } from '@/lib/mvu/lab'
import { LabRsvp } from '@/components/mvu/LabRsvp'

const SITE_URL = 'https://frankx.ai'

export const metadata: Metadata = createMetadata({
  title: `${MVU_LAB.title} — an independent lab in Tallinn`,
  description: MVU_LAB.tagline,
  path: '/mvu/lab',
})

const LEAVE_WITH = [
  'One place your captures live — not the five apps you rotate between and never reopen.',
  'A ten-minute weekly ritual that turns a week of notes into three things you’ll actually do.',
  'A way for the one idea that matters to come back to you at the moment you can use it.',
  'The whole system on paper first — so it survives without an app, a subscription, or me.',
]

const RUN_OF_SHOW = [
  { t: '0–15', what: 'Where the value really goes. Not memory — the missing catch between insight and action.' },
  { t: '15–45', what: 'You build your spine, live, on paper: one inbox, one weekly pass, one way things resurface.' },
  { t: '45–75', what: 'Run something real from these two weeks through the whole loop, start to finish.' },
  { t: '75–90', what: 'The one commitment you leave with — and how to keep the spine standing after Tallinn.' },
]

function LabJsonLd() {
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
      url: `${SITE_URL}/mvu/lab`,
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
  const facts = [
    { icon: Clock, label: MVU_LAB.timeLabel ? `${MVU_LAB.dateLabel} · ${MVU_LAB.timeLabel}` : '90 minutes · week two' },
    { icon: MapPin, label: MVU_LAB.venueLabel || `${MVU_LAB.city} — address in your confirmation` },
    { icon: Users, label: `${MVU_LAB.capacity} people · ${MVU_LAB.price}` },
  ]

  return (
    <main className="min-h-screen bg-void">
      <LabJsonLd />

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

        {/* The stakes — why this exists */}
        <section className="mt-10 space-y-4 text-base leading-relaxed text-white/70">
          <p>
            You already know the feeling. Two weeks that changed how you see things,
            and then a Tuesday three weeks later when almost none of it is left. The
            insight was real. It just had nowhere to live.
          </p>
          <p>
            That gap — between who you become in a room like this and who you are the
            week after — isn’t a failure of memory or willpower. It’s a missing
            system. This lab is ninety honest minutes building the smallest system
            that closes it. You leave with the thing, not a promise to build it later.
          </p>
        </section>

        <dl className="mt-10 grid gap-3 sm:grid-cols-3">
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
            {MVU_LAB.confirmed ? 'Ask for a seat' : 'Want this to happen?'}
          </h2>
          <p className="mb-5 mt-1.5 text-sm leading-relaxed text-white/55">
            {MVU_LAB.confirmed
              ? `Capped at ${MVU_LAB.capacity} and approved by hand, so it stays a room and not an audience. Free.`
              : 'I only run this if enough people genuinely want it. Put your name down and I’ll decide by mid-week — and come back to you either way.'}
          </p>
          <LabRsvp confirmed={MVU_LAB.confirmed} />
        </section>

        {/* What you leave with */}
        <section className="mt-14">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40">
            What you walk out with
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
            The ninety minutes
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
            Creators, founders, and operators who leave events full and watch it drain
            away by the next week. No tools to install, no system required in advance.
            Bring a notebook and one real thing you learned here — we build from that.
          </p>
        </section>

        <hr className="my-12 border-white/10" />

        <p className="text-sm leading-relaxed text-white/45">
          This is an independent session I host — not organized, sponsored, or
          endorsed by Mindvalley, and not part of the official program. Open to anyone
          in Tallinn, whether or not they’re at the University.
        </p>
      </div>
    </main>
  )
}
