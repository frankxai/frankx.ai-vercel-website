'use client'

import { motion } from 'framer-motion'
import { Headphones, Music2, Radio, Sparkles } from 'lucide-react'

// Spotify track/playlist IDs for embedded players
const spotifyTracks = [
  {
    id: '4iV5W9uYEdYUVa79Axb7Rh', // Example - replace with real track IDs
    type: 'track' as const,
    title: 'Vibe OS Theme',
  },
]

const spotifyPlaylists = [
  {
    id: '37i9dQZF1DXcBWIGoYBM5M', // Example - replace with real playlist
    title: 'Focus Flow',
    description: 'Deep concentration music for creative sessions',
  },
]

interface ImmersiveMusicSectionProps {
  variant?: 'tech' | 'soul'
}

export default function ImmersiveMusicSection({ variant = 'tech' }: ImmersiveMusicSectionProps) {
  const accentColor = variant === 'tech' ? 'emerald' : 'amber'

  return (
    <section className="py-16 md:py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${accentColor}-500/10 border border-${accentColor}-500/20 text-${accentColor}-400 text-sm font-medium mb-6`}>
            <Headphones className="w-4 h-4" />
            Immersive Audio
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Experience the Sound
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Listen to curated playlists and tracks designed for creative flow, deep focus, and creative immersion.
          </p>
        </motion.div>

        {/* Featured Suno Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2.5 rounded-xl bg-${accentColor}-500/10`}>
                <Music2 className={`w-5 h-5 text-${accentColor}-400`} />
              </div>
              <div>
                <h3 className="font-semibold text-white">Featured: Vibe OS Collection</h3>
                <p className="text-sm text-white/50">AI-generated soundscapes with Suno</p>
              </div>
            </div>

            {/* Suno Embed */}
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-emerald-500/5 via-cyan-500/5 to-purple-500/5">
              <iframe
                src="https://suno.com/embed/9cbad174-9276-427f-9aed-1ba00c7db3db"
                className="w-full h-[320px] md:h-[400px]"
                frameBorder="0"
                allow="autoplay; clipboard-write"
                loading="lazy"
                title="Vibe OS - AI Generated Music"
              />
            </div>
          </div>
        </motion.div>

        {/* Spotify Embeds Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Ambient Focus Playlist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/[0.02] border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Radio className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Creative Focus</h3>
                <p className="text-xs text-white/50">Curated for deep work sessions</p>
              </div>
            </div>
            {/* Spotify Embed */}
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DX3rxVfibe1L0?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify - Creative Focus Playlist"
            />
          </motion.div>

          {/* Ambient Chill Playlist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/[0.02] border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Creative Immersion</h3>
                <p className="text-xs text-white/50">Ambient soundscapes for meditation</p>
              </div>
            </div>
            {/* Spotify Embed */}
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DWZqd5JICZI0u?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify - Ambient Chill Playlist"
            />
          </motion.div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-white/40 text-sm">
            Full Suno library available at{' '}
            <a
              href="https://suno.com/@frankx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              suno.com/@frankx
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
