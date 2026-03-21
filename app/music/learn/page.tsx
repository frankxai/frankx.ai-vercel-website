'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const INSTRUMENTS = [
  {
    name: 'Piano',
    emoji: '🎹',
    description: 'The most versatile instrument — melody and harmony in your hands.',
    gradient: 'from-slate-800 to-slate-900',
    border: 'border-white/10',
    href: '/music/learn/piano',
  },
  {
    name: 'Violin',
    emoji: '🎻',
    description: 'The voice of the orchestra — full of emotion and expression.',
    gradient: 'from-slate-800 to-slate-900',
    border: 'border-white/10',
    href: '/music/learn/violin',
  },
  {
    name: 'Guitar',
    emoji: '🎸',
    description: 'Three chords and the truth — the campfire instrument.',
    gradient: 'from-slate-800 to-slate-900',
    border: 'border-white/10',
    href: null,
  },
  {
    name: 'Voice',
    emoji: '🎤',
    description: 'The first instrument of humanity — your own voice.',
    gradient: 'from-slate-800 to-slate-900',
    border: 'border-white/10',
    href: null,
  },
]

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
            Curated resources for learning instruments — the best teachers, sheet music sources, and practice guides. For beginners and beyond.
          </p>
        </motion.header>

        <div className="grid gap-6 sm:grid-cols-2">
          {INSTRUMENTS.map((inst) => {
            const content = (
              <div
                key={inst.name}
                className={`group rounded-2xl border ${inst.border} bg-gradient-to-br ${inst.gradient} p-6 transition-all duration-300 ${
                  inst.href ? 'cursor-pointer hover:border-white/20 hover:bg-white/[0.04]' : 'opacity-40'
                }`}
              >
                <span className="text-4xl">{inst.emoji}</span>
                <h2 className="mt-3 text-xl font-bold text-white">{inst.name}</h2>
                <p className="mt-2 text-sm text-white/60">{inst.description}</p>
                {inst.href ? (
                  <p className="mt-4 text-sm font-medium text-blue-400">Explore →</p>
                ) : (
                  <p className="mt-4 text-xs text-white/30">Coming soon</p>
                )}
              </div>
            )

            return inst.href ? (
              <Link key={inst.name} href={inst.href}>{content}</Link>
            ) : (
              <div key={inst.name}>{content}</div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/music" className="text-sm text-white/40 hover:text-white/60">
            ← Back to Music
          </Link>
        </div>
      </div>
    </div>
  )
}
