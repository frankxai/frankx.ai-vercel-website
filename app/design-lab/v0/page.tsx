'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Eye,
  Layers,
  Maximize2,
  Minimize2,
  Sparkles,
} from 'lucide-react'

// ── v0 Generation Data ──

interface V0Generation {
  id: number
  title: string
  subtitle: string
  chatId: string
  demoUrl: string
  model: string
  fileCount: number
  color: string
  category: string
}

const generations: V0Generation[] = [
  {
    id: 1,
    title: 'Homepage Hero',
    subtitle: 'Liquid gradient hero with floating stat cards and scroll indicators',
    chatId: 'kp1UCsrMJI8',
    demoUrl: 'https://demo-kzmp73pqpq4yhafic577.vusercontent.net',
    model: 'v0-1.5-lg',
    fileCount: 7,
    color: 'emerald',
    category: 'Landing Page',
  },
  {
    id: 2,
    title: 'Products Page',
    subtitle: 'Filter system with featured ACOS card and animated gradient orbs',
    chatId: 'oyx6iwcSNW0',
    demoUrl: 'https://demo-kzmnco49r01u38scvpt5.vusercontent.net',
    model: 'v0-1.5-lg',
    fileCount: 3,
    color: 'violet',
    category: 'Product Page',
  },
  {
    id: 3,
    title: 'Research Hub',
    subtitle: 'Two-column grid with sidebar, category filters, credibility signals',
    chatId: 'hz3M0ZGsSF5',
    demoUrl: 'https://demo-kzmfrqnxel1daa64b510.vusercontent.net',
    model: 'v0-1.5-lg',
    fileCount: 3,
    color: 'cyan',
    category: 'Dashboard',
  },
  {
    id: 4,
    title: 'Blog Landing',
    subtitle: 'Premium blog index with featured posts and reading time estimates',
    chatId: 'vDtmFp45TVR',
    demoUrl: 'https://demo-kzmp0oaq7ysi02dfvmnl.vusercontent.net',
    model: 'v0-1.5-lg',
    fileCount: 4,
    color: 'amber',
    category: 'Landing Page',
  },
  {
    id: 5,
    title: 'Inner Circle',
    subtitle: 'Membership page with tier comparison and exclusive content preview',
    chatId: 'uaPnlaw4BIK',
    demoUrl: 'https://demo-kzmqkdpccsp0s5d342f9.vusercontent.net',
    model: 'v0-1.5-lg',
    fileCount: 3,
    color: 'rose',
    category: 'Product Page',
  },
  {
    id: 6,
    title: 'ACOS Product',
    subtitle: 'Agent orchestration showcase with metrics, features, and pricing',
    chatId: 'f6ToNz0ER5c',
    demoUrl: 'https://demo-kzmpc9qb5oxmrzbm1yz0.vusercontent.net',
    model: 'v0-1.5-lg',
    fileCount: 4,
    color: 'emerald',
    category: 'Product Page',
  },
  {
    id: 7,
    title: 'AI Academy',
    subtitle: 'Learning platform with course cards, progress tracking, and certifications',
    chatId: 'kmqMZu6QQHA',
    demoUrl: 'https://demo-kzmqdniz3r3vtbckv0w2.vusercontent.net',
    model: 'v0-1.5-lg',
    fileCount: 4,
    color: 'blue',
    category: 'Landing Page',
  },
  {
    id: 8,
    title: 'About Page',
    subtitle: 'Personal brand page with timeline, skills visualization, and values',
    chatId: 'vf8toBMjzWP',
    demoUrl: 'https://demo-kzmjven0djm9woxa21xi.vusercontent.net',
    model: 'v0-1.5-lg',
    fileCount: 4,
    color: 'teal',
    category: 'Landing Page',
  },
  {
    id: 9,
    title: 'Design System',
    subtitle: 'Component showcase with color palette, typography, and spacing tokens',
    chatId: 'nmegM49Dti2',
    demoUrl: 'https://demo-kzmljrx9qevuoynjg4t1.vusercontent.net',
    model: 'v0-1.5-lg',
    fileCount: 3,
    color: 'violet',
    category: 'Component',
  },
  {
    id: 10,
    title: 'Music Lab',
    subtitle: 'Audio production hub with waveform visualizations and track management',
    chatId: 'r9XYZI8P0Mv',
    demoUrl: 'https://demo-kzmnibzj21qauou5xlcm.vusercontent.net',
    model: 'v0-1.5-lg',
    fileCount: 4,
    color: 'orange',
    category: 'Dashboard',
  },
  // ── Wave 2: v0-pro (GPT-5) Ultra-Premium ──
  {
    id: 11,
    title: 'Soulbook (v0-pro)',
    subtitle: 'Premium self-discovery platform with pillar visualizations and golden path',
    chatId: 'qlakULoe76B',
    demoUrl: 'https://demo-kzmq92zhek8h1nsceani.vusercontent.net',
    model: 'v0-pro',
    fileCount: 4,
    color: 'amber',
    category: 'Product Page',
  },
  {
    id: 12,
    title: 'AI Team (v0-pro)',
    subtitle: 'AI collaboration ecosystem with constellation graph and department cards',
    chatId: 'oPNEc2DTmO8',
    demoUrl: 'https://demo-kzmqowwh4n4vh5jyh6jo.vusercontent.net',
    model: 'v0-pro',
    fileCount: 0,
    color: 'cyan',
    category: 'Landing Page',
  },
  {
    id: 13,
    title: 'Labs Premium (v0-pro)',
    subtitle: 'Build sessions hub with animated beaker, lab flow, and replay archive',
    chatId: 'bTEnogK4Jrn',
    demoUrl: 'https://demo-kzmo42sze9qnoaml93ym.vusercontent.net',
    model: 'v0-pro',
    fileCount: 4,
    color: 'violet',
    category: 'Landing Page',
  },
  {
    id: 14,
    title: 'Inner Circle v2 (v0-pro)',
    subtitle: 'Premium membership with animated shield, tiered pricing, and FAQ accordion',
    chatId: 'tZ41YuKQJoo',
    demoUrl: 'https://demo-kzmisu11l2vafqrmp560.vusercontent.net',
    model: 'v0-pro',
    fileCount: 4,
    color: 'rose',
    category: 'Product Page',
  },
  {
    id: 15,
    title: 'Coaching (v0-pro)',
    subtitle: 'AI coaching platform with program tiers, methodology, and booking flow',
    chatId: 'ixe64JX8hmQ',
    demoUrl: 'https://demo-kzmid0zlxhgrfar9tmd2.vusercontent.net',
    model: 'v0-pro',
    fileCount: 4,
    color: 'emerald',
    category: 'Product Page',
  },
  {
    id: 16,
    title: 'Community (v0-pro)',
    subtitle: 'Builder community hub with activity feed, member cards, and events',
    chatId: 'eCYweJC6UTl',
    demoUrl: 'https://demo-kzmn6q9sjk9cmrje1k4y.vusercontent.net',
    model: 'v0-pro',
    fileCount: 4,
    color: 'blue',
    category: 'Community',
  },
]

// ── Color Config ──

const colorConfig: Record<string, { border: string; text: string; bg: string; glow: string }> = {
  emerald: { border: 'border-emerald-500/30', text: 'text-emerald-400', bg: 'bg-emerald-500/10', glow: 'hover:shadow-emerald-500/10' },
  cyan: { border: 'border-cyan-500/30', text: 'text-cyan-400', bg: 'bg-cyan-500/10', glow: 'hover:shadow-cyan-500/10' },
  violet: { border: 'border-violet-500/30', text: 'text-violet-400', bg: 'bg-violet-500/10', glow: 'hover:shadow-violet-500/10' },
  amber: { border: 'border-amber-500/30', text: 'text-amber-400', bg: 'bg-amber-500/10', glow: 'hover:shadow-amber-500/10' },
  rose: { border: 'border-rose-500/30', text: 'text-rose-400', bg: 'bg-rose-500/10', glow: 'hover:shadow-rose-500/10' },
  blue: { border: 'border-blue-500/30', text: 'text-blue-400', bg: 'bg-blue-500/10', glow: 'hover:shadow-blue-500/10' },
  orange: { border: 'border-orange-500/30', text: 'text-orange-400', bg: 'bg-orange-500/10', glow: 'hover:shadow-orange-500/10' },
  teal: { border: 'border-teal-500/30', text: 'text-teal-400', bg: 'bg-teal-500/10', glow: 'hover:shadow-teal-500/10' },
}

// ── Preview Card ──

function PreviewCard({ gen }: { gen: V0Generation }) {
  const [expanded, setExpanded] = useState(false)
  const colors = colorConfig[gen.color] || colorConfig.emerald

  return (
    <motion.div
      layout
      className={`group relative rounded-2xl border ${colors.border} bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-shadow duration-300 hover:shadow-2xl ${colors.glow} ${
        expanded ? 'col-span-1 md:col-span-2 lg:col-span-3' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: gen.id * 0.05 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span className={`flex items-center justify-center w-8 h-8 rounded-lg ${colors.bg} ${colors.text} text-sm font-bold`}>
            {gen.id}
          </span>
          <div>
            <h3 className="text-white font-semibold text-[15px] leading-tight">{gen.title}</h3>
            <p className="text-white/40 text-xs mt-0.5">{gen.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${colors.bg} ${colors.text}`}>
            {gen.category}
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white/70 transition-colors"
            aria-label={expanded ? 'Collapse preview' : 'Expand preview'}
          >
            {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* iframe Preview */}
      <div className={`relative bg-[#0a0a0b] ${expanded ? 'h-[700px]' : 'h-[400px]'} transition-all duration-500`}>
        <iframe
          src={gen.demoUrl}
          className="w-full h-full border-0"
          title={`${gen.title} Preview`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
        />
        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0a0a0b] to-transparent pointer-events-none" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-4 text-xs text-white/40">
          <span className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" />
            {gen.fileCount} files
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            {gen.model}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={gen.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Full Preview
          </a>
          <a
            href={`https://v0.dev/chat/${gen.chatId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${colors.text} ${colors.bg} hover:brightness-125 transition-all`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            Iterate in v0
          </a>
        </div>
      </div>
    </motion.div>
  )
}

// ── Main Page ──

export default function V0ShowcasePage() {
  const shouldReduceMotion = useReducedMotion()
  const [filter, setFilter] = useState<string>('all')

  const categories = ['all', ...Array.from(new Set(generations.map(g => g.category)))]
  const filtered = filter === 'all' ? generations : generations.filter(g => g.category === filter)

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-500/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/design-lab"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Design Lab
          </Link>
        </nav>

        {/* Hero */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium">
              v0 Generations
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              16 Premium Designs
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              Wave 2: v0-pro (GPT-5)
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            v0 Design{' '}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Showcase
            </span>
          </h1>

          <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
            16 premium page designs across 2 waves. Wave 1 uses v0-1.5-lg with extended thinking.
            Wave 2 uses v0-pro (GPT-5) for ultra-premium quality.
            Each design follows the FrankX brand system — dark glassmorphism, liquid gradients,
            and ultra-premium aesthetics.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { value: '16', label: 'Designs' },
              { value: '63', label: 'Total Files' },
              { value: '2', label: 'Waves' },
              { value: 'Thinking', label: 'Mode' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-sm text-white/40">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'text-white/40 hover:text-white/70 border border-transparent hover:border-white/10'
              }`}
            >
              {cat === 'all' ? 'All Designs' : cat}
              {cat !== 'all' && (
                <span className="ml-1.5 text-white/30">
                  ({generations.filter(g => g.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((gen) => (
            <PreviewCard key={gen.id} gen={gen} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
            <p className="text-white/60 text-sm max-w-md">
              These designs are generated prototypes. The best elements will be pulled into 
              the production FrankX codebase as part of the continuous design evolution process.
            </p>
            <div className="flex gap-3">
              <Link
                href="/design-lab"
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all"
              >
                View All Experiments
              </Link>
              <a
                href="https://v0.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-white hover:from-violet-500/30 hover:to-cyan-500/30 border border-violet-500/20 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open v0.dev
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
