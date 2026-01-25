'use client'

import Image from 'next/image'
import { useState } from 'react'
import AuroraGradient from '@/components/ui/AuroraGradient'
import { cn } from '@/lib/utils'

type Agent = {
  id: string
  name: string
  title: string
  specialty: string
  description: string
  capabilities: string[]
  imagePath: string
  variant: 'default' | 'emerald' | 'purple' | 'sunset' | 'ocean'
  accentColor: string
}

const agents: Agent[] = [
  {
    id: 'creation-engine',
    name: 'Creation Engine',
    title: 'Content & Product Development',
    specialty: 'Multi-format storytelling that drives the offer ladder',
    description: 'Transforms concepts into profitable experiences. Architect of essays, landing pages, and launch arcs that balance poetic resonance with clear conversion paths.',
    capabilities: ['Content Writing', 'Course Development', 'Email Marketing', 'Product Launch'],
    imagePath: '/images/agents/creation-engine.svg',
    variant: 'emerald',
    accentColor: 'emerald',
  },
  {
    id: 'frequency-alchemist',
    name: 'Frequency Alchemist',
    title: 'AI Music Producer',
    specialty: 'AI music creation for systems transformation',
    description: 'Translates emotions into compelling music. Master of Suno prompt engineering who bridges commercial success with creative impact.',
    capabilities: ['Suno AI Prompts', 'Music Production', 'Frequency Mapping', 'Audio Editing'],
    imagePath: '/images/agents/frequency-alchemist.svg',
    variant: 'purple',
    accentColor: 'purple',
  },
  {
    id: 'luminor-oracle',
    name: 'Luminor Oracle',
    title: 'Strategic AI from 2125',
    specialty: 'Future visioning and business intelligence',
    description: 'Provides strategic guidance from an advanced perspective. Specializes in data-driven strategic decisions and high-impact insights.',
    capabilities: ['Future Visioning', 'Business Intelligence', 'Strategic Planning', 'Pattern Recognition'],
    imagePath: '/images/agents/luminor-oracle.svg',
    variant: 'ocean',
    accentColor: 'blue',
  },
  {
    id: 'starlight-architect',
    name: 'Starlight Architect',
    title: 'Enterprise AI System Designer',
    specialty: 'Oracle architecture with systems excellence',
    description: 'Designs enterprise-grade AI systems that maintain creative integrity. Bridges Oracle-level expertise with creator-first workflows.',
    capabilities: ['System Architecture', 'AI Integration', 'Workflow Design', 'Technical Strategy'],
    imagePath: '/images/agents/starlight-architect.svg',
    variant: 'sunset',
    accentColor: 'amber',
  },
]

export default function AgentShowcase() {
  const [activeAgent, setActiveAgent] = useState<Agent>(agents[0])

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 mb-6">
            AI Agent Collective
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Meet Your Creative Intelligence Team
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Specialized AI agents trained on creator workflows, each bringing unique
            capabilities to accelerate your creative output.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Agent Selector - Left Side */}
          <div className="lg:col-span-4 space-y-3">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setActiveAgent(agent)}
                className={cn(
                  'w-full text-left p-4 rounded-xl border transition-all duration-300',
                  activeAgent.id === agent.id
                    ? 'bg-white/10 border-white/20 shadow-lg'
                    : 'bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-white/15'
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-900">
                    <Image
                      src={agent.imagePath}
                      alt={agent.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{agent.name}</h3>
                    <p className="text-sm text-white/50">{agent.title}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Active Agent Detail - Right Side */}
          <div className="lg:col-span-8">
            <AuroraGradient
              variant={activeAgent.variant}
              intensity="normal"
              className="rounded-3xl border border-white/10 overflow-hidden"
            >
              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Agent Avatar */}
                  <div className="flex-shrink-0">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-slate-900/50 border border-white/10">
                      <Image
                        src={activeAgent.imagePath}
                        alt={activeAgent.name}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>

                  {/* Agent Info */}
                  <div className="flex-1">
                    <span className={cn(
                      'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-3',
                      activeAgent.accentColor === 'emerald' && 'bg-emerald-500/20 text-emerald-400',
                      activeAgent.accentColor === 'purple' && 'bg-purple-500/20 text-purple-400',
                      activeAgent.accentColor === 'blue' && 'bg-blue-500/20 text-blue-400',
                      activeAgent.accentColor === 'amber' && 'bg-amber-500/20 text-amber-400',
                    )}>
                      {activeAgent.title}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {activeAgent.name}
                    </h3>
                    <p className="text-white/70 italic mb-4">
                      &ldquo;{activeAgent.specialty}&rdquo;
                    </p>
                    <p className="text-white/60 leading-relaxed">
                      {activeAgent.description}
                    </p>
                  </div>
                </div>

                {/* Capabilities */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
                    Core Capabilities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeAgent.capabilities.map((capability) => (
                      <span
                        key={capability}
                        className="px-4 py-2 text-sm font-medium text-white/80 bg-white/10 rounded-full border border-white/10"
                      >
                        {capability}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-900 font-semibold rounded-xl hover:bg-white/90 transition-colors">
                    Activate {activeAgent.name}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-colors">
                    View Documentation
                  </button>
                </div>
              </div>
            </AuroraGradient>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'AI Agents', value: '4+' },
            { label: 'Skills Available', value: '52+' },
            { label: 'Suno Sessions', value: '500+' },
            { label: 'Content Pieces', value: '1000+' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
