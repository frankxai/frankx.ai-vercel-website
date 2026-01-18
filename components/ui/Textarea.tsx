'use client'

import * as React from 'react'
import { clsx } from 'clsx'

/**
 * Textarea Component
 * Multi-line text input with auto-resize option
 */

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  helperText?: string
  autoResize?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, helperText, autoResize = false, onChange, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)
    const [isFocused, setIsFocused] = React.useState(false)

    const handleResize = React.useCallback(() => {
      const textarea = textareaRef.current
      if (textarea && autoResize) {
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }, [autoResize])

    React.useEffect(() => {
      handleResize()
    }, [handleResize, props.value])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleResize()
      onChange?.(e)
    }

    const baseClasses = clsx(
      // Base styling
      'flex min-h-[100px] w-full rounded-lg px-4 py-3 text-sm transition-all duration-200',
      'placeholder:text-white/30',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'resize-none',

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

      className
    )

    return (
      <div className="relative w-full">
        <textarea
          className={baseClasses}
          ref={(node) => {
            textareaRef.current = node
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref) {
              ref.current = node
            }
          }}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

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

Textarea.displayName = 'Textarea'

export { Textarea }
