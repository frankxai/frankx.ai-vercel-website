/**
 * FrankX Motion Presets
 * Reusable Framer Motion animation variants for consistent, premium animations
 */

import { Variants, Transition } from 'framer-motion'

// ============================================================================
// TRANSITION PRESETS
// ============================================================================

export const transitions = {
  /** Smooth ease for most animations */
  smooth: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } as Transition,

  /** Quick snap for micro-interactions */
  snap: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } as Transition,

  /** Gentle ease for page transitions */
  gentle: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } as Transition,

  /** Spring for playful interactions */
  spring: { type: 'spring', stiffness: 300, damping: 30 } as Transition,

  /** Slow spring for hero elements */
  slowSpring: { type: 'spring', stiffness: 100, damping: 20 } as Transition,
}

// ============================================================================
// FADE VARIANTS
// ============================================================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.smooth,
  },
}

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
}

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
}

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
}

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
}

// ============================================================================
// SCALE VARIANTS
// ============================================================================

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.smooth,
  },
}

export const scaleInUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: transitions.gentle,
  },
}

// ============================================================================
// STAGGER CONTAINER VARIANTS
// ============================================================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
}

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

// ============================================================================
// CARD VARIANTS
// ============================================================================

export const cardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    transition: transitions.smooth,
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: transitions.spring,
  },
}

export const cardTap: Variants = {
  rest: { scale: 1 },
  tap: { scale: 0.98 },
}

// ============================================================================
// HERO VARIANTS
// ============================================================================

export const heroTitle: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const heroSubtitle: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.2,
    },
  },
}

export const heroCTA: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.4,
    },
  },
}

// ============================================================================
// BUTTON VARIANTS
// ============================================================================

export const buttonHover: Variants = {
  rest: {
    scale: 1,
    boxShadow: '0 0 0 rgba(16, 185, 129, 0)',
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)',
    transition: transitions.snap,
  },
  tap: {
    scale: 0.98,
  },
}

export const buttonPulse: Variants = {
  rest: {
    boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.4)',
  },
  pulse: {
    boxShadow: [
      '0 0 0 0 rgba(16, 185, 129, 0.4)',
      '0 0 0 10px rgba(16, 185, 129, 0)',
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeOut',
    },
  },
}

// ============================================================================
// SCROLL REVEAL VARIANTS
// ============================================================================

export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const scrollRevealScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Creates a stagger delay for list items
 */
export const getStaggerDelay = (index: number, baseDelay = 0.1) => ({
  delay: index * baseDelay,
})

/**
 * Creates custom fade-in-up with delay
 */
export const fadeInUpWithDelay = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...transitions.smooth, delay },
  },
})

/**
 * Viewport settings for scroll-triggered animations
 */
export const viewportSettings = {
  once: true,
  amount: 0.2,
  margin: '-50px',
}

/**
 * Reduced motion check helper
 */
export const getMotionProps = (shouldReduceMotion: boolean | null) => {
  if (shouldReduceMotion) {
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 1 },
    }
  }
  return {}
}
