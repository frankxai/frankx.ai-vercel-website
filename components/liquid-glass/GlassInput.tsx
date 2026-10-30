'use client';

import React, { useId } from 'react';
import { ELEMENT_MATERIALS, type ElementType } from './types';

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
  id,
  style,
  onFocus,
  onBlur,
  onChange,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...props
}: GlassInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const message = error ? (errorMessage || helperText) : helperText;
  const messageId = message ? `${inputId}-message` : undefined;
  const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(' ') || undefined;
  const material = ELEMENT_MATERIALS[element];

  // Size variants
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3.5 text-base',
    lg: 'px-5 py-4 text-lg',
  };

  return (
    <div className="glass-input-wrapper w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-white/70 mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Icon */}
        {icon && (
          <div aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          {...props}
          id={inputId}
          aria-invalid={error || ariaInvalid}
          aria-describedby={describedBy}
          className={`
            glass-input
            w-full min-h-11
            ${sizeClasses[size]}
            ${icon ? 'pl-11' : ''}
            rounded-2xl
            bg-transparent
            text-white
            placeholder:text-white/35
            ${error ? 'error' : ''}
            ${className}
          `}
          style={{
            ...style,
            '--element-primary': material.primary,
            '--element-emission': material.emission,
          } as React.CSSProperties}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />

      </div>

      {/* Helper text / Error message */}
      {message && (
        <p
          id={messageId}
          className={`mt-2 text-sm ${error ? 'text-red-400' : 'text-white/50'}`}
        >
          {message}
        </p>
      )}

      {/* Styling */}
      <style jsx>{`
        .glass-input {
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(15, 12, 20, 0.6);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          transition: border-color 160ms ease-out, background-color 160ms ease-out;
        }

        .glass-input::placeholder {
          color: rgba(255,255,255,0.35);
        }

        .glass-input:focus {
          outline: 2px solid var(--element-primary);
          outline-offset: 3px;
        }

        .glass-input:not(:placeholder-shown) {
          background: rgba(255,255,255,0.02);
        }

        .glass-input.error {
          border-color: rgba(220,38,38,0.4);
        }

        .glass-input.error:focus {
          outline-color: rgb(248, 113, 113);
        }

        @media (prefers-reduced-motion: reduce) {
          .glass-input {
            transition: none;
            transition-duration: 0s !important;
          }
        }

        @media (forced-colors: active) {
          .glass-input:focus {
            outline-color: Highlight;
          }
        }
      `}</style>
    </div>
  );
}

export default GlassInput;
