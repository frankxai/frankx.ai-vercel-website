'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Shuffle,
  Repeat,
  Music2,
  Sparkles,
  ExternalLink,
  ArrowRight,
} from 'lucide-react'
import { useState } from 'react'

/**
 * Music Lab V2: Player-Centric Design
 *
 * Large waveform visualization, prominent player controls,
 * and album art focus like Spotify/Apple Music
 */

const featuredTracks = [
  {
    id: 1,
    title: 'Aurora Dreams',
    genre: 'Ambient Electronic',
    duration: '3:42',
    plays: '12.4K',
    gradient: 'from-violet-500 to-pink-500',
  },
  {
    id: 2,
    title: 'Digital Horizons',
    genre: 'Cinematic',
    duration: '4:15',
    plays: '8.9K',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    id: 3,
    title: 'Healing Frequencies',
    genre: '432Hz Meditation',
    duration: '5:30',
    plays: '15.2K',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: 4,
    title: 'Neon Nights',
    genre: 'Synthwave',
    duration: '3:58',
    plays: '7.1K',
    gradient: 'from-pink-500 to-orange-500',
  },
]

// Pre-computed waveform heights using deterministic formula (pure, no Math.random)
const WAVEFORM_HEIGHTS = Array.from({ length: 50 }, (_, i) => 20 + ((i * 37 + 13) % 60))

export default function MusicLabPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(featuredTracks[0])

  // Deterministic waveform heights (avoids impure Math.random during render)
  const waveformHeights = WAVEFORM_HEIGHTS

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0510] via-[#0f0a1a] to-[#0a0510] text-white">
      {/* Hero Player */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Album Art */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square max-w-lg mx-auto lg:mx-0"
            >
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${currentTrack.gradient} blur-3xl opacity-30`} />
              <div className={`relative rounded-3xl bg-gradient-to-br ${currentTrack.gradient} p-1`}>
                <div className="rounded-3xl bg-black/40 backdrop-blur-xl p-8 aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <Music2 className="w-24 h-24 mx-auto mb-6 opacity-60" />
                    <p className="text-2xl font-bold">{currentTrack.title}</p>
                    <p className="text-white/50">{currentTrack.genre}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Player Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span className="text-sm text-pink-300">AI Music Creation</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Music Lab
              </h1>
              <p className="text-xl text-white/50 mb-8">
                500+ AI-generated songs exploring ambient, electronic, cinematic, and healing frequencies.
              </p>

              {/* Waveform */}
              <div className="h-20 mb-8 flex items-center gap-1">
                {waveformHeights.map((height, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-pink-500 to-violet-500 rounded-full"
                    animate={{
                      height: isPlaying
                        ? `${height}%`
                        : '40%',
                    }}
                    transition={{
                      duration: 0.2,
                      repeat: isPlaying ? Infinity : 0,
                      repeatType: 'reverse',
                    }}
                    style={{ height: '40%' }}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mb-8">
                <button className="text-white/50 hover:text-white transition-colors">
                  <Shuffle className="w-5 h-5" />
                </button>
                <button className="text-white/50 hover:text-white transition-colors">
                  <SkipBack className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 transition-transform"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7" />
                  ) : (
                    <Play className="w-7 h-7 ml-1" />
                  )}
                </button>
                <button className="text-white/50 hover:text-white transition-colors">
                  <SkipForward className="w-6 h-6" />
                </button>
                <button className="text-white/50 hover:text-white transition-colors">
                  <Repeat className="w-5 h-5" />
                </button>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-4 text-sm text-white/50">
                <span>1:24</span>
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-gradient-to-r from-pink-500 to-violet-500 rounded-full" />
                </div>
                <span>{currentTrack.duration}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Track List */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Featured Tracks</h2>
          <div className="space-y-2">
            {featuredTracks.map((track, index) => (
              <motion.button
                key={track.id}
                onClick={() => setCurrentTrack(track)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                  currentTrack.id === track.id
                    ? 'bg-white/10'
                    : 'hover:bg-white/5'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${track.gradient} flex items-center justify-center`}>
                  {currentTrack.id === track.id && isPlaying ? (
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-white rounded-full"
                          animate={{ height: ['8px', '16px', '8px'] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">{track.title}</p>
                  <p className="text-sm text-white/50">{track.genre}</p>
                </div>
                <span className="text-sm text-white/50">{track.plays}</span>
                <span className="text-sm text-white/40">{track.duration}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Create your own AI music
          </h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            Learn the exact system behind 500+ songs with Vibe OS.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products/vibe-os"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Explore Vibe OS
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://suno.com/@frankx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 font-medium hover:bg-white/5 transition-all"
            >
              Listen on Suno
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
