'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  CheckCircle2,
  Search,
  Filter,
  Calendar,
  Link2,
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
  ExternalLink,
  TrendingUp,
  Database,
  Building2,
  Cpu,
  Brain,
  Sparkles,
} from 'lucide-react'
import {
  validatedClaims,
  getFreshnessStatus,
  getConfidencePercentage,
  type ValidatedClaim,
  type FreshnessStatus,
  type ConfidenceLevel,
} from '@/lib/research/validated-claims'

// Category icon mapping
const categoryIcons: Record<string, React.ElementType> = {
  'Market Size': TrendingUp,
  'Enterprise Adoption': Building2,
  'Framework Adoption': Cpu,
  'Company Metrics': TrendingUp,
  'MCP Ecosystem': Database,
  'Oracle OCI': Database,
  'Production Patterns': Cpu,
  'Model Performance': Sparkles,
  'Brain-Computer Interfaces': Brain,
  'Neuromorphic Computing': Brain,
  'Thought Decoding': Brain,
  'Organoid Intelligence': Brain,
  'AI Mental Health': Brain,
  'Consciousness Research': Brain,
  'Cognitive Enhancement': Brain,
  'Landmark Research': Sparkles,
}

// Freshness badge component
function FreshnessBadge({ status }: { status: FreshnessStatus }) {
  const config = {
    current: {
      color: 'bg-emerald-500',
      textColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      icon: ShieldCheck,
      label: 'Current',
    },
    aging: {
      color: 'bg-amber-500',
      textColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      icon: AlertTriangle,
      label: 'Aging',
    },
    stale: {
      color: 'bg-red-500',
      textColor: 'text-red-400',
      bgColor: 'bg-red-500/10',
      icon: AlertCircle,
      label: 'Stale',
    },
  }

  const { color, textColor, bgColor, icon: Icon, label } = config[status]

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full ${bgColor} px-2 py-0.5`}>
      <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
      <span className={`text-[10px] font-medium ${textColor}`}>{label}</span>
    </div>
  )
}

// Confidence bar
function ConfidenceBar({ confidence }: { confidence: ConfidenceLevel }) {
  const percentage = getConfidencePercentage(confidence)
  const color = confidence === 'high' ? 'bg-emerald-500' :
                confidence === 'medium-high' ? 'bg-cyan-500' :
                confidence === 'medium' ? 'bg-amber-500' : 'bg-red-500'

  return (
    <div className="flex items-center gap-2">
      <div className="h-1 w-16 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full ${color} rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-[10px] text-slate-500">{percentage}%</span>
    </div>
  )
}

export default function ClaimsBrowserPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedConfidence, setSelectedConfidence] = useState<ConfidenceLevel | null>(null)

  // Get all claims as array
  const allClaims = useMemo(() => Object.values(validatedClaims), [])

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(allClaims.map(c => c.category))
    return Array.from(cats).sort()
  }, [allClaims])

  // Filter claims
  const filteredClaims = useMemo(() => {
    return allClaims.filter(claim => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          claim.claim.toLowerCase().includes(query) ||
          claim.value.toLowerCase().includes(query) ||
          claim.category.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Category filter
      if (selectedCategory && claim.category !== selectedCategory) {
        return false
      }

      // Confidence filter
      if (selectedConfidence && claim.confidence !== selectedConfidence) {
        return false
      }

      return true
    })
  }, [allClaims, searchQuery, selectedCategory, selectedConfidence])

  // Group by category
  const claimsByCategory = useMemo(() => {
    const grouped: Record<string, ValidatedClaim[]> = {}
    filteredClaims.forEach(claim => {
      if (!grouped[claim.category]) {
        grouped[claim.category] = []
      }
      grouped[claim.category].push(claim)
    })
    return grouped
  }, [filteredClaims])

  // Stats
  const stats = useMemo(() => {
    const highConfidence = allClaims.filter(c => c.confidence === 'high').length
    const current = allClaims.filter(c => getFreshnessStatus(c.validatedDate) === 'current').length
    const crossReferenced = allClaims.filter(c => c.crossRefCount >= 2).length
    return { total: allClaims.length, highConfidence, current, crossReferenced }
  }, [allClaims])

  return (
    <main className="min-h-screen bg-[#030712]">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-[#030712]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Research Hub
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10">
                <Database className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Validated Claims</h1>
                <p className="text-slate-400">Browse all research-backed statistics</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-center">
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-xs text-slate-500">Total Claims</p>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-center">
              <p className="text-2xl font-bold text-emerald-400">{stats.highConfidence}</p>
              <p className="text-xs text-slate-500">High Confidence</p>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-center">
              <p className="text-2xl font-bold text-cyan-400">{stats.current}</p>
              <p className="text-xs text-slate-500">Current</p>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-center">
              <p className="text-2xl font-bold text-violet-400">{stats.crossReferenced}</p>
              <p className="text-xs text-slate-500">Cross-Referenced</p>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 space-y-4"
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search claims..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] pl-12 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50"
              />
            </div>

            {/* Filter chips */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  !selectedCategory
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'bg-white/[0.03] text-slate-400 border border-white/10 hover:bg-white/[0.06]'
                }`}
              >
                All Categories
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-white/[0.03] text-slate-400 border border-white/10 hover:bg-white/[0.06]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Confidence filter */}
            <div className="flex gap-2">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Filter className="h-3 w-3" />
                Confidence:
              </span>
              {(['high', 'medium-high', 'medium', 'low'] as ConfidenceLevel[]).map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedConfidence(selectedConfidence === level ? null : level)}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-medium capitalize transition-all ${
                    selectedConfidence === level
                      ? level === 'high' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        level === 'medium-high' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                        level === 'medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-white/[0.03] text-slate-400 border border-white/10 hover:bg-white/[0.06]'
                  }`}
                >
                  {level.replace('-', ' ')}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Results count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mb-6"
          >
            <p className="text-sm text-slate-500">
              Showing <span className="text-white font-medium">{filteredClaims.length}</span> claims
              {selectedCategory && <span> in {selectedCategory}</span>}
            </p>
          </motion.div>

          {/* Claims Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {Object.entries(claimsByCategory).map(([category, claims]) => {
              const CategoryIcon: React.ComponentType<{ className?: string }> = categoryIcons[category] || CheckCircle2
              return (
                <div key={category}>
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                    <CategoryIcon className="h-5 w-5 text-cyan-400" />
                    {category}
                    <span className="text-xs text-slate-500 font-normal">({claims.length})</span>
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {claims.map((claim) => {
                      const freshness = getFreshnessStatus(claim.validatedDate)
                      return (
                        <div
                          key={claim.id}
                          className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <p className="text-sm text-slate-300">{claim.claim}</p>
                            <span className="text-xl font-bold text-cyan-400 whitespace-nowrap">
                              {claim.value}
                            </span>
                          </div>

                          {/* Sources */}
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-1.5">
                              {claim.sources.map((source, si) => (
                                <span key={si}>
                                  {source.url ? (
                                    <a
                                      href={source.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-300"
                                    >
                                      {source.name}
                                      <ExternalLink className="h-2.5 w-2.5" />
                                    </a>
                                  ) : (
                                    <span className="text-[10px] text-slate-500">{source.name}</span>
                                  )}
                                  {si < claim.sources.length - 1 && (
                                    <span className="text-slate-600 text-[10px] mx-1">•</span>
                                  )}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Metadata row */}
                          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/5">
                            <ConfidenceBar confidence={claim.confidence} />
                            <FreshnessBadge status={freshness} />
                            {claim.crossRefCount > 1 && (
                              <span className="flex items-center gap-1 text-[10px] text-slate-500">
                                <Link2 className="h-3 w-3" />
                                {claim.crossRefCount}x
                              </span>
                            )}
                            <span className="flex items-center gap-1 text-[10px] text-slate-600">
                              <Calendar className="h-3 w-3" />
                              {claim.validatedDate}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </motion.div>

          {/* Empty state */}
          {filteredClaims.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-slate-400 mb-2">No claims match your filters</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory(null)
                  setSelectedConfidence(null)
                }}
                className="text-cyan-400 text-sm hover:text-cyan-300"
              >
                Clear all filters
              </button>
            </motion.div>
          )}

          {/* Methodology note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/[0.04] p-6">
              <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                About This Registry
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Every claim in this registry is validated against primary sources including peer-reviewed papers,
                official announcements, and industry reports. Claims marked &quot;High Confidence&quot; have 2+ independent
                cross-references. All claims are re-validated regularly and marked with freshness indicators.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
