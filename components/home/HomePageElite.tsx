'use client'

import { motion, useScroll, useTransform, useSpring, useReducedMotion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import {
  ArrowRight,
  Play,
  ExternalLink,
  Sparkles,
  Music2,
  BookOpen,
  Code2,
  ChevronRight,
  ImageIcon,
  Wand2,
} from 'lucide-react'

import { trackEvent } from '@/lib/analytics'
import TrustedByBlock from '@/components/social-proof/TrustedByBlock'
import Floating3DAsset from '@/components/ui/Floating3DAsset'

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
  const shouldReduceMotion = useReducedMotion()
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#0a0a0b]" />

      {/* Aurora effect - contained within viewport to prevent overflow */}
      {/* Mobile: smaller, more contained gradients */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[60%] md:w-[80%] md:h-[80%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.05, 1],
              }
        }
        transition={shouldReduceMotion ? undefined : { duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-full h-[50%] md:w-[60%] md:h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, -40, 0],
                y: [0, -20, 0],
                scale: [1, 1.08, 1],
              }
        }
        transition={shouldReduceMotion ? undefined : { duration: 25, repeat: Infinity, ease: 'easeInOut' }}
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
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 origin-left z-50"
      style={{ scaleX: shouldReduceMotion ? 1 : scaleX }}
    />
  )
}

// ============================================================================
// ROTATING WORDS FOR HERO
// ============================================================================

const heroWords = ['Design', 'Create', 'Architect', 'Explore', 'Imagine']
const heroConcepts = [
  'intelligent systems',
  'music empire',
  'AI vision',
  'agentic workflows',
  'Vibe OS',
  'GenCreator OS',
  'creative future',
  'golden age',
  'next project',
]

function RotatingWord() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroWords.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [shouldReduceMotion])

  if (shouldReduceMotion) {
    return (
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">
        {heroWords[0]}
      </span>
    )
  }

  return (
    <span className="inline-block relative py-1">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400"
          style={{ lineHeight: 1.3 }}
        >
          {heroWords[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function RotatingConcept() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroConcepts.length)
    }, 3500)

    return () => clearInterval(interval)
  }, [shouldReduceMotion])

  if (shouldReduceMotion) {
    return (
      <span className="text-white/90">{heroConcepts[0]}</span>
    )
  }

  return (
    <span className="inline-block relative min-h-[1.3em]">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-white/90"
        >
          {heroConcepts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// ============================================================================
// HERO SECTION - THE MAIN EVENT
// ============================================================================

function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  // Premium scroll effect - slower, smoother fade for mobile
  // Extended range [0, 0.7] gives more time to see content before it fades
  // Gentler scale change (0.98 vs 0.95) feels more elegant
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.7], [0, 60])
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.98])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20"
    >
      {/* Premium 3D floating accents - desktop only, subtle */}
      <div className="hidden xl:block pointer-events-none">
        <Floating3DAsset
          src="/images/3d/3dicons-rocket-dynamic-premium.png"
          position="top-right"
          size="xl"
          animation="float"
          opacity={25}
          className="top-32 right-[5%]"
          delay={0.3}
        />
        <Floating3DAsset
          src="/images/3d/3dicons-star-dynamic-premium.png"
          position="bottom-left"
          size="lg"
          animation="pulse"
          opacity={20}
          className="bottom-40 left-[8%]"
          delay={0.6}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-20"
        style={shouldReduceMotion ? undefined : { opacity, y, scale }}
      >
        <div className="grid lg:grid-cols-[1.3fr,1fr] gap-8 md:gap-16 lg:gap-24 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Subtle breadcrumb - editorial style */}
            <motion.div
              className="mb-6 md:mb-12"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
            >
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-emerald-400/60">
                AI Architect & Music Creator
              </span>
            </motion.div>

            {/* Main headline - authority + vision */}
            <h1 className="mb-6 md:mb-8">
              <span className="block text-[clamp(2rem,8vw,5rem)] font-bold leading-[1.15] tracking-tight pb-1">
                <RotatingWord /> <span className="text-white">your</span>
              </span>
              <span className="block text-[clamp(1.5rem,6vw,4rem)] font-bold leading-[1.15] tracking-tight text-white pb-2 md:pb-4">
                <RotatingConcept />
              </span>
              <motion.span
                className="block text-base sm:text-lg md:text-[clamp(1.25rem,3vw,1.75rem)] text-white/60 mt-4 md:mt-6 leading-relaxed max-w-2xl"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }}
              >
                Create music, art, and momentum in the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">
                  Golden Age of Intelligence.
                </span>
              </motion.span>
            </h1>

            {/* Subtext - invitation to explore */}
            <motion.p
              className="text-base md:text-lg lg:text-xl text-white/40 max-w-lg mb-8 md:mb-12 leading-relaxed"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.4 }}
            >
              AI Architect at Oracle. Creator of 12K+ songs with Suno.
              Everything I build goes here—open, documented, yours to use.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.5 }}
            >
              <Link
                href="/start"
                onClick={() => trackEvent('hero_cta_click', { type: 'primary' })}
                className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-black px-5 sm:px-7 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] active:scale-[0.98] active:shadow-[0_0_24px_rgba(255,255,255,0.2)]"
              >
                Explore My Work
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/music-lab"
                onClick={() => trackEvent('hero_cta_click', { type: 'secondary' })}
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-7 py-3 sm:py-4 rounded-full font-medium text-sm sm:text-base text-white/70 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] active:scale-[0.98] active:border-white/30 active:bg-white/10"
              >
                <Play className="w-4 h-4" />
                Listen to Music
              </Link>

              <Link
                href="/resources"
                onClick={() => trackEvent('hero_cta_click', { type: 'resources' })}
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-7 py-3 sm:py-4 rounded-full font-medium text-sm sm:text-base text-white/70 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] active:scale-[0.98] active:border-white/30 active:bg-white/10"
              >
                <Sparkles className="w-4 h-4" />
                Resource Hub
              </Link>
            </motion.div>
          </motion.div>

          {/* Right column - Featured content card */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <FeaturedMusicCard />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { delay: 1.5 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5"
          animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={shouldReduceMotion ? undefined : { duration: 2, repeat: Infinity }}
        >
          <div className="w-1 h-1.5 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// FEATURED MUSIC CARD - WITH EMBEDDED SUNO PLAYER
// ============================================================================

// Featured Suno songs to showcase (rotate through these)
const featuredSongs = [
  { id: '9cbad174-9276-427f-9aed-1ba00c7db3db', title: 'Vibe OS', genre: 'Electronic' },
  { id: '42c37fa7-5b1e-4b6c-a3c0-2c739f44a2d4', title: 'Golden Age Rising', genre: 'Cinematic' },
]

function FeaturedMusicCard() {
  const [currentSong] = useState(0)
  const song = featuredSongs[currentSong]

  return (
    <div className="relative mt-8 lg:mt-0">
      {/* Glow effect behind card - contained to prevent overflow */}
      <div className="absolute inset-0 md:-inset-4 bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-violet-500/8 blur-2xl md:blur-3xl opacity-50 md:opacity-60 rounded-3xl" />

      <motion.div
        className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 overflow-hidden"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        {/* Suno Embed Player - Responsive heights */}
        <div className="relative rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-purple-500/10">
          <iframe
            src={`https://suno.com/embed/${song.id}`}
            className="w-full h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px] rounded-xl md:rounded-2xl"
            frameBorder="0"
            allow="autoplay; clipboard-write"
            loading="lazy"
            title={`${song.title} - AI Generated Music`}
          />
        </div>

        {/* Track info */}
        <div className="space-y-3 md:space-y-4">
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-emerald-400/80 mb-1">Music Lab</p>
            <h3 className="text-lg sm:text-xl font-semibold text-white">A Daily Practice of Creation</h3>
            <p className="text-xs sm:text-sm text-white/50">Ambient · Electronic · Cinematic · Healing</p>
          </div>

          <p className="text-xs sm:text-sm text-white/40 leading-relaxed">
            Music as exploration. Each session teaches me something new about sound, emotion, and the creative process.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <a
              href="https://suno.com/@frankx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Full Library
              <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </a>
            <Link
              href="/music-lab"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              Music Lab
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>
          </div>
        </div>

        {/* Corner decoration */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <Music2 className="w-5 h-5 sm:w-6 sm:h-6 text-white/20" />
        </div>
      </motion.div>
    </div>
  )
}

// ============================================================================
// TOOLCHAIN MARQUEE
// ============================================================================

// Note: ToolchainMarquee replaced with TrustedByBlock (official brand logos + case studies)

// ============================================================================
// STATS SECTION
// ============================================================================

function StatsSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Editorial quote/statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-12 md:mb-20"
        >
          <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif-italic text-white/70 leading-relaxed px-2">
            "I create to understand. I share to teach. I explore because the universe is too interesting not to."
          </blockquote>
        </motion.div>

        {/* Journey markers - story-focused */}
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:flex md:flex-wrap md-justify-center md:gap-x-16 lg:gap-x-24 md:gap-y-8">
          {[
            { value: 'Music', label: 'Daily creative practice with Suno' },
            { value: 'Systems', label: 'Building tools that serve the work' },
            { value: 'Teaching', label: 'Sharing the process, not just results' },
            { value: 'Open', label: 'Everything documented for you to use' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-2 md:mb-3 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-white/40 max-w-[140px] sm:max-w-[160px] mx-auto">
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
    <section className="py-16 md:py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] sm:tracking-[0.25em] text-emerald-400/70 mb-3 md:mb-4">
            Quick Start
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Start creating in minutes
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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
                className="group block p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-all h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] active:scale-[0.99] active:border-white/20"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className={`text-[10px] sm:text-xs font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full ${
                    path.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' :
                    path.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                    'bg-violet-500/10 text-violet-400'
                  }`}>
                    {path.time}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2 group-hover:text-emerald-400 transition-colors">
                  {path.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/50">{path.description}</p>
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
    icon: Music2,
    title: 'Music Lab',
    subtitle: 'Daily Creative Practice',
    description: 'My ongoing exploration of AI music with Suno. Ambient soundscapes, electronic experiments, cinematic scores. The process documented.',
    href: '/music-lab',
    color: 'from-cyan-500/20 to-cyan-500/5',
    iconColor: 'text-cyan-400',
  },
  {
    icon: BookOpen,
    title: 'Learning Paths',
    subtitle: 'What Changed How I Think',
    description: 'Curated resources from Oracle, Google, MIT. Not everything that exists—just what actually helped me understand.',
    href: '/students',
    color: 'from-amber-500/20 to-amber-500/5',
    iconColor: 'text-amber-400',
  },
  {
    icon: Sparkles,
    title: 'Prompt Collection',
    subtitle: 'Tools for the Work',
    description: 'Prompts I use daily for writing, coding, music, and exploration. Adapt them to your own projects.',
    href: '/prompt-library',
    color: 'from-violet-500/20 to-violet-500/5',
    iconColor: 'text-violet-400',
  },
  {
    icon: Code2,
    title: 'Creation Chronicles',
    subtitle: 'Building in Public',
    description: 'How I built this site, my workflows, decisions made along the way. The messy process, not just the polished result.',
    href: '/creation-chronicles',
    color: 'from-emerald-500/20 to-emerald-500/5',
    iconColor: 'text-emerald-400',
  },
]

function WhatIDo() {
  return (
    <section className="py-16 md:py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-16"
        >
          <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] sm:tracking-[0.25em] text-emerald-400/70 mb-3 md:mb-4">
            The Work
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight">
            Four areas of exploration.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed">
            Music. Learning. Tools. Process. Everything documented so you can see
            how it actually works—not just the highlights.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                className="group relative block p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/15 hover:-translate-y-1 h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] active:scale-[0.99] active:border-white/20"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative">
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                      <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.iconColor}`} />
                    </div>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                  </div>

                  <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.12em] sm:tracking-[0.15em] text-white/30 mb-1.5 sm:mb-2">
                    {item.subtitle}
                  </p>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/50 leading-relaxed group-hover:text-white/60 transition-colors">
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
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-12"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-2 sm:mb-4 tracking-tight">
              Curated Resources
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/50">
              The courses and certifications I actually recommend.
            </p>
          </div>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm sm:text-base text-white/60 hover:text-white transition-colors self-start sm:self-auto"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
              className="group flex items-center justify-between gap-3 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] active:scale-[0.99] active:border-white/20"
            >
              <div className="min-w-0 flex-1">
                <div className="text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.15em] text-white/30 mb-0.5 sm:mb-1">
                  {resource.type} · {resource.source}
                </div>
                <div className="text-sm sm:text-base md:text-lg font-medium text-white group-hover:text-emerald-400 transition-colors truncate">
                  {resource.name}
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// AI ART GALLERY PREVIEW
// ============================================================================

const featuredArtworks = [
  {
    src: '/images/ai-art/generated-2026-01-21T10-05-06-577Z-s5e43g.png',
    title: 'Neural Synthesis I',
    category: 'Abstract',
  },
  {
    src: '/images/ai-art/generated-2026-01-21T10-05-26-229Z-jajczn.png',
    title: 'Neural Wave',
    category: 'Abstract',
  },
  {
    src: '/images/ai-art/generated-2026-01-21T10-05-42-484Z-c75nch.png',
    title: 'Digital Aurora',
    category: 'Nature Tech',
  },
  {
    src: '/images/ai-art/generated-2025-11-20T19-29-22-071Z-uz2q95.png',
    title: 'First Light',
    category: 'Cosmic',
  },
]

function AIArtGalleryPreview() {
  return (
    <section className="py-16 md:py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
              <Wand2 className="w-3.5 h-3.5" />
              AI-Generated Art
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-2 sm:mb-4 tracking-tight">
              Visual Explorations
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/50 max-w-xl">
              Where artificial intelligence meets creative expression. Each piece generated with nano-banana AI.
            </p>
          </div>
          <Link
            href="/ai-art"
            className="inline-flex items-center gap-2 text-sm sm:text-base text-white/60 hover:text-white transition-colors self-start sm:self-auto"
          >
            View full gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {featuredArtworks.map((artwork, i) => (
            <motion.div
              key={artwork.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href="/ai-art"
                className="group relative block aspect-square rounded-xl sm:rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all"
              >
                <Image
                  src={artwork.src}
                  alt={artwork.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider text-emerald-400 mb-0.5">
                    {artwork.category}
                  </p>
                  <h3 className="text-sm sm:text-base font-semibold text-white truncate">
                    {artwork.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-6 sm:gap-8 mt-8 text-white/40 text-sm"
        >
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            <span>20+ Artworks</span>
          </div>
          <div className="flex items-center gap-2">
            <Wand2 className="w-4 h-4" />
            <span>nano-banana AI</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// ABOUT SECTION
// ============================================================================

function AboutSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] sm:tracking-[0.25em] text-emerald-400/70 mb-4 sm:mb-6">
            The Journey
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 tracking-tight leading-tight">
            Music, technology, family, and the endless exploration of how things work.
            <span className="block mt-2 font-serif-italic text-white/70 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              These are the threads that weave through everything here.
            </span>
          </h2>

          {/* Philosophy callout */}
          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative pl-4 sm:pl-6 my-6 sm:my-10 border-l-2 border-emerald-400/40"
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif-italic text-white/80 leading-relaxed">
              "The best way to learn is to teach. The best way to understand is to create."
            </p>
          </motion.blockquote>

          <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-white/60 leading-relaxed mb-8 sm:mb-10">
            <p>
              By day, I architect AI systems at Oracle. By night, I make music—hundreds of songs
              exploring what's possible when humans and AI create together. I'm a husband, a father,
              someone who believes the universe is too interesting not to explore deeply.
            </p>
            <p className="text-white/70">
              This site is my workshop, my notebook, my attempt to share what I'm learning
              with anyone curious enough to look. Not courses to sell, not followers to count.
              Just the work itself, documented as I do it.
            </p>
            <p className="text-white/50">
              Take what's useful. Adapt it to your life. That's the point.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-6">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-sm sm:text-base text-white font-medium hover:text-emerald-400 transition-colors"
            >
              Read the full story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base text-white/40">
              <a
                href="https://linkedin.com/in/frank-x-riemer/"
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
                href="https://suno.com/@frankx"
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
    <section className="py-16 md:py-24 lg:py-32 border-t border-white/5 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Subtle glow - contained to prevent overflow */}
          <div className="absolute inset-0 md:-inset-x-10 md:-inset-y-10 bg-gradient-to-r from-emerald-500/5 via-transparent to-cyan-500/5 blur-2xl md:blur-3xl opacity-40 md:opacity-50 rounded-3xl" />

          <div className="relative text-center px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight">
              Start where you are.
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/50 mb-8 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Whether you're learning AI, creating music, or building systems—
              there's something here for you. All of it is open.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/start"
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] active:scale-[0.98]"
              >
                Pick Your Path
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/resources"
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] active:scale-[0.98] active:border-white/30 active:bg-white/10"
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
    <main className="relative min-h-screen text-white overflow-x-hidden">
      <AuroraBackground />
      <ScrollProgress />

      <div className="relative z-10 overflow-x-hidden">
        <Hero />
        <TrustedByBlock />
        <StatsSection />
        <WhatIDo />
        <QuickStartSection />
        <FeaturedResources />
        <AIArtGalleryPreview />
        <AboutSection />
        <FinalCTA />
      </div>
    </main>
  )
}
