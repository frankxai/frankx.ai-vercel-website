'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Sparkles, Layers, Eye } from 'lucide-react'
import Link from 'next/link'

import { CosmicForgeHero } from '@/components/design-lab/CosmicForgeHero'
import { GlassCathedralHero } from '@/components/design-lab/GlassCathedralHero'
import { NeonGridHero } from '@/components/design-lab/NeonGridHero'
import { NeonCard } from '@/components/design-lab/NeonCard'
import { GlowCard } from '@/components/ui/glow-card'
import { GlassCard } from '@/components/liquid-glass/GlassCard'

// ── Types ──

type ApproachId = 'alpha' | 'beta' | 'gamma'

interface Approach {
  id: ApproachId
  team: string
  name: string
  tagline: string
  description: string
  heroComponent: React.ComponentType
  signatureMove: string
  color: string
  accentGradient: string
  stats: { label: string; value: string }[]
  philosophy: {
    hero: string
    cards: string
    color: string
    motion: string
    typography: string
  }
  pros: string[]
  cons: string[]
  newComponents: number
  bundleImpact: string
  bestFor: string
}

// ── Approach Data ──

const approaches: Approach[] = [
  {
    id: 'alpha',
    team: 'Team Alpha',
    name: 'Cosmic Forge',
    tagline: 'Atmospheric Drama',
    description: 'One breathtaking WebGL hero effect per page. Stripe-level drama on entry, Linear-level calm below the fold.',
    heroComponent: CosmicForgeHero,
    signatureMove: 'Animated mesh gradient (WebGL canvas)',
    color: 'emerald',
    accentGradient: 'from-violet-500 via-cyan-500 to-emerald-500',
    stats: [
      { label: 'New Components', value: '1' },
      { label: 'Bundle Impact', value: '~3KB' },
      { label: 'Reused Components', value: '10+' },
    ],
    philosophy: {
      hero: 'Full-viewport WebGL mesh gradient with 4 brand colors drifting organically. Blur overlay at 0.4 opacity with screen blend.',
      cards: 'GlowCard (existing) with cursor-following radial glow. BentoGrid layout. No card modifications needed.',
      color: 'Monochrome below hero. Emerald for CTAs only. Mesh gradient colors exist only in the hero.',
      motion: '"One spectacle, then silence." Hero has full animation suite. Below the fold: simple fadeUp (y: 24 to 0, 600ms).',
      typography: 'Gradient text on hero keyword ONLY. Section headings plain white. Monospace eyebrows. Inter body at text-white/50.',
    },
    pros: [
      'Immediate visual impact — visitors remember the hero',
      'Restraint below fold keeps content readable',
      'Only 1 new component to build',
      'Three.js already installed',
    ],
    cons: [
      'Risk of Stripe clone perception',
      'WebGL canvas is a perf concern on low-end devices',
      'The "one big thing" bet — if the hero doesn\'t land, there\'s no fallback visual identity',
    ],
    newComponents: 1,
    bundleImpact: '~3KB shader code',
    bestFor: 'Enterprise architects who expect polish',
  },
  {
    id: 'beta',
    team: 'Team Beta',
    name: 'Glass Cathedral',
    tagline: 'Systematic Elegance',
    description: 'Hierarchical glassmorphism. Every element communicates importance through its glass tier. Near-monochrome. The site feels like walking through rooms of increasing clarity.',
    heroComponent: GlassCathedralHero,
    signatureMove: '4-tier glass material hierarchy',
    color: 'cyan',
    accentGradient: 'from-white/20 via-white/10 to-white/5',
    stats: [
      { label: 'New Components', value: '2' },
      { label: 'Bundle Impact', value: '~0KB' },
      { label: 'Reused Components', value: '7+' },
    ],
    philosophy: {
      hero: '90vh static void background with 3 overlapping radial gradients at 2-4% opacity. Crystal stat cards. Everything fades in together.',
      cards: 'GlassCard with 4-tier hierarchy: frosted (standard), crystal (featured), liquid (premium CTAs), obsidian (overlays).',
      color: 'Near-monochrome. Color enters ONLY through element tinting. Emerald on primary CTA only.',
      motion: '"Glass does not jump. Glass catches light." Simple opacity fade. No parallax. CursorSpotlight is the only dynamic element.',
      typography: 'font-semibold not font-bold (refined). Monospace eyebrows are the signature. No gradient text anywhere.',
    },
    pros: [
      'Near-zero bundle impact — all existing components',
      'Linear/Vercel-adjacent credibility',
      'Glass hierarchy creates natural visual architecture',
      'Easiest to maintain and extend',
    ],
    cons: [
      'Risk of feeling cold or corporate',
      'Backdrop-filter stacking can cause perf issues (max 8 visible)',
      'May feel too restrained for creative technologist audience',
    ],
    newComponents: 2,
    bundleImpact: '~0KB new dependencies',
    bestFor: 'Developer tools audience (Linear, Vercel, Raycast users)',
  },
  {
    id: 'gamma',
    team: 'Team Gamma',
    name: 'Neon Grid',
    tagline: 'Electric Precision',
    description: 'Per-section color rotation through the brand palette. Canvas dot grid with cursor-repulsion physics. Bold, maker-culture energy.',
    heroComponent: NeonGridHero,
    signatureMove: 'Canvas dot grid + per-section color theming',
    color: 'violet',
    accentGradient: 'from-emerald-500 via-amber-500 to-violet-500',
    stats: [
      { label: 'New Components', value: '3' },
      { label: 'Bundle Impact', value: '~2KB' },
      { label: 'Reused Components', value: '9+' },
    ],
    philosophy: {
      hero: 'Full-viewport with canvas dot grid (40px spacing). Left-aligned 60/40 split. Floating product mockup with glow halo.',
      cards: 'NeonCard wraps ShimmerCard with expanding gradient accent line. Shimmer color matches section accent.',
      color: 'Full palette deployed section by section: emerald (AI), amber (Creative), violet (Tools). Max 2 accent colors visible.',
      motion: '"Everything earns its entrance." fadeUp with 80ms stagger. Dot grid animates continuously. Snappier: 200ms interactions.',
      typography: 'Gradient text per section heading. font-bold (assertive). Eyebrows in section accent color at full opacity.',
    },
    pros: [
      'Strongest personality and visual identity',
      'Dot grid cursor interaction is memorable and unique',
      'Per-section color creates visual rhythm across long pages',
      'Best for creative/maker audience',
    ],
    cons: [
      'Highest risk of visual noise',
      'Most new components (3) to build and maintain',
      'Color rotation needs careful calibration to avoid chaos',
    ],
    newComponents: 3,
    bundleImpact: '~2KB canvas dot grid',
    bestFor: 'Creative technologists and maker culture',
  },
]

// ── Comparison Matrix ──

const comparisonRows = [
  { label: 'Hero', alpha: 'WebGL mesh gradient', beta: 'Static void + crystal stats', gamma: 'Canvas dot grid + floating mockup' },
  { label: 'Core Card', alpha: 'GlowCard (existing)', beta: 'GlassCard (existing)', gamma: 'ShimmerCard + NeonCard wrapper' },
  { label: 'Color Strategy', alpha: 'Monochrome below hero', beta: 'Near-monochrome + element tint', gamma: 'Per-section color rotation' },
  { label: 'Motion', alpha: 'Dramatic hero, quiet body', beta: 'Near-zero throughout', gamma: 'Moderate everywhere' },
  { label: 'Typography', alpha: 'Gradient on hero only', beta: 'Monospace accents, no gradients', gamma: 'Gradient per section heading' },
  { label: 'Background', alpha: 'Void/space alternation', beta: 'Uniform void', gamma: 'Per-section radial gradients' },
  { label: 'New Components', alpha: '1', beta: '2', gamma: '3' },
  { label: 'Bundle Impact', alpha: '~3KB', beta: '~0KB', gamma: '~2KB' },
  { label: 'Emphasizes', alpha: 'Excellence, depth', beta: 'Craftsmanship, restraint', gamma: 'Personality, energy' },
  { label: 'Biggest Risk', alpha: 'Stripe clone', beta: 'Cold/corporate', gamma: 'Visual noise' },
]

// ── Card System Demos ──

function AlphaCardDemo() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {['AI Architecture', 'Creative Systems', 'Open Tools'].map((title, i) => (
        <GlowCard
          key={title}
          color={(['emerald', 'cyan', 'violet'] as const)[i]}
        >
          <div className="p-4">
            <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>
            <p className="text-xs text-white/40 leading-relaxed">
              {i === 0 && 'Enterprise AI systems and workflows.'}
              {i === 1 && '12,000+ songs, generative art.'}
              {i === 2 && '75+ skills, 38 agents shipped.'}
            </p>
          </div>
        </GlowCard>
      ))}
    </div>
  )
}

function BetaCardDemo() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        { title: 'AI Architecture', element: 'water' as const, material: 'frosted' as const },
        { title: 'Creative Systems', element: 'fire' as const, material: 'crystal' as const },
        { title: 'Open Tools', element: 'arcane' as const, material: 'liquid' as const },
      ].map((item) => (
        <GlassCard
          key={item.title}
          material={item.material}
          element={item.element}
          elevation="low"
          padding="sm"
          rounded="xl"
        >
          <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
          <p className="text-[10px] text-white/30 uppercase tracking-wider font-mono">
            {item.material}
          </p>
        </GlassCard>
      ))}
    </div>
  )
}

function GammaCardDemo() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        { title: 'AI Architecture', color: 'emerald' as const },
        { title: 'Creative Systems', color: 'amber' as const },
        { title: 'Open Tools', color: 'violet' as const },
      ].map((item) => (
        <NeonCard key={item.title} color={item.color}>
          <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
          <p className="text-xs text-white/40 leading-relaxed">
            Section-specific color accent.
          </p>
        </NeonCard>
      ))}
    </div>
  )
}

// ── Typography Specimens ──

function AlphaTypography() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-mono tracking-[0.25em] uppercase text-emerald-400/50">Eyebrow Label</p>
      <h3 className="text-2xl font-bold text-white">
        Three domains.{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">
          One practice.
        </span>
      </h3>
      <p className="text-sm text-white/50">Body text at 50% opacity. Inter for readability.</p>
    </div>
  )
}

function BetaTypography() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-mono tracking-[0.15em] uppercase text-white/25">Eyebrow Label</p>
      <h3 className="text-2xl font-semibold text-white">Intelligence that compounds.</h3>
      <p className="text-sm text-white/35">Body text at 35% opacity. Dimmer. Glass provides visual interest.</p>
    </div>
  )
}

function GammaTypography() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-emerald-400">Eyebrow in accent color</p>
      <h3 className="text-2xl font-bold tracking-[-0.03em] text-white">
        Three{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
          domains.
        </span>{' '}
        One practice.
      </h3>
      <p className="text-sm text-white/55">Body text at 55% opacity. Slightly brighter.</p>
    </div>
  )
}

// ── Color Palette Swatches ──

function ColorSwatches({ colors }: { colors: { name: string; hex: string; usage: string }[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((c) => (
        <div key={c.name} className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg border border-white/10"
            style={{ backgroundColor: c.hex }}
          />
          <div>
            <p className="text-xs font-mono text-white/60">{c.hex}</p>
            <p className="text-[10px] text-white/30">{c.usage}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Section Wrapper ──

function ApproachSection({ approach, index }: { approach: Approach; index: number }) {
  const shouldReduceMotion = useReducedMotion()
  const HeroComponent = approach.heroComponent

  const cardDemos: Record<ApproachId, React.ComponentType> = {
    alpha: AlphaCardDemo,
    beta: BetaCardDemo,
    gamma: GammaCardDemo,
  }

  const typeDemos: Record<ApproachId, React.ComponentType> = {
    alpha: AlphaTypography,
    beta: BetaTypography,
    gamma: GammaTypography,
  }

  const colorPalettes: Record<ApproachId, { name: string; hex: string; usage: string }[]> = {
    alpha: [
      { name: 'Void', hex: '#0a0a0b', usage: 'Base' },
      { name: 'Purple', hex: '#AB47C7', usage: 'Hero only' },
      { name: 'Cyan', hex: '#43BFE3', usage: 'Hero only' },
      { name: 'Emerald', hex: '#10b981', usage: 'CTAs' },
    ],
    beta: [
      { name: 'Void', hex: '#0a0a0b', usage: 'Everywhere' },
      { name: 'White/06', hex: '#ffffff10', usage: 'Glass cards' },
      { name: 'White/12', hex: '#ffffff1f', usage: 'Crystal cards' },
      { name: 'Emerald', hex: '#10b981', usage: 'Primary CTA only' },
    ],
    gamma: [
      { name: 'Emerald', hex: '#10b981', usage: 'AI section' },
      { name: 'Amber', hex: '#f59e0b', usage: 'Creative section' },
      { name: 'Violet', hex: '#8b5cf6', usage: 'Tools section' },
      { name: 'Cyan', hex: '#06b6d4', usage: 'Newsletter' },
    ],
  }

  const CardDemo = cardDemos[approach.id]
  const TypeDemo = typeDemos[approach.id]
  const palette = colorPalettes[approach.id]

  return (
    <section className="relative">
      {/* Section divider */}
      <div className="relative py-16 text-center">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-3"
        >
          <p className="text-xs font-mono tracking-[0.3em] uppercase text-white/20">
            Approach {index + 1} of 3
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            {approach.team}:{' '}
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${approach.accentGradient}`}>
              {approach.name}
            </span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            {approach.tagline} — {approach.description}
          </p>
        </motion.div>
      </div>

      {/* Live Hero Preview */}
      <div className="relative border border-white/[0.06] rounded-2xl overflow-hidden mx-4 sm:mx-6 lg:mx-auto lg:max-w-7xl">
        <div className="absolute top-3 left-4 z-20 flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <span className="text-[10px] font-mono text-white/20 ml-2">
            Live Preview — {approach.name}
          </span>
        </div>
        <div className="relative" style={{ height: '70vh', maxHeight: '700px' }}>
          <div className="absolute inset-0 overflow-hidden">
            <HeroComponent />
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-8">
        {/* Card System */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-white/30" />
            <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">Card System</h3>
          </div>
          <CardDemo />
          <p className="text-xs text-white/30 mt-2">{approach.philosophy.cards}</p>
        </motion.div>

        {/* Typography */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white/30 text-sm font-mono">Aa</span>
            <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">Typography</h3>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <TypeDemo />
          </div>
        </motion.div>

        {/* Color Palette */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-white/30" />
            <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">Color Palette</h3>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <ColorSwatches colors={palette} />
          </div>
        </motion.div>

        {/* Motion Philosophy */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-white/30" />
            <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">Motion Philosophy</h3>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-3">
            <p className="text-sm text-white/50 italic">"{approach.philosophy.motion.split('.')[0]}."</p>
            <p className="text-xs text-white/30">{approach.philosophy.hero}</p>
          </div>
        </motion.div>
      </div>

      {/* Pros / Cons */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-8 grid sm:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="text-xs font-medium text-emerald-400/60 uppercase tracking-wider">Strengths</h4>
          {approach.pros.map((pro) => (
            <div key={pro} className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400/60 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-white/50">{pro}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <h4 className="text-xs font-medium text-rose-400/60 uppercase tracking-wider">Risks</h4>
          {approach.cons.map((con) => (
            <div key={con} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-400/40 mt-1.5 flex-shrink-0" />
              <p className="text-sm text-white/50">{con}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex items-center justify-center gap-8 py-4 border-t border-b border-white/5">
          {approach.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-lg font-semibold text-white">{stat.value}</p>
              <p className="text-[10px] text-white/30 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
          <div className="text-center">
            <p className="text-sm font-medium text-white/60">{approach.bestFor}</p>
            <p className="text-[10px] text-white/30 uppercase tracking-wider">Best For</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Comparison Matrix Component ──

function ComparisonMatrix() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-3">Side-by-Side Comparison</h2>
          <p className="text-sm text-white/40">Every dimension, every trade-off.</p>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-xs font-mono text-white/30 uppercase tracking-wider">
                  Dimension
                </th>
                <th className="text-left py-3 px-4 text-xs font-mono text-white/30 uppercase tracking-wider">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-emerald-400">Alpha</span>
                </th>
                <th className="text-left py-3 px-4 text-xs font-mono text-white/30 uppercase tracking-wider">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/20">Beta</span>
                </th>
                <th className="text-left py-3 px-4 text-xs font-mono text-white/30 uppercase tracking-wider">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-violet-400">Gamma</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={row.label}
                  className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}
                >
                  <td className="py-3 px-4 text-xs font-medium text-white/50">{row.label}</td>
                  <td className="py-3 px-4 text-xs text-white/40">{row.alpha}</td>
                  <td className="py-3 px-4 text-xs text-white/40">{row.beta}</td>
                  <td className="py-3 px-4 text-xs text-white/40">{row.gamma}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

// ── Page Header ──

function PageHeader() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-white/60">Design Lab / Strategy</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Three Teams.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">
              One Identity.
            </span>
          </h1>

          <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
            Three competing design approaches for frankx.ai's signature visual identity.
            Each team brings a complete homepage redesign with hero, card system,
            typography, color strategy, and motion philosophy.
          </p>

          <p className="text-sm text-white/25 font-mono">
            Review each approach below. The winner gets implemented site-wide.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ── Main Page ──

export default function StrategyArenaPage() {
  return (
    <main className="relative min-h-screen text-white" style={{ backgroundColor: '#0a0a0b' }}>
      {/* Noise texture */}
      <div
        className="fixed inset-0 opacity-[0.015] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">
        <PageHeader />

        {/* Quick nav */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {approaches.map((a) => (
              <a
                key={a.id}
                href={`#${a.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-sm text-white/50 hover:text-white/80 transition-all"
              >
                <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${a.accentGradient}`} />
                {a.team}: {a.name}
              </a>
            ))}
          </div>
        </div>

        {/* Three Approaches */}
        {approaches.map((approach, i) => (
          <div key={approach.id} id={approach.id}>
            <ApproachSection approach={approach} index={i} />
          </div>
        ))}

        {/* Comparison Matrix */}
        <ComparisonMatrix />

        {/* Back to Design Lab */}
        <section className="py-16 text-center">
          <Link
            href="/design-lab"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Design Lab
          </Link>
        </section>
      </div>
    </main>
  )
}
