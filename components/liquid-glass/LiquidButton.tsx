'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { ELEMENT_MATERIALS, DURATION, EASING, type ElementType } from './types';

export interface LiquidButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  /** Button text content */
  children: React.ReactNode;
  /** Element theme variant */
  element?: ElementType;
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * LiquidButton — Premium liquid metal CTA
 *
 * A button that looks like polished liquid metal with 3D gradient surface.
 * Features inner highlight, depth shadow, and tactile press interaction.
 *
 * Based on: docs/design/LIQUID_GLASS_SYSTEM.md
 *
 * @example
 * ```tsx
 * <LiquidButton element="fire" size="lg">
 *   Launch Mission
 * </LiquidButton>
 * ```
 */
export function LiquidButton({
  children,
  element = 'default',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  className = '',
  style = {},
  ...props
}: LiquidButtonProps) {
  const material = ELEMENT_MATERIALS[element];

  // Size variants
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3.5 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  // Custom CSS vars for gradient
  const customStyle: React.CSSProperties = {
    ...style,
    '--gradient-start': material.emission,
    '--gradient-mid': material.primary,
    '--gradient-end': material.secondary,
    '--glow-color': material.emission,
  } as React.CSSProperties;

  return (
    <motion.button
      className={`
        liquid-button
        relative overflow-hidden
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-full
        font-semibold
        text-slate-950
        transition-all
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      style={customStyle}
      disabled={disabled || isLoading}
      whileHover={!disabled && !isLoading ? {
        y: -2,
        scale: 1.02,
      } : {}}
      whileTap={!disabled && !isLoading ? {
        y: 0,
        scale: 0.98,
      } : {}}
      transition={{
        duration: DURATION.fast / 1000,
        ease: EASING.spring,
      }}
      {...props}
    >
      {/* Background gradient - the liquid metal surface */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `linear-gradient(
            180deg,
            var(--gradient-start) 0%,
            var(--gradient-mid) 40%,
            var(--gradient-end) 100%
          )`,
        }}
      />

      {/* Inner highlight (top shine) */}
      <div
        className="absolute inset-x-0 top-0 h-1/3 rounded-t-full pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)',
        }}
      />

      {/* Shadow depth (bottom) */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/4 rounded-b-full pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(0,0,0,0.2) 0%, transparent 100%)',
        }}
      />

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{
          scale: 2,
          opacity: [0, 0.3, 0],
        }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <LoadingSpinner />
            <span className="opacity-70">Loading...</span>
          </>
        ) : (
          children
        )}
      </span>

      {/* Custom shadow styles */}
      <style jsx>{`
        .liquid-button {
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.4),
            inset 0 -2px 4px rgba(0, 0, 0, 0.2),
            0 4px 16px color-mix(in srgb, var(--glow-color) 40%, transparent),
            0 2px 4px rgba(0, 0, 0, 0.2);
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .liquid-button:hover:not(:disabled) {
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.5),
            inset 0 -2px 4px rgba(0, 0, 0, 0.2),
            0 8px 24px color-mix(in srgb, var(--glow-color) 50%, transparent),
            0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .liquid-button:active:not(:disabled) {
          box-shadow:
            inset 0 2px 8px rgba(0, 0, 0, 0.3),
            inset 0 0 0 1px rgba(0, 0, 0, 0.1),
            0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .liquid-button:active:not(:disabled) > div:first-child {
          background: linear-gradient(
            180deg,
            var(--gradient-end) 0%,
            var(--gradient-mid) 60%,
            var(--gradient-start) 100%
          ) !important;
        }
      `}</style>
    </motion.button>
  );
}

/**
 * Loading Spinner Component
 */
function LoadingSpinner() {
  return (
    <motion.div
      className="w-4 h-4 border-2 border-slate-950/20 border-t-slate-950 rounded-full"
      animate={{ rotate: 360 }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

export default LiquidButton;
