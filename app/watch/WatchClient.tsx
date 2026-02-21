'use client'

import { useState, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { EnhancedVideo, Watchlist, CategorySummary } from '@/lib/video-types'
import { WatchHero } from '@/components/watch/WatchHero'
import { VideoCard } from '@/components/watch/VideoCard'
import { VideoCarousel } from '@/components/watch/VideoCarousel'
import { WatchlistCard } from '@/components/watch/WatchlistCard'
import { WatchlistView } from '@/components/watch/WatchlistView'
import { VideoLightbox } from '@/components/watch/VideoLightbox'
import { CatalogFilters } from '@/components/watch/CatalogFilters'

interface WatchClientProps {
  videos: EnhancedVideo[]
  watchlists: Watchlist[]
  categories: CategorySummary[]
  editorsPicks: EnhancedVideo[]
  stats: {
    totalVideos: number
    totalCategories: number
    featuredCount: number
    uniqueAuthors: number
  }
  blogCrossLinks: Record<string, string[]>
}

const sectionRows = [
  {
    id: 'foundations',
    title: 'AI Foundations',
    subtitle: 'Deep technical learning',
    categories: ['AI Foundations'],
    color: '#10b981',
  },
  {
    id: 'build',
    title: 'Build & Ship',
    subtitle: 'Engineering, agents, and hands-on building',
    categories: ['AI Engineering', 'AI Agents'],
    color: '#3b82f6',
  },
  {
    id: 'strategy',
    title: 'Strategy & Creator',
    subtitle: 'Business, creative vision, growth',
    categories: ['Strategy & Business', 'Creator Economy'],
    color: '#f59e0b',
  },
  {
    id: 'human-edge',
    title: 'Human Edge',
    subtitle: 'Peak performance, philosophy, and building things that last',
    categories: ['Peak Performance', 'Entrepreneurship', 'Philosophy & Stoicism', 'Mindset & Growth'],
    color: '#ef4444',
  },
  {
    id: 'creative',
    title: 'Creative & Culture',
    subtitle: 'Music, art, memes, pure energy',
    categories: ['Creative AI & Music', 'AI Culture'],
    color: '#ec4899',
  },
]

export default function WatchClient({
  videos,
  watchlists,
  categories,
  editorsPicks,
  stats,
  blogCrossLinks,
}: WatchClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPersona, setSelectedPersona] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [activeVideo, setActiveVideo] = useState<EnhancedVideo | null>(null)
  const [activeWatchlist, setActiveWatchlist] = useState<Watchlist | null>(null)
  const [showAllCatalog, setShowAllCatalog] = useState(false)

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesQuery =
        !searchQuery ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = !selectedCategory || video.category === selectedCategory
      const matchesPersona = selectedPersona === 'all' || video.personas.includes(selectedPersona)
      const matchesLevel = selectedLevel === 'all' || video.level === selectedLevel
      return matchesQuery && matchesCategory && matchesPersona && matchesLevel
    })
  }, [videos, searchQuery, selectedCategory, selectedPersona, selectedLevel])

  const displayVideos = showAllCatalog ? filteredVideos : filteredVideos.slice(0, 24)

  return (
    <main className="min-h-screen bg-void text-white grain-overlay">
      <WatchHero stats={stats} />

      {/* Editor's Picks */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Editor&apos;s Picks</h2>
          <span className="text-xs text-white/30 uppercase tracking-wider">
            Curated favorites
          </span>
        </div>
        <VideoCarousel
          videos={editorsPicks}
          onPlay={(video) => setActiveVideo(video)}
        />
      </section>

      {/* Watchlists */}
      {watchlists.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Watchlists</h2>
            <span className="text-xs text-white/30 uppercase tracking-wider">
              {watchlists.length} curated lists
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {watchlists.map((wl) => (
              <WatchlistCard
                key={wl.id}
                watchlist={wl}
                videos={videos}
                onClick={() => setActiveWatchlist(wl)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Section Rows */}
      {sectionRows.map((section) => {
        const sectionVideos = videos.filter((v) => section.categories.includes(v.category))
        if (sectionVideos.length === 0) return null
        const featured = sectionVideos.filter((v) => v.featured)
        const display = featured.length >= 4 ? featured.slice(0, 8) : sectionVideos.slice(0, 8)
        return (
          <section key={section.id} className="max-w-7xl mx-auto px-6 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 rounded-full" style={{ backgroundColor: section.color }} />
              <div>
                <h2 className="text-2xl font-bold">{section.title}</h2>
                <p className="text-xs text-white/40">{section.subtitle}</p>
              </div>
              <span className="ml-auto text-xs text-white/30">{sectionVideos.length} videos</span>
            </div>
            <VideoCarousel
              videos={display}
              onPlay={(video) => setActiveVideo(video)}
            />
          </section>
        )
      })}

      {/* Full Catalog */}
      <section id="catalog" className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Full Catalog</h2>
          <span className="text-xs text-white/30">{filteredVideos.length} videos</span>
        </div>

        <CatalogFilters
          categories={categories}
          selectedCategory={selectedCategory}
          selectedPersona={selectedPersona}
          selectedLevel={selectedLevel}
          searchQuery={searchQuery}
          onCategoryChange={setSelectedCategory}
          onPersonaChange={setSelectedPersona}
          onLevelChange={setSelectedLevel}
          onSearchChange={setSearchQuery}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                variant="full"
                onPlay={(v) => setActiveVideo(v)}
                blogSlugs={blogCrossLinks[video.id]}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-24">
            <p className="text-white/30 text-xl">No videos match your filters.</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory(null)
                setSelectedPersona('all')
                setSelectedLevel('all')
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
            </button>
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <VideoLightbox
            video={activeVideo}
            allVideos={videos}
            onClose={() => setActiveVideo(null)}
            onNavigate={setActiveVideo}
            blogCrossLinks={blogCrossLinks}
          />
        )}
      </AnimatePresence>

      {/* Watchlist View */}
      <AnimatePresence>
        {activeWatchlist && (
          <WatchlistView
            watchlist={activeWatchlist}
            videos={videos.filter(v => activeWatchlist.videoIds.includes(v.id))}
            onClose={() => setActiveWatchlist(null)}
            onPlay={(video) => {
              setActiveWatchlist(null)
              setActiveVideo(video)
            }}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
