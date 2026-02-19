/**
 * FrankX Social Links - Central Configuration
 *
 * 🔒 SINGLE SOURCE OF TRUTH for all social media links
 *
 * Reference: /mnt/c/Users/Frank/FrankX/BRAND_IDENTITY.md
 *
 * IMPORTANT: These links are canonical. If you need to update them,
 * update BRAND_IDENTITY.md first, then propagate changes here.
 *
 * Last Synced: 2026-01-13
 */

export interface SocialLink {
  name: string
  username: string
  url: string
  handle?: string
  icon: string // Lucide icon name
  primary: boolean
  description?: string
}

/**
 * Canonical social media profiles
 * DO NOT modify these without updating BRAND_IDENTITY.md first
 */
export const SOCIAL_PROFILES: Record<string, SocialLink> = {
  x: {
    name: 'X (Twitter)',
    username: 'frankxeth',
    handle: '@frankxeth',
    url: 'https://x.com/frankxeth',
    icon: 'Twitter', // Lucide icon name (Twitter/X uses same icon)
    primary: true,
    description: 'Daily thoughts, AI insights, creator tips'
  },
  linkedin: {
    name: 'LinkedIn',
    username: 'frank-x-riemer',
    url: 'https://www.linkedin.com/in/frank-x-riemer/',
    icon: 'Linkedin',
    primary: true,
    description: 'Professional content, enterprise AI, networking'
  },
  instagram: {
    name: 'Instagram',
    username: 'frank_riemer',
    handle: '@frank_riemer',
    url: 'https://www.instagram.com/frank_riemer/',
    icon: 'Instagram',
    primary: true,
    description: 'Personal journey, studio life, visual storytelling'
  },
  suno: {
    name: 'Suno',
    username: 'frankx',
    handle: '@frankx',
    url: 'https://suno.com/@frankx',
    icon: 'Music', // Suno doesn't have a Lucide icon, use Music
    primary: true,
    description: 'AI music creation, Vibe OS sessions, sonic rituals'
  },
  linktree: {
    name: 'Linktree',
    username: 'frankx.ai',
    url: 'https://linktr.ee/frankx.ai',
    icon: 'Link',
    primary: false,
    description: 'All links in one place'
  },
  github: {
    name: 'GitHub',
    username: 'frankxai',
    url: 'https://github.com/frankxai',
    icon: 'Github',
    primary: false,
    description: 'Open source projects, Agentic Creator OS'
  }
} as const

/**
 * Primary social links (for footer, about page, etc.)
 */
export const PRIMARY_SOCIAL_LINKS = Object.values(SOCIAL_PROFILES).filter(
  profile => profile.primary
)

/**
 * All social links (including secondary)
 */
export const ALL_SOCIAL_LINKS = Object.values(SOCIAL_PROFILES)

/**
 * Get social link by platform key
 */
export function getSocialLink(platform: keyof typeof SOCIAL_PROFILES): SocialLink {
  return SOCIAL_PROFILES[platform]
}

/**
 * Generate share URLs for blog posts and content
 */
export const SHARE_URLS = {
  /**
   * Generate Twitter/X share URL
   * @param text - Tweet text
   * @param url - URL to share
   * @param via - Twitter handle (without @)
   */
  twitter: (text: string, url: string, via = 'frankxeth') => {
    const params = new URLSearchParams({
      text,
      url,
      via
    })
    return `https://twitter.com/intent/tweet?${params.toString()}`
  },

  /**
   * Generate LinkedIn share URL
   * @param url - URL to share
   */
  linkedin: (url: string) => {
    const params = new URLSearchParams({ url })
    return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`
  },

  /**
   * Generate email share
   * @param subject - Email subject
   * @param body - Email body
   */
  email: (subject: string, body: string) => {
    const params = new URLSearchParams({
      subject,
      body
    })
    return `mailto:?${params.toString()}`
  },

  whatsapp: (text: string, url: string) => {
    const params = new URLSearchParams({ text: `${text} ${url}` })
    return `https://wa.me/?${params.toString()}`
  },

  telegram: (text: string, url: string) => {
    const params = new URLSearchParams({ text, url })
    return `https://t.me/share/url?${params.toString()}`
  },

  facebook: (url: string) => {
    const params = new URLSearchParams({ u: url })
    return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`
  },
} as const

/**
 * Contact information
 */
export const CONTACT_INFO = {
  email: {
    primary: 'hello@frankx.ai',
    label: 'Email FrankX',
    subject: 'Creative AI Collaboration'
  },
  website: {
    primary: 'https://frankx.ai',
    label: 'FrankX.AI'
  }
} as const

/**
 * Schema.org sameAs array for Person/Organization markup
 * Use this in structured data
 */
export const SCHEMA_SAME_AS = PRIMARY_SOCIAL_LINKS.map(link => link.url)

/**
 * Social meta tags for Open Graph and Twitter Cards
 */
export const SOCIAL_META = {
  site: '@frankxeth',
  creator: '@frankxeth',
  handle: '@frankxeth'
} as const

/**
 * 🚨 DEPRECATED LINKS - DO NOT USE
 *
 * These were found in the codebase and are INCORRECT.
 * If you see these anywhere, replace them with the correct links above.
 */
export const DEPRECATED_LINKS = {
  '❌ linkedin.com/in/frankxai': '✅ Use SOCIAL_PROFILES.linkedin.url instead',
  '❌ linkedin.com/in/frankzickert': '✅ Wrong person! Use SOCIAL_PROFILES.linkedin.url',
  '❌ suno.com/@frankxai': '✅ Use SOCIAL_PROFILES.suno.url instead',
  '❌ twitter.com/frankxai': '✅ Use SOCIAL_PROFILES.x.url instead',
  '❌ x.com/frankxai': '✅ Use SOCIAL_PROFILES.x.url instead'
} as const

/**
 * Type-safe helper for social icons
 */
export type SocialPlatform = keyof typeof SOCIAL_PROFILES

/**
 * Validation function to check if a URL is a correct FrankX social link
 */
export function isValidFrankXSocialUrl(url: string): boolean {
  return ALL_SOCIAL_LINKS.some(link => link.url === url)
}

/**
 * Get incorrect/outdated link suggestions
 */
export function getCorrectSocialUrl(incorrectUrl: string): string | null {
  const urlLower = incorrectUrl.toLowerCase()

  if (urlLower.includes('linkedin.com/in/frankxai') ||
      urlLower.includes('linkedin.com/in/frankzickert')) {
    return SOCIAL_PROFILES.linkedin.url
  }

  if (urlLower.includes('suno.com/@frankxai')) {
    return SOCIAL_PROFILES.suno.url
  }

  if (urlLower.includes('twitter.com/frankxai') ||
      urlLower.includes('x.com/frankxai')) {
    return SOCIAL_PROFILES.x.url
  }

  return null
}
