import { ArrowRight, ExternalLink, Play, Sparkles, Youtube, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'
import { UniversalEmbed } from '@/components/embeds/UniversalEmbed'

interface StrategyPageProps {
  title: string
  description: string
  heroVideoId: string
  stats: { label: string; value: string }[]
  steps: { title: string; description: string }[]
  tools: { name: string; description: string; url: string }[]
}

export function StrategyPageLayout({
  title,
  description,
  heroVideoId,
  stats,
  steps,
  tools,
}: StrategyPageProps) {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white selection:bg-emerald-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">FrankX Strategy</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            {title}
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12">
            {description}
          </p>

          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-500/10">
            <UniversalEmbed type="youtube" id={heroVideoId} title={title} />
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/40 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* The Strategy Steps */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center">The Execution Protocol</h2>
          
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 md:gap-10">
                <div className="flex-none">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl font-bold text-emerald-400">
                    {i + 1}
                  </div>
                  {i !== steps.length - 1 && (
                    <div className="w-px h-full bg-white/10 mx-auto my-4" />
                  )}
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/60 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Stack */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">The Stack</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <a 
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer" 
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">{tool.name}</h3>
                  <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white" />
                </div>
                <p className="text-sm text-white/50">{tool.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to execute?</h2>
          <p className="text-white/60 mb-8">
            Deploy this strategy with the Agentic Creator OS.
          </p>
          <Link 
            href="/products/agentic-creator-os"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-colors"
          >
            Get the System
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
