'use client'

import { useState, useEffect } from 'react'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  content: string
  avatar?: string
  guideSlug?: string
}

interface GuideTestimonialsProps {
  guideSlug?: string // If provided, show testimonials for specific guide
  className?: string
}

// Sample testimonials (replace with actual data source)
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Content Creator',
    company: 'Independent',
    content: 'The Soulbook guide completely transformed how I approach creative work. Frank\'s frameworks helped me ship 10x more content while feeling more aligned than ever.',
    guideSlug: 'soulbook-guide'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    role: 'Developer',
    company: 'Tech Startup',
    content: 'Vibe OS changed my music creation workflow. I went from struggling with creativity to producing transformative tracks consistently. The AI integration is mind-blowing.',
    guideSlug: 'vibe-os-guide'
  },
  {
    id: '3',
    name: 'Emily Watson',
    role: 'Designer',
    company: 'Freelance',
    content: 'These guides are the perfect blend of practical frameworks and consciousness work. Finally found resources that speak to both my technical and creative sides.',
    guideSlug: 'soulbook-guide'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Entrepreneur',
    company: 'Creator Business',
    content: 'Frank\'s approach to AI-powered creation is unique. Not just tools, but a complete philosophy. My business revenue grew 3x after implementing these systems.',
    guideSlug: 'vibe-os-guide'
  }
]

export default function GuideTestimonials({ guideSlug, className = '' }: GuideTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Filter testimonials if guide slug provided
  const filteredTestimonials = guideSlug
    ? testimonials.filter(t => t.guideSlug === guideSlug)
    : testimonials

  const currentTestimonial = filteredTestimonials[currentIndex]

  // Auto-rotate testimonials - must be called before conditional returns
  useEffect(() => {
    if (filteredTestimonials.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === filteredTestimonials.length - 1 ? 0 : prev + 1
      )
    }, 8000)

    return () => clearInterval(interval)
  }, [currentIndex, filteredTestimonials.length])

  // Early return after hooks
  if (filteredTestimonials.length === 0) {
    return null
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredTestimonials.length - 1 : prev - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === filteredTestimonials.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm p-8 md:p-12">
        {/* Quote icon */}
        <div className="absolute top-8 left-8 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center">
          <Quote className="w-6 h-6 text-cyan-400" />
        </div>

        {/* Testimonial content */}
        <div className="mt-8 space-y-6">
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed italic">
            "{currentTestimonial.content}"
          </p>

          <div className="flex items-center gap-4">
            {currentTestimonial.avatar ? (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                {currentTestimonial.name.charAt(0)}
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                {currentTestimonial.name.charAt(0)}
              </div>
            )}

            <div>
              <div className="text-white font-semibold">{currentTestimonial.name}</div>
              <div className="text-sm text-gray-400">
                {currentTestimonial.role}
                {currentTestimonial.company && ` • ${currentTestimonial.company}`}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {filteredTestimonials.length > 1 && (
          <div className="absolute bottom-8 right-8 flex items-center gap-2">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="text-xs text-gray-500 px-3">
              {currentIndex + 1} / {filteredTestimonials.length}
            </div>

            <button
              onClick={goToNext}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    </div>
  )
}
