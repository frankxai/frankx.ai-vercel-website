import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, PenLine, Rss, StickyNote, Terminal } from 'lucide-react'

import { TrackedLink } from '@/components/analytics/TrackedLink'
import { createMetadata, siteConfig } from '@/lib/seo'
import {
  formatJournalDate,
  getJournalEntriesByMonth,
  getJournalEntrySummaries,
  JOURNAL_KIND_LABEL,
  type JournalKind,
} from '@/lib/journal'

const SITE_URL = siteConfig.url

// Revalidate hourly so a newly committed entry appears without a redeploy.
export const revalidate = 3600

export const metadata: Metadata = createMetadata({
  title: 'Journal — Daily Notes from the Build',
  description:
    'Short, dated notes from Frank Riemer: what got built, what broke, what changed. The unedited counterpart to the long-form articles on the blog.',
  keywords: [
    'frankx journal',
    'daily notes',
    'ai architect journal',
    'build log',
    'working notes',
  ],
  path: '/journal',
})

const KIND_ICON: Record<JournalKind, typeof PenLine> = {
  daily: PenLine,
  note: StickyNote,
  log: Terminal,
}

function JournalJsonLd({ entryCount }: { entryCount: number }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'FrankX Journal',
    description:
      'Short, dated working notes from Frank Riemer on AI architecture, building, and creative systems.',
    url: `${SITE_URL}/journal`,
    isPartOf: { '@type': 'WebSite', name: 'FrankX', url: SITE_URL },
    author: { '@type': 'Person', name: 'Frank Riemer', url: SITE_URL },
    mainEntity: { '@type': 'ItemList', numberOfItems: entryCount },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default function JournalPage() {
  const entries = getJournalEntrySummaries()
  const months = getJournalEntriesByMonth()

  // Entries are newest-first, so the span runs from the last dated entry to the
  // first. Undated entries sort last and are skipped rather than shown as blank.
  const dated = entries.filter((entry) => entry.date)
  const oldest = dated[dated.length - 1]?.date
  const newest = dated[0]?.date
  const span =
    !oldest || !newest
      ? ''
      : oldest === newest
        ? formatJournalDate(newest, 'short')
        : `${formatJournalDate(oldest, 'short')} — ${formatJournalDate(newest, 'short')}`

  return (
    <main className="min-h-screen bg-void text-white">
      <JournalJsonLd entryCount={entries.length} />

      <section className="border-b border-white/10">
        <div className="mx-auto w-full max-w-4xl px-5 pb-12 pt-28 sm:px-6 sm:pb-14 sm:pt-32">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-tech-primary/20 bg-tech-primary/10 px-3 py-1.5">
              <PenLine className="h-4 w-4 text-tech-light" aria-hidden />
              <span className="text-xs font-medium text-tech-light">Journal</span>
            </span>
            <TrackedLink
              href="/journal/feed.xml"
              eventName="journal_navigation"
              eventProperties={{ destination: 'rss' }}
              className="inline-flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-tech-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
            >
              <Rss className="h-3.5 w-3.5" aria-hidden />
              RSS
            </TrackedLink>
          </div>

          <h1 className="mt-7 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
            Daily notes, in public.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Short entries written as the work happens: what got built, what broke, what
            changed my mind. No hero images, no editing pass, no conclusion required.
          </p>

          {/* Dateline: what a journal opens with — how much there is and how far back. */}
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-white/35">
            <span className="text-white/70">
              {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
            </span>
            {span && (
              <>
                <span aria-hidden> · </span>
                {span}
              </>
            )}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-6">
          {entries.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-space p-8 text-center">
              <p className="text-white/60">
                The first entries land here shortly. In the meantime, the long-form work
                lives on the{' '}
                <Link
                  href="/blog"
                  className="text-tech-light underline decoration-tech-light/30 underline-offset-4"
                >
                  blog
                </Link>
                .
              </p>
            </div>
          ) : (
            months.map((month) => (
              <section key={month.key} aria-labelledby={`month-${month.key}`}>
                {/*
                  The month label sits in the date margin on desktop and sticks while
                  its entries scroll past — the equivalent of a diary's month tab. It
                  falls back to a normal heading above the entries on mobile, where a
                  sticky element would eat scarce vertical space.
                */}
                <h2
                  id={`month-${month.key}`}
                  className="pt-10 font-mono text-[11px] uppercase tracking-[0.25em] text-white/35 sm:sticky sm:top-24 sm:z-10 sm:w-28 sm:pt-12 sm:text-right"
                >
                  {month.label}
                </h2>

                <ul>
                  {month.entries.map((entry) => {
                    const Icon = KIND_ICON[entry.kind]
                    return (
                      <li key={entry.slug}>
                        <TrackedLink
                          href={`/journal/${entry.slug}`}
                          eventName="journal_navigation"
                          eventProperties={{ destination: 'entry', entry_kind: entry.kind }}
                          className="group grid grid-cols-1 gap-x-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light sm:grid-cols-[7rem_1fr]"
                        >
                          {/* Date margin — desktop only; the mobile dateline is inline below. */}
                          <time
                            dateTime={entry.date}
                            className="hidden pt-8 text-right font-mono text-xs leading-6 text-white/30 transition-colors group-hover:text-tech-light/70 sm:block"
                          >
                            {formatJournalDate(entry.date, 'short')}
                          </time>

                          {/*
                            The left border is the spine. Entries carry padding rather
                            than margin so the rule stays unbroken down the page.
                          */}
                          {/*
                            Mobile has no spine, so a hairline keeps entries
                            scannable; on desktop the left rule takes that job and
                            the top border would just add noise.
                          */}
                          <div className="border-t border-white/[0.07] py-8 transition-colors group-hover:border-tech-primary/40 sm:border-l sm:border-t-0 sm:pl-8">
                            <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/35">
                              <span className="inline-flex items-center gap-1.5 text-tech-light/70">
                                <Icon className="h-3.5 w-3.5" aria-hidden />
                                {JOURNAL_KIND_LABEL[entry.kind]}
                              </span>
                              <time dateTime={entry.date} className="sm:hidden">
                                <span aria-hidden>· </span>
                                {formatJournalDate(entry.date, 'short')}
                              </time>
                              {entry.readingTime && (
                                <span>
                                  <span aria-hidden>· </span>
                                  {entry.readingTime}
                                </span>
                              )}
                            </div>

                            <h3 className="mt-3 text-balance break-words text-xl font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-tech-light sm:text-2xl">
                              {entry.title}
                            </h3>

                            {/*
                              Summary when it exists, the entry's own opening when it
                              doesn't. Either way the index is readable on its own —
                              a journal you scroll, not a list of links.
                            */}
                            {(entry.summary || entry.excerpt) && (
                              <p className="mt-3 max-w-prose text-[15px] leading-[1.7] text-white/55">
                                {entry.summary || entry.excerpt}
                              </p>
                            )}

                            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/30 transition-colors group-hover:text-tech-light">
                              Read the entry
                              <ArrowRight
                                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                                aria-hidden
                              />
                            </span>
                          </div>
                        </TrackedLink>
                      </li>
                    )
                  })}
                </ul>
              </section>
            ))
          )}

          <TrackedLink
            href="/blog"
            eventName="journal_navigation"
            eventProperties={{ destination: 'blog_cta' }}
            className="group mt-16 block border-t border-white/10 pt-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light sm:grid sm:grid-cols-[7rem_1fr] sm:gap-x-8"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-tech-light/60 sm:text-right">
              Blog
            </p>
            <div>
              <p className="text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-tech-light">
                The researched work lives next door
              </p>
              <p className="mt-3 max-w-prose text-[15px] leading-[1.7] text-white/55">
                When a note here turns into something worth researching properly, it
                graduates to an article — AI architecture, creative workflows, and what is
                actually shipping, written to still be useful a year from now.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-tech-light">
                Read the blog
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                  aria-hidden
                />
              </span>
            </div>
          </TrackedLink>
        </div>
      </section>
    </main>
  )
}
