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
  ChevronLeft,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Copy,
  Check,
  Eye,
  Zap,
  ImageIcon,
  LayoutGrid,
  List,
  Calendar,
  TrendingUp,
  X,
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

// ─── Stage Badge ──────────────────────────────────────────────

function StageBadge({ stage }: { stage: string }) {
  const styles: Record<string, string> = {
    draft: 'bg-black/60 text-white/60 border-white/10',
    review: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    images: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    published: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    distributed: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    analyzed: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium border backdrop-blur-sm ${styles[stage] || styles.draft}`}>
      {stage}
    </span>
  )
}

// ─── SEO Score Calculator ─────────────────────────────────────

function calculateSeoScore(item: ContentItem): { score: number; details: string[] } {
  let score = 0
  const details: string[] = []

  // Title quality (0-15)
  if (item.title) {
    score += 5
    if (item.title.length >= 30 && item.title.length <= 70) { score += 10; details.push('Title length optimal') }
    else { score += 3; details.push('Title could be 30-70 chars') }
  }

  // Description (0-15)
  if (item.description) {
    score += 5
    if (item.description.length >= 120 && item.description.length <= 160) { score += 10; details.push('Description length optimal') }
    else if (item.description.length > 0) { score += 5; details.push('Description could be 120-160 chars') }
  } else { details.push('Missing description') }

  // Hero image (0-10)
  if (item.hasHeroImage) { score += 10; details.push('Has hero image') }
  else { details.push('Missing hero image') }

  // Content depth (0-15)
  if (item.wordCount >= 2000) { score += 15; details.push('Deep content (2000+ words)') }
  else if (item.wordCount >= 1000) { score += 10; details.push('Good length (1000+ words)') }
  else if (item.wordCount >= 500) { score += 5; details.push('Light content (<1000 words)') }
  else { details.push('Very short content') }

  // Tags/keywords (0-10)
  if (item.tags.length >= 3) { score += 10; details.push(`${item.tags.length} tags`) }
  else if (item.tags.length > 0) { score += 5; details.push('Could use more tags') }
  else { details.push('No tags') }

  // Category set (0-5)
  if (item.category && item.category !== 'General') { score += 5 }

  // Media richness (0-10)
  if (item.mediaCount >= 3) { score += 10; details.push('Rich media') }
  else if (item.mediaCount >= 1) { score += 5 }
  else { details.push('No media assets') }

  // Social distribution (0-10)
  if (item.hasSocial && item.socialPlatforms.length >= 2) { score += 10; details.push('Multi-platform social') }
  else if (item.hasSocial) { score += 5 }
  else { details.push('No social content') }

  // Featured boost (0-5)
  if (item.featured) { score += 5 }

  // Date set (0-5)
  if (item.date) { score += 5 }

  return { score, details }
}

function SeoScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? 'text-emerald-400 bg-emerald-500/15 border-emerald-500/25'
    : score >= 60 ? 'text-cyan-400 bg-cyan-500/15 border-cyan-500/25'
    : score >= 40 ? 'text-amber-400 bg-amber-500/15 border-amber-500/25'
    : 'text-red-400 bg-red-500/15 border-red-500/25'

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium border backdrop-blur-sm ${color}`}>
      <TrendingUp className="w-2.5 h-2.5" />
      {score}
    </span>
  )
}

// ─── Calendar View ────────────────────────────────────────────

function CalendarView({ items }: { items: ContentItem[] }) {
  const [currentDate, setCurrentDate] = useState(() => new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Group articles by day
  const articlesByDay = new Map<number, ContentItem[]>()
  for (const item of items) {
    if (!item.date) continue
    const d = new Date(item.date)
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate()
      if (!articlesByDay.has(day)) articlesByDay.set(day, [])
      articlesByDay.get(day)!.push(item)
    }
  }

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))
  const today = new Date()
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Build calendar grid
  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  // Count articles this month
  const monthArticles = items.filter(item => {
    if (!item.date) return false
    const d = new Date(item.date)
    return d.getFullYear() === year && d.getMonth() === month
  })

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
      {/* Calendar header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/50 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="text-center">
          <h3 className="text-sm font-semibold text-white">{monthName}</h3>
          <p className="text-[11px] text-white/40 mt-0.5">{monthArticles.length} articles this month</p>
        </div>
        <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/50 hover:text-white transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-white/[0.04]">
        {days.map(d => (
          <div key={d} className="py-2 text-center text-[10px] font-medium text-white/30 uppercase tracking-wider">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          const dayArticles = day ? (articlesByDay.get(day) || []) : []
          const isToday = isCurrentMonth && day === today.getDate()

          return (
            <div
              key={i}
              className={`min-h-[90px] p-1.5 border-b border-r border-white/[0.03] ${
                day ? 'bg-white/[0.01]' : 'bg-black/20'
              } ${isToday ? 'ring-1 ring-inset ring-cyan-500/30 bg-cyan-500/[0.03]' : ''}`}
            >
              {day && (
                <>
                  <div className={`text-[11px] font-medium mb-1 ${isToday ? 'text-cyan-400' : 'text-white/40'}`}>
                    {day}
                  </div>
                  <div className="space-y-0.5">
                    {dayArticles.slice(0, 3).map(article => (
                      <Link
                        key={article.slug}
                        href={`/admin/content/${article.slug}`}
                        className="block px-1.5 py-0.5 rounded text-[9px] leading-tight truncate hover:bg-white/[0.06] transition-colors"
                        style={{
                          color: article.featured ? '#fbbf24' : article.hasSocial ? '#67e8f9' : 'rgba(255,255,255,0.5)',
                          backgroundColor: article.featured ? 'rgba(251,191,36,0.08)' : article.hasSocial ? 'rgba(103,232,249,0.05)' : 'rgba(255,255,255,0.03)',
                        }}
                        title={article.title}
                      >
                        {article.title}
                      </Link>
                    ))}
                    {dayArticles.length > 3 && (
                      <div className="text-[9px] text-white/30 px-1.5">+{dayArticles.length - 3} more</div>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Content Card (Visual Feed) ───────────────────────────────

function ContentCard({ item, onCopy }: { item: ContentItem; onCopy: (text: string) => void }) {
  const heroSrc = item.image || item.media.find(m => m.type === 'hero')?.path
  const seo = calculateSeoScore(item)

  const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    twitter: Twitter,
    linkedin: Linkedin,
    newsletter: Mail,
  }

  return (
    <Link
      href={`/admin/content/${item.slug}`}
      className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-white/[0.12] transition-all duration-200"
    >
      {/* Image Area */}
      <div className="relative aspect-video bg-gradient-to-br from-white/[0.03] to-white/[0.01] overflow-hidden">
        {heroSrc ? (
          <img
            src={heroSrc}
            alt=""
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileText className="w-10 h-10 text-white/10" />
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <StageBadge stage={item.pipelineStage} />
          {item.featured && (
            <span className="flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 text-[10px] text-amber-300 backdrop-blur-sm">
              <Sparkles className="w-2.5 h-2.5" />
              featured
            </span>
          )}
          <SeoScoreBadge score={seo.score} />
        </div>

        {/* Top-right media count */}
        {item.mediaCount > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/50 border border-white/10 px-2 py-0.5 text-[10px] text-white/70 backdrop-blur-sm">
            <ImageIcon className="w-2.5 h-2.5" />
            {item.mediaCount}
          </div>
        )}

        {/* Bottom overlay: title + social */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-sm font-semibold text-white leading-tight line-clamp-2 group-hover:text-cyan-200 transition-colors">
            {item.title}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-[11px] text-white/50">
              <span>{item.date || 'No date'}</span>
              <span className="text-white/20">|</span>
              <span>{item.readingTime}</span>
            </div>
            {/* Social badges */}
            <div className="flex items-center gap-1.5">
              {item.hasSocial ? (
                item.socialPlatforms.map(p => {
                  const Icon = platformIcons[p] || Send
                  return (
                    <div key={p} className="flex items-center gap-0.5" title={`${p}: ${item.socialStatus[p]}`}>
                      <Icon className="w-3 h-3 text-white/50" />
                      {item.socialStatus[p] === 'published' ? (
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                      ) : (
                        <Clock className="w-2.5 h-2.5 text-amber-400" />
                      )}
                    </div>
                  )
                })
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Card body: description + meta */}
      <div className="p-4">
        <p className="text-xs text-white/40 line-clamp-2 leading-relaxed">{item.description}</p>
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="text-[10px] text-white/25 bg-white/[0.04] rounded-full px-2 py-0.5">{item.category}</span>
          <span className="text-[10px] text-white/25">{item.wordCount.toLocaleString()} words</span>
          {!item.hasSocial && item.pipelineStage !== 'draft' && (
            <span className="text-[10px] text-amber-400/70 bg-amber-500/10 rounded-full px-2 py-0.5">needs social</span>
          )}
        </div>
      </div>

      {/* Hover actions */}
      <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onCopy(item.slug) }}
          className="p-1.5 rounded-lg bg-black/60 border border-white/10 text-white/60 hover:text-white backdrop-blur-sm"
          title="Copy slug"
        >
          <Copy className="w-3 h-3" />
        </button>
        <Link
          href={`/blog/${item.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="p-1.5 rounded-lg bg-black/60 border border-white/10 text-white/60 hover:text-white backdrop-blur-sm"
          title="View live"
        >
          <Eye className="w-3 h-3" />
        </Link>
      </div>
    </Link>
  )
}

// ─── Content Row (List View) ──────────────────────────────────

function ContentRow({ item, onCopy }: { item: ContentItem; onCopy: (text: string) => void }) {
  const heroSrc = item.image || item.media.find(m => m.type === 'hero')?.path
  const seo = calculateSeoScore(item)

  return (
    <Link
      href={`/admin/content/${item.slug}`}
      className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/[0.03] transition-colors"
    >
      {/* Thumbnail */}
      <div className="w-20 h-12 rounded-lg overflow-hidden bg-white/[0.03] flex-shrink-0">
        {heroSrc ? (
          <img src={heroSrc} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileText className="w-4 h-4 text-white/10" />
          </div>
        )}
      </div>

      {/* Title + Meta */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white/90 group-hover:text-white truncate">
            {item.title}
          </span>
          {item.featured && <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />}
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-white/40">{item.date || 'No date'}</span>
          <span className="text-xs text-white/30">{item.category}</span>
          <span className="text-xs text-white/30">{item.wordCount.toLocaleString()} words</span>
        </div>
      </div>

      {/* SEO Score */}
      <SeoScoreBadge score={seo.score} />

      {/* Social */}
      <div className="flex items-center gap-2">
        {item.hasSocial ? (
          item.socialPlatforms.map(p => {
            const icons: Record<string, React.ComponentType<{ className?: string }>> = {
              twitter: Twitter, linkedin: Linkedin, newsletter: Mail,
            }
            const Icon = icons[p] || Send
            return <Icon key={p} className="w-3.5 h-3.5 text-white/40" />
          })
        ) : (
          <span className="text-xs text-white/20">No social</span>
        )}
      </div>

      <StageBadge stage={item.pipelineStage} />

      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
    </Link>
  )
}

// ─── Main Dashboard ────────────────────────────────────────────

export default function ContentCommandCenter() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [stats, setStats] = useState<PipelineStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'needs-social' | 'needs-images' | 'featured' | 'distributed' | 'has-media'>('all')
  const [view, setView] = useState<'feed' | 'list' | 'calendar'>('feed')
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

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(text)
      setTimeout(() => setCopied(null), 2000)
    } catch {}
  }

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
    if (filter === 'has-media') return item.mediaCount > 0
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/50">
          <div className="w-5 h-5 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
          Loading content feed...
        </div>
      </div>
    )
  }

  const totalMedia = content.reduce((sum, c) => sum + c.mediaCount, 0)
  const withImages = content.filter(c => c.hasHeroImage).length
  const avgSeo = content.length > 0
    ? Math.round(content.reduce((sum, c) => sum + calculateSeoScore(c).score, 0) / content.length)
    : 0

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0a0e1a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20">
                <Layers className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Content Studio</h1>
                <p className="text-xs text-white/40">{stats?.total || 0} articles | {totalMedia} media | {stats?.socialCoverage || 0}% social | SEO {avgSeo}/100</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* View toggle */}
              <div className="flex items-center bg-white/[0.04] rounded-lg border border-white/[0.08] p-0.5">
                <button
                  onClick={() => setView('feed')}
                  className={`p-1.5 rounded-md transition-colors ${view === 'feed' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}
                  title="Feed view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-1.5 rounded-md transition-colors ${view === 'list' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView('calendar')}
                  className={`p-1.5 rounded-md transition-colors ${view === 'calendar' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}
                  title="Calendar view"
                >
                  <Calendar className="w-4 h-4" />
                </button>
              </div>

              <Link
                href="/admin/content/pipeline"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-sm text-white/60 hover:text-white hover:border-white/20 transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                Pipeline
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Quick Stats Bar */}
        <div className="flex items-center gap-6 mb-6 px-1 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-white/50">{stats?.total || 0} articles</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="text-white/50">{totalMedia} media</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-white/50">{withImages} with images</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-white/50">{stats?.withoutSocial || 0} need social</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3 h-3 text-cyan-400" />
            <span className="text-white/50">SEO avg: {avgSeo}/100</span>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/30"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {(['all', 'featured', 'has-media', 'needs-social', 'distributed', 'needs-images'] as const).map(f => {
              const labels: Record<string, string> = {
                all: 'All',
                featured: 'Featured',
                'has-media': 'With Media',
                'needs-social': 'Needs Social',
                distributed: 'Distributed',
                'needs-images': 'No Images',
              }
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
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

        {/* Content Feed */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-white/30 text-sm">
            {search ? 'No articles match your search.' : 'No articles found.'}
          </div>
        ) : view === 'calendar' ? (
          <CalendarView items={filtered} />
        ) : view === 'feed' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(item => (
              <ContentCard key={item.slug} item={item} onCopy={copyText} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden divide-y divide-white/[0.03]">
            {filtered.map(item => (
              <ContentRow key={item.slug} item={item} onCopy={copyText} />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 px-2 text-xs text-white/30">
          <span>Showing {filtered.length} of {content.length} articles</span>
          <div className="flex items-center gap-4">
            {copied && (
              <span className="text-emerald-400">
                <Check className="w-3 h-3 inline mr-1" />
                Copied: {copied}
              </span>
            )}
            <Link href="/admin/content/pipeline" className="text-white/30 hover:text-white/50 transition-colors">
              View pipeline
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
