'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  ArrowLeft,
  Play,
  Terminal,
  Music2,
  BookOpen,
  Code2,
  Leaf,
  TreePine,
  Sprout,
  Flower2,
  Sparkles,
  ChevronDown,
} from 'lucide-react'

// ── Nature-Tech Design Tokens ──────────────────────────────────────────

const nature = {
  root: '#1a0f2e',
  bark: '#2a1f3e',
  moss: '#0d3320',
  canopy: '#0a2e1f',
  stream: '#0c2d4a',
  soil: '#0F172A',
}

const glow = {
  synapse: '#AB47C7',
  data: '#43BFE3',
  growth: '#10B981',
  creation: '#F59E0B',
}

// ── ForestCanopy Background ────────────────────────────────────────────

function ForestCanopy() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Deep soil base */}
      <div className="absolute inset-0 bg-[#0a0a0b]" />

      {/* Canopy light filtering through — emerald dominant */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[80%] h-[80%]"
        style={{
          background: `radial-gradient(ellipse at 30% 40%, rgba(16, 185, 129, 0.08) 0%, rgba(10, 46, 31, 0.04) 40%, transparent 70%)`,
          filter: 'blur(100px)',
        }}
        animate={
          shouldReduceMotion ? undefined : {
            x: [0, 30, -10, 0],
            y: [0, -20, 10, 0],
          }
        }
        transition={shouldReduceMotion ? undefined : { duration: 40, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Bioluminescent glow — purple deep right */}
      <motion.div
        className="absolute top-1/3 -right-1/4 w-[60%] h-[60%]"
        style={{
          background: `radial-gradient(ellipse at center, rgba(171, 71, 199, 0.06) 0%, transparent 60%)`,
          filter: 'blur(100px)',
        }}
        animate={
          shouldReduceMotion ? undefined : {
            x: [0, -20, 10, 0],
            y: [0, 15, -10, 0],
          }
        }
        transition={shouldReduceMotion ? undefined : { duration: 35, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Stream light — cyan bottom */}
      <motion.div
        className="absolute bottom-0 left-1/4 w-[50%] h-[40%]"
        style={{
          background: `radial-gradient(ellipse at center, rgba(67, 191, 227, 0.05) 0%, transparent 60%)`,
          filter: 'blur(80px)',
        }}
        animate={
          shouldReduceMotion ? undefined : {
            x: [0, 20, -15, 0],
            scale: [1, 1.05, 0.98, 1],
          }
        }
        transition={shouldReduceMotion ? undefined : { duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle grain texture — organic feel */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

// ── Firefly Particles ──────────────────────────────────────────────────

function FireflyParticles() {
  const shouldReduceMotion = useReducedMotion()
  if (shouldReduceMotion) return null

  // Deterministic positions (no Math.random in render)
  const fireflies = [
    { left: '15%', top: '20%', delay: 0, dur: 6, size: 3 },
    { left: '75%', top: '35%', delay: 1.5, dur: 8, size: 2 },
    { left: '45%', top: '60%', delay: 3, dur: 7, size: 2.5 },
    { left: '85%', top: '15%', delay: 2, dur: 9, size: 2 },
    { left: '25%', top: '75%', delay: 4, dur: 6.5, size: 3 },
    { left: '60%', top: '45%', delay: 1, dur: 7.5, size: 2 },
    { left: '10%', top: '50%', delay: 5, dur: 8.5, size: 2.5 },
    { left: '90%', top: '70%', delay: 2.5, dur: 6, size: 2 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {fireflies.map((f, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: f.left,
            top: f.top,
            width: f.size,
            height: f.size,
            background: i % 3 === 0 ? glow.growth : i % 3 === 1 ? glow.data : glow.synapse,
            boxShadow: `0 0 ${f.size * 4}px ${i % 3 === 0 ? glow.growth : i % 3 === 1 ? glow.data : glow.synapse}`,
          }}
          animate={{
            opacity: [0, 0.8, 0.3, 0.9, 0],
            y: [0, -20, -10, -30, -40],
            x: [0, 5, -3, 8, 0],
          }}
          transition={{
            duration: f.dur,
            delay: f.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// ── Scroll Progress (vine-like) ────────────────────────────────────────

function VineProgress() {
  const { scrollYProgress } = useScroll()
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
      style={{
        background: `linear-gradient(90deg, ${glow.growth}, ${glow.data}, ${glow.synapse})`,
        scaleX: shouldReduceMotion ? 1 : scrollYProgress,
      }}
    />
  )
}

// ── Rotating Nature Words ──────────────────────────────────────────────

const natureWords = ['Grow', 'Create', 'Architect', 'Cultivate', 'Build']

function RotatingNatureWord() {
  const [index, setIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) return
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % natureWords.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [shouldReduceMotion])

  if (shouldReduceMotion) {
    return (
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">
        {natureWords[0]}
      </span>
    )
  }

  return (
    <span className="inline-block relative py-1">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"
          style={{ lineHeight: 1.3 }}
        >
          {natureWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// ── Seed Pod Stats ─────────────────────────────────────────────────────

const seedStats = [
  { value: '12K+', label: 'AI Songs', icon: Music2, color: glow.creation },
  { value: '70+', label: 'Articles', icon: BookOpen, color: glow.data },
  { value: '75+', label: 'Skills', icon: Terminal, color: glow.synapse },
  { value: '38', label: 'Agents', icon: Code2, color: glow.growth },
]

function SeedPodStats() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {seedStats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.6 + i * 0.1, duration: 0.6 }}
          className="group relative"
        >
          <div
            className="relative overflow-hidden rounded-2xl border border-white/[0.06] p-4 md:p-5 text-center transition-all duration-300 hover:border-white/[0.12]"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)`,
            }}
          >
            {/* Bioluminescent glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              style={{
                background: `radial-gradient(ellipse at 50% 100%, ${stat.color}10, transparent 70%)`,
              }}
            />

            <div className="relative z-10">
              <stat.icon
                className="w-4 h-4 mx-auto mb-2 opacity-40 group-hover:opacity-70 transition-opacity"
                style={{ color: stat.color }}
              />
              <p className="text-2xl md:text-3xl font-bold text-white mb-0.5">{stat.value}</p>
              <p className="text-[11px] text-white/40 font-medium uppercase tracking-wider">{stat.label}</p>
            </div>

            {/* Bottom glow line */}
            <div
              className="absolute bottom-0 left-1/4 right-1/4 h-[1px] opacity-0 group-hover:opacity-60 transition-opacity duration-500"
              style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ── Hero Section — Neural Tree ─────────────────────────────────────────

function NatureHero() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.7], [0, 60])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-20"
        style={shouldReduceMotion ? undefined : { opacity, y }}
      >
        <div className="max-w-4xl">
          {/* Organic breadcrumb */}
          <motion.div
            className="mb-8 md:mb-12 inline-flex items-center gap-2"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-500/60" />
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/50">
              AI Architect & Music Creator
            </span>
          </motion.div>

          {/* Headline — organic typography */}
          <motion.h1
            className="mb-6 md:mb-8"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[1.1] tracking-tight">
              <RotatingNatureWord /> <span className="text-white">what</span>
            </span>
            <span className="block text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[1.1] tracking-tight text-white">
              matters.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-lg md:text-xl text-white/50 max-w-2xl mb-8 md:mb-12 leading-relaxed"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }}
          >
            AI Architect at Oracle. Creator of 12,000+ songs with Suno.
            Building intelligent systems at the intersection of{' '}
            <span className="text-emerald-400/80">technology</span> and{' '}
            <span className="text-cyan-400/80">creativity</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-16 md:mb-20"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.4 }}
          >
            <Link
              href="/start"
              className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 text-black hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
              style={{
                background: `linear-gradient(135deg, ${glow.growth}, ${glow.data})`,
              }}
            >
              Explore My Work
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/music-lab"
              className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full font-medium text-sm sm:text-base text-white/70 hover:text-white border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
            >
              <Play className="w-4 h-4" />
              Listen to Music
            </Link>
          </motion.div>

          {/* Seed Pod Stats */}
          <SeedPodStats />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-5 h-5 text-white/20" />
      </motion.div>
    </section>
  )
}

// ── Organic Content Cards ──────────────────────────────────────────────

const contentPillars = [
  {
    icon: Terminal,
    title: 'ACOS',
    subtitle: '75+ skills, 38 agents',
    description: 'The Agentic Creator OS — orchestrate AI agents for content creation, code generation, and creative workflows.',
    href: '/acos',
    color: glow.synapse,
    element: 'Mycelium Network',
  },
  {
    icon: Music2,
    title: 'Music Lab',
    subtitle: '12,000+ AI songs',
    description: 'AI music production with Suno. Genre-fluid exploration from orchestral to electronic to experimental.',
    href: '/music-lab',
    color: glow.creation,
    element: 'Sound Garden',
  },
  {
    icon: BookOpen,
    title: 'Blog & Research',
    subtitle: '70+ articles',
    description: 'Deep dives into agentic AI, multi-agent orchestration, RAG patterns, and enterprise architecture.',
    href: '/blog',
    color: glow.data,
    element: 'Knowledge Grove',
  },
  {
    icon: Code2,
    title: 'Products',
    subtitle: 'Templates & tools',
    description: 'Design templates, prompt libraries, and AI tools built from real production workflows.',
    href: '/products',
    color: glow.growth,
    element: 'Crystal Garden',
  },
]

function OrganicCards() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Sprout className="w-5 h-5 text-emerald-400/60" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400/50">
              Ecosystem
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What grows here.
          </h2>
          <p className="text-lg text-white/40 max-w-2xl">
            Four interconnected domains — each feeding the others through shared intelligence.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {contentPillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                href={pillar.href}
                className="group relative block rounded-2xl border border-white/[0.06] overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:-translate-y-1"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                {/* Top accent line */}
                <div
                  className="h-[2px] w-full opacity-40 group-hover:opacity-80 transition-opacity"
                  style={{ background: `linear-gradient(90deg, transparent 10%, ${pillar.color}, transparent 90%)` }}
                />

                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="p-3 rounded-xl"
                      style={{ background: `${pillar.color}12` }}
                    >
                      <pillar.icon className="w-5 h-5" style={{ color: pillar.color }} />
                    </div>
                    <span className="text-[10px] font-medium text-white/20 uppercase tracking-wider flex items-center gap-1.5">
                      <Leaf className="w-3 h-3" />
                      {pillar.element}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white/95 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm font-medium mb-3" style={{ color: `${pillar.color}99` }}>
                    {pillar.subtitle}
                  </p>
                  <p className="text-sm text-white/40 leading-relaxed mb-4">
                    {pillar.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-medium text-white/30 group-hover:text-white/60 transition-colors">
                    Explore
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Bottom bioluminescent glow on hover */}
                <div
                  className="absolute bottom-0 inset-x-0 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 100%, ${pillar.color}08, transparent 70%)`,
                  }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Nature Philosophy Section ──────────────────────────────────────────

function PhilosophySection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8 }}
        >
          <Flower2 className="w-8 h-8 text-emerald-400/30 mx-auto mb-6" />

          <blockquote className="text-2xl md:text-3xl font-bold text-white/90 leading-relaxed mb-6">
            &ldquo;The best technology doesn&apos;t feel manufactured.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              It feels grown.
            </span>
            &rdquo;
          </blockquote>

          <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
            Every system in this ecosystem connects like roots beneath a forest floor —
            intelligence flows between agents, knowledge compounds across workflows,
            and creativity emerges from the network.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ── Back to Design Lab CTA ─────────────────────────────────────────────

function DesignLabCTA() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl border border-white/[0.06] p-8 md:p-12 text-center overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: `radial-gradient(ellipse at 50% 100%, ${glow.growth}08, transparent 60%), radial-gradient(ellipse at 50% 0%, ${glow.synapse}05, transparent 60%)`,
            }}
          />

          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <TreePine className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">Design Study</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              This is a living prototype.
            </h2>
            <p className="text-white/40 mb-8 max-w-xl mx-auto">
              Exploring how nature-tech aesthetics could transform the FrankX.AI experience.
              Built with real components, real data, real interactions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-black transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                style={{ background: `linear-gradient(135deg, ${glow.growth}, ${glow.data})` }}
              >
                View Current Homepage
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/design-lab/nature/variants"
                className="inline-flex items-center justify-center gap-2 bg-white/5 text-white px-8 py-3.5 rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                All Variants
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────

export default function HomepageNatureVariant() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      <ForestCanopy />
      <FireflyParticles />
      <VineProgress />

      <div className="relative z-10">
        <NatureHero />
        <OrganicCards />
        <PhilosophySection />
        <DesignLabCTA />
      </div>
    </main>
  )
}
