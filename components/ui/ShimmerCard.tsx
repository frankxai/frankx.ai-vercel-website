'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useMouseGlow } from '@/lib/hooks/useMouseGlow'

// ── Color presets ──

const shimmerColors: Record<string, { css: string; rgb: string }> = {
  brand:   { css: 'shimmer-border',          rgb: '171, 71, 199' },
  rainbow: { css: 'shimmer-border shimmer-rainbow', rgb: '16, 185, 129' },
  gold:    { css: 'shimmer-border shimmer-gold',    rgb: '245, 158, 11' },
  emerald: { css: 'shimmer-border shimmer-emerald', rgb: '16, 185, 129' },
  ice:     { css: 'shimmer-border shimmer-ice',     rgb: '67, 191, 227' },
}

const speedClasses: Record<string, string> = {
  fast:   'shimmer-border-fast',
  normal: '',
  slow:   'shimmer-border-slow',
}

export interface ShimmerCardProps {
  children: ReactNode
  /** Shimmer color preset. Default: 'brand' (purple→cyan). */
  color?: 'brand' | 'rainbow' | 'gold' | 'emerald' | 'ice'
  /** Animation speed. Default: 'normal' (3s). */
  speed?: 'fast' | 'normal' | 'slow'
  /** If true, shimmer only appears on hover. Default: false. */
  hoverOnly?: boolean
  /** Variant controls what effects are applied. Default: 'both'. */
  variant?: 'shimmer' | 'glow-only' | 'both'
  /** Border width in px. Default: 1. */
  borderWidth?: number
  /** Inner background. Default: transparent. */
  bg?: string
  className?: string
  /** Rounded corners. Default: 'rounded-2xl'. */
  rounded?: string
}

/**
 * Premium card with CSS Houdini @property shimmer border + cursor-following glow.
 *
 * Uses the `@property --shimmer-angle` registered CSS property for butter-smooth
 * conic-gradient rotation — superior to the SparkBorder 200%×200% div approach.
 *
 * @example
 * <ShimmerCard color="brand" hoverOnly speed="normal">
 *   <p>Content here</p>
 * </ShimmerCard>
 */
export default function ShimmerCard({
  children,
  color = 'brand',
  speed = 'normal',
  hoverOnly = false,
  variant = 'both',
  borderWidth = 1,
  bg = 'transparent',
  className,
  rounded = 'rounded-2xl',
}: ShimmerCardProps) {
  const preset = shimmerColors[color] ?? shimmerColors.brand

  const { cardRef, glowRef, handlers } = useMouseGlow<HTMLDivElement>({
    rgb: preset.rgb,
    radius: 450,
    opacity: 0.15,
  })

  const showShimmer = variant === 'shimmer' || variant === 'both'
  const showGlow    = variant === 'glow-only' || variant === 'both'

  // Build shimmer CSS class string
  const shimmerCls = cn(
    preset.css,
    speedClasses[speed],
    hoverOnly ? 'shimmer-border-hover' : '',
  )

  return (
    <div
      ref={cardRef}
      onPointerMove={showGlow ? handlers.onPointerMove : undefined}
      onPointerLeave={showGlow ? handlers.onPointerLeave : undefined}
      onTouchMove={showGlow ? handlers.onTouchMove : undefined}
      onTouchEnd={showGlow ? handlers.onTouchEnd : undefined}
      className={cn(
        'relative',
        hoverOnly ? 'shimmer-hover-parent group' : '',
        rounded,
        className,
      )}
    >
      {/* Houdini shimmer border layer */}
      {showShimmer && (
        <div
          className={cn(
            'absolute inset-0 pointer-events-none',
            rounded,
          )}
          aria-hidden="true"
          style={{ padding: borderWidth }}
        >
          {/* The conic-gradient fills this div; inner mask clips to just the border */}
          <div
            className={cn('absolute inset-0', rounded, shimmerCls)}
            aria-hidden="true"
          />
          {/* Inner mask — background matches card bg, leaving only border ring visible */}
          <div
            className={cn('absolute rounded-[inherit]', rounded)}
            style={{
              inset: borderWidth,
              background: bg === 'transparent' ? 'transparent' : bg,
            }}
            aria-hidden="true"
          />
        </div>
      )}

      {/* Cursor-following radial glow */}
      {showGlow && (
        <div
          ref={glowRef}
          className={cn(
            'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300',
            rounded,
          )}
          aria-hidden="true"
        />
      )}

      {/* Ambient top glow on hover */}
      {showGlow && (
        <div
          className={cn(
            'pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500',
            rounded,
          )}
          style={{
            background: `radial-gradient(ellipse at 50% 0%, rgba(${preset.rgb}, 0.08), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
