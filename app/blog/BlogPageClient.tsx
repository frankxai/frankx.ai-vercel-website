'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, XCircle, BookOpen, Zap, Users } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import BlogCard from '@/components/blog/BlogCard'
import EmailCaptureForm from '@/components/funnels/EmailCaptureForm'

// ============================================================================
// TYPES
// ============================================================================

interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  tags: string[]
  image?: string
  readingTime: string
  content: string
  featured?: boolean
}

interface BlogPageClientProps {
  posts: BlogPost[]
  categories: string[]
  tags: string[]
}

// ============================================================================
// CONTENT PILLARS
// ============================================================================

const contentPillars = [
  {
    icon: Zap,
    title: 'AI & Intelligence',
    description: 'Enterprise architecture, multi-agent systems, and practical AI that ships.',
    color: 'from-emerald-500/20 to-emerald-500/5',
    iconColor: 'text-emerald-400',
  },
  {
    icon: Sparkles,
    title: 'Creative Systems',
    description: 'Suno music creation, creative workflows, and building in flow state.',
    color: 'from-cyan-500/20 to-cyan-500/5',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Users,
    title: 'Golden Age Vision',
    description: 'The future of creation, intelligence systems, and conscious AI partnership.',
    color: 'from-violet-500/20 to-violet-500/5',
    iconColor: 'text-violet-400',
  },
]

// ============================================================================
// AURORA BACKGROUND
// ============================================================================

function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#030712]" />
      <motion.div
        className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.05) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, -80, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

// ============================================================================
// MAIN CLIENT COMPONENT
// ============================================================================

export default function BlogPageClient({ posts, categories, tags }: BlogPageClientProps) {
  const searchParams = useSearchParams()

  const selectedCategory = searchParams.get('category')?.trim() || undefined
  const selectedTag = searchParams.get('tag')?.trim() || undefined

  const selectedCategoryLower = selectedCategory?.toLowerCase()
  const selectedTagLower = selectedTag?.toLowerCase()

  const filteredPosts = posts.filter((post) => {
    const categoryMatch = selectedCategoryLower ? post.category.toLowerCase() === selectedCategoryLower : true
    const tagMatch = selectedTagLower
      ? post.tags.some((tag) => tag.toLowerCase() === selectedTagLower)
      : true
    return categoryMatch && tagMatch
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)
  const hasActiveFilters = Boolean(selectedCategory || selectedTag)

  const buildFilterHref = (overrides: { category?: string; tag?: string }) => {
    const params = new URLSearchParams()
    const newCategory = 'category' in overrides ? overrides.category : selectedCategory
    const newTag = 'tag' in overrides ? overrides.tag : selectedTag
    if (newCategory) params.set('category', newCategory)
    if (newTag) params.set('tag', newTag)
    const query = params.toString()
    return query ? `/blog?${query}` : '/blog'
  }

  return (
    <main className="relative min-h-screen text-white">
      <AuroraBackground />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              {/* Breadcrumb */}
              <div className="mb-8">
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-emerald-400/60">
                  Creation Chronicles
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                What I'm building.
                <span className="block mt-2 text-white/60">What's working. What isn't.</span>
              </h1>

              {/* Subtext */}
              <p className="text-lg md:text-xl text-white/50 max-w-2xl mb-10 leading-relaxed">
                Weekly insights on building intelligence systems—from enterprise AI architecture to
                creating music with Suno. Honest notes from the studio.
              </p>

              {/* Editorial quote */}
              <motion.blockquote
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative pl-6 border-l-2 border-emerald-400/40 mb-12"
              >
                <p className="text-xl md:text-2xl font-serif-italic text-white/70 leading-relaxed">
                  "Each day we make some. We make something prettier."
                </p>
                <cite className="block mt-2 text-sm text-white/40 not-italic">— My father's philosophy</cite>
              </motion.blockquote>

              {/* Stats row */}
              <div className="flex flex-wrap gap-8 text-center">
                {[
                  { value: posts.length, label: 'Articles' },
                  { value: featuredPosts.length, label: 'Featured' },
                  { value: categories.length, label: 'Topics' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="text-left"
                  >
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-white/40">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Pillars */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contentPillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-6 rounded-2xl border border-white/5 overflow-hidden group hover:border-white/10 transition-colors"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative">
                    <div className="p-3 rounded-xl bg-white/5 w-fit mb-4">
                      <pillar.icon className={`w-5 h-5 ${pillar.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{pillar.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{pillar.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-2">
                    Featured
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Essential reading</h2>
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {featuredPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} featured />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Filters */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">Filter by interest</h3>
                  <p className="text-xs text-white/40">Find articles that match your focus.</p>
                </div>
                {hasActiveFilters && (
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-white/70 border border-white/10 hover:border-white/20 hover:text-white transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Clear filters
                  </Link>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">Categories</p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/blog"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      !selectedCategory
                        ? 'bg-white text-black'
                        : 'bg-white/5 text-white/70 border border-white/10 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    All
                  </Link>
                  {categories.map((category) => {
                    const isActive = selectedCategoryLower === category.toLowerCase()
                    return (
                      <Link
                        key={category}
                        href={buildFilterHref({ category: isActive ? undefined : category })}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30'
                            : 'bg-white/5 text-white/70 border border-white/10 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {category}
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Tags */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 12).map((tag) => {
                    const isActive = selectedTagLower === tag.toLowerCase()
                    return (
                      <Link
                        key={tag}
                        href={buildFilterHref({ tag: isActive ? undefined : tag })}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30'
                            : 'bg-white/5 text-white/50 border border-white/5 hover:border-white/15 hover:text-white/70'
                        }`}
                      >
                        #{tag}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* All Posts */}
        <section id="latest" className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">All articles</h2>
                <p className="text-sm text-white/50">
                  {hasActiveFilters
                    ? `Showing ${filteredPosts.length} article${filteredPosts.length === 1 ? '' : 's'} matching your filters`
                    : 'The complete archive of insights and experiments'}
                </p>
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-white/40 hidden md:block">
                {filteredPosts.length} articles
              </span>
            </div>

            {filteredPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-7 h-7 text-white/30" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No articles match</h3>
                <p className="text-sm text-white/50 mb-6">
                  Try adjusting your filters or browse the full archive.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  View all articles
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {regularPosts.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(i * 0.05, 0.3) }}
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-2xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Join Creation Chronicles
              </h2>
              <p className="text-lg text-white/50">
                Weekly insights on building intelligence systems. What's working,
                what isn't, and what I'm learning along the way.
              </p>
            </motion.div>
            <EmailCaptureForm />
          </div>
        </section>
      </div>
    </main>
  )
}
