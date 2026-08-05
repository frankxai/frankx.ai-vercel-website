import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { Mail, ArrowLeft, QrCode } from 'lucide-react'

import { createMetadata } from '@/lib/seo'
import { CONTACT_INFO } from '@/lib/social-links'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'
import { CONNECT_EVENTS } from '@/lib/connect/events'

import { ConnectHero } from '@/components/connect/ConnectHero'
import { EventRibbon } from '@/components/connect/EventRibbon'
import { RolePathCards } from '@/components/connect/RolePathCards'
import { FeaturedWorkGrid } from '@/components/connect/FeaturedWorkGrid'
import { ConnectSocialsRow } from '@/components/connect/ConnectSocialsRow'
import { ConnectNewsletterForm } from '@/components/connect/ConnectNewsletterForm'
import { ConnectLandedTracker } from '@/components/connect/ConnectLandedTracker'

const SITE_URL = 'https://frankx.ai'
const CONNECT_URL = `${SITE_URL}/connect`

// Revalidate hourly so the date-aware event ribbon picks up window
// transitions without redeploys during events. The Event schema below is
// rebuilt from CONNECT_EVENTS on each ISR regeneration, so newly-added
// events surface in structured data within the cache window.
export const revalidate = 3600

function ConnectJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Connect', item: CONNECT_URL },
        ],
      },
      {
        '@type': 'WebPage',
        name: 'Connect with Frank Riemer',
        description:
          'Meet Frank Riemer, AI Architect and creator. Explore the systems, field guides, partnerships, and creative work behind FrankX.',
        url: CONNECT_URL,
        isPartOf: { '@type': 'WebSite', name: 'FrankX', url: SITE_URL },
      },
      ...CONNECT_EVENTS.map((event) => ({
        '@type': 'Event',
        name: event.label,
        startDate: event.start,
        endDate: event.end,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        ...(event.location && {
          location: {
            '@type': 'Place',
            name: event.location,
            address: event.location,
          },
        }),
        url: CONNECT_URL,
        // Frank attends these events; he does not run them. Claiming organizer
        // or performer would assert an affiliation that does not exist — which
        // matters most for third-party events like Mindvalley University.
        attendee: { '@type': 'Person', name: 'Frank Riemer', url: SITE_URL },
      })),
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export const metadata: Metadata = createMetadata({
  title: 'Frank Riemer — AI Architect, Creator & Systems Builder',
  description:
    'Meet Frank Riemer and explore the agent systems, architecture field guides, partnerships, and creative work behind FrankX.',
  path: '/connect',
  keywords: [
    'frank riemer',
    'ai architect',
    'frankx',
    'partnerships',
    'agent systems',
    'enterprise ai',
    'meet frank',
  ],
})

export default function ConnectPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090a0a] px-4 pb-20 pt-8 text-white sm:px-6 sm:pt-10 lg:px-8">
      <ConnectJsonLd />
      <Suspense fallback={null}>
        <ConnectLandedTracker />
      </Suspense>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute -top-40 left-[18%] h-[620px] w-[620px] rounded-full bg-emerald-500/[0.075] blur-[160px]" />
        <div className="absolute top-[32%] -right-40 h-[540px] w-[540px] rounded-full bg-cyan-500/[0.055] blur-[150px]" />
        <div className="absolute -bottom-40 -left-32 h-[520px] w-[520px] rounded-full bg-violet-500/[0.045] blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/60 backdrop-blur transition-colors hover:border-white/20 hover:text-white"
          >
            <ArrowLeft className="h-3 w-3" aria-hidden />
            frankx.ai
          </Link>
          <div className="w-full sm:w-auto sm:max-w-lg">
            <EventRibbon />
          </div>
        </div>

        <ConnectHero />

        <section className="mt-16" aria-labelledby="connect-path-heading">
          <div className="mb-6 max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-300/75">
              Choose your context
            </p>
            <h2 id="connect-path-heading" className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Start with the outcome you care about.
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/55 sm:text-base">
              Every route opens a different layer of the same practice: systems that
              are useful, inspectable, and built to compound.
            </p>
          </div>
          <RolePathCards />
        </section>

        <section className="mt-16" aria-labelledby="connect-proof-heading">
          <div className="mb-6 max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
              Inspect the work
            </p>
            <h2 id="connect-proof-heading" className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Authority should be verifiable.
            </h2>
          </div>
          <FeaturedWorkGrid />
        </section>

        <div className="mt-16 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <section>
            <ConnectNewsletterForm />
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-7">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300/70">
              Continue the conversation
            </p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">
              Context makes the first message better.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">
              Tell me the problem, what you have already tried, and what better would
              look like. If we met in person, mention where.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <a
                href={`mailto:${CONTACT_INFO.email.primary}?subject=${encodeURIComponent('Conversation — ' + CONTACT_INFO.email.subject)}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-white/90"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden />
                Email Frank
              </a>
              <Link
                href={MEET_AND_GROW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-200 transition-colors hover:border-emerald-400/50 hover:bg-emerald-400/15"
              >
                Book a conversation
              </Link>
            </div>
          </section>
        </div>

        <section className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
            Follow the work
          </p>
          <ConnectSocialsRow />
        </section>

        <div className="mt-8 flex justify-center">
          <Link
            href="/connect/qr"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-white/60 backdrop-blur transition-colors hover:border-white/20 hover:text-white"
          >
            <QrCode className="h-3 w-3" aria-hidden />
            Get the QR
          </Link>
        </div>
      </div>
    </main>
  )
}
