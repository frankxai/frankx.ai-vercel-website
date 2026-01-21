'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  Users,
  Layers,
  CheckCircle2,
  ExternalLink,
  Eye,
  GitBranch
} from 'lucide-react'

// ============================================================================
// STAGING HUB - Split Test Comparison Center
// ============================================================================

const variants = [
  {
    id: 'control',
    name: 'Control (Production)',
    version: 'v2.0',
    href: '/',
    description: 'Current live homepage with Inter + Playfair Display',
    changes: [
      'Humble "workshop/notebook" positioning',
      'Four pillars: Music, Learning, Tools, Process',
      'No explicit product showcase',
      'Playfair Display for all italic accents',
    ],
    typography: 'Inter + Playfair Display',
    positioning: 'Humble Creator',
    status: 'live',
    color: 'slate',
  },
  {
    id: 'split-a',
    name: 'Split A: Authority + Geist',
    version: 'v3.0-alpha',
    href: '/staging/homepage-a',
    description: 'Geist typography with confident Golden Age positioning',
    changes: [
      'Geist Sans as primary font (Vercel-style)',
      '"Golden Age of Intelligence" hero framing',
      'Confident authority tone',
      'Playfair reserved for main quote only',
    ],
    typography: 'Geist Sans + Playfair accent',
    positioning: 'Golden Age Authority',
    status: 'staging',
    color: 'emerald',
  },
  {
    id: 'split-b',
    name: 'Split B: Audience Matrix',
    version: 'v3.0-beta',
    href: '/staging/homepage-b',
    description: 'Audience-first navigation with clear pathways',
    changes: [
      'Keep Inter + Playfair (refined)',
      '"Who I Build For" section with 4 audiences',
      'Music Creators / Content / Generative / Developers',
      'Products linked to each audience',
    ],
    typography: 'Inter + Playfair (refined)',
    positioning: 'Audience-First',
    status: 'staging',
    color: 'cyan',
  },
  {
    id: 'split-c',
    name: 'Split C: Full Redesign',
    version: 'v3.0-gamma',
    href: '/staging/homepage-c',
    description: 'Complete overhaul with products, community, and warmth',
    changes: [
      'Geist Sans primary + Playfair accent',
      'Products showcase section',
      'Community/tribe section with Inner Circle',
      'Family warmth in About section',
      'Waitlist CTAs for cohorts',
    ],
    typography: 'Geist Sans + Playfair accent',
    positioning: 'Humble Authority + Products',
    status: 'staging',
    color: 'violet',
  },
]

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  slate: {
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/20 hover:border-slate-500/40',
    text: 'text-slate-400',
    glow: 'group-hover:shadow-slate-500/10'
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    text: 'text-emerald-400',
    glow: 'group-hover:shadow-emerald-500/10'
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    text: 'text-cyan-400',
    glow: 'group-hover:shadow-cyan-500/10'
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20 hover:border-violet-500/40',
    text: 'text-violet-400',
    glow: 'group-hover:shadow-violet-500/10'
  },
}

function VariantCard({ variant, index }: { variant: typeof variants[0]; index: number }) {
  const colors = colorMap[variant.color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link href={variant.href} className="block h-full">
        <div className={`relative h-full p-6 rounded-2xl border ${colors.border} ${colors.bg} backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${colors.glow}`}>
          {/* Status badge */}
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs font-medium uppercase tracking-wider ${colors.text}`}>
              {variant.version}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              variant.status === 'live'
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-amber-500/20 text-amber-400'
            }`}>
              {variant.status}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2">{variant.name}</h3>
          <p className="text-sm text-white/50 mb-4">{variant.description}</p>

          {/* Meta info */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Sparkles className="w-3 h-3" />
              <span>Typography: {variant.typography}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Users className="w-3 h-3" />
              <span>Positioning: {variant.positioning}</span>
            </div>
          </div>

          {/* Changes list */}
          <ul className="space-y-2 mb-6">
            {variant.changes.map((change) => (
              <li key={change} className="flex items-start gap-2 text-sm text-white/60">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400/60" />
                <span>{change}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
              Preview variant
            </span>
            <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function StagingHub() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Header */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-violet-500/20">
              <GitBranch className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Staging Hub</h1>
              <p className="text-xs text-white/50">Split Test Comparison Center</p>
            </div>
          </div>
          <Link
            href="/docs/DESIGN_EVOLUTION_TRACKER.md"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <Layers className="w-4 h-4" />
            View Tracker
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-4">
            Design Evolution
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Homepage Split Tests
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            Compare variants side by side. Each test explores different typography,
            positioning, and structural approaches. Click any card to preview the full page.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            <Eye className="w-4 h-4" />
            View Production
            <ExternalLink className="w-3 h-3" />
          </a>
          <Link
            href="/design-preview"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Font Comparison
          </Link>
        </motion.div>

        {/* Variants Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {variants.map((variant, i) => (
            <VariantCard key={variant.id} variant={variant} index={i} />
          ))}
        </div>

        {/* Decision Framework */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]"
        >
          <h3 className="text-xl font-bold text-white mb-6">Decision Framework</h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-emerald-400 font-medium mb-3">What to evaluate:</p>
              <ul className="space-y-2 text-sm text-white/60">
                <li>• Does the typography feel premium?</li>
                <li>• Is the positioning clear and compelling?</li>
                <li>• Can visitors find their path quickly?</li>
                <li>• Does it feel like YOU?</li>
              </ul>
            </div>
            <div>
              <p className="text-cyan-400 font-medium mb-3">Key questions:</p>
              <ul className="space-y-2 text-sm text-white/60">
                <li>• Which hero creates the strongest first impression?</li>
                <li>• Is the Golden Age vision clear?</li>
                <li>• Are products visible enough?</li>
                <li>• Does family warmth come through?</li>
              </ul>
            </div>
            <div>
              <p className="text-violet-400 font-medium mb-3">After reviewing:</p>
              <ul className="space-y-2 text-sm text-white/60">
                <li>• Select winning elements from each</li>
                <li>• Request hybrid if needed</li>
                <li>• Set Plausible goals</li>
                <li>• Monitor for 7 days</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Skills Used */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-4">
            Built with Agentic Creator OS
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['/frankx-brand', '/ui-ux-design-expert', '/frontend-design', '/agentic-orchestration'].map((skill) => (
              <span key={skill} className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/50">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
