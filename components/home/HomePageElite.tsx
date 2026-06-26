'use client'

import { motion, useScroll, useTransform, useSpring, useReducedMotion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'

import { trackEvent } from '@/lib/analytics'
import { EmailSignup } from '@/components/email-signup'
import { GlowCard } from '@/components/ui/glow-card'
import { FrankOmegaAvatar } from '@/components/FrankOmega'
import TrustedByBlock from '@/components/social-proof/TrustedByBlock'

// ============================================================================
// TYPES
// ============================================================================

interface LatestPost {
  slug: string
  title: string
  description: string
  category: string
  readingTime: string
  date: string
  image?: string
}

interface FAQItem {
  question: string
  answer: string
}

interface FeaturedTrackData {
  id: string
  title: string
  sunoId: string
  audioUrl: string
  genre: string[]
  plays: number
  duration: string
}

interface BookData {
  slug: string
  title: string
  subtitle: string
  coverImage: string
}

interface LibraryBookData {
  slug: string
  title: string
  author: string
  coverImage: string
  quoteCount: number
  chapterCount: number
}

interface HomePageEliteProps {
  latestPosts?: LatestPost[]
  faqs?: FAQItem[]
  featuredTrack?: FeaturedTrackData
  books?: BookData[]
  libraryBooks?: LibraryBookData[]
}

// ============================================================================
// AURORA BACKGROUND
// ============================================================================

function AuroraBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{ backgroundColor: '#0a0a0b' }} />

      {/* Primary emerald blob */}
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
          filter: 'blur(128px)',
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : { x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.05, 1] }
        }
        transition={shouldReduceMotion ? undefined : { duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Secondary cyan blob */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.04) 0%, transparent 70%)',
          filter: 'blur(128px)',
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : { x: [0, -40, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }
        }
        transition={shouldReduceMotion ? undefined : { duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Tertiary violet blob */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, transparent 70%)',
          filter: 'blur(128px)',
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
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
// ROTATING WORD
// ============================================================================

const heroWords = ['Building', 'Designing', 'Architecting', 'Creating', 'Shipping']

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
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
        {heroWords[0]}
      </span>
    )
  }

  return (
    <span className="inline-block relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
          style={{ lineHeight: 1.1, paddingBottom: '0.05em' }}
        >
          {heroWords[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// ============================================================================
// FEATURED TRACK (inline player for hero)
// ============================================================================

function FeaturedTrack({ track }: { track: FeaturedTrackData }) {
  return (
    <GlowCard color="emerald" className="p-0 overflow-hidden">
      {/* Suno embed — shows cover art, title, waveform + controls */}
      <div className="rounded-2xl overflow-hidden">
        <iframe
          src={`https://suno.com/embed/${track.sunoId}`}
          className="w-full h-[380px]"
          style={{ border: 'none' }}
          allow="clipboard-write"
          loading="lazy"
          title={track.title}
        />
      </div>

      <div className="px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-400/70 font-medium uppercase tracking-wide">Vibe OS</span>
          <span className="text-xs text-white/30">·</span>
          <span className="text-xs text-white/40">{track.genre.join(', ')}</span>
        </div>
        <Link
          href="/music"
          className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-emerald-400 transition-colors"
        >
          All tracks
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </GlowCard>
  )
}

// ============================================================================
// HERO
// ============================================================================

const staggerEase = [0.22, 1, 0.36, 1] as const

function Hero({ featuredTrack }: { featuredTrack?: FeaturedTrackData }) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 30])

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] flex items-center overflow-hidden pt-16 md:pt-20"
    >
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-20"
        style={shouldReduceMotion ? undefined : { opacity, y }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column — Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: staggerEase }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-white/60">AI Architect & Creator</span>
              </div>

              <h1
                aria-label="Building intelligence that compounds."
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-white"
              >
                <RotatingWord /> intelligence
                <br />
                that compounds.
              </h1>

              <p className="text-[17px] md:text-xl text-white/70 max-w-xl leading-relaxed">
                Former AI Architect, Oracle. 12,000+ songs with Suno.
                90+ open-source AI skills. Everything documented.
              </p>

              <div className="flex items-center gap-3">
                <FrankOmegaAvatar size="xs" />
                <p className="font-serif italic text-base md:text-lg text-white/50 max-w-lg">
                  &ldquo;I create to understand. I share to teach.&rdquo;
                </p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.3, ease: staggerEase }}
            >
              <Link
                href="/start"
                onClick={() => trackEvent('hero_cta_click', { type: 'primary' })}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-14 text-base font-semibold shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl hover:shadow-emerald-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] active:scale-[0.98]"
              >
                Start learning
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/inner-circle"
                onClick={() => trackEvent('hero_cta_click', { type: 'secondary' })}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white px-8 h-14 text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                Get the playbook
              </Link>
            </motion.div>
          </div>

          {/* Right Column — Featured Track */}
          <div className="relative hidden md:block">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.2 }}
            >
              {featuredTrack ? (
                <FeaturedTrack track={featuredTrack} />
              ) : (
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
                  <iframe
                    src="https://suno.com/embed/9cbad174-9276-427f-9aed-1ba00c7db3db"
                    className="w-full h-[380px]"
                    style={{ border: 'none' }}
                    allow="clipboard-write"
                    loading="lazy"
                    title="Vibe OS — Featured Track"
                  />
                </div>
              )}
            </motion.div>
          </div>
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
// AUTHORITY BAR
// ============================================================================

const credentials = [
  'Ex-Oracle · Enterprise AI',
  '12,000+ AI Songs Created',
  '90+ Open-Source AI Skills',
  'Everything Documented',
]

function AuthorityBar() {
  return (
    <section className="py-16 md:py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:gap-x-0"
        >
          {credentials.map((item, i) => (
            <div key={item} className="flex items-center">
              {i > 0 && <div className="hidden md:block w-px h-4 bg-white/10 mx-6 lg:mx-8" />}
              <span className="text-sm md:text-base text-white/40 font-medium tracking-wide">
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// PRODUCTS & TOOLS — Expanded 6-card grid
// ============================================================================

const products = [
  {
    title: 'Agentic Creator OS',
    description: 'Open-source operating system for Claude Code. 90+ skills, 60+ agents, 80+ commands.',
    href: '/acos',
    color: 'emerald' as const,
  },
  {
    title: 'Prompt Library',
    description: 'Battle-tested prompts for writing, music, coding, and image generation. Free to use.',
    href: '/prompt-library',
    color: 'violet' as const,
  },
  {
    title: 'Creator Kit',
    description: 'Premium templates, video guides, and direct support for ACOS. From $47.',
    href: '/products',
    color: 'cyan' as const,
  },
  {
    title: 'AI Architecture Hub',
    description: 'Enterprise AI patterns, agent orchestration, system design. Battle-tested at enterprise scale.',
    href: '/ai-architecture',
    color: 'blue' as const,
  },
  {
    title: 'Music Lab',
    description: '12,000+ AI songs. Production workflows. Genre mastery guides.',
    href: '/music-lab',
    color: 'orange' as const,
  },
  {
    title: 'Design Lab',
    description: 'Generative art, visual experiments, nature-tech aesthetics.',
    href: '/design-lab',
    color: 'magenta' as const,
  },
]

function ProductsTools() {
  return (
    <section className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/50 font-medium mb-4">
            Products & Tools
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Built for builders
          </h2>
          <p className="text-base text-white/60 max-w-2xl mx-auto">
            Open-source tools, premium resources, and creative systems — built for builders who ship.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <GlowCard href={product.href} color={product.color} className="p-5 sm:p-6 h-full hover:-translate-y-0.5">
                <div className="h-0.5 w-full bg-gradient-to-r from-emerald-500/50 to-cyan-500/50 rounded-full mb-5" />
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {product.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-white/30 group-hover:text-white/50 transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// HUB SHOWCASE — Reusable alternating layout
// ============================================================================

interface HubShowcaseProps {
  eyebrow: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  links: { label: string; href: string }[]
  ctaLabel: string
  ctaHref: string
  color: 'emerald' | 'cyan' | 'violet' | 'amber' | 'orange' | 'blue'
  imageFirst?: boolean
}

function HubShowcase({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  links,
  ctaLabel,
  ctaHref,
  color,
  imageFirst = false,
}: HubShowcaseProps) {
  const imageBlock = (
    <motion.div
      initial={{ opacity: 0, x: imageFirst ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative aspect-[16/10] rounded-2xl overflow-hidden"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 60vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/60 to-transparent" />
    </motion.div>
  )

  const textBlock = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex flex-col justify-center"
    >
      <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/50 font-medium mb-3">
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
        {title}
      </h2>
      <p className="text-base text-white/60 leading-relaxed mb-6">
        {description}
      </p>

      <div className="space-y-2 mb-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group/link"
          >
            <ArrowRight className="w-3.5 h-3.5 text-emerald-500/60 group-hover/link:translate-x-0.5 transition-transform" />
            {link.label}
          </Link>
        ))}
      </div>

      <Link
        href={ctaHref}
        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
      >
        {ctaLabel}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  )

  return (
    <section className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {imageFirst ? (
            <>
              <div className="lg:col-span-3">{imageBlock}</div>
              <div className="lg:col-span-2">{textBlock}</div>
            </>
          ) : (
            <>
              <div className="lg:col-span-2">{textBlock}</div>
              <div className="lg:col-span-3">{imageBlock}</div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CREATIVE WORLDS — Full-width cinematic banner
// ============================================================================

function CreativeWorlds() {
  return (
    <section className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Banner image */}
          <div className="relative aspect-[21/9] sm:aspect-[21/7]">
            <Image
              src="/images/arcanea/eldrian-conclave-20260301.webp"
              alt="Cinematic AI world-building concept art"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b]/60 to-transparent" />
          </div>

          {/* Overlay text */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <p className="text-[11px] tracking-[0.25em] uppercase text-amber-400/70 font-medium mb-2">
              Creative Worlds
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Creative Systems Lab
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-lg mb-6">
              Experiments in AI-native storytelling, design systems, media pipelines, and autonomous creative infrastructure.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/map"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-200 px-5 py-2.5 text-sm font-medium transition-colors"
              >
                Explore the System
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// DESIGN LAB — Image grid showcase
// ============================================================================

const designLabImages = [
  { src: '/images/design-lab/nature-01-digital-garden-hero.png', alt: 'Digital Garden' },
  { src: '/images/design-lab/nature-02-neural-roots.png', alt: 'Neural Roots' },
  { src: '/images/design-lab/nature-03-code-vines.png', alt: 'Code Vines' },
  { src: '/images/design-lab/nature-04-data-streams.png', alt: 'Data Streams' },
  { src: '/images/design-lab/nature-05-forest-architecture.png', alt: 'Forest Architecture' },
  { src: '/images/design-lab/nature-07-intelligence-bloom.png', alt: 'Intelligence Bloom' },
]

function DesignLab() {
  return (
    <section className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-[11px] tracking-[0.25em] uppercase text-magenta-400/50 font-medium mb-3 text-fuchsia-400/50">
            Visual Experiments
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Design Lab
          </h2>
          <p className="text-base text-white/60 max-w-xl">
            Generative art experiments. Nature-tech fusion aesthetics.
            Digital gardens where code meets organic form.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
          {designLabImages.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative aspect-square rounded-2xl overflow-hidden group/img"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/10 transition-colors" />
            </motion.div>
          ))}
        </div>

        <Link
          href="/design-lab"
          className="inline-flex items-center gap-2 text-sm font-medium text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
        >
          Visit Design Lab
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}

// ============================================================================
// BOOKS SHOWCASE — Horizontal scroll
// ============================================================================

function BooksShowcase({ books }: { books: BookData[] }) {
  if (!books || books.length === 0) return null

  return (
    <section className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-amber-400/50 font-medium mb-3">
              Frank&apos;s Books
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Books &amp; Writing
            </h2>
            <p className="text-base text-white/60 max-w-lg">
              Spanning poetry, discipline, creativity, and hope. Read free online or download as PDF.
            </p>
          </div>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors flex-shrink-0"
          >
            Browse books
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:overflow-visible snap-x snap-mandatory sm:snap-none">
          {books.map((book, i) => (
            <motion.div
              key={book.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex-shrink-0 w-[140px] sm:w-auto snap-start"
            >
              <Link href={`/books/${book.slug}`} className="group block">
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 shadow-lg shadow-black/30 group-hover:shadow-xl group-hover:shadow-black/40 transition-shadow">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 140px, (max-width: 768px) 33vw, 16vw"
                  />
                </div>
                <h3 className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-xs text-white/40 line-clamp-1">{book.subtitle}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// LIBRARY OS — Curated book deep-dives + open-source system
// ============================================================================

function LibraryShowcase({ libraryBooks }: { libraryBooks: LibraryBookData[] }) {
  if (!libraryBooks || libraryBooks.length === 0) return null

  return (
    <section className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
              The Library OS · Open Source
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Every book, a permanent asset
            </h2>
            <p className="text-base text-white/55 max-w-xl">
              Curated deep-dives — quotes, chapter summaries, and the connections between ideas. Built on the open-source <Link href="/library/approach" className="text-white/80 underline decoration-white/20 underline-offset-4 hover:decoration-emerald-400/60 transition">Library OS</Link>. Clone it. Run it. Make your reading life public.
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
            <Link
              href="/library"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              Browse the Library
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/library/build"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-4 py-1.5 text-xs font-medium text-emerald-200 hover:bg-emerald-400/10 hover:border-emerald-400/50 transition-colors"
            >
              Build your own
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {libraryBooks.slice(0, 5).map((book, i) => (
            <motion.div
              key={book.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={`/library/${book.slug}`} className="group block">
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 shadow-lg shadow-black/30 group-hover:shadow-xl group-hover:shadow-black/40 transition-shadow ring-1 ring-white/5 group-hover:ring-emerald-400/30">
                  <Image
                    src={book.coverImage}
                    alt={`${book.title} by ${book.author}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2 text-[10px] text-white/90">
                    <span className="rounded-full bg-emerald-500/20 backdrop-blur px-2 py-0.5 ring-1 ring-emerald-400/40">
                      {book.quoteCount} quotes
                    </span>
                    <span className="rounded-full bg-white/10 backdrop-blur px-2 py-0.5 ring-1 ring-white/20">
                      {book.chapterCount} ch
                    </span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-xs text-white/40 line-clamp-1">{book.author}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/40"
        >
          <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" /> MIT-licensed</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" /> Cross-AI portable</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" /> SEO + JSON-LD per book</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" /> 3 commands, 1 schema</span>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// LATEST ARTICLES — Expanded to 6 posts
// ============================================================================

function LatestArticles({ posts }: { posts: LatestPost[] }) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Latest
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            All articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <GlowCard href={`/blog/${post.slug}`} color="emerald" className="p-0 h-full hover:-translate-y-0.5 overflow-hidden">
                {post.image && (
                  <div className="relative h-36 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/80 to-transparent" />
                  </div>
                )}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 text-white/50 uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-xs text-white/30">{post.readingTime}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-white/60 line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// LEARNING HUB — 4-card grid
// ============================================================================

const learningCards = [
  {
    title: 'Students & Creators',
    description: 'AI guides for students, families, and aspiring creators.',
    href: '/students',
    image: '/images/blog/agi-2026-opportunities-students-creators-hero.png',
    color: 'cyan' as const,
  },
  {
    title: 'Guides & Tutorials',
    description: 'Step-by-step guides from beginner to advanced.',
    href: '/guides',
    image: '/images/blog/ultimate-guide-ai-coding-agents-2026-hero-v2.png',
    color: 'emerald' as const,
  },
  {
    title: 'Watch',
    description: 'Video tutorials and workshop recordings.',
    href: '/watch',
    image: '/images/blog/creators-ai-toolkit-workshop-hero.png',
    color: 'violet' as const,
  },
  {
    title: 'Tools & Resources',
    description: 'Curated tools, templates, and resource libraries.',
    href: '/tools',
    image: '/images/blog/golden-age-field-guide-hero.png',
    color: 'amber' as const,
  },
]

function LearningHub() {
  return (
    <section className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-[11px] tracking-[0.25em] uppercase text-cyan-400/50 font-medium mb-3">
            Resources
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Learn & Explore
          </h2>
          <p className="text-base text-white/60 max-w-lg">
            Guides, courses, video tutorials, and tools — everything you need to level up.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {learningCards.map((card, i) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlowCard href={card.href} color={card.color} className="p-0 h-full hover:-translate-y-0.5 overflow-hidden">
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/80 to-transparent" />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">{card.description}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-white/30 group-hover:text-white/50 transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// EMAIL CTA
// ============================================================================

function EmailCTA() {
  return (
    <section className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-12 text-center backdrop-blur-xl"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="relative">
            {/* FRANK-Ω avatar */}
            <div className="mx-auto mb-4 w-12 h-12 rounded-full overflow-hidden border border-blue-500/30">
              <Image
                src="/images/mascot/frank-omega-chibi-avatar-v1_thumb.jpeg"
                alt="FRANK-Ω"
                width={48}
                height={48}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400">Weekly Insights</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-3">
              Stay in the Signal Loop
            </h2>
            <p className="text-[15px] md:text-base text-white/70 mb-8 max-w-sm mx-auto leading-relaxed">
              One focused transmission a week. No noise—just the latest story, framework, and soundtrack I&apos;m shipping.
            </p>
            <div className="max-w-sm mx-auto">
              <EmailSignup
                listType="newsletter"
                placeholder="your@email.com"
                buttonText="Subscribe"
                compact
              />
            </div>
            <p className="mt-4 text-xs text-white/30">
              Unsubscribe anytime. No spam.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// FAQ SECTION
// ============================================================================

function FAQSection({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!faqs || faqs.length === 0) return null

  return (
    <section className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Frequently asked
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                className="w-full text-left rounded-2xl border border-white/[0.08] bg-white/[0.03] [backdrop-filter:blur(24px)_saturate(150%)] p-5 transition-all duration-300 hover:border-white/[0.18] hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-emerald-400 focus-visible:outline-offset-2 [box-shadow:0_4px_16px_-4px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm sm:text-base font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    aria-hidden="true"
                    className={`w-4 h-4 text-white/40 flex-shrink-0 transition-transform duration-200 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-sm text-white/60 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// FRANK-Ω — Digital Twin
// ============================================================================

function DigitalTwin() {
  return (
    <section className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-sm mx-auto lg:mx-0">
              <Image
                src="/images/mascot/frank-omega-pixar-blue-v1.png"
                alt="FRANK-Ω — Digital Twin"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              {/* Glow behind */}
              <div className="absolute inset-0 -z-10 bg-blue-500/10 rounded-full blur-[80px]" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-[11px] tracking-[0.25em] uppercase text-blue-400/60 font-medium mb-3">
              Digital Twin
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Meet FRANK-Ω
            </h2>
            <p className="text-base text-white/60 leading-relaxed mb-6">
              Two forms. One mind. FRANK-Ω is the completed intelligence — the version that has
              absorbed everything and just executes. Research-grounded visuals in 60 seconds.
              Creator scoring in real-time. Direct answers, no fluff.
            </p>

            <div className="p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-500/30 shrink-0 mt-0.5">
                  <Image
                    src="/images/mascot/frank-omega-chibi-avatar-v1_thumb.jpeg"
                    alt="FRANK-Ω"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <p className="text-sm text-white/60 leading-relaxed italic">
                  &ldquo;Hello. I don&apos;t do small talk. Drop me a topic and I&apos;ll build it.
                  Architecture, music, visuals — name it.&rdquo;
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/lab"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Explore the Lab
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/frankx"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/40 hover:text-white/60 transition-colors"
              >
                The full story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// FINAL CTA
// ============================================================================

function FinalCTA() {
  return (
    <section className="py-24 lg:py-32 border-t border-white/5 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 md:-inset-x-10 md:-inset-y-10 bg-gradient-to-r from-emerald-500/5 via-transparent to-cyan-500/5 blur-3xl opacity-30 rounded-3xl pointer-events-none" />

          <div className="relative text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Start building.
            </h2>
            <p className="font-serif italic text-base md:text-lg text-white/50 mb-2">
              The best way to predict the future is to create it.
            </p>
            <p className="text-[17px] text-white/70 mb-8 md:mb-12 max-w-md mx-auto leading-relaxed">
              Pick your path — architecture, music, or products.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/start"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 text-base font-semibold shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] active:scale-[0.98]"
              >
                Start Here
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/newsletter"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white px-8 py-4 text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                Get the Newsletter
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN COMPONENT — 15 sections
// ============================================================================

export default function HomePageElite({
  latestPosts = [],
  faqs = [],
  featuredTrack,
  books = [],
  libraryBooks = [],
}: HomePageEliteProps) {
  return (
    <main className="relative min-h-screen text-white overflow-x-hidden">
      <AuroraBackground />
      <ScrollProgress />

      <div className="relative z-10 overflow-x-hidden">
        {/* 1-3. Hero with featured track */}
        <Hero featuredTrack={featuredTrack} />

        {/* 4. Authority bar */}
        <AuthorityBar />

        {/* 4b. AI Stack — tool logos with guide links */}
        <TrustedByBlock />

        {/* 5. Products & Tools — moved up, expanded to 6 cards */}
        <ProductsTools />

        {/* 6. AI Architecture hub showcase */}
        <HubShowcase
          eyebrow="Enterprise AI"
          title="AI Architecture"
          description="Enterprise AI systems distilled from years of production work. Multi-agent orchestration, agentic workflows, and production patterns — documented in technical depth."
          imageSrc="/images/blog/production-agentic-ai-systems-hero.png"
          imageAlt="Production Agentic AI Systems"
          links={[
            { label: 'Production Agentic AI Systems', href: '/blog/production-agentic-ai-systems' },
            { label: 'MCP Server Architecture', href: '/blog/mcp-server-architecture-workshop' },
            { label: 'Agent Patterns & Pillars', href: '/blog/production-agent-patterns-7-pillars' },
          ]}
          ctaLabel="Explore AI Architecture"
          ctaHref="/ai-architecture"
          color="blue"
          imageFirst
        />

        {/* 7. Music Lab hub showcase */}
        <HubShowcase
          eyebrow="Music Production"
          title="Music Lab"
          description="12,000+ AI songs produced with Suno. Genre mastery from orchestral to hip hop. Prompt engineering that creates radio-ready tracks."
          imageSrc="/images/blog/suno-prompt-engineering-complete-guide-hero.png"
          imageAlt="Suno Prompt Engineering Guide"
          links={[
            { label: 'Suno Prompt Engineering Guide', href: '/blog/suno-prompt-engineering-complete-guide' },
            { label: 'Science of State Change', href: '/blog/science-of-state-change-music' },
            { label: 'Browse All Tracks', href: '/music' },
          ]}
          ctaLabel="Enter Music Lab"
          ctaHref="/music-lab"
          color="orange"
        />

        {/* 8. Creative Worlds — Arcanea banner */}
        <CreativeWorlds />

        {/* 9. Design Lab — image grid */}
        <DesignLab />

        {/* 10. Frank's Books — cover grid */}
        <BooksShowcase books={books} />

        {/* 10b. Library OS — open-source book deep-dives */}
        <LibraryShowcase libraryBooks={libraryBooks} />

        {/* 11. Latest Articles — expanded to 6 */}
        <LatestArticles posts={latestPosts} />

        {/* 12. Learning Hub — 4-card grid */}
        <LearningHub />

        {/* 13. FRANK-Ω — Digital Twin */}
        <DigitalTwin />

        {/* 14. Email CTA */}
        <EmailCTA />

        {/* 14. FAQ */}
        <FAQSection faqs={faqs} />

        {/* 15. Final CTA */}
        <FinalCTA />
      </div>
    </main>
  )
}
