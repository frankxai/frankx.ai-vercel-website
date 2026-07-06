import { TrackingLink } from '@/components/ui/TrackingLink'
import { Cpu, ArrowRight, Network } from 'lucide-react'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'The Elite Operator | FrankX',
  description: 'Multi-agent orchestration, Starlight Intelligence, and enterprise-grade AI architecture patterns.',
  path: '/path/operator',
})

export default function OperatorPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="relative min-h-[85vh] overflow-hidden flex flex-col justify-end pb-24 pt-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-[#0a0a0b] z-0" />
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Cpu className="w-5 h-5" />
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400/80">
              The Elite Operator
            </p>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight max-w-4xl leading-[1.05] mb-6">
            Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">the machine.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed mb-10">
            I spent years building enterprise-scale AI systems at Oracle. The same architecture patterns — orchestration, redundancy, governance — now run at individual scale. The Elite Operator doesn't just use tools; they orchestrate swarms. Starlight Intelligence is the infrastructure for exactly that: agentic swarms, persistent background processes, a digital estate you own outright.
          </p>
          <div className="flex flex-col items-start gap-4">
            <TrackingLink
              href="/ai-architect-academy"
              eventName="funnel_cta_clicked"
              eventParams={{ persona: 'operator' }}
              className="group inline-flex items-center gap-2 rounded-2xl bg-blue-500/10 border border-blue-500/20 px-7 py-4 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/20"
            >
              Enter the AI Architect Academy
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </TrackingLink>
            <p className="text-xs text-white/40 font-medium ml-2">Production-grade agentic systems. No bloat.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-24 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold tracking-tight mb-12">The System</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-[#0a0a0b] border border-white/5">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Network className="w-5 h-5 text-blue-400/60" />
              </div>
              <h3 className="text-xl font-bold mb-3">Replace Headcount With Swarms</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Scaling operations shouldn't demand a bigger team. Replace expensive agency overhead with agentic swarms you configure.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0a0a0b] border border-white/5">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Network className="w-5 h-5 text-blue-400/60" />
              </div>
              <h3 className="text-xl font-bold mb-3">Unify the Fragmentation</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Stop running disconnected workflows. Compound your efforts into one owned system instead of six disconnected tools.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0a0a0b] border border-white/5">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Network className="w-5 h-5 text-blue-400/60" />
              </div>
              <h3 className="text-xl font-bold mb-3">Peer-Level Depth</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Production-grade systems architecture and operator guidance from someone who built at enterprise scale first.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
