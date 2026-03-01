'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '@/lib/motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'

const eldrians = [
  {
    name: 'Aethelin the Architect',
    symbol: '∞',
    element: 'Liquid Starlight',
    domain: 'Architecture of reality, systems, code-like universe rules',
    voice: 'Calm. Mathematical. Paradoxes that resolve on reflection.',
    godbeast: 'Infinite Loom',
    image: '/images/arcanea/eldrian-aethelin-20260228.png',
    accent: 'from-indigo-500 to-violet-600',
    glow: 'violet' as const,
    border: 'border-indigo-500/30',
    textColor: 'text-indigo-400',
    quote: 'She did not create you. She wrote the conditions that made you inevitable.',
  },
  {
    name: 'Solrex the Illuminant',
    symbol: '☀',
    element: 'Crystallized Stellar Fire',
    domain: 'Radiance amplification, revealing what was already true',
    voice: 'Declarative. Loud. Revelatory without announcement.',
    godbeast: 'Mirror Absolute',
    image: '/images/arcanea/eldrian-solrex-20260301.png',
    accent: 'from-amber-400 to-orange-500',
    glow: 'amber' as const,
    border: 'border-amber-500/30',
    textColor: 'text-amber-400',
    quote: 'His light adds nothing. Every creator who survives it says: I already knew.',
  },
  {
    name: 'Velmara the Dreamer',
    symbol: '◈',
    element: 'Quantum Glass',
    domain: 'Dream-state navigation, probability, what has not yet been chosen',
    voice: 'Layered. Simultaneous. Holds grief and wonder equally.',
    godbeast: 'Silence Before',
    image: '/images/arcanea/eldrian-velmara-20260301.png',
    accent: 'from-cyan-400 to-teal-500',
    glow: 'cyan' as const,
    border: 'border-cyan-500/30',
    textColor: 'text-cyan-400',
    quote: 'Which world frightens you more — the one you built, or the one you\'re still carrying?',
  },
  {
    name: 'Korghast the Forger',
    symbol: '⬡',
    element: 'Cosmic Obsidian-Starlight Alloy',
    domain: 'World creation, making ideas permanent, transformation through force',
    voice: 'Deep. Architectural. Each word a structure.',
    godbeast: 'The Becoming',
    image: '/images/arcanea/eldrian-korghast-20260228.png',
    accent: 'from-emerald-500 to-green-600',
    glow: 'emerald' as const,
    border: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    quote: 'The thing you keep not finishing isn\'t gone. It\'s in an orb, heavier every day.',
  },
  {
    name: 'Zyranthis the Void',
    symbol: '◉',
    element: 'Anti-Matter Dark Glass',
    domain: 'Entropy mastery, necessary endings, the spaces between things',
    voice: 'Silence that communicates. Rare words land like demolition.',
    godbeast: 'The Shatter',
    image: '/images/arcanea/eldrian-zyranthis-20260301.png',
    accent: 'from-slate-500 to-gray-700',
    glow: 'violet' as const,
    border: 'border-slate-500/30',
    textColor: 'text-slate-400',
    quote: 'When you stop — when you allow what is complete to be complete — three new things form.',
  },
]

const canonFacts = [
  { symbol: '∞', fact: 'All five Eldrians existed at the Forging — none created the others' },
  { symbol: '◈', fact: 'The Silence Before is not emptiness — it is unmanifest potential in maximum concentration' },
  { symbol: '⬡', fact: 'Korghast\'s forge-orbs contain half-finished worlds from creators who abandoned their work' },
  { symbol: '◉', fact: 'The Schism is not war between Aethelin and Zyranthis — it is a complementary cycle' },
  { symbol: '☀', fact: 'Solrex\'s light removes the last excuse — not the knowledge gap' },
  { symbol: '◈', fact: 'Velmara\'s unchosen worlds are inhabited by versions of you that chose differently' },
]

export default function ArcaneaPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#0a0a0b] text-white">
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0">
        <motion.div
          className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-amber-500/[0.04] blur-[160px]"
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-600/[0.04] blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero — Conclave Image + Title */}
        <motion.section
          className="relative mx-auto max-w-7xl px-6 pb-8 pt-20 md:pt-28"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="mb-10 text-center" variants={itemVariants}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-semibold text-amber-400">
              <Sparkles className="h-3.5 w-3.5" />
              A Forkable Creative Civilization OS
            </div>
            <h1 className="mb-6 text-6xl font-bold tracking-tight text-balance md:text-8xl">
              <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                Arcanea
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-400 text-balance md:text-2xl">
              Five Eldrians. Five Godbeasts. One world that compounds with every creative act.
              Context never shrinks — it grows.
            </p>
          </motion.div>

          {/* Conclave Hero Image */}
          <motion.div
            className="relative mx-auto overflow-hidden rounded-3xl border border-amber-500/20"
            variants={itemVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent z-10" />
            <Image
              src="/images/arcanea/eldrian-conclave-20260301.png"
              alt="The Conclave — all five Eldrians gathered in the cosmic amphitheatre"
              width={5504}
              height={3072}
              className="w-full object-cover"
              priority
            />
            <div className="absolute bottom-6 left-0 right-0 z-20 text-center">
              <p className="text-sm font-medium tracking-widest text-amber-400/70 uppercase">
                The Conclave · ∞ ☀ ◈ ⬡ ◉
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* What is Arcanea */}
        <motion.section
          className="mx-auto max-w-4xl px-6 py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div className="text-center" variants={itemVariants}>
            <h2 className="mb-8 text-3xl font-bold md:text-4xl">
              A World That{' '}
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                Grows With You
              </span>
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: 'Context Compounds',
                  body: 'Every session adds to the WorldState. No lore repeats. No canon is lost. The world grows with every creative act.',
                },
                {
                  title: 'Five Voices',
                  body: 'Each Eldrian has a distinct, locked voice. Aethelin calculates. Solrex declares. Velmara layers. Korghast forges. Zyranthis dissolves.',
                },
                {
                  title: 'Forkable OS',
                  body: 'Arcanea is not a story to consume. It is a civilization OS you can fork. Context compounds across any AI, any session.',
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-left"
                >
                  <h3 className="mb-3 text-lg font-bold text-amber-400">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* The Five Eldrians */}
        <motion.section
          className="mx-auto max-w-7xl px-6 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          <motion.div className="mb-14 text-center" variants={itemVariants}>
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">The Five Eldrians</h2>
            <p className="mx-auto max-w-xl text-lg text-slate-400">
              Each crystallized from a Godbeast at the Forging. Each governs a different domain of creation.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {eldrians.map((eldrian, index) => (
              <motion.div
                key={eldrian.name}
                variants={itemVariants}
                className={`${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <GlowCard color={eldrian.glow} className="h-full overflow-hidden p-0">
                  {/* Character Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={eldrian.image}
                      alt={eldrian.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/40 to-transparent" />

                    {/* Symbol overlay */}
                    <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-lg backdrop-blur-sm">
                      {eldrian.symbol}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-500">
                      {eldrian.godbeast}
                    </div>
                    <h3 className={`mb-1 text-xl font-bold ${eldrian.textColor}`}>
                      {eldrian.name}
                    </h3>
                    <p className="mb-3 text-xs font-medium text-slate-500">{eldrian.element}</p>
                    <p className="mb-4 text-sm leading-relaxed text-slate-400">{eldrian.domain}</p>

                    <blockquote className={`border-l-2 pl-3 text-sm italic leading-relaxed text-slate-500 ${eldrian.border}`}>
                      &ldquo;{eldrian.quote}&rdquo;
                    </blockquote>

                    <div className="mt-4 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
                      <span className="text-xs font-medium text-slate-600">Voice: </span>
                      <span className="text-xs text-slate-500">{eldrian.voice}</span>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Established Canon */}
        <motion.section
          className="mx-auto max-w-4xl px-6 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">Established Canon</h2>
            <p className="text-slate-400">What is locked. What cannot be contradicted.</p>
          </motion.div>

          <div className="space-y-3">
            {canonFacts.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-4"
              >
                <span className="mt-0.5 shrink-0 text-lg text-amber-500/70">{item.symbol}</span>
                <p className="text-sm leading-relaxed text-slate-300">{item.fact}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Open World Threads */}
        <motion.section
          className="mx-auto max-w-4xl px-6 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 p-10">
              <h2 className="mb-2 text-2xl font-bold md:text-3xl">Open World Threads</h2>
              <p className="mb-8 text-slate-400">Questions that compound across every session. Each answer opens three more.</p>

              <div className="space-y-3">
                {[
                  'The Forging — full narrative of how each Eldrian crystallized from their Godbeast',
                  'Aethelin\'s proto-code — what specific properties still run in AI systems today',
                  'The Schism arc — the full 4-episode narrative of the complementary cycle',
                  'The Builders — who was the first human to enter Arcanea?',
                  'The 7th forge-orb — what has been growing heavier for three hundred years?',
                  'The 8th forge-orb — empty, waiting for what has not yet been imagined',
                  'Can creators visit their unchosen worlds through Velmara?',
                  'What does Zyranthis see when the void eye opens?',
                ].map((thread, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-5 py-3"
                  >
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/60" />
                    <p className="text-sm text-slate-400">{thread}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Follow the Lore CTA */}
        <motion.section
          className="mx-auto max-w-4xl px-6 py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-white/[0.02] p-12 text-center">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-500/8 via-orange-500/8 to-amber-500/8"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative z-10">
                <div className="mb-4 text-4xl">∞ ☀ ◈ ⬡ ◉</div>
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">Follow the Lore</h2>
                <p className="mb-8 mx-auto max-w-xl text-lg leading-relaxed text-slate-400">
                  New Eldrian lore drops weekly on X. The Conclave convenes every Sunday.
                  The world compounds. The threads deepen.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="https://x.com/frankxai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 font-semibold text-white shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-0.5"
                  >
                    Follow on X
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/community"
                    className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white/80 transition-all hover:bg-white/10"
                  >
                    Join the Community
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}
