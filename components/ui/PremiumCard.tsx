'use client'

import { cn } from '@/lib/utils'
import { ReactNode, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

// ============================================================================
// BRAND GRADIENT PRESETS
// ============================================================================

const GRADIENT_PRESETS = {
  cyan: { from: '#00D4FF', via: '#0891B2', to: '#0066FF' },
  purple: { from: '#A855F7', via: '#7C3AED', to: '#6366F1' },
  emerald: { from: '#10B981', via: '#059669', to: '#0D9488' },
  gold: { from: '#F59E0B', via: '#D97706', to: '#EA580C' },
  slate: { from: '#64748B', via: '#475569', to: '#334155' },
} as const

type GradientPreset = keyof typeof GRADIENT_PRESETS

// ============================================================================
// GLASS VARIANTS
// ============================================================================

const GLASS_VARIANTS = {
  none: '',
  subtle: 'backdrop-blur-md bg-slate-900/20',
  medium: 'backdrop-blur-xl bg-slate-900/30',
  heavy: 'backdrop-blur-2xl bg-slate-900/40',
} as const

type GlassVariant = keyof typeof GLASS_VARIANTS

// ============================================================================
// TYPES
// ============================================================================

interface PremiumCardProps {
  children: ReactNode
  className?: string
  href?: string
  /** Open link in new tab (external link) */
  external?: boolean
  badge?: string
  gradient?: GradientPreset
  /** Enable mouse-following radial glow */
  mouseGlow?: boolean
  /** Override default gradient colors */
  gradientColors?: { from: string; via?: string; to: string }
  /** Card padding — override for custom layouts */
  padding?: string
  /** Enable hover lift animation */
  lift?: boolean
  /** onClick handler for non-link cards */
  onClick?: () => void
  /** Enable 3D tilt on hover (spring-smoothed) */
  tilt?: boolean
  /** Tilt intensity in degrees (default: 5) */
  tiltIntensity?: number
  /** Glassmorphic backdrop blur variant */
  glass?: GlassVariant
  /** Enable diagonal shine sweep on hover */
  shine?: boolean
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function PremiumCard({
  children,
  className,
  href,
  external = false,
  badge,
  gradient = 'cyan',
  mouseGlow = false,
  gradientColors,
  padding = 'p-5 sm:p-6',
  lift = true,
  onClick,
  tilt = false,
  tiltIntensity = 5,
  glass = 'none',
  shine = false,
}: PremiumCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Tilt motion values (spring-smoothed)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const springX = useSpring(tiltX, { stiffness: 300, damping: 30 })
  const springY = useSpring(tiltY, { stiffness: 300, damping: 30 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [`${tiltIntensity}deg`, `-${tiltIntensity}deg`])
  const rotateY = useTransform(springX, [-0.5, 0.5], [`-${tiltIntensity}deg`, `${tiltIntensity}deg`])

  const colors = gradientColors || GRADIENT_PRESETS[gradient]
  const via = colors.via || colors.from

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      if (mouseGlow) {
        setMousePos({ x, y })
      }

      if (tilt && !prefersReducedMotion) {
        tiltX.set(x / rect.width - 0.5)
        tiltY.set(y / rect.height - 0.5)
      }
    },
    [mouseGlow, tilt, prefersReducedMotion, tiltX, tiltY]
  )

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    if (tilt) {
      tiltX.set(0)
      tiltY.set(0)
    }
  }, [tilt, tiltX, tiltY])

  const gradientStyle = `linear-gradient(135deg, ${colors.from}, ${via}, ${colors.to})`

  const tiltStyle = tilt && !prefersReducedMotion
    ? { rotateX, rotateY, transformStyle: 'preserve-3d' as const }
    : {}

  const card = (
    <motion.div
      ref={cardRef}
      className={cn(
        'group relative block rounded-2xl overflow-hidden',
        glass === 'none' ? 'bg-white/[0.02]' : GLASS_VARIANTS[glass],
        'border border-white/[0.06]',
        'transition-all duration-300 ease-out',
        lift && !prefersReducedMotion && 'hover:-translate-y-1',
        'hover:border-white/[0.12]',
        'hover:shadow-lg hover:shadow-black/20',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]',
        className
      )}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Gradient Border Layer — CSS mask creates hollow border */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl pointer-events-none',
          'transition-opacity duration-300',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          padding: '1.5px',
          background: gradientStyle,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* Mouse-following radial glow (optional) */}
      {mouseGlow && isHovered && !prefersReducedMotion && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${colors.from}12, transparent 40%)`,
          }}
        />
      )}

      {/* Subtle gradient wash on hover */}
      <div
        className={cn(
          'absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-500',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          background: `linear-gradient(135deg, ${colors.from}08, transparent 60%, ${colors.to}05)`,
        }}
      />

      {/* Diagonal shine sweep on hover (optional) */}
      {shine && !prefersReducedMotion && (
        <div
          className={cn(
            'absolute inset-0 pointer-events-none overflow-hidden rounded-2xl',
            'transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -skew-x-12 transition-transform duration-700 ease-out"
            style={{
              transform: isHovered ? 'translateX(200%)' : 'translateX(-200%)',
            }}
          />
        </div>
      )}

      {/* Badge */}
      {badge && (
        <span className="absolute top-3 left-3 z-20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-white/[0.06] text-white/60 border border-white/[0.08]">
          {badge}
        </span>
      )}

      {/* Content */}
      <div className={cn('relative z-10', padding)}>{children}</div>
    </motion.div>
  )

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {card}
      </a>
    )
  }

  if (href) {
    return (
      <Link href={href} className="block">
        {card}
      </Link>
    )
  }

  return card
}

// ============================================================================
// EXPORTS
// ============================================================================

export { GRADIENT_PRESETS, GLASS_VARIANTS }
export type { PremiumCardProps, GradientPreset, GlassVariant }
