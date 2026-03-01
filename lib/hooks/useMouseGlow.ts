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
    onPointerMove: (e: React.PointerEvent<TContainer>) => void
    onPointerLeave: (e: React.PointerEvent<TContainer>) => void
    onTouchMove: (e: React.TouchEvent<TContainer>) => void
    onTouchEnd: () => void
  }
}

/**
 * Cursor/touch/pen-following glow effect using direct DOM mutations (60fps).
 *
 * Supports three input modes via Pointer Events + touch fallback:
 * - **Mouse** (desktop): glow follows cursor on hover
 * - **Touch** (mobile/tablet): glow follows finger while touching
 * - **Apple Pencil hover** (M2+ iPad Pro): glow follows pencil ~12mm above screen
 *
 * @example
 * const { cardRef, glowRef, handlers } = useMouseGlow({ rgb: '16, 185, 129' })
 * return (
 *   <div ref={cardRef} {...handlers}>
 *     <div ref={glowRef} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300" />
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

  const applyGlow = useCallback(
    (clientX: number, clientY: number) => {
      if (!cardRef.current || !glowRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      glowRef.current.style.background = `radial-gradient(${radius}px circle at ${x}px ${y}px, rgba(${rgb}, ${opacity}), transparent 40%)`
      glowRef.current.style.opacity = '1'
    },
    [rgb, radius, opacity],
  )

  const clearGlow = useCallback(() => {
    if (!glowRef.current) return
    glowRef.current.style.opacity = '0'
  }, [])

  // Mouse events (desktop — kept for backward compat with existing onMouseMove/onMouseLeave usage)
  const onMouseMove = useCallback(
    (e: React.MouseEvent<TContainer>) => applyGlow(e.clientX, e.clientY),
    [applyGlow],
  )

  // Pointer events (unified: mouse + touch + pen/stylus)
  const onPointerMove = useCallback(
    (e: React.PointerEvent<TContainer>) => applyGlow(e.clientX, e.clientY),
    [applyGlow],
  )

  const onPointerLeave = useCallback(
    (_e: React.PointerEvent<TContainer>) => clearGlow(),
    [clearGlow],
  )

  // Touch events (explicit fallback for older browsers without Pointer Events)
  const onTouchMove = useCallback(
    (e: React.TouchEvent<TContainer>) => {
      const touch = e.touches[0]
      if (touch) applyGlow(touch.clientX, touch.clientY)
    },
    [applyGlow],
  )

  return {
    cardRef,
    glowRef,
    handlers: {
      onMouseMove,
      onMouseLeave: clearGlow,
      onPointerMove,
      onPointerLeave,
      onTouchMove,
      onTouchEnd: clearGlow,
    },
  }
}
