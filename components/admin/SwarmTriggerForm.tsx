'use client'

/**
 * Client trigger for the investment council. The admin secret is pasted per-use
 * and sent as the `x-admin-secret` header — never stored, never persisted.
 */

import { useState } from 'react'

export function SwarmTriggerForm({ gatewayReady }: { gatewayReady: boolean }) {
  const [context, setContext] = useState('')
  const [secret, setSecret] = useState('')
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  async function run() {
    setBusy(true)
    setResult(null)
    try {
      const res = await fetch('/api/swarm/run', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-admin-secret': secret },
        body: JSON.stringify({ context: context.trim() || undefined }),
      })
      const json = await res.json()
      setResult(JSON.stringify(json, null, 2))
    } catch (err) {
      setResult(`Error: ${(err as Error).message}`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
      <textarea
        value={context}
        onChange={(e) => setContext(e.target.value)}
        placeholder="Operator context — e.g. late-cycle regime, 60/30/10 portfolio, question: any macro flags that should change sizing this week?"
        rows={3}
        className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50"
      />
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="ADMIN_SECRET (not stored)"
          className="flex-1 rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50"
        />
        <button
          onClick={run}
          disabled={busy || !secret}
          className="rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed px-5 py-2 text-sm font-medium transition-colors"
        >
          {busy ? 'Running…' : 'Run council'}
        </button>
      </div>
      {!gatewayReady && (
        <p className="text-xs text-amber-400/80">Gateway not configured — a run will return a graceful no-op note.</p>
      )}
      {result && (
        <pre className="mt-2 rounded-lg bg-black/50 border border-white/10 p-3 text-xs text-zinc-300 whitespace-pre-wrap overflow-x-auto max-h-96">{result}</pre>
      )}
    </div>
  )
}
