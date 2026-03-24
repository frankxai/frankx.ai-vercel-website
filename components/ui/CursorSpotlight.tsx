'use client'

import { useRef, useEffect, useCallback } from 'react'

/**
 * Global cursor-following spotlight overlay.
 *
 * Uses direct DOM mutations (no React state) to avoid 60fps re-renders.
 * Desktop only (hidden on mobile via CSS). Respects prefers-reduced-motion.
 */
export function CursorSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null)
  const rafId = useRef<number>(0)

  const handlePointerMove = useCallback((e: PointerEvent) => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => {
      if (!spotRef.current) return
      spotRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(6, 182, 212, 0.06), transparent 80%)`
    })
  }, [])

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [handlePointerMove])

  return (
    <div
      ref={spotRef}
      className="pointer-events-none fixed inset-0 z-30 hidden lg:block"
      aria-hidden="true"
    />
  )
}
