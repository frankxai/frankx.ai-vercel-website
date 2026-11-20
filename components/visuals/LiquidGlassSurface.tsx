'use client'

import { useCallback, useRef, useState, type ReactNode } from 'react'

type LiquidGlassSurfaceProps = {
  children: ReactNode
  className?: string
  accent?: 'emerald' | 'cyan' | 'amber'
  interactive?: boolean
}

const ACCENT_GLOW: Record<NonNullable<LiquidGlassSurfaceProps['accent']>, string> = {
  emerald: 'rgba(16, 185, 129, 0.16)',
  cyan: 'rgba(6, 182, 212, 0.16)',
  amber: 'rgba(245, 158, 11, 0.14)',
}

const ACCENT_BORDER: Record<NonNullable<LiquidGlassSurfaceProps['accent']>, string> = {
  emerald: 'hover:border-emerald-400/35',
  cyan: 'hover:border-cyan-400/35',
  amber: 'hover:border-amber-400/35',
}

/**
 * Specular obsidian liquid-glass container with opt-out reduced-motion pointer highlight.
 */
export function LiquidGlassSurface({
  children,
  className = '',
  accent = 'emerald',
  interactive = true,
}: LiquidGlassSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({ x: 50, y: 20, active: false })

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!interactive) return
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100
      setCoords({ x, y, active: true })
    },
    [interactive],
  )

  const handlePointerLeave = useCallback(() => {
    setCoords((prev) => (prev.active ? { ...prev, active: false } : prev))
  }, [])

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0d1016]/80 shadow-[0_20px_60px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-[border-color,box-shadow] duration-300 ${ACCENT_BORDER[accent]} ${className}`}
    >
      {/* Top specular hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
      {/* Pointer-tracked refraction highlight */}
      {interactive ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: coords.active ? 1 : 0,
            background: `radial-gradient(420px circle at ${coords.x}% ${coords.y}%, ${ACCENT_GLOW[accent]}, transparent 65%)`,
          }}
        />
      ) : null}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
