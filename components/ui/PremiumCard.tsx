'use client'

import { cn } from '@/lib/utils'
import { ReactNode, useRef, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
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
}: PremiumCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const colors = gradientColors || GRADIENT_PRESETS[gradient]
  const via = colors.via || colors.from

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!mouseGlow || !cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    },
    [mouseGlow]
  )

  const gradientStyle = `linear-gradient(135deg, ${colors.from}, ${via}, ${colors.to})`

  const card = (
    <motion.div
      ref={cardRef}
      className={cn(
        'group relative block rounded-2xl overflow-hidden',
        'bg-white/[0.02] border border-white/[0.06]',
        'transition-all duration-300 ease-out',
        lift && !prefersReducedMotion && 'hover:-translate-y-1',
        'hover:border-white/[0.12]',
        'hover:shadow-lg hover:shadow-black/20',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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

export { GRADIENT_PRESETS }
export type { PremiumCardProps, GradientPreset }
