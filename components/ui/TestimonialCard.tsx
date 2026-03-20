'use client'

import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

interface Testimonial {
  quote: string
  name: string
  role: string
  context: string
  rating?: number
}

export function TestimonialCard({ testimonial, index = 0 }: { testimonial: Testimonial; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm"
    >
      {testimonial.rating && (
        <div className="mb-3 flex gap-1">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
      )}
      <p className="mb-4 leading-relaxed text-slate-300">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div>
        <p className="font-semibold text-white">{testimonial.name}</p>
        <p className="text-sm text-slate-500">{testimonial.role}</p>
      </div>
    </motion.div>
  )
}

export function TestimonialGrid({ testimonials, limit = 3 }: { testimonials: Testimonial[]; limit?: number }) {
  const shown = testimonials.slice(0, limit)
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {shown.map((t, i) => (
        <TestimonialCard key={t.name} testimonial={t} index={i} />
      ))}
    </div>
  )
}
