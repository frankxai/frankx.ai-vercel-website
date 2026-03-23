'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { lifeBooks } from '@/lib/soulbook/soulbook-data'

// Collect all testimonials from life books
const allTestimonials = lifeBooks.flatMap((book) =>
  book.testimonials.map((t) => ({
    ...t,
    program: book.title,
    programColor: book.color,
  }))
)

const colorMap: Record<string, { badge: string; avatar: string }> = {
  amber: {
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    avatar: 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-300',
  },
  purple: {
    badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    avatar: 'bg-gradient-to-br from-purple-500/20 to-violet-500/20 text-purple-300',
  },
  emerald: {
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    avatar: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-300',
  },
}

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight-950 to-black" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
            Real Results
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Transformations That Speak
            </span>
          </h2>
        </motion.div>

        {/* Testimonials grid — 2 columns */}
        <div className="grid md:grid-cols-2 gap-6">
          {allTestimonials.map((testimonial, i) => {
            const colors = colorMap[testimonial.programColor] || colorMap.amber
            return (
              <motion.div
                key={`${testimonial.name}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 hover:border-white/10 transition-colors"
              >
                {/* Quote */}
                <svg className="absolute top-4 right-4 w-8 h-8 text-white/[0.04]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
                </svg>

                <blockquote className="text-white/70 leading-relaxed mb-6 pr-8">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Metric badge */}
                {testimonial.metric && (
                  <div className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium mb-4',
                    colors.badge,
                  )}>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22" />
                    </svg>
                    {testimonial.metric}
                  </div>
                )}

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold',
                    colors.avatar,
                  )}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/90">{testimonial.name}</p>
                    <p className="text-xs text-white/40">{testimonial.role} &middot; {testimonial.program}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
