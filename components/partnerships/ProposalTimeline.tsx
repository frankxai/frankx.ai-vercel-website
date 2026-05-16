import type { ProposalQuarter } from '@/content/partnerships/proposals/types'

type ProposalTimelineProps = {
  quarters: ProposalQuarter[]
}

/**
 * Quarter-by-quarter milestone plan for a partner proposal. Same visual
 * language as CompoundingTimeline — emerald accents, gradient connector,
 * horizontal on lg, vertical on mobile — but quarters carry milestone
 * lists rather than a single body paragraph.
 */
export function ProposalTimeline({ quarters }: ProposalTimelineProps) {
  if (!quarters.length) return null

  return (
    <section
      aria-labelledby="proposal-timeline-heading"
      className="border-t border-white/5 py-24 lg:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
            The plan
          </p>
          <h2
            id="proposal-timeline-heading"
            className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4"
          >
            Quarter-by-quarter shape.
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Each quarter lists what is true at the end of it. Milestones are
            commitments, not aspirations — every one is verifiable when it
            lands.
          </p>
        </div>

        {/* Desktop: horizontal */}
        <div className="hidden lg:block">
          <ol
            className="grid gap-6 relative"
            style={{
              gridTemplateColumns: `repeat(${quarters.length}, minmax(0, 1fr))`,
            }}
          >
            {/* Connector line */}
            <span
              aria-hidden
              className="absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-emerald-500/20 via-emerald-500/40 to-emerald-500/20"
            />
            {quarters.map((q, i) => (
              <li key={q.quarter} className="relative pt-16">
                <span
                  aria-hidden
                  className="absolute top-[1.625rem] left-1/2 -translate-x-1/2 block w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20"
                />
                <p className="text-center text-[11px] tracking-[0.25em] uppercase text-emerald-400/70 font-medium mb-3">
                  {q.quarter}
                </p>
                <ul className="space-y-2.5">
                  {q.milestones.map((m, mi) => (
                    <li
                      key={mi}
                      className="text-sm text-zinc-300 leading-relaxed flex gap-2"
                    >
                      <span
                        aria-hidden
                        className="text-emerald-400/70 flex-shrink-0 mt-1.5"
                      >
                        <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                          <circle cx="3" cy="3" r="3" />
                        </svg>
                      </span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile: vertical */}
        <ol className="lg:hidden relative space-y-10 pl-6">
          <span
            aria-hidden
            className="absolute top-2 left-[5px] bottom-2 w-px bg-gradient-to-b from-emerald-500/40 via-emerald-500/20 to-emerald-500/40"
          />
          {quarters.map((q) => (
            <li key={q.quarter} className="relative">
              <span
                aria-hidden
                className="absolute -left-6 top-1 block w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-500/20"
              />
              <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/70 font-medium mb-3">
                {q.quarter}
              </p>
              <ul className="space-y-2">
                {q.milestones.map((m, mi) => (
                  <li
                    key={mi}
                    className="text-sm text-zinc-300 leading-relaxed flex gap-2"
                  >
                    <span
                      aria-hidden
                      className="text-emerald-400/70 flex-shrink-0 mt-1.5"
                    >
                      <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                        <circle cx="3" cy="3" r="3" />
                      </svg>
                    </span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
