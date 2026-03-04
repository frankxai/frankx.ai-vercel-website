'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  AlertCircle,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  CircleDashed,
  ExternalLink,
  Eye,
  Layers,
  Link2,
  Maximize2,
  Minimize2,
  Rocket,
  Sparkles,
} from 'lucide-react'
import v0Dataset from '@/data/v0-generations.json'

type V0Wave = {
  wave: number
  model: string
}

type V0Generation = {
  id: number
  wave: number
  title: string
  chatId: string
  chatUrl?: string
  demoUrl: string
  fileCount: number
  category: string
  color: string
  status: 'completed' | 'pending' | 'failed' | string
  deployed?: boolean
}

type V0DataSet = {
  waves: V0Wave[]
  generations: V0Generation[]
}

type EnrichedGeneration = V0Generation & {
  subtitle: string
  model: string
  categoryLabel: string
  productionPath: string | null
  isTemplateReady: boolean
  isInterlinked: boolean
  isGoodToShip: boolean
}

const data = v0Dataset as V0DataSet

const subtitleById: Record<number, string> = {
  1: 'Liquid gradient hero with floating stat cards and scroll indicators',
  2: 'Filter system with featured ACOS card and animated gradient orbs',
  3: 'Two-column grid with sidebar, category filters, credibility signals',
  4: 'Premium blog index with featured posts and reading time estimates',
  5: 'Membership page with tier comparison and exclusive content preview',
  6: 'Agent orchestration showcase with metrics, features, and pricing',
  7: 'Learning platform with course cards, progress tracking, and certifications',
  8: 'Personal brand page with timeline, skills visualization, and values',
  9: 'Component showcase with color palette, typography, and spacing tokens',
  10: 'Audio production hub with waveform visualizations and track management',
  11: 'Premium self-discovery platform with pillar visualizations and golden path',
  12: 'AI collaboration ecosystem with constellation graph and department cards',
  13: 'Build sessions hub with animated beaker, lab flow, and replay archive',
  14: 'Premium membership with animated shield, tiered pricing, and FAQ accordion',
  15: 'AI coaching platform with program tiers, methodology, and booking flow',
  16: 'Builder community hub with activity feed, member cards, and events',
}

const productionRouteById: Record<number, string> = {
  1: '/',
  2: '/products',
  3: '/research',
  4: '/blog',
  5: '/inner-circle',
  6: '/products/agentic-creator-os',
  7: '/courses',
  8: '/about',
  9: '/design-system',
  10: '/music',
  11: '/soulbook',
  12: '/community',
  13: '/labs',
  14: '/inner-circle',
  15: '/coaching',
  16: '/community',
}

const categoryLabels: Record<string, string> = {
  'landing-page': 'Landing Page',
  'product-page': 'Product Page',
  dashboard: 'Dashboard',
  component: 'Component',
  community: 'Community',
}

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

const statusBadgeClass: Record<string, string> = {
  completed: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20',
  pending: 'bg-amber-500/10 text-amber-300 border border-amber-500/20',
  failed: 'bg-rose-500/10 text-rose-300 border border-rose-500/20',
}

function toTitleCase(input: string) {
  return input
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function PreviewCard({ gen }: { gen: EnrichedGeneration }) {
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
      transition={{ duration: 0.35, delay: gen.id * 0.03 }}
    >
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
            {gen.categoryLabel}
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

      <div className="flex flex-wrap gap-2 px-5 py-3 border-b border-white/[0.06] text-[10px]">
        <span className={`px-2 py-1 rounded-full ${statusBadgeClass[gen.status] || 'bg-white/10 text-white/60 border border-white/15'}`}>
          {toTitleCase(gen.status)}
        </span>
        <span className={`px-2 py-1 rounded-full border ${gen.deployed ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20' : 'bg-white/5 text-white/50 border-white/10'}`}>
          {gen.deployed ? 'Deployed' : 'Not Deployed'}
        </span>
        <span className={`px-2 py-1 rounded-full border ${gen.isTemplateReady ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-amber-500/10 text-amber-300 border-amber-500/20'}`}>
          {gen.isTemplateReady ? 'Template Ready' : 'Template Needs Work'}
        </span>
        <span className={`px-2 py-1 rounded-full border ${gen.isInterlinked ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' : 'bg-white/5 text-white/50 border-white/10'}`}>
          {gen.isInterlinked ? 'Interlinked' : 'Not Interlinked'}
        </span>
      </div>

      <div className={`relative bg-[#0a0a0b] ${expanded ? 'h-[700px]' : 'h-[400px]'} transition-all duration-500`}>
        <iframe
          src={gen.demoUrl}
          className="w-full h-full border-0"
          title={`${gen.title} Preview`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0a0a0b] to-transparent pointer-events-none" />
      </div>

      <div className="flex flex-col gap-3 px-5 py-3 border-t border-white/[0.06]">
        <div className="flex items-center justify-between">
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
          <span className={`text-xs ${gen.isGoodToShip ? 'text-emerald-300' : 'text-amber-300'}`}>
            {gen.isGoodToShip ? 'Good to Ship' : 'Needs Follow-up'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
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
            href={gen.chatUrl || `https://v0.dev/chat/${gen.chatId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${colors.text} ${colors.bg} hover:brightness-125 transition-all`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            Iterate in v0
          </a>
          {gen.productionPath ? (
            <Link
              href={gen.productionPath}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500/10 text-blue-300 hover:bg-blue-500/15 transition-colors"
            >
              <Link2 className="w-3.5 h-3.5" />
              Open Live Route
            </Link>
          ) : null}
        </div>
      </div>
    </motion.div>
  )
}

export default function V0ShowcasePage() {
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [readinessFilter, setReadinessFilter] = useState<'all' | 'ready' | 'follow-up'>('all')

  const modelByWave = useMemo(() => {
    return Object.fromEntries(data.waves.map((wave) => [wave.wave, wave.model]))
  }, [])

  const generations: EnrichedGeneration[] = useMemo(() => {
    return data.generations.map((gen) => {
      const productionPath = productionRouteById[gen.id] || null
      const isTemplateReady = gen.status === 'completed' && gen.fileCount > 0
      const isInterlinked = Boolean(productionPath)
      return {
        ...gen,
        subtitle: subtitleById[gen.id] || 'Premium design iteration generated in v0.',
        model: modelByWave[gen.wave] || 'v0',
        categoryLabel: categoryLabels[gen.category] || toTitleCase(gen.category),
        productionPath,
        isTemplateReady,
        isInterlinked,
        isGoodToShip: isTemplateReady && isInterlinked,
      }
    })
  }, [modelByWave])

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(generations.map((g) => g.category)))],
    [generations],
  )

  const filtered = useMemo(() => {
    let result = generations
    if (categoryFilter !== 'all') {
      result = result.filter((g) => g.category === categoryFilter)
    }
    if (readinessFilter === 'ready') {
      result = result.filter((g) => g.isGoodToShip)
    }
    if (readinessFilter === 'follow-up') {
      result = result.filter((g) => !g.isGoodToShip)
    }
    return result
  }, [generations, categoryFilter, readinessFilter])

  const stats = useMemo(() => {
    const templateReady = generations.filter((g) => g.isTemplateReady).length
    const interlinked = generations.filter((g) => g.isInterlinked).length
    const goodToShip = generations.filter((g) => g.isGoodToShip).length
    const deployed = generations.filter((g) => g.deployed).length
    return { templateReady, interlinked, goodToShip, deployed, total: generations.length }
  }, [generations])

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-500/[0.03] rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <nav className="mb-8">
          <Link
            href="/design-lab"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Design Lab
          </Link>
        </nav>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium">
              v0 Generations
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              {stats.total} Total Templates
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
              {stats.goodToShip} Good to Ship
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            v0 Template{' '}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Readiness Hub
            </span>
          </h1>

          <p className="text-lg text-white/50 max-w-3xl leading-relaxed">
            Embeds, readiness, and internal interlinks for every v0 generation in one place.
            Use this page to verify what is production-ready and where each concept is currently wired.
          </p>

          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2 text-sm text-white/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>{stats.templateReady}/{stats.total} templates ready</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Link2 className="w-4 h-4 text-blue-300" />
              <span>{stats.interlinked}/{stats.total} interlinked</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Rocket className="w-4 h-4 text-cyan-300" />
              <span>{stats.deployed}/{stats.total} deployed</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <CircleDashed className="w-4 h-4 text-amber-300" />
              <span>{stats.total - stats.goodToShip} need follow-up</span>
            </div>
          </div>
        </motion.div>

        <div className="mb-5 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                categoryFilter === cat
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'text-white/40 hover:text-white/70 border border-transparent hover:border-white/10'
              }`}
            >
              {cat === 'all' ? 'All Categories' : categoryLabels[cat] || toTitleCase(cat)}
              {cat !== 'all' && (
                <span className="ml-1.5 text-white/30">({generations.filter((g) => g.category === cat).length})</span>
              )}
            </button>
          ))}
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          <button
            onClick={() => setReadinessFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              readinessFilter === 'all'
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-white/40 hover:text-white/70 border border-transparent hover:border-white/10'
            }`}
          >
            All Statuses
          </button>
          <button
            onClick={() => setReadinessFilter('ready')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              readinessFilter === 'ready'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25'
                : 'text-white/40 hover:text-white/70 border border-transparent hover:border-white/10'
            }`}
          >
            Ready + Interlinked
          </button>
          <button
            onClick={() => setReadinessFilter('follow-up')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              readinessFilter === 'follow-up'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/25'
                : 'text-white/40 hover:text-white/70 border border-transparent hover:border-white/10'
            }`}
          >
            Needs Follow-up
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-10 text-center text-white/60">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-300">
              <AlertCircle className="h-5 w-5" />
            </div>
            No templates found for this filter combination.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((gen) => (
              <PreviewCard key={gen.id} gen={gen} />
            ))}
          </div>
        )}

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4 }}
        >
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
            <p className="text-white/60 text-sm max-w-2xl">
              Embeds are now sourced from the canonical v0 dataset and each card exposes live-route linkage.
              Remaining follow-up items are visible via the readiness filter.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/design-lab"
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all"
              >
                View All Experiments
              </Link>
              <Link
                href="/shop/templates"
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-cyan-300 border border-cyan-500/20 bg-cyan-500/10 hover:bg-cyan-500/15 transition-all"
              >
                Open Template Store
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
