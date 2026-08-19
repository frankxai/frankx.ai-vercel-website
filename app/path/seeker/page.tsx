import { TrackingLink } from '@/components/ui/TrackingLink'
import AuroraGradient from '@/components/ui/AuroraGradient'
import { SplitTextReveal } from '@/components/ui/SplitTextReveal'
import { ArrowRight } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { PathMechanism } from '../PathMechanism'

export const metadata = createMetadata({
  title: 'The Direction Seeker | FrankX',
  description: 'Overcome overwhelm and find signal. The Soulbook and the daily execution system for starting over.',
  path: '/path/seeker',
})

const STEPS = [
  {
    title: 'Cure Execution Paralysis',
    body: 'Overwhelmed by fragmented tactical advice and no cohesive plan? The Soulbook gives you a fixed structure to execute daily.',
  },
  {
    title: 'Build Real Routines',
    body: 'The foundational routines and daily execution systems for the transition from corporate employment to working for yourself.',
  },
  {
    title: 'Anchor Your Identity',
    body: 'Operating without a defining framework is its own risk. The 7 Pillars anchor the pivot so you execute instead of drift.',
  },
] as const

export default function SeekerPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <AuroraGradient variant="emerald" intensity="normal" className="relative flex min-h-[85vh] flex-col justify-end overflow-hidden px-6 pb-24 pt-32">
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <p className="mb-6 text-sm text-emerald-300/80">The Direction Seeker</p>
          <div className="mb-6 max-w-4xl">
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
              <SplitTextReveal text="Find signal in" as="span" />
              <br />
              <SplitTextReveal text="the noise." as="span" delay={0.2} className="text-emerald-300" />
            </h1>
          </div>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
            Leaving a senior role at Oracle didn't come with a plan — it came with silence where the org chart used to be. The infrastructure that keeps a big company moving is invisible until it's gone. I rebuilt my own version of it: a daily architecture, not a vibe. That's what's in the Soulbook — the same discipline that runs production systems, applied to one person's day.
          </p>
          <div className="flex flex-col items-start gap-4">
            <TrackingLink
              href="/soulbook"
              eventName="funnel_cta_clicked"
              eventParams={{ persona: 'seeker' }}
              className="group inline-flex h-14 items-center gap-2 rounded-2xl bg-emerald-500 px-8 text-sm font-medium text-white shadow-lg shadow-emerald-500/20 transition-[background-color,box-shadow,transform] duration-200 hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] active:scale-[0.98]"
            >
              Download the Soulbook
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </TrackingLink>
            <p className="ml-2 text-xs tracking-wide text-white/40">The 7 Pillars framework. Free.</p>
          </div>
        </div>
      </AuroraGradient>
      <PathMechanism heading="The Blueprint" accent="emerald" steps={STEPS} />
    </main>
  )
}
