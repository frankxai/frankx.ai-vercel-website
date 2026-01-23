'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Floating3DAssetProps {
  /** Path to the 3D asset image */
  src: string
  /** Alt text for accessibility */
  alt?: string
  /** Predefined position or custom className */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'custom'
  /** Custom position classes when position is 'custom' */
  positionClassName?: string
  /** Size preset */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Animation variant */
  animation?: 'float' | 'rotate' | 'pulse' | 'float-rotate' | 'none'
  /** Animation duration in seconds */
  duration?: number
  /** Delay before animation starts */
  delay?: number
  /** Additional className */
  className?: string
  /** Z-index layer */
  zIndex?: number
  /** Opacity (0-100) */
  opacity?: number
  /** Blur amount for depth effect */
  blur?: 'none' | 'sm' | 'md'
}

const positionStyles = {
  'top-left': 'top-0 left-0 -translate-x-1/4 -translate-y-1/4',
  'top-right': 'top-0 right-0 translate-x-1/4 -translate-y-1/4',
  'bottom-left': 'bottom-0 left-0 -translate-x-1/4 translate-y-1/4',
  'bottom-right': 'bottom-0 right-0 translate-x-1/4 translate-y-1/4',
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'custom': '',
}

const sizeStyles = {
  sm: { width: 80, height: 80 },
  md: { width: 120, height: 120 },
  lg: { width: 180, height: 180 },
  xl: { width: 240, height: 240 },
  '2xl': { width: 320, height: 320 },
}

const blurStyles = {
  none: '',
  sm: 'blur-[1px]',
  md: 'blur-[2px]',
}

/**
 * Floating3DAsset - Animated 3D decorative element
 *
 * Places a floating, animated 3D asset (glass sphere, prism, etc.) as decoration.
 * Use sparingly for premium visual effect in hero sections and feature cards.
 *
 * @example
 * // Basic usage
 * <div className="relative">
 *   <Floating3DAsset
 *     src="/images/3d/glass-sphere.png"
 *     position="top-right"
 *     size="lg"
 *   />
 *   <CardContent />
 * </div>
 *
 * @example
 * // Multiple assets with depth
 * <div className="relative">
 *   <Floating3DAsset src="/images/3d/glass-cube.png" position="top-left" size="md" opacity={60} blur="sm" />
 *   <Floating3DAsset src="/images/3d/glass-sphere.png" position="bottom-right" size="lg" />
 *   <Content />
 * </div>
 */
export default function Floating3DAsset({
  src,
  alt = '',
  position = 'top-right',
  positionClassName,
  size = 'md',
  animation = 'float',
  duration = 6,
  delay = 0,
  className,
  zIndex = 0,
  opacity = 100,
  blur = 'none',
}: Floating3DAssetProps) {
  const { width, height } = sizeStyles[size]

  // Animation variants
  const animations = {
    float: {
      y: [0, -12, 0],
      transition: {
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      },
    },
    rotate: {
      rotate: [0, 360],
      transition: {
        duration: duration * 2,
        repeat: Infinity,
        ease: 'linear',
        delay,
      },
    },
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [opacity / 100, (opacity * 0.8) / 100, opacity / 100],
      transition: {
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      },
    },
    'float-rotate': {
      y: [0, -12, 0],
      rotate: [0, 10, -10, 0],
      transition: {
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      },
    },
    none: {},
  }

  return (
    <motion.div
      className={cn(
        'absolute pointer-events-none select-none',
        position !== 'custom' && positionStyles[position],
        position === 'custom' && positionClassName,
        blurStyles[blur],
        className
      )}
      style={{
        zIndex,
        opacity: animation === 'pulse' ? undefined : opacity / 100,
      }}
      animate={animations[animation]}
      initial={animation === 'pulse' ? { opacity: opacity / 100 } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-contain"
        priority={false}
      />
    </motion.div>
  )
}

/**
 * Floating3DScene - Pre-composed scene with multiple floating assets
 *
 * Creates a complete decorative scene with multiple 3D assets at different depths.
 * Perfect for hero sections or large feature cards.
 */
export function Floating3DScene({
  variant = 'tech',
  className,
}: {
  variant?: 'tech' | 'soul' | 'mixed'
  className?: string
}) {
  // Asset configurations based on variant
  const scenes = {
    tech: [
      { src: '/images/3d/glass-sphere.png', position: 'top-right' as const, size: 'lg' as const, opacity: 80, delay: 0 },
      { src: '/images/3d/glass-cube.png', position: 'bottom-left' as const, size: 'md' as const, opacity: 50, blur: 'sm' as const, delay: 1 },
      { src: '/images/3d/glass-prism.png', position: 'top-left' as const, size: 'sm' as const, opacity: 40, blur: 'md' as const, delay: 2 },
    ],
    soul: [
      { src: '/images/3d/glass-donut.png', position: 'top-right' as const, size: 'lg' as const, opacity: 80, delay: 0 },
      { src: '/images/3d/glass-sphere.png', position: 'bottom-left' as const, size: 'md' as const, opacity: 50, blur: 'sm' as const, delay: 1.5 },
    ],
    mixed: [
      { src: '/images/3d/glass-sphere.png', position: 'top-right' as const, size: 'xl' as const, opacity: 70, delay: 0 },
      { src: '/images/3d/glass-cube.png', position: 'bottom-left' as const, size: 'lg' as const, opacity: 60, delay: 0.5 },
      { src: '/images/3d/glass-prism.png', position: 'top-left' as const, size: 'md' as const, opacity: 40, blur: 'sm' as const, delay: 1 },
      { src: '/images/3d/glass-donut.png', position: 'bottom-right' as const, size: 'sm' as const, opacity: 30, blur: 'md' as const, delay: 1.5 },
    ],
  }

  const assets = scenes[variant]

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {assets.map((asset, index) => (
        <Floating3DAsset
          key={index}
          src={asset.src}
          position={asset.position}
          size={asset.size}
          opacity={asset.opacity}
          blur={asset.blur}
          delay={asset.delay}
          animation="float"
          duration={6 + index}
        />
      ))}
    </div>
  )
}
