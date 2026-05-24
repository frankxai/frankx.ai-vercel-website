'use client'

import { useEffect, useState } from 'react'
import { Infinity as InfinityIcon, KeyRound, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Persona } from '@/lib/ai/personas'

interface UsageResponse {
  tier: 'anon' | 'signedIn' | 'pro' | 'byok'
  used: number
  limit: number | null
  remaining: number | null
  resetsAt: number
  isSignedIn: boolean
}

const TIER_LABEL: Record<UsageResponse['tier'], string> = {
  byok: 'Your key · unlimited',
  pro: 'Studio Pro · unlimited',
  signedIn: 'Signed in',
  anon: 'Free',
}

export default function UsageMeter({
  persona,
  isOpen,
  triggerKey,
}: {
  persona: Persona
  isOpen: boolean
  triggerKey: number
}) {
  const [data, setData] = useState<UsageResponse | null>(null)

  useEffect(() => {
    if (!isOpen) return
    let cancelled = false
    fetch('/api/ai/usage', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!cancelled && j) setData(j as UsageResponse)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [isOpen, triggerKey])

  if (!data) {
    return (
      <div className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.16em] text-white/35">
        <span>Studio crew</span>
        <span>—</span>
      </div>
    )
  }

  const unlimited = data.limit === null
  const pct = !unlimited && data.limit ? Math.min(100, (data.used / data.limit) * 100) : 0
  const low = !unlimited && (data.remaining ?? 0) <= 2 && (data.remaining ?? 0) > 0
  const out = !unlimited && (data.remaining ?? 0) <= 0

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.16em] text-white/40">
        <span className="flex items-center gap-1.5">
          {data.tier === 'byok' ? (
            <KeyRound className="h-3 w-3" />
          ) : data.tier === 'pro' ? (
            <Sparkles className="h-3 w-3" />
          ) : null}
          {TIER_LABEL[data.tier]}
        </span>
        {unlimited ? (
          <span className="flex items-center gap-1 text-emerald-300/80">
            <InfinityIcon className="h-3 w-3" />
            unlimited
          </span>
        ) : (
          <span className={cn(low && 'text-amber-300/85', out && 'text-rose-300')}>
            {data.used} / {data.limit} today
          </span>
        )}
      </div>
      {!unlimited && (
        <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              out ? 'bg-rose-400/80' : low ? 'bg-amber-400/80' : 'bg-emerald-400/80'
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
      {out && (
        <p className="text-[11px] text-white/65">
          You've used today's free messages. Tap{' '}
          <span className="text-white/85">Key</span> above to bring your own Gemini key (unlimited),
          or come back tomorrow.
        </p>
      )}
      {low && !out && (
        <p className="text-[11px] text-white/55">
          {data.remaining} message{data.remaining === 1 ? '' : 's'} left today. Bring your own key
          to remove the cap.
        </p>
      )}
    </div>
  )
}
