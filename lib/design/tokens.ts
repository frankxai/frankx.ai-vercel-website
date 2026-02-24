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

// =============================================================================
// STATE LAYERS — Material Design 3 interactive state system
// M3 spec: hover=8%, pressed=12%, focused=12%, dragged=16%
// Usage: add these as overlay layers on interactive elements
// =============================================================================

export const stateLayer = {
  /** Hover state — subtle brightening (M3: 8% white overlay) */
  hover: 'before:absolute before:inset-0 before:rounded-[inherit] before:bg-white/[0.08] before:opacity-0 before:transition-opacity before:duration-[150ms] hover:before:opacity-100',
  /** Pressed/active state — stronger confirmation (M3: 12% white overlay) */
  pressed: 'active:before:opacity-100 active:before:bg-white/[0.12]',
  /** Focus visible state — keyboard accessibility ring */
  focused: 'focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none',
  /** Dragged state — elevated treatment (M3: 16% white overlay) */
  dragged: 'before:bg-white/[0.16]',
} as const

/**
 * Interactive surface: combines relative positioning + state layer support.
 * Apply to any clickable/focusable container:
 *   <button className={cn(interactiveSurface, 'your-classes')}>
 */
export const interactiveSurface = 'relative overflow-hidden cursor-pointer select-none'

// =============================================================================
// FOCUS RINGS — Apple HIG + WCAG 2.2 compliant focus indicators
// Apple HIG: 3px offset ring in system accent color at 60% opacity
// WCAG 2.2: 3px minimum, sufficient contrast ratio
// =============================================================================

export const focusRing = {
  /** Default — emerald for CTAs and primary actions */
  default: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]',
  /** Brand — purple for brand-tinted elements */
  brand: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]',
  /** Ghost — white ring for light contexts */
  ghost: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]',
  /** Inset — for elements where offset ring would clip */
  inset: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400/60',
} as const

// =============================================================================
// TOUCH TARGETS — Apple HIG + WCAG 2.2 minimum tap regions
// Apple HIG: 44×44pt minimum. WCAG 2.2 SC 2.5.8: 24×24px minimum
// =============================================================================

export const touchTarget = {
  /** Standard — 44px minimum (Apple HIG + WCAG 2.2 recommended) */
  standard: 'min-h-[44px] min-w-[44px]',
  /** Large — 52px for primary CTAs */
  large: 'min-h-[52px] min-w-[52px]',
  /** Compact — 36px for dense UI (only with extra spacing) */
  compact: 'min-h-[36px] min-w-[36px]',
} as const

// =============================================================================
// CONTENT HIERARCHY — Apple HIG vibrancy-inspired text hierarchy
// Mirrors the surface system: primary > secondary > tertiary > muted
// =============================================================================

export const contentHierarchy = {
  /** Primary — high-contrast titles and key values */
  primary: 'text-white/95',
  /** Secondary — supporting text, descriptions */
  secondary: 'text-white/72',
  /** Tertiary — metadata, timestamps, captions */
  tertiary: 'text-white/48',
  /** Muted — disabled, placeholder text */
  muted: 'text-white/32',
  /** Inverted — text on light/colored surfaces */
  inverted: 'text-[#0a0a0b]/90',
} as const

export type TypographyKey = keyof typeof typography
export type SectionSpacingKey = keyof typeof sectionSpacing
export type SurfaceKey = keyof typeof surface
export type StateLayerKey = keyof typeof stateLayer
export type FocusRingKey = keyof typeof focusRing
export type ContentHierarchyKey = keyof typeof contentHierarchy

// =============================================================================
// ELEVATION — 6-level shadow system (Vercel/Linear-inspired mathematics)
// Elevation communicates depth and interaction state.
// Higher = further from the base plane = more prominent in the visual hierarchy.
// =============================================================================

export const elevation = {
  /** none — flush with surface */
  none: 'shadow-none',
  /** sm — hovered row, pill, micro-interaction */
  sm: 'shadow-[0_1px_3px_0_rgb(0,0,0,0.3),0_1px_2px_-1px_rgb(0,0,0,0.3)]',
  /** md — card resting state */
  md: 'shadow-[0_4px_6px_-1px_rgb(0,0,0,0.35),0_2px_4px_-2px_rgb(0,0,0,0.35)]',
  /** lg — card hover, dropdown, popover */
  lg: 'shadow-[0_10px_15px_-3px_rgb(0,0,0,0.4),0_4px_6px_-4px_rgb(0,0,0,0.4)]',
  /** xl — modal, drawer, command palette */
  xl: 'shadow-[0_20px_25px_-5px_rgb(0,0,0,0.45),0_8px_10px_-6px_rgb(0,0,0,0.45)]',
  /** 2xl — hero, maximum prominence */
  '2xl': 'shadow-[0_40px_60px_-12px_rgb(0,0,0,0.55)]',
  // Brand-tinted — color reinforces the surface's domain
  emerald: 'shadow-[0_20px_40px_-12px_rgb(16,185,129,0.25),0_4px_6px_-1px_rgb(0,0,0,0.3)]',
  cyan:    'shadow-[0_20px_40px_-12px_rgb(67,191,227,0.25),0_4px_6px_-1px_rgb(0,0,0,0.3)]',
  purple:  'shadow-[0_20px_40px_-12px_rgb(171,71,199,0.25),0_4px_6px_-1px_rgb(0,0,0,0.3)]',
  gold:    'shadow-[0_20px_40px_-12px_rgb(245,158,11,0.25),0_4px_6px_-1px_rgb(0,0,0,0.3)]',
} as const

// =============================================================================
// BORDER RADIUS — Semantic scale (named for context, not size)
// =============================================================================

export const radius = {
  /** xs — inline badges, status dots */
  xs: 'rounded-sm',       // 2px
  /** sm — inputs, form controls */
  sm: 'rounded',          // 4px
  /** md — tags, small buttons */
  md: 'rounded-lg',       // 8px
  /** lg — standard buttons, menu items */
  lg: 'rounded-xl',       // 12px
  /** xl — cards, content blocks */
  xl: 'rounded-2xl',      // 16px
  /** 2xl — feature cards, primary surfaces */
  '2xl': 'rounded-3xl',   // 24px (current default)
  /** 3xl — hero containers, image frames */
  '3xl': 'rounded-[32px]',
  /** full — pills, avatars, icon buttons */
  full: 'rounded-full',
} as const

// =============================================================================
// GRADIENTS — Systematic gradient token system
// Replaces hardcoded gradient values. Use text.* variants with bg-clip-text.
// =============================================================================

export const gradients = {
  brand:     'bg-gradient-to-r from-[#ab47c7] to-[#43bfe3]',
  brandDiag: 'bg-gradient-to-br from-[#ab47c7] via-[#7c3aed] to-[#43bfe3]',
  emerald:   'bg-gradient-to-r from-[#10b981] to-[#06b6d4]',
  gold:      'bg-gradient-to-r from-[#f59e0b] to-[#f97316]',
  arcanea:   'bg-gradient-to-br from-[#1e0a3c] via-[#7c3aed] to-[#ab47c7]',
  text: {
    brand:   'bg-gradient-to-r from-[#ab47c7] to-[#43bfe3] bg-clip-text text-transparent',
    emerald: 'bg-gradient-to-r from-[#10b981] to-[#34d399] bg-clip-text text-transparent',
    gold:    'bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] bg-clip-text text-transparent',
    cyan:    'bg-gradient-to-r from-[#43bfe3] to-[#38bdf8] bg-clip-text text-transparent',
  },
} as const

// =============================================================================
// LINE HEIGHTS — Semantic scale for text rhythm
// Named for reading context, not raw values
// =============================================================================

export const lineHeight = {
  /** display — hero numbers (1.0) */
  display:    'leading-none',
  /** headline — h1, h2 (1.25) */
  headline:   'leading-tight',
  /** subheading — h3, h4 (1.375) */
  subheading: 'leading-snug',
  /** ui — buttons, labels, navigation (1.5) */
  ui:         'leading-normal',
  /** body — paragraph text (1.625) */
  body:       'leading-relaxed',
  /** reading — blog, long-form content (1.75) */
  reading:    'leading-loose',
} as const

// =============================================================================
// LETTER SPACING — Semantic tracking scale
// =============================================================================

export const letterSpacing = {
  /** display — very tight, large hero text (-0.05em) */
  display: 'tracking-tighter',
  /** headline — h1, h2 (-0.025em) */
  headline: 'tracking-tight',
  /** body — no tracking (0) */
  body: 'tracking-normal',
  /** ui — form labels, button text (+0.025em) */
  ui: 'tracking-wide',
  /** caps — all-caps labels (+0.05em) */
  caps: 'tracking-wider',
  /** eyebrow — section labels (+0.25em) */
  eyebrow: 'tracking-[0.25em]',
} as const

// =============================================================================
// COMPONENT SPACING — Internal padding on 4pt grid
// Different from sectionSpacing (outer rhythm). Use inside components/cards.
// =============================================================================

export const componentPadding = {
  /** xs — icon buttons, dense items (8px) */
  xs: 'p-2',
  /** sm — compact buttons, badges (12px) */
  sm: 'p-3',
  /** md — standard buttons, list items (16px) */
  md: 'p-4',
  /** lg — cards, form groups (24px) */
  lg: 'p-6',
  /** xl — feature cards, primary panels (32px) */
  xl: 'p-8',
  /** 2xl — hero cards, max-padding surfaces (40px) */
  '2xl': 'p-10',
} as const

export type ElevationKey = keyof typeof elevation
export type RadiusKey = keyof typeof radius
export type LineHeightKey = keyof typeof lineHeight
export type LetterSpacingKey = keyof typeof letterSpacing
export type ComponentPaddingKey = keyof typeof componentPadding
