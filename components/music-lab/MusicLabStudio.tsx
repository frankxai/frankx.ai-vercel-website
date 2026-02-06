'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Music2,
  Sparkles,
  Sliders,
  Disc3,
  Radio,
  Headphones,
  ArrowRight,
  ExternalLink,
  Wand2,
  Layers,
  Volume2,
} from 'lucide-react'

/**
 * Music Lab V3: Studio Aesthetic
 *
 * DJ booth / production studio inspired design with
 * knobs, faders, and professional audio interface feel
 */

const genres = [
  { name: 'Ambient', tracks: 120, color: 'from-violet-500 to-indigo-500' },
  { name: 'Electronic', tracks: 95, color: 'from-cyan-500 to-blue-500' },
  { name: 'Cinematic', tracks: 78, color: 'from-amber-500 to-orange-500' },
  { name: 'Lo-Fi', tracks: 65, color: 'from-emerald-500 to-teal-500' },
  { name: 'Healing', tracks: 82, color: 'from-pink-500 to-rose-500' },
  { name: 'Synthwave', tracks: 60, color: 'from-purple-500 to-pink-500' },
]

const stats = [
  { label: 'Total Songs', value: '500+', icon: Music2 },
  { label: 'Genres', value: '12', icon: Disc3 },
  { label: 'Hours of Music', value: '25+', icon: Radio },
  { label: 'Active Listeners', value: '5K+', icon: Headphones },
]

export default function MusicLabStudio() {
  return (
    <main className="min-h-screen bg-[#0c0c0c] text-white">
      {/* Studio Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(120,0,200,0.08),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,_rgba(0,200,200,0.05),_transparent_50%)]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Hero */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 mb-8 font-mono text-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-white/70">STUDIO ACTIVE</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              MUSIC LAB
            </h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
              AI-powered music production. 500+ tracks across ambient, electronic, cinematic, and healing frequencies.
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/10 text-center"
              >
                <stat.icon className="w-6 h-6 mx-auto mb-3 text-white/40" />
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-white/40">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Studio Console */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 p-8 md:p-12"
          >
            {/* Console Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
                  <Sliders className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Genre Console</h2>
                  <p className="text-white/50">Browse by category</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-rose-500" />
              </div>
            </div>

            {/* Genre Faders */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {genres.map((genre, i) => (
                <motion.div
                  key={genre.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="relative h-48 bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all cursor-pointer">
                    {/* Fader track */}
                    <div className="absolute inset-x-4 top-8 bottom-16 bg-white/5 rounded-full" />
                    {/* Fader fill */}
                    <motion.div
                      className={`absolute inset-x-4 bottom-16 bg-gradient-to-t ${genre.color} rounded-full`}
                      style={{ height: `${(genre.tracks / 150) * 100}%` }}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${(genre.tracks / 150) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                    />
                    {/* Fader knob */}
                    <div
                      className="absolute inset-x-2 w-8 h-4 mx-auto bg-white rounded-sm shadow-lg"
                      style={{ bottom: `calc(${(genre.tracks / 150) * 100}% + 3rem)` }}
                    />
                    {/* Label */}
                    <div className="absolute bottom-4 inset-x-0 text-center">
                      <p className="font-medium text-sm">{genre.name}</p>
                      <p className="text-xs text-white/40">{genre.tracks} tracks</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Production Process */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">The Production Process</h2>
            <p className="text-white/50">How AI music is created</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Wand2,
                title: 'Prompt Design',
                description: 'Craft detailed prompts with genre, mood, instruments, and production style.',
              },
              {
                icon: Layers,
                title: 'Generation',
                description: 'AI processes the prompt and generates full songs with vocals, instruments, and mixing.',
              },
              {
                icon: Volume2,
                title: 'Refinement',
                description: 'Iterate on generations, extend sections, and fine-tune the final output.',
              },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-pink-500/10 via-violet-500/10 to-cyan-500/10 border border-white/10 p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Master AI Music Production
            </h2>
            <p className="text-white/50 mb-8 max-w-xl mx-auto">
              Get the complete system: 50+ genre prompts, emotion mapping, and production workflows.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/products/vibe-os"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all"
              >
                <Sparkles className="w-5 h-5" />
                Get Vibe OS
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
          </motion.div>
        </div>
      </section>
    </main>
  )
}
