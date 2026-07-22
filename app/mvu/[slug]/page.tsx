import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { createMetadata } from '@/lib/seo'
import { getMvuEntries, getMvuEntry } from '@/lib/mvu'
import { MDXContent } from '@/components/blog/MDXContent'

const SITE_URL = 'https://frankx.ai'

export function generateStaticParams() {
  return getMvuEntries().map((entry) => ({ slug: entry.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = getMvuEntry(slug)
  if (!entry) {
    return createMetadata({
      title: 'Not found',
      description: 'This MVU journal entry could not be found.',
      path: `/mvu/${slug}`,
    })
  }

  return createMetadata({
    title: `${entry.title} — MVU journal`,
    description: entry.summary || `${entry.title} — from Frank Riemer’s Mindvalley University journal.`,
    path: `/mvu/${slug}`,
  })
}

function formatDate(date: string): string {
  if (!date) return ''
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function MvuEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = getMvuEntry(slug)
  if (!entry) notFound()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': entry.kind === 'journal' ? 'BlogPosting' : 'Article',
    headline: entry.title,
    description: entry.summary,
    datePublished: entry.date,
    author: { '@type': 'Person', name: 'Frank Riemer', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'FrankX', url: SITE_URL },
    url: `${SITE_URL}/mvu/${entry.slug}`,
    isPartOf: { '@type': 'CollectionPage', name: 'MVU journal', url: `${SITE_URL}/mvu` },
  }

  return (
    <main className="min-h-screen bg-void">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="mx-auto w-full max-w-2xl px-5 py-16 sm:py-24">
        <Link
          href="/mvu"
          className="inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-tech-light"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          MVU journal
        </Link>

        <header className="mt-8">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/40">
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
        </header>

        <div className="prose prose-invert mt-10 max-w-none prose-headings:font-semibold prose-headings:text-white prose-p:text-white/75 prose-a:text-tech-light prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-li:text-white/75">
          <MDXContent source={entry.content} />
        </div>

        <hr className="my-12 border-white/10" />

        <p className="text-sm leading-relaxed text-white/45">
          Independent journal. I attend Mindvalley University as a participant —
          not affiliated with, sponsored by, or endorsed by Mindvalley.{' '}
          <Link
            href="/connect"
            className="text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-tech-light"
          >
            Met me in Tallinn? Stay in touch.
          </Link>
        </p>
      </article>
    </main>
  )
}
