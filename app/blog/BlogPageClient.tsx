'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Filter } from 'lucide-react'

import BlogCard from '@/components/blog/BlogCard'
import CategoryDropdown from '@/components/blog/CategoryDropdown'
import { cn } from '@/lib/utils'

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
  flagship?: boolean
  flagshipOrder?: number
}

interface BlogPageClientProps {
  posts: BlogPost[]
  flagshipPosts?: BlogPost[]
  categories: string[]
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function BlogPageClient({ posts, flagshipPosts = [], categories }: BlogPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const getCategoryCount = (category: string) => {
    return posts.filter((post) => post.category?.toLowerCase() === category.toLowerCase()).length
  }

  // Flagship showcase only appears on the unfiltered view.
  const showFlagship = !selectedCategory && flagshipPosts.length > 0
  const leadFlagship = showFlagship ? flagshipPosts[0] : null
  const secondaryFlagships = showFlagship ? flagshipPosts.slice(1, 5) : []
  const flagshipSlugs = new Set(flagshipPosts.map((p) => p.slug))

  // Everything else, newest first (curated/recap content excluded from the grid).
  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category?.toLowerCase() === selectedCategory.toLowerCase())
    : posts.filter(
        (post) => post.category?.toLowerCase() !== 'curated' && !flagshipSlugs.has(post.slug)
      )

  const regularPosts = filteredPosts

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
              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                Inside the build.
              </h1>
              <p className="mt-2 text-base text-white/40">
                AI systems, creative workflows, and what&apos;s actually shipping.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-5 text-sm text-white/40">
              <span><span className="font-semibold text-white">{posts.length}</span> articles</span>
              <span><span className="font-semibold text-white">{categories.length}</span> topics</span>
            </div>
          </motion.div>

          {/* Flagship Lead — the single most important read, full cinematic hero */}
          {leadFlagship && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6 }}
            >
              <div className="mb-5 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-amber-300/80">Flagship</span>
                <span className="text-xs text-white/30">— the essential reads</span>
              </div>
              <Link href={`/blog/${leadFlagship.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-3xl border border-amber-500/15 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-amber-400/40 hover:bg-white/[0.05]">
                  <div className="grid gap-0 md:grid-cols-2">
                    <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[340px]">
                      {leadFlagship.image ? (
                        <Image
                          src={leadFlagship.image}
                          alt={leadFlagship.title}
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-purple-500/10 to-emerald-500/10" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent md:bg-gradient-to-r" />
                      <div className="absolute left-4 top-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-200 backdrop-blur-sm">
                          <Sparkles className="h-3 w-3" /> Flagship
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center p-6 md:p-9">
                      <div className="mb-4 flex items-center gap-3">
                        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">{leadFlagship.category}</span>
                        <span className="text-xs text-white/30">{leadFlagship.readingTime}</span>
                      </div>
                      <h2 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
                        {leadFlagship.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-white/55 line-clamp-3 md:text-base">
                        {leadFlagship.description}
                      </p>
                      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-amber-300">
                        Read the flagship
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Flagship Collection — the rest of the curated best, with full visuals */}
      {secondaryFlagships.length > 0 && (
        <section className="px-6 pb-4 pt-2">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {secondaryFlagships.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <div className="relative flex h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/30">
                      <div className="relative w-2/5 min-w-[40%] overflow-hidden">
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 40vw, 240px"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-purple-500/10" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0b]/80" />
                      </div>
                      <div className="flex flex-1 flex-col justify-center p-5">
                        <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-300/80">
                          Flagship
                        </span>
                        <h3 className="mb-1.5 text-base font-semibold leading-snug text-white transition-colors group-hover:text-amber-50 md:text-lg line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs leading-relaxed text-white/45 line-clamp-2">{post.description}</p>
                        <span className="mt-3 text-xs text-white/30">{post.readingTime}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center gap-3"
            >
              <span className="text-sm text-white/40">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="py-12 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {selectedCategory && (
            <div className="flex items-center gap-2 mb-8">
              <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">
                {selectedCategory}
              </h2>
              <span className="text-xs text-white/30">
                • {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
              </span>
            </div>
          )}

          {!selectedCategory && regularPosts.length > 0 && (
            <div className="flex items-center gap-2 mb-8">
              <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">
                All Articles
              </h2>
              <span className="text-xs text-white/30">
                • {regularPosts.length} {regularPosts.length === 1 ? 'article' : 'articles'}
              </span>
            </div>
          )}

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
              {(selectedCategory ? filteredPosts : regularPosts).map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    delay: Math.min(i * 0.08, 0.3),
                    type: 'spring',
                    stiffness: 100,
                  }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

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
