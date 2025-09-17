import Image from 'next/image'
import { Filter, Sparkles } from 'lucide-react'

import { getAllBlogPosts } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { createMetadata } from '@/lib/seo'

const editorialCadence = [
  {
    title: 'Monday – Signal Scan',
    description: 'Enterprise intelligence briefings from Oracle corridors, with distilled talking points you can borrow the same day.',
  },
  {
    title: 'Wednesday – Creative Lab',
    description: 'Suno-powered music systems, voice design experiments, and rituals for staying in flow as automation scales.',
  },
  {
    title: 'Friday – Community Dispatch',
    description: 'Case studies, family workshops, and playbooks for the people building with you – executives, creatives, and kin.',
  },
]

const seoSpotlights = [
  {
    title: 'Conscious AI Strategy',
    description: 'How to architect soul-aligned intelligence in the enterprise without losing velocity or trust.',
  },
  {
    title: 'Creative Frequency',
    description: 'Frameworks for amplifying your voice with AI, from studio rituals to shipping music with Suno.',
  },
  {
    title: 'Family & Society',
    description: 'Guides that translate complex AI shifts for families, classrooms, and the circles you protect.',
  },
]

export const metadata = createMetadata({
  title: 'FrankX Journal – Conscious AI & Creative Intelligence',
  description:
    'Explore the FrankX Journal for long-form insights on conscious AI architecture, Suno-powered creativity, and intelligence rituals for families, founders, and executives.',
  keywords: [
    'conscious ai blog',
    'ai music insights',
    'oracle ai architecture',
    'soul frequency content',
    'intelligence economy analysis',
  ],
  path: '/blog',
})

export default function BlogPage() {
  const posts = getAllBlogPosts()
  const featuredPosts = posts.filter((post) => post.featured)
  const regularPosts = posts.filter((post) => !post.featured)
  const categories = Array.from(new Set(posts.map((post) => post.category)))

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />

      <main className="pt-28 pb-20">
        <header className="relative overflow-hidden px-6 pb-20">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-slate-900 to-slate-950" />
            <div className="absolute inset-x-0 -bottom-40 h-96 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_60%)]" />
          </div>
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                <Sparkles className="h-4 w-4" />
                FrankX Journal
              </span>
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
                Deep practice notes for creators, families, and executives leading the intelligence era.
              </h1>
              <p className="max-w-2xl text-lg text-white/80">
                Every article is engineered for depth and immediate application. Expect strategic briefings, creative playbooks, and rituals that keep your humanity at the center of advanced AI workflows.
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-white/60">
                {categories.map((category) => (
                  <span key={category} className="rounded-full border border-white/15 bg-white/5 px-4 py-2">
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative flex-1 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(148,163,184,0.25),transparent_65%)]" aria-hidden />
              <div className="relative flex flex-col gap-4">
                <div className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">Editorial Rhythm</div>
                <Image
                  src="/images/blog/intelligence-revolution-hero.svg"
                  alt="FrankX editorial hero"
                  width={720}
                  height={480}
                  className="h-40 w-full rounded-2xl border border-white/10 object-cover"
                  priority
                />
                <ul className="space-y-4">
                  {editorialCadence.map((item) => (
                    <li key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-white/70 leading-relaxed">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </header>

        <section className="px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[1fr,0.6fr]">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Featured intelligence</h2>
                    <p className="mt-2 text-sm text-white/70">
                      Start with the flagship essays that anchor the FrankX intelligence system.
                    </p>
                  </div>
                  <span className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                    {featuredPosts.length} spotlight{featuredPosts.length === 1 ? '' : 's'}
                  </span>
                </div>
                {featuredPosts.length === 0 ? (
                  <p className="mt-8 text-white/70">Featured essays are being produced for you.</p>
                ) : (
                  <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    {featuredPosts.map((post, index) => (
                      <BlogCard
                        key={post.slug}
                        post={post}
                        featured={index === 0}
                        className={index === 0 ? 'lg:col-span-2' : ''}
                      />
                    ))}
                  </div>
                )}
              </div>

              <aside className="space-y-6">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">SEO Studio Notes</h3>
                    <Filter className="h-4 w-4 text-white/60" />
                  </div>
                  <p className="mt-2 text-sm text-white/70">
                    Every narrative is mapped to the search behavior of creative technologists, Oracle leaders, and families.
                  </p>
                  <ul className="mt-5 space-y-4 text-sm text-white/70">
                    {seoSpotlights.map((spotlight) => (
                      <li key={spotlight.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-sm font-semibold text-white">{spotlight.title}</p>
                        <p className="mt-1 text-sm text-white/70 leading-relaxed">{spotlight.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary-500/15 via-slate-900 to-slate-950 p-6">
                  <h3 className="text-lg font-semibold text-white">Daily publishing ritual</h3>
                  <p className="mt-2 text-sm text-white/70">
                    Content updates are logged in the Daily Intelligence Ritual so you know exactly what is shipping and when.
                  </p>
                  <a
                    href="/docs/DAILY_INTELLIGENCE_OPERATIONS.md"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
                  >
                    Review the ritual playbook
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-white">Latest intelligence drops</h2>
                <p className="mt-2 text-sm text-white/70">
                  Fresh essays arrive weekly – tuned for depth, action, and signal clarity.
                </p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                {posts.length} article{posts.length === 1 ? '' : 's'}
              </span>
            </div>

            {posts.length === 0 ? (
              <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/5">
                  <Sparkles className="h-7 w-7 text-primary-200" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">New stories are composing</h3>
                <p className="mt-2 text-sm text-white/70">
                  The editorial studio is sequencing the next wave of intelligence. Check back soon or subscribe to the dispatch.
                </p>
              </div>
            ) : (
              <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {regularPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
