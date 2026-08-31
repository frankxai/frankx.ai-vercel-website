import { Metadata } from 'next'
import { AgenticStoryFunnel } from '@/components/funnel/agentic/AgenticStoryFunnel'
import { Sparkles, Shield, Cpu, Zap, ArrowDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Autonomous System Architect & Funnel Engine | FrankX',
  description:
    'Calibrate your agentic architecture, diagnostic bottleneck, and personalized deployment tier with the FrankX Autonomous Advisor.',
}

export default function AdvisorPage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden py-12 px-4 sm:px-6 flex flex-col items-center justify-center">
      {/* Background ambient lighting and liquid glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Header */}
      <div className="max-w-xl w-full text-center space-y-3 mb-6 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md text-violet-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>SOVEREIGN AGENTIC FUNNEL ENGINE</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Calibrate Your <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">Agentic Architecture</span>
        </h1>

        <p className="text-sm text-white/60 max-w-md mx-auto">
          60-second interactive diagnostic. Our AI evaluates your current stack bottlenecks and constructs a custom deployment roadmap.
        </p>
      </div>

      {/* The Sovereign Mobile-Native Agentic Funnel */}
      <div className="w-full z-10">
        <AgenticStoryFunnel />
      </div>

      {/* Trust & Proof Indicators */}
      <div className="mt-8 max-w-md w-full grid grid-cols-3 gap-3 text-center text-[11px] text-white/40 font-mono z-10">
        <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>100% Sovereign</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <Zap className="w-4 h-4 text-violet-400" />
          <span>Instant Delivery</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>Agent Swarm Ready</span>
        </div>
      </div>
    </main>
  )
}
