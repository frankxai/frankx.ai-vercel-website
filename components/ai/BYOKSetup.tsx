'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, ExternalLink, KeyRound, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Client-side BYOK. The key lives only in the browser's localStorage under the
 * same `frankx_hub_google` slot the AI-architecture hub uses (one BYOK system
 * site-wide), and is sent per-request as a header by StudioChatSheet. It never
 * touches the server's storage. Clearing it removes it from the browser.
 */
export const BYOK_STORAGE_KEY = 'frankx_hub_google'

function readKey(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(BYOK_STORAGE_KEY)
  } catch {
    return null
  }
}

/** Notify same-tab listeners (storage events only fire cross-tab). */
function broadcast() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('studio-byok-changed'))
  }
}

export default function BYOKSetup({ onDone }: { onDone: () => void }) {
  const [apiKey, setApiKey] = useState('')
  const [stored, setStored] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setStored(!!readKey())
  }, [])

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = apiKey.trim()
    if (trimmed.length < 20) {
      setError('That key looks too short.')
      return
    }
    try {
      localStorage.setItem(BYOK_STORAGE_KEY, trimmed)
    } catch {
      setError('Could not save to this browser (storage blocked).')
      return
    }
    setApiKey('')
    setError(null)
    setStored(true)
    broadcast()
    setTimeout(onDone, 600)
  }

  const clear = () => {
    try {
      localStorage.removeItem(BYOK_STORAGE_KEY)
    } catch {
      /* ignore */
    }
    setStored(false)
    broadcast()
  }

  if (stored) {
    return (
      <div className="space-y-2 px-4 py-3.5">
        <div className="flex items-start gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2.5">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] font-medium text-emerald-200">Your key is active.</p>
            <p className="mt-0.5 text-[11.5px] text-emerald-200/70">
              Unlimited messages on the Pro model. Your key stays in this browser only — it's
              sent straight to Google, never stored on our servers.
            </p>
          </div>
          <button
            type="button"
            onClick={clear}
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
    <form onSubmit={save} className="space-y-2.5 px-4 py-3.5">
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
      />
      {error && <p className="text-[11.5px] text-rose-300">{error}</p>}
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10.5px] leading-snug text-white/40">
          Stored in this browser only. Never sent to our servers. Clear anytime.
        </p>
        <button
          type="submit"
          disabled={!apiKey.trim()}
          className={cn(
            'flex h-8 items-center gap-1.5 rounded-full px-3 text-[11.5px] font-medium transition-all',
            apiKey.trim()
              ? 'bg-gradient-to-br from-cyan-500 to-emerald-500 text-white shadow-md shadow-cyan-500/30 hover:shadow-cyan-500/50'
              : 'cursor-not-allowed bg-white/[0.07] text-white/40'
          )}
        >
          Save key
        </button>
      </div>
    </form>
  )
}
