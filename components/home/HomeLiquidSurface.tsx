'use client'

import { useCallback, useRef, type ReactNode } from 'react'

export type HomeLiquidTone = 'emerald' | 'cyan' | 'neutral'

type HomeLiquidSurfaceProps = {
  children: ReactNode
  className?: string
  tone?: HomeLiquidTone
  interactive?: boolean
}

const TONE_GLOW: Record<HomeLiquidTone, string> = {
  emerald: 'rgba(16, 185, 129, 0.14)',
  cyan: 'rgba(6, 182, 212, 0.14)',
  neutral: 'rgba(148, 163, 184, 0.12)',
}

const TONE_BORDER: Record<HomeLiquidTone, string> = {
  emerald: 'hover:border-emerald-400/30',
  cyan: 'hover:border-cyan-400/30',
  neutral: 'hover:border-white/20',
}

/**
 * Obsidian glass surface with a top specular hairline and a reduced-motion-safe pointer highlight.
 * One surface treatment only (border): no drop shadow or backdrop blur, per taste.md.
 */
export function HomeLiquidSurface({
  children,
  className = '',
  tone = 'emerald',
  interactive = true,
}: HomeLiquidSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!interactive) return
      if (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return
      }
      const el = containerRef.current
      const spot = spotRef.current
      if (!el || !spot) return
      const rect = el.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100
      spot.style.opacity = '1'
      spot.style.background = `radial-gradient(380px circle at ${x.toFixed(1)}% ${y.toFixed(1)}%, ${TONE_GLOW[tone]}, transparent 65%)`
    },
    [interactive, tone],
  )

  const handlePointerLeave = useCallback(() => {
    if (spotRef.current) {
      spotRef.current.style.opacity = '0'
    }
  }, [])

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0B0E17]/90 transition-[border-color,background-color] duration-300 ${TONE_BORDER[tone]} ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
      {interactive ? (
        <div
          ref={spotRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{ opacity: 0 }}
        />
      ) : null}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
