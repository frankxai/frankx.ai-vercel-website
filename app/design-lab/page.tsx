'use client'

import { useState, useMemo, useRef, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Code2,
  Command,
  Component,
  CreditCard,
  Eye,
  FlaskConical,
  GitBranch,
  Layout,
  Layers,
  Leaf,
  Mail,
  Megaphone,
  MousePointerClick,
  Palette,
  ShoppingBag,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from 'lucide-react'
import {
  designExperiments,
  experimentCategoryConfig,
  experimentStatusConfig,
} from '@/lib/design-lab/experiments'
import type { ExperimentCategory, ExperimentStatus } from '@/lib/design-lab/experiments'

// ── Icon Map ──

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layout, Component, BarChart3, Megaphone, ShoppingBag, CreditCard,
  FlaskConical, Layers, Award, Star, Trophy, Zap,
}

// ── Color Config ──

const colorConfig: Record<string, { border: string; text: string; bg: string; gradient: string; glow: string }> = {
  emerald: { border: 'border-emerald-500/30', text: 'text-emerald-400', bg: 'bg-emerald-500/10', gradient: 'from-emerald-500/20 to-emerald-500/5', glow: 'shadow-emerald-500/20' },
  cyan: { border: 'border-cyan-500/30', text: 'text-cyan-400', bg: 'bg-cyan-500/10', gradient: 'from-cyan-500/20 to-cyan-500/5', glow: 'shadow-cyan-500/20' },
  violet: { border: 'border-violet-500/30', text: 'text-violet-400', bg: 'bg-violet-500/10', gradient: 'from-violet-500/20 to-violet-500/5', glow: 'shadow-violet-500/20' },
  amber: { border: 'border-amber-500/30', text: 'text-amber-400', bg: 'bg-amber-500/10', gradient: 'from-amber-500/20 to-amber-500/5', glow: 'shadow-amber-500/20' },
  rose: { border: 'border-rose-500/30', text: 'text-rose-400', bg: 'bg-rose-500/10', gradient: 'from-rose-500/20 to-rose-500/5', glow: 'shadow-rose-500/20' },
  blue: { border: 'border-blue-500/30', text: 'text-blue-400', bg: 'bg-blue-500/10', gradient: 'from-blue-500/20 to-blue-500/5', glow: 'shadow-blue-500/20' },
  orange: { border: 'border-orange-500/30', text: 'text-orange-400', bg: 'bg-orange-500/10', gradient: 'from-orange-500/20 to-orange-500/5', glow: 'shadow-orange-500/20' },
  teal: { border: 'border-teal-500/30', text: 'text-teal-400', bg: 'bg-teal-500/10', gradient: 'from-teal-500/20 to-teal-500/5', glow: 'shadow-teal-500/20' },
}

// ── Glow RGB values per color (for cursor-following border glow) ──

const glowRgb: Record<string, string> = {
  emerald: '16, 185, 129',
  cyan: '6, 182, 212',
  violet: '139, 92, 246',
  amber: '245, 158, 11',
  rose: '244, 63, 94',
  blue: '59, 130, 246',
  orange: '249, 115, 22',
  teal: '20, 184, 166',
}

// ── GlowCard: cursor-following border glow ──

function GlowCard({
  children,
  className = '',
  color = 'teal',
  href,
}: {
  children: React.ReactNode
  className?: string
  color?: string
  href: string
}) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!cardRef.current || !glowRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      glowRef.current.style.background = `radial-gradient(500px circle at ${x}px ${y}px, rgba(${glowRgb[color] || glowRgb.teal}, 0.15), transparent 40%)`
      glowRef.current.style.opacity = '1'
    },
    [color],
  )

  const handleMouseLeave = useCallback(() => {
    if (!glowRef.current) return
    glowRef.current.style.opacity = '0'
  }, [])

  return (
    <Link
      ref={cardRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative block rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 h-full transition-all duration-300 hover:border-white/[0.15] ${className}`}
    >
      {/* Cursor-following glow overlay */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
      />
      {/* Subtle outer glow on hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(${glowRgb[color] || glowRgb.teal}, 0.08), transparent 70%)`,
        }}
      />
      {children}
    </Link>
  )
}

// ── StatGlowCard: cursor-following glow for non-link cards ──

function StatGlowCard({
  children,
  className = '',
  color = 'teal',
}: {
  children: React.ReactNode
  className?: string
  color?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !glowRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      glowRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(${glowRgb[color] || glowRgb.teal}, 0.12), transparent 40%)`
      glowRef.current.style.opacity = '1'
    },
    [color],
  )

  const handleMouseLeave = useCallback(() => {
    if (!glowRef.current) return
    glowRef.current.style.opacity = '0'
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center transition-all duration-300 hover:border-white/[0.12] ${className}`}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300"
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// ── StepGlowCard: cursor-following glow for How It Works steps ──

function StepGlowCard({
  children,
  className = '',
  color = 'teal',
}: {
  children: React.ReactNode
  className?: string
  color?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !glowRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      glowRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(${glowRgb[color] || glowRgb.teal}, 0.10), transparent 40%)`
      glowRef.current.style.opacity = '1'
    },
    [color],
  )

  const handleMouseLeave = useCallback(() => {
    if (!glowRef.current) return
    glowRef.current.style.opacity = '0'
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/[0.12] ${className}`}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300"
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// ── Computed Stats ──

const totalExperiments = designExperiments.length
const completedExperiments = designExperiments.filter(e => e.status === 'complete').length
const totalEntries = designExperiments.reduce((sum, e) => sum + e.entries.length, 0)
const productizedCount = designExperiments.reduce(
  (sum, e) => sum + e.entries.filter(entry => entry.isProductized).length,
  0,
)
const winnerCount = designExperiments.reduce(
  (sum, e) => sum + e.entries.filter(entry => entry.isWinner).length,
  0,
)

// ── Category Tab Keys ──

const categoryKeys: (ExperimentCategory | 'all')[] = ['all', 'landing-page', 'component', 'dashboard', 'marketing', 'product-page']

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  all: Layers,
  'landing-page': Layout,
  component: Component,
  dashboard: BarChart3,
  marketing: Megaphone,
  'product-page': ShoppingBag,
}

// ── Status Keys ──

const statusKeys: ExperimentStatus[] = ['active', 'judging', 'complete', 'upcoming']

// ── Hero Section ──

function HeroSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-xs font-semibold text-teal-400 tracking-wider uppercase">
              AI Agent Arena
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            Design
            <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Lab
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 mb-8 leading-relaxed max-w-3xl">
            AI coding agents compete at real design challenges. Same brief, same constraints,
            different results. We rate them, you decide, and the best outputs become products.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#experiments"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all"
            >
              View Experiments
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/plan/design-lab"
              className="inline-flex items-center gap-2 bg-white/5 text-white px-6 py-3 rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all"
            >
              See the Plan
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3, duration: 0.8 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {[
            { label: 'Experiments', value: String(totalExperiments), icon: FlaskConical, glow: 'teal' },
            { label: 'Complete', value: String(completedExperiments), icon: Award, glow: 'emerald' },
            { label: 'Agent Entries', value: String(totalEntries), icon: Zap, glow: 'cyan' },
            { label: 'Winners', value: String(winnerCount), icon: Trophy, glow: 'amber' },
            { label: 'Productized', value: String(productizedCount), icon: ShoppingBag, glow: 'violet' },
          ].map((stat, i) => (
            <StatGlowCard key={i} color={stat.glow}>
              <stat.icon className="w-4 h-4 text-white/30 mb-2" />
              <p className="text-2xl font-bold text-white mb-0.5">{stat.value}</p>
              <p className="text-xs text-white/40">{stat.label}</p>
            </StatGlowCard>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── How It Works ──

function HowItWorks() {
  const shouldReduceMotion = useReducedMotion()
  const steps = [
    { title: 'Brief', description: 'Same design challenge given to all AI agents', icon: '1', color: 'emerald' },
    { title: 'Build', description: 'Each agent creates their version independently', icon: '2', color: 'cyan' },
    { title: 'Rate', description: 'Scored on design, code, a11y, performance, creativity', icon: '3', color: 'violet' },
    { title: 'Ship', description: 'Winners get productized and offered for sale', icon: '4', color: 'amber' },
  ]

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">How It Works</h2>
          <p className="text-white/50 max-w-2xl">
            Transparent, educational, and uniquely honest about what AI tools can actually do.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.15 + index * 0.08 }}
            >
              <StepGlowCard color={step.color}>
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-3">
                  <span className="text-sm font-bold text-teal-400">{step.icon}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{step.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{step.description}</p>
              </StepGlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Design Hub Navigation ──

const hubSections = [
  {
    title: 'ACOS Redesign',
    subtitle: 'Three design concepts for presenting 630+ skills: Command Center, Skill Galaxy, Flow Architecture',
    href: '/design-lab/acos',
    icon: Command,
    color: 'violet',
    badge: 'Live Prototypes',
    stats: '3 concepts',
  },
  {
    title: 'Design Excellence',
    subtitle: 'Interactive design system reference: glassmorphism playground, color palette, typography scale, spacing grid',
    href: '/design-lab/design-excellence',
    icon: Eye,
    color: 'amber',
    badge: 'Interactive',
    stats: '6 principles',
  },
  {
    title: 'Frontend Patterns',
    subtitle: 'Component pattern library with live demos and source code: hover effects, animations, micro-interactions',
    href: '/design-lab/frontend-design',
    icon: MousePointerClick,
    color: 'emerald',
    badge: 'Code + Preview',
    stats: '10 patterns',
  },
  {
    title: 'v0 Design Showcase',
    subtitle: '16 premium AI-generated designs across two waves — v0-1.5-lg, v0-pro, and GPT-5 models',
    href: '/design-lab/v0',
    icon: Sparkles,
    color: 'cyan',
    badge: '16 Designs',
    stats: '2 waves',
  },
  {
    title: 'Arcanea Compose',
    subtitle: 'Email design system: 13 templates, 5 accent palettes, "Oasis of Calm" typography-driven design',
    href: '/design-lab/newsletter',
    icon: Mail,
    color: 'violet',
    badge: 'Design System',
    stats: '13 templates',
  },
  {
    title: 'Arcanea Universe',
    subtitle: 'Frequency-based color system, mythological typography, 10 Gates progression, and cosmic visual language',
    href: '/design-lab/arcanea',
    icon: Star,
    color: 'violet',
    badge: 'Design System',
    stats: '10 gates',
  },
]

const designStudies = [
  {
    title: 'Nature × Technology',
    subtitle: '10 AI-generated concept images exploring organic intelligence meets dark technology',
    href: '/design-lab/nature',
    image: '/images/design-lab/nature-01-digital-garden.png',
    color: 'emerald',
    stats: [
      { label: 'Concepts', value: '10' },
      { label: 'Principles', value: '5' },
    ],
    tags: ['AI Images', 'Design System', 'CSS Tokens'],
  },
  {
    title: 'Hub Redesign Variants',
    subtitle: '6 key page redesign concepts — Homepage, Products, Blog, Labs, Inner Circle, ACOS',
    href: '/design-lab/nature/variants',
    image: '/images/design-lab/variant-homepage-nature.png',
    color: 'cyan',
    stats: [
      { label: 'Variants', value: '6' },
      { label: 'Phases', value: '3' },
    ],
    tags: ['Homepage', 'Products', 'Blog', 'Labs', 'ACOS'],
  },
]

function DesignHub() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-violet-500/10 rounded-xl">
              <GitBranch className="w-5 h-5 text-violet-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Explore</h2>
          </div>
          <p className="text-white/50 max-w-2xl">
            Design systems, page redesigns, component patterns, and AI-generated explorations.
          </p>
        </motion.div>

        {/* Hub Section Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {hubSections.map((section, index) => {
            const colors = colorConfig[section.color] || colorConfig.teal
            return (
              <motion.div
                key={section.href}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.12 + index * 0.06 }}
              >
                <GlowCard href={section.href} color={section.color}>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-2.5 ${colors.bg} rounded-xl`}>
                        <section.icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                        {section.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-white/95 transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-xs text-white/35 mb-4 leading-relaxed line-clamp-3">
                      {section.subtitle}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                      <span className="text-[10px] text-white/25">{section.stats}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors" />
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            )
          })}
        </div>

        {/* Design Studies (image cards) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }}
          className="mb-4"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-500/10 rounded-xl">
              <Leaf className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Design Studies</h3>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {designStudies.map((study, index) => {
            const colors = colorConfig[study.color] || colorConfig.teal
            return (
              <motion.div
                key={study.href}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.35 + index * 0.1 }}
              >
                <GlowCard href={study.href} color={study.color} className="!p-0 overflow-hidden">
                  <div className="relative z-10">
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/40 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex gap-3">
                        {study.stats.map(stat => (
                          <div key={stat.label} className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
                            <span className="text-sm font-bold text-white">{stat.value}</span>
                            <span className="text-xs text-white/50 ml-1.5">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white/95 transition-colors">
                        {study.title}
                      </h3>
                      <p className="text-sm text-white/40 mb-4 leading-relaxed">{study.subtitle}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {study.tags.map(tag => (
                          <span key={tag} className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-white/60 group-hover:text-white/90 transition-colors">
                        Explore <ArrowRight className="w-4 h-4" />
                      </div>
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

// ── Rating Dimensions Legend ──

const ratingDimensions = [
  { label: 'Design', color: 'text-violet-400', description: 'Visual quality, polish, and aesthetic choices' },
  { label: 'Code', color: 'text-cyan-400', description: 'TypeScript correctness, structure, readability' },
  { label: 'A11y', color: 'text-emerald-400', description: 'Keyboard nav, screen readers, reduced motion' },
  { label: 'Perf', color: 'text-amber-400', description: 'Bundle size, render speed, CLS' },
  { label: 'Creativity', color: 'text-rose-400', description: 'Unique interpretation and creative flair' },
]

// ── Experiments Grid ──

function ExperimentsGrid() {
  const shouldReduceMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState<ExperimentCategory | 'all'>('all')
  const [activeStatus, setActiveStatus] = useState<ExperimentStatus | 'all'>('all')

  const filteredExperiments = useMemo(() => {
    let experiments = designExperiments

    if (activeCategory !== 'all') {
      experiments = experiments.filter(e => e.category === activeCategory)
    }

    if (activeStatus !== 'all') {
      experiments = experiments.filter(e => e.status === activeStatus)
    }

    return experiments
  }, [activeCategory, activeStatus])

  return (
    <section id="experiments" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            All Experiments
          </h2>
          <p className="text-white/50 max-w-2xl">
            {totalExperiments} experiments across {Object.keys(experimentCategoryConfig).length} categories.
            Each tests AI coding tools against specific design challenges.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categoryKeys.map((key) => {
            const isActive = activeCategory === key
            const label = key === 'all' ? 'All Categories' : experimentCategoryConfig[key].label
            const count = key === 'all'
              ? designExperiments.length
              : designExperiments.filter(e => e.category === key).length
            const CatIcon = categoryIcons[key] || Layers

            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`
                  inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                  transition-all duration-200
                  ${isActive
                    ? 'bg-white text-black'
                    : 'bg-white/[0.04] text-white/50 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white/70'
                  }
                `}
              >
                <CatIcon className={`w-3.5 h-3.5 ${isActive ? '' : 'opacity-60'}`} />
                {label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-black/10' : 'bg-white/[0.08]'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveStatus('all')}
            className={`
              px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
              ${activeStatus === 'all'
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-white/40 border border-white/[0.06] hover:border-white/[0.12] hover:text-white/60'
              }
            `}
          >
            All Status
          </button>
          {statusKeys.map((key) => {
            const isActive = activeStatus === key
            const cfg = experimentStatusConfig[key]
            const count = (activeCategory === 'all'
              ? designExperiments
              : designExperiments.filter(e => e.category === activeCategory)
            ).filter(e => e.status === key).length

            return (
              <button
                key={key}
                onClick={() => setActiveStatus(key)}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'text-white/40 border border-white/[0.06] hover:border-white/[0.12] hover:text-white/60'
                  }
                `}
              >
                <span className={isActive ? '' : cfg.color}>{cfg.label}</span>
                {count > 0 && (
                  <span className="ml-1.5 text-[10px] opacity-60">{count}</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Results count */}
        {(activeCategory !== 'all' || activeStatus !== 'all') && (
          <p className="text-xs text-white/30 mb-4">
            Showing {filteredExperiments.length} of {totalExperiments} experiments
          </p>
        )}

        {filteredExperiments.length === 0 ? (
          <div className="text-center py-16">
            <FlaskConical className="w-8 h-8 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 text-sm">No experiments match your filters.</p>
            <button
              onClick={() => { setActiveCategory('all'); setActiveStatus('all') }}
              className="mt-3 text-xs text-teal-400 hover:text-teal-300 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExperiments.map((experiment, index) => {
              const Icon = iconMap[experiment.icon] || FlaskConical
              const colors = colorConfig[experiment.color] || colorConfig.teal
              const statusCfg = experimentStatusConfig[experiment.status]
              const winner = experiment.entries.find(e => e.isWinner)
              const highestScore = Math.max(...experiment.entries.map(e => e.overallScore).filter(s => s > 0), 0)

              return (
                <motion.div
                  key={experiment.slug}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { delay: Math.min(index * 0.04, 0.3) }}
                >
                  <GlowCard
                    href={`/design-lab/${experiment.slug}`}
                    color={experiment.color}
                  >
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-2.5 ${colors.bg} rounded-xl`}>
                          <Icon className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors.bg} ${statusCfg.color}`}>
                            {statusCfg.label}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-white/95 transition-colors">
                        {experiment.title}
                      </h3>
                      <p className="text-sm text-white/40 mb-4 line-clamp-2">
                        {experiment.subtitle}
                      </p>

                      {/* Agent Entry Count + Winner */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] px-2 py-1 bg-white/[0.04] border border-white/[0.06] rounded-full text-white/50">
                          <span className="font-semibold text-white/70">{experiment.entries.length}</span> agents
                        </span>
                        {highestScore > 0 && (
                          <span className="text-[10px] px-2 py-1 bg-white/[0.04] border border-white/[0.06] rounded-full text-white/50">
                            <span className="font-semibold text-amber-400">{highestScore}</span>/10 top score
                          </span>
                        )}
                      </div>

                      {/* Winner Badge */}
                      {winner && (
                        <div className={`flex items-center gap-2 p-2 rounded-lg ${colors.bg} ${colors.border} border mb-4`}>
                          <Trophy className={`w-3.5 h-3.5 ${colors.text}`} />
                          <span className="text-[10px] text-white/70">
                            <span className="font-semibold text-white">{winner.agent}</span> via {winner.tool.split(' + ')[0]}
                          </span>
                        </div>
                      )}

                      {/* Rating Bars (mini) for complete experiments */}
                      {winner && winner.overallScore > 0 && (
                        <div className="space-y-1 mb-4">
                          {ratingDimensions.map((dim) => {
                            const key = dim.label.toLowerCase().replace('a11y', 'accessibility').replace('perf', 'performance') as keyof typeof winner.ratings
                            const val = winner.ratings[key] || 0
                            return (
                              <div key={dim.label} className="flex items-center gap-2">
                                <span className={`text-[9px] w-12 ${dim.color}`}>{dim.label}</span>
                                <div className="flex-1 h-1 rounded-full bg-white/[0.06]">
                                  <div
                                    className={`h-full rounded-full transition-all ${dim.color.replace('text-', 'bg-')}`}
                                    style={{ width: `${val * 10}%` }}
                                  />
                                </div>
                                <span className="text-[9px] text-white/30 w-4 text-right">{val}</span>
                              </div>
                            )
                          })}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                        <span className="text-[10px] text-white/25">
                          {experimentCategoryConfig[experiment.category].label}
                        </span>
                        <span className="text-[10px] text-white/20">
                          {experiment.lastUpdated}
                        </span>
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

// ── CTA Section ──

function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 md:p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/[0.03] via-transparent to-violet-500/[0.03] rounded-3xl" />

          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Want to Suggest an Experiment?
            </h2>
            <p className="text-white/50 mb-8 max-w-xl mx-auto">
              Have a design challenge you&apos;d like to see AI agents tackle?
              Follow the journey or share ideas through the Inner Circle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-full font-semibold hover:bg-white/90 transition-all"
              >
                Browse Products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/plan"
                className="inline-flex items-center justify-center gap-2 bg-white/5 text-white px-8 py-3.5 rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all"
              >
                The Plan
              </Link>
              <Link
                href="/inner-circle"
                className="inline-flex items-center justify-center gap-2 bg-white/5 text-white px-8 py-3.5 rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all"
              >
                Inner Circle
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Main Page ──

export default function DesignLabPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute top-0 left-0 w-[70%] h-[60%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(20, 184, 166, 0.04) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute top-1/4 right-0 w-[60%] h-[50%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.03) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[50%] h-[40%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.03) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10">
        <HeroSection />
        <DesignHub />
        <HowItWorks />
        <ExperimentsGrid />
        <CTASection />
      </div>
    </main>
  )
}
