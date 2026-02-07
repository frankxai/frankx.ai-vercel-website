'use client'

import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion'
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
  Zap,
  Cpu,
  Palette,
  Users,
  Map,
  FileText,
  Brain,
  Wand2,
  Star,
  TrendingUp,
} from 'lucide-react'

import { trackEvent } from '@/lib/analytics'

// ============================================================================
// PREMIUM DESIGN SYSTEM - Raycast/Vercel Inspired
// ============================================================================

// Mesh gradient backgrounds
const meshGradients = {
  hero: 'radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.15) 0px, transparent 50%), radial-gradient(at 97% 21%, hsla(265, 89%, 68%, 0.1) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(176, 87%, 45%, 0.08) 0px, transparent 50%), radial-gradient(at 10% 29%, hsla(215, 96%, 57%, 0.12) 0px, transparent 50%)',
  cards: 'radial-gradient(at 0% 0%, hsla(265, 89%, 68%, 0.05) 0px, transparent 50%), radial-gradient(at 100% 100%, hsla(176, 87%, 45%, 0.05) 0px, transparent 50%)',
}

// Glass card styles
const glassCard = 'bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-500'
const glassCardHover = 'hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:-translate-y-1'

// ============================================================================
// ROTATING WORDS - Premium Animation
// ============================================================================

const heroWords = ['Build', 'Create', 'Ship', 'Scale', 'Dream']
const heroObjects = [
  'intelligent systems',
  'AI-powered music',
  'creator workflows',
  'digital products',
  'your vision',
]

function RotatingWord() {
  const [index, setIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroWords.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [shouldReduceMotion])

  return (
    <span className="inline-block relative min-w-[180px] md:min-w-[240px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 30, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -30, opacity: 0, rotateX: 90 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent"
        >
          {heroWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function RotatingObject() {
  const [index, setIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroObjects.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [shouldReduceMotion])

  return (
    <span className="inline-block relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block font-serif-italic text-white/90"
        >
          {heroObjects[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// ============================================================================
// PREMIUM BADGE COMPONENT
// ============================================================================

function PremiumBadge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'new' | 'popular' }) {
  const variants = {
    default: 'bg-white/5 border-white/10 text-white/70',
    new: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    popular: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider border ${variants[variant]}`}>
      {variant === 'new' && <Sparkles className="w-3 h-3" />}
      {variant === 'popular' && <Star className="w-3 h-3" />}
      {children}
    </span>
  )
}

// ============================================================================
// HERO SECTION - Premium
// ============================================================================

function HeroPremium() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  // Slower, more elegant scroll effect
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.85], [0, 80])
  const scale = useTransform(scrollYProgress, [0, 0.85], [1, 0.97])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ background: meshGradients.hero }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20"
        style={shouldReduceMotion ? undefined : { opacity, y, scale }}
      >
        <div className="text-center max-w-5xl mx-auto">
          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-8 flex-wrap"
          >
            <PremiumBadge>AI Architect @ Oracle</PremiumBadge>
            <PremiumBadge variant="new">12K+ AI Songs</PremiumBadge>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6"
          >
            <span className="block text-[clamp(2.5rem,10vw,6rem)] font-bold leading-[1.05] tracking-tight text-white">
              <RotatingWord /> your
            </span>
            <span className="block text-[clamp(2rem,8vw,5rem)] leading-[1.1] tracking-tight mt-2">
              <RotatingObject />
            </span>
          </motion.h1>

          {/* Subheadline with elegant typography */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl text-white/50 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Systems, music, and momentum in the{' '}
            <span className="font-serif-italic text-white/80">Golden Age of Intelligence</span>.
            <span className="block mt-2 text-base md:text-lg text-white/40">
              Everything I build—documented, open, yours to use.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/start"
              onClick={() => trackEvent('premium_hero_cta', { type: 'primary' })}
              className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:-translate-y-0.5"
            >
              Start Building
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/music-lab"
              onClick={() => trackEvent('premium_hero_cta', { type: 'music' })}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
            >
              <Play className="w-4 h-4" />
              Listen to Music
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1 h-1.5 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// BENTO GRID - Premium Showcase
// ============================================================================

const bentoItems = [
  {
    title: 'Vibe OS',
    subtitle: 'Music Creation System',
    description: '500+ Suno workflows, release planning, vibrational production',
    href: '/products/vibe-os',
    icon: Music2,
    color: 'violet',
    badge: 'popular',
    span: 'col-span-2 row-span-1',
    image: '/images/3d/music_3d.png',
  },
  {
    title: 'AI Art Gallery',
    subtitle: 'Visual Explorations',
    description: 'Generative art created with nano-banana AI',
    href: '/ai-art',
    icon: Palette,
    color: 'cyan',
    badge: 'new',
    span: 'col-span-1 row-span-2',
    image: '/images/ai-art/generated-2026-01-21T10-05-06-577Z-s5e43g.png',
  },
  {
    title: 'Agent Team',
    subtitle: 'AI Collaborators',
    description: 'Meet the specialized agents powering this ecosystem',
    href: '/agent-team',
    icon: Users,
    color: 'emerald',
    span: 'col-span-1 row-span-1',
    image: '/images/3d/brain_3d.png',
  },
  {
    title: 'Agentic Creator OS',
    subtitle: 'Enterprise Architecture',
    description: 'Oracle-grade systems for conscious creators',
    href: '/products/agentic-creator-os',
    icon: Cpu,
    color: 'amber',
    span: 'col-span-1 row-span-1',
    image: '/images/3d/rocket_3d.png',
  },
  {
    title: 'Intelligence Atlas',
    subtitle: 'Knowledge System',
    description: 'Navigate AI tools, concepts, and methodologies',
    href: '/intelligence-atlas',
    icon: Map,
    color: 'cyan',
    span: 'col-span-1 row-span-1',
    image: '/images/3d/crystal_ball_3d.png',
  },
  {
    title: 'Guides',
    subtitle: 'Deep Dives',
    description: 'Comprehensive tutorials and technical walkthroughs',
    href: '/guides',
    icon: BookOpen,
    color: 'emerald',
    span: 'col-span-1 row-span-1',
    image: '/images/3d/3dicons-notebook-dynamic-premium.png',
  },
]

function BentoGrid() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-4">
            The Ecosystem
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Everything you need to{' '}
            <span className="font-serif-italic text-white/80">create, build, and ship</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Systems, tools, and resources for AI architects, music creators, and builders
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[200px]">
          {bentoItems.map((item, i) => {
            const colorMap = {
              violet: { bg: 'from-violet-500/10', border: 'hover:border-violet-500/30', text: 'text-violet-400' },
              cyan: { bg: 'from-cyan-500/10', border: 'hover:border-cyan-500/30', text: 'text-cyan-400' },
              emerald: { bg: 'from-emerald-500/10', border: 'hover:border-emerald-500/30', text: 'text-emerald-400' },
              amber: { bg: 'from-amber-500/10', border: 'hover:border-amber-500/30', text: 'text-amber-400' },
            }
            const colors = colorMap[item.color as keyof typeof colorMap]

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={item.span}
              >
                <Link
                  href={item.href}
                  className={`group relative block h-full rounded-2xl md:rounded-3xl ${glassCard} ${glassCardHover} ${colors.border} overflow-hidden`}
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Image */}
                  {item.image && (
                    <div className="absolute right-4 bottom-4 w-16 h-16 md:w-24 md:h-24 opacity-30 group-hover:opacity-50 transition-opacity">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative p-5 md:p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2.5 rounded-xl bg-white/5 ${colors.text}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      {item.badge && (
                        <PremiumBadge variant={item.badge as 'new' | 'popular'}>
                          {item.badge}
                        </PremiumBadge>
                      )}
                    </div>

                    <div className="mt-auto">
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">
                        {item.subtitle}
                      </p>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/40 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className="absolute bottom-5 right-5 w-5 h-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// STATS RIBBON - Premium
// ============================================================================

function StatsRibbon() {
  const stats = [
    { value: '12K+', label: 'Songs Created', icon: Music2 },
    { value: '500+', label: 'Prompt Templates', icon: FileText },
    { value: 'Oracle', label: 'AI Architect', icon: Cpu },
    { value: 'Open', label: 'Everything Documented', icon: BookOpen },
  ]

  return (
    <section className="py-16 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-6 h-6 text-emerald-400/60 mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm text-white/40">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// FEATURED MUSIC PLAYER - Premium
// ============================================================================

const featuredSong = {
  id: '9cbad174-9276-427f-9aed-1ba00c7db3db',
  title: 'Vibe OS',
  genre: 'Electronic',
}

function FeaturedMusic() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-400/70 mb-4">
              Music Lab
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
              A daily practice of{' '}
              <span className="font-serif-italic text-white/80">sonic exploration</span>
            </h2>
            <p className="text-lg text-white/50 mb-8 leading-relaxed">
              Music as meditation. Each session teaches me something new about sound,
              emotion, and the creative process. 12,000+ songs and counting.
            </p>

            <blockquote className="border-l-2 border-violet-400/40 pl-6 mb-8">
              <p className="text-xl font-serif-italic text-white/70 leading-relaxed">
                "I create to understand. Music is my daily practice of presence."
              </p>
            </blockquote>

            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="https://suno.com/@frankx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-medium transition-colors"
              >
                Full Library on Suno
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="/music-lab"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white font-medium transition-colors"
              >
                Explore Music Lab
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Player card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-violet-500/20 via-cyan-500/10 to-transparent blur-2xl opacity-60 rounded-3xl" />
            <div className={`relative rounded-2xl md:rounded-3xl ${glassCard} p-4 md:p-6 overflow-hidden`}>
              <iframe
                src={`https://suno.com/embed/${featuredSong.id}`}
                className="w-full h-[320px] md:h-[400px] rounded-xl"
                frameBorder="0"
                allow="autoplay; clipboard-write"
                loading="lazy"
                title={`${featuredSong.title} - AI Generated Music`}
              />

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-violet-400/80 mb-1">Now Playing</p>
                  <p className="text-white font-medium">{featuredSong.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-medium">
                    {featuredSong.genre}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// QUICK START PATHS - Premium
// ============================================================================

const pathways = [
  {
    icon: Music2,
    title: 'Create Music',
    description: 'Generate your first AI song with Suno',
    time: '5 min',
    href: '/music-lab',
    color: 'violet',
  },
  {
    icon: Sparkles,
    title: 'Browse Prompts',
    description: '50+ battle-tested prompts for all AI tools',
    time: 'Browse',
    href: '/prompt-library',
    color: 'emerald',
  },
  {
    icon: BookOpen,
    title: 'Learn AI',
    description: 'Curated courses from Oracle, Google, MIT',
    time: 'Free',
    href: '/students',
    color: 'cyan',
  },
  {
    icon: Map,
    title: 'Navigate Tools',
    description: 'Find the right AI tool for your project',
    time: 'Explore',
    href: '/intelligence-atlas',
    color: 'amber',
  },
]

function QuickStartPaths() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-4">
            Quick Start
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Start creating in minutes
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pathways.map((path, i) => {
            const colorMap = {
              violet: 'bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20',
              emerald: 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20',
              cyan: 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20',
              amber: 'bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20',
            }

            return (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={path.href}
                  className={`group block p-5 rounded-2xl ${glassCard} h-full`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl transition-colors ${colorMap[path.color as keyof typeof colorMap]}`}>
                      <path.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-white/50">
                      {path.time}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {path.title}
                  </h3>
                  <p className="text-sm text-white/40">{path.description}</p>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// ABOUT TEASER - Premium
// ============================================================================

function AboutTeaser() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-6">
            The Journey
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-8">
            Music, technology, family, and the endless exploration of how things work.
            <span className="block mt-3 font-serif-italic text-white/60 text-2xl md:text-3xl lg:text-4xl">
              These threads weave through everything here.
            </span>
          </h2>

          <div className="space-y-6 text-lg text-white/50 leading-relaxed mb-10">
            <p>
              By day, I architect AI systems at Oracle. By night, I make music—thousands of songs
              exploring what's possible when humans and AI create together.
            </p>
            <p className="text-white/60">
              This site is my workshop, my notebook, my attempt to share what I'm learning.
              Not courses to sell, not followers to count. Just the work itself.
            </p>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-white font-medium hover:text-emerald-400 transition-colors"
            >
              Read the full story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-4 text-sm text-white/40">
              <a href="https://linkedin.com/in/frank-x-riemer/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <span>·</span>
              <a href="https://github.com/frankxai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
              <span>·</span>
              <a href="https://suno.com/@frankx" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Suno</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// FINAL CTA - Premium
// ============================================================================

function FinalCTAPremium() {
  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Subtle glow */}
          <div className="absolute inset-x-0 -inset-y-10 bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-violet-500/5 blur-3xl opacity-50 pointer-events-none" />

          <h2 className="relative text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight mb-6">
            Start where you are.
          </h2>
          <p className="relative text-lg md:text-xl text-white/50 mb-10 max-w-2xl mx-auto">
            Whether you're learning AI, creating music, or building systems—there's something here for you.{' '}
            <span className="font-serif-italic text-white/70">All of it is open.</span>
          </p>

          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/start"
              onClick={() => trackEvent('premium_final_cta', { type: 'primary' })}
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:-translate-y-0.5"
            >
              Pick Your Path
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/resources"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
            >
              Browse Resources
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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

export default function HomePagePremium() {
  return (
    <main className="relative min-h-screen text-white bg-[#0a0a0b] overflow-x-hidden">
      <HeroPremium />
      <StatsRibbon />
      <BentoGrid />
      <FeaturedMusic />
      <QuickStartPaths />
      <AboutTeaser />
      <FinalCTAPremium />
    </main>
  )
}
