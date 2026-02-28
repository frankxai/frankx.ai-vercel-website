'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeUp } from '@/lib/motion'

import { homeSpotlights } from '@/lib/hub'
import { SectionHeading } from '@/components/ui/primitives'
import { GlowCard } from '@/components/ui/glow-card'

const spotlightColors = ['violet', 'cyan', 'emerald'] as const

export default function StrategicSpotlights() {
  return (
    <section className="bg-midnight-950 py-24 px-6">
      <div className="mx-auto max-w-7xl space-y-12">
        <motion.div {...fadeUp}>
          <SectionHeading
            eyebrow="Operate with clarity"
            title="Start with the latest FrankX playbooks"
            description="Each spotlight connects the Intelligence Atlas, roadmap hub, and resource stack so you can move from insight to action without losing momentum."
            className="max-w-3xl"
          />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {homeSpotlights.map((spotlight, i) => (
            <motion.div key={spotlight.title} {...fadeUp}>
              <GlowCard
                href={spotlight.href}
                color={spotlightColors[i % spotlightColors.length]}
                className="p-6 h-full"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
                  {spotlight.eyebrow}
                </span>
                <h3 className="mt-3 text-heading-5 font-semibold text-white">{spotlight.title}</h3>
                <p className="mt-2 text-body-sm text-white/60 leading-relaxed">{spotlight.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/50 group-hover:text-white/90 transition-colors">
                  {spotlight.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
