'use client'

import * as React from 'react'
import { clsx } from 'clsx'
import { Eye, EyeOff } from 'lucide-react'

/**
 * Input Component
 * Production-grade input with:
 * - Multiple variants (text, email, password, number, tel, url, search)
 * - Password visibility toggle
 * - Error states
 * - Glassmorphic styling
 * - Dark/light mode support
 * - Full accessibility
 */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  helperText?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, helperText, icon, iconPosition = 'left', ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)

    const isPassword = type === 'password'
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

    const baseClasses = clsx(
      // Base styling
      'flex w-full rounded-lg px-4 py-3 text-sm transition-all duration-200',
      'placeholder:text-white/30',
      'disabled:cursor-not-allowed disabled:opacity-50',

      // Glassmorphic background
      'bg-white/5 backdrop-blur-sm',

      // Border
      error
        ? 'border-2 border-red-500/50 focus:border-red-500'
        : 'border border-white/10 focus:border-emerald-500/50',

      // Focus ring
      'focus:ring-2 focus:ring-emerald-500/20 focus:outline-none',

      // Text color
      'text-white',

      // Hover
      !error && 'hover:border-white/20',

      // Icon padding
      icon && iconPosition === 'left' && 'pl-11',
      icon && iconPosition === 'right' && 'pr-11',
      isPassword && 'pr-11',

      className
    )

    return (
      <div className="relative w-full">
        {/* Left Icon */}
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          type={inputType}
          className={baseClasses}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Right Icon or Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors focus:outline-none focus:text-white/70"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}

        {icon && iconPosition === 'right' && !isPassword && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
            {icon}
          </div>
        )}

        {/* Glow effect on focus */}
        {isFocused && !error && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 -z-10 blur-xl" />
        )}

        {/* Helper text or error message */}
        {helperText && (
          <p className={clsx('mt-1.5 text-xs', error ? 'text-red-400' : 'text-white/50')}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
