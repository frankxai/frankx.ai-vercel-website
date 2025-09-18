'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface GlassmorphicCardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'premium' | 'luxury'
  gradient?: 'aurora' | 'midnight' | 'purple' | 'custom'
  hover?: boolean
  border?: 'subtle' | 'accent' | 'glow'
}

const variantStyles = {
  default: 'bg-slate-900/20 backdrop-blur-md',
  premium: 'bg-slate-900/30 backdrop-blur-xl',
  luxury: 'bg-slate-900/40 backdrop-blur-2xl'
}

const gradientStyles = {
  aurora: 'bg-gradient-to-br from-aurora-500/10 via-aurora-400/5 to-pulse-500/10',
  midnight: 'bg-gradient-to-br from-midnight-600/10 via-midnight-700/5 to-midnight-900/10',
  purple: 'bg-gradient-to-br from-pulse-500/12 via-pulse-400/6 to-primary-500/12',
  custom: 'bg-transparent'
}

const borderStyles = {
  subtle: 'border border-white/10 shadow-[0_12px_40px_rgba(12,27,68,0.25)]',
  accent: 'border border-aurora-400/30 shadow-[0_18px_48px_rgba(67,191,227,0.25)]',
  glow: 'border border-pulse-500/30 shadow-[0_22px_60px_rgba(161,72,221,0.35)]'
}

const noiseTexture = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"

export default function GlassmorphicCard({
  children,
  className,
  variant = 'default',
  gradient = 'aurora',
  hover = false,
  border = 'subtle'
}: GlassmorphicCardProps) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        variantStyles[variant],
        borderStyles[border],
        className
      )}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className={cn('pointer-events-none absolute inset-0', gradientStyles[gradient])} aria-hidden />
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: `url(${noiseTexture})` }} aria-hidden />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
