'use client'

import { useState } from 'react'

interface Proposal {
  runId: string
  status: 'pending' | 'approved' | 'rejected'
  kind: 'alias' | 'stub-page'
  pattern?: string
  canonical?: string
  topic?: string
  targetRoute?: string
  outline?: string[]
  confidence?: 'high' | 'medium' | 'low'
  reasoning?: string
  rationale?: string
}

const confidenceTint: Record<string, string> = {
  high: 'text-emerald-400 border-emerald-500/30',
  medium: 'text-amber-400 border-amber-500/30',
  low: 'text-rose-400 border-rose-500/30',
}

export default function AgentQueueRow({ proposal }: { proposal: Proposal }) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [err, setErr] = useState<string | null>(null)

  const approve = async () => {
    if (proposal.kind !== 'alias' || !proposal.pattern || !proposal.canonical) {
      setErr('only alias proposals can be auto-applied')
      setStatus('error')
      return
    }
    setStatus('saving')
    try {
      const res = await fetch('/api/404/alias?force=1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: proposal.pattern,
          to: proposal.canonical,
          reason: `agent-proposed (run ${proposal.runId}): ${proposal.reasoning ?? ''}`,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setStatus('error')
        setErr(data.error ?? 'request failed')
        return
      }
      setStatus('saved')
    } catch (e) {
      setStatus('error')
      setErr((e as Error).message)
    }
  }

  if (proposal.kind === 'stub-page') {
    return (
      <div className="p-4">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-fuchsia-400/70">stub-page proposal</p>
            <h3 className="text-sm font-medium text-white/90 mt-1">{proposal.topic}</h3>
            <p className="text-xs font-mono text-white/50 mt-0.5">→ {proposal.targetRoute}</p>
          </div>
          <span className="text-[10px] font-mono text-white/30">{new Date(proposal.runId).toLocaleDateString()}</span>
        </div>
        {proposal.rationale && <p className="text-xs text-white/60 mb-3 italic">{proposal.rationale}</p>}
        {proposal.outline && (
          <ul className="text-xs text-white/70 list-disc list-inside space-y-1">
            {proposal.outline.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-[10px] text-white/30 font-mono italic">
          Stub-page proposals must be created manually — no one-click approval.
        </p>
      </div>
    )
  }

  // alias proposal
  return (
    <div className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-[10px] font-mono uppercase tracking-wider text-fuchsia-400/70">alias proposal</p>
            {proposal.confidence && (
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${confidenceTint[proposal.confidence] ?? 'text-white/40 border-white/10'}`}
              >
                {proposal.confidence}
              </span>
            )}
          </div>
          <p className="text-sm font-mono text-white/90">
            <span className="text-rose-300">{proposal.pattern}</span>{' '}
            <span className="text-white/40">→</span>{' '}
            <span className="text-emerald-300">{proposal.canonical}</span>
          </p>
          {proposal.reasoning && <p className="text-xs text-white/50 mt-1.5 italic">{proposal.reasoning}</p>}
        </div>
        <div className="flex flex-col items-end gap-1">
          {status === 'saved' ? (
            <span className="text-[11px] text-emerald-400 font-mono">✓ approved</span>
          ) : (
            <button
              onClick={approve}
              disabled={status === 'saving'}
              className="text-[11px] font-mono px-3 py-1 rounded border border-emerald-500/30 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-950/60 disabled:opacity-50"
            >
              {status === 'saving' ? 'saving…' : 'approve →'}
            </button>
          )}
          {err && <span className="text-[10px] text-rose-400">{err}</span>}
        </div>
      </div>
    </div>
  )
}
