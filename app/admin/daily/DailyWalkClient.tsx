'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

type Verdict = 'approve' | 'flag' | null

interface Commit {
  repo: string
  hash: string
  date: string
  author: string
  subject: string
  raw: string
  files: number
  additions: number
  deletions: number
}

interface EnrichedSystem {
  slug: string
  name: string
  summary: string | null
  publicUrl: string | null
  color: string
  tier: string | null
  status: string | null
  commitCount: number
  totalFiles: number
  repos: string[]
  commits: Commit[]
  lastBlessing: { verdict: string; ratifiedAt: string; reason?: string | null } | null
}

interface Props {
  window: { since: string; until: string }
  generatedAt: string | null
  totals: { commits: number; systems: number; repos: number }
  repoStatus: { name: string; status: string; commits?: number }[]
  systems: EnrichedSystem[]
}

const colorMap: Record<string, { dot: string; border: string; bg: string }> = {
  cyan:    { dot: 'bg-cyan-400',    border: 'border-cyan-400/30',    bg: 'bg-cyan-400/5' },
  violet:  { dot: 'bg-violet-400',  border: 'border-violet-400/30',  bg: 'bg-violet-400/5' },
  amber:   { dot: 'bg-amber-400',   border: 'border-amber-400/30',   bg: 'bg-amber-400/5' },
  emerald: { dot: 'bg-emerald-400', border: 'border-emerald-400/30', bg: 'bg-emerald-400/5' },
  rose:    { dot: 'bg-rose-400',    border: 'border-rose-400/30',    bg: 'bg-rose-400/5' },
  slate:   { dot: 'bg-slate-400',   border: 'border-white/10',       bg: 'bg-white/[0.02]' },
  sky:     { dot: 'bg-sky-400',     border: 'border-sky-400/30',     bg: 'bg-sky-400/5' },
  fuchsia: { dot: 'bg-fuchsia-400', border: 'border-fuchsia-400/30', bg: 'bg-fuchsia-400/5' },
  lime:    { dot: 'bg-lime-400',    border: 'border-lime-400/30',    bg: 'bg-lime-400/5' },
  orange:  { dot: 'bg-orange-400',  border: 'border-orange-400/30',  bg: 'bg-orange-400/5' },
}

const STORAGE_KEY = 'frankx.daily-walk.verdicts.v1'

interface VerdictRecord {
  verdict: Verdict
  reason?: string
  walkDate: string
}

export default function DailyWalkClient({ window: w, generatedAt, totals, repoStatus, systems }: Props) {
  const walkDate = w.until !== '—' ? w.until : new Date().toISOString().slice(0, 10)
  const storageKey = `${STORAGE_KEY}.${walkDate}`

  // verdicts: { [slug]: VerdictRecord }
  const [verdicts, setVerdicts] = useState<Record<string, VerdictRecord>>({})
  const [hydrated, setHydrated] = useState(false)
  const [saving, setSaving] = useState(false)
  const [savedCount, setSavedCount] = useState<number | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) setVerdicts(JSON.parse(raw))
    } catch {
      /* ok */
    }
    setHydrated(true)
  }, [storageKey])

  // Persist on every change
  useEffect(() => {
    if (!hydrated) return
    try { localStorage.setItem(storageKey, JSON.stringify(verdicts)) } catch { /* ok */ }
  }, [verdicts, storageKey, hydrated])

  function setVerdict(slug: string, verdict: Verdict, reason?: string) {
    setVerdicts((prev) => {
      if (!verdict) {
        const next = { ...prev }
        delete next[slug]
        return next
      }
      return { ...prev, [slug]: { verdict, reason, walkDate } }
    })
  }

  const stats = useMemo(() => {
    const approved = Object.values(verdicts).filter((v) => v.verdict === 'approve').length
    const flagged = Object.values(verdicts).filter((v) => v.verdict === 'flag').length
    const pending = systems.length - approved - flagged
    return { approved, flagged, pending }
  }, [verdicts, systems.length])

  async function saveTheDay() {
    if (Object.keys(verdicts).length === 0) return
    setSaving(true); setSaveError(null)
    try {
      const records = Object.entries(verdicts).map(([slug, r]) => ({
        slug,
        verdict: r.verdict,
        reason: r.reason || undefined,
        source: 'daily-walk',
      }))
      const res = await fetch('/api/blessings', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(records),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const j = await res.json()
      setSavedCount(j.written ?? records.length)
    } catch (e) {
      setSaveError((e as Error).message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white pb-32">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0b]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a0a0b]/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-amber-400/70">The Daily Walk</p>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight mt-0.5">{walkDate}</h1>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/50 font-mono">
            <span className="text-emerald-400">{stats.approved}✓</span>
            <span className="text-amber-400">{stats.flagged}⚠</span>
            <span className="text-white/40">{stats.pending}·</span>
          </div>
        </div>
      </header>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <p className="text-white/60 text-sm leading-relaxed">
          Walk through what changed yesterday across your operating systems. Approve what is whole; flag what needs your attention. Saves to{' '}
          <code className="text-amber-300/80">data/blessings.jsonl</code> — read by every future AI session.
        </p>
        {generatedAt && (
          <p className="text-[11px] text-white/30 mt-3 font-mono">
            Window: {w.since} → {w.until} · {totals.commits} commits · {totals.systems} systems · {totals.repos} repos · last roll {generatedAt.slice(0, 16).replace('T', ' ')}Z
          </p>
        )}
      </section>

      {/* No data state */}
      {systems.length === 0 && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-8 text-center">
            <p className="text-white/60 mb-4">Nothing to walk through yet.</p>
            <p className="text-sm text-white/40">Run <code className="text-amber-300/80">node scripts/chronicle-roll-day.mjs</code> to mine yesterday&apos;s git activity, then refresh.</p>
          </div>
        </section>
      )}

      {/* Cards */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 space-y-4">
        {systems.map((s) => {
          const v = verdicts[s.slug]?.verdict ?? null
          const c = colorMap[s.color] ?? colorMap.slate
          return (
            <article
              key={s.slug}
              className={`rounded-xl border ${v === 'approve' ? 'border-emerald-400/40 bg-emerald-400/5' : v === 'flag' ? 'border-amber-400/40 bg-amber-400/5' : `${c.border} ${c.bg}`} transition-colors`}
            >
              {/* Card header */}
              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className={`mt-1.5 w-2 h-2 rounded-full ${c.dot} flex-shrink-0`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h2 className="text-lg font-bold tracking-tight">{s.name}</h2>
                      {s.publicUrl && (
                        <Link
                          href={s.publicUrl}
                          target="_blank"
                          rel="noopener"
                          className="text-[11px] text-white/40 hover:text-white/70 font-mono truncate"
                        >
                          {s.publicUrl.replace(/^https?:\/\//, '')} ↗
                        </Link>
                      )}
                    </div>
                    {s.summary && <p className="text-sm text-white/60 mt-1 leading-relaxed">{s.summary}</p>}
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-3 mt-4 text-[11px] text-white/40 font-mono">
                  <span className="text-amber-300">{s.commitCount} commits</span>
                  <span>·</span>
                  <span>{s.totalFiles} files touched</span>
                  <span>·</span>
                  <span>{s.repos.join(' · ')}</span>
                </div>

                {/* Last blessing hint */}
                {s.lastBlessing && (
                  <p className="text-[11px] text-white/30 mt-2 italic">
                    Last verdict: <span className={s.lastBlessing.verdict === 'approve' ? 'text-emerald-400/70' : 'text-amber-400/70'}>{s.lastBlessing.verdict}</span> on {s.lastBlessing.ratifiedAt.slice(0, 10)}
                  </p>
                )}
              </div>

              {/* Commit list */}
              <details className="border-t border-white/5">
                <summary className="px-4 sm:px-5 py-3 text-[11px] text-white/40 hover:text-white/70 cursor-pointer list-none flex items-center justify-between">
                  <span>{s.commits.length} commit{s.commits.length === 1 ? '' : 's'} →</span>
                  <span className="text-white/30 group-open:rotate-90 transition-transform">▸</span>
                </summary>
                <ul className="px-4 sm:px-5 pb-4 space-y-1.5 text-xs font-mono">
                  {s.commits.slice(0, 10).map((c) => (
                    <li key={`${c.repo}-${c.hash}`} className="text-white/60 leading-relaxed">
                      <span className="text-amber-400/40">{c.hash.slice(0, 7)}</span>{' '}
                      <span className="text-white/40">[{c.repo.replace('frankx.ai-vercel-website', 'prod')}]</span>{' '}
                      <span className="text-white/80">{c.subject.slice(0, 80)}</span>
                    </li>
                  ))}
                  {s.commits.length > 10 && (
                    <li className="text-white/30 text-[11px] italic">… {s.commits.length - 10} more</li>
                  )}
                </ul>
              </details>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-px bg-white/5 border-t border-white/5 rounded-b-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setVerdict(s.slug, v === 'approve' ? null : 'approve')}
                  className={`py-4 text-sm font-semibold tracking-tight transition-colors ${
                    v === 'approve'
                      ? 'bg-emerald-400/20 text-emerald-300'
                      : 'bg-[#0a0a0b] text-white/70 hover:bg-emerald-400/5 hover:text-emerald-300'
                  }`}
                >
                  ✓ Approve {v === 'approve' && <span className="text-emerald-400/60 text-xs">(tap to undo)</span>}
                </button>
                <button
                  type="button"
                  onClick={() => setVerdict(s.slug, v === 'flag' ? null : 'flag')}
                  className={`py-4 text-sm font-semibold tracking-tight transition-colors ${
                    v === 'flag'
                      ? 'bg-amber-400/20 text-amber-300'
                      : 'bg-[#0a0a0b] text-white/70 hover:bg-amber-400/5 hover:text-amber-300'
                  }`}
                >
                  ⚠ Flag {v === 'flag' && <span className="text-amber-400/60 text-xs">(tap to undo)</span>}
                </button>
              </div>
            </article>
          )
        })}
      </section>

      {/* Repo status footer */}
      {repoStatus.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-12">
          <details className="border border-white/5 rounded-xl">
            <summary className="px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-white/40 cursor-pointer">
              Repo coverage
            </summary>
            <ul className="px-4 pb-4 space-y-1 text-xs font-mono text-white/50">
              {repoStatus.map((r) => (
                <li key={r.name}>
                  <span className={r.status === 'ok' ? 'text-emerald-400/60' : 'text-rose-400/60'}>{r.status}</span>{' '}
                  {r.name} {r.commits != null && `(${r.commits})`}
                </li>
              ))}
            </ul>
          </details>
        </section>
      )}

      {/* Sticky save bar */}
      {hydrated && Object.keys(verdicts).length > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-[#0a0a0b]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a0a0b]/80">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
            <div className="text-xs text-white/60">
              <span className="text-emerald-400 font-bold">{stats.approved}</span> approved ·{' '}
              <span className="text-amber-400 font-bold">{stats.flagged}</span> flagged ·{' '}
              <span className="text-white/40">{Object.keys(verdicts).length}</span> total
            </div>
            <button
              type="button"
              onClick={saveTheDay}
              disabled={saving}
              className="px-5 py-3 rounded-lg bg-amber-400 text-black font-bold text-sm tracking-tight hover:bg-amber-300 disabled:opacity-50 transition-colors"
            >
              {saving ? 'Saving…' : savedCount != null ? `Saved ${savedCount} ✓` : 'Save the day →'}
            </button>
          </div>
          {saveError && (
            <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-3 text-xs text-rose-400">Save failed: {saveError}. State preserved locally.</div>
          )}
        </div>
      )}
    </div>
  )
}
