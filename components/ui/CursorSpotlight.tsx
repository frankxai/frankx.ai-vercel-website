'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'

/**
 * Cursor-following spotlight effect
 * Creates a subtle glow that follows the mouse
 */
export function CursorSpotlight() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [shouldReduceMotion])

  if (shouldReduceMotion) return null

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 hidden lg:block"
      animate={{
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.08), transparent 80%)`
      }}
      transition={{ type: 'tween', ease: 'linear', duration: 0.15 }}
    />
  )
}
