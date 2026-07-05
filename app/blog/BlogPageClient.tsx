'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Filter } from 'lucide-react'

import BlogCard from '@/components/blog/BlogCard'
import CategoryDropdown from '@/components/blog/CategoryDropdown'
import PremiumVisualCarousel from '@/components/blog/PremiumVisualCarousel'
import CollectionRow from '@/components/blog/CollectionRow'
import { HERO_SLUG, EDITORS_PICKS, COLLECTIONS } from '@/lib/blog-curation'

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
  content?: string
  featured?: boolean
}

interface BlogPageClientProps {
  posts: BlogPost[]
  categories: string[]
  tags: string[]
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function BlogPageClient({ posts, categories }: BlogPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Fast slug -> post lookup for all curation resolution
  const bySlug = useMemo(() => {
    const map = new Map<string, BlogPost>()
    for (const p of posts) map.set(p.slug, p)
    return map
  }, [posts])

  const resolve = (slugs: string[]) =>
    slugs.map((s) => bySlug.get(s)).filter((p): p is BlogPost => Boolean(p))

  const getCategoryCount = (category: string) =>
    posts.filter((post) => post.category?.toLowerCase() === category.toLowerCase()).length

  // Curated hero (fallback to latest original post if the pick is unavailable)
  const heroPost =
    bySlug.get(HERO_SLUG) ??
    posts.find((p) => p.category?.toLowerCase() !== 'curated') ??
    null

  const editorsPicks = resolve(EDITORS_PICKS).filter((p) => p.slug !== heroPost?.slug)

  const collections = COLLECTIONS.map((c) => ({
    ...c,
    posts: resolve(c.slugs),
  })).filter((c) => c.posts.length > 0)

  // Latest feed — newest original posts, excluding curated recaps and the hero
  const latestPosts = posts
    .filter((p) => p.category?.toLowerCase() !== 'curated' && p.slug !== heroPost?.slug)
    .slice(0, 9)

  // Category-filtered view
  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category?.toLowerCase() === selectedCategory.toLowerCase())
    : []

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Editorial Hero */}
      <section className="relative pt-28 pb-10 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[128px]" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[128px]" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)' }} />
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Axi — blog mascot accent */}
          <div className="pointer-events-none absolute -right-4 top-0 hidden w-44 opacity-12 lg:block xl:w-52">
            <Image
              src="/images/mascot/mascot-v06-prowling-action.png"
              alt=""
              width={208}
              height={208}
              className="object-contain"
              aria-hidden="true"
            />
          </div>

          {/* Blog Identity Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image src="/images/mascot/mascot-v25-crystal-familiar.png" alt="Axi" width={40} height={40} className="rounded-xl" sizes="40px" style={{ boxShadow: '0 0 16px -4px rgba(139,92,246,0.3)' }} />
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-medium text-emerald-400">Creation Chronicles</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight text-balance">
                Field notes on building intelligence.
              </h1>
              <p className="mt-3 text-base text-white/50 max-w-xl text-pretty">
                Deep dives on agentic AI, frontier models, and the tools and mindset behind an independent creator business.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-5 text-sm text-white/40">
              <span><span className="font-semibold text-white">{posts.length}</span> articles</span>
              <span><span className="font-semibold text-white">{collections.length}</span> pillars</span>
            </div>
          </motion.div>

          {/* Featured hero article */}
          {heroPost && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6 }}
            >
              <Link href={`/blog/${heroPost.slug}`} className="group block">
                <div className="relative rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/[0.05]">
                  {heroPost.image ? (
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[300px] overflow-hidden p-1">
                        <Image
                          src={heroPost.image || "/placeholder.svg"}
                          alt={heroPost.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 text-[11px] font-semibold text-amber-300 border border-amber-400/20">
                            <Sparkles className="w-3 h-3" /> Start Here
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[11px] font-medium text-emerald-400">{heroPost.category}</span>
                          <span className="text-xs text-white/30">{heroPost.readingTime}</span>
                        </div>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 tracking-tight leading-tight text-balance">
                          {heroPost.title}
                        </h2>
                        <p className="text-sm text-white/50 leading-relaxed line-clamp-3">
                          {heroPost.description}
                        </p>
                        <div className="mt-6 flex items-center gap-2 text-emerald-400 text-sm font-medium">
                          Read article
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 md:p-10">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[11px] font-medium text-emerald-400">{heroPost.category}</span>
                        <span className="text-xs text-white/30">{heroPost.readingTime}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight leading-tight">
                        {heroPost.title}
                      </h2>
                      <p className="text-base text-white/50 max-w-2xl leading-relaxed">
                        {heroPost.description}
                      </p>
                      <div className="mt-6 flex items-center gap-2 text-emerald-400 text-sm font-medium">
                        Read article
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Editor's Picks rail */}
      <div className="max-w-6xl mx-auto px-6">
        <PremiumVisualCarousel
          items={editorsPicks.map((p) => ({
            slug: p.slug,
            title: p.title,
            image: p.image,
            category: p.category,
            readingTime: p.readingTime,
          }))}
        />
      </div>

      {/* Category Dropdown & Filter Section */}
      <section className="pb-8 px-6 sticky top-20 z-40 bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between py-4">
            <CategoryDropdown
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              totalPosts={posts.length}
              getCategoryCount={getCategoryCount}
            />

            <div className="hidden md:flex items-center gap-2 border-l border-white/10 pl-4 ml-4">
              <span className="text-xs font-medium text-white/40 uppercase tracking-wider">Frameworks:</span>
              <Link
                href="/youtube"
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 hover:bg-white/10 transition-colors flex items-center gap-1.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Video Intelligence
              </Link>
              <Link
                href="/opus-pro"
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 hover:bg-white/10 transition-colors flex items-center gap-1.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Short-Form Nexus
              </Link>
            </div>

            {selectedCategory && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden md:flex items-center gap-3"
              >
                <span className="text-sm text-white/40">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ================= DEFAULT VIEW: curated pillars + latest ================= */}
      {!selectedCategory ? (
        <>
          {/* Pillar Collections */}
          <section className="px-6">
            <div className="max-w-6xl mx-auto divide-y divide-white/5">
              {collections.map((c) => (
                <CollectionRow
                  key={c.id}
                  eyebrow={c.eyebrow}
                  title={c.title}
                  subtitle={c.subtitle}
                  posts={c.posts.map((p) => ({
                    slug: p.slug,
                    title: p.title,
                    description: p.description,
                    category: p.category,
                    readingTime: p.readingTime,
                    image: p.image,
                  }))}
                />
              ))}
            </div>
          </section>

          {/* Latest Articles */}
          <section className="py-12 px-6 pb-24">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-2 mb-8">
                <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">Latest Articles</h2>
                <span className="text-xs text-white/30">• fresh from the desk</span>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {latestPosts.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: Math.min(i * 0.08, 0.3), type: 'spring', stiffness: 100 }}
                  >
                    <BlogCard post={post as never} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        /* ================= FILTERED VIEW: single category grid ================= */
        <section className="py-12 px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">{selectedCategory}</h2>
              <span className="text-xs text-white/30">
                • {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
              </span>
            </div>

            {filteredPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-20 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6">
                  <Filter className="w-6 h-6 text-white/30" />
                </div>
                <p className="text-white/50 mb-4 text-lg">No articles found in this category.</p>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-emerald-400 hover:text-emerald-300 text-sm font-medium inline-flex items-center gap-2 group"
                >
                  View all articles
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: Math.min(i * 0.08, 0.3), type: 'spring', stiffness: 100 }}
                  >
                    <BlogCard post={post as never} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400">Weekly Insights</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Join Creation Chronicles
          </h2>
          <p className="text-white/50 mb-8">
            Get weekly insights on AI, creativity, and building in public.
          </p>
          <Link
            href="/newsletter"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl hover:shadow-emerald-500/30"
          >
            Start Here
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  )
}
