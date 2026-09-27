'use client'

import { motion } from 'framer-motion'
import { Music, Zap, Target, Award } from 'lucide-react'
import type { ProductSocialProofStat } from '@/types/products'

interface VibeOSSocialProofProps {
  stats: ProductSocialProofStat[]
}

const statIcons = [Music, Zap, Target, Award]
const statColors = ['cyan', 'emerald', 'violet', 'amber'] as const

export default function VibeOSSocialProof({ stats }: VibeOSSocialProofProps) {
  return (
    <section className="relative py-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-space via-void to-space" />

      {/* Aurora Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_40%_at_50%_100%,rgba(6,182,212,0.1),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = statIcons[index % statIcons.length]
            const color = statColors[index % statColors.length]

            const colorClasses = {
              cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
              emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
              violet: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
              amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
            }

            const numberClasses = {
              cyan: 'from-cyan-300 to-cyan-500',
              emerald: 'from-emerald-300 to-emerald-500',
              violet: 'from-violet-300 to-violet-500',
              amber: 'from-amber-300 to-amber-500'
            }

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 text-center backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/[0.04]"
              >
                {/* Icon Badge */}
                <div className={`mx-auto mb-6 inline-flex rounded-2xl border p-4 ${colorClasses[color]}`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* Stat Number */}
                <div className={`bg-gradient-to-b ${numberClasses[color]} bg-clip-text text-5xl font-bold text-transparent`}>
                  {stat.number}
                </div>

                {/* Stat Label */}
                <div className="mt-3 text-sm font-medium uppercase tracking-[0.15em] text-white/50">
                  {stat.label}
                </div>

                {/* Hover Effect */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            )
          })}
        </div>

        {/* Additional Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-white/50"
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-void bg-gradient-to-br from-cyan-400 to-blue-500"
                  style={{ zIndex: 5 - i }}
                />
              ))}
            </div>
            <span>Creators in Early Access</span>
          </div>

          <div className="hidden h-4 w-px bg-white/20 sm:block" />

          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span>4.9/5 Average Rating</span>
          </div>

          <div className="hidden h-4 w-px bg-white/20 sm:block" />

          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Tested in 500+ Sessions</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
