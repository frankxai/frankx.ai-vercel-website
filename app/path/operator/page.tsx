import { TrackingLink } from '@/components/ui/TrackingLink'
import AuroraGradient from '@/components/ui/AuroraGradient'
import { SplitTextReveal } from '@/components/ui/SplitTextReveal'
import { ArrowRight } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { PathMechanism } from '../PathMechanism'

export const metadata = createMetadata({
  title: 'The Elite Operator',
  description: 'Multi-agent orchestration, Starlight Intelligence, and enterprise-grade AI architecture patterns.',
  path: '/path/operator',
})

const STEPS = [
  {
    title: 'Replace Headcount With Swarms',
    body: 'Scaling operations shouldn\'t demand a bigger team. Replace expensive agency overhead with agentic swarms you configure.',
  },
  {
    title: 'Unify the Fragmentation',
    body: 'Stop running disconnected workflows. Compound your efforts into one owned system instead of six disconnected tools.',
  },
  {
    title: 'Peer-Level Depth',
    body: 'Production-grade systems architecture and operator guidance from someone who built at enterprise scale first.',
  },
] as const

export default function OperatorPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <AuroraGradient variant="ocean" intensity="normal" className="relative flex min-h-[85vh] flex-col justify-end overflow-hidden px-6 pb-24 pt-32">
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <p className="mb-6 text-sm text-blue-300/80">The Elite Operator</p>
          <div className="mb-6 max-w-4xl">
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
              <SplitTextReveal text="Architecting" as="span" />
              <br />
              <SplitTextReveal text="the machine." as="span" delay={0.2} className="text-blue-300" />
            </h1>
          </div>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
            I spent years building enterprise-scale AI systems at Oracle. The same architecture patterns — orchestration, redundancy, governance — now run at individual scale. The Elite Operator doesn't just use tools; they orchestrate swarms. Starlight Intelligence is the infrastructure for exactly that: agentic swarms, persistent background processes, a digital estate you own outright.
          </p>
          <div className="flex flex-col items-start gap-4">
            <TrackingLink
              href="/ai-architect-academy"
              eventName="funnel_cta_clicked"
              eventParams={{ persona: 'operator' }}
              className="group inline-flex h-14 items-center gap-2 rounded-2xl bg-blue-500 px-8 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-[background-color,box-shadow,transform] duration-200 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] active:scale-[0.98]"
            >
              Enter the AI Architect Academy
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </TrackingLink>
            <p className="ml-2 text-xs tracking-wide text-white/40">Production-grade agentic systems. No bloat.</p>
          </div>
        </div>
      </AuroraGradient>
      <PathMechanism heading="The System" accent="blue" steps={STEPS} />
    </main>
  )
}
