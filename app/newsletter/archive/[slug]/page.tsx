import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getAllIssueSlugs, getIssue } from '@/lib/newsletter-archive'

const SITE_URL = 'https://frankx.ai'

export function generateStaticParams() {
  return getAllIssueSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const issue = getIssue(slug)
  if (!issue) return {}

  return createMetadata({
    title: issue.title,
    description: issue.excerpt,
    path: `/newsletter/archive/${slug}`,
  })
}

function ArticleJsonLd({ issue }: { issue: NonNullable<ReturnType<typeof getIssue>> }) {
  const url = `${SITE_URL}/newsletter/archive/${issue.slug}`
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Newsletter', item: `${SITE_URL}/newsletter` },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Archive',
            item: `${SITE_URL}/newsletter/archive`,
          },
          { '@type': 'ListItem', position: 4, name: issue.title, item: url },
        ],
      },
      {
        '@type': 'Article',
        headline: issue.title,
        description: issue.excerpt,
        datePublished: issue.sentDate,
        dateModified: issue.sentDate,
        url,
        author: {
          '@type': 'Person',
          name: 'Frank Riemer',
          url: SITE_URL,
          jobTitle: 'AI Architect',
        },
        publisher: {
          '@type': 'Organization',
          name: 'FrankX',
          url: SITE_URL,
        },
      },
    ],
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
  )
}

// Minimal markdown renderer (headings, paragraphs, lists, links, code).
// Keeps deps zero; for richer rendering we can swap to react-markdown later.
function renderMarkdown(md: string): string {
  // Escape HTML first
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Code blocks (```...```)
  html = html.replace(/```([\s\S]*?)```/g, '<pre class="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-sm text-zinc-300 overflow-x-auto my-4"><code>$1</code></pre>')

  // Headings
  html = html
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-white mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-semibold text-white mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-semibold text-white mt-12 mb-5">$1</h1>')

  // Bold + italic
  html = html
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-violet-300 underline underline-offset-4 hover:text-violet-200">$1</a>',
  )

  // Inline code (after links so we don't break link text)
  html = html.replace(/`([^`]+)`/g, '<code class="rounded bg-white/[0.05] px-1.5 py-0.5 text-sm text-amber-200">$1</code>')

  // Lists (simple — bullet + numbered)
  html = html.replace(/^- (.+)$/gm, '<li class="ml-6 list-disc text-zinc-300 leading-relaxed">$1</li>')
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-6 list-decimal text-zinc-300 leading-relaxed">$1</li>')

  // Wrap consecutive <li> in <ul>
  html = html.replace(/(<li class="ml-6 list-disc[^"]*">.*?<\/li>(?:\s*<li class="ml-6 list-disc[^"]*">.*?<\/li>)*)/gs, '<ul class="my-4 space-y-1">$1</ul>')
  html = html.replace(/(<li class="ml-6 list-decimal[^"]*">.*?<\/li>(?:\s*<li class="ml-6 list-decimal[^"]*">.*?<\/li>)*)/gs, '<ol class="my-4 space-y-1">$1</ol>')

  // Paragraphs — wrap remaining lines (with blank-line separators)
  html = html
    .split(/\n\n+/)
    .map((block) => {
      const t = block.trim()
      if (!t) return ''
      if (t.startsWith('<')) return t
      return `<p class="text-zinc-300 leading-relaxed my-4">${t.replace(/\n/g, '<br />')}</p>`
    })
    .join('\n')

  return html
}

export default async function NewsletterIssuePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const issue = getIssue(slug)
  if (!issue) notFound()

  const html = renderMarkdown(issue.body)

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <ArticleJsonLd issue={issue} />

      <article className="pt-28 pb-16 px-6">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/newsletter/archive"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.32em] text-zinc-400 hover:text-zinc-200 transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All issues
          </Link>

          <header className="mb-10 border-b border-white/[0.06] pb-8">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500 mb-3">
              {new Date(issue.sentDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
              · AI Architect Newsletter
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-tight">
              {issue.title}
            </h1>
            {issue.preheader && (
              <p className="mt-4 text-lg text-zinc-300 leading-relaxed">{issue.preheader}</p>
            )}
          </header>

          <div
            className="prose-newsletter"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <footer className="mt-16 border-t border-white/[0.06] pt-8">
            <div className="rounded-2xl border border-amber-500/[0.16] bg-amber-500/[0.04] p-6 text-center">
              <p className="text-sm uppercase tracking-[0.24em] text-amber-200 mb-2">
                Get the next one
              </p>
              <h2 className="text-xl font-semibold text-white mb-3">
                Subscribe to AI Architect Newsletter
              </h2>
              <p className="text-sm text-zinc-300 mb-4 max-w-md mx-auto leading-relaxed">
                Weekly signal. No drip sequence. One honest message when there&apos;s something
                real to share.
              </p>
              <Link
                href="/newsletter"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90 transition-colors"
              >
                Join the waitlist
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </div>
  )
}
