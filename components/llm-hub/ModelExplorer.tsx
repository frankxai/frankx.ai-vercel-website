'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpDown, Check, Search, Zap } from 'lucide-react'
import { CAPABILITIES, CAPABILITY_ORDER, type Capability } from '@/lib/llm-hub/capabilities'

export interface ModelRow {
  id: string
  name: string
  org: string
  orgSlug: string
  accent: string
  released: string
  status: string
  contextTokens: number | null
  input: number | null
  output: number | null
  live: boolean
  modalities: string[]
  capabilities: Capability[]
  tagline?: string
}

type SortKey = 'name' | 'released' | 'context' | 'input' | 'output'

function fmtCtx(t: number | null): string {
  if (!t) return '—'
  if (t >= 1_000_000) return `${t / 1_000_000 % 1 === 0 ? t / 1_000_000 : (t / 1_000_000).toFixed(1)}M`
  if (t >= 1_000) return `${Math.round(t / 1_000)}K`
  return `${t}`
}

function fmtPrice(p: number | null): string {
  if (p === null) return '—'
  if (p === 0) return 'Open'
  return `$${p.toFixed(2)}`
}

export function ModelExplorer({ rows }: { rows: ModelRow[] }) {
  const [query, setQuery] = useState('')
  const [activeCaps, setActiveCaps] = useState<Set<Capability>>(new Set())
  const [openOnly, setOpenOnly] = useState(false)
  const [sortKey, setSortKey] = useState<SortKey>('released')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const providers = useMemo(
    () => Array.from(new Set(rows.map((r) => r.org))).sort(),
    [rows]
  )
  const [activeProvider, setActiveProvider] = useState<string>('all')

  const toggleCap = (c: Capability) => {
    setActiveCaps((prev) => {
      const next = new Set(prev)
      next.has(c) ? next.delete(c) : next.add(c)
      return next
    })
  }

  const setSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir(key === 'name' ? 'asc' : 'desc')
    }
  }

  const filtered = useMemo(() => {
    let out = rows.filter((r) => {
      if (query && !`${r.name} ${r.org}`.toLowerCase().includes(query.toLowerCase())) return false
      if (activeProvider !== 'all' && r.org !== activeProvider) return false
      if (openOnly && r.input !== 0) return false
      if (activeCaps.size > 0 && !Array.from(activeCaps).every((c) => r.capabilities.includes(c))) return false
      return true
    })

    const dir = sortDir === 'asc' ? 1 : -1
    out = [...out].sort((a, b) => {
      switch (sortKey) {
        case 'name':
          return a.name.localeCompare(b.name) * dir
        case 'released':
          return (a.released || '').localeCompare(b.released || '') * dir
        case 'context':
          return ((a.contextTokens ?? 0) - (b.contextTokens ?? 0)) * dir
        case 'input':
          return ((a.input ?? Infinity) - (b.input ?? Infinity)) * dir
        case 'output':
          return ((a.output ?? Infinity) - (b.output ?? Infinity)) * dir
        default:
          return 0
      }
    })
    return out
  }, [rows, query, activeProvider, openOnly, activeCaps, sortKey, sortDir])

  const anyLive = rows.some((r) => r.live)

  return (
    <div>
      {/* Controls */}
      <div className="mb-5 flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-xs flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search models or providers…"
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              value={activeProvider}
              onChange={(e) => setActiveProvider(e.target.value)}
              className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/80 focus:border-white/30 focus:outline-none"
            >
              <option value="all">All providers</option>
              {providers.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setOpenOnly((v) => !v)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors ${
                openOnly
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                  : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25'
              }`}
            >
              {openOnly ? <Check className="h-3.5 w-3.5" /> : null}
              Open weights
            </button>
          </div>
        </div>

        {/* Capability chips */}
        <div className="flex flex-wrap gap-1.5">
          {CAPABILITY_ORDER.map((c) => {
            const meta = CAPABILITIES[c]
            const active = activeCaps.has(c)
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggleCap(c)}
                className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-wider transition-colors"
                style={{
                  color: active ? meta.accent : 'rgba(255,255,255,0.5)',
                  borderColor: active ? `${meta.accent}66` : 'rgba(255,255,255,0.1)',
                  backgroundColor: active ? `${meta.accent}1a` : 'transparent',
                }}
              >
                {meta.short}
              </button>
            )
          })}
        </div>
      </div>

      {/* Result count */}
      <p className="mb-3 text-xs text-white/40">
        {filtered.length} model{filtered.length === 1 ? '' : 's'}
        {anyLive ? (
          <span className="ml-2 inline-flex items-center gap-1 text-emerald-400/70">
            <Zap className="h-3 w-3" /> live pricing via OpenRouter
          </span>
        ) : null}
      </p>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              <Th label="Model" onClick={() => setSort('name')} active={sortKey === 'name'} dir={sortDir} />
              <Th label="Released" onClick={() => setSort('released')} active={sortKey === 'released'} dir={sortDir} />
              <Th label="Context" onClick={() => setSort('context')} active={sortKey === 'context'} dir={sortDir} className="text-right" />
              <Th label="Input /1M" onClick={() => setSort('input')} active={sortKey === 'input'} dir={sortDir} className="text-right" />
              <Th label="Output /1M" onClick={() => setSort('output')} active={sortKey === 'output'} dir={sortDir} className="text-right" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="group border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.02]">
                <td className="py-3 pl-4 pr-6">
                  <Link href={`/llm-hub/${r.id}`} className="flex items-center gap-2">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: r.accent }} aria-hidden />
                    <span>
                      <span className="font-medium text-white transition-colors group-hover:text-white">{r.name}</span>
                      <span className="ml-2 text-xs text-white/35">{r.org}</span>
                    </span>
                  </Link>
                </td>
                <td className="py-3 pr-6 font-mono text-xs text-white/50">{r.released || '—'}</td>
                <td className="py-3 pr-6 text-right font-mono text-white/70">{fmtCtx(r.contextTokens)}</td>
                <td className="py-3 pr-6 text-right font-mono text-white/70">
                  <span className="inline-flex items-center gap-1">
                    {r.live ? <Zap className="h-3 w-3 text-emerald-400/70" aria-label="live" /> : null}
                    {fmtPrice(r.input)}
                  </span>
                </td>
                <td className="py-3 pr-4 text-right font-mono text-white/70">{fmtPrice(r.output)}</td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-sm text-white/30">
                  No models match those filters.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Th({
  label,
  onClick,
  active,
  dir,
  className = '',
}: {
  label: string
  onClick: () => void
  active: boolean
  dir: 'asc' | 'desc'
  className?: string
}) {
  return (
    <th className={`py-3 pl-4 pr-6 font-medium ${className}`}>
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center gap-1 text-xs uppercase tracking-wider transition-colors ${
          active ? 'text-white' : 'text-white/40 hover:text-white/70'
        }`}
      >
        {label}
        <ArrowUpDown className="h-3 w-3" />
        {active ? <span className="text-[9px]">{dir === 'asc' ? '↑' : '↓'}</span> : null}
      </button>
    </th>
  )
}
