'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  BarChart3,
  Search,
  Plus,
  Clock,
  ListOrdered,
  Table2,
  Play,
  ArrowRight,
  Trash2,
  Download,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'
import type { EnhancedVideo, CategorySummary, VideoAnnotation, ClipQueueItem } from '@/lib/video-types'

// ============================================================================
// TYPES & PROPS
// ============================================================================

interface AdminProps {
  videos: EnhancedVideo[]
  categories: CategorySummary[]
  stats: { totalVideos: number; totalCategories: number; featuredCount: number; uniqueAuthors: number }
  initialAnnotations: Array<{ videoId: string }>
  initialClips: Array<{ id: string }>
}

type Tab = 'dashboard' | 'discovery' | 'annotations' | 'clips' | 'bulk'

const tabs: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'discovery', label: 'Discovery', icon: Search },
  { id: 'annotations', label: 'Annotations', icon: Clock },
  { id: 'clips', label: 'Clip Queue', icon: ListOrdered },
  { id: 'bulk', label: 'Bulk Manager', icon: Table2 },
]

// ============================================================================
// COMPONENT
// ============================================================================

export default function YouTubeAdminClient({
  videos,
  categories,
  stats,
  initialAnnotations,
  initialClips,
}: AdminProps) {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [annotations, setAnnotations] = useState(initialAnnotations as VideoAnnotation[])
  const [clips, setClips] = useState(initialClips as ClipQueueItem[])

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0a0a0b]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Play className="w-5 h-5 text-emerald-400" />
            <h1 className="text-lg font-bold">YouTube Admin</h1>
            <span className="text-xs text-white/30 px-2 py-0.5 rounded-full border border-white/10">
              {stats.totalVideos} videos
            </span>
          </div>
          <Link href="/watch" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
            View Public Hub <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Tab Bar */}
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-white/50 hover:text-white/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
          <DashboardTab videos={videos} categories={categories} stats={stats} annotations={annotations} clips={clips} />
        )}
        {activeTab === 'discovery' && (
          <DiscoveryTab videos={videos} />
        )}
        {activeTab === 'annotations' && (
          <AnnotationsTab videos={videos} annotations={annotations} setAnnotations={setAnnotations} />
        )}
        {activeTab === 'clips' && (
          <ClipQueueTab clips={clips} setClips={setClips} />
        )}
        {activeTab === 'bulk' && (
          <BulkManagerTab videos={videos} />
        )}
      </div>
    </main>
  )
}

// ============================================================================
// TAB 1: DASHBOARD
// ============================================================================

function DashboardTab({
  videos, categories, stats, annotations, clips,
}: {
  videos: EnhancedVideo[]
  categories: CategorySummary[]
  stats: AdminProps['stats']
  annotations: VideoAnnotation[]
  clips: ClipQueueItem[]
}) {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Videos', value: stats.totalVideos, color: 'text-emerald-400' },
          { label: 'Categories', value: stats.totalCategories, color: 'text-cyan-400' },
          { label: 'Annotated', value: annotations.length, color: 'text-amber-400' },
          { label: 'Clips Queued', value: clips.length, color: 'text-purple-400' },
        ].map((s) => (
          <div key={s.label} className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-white/40 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Category Breakdown */}
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
        <h3 className="text-base font-bold mb-4">Category Breakdown</h3>
        <div className="space-y-2">
          {categories.map((cat) => {
            const pct = Math.round((cat.count / stats.totalVideos) * 100)
            return (
              <div key={cat.name} className="flex items-center gap-3">
                <span className="text-sm text-white/60 w-40 truncate">{cat.name}</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500/60 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-white/40 w-12 text-right">{cat.count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Additions */}
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
        <h3 className="text-base font-bold mb-4">Recent Additions</h3>
        <div className="space-y-2">
          {videos.slice(0, 5).map((v) => (
            <div key={v.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
              <Play className="w-4 h-4 text-white/20 flex-none" />
              <span className="text-sm text-white/80 truncate flex-1">{v.title}</span>
              <span className="text-xs text-white/30">{v.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// TAB 2: DISCOVERY
// ============================================================================

function DiscoveryTab({ videos }: { videos: EnhancedVideo[] }) {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'duplicate'>('idle')
  const [message, setMessage] = useState('')

  const existingIds = useMemo(() => new Set(videos.map((v) => v.id)), [videos])

  function extractVideoId(input: string): string | null {
    // Handle various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/, // raw ID
    ]
    for (const p of patterns) {
      const match = input.match(p)
      if (match) return match[1]
    }
    return null
  }

  async function handleAdd() {
    const id = extractVideoId(url.trim())
    if (!id) {
      setStatus('error')
      setMessage('Invalid YouTube URL or ID')
      return
    }
    if (existingIds.has(id)) {
      setStatus('duplicate')
      setMessage(`Video ${id} already in vault`)
      return
    }

    try {
      const res = await fetch('/api/admin/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'video',
          data: {
            id,
            title: `New Video (${id})`,
            channel: 'Unknown',
            url: `https://www.youtube.com/watch?v=${id}`,
            duration: '0:00',
            topic: 'Uncategorized',
            tags: [],
          },
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(`Added! Vault now has ${data.total} videos.`)
        setUrl('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to add')
      }
    } catch {
      setStatus('error')
      setMessage('Network error')
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
        <h3 className="text-base font-bold mb-4">Add Video to Vault</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => { setUrl(e.target.value); setStatus('idle') }}
            placeholder="Paste YouTube URL or video ID..."
            className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50"
          />
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-emerald-500 text-black rounded-xl font-bold hover:bg-emerald-400 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
        {status !== 'idle' && (
          <div className={`mt-3 flex items-center gap-2 text-sm ${
            status === 'success' ? 'text-emerald-400' : status === 'duplicate' ? 'text-amber-400' : 'text-red-400'
          }`}>
            {status === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {message}
          </div>
        )}
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
        <h3 className="text-base font-bold mb-2">YouTube API Trending</h3>
        <p className="text-sm text-white/40">
          Phase 2: Connect YouTube Data API v3 for trending feed discovery. Requires API key setup.
        </p>
        <div className="mt-4 p-8 border border-dashed border-white/10 rounded-xl text-center text-white/20">
          Trending feed placeholder — coming with YouTube API integration
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// TAB 3: ANNOTATIONS
// ============================================================================

function AnnotationsTab({
  videos,
  annotations,
  setAnnotations,
}: {
  videos: EnhancedVideo[]
  annotations: VideoAnnotation[]
  setAnnotations: (a: VideoAnnotation[]) => void
}) {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null)
  const [timeInput, setTimeInput] = useState('')
  const [labelInput, setLabelInput] = useState('')
  const [typeInput, setTypeInput] = useState<'highlight' | 'chapter' | 'quote' | 'clip-start' | 'clip-end'>('highlight')

  const selectedVideo = videos.find((v) => v.id === selectedVideoId)
  const currentAnnotation = annotations.find((a) => a.videoId === selectedVideoId)

  function parseTimeToSeconds(time: string): number {
    const parts = time.split(':').map(Number)
    if (parts.length === 2) return parts[0] * 60 + parts[1]
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
    return 0
  }

  async function addTimestamp() {
    if (!selectedVideoId || !timeInput || !labelInput) return
    const seconds = parseTimeToSeconds(timeInput)
    const newTs = {
      time: timeInput,
      seconds,
      label: labelInput,
      type: typeInput,
      clipCandidate: typeInput === 'clip-start',
    }

    const existing = annotations.find((a) => a.videoId === selectedVideoId)
    const updated: VideoAnnotation = existing
      ? { ...existing, timestamps: [...existing.timestamps, newTs] }
      : { videoId: selectedVideoId, timestamps: [newTs], notes: '', updatedAt: '' }

    try {
      await fetch('/api/admin/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'annotation', data: updated }),
      })

      const newAnnotations = existing
        ? annotations.map((a) => (a.videoId === selectedVideoId ? { ...updated, updatedAt: new Date().toISOString() } : a))
        : [...annotations, { ...updated, updatedAt: new Date().toISOString() }]

      setAnnotations(newAnnotations)
      setTimeInput('')
      setLabelInput('')
    } catch { /* network error */ }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Video Selector */}
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 max-h-[600px] overflow-y-auto">
        <h3 className="text-sm font-bold mb-3 text-white/60 uppercase tracking-wider">Select Video</h3>
        <div className="space-y-1">
          {videos.slice(0, 30).map((v) => {
            const hasAnnotation = annotations.some((a) => a.videoId === v.id)
            return (
              <button
                key={v.id}
                onClick={() => setSelectedVideoId(v.id)}
                className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedVideoId === v.id
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'text-white/60 hover:bg-white/5'
                }`}
              >
                {hasAnnotation && <Clock className="w-3 h-3 text-amber-400 flex-none" />}
                <span className="truncate">{v.title}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Annotation Form */}
      <div className="lg:col-span-2 space-y-4">
        {selectedVideo ? (
          <>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
              <h3 className="font-bold mb-1">{selectedVideo.title}</h3>
              <p className="text-xs text-white/40">{selectedVideo.author} &middot; {selectedVideo.duration}</p>
            </div>

            {/* Embedded Player */}
            <div className="aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                allowFullScreen
              />
            </div>

            {/* Add Timestamp */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
              <h4 className="text-sm font-bold mb-3">Add Timestamp</h4>
              <div className="flex flex-wrap gap-3">
                <input
                  type="text"
                  value={timeInput}
                  onChange={(e) => setTimeInput(e.target.value)}
                  placeholder="MM:SS"
                  className="w-24 bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500/50"
                />
                <input
                  type="text"
                  value={labelInput}
                  onChange={(e) => setLabelInput(e.target.value)}
                  placeholder="Label..."
                  className="flex-1 bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500/50"
                />
                <select
                  value={typeInput}
                  onChange={(e) => setTypeInput(e.target.value as typeof typeInput)}
                  className="bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option value="highlight">Highlight</option>
                  <option value="chapter">Chapter</option>
                  <option value="quote">Quote</option>
                  <option value="clip-start">Clip Start</option>
                  <option value="clip-end">Clip End</option>
                </select>
                <button
                  onClick={addTimestamp}
                  className="px-4 py-2 bg-emerald-500 text-black rounded-lg text-sm font-bold hover:bg-emerald-400"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Existing Timestamps */}
            {currentAnnotation && currentAnnotation.timestamps.length > 0 && (
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                <h4 className="text-sm font-bold mb-3">Timestamps ({currentAnnotation.timestamps.length})</h4>
                <div className="space-y-2">
                  {currentAnnotation.timestamps.map((ts, i) => (
                    <div key={i} className="flex items-center gap-3 py-1.5 border-b border-white/5 last:border-0">
                      <span className="text-xs font-mono text-emerald-400 w-14">{ts.time}</span>
                      <span className="text-sm text-white/80 flex-1">{ts.label}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/40 uppercase">
                        {ts.type}
                      </span>
                      {ts.clipCandidate && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/30 text-amber-400">
                          Clip
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-12 text-center">
            <Clock className="w-8 h-8 text-white/20 mx-auto mb-3" />
            <p className="text-white/40">Select a video to annotate timestamps</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// TAB 4: CLIP QUEUE
// ============================================================================

function ClipQueueTab({
  clips,
  setClips,
}: {
  clips: ClipQueueItem[]
  setClips: (c: ClipQueueItem[]) => void
}) {
  const columns: { status: string; label: string; color: string }[] = [
    { status: 'discovered', label: 'Discovered', color: 'border-white/20' },
    { status: 'annotated', label: 'Annotated', color: 'border-cyan-500/30' },
    { status: 'queued', label: 'Queued', color: 'border-amber-500/30' },
    { status: 'clipped', label: 'Clipped', color: 'border-emerald-500/30' },
    { status: 'published', label: 'Published', color: 'border-purple-500/30' },
  ]

  async function moveClip(clipId: string, newStatus: string) {
    const updated = clips.map((c) =>
      c.id === clipId ? { ...c, status: newStatus as ClipQueueItem['status'], updatedAt: new Date().toISOString() } : c
    )
    setClips(updated)
    const clip = updated.find((c) => c.id === clipId)
    if (clip) {
      await fetch('/api/admin/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'clip', data: clip }),
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold">Clip Pipeline</h3>
        <span className="text-xs text-white/30">{clips.length} items</span>
      </div>

      {clips.length === 0 ? (
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-12 text-center">
          <ListOrdered className="w-8 h-8 text-white/20 mx-auto mb-3" />
          <p className="text-white/40 mb-2">No clips in queue yet</p>
          <p className="text-xs text-white/30">
            Use the Annotations tab to mark clip candidates, or use <code className="text-emerald-400">/video-clip</code> command
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-3">
          {columns.map((col) => {
            const colClips = clips.filter((c) => c.status === col.status)
            return (
              <div key={col.status} className={`bg-white/[0.02] border ${col.color} rounded-xl p-3`}>
                <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3 flex items-center justify-between">
                  {col.label}
                  <span className="text-white/30">{colClips.length}</span>
                </h4>
                <div className="space-y-2">
                  {colClips.map((clip) => (
                    <div key={clip.id} className="bg-white/[0.03] border border-white/10 rounded-lg p-3">
                      <p className="text-xs font-medium mb-1 line-clamp-2">{clip.clipTitle || clip.videoTitle}</p>
                      <div className="flex items-center gap-2 text-[10px] text-white/30">
                        <span>{clip.startTime} - {clip.endTime}</span>
                        {clip.viralScore > 0 && (
                          <span className={`px-1.5 py-0.5 rounded ${clip.viralScore >= 7 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/40'}`}>
                            {clip.viralScore}/10
                          </span>
                        )}
                      </div>
                      {col.status !== 'published' && (
                        <button
                          onClick={() => {
                            const nextIdx = columns.findIndex((c) => c.status === col.status) + 1
                            if (nextIdx < columns.length) {
                              moveClip(clip.id, columns[nextIdx].status)
                            }
                          }}
                          className="mt-2 text-[10px] text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          Move <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// TAB 5: BULK MANAGER
// ============================================================================

function BulkManagerTab({ videos }: { videos: EnhancedVideo[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'title' | 'author' | 'category'>('title')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filteredVideos = useMemo(() => {
    let filtered = videos.filter(
      (v) =>
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
    filtered.sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
    return filtered
  }, [videos, searchQuery, sortBy])

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleAll() {
    if (selected.size === filteredVideos.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(filteredVideos.map((v) => v.id)))
    }
  }

  function exportCsv() {
    const rows = filteredVideos
      .filter((v) => selected.size === 0 || selected.has(v.id))
      .map((v) => `"${v.title}","${v.author}","${v.category}","${v.duration}","${v.url}"`)
    const csv = `"Title","Author","Category","Duration","URL"\n${rows.join('\n')}`
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'video-vault-export.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter videos..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500/50"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
          >
            <option value="title">Sort: Title</option>
            <option value="author">Sort: Author</option>
            <option value="category">Sort: Category</option>
          </select>
          <button
            onClick={exportCsv}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 hover:bg-white/10 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            CSV
          </button>
        </div>
      </div>

      {/* Selection stats */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-sm text-emerald-400">
          <CheckCircle className="w-4 h-4" />
          {selected.size} selected
          <button onClick={() => setSelected(new Set())} className="ml-auto text-xs hover:underline">
            Clear
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10">
            <tr>
              <th className="text-left p-3 w-10">
                <input
                  type="checkbox"
                  checked={selected.size === filteredVideos.length && filteredVideos.length > 0}
                  onChange={toggleAll}
                  className="rounded"
                />
              </th>
              <th className="text-left p-3 text-xs text-white/40 uppercase tracking-wider">Title</th>
              <th className="text-left p-3 text-xs text-white/40 uppercase tracking-wider hidden md:table-cell">Author</th>
              <th className="text-left p-3 text-xs text-white/40 uppercase tracking-wider hidden lg:table-cell">Category</th>
              <th className="text-left p-3 text-xs text-white/40 uppercase tracking-wider w-20">Duration</th>
            </tr>
          </thead>
          <tbody>
            {filteredVideos.map((v) => (
              <tr
                key={v.id}
                className={`border-b border-white/5 transition-colors ${
                  selected.has(v.id) ? 'bg-emerald-500/5' : 'hover:bg-white/[0.02]'
                }`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.has(v.id)}
                    onChange={() => toggleSelect(v.id)}
                    className="rounded"
                  />
                </td>
                <td className="p-3">
                  <span className="text-white/80">{v.title}</span>
                  {v.featured && (
                    <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 uppercase">
                      Featured
                    </span>
                  )}
                </td>
                <td className="p-3 text-white/50 hidden md:table-cell">{v.author}</td>
                <td className="p-3 text-white/40 hidden lg:table-cell">{v.category}</td>
                <td className="p-3 text-white/40 font-mono text-xs">{v.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-white/30 text-center">
        Showing {filteredVideos.length} of {videos.length} videos
      </p>
    </div>
  )
}
