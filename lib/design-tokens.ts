/**
 * FrankX Design Tokens
 * Centralized design constants for consistent styling across the application
 *
 * These tokens are the source of truth. They should match:
 * - tailwind.config.js color definitions
 * - app/globals.css CSS variables
 */

// ============================================================================
// COLOR TOKENS
// ============================================================================

export const colors = {
  // Backgrounds - Deep Space Foundation
  bg: {
    void: '#0a0a0b',      // Deepest black - main background
    space: '#111113',     // Primary elevated - cards, modals
    elevated: '#18181b',  // Secondary elevated - hover states
    subtle: '#1f1f23',    // Tertiary - borders, dividers
  },

  // Tech Spectrum - For AI/technical content
  tech: {
    primary: '#10b981',     // Emerald-500 - CTAs, links
    secondary: '#06b6d4',   // Cyan-500 - highlights
    light: '#34d399',       // Emerald-400 - hovers
    dark: '#059669',        // Emerald-600 - pressed
    glow: 'rgba(16, 185, 129, 0.15)',
  },

  // Soul Spectrum - For Soulbook/personal content
  soul: {
    primary: '#f59e0b',     // Amber-500 - CTAs, links
    secondary: '#fbbf24',   // Amber-400 - highlights
    light: '#fcd34d',       // Amber-300 - hovers
    dark: '#d97706',        // Amber-600 - pressed
    glow: 'rgba(245, 158, 11, 0.15)',
  },

  // Hybrid - Strategic bridge color
  hybrid: '#8b5cf6',        // Purple-500

  // Text Hierarchy
  text: {
    primary: '#fafafa',
    secondary: 'rgba(250, 250, 250, 0.85)',
    tertiary: 'rgba(250, 250, 250, 0.65)',
    muted: 'rgba(250, 250, 250, 0.45)',
  },

  // Borders
  border: {
    subtle: 'rgba(255, 255, 255, 0.05)',
    default: 'rgba(255, 255, 255, 0.1)',
    strong: 'rgba(255, 255, 255, 0.15)',
  },
}

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

export const typography = {
  // Font families
  fonts: {
    sans: 'var(--font-sans), Outfit, system-ui, -apple-system, sans-serif',
    display: 'var(--font-display), Syne, system-ui, sans-serif',
    serif: 'var(--font-serif), Playfair Display, Times New Roman, serif',
    mono: 'var(--font-mono), JetBrains Mono, Menlo, monospace',
  },

  // Font sizes (Perfect Fourth scale - 1.333)
  sizes: {
    'display-2xl': '5.653rem',
    'display-xl': '4.243rem',
    'display-lg': '3.183rem',
    'heading-1': '2.369rem',
    'heading-2': '1.777rem',
    'heading-3': '1.333rem',
    'heading-4': '1rem',
    'body-lg': '1.125rem',
    body: '1rem',
    'body-sm': '0.875rem',
    caption: '0.75rem',
    overline: '0.688rem',
  },
}

// ============================================================================
// SPACING TOKENS
// ============================================================================

export const spacing = {
  // Section padding
  section: {
    sm: '3rem',   // 48px
    md: '5rem',   // 80px
    lg: '7rem',   // 112px
    xl: '10rem',  // 160px
  },

  // Container max-widths
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
}

// ============================================================================
// ANIMATION TOKENS
// ============================================================================

export const animation = {
  // Durations
  duration: {
    instant: '100ms',
    fast: '200ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
  },

  // Easings
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
}

// ============================================================================
// SHADOW TOKENS
// ============================================================================

export const shadows = {
  // Glow effects
  glowTech: '0 0 40px rgba(16, 185, 129, 0.35)',
  glowSoul: '0 0 40px rgba(245, 158, 11, 0.35)',

  // Elevation
  elevation1: '0 1px 3px rgb(0 0 0 / 0.12), 0 1px 2px rgb(0 0 0 / 0.24)',
  elevation2: '0 3px 6px rgb(0 0 0 / 0.16), 0 3px 6px rgb(0 0 0 / 0.23)',
  elevation3: '0 10px 20px rgb(0 0 0 / 0.19), 0 6px 6px rgb(0 0 0 / 0.23)',

  // Card shadows
  card: '0 24px 48px -12px rgba(0, 0, 0, 0.5)',
  cardHover: '0 32px 64px -16px rgba(0, 0, 0, 0.6)',
}

// ============================================================================
// BORDER RADIUS TOKENS
// ============================================================================

export const radii = {
  none: '0',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  '4xl': '2rem',
  full: '9999px',
}

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

export const zIndex = {
  behind: -1,
  default: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  overlay: 40,
  modal: 50,
  popover: 60,
  toast: 70,
  tooltip: 80,
}

// ============================================================================
// COMPONENT-SPECIFIC TOKENS
// ============================================================================

export const components = {
  // Card styles
  card: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
    border: 'rgba(255, 255, 255, 0.08)',
    borderHover: 'rgba(255, 255, 255, 0.15)',
    backdropBlur: '12px',
  },

  // Button styles
  button: {
    primary: {
      bg: colors.tech.primary,
      hover: colors.tech.light,
      text: colors.bg.void,
    },
    secondary: {
      bg: 'transparent',
      border: colors.border.default,
      hover: colors.bg.elevated,
      text: colors.text.primary,
    },
  },

  // Badge styles
  badge: {
    bg: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(255, 255, 255, 0.2)',
    text: 'rgba(255, 255, 255, 0.8)',
  },
}

export const designTokens = {
  colors,
  typography,
  spacing,
  animation,
  shadows,
  radii,
  breakpoints,
  zIndex,
  components,
}

export default designTokens
