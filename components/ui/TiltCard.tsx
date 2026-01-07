'use client'

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { ReactNode, useRef } from 'react'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: ReactNode
  className?: string
  intensity?: number
  glowEffect?: boolean
}

/**
 * 3D Tilt Card with mouse tracking
 * Creates perspective depth and glow effect on hover
 */
export function TiltCard({
  children,
  className,
  intensity = 7.5,
  glowEffect = true
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`])

  // Glow position tracking
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%'])
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        transformStyle: 'preserve-3d',
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
      className={cn('relative', className)}
    >
      {/* Glow effect overlay */}
      {glowEffect && !shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-inherit opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${glowX} ${glowY}, rgba(14, 165, 233, 0.15), transparent 40%)`,
          }}
        />
      )}

      {/* Content with depth */}
      <div
        style={{
          transform: 'translateZ(50px)',
          transformStyle: 'preserve-3d'
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}
