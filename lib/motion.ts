/**
 * Centralized animation presets for consistent motion across all pages.
 * Import these instead of defining inline variants per component.
 *
 * Usage:
 *   import { fadeUp, stagger, containerVariants } from '@/lib/motion'
 *   <motion.div {...fadeUp}>...</motion.div>
 *   <motion.div variants={containerVariants} initial="hidden" whileInView="visible">
 *     <motion.div variants={itemVariants}>...</motion.div>
 *   </motion.div>
 */

/* ── Spread presets (use directly on motion elements) ── */

/** Fade up 24px with brand easing. The default entrance animation. */
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
} as const

/** Stronger fade-up (32px) for hero sections. */
export const fadeUpHero = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
} as const

/** Simple opacity fade. Use for subtle reveals. */
export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.5 },
} as const

/** Stagger child — use as spread preset for individual items in a list. */
export const stagger = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
} as const

/* ── Variant presets (use with variants prop) ── */

/** Container that staggers its children. Pair with itemVariants. */
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
} as const

/** Child item within a stagger container. */
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
} as const

/** Scale-in with subtle bounce. Good for cards, modals. */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
} as const

/* ── Transition presets ── */

/** Brand spring — snappy for interactive elements (hovers, taps). */
export const spring = { type: 'spring' as const, stiffness: 400, damping: 17 }

/** Smooth ease-out for layout transitions. */
export const smooth = { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }

/* ── Interaction presets ── */

/** Card hover: subtle lift + scale. */
export const hoverLift = { scale: 1.02, y: -2 }

/** Button tap: subtle press. */
export const tapPress = { scale: 0.98 }
