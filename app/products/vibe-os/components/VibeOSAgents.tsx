'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Music2, Wand2, Waves, Star } from 'lucide-react'
import Link from 'next/link'

interface Agent {
  name: string
  icon: LucideIcon
  color: string
  colorHex: string
  badge: string
  badgeStyle: string
  tagline: string
  description: string
  features: string[]
  cta: string
  href: string
  live: boolean
}

const agents: Agent[] = [
  {
    name: 'Music Producer',
    icon: Music2,
    color: 'purple',
    colorHex: '#AB47C7',
    badge: 'Free Beta',
    badgeStyle: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    tagline: 'Suno AI prompt engineering',
    description:
      'Transforms emotional intent into psychoacoustic precision. BPM, key, mode, instrumentation — calibrated for cognitive states.',
    features: [
      'Neuro-state targeting',
      'Genre-specific workflows',
      'BPM & key selection',
      '10 prompts/day free',
    ],
    cta: 'Launch Agent',
    href: '/vibe/producer',
    live: true,
  },
  {
    name: 'Creation Engine',
    icon: Wand2,
    color: 'cyan',
    colorHex: '#43BFE3',
    badge: 'Free Beta',
    badgeStyle: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    tagline: 'SEO-optimized content creation',
    description:
      'Multi-format content generation with keyword intelligence, readability scoring, and platform-specific optimization.',
    features: [
      'Blog & article generation',
      'SEO keyword integration',
      'Multi-format output',
      '5 prompts/day free',
    ],
    cta: 'Try Agent',
    href: '/products/vibe-os/app',
    live: true,
  },
  {
    name: 'Frequency Alchemist',
    icon: Waves,
    color: 'emerald',
    colorHex: '#10B981',
    badge: 'Vibe Club',
    badgeStyle: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    tagline: 'Neuro-acoustic engineering',
    description:
      'Creates binaural beats, brainwave entrainment audio, and therapeutic soundscapes calibrated to Alpha, Beta, Theta, and Delta states.',
    features: [
      'Binaural beat creation',
      'Brainwave entrainment',
      'Therapeutic soundscapes',
      'State-specific calibration',
    ],
    cta: 'Upgrade to Unlock',
    href: '#',
    live: false,
  },
  {
    name: 'Starlight Architect',
    icon: Star,
    color: 'amber',
    colorHex: '#F59E0B',
    badge: 'Pro Tier',
    badgeStyle: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    tagline: 'Multi-agent system design',
    description:
      'Enterprise AI system design agent for multi-agent orchestration, LLM provider selection, and production deployment patterns.',
    features: [
      'Multi-agent orchestration',
      'LLM routing frameworks',
      'Cost optimization',
      'Production deployment',
    ],
    cta: 'Go Pro to Unlock',
    href: '#',
    live: false,
  },
]

export default function VibeOSAgents() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="relative py-24">
      {/* Section Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-space to-void" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/70">
            AI Agents
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Four Specialist Agents.{' '}
            <span className="text-gradient-tech">One Ecosystem.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            Each agent is a domain expert powered by the best LLM for the job.
          </p>
        </motion.div>

        {/* Agent Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {agents.map((agent, index) => {
            const Icon = agent.icon
            const isHovered = hoveredCard === index

            return (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300"
                style={{
                  borderColor: isHovered ? agent.colorHex : undefined,
                  boxShadow: isHovered
                    ? `0 0 30px ${agent.colorHex}20, 0 0 60px ${agent.colorHex}10`
                    : undefined,
                }}
              >
                {/* Card Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${agent.colorHex}15` }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: agent.colorHex }}
                    />
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${agent.badgeStyle}`}
                  >
                    {agent.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                <p
                  className="mt-1 text-sm font-medium"
                  style={{ color: agent.colorHex }}
                >
                  {agent.tagline}
                </p>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {agent.description}
                </p>

                {/* Features */}
                <ul className="mt-4 space-y-2">
                  {agent.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-white/60"
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: agent.colorHex }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="mt-6">
                  {agent.live ? (
                    <Link
                      href={agent.href}
                      className="inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110"
                      style={{ backgroundColor: `${agent.colorHex}20` }}
                    >
                      {agent.cta}
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-white/30"
                    >
                      {agent.cta}
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
