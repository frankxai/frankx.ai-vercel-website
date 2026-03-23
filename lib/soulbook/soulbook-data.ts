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
  sessions: number
  price: {
    original: number
    current: number
    currency: string
  }
  features: string[]
  pillars: Pillar[]
  outcomes: string[]
  forWho: string[]
  testimonials: Testimonial[]
  guarantee: string
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
    description: 'A comprehensive 12-week journey integrating all 7 pillars of conscious living. This is for those ready to transform every area of their life in a harmonious, interconnected way.',
    shortDescription: 'Complete 7-pillar transformation over 12 weeks. Transform every area of your life.',
    color: 'amber',
    gradient: 'from-amber-400 via-yellow-500 to-orange-600',
    accentGradient: 'from-yellow-300 via-amber-400 to-orange-500',
    icon: '🎼',
    image: '/images/soulbook/life-symphony.png',
    duration: '12 weeks',
    sessions: 24,
    price: {
      original: 997,
      current: 697,
      currency: 'USD'
    },
    features: [
      '24 live coaching sessions (2x weekly)',
      'Complete Soulbook workbook (200+ pages)',
      '7 pillar audio meditations',
      'Weekly video teachings',
      'Private community access',
      '3x monthly group Q&A calls',
      'Lifetime access to recordings',
      'Personal transformation roadmap'
    ],
    pillars: getPillarsForLifeBook('symphony'),
    outcomes: [
      'Complete life transformation',
      'Integrated self-awareness',
      'Mastered emotional intelligence',
      'Healthier relationships',
      'Aligned purpose & direction',
      'Sustainable creative practice'
    ],
    forWho: [
      'Ready for comprehensive change',
      'Want to transform multiple life areas',
      'Committed to 12-week journey',
      'Value community support'
    ],
    testimonials: [
      {
        name: 'Sarah M.',
        role: 'Entrepreneur',
        quote: 'Life Symphony didn\'t just change my business—it transformed every relationship, my health, and my sense of purpose. Worth every moment.',
        avatar: 'SM',
        metric: 'Lost 30lbs, doubled revenue'
      },
      {
        name: 'David K.',
        role: 'Executive',
        quote: 'After 20 years in corporate, I finally found my purpose. The pillar integration work is powerful beyond words.',
        avatar: 'DK',
        metric: 'Left corporate, started dream business'
      }
    ],
    guarantee: '100% money-back guarantee within 30 days if you\'re not transformed'
  },
  {
    id: 'golden-path',
    slug: 'golden-path',
    title: 'Golden Path',
    tagline: 'Your Accelerated 4-Week Breakthrough',
    subtitle: 'Core Pillar Intensive Program',
    description: 'A focused 4-week journey targeting the 3 most transformative pillars: Consciousness, Emotional Mastery, and Purpose. Perfect for those seeking rapid shifts with less time commitment.',
    shortDescription: '4-week intensive on the 3 most powerful pillars. Rapid transformation in less time.',
    color: 'purple',
    gradient: 'from-purple-400 via-violet-500 to-indigo-600',
    accentGradient: 'from-violet-400 via-purple-500 to-indigo-500',
    icon: '🛤️',
    image: '/images/soulbook/golden-path.png',
    duration: '4 weeks',
    sessions: 8,
    price: {
      original: 497,
      current: 297,
      currency: 'USD'
    },
    features: [
      '8 live coaching sessions (2x weekly)',
      'Golden Path workbook (80 pages)',
      '3 pillar audio meditations',
      'Weekly video teachings',
      'Private community access',
      '2x monthly Q&A calls',
      'Lifetime access to recordings',
      'Personal clarity roadmap'
    ],
    pillars: getPillarsForLifeBook('path'),
    outcomes: [
      'Breakthrough in self-awareness',
      'Mastered core emotional patterns',
      'Clear sense of purpose',
      'Foundation for continued growth'
    ],
    forWho: [
      'Want rapid transformation',
      'Have limited time availability',
      'Prefer focused, intensive work',
      'Want to test the framework first'
    ],
    testimonials: [
      {
        name: 'Maria L.',
        role: 'Creative Director',
        quote: 'In just 4 weeks, I cleared 10 years of emotional baggage and found my creative purpose. The focus on 3 pillars was perfect.',
        avatar: 'ML',
        metric: 'Cleared decade-old patterns'
      },
      {
        name: 'James R.',
        role: 'Software Engineer',
        quote: 'Golden Path gave me the awareness tools I needed. Simple, powerful, immediately applicable.',
        avatar: 'JR',
        metric: 'Improved all relationships'
      }
    ],
    guarantee: '100% money-back guarantee within 14 days if you\'re not clearer about your path'
  },
  {
    id: 'seven-pillars',
    slug: 'seven-pillars',
    title: '7 Pillars',
    tagline: 'Master Each Foundation Systematically',
    subtitle: 'Deep-Dive Individual Pillar Courses',
    description: 'Seven separate intensive courses, each devoted to mastering one pillar. Take them in order or follow your intuition. For those who want comprehensive expertise in each area.',
    shortDescription: '7 separate courses, one for each pillar. Master each foundation systematically.',
    color: 'emerald',
    gradient: 'from-emerald-400 via-green-500 to-teal-600',
    accentGradient: 'from-green-400 via-emerald-500 to-teal-500',
    icon: '🗽',
    image: '/images/soulbook/seven-pillars.png',
    duration: '7 weeks (one pillar per week)',
    sessions: 14,
    price: {
      original: 1297,
      current: 897,
      currency: 'USD'
    },
    features: [
      '14 live coaching sessions (2x per pillar)',
      '7 pillar workbooks (40 pages each)',
      '7 pillar audio meditation sets',
      '7 video teaching modules',
      'Private community access',
      'Weekly Q&A calls',
      'Lifetime access to all materials',
      'Complete pillar mastery'
    ],
    pillars: getPillarsForLifeBook('pillars'),
    outcomes: [
      'Expert-level pillar understanding',
      'Complete personal toolkit',
      'Ability to teach others',
      'Integrated life mastery'
    ],
    forWho: [
      'Want to master each pillar deeply',
      'Prefer systematic learning',
      'Plan to become a practitioner',
      'Value comprehensive expertise'
    ],
    testimonials: [
      {
        name: 'Elena V.',
        role: 'Life Coach',
        quote: 'I\'ve done many programs, but the 7 Pillars gave me a framework I now use with all my clients. Absolutely transformative.',
        avatar: 'EV',
        metric: 'Doubled coaching income'
      },
      {
        name: 'Michael T.',
        role: 'Therapist',
        quote: 'As a therapist, I\'ve studied many modalities. The pillar system is the most comprehensive framework I\'ve encountered.',
        avatar: 'MT',
        metric: 'Integrated into therapy practice'
      }
    ],
    guarantee: '100% money-back guarantee within 30 days if you don\'t feel like an expert in each pillar'
  }
]

// Helper functions
export function getLifeBookBySlug(slug: string): LifeBook | undefined {
  return lifeBooks.find(book => book.slug === slug)
}

export function getLifeBookById(id: string): LifeBook | undefined {
  return lifeBooks.find(book => book.id === id)
}

export const pricingTiers = [
  {
    name: 'Starter',
    description: 'Begin your journey with a single pillar',
    price: 97,
    features: [
      '1 pillar deep-dive course',
      'Workbook included',
      '3 meditation tracks',
      'Community access'
    ],
    cta: 'Start Single Pillar',
    popular: false
  },
  {
    name: 'Golden Path',
    description: 'Accelerated 4-week transformation',
    price: 297,
    features: [
      '3 core pillars',
      'Complete workbook',
      '8 coaching sessions',
      'Weekly video teachings',
      'Priority community access'
    ],
    cta: 'Begin Golden Path',
    popular: true
  },
  {
    name: 'Life Symphony',
    description: 'Complete 12-week transformation',
    price: 697,
    features: [
      'All 7 pillars integrated',
      'Full workbook collection',
      '24 coaching sessions',
      'All meditation tracks',
      'Lifetime community access',
      'Monthly Q&A calls'
    ],
    cta: 'Start Transformation',
    popular: false
  },
  {
    name: '7 Pillars Mastery',
    description: 'Expert-level systematic mastery',
    price: 897,
    features: [
      'All 7 pillar courses',
      'Complete workbooks (7)',
      '14 pillar coaching sessions',
      'All meditation sets',
      'Practitioner certification option',
      'Exclusive mastermind access'
    ],
    cta: 'Master All Pillars',
    popular: false
  }
]

export const philosophyStatements = [
  {
    title: 'Transformation is a Journey',
    description: 'Sustainable change happens gradually, through consistent practice and compassionate self-reflection.',
    icon: '🌱'
  },
  {
    title: 'You Already Have the Answers',
    description: 'The Soulbook framework isn\'t about adding new things—it\'s about uncovering what\'s already within you.',
    icon: '💎'
  },
  {
    title: 'Integration Over Information',
    description: 'Knowing isn\'t enough. We focus on embodied transformation that integrates into daily life.',
    icon: '🔄'
  },
  {
    title: 'Community Accelerates Growth',
    description: 'We rise together. The collective energy of like-minded seekers amplifies individual transformation.',
    icon: '🤝'
  }
]
