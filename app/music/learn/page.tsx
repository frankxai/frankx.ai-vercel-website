'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const INSTRUMENTS = [
  {
    name: 'Piano',
    emoji: '🎹',
    description: 'The most versatile instrument — melody and harmony in your hands.',
    accent: 'text-rose-400',
    href: '/music/learn/piano',
  },
  {
    name: 'Violin',
    emoji: '🎻',
    description: 'The voice of the orchestra — full of emotion and expression.',
    accent: 'text-violet-400',
    href: '/music/learn/violin',
  },
  {
    name: 'Guitar',
    emoji: '🎸',
    description: 'Three chords and the truth — the campfire instrument.',
    accent: 'text-amber-400',
    href: null,
  },
  {
    name: 'Voice',
    emoji: '🎤',
    description: 'The first instrument of humanity — your own voice.',
    accent: 'text-emerald-400',
    href: null,
  },
]

const EXPLORE_MORE = [
  {
    title: 'Create Music with AI',
    emoji: '🤖',
    description: 'Learn to create professional AI music with Suno. Prompt engineering, genre techniques, and production workflows.',
    href: '/music/create',
    accent: 'text-emerald-400',
    border: 'hover:border-emerald-500/30',
  },
  {
    title: 'Music Tools & Apps',
    emoji: '🛠️',
    description: 'Curated collection of the best apps, DAWs, and AI tools for modern musicians.',
    href: '/music/tools',
    accent: 'text-cyan-400',
    border: 'hover:border-cyan-500/30',
  },
]

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function LearnMusicPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Learn Music
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
            Curated resources for learning instruments — the best teachers, free sheet music, AI-powered practice tools, and structured guides. For beginners and beyond.
          </p>
        </motion.header>

        {/* Instruments Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2"
        >
          {INSTRUMENTS.map((inst) => {
            const card = (
              <motion.div
                key={inst.name}
                variants={fadeUp}
                className={`group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 ${
                  inst.href
                    ? 'cursor-pointer hover:border-white/20 hover:bg-white/[0.06]'
                    : 'opacity-40'
                }`}
              >
                <span className="text-4xl">{inst.emoji}</span>
                <h2 className="mt-3 text-xl font-bold text-white">{inst.name}</h2>
                <p className="mt-2 text-sm text-white/60">{inst.description}</p>
                {inst.href ? (
                  <p className={`mt-4 text-sm font-medium ${inst.accent}`}>
                    Teachers, songs, sheet music →
                  </p>
                ) : (
                  <p className="mt-4 text-xs text-white/30">Coming soon</p>
                )}
              </motion.div>
            )

            return inst.href ? (
              <Link key={inst.name} href={inst.href}>{card}</Link>
            ) : (
              <div key={inst.name}>{card}</div>
            )
          })}
        </motion.div>

        {/* Explore More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h2 className="mb-6 text-center text-lg font-bold text-white/40 uppercase tracking-widest">
            Explore More
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {EXPLORE_MORE.map((item) => (
              <Link key={item.title} href={item.href}>
                <div className={`group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:bg-white/[0.06] ${item.border}`}>
                  <span className="text-3xl">{item.emoji}</span>
                  <h3 className="mt-3 text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/50">{item.description}</p>
                  <p className={`mt-3 text-sm font-medium ${item.accent}`}>Explore →</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="mt-12 flex justify-center gap-6">
          <Link href="/music" className="text-sm text-white/40 hover:text-white/60 transition">
            ← Back to Music
          </Link>
          <Link href="/music/create" className="text-sm text-emerald-400/60 hover:text-emerald-400 transition">
            Create with AI →
          </Link>
        </div>
      </div>
    </div>
  )
}
