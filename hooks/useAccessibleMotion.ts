import { useReducedMotion } from 'framer-motion'

/**
 * Hook for creating accessibility-friendly animations
 * Respects user's prefers-reduced-motion settings
 */
export function useAccessibleMotion() {
  const shouldReduceMotion = useReducedMotion()

  return {
    // Standard transition timing
    transition: shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },

    // Fast transitions for UI feedback
    transitionFast: shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.25, ease: [0.4, 0, 0.2, 1] },

    // Slow, dramatic transitions
    transitionSlow: shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },

    // Simple fade in
    fadeIn: shouldReduceMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : { initial: { opacity: 0 }, animate: { opacity: 1 } },

    // Fade in with slide up
    slideUp: shouldReduceMotion
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
      : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },

    // Fade in with slide down
    slideDown: shouldReduceMotion
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
      : { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 } },

    // Scale up
    scaleUp: shouldReduceMotion
      ? { initial: { opacity: 1, scale: 1 }, animate: { opacity: 1, scale: 1 } }
      : { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } },

    // Helper to check if motion is reduced
    shouldReduceMotion,
  }
}
