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
    onPointerLeave: () => void
    onTouchMove: (e: React.TouchEvent<TContainer>) => void
    onTouchEnd: () => void
  }
}

/**
 * Cursor-following glow hook with Pointer Events + RAF batching.
 *
 * Uses direct DOM mutations (not React state) to avoid 60fps re-renders.
 * Pointer Events unify mouse, touch, and pen/stylus (incl. Apple Pencil hover).
 * RAF batching coalesces rapid events into one getBoundingClientRect per frame.
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
  const rafId = useRef<number>(0)

  const applyGlow = useCallback(
    (clientX: number, clientY: number) => {
      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => {
        if (!cardRef.current || !glowRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = clientX - rect.left
        const y = clientY - rect.top
        glowRef.current.style.background = `radial-gradient(${radius}px circle at ${x}px ${y}px, rgba(${rgb}, ${opacity}), transparent 40%)`
        glowRef.current.style.opacity = '1'
      })
    },
    [rgb, radius, opacity],
  )

  const clearGlow = useCallback(() => {
    cancelAnimationFrame(rafId.current)
    if (!glowRef.current) return
    glowRef.current.style.opacity = '0'
  }, [])

  // Mouse handlers (legacy compat)
  const onMouseMove = useCallback(
    (e: React.MouseEvent<TContainer>) => applyGlow(e.clientX, e.clientY),
    [applyGlow],
  )

  // Pointer Events — unified mouse + touch + pen/stylus
  const onPointerMove = useCallback(
    (e: React.PointerEvent<TContainer>) => applyGlow(e.clientX, e.clientY),
    [applyGlow],
  )

  // Touch fallback for older browsers without Pointer Events
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
      onPointerLeave: clearGlow,
      onTouchMove,
      onTouchEnd: clearGlow,
    },
  }
}
