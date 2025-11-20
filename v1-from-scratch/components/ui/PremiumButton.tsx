'use client'

import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PremiumButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'luxury'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  glow?: boolean
  magnetic?: boolean
  className?: string
  onClick?: () => void
  href?: string
  disabled?: boolean
  ariaLabel?: string
  ariaDescribedBy?: string
  type?: 'button' | 'submit' | 'reset'
}

const variantStyles = {
  primary: 'bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-cyan-500/30',
  secondary: 'bg-gradient-to-r from-slate-700 to-slate-800 text-slate-100 border border-slate-600/50 hover:border-slate-500/70',
  ghost: 'bg-slate-900/20 backdrop-blur-md border border-slate-700/30 text-slate-200 hover:bg-slate-800/30 hover:border-slate-600/50',
  luxury: 'bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white shadow-xl shadow-purple-500/40 hover:shadow-purple-500/60'
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
  magnetic = false,
  className,
  onClick,
  href,
  disabled = false,
  ariaLabel,
  ariaDescribedBy,
  type = 'button'
}: PremiumButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  // Magnetic hover effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!magnetic || disabled) return
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.1)
    y.set((e.clientY - centerY) * 0.1)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return

    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect()
    const ripple = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now()
    }
    setRipples(prev => [...prev, ripple])
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== ripple.id)), 600)

    onClick?.(e as any)
  }

  const baseClasses = cn(
    'relative overflow-hidden font-semibold transition-all duration-300',
    'hover:scale-105 hover:-translate-y-0.5 active:scale-95',
    'focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-slate-900',
    'focus-visible:ring-2 focus-visible:ring-purple-500/70',
    variantStyles[variant],
    sizeStyles[size],
    glow && glowStyles[variant],
    disabled && 'opacity-50 cursor-not-allowed hover:scale-100 hover:translate-y-0',
    className
  )

  const buttonContent = (
    <>
      {/* Enhanced shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: isHovered ? ['-100%', '100%'] : '-100%',
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut"
        }}
      />

      {/* Glass reflection with glow pulse */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent rounded-inherit"
        animate={glow && isHovered ? {
          opacity: [0.1, 0.15, 0.1]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Ripple effects */}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 200, height: 200, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  )

  const motionProps = {
    style: magnetic ? { x: xSpring, y: ySpring } : undefined,
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: handleMouseLeave,
    whileHover: disabled ? {} : { scale: 1.02, y: -1 },
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
        onClick={handleClick}
        {...motionProps}
      >
        {buttonContent}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={handleClick}
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