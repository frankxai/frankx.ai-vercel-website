import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Microscope,
  PenLine,
  StickyNote,
} from 'lucide-react'

import { TrackedLink } from '@/components/analytics/TrackedLink'
import { createMetadata, siteConfig } from '@/lib/seo'
import { getMvuEntrySummaries, type MvuKind } from '@/lib/mvu'
import { MVU_LAB } from '@/lib/mvu/lab'

const SITE_URL = siteConfig.url
const MVU_URL = SITE_URL + '/mvu'
const OFFICIAL_EVENT_URL = 'https://www.mindvalley.com/u'
const FEATURED_ARTICLE_URL = '/blog/your-mind-is-a-temporary-library'
const FEATURED_ARTICLE_IMAGE =
  '/images/blog/editorial/headers/your-mind-is-a-temporary-library-hero.webp'
const MINDVALLEY_LOGO_URL =
  'https://res.cloudinary.com/mindvalley/image/upload/v1640746015/mvcom/mv-logo.svg'

// The Tallinn window is closed, so nothing here changes hourly any more. Daily
// revalidation still surfaces newly committed entries without a redeploy, at a
// fraction of the previous rebuild rate.
export const revalidate = 86400

export const metadata: Metadata = createMetadata({
  title: 'Mindvalley University — Tallinn 2026 field notes, Porto 2027',
  description:
    'An independent participant’s field journal from Mindvalley University 2026 in Tallinn: what I wrote down, what held up afterwards, and what I am building before Porto in 2027.',
  path: '/mvu',
  keywords: [
    'Mindvalley University 2026',
    'Mindvalley U Tallinn',
    'Mindvalley University 2027',
    'Mindvalley U Porto',
    'Mindvalley University field notes',
    'Mindvalley University review',
  ],
})

const KIND_META: Record<MvuKind, { label: string; icon: typeof BookOpen }> = {
  essay: { label: 'Essay', icon: BookOpen },
  journal: { label: 'Journal', icon: PenLine },
  note: { label: 'Note', icon: StickyNote },
  research: { label: 'Research', icon: Microscope },
}

function formatDate(date: string): string {
  if (!date) return ''
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function MvuJsonLd({ entryCount }: { entryCount: number }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Mindvalley University — Tallinn 2026 field notes',
    description:
      'Independent participant field notes and essays written during Mindvalley University 2026 in Tallinn, and preparation for Porto 2027.',
    url: MVU_URL,
    isPartOf: { '@type': 'WebSite', name: 'FrankX', url: SITE_URL },
    author: { '@type': 'Person', name: 'Frank Riemer', url: SITE_URL },
    about: [
      {
        '@type': 'Event',
        name: 'Mindvalley University 2026',
        url: OFFICIAL_EVENT_URL,
        startDate: '2026-07-20',
        endDate: '2026-08-02',
        location: { '@type': 'Place', name: 'Tallinn, Estonia' },
      },
      {
        '@type': 'Event',
        name: 'Mindvalley University 2027',
        url: OFFICIAL_EVENT_URL,
        startDate: MVU_LAB.eventStart,
        endDate: MVU_LAB.eventEnd,
        location: { '@type': 'Place', name: 'Porto, Portugal' },
      },
    ],
    mainEntity: { '@type': 'ItemList', numberOfItems: entryCount },
    hasPart: {
      '@type': 'Article',
      name: 'Your Mind Is a Temporary Library',
      url: SITE_URL + FEATURED_ARTICLE_URL,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default function MvuPage() {
  const entries = getMvuEntrySummaries()

  return (
    <main className="min-h-screen overflow-hidden bg-void text-white">
      <MvuJsonLd entryCount={entries.length} />

      <section className="relative border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tech-light/70 to-transparent"
        />

        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-xl">
              <span className="text-sm text-white/60">
                Tallinn, Jul–Aug 2026 · next stop Porto, Jul 2027
              </span>
            </div>

            <h1 className="mt-7 max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl">
              Two weeks in Tallinn, written down.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/55">
              I went to Mindvalley University 2026 as a participant, not a
              speaker. No stage, no session, no booth. What I did instead was
              write — every day, in public, while it was still fresh enough to be
              honest.
            </p>

            <p className="mt-6 max-w-2xl font-serif text-lg italic leading-8 text-white/70">
              This is the whole record, kept up after the room emptied — and the
              open door to Porto.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <TrackedLink
                href="/connect?ref=mvu-porto"
                eventName="mvu_navigation"
                eventProperties={{ destination: 'porto_collaboration', placement: 'hero_cta' }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-tech-light px-6 py-3 text-sm font-semibold text-void transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                Build something before Porto
                <ArrowRight className="h-4 w-4" aria-hidden />
              </TrackedLink>
              <TrackedLink
                href="#archive"
                eventName="mvu_navigation"
                eventProperties={{ destination: 'archive', placement: 'hero_secondary' }}
                className="inline-flex items-center justify-center gap-1.5 text-sm text-white/50 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                Read the {entries.length} entries
              </TrackedLink>
            </div>
          </div>

          <figure className="relative">
            <Link
              href={FEATURED_ARTICLE_URL}
              aria-label="Read the essay: Your Mind Is a Temporary Library"
              className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-space shadow-2xl shadow-tech-primary/10">
                <Image
                  src={FEATURED_ARTICLE_IMAGE}
                  alt="A luminous library merging with a night city, representing ideas becoming living public memory"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/20 to-transparent"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-6">
                  <span className="text-sm text-white/50">The essay underneath all of it</span>
                  <span className="mt-1.5 block font-display text-xl font-semibold tracking-tight text-white">
                    Your Mind Is a Temporary Library
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-tech-light">
                    Read it
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                      aria-hidden
                    />
                  </span>
                </figcaption>
              </div>
            </Link>
          </figure>
        </div>
      </section>

      <section className="border-b border-white/10 bg-space/40">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-7 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <a
            href={OFFICIAL_EVENT_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex w-fit items-center gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
            aria-label="Visit the official Mindvalley University site"
          >
            <span className="inline-flex rounded-lg bg-white px-3 py-2">
              <Image
                src={MINDVALLEY_LOGO_URL}
                alt="Mindvalley"
                width={118}
                height={30}
                unoptimized
                className="h-6 w-auto"
              />
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-white/65 transition-colors group-hover:text-white">
              The official event
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </span>
          </a>

          <p className="max-w-xl text-sm leading-6 text-white/60 md:text-right">
            A participant’s journal, written and published independently by
            FrankX. Not organized, sponsored, or endorsed by Mindvalley.
          </p>
        </div>
      </section>

      <section className="border-b border-white/10 py-20 sm:py-24">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">
            What I actually did there.
          </h2>
          <div className="mt-7 space-y-5 text-base leading-8 text-white/60">
            <p>
              I sat in rooms and took notes. That is the whole claim. I did not
              teach, host, or sell anything in Tallinn — I floated one small
              independent lab, never locked a venue, and so it never ran.
            </p>
            <p>
              What I could do was the craft I already practise: turn two weeks of
              heavy input into something that still reads well a year later. Every
              entry below separates what I observed from what I think it means,
              and leaves out anything I could not stand behind — including a
              memorable statistic that arrived with no source attached.
            </p>
            <p>
              None of it reports what any speaker said. Their work is theirs to
              publish. These are notes on my own thinking, in rooms they happened
              to shape.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-20 sm:py-24">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-xl">
            <span className="text-sm text-white/60">Porto · 12 Jul – 18 Aug 2027</span>
          </div>

          <h2 className="mt-6 font-display text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">
            A year is enough time to do it properly.
          </h2>

          <p className="mt-6 text-base leading-8 text-white/60">
            The useful window was never the week of the event. It is now. If you
            are speaking, teaching, or publishing into Porto 2027 — or going and
            would rather arrive with something built than hope to assemble it
            afterwards — that work starts about eleven months out.
          </p>

          <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
            <article className="bg-void p-7">
              <h3 className="font-display text-lg font-semibold tracking-tight text-white">
                If you have a body of work
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/55">
                Speakers, authors, and teachers with years of material and no
                durable structure around it. I build the knowledge architecture:
                source maps, an AI companion trained on your own corpus, tools
                your audience keeps using. You own all of it.
              </p>
            </article>
            <article className="bg-void p-7">
              <h3 className="font-display text-lg font-semibold tracking-tight text-white">
                If you are going as a participant
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/55">
                The gap is never the insight, it is the catch. I am gauging
                interest in one small independent lab in Porto — ninety minutes
                building the system that keeps what you find there.
              </p>
              <Link
                href="/mvu/lab"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-tech-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                See the lab
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </article>
          </div>

          <div className="mt-10">
            <TrackedLink
              href="/connect?ref=mvu-porto"
              eventName="mvu_navigation"
              eventProperties={{ destination: 'porto_collaboration', placement: 'porto_section' }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-tech-light px-6 py-3 text-sm font-semibold text-void transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
            >
              Start the conversation
              <ArrowRight className="h-4 w-4" aria-hidden />
            </TrackedLink>
            <p className="mt-4 text-sm leading-6 text-white/55">
              Tell me what you want still standing after Porto. I answer these
              myself.
            </p>
          </div>
        </div>
      </section>

      <section id="archive" className="py-20 scroll-mt-24 sm:py-24">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">
            The Tallinn archive.
          </h2>
          <p className="mt-4 text-base leading-7 text-white/55">
            {entries.length} entries written between 20 July and 2 August 2026.
          </p>

          {entries.length === 0 ? (
            <p className="mt-8 text-white/50">Entries land here shortly.</p>
          ) : (
            <ul className="mt-8 divide-y divide-white/10">
              {entries.map((entry) => {
                const meta = KIND_META[entry.kind]
                const Icon = meta.icon
                return (
                  <li key={entry.slug}>
                    <Link
                      href={'/mvu/' + entry.slug}
                      className="group flex flex-col gap-2 py-6 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
                    >
                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
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
                      <h3 className="font-display text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-tech-light">
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
          )}
        </div>
      </section>
    </main>
  )
}
