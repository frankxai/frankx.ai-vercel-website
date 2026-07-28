import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { TrackedLink } from '@/components/analytics/TrackedLink'
import { createMetadata, siteConfig } from '@/lib/seo'
import {
  formatJournalDate,
  getAdjacentJournalEntries,
  getJournalEntries,
  getJournalEntry,
  JOURNAL_KIND_LABEL,
} from '@/lib/journal'
import { MDXContent } from '@/components/blog/MDXContent'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

const SITE_URL = siteConfig.url

export function generateStaticParams() {
  return getJournalEntries().map((entry) => ({ slug: entry.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = getJournalEntry(slug)
  if (!entry) {
    return createMetadata({
      title: 'Not found',
      description: 'This journal entry could not be found.',
      path: `/journal/${slug}`,
      noindex: true,
    })
  }

  return createMetadata({
    title: `${entry.title} — FrankX Journal`,
    description: entry.summary || `${entry.title} — a journal entry from Frank Riemer.`,
    path: `/journal/${slug}`,
    type: 'article',
    publishedTime: entry.date || undefined,
    authors: ['Frank Riemer'],
  })
}

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = getJournalEntry(slug)
  if (!entry) notFound()

  const { newer, older } = getAdjacentJournalEntries(slug)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: entry.title,
    description: entry.summary,
    datePublished: entry.date,
    keywords: entry.tags.join(', ') || undefined,
    author: { '@type': 'Person', name: 'Frank Riemer', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'FrankX', url: SITE_URL },
    url: `${SITE_URL}/journal/${entry.slug}`,
    isPartOf: {
      '@type': 'Blog',
      name: 'FrankX Journal',
      url: `${SITE_URL}/journal`,
    },
  }

  return (
    <main className="min-h-screen bg-void">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="mx-auto w-full max-w-2xl px-5 py-16 sm:py-24">
        <Breadcrumbs
          items={[
            { label: 'Journal', href: '/journal' },
            { label: entry.title, href: `/journal/${entry.slug}` },
          ]}
        />

        <header className="mt-8">
          {/* Same mono dateline register as the /journal index, so an entry reads
              as a page out of the same notebook rather than a separate template. */}
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/35">
            <span className="text-tech-light/80">{JOURNAL_KIND_LABEL[entry.kind]}</span>
            <span aria-hidden>·</span>
            <time dateTime={entry.date}>{formatJournalDate(entry.date, 'long')}</time>
            {entry.readingTime && (
              <>
                <span aria-hidden>·</span>
                <span>{entry.readingTime}</span>
              </>
            )}
          </div>
          <h1 className="mt-4 text-balance break-words text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            {entry.title}
          </h1>
          {entry.summary && (
            <p className="mt-4 text-lg leading-relaxed text-white/60">{entry.summary}</p>
          )}
        </header>

        <div className="prose prose-invert mt-10 max-w-none prose-headings:font-semibold prose-headings:text-white prose-p:text-white/75 prose-a:text-tech-light prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-li:text-white/75">
          <MDXContent source={entry.content} />
        </div>

        {entry.tags.length > 0 && (
          <ul className="mt-10 flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <hr className="my-12 border-white/10" />

        {(newer || older) && (
          <nav
            aria-label="More journal entries"
            className="grid gap-4 sm:grid-cols-2"
          >
            {older ? (
              <TrackedLink
                href={`/journal/${older.slug}`}
                eventName="journal_navigation"
                eventProperties={{ destination: 'adjacent_entry', direction: 'older' }}
                className="group rounded-2xl border border-white/10 bg-space p-5 transition-colors hover:border-tech-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/35">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
                  Previous
                </span>
                <span className="mt-2 block text-sm font-semibold text-white transition-colors group-hover:text-tech-light">
                  {older.title}
                </span>
              </TrackedLink>
            ) : (
              <span aria-hidden />
            )}

            {newer && (
              <TrackedLink
                href={`/journal/${newer.slug}`}
                eventName="journal_navigation"
                eventProperties={{ destination: 'adjacent_entry', direction: 'newer' }}
                className="group rounded-2xl border border-white/10 bg-space p-5 text-right transition-colors hover:border-tech-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light sm:col-start-2"
              >
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/35">
                  Next
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="mt-2 block text-sm font-semibold text-white transition-colors group-hover:text-tech-light">
                  {newer.title}
                </span>
              </TrackedLink>
            )}
          </nav>
        )}

        <p className="mt-12 text-sm leading-relaxed text-white/45">
          This is a working note, not a finished argument. The researched, edited version
          of this thinking lives on the{' '}
          <TrackedLink
            href="/blog"
            eventName="journal_navigation"
            eventProperties={{ destination: 'blog_entry_footer' }}
            className="text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-tech-light"
          >
            blog
          </TrackedLink>
          , and the weekly digest goes out through{' '}
          <TrackedLink
            href="/newsletter"
            eventName="journal_navigation"
            eventProperties={{ destination: 'newsletter' }}
            className="text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-tech-light"
          >
            Creation Chronicles
          </TrackedLink>
          .
        </p>
      </article>
    </main>
  )
}
