import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { createMetadata } from '@/lib/seo'
import { getMvuEntries, getMvuEntry } from '@/lib/mvu'
import { MVU_LAYER_META } from '@/lib/mvu-display'
import { serializeJsonLd } from '@/lib/structured-data'
import { MDXContent } from '@/components/blog/MDXContent'

const SITE_URL = 'https://www.frankx.ai'

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

  const collectionLabel = MVU_LAYER_META[entry.layer].collectionLabel

  return createMetadata({
    title: `${entry.title} — ${collectionLabel}`,
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
    '@type': entry.layer === 'frank-note' ? 'BlogPosting' : 'Article',
    headline: entry.title,
    description: entry.summary,
    datePublished: entry.date,
    author: { '@type': 'Person', name: 'Frank Riemer', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'FrankX', url: SITE_URL },
    url: `${SITE_URL}/mvu/${entry.slug}`,
    isPartOf: { '@type': 'CollectionPage', name: 'MVU field atlas', url: `${SITE_URL}/mvu` },
  }

  const layer = MVU_LAYER_META[entry.layer]

  return (
    <main className="relative min-h-screen overflow-hidden bg-void">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.08),transparent_62%)]"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
      />

      <article className="relative mx-auto w-full max-w-3xl px-5 py-16 sm:px-6 sm:py-24">
        <Link
          href="/mvu"
          className="inline-flex min-h-11 items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-tech-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          MVU field atlas
        </Link>

        <header className="mt-10 border-b border-white/10 pb-10 sm:pb-12">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-white/40">
            <span className={layer.accent}>{entry.session || layer.label}</span>
            <span aria-hidden>·</span>
            <time dateTime={entry.date}>{formatDate(entry.date)}</time>
            {entry.readingTime && (
              <>
                <span aria-hidden>·</span>
                <span>{entry.readingTime}</span>
              </>
            )}
          </div>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.06] tracking-[-0.04em] text-white sm:text-5xl">
            {entry.title}
          </h1>
          {entry.summary && (
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/58">{entry.summary}</p>
          )}
        </header>

        <aside className={`mt-8 rounded-2xl border p-5 sm:p-6 ${layer.panel}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${layer.accent}`}>
            {layer.label}
          </p>
          <p className="mt-3 text-sm leading-6 text-white/58">
            {entry.provenance || layer.description}
          </p>
        </aside>

        <div className="prose prose-lg prose-invert mt-12 max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white prose-p:leading-8 prose-p:text-white/72 prose-a:text-tech-light prose-a:no-underline hover:prose-a:underline prose-blockquote:border-amber-200/40 prose-blockquote:text-amber-50 prose-strong:text-white prose-li:text-white/72">
          <MDXContent source={entry.content} />
        </div>

        <hr className="my-12 border-white/10" />

        <p className="text-sm leading-relaxed text-white/45">
          Independent participant record. Not affiliated with, sponsored by, or
          endorsed by Mindvalley.{' '}
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
