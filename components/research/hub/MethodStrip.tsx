import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const phases = [
  {
    number: '01',
    title: 'Directed scan',
    description:
      'A defined question guides the search across primary material, papers, official releases and expert analysis.',
  },
  {
    number: '02',
    title: 'Specialist passes',
    description:
      'Separate passes compare sources, inspect contradictions and keep reported fact apart from interpretation.',
  },
  {
    number: '03',
    title: 'Evidence review',
    description:
      'Claims are checked against available sources, given a confidence level and narrowed when the evidence is thin.',
  },
  {
    number: '04',
    title: 'Human decision',
    description:
      'Frank reviews the synthesis, rejects weak claims and decides whether the artifact is useful enough to publish.',
  },
]

/**
 * The four phases of the hub method. `#methodology` is preserved here because the
 * page's own CTAs and older links point at it; the full method still lives at
 * /research/methodology.
 */
export default function MethodStrip({ hasRegisteredSources }: { hasRegisteredSources: boolean }) {
  return (
    <section id="methodology" aria-labelledby="method-title" className="scroll-mt-24 border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="method-title" className="sr-only">
          Research method
        </h2>
        <div className="grid md:grid-cols-4">
          {phases.map((phase, index) => (
            <div
              key={phase.number}
              className={`py-7 md:py-8 ${
                index < phases.length - 1 ? 'border-b border-white/[0.08] md:border-b-0 md:border-r' : ''
              } ${index > 0 ? 'md:pl-6' : ''} ${index < phases.length - 1 ? 'md:pr-6' : ''}`}
            >
              <span className="font-mono text-[10.5px] tracking-[0.08em] text-emerald-300">
                {phase.number}
              </span>
              <h3 className="mt-2 font-display text-[15px] font-semibold tracking-tight text-white">
                {phase.title}
              </h3>
              <p className="mt-2 max-w-[30ch] text-xs leading-5 text-white/50">{phase.description}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-white/[0.08] py-4">
          <Link
            href="/research/methodology"
            className="inline-flex min-h-11 items-center gap-1.5 text-[13px] text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
          >
            Method in full
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-emerald-300" />
          </Link>
          {hasRegisteredSources ? (
            <Link
              href="/research/sources"
              className="inline-flex min-h-11 items-center gap-1.5 text-[13px] text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              Browse the source ledger
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-emerald-300" />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}
