'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PremiumButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'luxury'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  glow?: boolean
  className?: string
  onClick?: () => void
  href?: string
  disabled?: boolean
  ariaLabel?: string
  ariaDescribedBy?: string
  type?: 'button' | 'submit' | 'reset'
}

const variantStyles = {
  primary: 'bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white shadow-lg shadow-purple-500/25',
  secondary: 'bg-gradient-to-r from-slate-700 to-slate-800 text-slate-100 border border-slate-600/50',
  ghost: 'bg-slate-900/20 backdrop-blur-md border border-slate-700/30 text-slate-200 hover:bg-slate-800/30',
  luxury: 'bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white shadow-xl shadow-purple-500/40'
}

const sizeStyles = {
  sm: 'px-4 py-2.5 text-sm rounded-lg min-h-[40px]', // Increased min-height for better touch targets
  md: 'px-6 py-3.5 text-base rounded-xl min-h-[44px]',
  lg: 'px-8 py-4 text-lg rounded-xl min-h-[48px]',
  xl: 'px-10 py-5 text-xl rounded-2xl min-h-[52px]'
}

const glowStyles = {
  primary: 'shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/60',
  secondary: 'shadow-lg shadow-slate-500/20 hover:shadow-slate-500/30',
  ghost: 'hover:shadow-lg hover:shadow-slate-500/20',
  luxury: 'shadow-2xl shadow-purple-500/60 hover:shadow-purple-500/80'
}

export default function PremiumButton({
  children,
  variant = 'primary',
  size = 'md',
  glow = false,
  className,
  onClick,
  href,
  disabled = false,
  ariaLabel,
  ariaDescribedBy,
  type = 'button'
}: PremiumButtonProps) {
  const baseClasses = cn(
    'relative overflow-hidden font-semibold transition-all duration-300',
    // Mobile-optimized hover states - reduced transforms on touch devices
    'hover:scale-105 hover:-translate-y-0.5 active:scale-95',
    'md:hover:scale-105 md:hover:-translate-y-0.5', // Only apply hover transforms on medium screens and up
    'touch:hover:scale-100 touch:hover:translate-y-0', // Reset transforms on touch devices
    'focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-slate-900',
    'focus-visible:ring-2 focus-visible:ring-purple-500/70', // Enhanced focus visibility
    variantStyles[variant],
    sizeStyles[size],
    glow && glowStyles[variant],
    disabled && 'opacity-50 cursor-not-allowed hover:scale-100 hover:translate-y-0',
    className
  )

  const buttonContent = (
    <>
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />

      {/* Glass reflection */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent rounded-inherit" />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  )

  const motionProps = {
    whileHover: disabled ? {} : {
      scale: 1.02, // Reduced scale for mobile-friendly interaction
      y: -1
    },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        role="link"
        {...motionProps}
      >
        {buttonContent}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      {...motionProps}
    >
      {buttonContent}
    </motion.button>
  )
}