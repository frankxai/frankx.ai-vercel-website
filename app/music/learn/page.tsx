'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

// ── Data ────────────────────────────────────────────────────────────────────

const INSTRUMENTS = [
  {
    name: 'Piano',
    emoji: '🎹',
    description: 'The most versatile instrument — melody and harmony in your hands. From classical to jazz to electronic production.',
    accent: 'text-rose-400',
    border: 'hover:border-rose-500/30',
    href: '/music/learn/piano',
    meta: '6 teachers · 10 songs · AI tools',
  },
  {
    name: 'Violin',
    emoji: '🎻',
    description: 'The voice of the orchestra — full of emotion and expression. Suzuki method progression from first bow to concertos.',
    accent: 'text-violet-400',
    border: 'hover:border-violet-500/30',
    href: '/music/learn/violin',
    meta: '6 teachers · 10 pieces · 5 role models',
  },
  {
    name: 'Guitar',
    emoji: '🎸',
    description: 'Three chords and the truth — the campfire instrument. Acoustic, electric, classical.',
    accent: 'text-amber-400',
    border: '',
    href: null,
    meta: 'Coming soon',
  },
  {
    name: 'Voice',
    emoji: '🎤',
    description: 'The first instrument of humanity — your own voice. Technique, range, and expression.',
    accent: 'text-emerald-400',
    border: '',
    href: null,
    meta: 'Coming soon',
  },
]

const FOUNDATIONS = [
  {
    title: 'Music Theory',
    emoji: '📐',
    description: 'Notes, scales, chords, keys, time signatures — the universal language every musician needs.',
    href: '/music/learn/theory',
    accent: 'text-cyan-400',
    border: 'hover:border-cyan-500/30',
    meta: 'Scales · Chords · Keys · Rhythm',
  },
  {
    title: 'Music Production',
    emoji: '🎛️',
    description: 'From recording to mixing to mastering. DAWs, plugins, and how to turn ideas into finished tracks.',
    href: '/music/learn/production',
    accent: 'text-orange-400',
    border: 'hover:border-orange-500/30',
    meta: 'DAWs · Recording · Mixing',
  },
]

const ECOSYSTEM = [
  {
    title: 'Create Music with AI',
    emoji: '🤖',
    description: 'Suno AI mastery, prompt engineering for music, genre techniques, and production workflows. 500+ tracks and counting.',
    href: '/music/create',
    accent: 'text-emerald-400',
    border: 'hover:border-emerald-500/30',
  },
  {
    title: 'Music Tools & Apps',
    emoji: '🛠️',
    description: 'Curated collection of 30+ apps for learning, practice, theory, sheet music, AI creation, and recording.',
    href: '/music/tools',
    accent: 'text-cyan-400',
    border: 'hover:border-cyan-500/30',
  },
]

const WHY_LEARN = [
  { icon: '🧠', title: 'Cognitive Power', desc: 'Music training strengthens working memory, attention, and executive function more than any other activity studied.' },
  { icon: '💪', title: 'Discipline That Transfers', desc: 'The daily practice habit builds resilience, patience, and focus that compound across every area of your life.' },
  { icon: '🤖', title: 'AI Amplification', desc: 'AI tools now provide real-time feedback, adaptive difficulty, and practice tracking — learning alone is no longer learning blind.' },
  { icon: '🌍', title: 'Universal Language', desc: 'Music crosses every border. A musician can connect with people anywhere in the world without sharing a spoken language.' },
  { icon: '🎯', title: 'Creative Expression', desc: 'Playing music is one of the few activities that engages analytical, emotional, and motor systems simultaneously.' },
  { icon: '📈', title: 'Lifelong Skill', desc: 'Unlike most skills, musical ability deepens with age. A 70-year-old pianist can play with more expression than a 20-year-old.' },
]

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function LearnMusicPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/30">FrankX</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Music Academy
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/50">
            Learn instruments, master music theory, create with AI, and discover the best tools — all curated by an AI Architect who builds music at scale. Structured guides. Real teachers. Free resources.
          </p>
        </motion.header>

        {/* Instruments */}
        <motion.section variants={stagger} initial="hidden" animate="visible" className="mb-16">
          <h2 className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-white/30">Learn an Instrument</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {INSTRUMENTS.map((inst) => {
              const card = (
                <motion.div
                  key={inst.name}
                  variants={fadeUp}
                  className={`group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 ${
                    inst.href
                      ? `cursor-pointer hover:bg-white/[0.06] ${inst.border}`
                      : 'opacity-35'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-4xl">{inst.emoji}</span>
                    {inst.href && <span className={`text-xs font-medium ${inst.accent}`}>→</span>}
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-white">{inst.name}</h3>
                  <p className="mt-2 text-sm text-white/50">{inst.description}</p>
                  <p className={`mt-3 text-xs font-medium ${inst.href ? inst.accent : 'text-white/20'}`}>
                    {inst.meta}
                  </p>
                </motion.div>
              )
              return inst.href ? (
                <Link key={inst.name} href={inst.href}>{card}</Link>
              ) : (
                <div key={inst.name}>{card}</div>
              )
            })}
          </div>
        </motion.section>

        {/* Foundations */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-white/30">Foundations</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {FOUNDATIONS.map((item) => (
              <Link key={item.title} href={item.href}>
                <div className={`group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:bg-white/[0.06] ${item.border}`}>
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{item.emoji}</span>
                    <span className={`text-xs font-medium ${item.accent}`}>→</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/50">{item.description}</p>
                  <p className={`mt-3 text-xs font-medium ${item.accent}`}>{item.meta}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Why Learn Music */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-white/30">Why Learn Music?</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_LEARN.map((item) => (
              <div key={item.title} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="mt-2 text-sm font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-xs text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Ecosystem Links */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-white/30">More from FrankX Music</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {ECOSYSTEM.map((item) => (
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
        </motion.section>

        {/* Navigation */}
        <div className="flex justify-center gap-6">
          <Link href="/music" className="text-sm text-white/30 hover:text-white/60 transition">
            ← Music
          </Link>
          <Link href="/music/create" className="text-sm text-emerald-400/60 hover:text-emerald-400 transition">
            Create with AI →
          </Link>
        </div>
      </div>
    </div>
  )
}
