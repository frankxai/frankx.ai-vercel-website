'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Search,
  Play,
  Filter,
  X,
  Cpu,
  Bot,
  Sparkles,
  TrendingUp,
  Laugh,
  Activity,
  ArrowRight,
  GraduationCap,
  Palette,
  Wrench,
  Users,
  Music,
  BookOpen,
  ChevronRight,
} from 'lucide-react'
import { UniversalEmbed } from '@/components/embeds/UniversalEmbed'
import type { EnhancedVideo, Watchlist, CategorySummary } from '@/lib/video-types'

// ============================================================================
// PROPS
// ============================================================================

interface WatchClientProps {
  videos: EnhancedVideo[]
  watchlists: Watchlist[]
  categories: CategorySummary[]
  trending: EnhancedVideo[]
  stats: {
    totalVideos: number
    totalCategories: number
    featuredCount: number
    uniqueAuthors: number
  }
  blogCrossLinks: Record<string, string[]>
}

// ============================================================================
// ICON MAP
// ============================================================================

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'AI Fundamentals': Cpu,
  'AI Engineering': Cpu,
  'AI Agents': Bot,
  'AI Tools': Wrench,
  'AI Strategy': TrendingUp,
  'Creative AI': Sparkles,
  'Strategy': TrendingUp,
  'Creator Economy': Users,
  'AI Memes': Laugh,
  'Mindset': Activity,
  'Learning': GraduationCap,
  'Rituals': Activity,
  'Creativity': Palette,
  'LLM Fundamentals': Cpu,
}

const watchlistIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  cpu: Cpu,
  bot: Bot,
  sparkles: Sparkles,
  'trending-up': TrendingUp,
  music: Music,
  activity: Activity,
  'graduation-cap': GraduationCap,
  users: Users,
}

// ============================================================================
// PERSONAS
// ============================================================================

const personaTabs = [
  { id: 'all', label: 'All', icon: Play },
  { id: 'developer', label: 'Developer', icon: Cpu },
  { id: 'architect', label: 'Architect', icon: Bot },
  { id: 'creator', label: 'Creator', icon: Sparkles },
  { id: 'student', label: 'Student', icon: GraduationCap },
]

// ============================================================================
// SECTIONS
// ============================================================================

const sections = [
  {
    id: 'intelligence',
    title: 'Intelligence Lab',
    subtitle: 'Deep technical learning',
    categories: ['AI Fundamentals', 'AI Agents', 'AI Engineering', 'AI Tools', 'LLM Fundamentals', 'Learning'],
    color: '#10b981',
  },
  {
    id: 'strategy',
    title: 'Strategy & Creator',
    subtitle: 'Business, mindset, creative vision',
    categories: ['Strategy', 'AI Strategy', 'Creator Economy', 'Mindset', 'Creative AI', 'Creativity'],
    color: '#f59e0b',
  },
  {
    id: 'culture',
    title: 'Culture & Vibes',
    subtitle: 'Memes, rituals, pure energy',
    categories: ['AI Memes', 'Rituals'],
    color: '#ec4899',
  },
]

// ============================================================================
// COMPONENT
// ============================================================================

export default function WatchClient({
  videos,
  watchlists,
  categories,
  trending,
  stats,
  blogCrossLinks,
}: WatchClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPersona, setSelectedPersona] = useState('all')
  const [activeVideo, setActiveVideo] = useState<EnhancedVideo | null>(null)
  const [showAllCatalog, setShowAllCatalog] = useState(false)

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesQuery =
        !searchQuery ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = !selectedCategory || video.category === selectedCategory

      const matchesPersona =
        selectedPersona === 'all' || video.personas.includes(selectedPersona)

      return matchesQuery && matchesCategory && matchesPersona
    })
  }, [videos, searchQuery, selectedCategory, selectedPersona])

  const displayVideos = showAllCatalog ? filteredVideos : filteredVideos.slice(0, 24)

  return (
    <main className="min-h-screen bg-void text-white grain-overlay">
      {/* Hero with Stats */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
              <Play className="w-4 h-4 text-emerald-400 fill-current" />
              <span className="text-xs font-medium text-emerald-400 uppercase tracking-widest">
                Video Vault
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              The Intelligence <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400">
                Registry.
              </span>
            </h1>

            <p className="text-xl text-white/50 max-w-2xl font-light leading-relaxed mb-8">
              Curated high-signal content for the Agentic Era. {stats.totalVideos}+ videos
              indexed for deep learning, strategic ROI, and creative mastery.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6">
              {[
                { label: 'Videos', value: `${stats.totalVideos}+` },
                { label: 'Categories', value: stats.totalCategories },
                { label: 'Featured', value: stats.featuredCount },
                { label: 'Creators', value: stats.uniqueAuthors },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Trending</h2>
          <span className="text-xs text-white/30 uppercase tracking-wider">
            Featured picks
          </span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
          {trending.map((video, i) => (
            <motion.div
              key={`trending-${video.id}-${i}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group flex-none w-72 card-premium rounded-2xl p-4 cursor-pointer hover:-translate-y-1 transition-all"
              onClick={() => setActiveVideo(video)}
            >
              <div className="aspect-video rounded-xl bg-black/40 border border-white/5 mb-3 relative overflow-hidden">
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  sizes="288px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Play className="absolute bottom-2 right-2 w-7 h-7 text-white/60 group-hover:text-emerald-400 transition-all group-hover:scale-110" />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-[9px] uppercase font-bold tracking-widest text-emerald-400">
                  Featured
                </div>
              </div>
              <h3 className="text-sm font-bold mb-1 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                {video.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <span className="font-medium text-white/60">{video.author}</span>
                <span>&middot;</span>
                <span>{video.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Watchlists Section */}
      {watchlists.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Watchlists</h2>
            <span className="text-xs text-white/30 uppercase tracking-wider">
              {watchlists.length} curated lists
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {watchlists.map((wl, i) => {
              const WlIcon = watchlistIcons[wl.icon] || Play
              return (
                <motion.div
                  key={wl.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group card-premium rounded-2xl p-5 cursor-pointer hover:-translate-y-1 transition-all"
                  onClick={() => {
                    // Filter to watchlist videos
                    setSelectedCategory(null)
                    setSearchQuery('')
                    setSelectedPersona('all')
                    setShowAllCatalog(true)
                    // Scroll to catalog
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${wl.color}15`, border: `1px solid ${wl.color}30` }}
                  >
                    <WlIcon className="w-5 h-5" style={{ color: wl.color }} />
                  </div>
                  <h3 className="text-base font-bold mb-1 group-hover:text-emerald-400 transition-colors">
                    {wl.title}
                  </h3>
                  <p className="text-xs text-white/40 line-clamp-2 mb-3">{wl.description}</p>
                  <div className="flex items-center gap-1 text-xs text-white/30">
                    <Play className="w-3 h-3" />
                    <span>{wl.videoIds.length} videos</span>
                    <ChevronRight className="w-3 h-3 ml-auto group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>
      )}

      {/* Section Rows */}
      {sections.map((section) => {
        const sectionVideos = videos.filter((v) =>
          section.categories.includes(v.category)
        )
        if (sectionVideos.length === 0) return null
        const featured = sectionVideos.filter((v) => v.featured)
        const display = featured.length >= 4
          ? featured.slice(0, 6)
          : sectionVideos.slice(0, 6)
        return (
          <section key={section.id} className="max-w-7xl mx-auto px-6 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-2 h-8 rounded-full"
                style={{ backgroundColor: section.color }}
              />
              <div>
                <h2 className="text-2xl font-bold">{section.title}</h2>
                <p className="text-xs text-white/40">{section.subtitle}</p>
              </div>
              <span className="ml-auto text-xs text-white/30">
                {sectionVideos.length} videos
              </span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
              {display.map((video, i) => (
                <motion.div
                  key={`${section.id}-${video.id}-${i}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex-none w-72 card-premium rounded-2xl p-4 cursor-pointer hover:-translate-y-1 transition-all"
                  onClick={() => setActiveVideo(video)}
                >
                  <div className="aspect-video rounded-xl bg-black/40 border border-white/5 mb-3 relative overflow-hidden">
                    <Image
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                      alt={video.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      sizes="288px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Play className="absolute bottom-2 right-2 w-7 h-7 text-white/60 group-hover:text-emerald-400 transition-all" />
                  </div>
                  <h3 className="text-sm font-bold mb-1 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <span className="font-medium text-white/60">{video.author}</span>
                    <span>&middot;</span>
                    <span>{video.duration}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )
      })}

      {/* Full Catalog Section */}
      <section id="catalog" className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Full Catalog</h2>
          <span className="text-xs text-white/30">{filteredVideos.length} videos</span>
        </div>

        {/* Persona Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
          {personaTabs.map((tab) => {
            const TabIcon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedPersona(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all whitespace-nowrap text-sm ${
                  selectedPersona === tab.id
                    ? 'bg-emerald-500 text-black border-emerald-500 font-bold'
                    : 'bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/5'
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              placeholder="Search by title, author, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors backdrop-blur-sm"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-3.5 rounded-2xl border transition-all whitespace-nowrap text-sm ${
                !selectedCategory
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/5'
              }`}
            >
              All
            </button>
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.name] || Filter
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl border transition-all whitespace-nowrap text-sm ${
                    selectedCategory === cat.name
                      ? 'bg-emerald-500 text-black border-emerald-500 font-bold'
                      : 'bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.name}
                  <span className="text-[10px] opacity-60">({cat.count})</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayVideos.map((video, i) => {
              const hasBlogLink = blogCrossLinks[video.id]?.length > 0
              return (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: Math.min(i * 0.03, 0.5) }}
                  className="group card-premium rounded-3xl p-6 cursor-pointer flex flex-col hover:-translate-y-1 transition-all"
                  onClick={() => setActiveVideo(video)}
                >
                  <div className="aspect-video rounded-2xl bg-black/40 border border-white/5 mb-5 relative overflow-hidden">
                    <Image
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                      alt={video.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Play className="absolute bottom-3 right-3 w-8 h-8 text-white/60 group-hover:text-emerald-400 transition-all group-hover:scale-110" />

                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-black/60 border border-white/10 text-[10px] uppercase font-bold tracking-widest text-white/60">
                      {video.category}
                    </div>

                    {video.featured && (
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                        Featured
                      </div>
                    )}

                    {hasBlogLink && (
                      <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-[10px] uppercase font-bold tracking-widest text-cyan-400 flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        Blog
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {video.title}
                  </h3>

                  {video.description && (
                    <p className="text-xs text-white/40 mb-3 line-clamp-2">{video.description}</p>
                  )}

                  <div className="flex items-center gap-2 mb-4 text-sm text-white/40">
                    <span className="font-medium text-white/60">{video.author}</span>
                    <span>&middot;</span>
                    <span>{video.duration}</span>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {video.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/5 text-white/30"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Show More / No Results */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-24">
            <p className="text-white/30 text-xl">No videos match your filters.</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory(null)
                setSelectedPersona('all')
              }}
              className="mt-4 text-emerald-400 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {!showAllCatalog && filteredVideos.length > 24 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAllCatalog(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all font-medium"
            >
              Show all {filteredVideos.length} videos
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* Lightbox / Player Overlay */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-void/95 backdrop-blur-2xl p-6"
          >
            <div className="w-full max-w-6xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{activeVideo.title}</h2>
                  <p className="text-white/50">
                    {activeVideo.author} &middot; {activeVideo.category} &middot;{' '}
                    {activeVideo.duration}
                  </p>
                  {activeVideo.description && (
                    <p className="text-sm text-white/40 mt-2 max-w-2xl">
                      {activeVideo.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex-none"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="aspect-video w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <UniversalEmbed type="youtube" id={activeVideo.id} autoplay={true} />
              </div>

              <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex flex-wrap gap-2">
                  {activeVideo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {blogCrossLinks[activeVideo.id]?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {blogCrossLinks[activeVideo.id].map((slug) => (
                      <Link
                        key={slug}
                        href={`/blog/${slug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium hover:bg-cyan-500/20 transition-colors"
                      >
                        <BookOpen className="w-3 h-3" />
                        Read article
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
