'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  ArrowRight,
  Download,
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
  style: string
  category: string
  tags: string[]
  featured: boolean
  score: number
  createdAt: string
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

function ScoreBadge({ score, showAlways = false }: { score: number; showAlways?: boolean }) {
  if (!showAlways && score < 8.0) return null

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
      aria-label={`Quality score ${score.toFixed(1)} out of 10`}
      className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[11px] font-bold border backdrop-blur-md flex items-center gap-1 tabular-nums ${color}`}
    >
      {score >= 9 ? <Sparkles className="w-2.5 h-2.5" aria-hidden="true" /> : <Star className="w-2.5 h-2.5" aria-hidden="true" />}
      {score.toFixed(1)}
    </div>
  )
}

function getCardGlow(score: number): string {
  if (score >= 9) return 'hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] hover:border-amber-500/30'
  if (score >= 8.5) return 'hover:shadow-[0_0_30px_rgba(171,71,199,0.12)] hover:border-purple-500/30'
  if (score >= 8) return 'hover:shadow-[0_0_25px_rgba(67,191,227,0.1)] hover:border-cyan-500/30'
  return 'hover:border-white/20'
}

function getAspectRatio(score: number): string {
  if (score >= 9) return 'aspect-[3/4]'
  if (score >= 8) return 'aspect-[4/5]'
  return 'aspect-square'
}

// ── Artwork Card ─────────────────────────────────────────────────────────────

function ArtworkCard({
  artwork,
  onClick,
  variant = 'standard',
}: {
  artwork: GalleryArtwork
  onClick: () => void
  variant?: 'standard' | 'editorial'
}) {
  const aspect = variant === 'editorial' ? 'aspect-[16/9]' : getAspectRatio(artwork.score)

  return (
    <motion.button
      type="button"
      layout
      aria-label={`View ${artwork.title}${artwork.score >= 8 ? `, score ${artwork.score}` : ''}`}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-[#111113] border border-white/[0.08] ring-1 ring-inset ring-white/5 hover:ring-white/10 transition-all duration-500 break-inside-avoid mb-3 w-full text-left hover:-translate-y-0.5 ${getCardGlow(artwork.score)}`}
      onClick={onClick}
    >
      <div className={`relative ${aspect} overflow-hidden`}>
        <Image
          src={artwork.src}
          alt={artwork.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-[1.06] group-hover:brightness-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Lit edge */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <ScoreBadge score={artwork.score} />

        {artwork.featured && (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30 backdrop-blur-md">
            Featured
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <h3 className="text-white font-semibold text-sm line-clamp-1">
            {artwork.title}
          </h3>
          <p className="text-white/50 text-xs mt-0.5">{artwork.category}</p>
        </div>
      </div>
    </motion.button>
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate(currentIndex - 1)
      if (e.key === 'ArrowRight' && hasNext) onNavigate(currentIndex + 1)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose, onNavigate, currentIndex, hasPrev, hasNext])

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
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing ${artwork.title}`}
    >
      {/* Position counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-white/10 text-white/60 text-sm font-medium tabular-nums backdrop-blur-md z-10">
        {currentIndex + 1} / {artworks.length}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
        aria-label="Close lightbox"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-5xl w-full mx-4 flex flex-col lg:flex-row gap-6 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image panel with inline nav arrows */}
        <div className="relative flex-1 min-h-[300px] sm:min-h-[400px] lg:min-h-[600px] rounded-xl overflow-hidden bg-[#111113] group/img">
          <Image
            src={artwork.src}
            alt={artwork.title}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
          {hasPrev && (
            <button
              onClick={() => onNavigate(currentIndex - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 text-white/70 hover:bg-black/60 hover:text-white transition-all opacity-0 group-hover/img:opacity-100"
              aria-label="Previous artwork"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          {hasNext && (
            <button
              onClick={() => onNavigate(currentIndex + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 text-white/70 hover:bg-black/60 hover:text-white transition-all opacity-0 group-hover/img:opacity-100"
              aria-label="Next artwork"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Info sidebar */}
        <div className="lg:w-80 bg-[#111113] rounded-xl p-6 border border-white/10 overflow-y-auto max-h-[40vh] lg:max-h-full">
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <div className="px-2 py-1 rounded-md text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-3 h-3 inline mr-1" />
              {artwork.model}
            </div>
            <div className="px-2 py-1 rounded-md text-xs font-medium bg-purple-500/15 text-purple-400 border border-purple-500/30">
              {artwork.style}
            </div>
            <div className="px-2 py-1 rounded-md text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1">
              <Star className="w-3 h-3" />
              {artwork.score.toFixed(1)}
            </div>
          </div>

          <h2 className="text-xl font-bold text-white mb-2">{artwork.title}</h2>
          <div className="flex items-center gap-3 text-sm text-white/40 mb-4">
            <span>{artwork.category}</span>
            <span className="text-white/20">·</span>
            <span>{artwork.createdAt}</span>
          </div>

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
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border border-white/20 text-white/70 font-medium hover:bg-white/10 hover:text-white transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Download className="w-4 h-4" />
            Download
          </a>

          {/* Keyboard hint */}
          <p className="text-white/20 text-[10px] text-center mt-3 hidden lg:block">
            ← → navigate &middot; Esc close
          </p>
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
  const [sortBy, setSortBy] = useState<'score' | 'latest' | 'category'>('latest')
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
    } else if (sortBy === 'latest') {
      result = [...result].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
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

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { value: totalArtworks, label: 'Artworks' },
                    { value: avgScore, label: 'Avg Score' },
                    { value: categories.length - 1, label: 'Categories' },
                    { value: featuredArtworks.length, label: 'Top Rated' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06]"
                    >
                      <div className="text-xl font-bold text-white tabular-nums">
                        {stat.value}
                      </div>
                      <div className="text-xs text-white/40 mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
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
          {featuredArtworks.map((artwork) => {
            const idx = filteredArtworks.findIndex((a) => a.id === artwork.id)
            return (
              <button
                key={artwork.id}
                type="button"
                className="flex-none w-48 text-left group"
                aria-label={`View ${artwork.title}, score ${artwork.score}`}
                onClick={() => {
                  if (idx >= 0) {
                    setSelectedIndex(idx)
                  } else {
                    // Artwork filtered out — reset filters and select it
                    setActiveCategory('all')
                    setActiveTag(null)
                    const fullIdx = artworks.findIndex((a) => a.id === artwork.id)
                    if (fullIdx >= 0) setSelectedIndex(fullIdx)
                  }
                }}
              >
                <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all">
                  <Image
                    src={artwork.src}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="192px"
                  />
                  <ScoreBadge score={artwork.score} showAlways />
                </div>
                <p className="text-white/60 text-xs mt-2 line-clamp-1 group-hover:text-white/80 transition-colors">
                  {artwork.title}
                </p>
              </button>
            )
          })}
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
            {/* Active filter badges */}
            {(activeCategory !== 'all' || activeTag) && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-white/30 flex-none">Active:</span>
                {activeCategory !== 'all' && (
                  <button
                    onClick={() => setActiveCategory('all')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/25 transition-colors"
                  >
                    {activeCategory}
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  </button>
                )}
                {activeTag && (
                  <button
                    onClick={() => setActiveTag(null)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/25 hover:bg-cyan-500/25 transition-colors"
                  >
                    {activeTag}
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  </button>
                )}
                <button
                  onClick={() => { setActiveCategory('all'); setActiveTag(null) }}
                  className="text-xs text-white/40 hover:text-white transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Category pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-white/40 flex-none" />
              {categories.map((cat) => {
                const count = cat === 'all'
                  ? artworks.length
                  : artworks.filter((a) => a.category === cat).length
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={activeCategory === cat}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      activeCategory === cat
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white/5 text-white/50 hover:text-white border border-transparent hover:border-white/10'
                    }`}
                  >
                    {cat === 'all' ? 'All' : cat}
                    <span className="ml-1.5 text-[10px] opacity-60">{count}</span>
                  </button>
                )
              })}
            </div>

            {/* Tag chips */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-white/30 flex-none">Tags:</span>
              {topTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  aria-pressed={activeTag === tag}
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
            <div className="flex items-center gap-3">
              <SortDesc className="w-4 h-4 text-white/40" />
              {(['latest', 'score', 'category'] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSortBy(opt)}
                  aria-pressed={sortBy === opt}
                  className={`text-sm transition-colors ${
                    sortBy === opt
                      ? 'text-white font-medium'
                      : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  {opt === 'latest' ? 'Latest' : opt === 'score' ? 'Top Rated' : 'Category'}
                </button>
              ))}
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
        <div className="relative rounded-2xl p-px bg-gradient-to-r from-cyan-500/30 via-purple-500/20 to-amber-500/30">
          <div className="rounded-2xl bg-[#0a0a0b] p-8 text-center">
            <p className="text-white/50 mb-4">
              Explore the full visual asset library — 484 assets across
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
