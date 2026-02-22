'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { fadeUp } from '@/lib/motion'

import { agentProtocols } from '@/lib/hub'

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
            <motion.article
              key={protocol.title}
              className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6"
              {...fadeUp}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-700 dark:bg-secondary-800 dark:text-secondary-200 flex items-center justify-center">
                  <protocol.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-heading-5 font-semibold text-white">{protocol.title}</h3>
                  <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">
                    {protocol.focus}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-body-sm text-neutral-300 leading-relaxed">{protocol.description}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {protocol.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-white/75">
                    <Check className="w-4 h-4 mt-0.5 text-primary-600 dark:text-sky-300" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={protocol.link.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 dark:text-sky-300 hover:underline"
              >
                {protocol.link.label}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
