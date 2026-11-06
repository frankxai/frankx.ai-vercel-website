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
import { JOURNAL_HUBS } from '@/lib/journal-policy'
import { getAllBlogPostSummaries } from '@/lib/blog'

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

  const metadata = createMetadata({
    title: `${entry.title} — FrankX Journal`,
    description: entry.summary || `${entry.title} — a journal entry from Frank Riemer.`,
    path: `/journal/${slug}`,
    type: 'article',
    publishedTime: entry.date || undefined,
    authors: ['Frank Riemer'],
  })
  return {
    ...metadata,
    authors: [{ name: 'Frank Riemer', url: `${SITE_URL}/about` }],
    alternates: {
      ...metadata.alternates,
      types: { 'application/rss+xml': `${SITE_URL}/journal/feed.xml` },
    },
  }
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
  const related = entry.relatedArticles.length
    ? getAllBlogPostSummaries().filter((post) => entry.relatedArticles.includes(post.slug)).slice(0, 3)
    : []

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
    mainEntityOfPage: `${SITE_URL}/journal/${entry.slug}`,
    articleSection: 'Founder journal',
    isPartOf: {
      '@type': 'Blog',
      name: 'FrankX Journal',
      url: `${SITE_URL}/journal`,
    },
  }

  return (
    <main id="main" className="min-h-screen bg-void text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }}
      />

      <article className="mx-auto w-full max-w-2xl px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <Breadcrumbs
          items={[
            { label: 'Journal', href: '/journal' },
            { label: entry.title, href: `/journal/${entry.slug}` },
          ]}
        />

        <header className="mt-8">
          {/* Same mono dateline register as the /journal index, so an entry reads
              as a page out of the same notebook rather than a separate template. */}
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-white/65">
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
          <p className="mt-5 text-sm text-white/65">By Frank Riemer</p>
        </header>

        <div className="prose prose-invert mt-10 max-w-none break-words text-base leading-[1.8] sm:text-lg prose-headings:font-semibold prose-headings:text-white prose-p:text-white/75 prose-a:text-tech-light prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-li:text-white/75">
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

        {(entry.topicHubs.length > 0 || related.length > 0) && (
          <aside aria-label="Continue exploring" className="mt-12 border-y border-white/10 py-7">
            <h2 className="text-sm font-medium text-white/80">Continue exploring</h2>
            <ul className="mt-3 space-y-1">
              {entry.topicHubs.map((key) => (
                <li key={key}>
                  <TrackedLink href={JOURNAL_HUBS[key].href} eventName="journal_navigation"
                    eventProperties={{ destination: 'topic_hub', topic: key }}
                    className="inline-flex min-h-11 items-center text-sm text-tech-light underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-tech-light">
                    {JOURNAL_HUBS[key].title}
                  </TrackedLink>
                </li>
              ))}
              {related.map((post) => (
                <li key={post.slug}>
                  <TrackedLink href={`/blog/${post.slug}`} eventName="journal_navigation"
                    eventProperties={{ destination: 'related_article' }}
                    className="inline-flex min-h-11 items-center text-sm text-tech-light underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-tech-light">
                    {post.title}
                  </TrackedLink>
                </li>
              ))}
            </ul>
          </aside>
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

        <p className="mt-12 text-sm leading-relaxed text-white/65">
          This is a personal working note. For researched articles, read the{' '}
          <TrackedLink
            href="/blog"
            eventName="journal_navigation"
            eventProperties={{ destination: 'blog_entry_footer' }}
            className="text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-tech-light"
          >
            blog
          </TrackedLink>
          . More from the studio appears in{' '}
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
