'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'

interface GateResults {
  brand_alignment: boolean
  color_balance: boolean
  information_density: boolean
  depth_layers: boolean
  text_legibility: boolean
  icon_quality: boolean
  scroll_stop: boolean
  organic_warmth: boolean
}

interface CouncilReview {
  brand_guardian: number
  art_director: number
  storyteller: number
  weighted_score: number
  verdict: string
  vetoes: string[]
  revision_cycle: number
}

interface LogEntry {
  id: string
  timestamp: string
  subject: string
  template_type: string
  style: string
  organizing_metaphor: string
  prompt_excerpt: string
  model: string
  model_tier: string
  thinking_level?: string
  resolution?: string
  aspect_ratio: string
  cost_usd: number
  output_path: string
  file_size_bytes: number
  dimensions: string
  council_review: CouncilReview
  gates: GateResults
  gates_passed: number
  gates_total: number
  status: string
  step: number
  notes: string
}

interface ImageLog {
  version: string
  total_cost_usd: number
  total_images: number
  entries: LogEntry[]
}

type FilterVerdict = 'all' | 'APPROVED' | 'NEEDS-REVISION' | 'REJECTED' | 'PENDING_REVIEW'
type FilterStatus = 'all' | 'test' | 'approved' | 'rejected' | 'batch' | 'auto-logged'
type ViewMode = 'grid' | 'compare'

const GATE_LABELS: Record<keyof GateResults, string> = {
  brand_alignment: 'Brand',
  color_balance: 'Color',
  information_density: 'Density',
  depth_layers: 'Depth',
  text_legibility: 'Text',
  icon_quality: 'Icons',
  scroll_stop: 'Scroll-Stop',
  organic_warmth: 'Organic',
}

const VERDICT_COLORS: Record<string, string> = {
  APPROVED: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  'NEEDS-REVISION': 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  REJECTED: 'text-red-400 bg-red-400/10 border-red-400/30',
  PENDING_REVIEW: 'text-zinc-400 bg-zinc-400/10 border-zinc-400/30',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatBytes(bytes: number) {
  if (bytes === 0) return '—'
  const mb = bytes / (1024 * 1024)
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`
}

function GateBadges({ gates }: { gates: GateResults }) {
  return (
    <div className="flex flex-wrap gap-1">
      {(Object.entries(gates) as [keyof GateResults, boolean][]).map(([key, passed]) => (
        <span
          key={key}
          className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
            passed
              ? 'bg-emerald-400/15 text-emerald-400 border border-emerald-400/20'
              : 'bg-red-400/10 text-red-400/60 border border-red-400/15'
          }`}
        >
          {GATE_LABELS[key]}
        </span>
      ))}
    </div>
  )
}

function CouncilScores({ review }: { review: CouncilReview }) {
  const lenses = [
    { label: 'Brand', score: review.brand_guardian, weight: '35%' },
    { label: 'Art Dir', score: review.art_director, weight: '40%' },
    { label: 'Story', score: review.storyteller, weight: '25%' },
  ]

  return (
    <div className="space-y-1">
      {lenses.map((l) => (
        <div key={l.label} className="flex items-center gap-2 text-xs">
          <span className="text-zinc-500 w-12">{l.label}</span>
          <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
              style={{ width: `${(l.score / 10) * 100}%` }}
            />
          </div>
          <span className="text-zinc-400 font-mono w-6 text-right">{l.score}</span>
        </div>
      ))}
      <div className="flex items-center justify-between pt-1 border-t border-zinc-800">
        <span className="text-xs text-zinc-500">Weighted</span>
        <span className="text-sm font-bold text-white">{review.weighted_score.toFixed(1)}</span>
      </div>
    </div>
  )
}

function ImageCard({
  entry,
  selected,
  onSelect,
}: {
  entry: LogEntry
  selected: boolean
  onSelect: () => void
}) {
  const verdictClass = VERDICT_COLORS[entry.council_review.verdict] || VERDICT_COLORS.PENDING_REVIEW

  return (
    <div
      onClick={onSelect}
      className={`rounded-xl border transition-all cursor-pointer ${
        selected
          ? 'border-purple-500 bg-zinc-900/80 ring-1 ring-purple-500/30'
          : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
      }`}
    >
      {/* Image preview */}
      <div className="relative aspect-video bg-zinc-950 rounded-t-xl overflow-hidden">
        {entry.output_path ? (
          <Image
            src={`/${entry.output_path}`}
            alt={entry.subject}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-600 text-sm">
            No preview
          </div>
        )}
        {/* Status badge */}
        <div className="absolute top-2 left-2">
          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${verdictClass}`}>
            {entry.council_review.verdict}
          </span>
        </div>
        {/* Gates count */}
        <div className="absolute top-2 right-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/60 text-white font-mono border border-zinc-700">
            {entry.gates_passed}/{entry.gates_total}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium text-zinc-200 line-clamp-2 leading-tight">
            {entry.subject.replace('[auto-logged] ', '')}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-zinc-500">
          <span>{entry.id}</span>
          <span className="text-zinc-700">|</span>
          <span>{formatDate(entry.timestamp)}</span>
          <span className="text-zinc-700">|</span>
          <span>${entry.cost_usd.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
            {entry.model_tier}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
            {entry.aspect_ratio}
          </span>
          {entry.style !== 'unknown' && (
            <span className="px-1.5 py-0.5 rounded bg-purple-400/10 text-purple-400 border border-purple-400/20">
              {entry.style.split(':')[0]}
            </span>
          )}
        </div>

        <GateBadges gates={entry.gates} />
      </div>
    </div>
  )
}

function DetailPanel({ entry }: { entry: LogEntry }) {
  return (
    <div className="space-y-4">
      {/* Large preview */}
      <div className="relative aspect-video bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800">
        {entry.output_path ? (
          <Image
            src={`/${entry.output_path}`}
            alt={entry.subject}
            fill
            className="object-contain"
            sizes="50vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-600">No preview</div>
        )}
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
          <span className="text-zinc-500 block">File Size</span>
          <span className="text-zinc-200">{formatBytes(entry.file_size_bytes)}</span>
        </div>
        <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
          <span className="text-zinc-500 block">Dimensions</span>
          <span className="text-zinc-200">{entry.dimensions || '—'}</span>
        </div>
        <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
          <span className="text-zinc-500 block">Model</span>
          <span className="text-zinc-200">{entry.model_tier} / {entry.thinking_level || '—'}</span>
        </div>
        <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
          <span className="text-zinc-500 block">Cost</span>
          <span className="text-zinc-200">${entry.cost_usd.toFixed(2)}</span>
        </div>
      </div>

      {/* Council Review */}
      <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
        <h4 className="text-xs font-medium text-zinc-400 mb-2">Council Review</h4>
        <CouncilScores review={entry.council_review} />
        {entry.council_review.vetoes.length > 0 && (
          <div className="mt-2 text-xs text-red-400">
            Vetoes: {entry.council_review.vetoes.join(', ')}
          </div>
        )}
      </div>

      {/* Gates */}
      <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
        <h4 className="text-xs font-medium text-zinc-400 mb-2">
          Quality Gates ({entry.gates_passed}/{entry.gates_total})
        </h4>
        <GateBadges gates={entry.gates} />
      </div>

      {/* Prompt */}
      <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
        <h4 className="text-xs font-medium text-zinc-400 mb-2">Prompt Excerpt</h4>
        <p className="text-xs text-zinc-300 leading-relaxed font-mono">{entry.prompt_excerpt}</p>
      </div>

      {/* Metaphor & Notes */}
      {entry.organizing_metaphor && (
        <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
          <h4 className="text-xs font-medium text-zinc-400 mb-1">Organizing Metaphor</h4>
          <p className="text-xs text-zinc-300">{entry.organizing_metaphor}</p>
        </div>
      )}
      {entry.notes && (
        <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
          <h4 className="text-xs font-medium text-zinc-400 mb-1">Notes</h4>
          <p className="text-xs text-zinc-300">{entry.notes}</p>
        </div>
      )}
    </div>
  )
}

export function ImageLabClient({ log }: { log: ImageLog }) {
  const [verdictFilter, setVerdictFilter] = useState<FilterVerdict>('all')
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [compareIds, setCompareIds] = useState<[string, string] | null>(null)

  const filtered = useMemo(() => {
    return log.entries
      .filter((e) => verdictFilter === 'all' || e.council_review.verdict === verdictFilter)
      .filter((e) => statusFilter === 'all' || e.status === statusFilter)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [log.entries, verdictFilter, statusFilter])

  const selected = filtered.find((e) => e.id === selectedId) || null

  // Stats
  const totalCost = log.entries.reduce((s, e) => s + e.cost_usd, 0)
  const avgGates = log.entries.length > 0
    ? (log.entries.reduce((s, e) => s + e.gates_passed, 0) / log.entries.length).toFixed(1)
    : '—'
  const approvedCount = log.entries.filter((e) => e.council_review.verdict === 'APPROVED').length
  const avgScore = log.entries.filter((e) => e.council_review.weighted_score > 0).length > 0
    ? (
        log.entries
          .filter((e) => e.council_review.weighted_score > 0)
          .reduce((s, e) => s + e.council_review.weighted_score, 0) /
        log.entries.filter((e) => e.council_review.weighted_score > 0).length
      ).toFixed(1)
    : '—'

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Image Lab</h1>
            <p className="text-xs text-zinc-500 mt-0.5">Visual Creation Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode('grid')}
              className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                viewMode === 'grid'
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                  : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-zinc-300'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('compare')}
              className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                viewMode === 'compare'
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                  : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-zinc-300'
              }`}
            >
              Compare
            </button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-b border-zinc-800 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">Images</span>
            <span className="text-sm font-bold text-white">{log.total_images}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">Total Cost</span>
            <span className="text-sm font-bold text-amber-400">${totalCost.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">Approved</span>
            <span className="text-sm font-bold text-emerald-400">{approvedCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">Avg Score</span>
            <span className="text-sm font-bold text-purple-400">{avgScore}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">Avg Gates</span>
            <span className="text-sm font-bold text-cyan-400">{avgGates}/8</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-zinc-800 px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Verdict</span>
          {(['all', 'APPROVED', 'NEEDS-REVISION', 'REJECTED', 'PENDING_REVIEW'] as FilterVerdict[]).map((v) => (
            <button
              key={v}
              onClick={() => setVerdictFilter(v)}
              className={`text-[10px] px-2 py-1 rounded border transition ${
                verdictFilter === v
                  ? 'bg-zinc-700 border-zinc-600 text-white'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-400'
              }`}
            >
              {v === 'all' ? 'All' : v.replace('_', ' ')}
            </button>
          ))}

          <span className="text-zinc-800">|</span>

          <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Status</span>
          {(['all', 'test', 'approved', 'batch', 'auto-logged'] as FilterStatus[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`text-[10px] px-2 py-1 rounded border transition ${
                statusFilter === s
                  ? 'bg-zinc-700 border-zinc-600 text-white'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-400'
              }`}
            >
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {viewMode === 'grid' ? (
          <div className="flex gap-6">
            {/* Grid */}
            <div className={`grid gap-4 ${selected ? 'w-1/2 grid-cols-1 lg:grid-cols-2' : 'w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
              {filtered.map((entry) => (
                <ImageCard
                  key={entry.id}
                  entry={entry}
                  selected={entry.id === selectedId}
                  onSelect={() => setSelectedId(entry.id === selectedId ? null : entry.id)}
                />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center py-16 text-zinc-600">
                  No images match current filters
                </div>
              )}
            </div>

            {/* Detail panel */}
            {selected && (
              <div className="w-1/2 sticky top-6 self-start">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-medium text-zinc-300">
                    {selected.subject.replace('[auto-logged] ', '')}
                  </h2>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="text-zinc-500 hover:text-zinc-300 text-xs"
                  >
                    Close
                  </button>
                </div>
                <DetailPanel entry={selected} />
              </div>
            )}
          </div>
        ) : (
          /* Compare mode */
          <div>
            <p className="text-xs text-zinc-500 mb-4">
              Select two images below to compare side-by-side
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
              {filtered.map((entry) => {
                const isInCompare = compareIds?.includes(entry.id)
                return (
                  <div
                    key={entry.id}
                    onClick={() => {
                      if (!compareIds) {
                        setCompareIds([entry.id, entry.id])
                      } else if (compareIds[0] === entry.id) {
                        setCompareIds(null)
                      } else {
                        setCompareIds([compareIds[0], entry.id])
                      }
                    }}
                    className={`rounded-lg border cursor-pointer transition p-1.5 ${
                      isInCompare
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="relative aspect-video bg-zinc-900 rounded overflow-hidden">
                      {entry.output_path && (
                        <Image
                          src={`/${entry.output_path}`}
                          alt={entry.subject}
                          fill
                          className="object-cover"
                          sizes="25vw"
                        />
                      )}
                    </div>
                    <p className="text-[10px] text-zinc-400 mt-1 truncate">{entry.id}: {entry.subject.replace('[auto-logged] ', '').slice(0, 40)}</p>
                  </div>
                )
              })}
            </div>

            {/* Side by side */}
            {compareIds && compareIds[0] !== compareIds[1] && (
              <div className="grid grid-cols-2 gap-6">
                {compareIds.map((id) => {
                  const entry = filtered.find((e) => e.id === id)
                  if (!entry) return null
                  return (
                    <div key={id}>
                      <h3 className="text-sm font-medium text-zinc-300 mb-2">
                        {entry.id}: {entry.subject.replace('[auto-logged] ', '')}
                      </h3>
                      <DetailPanel entry={entry} />
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
