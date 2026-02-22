/**
 * FrankX.AI Design Tokens
 *
 * Single source of truth for typography scale, spacing, and color palette.
 * Import these tokens instead of hardcoding values in components.
 */

// =============================================================================
// TYPOGRAPHY SCALE
// =============================================================================

export const typography = {
  h1: 'text-4xl lg:text-5xl font-bold tracking-tight',
  h2: 'text-2xl lg:text-3xl font-semibold tracking-tight',
  h3: 'text-xl lg:text-2xl font-medium',
  body: 'text-base text-neutral-300',
  small: 'text-sm text-neutral-400',
  eyebrow: 'text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70',
} as const

// =============================================================================
// SPACING SCALE — Section padding
// =============================================================================

export const sectionSpacing = {
  /** Standard section padding — use for most sections */
  standard: 'py-24 lg:py-32',
  /** Compact section padding — use for dividers and brand moments */
  compact: 'py-12 lg:py-16',
  /** Hero padding — accounts for nav offset */
  hero: 'pt-16 md:pt-20 pb-24 lg:pb-32',
} as const

// =============================================================================
// SURFACE STYLES — Glass card system (single definition)
// =============================================================================

export const surface = {
  /** Standard glass card — use for most cards */
  glass: 'backdrop-blur-xl bg-white/5 border border-white/10',
  /** Subtle glass — use for hover states and backgrounds */
  subtle: 'bg-white/[0.02] border border-white/5',
  /** Elevated glass — use for modals and overlays */
  elevated: 'backdrop-blur-xl bg-white/[0.08] border border-white/15',
  /** Transparent — border only */
  transparent: 'bg-transparent border border-white/10',
} as const

// =============================================================================
// ACCENT COLORS — Max 4 primary accents
// =============================================================================

export const accents = {
  primary: 'emerald',   // CTAs, success states, primary brand
  secondary: 'cyan',    // Technology, links, secondary actions
  tertiary: 'amber',    // Premium, gold tier, highlights
  neutral: 'white',     // Text, borders, subtle elements
} as const

export type TypographyKey = keyof typeof typography
export type SectionSpacingKey = keyof typeof sectionSpacing
export type SurfaceKey = keyof typeof surface
