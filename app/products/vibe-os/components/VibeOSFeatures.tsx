'use client'

import { motion } from 'framer-motion'
import { Clock, Heart, Calendar, DollarSign } from 'lucide-react'

interface VibeOSFeaturesProps {
  transformation: string[]
}

const icons = [Clock, Heart, Calendar, DollarSign]
const gradients = [
  'from-emerald-500 to-cyan-500',
  'from-rose-500 to-orange-500',
  'from-violet-500 to-purple-500',
  'from-amber-500 to-yellow-500'
]

export default function VibeOSFeatures({ transformation }: VibeOSFeaturesProps) {
  return (
    <section className="relative py-24">
      {/* Section Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-space to-void" />

      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="glow-badge glow-badge-emerald mb-4 inline-flex">
            What Changes
          </span>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Work with your creative energy
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            Stop fighting your energy. Start working with your natural creative rhythms.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {transformation.map((item, index) => {
            const Icon = icons[index % icons.length]
            const gradient = gradients[index % gradients.length]

            return (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group spotlight-card hover-lift p-8"
              >
                {/* Icon */}
                <div className={`mb-6 inline-flex rounded-2xl bg-gradient-to-br ${gradient} p-3 shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <p className="text-lg leading-relaxed text-white/90">
                  {item}
                </p>

                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
