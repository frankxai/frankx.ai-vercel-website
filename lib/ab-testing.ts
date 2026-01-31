/**
 * A/B Testing Configuration
 *
 * Proper A/B testing using middleware + cookies on a single URL.
 * This avoids SEO issues from /v1, /v2 routes (duplicate content penalty).
 *
 * How it works:
 * 1. Middleware checks for existing variant cookie
 * 2. If no cookie, randomly assigns variant based on weights
 * 3. Sets cookie for consistent experience
 * 4. Page reads cookie and renders appropriate variant
 * 5. Analytics track conversion by variant
 */

export type HomepageVariant = 'elite' | 'premium' | 'control'

export interface ABTestConfig {
  name: string
  variants: {
    id: HomepageVariant
    name: string
    weight: number // 0-100, must sum to 100
    component: string // Component path for reference
  }[]
  cookieName: string
  cookieMaxAge: number // seconds
  enabled: boolean
}

// Homepage A/B Test Configuration
export const homepageTest: ABTestConfig = {
  name: 'homepage-2026-q1',
  cookieName: 'fx-hp-variant',
  cookieMaxAge: 60 * 60 * 24 * 30, // 30 days
  enabled: true,
  variants: [
    {
      id: 'elite',
      name: 'Elite (Current)',
      weight: 50, // 50% traffic
      component: 'HomePageElite',
    },
    {
      id: 'premium',
      name: 'Premium (Raycast-style)',
      weight: 50, // 50% traffic
      component: 'HomePagePremium',
    },
  ],
}

/**
 * Get random variant based on weights
 */
export function getRandomVariant(config: ABTestConfig): HomepageVariant {
  const random = Math.random() * 100
  let cumulative = 0

  for (const variant of config.variants) {
    cumulative += variant.weight
    if (random <= cumulative) {
      return variant.id
    }
  }

  // Fallback to first variant
  return config.variants[0].id
}

/**
 * Parse variant from cookie value
 */
export function parseVariant(cookieValue: string | undefined, config: ABTestConfig): HomepageVariant {
  if (!cookieValue) return getRandomVariant(config)

  const variant = config.variants.find(v => v.id === cookieValue)
  return variant ? variant.id : getRandomVariant(config)
}

/**
 * Analytics event for variant exposure
 */
export function getVariantExposureEvent(variant: HomepageVariant) {
  return {
    event: 'ab_test_exposure',
    test_name: homepageTest.name,
    variant_id: variant,
    variant_name: homepageTest.variants.find(v => v.id === variant)?.name || variant,
  }
}

/**
 * Get variant config by ID
 */
export function getVariantConfig(variant: HomepageVariant) {
  return homepageTest.variants.find(v => v.id === variant)
}
