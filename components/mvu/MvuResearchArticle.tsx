import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpenCheck,
  CalendarDays,
  ExternalLink,
  FileSearch,
} from 'lucide-react'

import { MDXContent } from '@/components/blog/MDXContent'
import type { MvuEntry } from '@/lib/mvu'

const DAN_BRULE_LINKS = 'https://links.breathmastery.com/'

function formatDate(date: string): string {
  if (!date) return ''
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function BreathInstrument() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-white/10 bg-space">
      <div className="border-b border-white/10 px-6 py-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-tech-light/70">
          Breath instrument
        </p>
        <p className="mt-2 text-sm text-white/60">Session model · not a timer</p>
      </div>

      <div className="relative px-6 py-8 sm:px-8">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-8 h-[calc(100%-4rem)] w-px bg-gradient-to-b from-tech-light/5 via-tech-light/35 to-tech-light/5"
        />

        <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-light">
              Inhale
            </p>
            <p className="mt-2 text-lg font-semibold text-white">Open + expand</p>
            <p className="mt-1 text-xs leading-5 text-white/60">
              Complete and comfortable
            </p>
          </div>

          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-tech-light/35 bg-tech-light/[0.06] shadow-[0_0_50px_rgba(16,185,129,0.08)]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-void">
              <span className="h-2 w-2 rounded-full bg-tech-light" />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Exhale
            </p>
            <p className="mt-2 text-lg font-semibold text-white">Relax + release</p>
            <p className="mt-1 text-xs leading-5 text-white/60">
              Unforced and unheld
            </p>
          </div>
        </div>

        <div className="relative mt-8 flex flex-wrap justify-center gap-2">
          {['Awareness', 'Relaxation', 'Breathing'].map((label, index) => (
            <span
              key={label}
              className="rounded-full border border-white/10 bg-void px-3 py-1.5 text-[11px] font-medium text-white/55"
            >
              {index + 1}. {label}
            </span>
          ))}
        </div>
      </div>

      <figcaption className="border-t border-white/10 px-6 py-4 text-xs leading-5 text-white/60">
        Frank&apos;s visual synthesis of the session. “Fully in” means complete
        but comfortable—not a forced maximum.
      </figcaption>
    </figure>
  )
}

function SourceKey() {
  const items = [
    { label: 'Dan Brulé', tone: 'bg-tech-light' },
    { label: 'Research', tone: 'bg-cyan-400' },
    { label: "Frank's synthesis", tone: 'bg-white/50' },
  ]

  return (
    <div className="rounded-2xl border border-white/10 bg-space p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
        Source key
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-3 text-sm text-white/65">
            <span className={`h-1.5 w-1.5 rounded-full ${item.tone}`} aria-hidden />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function MvuResearchArticle({ entry }: { entry: MvuEntry }) {
  return (
    <article className="text-white">
      <header className="relative overflow-hidden border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tech-light/60 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-15%] top-[-25%] h-[34rem] w-[34rem] rounded-full bg-tech-light/[0.04] blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <Link
            href="/mvu"
            className="inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-tech-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            MVU field journal
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-tech-light/80">
                Field research · Day 8 · Tallinn
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
                {entry.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
                {entry.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/60">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-tech-light/65" aria-hidden />
                  {formatDate(entry.date)}
                </span>
                {entry.speaker && (
                  <span className="inline-flex items-center gap-2">
                    <BookOpenCheck className="h-4 w-4 text-tech-light/65" aria-hidden />
                    Speaker: {entry.speaker}
                  </span>
                )}
                <span className="inline-flex items-center gap-2">
                  <FileSearch className="h-4 w-4 text-tech-light/65" aria-hidden />
                  {entry.sources.length} named sources · {entry.readingTime}
                </span>
              </div>

              <a
                href={DAN_BRULE_LINKS}
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-tech-light px-6 py-3 text-sm font-semibold text-void transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                Explore Dan Brulé&apos;s official resources
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>

            <BreathInstrument />
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16 lg:px-8 lg:py-24">
        <div className="min-w-0">
          <MDXContent source={entry.content} />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <SourceKey />
          <div className="rounded-2xl border border-white/10 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
              Field record
            </p>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-white/60">Session</dt>
                <dd className="mt-1 leading-5 text-white/65">{entry.session}</dd>
              </div>
              <div>
                <dt className="text-white/60">Evidence reviewed</dt>
                <dd className="mt-1 text-white/65">{formatDate(entry.reviewed)}</dd>
              </div>
            </dl>
          </div>
          <p className="px-1 text-xs leading-5 text-white/60">
            Teaching, research, and interpretation stay visibly separate. That
            boundary is part of the work.
          </p>
        </aside>
      </div>

      <footer className="border-t border-white/10 bg-space/45">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold text-white">Continue with the source</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
              Find Dan Brulé&apos;s books, courses, events, and Breath Mastery channels
              through his official link page.
            </p>
          </div>
          <a
            href={DAN_BRULE_LINKS}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-tech-light transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
          >
            links.breathmastery.com
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>
        <div className="border-t border-white/10">
          <p className="mx-auto w-full max-w-6xl px-5 py-6 text-xs leading-5 text-white/60 sm:px-6 lg:px-8">
            Independent participant research by FrankX. Not affiliated with or
            endorsed by Dan Brulé, Breath Mastery, or Mindvalley. Educational
            material only; breath practices can affect physiology and are not
            medical care.
          </p>
        </div>
      </footer>
    </article>
  )
}
