'use client'

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
  ExternalLink,
  Sparkles,
  Zap,
  Music2,
  BookOpen,
  Code2,
  Headphones,
  Users,
  Award,
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
            {/* Status indicator - subtle, not in-your-face */}
            <motion.div
              className="inline-flex items-center gap-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="text-xs uppercase tracking-wider text-white/50">Building in public</span>
              </div>
            </motion.div>

            {/* Main headline - editorial style, poetic */}
            <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.02em] mb-8">
              <span className="block text-white">Enterprise AI</span>
              <span className="block text-white">by day.</span>
              <motion.span
                className="block font-serif italic text-white/80"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Music by night.
              </motion.span>
            </h1>

            {/* Subtext - cleaner, less self-promotional */}
            <motion.p
              className="text-xl text-white/50 max-w-lg mb-10 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              I build AI systems at Oracle and create music with Suno.
              This is where I share what I'm learning—tools, resources, and the work itself.
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

const stats = [
  { value: '10K+', label: 'Songs Created', detail: 'With Suno AI' },
  { value: '5+', label: 'Years in AI', detail: 'Enterprise systems' },
  { value: 'Open', label: 'Source', detail: 'Everything shared' },
]

function StatsSection() {
  return (
    <section className="py-24 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-semibold text-white mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-[0.25em] text-emerald-400/80 mb-2">
                {stat.label}
              </div>
              <div className="text-white/40 text-sm">
                {stat.detail}
              </div>
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
    title: 'AI Architecture',
    description: 'Enterprise AI systems at Oracle. Multi-agent orchestration, RAG pipelines, production deployments.',
    href: '/about',
    accent: 'emerald',
  },
  {
    icon: Music2,
    title: 'AI Music Creation',
    description: 'Thousands of songs created with Suno. Ambient, electronic, cinematic. Exploring what\'s possible.',
    href: '/music-lab',
    accent: 'cyan',
  },
  {
    icon: BookOpen,
    title: 'Resources & Guides',
    description: 'Curated learning paths, prompt libraries, and systems I use daily. Everything documented.',
    href: '/resources',
    accent: 'amber',
  },
  {
    icon: Zap,
    title: 'Products & Tools',
    description: 'Vibe OS, prompt collections, and creative AI toolkits. Built for creators who want to level up.',
    href: '/products',
    accent: 'rose',
  },
]

function WhatIDo() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
            What I Build
          </h2>
          <p className="text-xl text-white/50 max-w-2xl">
            The intersection of enterprise AI expertise and creative exploration.
            Everything I create, I share.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="group block p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 h-full"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-3 rounded-xl bg-${item.accent}-500/10 group-hover:bg-${item.accent}-500/20 transition-colors`}>
                    <item.icon className={`w-6 h-6 text-${item.accent}-400`} />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white/50 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-white/50 leading-relaxed">
                  {item.description}
                </p>
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
    <section className="py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-400/80 mb-6">
              About
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight leading-tight">
              Building AI systems.{' '}
              <span className="font-serif italic text-white/80">Making music.</span>
            </h2>
            <div className="space-y-4 text-lg text-white/60 leading-relaxed">
              <p>
                Senior AI Architect at Oracle's AI Center of Excellence. I design
                enterprise AI systems—multi-agent orchestration, RAG pipelines,
                production deployments.
              </p>
              <p className="text-white/70">
                When I'm not at work, I create music with Suno AI. Thousands of songs,
                exploring genres from ambient to cinematic. Everything I learn, I share here.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-white font-medium hover:text-emerald-400 transition-colors"
              >
                Read the full story
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://linkedin.com/in/frankxai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors"
              >
                LinkedIn
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              { icon: Award, title: 'Oracle AI Center of Excellence', desc: 'Senior AI Architect designing enterprise systems' },
              { icon: Music2, title: 'Prolific Music Creator', desc: 'Thousands of AI-generated songs across genres' },
              { icon: Zap, title: 'Open Source Everything', desc: 'All systems, prompts, and resources shared publicly' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 flex-shrink-0">
                    <item.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-white/50">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// FINAL CTA SECTION
// ============================================================================

function FinalCTA() {
  return (
    <section className="py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-semibold text-white mb-6 tracking-tight">
            Ready to explore?
          </h2>
          <p className="text-xl text-white/50 mb-10 max-w-lg mx-auto">
            Systems, music, resources—take what works for you.
            Everything is documented, everything is open.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/start"
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              Start Here
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/music-lab"
              className="inline-flex items-center gap-3 text-white/60 hover:text-white px-8 py-4 text-lg transition-colors"
            >
              <Play className="w-5 h-5" />
              Explore Music Lab
            </Link>
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
        <FeaturedResources />
        <AboutSection />
        <FinalCTA />
      </div>
    </main>
  )
}
