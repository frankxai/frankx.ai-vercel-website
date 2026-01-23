import { Metadata } from 'next'
import Link from 'next/link'
import AgentShowcase from '@/components/sections/AgentShowcase'
import AuroraGradient from '@/components/ui/AuroraGradient'

export const metadata: Metadata = {
  title: 'AI Agent Collective | FrankX.AI',
  description: 'Meet the FrankX AI Agent Collective - specialized AI assistants trained on creator workflows for music, content, strategy, and systems design.',
}

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-void">
      {/* Hero */}
      <section className="pt-28 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AuroraGradient
            variant="default"
            intensity="subtle"
            className="rounded-3xl border border-white/10 p-12 mb-12"
          >
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-white/70 mb-6">
              Intelligence Collective
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Your AI Creative Team
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Specialized agents trained on 500+ Suno sessions, thousands of content pieces,
              and enterprise-grade systems. Each brings unique capabilities to amplify your creative output.
            </p>
          </AuroraGradient>
        </div>
      </section>

      {/* Agent Showcase */}
      <AgentShowcase />

      {/* How It Works */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How the Collective Works</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              The agents work together through the Starlight Orchestrator, routing your requests
              to the specialist best equipped to help.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Describe Your Goal',
                description: 'Tell us what you want to create - a song, article, product, or system.',
              },
              {
                step: '02',
                title: 'Agent Activation',
                description: 'The Orchestrator routes your request to the most relevant specialist agents.',
              },
              {
                step: '03',
                title: 'Collaborative Output',
                description: 'Agents work together, each contributing their expertise to your project.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-6">
                  <span className="text-2xl font-bold text-emerald-400">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <AuroraGradient
            variant="purple"
            className="rounded-3xl border border-white/10 p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Activate the Collective?
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Start with the free Soulbook framework or explore our creative products
              to experience the full power of the agent team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/products/soulbook"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-white/90 transition-colors"
              >
                Get Free Soulbook
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-colors"
              >
                Explore Products
              </Link>
            </div>
          </AuroraGradient>
        </div>
      </section>
    </div>
  )
}
