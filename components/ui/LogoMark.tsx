'use client'

import { useId } from 'react'
import { motion } from 'framer-motion'

interface LogoMarkProps {
  size?: number
  animated?: boolean
  className?: string
}

/**
 * FrankX.AI Logo Mark
 *
 * A geometric "FX" monogram with subtle wave forms suggesting
 * both technology (angular precision) and music (flowing curves).
 * Inspired by: Stripe, Linear, Vercel - minimal, iconic, premium.
 */
export function LogoMark({ size = 32, animated = false, className = '' }: LogoMarkProps) {
  const gradientId = `fx-gradient-${useId().replace(/:/g, '')}`

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={animated ? { scale: 0.8, opacity: 0 } : undefined}
      animate={animated ? { scale: 1, opacity: 1 } : undefined}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      {/* Main geometric mark - stylized F×X fusion */}
      <path
        d="M6 6h8v4h-4v4h3v4h-3v8H6V6z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M16 6l5 10-5 10h4l3-6 3 6h4l-5-10 5-10h-4l-3 6-3-6h-4z"
        fill={`url(#${gradientId})`}
        opacity="0.9"
      />
    </motion.svg>
  )
}

/**
 * Alternative Logo Mark - Abstract wave/signal
 * More abstract, suggests sound waves and neural pathways
 */
export function LogoMarkWave({ size = 32, className = '' }: Omit<LogoMarkProps, 'animated'>) {
  const gradientId = `wave-gradient-${useId().replace(/:/g, '')}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      {/* Abstract wave/signal form */}
      <path
        d="M4 16c0-2 1-4 3-4s3 4 3 4 1 4 3 4 3-4 3-4 1-4 3-4 3 4 3 4 1 4 3 4 3-4 3-4"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="16" cy="16" r="4" fill={`url(#${gradientId})`} />
    </svg>
  )
}

/**
 * Premium Logo Mark - Geometric crystal/prism
 * Suggests light refraction, intelligence, multi-faceted expertise
 */
export function LogoMarkCrystal({ size = 32, className = '' }: Omit<LogoMarkProps, 'animated'>) {
  const gradientId = `crystal-gradient-${useId().replace(/:/g, '')}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id={`${gradientId}-light`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Main crystal shape */}
      <polygon
        points="16,2 28,12 24,30 8,30 4,12"
        fill={`url(#${gradientId})`}
      />
      {/* Inner facet for depth */}
      <polygon
        points="16,6 23,13 20,26 12,26 9,13"
        fill={`url(#${gradientId}-light)`}
      />
      {/* Center highlight */}
      <polygon
        points="16,10 19,14 17,22 15,22 13,14"
        fill="rgba(255,255,255,0.15)"
      />
    </svg>
  )
}

/**
 * Minimal Logo Mark - Simple geometric F
 * Ultra-minimal, works at any size, unmistakably "F"
 */
export function LogoMarkMinimal({ size = 32, className = '' }: Omit<LogoMarkProps, 'animated'>) {
  const gradientId = `minimal-gradient-${useId().replace(/:/g, '')}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      {/* Stylized F with rounded corners */}
      <rect x="6" y="4" width="5" height="24" rx="2" fill={`url(#${gradientId})`} />
      <rect x="6" y="4" width="18" height="5" rx="2" fill={`url(#${gradientId})`} />
      <rect x="6" y="13" width="14" height="4" rx="2" fill={`url(#${gradientId})`} opacity="0.8" />
    </svg>
  )
}

export default LogoMark
