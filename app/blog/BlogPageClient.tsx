'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Filter, TrendingUp } from 'lucide-react'

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

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category?.toLowerCase() === selectedCategory.toLowerCase())
    : posts

  const featuredPosts = filteredPosts.filter((post) => post.featured).slice(0, 2)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      {/* Hero with Aurora Background */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        {/* Aurora Background Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">Creation Chronicles</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              What I'm building.
              <span className="block mt-2 bg-gradient-to-r from-white/90 to-white/40 bg-clip-text text-transparent">
                What's working.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl">
              Weekly insights on AI systems, creative workflows, and building in public. From Oracle architecture to Suno music production.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-white/50">
                  <span className="font-semibold text-white">{posts.length}</span> articles
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-white/50">
                  <span className="font-semibold text-white">{categories.length}</span> categories
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="px-6 sticky top-14 sm:top-16 z-40 bg-[#030712]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto py-3">
          <CategoryDropdown
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            totalPosts={posts.length}
            getCategoryCount={getCategoryCount}
          />
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
            Get Free Playbooks
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
