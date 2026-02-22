'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

export interface Testimonial {
  quote: string
  author: string
  role: string
  avatar?: string
  initials?: string
  rating?: number
  color?: 'emerald' | 'cyan' | 'violet' | 'amber' | 'rose'
}

interface TestimonialsProps {
  testimonials: Testimonial[]
  title?: string
  subtitle?: string
  variant?: 'grid' | 'carousel' | 'featured'
  columns?: 2 | 3
  showRating?: boolean
}

// ============================================================================
// COLOR MAP
// ============================================================================

const colorMap = {
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
    icon: 'bg-emerald-500/10 text-emerald-400',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    text: 'text-cyan-400',
    icon: 'bg-cyan-500/10 text-cyan-400',
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    text: 'text-violet-400',
    icon: 'bg-violet-500/10 text-violet-400',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
    icon: 'bg-amber-500/10 text-amber-400',
  },
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    text: 'text-rose-400',
    icon: 'bg-rose-500/10 text-rose-400',
  },
}

// ============================================================================
// TESTIMONIAL CARD
// ============================================================================

function TestimonialCard({
  testimonial,
  index,
  showRating = false,
}: {
  testimonial: Testimonial
  index: number
  showRating?: boolean
}) {
  const color = testimonial.color || 'emerald'
  const colors = colorMap[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-white/10 transition-all h-full flex flex-col"
    >
      <Quote className={`w-8 h-8 ${colors.text} opacity-50 mb-4`} />

      {showRating && testimonial.rating && (
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < testimonial.rating! ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`}
            />
          ))}
        </div>
      )}

      <p className="text-white/70 leading-relaxed mb-6 text-sm flex-1">
        "{testimonial.quote}"
      </p>

        <div className="flex items-center gap-3">
        {testimonial.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={testimonial.avatar}
            alt={testimonial.author}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className={`w-10 h-10 rounded-full ${colors.icon} flex items-center justify-center text-sm font-semibold`}>
            {testimonial.initials || testimonial.author.split(' ').map((n) => n[0]).join('')}
          </div>
        )}
        <div>
          <div className="text-sm font-semibold text-white">{testimonial.author}</div>
          <div className="text-xs text-white/40">{testimonial.role}</div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// FEATURED TESTIMONIAL
// ============================================================================

function FeaturedTestimonial({ testimonial }: { testimonial: Testimonial }) {
  const color = testimonial.color || 'emerald'
  const colors = colorMap[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-800/40 p-8 md:p-12"
    >
      {/* Decorative gradient */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 blur-3xl" />

      <div className="relative">
        <Quote className={`w-12 h-12 ${colors.text} opacity-30 mb-6`} />

        <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif-italic text-white/80 leading-relaxed mb-8">
          "{testimonial.quote}"
        </blockquote>

        <div className="flex items-center gap-4">
        {testimonial.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={testimonial.avatar}
            alt={testimonial.author}
            className="w-14 h-14 rounded-full object-cover"
          />
          ) : (
            <div className={`w-14 h-14 rounded-full ${colors.icon} flex items-center justify-center text-lg font-semibold`}>
              {testimonial.initials || testimonial.author.split(' ').map((n) => n[0]).join('')}
            </div>
          )}
          <div>
            <div className="text-lg font-semibold text-white">{testimonial.author}</div>
            <div className="text-sm text-white/50">{testimonial.role}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function Testimonials({
  testimonials,
  title = 'What creators are saying',
  subtitle,
  variant = 'grid',
  columns = 3,
  showRating = false,
}: TestimonialsProps) {
  if (variant === 'featured' && testimonials.length > 0) {
    return (
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          {title && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              {subtitle && (
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-2">
                  {subtitle}
                </p>
              )}
              <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
            </motion.div>
          )}
          <FeaturedTestimonial testimonial={testimonials[0]} />
        </div>
      </section>
    )
  }

  const gridCols = columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {subtitle && (
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-2">
                {subtitle}
              </p>
            )}
            <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
          </motion.div>
        )}

        <div className={`grid gap-6 ${gridCols}`}>
          {testimonials.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.author}
              testimonial={testimonial}
              index={i}
              showRating={showRating}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// PRESET TESTIMONIALS DATA
// ============================================================================

export const creatorTestimonials: Testimonial[] = [
  {
    quote: "FrankX's prompt library changed how I work. I went from spending hours on prompts to having a system that just works.",
    author: 'Alex Rivera',
    role: 'Content Creator',
    color: 'emerald',
  },
  {
    quote: "The Suno tutorials are incredible. I've created over 50 tracks for my podcast using what I learned here.",
    author: 'Maya Johnson',
    role: 'Podcast Host',
    color: 'cyan',
  },
  {
    quote: "Finally, AI resources from someone who actually builds with these tools daily. The difference shows.",
    author: 'David Kim',
    role: 'Indie Developer',
    color: 'violet',
  },
]

export const studentTestimonials: Testimonial[] = [
  {
    quote: "These curated paths saved me months of searching. Started with Oracle AI Foundations, now I'm building production ML systems.",
    author: 'Maria Chen',
    role: 'Software Engineer → ML Engineer',
    color: 'cyan',
  },
  {
    quote: "The Ikigai workshop helped me find my intersection of AI and creativity. Now I'm building AI tools for musicians.",
    author: 'James Rodriguez',
    role: 'Musician → AI Creator',
    color: 'violet',
  },
  {
    quote: "Finally, AI resources that don't feel overwhelming. The structured paths made it easy to know where to start.",
    author: 'Sarah Kim',
    role: 'Marketing Manager',
    color: 'emerald',
  },
]

export const productTestimonials: Testimonial[] = [
  {
    quote: "The Creative AI Toolkit paid for itself in the first week. My content output has tripled without sacrificing quality.",
    author: 'Jessica Taylor',
    role: 'Marketing Director',
    rating: 5,
    color: 'emerald',
  },
  {
    quote: "Vibe OS transformed my music production workflow. I'm creating soundscapes I couldn't have imagined before.",
    author: 'Marcus Lee',
    role: 'Music Producer',
    rating: 5,
    color: 'cyan',
  },
  {
    quote: "As someone who was AI-skeptical, the GenCreator OS made everything click. Now I can't imagine working without it.",
    author: 'Amanda Foster',
    role: 'Freelance Writer',
    rating: 5,
    color: 'violet',
  },
]
