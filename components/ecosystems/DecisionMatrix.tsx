'use client'

import { useState } from 'react'
import type { DecisionMatrix as MatrixType, Candidate } from '@/data/ecosystems'

interface DecisionMatrixProps {
  matrix: MatrixType
}

export default function DecisionMatrix({ matrix }: DecisionMatrixProps) {
  const [sortKey, setSortKey] = useState<keyof Candidate>('total')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const handleSort = (key: keyof Candidate) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('desc')
    }
  }

  const sortedCandidates = [...matrix.candidates].sort((a, b) => {
    const aValue = a[sortKey]
    const bValue = b[sortKey]

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    }
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue)
    }
    return 0
  })

  // Format headers for criteria
  const criteriaList: Array<{ key: keyof Candidate; label: string; weight: number }> = [
    { key: 'ai_deeptech_fit', label: 'AI/Tech', weight: 3 },
    { key: 'music_creative_fit', label: 'Music', weight: 2 },
    { key: 'cost_efficiency', label: 'Cost', weight: 2 },
    { key: 'free_low_commitment', label: 'Commit', weight: 2 },
    { key: 'events_density', label: 'Events', weight: 2 },
    { key: 'global_travel_value', label: 'Global', weight: 1 },
    { key: 'enterprise_credibility', label: 'Enterprise', weight: 1 },
  ]

  return (
    <div className="space-y-6">
      {/* Description header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Plate VI</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white mt-1">The Weighted Decision Matrix</h2>
          <p className="text-zinc-400 mt-2 text-sm max-w-2xl leading-relaxed">
            Seven criteria scored 0 to 5 based on personal judgment. Max possible score: {matrix.max_score}. Ranks workspaces according to their fit for key motions.
          </p>
        </div>
      </div>

      {/* Criteria Legend */}
      <div className="bg-[#101012] border border-white/[0.08] rounded-xl p-4 text-xs text-zinc-400 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {criteriaList.map((crit) => (
          <div key={crit.label} className="border-l border-white/10 pl-3">
            <span className="text-zinc-500 block">{crit.label}</span>
            <span className="font-semibold text-zinc-300 font-mono">Weight: &times;{crit.weight}</span>
          </div>
        ))}
      </div>

      {/* Table container */}
      <div className="overflow-x-auto border border-white/[0.08] rounded-xl bg-[#101012]">
        <table className="w-full border-collapse text-left text-sm text-zinc-300">
          <thead>
            <tr className="border-b border-white/[0.08] bg-zinc-900/50">
              <th 
                className="py-3.5 px-4 font-semibold text-white cursor-pointer select-none hover:text-emerald-400"
                onClick={() => handleSort('name')}
              >
                Space {sortKey === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              {criteriaList.map((crit) => (
                <th 
                  key={crit.label}
                  className="py-3.5 px-4 text-center font-semibold text-white cursor-pointer select-none hover:text-emerald-400"
                  onClick={() => handleSort(crit.key)}
                >
                  <span className="block text-xs text-zinc-500 font-medium">x{crit.weight}</span>
                  {crit.label} {sortKey === crit.key ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
              ))}
              <th 
                className="py-3.5 px-4 text-right font-bold text-white cursor-pointer select-none hover:text-emerald-400"
                onClick={() => handleSort('total')}
              >
                Total /65 {sortKey === 'total' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {sortedCandidates.map((c) => {
              const isWinner = c.tier === 'pay_now_matrix_winner'
              return (
                <tr 
                  key={c.name} 
                  className={`hover:bg-zinc-800/10 transition-colors ${
                    isWinner ? 'bg-emerald-500/[0.02]' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 font-medium text-white">
                    {c.name}
                    {isWinner && (
                      <span className="ml-2 inline-block text-[9px] uppercase tracking-wider font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">
                        Winner
                      </span>
                    )}
                    {c.note && (
                      <span className="block text-xs text-zinc-500 font-normal mt-0.5 max-w-[20rem]">
                        {c.note}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono text-zinc-400">{c.ai_deeptech_fit}</td>
                  <td className="py-3.5 px-4 text-center font-mono text-zinc-400">{c.music_creative_fit}</td>
                  <td className="py-3.5 px-4 text-center font-mono text-zinc-400">{c.cost_efficiency}</td>
                  <td className="py-3.5 px-4 text-center font-mono text-zinc-400">{c.free_low_commitment}</td>
                  <td className="py-3.5 px-4 text-center font-mono text-zinc-400">{c.events_density}</td>
                  <td className="py-3.5 px-4 text-center font-mono text-zinc-400">{c.global_travel_value}</td>
                  <td className="py-3.5 px-4 text-center font-mono text-zinc-400">{c.enterprise_credibility}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-semibold text-emerald-400">{c.total}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Restraint and specific alignment callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
        <div className="border border-white/[0.08] bg-[#101012] rounded-xl p-5 border-l-4 border-l-cyan-500">
          <h4 className="text-md font-serif text-white font-semibold">Why Soho House isn't "5th place"</h4>
          <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
            Raw score ranks Lab42 above Soho House. This is correct for the AI-flywheel weighting, but misleading if read as a single choice. <strong>Soho House scores 5/5 on the two axes nothing else can touch: Music/creative network, and Global/travel value.</strong> It isn't competing with Lab42 for the same job; it's the only candidate doing its job at all.
          </p>
        </div>
        <div className="border border-white/[0.08] bg-[#101012] rounded-xl p-5 border-l-4 border-l-emerald-500">
          <h4 className="text-md font-serif text-white font-semibold">The tiered answer — buy what is irreplaceable</h4>
          <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
            <strong>Tier 1 — free, start immediately:</strong> Startup Village + OBA Oosterdok. Zero cost default.<br />
            <strong>Tier 2 — pay now, matrix-winner:</strong> Lab42 Flex Desk, €169/mo. Cancel short-notice.<br />
            <strong>Tier 3 — pay now, non-substitutable:</strong> Soho House Every House (global social graph).<br />
            <strong>Tier 4 — pay later, on trigger:</strong> Lab42 Private Office once a team exists.
          </p>
        </div>
      </div>
    </div>
  )
}
