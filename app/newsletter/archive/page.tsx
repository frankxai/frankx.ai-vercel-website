import Link from 'next/link'
import { Calendar, ArrowRight, FileText } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getAllIssues, getPublishedIssues } from '@/lib/newsletter-issues'
import JsonLd from '@/components/seo/JsonLd'

export const metadata = createMetadata({
  title: 'Newsletter Archive | FrankX',
  description:
    'Every issue of the FrankX weekly newsletter. The 6-layer operating loop, ship-shipped-shipping receipts, and one actionable thing each Friday.',
  path: '/newsletter/archive',
})

const collectionSchema = {
  '@type': 'CollectionPage',
  name: 'FrankX Newsletter Archive',
  description:
    'Weekly issues from the FrankX newsletter — operating loops, shipped systems, and the one thing worth doing this week.',
  url: 'https://frankx.ai/newsletter/archive',
}

function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function NewsletterArchivePage() {
  const allIssues = getAllIssues()
  const publishedIssues = getPublishedIssues()
  const upcomingIssues = allIssues.filter(
    (i) => i.status === 'draft' || i.status === 'staged' || i.status === 'scheduled'
  )

  const itemListSchema = {
    '@type': 'ItemList',
    itemListElement: publishedIssues.map((issue, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `https://frankx.ai/newsletter/archive/${issue.slug}`,
      name: issue.subject,
    })),
  }

  return (
    <main className="relative min-h-screen bg-[#0a0a0b]">
      <JsonLd data={collectionSchema} />
      {publishedIssues.length > 0 && <JsonLd data={itemListSchema} />}

      {/* Header */}
      <section className="relative border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-14">
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-6"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Subscribe to the newsletter
          </Link>

          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            The Archive
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
            Every Friday: one spotlight, two receipts, one toolkit. Below is every issue that
            shipped, in reverse order.
          </p>
        </div>
      </section>

      {/* Upcoming / draft callout */}
      {upcomingIssues.length > 0 && (
        <section className="border-b border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-6 py-10">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400 mb-4">
              Next up
            </h2>
            <div className="space-y-3">
              {upcomingIssues.map((issue) => (
                <div
                  key={issue.slug}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-white/40">
                      Issue {issue.issue}
                    </span>
                    {issue.date && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(issue.date)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{issue.subject}</h3>
                  {issue.preview && (
                    <p className="text-sm text-white/50 leading-relaxed">{issue.preview}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Published issues */}
      <section>
        <div className="max-w-4xl mx-auto px-6 py-14">
          {publishedIssues.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-10 text-center">
              <FileText className="w-10 h-10 text-white/20 mx-auto mb-4" />
              <p className="text-white/60 mb-2">No issues archived yet.</p>
              <p className="text-sm text-white/40">
                The first issue ships Friday May 22, 2026. Subscribe to be there when it lands.
              </p>
              <Link
                href="/newsletter"
                className="inline-flex items-center gap-2 mt-6 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Go to newsletter
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {publishedIssues.map((issue) => (
                <Link
                  key={issue.slug}
                  href={`/newsletter/archive/${issue.slug}`}
                  className="group block rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] p-6 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono text-white/40">Issue {issue.issue}</span>
                    {issue.date && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(issue.date)}
                      </span>
                    )}
                    {issue.readingTime && (
                      <span className="text-xs text-white/30">{issue.readingTime}</span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {issue.subject}
                  </h3>
                  {issue.preview && (
                    <p className="text-sm md:text-base text-white/50 leading-relaxed">
                      {issue.preview}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA back to subscribe */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            One operating loop. Delivered every Friday.
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Subscribe to get next week&apos;s issue. No spam. No filler. Unsubscribe in one click.
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
