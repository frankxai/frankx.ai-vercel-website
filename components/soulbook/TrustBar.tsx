'use client'

import { motion } from 'framer-motion'

const stats = [
  { value: '7', label: 'Core Pillars' },
  { value: '3', label: 'Life Book Programs' },
  { value: '24', label: 'Live Sessions' },
  { value: '30-Day', label: 'Money-Back Guarantee' },
]

export default function TrustBar() {
  return (
    <section className="relative py-8 border-y border-white/[0.06] bg-white/[0.01]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs text-white/40 mt-1 tracking-wide uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
