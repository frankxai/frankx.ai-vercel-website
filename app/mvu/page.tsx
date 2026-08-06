import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  FileClock,
  Microscope,
  PenLine,
  ShieldCheck,
  StickyNote,
} from 'lucide-react'

import { TrackedLink } from '@/components/analytics/TrackedLink'
import { getMvuCorpusStats, getMvuEntrySummaries, type MvuKind } from '@/lib/mvu'
import { MVU_LAB } from '@/lib/mvu/lab'
import { createMetadata, siteConfig } from '@/lib/seo'

const SITE_URL = siteConfig.url
const MVU_URL = `${SITE_URL}/mvu`
const OFFICIAL_EVENT_URL = 'https://www.mindvalley.com/u'

export const dynamic = 'force-static'
export const revalidate = 86400

export const metadata: Metadata = createMetadata({
  title: 'What stayed after Tallinn — MVU 2026 field notes',
  description:
    'Frank Riemer’s independent field notes from Mindvalley University 2026 in Tallinn: five public essays, a governed editorial record, and the work continuing toward Porto 2027.',
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

const INTEGRATION_METHOD = [
  {
    index: '01',
    title: 'Notice',
    detail: 'Experience becomes a deliberate selection, not an indiscriminate archive.',
  },
  {
    index: '02',
    title: 'Test',
    detail: 'The smallest useful practice becomes an artifact someone can actually use.',
  },
  {
    index: '03',
    title: 'Bind',
    detail: 'Social commitment and environment give the idea somewhere to live.',
  },
  {
    index: '04',
    title: 'Return',
    detail: 'Follow-up produces evidence after the original charge has passed.',
  },
  {
    index: '05',
    title: 'Update',
    detail: 'What worked changes the system; what did not becomes an honest boundary.',
  },
] as const

const AUTHORITY_ENGINES = [
  ['01', 'Expert', 'Make the body of work retrievable.'],
  ['02', 'Audience', 'Listen for real language and demand.'],
  ['03', 'Authority', 'Name the defensible point of view.'],
  ['04', 'Product', 'Sequence one useful transformation.'],
  ['05', 'Funnel', 'Let every interaction improve the next.'],
] as const

function formatDate(date: string): string {
  if (!date) return ''
  const value = new Date(date)
  if (Number.isNaN(value.getTime())) return date

  return value.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function MvuJsonLd({ publishedCount }: { publishedCount: number }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'What stayed after Tallinn — MVU 2026 field notes',
    description:
      'Independent participant field notes and essays from Mindvalley University 2026 in Tallinn, with work continuing toward Porto 2027.',
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
    mainEntity: { '@type': 'ItemList', numberOfItems: publishedCount },
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
  const corpus = getMvuCorpusStats()
  const dates = entries.map((entry) => entry.date).filter(Boolean).sort()
  const first = dates[0] ? formatDate(dates[0]) : ''
  const last = dates.at(-1) ? formatDate(dates.at(-1) ?? '') : ''
  const dateRange = first && last ? (first === last ? first : `${first} to ${last}`) : ''

  return (
    <main className="min-h-screen overflow-hidden bg-void text-white">
      <MvuJsonLd publishedCount={entries.length} />

      <section className="relative border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-tech-light/60"
        />

        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
          <div>
            <p className="text-sm font-medium text-tech-light">
              Mindvalley University · Tallinn 2026
            </p>

            <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[0.98] tracking-[-0.05em] text-white sm:text-7xl">
              What stayed after Tallinn.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65 sm:text-xl sm:leading-9">
              I arrived with a notebook and left with a sharper test for every
              insight: what changes after the room empties? This is the public
              edit — the ideas that survived contact with ordinary life, and
              the systems they made me build.
            </p>

            <p className="mt-6 max-w-2xl font-serif text-lg italic leading-8 text-white/80">
              For the people who were there, the authors who shaped the rooms,
              and anyone wondering whether Porto is worth the journey.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <TrackedLink
                href="#archive"
                eventName="mvu_navigation"
                eventProperties={{ destination: 'archive', placement: 'hero_cta' }}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-tech-light px-6 py-3 text-sm font-semibold text-void transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                Read the field notes
                <ArrowRight className="h-4 w-4" aria-hidden />
              </TrackedLink>
              <TrackedLink
                href="#what-followed"
                eventName="mvu_navigation"
                eventProperties={{ destination: 'what_followed', placement: 'hero_secondary' }}
                className="inline-flex min-h-11 items-center justify-center gap-1.5 text-sm text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                See what followed
              </TrackedLink>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-space/80 p-6 shadow-2xl shadow-tech-primary/10 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex rounded-xl border border-tech-light/20 bg-tech-light/10 p-2.5 text-tech-light">
                <FileClock className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-white">The field record</p>
                <p className="mt-0.5 text-sm text-white/50">Editorial state · 6 Aug 2026</p>
              </div>
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              {[
                [corpus.total, 'captured'],
                [corpus.published, 'public'],
                [corpus.held, 'held'],
              ].map(([value, label]) => (
                <div key={label} className="bg-void px-2 py-5 text-center sm:px-4">
                  <dt className="text-xs text-white/50">{label}</dt>
                  <dd className="mt-1 font-display text-3xl font-semibold tracking-tight text-white">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-7 space-y-4 text-sm leading-6 text-white/60">
              <li className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-tech-light" aria-hidden />
                Public notes have passed a source and editorial review.
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-tech-light" aria-hidden />
                Held notes stay private until evidence, consent, and usefulness are clear.
              </li>
            </ul>

            <p className="mt-7 border-t border-white/10 pt-5 text-sm leading-6 text-white/50">
              The count is generated from the live editorial corpus. A charged
              idea is not automatically a public claim.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-b border-white/10 bg-space/40">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="max-w-3xl text-sm leading-6 text-white/60">
            I attended as a participant and wrote this independently. This is
            not an official Mindvalley publication, and no attendee likeness or
            private conversation is published here without permission.
          </p>
          <a
            href={OFFICIAL_EVENT_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
          >
            Official event site
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </section>

      <section id="archive" className="scroll-mt-24 border-b border-white/10 py-20 sm:py-28">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:px-8">
          <div>
            <p className="text-sm font-medium text-tech-light">The public edit</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.035em] text-white sm:text-5xl">
              Five notes that earned their way out.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/60">
              These are not transcripts or official summaries. They are what I
              could source, test, and still stand behind after leaving Tallinn.
              The remaining {corpus.held} pieces are preserved under editorial
              hold, not lost or quietly presented as fact.
            </p>
            {dateRange && (
              <p className="mt-5 text-sm leading-6 text-white/55">
                Public entries dated {dateRange}.
              </p>
            )}
          </div>

          {entries.length === 0 ? (
            <p className="text-white/50">The public edit is being prepared.</p>
          ) : (
            <ol className="divide-y divide-white/10 border-y border-white/10">
              {entries.map((entry, index) => {
                const meta = KIND_META[entry.kind]
                const Icon = meta.icon

                return (
                  <li key={entry.slug}>
                    <Link
                      href={`/mvu/${entry.slug}`}
                      className="group grid gap-4 py-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light sm:grid-cols-[2.5rem_1fr_auto] sm:items-start"
                    >
                      <span className="font-display text-sm font-semibold text-white/55">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>
                        <span className="flex flex-wrap items-center gap-2 text-xs text-white/50">
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
                        </span>
                        <span className="mt-2 block font-display text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-tech-light">
                          {entry.title}
                        </span>
                        {entry.summary && (
                          <span className="mt-3 block max-w-2xl text-sm leading-6 text-white/55">
                            {entry.summary}
                          </span>
                        )}
                      </span>
                      <ArrowRight
                        className="mt-1 hidden h-4 w-4 text-white/55 transition group-hover:translate-x-1 group-hover:text-tech-light motion-reduce:transform-none sm:block"
                        aria-hidden
                      />
                    </Link>
                  </li>
                )
              })}
            </ol>
          )}
        </div>
      </section>

      <section id="what-followed" className="scroll-mt-24 border-b border-white/10 bg-space/35 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-tech-light">What followed</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.035em] text-white sm:text-5xl">
              The room ends. The work should not.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/60">
              Tallinn clarified a simple integration discipline. Capture is the
              beginning, not the result. An insight becomes useful only when it
              changes a practice, produces evidence, and updates the system that
              will meet you next time.
            </p>
          </div>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-5">
            {INTEGRATION_METHOD.map((step) => (
              <li key={step.index} className="bg-void p-6 sm:p-7">
                <p className="font-display text-sm font-semibold text-tech-light">{step.index}</p>
                <h3 className="mt-8 font-display text-xl font-semibold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/55">{step.detail}</p>
              </li>
            ))}
          </ol>

          <p className="mt-8 max-w-3xl text-sm leading-7 text-white/50">
            This is also the discipline underneath the editorial hold. Some
            notes need a public source. Some need lived evidence. Some need to
            remain private. Preservation is not the same as publication.
          </p>
        </div>
      </section>

      <section className="border-b border-white/10 py-20 sm:py-28">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20 lg:px-8">
          <div>
            <span className="inline-flex rounded-xl border border-tech-light/20 bg-tech-light/10 p-3 text-tech-light">
              <BrainCircuit className="h-6 w-6" aria-hidden />
            </span>
            <p className="mt-6 text-sm font-medium text-tech-light">A working artifact</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.035em] text-white sm:text-5xl">
              Make a body of work easier to use — without flattening the person behind it.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/60">
              One system that grew out of this period is the Expert Authority
              diagnostic: five connected lenses for people with years of
              knowledge, stories, methods, and audience evidence. It returns a
              practical map you can keep as Markdown.
            </p>
            <TrackedLink
              href="/mvu/expert-authority"
              eventName="mvu_navigation"
              eventProperties={{ destination: 'expert_authority', placement: 'artifact_section' }}
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-tech-light/60 hover:text-tech-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
            >
              Explore the five-engine diagnostic
              <ArrowRight className="h-4 w-4" aria-hidden />
            </TrackedLink>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-space/70">
            <div className="border-b border-white/10 px-6 py-5 sm:px-8">
              <p className="font-display text-lg font-semibold text-white">
                Expert Authority Intelligence System
              </p>
              <p className="mt-1 text-sm text-white/50">Five engines · one governed learning loop</p>
            </div>
            <ol className="divide-y divide-white/10">
              {AUTHORITY_ENGINES.map(([index, name, detail]) => (
                <li key={index} className="grid grid-cols-[2.5rem_1fr] gap-3 px-6 py-5 sm:grid-cols-[3rem_0.7fr_1.3fr] sm:px-8">
                  <span className="font-display text-sm font-semibold text-tech-light">{index}</span>
                  <span className="font-display font-semibold text-white">{name}</span>
                  <span className="col-start-2 text-sm leading-6 text-white/55 sm:col-start-auto">
                    {detail}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-tech-light">Porto · 12 Jul – 18 Aug 2027</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.035em] text-white sm:text-5xl">
            Porto is the next chapter, not the pitch.
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Mindvalley currently lists Porto for those dates. I am keeping one
            independent possibility open: a small, paper-first lab for turning
            the best idea you find there into a return path you can keep. There
            is no confirmed room and no official affiliation.
          </p>

          <div className="mt-10 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2">
            <article className="bg-void p-7 sm:p-8">
              <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                If you are attending
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/55">
                See the ninety-minute lab concept, its exact outputs, and the
                boundaries that must be true before it happens.
              </p>
              <Link
                href="/mvu/lab"
                className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-tech-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                Read the Porto lab note
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </article>
            <article className="bg-void p-7 sm:p-8">
              <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                If you teach or publish
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/55">
                Start with the authority diagnostic. It is the clearest way to
                see which part of your body of work needs structure next.
              </p>
              <Link
                href="/mvu/expert-authority#diagnostic"
                className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-tech-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                Map the current constraint
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </article>
          </div>

          <p className="mt-9 text-sm leading-6 text-white/55">
            Dates and event details can change. The official event site remains
            the source of truth.
          </p>
        </div>
      </section>
    </main>
  )
}
