/**
 * FrankX.AI Centralized Gradient System
 *
 * Single source of truth for all gradient definitions used across the website.
 * Import these presets instead of hardcoding gradient classes in components.
 *
 * @usage
 * import { gradients, gradientClasses, gradientPresets } from '@/lib/design/gradients'
 *
 * // As Tailwind classes
 * <div className={gradientClasses.heroPrimary}>
 *
 * // As CSS values
 * style={{ background: gradients.aurora.css }}
 */

// =============================================================================
// LEGACY PRESETS - Maintain backwards compatibility
// =============================================================================

export const gradientPresets = {
  heroBase: 'bg-gradient-to-br from-midnight-900 via-midnight-950 to-black',
  heroAura: 'bg-midnight-radial',
  heroAurora: 'bg-aurora-vortex',
  heroPulse: 'bg-pulse-halo',
  glass: 'bg-glass-light',
  buttonAurora: 'bg-gradient-to-r from-aurora-600 via-pulse-600 to-primary-600',
  buttonSoft: 'bg-gradient-to-r from-midnight-500 via-nebula-500 to-aurora-500',
  cardBorder: 'border-white/10',
}

export const glassCardClasses = 'backdrop-blur-xl bg-white/5 border border-white/10'

// =============================================================================
// GRADIENT DEFINITIONS
// =============================================================================

export const gradients = {
  // ---------------------------------------------------------------------------
  // BRAND GRADIENTS - Primary visual identity
  // ---------------------------------------------------------------------------

  /** Primary brand gradient - Tech/AI content */
  techPrimary: {
    css: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)',
    tailwind: 'bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500',
    colors: ['#10b981', '#06b6d4', '#3b82f6'],
  },

  /** Soul/transformation gradient - Soulbook content */
  soulPrimary: {
    css: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #8b5cf6 100%)',
    tailwind: 'bg-gradient-to-br from-amber-500 via-pink-500 to-violet-500',
    colors: ['#f59e0b', '#ec4899', '#8b5cf6'],
  },

  /** Hybrid gradient - Bridging tech and soul */
  hybrid: {
    css: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #06b6d4 100%)',
    tailwind: 'bg-gradient-to-br from-violet-500 via-pink-500 to-cyan-500',
    colors: ['#8b5cf6', '#ec4899', '#06b6d4'],
  },

  // ---------------------------------------------------------------------------
  // AURORA GRADIENTS - Hero backgrounds and special sections
  // ---------------------------------------------------------------------------

  /** Aurora base - Primary hero background */
  aurora: {
    css: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, transparent 40%, rgba(139, 92, 246, 0.15) 100%)',
    tailwind: 'bg-gradient-to-br from-emerald-500/15 via-transparent to-violet-500/15',
    colors: ['rgba(16, 185, 129, 0.15)', 'transparent', 'rgba(139, 92, 246, 0.15)'],
  },

  /** Aurora pulse - Animated background variant */
  auroraPulse: {
    css: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, transparent 50%, rgba(236, 72, 153, 0.1) 100%)',
    tailwind: 'bg-gradient-to-br from-cyan-500/10 via-transparent to-pink-500/10',
    colors: ['rgba(6, 182, 212, 0.1)', 'transparent', 'rgba(236, 72, 153, 0.1)'],
  },

  /** Aurora midnight - Deep space variant */
  auroraMidnight: {
    css: 'linear-gradient(180deg, #0a0a0b 0%, #111113 50%, #0a0a0b 100%)',
    tailwind: 'bg-gradient-to-b from-[#0a0a0b] via-[#111113] to-[#0a0a0b]',
    colors: ['#0a0a0b', '#111113', '#0a0a0b'],
  },

  // ---------------------------------------------------------------------------
  // CARD GRADIENTS - Component backgrounds
  // ---------------------------------------------------------------------------

  /** Glass card - Standard glassmorphism */
  glassCard: {
    css: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
    tailwind: 'bg-gradient-to-br from-white/8 to-white/2',
    colors: ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.02)'],
  },

  /** Glass card premium - Enhanced depth */
  glassCardPremium: {
    css: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)',
    tailwind: 'bg-gradient-to-br from-white/12 to-white/4',
    colors: ['rgba(255, 255, 255, 0.12)', 'rgba(255, 255, 255, 0.04)'],
  },

  /** Tech card glow */
  techCardGlow: {
    css: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, transparent 100%)',
    tailwind: 'bg-gradient-to-br from-emerald-500/10 to-transparent',
    colors: ['rgba(16, 185, 129, 0.1)', 'transparent'],
  },

  /** Soul card glow */
  soulCardGlow: {
    css: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, transparent 100%)',
    tailwind: 'bg-gradient-to-br from-amber-500/10 to-transparent',
    colors: ['rgba(245, 158, 11, 0.1)', 'transparent'],
  },

  // ---------------------------------------------------------------------------
  // BUTTON GRADIENTS - CTA and interactive elements
  // ---------------------------------------------------------------------------

  /** Primary CTA button */
  buttonPrimary: {
    css: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    tailwind: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    colors: ['#10b981', '#059669'],
  },

  /** Premium CTA button - Multi-color */
  buttonPremium: {
    css: 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 50%, #06b6d4 100%)',
    tailwind: 'bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500',
    colors: ['#8b5cf6', '#ec4899', '#06b6d4'],
  },

  /** Soul CTA button */
  buttonSoul: {
    css: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    tailwind: 'bg-gradient-to-br from-amber-500 to-amber-600',
    colors: ['#f59e0b', '#d97706'],
  },

  // ---------------------------------------------------------------------------
  // TEXT GRADIENTS - Gradient text effects
  // ---------------------------------------------------------------------------

  /** Primary text gradient */
  textPrimary: {
    css: 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)',
    tailwind: 'bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent',
    colors: ['#10b981', '#06b6d4'],
  },

  /** Soul text gradient */
  textSoul: {
    css: 'linear-gradient(90deg, #f59e0b 0%, #ec4899 100%)',
    tailwind: 'bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent',
    colors: ['#f59e0b', '#ec4899'],
  },

  /** Rainbow text gradient */
  textRainbow: {
    css: 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 33%, #06b6d4 66%, #10b981 100%)',
    tailwind: 'bg-gradient-to-r from-violet-500 via-pink-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent',
    colors: ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981'],
  },

  // ---------------------------------------------------------------------------
  // BORDER GRADIENTS - Glowing borders
  // ---------------------------------------------------------------------------

  /** Tech border glow */
  borderTech: {
    css: 'linear-gradient(135deg, rgba(16, 185, 129, 0.5) 0%, rgba(6, 182, 212, 0.5) 100%)',
    tailwind: 'bg-gradient-to-br from-emerald-500/50 to-cyan-500/50',
    colors: ['rgba(16, 185, 129, 0.5)', 'rgba(6, 182, 212, 0.5)'],
  },

  /** Soul border glow */
  borderSoul: {
    css: 'linear-gradient(135deg, rgba(245, 158, 11, 0.5) 0%, rgba(236, 72, 153, 0.5) 100%)',
    tailwind: 'bg-gradient-to-br from-amber-500/50 to-pink-500/50',
    colors: ['rgba(245, 158, 11, 0.5)', 'rgba(236, 72, 153, 0.5)'],
  },
} as const

// =============================================================================
// TAILWIND CLASS EXPORTS - Copy-paste ready
// =============================================================================

export const gradientClasses = {
  // Hero backgrounds
  heroPrimary: 'bg-gradient-to-br from-emerald-500/15 via-transparent to-violet-500/15',
  heroPulse: 'bg-gradient-to-br from-cyan-500/10 via-transparent to-pink-500/10',
  heroMidnight: 'bg-gradient-to-b from-[#0a0a0b] via-[#111113] to-[#0a0a0b]',

  // Cards
  cardGlass: 'bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-xl',
  cardGlassPremium: 'bg-gradient-to-br from-white/12 to-white/4 backdrop-blur-xl',
  cardTech: 'bg-gradient-to-br from-emerald-500/10 to-transparent backdrop-blur-xl',
  cardSoul: 'bg-gradient-to-br from-amber-500/10 to-transparent backdrop-blur-xl',

  // Buttons
  buttonPrimary: 'bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500',
  buttonPremium: 'bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500 hover:from-violet-400 hover:via-pink-400 hover:to-cyan-400',
  buttonSoul: 'bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500',

  // Text
  textGradient: 'bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent',
  textGradientSoul: 'bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent',
  textGradientRainbow: 'bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent',

  // Borders (use with border-gradient technique)
  borderTech: 'border-emerald-500/20',
  borderSoul: 'border-amber-500/20',
  borderPremium: 'border-violet-500/20',
} as const

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get a gradient by name with type safety
 */
export function getGradient(name: keyof typeof gradients) {
  return gradients[name]
}

/**
 * Get gradient CSS for inline styles
 */
export function getGradientCSS(name: keyof typeof gradients): string {
  return gradients[name].css
}

/**
 * Get gradient Tailwind classes
 */
export function getGradientTailwind(name: keyof typeof gradients): string {
  return gradients[name].tailwind
}

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type GradientName = keyof typeof gradients
export type GradientClassName = keyof typeof gradientClasses
