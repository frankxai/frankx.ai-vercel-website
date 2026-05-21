import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react'
import { MDXContent } from '@/components/blog/MDXContent'
import { createMetadata } from '@/lib/seo'
import { getAllIssues, getIssue, getPublishedIssues } from '@/lib/newsletter-issues'
import JsonLd from '@/components/seo/JsonLd'

export const dynamicParams = false

export async function generateStaticParams() {
  // Pre-render all issues (drafts + sent) so previews work + sent issues are static
  const issues = getAllIssues()
  return issues.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const issue = getIssue(slug)

  if (!issue) {
    return createMetadata({
      title: 'Issue Not Found | FrankX Newsletter',
      description: 'The requested newsletter issue could not be located.',
      path: `/newsletter/archive/${slug}`,
    })
  }

  return createMetadata({
    title: `${issue.subject} | FrankX Newsletter`,
    description: issue.preview,
    path: `/newsletter/archive/${issue.slug}`,
    type: 'article',
    publishedTime: issue.date,
    authors: [issue.author || 'Frank Riemer'],
    // Drafts should not be indexed
    noindex: issue.status === 'draft' || issue.status === 'staged' || issue.status === 'scheduled',
  })
}

function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function NewsletterIssuePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const issue = getIssue(slug)

  if (!issue) {
    notFound()
  }

  // Compute prev/next in published-only sequence so navigation never surfaces drafts
  const sequence = issue.status === 'sent' || issue.status === 'archived'
    ? getPublishedIssues()
    : getAllIssues()
  const idx = sequence.findIndex((i) => i.slug === issue.slug)
  const prev = idx >= 0 && idx < sequence.length - 1 ? sequence[idx + 1] : null
  const next = idx > 0 ? sequence[idx - 1] : null

  const articleSchema = {
    '@type': 'Article',
    headline: issue.subject,
    description: issue.preview,
    datePublished: issue.date,
    author: { '@type': 'Person', name: issue.author || 'Frank Riemer' },
    publisher: { '@type': 'Organization', name: 'FrankX', url: 'https://frankx.ai' },
    mainEntityOfPage: `https://frankx.ai/newsletter/archive/${issue.slug}`,
  }

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
      { '@type': 'ListItem', position: 2, name: 'Newsletter', item: 'https://frankx.ai/newsletter' },
      { '@type': 'ListItem', position: 3, name: 'Archive', item: 'https://frankx.ai/newsletter/archive' },
      { '@type': 'ListItem', position: 4, name: `Issue ${issue.issue}`, item: `https://frankx.ai/newsletter/archive/${issue.slug}` },
    ],
  }

  const isDraft = issue.status === 'draft' || issue.status === 'staged' || issue.status === 'scheduled'

  return (
    <main className="relative min-h-screen bg-[#0a0a0b]">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Header */}
      <section className="relative border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 pt-24 pb-12">
          <Link
            href="/newsletter/archive"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All issues
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-mono text-white/40">Issue {issue.issue}</span>
            {issue.date && (
              <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(issue.date)}
              </span>
            )}
            {issue.readingTime && (
              <span className="inline-flex items-center gap-1.5 text-xs text-white/30">
                <Clock className="w-3.5 h-3.5" />
                {issue.readingTime}
              </span>
            )}
            {isDraft && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-300">
                {issue.status}
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-5 leading-[1.1]">
            {issue.subject.replace(/^Issue \d+:\s*/, '')}
          </h1>
          {issue.preview && (
            <p className="text-lg md:text-xl text-white/60 leading-relaxed">{issue.preview}</p>
          )}
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 py-14">
        <div className="prose prose-invert prose-emerald max-w-none">
          <MDXContent source={issue.content} />
        </div>
      </article>

      {/* Prev / Next nav */}
      {(prev || next) && (
        <nav className="border-t border-white/[0.06]">
          <div className="max-w-3xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/newsletter/archive/${prev.slug}`}
                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] p-5 transition-all"
              >
                <div className="text-xs text-white/40 mb-2">← Previous issue</div>
                <div className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                  {prev.subject}
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/newsletter/archive/${next.slug}`}
                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] p-5 transition-all text-right"
              >
                <div className="text-xs text-white/40 mb-2">Next issue →</div>
                <div className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                  {next.subject}
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      )}

      {/* Footer CTA */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Want Issue {issue.issue + 1} in your inbox?
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Next Friday. One spotlight, two receipts, one toolkit. Subscribe below.
          </p>
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-14 font-medium shadow-lg shadow-emerald-500/20 transition-all"
          >
            Subscribe to the Newsletter
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
