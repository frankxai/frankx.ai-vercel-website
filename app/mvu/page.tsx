import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, PenLine, StickyNote } from 'lucide-react'

import { createMetadata } from '@/lib/seo'
import { getMvuEntrySummaries, type MvuKind } from '@/lib/mvu'
import { MVU_LAB } from '@/lib/mvu/lab'
import { EventRibbon } from '@/components/connect/EventRibbon'

const SITE_URL = 'https://frankx.ai'
const MVU_URL = `${SITE_URL}/mvu`

// Revalidate hourly so newly committed journal entries and the live event
// ribbon surface without a redeploy during the two-week window.
export const revalidate = 3600

export const metadata: Metadata = createMetadata({
  title: 'Mindvalley University 2026 — Frank Riemer’s Tallinn journal',
  description:
    'Journal, essays, and the approach behind two weeks at Mindvalley University in Tallinn. Building calm systems so insights survive the week after the event. Independent — not affiliated with Mindvalley.',
  path: '/mvu',
})

const KIND_META: Record<MvuKind, { label: string; icon: typeof BookOpen }> = {
  essay: { label: 'Essay', icon: BookOpen },
  journal: { label: 'Journal', icon: PenLine },
  note: { label: 'Note', icon: StickyNote },
}

function formatDate(date: string): string {
  if (!date) return ''
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function MvuJsonLd({ entryCount }: { entryCount: number }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Mindvalley University 2026 — Frank Riemer’s Tallinn journal',
    description:
      'Journal and essays from two weeks at Mindvalley University in Tallinn, kept in the open.',
    url: MVU_URL,
    isPartOf: { '@type': 'WebSite', name: 'FrankX', url: SITE_URL },
    author: { '@type': 'Person', name: 'Frank Riemer', url: SITE_URL },
    about: { '@type': 'Event', name: 'Mindvalley University 2026', startDate: '2026-07-20', endDate: '2026-08-02' },
    mainEntity: { '@type': 'ItemList', numberOfItems: entryCount },
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

export default function MvuPage() {
  const entries = getMvuEntrySummaries()

  return (
    <main className="min-h-screen bg-void">
      <MvuJsonLd entryCount={entries.length} />

      <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:py-24">
        <div className="flex justify-center">
          <EventRibbon />
        </div>

        <header className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-tech-primary">
            Tallinn · 20 Jul – 2 Aug 2026
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Two weeks I don’t want to lose
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
            Most of what happens at something like this evaporates by the Tuesday
            after. So I’m writing it down as it happens — the rooms, the people, the
            things that actually change my mind — and building the small systems that
            let insight survive contact with normal life. This is that journal, in
            the open.
          </p>
        </header>

        {/* Lab spotlight */}
        <Link
          href="/mvu/lab"
          className="group mt-12 block rounded-2xl border border-tech-primary/25 bg-gradient-to-br from-tech-primary/[0.08] to-transparent p-6 transition-colors hover:border-tech-primary/50"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-tech-primary">
            {MVU_LAB.confirmed ? 'Independent lab · Week 2' : 'Independent lab · gauging interest'}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">{MVU_LAB.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/60">{MVU_LAB.tagline}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-tech-light">
            {MVU_LAB.confirmed ? 'See details & RSVP' : 'Register interest'}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </Link>

        {/* Entries */}
        <section className="mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40">
            Journal & essays
          </h2>

          {entries.length === 0 ? (
            <p className="mt-6 text-white/50">First entries land here shortly.</p>
          ) : (
            <ul className="mt-6 divide-y divide-white/10">
              {entries.map((entry) => {
                const meta = KIND_META[entry.kind]
                const Icon = meta.icon
                return (
                  <li key={entry.slug}>
                    <Link
                      href={`/mvu/${entry.slug}`}
                      className="group flex flex-col gap-2 py-6 transition-opacity hover:opacity-90"
                    >
                      <div className="flex items-center gap-3 text-xs text-white/40">
                        <span className="inline-flex items-center gap-1.5 text-tech-light/80">
                          <Icon className="h-3.5 w-3.5" aria-hidden />
                          {meta.label}
                        </span>
                        <span aria-hidden>·</span>
                        <time dateTime={entry.date}>{formatDate(entry.date)}</time>
                        {entry.readingTime && (
                          <>
                            <span aria-hidden>·</span>
                            <span>{entry.readingTime}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-tech-light">
                        {entry.title}
                      </h3>
                      {entry.summary && (
                        <p className="text-sm leading-relaxed text-white/55">{entry.summary}</p>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </section>

        <hr className="my-14 border-white/10" />

        <footer className="space-y-4 text-sm leading-relaxed text-white/45">
          <p>
            Met me in Tallinn?{' '}
            <Link
              href="/connect"
              className="text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-tech-light"
            >
              Stay in touch here
            </Link>
            .
          </p>
          <p>
            I attend Mindvalley University as a participant. Any session I host is
            independent — not organized, sponsored, or endorsed by Mindvalley, and
            not an official part of the program.
          </p>
        </footer>
      </div>
    </main>
  )
}
