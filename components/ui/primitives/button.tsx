'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'default' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  default: 'bg-neutral-900 text-white hover:bg-neutral-800',
  ghost: 'bg-transparent text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100/70 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-800/70',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-xs min-h-[36px]',        // WCAG 2.2 touch target
  md: 'h-11 px-5 text-sm min-h-[44px]',        // WCAG 2.2 touch target (default)
  lg: 'h-13 px-8 text-base min-h-[52px]',      // Large CTA
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', asChild = false, children, ...props }, ref) => {
    const classes = cn(
      // Design System Standard: Primary buttons use rounded-2xl (16px) per DESIGN_SYSTEM.md
      'inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
      variantStyles[variant],
      sizeStyles[size],
      className
    )

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: cn(classes, children.props.className),
        ...props,
      })
    }

    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
