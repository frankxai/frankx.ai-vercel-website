import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles, XCircle } from 'lucide-react'

import { getAllBlogPosts } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { createMetadata } from '@/lib/seo'
import EmailCaptureForm from '@/components/funnels/EmailCaptureForm'

const editorialCadence = [
  {
    title: 'Monday - Creator Systems Lab',
    description: 'Blueprints, workflow breakdowns, and automation rituals to keep your creative practice shipping.'
  },
  {
    title: 'Wednesday - Vibe Sessions',
    description: 'Fresh Suno prompts, sound design experiments, and behind-the-scenes notes from the FrankX studio.'
  },
  {
    title: 'Friday - Creation Chronicles',
    description: 'Stories, mindset riffs, and Golden Age dispatches to refuel your next drop.'
  }
]

const seoSpotlights = [
  {
    title: 'Creator Operating Systems',
    description: 'Case studies and frameworks for designing your own Creator Lab OS.'
  },
  {
    title: 'AI Music Rituals',
    description: 'Session prompts and performance breakdowns from the Vibe OS catalog.'
  },
  {
    title: 'Storyworld Craft',
    description: 'Narrative arcs, launch playbooks, and community moves for modern creators.'
  }
]

export const metadata = createMetadata({
  title: 'FrankX Journal - Creator Intelligence Dispatch',
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

type SearchParams = {
  tag?: string
  category?: string
}

const buildFilterHref = (params: SearchParams, overrides: Partial<SearchParams>) => {
  const merged: SearchParams = { ...params, ...overrides }
  const search = new URLSearchParams()

  if (merged.category) {
    search.set('category', merged.category)
  }

  if (merged.tag) {
    search.set('tag', merged.tag)
  }

  const query = search.toString()
  return query ? `/blog?${query}` : '/blog'
}

export default async function BlogPage({
  searchParams
}: {
  searchParams?: Promise<SearchParams>
}) {
  const resolvedSearchParams = await searchParams || {}
  const allPosts = getAllBlogPosts()
  const categories = Array.from(new Set(allPosts.map((post) => post.category))).sort()
  const tags = Array.from(new Set(allPosts.flatMap((post) => post.tags.map((tag) => tag.trim())))).sort()

  const selectedCategory = resolvedSearchParams.category?.trim() || undefined
  const selectedTag = resolvedSearchParams.tag?.trim() || undefined

  const selectedCategoryLower = selectedCategory?.toLowerCase()
  const selectedTagLower = selectedTag?.toLowerCase()

  const filteredPosts = allPosts.filter((post) => {
    const categoryMatch = selectedCategoryLower ? post.category.toLowerCase() === selectedCategoryLower : true

    const tagMatch = selectedTagLower
      ? post.tags.some((tag) => tag.toLowerCase() === selectedTagLower)
      : true

    return categoryMatch && tagMatch
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)
  const hasActiveFilters = Boolean(selectedCategory || selectedTag)
  const hasRegularPosts = regularPosts.length > 0

  const heroStats = [
    { label: 'Published entries', value: allPosts.length },
    { label: 'Flagship releases', value: allPosts.filter((post) => post.featured).length },
    { label: 'Focus tags', value: tags.length },
  ]

  const categoryChips = [
    { label: 'All', value: undefined as string | undefined },
    ...categories.map((category) => ({ label: category, value: category })),
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />

      <main className="pb-24 pt-28">
        <section className="relative overflow-hidden px-6 pb-24 pt-24">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/15 via-slate-950 to-slate-950" />
            <div className="absolute inset-y-0 right-[-12%] hidden w-[60%] max-w-[760px] items-center justify-center lg:flex">
              <div className="relative aspect-[4/3] w-full max-w-[600px]">
                <div className="absolute -inset-8 rounded-[48px] bg-primary-500/20 blur-3xl" />
                <Image
                  src="/images/blog/blog-hero-aurora.svg"
                  alt="FrankX Journal hero illustration"
                  fill
                  priority
                  className="rounded-[40px] object-cover"
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-14 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                <Sparkles className="h-4 w-4" />
                FrankX Journal
              </span>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
                  Deep practice notes for creators, families, and executives leading the intelligence era.
                </h1>
                <p className="max-w-2xl text-sm text-white/70 md:text-base">
                  The journal curates flagship research, publishing systems, and daily signals from the FrankX Intelligence Atlas. Every entry pairs strategic narrative with execution checklists and agent-ready automations.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {editorialCadence.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:border-white/20 hover:bg-white/10"
                  >
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm text-white/70">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex min-w-[160px] flex-col rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                  >
                    <span className="text-2xl font-semibold text-white">{stat.value}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="#latest"
                  className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-primary-400"
                >
                  Browse latest drops
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:border-white/25 hover:text-white"
                >
                  View resource library
                </Link>
              </div>
            </div>

            <div className="relative block w-full max-w-[520px] lg:hidden">
              <div className="relative aspect-[4/3] w-full">
                <div className="absolute -inset-6 rounded-[48px] bg-primary-500/20 blur-3xl" />
                <Image
                  src="/images/blog/blog-hero-aurora.svg"
                  alt="FrankX Journal hero illustration"
                  fill
                  className="rounded-[40px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {featuredPosts.length > 0 && (
          <section className="px-6 pt-20">
            <div className="mx-auto max-w-7xl space-y-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Featured narratives</p>
                  <h2 className="mt-2 text-3xl font-semibold text-white">Flagship intelligence drops</h2>
                </div>
                <p className="max-w-sm text-sm text-white/60">
                  Multi-chapter releases from the Intelligence Atlas and Agentic Creator OS. Use them to anchor campaigns, partnerships, and onboarding journeys.
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {featuredPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} featured />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.32em] text-white/60">Personalize the feed</h2>
                <p className="mt-2 text-xs text-white/60">
                  Activate category or tag filters to line up the intelligence drops that match your current mission.
                </p>
              </div>
              {hasActiveFilters && (
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
                >
                  <XCircle className="h-4 w-4" aria-hidden="true" />
                  Reset filters
                </Link>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Categories</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {categoryChips.map((chip) => {
                    const isActive = chip.value
                      ? selectedCategoryLower === chip.value.toLowerCase()
                      : !selectedCategory

                    return (
                      <Link
                        key={chip.label}
                        href={buildFilterHref(resolvedSearchParams, {
                          category: chip.value ? chip.value : undefined,
                        })}
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                          isActive
                            ? 'border border-primary-400/60 bg-primary-500/10 text-primary-100'
                            : 'border border-white/15 bg-white/5 text-white/80 hover:border-white/25 hover:bg-white/10'
                        }`}
                      >
                        {chip.label}
                      </Link>
                    )
                  })}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Tags</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => {
                    const isActive = selectedTagLower === tag.toLowerCase()

                    return (
                      <Link
                        key={tag}
                        href={buildFilterHref(resolvedSearchParams, {
                          tag: isActive ? undefined : tag,
                        })}
                        className={`rounded-full border px-4 py-2 text-xs transition ${
                          isActive
                            ? 'border-primary-400/60 bg-primary-500/10 text-primary-100'
                            : 'border-white/15 bg-white/5 text-white/80 hover:border-white/25 hover:bg-white/10'
                        }`}
                      >
                        #{tag}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="latest" className="px-6 pt-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-white">Latest intelligence drops</h2>
                <p className="mt-2 text-sm text-white/70">
                  {hasActiveFilters
                    ? 'Filtered insights mapped to your selected focus areas.'
                    : 'Fresh essays arrive weekly, tuned for depth, action, and signal clarity.'}
                </p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'}
              </span>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/5">
                  <Sparkles className="h-7 w-7 text-primary-200" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">No entries match yet</h3>
                <p className="mt-2 text-sm text-white/70">
                  Adjust your filters or explore the full journal to access every intelligence drop.
                </p>
              </div>
            ) : hasRegularPosts ? (
              <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {regularPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-sm text-white/70">
                All matching entries are featured above. Clear filters or explore other tags for additional posts.
              </div>
            )}
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[2fr,1fr]">
            <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">How the editorial system works</h3>
              <p className="text-sm text-white/70">
                The FrankX intelligence crew programs every publication run like an operations sprint. Each flagship narrative breaks down into daily briefs, automations, and prompts so the journal always reflects current launches.
              </p>
              <ul className="grid gap-4 md:grid-cols-3">
                {seoSpotlights.map((spotlight) => (
                  <li key={spotlight.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">{spotlight.title}</p>
                    <p className="mt-1 text-sm text-white/70 leading-relaxed">{spotlight.description}</p>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-white/70">
                Every editorial layer mirrors the questions creators ask while building their studio, releasing music, and nurturing community.
              </p>
            </div>

            <div className="space-y-4 rounded-3xl border border-white/10 bg-gradient-to-br from-primary-500/15 via-slate-900 to-slate-950 p-6">
              <h3 className="text-lg font-semibold text-white">Daily publishing ritual</h3>
              <p className="text-sm text-white/70">
                Content updates are logged in the Daily Intelligence Operations ritual so you always see what shipped and which experiments run next.
              </p>
              <a
                href="/docs/DAILY_INTELLIGENCE_OPERATIONS.md"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Review the ritual playbook
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-2xl">
            <EmailCaptureForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}



