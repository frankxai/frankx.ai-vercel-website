'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Filter,
  Search,
  ShieldCheck,
} from 'lucide-react'
import { researchDomains } from '@/lib/research/domains'
import {
  domainSources,
  sourceTypeLabels,
  type SourceType,
  type ResearchSource,
} from '@/lib/research/sources'

interface SourceWithDomain extends ResearchSource {
  domainSlug: string
  domainTitle: string
}

// Build flat list of all sources with domain info
const allSources: SourceWithDomain[] = Object.entries(domainSources).flatMap(
  ([slug, sources]) => {
    const domain = researchDomains.find((d) => d.slug === slug)
    return sources.map((src) => ({
      ...src,
      domainSlug: slug,
      domainTitle: domain?.title || slug,
    }))
  }
)

// Deduplicate by URL (some sources appear in multiple domains)
const uniqueSources = allSources.filter(
  (src, idx, arr) => arr.findIndex((s) => s.url === src.url) === idx
)

const sourceTypes: SourceType[] = [
  'industry-report',
  'journal',
  'official',
  'news',
  'blog',
  'benchmark',
  'preprint',
]

const typeColors: Record<SourceType, string> = {
  'industry-report': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  journal: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  official: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  news: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  blog: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  benchmark: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  preprint: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
}

export default function SourceBrowserPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeType, setActiveType] = useState<SourceType | 'all'>('all')
  const [activeDomain, setActiveDomain] = useState<string>('all')

  const filtered = useMemo(() => {
    let results = uniqueSources

    if (activeType !== 'all') {
      results = results.filter((s) => s.type === activeType)
    }

    if (activeDomain !== 'all') {
      results = results.filter((s) => s.domainSlug === activeDomain)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      results = results.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          s.domainTitle.toLowerCase().includes(q)
      )
    }

    return results
  }, [searchQuery, activeType, activeDomain])

  // Count by type for badges
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: uniqueSources.length }
    sourceTypes.forEach((t) => {
      counts[t] = uniqueSources.filter((s) => s.type === t).length
    })
    return counts
  }, [])

  // Unique publishers
  const publisherCount = useMemo(
    () => new Set(uniqueSources.map((s) => s.name)).size,
    []
  )

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute top-0 right-1/4 w-[60%] h-[50%]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.03) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative pt-28 pb-20 md:pt-36">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link
              href="/research"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Research Hub
            </Link>
            <span>/</span>
            <span className="text-white/70">Source Browser</span>
          </div>

          {/* Hero */}
          <div className="mb-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3.5 bg-emerald-500/10 rounded-2xl border border-emerald-500/30">
                <BookOpen className="w-7 h-7 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Source Browser
                </h1>
                <p className="text-white/40 mt-1">
                  Every source backing our research, searchable and transparent
                </p>
              </div>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="text-2xl font-bold text-white">
                  {uniqueSources.length}
                </p>
                <p className="text-xs text-emerald-400 font-medium">
                  Unique Sources
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="text-2xl font-bold text-white">
                  {publisherCount}
                </p>
                <p className="text-xs text-cyan-400 font-medium">Publishers</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="text-2xl font-bold text-white">
                  {researchDomains.length}
                </p>
                <p className="text-xs text-violet-400 font-medium">
                  Domains Covered
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="text-2xl font-bold text-white">
                  {sourceTypes.length}
                </p>
                <p className="text-xs text-amber-400 font-medium">
                  Source Types
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search by title, publisher, or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Type filter */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-3 h-3 text-white/30" />
                <span className="text-[10px] font-semibold text-white/25 uppercase tracking-wider">
                  Source Type
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setActiveType('all')}
                  className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                    activeType === 'all'
                      ? 'bg-white text-black font-medium'
                      : 'bg-white/[0.04] text-white/50 border border-white/[0.08] hover:bg-white/[0.08]'
                  }`}
                >
                  All ({typeCounts.all})
                </button>
                {sourceTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setActiveType(activeType === type ? 'all' : type)
                    }
                    className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                      activeType === type
                        ? 'bg-white text-black font-medium'
                        : 'bg-white/[0.04] text-white/50 border border-white/[0.08] hover:bg-white/[0.08]'
                    }`}
                  >
                    {sourceTypeLabels[type]} ({typeCounts[type]})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Domain filter */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-3 h-3 text-white/30" />
              <span className="text-[10px] font-semibold text-white/25 uppercase tracking-wider">
                Research Domain
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveDomain('all')}
                className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                  activeDomain === 'all'
                    ? 'bg-white text-black font-medium'
                    : 'bg-white/[0.04] text-white/50 border border-white/[0.08] hover:bg-white/[0.08]'
                }`}
              >
                All Domains
              </button>
              {researchDomains.map((d) => (
                <button
                  key={d.slug}
                  onClick={() =>
                    setActiveDomain(
                      activeDomain === d.slug ? 'all' : d.slug
                    )
                  }
                  className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                    activeDomain === d.slug
                      ? 'bg-white text-black font-medium'
                      : 'bg-white/[0.04] text-white/50 border border-white/[0.08] hover:bg-white/[0.08]'
                  }`}
                >
                  {d.title}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-xs text-white/30 mb-4">
            Showing {filtered.length} of {uniqueSources.length} sources
          </p>

          {/* Source list */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-8 h-8 text-white/20 mx-auto mb-4" />
              <p className="text-white/40 text-sm">
                No sources match your filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveType('all')
                  setActiveDomain('all')
                }}
                className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((src, idx) => (
                <div
                  key={`${src.url}-${idx}`}
                  className="flex gap-3 p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
                >
                  <span className="text-xs font-mono text-white/20 flex-shrink-0 mt-0.5 w-8 text-right">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/70 hover:text-white transition-colors inline-flex items-start gap-1 group"
                    >
                      <span className="break-words">{src.title}</span>
                      <ArrowUpRight className="w-3 h-3 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className="text-[10px] text-white/30 font-medium">
                        {src.name}
                      </span>
                      <span
                        className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full border ${typeColors[src.type]}`}
                      >
                        {sourceTypeLabels[src.type]}
                      </span>
                      <Link
                        href={`/research/${src.domainSlug}`}
                        className="text-[10px] text-white/20 hover:text-white/50 transition-colors"
                      >
                        {src.domainTitle}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Back link */}
          <div className="pt-8 mt-8 border-t border-white/[0.04]">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Research Hub
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
