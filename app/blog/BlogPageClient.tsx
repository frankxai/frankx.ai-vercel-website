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
    <main className="min-h-screen bg-void text-white grain-overlay">
      {/* Hero with Aurora Background */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        {/* Aurora Background Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
          <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] bg-purple-500/05 rounded-full blur-[120px] animate-pulse delay-2000" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">Creation Chronicles</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
              What I'm building.
              <span className="block mt-2 bg-gradient-to-r from-white via-white/90 to-white/40 bg-clip-text text-transparent">
                What's working.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl font-light">
              Weekly insights on AI systems, creative workflows, and building in public. From Oracle architecture to Suno music production.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-display font-bold text-white leading-none">{posts.length}</span>
                  <span className="text-xs text-white/40 uppercase tracking-wider font-medium">Articles</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10">
                  <Filter className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-display font-bold text-white leading-none">{categories.length}</span>
                  <span className="text-xs text-white/40 uppercase tracking-wider font-medium">Categories</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Dropdown & Filter Section */}
      <section className="pb-8 px-6 sticky top-20 z-40">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between py-4 px-6 rounded-2xl bg-void/80 backdrop-blur-xl border border-white/10 shadow-glass">
            <CategoryDropdown
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              totalPosts={posts.length}
              getCategoryCount={getCategoryCount}
            />

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center gap-3"
            >
              <span className="text-sm font-medium text-white/40">
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
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
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
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                {selectedCategory}
              </h2>
              <span className="text-xs text-white/30">
                • {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
              </span>
            </div>
          )}

          {!selectedCategory && regularPosts.length > 0 && (
            <div className="flex items-center gap-2 mb-8">
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
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
              className="py-24 text-center card-premium rounded-3xl"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6">
                <Filter className="w-8 h-8 text-white/30" />
              </div>
              <p className="text-white/50 mb-6 text-lg font-light">No articles found in this category.</p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 text-emerald-400 font-medium hover:bg-emerald-500/20 transition-all"
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
      <section className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="card-premium rounded-3xl p-8 md:p-12 text-center backdrop-blur-xl border border-white/10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Weekly Insights</span>
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              Join Creation Chronicles
            </h2>
            <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto leading-relaxed">
              Get weekly insights on AI, creativity, and building in public. 
              Straight to your inbox, no noise.
            </p>
            
            <Link
              href="/free-playbook"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-white/90 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300"
            >
              Get Free Playbooks
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
