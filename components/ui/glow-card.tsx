'use client'

import { useRef, useCallback } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// ── Color map: RGB triplets for cursor-following glow ──

export const glowColors = {
  emerald: '16, 185, 129',
  cyan: '6, 182, 212',
  violet: '139, 92, 246',
  amber: '245, 158, 11',
  rose: '244, 63, 94',
  blue: '59, 130, 246',
  orange: '249, 115, 22',
  teal: '20, 184, 166',
  purple: '168, 85, 247',
  indigo: '99, 102, 241',
  magenta: '224, 64, 251',
  white: '255, 255, 255',
} as const

export type GlowColor = keyof typeof glowColors

interface GlowCardProps {
  children: React.ReactNode
  /** Accent color for the cursor glow and top-edge hover effect */
  color?: GlowColor
  /** If provided, renders as <Link>; otherwise renders as <div> */
  href?: string
  className?: string
  /** Additional click handler (div variant only) */
  onClick?: () => void
}

/**
 * Liquid-glass card with Apple 2026-style cursor-following glow.
 *
 * Features:
 * - Specular top-edge highlight (the signature liquid glass detail)
 * - Cursor-following radial gradient glow (600px, 0.18 opacity)
 * - Top-edge ambient glow on hover
 * - backdrop-blur + saturate for true frosted-glass depth
 * - Layered depth shadows that deepen on hover
 *
 * Usage:
 *   <GlowCard color="emerald" href="/blog/post">…</GlowCard>
 *   <GlowCard color="violet">…</GlowCard>
 */
export function GlowCard({ children, color = 'teal', href, className, onClick }: GlowCardProps) {
  const glowRef = useRef<HTMLDivElement>(null)

  const rgb = glowColors[color]

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!glowRef.current) return
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(${rgb}, 0.18), transparent 40%)`
      glowRef.current.style.opacity = '1'
    },
    [rgb],
  )

  const handleMouseLeave = useCallback(() => {
    if (!glowRef.current) return
    glowRef.current.style.opacity = '0'
  }, [])

  const baseClass = cn(
    // Shape + glass
    'group relative overflow-hidden',
    'rounded-3xl',
    'border border-white/[0.08]',
    'bg-white/[0.04] [backdrop-filter:blur(32px)_saturate(160%)]',
    // Depth shadows: ambient base + subtle inset specular
    '[box-shadow:0_8px_32px_-8px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]',
    // Transitions
    'transition-all duration-300',
    // Hover: brighter border + deeper shadows
    'hover:border-white/[0.18]',
    'hover:[box-shadow:0_20px_60px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.10)]',
    // Focus accessibility
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
    className,
  )

  const glowLayers = (
    <>
      {/* Specular top-edge highlight — the liquid glass signature */}
      <div className="pointer-events-none absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      {/* Cursor-following radial glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300"
      />

      {/* Top-edge ambient glow: appears on hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(${rgb}, 0.10), transparent 65%)`,
        }}
      />
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={cn(baseClass, 'block h-full')}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {glowLayers}
        <div className="relative z-10">{children}</div>
      </Link>
    )
  }

  return (
    <div
      className={cn(baseClass, onClick && 'cursor-pointer')}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {glowLayers}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
