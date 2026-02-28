'use client'

import { useRef, useCallback } from 'react'

export interface MouseGlowOptions {
  /** RGB values string e.g. "16, 185, 129". Defaults to brand purple. */
  rgb?: string
  /** Radial gradient radius in px. Defaults to 400. */
  radius?: number
  /** Peak opacity of the glow (0–1). Defaults to 0.12. */
  opacity?: number
}

export interface MouseGlowResult<TContainer extends HTMLElement, TGlow extends HTMLElement> {
  cardRef: React.RefObject<TContainer>
  glowRef: React.RefObject<TGlow>
  handlers: {
    onMouseMove: (e: React.MouseEvent<TContainer>) => void
    onMouseLeave: () => void
  }
}

/**
 * Extracts the repeated cursor-following glow pattern used across GlowCard,
 * StatGlowCard, StepGlowCard, and GlowButton into a single reusable hook.
 *
 * Uses direct DOM mutations (not React state) to avoid triggering 60fps re-renders.
 *
 * @example
 * const { cardRef, glowRef, handlers } = useMouseGlow({ rgb: '16, 185, 129' })
 * return (
 *   <div ref={cardRef} {...handlers}>
 *     <div ref={glowRef} className="pointer-events-none absolute inset-0 opacity-0" />
 *     {children}
 *   </div>
 * )
 */
export function useMouseGlow<
  TContainer extends HTMLElement = HTMLDivElement,
  TGlow extends HTMLElement = HTMLDivElement,
>({
  rgb = '171, 71, 199',
  radius = 400,
  opacity = 0.12,
}: MouseGlowOptions = {}): MouseGlowResult<TContainer, TGlow> {
  const cardRef = useRef<TContainer>(null!)
  const glowRef = useRef<TGlow>(null!)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<TContainer>) => {
      if (!cardRef.current || !glowRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      glowRef.current.style.background = `radial-gradient(${radius}px circle at ${x}px ${y}px, rgba(${rgb}, ${opacity}), transparent 40%)`
      glowRef.current.style.opacity = '1'
    },
    [rgb, radius, opacity],
  )

  const onMouseLeave = useCallback(() => {
    if (!glowRef.current) return
    glowRef.current.style.opacity = '0'
  }, [])

  return {
    cardRef,
    glowRef,
    handlers: { onMouseMove, onMouseLeave },
  }
}
