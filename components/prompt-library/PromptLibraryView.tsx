'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  ChevronRight,
  Sparkles,
  Lock,
  Crown,
  PenLine,
  Music,
  Image,
  Code2,
  Brain,
  Bot,
  TrendingUp,
  Share2,
  Megaphone,
  Zap,
  Target,
  Compass,
  GraduationCap,
  X,
  ChevronDown,
} from 'lucide-react'

import type {
  CategoryInfo,
  CategoryGroup,
  Prompt,
  PromptLibraryStats,
  PromptTier,
} from '@/lib/prompts'
import { CATEGORY_GROUPS } from '@/lib/prompts'
import PromptCard from '@/components/prompt-library/PromptCard'
import { cn } from '@/lib/utils'

// Icon mapping for dynamic rendering
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  PenLine,
  Music,
  Image,
  Sparkles,
  Code2,
  Brain,
  Bot,
  TrendingUp,
  Share2,
  Megaphone,
  Zap,
  Target,
  Compass,
  GraduationCap,
}

interface PromptLibraryViewProps {
  prompts: Prompt[]
  categories: CategoryInfo[]
  featuredPrompts: Prompt[]
  stats: PromptLibraryStats
}

const TIER_CONFIG: Record<PromptTier, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  free: { label: 'Free', icon: Sparkles, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  premium: { label: 'Premium', icon: Crown, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  paid: { label: 'Paid', icon: Lock, color: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
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
  const [selectedTier, setSelectedTier] = useState<string>('all')
  const [expandedGroups, setExpandedGroups] = useState<Record<CategoryGroup, boolean>>({
    creative: true,
    technical: true,
    business: true,
    personal: true,
  })
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleGroup = (group: CategoryGroup) => {
    setExpandedGroups((prev) => ({ ...prev, [group]: !prev[group] }))
  }

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

    if (selectedTier !== 'all') {
      result = result.filter((prompt) => prompt.tier === selectedTier)
    }

    return result
  }, [prompts, searchQuery, selectedCategory, selectedTool, selectedTier])

  const toolOptions = ['all', ...stats.toolsUsed]

  // Group categories by their group
  const categoriesByGroup = useMemo(() => {
    const grouped: Record<CategoryGroup, CategoryInfo[]> = {
      creative: [],
      technical: [],
      business: [],
      personal: [],
    }
    categories.forEach((cat) => {
      grouped[cat.group].push(cat)
    })
    return grouped
  }, [categories])

  // Get prompt count for a category
  const getPromptCount = (categoryId: string) => {
    return prompts.filter((p) => p.category === categoryId).length
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedTool('all')
    setSelectedTier('all')
  }

  const hasActiveFilters = selectedCategory !== 'all' || selectedTool !== 'all' || selectedTier !== 'all' || searchQuery

  return (
    <main className="relative min-h-screen pb-24 pt-28 text-white">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
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

      <div className="relative z-10 flex">
        {/* Left Sidebar */}
        <aside
          className={cn(
            'fixed left-0 top-28 bottom-0 z-40 w-72 bg-[#0a0f1a]/95 backdrop-blur-xl border-r border-white/10 overflow-y-auto transition-transform duration-300',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          )}
        >
          <div className="p-6">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Browse Prompts</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded hover:bg-white/10"
              >
                <X className="h-5 w-5 text-white/60" />
              </button>
            </div>

            {/* Tier Filter */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-3">Access Level</h3>
              <div className="space-y-1">
                {(['all', 'free', 'premium', 'paid'] as const).map((tier) => {
                  const isActive = selectedTier === tier
                  const config = tier === 'all' ? null : TIER_CONFIG[tier]
                  const count = tier === 'all' ? prompts.length : stats.tierDistribution[tier]

                  return (
                    <button
                      key={tier}
                      onClick={() => setSelectedTier(tier)}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all',
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-white/60 hover:bg-white/5 hover:text-white'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {config && <config.icon className={cn('h-4 w-4', config.color.split(' ')[0])} />}
                        <span className="capitalize">{tier === 'all' ? 'All Prompts' : config?.label}</span>
                      </div>
                      <span className="text-xs text-white/40">{count}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Category Groups */}
            <div className="space-y-4">
              {(Object.keys(CATEGORY_GROUPS) as CategoryGroup[]).map((group) => {
                const groupInfo = CATEGORY_GROUPS[group]
                const groupCategories = categoriesByGroup[group]
                const isExpanded = expandedGroups[group]

                return (
                  <div key={group}>
                    <button
                      onClick={() => toggleGroup(group)}
                      className="w-full flex items-center justify-between py-2 text-left"
                    >
                      <span className="text-xs font-medium text-white/50 uppercase tracking-wider">
                        {groupInfo.name}
                      </span>
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 text-white/40 transition-transform',
                          isExpanded && 'rotate-180'
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-1 pt-1">
                            {groupCategories.map((category) => {
                              const Icon = ICON_MAP[category.icon] || Sparkles
                              const isActive = selectedCategory === category.id
                              const count = getPromptCount(category.id)

                              return (
                                <button
                                  key={category.id}
                                  onClick={() => setSelectedCategory(isActive ? 'all' : category.id)}
                                  className={cn(
                                    'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all',
                                    isActive
                                      ? 'bg-white/10 text-white'
                                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                                  )}
                                >
                                  <div className="flex items-center gap-2">
                                    <span style={{ color: category.color }}>
                                      <Icon className="h-4 w-4" />
                                    </span>
                                    <span>{category.name}</span>
                                  </div>
                                  <span className="text-xs text-white/40">{count}</span>
                                </button>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-3">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-white/5 p-3 text-center">
                  <p className="text-xl font-semibold text-white">{stats.totalPrompts}</p>
                  <p className="text-xs text-white/50">Total</p>
                </div>
                <div className="rounded-lg bg-white/5 p-3 text-center">
                  <p className="text-xl font-semibold text-emerald-400">{stats.tierDistribution.free}</p>
                  <p className="text-xs text-white/50">Free</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className={cn(
            'fixed left-4 bottom-4 z-50 lg:hidden p-3 rounded-full bg-violet-600 text-white shadow-lg',
            sidebarOpen && 'hidden'
          )}
        >
          <Filter className="h-5 w-5" />
        </button>

        {/* Main Content */}
        <div className={cn('flex-1 min-w-0 transition-all duration-300', sidebarOpen ? 'lg:ml-72' : '')}>
          {/* Hero */}
          <section className="px-6">
            <div className="mx-auto max-w-5xl text-center">
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
                  <span className="text-white">Prompts that</span>
                  <br />
                  <span className="font-serif-italic text-white/80">transform your AI workflow</span>
                </h1>

                <p className="text-lg text-white/50 max-w-2xl mx-auto mb-8">
                  {stats.totalPrompts} production-ready prompts for creators, developers, and conscious builders.
                  <span className="text-emerald-400"> {stats.tierDistribution.free} free prompts</span> to get started.
                </p>

                {/* Search Bar */}
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search prompts, categories, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder:text-white/40 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Tier Badges Row */}
          <section className="px-6 mt-8">
            <div className="mx-auto max-w-5xl flex flex-wrap items-center justify-center gap-3">
              {(['free', 'premium', 'paid'] as PromptTier[]).map((tier) => {
                const config = TIER_CONFIG[tier]
                const count = stats.tierDistribution[tier]
                const isActive = selectedTier === tier

                return (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(isActive ? 'all' : tier)}
                    className={cn(
                      'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all',
                      isActive ? config.color : 'border-white/10 text-white/60 hover:border-white/20 hover:text-white'
                    )}
                  >
                    <config.icon className="h-4 w-4" />
                    <span>{config.label}</span>
                    <span className="text-xs opacity-60">{count}</span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Active Filters */}
          {hasActiveFilters && (
            <section className="px-6 mt-6">
              <div className="mx-auto max-w-5xl flex items-center gap-2 flex-wrap">
                <span className="text-sm text-white/50">Filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                    {categories.find((c) => c.id === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory('all')} className="ml-1 hover:text-white/80">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedTool !== 'all' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                    {selectedTool}
                    <button onClick={() => setSelectedTool('all')} className="ml-1 hover:text-white/80">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedTier !== 'all' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                    {TIER_CONFIG[selectedTier as PromptTier].label}
                    <button onClick={() => setSelectedTier('all')} className="ml-1 hover:text-white/80">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                <button onClick={clearFilters} className="text-xs text-violet-400 hover:text-violet-300">
                  Clear all
                </button>
              </div>
            </section>
          )}

          {/* Tool Filter Row */}
          <section className="px-6 mt-6">
            <div className="mx-auto max-w-5xl">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <span className="text-sm text-white/50 whitespace-nowrap">AI Tool:</span>
                {toolOptions.map((tool) => (
                  <button
                    key={tool}
                    onClick={() => setSelectedTool(tool)}
                    className={cn(
                      'whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-all',
                      selectedTool === tool
                        ? 'border-violet-500/50 bg-violet-500/10 text-violet-300'
                        : 'border-white/10 text-white/60 hover:border-white/20 hover:text-white'
                    )}
                  >
                    {tool === 'all' ? 'All Tools' : tool === 'dalle' ? 'DALL-E' : tool}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="px-6 mt-12">
            <div className="mx-auto max-w-5xl">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-white/60">
                  Showing <span className="text-white font-medium">{filteredPrompts.length}</span> prompt{filteredPrompts.length === 1 ? '' : 's'}
                </span>
              </div>

              {/* Results Grid */}
              {filteredPrompts.length === 0 ? (
                <div className="text-center py-16 rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                  <p className="text-white/60 mb-4">No prompts matched your filters.</p>
                  <button
                    onClick={clearFilters}
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
                      transition={{ duration: 0.4, delay: 0.03 * Math.min(index, 10) }}
                    >
                      <PromptCard prompt={prompt} showDescription showTier />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-6 mt-20">
            <div className="mx-auto max-w-3xl text-center rounded-3xl border border-white/10 bg-gradient-to-b from-violet-500/5 to-transparent p-12">
              <Crown className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-4">
                Unlock Premium Prompts
              </h2>
              <p className="text-white/50 mb-6 max-w-lg mx-auto">
                Get access to advanced prompts bundled with our creator operating systems.
                Transform your AI workflow with professional-grade templates.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/products/generative-creator-os"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:bg-white/90"
                >
                  <Sparkles className="h-4 w-4" />
                  Generative Creator OS
                </Link>
                <Link
                  href="/products/agentic-creator-os"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
                >
                  <Bot className="h-4 w-4" />
                  Agentic Creator OS
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
