import { TrackingLink } from '@/components/ui/TrackingLink'
import { Compass, ArrowRight, Target } from 'lucide-react'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'The Direction Seeker | FrankX',
  description: 'Overcome overwhelm and find signal. The Soulbook and the daily execution system for starting over.',
  path: '/path/seeker',
})

export default function SeekerPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="relative min-h-[85vh] overflow-hidden flex flex-col justify-end pb-24 pt-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-[#0a0a0b] z-0" />
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Compass className="w-5 h-5" />
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400/80">
              The Direction Seeker
            </p>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight max-w-4xl leading-[1.05] mb-6">
            Find signal in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">the noise.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed mb-10">
            Leaving a senior role at Oracle didn't come with a plan — it came with silence where the org chart used to be. The infrastructure that keeps a big company moving is invisible until it's gone. I rebuilt my own version of it: a daily architecture, not a vibe. That's what's in the Soulbook — the same discipline that runs production systems, applied to one person's day.
          </p>
          <div className="flex flex-col items-start gap-4">
            <TrackingLink
              href="/soulbook"
              eventName="funnel_cta_clicked"
              eventParams={{ persona: 'seeker' }}
              className="group inline-flex items-center gap-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-7 py-4 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
            >
              Download the Soulbook
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </TrackingLink>
            <p className="text-xs text-white/40 font-medium ml-2">The 7 Pillars framework. Free.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-24 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold tracking-tight mb-12">The Blueprint</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-[#0a0a0b] border border-white/5">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Target className="w-5 h-5 text-emerald-400/60" />
              </div>
              <h3 className="text-xl font-bold mb-3">Cure Execution Paralysis</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Overwhelmed by fragmented tactical advice and no cohesive plan? The Soulbook gives you a fixed structure to execute daily.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0a0a0b] border border-white/5">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Target className="w-5 h-5 text-emerald-400/60" />
              </div>
              <h3 className="text-xl font-bold mb-3">Build Real Routines</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                The foundational routines and daily execution systems for the transition from corporate employment to working for yourself.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0a0a0b] border border-white/5">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Target className="w-5 h-5 text-emerald-400/60" />
              </div>
              <h3 className="text-xl font-bold mb-3">Anchor Your Identity</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Operating without a defining framework is its own risk. The 7 Pillars anchor the pivot so you execute instead of drift.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
