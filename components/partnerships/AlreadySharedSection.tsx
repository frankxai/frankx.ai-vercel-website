'use client'

import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { MotionSection, MotionItem, fadeUp } from './MotionLayer'

type AlreadySharedSectionProps = {
  items: string[]
}

/**
 * Strategic-alignment tier — credibility band between the hero and the
 * working-reality grid. Renders the explicit, factual list of touchpoints
 * already shared with the partner today. Biases the page toward conversion
 * via reciprocal alignment that is already true.
 *
 * Visual treatment matches the partnerships component family: rounded-2xl
 * cards on white/[0.025] with subtle borders, emerald checkmark accents,
 * 11px tracking 0.25em uppercase eyebrow in emerald-400/60.
 *
 * Motion: section header reveals first, then list items stagger in at 80ms.
 * Detail: checkmark uses tighter stroke (2.5px) + tighter heading tracking.
 */
export function AlreadySharedSection({ items }: AlreadySharedSectionProps) {
  if (!items.length) return null

  return (
    <MotionSection
      aria-labelledby="already-shared-heading"
      className="border-t border-white/5 py-24 lg:py-28"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <MotionItem className="mb-12 max-w-2xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
            What we already share today
          </p>
          <h2
            id="already-shared-heading"
            className="text-3xl sm:text-4xl font-semibold text-white mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            The reciprocal stack, in motion.
          </h2>
          <p className="text-base text-zinc-300 leading-[1.7]">
            Every line below is already true. No pitch, no projection — the
            alignment exists. The conversation is about formalizing it.
          </p>
        </MotionItem>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {items.map((item, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              className="flex items-start gap-3 rounded-2xl bg-white/[0.025] border border-white/[0.08] p-5 transition-all duration-300 hover:bg-white/[0.04] hover:border-emerald-500/25 hover:-translate-y-px"
            >
              <span
                aria-hidden
                className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20"
              >
                <Check
                  className="w-3.5 h-3.5 text-emerald-300"
                  strokeWidth={2.5}
                />
              </span>
              <span className="text-sm text-zinc-300 leading-relaxed">
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </MotionSection>
  )
}
