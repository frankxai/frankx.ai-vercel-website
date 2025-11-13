'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AnimatedMeshProps {
  variant?: 'hero' | 'subtle' | 'vibrant'
  speed?: 'slow' | 'medium' | 'fast'
  className?: string
}

/**
 * Premium animated gradient mesh background
 * Creates flowing, organic gradient patterns with multiple color stops
 */
export default function AnimatedMesh({
  variant = 'hero',
  speed = 'slow',
  className = ''
}: AnimatedMeshProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const speedDurations = {
    slow: 20,
    medium: 12,
    fast: 8
  }

  const duration = speedDurations[speed]

  const variants = {
    hero: {
      colors: [
        'rgba(6, 182, 212, 0.15)', // cyan-500
        'rgba(168, 85, 247, 0.12)', // purple-500
        'rgba(251, 191, 36, 0.08)', // amber-400
        'rgba(14, 165, 233, 0.10)', // sky-500
      ]
    },
    subtle: {
      colors: [
        'rgba(6, 182, 212, 0.08)',
        'rgba(168, 85, 247, 0.06)',
        'rgba(100, 116, 139, 0.05)', // slate-500
        'rgba(14, 165, 233, 0.06)',
      ]
    },
    vibrant: {
      colors: [
        'rgba(6, 182, 212, 0.25)',
        'rgba(168, 85, 247, 0.20)',
        'rgba(251, 191, 36, 0.15)',
        'rgba(236, 72, 153, 0.18)', // pink-500
      ]
    }
  }

  const colors = variants[variant].colors

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px]"
        style={{
          background: `radial-gradient(circle, ${colors[0]}, transparent 70%)`
        }}
        animate={{
          x: ['-20%', '40%', '-20%'],
          y: ['-10%', '30%', '-10%'],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full blur-[100px]"
        style={{
          background: `radial-gradient(circle, ${colors[1]}, transparent 70%)`,
          right: 0,
          top: '20%'
        }}
        animate={{
          x: ['20%', '-30%', '20%'],
          y: ['10%', '-20%', '10%'],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: duration * 1.2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[90px]"
        style={{
          background: `radial-gradient(circle, ${colors[2]}, transparent 70%)`,
          left: '30%',
          bottom: '10%'
        }}
        animate={{
          x: ['-10%', '20%', '-10%'],
          y: ['20%', '-10%', '20%'],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: duration * 0.9,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[80px]"
        style={{
          background: `radial-gradient(circle, ${colors[3]}, transparent 70%)`,
          right: '20%',
          bottom: '20%'
        }}
        animate={{
          x: ['15%', '-25%', '15%'],
          y: ['-15%', '25%', '-15%'],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: duration * 1.1,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Interactive orb that follows mouse */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[70px] pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colors[0]}, transparent 60%)`,
        }}
        animate={{
          x: `${mousePosition.x * 100}%`,
          y: `${mousePosition.y * 100}%`,
        }}
        transition={{
          type: 'spring',
          stiffness: 50,
          damping: 30
        }}
      />

      {/* Noise texture overlay for grain */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
    </div>
  )
}
