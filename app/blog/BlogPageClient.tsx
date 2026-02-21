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

  const getCategoryCount = (category: string) => {
    return posts.filter((post) => post.category?.toLowerCase() === category.toLowerCase()).length
  }

  // Latest post shown as hero when no filter is active
  const latestPost = !selectedCategory ? posts[0] : null
  const remainingPosts = latestPost ? posts.slice(1) : posts

  const filteredPosts = selectedCategory
    ? remainingPosts.filter((post) => post.category?.toLowerCase() === selectedCategory.toLowerCase())
    : remainingPosts

  const featuredPosts = filteredPosts.filter((post) => post.featured).slice(0, 2)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      {/* Editorial Hero */}
      <section className="relative pt-28 pb-10 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Nova (Content Catalyst) — blog mascot accent */}
          <div className="pointer-events-none absolute -right-4 top-0 hidden w-48 opacity-15 lg:block xl:w-56">
            <Image
              src="/images/team/nova-fox.png"
              alt=""
              width={224}
              height={224}
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-medium text-emerald-400">Creation Chronicles</span>
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

          {/* Latest Post Hero */}
          {latestPost && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6 }}
            >
              <Link href={`/blog/${latestPost.slug}`} className="group block">
                <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">
                  {latestPost.image ? (
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[280px] overflow-hidden">
                        <Image
                          src={latestPost.image}
                          alt={latestPost.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[11px] font-medium text-emerald-400">{latestPost.category}</span>
                          <span className="text-xs text-white/30">{latestPost.readingTime}</span>
                        </div>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 tracking-tight leading-tight">
                          {latestPost.title}
                        </h2>
                        <p className="text-sm text-white/50 leading-relaxed line-clamp-3">
                          {latestPost.description}
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
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[11px] font-medium text-emerald-400">{latestPost.category}</span>
                        <span className="text-xs text-white/30">{latestPost.readingTime}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight leading-tight">
                        {latestPost.title}
                      </h2>
                      <p className="text-base text-white/50 max-w-2xl leading-relaxed">
                        {latestPost.description}
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

      {/* Category Dropdown & Filter Section */}
      <section className="pb-8 px-6 sticky top-20 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
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

      {/* Featured Posts */}
      {!selectedCategory && featuredPosts.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">
                Featured Articles
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {featuredPosts.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, type: 'spring', stiffness: 100 }}
                >
                  <BlogCard post={post} featured />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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
            href="/free-playbook"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-all"
          >
            Start Building
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
