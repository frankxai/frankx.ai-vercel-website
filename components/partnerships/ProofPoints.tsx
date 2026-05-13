import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ProofPoint } from '@/content/partnerships/types'

type ProofPointsProps = {
  points: ProofPoint[]
}

/**
 * Verifiable artifacts — GitHub repos, posts, events. Each is a link out.
 * Treated as a sober reference list, not a logo wall.
 */
export function ProofPoints({ points }: ProofPointsProps) {
  if (!points.length) return null

  return (
    <section
      aria-labelledby="proof-points-heading"
      className="border-t border-white/5 py-20 lg:py-24"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
            Evidence
          </p>
          <h2
            id="proof-points-heading"
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight"
          >
            Linked artifacts.
          </h2>
        </div>

        <ul className="divide-y divide-white/[0.06] rounded-2xl border border-white/[0.06] bg-white/[0.015] overflow-hidden">
          {points.map((point, i) => {
            const isExternal = point.href.startsWith('http')
            const isPlaceholder = point.href.startsWith('#')
            return (
              <li key={i}>
                {isPlaceholder ? (
                  <div className="flex items-center gap-4 px-6 py-4 opacity-60">
                    <div className="flex-1">
                      <p className="text-sm text-zinc-300 font-medium">
                        {point.label}
                      </p>
                      {point.metric ? (
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {point.metric}
                        </p>
                      ) : null}
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.15em] text-zinc-500 font-medium">
                      Pending link
                    </span>
                  </div>
                ) : (
                  <Link
                    href={point.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-4 px-6 py-4 hover:bg-white/[0.025] transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-inset"
                  >
                    <div className="flex-1">
                      <p className="text-sm text-zinc-100 font-medium group-hover:text-white">
                        {point.label}
                      </p>
                      {point.metric ? (
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {point.metric}
                        </p>
                      ) : null}
                    </div>
                    <ArrowUpRight
                      className="w-4 h-4 text-zinc-500 group-hover:text-emerald-300"
                      aria-hidden
                    />
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
