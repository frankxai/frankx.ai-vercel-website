// Blog types and constants - safe for client-side imports
// Separated from lib/blog.ts which uses Node.js fs module

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  tags: string[]
  image?: string
  readingTime: string
  keywords?: string[]
  readingGoal?: string
  content: string
  featured?: boolean
  sourceCategory?: string  // Track subdirectory category
}

// Category display names for UI
export const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  'ai-tech': 'AI & Technology',
  'conscious': 'Conscious AI',
  'creator': 'Creator Economy',
  'general': 'Featured',
  'music': 'AI Music',
  'personal-dev': 'Personal Development'
}

// Category header images - generated with Nano Banana for V4
export const CATEGORY_HEADER_IMAGES: Record<string, string> = {
  'ai-tech': '/images/blog-ai-tech-header.png',
  'conscious': '/images/blog-conscious-header.png',
  'creator': '/images/blog-creator-header.png',
  'general': '/images/hero-ai-hub-v4.png',  // Use hero for general/featured
  'music': '/images/blog-music-header.png',
  'personal-dev': '/images/blog-personal-dev-header.png'
}
