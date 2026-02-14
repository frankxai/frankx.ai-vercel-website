'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  FileText,
  Send,
  BarChart3,
  Layers,
  Twitter,
  Linkedin,
  Mail,
  ChevronRight,
  Search,
  Filter,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Copy,
  Check,
  Eye,
  Zap,
  ImageIcon,
  Film,
} from 'lucide-react'

// ─── Types ─────────────────────────────────────────────────────

interface MediaAsset {
  type: 'hero' | 'infographic' | 'social' | 'thumbnail' | 'other'
  path: string
  filename: string
  hasThumbnail: boolean
}

interface ContentItem {
  slug: string
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  featured: boolean
  image?: string
  readingTime?: string
  wordCount: number
  media: MediaAsset[]
  mediaCount: number
  hasHeroImage: boolean
  hasThumbnail: boolean
  hasSocial: boolean
  socialPlatforms: string[]
  socialStatus: Record<string, string>
  pipelineStage: string
}

interface PipelineStats {
  total: number
  byStage: Record<string, number>
  socialCoverage: number
  drafts: number
  published: number
  withSocial: number
  withoutSocial: number
  platformCounts: Record<string, number>
}

// ─── Stat Card ─────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  sub,
}: {
  label: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  accent: string
  sub?: string
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-white/50">{label}</span>
        <div className={`rounded-lg p-2 ${accent}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
      <p className="text-3xl font-semibold text-white tracking-tight">{value}</p>
      {sub && <p className="text-xs text-white/40 mt-1">{sub}</p>}
    </div>
  )
}

// ─── Platform Badge ────────────────────────────────────────────

function PlatformBadge({ platform, status }: { platform: string; status: string }) {
  const config: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
    twitter: { icon: Twitter, color: 'text-sky-400' },
    linkedin: { icon: Linkedin, color: 'text-blue-400' },
    newsletter: { icon: Mail, color: 'text-emerald-400' },
  }
  const { icon: Icon, color } = config[platform] || { icon: Send, color: 'text-white/50' }

  return (
    <div className="flex items-center gap-1.5" title={`${platform}: ${status}`}>
      <Icon className={`w-3.5 h-3.5 ${color}`} />
      {status === 'published' ? (
        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
      ) : status === 'draft' ? (
        <Clock className="w-3 h-3 text-amber-400" />
      ) : null}
    </div>
  )
}

// ─── Pipeline Stage Badge ──────────────────────────────────────

function StageBadge({ stage }: { stage: string }) {
  const styles: Record<string, string> = {
    draft: 'bg-white/10 text-white/60',
    review: 'bg-amber-500/20 text-amber-300',
    images: 'bg-purple-500/20 text-purple-300',
    published: 'bg-emerald-500/20 text-emerald-300',
    distributed: 'bg-cyan-500/20 text-cyan-300',
    analyzed: 'bg-blue-500/20 text-blue-300',
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[stage] || styles.draft}`}>
      {stage}
    </span>
  )
}

// ─── Content Row ───────────────────────────────────────────────

function ContentRow({ item, onCopySlug }: { item: ContentItem; onCopySlug: (slug: string) => void }) {
  return (
    <div className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/[0.03] transition-colors">
      {/* Title + Meta */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/content/${item.slug}`}
            className="text-sm font-medium text-white/90 hover:text-white truncate"
          >
            {item.title}
          </Link>
          {item.featured && (
            <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          )}
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-white/40">{item.date || 'No date'}</span>
          <span className="text-xs text-white/30">{item.category}</span>
          <span className="text-xs text-white/30">{item.wordCount.toLocaleString()} words</span>
        </div>
      </div>

      {/* Media Indicators */}
      <div className="flex items-center gap-1.5 w-16">
        {item.mediaCount > 0 ? (
          <span className="flex items-center gap-1 text-xs text-purple-300" title={`${item.mediaCount} media asset${item.mediaCount > 1 ? 's' : ''}`}>
            <ImageIcon className="w-3.5 h-3.5" />
            {item.mediaCount}
          </span>
        ) : (
          <span className="text-xs text-white/15" title="No media assets">
            <ImageIcon className="w-3.5 h-3.5" />
          </span>
        )}
      </div>

      {/* Social Coverage */}
      <div className="flex items-center gap-2">
        {item.hasSocial ? (
          item.socialPlatforms.map(p => (
            <PlatformBadge key={p} platform={p} status={item.socialStatus[p] || 'draft'} />
          ))
        ) : (
          <span className="text-xs text-white/20">No social</span>
        )}
      </div>

      {/* Stage */}
      <StageBadge stage={item.pipelineStage} />

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onCopySlug(item.slug)}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white"
          title="Copy slug for /generate-social"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
        <Link
          href={`/blog/${item.slug}`}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white"
          title="View article"
        >
          <Eye className="w-3.5 h-3.5" />
        </Link>
        <Link
          href={`/admin/content/${item.slug}`}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white"
          title="Content detail"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}

// ─── Main Dashboard ────────────────────────────────────────────

export default function ContentCommandCenter() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [stats, setStats] = useState<PipelineStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'needs-social' | 'needs-images' | 'featured' | 'distributed'>('all')
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/content/inventory')
      if (res.ok) {
        const data = await res.json()
        setContent(data.content || [])
        setStats(data.stats || null)
      }
    } catch (err) {
      console.error('Failed to load content data:', err)
    } finally {
      setLoading(false)
    }
  }

  const copySlug = async (slug: string) => {
    try {
      await navigator.clipboard.writeText(slug)
      setCopied(slug)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      // Fallback: just select
    }
  }

  // Filtering
  const filtered = content.filter(item => {
    if (search) {
      const q = search.toLowerCase()
      if (!item.title.toLowerCase().includes(q) && !item.slug.includes(q) && !item.category.toLowerCase().includes(q)) {
        return false
      }
    }
    if (filter === 'needs-social') return !item.hasSocial && item.pipelineStage !== 'draft'
    if (filter === 'needs-images') return !item.hasHeroImage
    if (filter === 'featured') return item.featured
    if (filter === 'distributed') return item.hasSocial
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/50">
          <div className="w-5 h-5 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
          Loading content data...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0a0e1a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20">
                  <Layers className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">Content Command Center</h1>
                  <p className="text-xs text-white/40">{stats?.total || 0} articles | {stats?.socialCoverage || 0}% social coverage</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/content/pipeline"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-sm text-white/60 hover:text-white hover:border-white/20 transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                Pipeline
              </Link>
              <Link
                href="/admin/content-studio"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-sm text-white/60 hover:text-white hover:border-white/20 transition-colors"
              >
                <Send className="w-4 h-4" />
                Social Studio
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Articles" value={stats?.total || 0} icon={FileText} accent="bg-cyan-500/20" />
          <StatCard
            label="Social Coverage"
            value={`${stats?.socialCoverage || 0}%`}
            icon={Send}
            accent="bg-purple-500/20"
            sub={`${stats?.withSocial || 0} of ${stats?.total || 0} articles`}
          />
          <StatCard
            label="Needs Social"
            value={stats?.withoutSocial || 0}
            icon={AlertCircle}
            accent="bg-amber-500/20"
            sub="Articles without distribution"
          />
          <StatCard
            label="Media Assets"
            value={content.reduce((sum, c) => sum + c.mediaCount, 0)}
            icon={ImageIcon}
            accent="bg-purple-500/20"
            sub={`${content.filter(c => c.hasHeroImage).length} with hero images`}
          />
        </div>

        {/* ACOS Quick Actions */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-white/70">ACOS Commands</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { cmd: '/generate-social [slug]', desc: 'Generate social content' },
              { cmd: '/frankx-ai-blog', desc: 'Create new blog post' },
              { cmd: '/frankx-ai-content-pipeline', desc: 'Full pipeline' },
              { cmd: '/publish', desc: 'Publish to production' },
              { cmd: '/frankx-ai-seo', desc: 'SEO optimization' },
            ].map(({ cmd, desc }) => (
              <button
                key={cmd}
                onClick={() => copySlug(cmd)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/60 hover:text-white hover:border-white/15 transition-all group"
                title={desc}
              >
                <code className="text-cyan-400/80 group-hover:text-cyan-300">{cmd}</code>
                {copied === cmd ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3 opacity-0 group-hover:opacity-50" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/30"
            />
          </div>

          <div className="flex items-center gap-1.5">
            {(['all', 'needs-social', 'needs-images', 'featured', 'distributed'] as const).map(f => {
              const labels: Record<string, string> = {
                all: 'All',
                'needs-social': 'Needs Social',
                'needs-images': 'Needs Images',
                featured: 'Featured',
                distributed: 'Distributed',
              }
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    filter === f
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'bg-white/[0.04] text-white/40 border border-transparent hover:text-white/60'
                  }`}
                >
                  {labels[f]}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Table */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-4 px-4 py-2.5 border-b border-white/[0.06] text-xs text-white/30">
            <div className="flex-1">Article</div>
            <div className="w-16 text-center">Media</div>
            <div className="w-28 text-center">Social</div>
            <div className="w-24 text-center">Stage</div>
            <div className="w-20" />
          </div>

          {/* Rows */}
          <div className="divide-y divide-white/[0.03]">
            {filtered.length === 0 ? (
              <div className="px-4 py-12 text-center text-white/30 text-sm">
                {search ? 'No articles match your search.' : 'No articles found.'}
              </div>
            ) : (
              filtered.map(item => (
                <ContentRow key={item.slug} item={item} onCopySlug={copySlug} />
              ))
            )}
          </div>
        </div>

        {/* Footer Stats */}
        <div className="flex items-center justify-between mt-4 px-2 text-xs text-white/30">
          <span>Showing {filtered.length} of {content.length} articles</span>
          <span>
            {copied && (
              <span className="text-emerald-400">
                <Check className="w-3 h-3 inline mr-1" />
                Copied: {copied}
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
