'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Copy,
  Check,
  Sparkles,
  Wand2,
  ExternalLink,
  Filter
} from 'lucide-react'
import Image from 'next/image'

// ============================================================================
// TYPES
// ============================================================================

interface AIArtwork {
  id: string
  src: string
  thumbnail?: string
  title: string
  prompt: string
  model?: 'midjourney' | 'nano-banana' | 'dalle' | 'stable-diffusion' | 'other'
  category?: string
  tags?: string[]
  parameters?: string // e.g., "--ar 16:9 --v 6.1"
  createdAt?: string
  featured?: boolean
}

interface MidjourneyGalleryProps {
  artworks: AIArtwork[]
  layout?: 'grid' | 'masonry' | 'featured'
  columns?: 2 | 3 | 4 | 5
  showPrompts?: boolean
  showFilters?: boolean
  theme?: 'tech' | 'soul'
  className?: string
}

// ============================================================================
// MODEL CONFIGS
// ============================================================================

const modelConfig = {
  midjourney: {
    name: 'Midjourney',
    color: '#5865f2',
    icon: Wand2,
  },
  'nano-banana': {
    name: 'nano-banana',
    color: '#10b981',
    icon: Sparkles,
  },
  dalle: {
    name: 'DALL-E',
    color: '#00a67e',
    icon: Sparkles,
  },
  'stable-diffusion': {
    name: 'Stable Diffusion',
    color: '#a855f7',
    icon: Sparkles,
  },
  other: {
    name: 'AI Generated',
    color: '#6366f1',
    icon: Sparkles,
  },
}

// ============================================================================
// ARTWORK CARD
// ============================================================================

function ArtworkCard({
  artwork,
  showPrompt,
  theme,
  onClick,
}: {
  artwork: AIArtwork
  showPrompt: boolean
  theme: 'tech' | 'soul'
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const model = modelConfig[artwork.model || 'other']
  const ModelIcon = model.icon
  const accentColor = theme === 'tech' ? '#10b981' : '#f59e0b'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-[#111113] border border-white/10 hover:border-white/20 transition-all duration-300"
      style={{
        boxShadow: isHovered ? `0 20px 40px -20px ${accentColor}40` : 'none',
      }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={artwork.thumbnail || artwork.src}
          alt={artwork.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
        />

        {/* Model badge */}
        <div
          className="absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 backdrop-blur-sm"
          style={{
            backgroundColor: `${model.color}20`,
            color: model.color,
            border: `1px solid ${model.color}30`
          }}
        >
          <ModelIcon className="w-3 h-3" />
          <span>{model.name}</span>
        </div>

        {/* Featured badge */}
        {artwork.featured && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30 backdrop-blur-sm">
            Featured
          </div>
        )}

        {/* Hover content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute bottom-0 left-0 right-0 p-4"
        >
          <h3 className="text-white font-semibold mb-1 line-clamp-1">
            {artwork.title}
          </h3>
          {showPrompt && (
            <p className="text-white/70 text-sm line-clamp-2 font-mono">
              {artwork.prompt}
            </p>
          )}
          {artwork.tags && artwork.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {artwork.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// LIGHTBOX
// ============================================================================

function ArtworkLightbox({
  artwork,
  artworks,
  currentIndex,
  onClose,
  onNavigate,
  theme,
}: {
  artwork: AIArtwork
  artworks: AIArtwork[]
  currentIndex: number
  onClose: () => void
  onNavigate: (direction: 'prev' | 'next') => void
  theme: 'tech' | 'soul'
}) {
  const [copied, setCopied] = useState(false)
  const model = modelConfig[artwork.model || 'other']
  const ModelIcon = model.icon
  const accentColor = theme === 'tech' ? 'emerald' : 'amber'

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(artwork.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < artworks.length - 1

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Navigation buttons */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate('prev')
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate('next')
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-5xl w-full mx-4 flex flex-col lg:flex-row gap-6 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative flex-1 min-h-[400px] lg:min-h-[600px] rounded-xl overflow-hidden bg-[#111113]">
          <Image
            src={artwork.src}
            alt={artwork.title}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
        </div>

        {/* Info panel */}
        <div className="lg:w-80 bg-[#111113] rounded-xl p-6 border border-white/10 overflow-y-auto">
          {/* Model badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium mb-4"
            style={{
              backgroundColor: `${model.color}20`,
              color: model.color
            }}
          >
            <ModelIcon className="w-4 h-4" />
            {model.name}
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-white mb-4">{artwork.title}</h2>

          {/* Prompt section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white/50 uppercase tracking-wider">
                Prompt
              </span>
              <button
                onClick={copyPrompt}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-colors ${
                  copied
                    ? `bg-${accentColor}-500/20 text-${accentColor}-400`
                    : 'bg-white/10 text-white/70 hover:text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="p-4 rounded-lg bg-black/50 border border-white/10">
              <p className="text-sm text-white/80 font-mono leading-relaxed">
                {artwork.prompt}
              </p>
              {artwork.parameters && (
                <p className="text-xs text-white/50 font-mono mt-2 pt-2 border-t border-white/10">
                  {artwork.parameters}
                </p>
              )}
            </div>
          </div>

          {/* Tags */}
          {artwork.tags && artwork.tags.length > 0 && (
            <div className="mb-6">
              <span className="text-sm font-medium text-white/50 uppercase tracking-wider block mb-2">
                Tags
              </span>
              <div className="flex flex-wrap gap-2">
                {artwork.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-white/10 text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Category */}
          {artwork.category && (
            <div className="mb-6">
              <span className="text-sm font-medium text-white/50 uppercase tracking-wider block mb-2">
                Category
              </span>
              <span className="text-white/80">{artwork.category}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <a
              href={artwork.src}
              download
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-${accentColor}-500 text-white font-medium hover:bg-${accentColor}-600 transition-colors`}
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="w-4 h-4" />
              Download
            </a>
            <button
              onClick={copyPrompt}
              className="px-4 py-3 rounded-lg bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function MidjourneyGallery({
  artworks,
  layout = 'masonry',
  columns = 3,
  showPrompts = true,
  showFilters = true,
  theme = 'tech',
  className = '',
}: MidjourneyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [activeModel, setActiveModel] = useState<string>('all')

  // Extract unique categories and models
  const categories = useMemo(() => {
    const cats = new Set(artworks.map((a) => a.category).filter(Boolean))
    return ['all', ...Array.from(cats)] as string[]
  }, [artworks])

  const models = useMemo(() => {
    const mods = new Set(artworks.map((a) => a.model).filter(Boolean))
    return ['all', ...Array.from(mods)] as string[]
  }, [artworks])

  // Filter artworks
  const filteredArtworks = useMemo(() => {
    return artworks.filter((artwork) => {
      if (activeCategory !== 'all' && artwork.category !== activeCategory) return false
      if (activeModel !== 'all' && artwork.model !== activeModel) return false
      return true
    })
  }, [artworks, activeCategory, activeModel])

  const gridClasses = {
    2: 'columns-1 sm:columns-2',
    3: 'columns-1 sm:columns-2 lg:columns-3',
    4: 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4',
    5: 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5',
  }

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (selectedIndex === null) return

    if (direction === 'prev' && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    } else if (direction === 'next' && selectedIndex < filteredArtworks.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  return (
    <div className={className}>
      {/* Filters */}
      {showFilters && (categories.length > 2 || models.length > 2) && (
        <div className="flex flex-wrap gap-4 mb-8">
          {/* Category filter */}
          {categories.length > 2 && (
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-white/50" />
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      activeCategory === cat
                        ? theme === 'tech'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-white/5 text-white/60 hover:text-white border border-transparent hover:border-white/10'
                    }`}
                  >
                    {cat === 'all' ? 'All Categories' : cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Model filter */}
          {models.length > 2 && (
            <div className="flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-white/50" />
              <div className="flex flex-wrap gap-2">
                {models.map((mod) => {
                  const config = mod !== 'all' ? modelConfig[mod as keyof typeof modelConfig] : null
                  return (
                    <button
                      key={mod}
                      onClick={() => setActiveModel(mod)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center gap-1.5 ${
                        activeModel === mod
                          ? config
                            ? `bg-opacity-20 border`
                            : theme === 'tech'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-white/5 text-white/60 hover:text-white border border-transparent hover:border-white/10'
                      }`}
                      style={
                        activeModel === mod && config
                          ? {
                              backgroundColor: `${config.color}20`,
                              color: config.color,
                              borderColor: `${config.color}30`,
                            }
                          : undefined
                      }
                    >
                      {config && <config.icon className="w-3 h-3" />}
                      {mod === 'all' ? 'All Models' : config?.name || mod}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Gallery */}
      {layout === 'masonry' && (
        <div className={`${gridClasses[columns]} gap-4`}>
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                layout
                className="break-inside-avoid mb-4"
              >
                <ArtworkCard
                  artwork={artwork}
                  showPrompt={showPrompts}
                  theme={theme}
                  onClick={() => setSelectedIndex(index)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {layout === 'grid' && (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-4`}>
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((artwork, index) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                showPrompt={showPrompts}
                theme={theme}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {layout === 'featured' && (
        <div className="space-y-4">
          {/* Featured item large */}
          {filteredArtworks.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <motion.div
                className="lg:col-span-1 lg:row-span-2"
                layout
              >
                <ArtworkCard
                  artwork={filteredArtworks[0]}
                  showPrompt={showPrompts}
                  theme={theme}
                  onClick={() => setSelectedIndex(0)}
                />
              </motion.div>
              {/* Smaller items */}
              <div className="grid grid-cols-2 gap-4">
                {filteredArtworks.slice(1, 5).map((artwork, index) => (
                  <ArtworkCard
                    key={artwork.id}
                    artwork={artwork}
                    showPrompt={showPrompts}
                    theme={theme}
                    onClick={() => setSelectedIndex(index + 1)}
                  />
                ))}
              </div>
            </div>
          )}
          {/* Rest in grid */}
          {filteredArtworks.length > 5 && (
            <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-${columns} gap-4 mt-4`}>
              {filteredArtworks.slice(5).map((artwork, index) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  showPrompt={showPrompts}
                  theme={theme}
                  onClick={() => setSelectedIndex(index + 5)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {filteredArtworks.length === 0 && (
        <div className="text-center py-16">
          <Sparkles className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/50">No artworks match your filters</p>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && filteredArtworks[selectedIndex] && (
          <ArtworkLightbox
            artwork={filteredArtworks[selectedIndex]}
            artworks={filteredArtworks}
            currentIndex={selectedIndex}
            onClose={() => setSelectedIndex(null)}
            onNavigate={handleNavigate}
            theme={theme}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================================================
// EXPORTS
// ============================================================================

export type { AIArtwork, MidjourneyGalleryProps }
