import type { CompoundingNode } from '@/content/partnerships/types'

type CompoundingTimelineProps = {
  nodes: CompoundingNode[]
}

/**
 * Tier 2 — Month 0 / 3 / 6 / 12 progression. Horizontal SVG-anchored layout
 * on lg, vertical stack with the same iridescent connector on mobile. No
 * raw SVG markup — connectors are CSS gradients so the timeline restyles
 * cleanly under prefers-reduced-motion (which already excludes animation).
 */
export function CompoundingTimeline({ nodes }: CompoundingTimelineProps) {
  return (
    <section
      aria-labelledby="compounding-heading"
      className="border-t border-white/5 py-24 lg:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
            Compounding model
          </p>
          <h2
            id="compounding-heading"
            className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4"
          >
            What the first year looks like.
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Each milestone is what is true at that mark, not a deliverable
            checklist. Months are mile markers, not deadlines.
          </p>
        </div>

        {/* Desktop: horizontal */}
        <div className="hidden lg:block">
          <ol className="grid grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <span
              aria-hidden
              className="absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-emerald-500/20 via-emerald-500/40 to-emerald-500/20"
            />
            {nodes.map((node) => (
              <li key={node.month} className="relative pt-16">
                {/* Marker dot */}
                <span
                  aria-hidden
                  className="absolute top-[1.625rem] left-1/2 -translate-x-1/2 block w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20"
                />
                <p className="text-center text-[11px] tracking-[0.25em] uppercase text-emerald-400/70 font-medium mb-3">
                  Month {node.month}
                </p>
                <h3 className="text-base font-semibold text-white tracking-tight text-center mb-3 leading-snug">
                  {node.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed text-center">
                  {node.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile: vertical */}
        <ol className="lg:hidden relative space-y-10 pl-6">
          {/* Vertical connector */}
          <span
            aria-hidden
            className="absolute top-2 left-[5px] bottom-2 w-px bg-gradient-to-b from-emerald-500/40 via-emerald-500/20 to-emerald-500/40"
          />
          {nodes.map((node) => (
            <li key={node.month} className="relative">
              {/* Marker dot */}
              <span
                aria-hidden
                className="absolute -left-6 top-1 block w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-500/20"
              />
              <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/70 font-medium mb-2">
                Month {node.month}
              </p>
              <h3 className="text-base font-semibold text-white tracking-tight mb-2 leading-snug">
                {node.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {node.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
