import Link from 'next/link'
import { ArrowRight, ArrowUpRight, CheckCircle2, Rss } from 'lucide-react'

import {
  CHANGELOG_SOURCE_REPOSITORY,
  CHANGELOG_UPDATED_AT,
  formatChangelogDate,
  getChangelogUpdates,
} from '@/lib/changelog'

export default function ChangelogPage() {
  const updates = getChangelogUpdates()
  const [latest, ...archive] = updates
  const proofCount = updates.reduce((total, update) => total + update.proof.length, 0)

  return (
    <main className="min-h-screen overflow-hidden bg-void text-white">
      <header className="relative border-b border-white/10">
        <div aria-hidden className="absolute inset-y-0 left-[calc(50%-1px)] hidden w-px bg-white/[0.04] lg:block" />
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-32">
          <div className="max-w-4xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-tech-light/75">
              FrankX release ledger
            </p>
            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
              Meaningful changes, with the receipts attached.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
              A curated record of what changed across the public workspace, why it matters, and the
              merged work behind each release.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/changelog/rss.xml"
              className="inline-flex min-h-11 items-center gap-2 border border-white/15 px-4 py-2.5 text-sm font-semibold text-white/75 transition-colors hover:border-tech-light/45 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
            >
              <Rss className="h-4 w-4" aria-hidden />
              Changelog RSS
            </Link>
            <a
              href={CHANGELOG_SOURCE_REPOSITORY}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white/55 transition-colors hover:text-tech-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
            >
              Source repository
              <ArrowUpRight className="h-4 w-4" aria-hidden />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <dl className="mt-14 grid max-w-3xl gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
            <div className="bg-void px-5 py-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">Cadence</dt>
              <dd className="mt-1.5 text-sm font-medium text-white/75">Weekly when meaningful</dd>
            </div>
            <div className="bg-void px-5 py-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">Coverage</dt>
              <dd className="mt-1.5 text-sm font-medium text-white/75">{updates.length} curated releases</dd>
            </div>
            <div className="bg-void px-5 py-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">Evidence</dt>
              <dd className="mt-1.5 text-sm font-medium text-white/75">{proofCount} public receipts</dd>
            </div>
          </dl>
        </div>
      </header>

      <section aria-labelledby="latest-release" className="border-b border-white/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-tech-light/70">Latest release</p>
            <time dateTime={latest.releasedAt} className="mt-3 block font-mono text-sm text-white/45">
              {formatChangelogDate(latest.releasedAt)}
            </time>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/40">
              Published notes are edited for decisions and outcomes. The linked pull requests preserve the technical record.
            </p>
          </div>

          <article>
            <p className="text-sm font-semibold text-tech-light">{latest.category}</p>
            <h2 id="latest-release" className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl">
              {latest.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60">{latest.summary}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {latest.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 border-t border-white/10 pt-3 text-sm leading-relaxed text-white/65">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-tech-light/70" aria-hidden />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/changelog/${latest.slug}`}
              className="mt-9 inline-flex min-h-11 items-center gap-2 border-b border-tech-light/45 py-2 text-sm font-semibold text-white transition-colors hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
            >
              Read the release note
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </article>
        </div>
      </section>

      <section aria-labelledby="release-archive" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">Release archive</p>
            <h2 id="release-archive" className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              The ledger
            </h2>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/30">
            Updated {formatChangelogDate(CHANGELOG_UPDATED_AT, 'short')}
          </p>
        </div>

        <ol>
          {archive.map((update, index) => (
            <li key={update.slug} className="group border-b border-white/10">
              <Link
                href={`/changelog/${update.slug}`}
                className="grid gap-5 py-9 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light sm:grid-cols-[10rem_1fr_auto] sm:items-start sm:gap-8"
              >
                <div>
                  <time dateTime={update.releasedAt} className="font-mono text-xs text-white/40">
                    {formatChangelogDate(update.releasedAt, 'short')}
                  </time>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.17em] text-tech-light/60">
                    {update.category}
                  </p>
                </div>
                <div className="max-w-2xl">
                  <h3 className="text-balance text-2xl font-semibold leading-tight tracking-[-0.025em] text-white transition-colors group-hover:text-tech-light sm:text-3xl">
                    {update.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-white/50">{update.summary}</p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
                    {update.proof.length} public receipts · Release {String(index + 2).padStart(2, '0')}
                  </p>
                </div>
                <ArrowRight className="mt-1 hidden h-5 w-5 text-white/25 transition-transform group-hover:translate-x-1 group-hover:text-tech-light sm:block" aria-hidden />
              </Link>
            </li>
          ))}
        </ol>

        <div className="mt-14 max-w-2xl border-l border-tech-light/35 pl-5">
          <h2 className="text-lg font-semibold">How the ledger works</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/50">
            Routine dependency and maintenance work is grouped into a release only when it changes risk, capability, or experience. Technical tags produce draft GitHub releases; this page remains the plain-language record.
          </p>
        </div>
      </section>
    </main>
  )
}
