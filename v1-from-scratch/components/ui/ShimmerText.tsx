'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ShimmerTextProps {
  children: ReactNode
  className?: string
  shimmerColor?: 'cyan' | 'purple' | 'multi'
  speed?: 'slow' | 'medium' | 'fast'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
}

/**
 * Premium gradient shimmer text effect
 * Creates an animated shine that sweeps across headings
 */
export default function ShimmerText({
  children,
  className = '',
  shimmerColor = 'multi',
  speed = 'slow',
  as: Component = 'span'
}: ShimmerTextProps) {
  const speedDurations = {
    slow: 3,
    medium: 2,
    fast: 1.5
  }

  const duration = speedDurations[speed]

  const shimmerGradients = {
    cyan: 'linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.3) 25%, rgba(6, 182, 212, 0.6) 50%, rgba(6, 182, 212, 0.3) 75%, transparent 100%)',
    purple: 'linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.3) 25%, rgba(168, 85, 247, 0.6) 50%, rgba(168, 85, 247, 0.3) 75%, transparent 100%)',
    multi: 'linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.3) 20%, rgba(168, 85, 247, 0.4) 40%, rgba(251, 191, 36, 0.5) 60%, rgba(168, 85, 247, 0.4) 80%, transparent 100%)'
  }

  return (
    <Component className={cn('relative inline-block', className)}>
      <span className="relative z-10">{children}</span>

      {/* Animated shimmer overlay */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: shimmerGradients[shimmerColor],
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </Component>
  )
}
