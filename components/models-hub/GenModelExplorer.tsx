'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpDown, Search } from 'lucide-react'
import type { GenRow } from '@/lib/models-hub/registry'

type SortKey = 'name' | 'released' | 'category'

export function GenModelExplorer({ rows, lockCategory }: { rows: GenRow[]; lockCategory?: string }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>(lockCategory || 'all')
  const [license, setLicense] = useState<string>('all')
  const [sortKey, setSortKey] = useState<SortKey>('released')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const categories = useMemo(
    () => Array.from(new Set(rows.map((r) => r.category))),
    [rows]
  )

  const setSort = (k: SortKey) => {
    if (k === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(k)
      setSortDir(k === 'name' ? 'asc' : 'desc')
    }
  }

  const filtered = useMemo(() => {
    let out = rows.filter((r) => {
      if (query && !`${r.name} ${r.org} ${r.highlight}`.toLowerCase().includes(query.toLowerCase())) return false
      if (category !== 'all' && r.category !== category) return false
      if (license === 'open' && !/open/i.test(r.license)) return false
      if (license === 'proprietary' && /open/i.test(r.license)) return false
      return true
    })
    const dir = sortDir === 'asc' ? 1 : -1
    out = [...out].sort((a, b) => {
      switch (sortKey) {
        case 'name':
          return a.name.localeCompare(b.name) * dir
        case 'released':
          return (a.released || '').localeCompare(b.released || '') * dir
        case 'category':
          return a.category.localeCompare(b.category) * dir
        default:
          return 0
      }
    })
    return out
  }, [rows, query, category, license, sortKey, sortDir])

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search models…"
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-3">
          {!lockCategory ? (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm capitalize text-white/80 focus:border-white/30 focus:outline-none"
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          ) : null}
          <select
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/80 focus:border-white/30 focus:outline-none"
          >
            <option value="all">All licenses</option>
            <option value="open">Open weights</option>
            <option value="proprietary">Proprietary</option>
          </select>
        </div>
      </div>

      <p className="mb-3 text-xs text-white/40">{filtered.length} model{filtered.length === 1 ? '' : 's'}</p>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              <Th label="Model" onClick={() => setSort('name')} active={sortKey === 'name'} dir={sortDir} />
              {!lockCategory ? <Th label="Category" onClick={() => setSort('category')} active={sortKey === 'category'} dir={sortDir} /> : null}
              <Th label="Released" onClick={() => setSort('released')} active={sortKey === 'released'} dir={sortDir} />
              <th className="py-3 pr-4 text-xs font-medium uppercase tracking-wider text-white/40">Edge</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="group border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.02]">
                <td className="py-3 pl-4 pr-6">
                  <Link href={`/models/${r.category}/${r.id}`} className="flex items-center gap-2">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: r.orgAccent }} aria-hidden />
                    <span>
                      <span className="font-medium text-white">{r.name}</span>
                      <span className="ml-2 text-xs text-white/35">{r.org}</span>
                    </span>
                  </Link>
                </td>
                {!lockCategory ? (
                  <td className="py-3 pr-6">
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider"
                      style={{ backgroundColor: `${r.categoryAccent}1a`, color: r.categoryAccent }}
                    >
                      {r.categoryLabel}
                    </span>
                  </td>
                ) : null}
                <td className="py-3 pr-6 font-mono text-xs text-white/50">{r.released || '—'}</td>
                <td className="py-3 pr-4 text-xs text-white/55">{r.highlight}</td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={lockCategory ? 3 : 4} className="py-10 text-center text-sm text-white/30">
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

function Th({ label, onClick, active, dir }: { label: string; onClick: () => void; active: boolean; dir: 'asc' | 'desc' }) {
  return (
    <th className="py-3 pl-4 pr-6 font-medium">
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center gap-1 text-xs uppercase tracking-wider transition-colors ${active ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
      >
        {label}
        <ArrowUpDown className="h-3 w-3" />
        {active ? <span className="text-[9px]">{dir === 'asc' ? '↑' : '↓'}</span> : null}
      </button>
    </th>
  )
}
