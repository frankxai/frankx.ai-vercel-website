'use client'

import { motion } from 'framer-motion'
import { CalendarClock, ChartNoAxesCombined, ListChecks, SlidersHorizontal } from 'lucide-react'
import type { ProductModule } from '@/types/products'

const moduleIcons = [CalendarClock, ListChecks, ChartNoAxesCombined, SlidersHorizontal]

export default function VibeOSModules({ modules }: { modules: ProductModule[] }) {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-void via-space to-void" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-300/70">Proposed scope</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">What the first release may include</h2>
          <p className="mt-4 leading-relaxed text-white/60">
            These are product directions under consideration, not modules you can access today. Interest responses will help narrow the scope.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {modules.map((module, index) => {
            const Icon = moduleIcons[index % moduleIcons.length]
            return (
              <motion.article
                key={module.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="spotlight-card p-7"
              >
                <Icon className="h-5 w-5 text-cyan-300" />
                <h3 className="mt-5 text-lg font-semibold text-white">{module.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{module.description}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
