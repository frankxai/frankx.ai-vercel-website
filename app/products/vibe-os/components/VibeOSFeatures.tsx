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
            Your Music Production,{' '}
            <span className="text-gradient-tech">Transformed</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            Stop wasting generations. Start shipping tracks you&apos;re proud of.
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

        {/* Comparison Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/5 via-violet-500/5 to-emerald-500/5 p-8 text-center backdrop-blur-sm sm:p-12"
        >
          <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-white/40 line-through">
                Weeks
              </div>
              <div className="mt-2 text-sm text-white/50">
                of experimentation
              </div>
            </div>

            <div className="hidden h-16 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent sm:block" />

            <div className="flex items-center gap-4">
              <svg className="h-8 w-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>

            <div className="hidden h-16 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent sm:block" />

            <div className="text-center">
              <div className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-4xl font-bold text-transparent">
                60–90 min
              </div>
              <div className="mt-2 text-sm text-white/50">
                to finished track
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
