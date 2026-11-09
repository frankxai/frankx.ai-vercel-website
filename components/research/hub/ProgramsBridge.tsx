import { ArrowUpRight } from 'lucide-react'

import { TrackedLink } from '@/components/analytics/TrackedLink'
import { coreQualitiesNavigationEvent } from '@/lib/core-qualities-analytics'

const lenses = [
  ['Freedom', 'Autonomy'],
  ['Mastery', 'Expertise'],
  ['Meaning', 'Coherence'],
  ['Connection', 'Belonging'],
]

/**
 * Bridge from the hub into the core-qualities research program. Copy and both
 * analytics events are carried over from the previous hub shell.
 */
export default function ProgramsBridge() {
  return (
    <section className="border-b border-white/[0.08] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.035] p-6 md:grid-cols-[0.85fr_1.15fr] md:p-10">
          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] text-emerald-300/75">
              Research program
            </p>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Four personal qualities. Four research lenses.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              Freedom, Mastery, Meaning and Connection begin as autobiographical
              commitments. This program asks what autonomy, expertise, meaning, belonging
              and collective intelligence can responsibly add, without turning a personal
              constitution into a universal personality theory.
            </p>
          </div>
          <div className="flex flex-col justify-between gap-8 border-t border-white/10 pt-7 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
              {lenses.map(([quality, lens]) => (
                <div key={quality} className="bg-[#0b0b0c] p-4">
                  <p className="font-display text-sm font-semibold text-white">{quality}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
                    {lens} lens
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <TrackedLink
                href="/research/core-qualities-and-human-drives"
                {...coreQualitiesNavigationEvent({
                  source: 'research_hub',
                  placement: 'qualities_bridge_primary',
                  destination: 'research_program',
                })}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-300 px-5 text-sm font-semibold text-[#0a0a0b] transition-colors hover:bg-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                Inspect sources and limits
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                href="/qualities"
                {...coreQualitiesNavigationEvent({
                  source: 'research_hub',
                  placement: 'qualities_bridge_secondary',
                  destination: 'overview',
                })}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/[0.12] px-5 text-sm font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"
              >
                Read the personal constitution
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
