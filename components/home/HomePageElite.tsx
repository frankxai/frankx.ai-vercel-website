'use client'

import { motion, useScroll, useTransform, useSpring, useReducedMotion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { ArrowRight, ChevronDown, Sparkles, Zap, Brain, Music } from 'lucide-react'

import { trackEvent } from '@/lib/analytics'
import { EmailSignup } from '@/components/email-signup'
import { GlowCard } from '@/components/ui/glow-card'

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
}

interface FAQItem {
  question: string
  answer: string
}

interface HomePageEliteProps {
  latestPosts?: LatestPost[]
  faqs?: FAQItem[]
}

// ============================================================================
// AURORA BACKGROUND
// ============================================================================

function AuroraBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{ backgroundColor: '#0a0a0b' }} />

      {/* Primary emerald blob — top left */}
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

      {/* Secondary cyan blob — right */}
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

      {/* Tertiary violet blob — bottom center */}
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
          style={{ lineHeight: 1.3 }}
        >
          {heroWords[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// ============================================================================
// HERO
// ============================================================================

const staggerEase = [0.22, 1, 0.36, 1] as const

function Hero() {
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
            {/* Eyebrow */}
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

              {/* H1 — rotating verb + static phrase */}
              <h1 className="font-display text-5xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-white">
                <RotatingWord /> intelligence
                <br />
                that compounds.
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed">
                AI Architect at Oracle. 12,000+ songs with Suno.
                75+ open-source skills shipped. Everything documented.
              </p>

              {/* Serif accent — warm personal touch */}
              <p className="font-serif-italic text-base md:text-lg text-white/30 max-w-lg italic">
                "I create to understand. I share to teach."
              </p>
            </motion.div>

            {/* CTAs — emerald primary + ghost secondary */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.3, ease: staggerEase }}
            >
              <Link
                href="/start"
                onClick={() => trackEvent('hero_cta_click', { type: 'primary' })}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-14 text-base font-medium shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl hover:shadow-emerald-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] active:scale-[0.98]"
              >
                Explore the Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/blog"
                onClick={() => trackEvent('hero_cta_click', { type: 'secondary' })}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white px-8 h-14 text-base font-medium transition-all"
              >
                Read the Blog
              </Link>
            </motion.div>
          </div>

          {/* Right Column — Glass Stat Cards with cursor glow */}
          <div className="relative hidden md:block">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {/* Full-width stat — AI Songs */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.3 }}
                className="col-span-2"
              >
                <GlowCard color="emerald">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <p className="text-sm text-white/40 font-medium">AI Songs Created</p>
                        <p className="text-4xl font-bold text-white">12,000+</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                        <Music className="w-6 h-6 text-emerald-400" />
                      </div>
                    </div>
                    <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                      />
                    </div>
                  </div>
                </GlowCard>
              </motion.div>

              {/* Skills stat */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4 }}
              >
                <GlowCard color="violet">
                  <div className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                      <Zap className="w-6 h-6 text-violet-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-white">75+</p>
                      <p className="text-sm text-white/40 font-medium">Open Source Skills</p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>

              {/* Agents stat */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.5 }}
              >
                <GlowCard color="cyan">
                  <div className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                      <Brain className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-white">38</p>
                      <p className="text-sm text-white/40 font-medium">AI Agents</p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
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

const credentials: { text: string; icon?: React.ComponentType<{ size?: number | string; className?: string }> }[] = [
  { text: 'Oracle AI Architect' },
  { text: '12,000+ AI Songs', icon: Music },
  { text: '75+ Open Source Skills' },
  { text: '38 Autonomous Agents' },
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
            <div key={item.text} className="flex items-center">
              {i > 0 && <div className="hidden md:block w-px h-4 bg-white/10 mx-6 lg:mx-8" />}
              <span className="inline-flex items-center gap-1.5 text-sm md:text-base text-white/40 font-medium tracking-wide">
                {item.icon && <item.icon size={14} className="opacity-60" />}
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// CAPABILITIES — 3 PILLARS
// ============================================================================

const pillars = [
  {
    title: 'AI Architecture',
    description:
      'Enterprise AI systems, agentic orchestration, and multi-agent workflows. Built at Oracle, documented here.',
    href: '/ai-architecture',
    cta: 'Explore',
    icon: Brain,
    color: 'emerald' as const,
    stat: '4+ years',
    statLabel: 'Enterprise AI',
  },
  {
    title: 'Creative Systems',
    description:
      '12,000+ AI songs. Generative art. Music production workflows — the full creative process, documented.',
    href: '/music-lab',
    cta: 'Listen',
    icon: Music,
    color: 'cyan' as const,
    stat: '12,000+',
    statLabel: 'AI Songs',
  },
  {
    title: 'Open Tools',
    description:
      'ACOS with 75+ skills and 38 agents. Prompt libraries. Templates. All open source, all yours.',
    href: '/products',
    cta: 'Browse',
    icon: Zap,
    color: 'violet' as const,
    stat: '75+',
    statLabel: 'Skills Shipped',
  },
]

const pillarColors = {
  emerald: { bg: 'bg-emerald-500/10', hover: 'group-hover:bg-emerald-500/20', text: 'text-emerald-400', titleHover: 'group-hover:text-emerald-400', border: 'hover:border-emerald-500/30' },
  cyan: { bg: 'bg-cyan-500/10', hover: 'group-hover:bg-cyan-500/20', text: 'text-cyan-400', titleHover: 'group-hover:text-cyan-400', border: 'hover:border-cyan-500/30' },
  violet: { bg: 'bg-violet-500/10', hover: 'group-hover:bg-violet-500/20', text: 'text-violet-400', titleHover: 'group-hover:text-violet-400', border: 'hover:border-violet-500/30' },
}

function Capabilities() {
  return (
    <section className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-emerald-400/50 mb-4">
            Capabilities
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Three domains. One practice.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {pillars.map((pillar, i) => {
            const colors = pillarColors[pillar.color]
            const Icon = pillar.icon

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlowCard color={pillar.color} href={pillar.href} className="hover:-translate-y-1">
                  <div className="p-6 md:p-8 h-full flex flex-col">
                    <div className={`w-12 h-12 rounded-2xl ${colors.bg} ${colors.hover} flex items-center justify-center mb-5 transition-colors`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>

                    <h3 className={`text-xl md:text-2xl font-semibold text-white mb-3 ${colors.titleHover} transition-colors`}>
                      {pillar.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/50 leading-relaxed mb-6 flex-1">
                      {pillar.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div>
                        <span className={`text-2xl font-bold ${colors.text}`}>{pillar.stat}</span>
                        <span className="text-xs text-white/30 ml-2">{pillar.statLabel}</span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm text-white/40 group-hover:text-white/70 transition-colors">
                        {pillar.cta}
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// LATEST ARTICLES
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
              transition={{ delay: i * 0.1 }}
            >
              <GlowCard color="emerald" href={`/blog/${post.slug}`} className="hover:-translate-y-0.5">
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
                  <p className="text-sm text-white/50 line-clamp-2 leading-relaxed">
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
// PRODUCTS SHOWCASE
// ============================================================================

const products = [
  {
    title: 'Agentic Creator OS',
    description: '75+ skills, 38 agents, 35+ commands. The open-source operating system for Claude Code.',
    href: '/acos',
  },
  {
    title: 'Prompt Library',
    description: 'Battle-tested prompts for writing, music, coding, and image generation. Free to use.',
    href: '/prompt-library',
  },
  {
    title: 'Creator Kit',
    description: 'Premium templates, video guides, and direct support for ACOS. From $47.',
    href: '/products',
  },
]

function ProductsShowcase() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Built for builders
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlowCard color="emerald" href={product.href} className="hover:-translate-y-0.5">
                <div className="p-5 sm:p-6">
                  {/* Gradient accent line */}
                  <div className="h-0.5 w-full bg-gradient-to-r from-emerald-500/50 to-cyan-500/50 rounded-full mb-5" />
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-white/30 group-hover:text-white/50 transition-colors">
                    <span>Learn more</span>
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
          {/* Decorative gradient blob */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400">Weekly Insights</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
              AI architecture and creative systems.
            </h2>
            <p className="font-serif-italic text-base text-white/40 mb-8 italic">
              Weekly dispatch. No spam, no guru energy — just the work.
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
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left rounded-2xl border border-white/[0.08] bg-white/[0.04] [backdrop-filter:blur(32px)_saturate(160%)] p-5 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm sm:text-base font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
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
                      <p className="mt-3 text-sm text-white/50 leading-relaxed">
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
          {/* Reduced glow */}
          <div className="absolute inset-0 md:-inset-x-10 md:-inset-y-10 bg-gradient-to-r from-emerald-500/5 via-transparent to-cyan-500/5 blur-3xl opacity-30 rounded-3xl pointer-events-none" />

          <div className="relative text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tight">
              Start building.
            </h2>
            <p className="font-serif-italic text-lg md:text-xl text-white/40 mb-8 md:mb-12 max-w-lg mx-auto italic">
              The best way to learn is to create. The best way to understand is to ship.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/start"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 text-base font-semibold shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] active:scale-[0.98]"
              >
                Start Here
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/newsletter"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 text-base font-medium transition-all"
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
// MAIN COMPONENT
// ============================================================================

export default function HomePageElite({ latestPosts = [], faqs = [] }: HomePageEliteProps) {
  return (
    <main className="relative min-h-screen text-white overflow-x-hidden">
      <AuroraBackground />
      <ScrollProgress />

      <div className="relative z-10 overflow-x-hidden">
        <Hero />
        <AuthorityBar />
        <Capabilities />
        <LatestArticles posts={latestPosts} />
        <ProductsShowcase />
        <EmailCTA />
        <FAQSection faqs={faqs} />
        <FinalCTA />
      </div>
    </main>
  )
}
