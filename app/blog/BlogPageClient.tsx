'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

import BlogCard from '@/components/blog/BlogCard'
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

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category.toLowerCase() === selectedCategory.toLowerCase())
    : posts

  const featuredPosts = filteredPosts.filter((post) => post.featured).slice(0, 2)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-emerald-400/70 mb-4">
              Creation Chronicles
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              What I'm building.
              <span className="block mt-2 text-white/50">What's working.</span>
            </h1>
            <p className="text-lg text-white/50 leading-relaxed">
              Weekly insights on AI systems, creative workflows, and building in public.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                !selectedCategory
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
              )}
            >
              All ({posts.length})
            </button>
            {categories.map((category) => {
              const count = posts.filter(p => p.category.toLowerCase() === category.toLowerCase()).length
              const isActive = selectedCategory?.toLowerCase() === category.toLowerCase()
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(isActive ? null : category)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                  )}
                >
                  {category} ({count})
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {!selectedCategory && featuredPosts.length > 0 && (
        <section className="py-8 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 mb-6">
              Featured
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredPosts.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <BlogCard post={post} featured />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="py-8 px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 mb-6">
            {selectedCategory ? `${selectedCategory} Articles` : 'All Articles'} ({filteredPosts.length})
          </p>

          {filteredPosts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-white/50 mb-4">No articles found in this category.</p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
              >
                View all articles →
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(selectedCategory ? filteredPosts : regularPosts).map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.05, 0.2) }}
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
