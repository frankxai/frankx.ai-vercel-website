'use client'

import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

import { testimonials, testimonialIcon } from '@/lib/hub'

const TestimonialIcon = testimonialIcon

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-midnight-950 py-24 px-6">
      <div className="max-w-7xl mx-auto text-white">
        <motion.div className="max-w-3xl" {...fadeUp}>
          <h2 className="text-heading-2 font-semibold text-balance">Trusted across communities and boardrooms</h2>
          <p className="mt-4 text-body text-neutral-300">
            Stories from the leaders, families, and creators who now run intelligence systems that feel
            deeply human.
          </p>
        </motion.div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <motion.article
              key={testimonial.name}
              className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6 backdrop-blur"
              {...fadeUp}
            >
              <TestimonialIcon className="w-8 h-8 text-secondary-400" aria-hidden="true" />
              <p className="mt-4 text-body-sm text-neutral-300 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-6">
                <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                <p className="text-xs text-white/70">{testimonial.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
