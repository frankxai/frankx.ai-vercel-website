'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface AuroraBackgroundProps {
  /** Color variant for the aurora effect */
  variant?: 'tech' | 'soul' | 'hybrid' | 'minimal'
  /** Intensity of the glow effects */
  intensity?: 'subtle' | 'normal' | 'vibrant'
  /** Whether to show the grid pattern */
  showGrid?: boolean
  /** Whether to show grain texture */
  showGrain?: boolean
  /** Additional CSS classes */
  className?: string
}

// Color configurations for different variants
const variantColors = {
  tech: {
    primary: 'rgba(16, 185, 129, 0.08)',    // Emerald
    secondary: 'rgba(6, 182, 212, 0.06)',    // Cyan
    tertiary: 'rgba(139, 92, 246, 0.04)',    // Violet (subtle)
  },
  soul: {
    primary: 'rgba(245, 158, 11, 0.08)',     // Amber
    secondary: 'rgba(234, 88, 12, 0.06)',    // Orange
    tertiary: 'rgba(139, 92, 246, 0.04)',    // Violet (subtle)
  },
  hybrid: {
    primary: 'rgba(139, 92, 246, 0.08)',     // Violet
    secondary: 'rgba(16, 185, 129, 0.06)',   // Emerald
    tertiary: 'rgba(245, 158, 11, 0.04)',    // Amber (subtle)
  },
  minimal: {
    primary: 'rgba(16, 185, 129, 0.04)',     // Very subtle emerald
    secondary: 'rgba(6, 182, 212, 0.02)',    // Very subtle cyan
    tertiary: 'rgba(255, 255, 255, 0.01)',   // Almost invisible
  },
}

const intensityMultiplier = {
  subtle: 0.5,
  normal: 1,
  vibrant: 1.5,
}

export default function AuroraBackground({
  variant = 'tech',
  intensity = 'normal',
  showGrid = true,
  showGrain = true,
  className = '',
}: AuroraBackgroundProps) {
  const shouldReduceMotion = useReducedMotion()
  const colors = variantColors[variant]
  const multiplier = intensityMultiplier[intensity]

  // Adjust opacity based on intensity
  const adjustOpacity = (color: string) => {
    const match = color.match(/rgba?\(([^)]+)\)/)
    if (!match) return color
    const parts = match[1].split(',')
    if (parts.length === 4) {
      const opacity = parseFloat(parts[3]) * multiplier
      return `rgba(${parts[0]},${parts[1]},${parts[2]}, ${opacity})`
    }
    return color
  }

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Base gradient - deep void foundation */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-[#0d0d0f] to-void" />

      {/* Primary aurora orb */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] md:w-[70%] md:h-[70%]"
        style={{
          background: `radial-gradient(ellipse at center, ${adjustOpacity(colors.primary)} 0%, ${adjustOpacity(colors.primary).replace(/[\d.]+\)$/, '0.02)')} 40%, transparent 70%)`,
          filter: 'blur(100px)',
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 80, 0],
                y: [0, 50, 0],
                scale: [1, 1.1, 1],
              }
        }
        transition={shouldReduceMotion ? undefined : { duration: 35, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Secondary aurora orb */}
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] md:w-[60%] md:h-[60%]"
        style={{
          background: `radial-gradient(ellipse at center, ${adjustOpacity(colors.secondary)} 0%, ${adjustOpacity(colors.secondary).replace(/[\d.]+\)$/, '0.015)')} 40%, transparent 70%)`,
          filter: 'blur(100px)',
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, -60, 0],
                y: [0, -40, 0],
                scale: [1, 1.15, 1],
              }
        }
        transition={shouldReduceMotion ? undefined : { duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Tertiary accent orb */}
      <motion.div
        className="absolute top-[30%] right-[10%] w-[40%] h-[40%] md:w-[35%] md:h-[35%]"
        style={{
          background: `radial-gradient(ellipse at center, ${adjustOpacity(colors.tertiary)} 0%, transparent 60%)`,
          filter: 'blur(80px)',
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, -30, 0],
                y: [0, 40, 0],
                scale: [1, 1.05, 1],
              }
        }
        transition={shouldReduceMotion ? undefined : { duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grain texture overlay */}
      {showGrain && (
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
          }}
        />
      )}

      {/* Grid pattern */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      )}

      {/* Vignette effect for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </div>
  )
}
