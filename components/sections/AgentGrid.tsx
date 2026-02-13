'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Agent = {
  id: string
  name: string
  title: string
  description: string
  imagePath: string
  accentColor: string
}

const agents: Agent[] = [
  {
    id: 'creation-engine',
    name: 'Creation Engine',
    title: 'Content & Product',
    description: 'Multi-format storytelling and launch strategy',
    imagePath: '/images/agents/creation-engine.svg',
    accentColor: 'emerald',
  },
  {
    id: 'frequency-alchemist',
    name: 'Frequency Alchemist',
    title: 'Music Production',
    description: 'AI music creation and Suno mastery',
    imagePath: '/images/agents/frequency-alchemist.svg',
    accentColor: 'purple',
  },
  {
    id: 'visionary',
    name: 'Visionary',
    title: 'Strategic Intelligence',
    description: 'Future visioning and business guidance',
    imagePath: '/images/agents/visionary.svg',
    accentColor: 'blue',
  },
  {
    id: 'starlight-architect',
    name: 'Starlight Architect',
    title: 'Systems Design',
    description: 'Enterprise AI with soul alignment',
    imagePath: '/images/agents/starlight-architect.svg',
    accentColor: 'amber',
  },
]

type AgentGridProps = {
  showTitle?: boolean
  className?: string
}

/**
 * Compact agent grid for embedding in other sections
 * For the full interactive showcase, use AgentShowcase component
 */
export default function AgentGrid({ showTitle = true, className }: AgentGridProps) {
  return (
    <section className={cn('py-16', className)}>
      {showTitle && (
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Powered by the Agent Collective
          </h2>
          <p className="text-white/60 max-w-lg mx-auto">
            Specialized AI agents working together to amplify your creative output
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {agents.map((agent) => (
          <Link
            key={agent.id}
            href="/agents"
            className="group block p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-slate-900 mx-auto mb-4 group-hover:scale-105 transition-transform">
              <Image
                src={agent.imagePath}
                alt={agent.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-white text-sm md:text-base">{agent.name}</h3>
              <p className={cn(
                'text-xs font-medium mt-1',
                agent.accentColor === 'emerald' && 'text-emerald-400',
                agent.accentColor === 'purple' && 'text-purple-400',
                agent.accentColor === 'blue' && 'text-blue-400',
                agent.accentColor === 'amber' && 'text-amber-400',
              )}>
                {agent.title}
              </p>
              <p className="text-xs text-white/50 mt-2 hidden md:block">
                {agent.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
