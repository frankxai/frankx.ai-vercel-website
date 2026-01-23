'use client'

import { motion, useScroll, useTransform, useSpring, useReducedMotion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState, useEffect, Suspense } from 'react'
import {
  ArrowRight,
  Play,
  ExternalLink,
  Sparkles,
  Music2,
  BookOpen,
  Code2,
  ChevronRight,
  Brain,
  Rocket,
  Star,
  Zap,
} from 'lucide-react'

import { trackEvent } from '@/lib/analytics'
import TrustedByBlock from '@/components/social-proof/TrustedByBlock'
import GlassBlob from '@/components/ui/GlassBlob'
import Floating3DAsset from '@/components/ui/Floating3DAsset'
import { BorderBeamCard } from '@/components/ui/BorderBeam'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.33, 0.01, 0, 1] }
  }
}

// ============================================================================
// SCROLL PROGRESS - Enhanced with gradient
// ============================================================================

function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-tech-primary via-tech-secondary to-soul-primary origin-left z-50"
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
  'Soulbook',
  'Vibe OS',
  'GenCreator OS',
  'Arcanea universe',
  'Starlight system',
  'creative future',
  'golden age',
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
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-primary via-tech-secondary to-soul-primary">
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
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-tech-primary via-tech-secondary to-soul-primary"
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
    return <span className="text-white/90">{heroConcepts[0]}</span>
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
// HERO SECTION - Premium 3D with Spline + Floating Assets
// ============================================================================

function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.7], [0, 60])
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.98])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Interactive Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={
          <div className="w-full h-full bg-gradient-radial from-tech-primary/10 via-transparent to-transparent" />
        }>
          <GlassBlob className="w-full h-full" />
        </Suspense>
      </div>

      {/* Gradient overlays for depth and readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-void/70 via-transparent to-void" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-void/40 via-transparent to-void/40" />

      {/* Floating 3D Assets - Depth Composition */}
      <Floating3DAsset
        src="/images/3d/sparkles_3d.png"
        position="custom"
        positionClassName="top-[8%] left-[3%] md:top-[10%] md:left-[5%]"
        size="md"
        opacity={30}
        blur="md"
        animation="float"
        delay={0}
      />
      <Floating3DAsset
        src="/images/3d/star_3d.png"
        position="custom"
        positionClassName="top-[15%] right-[5%] md:top-[20%] md:right-[8%]"
        size="lg"
        opacity={50}
        blur="sm"
        animation="float-rotate"
        delay={1}
      />
      <Floating3DAsset
        src="/images/3d/brain_3d.png"
        position="custom"
        positionClassName="bottom-[30%] left-[8%] md:bottom-[25%] md:left-[10%]"
        size="xl"
        opacity={70}
        animation="float"
        delay={0.5}
      />
      <Floating3DAsset
        src="/images/3d/rocket_3d.png"
        position="custom"
        positionClassName="bottom-[20%] right-[3%] md:bottom-[15%] md:right-[5%]"
        size="xl"
        opacity={80}
        animation="float-rotate"
        delay={1.5}
      />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-20 pt-24 md:pt-28"
        style={shouldReduceMotion ? undefined : { opacity, y, scale }}
      >
        <div className="grid lg:grid-cols-[1.3fr,1fr] gap-8 md:gap-16 lg:gap-24 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Premium badge with border beam effect */}
            <motion.div
              className="mb-6 md:mb-10"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-tech-primary/30 bg-tech-glow">
                <Sparkles className="w-4 h-4 text-tech-primary" />
                <span className="text-xs font-mono text-tech-primary uppercase tracking-wider">
                  AI Architect & Music Creator
                </span>
              </div>
            </motion.div>

            {/* Main headline */}
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-primary via-tech-secondary to-soul-primary">
                  Golden Age of Intelligence.
                </span>
              </motion.span>
            </h1>

            {/* Subtext */}
            <motion.p
              className="text-base md:text-lg lg:text-xl text-white/40 max-w-lg mb-8 md:mb-12 leading-relaxed"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.4 }}
            >
              AI Architect at Oracle. Creator of 10K+ songs with Suno.
              Everything I build goes here—open, documented, yours to use.
            </motion.p>

            {/* CTAs with premium hover effects */}
            <motion.div
              className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.5 }}
            >
              <Link
                href="/start"
                onClick={() => trackEvent('hero_cta_click', { type: 'primary' })}
                className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-tech-primary to-tech-secondary text-void px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-glow-tech hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Explore My Work
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/music-lab"
                onClick={() => trackEvent('hero_cta_click', { type: 'secondary' })}
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base text-white/70 hover:text-white border border-white/10 hover:border-tech-primary/40 hover:bg-white/5 transition-all"
              >
                <Play className="w-4 h-4" />
                Listen to Music
              </Link>
            </motion.div>
          </motion.div>

          {/* Right column - Featured card with border beam */}
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
          animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={shouldReduceMotion ? undefined : { duration: 2, repeat: Infinity }}
        >
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// FEATURED MUSIC CARD - With Border Beam Effect
// ============================================================================

const featuredSongs = [
  { id: '9cbad174-9276-427f-9aed-1ba00c7db3db', title: 'Vibe OS', genre: 'Electronic' },
  { id: '42c37fa7-5b1e-4b6c-a3c0-2c739f44a2d4', title: 'Golden Age Rising', genre: 'Cinematic' },
]

function FeaturedMusicCard() {
  const [currentSong] = useState(0)
  const song = featuredSongs[currentSong]

  return (
    <div className="relative mt-8 lg:mt-0">
      <BorderBeamCard variant="tech" beamDuration={12} className="h-full">
        <div className="relative p-4 sm:p-6 md:p-8">
          {/* Floating 3D decoration */}
          <Floating3DAsset
            src="/images/3d/music_3d.png"
            position="top-right"
            size="lg"
            opacity={60}
            animation="float-rotate"
          />

          {/* Suno Embed Player */}
          <div className="relative rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6 bg-gradient-to-br from-tech-primary/10 via-tech-secondary/10 to-soul-primary/10">
            <iframe
              src={`https://suno.com/embed/${song.id}`}
              className="w-full h-[280px] sm:h-[320px] md:h-[380px] rounded-xl md:rounded-2xl"
              frameBorder="0"
              allow="autoplay; clipboard-write"
              loading="lazy"
              title={`${song.title} - AI Generated Music`}
            />
          </div>

          {/* Track info */}
          <div className="space-y-3 md:space-y-4">
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-tech-primary mb-1">
                Music Lab
              </p>
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
                className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-tech-primary hover:text-tech-light transition-colors"
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
        </div>
      </BorderBeamCard>
    </div>
  )
}

// ============================================================================
// BENTO GRID SECTION - "What I Do" with Border Beams
// ============================================================================

const capabilities = [
  {
    icon: Music2,
    title: 'Music Lab',
    subtitle: 'Daily Creative Practice',
    description: 'My ongoing exploration of AI music with Suno. Ambient soundscapes, electronic experiments, cinematic scores.',
    href: '/music-lab',
    variant: 'tech' as const,
    asset: '/images/3d/music_3d.png',
    stats: '10K+ songs',
    span: 'md:col-span-2',
  },
  {
    icon: Brain,
    title: 'AI Systems',
    subtitle: 'Enterprise Architecture',
    description: 'Building intelligent systems at Oracle. Agent teams, automation, and consciousness-aligned AI.',
    href: '/about',
    variant: 'soul' as const,
    asset: '/images/3d/brain_3d.png',
    stats: 'Oracle AI',
  },
  {
    icon: BookOpen,
    title: 'Learning Paths',
    subtitle: 'Curated Resources',
    description: 'Courses from Oracle, Google, MIT. What actually helped me understand.',
    href: '/students',
    variant: 'tech' as const,
    asset: '/images/3d/lightbulb_3d.png',
    stats: 'Free',
  },
  {
    icon: Sparkles,
    title: 'Prompt Library',
    subtitle: 'Tools for the Work',
    description: 'Battle-tested prompts for writing, coding, music, and exploration.',
    href: '/prompt-library',
    variant: 'hybrid' as const,
    asset: '/images/3d/magic_wand_3d.png',
    stats: '50+',
  },
  {
    icon: Code2,
    title: 'Creation Chronicles',
    subtitle: 'Building in Public',
    description: 'How I built this site, workflows, decisions. The messy process documented.',
    href: '/creation-chronicles',
    variant: 'tech' as const,
    asset: '/images/3d/rocket_3d.png',
    stats: 'Open',
  },
]

function BentoSection() {
  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6">
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-tech-primary/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-soul-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-tech-primary/30 bg-tech-glow mb-6">
            <Zap className="w-4 h-4 text-tech-primary" />
            <span className="text-xs font-mono text-tech-primary uppercase tracking-wider">The Work</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Four Areas of Exploration
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Music. Learning. Tools. Process. Everything documented so you can see how it works.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              variants={item}
              className={capability.span || ''}
            >
              <Link href={capability.href} className="block h-full">
                <BorderBeamCard
                  variant={capability.variant}
                  beamDuration={14 + (index % 3) * 2}
                  className="h-full min-h-[220px] md:min-h-[260px] group"
                >
                  <div className="relative h-full p-5 md:p-6 flex flex-col">
                    {/* Floating 3D Asset */}
                    <Floating3DAsset
                      src={capability.asset}
                      position="top-right"
                      size="lg"
                      opacity={50}
                      animation="float"
                    />

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                          <capability.icon className={`w-5 h-5 ${
                            capability.variant === 'tech' ? 'text-tech-primary' :
                            capability.variant === 'soul' ? 'text-soul-primary' :
                            'text-hybrid'
                          }`} />
                        </div>
                        <span className={`text-xs font-mono px-2 py-1 rounded-full ${
                          capability.variant === 'tech' ? 'bg-tech-glow text-tech-primary' :
                          capability.variant === 'soul' ? 'bg-soul-glow text-soul-primary' :
                          'bg-hybrid/10 text-hybrid'
                        }`}>
                          {capability.stats}
                        </span>
                      </div>

                      <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-white/30 mb-1">
                        {capability.subtitle}
                      </p>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                        {capability.title}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/60 transition-colors">
                        {capability.description}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div className="flex items-center justify-end mt-4 pt-4 border-t border-white/5">
                      <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </BorderBeamCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// STATS SECTION - Glassmorphic Cards
// ============================================================================

function StatsSection() {
  const stats = [
    { icon: Rocket, value: '10K+', label: 'Songs Created', color: 'tech' },
    { icon: Star, value: '4.9', label: 'Creator Rating', color: 'soul' },
    { icon: Sparkles, value: '50+', label: 'AI Prompts', color: 'tech' },
    { icon: Brain, value: 'Oracle', label: 'AI Architecture', color: 'soul' },
  ]

  return (
    <section className="relative py-20 md:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Editorial quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif italic text-white/70 leading-relaxed">
            "I create to understand. I share to teach. I explore because the universe is too interesting not to."
          </blockquote>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={item}>
              <GlassmorphicCard
                variant="premium"
                gradient="aurora"
                border="subtle"
                hover
                className="h-full"
              >
                <div className="p-5 md:p-6 flex flex-col items-center text-center">
                  <stat.icon className={`w-6 h-6 mb-3 ${
                    stat.color === 'tech' ? 'text-tech-primary' : 'text-soul-primary'
                  }`} />
                  <div className={`text-3xl md:text-4xl font-bold mb-1 ${
                    stat.color === 'tech' ? 'text-tech-primary' : 'text-soul-primary'
                  }`}>
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-white/50">{stat.label}</div>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// QUICK START SECTION
// ============================================================================

const quickStartPaths = [
  {
    title: 'Create Music with Suno',
    description: 'Generate your first AI song in 5 minutes',
    href: '/music-lab',
    time: '5 min',
    color: 'tech',
    asset: '/images/3d/music_3d.png',
  },
  {
    title: 'Browse Prompt Library',
    description: '50+ battle-tested prompts across all AI tools',
    href: '/prompt-library',
    time: 'Browse',
    color: 'soul',
    asset: '/images/3d/magic_wand_3d.png',
  },
  {
    title: 'Learn AI Fundamentals',
    description: 'Curated free courses from Oracle, Google, MIT',
    href: '/students',
    time: 'Free',
    color: 'tech',
    asset: '/images/3d/lightbulb_3d.png',
  },
]

function QuickStartSection() {
  return (
    <section className="py-20 md:py-28 border-t border-white/5 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-tech-primary/30 bg-tech-glow mb-6">
            <Rocket className="w-4 h-4 text-tech-primary" />
            <span className="text-xs font-mono text-tech-primary uppercase tracking-wider">Quick Start</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Start creating in minutes
          </h2>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {quickStartPaths.map((path) => (
            <motion.div key={path.title} variants={item}>
              <Link href={path.href} className="block h-full">
                <BorderBeamCard
                  variant={path.color === 'tech' ? 'tech' : 'soul'}
                  beamDuration={18}
                  className="h-full group"
                >
                  <div className="relative p-5 md:p-6 h-full">
                    <Floating3DAsset
                      src={path.asset}
                      position="top-right"
                      size="md"
                      opacity={40}
                      animation="float"
                    />

                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full ${
                        path.color === 'tech' ? 'bg-tech-glow text-tech-primary' : 'bg-soul-glow text-soul-primary'
                      }`}>
                        {path.time}
                      </span>
                      <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-tech-primary transition-colors">
                      {path.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/50">{path.description}</p>
                  </div>
                </BorderBeamCard>
              </Link>
            </motion.div>
          ))}
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
    <section className="relative py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background with floating assets */}
      <Floating3DAsset
        src="/images/3d/gem_3d.png"
        position="custom"
        positionClassName="top-[10%] left-[10%]"
        size="lg"
        opacity={30}
        blur="sm"
        animation="float-rotate"
      />
      <Floating3DAsset
        src="/images/3d/crystal_ball_3d.png"
        position="custom"
        positionClassName="bottom-[20%] right-[10%]"
        size="xl"
        opacity={40}
        animation="float"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-4xl mx-auto text-center"
      >
        {/* Glow behind */}
        <div className="absolute inset-0 bg-gradient-to-r from-tech-primary/10 via-transparent to-soul-primary/10 blur-3xl opacity-50 rounded-full" />

        <div className="relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Start where you are.
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-white/50 mb-10 md:mb-14 max-w-2xl mx-auto font-light leading-relaxed">
            Whether you're learning AI, creating music, or building systems—
            there's something here for you. All of it is open.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <Link
              href="/start"
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-tech-primary to-tech-secondary text-void px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:shadow-glow-tech hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Pick Your Path
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/resources"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-medium text-white/60 hover:text-white border border-white/10 hover:border-tech-primary/40 hover:bg-white/5 transition-all"
            >
              Browse Resources
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function HomePagePremium() {
  return (
    <main className="relative min-h-screen bg-void text-white overflow-x-hidden">
      <ScrollProgress />

      <div className="relative z-10">
        <Hero />
        <TrustedByBlock />
        <BentoSection />
        <StatsSection />
        <QuickStartSection />
        <FinalCTA />
      </div>
    </main>
  )
}
