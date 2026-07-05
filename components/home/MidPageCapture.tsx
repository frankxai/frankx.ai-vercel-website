'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { EmailSignup } from '@/components/email-signup'

/**
 * MidPageCapture — Newsletter intercept placed after the Products grid.
 * Appears by scroll 2. Compact, high-contrast, converts visitors before
 * they continue scrolling into hubs.
 */
export default function MidPageCapture() {
  return (
    <section className="py-16 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.07] via-white/[0.02] to-cyan-500/[0.05] p-6 sm:p-8"
        >
          {/* Ambient glows */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-cyan-500/8 blur-3xl" />

          <div className="relative flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
            {/* Left — copy */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3">
                <Zap className="w-3 h-3 text-emerald-400" />
                <span className="text-xs font-medium text-emerald-400 tracking-wide">Signal Loop — weekly dispatch</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-1 leading-snug">
                Follow the build in real time.
              </h2>
              <p className="text-sm text-white/45 max-w-md leading-relaxed">
                One transmission a week — the system I&apos;m shipping, the model breakthrough I&apos;m watching, and the track I made while thinking about both.
              </p>
            </div>

            {/* Right — form */}
            <div className="w-full sm:w-72 flex-shrink-0">
              <EmailSignup
                listType="newsletter"
                placeholder="your@email.com"
                buttonText="Subscribe free"
                compact
              />
              <p className="mt-2 text-[11px] text-white/25 text-center">No spam. Unsubscribe anytime.</p>
            </div>
          </div>

          {/* Proof stats */}
          <div className="relative mt-6 pt-5 border-t border-white/[0.06] flex flex-wrap gap-x-6 gap-y-2">
            {[
              ['12,000+', 'AI songs produced'],
              ['630+', 'skills shipped'],
              ['200+', 'blog guides published'],
              ['7', 'brands being built'],
            ].map(([stat, label]) => (
              <div key={label} className="flex items-baseline gap-1.5">
                <span className="text-sm font-semibold text-white/80">{stat}</span>
                <span className="text-xs text-white/35">{label}</span>
              </div>
            ))}
            <a
              href="/newsletter"
              className="ml-auto inline-flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              View past issues <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
