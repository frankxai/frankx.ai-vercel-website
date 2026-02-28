'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { fadeUp } from '@/lib/motion'

import { agentProtocols } from '@/lib/hub'
import { GlowCard } from '@/components/ui/glow-card'

export default function AgentProtocols() {
  return (
    <section id="agents" className="bg-midnight-950 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div className="max-w-3xl" {...fadeUp}>
          <h2 className="text-heading-2 font-semibold text-white text-balance">
            Protocols that your AI agents can plug into today
          </h2>
          <p className="mt-4 text-body text-neutral-300">
            Each protocol includes structures, prompts, and guardrails so human teams and automated
            agents stay in sync.
          </p>
        </motion.div>
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {agentProtocols.map((protocol) => (
            <motion.div key={protocol.title} {...fadeUp}>
              <GlowCard color="blue" className="p-6 h-full">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0">
                    <protocol.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-heading-5 font-semibold text-white">{protocol.title}</h3>
                    <p className="text-xs uppercase tracking-widest text-white/40 mt-1">
                      {protocol.focus}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-body-sm text-white/60 leading-relaxed">{protocol.description}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {protocol.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-white/70">
                      <Check className="w-4 h-4 mt-0.5 text-sky-400" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={protocol.link.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                >
                  {protocol.link.label}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
