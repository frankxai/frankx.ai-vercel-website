'use client'

import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
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
  Smartphone,
  Tablet,
  Monitor,
  Search,
  Check,
  Copy,
  Terminal,
  Shield,
  Rocket,
  Code2,
  Flame,
  Zap,
  Play,
  Cpu,
  RefreshCw,
  Boxes,
} from 'lucide-react'
import v0Data from '@/data/v0-generations.json'

// ── Types ───────────────────────────────────────────────────────────────────

interface V0Generation {
  id: number
  wave: number
  title: string
  subtitle?: string
  chatId: string
  demoUrl: string
  chatUrl: string
  fileCount: number
  category: string
  color: string
  status: string
  quality: string
  deployed: boolean
  vercelDeployUrl?: string
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile'

// ── Color Config ────────────────────────────────────────────────────────────

const colorConfig: Record<
  string,
  {
    border: string
    borderHover: string
    text: string
    bg: string
    glow: string
    badgeBg: string
    gradient: string
  }
> = {
  emerald: {
    border: 'border-emerald-500/20',
    borderHover: 'hover:border-emerald-500/50',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    glow: 'shadow-emerald-500/10',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    gradient: 'from-emerald-500/20 via-transparent to-transparent',
  },
  cyan: {
    border: 'border-cyan-500/20',
    borderHover: 'hover:border-cyan-500/50',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    glow: 'shadow-cyan-500/10',
    badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    gradient: 'from-cyan-500/20 via-transparent to-transparent',
  },
  violet: {
    border: 'border-violet-500/20',
    borderHover: 'hover:border-violet-500/50',
    text: 'text-violet-400',
    bg: 'bg-violet-500/10',
    glow: 'shadow-violet-500/10',
    badgeBg: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    gradient: 'from-violet-500/20 via-transparent to-transparent',
  },
  amber: {
    border: 'border-amber-500/20',
    borderHover: 'hover:border-amber-500/50',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    glow: 'shadow-amber-500/10',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    gradient: 'from-amber-500/20 via-transparent to-transparent',
  },
  rose: {
    border: 'border-rose-500/20',
    borderHover: 'hover:border-rose-500/50',
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    glow: 'shadow-rose-500/10',
    badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    gradient: 'from-rose-500/20 via-transparent to-transparent',
  },
  blue: {
    border: 'border-blue-500/20',
    borderHover: 'hover:border-blue-500/50',
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
    glow: 'shadow-blue-500/10',
    badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    gradient: 'from-blue-500/20 via-transparent to-transparent',
  },
  orange: {
    border: 'border-orange-500/20',
    borderHover: 'hover:border-orange-500/50',
    text: 'text-orange-400',
    bg: 'bg-orange-500/10',
    glow: 'shadow-orange-500/10',
    badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    gradient: 'from-orange-500/20 via-transparent to-transparent',
  },
  teal: {
    border: 'border-teal-500/20',
    borderHover: 'hover:border-teal-500/50',
    text: 'text-teal-400',
    bg: 'bg-teal-500/10',
    glow: 'shadow-teal-500/10',
    badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    gradient: 'from-teal-500/20 via-transparent to-transparent',
  },
}

// ── Categories & Waves ──────────────────────────────────────────────────────

const categories = [
  'All',
  'micro-saas',
  'landing-page',
  'product-page',
  'dashboard',
  'creator-tool',
  'community',
  'component',
]

const categoryLabels: Record<string, string> = {
  All: 'All Templates',
  'micro-saas': 'Micro-SaaS & Stacks',
  'landing-page': 'Landing Pages',
  'product-page': 'Product Pages',
  dashboard: 'Dashboards & CoE',
  'creator-tool': 'Creator Tools',
  community: 'Community',
  component: 'Components',
}

// ── Main Page Component ─────────────────────────────────────────────────────

export default function V0ShowcasePage() {
  const shouldReduceMotion = useReducedMotion()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedWave, setSelectedWave] = useState<number | 'All'>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [activePreviewId, setActivePreviewId] = useState<number | null>(null)
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop')
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const generations = v0Data.generations as V0Generation[]

  // Filtered list
  const filteredGenerations = useMemo(() => {
    return generations.filter((gen) => {
      const matchCat =
        selectedCategory === 'All' ||
        gen.category.toLowerCase() === selectedCategory.toLowerCase()
      const matchWave = selectedWave === 'All' || gen.wave === selectedWave
      const matchQuery =
        !searchQuery ||
        gen.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (gen.subtitle && gen.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        gen.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchWave && matchQuery
    })
  }, [generations, selectedCategory, selectedWave, searchQuery])

  const copyDeployUrl = (gen: V0Generation) => {
    const url =
      gen.vercelDeployUrl ||
      `https://vercel.com/new/clone?repository-url=https://github.com/frankxai/FrankX&project-name=${gen.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
    navigator.clipboard.writeText(url)
    setCopiedId(gen.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white selection:bg-emerald-500/30 selection:text-white">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-500/10 via-cyan-500/5 to-transparent blur-3xl opacity-60" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-violet-500/5 blur-3xl rounded-full" />
        <div className="absolute top-2/3 -left-40 w-[600px] h-[600px] bg-emerald-500/5 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Templates Hub
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-emerald-400 mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Vercel + v0 + FrankX Sovereign AI Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
            Deploy Sovereign AI Systems in{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Seconds
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-3xl mx-auto mb-10">
            19 production-ready UI architectures and full-stack micro-SaaS templates.
            Test live interactive previews, deploy directly to Vercel with 1-click, or remix the
            generative source in v0.
          </p>

          {/* Value Props Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
              <div className="text-2xl font-bold text-white mb-1">19</div>
              <div className="text-xs text-zinc-400">SOTA Templates</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
              <div className="text-2xl font-bold text-emerald-400 mb-1">1-Click</div>
              <div className="text-xs text-zinc-400">Vercel Deploy</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
              <div className="text-2xl font-bold text-cyan-400 mb-1">Next.js 16</div>
              <div className="text-xs text-zinc-400">App Router Native</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
              <div className="text-2xl font-bold text-violet-400 mb-1">v0 + MCP</div>
              <div className="text-xs text-zinc-400">Agentic Generation</div>
            </div>
          </div>
        </div>

        {/* Wave 3 Spotlight Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-zinc-900/60 to-cyan-950/40 p-6 sm:p-8 mb-16 backdrop-blur-md overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
                <Flame className="w-3.5 h-3.5" /> Wave 3 Live Release
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Agentic Micro-SaaS, AI CoE Console & Music Studio
              </h2>
              <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
                Generated with v0-pro and the Starlight Multi-Agent MCP substrate. Complete with
                Edge API routes, token telemetry, Suno prompt visualizers, and Stripe checkout.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setSelectedWave(3)
                  setSelectedCategory('All')
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20"
              >
                View Wave 3 Kits
              </button>
              <Link
                href="/shop/templates"
                className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white font-medium text-sm transition-all duration-200"
              >
                Commercial Licenses
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Filter & Search Bar */}
        <div className="space-y-4 mb-10">
          {/* Wave Selector & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Wave Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md w-full sm:w-auto overflow-x-auto">
              {(['All', 3, 2, 1] as const).map((wave) => (
                <button
                  key={String(wave)}
                  onClick={() => setSelectedWave(wave)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                    selectedWave === wave
                      ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {wave === 'All' ? 'All Waves' : `Wave ${wave} ${wave === 3 ? '✨' : ''}`}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search templates or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'bg-white/[0.02] text-zinc-400 border border-white/[0.04] hover:text-zinc-200 hover:bg-white/[0.04]'
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-6">
          <span>
            Showing <strong className="text-zinc-300">{filteredGenerations.length}</strong> of{' '}
            <strong className="text-zinc-300">{generations.length}</strong> templates
          </span>
          {selectedWave !== 'All' && (
            <span className="text-emerald-400 font-medium">Filtered by Wave {selectedWave}</span>
          )}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGenerations.map((gen) => {
            const colors = colorConfig[gen.color] || colorConfig.emerald
            const isPreviewing = activePreviewId === gen.id
            const deployUrl =
              gen.vercelDeployUrl ||
              `https://vercel.com/new/clone?repository-url=https://github.com/frankxai/FrankX&project-name=${gen.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`

            return (
              <motion.div
                key={gen.id}
                layout={!shouldReduceMotion}
                className={`group relative rounded-2xl border ${colors.border} ${colors.borderHover} bg-white/[0.02] backdrop-blur-md overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl ${colors.glow} ${
                  isPreviewing ? 'col-span-1 md:col-span-2 lg:col-span-3' : ''
                }`}
              >
                {/* Top Ambient Card Glow */}
                <div
                  className={`absolute top-0 inset-x-0 h-24 bg-gradient-to-b ${colors.gradient} pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity`}
                />

                {/* Card Header */}
                <div className="relative p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center font-bold text-sm border ${colors.border}`}
                      >
                        #{gen.id}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-white tracking-tight group-hover:text-white transition-colors">
                            {gen.title}
                          </h3>
                          {gen.wave === 3 && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              NEW
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-zinc-500">
                          Wave {gen.wave} · {gen.fileCount} source files
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[11px] font-medium px-2.5 py-1 rounded-full border capitalize ${colors.badgeBg}`}
                    >
                      {gen.category.replace('-', ' ')}
                    </span>
                  </div>

                  {gen.subtitle && (
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">{gen.subtitle}</p>
                  )}

                  {/* Interactive Preview Drawer (When Active) */}
                  <AnimatePresence>
                    {isPreviewing && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="my-4 rounded-xl border border-white/[0.1] bg-black/60 overflow-hidden"
                      >
                        {/* Device Mode Switcher Toolbar */}
                        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-white/[0.02]">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-zinc-400 font-medium">Viewport:</span>
                            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/40 border border-white/[0.06]">
                              <button
                                onClick={() => setDeviceMode('desktop')}
                                className={`p-1.5 rounded text-xs transition-colors ${
                                  deviceMode === 'desktop'
                                    ? 'bg-emerald-500/20 text-emerald-300'
                                    : 'text-zinc-400 hover:text-white'
                                }`}
                                title="Desktop view"
                              >
                                <Monitor className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeviceMode('tablet')}
                                className={`p-1.5 rounded text-xs transition-colors ${
                                  deviceMode === 'tablet'
                                    ? 'bg-emerald-500/20 text-emerald-300'
                                    : 'text-zinc-400 hover:text-white'
                                }`}
                                title="Tablet view (768px)"
                              >
                                <Tablet className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeviceMode('mobile')}
                                className={`p-1.5 rounded text-xs transition-colors ${
                                  deviceMode === 'mobile'
                                    ? 'bg-emerald-500/20 text-emerald-300'
                                    : 'text-zinc-400 hover:text-white'
                                }`}
                                title="Mobile view (375px)"
                              >
                                <Smartphone className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <a
                              href={gen.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1 transition-colors"
                            >
                              <span>Open Standalone</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            <button
                              onClick={() => setActivePreviewId(null)}
                              className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                            >
                              <Minimize2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Iframe Viewport Container */}
                        <div className="p-4 flex items-center justify-center bg-[#0d0e12] overflow-x-auto min-h-[500px]">
                          <div
                            className={`transition-all duration-300 overflow-hidden bg-black rounded-lg border border-white/[0.08] shadow-2xl ${
                              deviceMode === 'desktop'
                                ? 'w-full h-[540px]'
                                : deviceMode === 'tablet'
                                  ? 'w-[768px] h-[540px]'
                                  : 'w-[375px] h-[580px] rounded-[32px] border-4 border-zinc-700 shadow-2xl relative'
                            }`}
                          >
                            <iframe
                              src={gen.demoUrl}
                              title={gen.title}
                              className="w-full h-full border-0 bg-transparent"
                              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card Action Suite Footer */}
                <div className="relative p-6 pt-0 border-t border-white/[0.04] bg-white/[0.01]">
                  <div className="flex flex-col gap-2.5 pt-4">
                    {/* Primary Deploy & Remix Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={deployUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-md group/btn"
                      >
                        <span className="font-bold">▲</span>
                        <span>Deploy Vercel</span>
                        <ArrowUpRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>

                      <a
                        href={gen.chatUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-white font-medium text-xs transition-colors"
                      >
                        <Zap className="w-3 h-3 text-amber-400" />
                        <span>Remix on v0</span>
                      </a>
                    </div>

                    {/* Secondary Tool Strip */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() =>
                          setActivePreviewId(isPreviewing ? null : gen.id)
                        }
                        className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors ${
                          isPreviewing ? colors.text : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isPreviewing ? 'Close Preview' : 'Interactive Demo'}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyDeployUrl(gen)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                          title="Copy 1-Click Vercel Deploy URL"
                        >
                          {copiedId === gen.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <Link
                          href="/shop/templates"
                          className="text-[11px] text-zinc-400 hover:text-emerald-300 transition-colors font-medium"
                        >
                          Commercial Kit →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredGenerations.length === 0 && (
          <div className="text-center py-20 rounded-2xl border border-white/[0.06] bg-white/[0.01]">
            <Boxes className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-1">No templates found</h3>
            <p className="text-sm text-zinc-400 mb-6">
              Try adjusting your search query, wave selection, or category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSelectedWave('All')
                setSearchQuery('')
              }}
              className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-medium text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Monetization / Creator Flywheel Section */}
        <div className="mt-28 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-8 sm:p-12 backdrop-blur-xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400 mb-4">
              <Rocket className="w-3.5 h-3.5" /> The Creator & Developer Flywheel
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How Creators Build Multi-Million Dollar AI Businesses
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Every template is built with clean Next.js 16 App Router code, glassmorphic design tokens,
              and ready-to-wire MCP agent backends. Scale from free clone to sovereign subscription.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-black/40 border border-white/[0.06]">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold mb-4">
                01
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">1-Click Vercel Clones</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Deploy full architectures directly to your own Vercel account in under 60 seconds with
                zero configuration required.
              </p>
              <span className="text-[11px] font-semibold text-emerald-400">Free Tier Lead Gen</span>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/[0.06]">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold mb-4">
                02
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Commercial Micro-SaaS</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Full-stack starter kits equipped with Stripe/LemonSqueezy, authentication, and multi-agent
                MCP endpoints for launching sovereign software.
              </p>
              <Link
                href="/shop/templates"
                className="text-[11px] font-semibold text-cyan-400 hover:underline"
              >
                Explore Commercial Packs →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/[0.06]">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 font-bold mb-4">
                03
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Bespoke Agentic Hubs</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Enterprise AI command centers and customized agent swarms built for founders and teams
                seeking rapid 48-hour delivery.
              </p>
              <Link
                href="/ai-architecture"
                className="text-[11px] font-semibold text-violet-400 hover:underline"
              >
                AI Architecture Advisory →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
