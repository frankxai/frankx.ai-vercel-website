import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { createMetadata } from '@/lib/seo'
import {
  getAdjacentJournalEntries,
  getJournalEntries,
  getJournalEntry,
} from '@/lib/journal'
import { MDXContent } from '@/components/blog/MDXContent'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

const SITE_URL = 'https://frankx.ai'

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

function formatDate(date: string): string {
  if (!date) return ''
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
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
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-white/40">
            <span className="text-tech-light/80">{entry.kind}</span>
            <span aria-hidden>·</span>
            <time dateTime={entry.date}>{formatDate(entry.date)}</time>
            {entry.readingTime && (
              <>
                <span aria-hidden>·</span>
                <span>{entry.readingTime}</span>
              </>
            )}
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
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
              <Link
                href={`/journal/${older.slug}`}
                className="group rounded-2xl border border-white/10 bg-space p-5 transition-colors hover:border-tech-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/35">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
                  Previous
                </span>
                <span className="mt-2 block text-sm font-semibold text-white transition-colors group-hover:text-tech-light">
                  {older.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden />
            )}

            {newer && (
              <Link
                href={`/journal/${newer.slug}`}
                className="group rounded-2xl border border-white/10 bg-space p-5 text-right transition-colors hover:border-tech-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light sm:col-start-2"
              >
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/35">
                  Next
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="mt-2 block text-sm font-semibold text-white transition-colors group-hover:text-tech-light">
                  {newer.title}
                </span>
              </Link>
            )}
          </nav>
        )}

        <p className="mt-12 text-sm leading-relaxed text-white/45">
          This is a working note, not a finished argument. The researched, edited version
          of this thinking lives on the{' '}
          <Link
            href="/blog"
            className="text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-tech-light"
          >
            blog
          </Link>
          , and the weekly digest goes out through{' '}
          <Link
            href="/newsletter"
            className="text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-tech-light"
          >
            Creation Chronicles
          </Link>
          .
        </p>
      </article>
    </main>
  )
}
