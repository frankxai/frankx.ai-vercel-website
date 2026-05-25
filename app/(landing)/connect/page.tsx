import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { Mail, ArrowLeft, QrCode } from 'lucide-react'

import { createMetadata } from '@/lib/seo'
import { CONTACT_INFO } from '@/lib/social-links'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

import { ConnectHero } from '@/components/connect/ConnectHero'
import { EventRibbon } from '@/components/connect/EventRibbon'
import { RolePathCards } from '@/components/connect/RolePathCards'
import { FeaturedWorkGrid } from '@/components/connect/FeaturedWorkGrid'
import { ConnectSocialsRow } from '@/components/connect/ConnectSocialsRow'
import { ConnectNewsletterForm } from '@/components/connect/ConnectNewsletterForm'
import { ConnectLandedTracker } from '@/components/connect/ConnectLandedTracker'

// Revalidate daily so the date-aware event ribbon picks up window transitions
// without requiring redeploys during the events themselves.
export const revalidate = 3600

export const metadata: Metadata = createMetadata({
  title: 'Connect with Frank Riemer — AI Architect & Creator',
  description:
    'Met Frank at an event? Save his contact, ask his agent, or pick the path that fits — investor, partner, client, or community.',
  path: '/connect',
  keywords: [
    'frank riemer',
    'ai architect',
    'frankx',
    'partnerships',
    'investor relations',
    'enterprise ai',
    'meet frank',
  ],
})

export default function ConnectPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0b] px-4 pb-16 pt-10 text-white sm:pt-14">
      <Suspense fallback={null}>
        <ConnectLandedTracker />
      </Suspense>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-500/[0.08] blur-[140px]" />
        <div className="absolute top-1/3 -right-24 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.07] blur-[120px]" />
        <div className="absolute -bottom-32 -left-24 h-[440px] w-[440px] rounded-full bg-violet-500/[0.06] blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col">
        <Link
          href="/"
          className="mb-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/60 backdrop-blur transition-colors hover:border-white/20 hover:text-white"
        >
          <ArrowLeft className="h-3 w-3" aria-hidden />
          frankx.ai
        </Link>

        <EventRibbon />

        <ConnectHero />

        <section className="mt-10">
          <p className="mb-3 px-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
            Choose your path
          </p>
          <RolePathCards />
        </section>

        <section className="mt-8">
          <p className="mb-3 px-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
            Featured work
          </p>
          <FeaturedWorkGrid />
        </section>

        <section className="mt-8">
          <ConnectNewsletterForm />
        </section>

        <section className="mt-8 flex flex-col items-center gap-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
            Find me everywhere
          </p>
          <ConnectSocialsRow />
        </section>

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center backdrop-blur">
          <p className="text-sm text-white/75">
            Met me at an event? Mention it in your first message.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <a
              href={`mailto:${CONTACT_INFO.email.primary}?subject=${encodeURIComponent('We just met — ' + CONTACT_INFO.email.subject)}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/15"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden />
              {CONTACT_INFO.email.primary}
            </a>
            <Link
              href={MEET_AND_GROW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-medium text-emerald-200 transition-colors hover:border-emerald-400/50 hover:bg-emerald-400/15"
            >
              Book Meet &amp; Grow
            </Link>
          </div>
        </section>

        <div className="mt-10 flex justify-center">
          <Link
            href="/connect/qr"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-white/45 backdrop-blur transition-colors hover:border-white/20 hover:text-white/70"
          >
            <QrCode className="h-3 w-3" aria-hidden />
            Get the QR
          </Link>
        </div>
      </div>
    </main>
  )
}
