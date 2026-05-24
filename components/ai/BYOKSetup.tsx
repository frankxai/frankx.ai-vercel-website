'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, ExternalLink, KeyRound, Loader2, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'checking' | 'saving' | 'active' | 'error'

export default function BYOKSetup({ onDone }: { onDone: () => void }) {
  const [apiKey, setApiKey] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [hasStoredKey, setHasStoredKey] = useState<boolean>(false)

  useEffect(() => {
    let cancelled = false
    setStatus('checking')
    fetch('/api/ai/byok', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (cancelled) return
        if (j?.active) {
          setHasStoredKey(true)
          setStatus('active')
        } else {
          setStatus('idle')
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('idle')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = apiKey.trim()
    if (trimmed.length < 20) {
      setErrorMsg('That key looks too short.')
      setStatus('error')
      return
    }
    setStatus('saving')
    setErrorMsg(null)
    try {
      const r = await fetch('/api/ai/byok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: trimmed }),
      })
      const j = await r.json().catch(() => ({}))
      if (!r.ok || !j.ok) {
        setStatus('error')
        setErrorMsg(j.message || 'Could not save the key.')
        return
      }
      setHasStoredKey(true)
      setApiKey('')
      setStatus('active')
      setTimeout(() => onDone(), 700)
    } catch (e) {
      setStatus('error')
      setErrorMsg(e instanceof Error ? e.message : 'Network error.')
    }
  }

  const clearKey = async () => {
    setStatus('saving')
    try {
      await fetch('/api/ai/byok', { method: 'DELETE' })
    } catch {
      // ignore
    }
    setHasStoredKey(false)
    setStatus('idle')
  }

  if (status === 'active' && hasStoredKey) {
    return (
      <div className="space-y-2 px-4 py-3.5">
        <div className="flex items-start gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2.5">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] font-medium text-emerald-200">Your key is active.</p>
            <p className="mt-0.5 text-[11.5px] text-emerald-200/70">
              You're on the Pro model with no daily cap. Key is encrypted and never logged.
            </p>
          </div>
          <button
            type="button"
            onClick={clearKey}
            className="ml-1 flex h-7 items-center gap-1 rounded-full border border-white/15 px-2 text-[11px] text-white/65 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Clear API key"
          >
            <Trash2 className="h-3 w-3" />
            Clear
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-2.5 px-4 py-3.5">
      <div className="flex items-center gap-2 text-[12.5px] text-white/75">
        <KeyRound className="h-3.5 w-3.5 text-white/55" />
        <span>Bring your own Gemini key</span>
        <a
          href="https://aistudio.google.com/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-1 text-[11px] text-cyan-300/80 hover:text-cyan-200"
        >
          Get one <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <input
        type="password"
        autoComplete="off"
        spellCheck={false}
        placeholder="AIza…"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/25 focus:outline-none"
        disabled={status === 'saving'}
      />
      {errorMsg && (
        <p className="text-[11.5px] text-rose-300">{errorMsg}</p>
      )}
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10.5px] leading-snug text-white/40">
          Encrypted server-side, 30-day TTL. Clear anytime.
        </p>
        <button
          type="submit"
          disabled={status === 'saving' || !apiKey.trim()}
          className={cn(
            'flex h-8 items-center gap-1.5 rounded-full px-3 text-[11.5px] font-medium transition-all',
            apiKey.trim() && status !== 'saving'
              ? 'bg-gradient-to-br from-cyan-500 to-emerald-500 text-white shadow-md shadow-cyan-500/30 hover:shadow-cyan-500/50'
              : 'cursor-not-allowed bg-white/[0.07] text-white/40'
          )}
        >
          {status === 'saving' ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              Saving…
            </>
          ) : (
            <>Save key</>
          )}
        </button>
      </div>
    </form>
  )
}
