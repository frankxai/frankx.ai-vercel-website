'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

export function GateActions({ gateId }: { gateId: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [notes, setNotes] = useState('')
  const [showNotes, setShowNotes] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function decide(decision: 'approve' | 'reject') {
    setError(null)
    startTransition(async () => {
      const res = await fetch('/api/admin/workflow-gates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gateId, decision, notes: notes.trim() || null }),
      })
      if (!res.ok) {
        const err = await res.text()
        setError(err || `Failed: ${res.status}`)
        return
      }
      router.refresh()
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        disabled={isPending}
        onClick={() => decide('approve')}
        className="rounded-lg bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-300 ring-1 ring-emerald-500/30 transition hover:bg-emerald-500/25 disabled:opacity-50"
      >
        {isPending ? 'Working...' : 'Approve'}
      </button>
      <button
        type="button"
        disabled={isPending}
        onClick={() => decide('reject')}
        className="rounded-lg bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-300 ring-1 ring-rose-500/25 transition hover:bg-rose-500/20 disabled:opacity-50"
      >
        Reject
      </button>
      <button
        type="button"
        onClick={() => setShowNotes(!showNotes)}
        className="text-xs text-white/50 underline-offset-2 hover:text-white/70 hover:underline"
      >
        {showNotes ? 'Hide notes' : 'Add notes'}
      </button>
      {showNotes && (
        <input
          type="text"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Optional decision notes..."
          className="flex-1 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none"
        />
      )}
      {error && <span className="text-xs text-rose-400">{error}</span>}
    </div>
  )
}
