'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useRef } from 'react'
import {
  Play,
  Pause,
  ExternalLink,
  Music2,
  Headphones,
  Heart,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Volume2,
  Disc3,
  Radio,
  Waves,
} from 'lucide-react'

// ============================================================================
// PREMIUM BACKGROUND
// ============================================================================

function MusicLabBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0a0a0b]" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 -right-[20%] w-[60%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle noise */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

// ============================================================================
// AUDIO VISUALIZER
// ============================================================================

function AudioVisualizer({ isPlaying = false, bars = 16 }: { isPlaying?: boolean; bars?: number }) {
  return (
    <div className="flex items-end justify-center gap-[3px] h-full">
      {[...Array(bars)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full bg-gradient-to-t from-purple-500 to-cyan-400"
          animate={{
            height: isPlaying
              ? [12, 24 + Math.random() * 40, 12]
              : [8, 14, 8],
          }}
          transition={{
            duration: 0.4 + Math.random() * 0.4,
            repeat: Infinity,
            delay: i * 0.03,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// ============================================================================
// FEATURED TRACK CARD
// ============================================================================

interface Track {
  id: string
  title: string
  genre: string
  duration: string
  plays: string
  sunoUrl: string
  description?: string
}

function FeaturedTrackCard({ track, index }: { track: Track; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href={track.sunoUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group block relative"
    >
      {/* Glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300">
        {/* Album art / visualizer */}
        <div className="aspect-square relative bg-gradient-to-br from-purple-500/10 via-cyan-500/5 to-pink-500/10 p-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <AudioVisualizer isPlaying={isHovered} bars={12} />
          </div>

          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
              <Play className="w-6 h-6 text-white ml-1" />
            </div>
          </div>

          {/* Track number */}
          <div className="absolute top-4 left-4">
            <span className="text-xs font-mono text-white/30">#{String(index + 1).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Track info */}
        <div className="p-5">
          <h3 className="font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">
            {track.title}
          </h3>
          <p className="text-sm text-white/40 mb-3">{track.genre}</p>

          <div className="flex items-center justify-between text-xs text-white/30">
            <span>{track.duration}</span>
            <div className="flex items-center gap-1">
              <Headphones className="w-3.5 h-3.5" />
              <span>{track.plays}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  )
}

// ============================================================================
// HERO SECTION
// ============================================================================

function MusicHero() {
  return (
    <section className="relative pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
              <Disc3 className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">500+ Songs Created with AI</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6">
              <span className="text-white">Music</span>
              <br />
              <span className="font-serif italic text-white/80">Lab</span>
            </h1>

            <p className="text-xl text-white/50 mb-8 max-w-lg leading-relaxed">
              500+ songs created with Suno AI. Ambient, electronic, cinematic.
              Exploring what becomes possible when human creativity meets AI.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://suno.com/@frankxai"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full font-semibold transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                <Play className="w-5 h-5" />
                Listen on Suno
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right - Featured visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 via-cyan-500/10 to-pink-500/20 blur-3xl" />

              {/* Main circle */}
              <div className="absolute inset-8 rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-sm flex items-center justify-center">
                <AudioVisualizer isPlaying bars={20} />
              </div>

              {/* Stats floating around */}
              <motion.div
                className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-sm text-white/70">11K+ plays</span>
              </motion.div>

              <motion.div
                className="absolute bottom-12 right-4 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                <span className="text-sm text-white/70">6 genres</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// STATS BAR
// ============================================================================

function StatsBar() {
  const stats = [
    { value: '500+', label: 'Songs' },
    { value: '11K+', label: 'Total Plays' },
    { value: '6', label: 'Genres' },
    { value: '2024', label: 'Started' },
  ]

  return (
    <section className="py-12 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-semibold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/40 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// FEATURED TRACKS
// ============================================================================

const featuredTracks: Track[] = [
  {
    id: '1',
    title: 'The Awakening',
    genre: 'Ambient Electronic',
    duration: '3:42',
    plays: '2.1K',
    sunoUrl: 'https://suno.com/@frankxai',
  },
  {
    id: '2',
    title: 'Neural Pathways',
    genre: 'Synthwave',
    duration: '4:18',
    plays: '1.8K',
    sunoUrl: 'https://suno.com/@frankxai',
  },
  {
    id: '3',
    title: 'Consciousness Stream',
    genre: 'Deep Focus',
    duration: '5:24',
    plays: '1.5K',
    sunoUrl: 'https://suno.com/@frankxai',
  },
  {
    id: '4',
    title: 'Digital Serenity',
    genre: 'Lo-Fi Ambient',
    duration: '3:56',
    plays: '1.2K',
    sunoUrl: 'https://suno.com/@frankxai',
  },
  {
    id: '5',
    title: 'Oracle Dreams',
    genre: 'Cinematic',
    duration: '4:45',
    plays: '980',
    sunoUrl: 'https://suno.com/@frankxai',
  },
  {
    id: '6',
    title: 'The Bridge We Built',
    genre: 'Uplifting Electronic',
    duration: '4:12',
    plays: '890',
    sunoUrl: 'https://suno.com/@frankxai',
    description: 'Song #500 - A celebration of human-AI collaboration',
  },
]

function FeaturedTracks() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-4xl font-semibold text-white mb-3 tracking-tight">Featured Tracks</h2>
            <p className="text-lg text-white/50">Highlights from the collection</p>
          </div>
          <a
            href="https://suno.com/@frankxai"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            View all on Suno
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredTracks.map((track, i) => (
            <FeaturedTrackCard key={track.id} track={track} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// GENRES / CATEGORIES
// ============================================================================

const genres = [
  { name: 'Ambient', count: 120, icon: Waves, color: 'from-cyan-500/20 to-blue-500/20' },
  { name: 'Electronic', count: 95, icon: Radio, color: 'from-purple-500/20 to-pink-500/20' },
  { name: 'Cinematic', count: 78, icon: Sparkles, color: 'from-amber-500/20 to-orange-500/20' },
  { name: 'Lo-Fi', count: 65, icon: Headphones, color: 'from-green-500/20 to-emerald-500/20' },
  { name: 'Focus', count: 82, icon: Music2, color: 'from-blue-500/20 to-indigo-500/20' },
  { name: 'Healing', count: 60, icon: Heart, color: 'from-rose-500/20 to-pink-500/20' },
]

function GenresSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl font-semibold text-white mb-3 tracking-tight">Explore by Genre</h2>
          <p className="text-lg text-white/50">Music organized by mood and intention</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {genres.map((genre, i) => (
            <motion.a
              key={genre.name}
              href="https://suno.com/@frankxai"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${genre.color} flex items-center justify-center mb-4`}>
                <genre.icon className="w-6 h-6 text-white/80" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">
                {genre.name}
              </h3>
              <p className="text-sm text-white/40">{genre.count} tracks</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CTA SECTION
// ============================================================================

function CTASection() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
            Ready to listen?
          </h2>
          <p className="text-xl text-white/50 mb-10 max-w-lg mx-auto">
            All 500+ tracks available on Suno. Ambient, electronic, cinematic—find your vibe.
          </p>
          <a
            href="https://suno.com/@frankxai"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          >
            <Play className="w-5 h-5" />
            Open in Suno
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function MusicLabPage() {
  return (
    <main className="relative min-h-screen text-white">
      <MusicLabBackground />

      <div className="relative z-10">
        <MusicHero />
        <StatsBar />
        <FeaturedTracks />
        <GenresSection />
        <CTASection />
      </div>
    </main>
  )
}
