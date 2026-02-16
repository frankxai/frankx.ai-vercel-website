'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { ELEMENT_MATERIALS, DURATION, EASING, type ElementType, getIridescentGradient } from './types';

export interface IridescentPillProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  /** Pill text content */
  children: React.ReactNode;
  /** Element theme variant */
  element?: ElementType;
  /** Selected state */
  selected?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Icon element (before text) */
  icon?: React.ReactNode;
  /** Enable keyboard focus ring */
  focusable?: boolean;
}

/**
 * IridescentPill — Selection pill with bubble iridescence
 *
 * Interactive pill for selections, tags, and filters.
 * Features dormant → glowing state transition with iridescent shimmer.
 *
 * Based on: docs/design/ARCANEA_VISUAL_LANGUAGE.md
 *
 * @example
 * ```tsx
 * <IridescentPill
 *   element="fire"
 *   selected={selectedElement === 'fire'}
 *   onClick={() => setSelectedElement('fire')}
 * >
 *   Fire
 * </IridescentPill>
 * ```
 */
export function IridescentPill({
  children,
  element = 'default',
  selected = false,
  size = 'md',
  icon,
  focusable = true,
  className = '',
  style = {},
  ...props
}: IridescentPillProps) {
  const material = ELEMENT_MATERIALS[element];

  // Size variants
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  // Custom CSS vars
  const customStyle: React.CSSProperties = {
    ...style,
    '--element-primary': material.primary,
    '--element-glass': material.glass,
    '--element-emission': material.emission,
    '--iridescent-gradient': getIridescentGradient(element),
  } as React.CSSProperties;

  return (
    <motion.button
      className={`
        iridescent-pill
        relative overflow-hidden
        ${sizeClasses[size]}
        rounded-full
        font-medium
        transition-all duration-300
        ${selected ? 'text-white' : 'text-white/70'}
        ${focusable ? 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent' : ''}
        ${className}
      `}
      style={customStyle}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      transition={{
        duration: DURATION.fast / 1000,
        ease: EASING.standard,
      }}
      {...props}
    >
      {/* Inactive background */}
      <div
        className={`
          absolute inset-0 rounded-full
          transition-opacity duration-300
          ${selected ? 'opacity-0' : 'opacity-100'}
        `}
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      />

      {/* Active background */}
      <div
        className={`
          absolute inset-0 rounded-full
          transition-opacity duration-300
          ${selected ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          background: `linear-gradient(135deg, color-mix(in srgb, var(--element-primary) 15%, transparent) 0%, color-mix(in srgb, var(--element-primary) 5%, transparent) 100%), rgba(20,15,30,0.9)`,
          border: `1px solid color-mix(in srgb, var(--element-primary) 40%, transparent)`,
        }}
      />

      {/* Iridescent film (visible only when selected) */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: selected ? 0.6 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: `var(--iridescent-gradient)`,
          backgroundSize: '300% 300%',
          mixBlendMode: 'overlay',
        }}
      >
        <div
          className="w-full h-full animate-bubble-shift"
          style={{
            background: 'inherit',
          }}
        />
      </motion.div>

      {/* Specular highlight (top half) */}
      {selected && (
        <div
          className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 100%)',
          }}
        />
      )}

      {/* Shimmer pass on hover (inactive state) */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={{ x: '-100%', opacity: 0 }}
        whileHover={!selected ? {
          x: '200%',
          opacity: [0, 1, 1, 0],
          transition: { duration: 1.5, ease: EASING.standard },
        } : undefined}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </span>

      {/* Shadow styling */}
      <style jsx>{`
        .iridescent-pill {
          ${selected ? `
            box-shadow:
              0 0 0 1px color-mix(in srgb, var(--element-primary) 30%, transparent),
              0 4px 16px color-mix(in srgb, var(--element-primary) 20%, transparent),
              0 0 30px color-mix(in srgb, var(--element-emission) 15%, transparent);
          ` : `
            box-shadow:
              inset 0 2px 4px rgba(0,0,0,0.2),
              0 1px 0 rgba(255,255,255,0.02);
          `}
        }

        .iridescent-pill:hover {
          ${!selected ? `
            background: rgba(255,255,255,0.06) !important;
            border-color: color-mix(in srgb, var(--element-primary) 20%, transparent) !important;
          ` : ''}
        }

        @keyframes bubble-shift {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 50% 100%; }
          50% { background-position: 100% 50%; }
          75% { background-position: 50% 0%; }
        }

        .animate-bubble-shift {
          animation: bubble-shift 8s ease-in-out infinite;
        }
      `}</style>
    </motion.button>
  );
}

export default IridescentPill;
