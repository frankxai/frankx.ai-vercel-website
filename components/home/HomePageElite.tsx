'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState } from 'react'
import {
  ArrowRight,
  Play,
  Pause,
  ExternalLink,
  Sparkles,
  Music2,
  BookOpen,
  Code2,
  ChevronRight,
} from 'lucide-react'

import { trackEvent } from '@/lib/analytics'

// ============================================================================
// DESIGN SYSTEM
// ============================================================================

// Premium color palette - moving away from generic purple
const colors = {
  // Deep blacks with warmth
  bg: '#0a0a0b',
  bgElevated: '#111113',
  bgSubtle: '#18181b',

  // Accent colors - emerald/teal for tech, gold for premium
  accent: {
    primary: '#10b981', // emerald
    secondary: '#06b6d4', // cyan
    tertiary: '#f59e0b', // amber/gold
  },

  // Text hierarchy
  text: {
    primary: '#fafafa',
    secondary: 'rgba(250, 250, 250, 0.7)',
    tertiary: 'rgba(250, 250, 250, 0.5)',
    muted: 'rgba(250, 250, 250, 0.3)',
  }
}

// ============================================================================
// PREMIUM BACKGROUND COMPONENTS
// ============================================================================

function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#0a0a0b]" />

      {/* Aurora effect - subtle, sophisticated */}
      <motion.div
        className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Grid pattern - very subtle */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  )
}

// ============================================================================
// SCROLL PROGRESS
// ============================================================================

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 origin-left z-50"
      style={{ scaleX }}
    />
  )
}

// ============================================================================
// HERO SECTION - THE MAIN EVENT
// ============================================================================

function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 py-20"
        style={{ opacity, y, scale }}
      >
        <div className="grid lg:grid-cols-[1.3fr,1fr] gap-16 lg:gap-24 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Subtle breadcrumb - editorial style */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-emerald-400/60">
                AI Architect & Music Creator
              </span>
            </motion.div>

            {/* Main headline - authority + vision */}
            <h1 className="mb-8">
              <span className="block text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9] tracking-[-0.03em] text-white">
                Design intelligent systems.
              </span>
              <motion.span
                className="block text-[clamp(1.5rem,4vw,2.5rem)] text-white/60 mt-4 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Create music, art, and momentum in the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">
                  Golden Age of Intelligence.
                </span>
              </motion.span>
            </h1>

            {/* Subtext - invitation to explore */}
            <motion.p
              className="text-lg md:text-xl text-white/40 max-w-lg mb-12 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              AI Architect at Oracle. Creator of 10K+ songs with Suno.
              Everything I build goes here—open, documented, yours to use.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/start"
                onClick={() => trackEvent('hero_cta_click', { type: 'primary' })}
                className="group relative inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                Explore My Work
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/music-lab"
                onClick={() => trackEvent('hero_cta_click', { type: 'secondary' })}
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-full font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
              >
                <Play className="w-4 h-4" />
                Listen to Music
              </Link>
            </motion.div>
          </motion.div>

          {/* Right column - Featured content card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <FeaturedMusicCard />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1 h-1.5 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// FEATURED MUSIC CARD - PREMIUM DESIGN
// ============================================================================

function FeaturedMusicCard() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="relative">
      {/* Glow effect behind card */}
      <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-transparent blur-3xl opacity-50" />

      <motion.div
        className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-6 overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Album art / visualization */}
        <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-purple-500/20">
          {/* Animated visualization */}
          <div className="absolute inset-0 flex items-end justify-center gap-1 p-8">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 rounded-full bg-gradient-to-t from-emerald-400 to-cyan-400"
                animate={{
                  height: isPlaying
                    ? [20, 40 + Math.random() * 60, 20]
                    : [20, 30, 20]
                }}
                transition={{
                  duration: 0.5 + Math.random() * 0.5,
                  repeat: Infinity,
                  delay: i * 0.05,
                }}
              />
            ))}
          </div>

          {/* Play button overlay */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </div>
          </button>
        </div>

        {/* Track info */}
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/80 mb-1">Music Lab</p>
            <h3 className="text-xl font-semibold text-white">AI-Generated Music</h3>
            <p className="text-sm text-white/50">Ambient · Electronic · Cinematic</p>
          </div>

          <p className="text-sm text-white/40 leading-relaxed">
            Creating music with Suno AI. From healing frequencies to cinematic scores.
          </p>

          {/* CTA */}
          <a
            href="https://suno.com/@frankxai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Listen on Suno
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Corner decoration */}
        <div className="absolute top-4 right-4">
          <Music2 className="w-5 h-5 text-white/20" />
        </div>
      </motion.div>
    </div>
  )
}

// ============================================================================
// STATS SECTION
// ============================================================================

function StatsSection() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Editorial quote/statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif-italic text-white/70 leading-relaxed">
            "The future isn't something that happens to you—it's something you design."
          </blockquote>
        </motion.div>

        {/* Stats as horizontal flow */}
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 md:gap-x-24">
          {[
            { value: '10K+', label: 'Songs created with Suno' },
            { value: '5+', label: 'Years building AI systems' },
            { value: '50+', label: 'Battle-tested prompts' },
            { value: 'Open', label: 'Everything documented' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-7xl font-bold text-white mb-3 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-sm text-white/40 max-w-[160px]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// QUICK START SECTION - Real practical value
// ============================================================================

const quickStartPaths = [
  {
    title: 'Create Music with Suno',
    description: 'Generate your first AI song in 5 minutes',
    href: '/music-lab',
    time: '5 min',
    color: 'cyan',
  },
  {
    title: 'Browse Prompt Library',
    description: '50+ battle-tested prompts across all AI tools',
    href: '/prompt-library',
    time: 'Browse',
    color: 'emerald',
  },
  {
    title: 'Learn AI Fundamentals',
    description: 'Curated free courses from Oracle, Google, MIT',
    href: '/students',
    time: 'Free',
    color: 'violet',
  },
]

function QuickStartSection() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-4">
            Quick Start
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Start creating in minutes
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {quickStartPaths.map((path, i) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={path.href}
                className="group block p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-all h-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    path.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' :
                    path.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                    'bg-violet-500/10 text-violet-400'
                  }`}>
                    {path.time}
                  </span>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {path.title}
                </h3>
                <p className="text-sm text-white/50">{path.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// WHAT I DO SECTION
// ============================================================================

const capabilities = [
  {
    icon: Code2,
    title: 'AI Systems',
    subtitle: 'Enterprise Architecture',
    description: 'Multi-agent orchestration, RAG pipelines, production ML systems. Real-world AI that actually ships.',
    href: '/about',
    color: 'from-emerald-500/20 to-emerald-500/5',
    iconColor: 'text-emerald-400',
  },
  {
    icon: Music2,
    title: 'Music Lab',
    subtitle: 'AI-Generated Music',
    description: 'Creating with Suno AI. Ambient, electronic, cinematic—exploring the frontier of AI music.',
    href: '/music-lab',
    color: 'from-cyan-500/20 to-cyan-500/5',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Sparkles,
    title: 'Prompt Library',
    subtitle: 'Battle-Tested Prompts',
    description: 'The prompts I actually use daily. Writing, coding, music, images—copy them, adapt them.',
    href: '/prompt-library',
    color: 'from-violet-500/20 to-violet-500/5',
    iconColor: 'text-violet-400',
  },
  {
    icon: BookOpen,
    title: 'Learning Paths',
    subtitle: 'Curated Courses',
    description: 'Oracle, Google, MIT—hand-picked courses that actually matter. Start learning AI today.',
    href: '/students',
    color: 'from-amber-500/20 to-amber-500/5',
    iconColor: 'text-amber-400',
  },
]

function WhatIDo() {
  return (
    <section className="py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-4">
            What's Here
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Tools, resources, and the work itself.
          </h2>
          <p className="text-xl text-white/50 max-w-2xl leading-relaxed">
            Not a portfolio. Not a course. A working system for creating with AI—
            shared openly because it's more useful that way.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={item.href}
                className="group relative block p-8 rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/15 hover:-translate-y-1 h-full"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                      <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                  </div>

                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/30 mb-2">
                    {item.subtitle}
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed group-hover:text-white/60 transition-colors">
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// FEATURED RESOURCES
// ============================================================================

const resources = [
  {
    name: 'Oracle AI Foundations',
    source: 'Oracle',
    type: 'Certification',
    href: 'https://education.oracle.com/oracle-ai-foundations/pexam_1Z0-1122-1',
  },
  {
    name: 'Google AI Essentials',
    source: 'Coursera',
    type: 'Course',
    href: 'https://www.coursera.org/learn/google-ai-essentials',
  },
  {
    name: 'ML Crash Course',
    source: 'Google',
    type: 'Course',
    href: 'https://developers.google.com/machine-learning/crash-course',
  },
  {
    name: 'Intro to Deep Learning',
    source: 'MIT',
    type: 'Course',
    href: 'http://introtodeeplearning.com/',
  },
]

function FeaturedResources() {
  return (
    <section className="py-32 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
              Curated Resources
            </h2>
            <p className="text-xl text-white/50">
              The courses and certifications I actually recommend.
            </p>
          </div>
          <Link
            href="/resources"
            className="hidden md:inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, i) => (
            <motion.a
              key={resource.name}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all"
            >
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-white/30 mb-1">
                  {resource.type} · {resource.source}
                </div>
                <div className="text-lg font-medium text-white group-hover:text-emerald-400 transition-colors">
                  {resource.name}
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// ABOUT SECTION
// ============================================================================

function AboutSection() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-6">
            The Vision
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight leading-tight">
            We're entering the Golden Age of Intelligence.
            <span className="block mt-2 font-serif-italic text-white/70">
              Anyone can create. Anyone can build.
            </span>
          </h2>

          {/* Philosophy callout */}
          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative pl-6 my-10 border-l-2 border-emerald-400/40"
          >
            <p className="text-2xl md:text-3xl font-serif-italic text-white/80 leading-relaxed">
              "Technology should amplify your voice, not replace it."
            </p>
          </motion.blockquote>

          <div className="space-y-6 text-lg text-white/60 leading-relaxed mb-10">
            <p>
              AI Architect at Oracle by day. Music creator by night. I've seen what's possible
              when intelligent systems serve human goals—not replace them. 10,000+ songs.
              Enterprise systems that scale. Everything documented, everything open.
            </p>
            <p className="text-white/70">
              This hub exists because the future isn't something that happens to you.
              It's something you design. The tools are here. The knowledge is free.
              What you build with it is up to you.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-white font-medium hover:text-emerald-400 transition-colors"
            >
              Read the full story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-4 text-white/40">
              <a
                href="https://linkedin.com/in/frankxai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <span>·</span>
              <a
                href="https://github.com/frankxai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <span>·</span>
              <a
                href="https://suno.com/@frankxai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Suno
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// FINAL CTA SECTION
// ============================================================================

function FinalCTA() {
  return (
    <section className="py-32 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Subtle glow */}
          <div className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-r from-emerald-500/5 via-transparent to-cyan-500/5 blur-3xl opacity-50" />

          <div className="relative text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Start where you are.
            </h2>
            <p className="text-xl md:text-2xl text-white/50 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Whether you're learning AI, creating music, or building systems—
              there's something here for you. All of it is open.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/start"
                className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:-translate-y-0.5"
              >
                Pick Your Path
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/resources"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
              >
                Browse Resources
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function HomePageElite() {
  return (
    <main className="relative min-h-screen text-white">
      <AuroraBackground />
      <ScrollProgress />

      <div className="relative z-10">
        <Hero />
        <StatsSection />
        <WhatIDo />
        <QuickStartSection />
        <FeaturedResources />
        <AboutSection />
        <FinalCTA />
      </div>
    </main>
  )
}
