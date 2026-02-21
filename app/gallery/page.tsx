'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Image as ImageIcon,
  Star,
  Filter,
  SortDesc,
} from 'lucide-react'

import curationData from '@/data/gallery-curation.json'

// ── Types ────────────────────────────────────────────────────────────────────

interface GalleryArtwork {
  id: string
  src: string
  title: string
  prompt: string
  model: string
  category: string
  tags: string[]
  featured: boolean
  score: number
}

// ── Collections ──────────────────────────────────────────────────────────────

const collections = [
  {
    id: 'instruments',
    title: 'Bio-Tech Instruments',
    description:
      'Engineering precision meets living intelligence. Grand pianos with neural networks, violins with mycelium acoustics.',
    image: '/images/gallery/instruments/biotech-grand-piano.png',
    count: 6,
    href: '/gallery/instruments',
    accent: 'from-cyan-500/20 to-emerald-500/20',
    borderAccent: 'border-cyan-500/30',
  },
  {
    id: 'editorial',
    title: 'Blog Hero Laboratory',
    description:
      'Regenerated blog heroes with prompts, scores, before/after comparisons.',
    image: '/images/blog/building-custom-skills-hero-v3-pro.png',
    count: 68,
    href: '/gallery/heroes',
    accent: 'from-amber-500/20 to-yellow-500/20',
    borderAccent: 'border-amber-500/30',
    badge: 'New',
  },
]

// ── Score Badge ──────────────────────────────────────────────────────────────

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 9
      ? 'text-amber-400 bg-amber-500/15 border-amber-500/30'
      : score >= 8
        ? 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30'
        : score >= 7
          ? 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30'
          : 'text-white/50 bg-white/5 border-white/10'

  return (
    <div
      className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-bold border backdrop-blur-sm flex items-center gap-1 ${color}`}
    >
      <Star className="w-3 h-3" />
      {score.toFixed(1)}
    </div>
  )
}

// ── Artwork Card ─────────────────────────────────────────────────────────────

function ArtworkCard({
  artwork,
  onClick,
}: {
  artwork: GalleryArtwork
  onClick: () => void
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-[#111113] border border-white/10 hover:border-white/20 transition-all duration-300 break-inside-avoid mb-4"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={artwork.src}
          alt={artwork.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <ScoreBadge score={artwork.score} />

        {artwork.featured && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30 backdrop-blur-sm">
            Featured
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
          <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">
            {artwork.title}
          </h3>
          <p className="text-white/60 text-xs line-clamp-2 font-mono">
            {artwork.prompt}
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {artwork.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] rounded-full bg-white/10 text-white/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Lightbox ─────────────────────────────────────────────────────────────────

function GalleryLightbox({
  artwork,
  artworks,
  currentIndex,
  onClose,
  onNavigate,
}: {
  artwork: GalleryArtwork
  artworks: GalleryArtwork[]
  currentIndex: number
  onClose: () => void
  onNavigate: (idx: number) => void
}) {
  const [copied, setCopied] = useState(false)
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < artworks.length - 1

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(artwork.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(currentIndex - 1)
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      )}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(currentIndex + 1)
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      )}

      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
      >
        <span className="sr-only">Close</span>
        &times;
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-5xl w-full mx-4 flex flex-col lg:flex-row gap-6 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
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

        <div className="lg:w-80 bg-[#111113] rounded-xl p-6 border border-white/10 overflow-y-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-2 py-1 rounded-md text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-3 h-3 inline mr-1" />
              {artwork.model}
            </div>
            <div className="px-2 py-1 rounded-md text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1">
              <Star className="w-3 h-3" />
              {artwork.score.toFixed(1)}
            </div>
          </div>

          <h2 className="text-xl font-bold text-white mb-2">{artwork.title}</h2>
          <p className="text-white/40 text-sm mb-4">{artwork.category}</p>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white/50 uppercase tracking-wider">
                Prompt
              </span>
              <button
                onClick={copyPrompt}
                className="text-xs text-white/50 hover:text-white transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="p-3 rounded-lg bg-black/50 border border-white/10">
              <p className="text-sm text-white/80 font-mono leading-relaxed">
                {artwork.prompt}
              </p>
            </div>
          </div>

          {artwork.tags.length > 0 && (
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

          <a
            href={artwork.src}
            download
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Download
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Collection Card ──────────────────────────────────────────────────────────

function CollectionCard({
  collection,
  index,
}: {
  collection: (typeof collections)[0]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={collection.href}
        className={`group relative block overflow-hidden rounded-2xl border ${collection.borderAccent} bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-500`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={collection.image}
            alt={collection.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/40 to-transparent" />
          {collection.badge && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs font-medium backdrop-blur-sm">
              {collection.badge}
            </div>
          )}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/70 text-sm">
            <ImageIcon className="w-4 h-4" />
            <span>{collection.count} artworks</span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {collection.title}
            </h3>
            <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
          </div>
          <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
            {collection.description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const artworks = curationData.artworks as GalleryArtwork[]
  const hero = curationData.heroFeature

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'score' | 'category'>('score')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const categories = useMemo(() => {
    const cats = new Set(artworks.map((a) => a.category))
    return ['all', ...Array.from(cats).sort()]
  }, [artworks])

  const topTags = useMemo(() => {
    const tagCounts = new Map<string, number>()
    artworks.forEach((a) =>
      a.tags.forEach((t) => tagCounts.set(t, (tagCounts.get(t) || 0) + 1))
    )
    return Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([tag]) => tag)
  }, [artworks])

  const filteredArtworks = useMemo(() => {
    let result = artworks.filter((a) => {
      if (activeCategory !== 'all' && a.category !== activeCategory) return false
      if (activeTag && !a.tags.includes(activeTag)) return false
      return true
    })
    if (sortBy === 'score') {
      result = [...result].sort((a, b) => b.score - a.score)
    }
    return result
  }, [artworks, activeCategory, activeTag, sortBy])

  const featuredArtworks = useMemo(
    () =>
      artworks
        .filter((a) => a.featured)
        .sort((a, b) => b.score - a.score),
    [artworks]
  )

  const totalArtworks = artworks.length
  const avgScore = (artworks.reduce((s, a) => s + a.score, 0) / totalArtworks).toFixed(1)

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero Featured Piece */}
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Hero Image */}
              <div className="relative aspect-square max-w-lg mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-white/10 group">
                <Image
                  src={hero.src}
                  alt={hero.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="px-2 py-1 rounded-md text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {hero.score}
                    </div>
                    <span className="text-white/40 text-xs">Gold Standard</span>
                  </div>
                  <h2 className="text-xl font-bold text-white">{hero.title}</h2>
                </div>
              </div>

              {/* Hero Text */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4" />
                  AI Visual Gallery
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                  The{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
                    Gallery
                  </span>
                </h1>

                <p className="text-lg text-white/50 mb-8 leading-relaxed">
                  {hero.curatorNote}
                </p>

                <div className="flex flex-wrap gap-6 text-white/40 text-sm">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    <span>{totalArtworks} Artworks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span>{avgScore} Avg Score</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{categories.length - 1} Categories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Gemini + Nano Banana</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Strip */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Top Rated</h2>
          <span className="text-xs text-white/30 uppercase tracking-wider">
            Score 8.5+
          </span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {featuredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="flex-none w-48 cursor-pointer group"
              onClick={() =>
                setSelectedIndex(
                  filteredArtworks.findIndex((a) => a.id === artwork.id)
                )
              }
            >
              <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all">
                <Image
                  src={artwork.src}
                  alt={artwork.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="192px"
                />
                <ScoreBadge score={artwork.score} />
              </div>
              <p className="text-white/60 text-xs mt-2 line-clamp-1 group-hover:text-white/80 transition-colors">
                {artwork.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Sub-Collections */}
      {collections.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collections.map((collection, index) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                index={index}
              />
            ))}
          </div>
        </section>
      )}

      {/* Full Gallery with Filters */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="border-t border-white/10 pt-16 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">All Artworks</h2>
            <span className="text-white/30 text-sm">
              {filteredArtworks.length} results
            </span>
          </div>

          {/* Filters */}
          <div className="space-y-4 mb-8">
            {/* Category pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-white/40 flex-none" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    activeCategory === cat
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-white/5 text-white/50 hover:text-white border border-transparent hover:border-white/10'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>

            {/* Tag chips */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-white/30 flex-none">Tags:</span>
              {topTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`px-2 py-1 text-xs rounded-full transition-colors ${
                    activeTag === tag
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-white/5 text-white/40 hover:text-white/60 border border-transparent'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <SortDesc className="w-4 h-4 text-white/40" />
              <button
                onClick={() => setSortBy(sortBy === 'score' ? 'category' : 'score')}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                Sort by: {sortBy === 'score' ? 'Quality Score' : 'Category'}
              </button>
            </div>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((artwork, index) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredArtworks.length === 0 && (
          <div className="text-center py-16">
            <Sparkles className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/50">No artworks match your filters</p>
            <button
              onClick={() => {
                setActiveCategory('all')
                setActiveTag(null)
              }}
              className="mt-4 text-emerald-400 hover:underline text-sm"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Cross-link to Vault */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
          <p className="text-white/50 mb-4">
            Want to explore the full visual asset library? All 484 assets across
            30 collections.
          </p>
          <Link
            href="/vault"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
          >
            Open ArcaneaVault
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && filteredArtworks[selectedIndex] && (
          <GalleryLightbox
            artwork={filteredArtworks[selectedIndex]}
            artworks={filteredArtworks}
            currentIndex={selectedIndex}
            onClose={() => setSelectedIndex(null)}
            onNavigate={setSelectedIndex}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
