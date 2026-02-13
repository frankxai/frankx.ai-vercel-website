/**
 * Motion Design System
 * Standardized animation durations and easing curves for consistent feel across the site
 */

export const motionDurations = {
  instant: 0.15,
  fast: 0.25,
  normal: 0.4,
  slow: 0.6,
  slowest: 0.8,
} as const

export const motionEasing = {
  // Smooth, natural easing
  smooth: [0.25, 0.1, 0.25, 1] as const,
  // Snappy, responsive easing
  snappy: [0.4, 0, 0.2, 1] as const,
  // Playful bounce
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  // Anticipatory easing (ease-in-out)
  anticipate: [0.42, 0, 0.58, 1] as const,
  // Dramatic entrance
  dramatic: [0.16, 1, 0.3, 1] as const,
} as const

export const motionSpring = {
  gentle: { stiffness: 150, damping: 20 },
  snappy: { stiffness: 300, damping: 30 },
  bouncy: { stiffness: 400, damping: 15 },
  heavy: { stiffness: 100, damping: 25 },
} as const

/**
 * Common viewport settings for scroll-triggered animations
 */
export const viewportSettings = {
  once: { once: true, amount: 0.3 },
  repeat: { once: false, amount: 0.3 },
  full: { once: true, amount: 0.8 },
} as const
