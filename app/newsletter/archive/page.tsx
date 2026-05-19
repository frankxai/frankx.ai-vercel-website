import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getAllIssues } from '@/lib/newsletter-archive'

const SITE_URL = 'https://frankx.ai'

export const metadata: Metadata = createMetadata({
  title: 'Newsletter archive | AI Architect Newsletter | FrankX',
  description:
    'Past issues of the AI Architect Newsletter — weekly signal from the intersection of AI, architecture, and the creator economy. No drip sequence, no marketing automation.',
  path: '/newsletter/archive',
})

function CollectionJsonLd({ issues }: { issues: ReturnType<typeof getAllIssues> }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Newsletter', item: `${SITE_URL}/newsletter` },
          { '@type': 'ListItem', position: 3, name: 'Archive', item: `${SITE_URL}/newsletter/archive` },
        ],
      },
      {
        '@type': 'CollectionPage',
        name: 'AI Architect Newsletter Archive',
        url: `${SITE_URL}/newsletter/archive`,
      },
      ...(issues.length > 0
        ? [
            {
              '@type': 'ItemList',
              itemListElement: issues.slice(0, 20).map((i, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                url: `${SITE_URL}/newsletter/archive/${i.slug}`,
                name: i.title,
              })),
            },
          ]
        : []),
    ],
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
  )
}

export default function NewsletterArchivePage() {
  const issues = getAllIssues()

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <CollectionJsonLd issues={issues} />

      <section className="relative pt-28 pb-12 px-6 border-b border-white/[0.04]">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.32em] text-zinc-400 hover:text-zinc-200 transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to newsletter
          </Link>

          <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-4">
            AI Architect Newsletter · archive
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight mb-6 leading-tight">
            Past issues.
          </h1>
          <p className="text-lg text-zinc-300 leading-relaxed max-w-2xl">
            Weekly signal from the intersection of AI, architecture, and the creator economy.
            No drip sequence, no marketing automation. One honest message a week.
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="mx-auto max-w-3xl">
          {issues.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-10 text-center">
              <Mail className="mx-auto mb-4 h-10 w-10 text-amber-400/80" />
              <h2 className="text-xl font-semibold text-white mb-3">
                Issue 1 ships Friday, 2026-05-23.
              </h2>
              <p className="text-zinc-400 leading-relaxed max-w-xl mx-auto">
                The first issue lands at 09:00 CEST this Friday. Subscribe below to receive it,
                and every weekly issue after.
              </p>
              <Link
                href="/newsletter"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90 transition-colors"
              >
                Join the waitlist
              </Link>
            </div>
          ) : (
            <ol className="space-y-4">
              {issues.map((issue) => (
                <li key={issue.slug}>
                  <Link
                    href={`/newsletter/archive/${issue.slug}`}
                    className="group block rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 hover:bg-white/[0.03] hover:border-white/[0.12] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <span className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                        {new Date(issue.sentDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                    </div>
                    <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-200 transition-colors">
                      {issue.title}
                    </h2>
                    <p className="text-sm text-zinc-400 leading-relaxed">{issue.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ol>
          )}

          <div className="mt-10 flex items-center justify-between gap-4 pt-6 border-t border-white/[0.06]">
            <Link
              href="/newsletter/feed.xml"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              RSS feed
            </Link>
            <Link
              href="/newsletter"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Subscribe →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
