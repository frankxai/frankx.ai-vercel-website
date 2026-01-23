import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/blog'
import {
  ArrowRight,
  Calendar,
  Clock,
  Sparkles,
  TrendingUp,
  Filter,
} from 'lucide-react'

export const metadata = {
  title: 'Insights | FrankX',
  description: 'AI insights for conscious creators. Practical, hype-free perspectives on using AI to amplify creative work.',
}

// Color mapping for category badges
const categoryColors: Record<string, string> = {
  'AI Strategy': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Music Creation': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'Technical': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Consciousness': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  default: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
}

export default function InsightsPage() {
  const posts = getAllBlogPosts()

  // Group posts by month for timeline display
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-void" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        <div
          className="absolute -left-40 top-40 h-[500px] w-[500px] rounded-full opacity-15 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
          }}
        />
      </div>

      <main className="relative min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-6 flex items-center gap-3 animate-fade-in">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                Weekly Insights
              </span>
            </div>

            <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl animate-fade-in">
              AI Insights for
              <span className="block text-violet-400">Conscious Creators</span>
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-400 animate-fade-in">
              Practical, hype-free perspectives on using AI to amplify your creative work.
              From music production to business strategy.
            </p>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-6 text-sm animate-fade-in">
              <div className="flex items-center gap-2 text-slate-400">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <span>{posts.length} articles</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar className="h-4 w-4 text-violet-400" />
                <span>Updated weekly</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured post */}
        {sortedPosts[0] && (
          <section className="py-8 border-t border-white/5">
            <div className="mx-auto max-w-6xl px-6">
              <Link
                href={`/blog/${sortedPosts[0].slug}`}
                className="group block rounded-2xl border border-violet-500/20 bg-violet-500/5 p-8 transition-all hover:border-violet-500/40 hover:-translate-y-1"
              >
                <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-violet-400 mb-4">
                  <Sparkles className="h-3 w-3" />
                  Latest
                </span>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                  {sortedPosts[0].title}
                </h2>
                <p className="text-slate-400 mb-4 max-w-2xl">
                  {sortedPosts[0].description}
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {sortedPosts[0].readingTime}
                  </span>
                  <span>
                    {new Date(sortedPosts[0].date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* All posts grid */}
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold text-white">All Articles</h2>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Filter className="h-4 w-4" />
                <span>Sorted by date</span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedPosts.slice(1).map((post) => {
                const categoryColor =
                  categoryColors[post.category || ''] || categoryColors.default

                return (
                  <article key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block h-full rounded-xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-white/10 hover:bg-white/[0.04]"
                    >
                      {post.category && (
                        <span
                          className={`inline-block mb-3 px-2 py-0.5 rounded text-xs font-medium border ${categoryColor}`}
                        >
                          {post.category}
                        </span>
                      )}
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readingTime}
                        </span>
                        <span>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </Link>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA to blog */}
        <section className="py-12 border-t border-white/5">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="text-slate-400 mb-6">
              Want more? Visit the full blog for deep dives, tutorials, and case studies.
            </p>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
            >
              View Full Blog
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
