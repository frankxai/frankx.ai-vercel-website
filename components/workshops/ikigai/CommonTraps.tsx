'use client'

import { AlertTriangle, Sparkles } from 'lucide-react'

interface CommonTrapsProps {
  /** Optional eyebrow label override */
  label?: string
  /** 2-3 named failure modes for the module */
  traps: string[]
  /** Optional 1-line "if you do nothing else" simplification */
  simplification?: string
}

/**
 * Anti-pattern callout. Names the 2-3 ways people get a module wrong,
 * plus an optional "if you do nothing else, do this" 1-liner above
 * for overload protection.
 *
 * Why this matters: naming the failure mode is the cheapest authority
 * signal. It also lets audience members self-diagnose where they've
 * been stuck before.
 */
export function CommonTraps({
  label = 'Most people get this wrong by',
  traps,
  simplification,
}: CommonTrapsProps) {
  return (
    <div className="space-y-3">
      {simplification && (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-emerald-300 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300 mb-1">
              If you do nothing else
            </p>
            <p className="text-sm text-zinc-200 leading-relaxed">{simplification}</p>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-rose-500/15 bg-rose-500/[0.03] p-4 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-rose-400 mb-2">
            {label}
          </p>
          <ul className="space-y-1.5">
            {traps.map((t, i) => (
              <li
                key={i}
                className="text-sm text-zinc-300 flex items-start gap-2 leading-relaxed"
              >
                <span className="text-rose-400/60 mt-0.5">·</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
