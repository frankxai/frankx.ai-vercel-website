'use client'

import { motion } from 'framer-motion'
import { Gift, Palette, Headphones, TrendingUp } from 'lucide-react'
import type { ProductBonus } from '@/types/products'

interface VibeOSBonusesProps {
  bonuses: ProductBonus[]
}

const bonusIcons = [Palette, Headphones, TrendingUp]

export default function VibeOSBonuses({ bonuses }: VibeOSBonusesProps) {
  return (
    <section className="relative py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-space/30 to-void" />

      {/* Decorative Element */}
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-500/10 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
            <Gift className="h-4 w-4" />
            Bonuses
          </div>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Included With Your Purchase
          </h2>
        </motion.div>

        {/* Bonuses Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {bonuses.map((bonus, index) => {
            const Icon = bonusIcons[index % bonusIcons.length]

            return (
              <motion.div
                key={bonus.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-500/10 to-amber-500/5 p-6 backdrop-blur-sm transition-all hover:border-amber-400/30 hover:shadow-[0_20px_60px_rgba(245,158,11,0.1)]">
                  {/* Value Badge */}
                  <div className="absolute -top-3 right-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                    {bonus.value}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 inline-flex rounded-xl bg-amber-500/20 p-3">
                    <Icon className="h-5 w-5 text-amber-300" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {bonus.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    {bonus.description}
                  </p>

                  {/* Hover Glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
