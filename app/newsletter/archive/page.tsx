import Link from 'next/link'
import { ArrowLeft, Calendar, Mail, Tag } from 'lucide-react'
import { getAllNewsletters } from '@/lib/newsletters'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Newsletter Archive - The FrankX Letter',
  description: 'Browse all past issues of The FrankX Letter. AI insights, creator tutorials, music creation tips, and the journey from tech-overwhelmed to AI-empowered.',
  path: '/newsletter/archive',
})

export default function NewsletterArchivePage() {
  const newsletters = getAllNewsletters()

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <main className="relative pt-28 pb-24">
        <div className="px-6">
          <div className="mx-auto max-w-4xl">
            {/* Breadcrumb */}
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Newsletter
            </Link>

            {/* Header */}
            <header className="mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 mb-6">
                <Mail className="h-4 w-4 text-violet-400" />
                <span className="text-sm font-medium text-violet-400">Newsletter Archive</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white mb-4">
                The FrankX Letter
              </h1>
              <p className="text-xl text-white/60 max-w-2xl">
                {newsletters.length} issues of AI insights, creator tutorials, and the journey from tech-overwhelmed to AI-empowered.
              </p>
            </header>

            {/* Newsletter List */}
            <div className="space-y-4">
              {newsletters.map((newsletter) => (
                <Link
                  key={newsletter.slug}
                  href={`/newsletter/archive/${newsletter.slug}`}
                  className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-bold text-sm">
                          #{newsletter.issueNumber}
                        </span>
                        <span className="inline-flex items-center gap-2 text-sm text-white/50">
                          <Calendar className="h-4 w-4" />
                          {new Date(newsletter.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <h2 className="text-xl font-semibold text-white group-hover:text-violet-100 transition-colors mb-2">
                        {newsletter.title}
                      </h2>

                      <p className="text-white/60 line-clamp-2 mb-3">
                        {newsletter.excerpt || newsletter.description}
                      </p>

                      {newsletter.tags && newsletter.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {newsletter.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 text-xs text-white/40"
                            >
                              <Tag className="h-3 w-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="hidden sm:block text-white/30 group-hover:text-violet-400 transition-colors">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}

              {newsletters.length === 0 && (
                <div className="text-center py-16 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <Mail className="h-12 w-12 text-white/20 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No issues yet</h3>
                  <p className="text-white/60 mb-6">
                    Subscribe to be notified when the first issue drops.
                  </p>
                  <Link
                    href="/newsletter"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 px-6 py-3 font-semibold text-white hover:from-violet-500 hover:to-pink-500 transition-all"
                  >
                    Subscribe Now
                  </Link>
                </div>
              )}
            </div>

            {/* Subscribe CTA */}
            {newsletters.length > 0 && (
              <div className="mt-16 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 to-pink-900/20 p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Don't miss the next issue
                </h3>
                <p className="text-white/60 mb-6">
                  Get AI insights delivered to your inbox every week.
                </p>
                <Link
                  href="/newsletter"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                  <Mail className="h-5 w-5" />
                  Subscribe to The FrankX Letter
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
