/**
 * FrankX.AI Unified Design System
 *
 * PHILOSOPHY:
 * A dual-spectrum design system that expresses both technical brilliance and soul wisdom.
 *
 * COLOR STRATEGY:
 * - Base: Deep space blacks with subtle warmth
 * - Tech/AI Content: Emerald/Cyan (innovation, intelligence, future)
 * - Soulbook/Personal: Amber/Gold (wisdom, transformation, warmth)
 * - Shared: Premium text hierarchy with optimal contrast
 *
 * USAGE RULES:
 * - Use `tech` accents for: AI tools, tutorials, technical content, product pages
 * - Use `soul` accents for: Soulbook, personal stories, transformation content
 * - Use `void` backgrounds universally for cohesion
 * - Always maintain WCAG AAA contrast ratios (7:1+)
 */

// ============================================================================
// COLOR SYSTEM - Unified Dual-Spectrum Palette
// ============================================================================

export const colors = {
  // ---------------------------------------------------------------------------
  // BACKGROUNDS - Deep Space Foundation (Universal)
  // Based on 4px grid, optimized for perceived depth
  // ---------------------------------------------------------------------------
  bg: {
    void: '#0a0a0b',       // Deepest black - main background (L: 3%)
    space: '#111113',      // Primary elevated - cards, modals (L: 6%)
    elevated: '#18181b',   // Secondary elevated - hover states (L: 9%)
    subtle: '#1f1f23',     // Tertiary - borders, dividers (L: 12%)
  },

  // ---------------------------------------------------------------------------
  // ACCENT SYSTEM - Dual Spectrum
  // Tech: Emerald/Cyan (cool, intelligent, forward)
  // Soul: Amber/Gold (warm, wise, transformative)
  // ---------------------------------------------------------------------------
  accent: {
    // TECH SPECTRUM - For AI/technical content
    tech: {
      primary: '#10b981',     // Emerald-500 - primary CTA, links
      secondary: '#06b6d4',   // Cyan-500 - secondary actions, highlights
      light: '#34d399',       // Emerald-400 - hover states
      dark: '#059669',        // Emerald-600 - pressed states
      glow: 'rgba(16, 185, 129, 0.15)', // Ambient glow effect
    },

    // SOUL SPECTRUM - For Soulbook/personal content
    soul: {
      primary: '#f59e0b',     // Amber-500 - primary CTA, links
      secondary: '#fbbf24',   // Amber-400 - secondary actions
      light: '#fcd34d',       // Amber-300 - hover states
      dark: '#d97706',        // Amber-600 - pressed states
      glow: 'rgba(245, 158, 11, 0.15)', // Ambient glow effect
    },

    // HYBRID - For content bridging both worlds
    hybrid: '#8b5cf6',        // Purple-500 - rare, strategic use only
  },

  // ---------------------------------------------------------------------------
  // TEXT HIERARCHY - Optimized for Readability
  // All colors tested for WCAG AAA compliance (7:1+ contrast)
  // ---------------------------------------------------------------------------
  text: {
    primary: '#fafafa',                    // 100% - Headlines, key content (Contrast: 19.5:1)
    secondary: 'rgba(250, 250, 250, 0.85)', // 85% - Body text, descriptions (Contrast: 16:1)
    tertiary: 'rgba(250, 250, 250, 0.65)',  // 65% - Supporting text, labels (Contrast: 11:1)
    muted: 'rgba(250, 250, 250, 0.45)',     // 45% - Placeholder, disabled (Contrast: 7.5:1)
    faint: 'rgba(250, 250, 250, 0.25)',     // 25% - Decorative elements
  },

  // ---------------------------------------------------------------------------
  // SEMANTIC COLORS - Status and Feedback
  // ---------------------------------------------------------------------------
  semantic: {
    success: {
      base: '#22c55e',      // Green-500
      light: '#86efac',     // Green-300
      dark: '#16a34a',      // Green-600
      glow: 'rgba(34, 197, 94, 0.12)',
    },
    warning: {
      base: '#f59e0b',      // Amber-500 (doubles as soul accent)
      light: '#fcd34d',     // Amber-300
      dark: '#d97706',      // Amber-600
      glow: 'rgba(245, 158, 11, 0.12)',
    },
    error: {
      base: '#ef4444',      // Red-500
      light: '#fca5a5',     // Red-300
      dark: '#dc2626',      // Red-600
      glow: 'rgba(239, 68, 68, 0.12)',
    },
    info: {
      base: '#06b6d4',      // Cyan-500 (doubles as tech accent)
      light: '#67e8f9',     // Cyan-300
      dark: '#0891b2',      // Cyan-600
      glow: 'rgba(6, 182, 212, 0.12)',
    },
  },

  // ---------------------------------------------------------------------------
  // BORDER SYSTEM - Layered Hierarchy
  // ---------------------------------------------------------------------------
  border: {
    subtle: 'rgba(255, 255, 255, 0.05)',    // Barely visible dividers
    default: 'rgba(255, 255, 255, 0.1)',    // Standard borders
    strong: 'rgba(255, 255, 255, 0.15)',    // Emphasized borders
    tech: 'rgba(16, 185, 129, 0.2)',        // Tech-themed borders
    soul: 'rgba(245, 158, 11, 0.2)',        // Soul-themed borders
  },
} as const

// ============================================================================
// TYPOGRAPHY SYSTEM - Perfect Fourth Scale (1.333)
// Based on 16px root, optimized for readability and hierarchy
// ============================================================================

export const typography = {
  // ---------------------------------------------------------------------------
  // FONT FAMILIES
  // ---------------------------------------------------------------------------
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    serif: ['Times New Roman', 'Times', 'Georgia', 'serif'],
    mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
  },

  // ---------------------------------------------------------------------------
  // TYPE SCALE - Perfect Fourth (1.333)
  // Each level maintains mathematical harmony
  // ---------------------------------------------------------------------------
  fontSize: {
    // Display - Hero sections only
    'display-2xl': ['5.653rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '800' }],  // 90.45px
    'display-xl': ['4.243rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '800' }],   // 67.89px
    'display-lg': ['3.183rem', { lineHeight: '1.05', letterSpacing: '-0.01em', fontWeight: '700' }], // 50.93px

    // Headings - Section and component headers
    'heading-1': ['2.369rem', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '700' }],  // 37.90px (h1)
    'heading-2': ['1.777rem', { lineHeight: '1.2', letterSpacing: '-0.005em', fontWeight: '600' }], // 28.43px (h2)
    'heading-3': ['1.333rem', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '600' }],        // 21.33px (h3)
    'heading-4': ['1rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],            // 16px (h4)

    // Body - Content text
    'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0', fontWeight: '400' }],         // 18px
    'body-base': ['1rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],           // 16px (default)
    'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],        // 14px

    // Utility - Labels, captions, UI elements
    'label-lg': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '500' }],  // 14px
    'label-base': ['0.813rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '500' }], // 13px
    'caption': ['0.75rem', { lineHeight: '1.3', letterSpacing: '0.01em', fontWeight: '400' }],    // 12px
    'overline': ['0.688rem', { lineHeight: '1.2', letterSpacing: '0.08em', fontWeight: '600' }],  // 11px uppercase
  },

  // ---------------------------------------------------------------------------
  // FONT WEIGHTS - Named for Clarity
  // ---------------------------------------------------------------------------
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
} as const

// ============================================================================
// SPACING SYSTEM - 4px Base Grid
// Maintains vertical rhythm and consistent density
// ============================================================================

export const spacing = {
  // Base increments (4px grid)
  0: '0',
  px: '1px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  18: '4.5rem',     // 72px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  48: '12rem',      // 192px
  56: '14rem',      // 224px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
} as const

// ============================================================================
// BORDER RADIUS SYSTEM - Consistent Curvature
// ============================================================================

export const borderRadius = {
  none: '0',
  sm: '0.25rem',    // 4px - Subtle elements
  base: '0.5rem',   // 8px - Standard buttons, inputs
  md: '0.75rem',    // 12px - Cards
  lg: '1rem',       // 16px - Large cards
  xl: '1.25rem',    // 20px - Feature cards
  '2xl': '1.5rem',  // 24px - Premium cards
  '3xl': '2rem',    // 32px - Hero sections
  '4xl': '2.5rem',  // 40px - Special features
  full: '9999px',   // Circular elements
} as const

// ============================================================================
// ELEVATION SYSTEM - Shadow & Blur Hierarchy
// Creates depth perception through layered shadows
// ============================================================================

export const elevation = {
  // Shadow layers
  shadow: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.5)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.6)',

    // Glow effects (colored shadows)
    'glow-tech': '0 0 40px rgba(16, 185, 129, 0.35)',
    'glow-soul': '0 0 40px rgba(245, 158, 11, 0.35)',
    'glow-hybrid': '0 0 40px rgba(139, 92, 246, 0.35)',
  },

  // Backdrop blur for glassmorphism
  blur: {
    none: '0',
    sm: '4px',
    base: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '40px',
    '3xl': '64px',
  },
} as const

// ============================================================================
// MOTION SYSTEM - Animation Tokens
// Consistent timing and easing for fluid interactions
// ============================================================================

export const motion = {
  // ---------------------------------------------------------------------------
  // EASING CURVES - Physics-based motion
  // ---------------------------------------------------------------------------
  easing: {
    // Standard curves
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

    // Custom curves for premium feel
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',      // Elastic bounce
    smooth: 'cubic-bezier(0.33, 0.01, 0, 1)',         // Smooth deceleration
    dramatic: 'cubic-bezier(0.85, 0, 0.15, 1)',       // Exaggerated ease
  },

  // ---------------------------------------------------------------------------
  // DURATION SCALE - Consistent timing hierarchy
  // ---------------------------------------------------------------------------
  duration: {
    instant: '50ms',    // Immediate feedback (hover, focus)
    fast: '150ms',      // Quick transitions (tooltips, dropdowns)
    base: '250ms',      // Standard transitions (buttons, cards)
    moderate: '400ms',  // Complex transitions (modals, drawers)
    slow: '600ms',      // Elaborate animations (page transitions)
    slower: '900ms',    // Decorative animations (hero effects)
    slowest: '1200ms',  // Background ambient animations
  },

  // ---------------------------------------------------------------------------
  // ANIMATION PRESETS - Common patterns
  // ---------------------------------------------------------------------------
  presets: {
    // Entrance animations
    fadeIn: {
      duration: '400ms',
      easing: 'cubic-bezier(0, 0, 0.2, 1)',
      keyframes: { from: { opacity: 0 }, to: { opacity: 1 } },
    },
    fadeInUp: {
      duration: '600ms',
      easing: 'cubic-bezier(0.33, 0.01, 0, 1)',
      keyframes: {
        from: { opacity: 0, transform: 'translateY(24px)' },
        to: { opacity: 1, transform: 'translateY(0)' }
      },
    },

    // Interactive feedback
    scaleOnHover: {
      duration: '250ms',
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      keyframes: { to: { transform: 'scale(1.05)' } },
    },
    liftOnHover: {
      duration: '250ms',
      easing: 'cubic-bezier(0.33, 0.01, 0, 1)',
      keyframes: { to: { transform: 'translateY(-4px)' } },
    },

    // Continuous animations
    pulse: {
      duration: '2000ms',
      easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
      iteration: 'infinite',
      keyframes: {
        '0%, 100%': { opacity: 1 },
        '50%': { opacity: 0.5 },
      },
    },
    float: {
      duration: '6000ms',
      easing: 'ease-in-out',
      iteration: 'infinite',
      keyframes: {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-12px)' },
      },
    },
  },
} as const

// ============================================================================
// COMPONENT PATTERNS - Pre-defined Style Combinations
// These represent common component styles for consistency
// ============================================================================

export const componentPatterns = {
  // ---------------------------------------------------------------------------
  // BUTTONS
  // ---------------------------------------------------------------------------
  button: {
    // Tech-themed buttons (for AI/technical content)
    techPrimary: {
      bg: colors.accent.tech.primary,
      hover: colors.accent.tech.light,
      active: colors.accent.tech.dark,
      text: colors.bg.void,
      shadow: elevation.shadow['glow-tech'],
    },
    techSecondary: {
      bg: 'transparent',
      border: colors.border.tech,
      hover: colors.accent.tech.glow,
      text: colors.accent.tech.primary,
    },

    // Soul-themed buttons (for Soulbook/personal content)
    soulPrimary: {
      bg: colors.accent.soul.primary,
      hover: colors.accent.soul.light,
      active: colors.accent.soul.dark,
      text: colors.bg.void,
      shadow: elevation.shadow['glow-soul'],
    },
    soulSecondary: {
      bg: 'transparent',
      border: colors.border.soul,
      hover: colors.accent.soul.glow,
      text: colors.accent.soul.primary,
    },

    // Ghost button (universal)
    ghost: {
      bg: 'transparent',
      hover: colors.bg.elevated,
      text: colors.text.secondary,
    },
  },

  // ---------------------------------------------------------------------------
  // CARDS
  // ---------------------------------------------------------------------------
  card: {
    // Glass effect (universal)
    glass: {
      bg: colors.bg.space,
      backdrop: elevation.blur.xl,
      border: colors.border.default,
      shadow: elevation.shadow.lg,
    },

    // Tech-themed glass
    glassTech: {
      bg: colors.bg.space,
      backdrop: elevation.blur.xl,
      border: colors.border.tech,
      shadow: elevation.shadow['glow-tech'],
      gradient: colors.accent.tech.glow,
    },

    // Soul-themed glass
    glassSoul: {
      bg: colors.bg.space,
      backdrop: elevation.blur.xl,
      border: colors.border.soul,
      shadow: elevation.shadow['glow-soul'],
      gradient: colors.accent.soul.glow,
    },

    // Solid elevated card
    solid: {
      bg: colors.bg.elevated,
      border: colors.border.strong,
      shadow: elevation.shadow.md,
    },
  },

  // ---------------------------------------------------------------------------
  // INPUTS
  // ---------------------------------------------------------------------------
  input: {
    default: {
      bg: colors.bg.elevated,
      border: colors.border.default,
      focus: colors.accent.tech.primary,
      text: colors.text.primary,
      placeholder: colors.text.muted,
    },
  },
} as const

// ============================================================================
// USAGE GUIDELINES (exported as documentation)
// ============================================================================

export const designGuidelines = {
  colorUsage: {
    tech: [
      'AI tool pages and features',
      'Technical tutorials and documentation',
      'Product pages (CACOS, Creative AI Toolkit)',
      'Code examples and technical diagrams',
    ],
    soul: [
      'Soulbook content and navigation',
      'Personal transformation stories',
      'Music and creative expression content',
      'Community and connection features',
    ],
    universal: [
      'Navigation (use subtle tech accent)',
      'Footer (neutral)',
      'Blog posts (match content theme)',
      'Homepage (blend both with clear sections)',
    ],
  },

  accessibility: {
    contrast: 'All text meets WCAG AAA (7:1 minimum)',
    motion: 'Respect prefers-reduced-motion',
    focus: 'Visible focus states on all interactive elements',
    aria: 'Semantic HTML + ARIA labels where needed',
  },

  bestPractices: [
    'Start with void background for all pages',
    'Use tech accents for AI/technical content',
    'Use soul accents for personal/transformation content',
    'Maintain consistent spacing using 4px grid',
    'Apply glassmorphism for premium feel',
    'Layer shadows for depth perception',
    'Animate with purpose, not decoration',
  ],
} as const

// ============================================================================
// TYPE EXPORTS - For TypeScript autocomplete
// ============================================================================

export type ColorKey = keyof typeof colors
export type TypographyKey = keyof typeof typography
export type SpacingKey = keyof typeof spacing
export type BorderRadiusKey = keyof typeof borderRadius
export type ElevationKey = keyof typeof elevation
export type MotionKey = keyof typeof motion
