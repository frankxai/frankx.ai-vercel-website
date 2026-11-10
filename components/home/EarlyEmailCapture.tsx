'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { EmailSignup } from '@/components/email-signup'

export function EarlyEmailCapture() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-12 md:py-16 border-t border-white/5">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-emerald-400/60 mb-3">
            Join the Build
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
            Weekly insights on AI systems, music, and creator tools.
          </h2>
          <p className="text-sm text-white/40 mb-6">
            No spam. Real lessons from building in public. Unsubscribe anytime.
          </p>
          <div className="max-w-sm mx-auto">
            <EmailSignup
              listType="newsletter"
              placeholder="your@email.com"
              buttonText="Subscribe"
              compact
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
