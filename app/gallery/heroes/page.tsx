'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Sparkles,
  Zap,
  Eye,
  ArrowUpRight,
  SlidersHorizontal,
  Calendar,
} from 'lucide-react'
import heroData from '@/data/blog-heroes.json'

// ── Types ────────────────────────────────────────────────────────────────────
interface Hero {
  id: string
  title: string
  blog: string | null
  image: string
  date: string | null
  category: string | null
  exists: boolean
  oldImage?: string
  proImage?: string
  score: number | null
  proScore?: number
  oldScore?: number
  style: string | null
  prompt: string | null
  model: string | null
  proModel?: string
}

// ── Style Config ─────────────────────────────────────────────────────────────
const styleConfig: Record<string, { label: string; color: string; bg: string }> = {
  'dark-premium-glass': { label: 'Dark Glass', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' },
  'davinci-codex': { label: 'Da Vinci', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
  'davinci-dark': { label: 'Da Vinci Dark', color: 'text-amber-300', bg: 'bg-amber-500/10 border-amber-400/30' },
  'light-workshop': { label: 'Workshop', color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/30' },
  'cyberpunk-neon': { label: 'Cyberpunk', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
  'holographic-command': { label: 'Holographic', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' },
  'cinematic-studio': { label: 'Cinematic', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30' },
}

// ── Score Badge ──────────────────────────────────────────────────────────────
function ScoreBadge({ score, size = 'md' }: { score: number; size?: 'sm' | 'md' }) {
  const color =
    score >= 9 ? 'from-amber-500 to-yellow-500 text-black' :
    score >= 7 ? 'from-cyan-500 to-blue-500 text-white' :
    score >= 5 ? 'from-white/20 to-white/10 text-white/70' :
    'from-red-500 to-orange-500 text-white'
  const px = size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs'
  return (
    <span className={`inline-flex items-center font-bold rounded-full bg-gradient-to-r ${color} ${px}`}>
      {score}/10
    </span>
  )
}

// ── Hero Card (scored) ───────────────────────────────────────────────────────
function ScoredHeroCard({ hero, onClick }: { hero: Hero; onClick: () => void }) {
  const style = hero.style ? styleConfig[hero.style] : null
  const bestScore = hero.proScore || hero.score || 0
  const bestImage = hero.proImage || hero.image

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={bestImage}
            alt={hero.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-80" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <ScoreBadge score={bestScore} />
            {hero.proImage && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400">
                PRO
              </span>
            )}
          </div>

          {/* Style badge */}
          {style && (
            <div className="absolute top-3 right-3">
              <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${style.bg}`}>
                <span className={style.color}>{style.label}</span>
              </span>
            </div>
          )}

          {/* Bottom info */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-sm font-semibold text-white truncate">{hero.title}</h3>
          </div>
        </div>

        {/* Improvement indicator */}
        {hero.oldScore !== undefined && (
          <div className="px-3 py-2 flex items-center justify-between text-[11px]">
            <span className="text-white/30">
              {hero.oldScore}/10 → {bestScore}/10
            </span>
            <span className="text-emerald-400 font-medium">
              +{bestScore - hero.oldScore} improvement
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ── Hero Card (unscored) ─────────────────────────────────────────────────────
function UnscoredHeroCard({ hero, onClick }: { hero: Hero; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={hero.image}
            alt={hero.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-80" />

          {/* Unscored badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-white/5 border border-white/10 text-white/40">
              Unscored
            </span>
          </div>

          {/* Date */}
          {hero.date && (
            <div className="absolute top-3 right-3">
              <span className="text-[10px] text-white/30">{hero.date}</span>
            </div>
          )}

          {/* Bottom info */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-sm font-semibold text-white/80 truncate">{hero.title}</h3>
            {hero.category && (
              <span className="text-[10px] text-white/30">{hero.category}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  hero,
  heroes,
  currentIndex,
  onClose,
  onNavigate,
}: {
  hero: Hero
  heroes: Hero[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}) {
  const [showOld, setShowOld] = useState(false)
  const [copied, setCopied] = useState(false)

  const style = hero.style ? styleConfig[hero.style] : null
  const hasProImage = !!hero.proImage
  const hasOldImage = !!hero.oldImage
  const isScored = hero.score !== null

  const displayImage = showOld && hasOldImage
    ? hero.oldImage!
    : hasProImage ? hero.proImage! : hero.image
  const displayScore = showOld && hero.oldScore !== undefined
    ? hero.oldScore
    : hasProImage && hero.proScore ? hero.proScore : hero.score

  const copyPrompt = () => {
    if (!hero.prompt) return
    navigator.clipboard.writeText(hero.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0d0d0e]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation */}
        {currentIndex > 0 && (
          <button
            onClick={() => onNavigate(currentIndex - 1)}
            className="absolute left-4 top-1/3 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {currentIndex < heroes.length - 1 && (
          <button
            onClick={() => onNavigate(currentIndex + 1)}
            className="absolute right-4 top-1/3 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl">
          <Image
            src={displayImage}
            alt={hero.title}
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0e] via-transparent to-transparent opacity-60" />

          {/* Version toggle (only for scored heroes with old images) */}
          {isScored && hasOldImage && (
            <div className="absolute bottom-4 left-4 flex gap-2">
              <button
                onClick={() => setShowOld(false)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                  !showOld
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                    : 'bg-white/5 border-white/10 text-white/50 hover:text-white/70'
                }`}
              >
                {hasProImage ? 'Pro' : 'Current'} {displayScore !== null && `(${showOld ? hero.oldScore : displayScore}/10)`}
              </button>
              <button
                onClick={() => setShowOld(true)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                  showOld
                    ? 'bg-red-500/20 border-red-500/50 text-red-400'
                    : 'bg-white/5 border-white/10 text-white/50 hover:text-white/70'
                }`}
              >
                Original ({hero.oldScore}/10)
              </button>
            </div>
          )}

          {/* Score badge */}
          {displayScore !== null && (
            <div className="absolute bottom-4 right-4">
              <ScoreBadge score={displayScore} />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">{hero.title}</h2>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                {style && (
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${style.bg}`}>
                    <span className={style.color}>{style.label}</span>
                  </span>
                )}
                {hero.date && (
                  <span className="text-white/30 text-xs flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {hero.date}
                  </span>
                )}
                {hero.category && (
                  <span className="text-white/30 text-xs">{hero.category}</span>
                )}
                {isScored && hero.oldScore !== undefined && (
                  <span className="text-white/30 text-xs">
                    {hero.oldScore} → {hero.score}{hero.proScore ? ` → ${hero.proScore}` : ''}
                  </span>
                )}
              </div>
            </div>
            {hero.blog && (
              <Link
                href={hero.blog}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors shrink-0"
              >
                Read Article <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {/* Prompt */}
          {hero.prompt ? (
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">Generation Prompt</span>
                <button
                  onClick={copyPrompt}
                  className="flex items-center gap-1.5 text-[11px] text-white/40 hover:text-white/70 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">{hero.prompt}</p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <p className="text-sm text-white/30 italic">No prompt recorded yet. Run the image audit to add prompts and scores.</p>
            </div>
          )}

          {/* Meta */}
          <div className="flex flex-wrap gap-3 text-[11px] text-white/30">
            {hero.model && <span>Model: {hero.model === 'flash' ? 'Gemini 2.5 Flash' : hero.model}</span>}
            {hero.proModel && <span>Pro: Gemini 3 Pro</span>}
            {hero.image && <span className="font-mono">{hero.image}</span>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function HeroGalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [activeStyle, setActiveStyle] = useState<string | null>(null)
  const [showOnly, setShowOnly] = useState<'all' | 'scored' | 'unscored'>('all')
  const [sortBy, setSortBy] = useState<'score' | 'improvement' | 'newest'>('score')

  const heroes = heroData.heroes as Hero[]

  // Stats
  const scoredHeroes = useMemo(() => heroes.filter((h) => h.score !== null), [heroes])
  const unscoredHeroes = useMemo(() => heroes.filter((h) => h.score === null), [heroes])
  const proCount = heroes.filter((h) => h.proImage).length
  const avgScore = scoredHeroes.length
    ? (scoredHeroes.reduce((sum, h) => sum + (h.proScore || h.score || 0), 0) / scoredHeroes.length).toFixed(1)
    : '—'

  // Unique styles (from scored only)
  const styles = useMemo(() => {
    const s = new Set(scoredHeroes.filter(h => h.style).map((h) => h.style!))
    return Array.from(s)
  }, [scoredHeroes])

  // Filter + sort
  const filtered = useMemo(() => {
    let result = [...heroes]

    // Show filter
    if (showOnly === 'scored') result = result.filter((h) => h.score !== null)
    if (showOnly === 'unscored') result = result.filter((h) => h.score === null)

    // Style filter
    if (activeStyle) result = result.filter((h) => h.style === activeStyle)

    // Sort
    if (sortBy === 'score') {
      result.sort((a, b) => {
        const aS = a.proScore || a.score || 0
        const bS = b.proScore || b.score || 0
        if (aS !== bS) return bS - aS
        if (a.date && b.date) return b.date.localeCompare(a.date)
        return 0
      })
    } else if (sortBy === 'improvement') {
      result.sort((a, b) => {
        const aI = a.oldScore !== undefined ? (a.proScore || a.score || 0) - a.oldScore : -99
        const bI = b.oldScore !== undefined ? (b.proScore || b.score || 0) - b.oldScore : -99
        return bI - aI
      })
    } else {
      result.sort((a, b) => {
        if (a.date && b.date) return b.date.localeCompare(a.date)
        if (a.date) return -1
        if (b.date) return 1
        return 0
      })
    }

    return result
  }, [heroes, showOnly, activeStyle, sortBy])

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-amber-500/5" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/[0.08] rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-amber-500/[0.08] rounded-full blur-[128px]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Gallery
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Auto-Updated at Build Time
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Hero Image{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-purple-400 bg-clip-text text-transparent">
                Laboratory
              </span>
            </h1>

            <p className="text-lg text-white/50 max-w-2xl mx-auto mb-8">
              Every blog hero image with generation prompts, quality scores, and before/after comparisons.
              Auto-populated from {heroes.length} blog posts.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span className="text-white/70">{heroes.length} Total</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-white/70">{scoredHeroes.length} Scored (avg {avgScore})</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-white/70">{proCount} Pro</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10">
                <span className="text-white/50">{unscoredHeroes.length} Awaiting Audit</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-6 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <SlidersHorizontal className="w-4 h-4 text-white/30" />

          {/* Show filter */}
          {(['all', 'scored', 'unscored'] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setShowOnly(opt)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                showOnly === opt
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-white/[0.02] border-white/10 text-white/40 hover:text-white/60'
              }`}
            >
              {opt === 'all' ? `All (${heroes.length})` : opt === 'scored' ? `Scored (${scoredHeroes.length})` : `Unscored (${unscoredHeroes.length})`}
            </button>
          ))}

          {/* Divider */}
          <div className="w-px h-5 bg-white/10" />

          {/* Style filters */}
          {styles.map((s) => {
            const cfg = styleConfig[s]
            if (!cfg) return null
            const count = heroes.filter((h) => h.style === s).length
            return (
              <button
                key={s}
                onClick={() => setActiveStyle(activeStyle === s ? null : s)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                  activeStyle === s
                    ? `${cfg.bg} ${cfg.color}`
                    : 'bg-white/[0.02] border-white/10 text-white/40 hover:text-white/60'
                }`}
              >
                {cfg.label} ({count})
              </button>
            )
          })}

          {/* Sort */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-[11px] text-white/30">Sort:</span>
            {(['score', 'improvement', 'newest'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setSortBy(opt)}
                className={`px-2.5 py-1 text-[11px] rounded-md transition-all ${
                  sortBy === opt ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'
                }`}
              >
                {opt === 'score' ? 'Score' : opt === 'improvement' ? 'Improved' : 'Newest'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((hero) => {
              const globalIndex = heroes.findIndex((h) => h.id === hero.id)
              const isScored = hero.score !== null
              return isScored ? (
                <ScoredHeroCard
                  key={hero.id}
                  hero={hero}
                  onClick={() => setSelectedIndex(globalIndex)}
                />
              ) : (
                <UnscoredHeroCard
                  key={hero.id}
                  hero={hero}
                  onClick={() => setSelectedIndex(globalIndex)}
                />
              )
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/30">
            No heroes match this filter.
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox
            hero={heroes[selectedIndex]}
            heroes={heroes}
            currentIndex={selectedIndex}
            onClose={() => setSelectedIndex(null)}
            onNavigate={(i) => setSelectedIndex(i)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
