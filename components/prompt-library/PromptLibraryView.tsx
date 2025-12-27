'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Search, SlidersHorizontal } from 'lucide-react'

import type { CategoryInfo, Prompt, PromptLibraryStats } from '@/lib/prompts'
import PromptCard from '@/components/prompt-library/PromptCard'
import { cn } from '@/lib/utils'

interface PromptLibraryViewProps {
  prompts: Prompt[]
  categories: CategoryInfo[]
  featuredPrompts: Prompt[]
  stats: PromptLibraryStats
}

export default function PromptLibraryView({
  prompts,
  categories,
  featuredPrompts,
  stats,
}: PromptLibraryViewProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTool, setSelectedTool] = useState<string>('all')

  const filteredPrompts = useMemo(() => {
    let result = prompts

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (prompt) =>
          prompt.title.toLowerCase().includes(query) ||
          prompt.description.toLowerCase().includes(query) ||
          prompt.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          prompt.content.toLowerCase().includes(query)
      )
    }

    if (selectedCategory !== 'all') {
      result = result.filter((prompt) => prompt.category === selectedCategory)
    }

    if (selectedTool !== 'all') {
      result = result.filter((prompt) => prompt.aiTool === selectedTool)
    }

    return result
  }, [prompts, searchQuery, selectedCategory, selectedTool])

  const statHighlights = useMemo(
    () => [
      { label: 'Total Prompts', value: String(stats.totalPrompts), description: 'Ready to use' },
      { label: 'Categories', value: String(stats.totalCategories), description: 'Organized workflows' },
      { label: 'AI Tools', value: String(stats.toolsUsed.length), description: 'Supported platforms' },
      { label: 'Difficulty Mix', value: `${stats.difficultyDistribution.Beginner}/${stats.difficultyDistribution.Intermediate}/${stats.difficultyDistribution.Advanced}`, description: 'Beginner/Mid/Advanced' },
    ],
    [stats]
  )

  const toolOptions = ['all', ...stats.toolsUsed]

  return (
    <main className="relative min-h-screen pb-24 pt-28 text-white">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#030712]" />
        <motion.div
          className="absolute top-0 -right-[20%] w-[60%] h-[60%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.06) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="px-6">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 mb-6">
                <Sparkles className="h-4 w-4 text-violet-400" />
                <span className="text-sm font-medium text-violet-300">Prompt Library</span>
              </div>

              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl mb-4">
                <span className="text-white">Practical prompts for</span>
                <br />
                <span className="font-serif italic text-white/80">creators who ship</span>
              </h1>

              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                Copy-paste prompts for Claude, ChatGPT, Midjourney, Suno, and more.
                No fluff, just templates that work.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 mt-12">
          <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {statHighlights.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center"
              >
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="text-sm text-white/60">{stat.label}</p>
                <p className="text-xs text-white/40">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Filters */}
        <section className="px-6 mt-12">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search prompts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white placeholder:text-white/40 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </select>

              {/* Tool Filter */}
              <select
                value={selectedTool}
                onChange={(e) => setSelectedTool(e.target.value)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white capitalize focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              >
                <option value="all">All Tools</option>
                {toolOptions.filter((t) => t !== 'all').map((tool) => (
                  <option key={tool} value={tool}>
                    {tool === 'dalle' ? 'DALL-E' : tool}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Featured Prompts */}
        {featuredPrompts.length > 0 && selectedCategory === 'all' && selectedTool === 'all' && !searchQuery && (
          <section className="px-6 mt-16">
            <div className="mx-auto max-w-6xl space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-white mb-2">Featured Prompts</h2>
                <p className="text-white/50">Curated templates to get you started</p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {featuredPrompts.map((prompt, index) => (
                  <motion.div
                    key={prompt.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 * index }}
                  >
                    <PromptCard prompt={prompt} variant="featured" showDescription />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Prompts */}
        <section className="px-6 mt-16">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-white/60">
                Showing {filteredPrompts.length} prompt{filteredPrompts.length === 1 ? '' : 's'}
              </span>
              {(selectedCategory !== 'all' || selectedTool !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setSelectedTool('all')
                  }}
                  className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>

            {filteredPrompts.length === 0 ? (
              <div className="text-center py-16 rounded-2xl border border-white/10 bg-white/[0.02]">
                <p className="text-white/60 mb-4">No prompts matched your filters.</p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setSelectedTool('all')
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white/80 transition-all hover:bg-white/10"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
              >
                {filteredPrompts.map((prompt, index) => (
                  <motion.div
                    key={prompt.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.03 * index }}
                  >
                    <PromptCard prompt={prompt} showDescription />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Browse by Category */}
        <section className="px-6 mt-20">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-2">Browse by Category</h2>
              <p className="text-white/50">Find prompts organized by workflow</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-xl border p-4 transition-all hover:-translate-y-1',
                    selectedCategory === category.id
                      ? 'border-violet-500/50 bg-violet-500/10'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                  )}
                >
                  <span className="text-2xl">{category.emoji}</span>
                  <span className="text-xs font-medium text-white/80">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Want to create AI music?
            </h2>
            <p className="text-white/50 mb-6">
              Check out our Suno prompts above, or explore Vibe OS for a complete AI music creation system.
            </p>
            <Link
              href="/products/vibe-os"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              <Sparkles className="h-4 w-4" />
              Explore Vibe OS
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
