/**
 * FrankX.AI DARK Design Tokens
 * Premium DARK theme for Golden Age of Intelligence
 * Based on existing V1 dark foundation
 */

export const darkTokens = {
  colors: {
    // Signature Accents (from V1)
    primary: {
      DEFAULT: '#8b5cf6', // Purple
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    secondary: {
      DEFAULT: '#ec4899', // Pink
      light: '#f472b6',
      dark: '#db2777',
    },
    accent: {
      DEFAULT: '#38bdf8', // Cyan
      light: '#7dd3fc',
      dark: '#0ea5e9',
    },
    gold: {
      DEFAULT: '#F5A623',
      light: '#FFD88D',
      dark: '#C58512',
    },

    // Dark Backgrounds & Surfaces
    background: {
      DEFAULT: 'hsl(222, 83%, 4%)',    // Main bg
      elevated: 'hsl(222, 83%, 9%)',   // Cards
      muted: 'hsl(215, 28%, 17%)',     // Subtle bg
    },

    // Dark Text Colors
    text: {
      primary: 'hsl(210, 40%, 96%)',   // Main text
      secondary: 'hsl(215, 20%, 65%)',  // Muted text
      muted: 'hsl(215, 20%, 45%)',     // Very muted
    },

    // Borders & Dividers
    border: {
      DEFAULT: 'rgba(148, 163, 184, 0.18)',
      subtle: 'rgba(148, 163, 184, 0.08)',
      strong: 'rgba(148, 163, 184, 0.25)',
    },

    // Glass Effect
    glass: {
      bg: 'rgba(15, 23, 42, 0.6)',
      border: 'rgba(148, 163, 184, 0.18)',
    },

    // Gradients (from V1)
    gradients: {
      primary: 'linear-gradient(135deg, #161C2C, #1D1F3A, #2E1065)',
      hero: 'linear-gradient(120deg, #7c3aed, #0ea5e9)',
      accent: 'linear-gradient(to right, #8b5cf6, #ec4899, #38bdf8)',
      gold: 'linear-gradient(135deg, #F5A623 0%, #FFD88D 100%)',
    },

    // Semantic
    semantic: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    }
  },

  typography: {
    fonts: {
      primary: 'var(--font-inter)',
      display: 'var(--font-space-grotesk)',
      mono: 'JetBrains Mono, monospace',
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.25rem',
      xl: '1.5625rem',
      '2xl': '1.9375rem',
      '3xl': '2.4375rem',
      '4xl': '3.0625rem',
      '5xl': '3.8125rem',
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.2,
      snug: 1.4,
      normal: 1.6,
      relaxed: 1.8,
    }
  },

  spacing: {
    1: '0.5rem',
    2: '1rem',
    3: '1.5rem',
    4: '2rem',
    5: '2.5rem',
    6: '3rem',
    8: '4rem',
    12: '6rem',
    16: '8rem',
    20: '10rem',
  },

  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },

  shadows: {
    sm: '0 2px 4px rgba(0,0,0,0.3)',
    md: '0 4px 8px rgba(0,0,0,0.4)',
    lg: '0 12px 24px rgba(0,0,0,0.5)',
    xl: '0 20px 40px rgba(0,0,0,0.6)',
    glow: '0 0 20px rgba(6,182,212,0.3)',
    'glow-lg': '0 0 30px rgba(6,182,212,0.4)',
  },

  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  }
} as const;

export type DarkTokens = typeof darkTokens;
