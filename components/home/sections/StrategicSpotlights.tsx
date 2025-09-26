'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { homeSpotlights } from '@/lib/hub'
import { Surface, SectionHeading } from '@/components/ui/primitives'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 }
}

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
          {homeSpotlights.map((spotlight) => (
            <motion.div key={spotlight.title} {...fadeUp}>
              <Surface as="article" tone="glass" padding="md" className="h-full backdrop-blur-sm">
                <span className="eyebrow-text text-white/70">{spotlight.eyebrow}</span>
                <h3 className="mt-3 text-xl font-semibold text-white">{spotlight.title}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{spotlight.description}</p>
                <Link
                  href={spotlight.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-200 underline-offset-4 hover:text-brand-100 hover:underline"
                >
                  {spotlight.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Surface>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
