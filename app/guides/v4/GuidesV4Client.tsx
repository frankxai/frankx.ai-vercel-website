'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import {
  Image,
  Music,
  PenTool,
  Rocket,
  Code,
  Clock,
  ArrowRight,
  Search,
  BookMarked,
  Grid3X3,
  List,
  Bookmark,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Filter
} from 'lucide-react'

// ============================================================================
// V4: NOTION/ARC BROWSER STYLE
// Sidebar navigation, search-first, collapsible sections, clean functional
// ============================================================================

interface GuideDoc {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
  category?: string
  tags?: string[]
}

interface GuidesV4ClientProps {
  guides: GuideDoc[]
}

type ViewMode = 'grid' | 'list'

const CATEGORIES = [
  {
    id: 'visual',
    title: 'Visual Creation',
    icon: Image,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    slugs: ['midjourney-guide', 'image-generation-mastery']
  },
  {
    id: 'content',
    title: 'Content Systems',
    icon: PenTool,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    slugs: ['ai-writing-system', 'claude-anthropic-guide', 'openai-chatgpt-guide', 'perplexity-ai-guide', 'top-50-ai-prompts']
  },
  {
    id: 'audio',
    title: 'Audio & Music',
    icon: Music,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    slugs: ['suno-prompt-playbook', 'elevenlabs-voice-guide']
  },
  {
    id: 'founder',
    title: "Founder's Playbook",
    icon: Rocket,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    slugs: ['modern-guide', 'skills-library-playbook', 'agent-collective-operating-system', 'founder-ai-stack-2026']
  },
  {
    id: 'dev',
    title: 'AI Development',
    icon: Code,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    slugs: ['claude-code-getting-started']
  },
]

function SidebarCategory({
  category,
  guides,
  isActive,
  onClick
}: {
  category: typeof CATEGORIES[0]
  guides: GuideDoc[]
  isActive: boolean
  onClick: () => void
}) {
  const [isExpanded, setIsExpanded] = useState(true)
  const Icon = category.icon
  const categoryGuides = guides.filter(g => category.slugs.includes(g.slug))

  if (categoryGuides.length === 0) return null

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-white/5 rounded-lg transition-colors group"
      >
        <ChevronRight
          className={`w-3.5 h-3.5 text-white/30 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
        />
        <Icon className={`w-4 h-4 ${category.color}`} />
        <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors flex-1">
          {category.title}
        </span>
        <span className="text-xs text-white/30 tabular-nums">
          {categoryGuides.length}
        </span>
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
            <div className="ml-5 pl-4 border-l border-white/5 mt-1 space-y-0.5">
              {categoryGuides.map(guide => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="flex items-center gap-2 px-2 py-1.5 text-sm text-white/50 hover:text-white hover:bg-white/5 rounded-md transition-colors group"
                >
                  <span className="truncate flex-1">{guide.title}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function GridCard({ guide }: { guide: GuideDoc }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group block p-5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-white/5">
          <BookMarked className="w-4 h-4 text-white/40" />
        </div>
        <button
          onClick={(e) => { e.preventDefault() }}
          className="p-1.5 rounded-lg hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all"
        >
          <Bookmark className="w-4 h-4 text-white/40" />
        </button>
      </div>

      <h3 className="text-base font-medium text-white mb-2 group-hover:text-emerald-300 transition-colors line-clamp-2">
        {guide.title}
      </h3>
      <p className="text-sm text-white/40 line-clamp-2 mb-4">
        {guide.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs text-white/30">
          <Clock className="w-3 h-3" />
          {guide.readingTime}
        </span>
        <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
      </div>
    </Link>
  )
}

function ListRow({ guide, index }: { guide: GuideDoc; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
    >
      <Link
        href={`/guides/${guide.slug}`}
        className="group flex items-center gap-4 p-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors"
      >
        <div className="p-2 rounded-lg bg-white/5 flex-shrink-0">
          <BookMarked className="w-4 h-4 text-white/40" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors truncate">
            {guide.title}
          </h3>
          <p className="text-xs text-white/40 truncate mt-0.5">
            {guide.description}
          </p>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <span className="text-xs text-white/30 hidden sm:block">
            {guide.readingTime}
          </span>
          <span className="text-xs text-white/20 hidden md:block">
            {new Date(guide.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
          <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-emerald-400 transition-colors" />
        </div>
      </Link>
    </motion.div>
  )
}

export default function GuidesV4Client({ guides }: GuidesV4ClientProps) {
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredGuides = useMemo(() => {
    return guides.filter(guide => {
      const matchesSearch =
        guide.title.toLowerCase().includes(search.toLowerCase()) ||
        guide.description.toLowerCase().includes(search.toLowerCase())

      if (!selectedCategory) return matchesSearch

      const category = CATEGORIES.find(c => c.id === selectedCategory)
      return matchesSearch && category?.slugs.includes(guide.slug)
    })
  }, [guides, search, selectedCategory])

  const popularGuides = guides
    .filter(g => ['modern-guide', 'claude-anthropic-guide', 'midjourney-guide'].includes(g.slug))
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0 h-screen sticky top-0 border-r border-white/5 bg-white/[0.01]">
          <div className="p-4 h-full flex flex-col">
            {/* Logo/Title */}
            <div className="mb-6">
              <Link href="/guides" className="flex items-center gap-2 text-white">
                <BookMarked className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold">Guides</span>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="mb-6">
              <Link
                href="/guides"
                onClick={(e) => { e.preventDefault(); setSelectedCategory(null); setSearch('') }}
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                  !selectedCategory ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                All Guides
                <span className="ml-auto text-xs text-white/30">{guides.length}</span>
              </Link>
            </div>

            {/* Categories */}
            <div className="flex-1 overflow-y-auto">
              <div className="text-xs font-medium text-white/30 uppercase tracking-wider px-3 mb-2">
                Categories
              </div>
              {CATEGORIES.map(category => (
                <SidebarCategory
                  key={category.id}
                  category={category}
                  guides={guides}
                  isActive={selectedCategory === category.id}
                  onClick={() => setSelectedCategory(category.id)}
                />
              ))}
            </div>

            {/* Trending */}
            <div className="mt-auto pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs font-medium text-white/30 uppercase tracking-wider px-3 mb-3">
                <TrendingUp className="w-3.5 h-3.5" />
                Popular
              </div>
              <div className="space-y-1">
                {popularGuides.map(guide => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <span className="truncate">{guide.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <header className="sticky top-0 z-20 bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-5xl mx-auto px-6 py-4">
              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search guides..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all"
                  />
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Filter */}
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filter</span>
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="max-w-5xl mx-auto px-6 py-8">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {selectedCategory
                    ? CATEGORIES.find(c => c.id === selectedCategory)?.title
                    : 'All Guides'}
                </h1>
                <p className="text-sm text-white/40 mt-1">
                  {filteredGuides.length} {filteredGuides.length === 1 ? 'guide' : 'guides'}
                  {search && ` matching "${search}"`}
                </p>
              </div>
            </div>

            {/* Guides */}
            {filteredGuides.length === 0 ? (
              <div className="py-16 text-center">
                <BookMarked className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <p className="text-white/40">No guides found</p>
                <button
                  onClick={() => { setSearch(''); setSelectedCategory(null) }}
                  className="mt-4 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredGuides.map(guide => (
                  <GridCard key={guide.slug} guide={guide} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-white/5 overflow-hidden">
                {filteredGuides.map((guide, i) => (
                  <ListRow key={guide.slug} guide={guide} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
