'use client'

import { useState } from 'react'

interface Stat {
  path: string
  count: number
  lastHit: string
  topMatch?: string
  topMatchTitle?: string
  topConfidence: number
  existingAlias?: string
}

export default function RadarRow({ stat }: { stat: Stat }) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [target, setTarget] = useState(stat.existingAlias ?? stat.topMatch ?? '')
  const [error, setError] = useState<string | null>(null)

  const handleAddAlias = async () => {
    if (!target || !target.startsWith('/')) {
      setError('target must start with /')
      return
    }
    setStatus('saving')
    setError(null)
    try {
      const res = await fetch('/api/404/alias?force=1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: stat.path, to: target, reason: 'operator-approved via /admin/404-radar' }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setStatus('error')
        setError(data.error || 'request failed')
        return
      }
      setStatus('saved')
    } catch (err) {
      setStatus('error')
      setError((err as Error).message)
    }
  }

  const confidencePct = (stat.topConfidence * 100).toFixed(0)
  const confidenceColor = stat.topConfidence >= 0.7 ? 'text-emerald-400' : stat.topConfidence >= 0.4 ? 'text-amber-400' : 'text-white/40'

  return (
    <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
      <td className="px-4 py-3 align-top">
        <p className="font-mono text-xs text-white/80 break-all">{stat.path}</p>
        <p className="text-[10px] text-white/30 mt-0.5">last: {new Date(stat.lastHit).toLocaleString()}</p>
        {stat.existingAlias && (
          <p className="text-[10px] text-emerald-400/70 mt-0.5 font-mono">
            → {stat.existingAlias} (live)
          </p>
        )}
      </td>
      <td className="px-4 py-3 text-right align-top">
        <span className="font-mono text-sm text-white/70">{stat.count}</span>
      </td>
      <td className="px-4 py-3 align-top">
        {stat.topMatch ? (
          <>
            <p className="text-xs text-white/70">{stat.topMatchTitle}</p>
            <p className="text-[10px] text-white/40 font-mono break-all">{stat.topMatch}</p>
          </>
        ) : (
          <p className="text-[10px] text-white/30 italic">no match</p>
        )}
      </td>
      <td className="px-4 py-3 text-right align-top">
        {stat.topMatch && (
          <span className={`text-xs font-mono ${confidenceColor}`}>{confidencePct}%</span>
        )}
      </td>
      <td className="px-4 py-3 align-top">
        {status === 'saved' ? (
          <span className="text-[11px] text-emerald-400 font-mono">✓ saved</span>
        ) : stat.existingAlias ? (
          <span className="text-[10px] text-white/30 font-mono">aliased</span>
        ) : (
          <div className="flex flex-col items-end gap-1">
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="/canonical-path"
              className="w-full text-[11px] font-mono bg-white/[0.04] border border-white/10 rounded px-2 py-1 text-white/80 focus:outline-none focus:border-white/30"
            />
            <button
              onClick={handleAddAlias}
              disabled={status === 'saving'}
              className="text-[11px] font-mono px-2 py-1 rounded border border-white/15 bg-white/[0.04] text-white/70 hover:text-white hover:border-white/30 disabled:opacity-50"
            >
              {status === 'saving' ? 'saving…' : 'add alias →'}
            </button>
            {error && <span className="text-[10px] text-rose-400">{error}</span>}
          </div>
        )}
      </td>
    </tr>
  )
}
