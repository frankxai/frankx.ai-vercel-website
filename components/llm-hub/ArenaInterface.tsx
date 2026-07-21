'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Award, ChevronDown, Eye, Zap } from 'lucide-react'
import type { ModelRow } from './ModelExplorer'
import { COMPARISONS } from '@/lib/llm-hub/comparisons'

interface ArenaProps {
  rows: ModelRow[]
  initialLeft?: string
  initialRight?: string
}

interface SpecRow {
  label: string
  format: (r: ModelRow) => { display: string; sortValue: number | null }
  higherIsBetter?: boolean
  lowerIsBetter?: boolean
}

const SPEC_ROWS: SpecRow[] = [
  {
    label: 'Released',
    format: (r) => ({ display: r.released || '—', sortValue: r.released ? Date.parse(r.released) : null }),
    higherIsBetter: true,
  },
  {
    label: 'Context window',
    format: (r) => ({
      display: r.contextTokens
        ? r.contextTokens >= 1_000_000
          ? `${(r.contextTokens / 1_000_000).toFixed(r.contextTokens % 1_000_000 === 0 ? 0 : 1)}M`
          : `${Math.round(r.contextTokens / 1000)}K`
        : '—',
      sortValue: r.contextTokens,
    }),
    higherIsBetter: true,
  },
  {
    label: 'Input / 1M tokens',
    format: (r) => ({
      display: r.input === null ? '—' : r.input === 0 ? 'Open' : `$${r.input.toFixed(2)}`,
      sortValue: r.input,
    }),
    lowerIsBetter: true,
  },
  {
    label: 'Output / 1M tokens',
    format: (r) => ({
      display: r.output === null ? '—' : r.output === 0 ? 'Open' : `$${r.output.toFixed(2)}`,
      sortValue: r.output,
    }),
    lowerIsBetter: true,
  },
  {
    label: 'Provider',
    format: (r) => ({ display: r.org, sortValue: null }),
  },
  {
    label: 'Status',
    format: (r) => ({ display: r.status, sortValue: null }),
  },
  {
    label: 'Live pricing',
    format: (r) => ({ display: r.live ? 'OpenRouter' : 'static', sortValue: null }),
  },
]

export function ArenaInterface({ rows, initialLeft, initialRight }: ArenaProps) {
  const sortedByDate = useMemo(
    () => [...rows].sort((a, b) => (b.released || '').localeCompare(a.released || '')),
    [rows]
  )
  const [leftId, setLeftId] = useState(initialLeft || sortedByDate[0]?.id || rows[0]?.id)
  const [rightId, setRightId] = useState(initialRight || sortedByDate[1]?.id || rows[1]?.id)

  const left = rows.find((r) => r.id === leftId)
  const right = rows.find((r) => r.id === rightId)

  const winnerForRow = useMemo(() => {
    return (s: SpecRow): 'left' | 'right' | 'tie' | null => {
      if (!left || !right) return null
      if (!s.higherIsBetter && !s.lowerIsBetter) return null
      const lv = s.format(left).sortValue
      const rv = s.format(right).sortValue
      if (lv === null || rv === null) return null
      if (lv === rv) return 'tie'
      if (s.higherIsBetter) return lv > rv ? 'left' : 'right'
      return lv < rv ? 'left' : 'right'
    }
  }, [left, right])

  const leftWins = useMemo(() => SPEC_ROWS.filter((s) => winnerForRow(s) === 'left').length, [winnerForRow])
  const rightWins = useMemo(() => SPEC_ROWS.filter((s) => winnerForRow(s) === 'right').length, [winnerForRow])
  const totalRated = useMemo(() => SPEC_ROWS.filter((s) => winnerForRow(s) !== null).length, [winnerForRow])

  const curatedSlug = useMemo(() => {
    if (!left || !right) return null
    const fwd = `${left.id}-vs-${right.id}`
    const rev = `${right.id}-vs-${left.id}`
    return COMPARISONS.find((c) => c.slug === fwd || c.slug === rev)?.slug ?? null
  }, [left, right])

  if (!left || !right) {
    return <p className="text-sm text-white/40">Pick two models to compare.</p>
  }

  return (
    <div className="space-y-8">
      {/* Picker bar */}
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <ModelPicker rows={sortedByDate} value={leftId} onChange={setLeftId} accentColor={left.accent} side="left" />
        <div className="hidden text-center text-xs font-mono uppercase tracking-wider text-white/30 md:block">vs</div>
        <ModelPicker rows={sortedByDate} value={rightId} onChange={setRightId} accentColor={right.accent} side="right" />
      </div>

      {/* Tagline strip */}
      {(left.tagline || right.tagline) ? (
        <div className="grid gap-4 md:grid-cols-2">
          <ContestantCard row={left} side="left" wins={leftWins} totalRated={totalRated} />
          <ContestantCard row={right} side="right" wins={rightWins} totalRated={totalRated} />
        </div>
      ) : null}

      {/* Spec table */}
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              <th className="py-3 pl-4 pr-6 text-left text-xs font-medium uppercase tracking-wider text-white/40">Spec</th>
              <th className="py-3 pr-6 text-left font-semibold" style={{ color: left.accent }}>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: left.accent }} aria-hidden />
                  {left.name}
                </span>
              </th>
              <th className="py-3 pr-4 text-left font-semibold" style={{ color: right.accent }}>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: right.accent }} aria-hidden />
                  {right.name}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {SPEC_ROWS.map((s) => {
              const winner = winnerForRow(s)
              const lf = s.format(left)
              const rf = s.format(right)
              return (
                <tr key={s.label} className="border-b border-white/5 last:border-0">
                  <td className="py-3 pl-4 pr-6 text-xs uppercase tracking-wider text-white/40">{s.label}</td>
                  <Cell value={lf.display} highlight={winner === 'left'} accent={left.accent} live={s.label.startsWith('Input') || s.label.startsWith('Output') ? left.live : false} />
                  <Cell value={rf.display} highlight={winner === 'right'} accent={right.accent} live={s.label.startsWith('Input') || s.label.startsWith('Output') ? right.live : false} />
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Capability deltas */}
      <CapabilityCompare left={left} right={right} />

      {/* Verdict + CTAs */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/60">
          <Award className="h-4 w-4 text-emerald-400" /> Quick verdict
        </h3>
        <p className="text-sm leading-relaxed text-white/75">
          On the comparable specs, <span style={{ color: left.accent }} className="font-semibold">{left.name}</span> wins {leftWins} of {totalRated} rated dimensions; <span style={{ color: right.accent }} className="font-semibold">{right.name}</span> wins {rightWins}.{' '}
          Different tiers and different jobs — open each model page for the full verdict, or check the curated head-to-head if one exists.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={`/llm-hub/${left.id}`} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-white/30 hover:text-white">
            {left.name} page <ArrowRight className="h-3 w-3" />
          </Link>
          <Link href={`/llm-hub/${right.id}`} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-white/30 hover:text-white">
            {right.name} page <ArrowRight className="h-3 w-3" />
          </Link>
          {curatedSlug ? (
            <Link href={`/llm-hub/compare/${curatedSlug}`} className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300 transition-colors hover:border-emerald-500/50">
              Curated deep comparison
            </Link>
          ) : null}
        </div>
      </div>

      {/* Swap CTA */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            const tmp = leftId
            setLeftId(rightId)
            setRightId(tmp)
          }}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/60 transition-colors hover:border-white/30 hover:text-white"
        >
          <ArrowLeft className="h-3 w-3" /> Swap sides <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}

function ModelPicker({
  rows,
  value,
  onChange,
  accentColor,
  side,
}: {
  rows: ModelRow[]
  value: string
  onChange: (id: string) => void
  accentColor: string
  side: 'left' | 'right'
}) {
  const grouped = useMemo(() => {
    const byOrg = new Map<string, ModelRow[]>()
    rows.forEach((r) => {
      const list = byOrg.get(r.org) || []
      list.push(r)
      byOrg.set(r.org, list)
    })
    return Array.from(byOrg.entries()).sort((a, b) => a[0].localeCompare(b[0]))
  }, [rows])

  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-mono uppercase tracking-wider" style={{ color: accentColor }}>
        Contestant {side === 'left' ? 'A' : 'B'}
      </span>
      <span className="relative block">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-white/15 bg-white/[0.03] py-3 pl-4 pr-10 text-base font-semibold text-white focus:border-white/40 focus:outline-none"
          style={{ borderTopColor: accentColor, borderTopWidth: 2 }}
        >
          {grouped.map(([org, models]) => (
            <optgroup key={org} label={org}>
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                  {m.status === 'preview' ? ' · preview' : m.status === 'legacy' ? ' · legacy' : ''}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
      </span>
    </label>
  )
}

function ContestantCard({ row, side, wins, totalRated }: { row: ModelRow; side: 'left' | 'right'; wins: number; totalRated: number }) {
  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
      style={{ borderTopColor: `${row.accent}aa`, borderTopWidth: 2 }}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: row.accent }}>
          {side === 'left' ? 'Contestant A' : 'Contestant B'}
        </p>
        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/60">
          {wins} / {totalRated} wins
        </span>
      </div>
      <p className="mb-1 text-lg font-bold text-white">{row.name}</p>
      <p className="text-xs text-white/45">{row.org}</p>
      {row.tagline ? <p className="mt-3 text-sm leading-relaxed text-white/65">{row.tagline}</p> : null}
    </div>
  )
}

function Cell({ value, highlight, accent, live }: { value: string; highlight: boolean; accent: string; live: boolean }) {
  return (
    <td className="py-3 pr-6">
      <span
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-xs"
        style={
          highlight
            ? { backgroundColor: `${accent}22`, color: accent, fontWeight: 600 }
            : { color: 'rgba(255,255,255,0.7)' }
        }
      >
        {live ? <Zap className="h-3 w-3 opacity-70" /> : null}
        {value}
        {highlight ? <Award className="h-3 w-3 opacity-80" /> : null}
      </span>
    </td>
  )
}

function CapabilityCompare({ left, right }: { left: ModelRow; right: ModelRow }) {
  const leftCaps = new Set(left.capabilities)
  const rightCaps = new Set(right.capabilities)
  const all = Array.from(new Set([...left.capabilities, ...right.capabilities])).sort()
  if (all.length === 0) return null
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/60">
        <Eye className="h-4 w-4 text-cyan-400" /> Capability overlap
      </h3>
      <div className="space-y-2">
        {all.map((c) => {
          const inLeft = leftCaps.has(c)
          const inRight = rightCaps.has(c)
          return (
            <div key={c} className="flex items-center gap-3 text-xs">
              <span className="w-32 text-white/55 capitalize">{c.replace(/-/g, ' ')}</span>
              <span
                className="flex h-6 w-20 items-center justify-center rounded-md font-mono"
                style={{
                  backgroundColor: inLeft ? `${left.accent}25` : 'rgba(255,255,255,0.04)',
                  color: inLeft ? left.accent : 'rgba(255,255,255,0.25)',
                }}
              >
                {inLeft ? '●' : '—'}
              </span>
              <span
                className="flex h-6 w-20 items-center justify-center rounded-md font-mono"
                style={{
                  backgroundColor: inRight ? `${right.accent}25` : 'rgba(255,255,255,0.04)',
                  color: inRight ? right.accent : 'rgba(255,255,255,0.25)',
                }}
              >
                {inRight ? '●' : '—'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
