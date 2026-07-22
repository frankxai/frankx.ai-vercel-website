import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Globe2,
  GraduationCap,
  Mic2,
  PenLine,
  Sparkles,
  StickyNote,
} from 'lucide-react'

import { EventRibbon } from '@/components/connect/EventRibbon'
import { createMetadata } from '@/lib/seo'
import { getMvuEntrySummaries, type MvuKind } from '@/lib/mvu'
import { MVU_LAB } from '@/lib/mvu/lab'

const SITE_URL = 'https://frankx.ai'
const MVU_URL = SITE_URL + '/mvu'
const OFFICIAL_EVENT_URL = 'https://www.mindvalley.com/u/schedule'
const FEATURED_ARTICLE_URL = '/blog/your-mind-is-a-temporary-library'
const FEATURED_ARTICLE_IMAGE =
  '/images/blog/editorial/headers/your-mind-is-a-temporary-library-hero.webp'
const MINDVALLEY_LOGO_URL =
  'https://res.cloudinary.com/mindvalley/image/upload/v1640746015/mvcom/mv-logo.svg'

// Revalidate hourly so newly committed journal entries and the live event
// ribbon surface without a redeploy during the two-week window.
export const revalidate = 3600

export const metadata: Metadata = createMetadata({
  title: 'MVU Tallinn Field Journal & AI Service Layer',
  description:
    'An independent field journal from Mindvalley University 2026 in Tallinn: honest notes, practical guides, and AI architecture for students, speakers, authors, and people beyond the room.',
  path: '/mvu',
})

const KIND_META: Record<MvuKind, { label: string; icon: typeof BookOpen }> = {
  essay: { label: 'Essay', icon: BookOpen },
  journal: { label: 'Journal', icon: PenLine },
  note: { label: 'Note', icon: StickyNote },
}

const SERVICE_PATHS = [
  {
    title: 'For students and attendees',
    description:
      'Field notes, practical models, and a small independent lab that help turn an intense week into choices and practices that survive ordinary life.',
    output: 'Journals · guides · independent lab',
    icon: GraduationCap,
  },
  {
    title: 'For speakers and authors',
    description:
      'A respectful path from a substantial body of work to creator-owned knowledge architecture: source maps, AI companions, reusable tools, and living learning systems.',
    output: 'Knowledge maps · AI architecture · prototypes',
    icon: Mic2,
  },
  {
    title: 'For people beyond Tallinn',
    description:
      'Public essays and distilled guides for anyone who could not attend, with clear provenance so a useful idea can travel without pretending to replace the room.',
    output: 'Open journal · explainers · field-tested playbooks',
    icon: Globe2,
  },
] as const

function formatDate(date: string): string {
  if (!date) return ''
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function MvuJsonLd({ entryCount }: { entryCount: number }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'MVU Tallinn Field Journal & AI Service Layer',
    description:
      'Independent field notes, public guides, and AI architecture inspired by participation in Mindvalley University 2026 in Tallinn.',
    url: MVU_URL,
    isPartOf: { '@type': 'WebSite', name: 'FrankX', url: SITE_URL },
    author: { '@type': 'Person', name: 'Frank Riemer', url: SITE_URL },
    about: {
      '@type': 'Event',
      name: 'Mindvalley University 2026',
      url: OFFICIAL_EVENT_URL,
      startDate: '2026-07-20',
      endDate: '2026-08-02',
      location: {
        '@type': 'Place',
        name: 'Tallinn, Estonia',
      },
    },
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
            <div className="flex flex-wrap items-center gap-3">
              <EventRibbon />
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-tech-light/80">
                Tallinn · 20 Jul – 2 Aug 2026
              </p>
            </div>

            <h1 className="mt-8 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-white sm:text-6xl">
              What happens here should keep helping after Tallinn.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/70">
              I came to Mindvalley University as a participant: to learn, meet
              people, and let the experience change my mind. My contribution is
              the craft I already practise—turning lived insight into honest
              journals, useful guides, and AI systems that help knowledge keep
              serving after the room has emptied.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/journal"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-tech-light px-6 py-3 text-sm font-semibold text-void transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                Read the public journal
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/connect?ref=mvu"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                Continue the conversation
              </Link>
            </div>
          </div>

          <figure className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-space shadow-2xl shadow-tech-primary/10">
              <Image
                src={FEATURED_ARTICLE_IMAGE}
                alt="A luminous library merging with a night city, representing ideas becoming living public memory"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 text-xs leading-5 text-white/55">
                Original FrankX editorial artwork for “Your Mind Is a Temporary
                Library.”
              </figcaption>
            </div>
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
            aria-label="Visit the official Mindvalley University 2026 schedule"
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
              Official event schedule
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </span>
          </a>

          <p className="max-w-xl text-sm leading-6 text-white/45 md:text-right">
            Participant field journal · independently written and published by
            FrankX · not organized, sponsored, or endorsed by Mindvalley.
          </p>
        </div>
      </section>

      <section className="border-b border-white/10 py-20 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-tech-light/80">
              My purpose here
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Make the value travel—without claiming the stage.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/65">
              The speakers own their work. The students own their stories.
              Mindvalley owns the official event experience. I document what I
              personally learn, separate observation from interpretation, and
              use my AI architecture skills to make the resulting knowledge
              easier to revisit, apply, and share.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-3">
            {SERVICE_PATHS.map((path) => {
              const Icon = path.icon
              return (
                <article key={path.title} className="bg-void p-7 sm:p-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-tech-light/20 bg-tech-light/5 text-tech-light">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-7 text-xl font-semibold tracking-tight text-white">
                    {path.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-white/60">
                    {path.description}
                  </p>
                  <p className="mt-6 border-t border-white/10 pt-5 text-xs font-medium uppercase tracking-[0.16em] text-tech-light/65">
                    {path.output}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-20 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <Link
            href={FEATURED_ARTICLE_URL}
            className="group relative block aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-space focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
          >
            <Image
              src={FEATURED_ARTICLE_IMAGE}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover transition duration-500 group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-void/75 via-transparent to-transparent"
            />
          </Link>

          <div>
            <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-tech-light/80">
              <Sparkles className="h-4 w-4" aria-hidden />
              Featured field essay
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Your Mind Is a Temporary Library
            </h2>
            <p className="mt-5 text-base leading-7 text-white/65">
              A reflection on mortality, memory, and the responsibility to turn
              what we know into something another person can use. It is also the
              clearest statement of why this journal exists.
            </p>
            <Link
              href={FEATURED_ARTICLE_URL}
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-tech-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
            >
              Read the essay
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-20 sm:py-24">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">
          <Link
            href="/mvu/lab"
            className="group block rounded-3xl border border-tech-primary/25 bg-gradient-to-br from-tech-primary/[0.08] to-transparent p-7 transition-colors hover:border-tech-primary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light sm:p-8"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-tech-primary">
              {MVU_LAB.confirmed
                ? 'Independent lab · Week 2'
                : 'Independent lab · gauging interest'}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              {MVU_LAB.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {MVU_LAB.tagline}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-tech-light">
              {MVU_LAB.confirmed ? 'See details & RSVP' : 'Register interest'}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                aria-hidden
              />
            </span>
          </Link>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">
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
                      href={'/mvu/' + entry.slug}
                      className="group flex flex-col gap-2 py-6 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
                    >
                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/40">
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

          <div className="mt-14 rounded-3xl border border-white/10 bg-space p-7 text-center sm:p-9">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-tech-light/75">
              Met me in Tallinn?
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Let the conversation become something useful.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/60">
              If you are a student, speaker, author, or builder with work worth
              preserving, tell me what you want to keep alive after the event.
            </p>
            <Link
              href="/connect?ref=mvu"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-tech-light px-6 py-3 text-sm font-semibold text-void transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
            >
              Continue the conversation
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
