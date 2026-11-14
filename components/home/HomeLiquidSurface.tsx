'use client'

import { useCallback, useRef, useState, type ReactNode } from 'react'

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
 * Obsidian frosted glass surface with subtle top specular hairline and reduced-motion-safe highlight.
 */
export function HomeLiquidSurface({
  children,
  className = '',
  tone = 'emerald',
  interactive = true,
}: HomeLiquidSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [highlight, setHighlight] = useState({ x: 50, y: 15, active: false })

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
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100
      setHighlight({ x, y, active: true })
    },
    [interactive],
  )

  const handlePointerLeave = useCallback(() => {
    setHighlight((prev) => (prev.active ? { ...prev, active: false } : prev))
  }, [])

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0B0E17]/75 shadow-[0_20px_56px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-[border-color,background-color,box-shadow,transform] duration-300 ${TONE_BORDER[tone]} ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
      {interactive ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: highlight.active ? 1 : 0,
            background: `radial-gradient(380px circle at ${highlight.x}% ${highlight.y}%, ${TONE_GLOW[tone]}, transparent 65%)`,
          }}
        />
      ) : null}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
