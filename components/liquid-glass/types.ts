/**
 * Liquid Glass Design System — TypeScript Type Definitions
 * Based on docs/design/LIQUID_GLASS_SYSTEM.md and ARCANEA_VISUAL_LANGUAGE.md
 */

export type ElementType = 'fire' | 'water' | 'earth' | 'wind' | 'arcane' | 'default';

export type GlassMaterialType = 'frosted' | 'crystal' | 'liquid' | 'obsidian';

export type ElevationType = 'flat' | 'low' | 'medium' | 'high' | 'floating' | 'modal';

/**
 * Element Material Definition
 * Complete visual specification for each elemental theme
 */
export interface ElementMaterial {
  /** Deep base color (background undertone) */
  base: string;
  /** Primary gradient start color */
  primary: string;
  /** Primary gradient end color */
  secondary: string;
  /** Glow/emission color for light effects */
  emission: string;
  /** Metallic accent color (copper, bronze, silver, etc.) */
  metal: string;
  /** Tinted glass color with alpha */
  glass: string;
  /** Iridescent gradient color stops */
  iridescence: string[];
}

/**
 * Element Colors Palette
 * Extracted from design system specs
 */
export const ELEMENT_MATERIALS: Record<ElementType, ElementMaterial> = {
  fire: {
    base: '#1A0A08',
    primary: '#FF6B35',
    secondary: '#FF4500',
    emission: '#FF8C42',
    metal: '#B87333',
    glass: 'rgba(255,107,53,0.15)',
    iridescence: [
      'rgba(255, 150, 50, 0.15)',
      'rgba(255, 100, 100, 0.12)',
      'rgba(255, 180, 80, 0.15)',
      'rgba(200, 100, 80, 0.10)',
    ],
  },
  water: {
    base: '#061418',
    primary: '#4ECDC4',
    secondary: '#0891B2',
    emission: '#7FDBDA',
    metal: '#4A90A4',
    glass: 'rgba(78,205,196,0.12)',
    iridescence: [
      'rgba(100, 220, 255, 0.12)',
      'rgba(150, 180, 255, 0.10)',
      'rgba(100, 255, 220, 0.12)',
      'rgba(80, 150, 255, 0.10)',
    ],
  },
  earth: {
    base: '#0D0A08',
    primary: '#8B7355',
    secondary: '#6B5344',
    emission: '#DAA520',
    metal: '#CD7F32',
    glass: 'rgba(139,115,85,0.15)',
    iridescence: [
      'rgba(200, 170, 100, 0.15)',
      'rgba(100, 180, 150, 0.10)',
      'rgba(180, 150, 80, 0.12)',
      'rgba(150, 200, 180, 0.10)',
    ],
  },
  wind: {
    base: '#0A0E12',
    primary: '#87CEEB',
    secondary: '#B0C4DE',
    emission: '#E0FFFF',
    metal: '#C0C0C0',
    glass: 'rgba(135,206,235,0.10)',
    iridescence: [
      'rgba(255, 255, 255, 0.12)',
      'rgba(200, 220, 255, 0.10)',
      'rgba(255, 220, 255, 0.10)',
      'rgba(220, 255, 255, 0.10)',
    ],
  },
  arcane: {
    base: '#0C0814',
    primary: '#9B59B6',
    secondary: '#6B21A8',
    emission: '#D8B4FE',
    metal: '#8B008B',
    glass: 'rgba(155,89,182,0.15)',
    iridescence: [
      'rgba(180, 100, 255, 0.15)',
      'rgba(100, 150, 255, 0.12)',
      'rgba(255, 100, 200, 0.12)',
      'rgba(100, 255, 200, 0.10)',
    ],
  },
  default: {
    base: '#0F1018',
    primary: '#D4AF37',
    secondary: '#B8860B',
    emission: '#FFE5A0',
    metal: '#C0C0C0',
    glass: 'rgba(212,175,55,0.15)',
    iridescence: [
      'rgba(255, 200, 150, 0.12)',
      'rgba(255, 150, 200, 0.10)',
      'rgba(180, 150, 255, 0.12)',
      'rgba(150, 220, 255, 0.10)',
    ],
  },
};

/**
 * Glass Material Configurations
 * Predefined blur, opacity, and border settings
 */
export const GLASS_MATERIALS: Record<GlassMaterialType, {
  opacity: string;
  blur: string;
  border: string;
  description: string;
}> = {
  frosted: {
    opacity: 'rgba(255,255,255,0.03)',
    blur: '24px',
    border: 'rgba(255,255,255,0.08)',
    description: 'Primary panels, standard cards',
  },
  crystal: {
    opacity: 'rgba(255,255,255,0.06)',
    blur: '40px',
    border: 'rgba(255,255,255,0.12)',
    description: 'Elevated cards, hero sections',
  },
  liquid: {
    opacity: 'rgba(255,255,255,0.08)',
    blur: '60px',
    border: 'rgba(255,255,255,0.15)',
    description: 'Modals, spotlight elements',
  },
  obsidian: {
    opacity: 'rgba(0,0,0,0.4)',
    blur: '32px',
    border: 'rgba(255,255,255,0.05)',
    description: 'Dark glass overlays',
  },
};

/**
 * Shadow Elevation System
 * Three-layer shadows (ambient, direct, contact) for realistic depth
 */
export const ELEVATION_SHADOWS: Record<ElevationType, string> = {
  flat: 'none',
  low: '0 4px 16px rgba(0,0,0,0.3), 0 1px 4px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05)',
  medium: '0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
  high: '0 16px 48px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
  floating: '0 32px 64px rgba(0,0,0,0.6), 0 8px 16px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.1)',
  modal: '0 40px 80px rgba(0,0,0,0.7), 0 12px 24px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.12)',
};

/**
 * Animation Easing Curves
 * Physics-based motion curves for natural interactions
 */
export const EASING = {
  /** Standard ease for most interactions */
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** Elastic enter for modals, toasts */
  elasticEnter: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  /** Smooth exit for closing, dismissing */
  smoothExit: 'cubic-bezier(0.4, 0, 1, 1)',
  /** Spring physics for buttons, toggles */
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

/**
 * Animation Duration Guidelines
 */
export const DURATION = {
  instant: 150,
  fast: 200,
  normal: 300,
  medium: 400,
  slow: 500,
  verySlow: 600,
};

/**
 * Helper function to get element-specific CSS custom properties
 */
export function getElementCSSVars(element: ElementType): Record<string, string> {
  const material = ELEMENT_MATERIALS[element];
  return {
    '--element-base': material.base,
    '--element-primary': material.primary,
    '--element-secondary': material.secondary,
    '--element-emission': material.emission,
    '--element-metal': material.metal,
    '--element-glass': material.glass,
  };
}

/**
 * Helper function to create iridescent gradient CSS
 */
export function getIridescentGradient(element: ElementType, angle: number = 135): string {
  const colors = ELEMENT_MATERIALS[element].iridescence;
  const stops = colors.map((color, i) => `${color} ${(i / (colors.length - 1)) * 100}%`).join(', ');
  return `linear-gradient(${angle}deg, ${stops})`;
}
