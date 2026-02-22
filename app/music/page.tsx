'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
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
  Globe,
  Zap,
  Waves,
  Music,
  Flame,
  BookOpen,
  ShoppingBag,
} from 'lucide-react'
import {
  getTopTracks,
  getAlbums,
  getAlbumTracks,
  getMusicStats,
  type Track,
  type Album,
} from '@/lib/music'

// ============================================================================
// DATA FROM LIB
// ============================================================================

const topTracks = getTopTracks(6)
const albums = getAlbums()
const musicStats = getMusicStats()

const stats = [
  { value: `${musicStats.totalTracks}+`, label: 'Public Tracks' },
  { value: String(musicStats.followers), label: 'Followers' },
  { value: String(musicStats.totalPlays), label: 'Total Plays' },
  { value: String(musicStats.albums), label: 'Albums' },
]

// ============================================================================
// BACKGROUND
// ============================================================================

function MusicBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0a0a0b]" />

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
// HERO
// ============================================================================

function HeroSection() {
  const heroTrack = topTracks[0]
  return (
    <section className="relative pt-32 pb-16 px-6">
      {/* Echo — Sound Weaver character accent */}
      <div className="pointer-events-none absolute right-6 top-20 hidden w-48 opacity-15 lg:block xl:w-56">
        <Image src="/images/team/echo-leopard.png" alt="" width={224} height={224} className="object-contain" aria-hidden="true" />
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 items-center">
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
              {musicStats.totalTracks}+ published tracks on Suno AI. From healing frequencies and orchestral epics
              to tech house and hip hop. {musicStats.albums} albums, {musicStats.followers} followers, and counting.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={musicStats.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full font-semibold transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                <Play className="w-5 h-5" />
                Full Catalog on Suno
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="/music/brainstorm"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-7 py-4 rounded-full font-semibold transition-all hover:bg-white/5"
              >
                <Sparkles className="w-4 h-4" />
                Brainstorm Ideas
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-violet-500/10 blur-3xl opacity-50" />
              <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-4 overflow-hidden">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/80 mb-3 px-2">Now Playing</p>
                {heroTrack?.sunoId && (
                  <iframe
                    src={`https://suno.com/embed/${heroTrack.sunoId}`}
                    className="w-full aspect-square rounded-2xl"
                    frameBorder="0"
                    allow="autoplay; clipboard-write"
                    loading="lazy"
                    title={heroTrack.title}
                  />
                )}
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
// FEATURED TRACKS (data-driven)
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Top Tracks</h2>
          <p className="text-lg text-white/50">Most played tracks from the catalog</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {topTracks.map((track, i) => (
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
                    <p className="text-sm text-white/40">
                      {track.genre?.join(' / ') || 'Mixed'}
                      {track.plays ? ` · ${track.plays} plays` : ''}
                    </p>
                  </div>
                  {track.sunoId && (
                    <a
                      href={`https://suno.com/song/${track.sunoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-white/60" />
                    </a>
                  )}
                </div>
                {track.sunoId && (
                  <iframe
                    src={`https://suno.com/embed/${track.sunoId}`}
                    className="w-full aspect-[2/1] rounded-xl"
                    frameBorder="0"
                    allow="autoplay; clipboard-write"
                    loading="lazy"
                    title={track.title}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// ALBUMS (data-driven)
// ============================================================================

const colorMap: Record<string, { bg: string; border: string; icon: string; badge: string }> = {
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20 hover:border-emerald-500/40', icon: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20 hover:border-violet-500/40', icon: 'text-violet-400', badge: 'bg-violet-500/20 text-violet-300' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20 hover:border-cyan-500/40', icon: 'text-cyan-400', badge: 'bg-cyan-500/20 text-cyan-300' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20 hover:border-amber-500/40', icon: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/20 hover:border-rose-500/40', icon: 'text-rose-400', badge: 'bg-rose-500/20 text-rose-300' },
}

const albumIconMap: Record<string, typeof Disc3> = {
  amber: Waves,
  rose: Globe,
  violet: Music,
  cyan: Zap,
  emerald: Flame,
}

function AlbumsSection() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Albums</h2>
          <p className="text-lg text-white/50">Curated collections organized by genre and mood</p>
        </motion.div>

        <div className="space-y-12">
          {albums.map((album, i) => {
            const colors = colorMap[album.color] || colorMap.emerald
            const Icon = albumIconMap[album.color] || Disc3
            const albumTracks = getAlbumTracks(album.id)
            const previewTracks = albumTracks.slice(0, 3)

            return (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Album Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${colors.bg} ${colors.icon}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold text-white">{album.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${colors.badge}`}>
                          {albumTracks.length} tracks
                        </span>
                      </div>
                      <p className="text-white/50 text-sm">{album.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {album.playlistUrl && (
                      <a
                        href={album.playlistUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                      >
                        Full playlist
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Track Grid */}
                {previewTracks.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {previewTracks.map((track) => (
                      <div
                        key={track.id}
                        className={`rounded-xl border ${colors.border} ${colors.bg} p-3 transition-all`}
                      >
                        <div className="flex items-center justify-between mb-2 px-1">
                          <div>
                            <p className="text-sm font-medium text-white">{track.title}</p>
                            <p className="text-xs text-white/40">{track.genre?.join(', ') || album.genre}</p>
                          </div>
                          {track.sunoId && (
                            <a
                              href={`https://suno.com/song/${track.sunoId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                            >
                              <ExternalLink className="w-3 h-3 text-white/40" />
                            </a>
                          )}
                        </div>
                        {track.sunoId && (
                          <iframe
                            src={`https://suno.com/embed/${track.sunoId}`}
                            className="w-full aspect-[16/9] rounded-lg"
                            frameBorder="0"
                            allow="autoplay; clipboard-write"
                            loading="lazy"
                            title={track.title}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`rounded-xl border ${colors.border} ${colors.bg} p-8 text-center`}>
                    <p className="text-white/40">Tracks coming soon</p>
                  </div>
                )}

                {/* Show remaining track count */}
                {albumTracks.length > 3 && (
                  <p className="mt-3 text-sm text-white/30 text-center">
                    + {albumTracks.length - 3} more tracks in this album
                  </p>
                )}
              </motion.div>
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
              href="/music/brainstorm"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              <Sparkles className="w-5 h-5" />
              Brainstorm New Ideas
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/music-lab"
              className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-white/5"
            >
              <BookOpen className="w-4 h-4" />
              Learn AI Music Creation
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
        <AlbumsSection />
        <CTASection />
      </div>
    </main>
  )
}
