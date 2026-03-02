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
  Disc3,
  Waves,
  Globe,
  Zap,
  Music,
  Flame,
  BookOpen,
  ListMusic,
} from 'lucide-react'
import {
  getTopTracks,
  getAlbums,
  getAlbumTracks,
  getMusicStats,
  type Track,
} from '@/lib/music'
import { usePlayer } from '@/lib/player-context'
import TrackCard from '@/components/music/TrackCard'

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
  const { playTrack } = usePlayer()

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
              <button
                onClick={() => heroTrack && playTrack(heroTrack, topTracks)}
                className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full font-semibold transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-95"
              >
                <Play className="w-5 h-5" />
                Play Top Tracks
              </button>
              <a
                href={musicStats.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-7 py-4 rounded-full font-semibold transition-all hover:bg-white/5"
              >
                Full Catalog on Suno
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {heroTrack && (
              <TrackCard track={heroTrack} variant="featured" queue={topTracks} />
            )}
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
              <p className="text-3xl md:text-4xl font-bold text-white tabular-nums">{stat.value}</p>
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
  const { playQueue } = usePlayer()

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex items-end justify-between"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Top Tracks</h2>
            <p className="text-lg text-white/50">Most played tracks from the catalog</p>
          </div>
          <button
            onClick={() => playQueue(topTracks)}
            className="hidden items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 transition-all hover:bg-emerald-500/20 sm:inline-flex"
          >
            <ListMusic className="h-4 w-4" />
            Play All
          </button>
        </motion.div>

        <div className="space-y-2">
          {topTracks.map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <TrackCard track={track} queue={topTracks} />
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
  const { playQueue } = usePlayer()

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
            const previewTracks = albumTracks.slice(0, 4)

            return (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Album Header */}
                <div className="flex items-start justify-between mb-4">
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
                    {albumTracks.length > 0 && (
                      <button
                        onClick={() => playQueue(albumTracks)}
                        className="hidden items-center gap-2 text-sm text-white/50 hover:text-white transition-colors sm:flex"
                      >
                        <Play className="w-4 h-4" />
                        Play all
                      </button>
                    )}
                    {album.playlistUrl && (
                      <a
                        href={album.playlistUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                      >
                        Suno playlist
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Track List */}
                {previewTracks.length > 0 ? (
                  <div className="space-y-1.5">
                    {previewTracks.map((track) => (
                      <TrackCard key={track.id} track={track} queue={albumTracks} />
                    ))}
                  </div>
                ) : (
                  <div className={`rounded-xl border ${colors.border} ${colors.bg} p-8 text-center`}>
                    <p className="text-white/40">Tracks coming soon</p>
                  </div>
                )}

                {/* Show remaining track count */}
                {albumTracks.length > 4 && (
                  <p className="mt-3 text-sm text-white/30 text-center">
                    + {albumTracks.length - 4} more tracks in this album
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
