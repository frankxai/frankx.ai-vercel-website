'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Play,
  ExternalLink,
  Music2,
  Sparkles,
  ArrowRight,
  Headphones,
  Heart,
  Disc3,
  Radio,
  Volume2,
} from 'lucide-react'

// ============================================================================
// BACKGROUND
// ============================================================================

function MusicBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#030712]" />

      <motion.div
        className="absolute top-0 -right-[20%] w-[60%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
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
  )
}

// ============================================================================
// SONG DATA - Your actual Suno tracks
// ============================================================================

const featuredTracks = [
  { id: '9cbad174-9276-427f-9aed-1ba00c7db3db', title: 'Vibe O S', genre: 'Hip Hop / Bass' },
  { id: '42c37fa7-5b1e-4b6c-a3c0-2c739f44a2d4', title: 'Golden Age of Intelligence', genre: 'EDM / Metalcore' },
]

const collections = [
  {
    name: 'Featured Releases',
    description: 'Latest and greatest tracks',
    color: 'emerald',
    tracks: [
      { id: '9cbad174-9276-427f-9aed-1ba00c7db3db', title: 'Vibe O S', style: 'Hip Hop, Bass-heavy' },
      { id: '42c37fa7-5b1e-4b6c-a3c0-2c739f44a2d4', title: 'Golden Age of Intelligence', style: 'EDM, Metalcore' },
    ],
  },
  {
    name: 'Meditation & Healing',
    description: '432Hz frequencies for peace and restoration',
    color: 'violet',
    tracks: [
      // Add your meditation tracks here - using placeholder IDs for now
    ],
    playlistLink: 'https://suno.com/@frankx',
  },
  {
    name: 'Electronic & EDM',
    description: 'High energy beats and festival anthems',
    color: 'cyan',
    tracks: [],
    playlistLink: 'https://suno.com/@frankx',
  },
  {
    name: 'Orchestral & Cinematic',
    description: 'Epic scores and sweeping compositions',
    color: 'amber',
    tracks: [],
    playlistLink: 'https://suno.com/@frankx',
  },
  {
    name: 'Arcanea Collection',
    description: 'Fantasy-inspired tracks from the Arcanea universe',
    color: 'rose',
    tracks: [],
    playlistLink: 'https://suno.com/@frankx',
  },
]

const stats = [
  { value: '10K+', label: 'Songs Created' },
  { value: '12K+', label: 'Total Plays' },
  { value: '531', label: 'Public Tracks' },
  { value: '16', label: 'Playlists' },
]

// ============================================================================
// HERO
// ============================================================================

function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <Music2 className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-300">AI-Generated Music</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-white">Music by</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                FrankX
              </span>
            </h1>

            <p className="text-xl text-white/50 mb-8 max-w-lg leading-relaxed">
              10,000+ songs created with Suno AI. Ambient soundscapes, electronic beats,
              cinematic scores, and healing frequencies. Exploring the frontier of AI music.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://suno.com/@frankx"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full font-semibold transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                <Play className="w-5 h-5" />
                Full Catalog on Suno
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="/music-lab"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-7 py-4 rounded-full font-semibold transition-all hover:bg-white/5"
              >
                <Sparkles className="w-4 h-4" />
                Learn to Create
              </Link>
            </div>
          </motion.div>

          {/* Right - Featured Track Player */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-violet-500/10 blur-3xl opacity-50" />
              <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-4 overflow-hidden">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/80 mb-3 px-2">Now Playing</p>
                <iframe
                  src={`https://suno.com/embed/${featuredTracks[0].id}`}
                  className="w-full aspect-square rounded-2xl"
                  frameBorder="0"
                  allow="autoplay; clipboard-write"
                  loading="lazy"
                  title={featuredTracks[0].title}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// STATS
// ============================================================================

function StatsSection() {
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
              <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-white/40 mt-1">{stat.label}</p>
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

function FeaturedTracksSection() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Tracks</h2>
          <p className="text-lg text-white/50">Hand-picked favorites from the catalog</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {featuredTracks.map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between mb-3 px-2">
                  <div>
                    <h3 className="font-semibold text-white">{track.title}</h3>
                    <p className="text-sm text-white/40">{track.genre}</p>
                  </div>
                  <a
                    href={`https://suno.com/song/${track.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-white/60" />
                  </a>
                </div>
                <iframe
                  src={`https://suno.com/embed/${track.id}`}
                  className="w-full aspect-[2/1] rounded-xl"
                  frameBorder="0"
                  allow="autoplay; clipboard-write"
                  loading="lazy"
                  title={track.title}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// COLLECTIONS / PLAYLISTS
// ============================================================================

const colorMap: Record<string, { bg: string; border: string; icon: string }> = {
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20 hover:border-emerald-500/40', icon: 'text-emerald-400' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20 hover:border-violet-500/40', icon: 'text-violet-400' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20 hover:border-cyan-500/40', icon: 'text-cyan-400' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20 hover:border-amber-500/40', icon: 'text-amber-400' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/20 hover:border-rose-500/40', icon: 'text-rose-400' },
}

const collectionIcons = [Disc3, Heart, Radio, Volume2, Headphones]

function CollectionsSection() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Collections</h2>
          <p className="text-lg text-white/50">Organized by mood, genre, and vibe</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.slice(1).map((collection, i) => {
            const colors = colorMap[collection.color] || colorMap.emerald
            const Icon = collectionIcons[i % collectionIcons.length]

            return (
              <motion.a
                key={collection.name}
                href={collection.playlistLink || 'https://suno.com/@frankx'}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group block p-6 rounded-2xl ${colors.bg} border ${colors.border} transition-all`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-white/5 ${colors.icon}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{collection.name}</h3>
                <p className="text-white/50 text-sm">{collection.description}</p>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CTA
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want to create your own?
          </h2>
          <p className="text-xl text-white/50 mb-8 max-w-2xl mx-auto">
            Learn how to create professional AI music with Suno.
            No instruments or production experience required.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/music-lab"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              <Sparkles className="w-5 h-5" />
              Learn AI Music Creation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products/vibe-os"
              className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-white/5"
            >
              Explore Vibe OS
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN
// ============================================================================

export default function MusicPage() {
  return (
    <main className="relative min-h-screen text-white">
      <MusicBackground />

      <div className="relative z-10">
        <HeroSection />
        <StatsSection />
        <FeaturedTracksSection />
        <CollectionsSection />
        <CTASection />
      </div>
    </main>
  )
}
