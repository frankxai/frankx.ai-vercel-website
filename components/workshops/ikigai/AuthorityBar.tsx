'use client'

import { ExternalLink, Quote } from 'lucide-react'
import type { Citation } from '@/lib/workshop-citations'

interface AuthorityBarProps {
  citations: Citation[]
  /** Optional eyebrow label above the citations row */
  label?: string
  /** Render style — `inline` for slot-into-module, `card` for standalone block */
  variant?: 'inline' | 'card'
}

/**
 * Tight, citation-grade authority row. Lists 2-3 hand-picked statistics
 * with attributed sources. No fabricated numbers — every entry is
 * sourced via `lib/workshop-citations.ts`.
 *
 * Pattern: discipline is name-the-source-in-the-same-breath. Generic
 * "studies show" reads as AI-slop. "McKinsey State of AI 2026, n=1,500
 * organizations" reads as research.
 */
export function AuthorityBar({
  citations,
  label = 'Why this matters',
  variant = 'inline',
}: AuthorityBarProps) {
  if (!citations.length) return null

  const containerClass =
    variant === 'card'
      ? 'rounded-3xl border border-amber-500/15 bg-gradient-to-br from-amber-500/[0.03] to-violet-500/[0.03] p-6 sm:p-7'
      : 'rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5'

  return (
    <div className={containerClass}>
      <div className="flex items-center gap-2 mb-4">
        <Quote className="w-3.5 h-3.5 text-amber-400" strokeWidth={2.5} />
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-amber-400">
          {label}
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {citations.map((c, i) => {
          const inner = (
            <>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1.5 tabular-nums">
                {c.stat}
              </div>
              <p className="text-xs text-zinc-400 leading-snug mb-2">{c.claim}</p>
              <p className="text-[10px] text-zinc-500 flex items-center gap-1 uppercase tracking-wider">
                <span className="text-zinc-600">—</span>
                <span>
                  {c.source} <span className="text-zinc-600">·</span> {c.year}
                </span>
                {c.url && <ExternalLink className="w-2.5 h-2.5 ml-0.5 text-zinc-600" />}
              </p>
            </>
          )

          return c.url ? (
            <a
              key={i}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-l border-white/[0.06] pl-4 first:border-l-0 first:pl-0 hover:border-amber-400/30 transition-colors"
            >
              {inner}
            </a>
          ) : (
            <div
              key={i}
              className="block border-l border-white/[0.06] pl-4 first:border-l-0 first:pl-0"
            >
              {inner}
            </div>
          )
        })}
      </div>
    </div>
  )
}
