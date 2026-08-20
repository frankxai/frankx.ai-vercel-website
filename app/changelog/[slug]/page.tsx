import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react'

import Breadcrumbs from '@/components/seo/Breadcrumbs'
import {
  formatChangelogDate,
  getAdjacentChangelogUpdates,
  getChangelogUpdate,
  getChangelogUpdates,
} from '@/lib/changelog'
import { createMetadata, siteConfig } from '@/lib/seo'
import { ldJson } from '@/lib/seo/jsonld'

export function generateStaticParams() {
  return getChangelogUpdates().map((update) => ({ slug: update.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const update = getChangelogUpdate(slug)

  if (!update) {
    return createMetadata({
      title: 'Release note not found | FrankX',
      description: 'This FrankX release note could not be found.',
      path: `/changelog/${slug}`,
      noindex: true,
    })
  }

  return createMetadata({
    title: `${update.title} | FrankX Changelog`,
    description: update.summary,
    path: `/changelog/${update.slug}`,
    type: 'article',
    publishedTime: update.publishedAt,
    updatedTime: update.modifiedAt,
    authors: ['Frank Riemer'],
    keywords: [...update.tags, 'FrankX changelog', 'release notes'],
  })
}

export default async function ChangelogUpdatePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const update = getChangelogUpdate(slug)
  if (!update) notFound()

  const { newer, older } = getAdjacentChangelogUpdates(slug)
  const pageUrl = `${siteConfig.url}/changelog/${update.slug}`
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: update.title,
    description: update.summary,
    datePublished: update.publishedAt,
    dateModified: update.modifiedAt,
    author: {
      '@type': 'Person',
      name: 'Frank Riemer',
      url: `${siteConfig.url}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'FrankX',
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    url: pageUrl,
    keywords: update.tags.join(', '),
    isPartOf: {
      '@type': 'CreativeWorkSeries',
      name: 'FrankX Changelog',
      url: `${siteConfig.url}/changelog`,
    },
  }

  return (
    <main className="min-h-screen bg-void text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(articleJsonLd) }} />

      <article>
        <header className="border-b border-white/10">
          <div className="mx-auto max-w-4xl px-5 pb-14 pt-24 sm:px-8 sm:pb-20 sm:pt-32">
            <Breadcrumbs
              items={[
                { label: 'Changelog', href: '/changelog' },
                { label: update.title, href: `/changelog/${update.slug}` },
              ]}
            />
            <div className="mt-10 flex flex-wrap items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              <span className="text-tech-light/75">{update.category}</span>
              <span aria-hidden>·</span>
              <time dateTime={update.releasedAt}>Released {formatChangelogDate(update.releasedAt)}</time>
            </div>
            <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">
              {update.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">{update.summary}</p>

            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-5">
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">For</dt>
                <dd className="mt-1 text-sm text-white/65">{update.audience}</dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">Evidence</dt>
                <dd className="mt-1 text-sm text-white/65">{update.proof.length} merged change sets</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="mx-auto grid max-w-4xl gap-14 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1fr_18rem] lg:gap-20">
          <div>
            <section aria-labelledby="what-changed">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-tech-light/65">Release brief</p>
              <h2 id="what-changed" className="mt-3 text-3xl font-semibold tracking-[-0.03em]">What changed</h2>
              <ul className="mt-7 space-y-6">
                {update.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-4 text-base leading-relaxed text-white/70">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-tech-light/70" aria-hidden />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="release-method" className="mt-14 border-t border-white/10 pt-8">
              <h2 id="release-method" className="text-xl font-semibold">Date and evidence method</h2>
              <p className="mt-3 leading-relaxed text-white/50">
                The release date reflects the close of the included delivery window. This backfilled note was published on{' '}
                <time dateTime={update.publishedAt}>{formatChangelogDate(update.publishedAt)}</time>. Pull requests are the source record for scope and merge history.
              </p>
            </section>
          </div>

          <aside aria-labelledby="proof-heading" className="lg:border-l lg:border-white/10 lg:pl-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">Evidence rail</p>
            <h2 id="proof-heading" className="mt-3 text-xl font-semibold">Public receipts</h2>
            <ol className="mt-5 divide-y divide-white/10 border-y border-white/10">
              {update.proof.map((proof, index) => (
                <li key={proof.url}>
                  <a
                    href={proof.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-12 items-start gap-3 py-3 text-sm leading-snug text-white/55 transition-colors hover:text-tech-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tech-light"
                  >
                    <span className="font-mono text-[10px] text-white/25">{String(index + 1).padStart(2, '0')}</span>
                    <span className="flex-1">{proof.label}</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-white/25 transition-colors group-hover:text-tech-light" aria-hidden />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        <footer className="border-t border-white/10">
          <nav aria-label="Changelog pagination" className="mx-auto grid max-w-4xl gap-px bg-white/10 sm:grid-cols-2">
            {newer ? (
              <Link href={`/changelog/${newer.slug}`} className="group bg-void px-5 py-7 sm:px-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-tech-light">
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Newer
                </span>
                <span className="mt-2 block text-sm font-semibold text-white/65 transition-colors group-hover:text-tech-light">{newer.title}</span>
              </Link>
            ) : (
              <Link href="/changelog" className="group bg-void px-5 py-7 sm:px-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-tech-light">
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Archive
                </span>
                <span className="mt-2 block text-sm font-semibold text-white/65 transition-colors group-hover:text-tech-light">All release notes</span>
              </Link>
            )}
            {older && (
              <Link href={`/changelog/${older.slug}`} className="group bg-void px-5 py-7 sm:px-8 sm:text-right focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-tech-light">
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/30 sm:justify-end">
                  Older <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="mt-2 block text-sm font-semibold text-white/65 transition-colors group-hover:text-tech-light">{older.title}</span>
              </Link>
            )}
          </nav>
        </footer>
      </article>
    </main>
  )
}
