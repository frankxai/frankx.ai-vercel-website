import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, PenLine, Rss, StickyNote, Terminal } from 'lucide-react'

import { createMetadata, siteConfig } from '@/lib/seo'
import {
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

function formatDate(date: string): string {
  if (!date) return ''
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
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

  return (
    <main className="min-h-screen bg-void text-white">
      <JournalJsonLd entryCount={entries.length} />

      <section className="border-b border-white/10">
        <div className="mx-auto w-full max-w-6xl px-5 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-tech-primary/20 bg-tech-primary/10 px-3 py-1.5">
              <PenLine className="h-4 w-4 text-tech-light" aria-hidden />
              <span className="text-xs font-medium text-tech-light">Journal</span>
            </span>
            <Link
              href="/journal/feed.xml"
              className="inline-flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-tech-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
            >
              <Rss className="h-3.5 w-3.5" aria-hidden />
              RSS
            </Link>
          </div>

          <h1 className="mt-7 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
            Daily notes, in public.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Short entries written as the work happens: what got built, what broke, what
            changed my mind. No hero images, no editing pass, no conclusion required.
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/45">
            When a note here turns into something worth researching properly, it graduates
            to an article on the{' '}
            <Link
              href="/blog"
              className="text-tech-light underline decoration-tech-light/30 underline-offset-4 transition-colors hover:decoration-tech-light"
            >
              blog
            </Link>
            . Two different jobs, two different places.
          </p>

          <p className="mt-9 text-sm text-white/40">
            <span className="font-semibold text-white">{entries.length}</span>{' '}
            {entries.length === 1 ? 'entry' : 'entries'}
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
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
              <div key={month.key} className="mb-12 last:mb-0">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                  {month.label}
                </h2>

                <ul className="mt-4 divide-y divide-white/10 border-t border-white/10">
                  {month.entries.map((entry) => {
                    const Icon = KIND_ICON[entry.kind]
                    return (
                      <li key={entry.slug}>
                        <Link
                          href={`/journal/${entry.slug}`}
                          className="group flex flex-col gap-2 py-6 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
                        >
                          <div className="flex flex-wrap items-center gap-3 text-xs text-white/40">
                            <span className="inline-flex items-center gap-1.5 text-tech-light/80">
                              <Icon className="h-3.5 w-3.5" aria-hidden />
                              {JOURNAL_KIND_LABEL[entry.kind]}
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
                            <p className="text-sm leading-relaxed text-white/55">
                              {entry.summary}
                            </p>
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))
          )}

          <Link
            href="/blog"
            className="group mt-14 block border-t border-white/10 pt-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-tech-light/70">
              Blog
            </p>
            <p className="mt-3 text-lg font-semibold text-white transition-colors group-hover:text-tech-light">
              The researched work lives next door
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
              AI architecture, creative workflows, and what is actually shipping —
              written to still be useful a year from now.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-tech-light">
              Read the blog
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                aria-hidden
              />
            </span>
          </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
