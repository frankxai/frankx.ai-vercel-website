'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SoulbookIcon from './SoulbookIcon'
import { getPillarProgress, getPillarCount } from '@/lib/reading-progress'

const pillarMeta = [
  { title: 'Energy', icon: 'vitality', color: 'emerald', chapter: 'chapter-01-energy' },
  { title: 'Mind', icon: 'awareness', color: 'cyan', chapter: 'chapter-02-mind' },
  { title: 'Soul', icon: 'soul', color: 'violet', chapter: 'chapter-03-soul' },
  { title: 'Craft', icon: 'craft', color: 'amber', chapter: 'chapter-04-craft' },
  { title: 'Capital', icon: 'capital', color: 'yellow', chapter: 'chapter-05-capital' },
  { title: 'Circle', icon: 'relationships', color: 'rose', chapter: 'chapter-06-circle' },
  { title: 'Legacy', icon: 'journey', color: 'purple', chapter: 'chapter-07-legacy' },
]

const activeColors: Record<string, string> = {
  emerald: 'border-emerald-400 bg-emerald-500/15 text-emerald-400',
  cyan: 'border-cyan-400 bg-cyan-500/15 text-cyan-400',
  violet: 'border-violet-400 bg-violet-500/15 text-violet-400',
  amber: 'border-amber-400 bg-amber-500/15 text-amber-400',
  yellow: 'border-yellow-400 bg-yellow-500/15 text-yellow-400',
  rose: 'border-rose-400 bg-rose-500/15 text-rose-400',
  purple: 'border-purple-400 bg-purple-500/15 text-purple-400',
}

export default function PillarProgress() {
  const [progress, setProgress] = useState<{ pillar: string; read: boolean }[]>([])
  const [count, setCount] = useState({ read: 0, total: 7 })

  useEffect(() => {
    setProgress(getPillarProgress())
    setCount(getPillarCount())
  }, [])

  // Don't render if nothing has been read yet
  if (count.read === 0) return null

  const pct = Math.round((count.read / count.total) * 100)

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-white/70">Your Progress</h3>
          <p className="text-xs text-white/30 mt-0.5">
            {count.read} of {count.total} pillars read
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs font-mono text-amber-400/60">{pct}%</span>
        </div>
      </div>

      {/* Pillar dots */}
      <div className="flex items-center gap-2">
        {pillarMeta.map((p, i) => {
          const isRead = progress[i]?.read
          return (
            <Link
              key={p.title}
              href={`/books/self-development/${p.chapter}`}
              className={`group relative flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200 ${
                isRead
                  ? activeColors[p.color]
                  : 'border-white/[0.06] bg-white/[0.02] text-white/20 hover:bg-white/[0.04] hover:text-white/40'
              }`}
              title={`${p.title}${isRead ? ' (read)' : ''}`}
            >
              <SoulbookIcon id={p.icon} size="sm" />
              {isRead && (
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </Link>
          )
        })}
      </div>

      {/* Completion message */}
      {count.read === count.total && (
        <div className="mt-4 pt-4 border-t border-white/[0.06] text-center">
          <p className="text-xs text-amber-400/60">
            All 7 pillars complete. Explore the{' '}
            <Link href="/books/self-development" className="underline underline-offset-2 hover:text-amber-300 transition-colors">
              remaining 3 chapters
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  )
}
