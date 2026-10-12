// Life Book Data - The three transformative journeys through the Soulbook framework

import { Pillar, getPillarsForLifeBook } from './pillars'

export interface LifeBook {
  id: string
  slug: string
  title: string
  tagline: string
  subtitle: string
  description: string
  shortDescription: string
  color: string
  gradient: string
  accentGradient: string
  icon: string
  duration: string
  pillars: Pillar[]
  outcomes: string[]
  forWho: string[]
  testimonials: Testimonial[]
  image?: string
}

export interface Testimonial {
  name: string
  role: string
  quote: string
  avatar: string
  metric?: string
}

export const lifeBooks: LifeBook[] = [
  {
    id: 'life-symphony',
    slug: 'life-symphony',
    title: 'Life Symphony',
    tagline: 'Orchestrate Your Complete Transformation',
    subtitle: 'The Full 7-Pillar Integration Journey',
    description:
      'A comprehensive 12-week journey integrating all 7 pillars of conscious living. This is for those ready to transform every area of their life in a harmonious, interconnected way.',
    shortDescription:
      'Complete 7-pillar transformation over 12 weeks. Transform every area of your life.',
    color: 'amber',
    gradient: 'from-amber-400 via-yellow-500 to-orange-600',
    accentGradient: 'from-yellow-300 via-amber-400 to-orange-500',
    icon: '🎼',
    image: '/images/soulbook/life-symphony.png',
    duration: '12 weeks',
    pillars: getPillarsForLifeBook('symphony'),
    outcomes: [
      'All 7 pillars, and how they connect',
      'Self-awareness practices',
      'Emotional intelligence, and how to develop it',
      'Relationship patterns',
      'Purpose and direction',
      'Building a creative practice',
    ],
    forWho: [
      'Ready for comprehensive change',
      'Want to transform multiple life areas',
      'Committed to 12-week journey',
      'Value community support',
    ],
    testimonials: [],
  },
  {
    id: 'golden-path',
    slug: 'golden-path',
    title: 'Golden Path',
    tagline: 'Your Accelerated 4-Week Breakthrough',
    subtitle: 'Core Pillar Intensive Program',
    description:
      'A focused 4-week journey targeting the 3 most transformative pillars: Consciousness, Emotional Mastery, and Purpose. Perfect for those seeking rapid shifts with less time commitment.',
    shortDescription:
      '4-week intensive on the 3 most powerful pillars. Rapid transformation in less time.',
    color: 'purple',
    gradient: 'from-purple-400 via-violet-500 to-indigo-600',
    accentGradient: 'from-violet-400 via-purple-500 to-indigo-500',
    icon: '🛤️',
    image: '/images/soulbook/golden-path.png',
    duration: '4 weeks',
    pillars: getPillarsForLifeBook('path'),
    outcomes: [
      'Self-awareness practices',
      'Core emotional patterns, and how to work with them',
      'Purpose, and how to explore it',
      'A roadmap for what to work on next',
    ],
    forWho: [
      'Want rapid transformation',
      'Have limited time availability',
      'Prefer focused, intensive work',
      'Want to test the framework first',
    ],
    testimonials: [],
  },
  {
    id: 'seven-pillars',
    slug: 'seven-pillars',
    title: '7 Pillars',
    tagline: 'Master Each Foundation Systematically',
    subtitle: 'Deep-Dive Individual Pillar Courses',
    description:
      'Seven separate intensive courses, each devoted to mastering one pillar. Take them in order or follow your intuition. For those who want comprehensive expertise in each area.',
    shortDescription:
      '7 separate courses, one for each pillar. Master each foundation systematically.',
    color: 'emerald',
    gradient: 'from-emerald-400 via-green-500 to-teal-600',
    accentGradient: 'from-green-400 via-emerald-500 to-teal-500',
    icon: '🗽',
    image: '/images/soulbook/seven-pillars.png',
    duration: '7 weeks (one pillar per week)',
    pillars: getPillarsForLifeBook('pillars'),
    outcomes: [
      'Each pillar in depth, one per week',
      'Exercises and tools for each pillar',
      'How to teach the pillars to others',
      'How the 7 pillars fit together',
    ],
    forWho: [
      'Want to master each pillar deeply',
      'Prefer systematic learning',
      'Plan to become a practitioner',
      'Value comprehensive expertise',
    ],
    testimonials: [],
  },
]

// Helper functions
export function getLifeBookBySlug(slug: string): LifeBook | undefined {
  return lifeBooks.find((book) => book.slug === slug)
}

export function getLifeBookById(id: string): LifeBook | undefined {
  return lifeBooks.find((book) => book.id === id)
}

export const philosophyStatements = [
  {
    title: 'Transformation is a Journey',
    description:
      'Sustainable change happens gradually, through consistent practice and compassionate self-reflection.',
    icon: '🌱',
  },
  {
    title: 'You Already Have the Answers',
    description:
      "The Soulbook framework isn't about adding new things—it's about uncovering what's already within you.",
    icon: '💎',
  },
  {
    title: 'Integration Over Information',
    description:
      "Knowing isn't enough. We focus on embodied transformation that integrates into daily life.",
    icon: '🔄',
  },
  {
    title: 'Community Accelerates Growth',
    description:
      'We rise together. The collective energy of like-minded seekers amplifies individual transformation.',
    icon: '🤝',
  },
]
