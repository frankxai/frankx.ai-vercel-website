import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Layers3,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'

import { TrackedLink } from '@/components/analytics/TrackedLink'
import { EventRibbon } from '@/components/connect/EventRibbon'
import { getMvuEntrySummaries, type MvuLayer } from '@/lib/mvu'
import { MVU_LAYER_META } from '@/lib/mvu-display'
import { createMetadata } from '@/lib/seo'
import { serializeJsonLd } from '@/lib/structured-data'

const SITE_URL = 'https://frankx.ai'
const MVU_URL = `${SITE_URL}/mvu`
const OFFICIAL_EVENT_URL = 'https://www.mindvalley.com/u/schedule'
const FEATURED_ARTICLE_URL = '/blog/your-mind-is-a-temporary-library'
const FEATURED_ARTICLE_IMAGE =
  '/images/blog/editorial/headers/your-mind-is-a-temporary-library-hero.webp'
const MINDVALLEY_LOGO_URL =
  'https://res.cloudinary.com/mindvalley/image/upload/v1640746015/mvcom/mv-logo.svg'

export const revalidate = 3600

export const metadata: Metadata = createMetadata({
  title: 'MVU Tallinn Field Atlas — Frank’s Notes, Sessions & Practices',
  description:
    'Frank Riemer’s independent record of Mindvalley University 2026 in Tallinn: first-person reflections, attributed field intelligence, and practical guides.',
  path: '/mvu',
})

function formatDate(date: string): string {
  if (!date) return ''
  const parsedDate = new Date(date)
  if (Number.isNaN(parsedDate.getTime())) return date
  return parsedDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatShortDate(date: string): string {
  if (!date) return ''
  const parsedDate = new Date(date)
  if (Number.isNaN(parsedDate.getTime())) return date
  return parsedDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  })
}

function MvuJsonLd({ entryCount }: { entryCount: number }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'MVU Tallinn Field Atlas',
    description:
      'First-person reflections, attributed field intelligence, and practical guides from Frank Riemer’s participation in Mindvalley University 2026.',
    url: MVU_URL,
    isPartOf: { '@type': 'WebSite', name: 'FrankX', url: SITE_URL },
    author: { '@type': 'Person', name: 'Frank Riemer', url: SITE_URL },
    about: {
      '@type': 'Event',
      name: 'Mindvalley University 2026',
      url: OFFICIAL_EVENT_URL,
      startDate: '2026-07-20',
      endDate: '2026-08-02',
      location: { '@type': 'Place', name: 'Tallinn, Estonia' },
    },
    mainEntity: { '@type': 'ItemList', numberOfItems: entryCount },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  )
}

export default function MvuPage() {
  const entries = getMvuEntrySummaries()
  const featuredNote =
    entries.find((entry) => entry.featured && entry.layer === 'frank-note') ??
    entries.find((entry) => entry.layer === 'frank-note')
  const chronology = entries.filter((entry) => entry.slug !== featuredNote?.slug)

  return (
    <main className="min-h-screen overflow-hidden bg-void text-white">
      <MvuJsonLd entryCount={entries.length} />

      <section className="relative isolate border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_28%,rgba(251,191,36,0.11),transparent_31%),radial-gradient(circle_at_18%_82%,rgba(67,191,227,0.08),transparent_34%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/70 to-transparent"
        />

        <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-20 lg:px-8 lg:py-28">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <EventRibbon />
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-200/70">
                Tallinn · 20 Jul – 2 Aug 2026
              </p>
            </div>

            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
              A living field atlas
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.5rem]">
              One week changed more than I expected.
              <span className="block text-amber-100/90">
                This is the record I meant to publish.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68">
              I came to Mindvalley University to learn, meet people, and let the
              experience change me. This page now starts with what I actually
              said—then separates my journal from editorial synthesis and the
              practical systems built from it.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {featuredNote && (
                <TrackedLink
                  href={`/mvu/${featuredNote.slug}`}
                  eventName="mvu_navigation"
                  eventProperties={{
                    destination: 'week_one_reflection',
                    placement: 'hero_cta',
                  }}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-amber-200 px-6 py-3 text-sm font-semibold text-void transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200"
                >
                  Read the Week One reflection
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </TrackedLink>
              )}
              <Link
                href="#atlas"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/75 transition-colors hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                Browse the field atlas
              </Link>
            </div>
          </div>

          {featuredNote && (
            <figure className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-amber-300/[0.06] blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-amber-100/15 bg-space p-7 shadow-2xl shadow-black/40 sm:p-9">
              <div className="flex items-center justify-between border-b border-white/10 pb-5 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-white/38">
                <span>{featuredNote.session || 'Frank’s note'}</span>
                <time dateTime={featuredNote.date}>
                  {featuredNote.recordedAt || formatShortDate(featuredNote.date)}
                </time>
              </div>
              <blockquote className="mt-9 font-serif text-3xl leading-[1.28] tracking-[-0.025em] text-amber-50 sm:text-[2.45rem]">
                “{featuredNote.pullQuote || featuredNote.summary}”
              </blockquote>
              <figcaption className="mt-9 flex items-start gap-3 border-t border-white/10 pt-5 text-sm leading-6 text-white/48">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-200" aria-hidden />
                Light grammar and privacy edit. Ambitions remain ambitions. No
                speaker synthesis is presented as my verbatim journal.
              </figcaption>
            </div>
            </figure>
          )}
        </div>
      </section>

      <section className="border-b border-white/10 bg-white/[0.025]">
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
            <span className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors group-hover:text-white">
              Official event schedule
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </span>
          </a>

          <p className="max-w-xl text-sm leading-6 text-white/42 md:text-right">
            Independent participant journal by Frank Riemer · not organized,
            sponsored, or endorsed by Mindvalley.
          </p>
        </div>
      </section>

      <section className="border-b border-white/10 py-20 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/75">
              <Layers3 className="h-4 w-4" aria-hidden />
              The source boundary
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
              Keep the transmission. Label the interpretation.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/60">
              The previous version blended too many things into one polished
              voice. This atlas uses three visible layers so the provenance
              survives the editing.
            </p>
          </div>

          <div className="mt-11 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-3">
            {(Object.keys(MVU_LAYER_META) as MvuLayer[]).map((layer) => {
              const meta = MVU_LAYER_META[layer]
              const Icon = meta.icon
              return (
                <article key={layer} className="bg-void p-7 sm:p-8">
                  <Icon className={`h-5 w-5 ${meta.accent}`} aria-hidden />
                  <p className={`mt-7 text-xs font-semibold uppercase tracking-[0.2em] ${meta.accent}`}>
                    {meta.shortLabel}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
                    {meta.label}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-white/52">{meta.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {featuredNote && (
        <section className="border-b border-white/10 bg-space py-20 sm:py-28">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:gap-16 lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200/70">
                Start here · my words
              </p>
              <p className="mt-5 text-sm leading-6 text-white/45">
                Dictated at 04:16 after the first week. Lightly edited, not
                rewritten into a generic lesson.
              </p>
            </div>

            <article>
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-white/38">
                <span>{featuredNote.session}</span>
                <span aria-hidden>·</span>
                <time dateTime={featuredNote.date}>{formatDate(featuredNote.date)}</time>
                <span aria-hidden>·</span>
                <span>{featuredNote.readingTime}</span>
              </div>
              <h2 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl">
                {featuredNote.title}
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
                {featuredNote.summary}
              </p>
              <TrackedLink
                href={`/mvu/${featuredNote.slug}`}
                eventName="mvu_navigation"
                eventProperties={{
                  destination: featuredNote.slug,
                  placement: 'featured_reflection',
                }}
                className="group mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200"
              >
                Read the reflection
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                  aria-hidden
                />
              </TrackedLink>
            </article>
          </div>
        </section>
      )}

      <section id="atlas" className="scroll-mt-24 border-b border-white/10 py-20 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tech-light/75">
                Tallinn chronology
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white">
                Notes by session, not a false seamless story.
              </h2>
              <p className="mt-5 text-sm leading-6 text-white/48">
                Dates and session labels take priority over “Day 8” naming when
                several important sessions happened on the same day.
              </p>
            </div>

            <ol className="border-t border-white/10">
              {chronology.map((entry, index) => {
                const meta = MVU_LAYER_META[entry.layer]
                const Icon = meta.icon
                return (
                  <li key={entry.slug} className="border-b border-white/10">
                    <Link
                      href={`/mvu/${entry.slug}`}
                      className="group grid gap-4 py-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light sm:grid-cols-[5.5rem_1fr_auto] sm:items-start sm:gap-6"
                    >
                      <div className="flex items-center gap-3 text-xs text-white/35">
                        <span className="font-mono">{String(index + 1).padStart(2, '0')}</span>
                        <time dateTime={entry.date}>{formatShortDate(entry.date)}</time>
                      </div>
                      <div>
                        <p className={`inline-flex items-center gap-2 text-xs font-medium ${meta.accent}`}>
                          <Icon className="h-3.5 w-3.5" aria-hidden />
                          {entry.session || meta.label}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-tech-light">
                          {entry.title}
                        </h3>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-white/50">
                          {entry.summary}
                        </p>
                      </div>
                      <ArrowRight
                        className="mt-1 hidden h-4 w-4 text-white/25 transition group-hover:translate-x-1 group-hover:text-tech-light motion-reduce:transform-none motion-reduce:transition-none sm:block"
                        aria-hidden
                      />
                    </Link>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-space py-20 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300/75">
                <Wrench className="h-4 w-4" aria-hidden />
                Applied guides
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white">
                An insight earns a system only after the source is clear.
              </h2>
            </div>

            <div>
              <TrackedLink
                href="/mvu/unhooking-the-mind"
                eventName="mvu_navigation"
                eventProperties={{
                  destination: 'unhooking_the_mind',
                  placement: 'applied_guide',
                }}
                className="group block rounded-3xl border border-amber-200/20 bg-amber-100/[0.04] p-7 transition hover:-translate-y-0.5 hover:border-amber-200/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200 motion-reduce:transform-none motion-reduce:transition-none sm:p-9"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/75">
                    Live practice guide · 27 Jul
                  </p>
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-emerald-200">
                    Sources listed
                  </span>
                </div>
                <h3 className="mt-7 text-3xl font-semibold tracking-[-0.035em] text-white">
                  Unhooking the Mind
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/58">
                  A grounded practice for noticing when a thought becomes an
                  instruction—then returning to the body, honest inquiry, kind
                  action, and a clear boundary.
                </p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-amber-200">
                  Open the guide and tracker
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                    aria-hidden
                  />
                </span>
              </TrackedLink>


            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <Link
            href={FEATURED_ARTICLE_URL}
            aria-label="Read Your Mind Is a Temporary Library"
            className="group relative block aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
          >
            <Image
              src={FEATURED_ARTICLE_IMAGE}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover opacity-75 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-90 motion-reduce:transform-none motion-reduce:transition-none"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-void/85 via-transparent to-transparent"
            />
          </Link>

          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-tech-light/75">
              <BookOpen className="h-4 w-4" aria-hidden />
              Why preserve any of this?
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
              Your Mind Is a Temporary Library
            </h2>
            <p className="mt-5 text-base leading-7 text-white/58">
              The supporting thesis for this field atlas: memory is temporary,
              and useful knowledge deserves a form another person can revisit.
            </p>
            <Link
              href={FEATURED_ARTICLE_URL}
              className="group mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-tech-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
            >
              Read the essay
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="inline-flex items-center gap-2 text-sm text-white/50">
            <Sparkles className="h-4 w-4 text-amber-200/70" aria-hidden />
            Built from lived notes. Edited with a visible source boundary.
          </p>
          <Link
            href="/connect?ref=mvu"
            className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-white/72 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
          >
            Met me in Tallinn? Continue the conversation
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  )
}
