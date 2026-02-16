'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ELEMENT_MATERIALS, DURATION, type ElementType } from './types';

export interface GlassInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input label */
  label?: string;
  /** Element theme for focus state */
  element?: ElementType;
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Helper text */
  helperText?: string;
  /** Icon element (before input) */
  icon?: React.ReactNode;
}

/**
 * GlassInput — Input field with iridescent focus
 *
 * Text input with glass material and color-shifting glow ring on focus.
 * Supports error states, icons, and labels.
 *
 * Based on: docs/design/LIQUID_GLASS_SYSTEM.md
 *
 * @example
 * ```tsx
 * <GlassInput
 *   label="Email"
 *   element="arcane"
 *   placeholder="you@example.com"
 *   type="email"
 * />
 * ```
 */
export function GlassInput({
  label,
  element = 'default',
  size = 'md',
  error = false,
  errorMessage,
  helperText,
  icon,
  className = '',
  ...props
}: GlassInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const material = ELEMENT_MATERIALS[element];

  // Size variants
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3.5 text-base',
    lg: 'px-5 py-4 text-lg',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
    props.onChange?.(e);
  };

  return (
    <div className="glass-input-wrapper w-full">
      {label && (
        <label className="block text-sm font-medium text-white/70 mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          className={`
            glass-input
            w-full
            ${sizeClasses[size]}
            ${icon ? 'pl-11' : ''}
            rounded-2xl
            bg-transparent
            text-white
            placeholder:text-white/35
            transition-all
            ${error ? 'error' : ''}
            ${className}
          `}
          style={{
            '--element-primary': material.primary,
            '--element-emission': material.emission,
          } as React.CSSProperties}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
          {...props}
        />

        {/* Focus ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isFocused ? 1 : 0,
          }}
          transition={{ duration: DURATION.fast / 1000 }}
          style={{
            boxShadow: error
              ? '0 0 0 2px rgba(220,38,38,0.3), 0 0 20px rgba(220,38,38,0.15)'
              : `0 0 0 2px color-mix(in srgb, ${material.primary} 30%, transparent), 0 0 20px color-mix(in srgb, ${material.emission} 15%, transparent)`,
          }}
        />

        {/* Shimmer animation on focus */}
        {isFocused && !error && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: `conic-gradient(
                  from 0deg at 50% 50%,
                  color-mix(in srgb, ${material.primary} 30%, transparent) 0deg,
                  color-mix(in srgb, ${material.emission} 20%, transparent) 120deg,
                  color-mix(in srgb, ${material.secondary} 30%, transparent) 240deg,
                  color-mix(in srgb, ${material.primary} 30%, transparent) 360deg
                )`,
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.div>
        )}
      </div>

      {/* Helper text / Error message */}
      {(helperText || errorMessage) && (
        <motion.p
          className={`mt-2 text-sm ${error ? 'text-red-400' : 'text-white/50'}`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error ? errorMessage : helperText}
        </motion.p>
      )}

      {/* Styling */}
      <style jsx>{`
        .glass-input {
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(15, 12, 20, 0.6);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }

        .glass-input::placeholder {
          color: rgba(255,255,255,0.35);
        }

        .glass-input:focus {
          outline: none;
          border-color: transparent;
        }

        .glass-input:not(:placeholder-shown) {
          background: rgba(255,255,255,0.02);
        }

        .glass-input.error {
          border-color: rgba(220,38,38,0.4);
        }

        .glass-input.error:focus {
          border-color: transparent;
        }
      `}</style>
    </div>
  );
}

export default GlassInput;
