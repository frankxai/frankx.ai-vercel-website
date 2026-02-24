/**
 * Motion Design System
 * Synthesizes Material Design 3 + Apple HIG spring physics for consistent feel.
 *
 * Three curve families:
 *   - M3 curves:    Spatial transitions between pages/layers
 *   - Easing:       Standard component animations
 *   - Spring:       Physical, interactive animations
 */

// =============================================================================
// DURATIONS
// M3 spec: 50–700ms. Apple HIG: 200–500ms for most transitions.
// =============================================================================

export const motionDurations = {
  instant: 0.1,   // Micro-interactions (M3: 50ms)
  fast: 0.2,      // Hover states, toggles (M3: 200ms)
  normal: 0.35,   // Most component animations (M3: 300–350ms)
  slow: 0.5,      // Page section reveals (M3: 500ms)
  slowest: 0.7,   // Hero entrances, complex sequences (M3: 700ms)
} as const

// =============================================================================
// M3 SPATIAL CURVES — Material Design 3 motion specification
// These are the canonical M3 curves for spatial transitions
// =============================================================================

export const m3Curves = {
  /**
   * Emphasized — spatial navigation entering the screen
   * M3 spec: cubic-bezier(0.2, 0, 0, 1)
   * Use for: elements entering, expanding, growing
   */
  emphasized: [0.2, 0, 0, 1] as const,

  /**
   * Emphasized Decelerate — element arriving (final phase of long transition)
   * M3 spec: cubic-bezier(0.05, 0.7, 0.1, 1)
   * Use for: sheet sliding in, modal arriving
   */
  emphasizedDecelerate: [0.05, 0.7, 0.1, 1] as const,

  /**
   * Emphasized Accelerate — element leaving (exiting screen)
   * M3 spec: cubic-bezier(0.3, 0, 0.8, 0.15)
   * Use for: dismissing sheets, closing modals
   */
  emphasizedAccelerate: [0.3, 0, 0.8, 0.15] as const,

  /**
   * Standard — general component animation
   * M3 spec: cubic-bezier(0.2, 0, 0, 1)
   * Use for: color changes, state transitions
   */
  standard: [0.2, 0, 0, 1] as const,

  /**
   * Standard Decelerate — element coming into focus
   * M3 spec: cubic-bezier(0, 0, 0, 1)
   * Use for: tooltips appearing, chips expanding
   */
  standardDecelerate: [0, 0, 0, 1] as const,

  /**
   * Standard Accelerate — element leaving focus
   * M3 spec: cubic-bezier(0.3, 0, 1, 1)
   * Use for: tooltips disappearing, chips collapsing
   */
  standardAccelerate: [0.3, 0, 1, 1] as const,
} as const

// =============================================================================
// EASING CURVES — Legacy + Apple HIG inspired
// =============================================================================

export const motionEasing = {
  // Smooth, natural easing — default for most animations
  smooth: [0.25, 0.1, 0.25, 1] as const,
  // Snappy, responsive — UI state changes (Apple HIG interactive)
  snappy: [0.4, 0, 0.2, 1] as const,
  // Playful bounce — fun, brand moments
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  // Ease-in-out — balanced, neutral
  anticipate: [0.42, 0, 0.58, 1] as const,
  // Dramatic entrance — hero reveals, hero images
  dramatic: [0.16, 1, 0.3, 1] as const,
  // Apple HIG decelerate — items arriving/settling
  appleSettle: [0, 0.55, 0.45, 1] as const,
  // Apple HIG accelerate — items departing
  appleLeave: [0.55, 0, 1, 0.45] as const,
} as const

// =============================================================================
// SPRING PHYSICS — Physical feel for interactive elements
// Apple HIG and Framer Motion presets
// =============================================================================

export const motionSpring = {
  /** Gentle — ambient, floating elements (background orbs, parallax) */
  gentle: { type: 'spring' as const, stiffness: 150, damping: 20, mass: 1 },
  /** Snappy — responsive UI (buttons, toggles, selection) */
  snappy: { type: 'spring' as const, stiffness: 300, damping: 30, mass: 0.8 },
  /** Bouncy — playful brand moments (mascot, celebrations) */
  bouncy: { type: 'spring' as const, stiffness: 400, damping: 15, mass: 0.9 },
  /** Heavy — premium, weighty elements (modals, drawers) */
  heavy: { type: 'spring' as const, stiffness: 100, damping: 25, mass: 1.2 },
  /**
   * Interactive — Apple HIG: high stiffness + just-right damping.
   * Best for drag-to-release, swipe gestures, cursor-following
   */
  interactive: { type: 'spring' as const, stiffness: 500, damping: 35, mass: 0.7 },
  /**
   * Fluid — Apple HIG: natural list reordering, smooth expand/collapse
   */
  fluid: { type: 'spring' as const, stiffness: 200, damping: 22, mass: 1 },
} as const

// =============================================================================
// REDUCED MOTION — Respect user preference (WCAG 2.2 SC 2.3.3)
// Import and check in components that use animation
// =============================================================================

/**
 * Fallback variants for prefers-reduced-motion.
 * Replace animated variants with instant transitions.
 *
 * @example
 * const shouldReduceMotion = useReducedMotion()
 * <motion.div variants={shouldReduceMotion ? reducedMotionVariants.fade : fadeUp} />
 */
export const reducedMotionVariants = {
  /** Instant fade — replaces any directional slide/scale animation */
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.1 } },
  },
  /** No animation — for users who prefer zero motion */
  none: {
    hidden: {},
    visible: {},
  },
} as const

// =============================================================================
// VIEWPORT SETTINGS — Scroll-triggered animation thresholds
// =============================================================================

export const viewportSettings = {
  once: { once: true, amount: 0.3 },
  repeat: { once: false, amount: 0.3 },
  full: { once: true, amount: 0.8 },
  /** Lazy — triggers just as element enters viewport (great for below-fold) */
  lazy: { once: true, amount: 0.1 },
} as const

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type MotionDurationKey = keyof typeof motionDurations
export type M3CurveKey = keyof typeof m3Curves
export type MotionEasingKey = keyof typeof motionEasing
export type MotionSpringKey = keyof typeof motionSpring

// =============================================================================
// STAGGER CONFIG — List/grid animation orchestration
// Use as the `transition` prop inside a container's variants.visible.
// Pair with itemVariants on children.
// =============================================================================

export const staggerConfig = {
  /** fast — tight lists, dense navigation (40ms) */
  fast:     { staggerChildren: 0.04, delayChildren: 0.05 },
  /** normal — standard card grids, feature lists (70ms) */
  normal:   { staggerChildren: 0.07, delayChildren: 0.1 },
  /** slow — hero content, feature sections (120ms) */
  slow:     { staggerChildren: 0.12, delayChildren: 0.15 },
  /** dramatic — landing page reveals, full-screen entrances (180ms) */
  dramatic: { staggerChildren: 0.18, delayChildren: 0.2 },
} as const

// =============================================================================
// COMPONENT TIMING MAP — Per-component animation durations (seconds)
// Based on Apple HIG motion timing research + Material Design 3 guidelines
// =============================================================================

export const componentTiming = {
  /** buttonTap — immediate tap feedback (100ms) */
  buttonTap:   0.1,
  /** toggle — quick boolean state change (150ms) */
  toggle:      0.15,
  /** tooltip — fast ephemeral UI (120ms) */
  tooltip:     0.12,
  /** dropdown — deliberate popover reveal (200ms) */
  dropdown:    0.2,
  /** modal — intentional context shift (250ms) */
  modal:       0.25,
  /** sheet — spatial drawer transition (350ms) */
  sheet:       0.35,
  /** page — full context navigation (400ms) */
  page:        0.4,
  /** heroEntry — grand entrance, maximum attention (600ms) */
  heroEntry:   0.6,
} as const

// =============================================================================
// ANIMATION VARIANTS — Framer Motion variant objects
// Use with initial="hidden" animate/whileInView="visible".
// (Note: lib/motion.ts has spread-style presets for direct use)
// =============================================================================

export const variants = {
  /** fadeUp — standard entrance: fade + 20px rise with spring */
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 28, mass: 0.8 },
    },
  },
  /** fadeIn — opacity only, no translation */
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  },
  /** scaleIn — modals, cards appearing (gentle spring) */
  scaleIn: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 400, damping: 30 },
    },
  },
  /** slideLeft — content entering from left side */
  slideLeft: {
    hidden: { opacity: 0, x: -24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { ease: [0.05, 0.7, 0.1, 1] as const, duration: 0.35 },
    },
  },
  /** slideRight — content entering from right side */
  slideRight: {
    hidden: { opacity: 0, x: 24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { ease: [0.05, 0.7, 0.1, 1] as const, duration: 0.35 },
    },
  },
} as const

// =============================================================================
// CONTAINER VARIANTS — Parent elements that orchestrate child animations
// Pair these with variants.fadeUp (or similar) on child elements.
// =============================================================================

export const orchestrationVariants = {
  /** list — standard card/list grid */
  list: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: staggerConfig.normal },
  },
  /** dense — tight UI elements (nav, tabs) */
  dense: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: staggerConfig.fast },
  },
  /** feature — hero-area content sections */
  feature: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: staggerConfig.slow },
  },
  /** hero — max-impact landing reveal */
  hero: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: staggerConfig.dramatic },
  },
} as const

// =============================================================================
// GESTURE PRESETS — whileHover + whileTap values
// Use destructured on motion elements: <motion.div {...gesture.liftCard}>
// =============================================================================

export const gesture = {
  /** liftCard — card elevation on hover (4px lift + 1% scale) */
  liftCard:     { whileHover: { y: -4, scale: 1.01 },  whileTap: { scale: 0.99 } },
  /** pressButton — standard CTA press feedback */
  pressButton:  { whileHover: { scale: 1.02 },          whileTap: { scale: 0.97 } },
  /** bounceIcon — playful icon interaction */
  bounceIcon:   { whileHover: { scale: 1.12, rotate: 5 }, whileTap: { scale: 0.9 } },
  /** linkPress — subtle opacity for anchor links */
  linkPress:    { whileTap: { opacity: 0.7 } },
  /** float — ambient floating for decorative elements */
  float: {
    animate: { y: [-4, 4, -4] },
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const },
  },
} as const

export type StaggerConfigKey = keyof typeof staggerConfig
export type VariantsKey = keyof typeof variants
export type OrchestrationVariantsKey = keyof typeof orchestrationVariants
export type GestureKey = keyof typeof gesture
