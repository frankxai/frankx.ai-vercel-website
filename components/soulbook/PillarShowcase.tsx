'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import SoulbookIcon from '@/components/soulbook/SoulbookIcon'
import { pillars } from '@/lib/soulbook/pillars'

const pillarGradients: Record<string, { border: string; glow: string; text: string }> = {
  amber: {
    border: 'from-amber-400/60 to-orange-500/60',
    glow: 'group-hover:shadow-amber-500/20',
    text: 'text-amber-400',
  },
  purple: {
    border: 'from-purple-400/60 to-violet-500/60',
    glow: 'group-hover:shadow-purple-500/20',
    text: 'text-purple-400',
  },
  violet: {
    border: 'from-violet-400/60 to-fuchsia-500/60',
    glow: 'group-hover:shadow-violet-500/20',
    text: 'text-violet-400',
  },
  rose: {
    border: 'from-rose-400/60 to-pink-500/60',
    glow: 'group-hover:shadow-rose-500/20',
    text: 'text-rose-400',
  },
  emerald: {
    border: 'from-emerald-400/60 to-teal-500/60',
    glow: 'group-hover:shadow-emerald-500/20',
    text: 'text-emerald-400',
  },
  blue: {
    border: 'from-blue-400/60 to-cyan-500/60',
    glow: 'group-hover:shadow-blue-500/20',
    text: 'text-blue-400',
  },
  gold: {
    border: 'from-yellow-400/60 to-amber-500/60',
    glow: 'group-hover:shadow-yellow-500/20',
    text: 'text-yellow-400',
  },
}

export default function PillarShowcase() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight-950 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/8 via-transparent to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
            The Framework
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              7 Pillars of Conscious Living
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Seven interconnected foundations. Each one strengthens the others.
            Together, they create lasting transformation.
          </p>
        </motion.div>

        {/* Pillar grid — top row 4, bottom row 3 centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
          {pillars.map((pillar, i) => {
            const colors = pillarGradients[pillar.color] || pillarGradients.amber
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={cn(
                  'group relative rounded-2xl overflow-hidden',
                  'transition-all duration-300',
                  'hover:-translate-y-1 hover:shadow-2xl',
                  colors.glow,
                  // 12-col grid: top 4 items = 3 cols each, bottom 3 = 4 cols each (centered)
                  i < 4 ? 'lg:col-span-3' : 'lg:col-span-4',
                )}
              >
                {/* Gradient top border */}
                <div className={cn(
                  'absolute top-0 inset-x-0 h-[2px]',
                  'bg-gradient-to-r',
                  colors.border,
                )} />

                {/* Card content */}
                <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl h-full group-hover:border-white/10 transition-colors">
                  {/* Number + Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-white/30 tracking-wider">
                      0{pillar.number}
                    </span>
                    <div className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-xl',
                      'bg-white/[0.04] border border-white/[0.08]',
                      'group-hover:bg-white/[0.06] transition-colors',
                    )}>
                      <SoulbookIcon id={pillar.icon} size="md" className={colors.text} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {pillar.shortTitle}
                  </h3>

                  {/* Description — first sentence only */}
                  <p className="text-sm text-white/50 leading-relaxed line-clamp-3">
                    {pillar.description.split('.')[0]}.
                  </p>

                  {/* Keywords */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {pillar.keywords.slice(0, 3).map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2 py-0.5 rounded-md text-[11px] bg-white/[0.04] text-white/40"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom connector line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mt-12 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent origin-center"
        />

        {/* Connection note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center mt-6 text-sm text-white/40 italic"
        >
          Each pillar strengthens the next — awareness reveals identity, identity shapes emotions,
          emotions deepen relationships, and creation circles back to awareness.
        </motion.p>
      </div>
    </section>
  )
}
