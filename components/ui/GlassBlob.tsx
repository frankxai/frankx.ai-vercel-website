'use client'

import { Suspense, lazy } from 'react'
import { cn } from '@/lib/utils'

// Lazy load Spline to reduce initial bundle size
const Spline = lazy(() => import('@splinetool/react-spline'))

interface GlassBlobProps {
  /** Spline scene URL - defaults to popular free abstract blob */
  sceneUrl?: string
  /** Additional className for the container */
  className?: string
  /** Height of the container */
  height?: string
  /** Loading fallback component */
  fallback?: React.ReactNode
  /** Called when scene loads */
  onLoad?: () => void
}

/**
 * GlassBlob - Interactive 3D Spline Scene
 *
 * Renders an interactive 3D scene from Spline that users can rotate and interact with.
 * Perfect for hero sections where you want premium, engaging visuals.
 *
 * @example
 * // Basic usage with default blob
 * <GlassBlob className="absolute inset-0" />
 *
 * @example
 * // Custom scene
 * <GlassBlob
 *   sceneUrl="https://prod.spline.design/your-custom-scene/scene.splinecode"
 *   height="500px"
 * />
 *
 * @example
 * // In a hero section
 * <section className="relative h-[600px]">
 *   <GlassBlob className="absolute inset-0 z-0" />
 *   <div className="relative z-10">
 *     <h1>Your Hero Content</h1>
 *   </div>
 * </section>
 */
export default function GlassBlob({
  sceneUrl = 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode',
  className,
  height = '100%',
  fallback,
  onLoad,
}: GlassBlobProps) {
  const defaultFallback = (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-tech-primary/20 to-tech-secondary/20 animate-pulse" />
    </div>
  )

  return (
    <div
      className={cn(
        'overflow-hidden',
        className
      )}
      style={{ height }}
    >
      <Suspense fallback={fallback || defaultFallback}>
        <Spline
          scene={sceneUrl}
          onLoad={onLoad}
          style={{ width: '100%', height: '100%' }}
        />
      </Suspense>
    </div>
  )
}

/**
 * Popular free Spline scene URLs from the community
 * Use these as sceneUrl prop values
 */
export const SPLINE_SCENES = {
  /** Abstract blob - morphing glass sphere */
  abstractBlob: 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode',
  /** Gradient sphere - colorful orb */
  gradientSphere: 'https://prod.spline.design/Fjt3bDuQ3Q3zMfL3/scene.splinecode',
  /** Keyboard 3D - interactive keyboard */
  keyboard3d: 'https://prod.spline.design/GHPJnHVcqHRo1v6T/scene.splinecode',
} as const

/**
 * GlassBlobHero - Pre-composed hero section with Spline background
 *
 * A complete hero section with the 3D blob as background and content overlay.
 */
export function GlassBlobHero({
  children,
  sceneUrl,
  className,
}: {
  children: React.ReactNode
  sceneUrl?: string
  className?: string
}) {
  return (
    <section className={cn('relative min-h-[600px] overflow-hidden', className)}>
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <GlassBlob sceneUrl={sceneUrl} />
      </div>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-void/60 via-transparent to-void/80" />

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </section>
  )
}
