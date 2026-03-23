'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import {
  GLASS_MATERIALS,
  ELEVATION_SHADOWS,
  DURATION,
  EASING,
  type GlassMaterialType,
  type ElevationType,
  type ElementType,
  ELEMENT_MATERIALS,
} from './types';

export interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /** Card content */
  children: React.ReactNode;
  /** Glass material preset */
  material?: GlassMaterialType;
  /** Elevation level (affects shadow depth) */
  elevation?: ElevationType;
  /** Element theme for tinted glass */
  element?: ElementType | null;
  /** Enable hover lift effect */
  hoverable?: boolean;
  /** Enable focus ring for keyboard navigation */
  focusable?: boolean;
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Show specular highlight on top edge */
  showHighlight?: boolean;
  /** Custom border radius */
  rounded?: 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

/**
 * GlassCard — Multi-layer glass panel component
 *
 * A card with depth perception through:
 * - Multi-layer background (gradient + blur)
 * - 3-layer shadow system (ambient/direct/contact)
 * - Gradient borders (top/left brighter)
 * - Optional specular highlight
 * - Element-themed glass tinting
 *
 * Based on: docs/design/LIQUID_GLASS_SYSTEM.md
 *
 * @example
 * ```tsx
 * <GlassCard
 *   material="crystal"
 *   elevation="medium"
 *   element="arcane"
 *   hoverable
 * >
 *   <h3>Premium Content</h3>
 *   <p>With glass depth and iridescent borders.</p>
 * </GlassCard>
 * ```
 */
export function GlassCard({
  children,
  material = 'frosted',
  elevation = 'medium',
  element = null,
  hoverable = false,
  focusable = false,
  padding = 'lg',
  showHighlight = true,
  rounded = '2xl',
  className = '',
  style = {},
  ...props
}: GlassCardProps) {
  const glassMaterial = GLASS_MATERIALS[material];
  const elementMaterial = element ? ELEMENT_MATERIALS[element] : null;

  // Padding variants
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  };

  // Border radius variants
  const roundedClasses = {
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
  };

  // Custom CSS vars
  const customStyle: React.CSSProperties = {
    ...style,
    '--glass-opacity': glassMaterial.opacity,
    '--glass-blur': glassMaterial.blur,
    '--glass-border': glassMaterial.border,
    '--elevation-shadow': ELEVATION_SHADOWS[elevation],
    '--element-glass': elementMaterial?.glass || 'transparent',
  } as React.CSSProperties;

  const cardClasses = `
    glass-card
    relative
    ${roundedClasses[rounded]}
    ${paddingClasses[padding]}
    ${hoverable ? 'hover:scale-[1.02] hover:-translate-y-1' : ''}
    ${focusable ? 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent' : ''}
    transition-all duration-300
    ${className}
  `.trim();

  const MotionComponent = motion.div;

  return (
    <MotionComponent
      className={cardClasses}
      style={customStyle}
      tabIndex={focusable ? 0 : undefined}
      role={focusable ? 'article' : undefined}
      whileHover={hoverable ? {
        y: -4,
        transition: {
          duration: DURATION.fast / 1000,
          ease: EASING.standard,
        },
      } : undefined}
      {...props}
    >
      {/* Multi-layer background */}
      <div
        className={`absolute inset-0 ${roundedClasses[rounded]} pointer-events-none`}
        style={{
          background: elementMaterial
            ? `linear-gradient(135deg, ${glassMaterial.opacity} 0%, var(--element-glass) 100%), rgba(15,16,24,0.6)`
            : `linear-gradient(135deg, ${glassMaterial.opacity} 0%, rgba(255,255,255,0.02) 100%), rgba(15,16,24,0.6)`,
          backdropFilter: `blur(${glassMaterial.blur}) saturate(150%)`,
          WebkitBackdropFilter: `blur(${glassMaterial.blur}) saturate(150%)`,
        }}
      />

      {/* Border gradient (top/left lighter) */}
      <div
        className={`absolute inset-0 ${roundedClasses[rounded]} pointer-events-none`}
        style={{
          border: `1px solid ${glassMaterial.border}`,
          borderTopColor: `rgba(255,255,255,${parseFloat(glassMaterial.border.match(/[\d.]+/)?.[0] || '0') + 0.07})`,
          borderLeftColor: `rgba(255,255,255,${parseFloat(glassMaterial.border.match(/[\d.]+/)?.[0] || '0') + 0.04})`,
        }}
      />

      {/* Specular highlight (top 30%) */}
      {showHighlight && (
        <div
          className={`absolute top-0 left-0 right-0 h-[30%] ${roundedClasses[rounded] === 'rounded-2xl' ? 'rounded-t-2xl' : roundedClasses[rounded] === 'rounded-xl' ? 'rounded-t-xl' : roundedClasses[rounded] === 'rounded-3xl' ? 'rounded-t-3xl' : 'rounded-t-lg'} pointer-events-none`}
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Shadow styling */}
      <style jsx>{`
        .glass-card {
          box-shadow: var(--elevation-shadow);
        }

        .glass-card:hover {
          box-shadow:
            0 12px 48px rgba(0,0,0,0.5),
            0 4px 12px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.08);
        }
      `}</style>
    </MotionComponent>
  );
}

export default GlassCard;
