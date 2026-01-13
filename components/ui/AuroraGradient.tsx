'use client'

import { cn } from '@/lib/utils'

/**
 * Aurora Gradient Background
 *
 * Creates the signature FrankX aurora effect using layered radial gradients.
 * Use as a container background or standalone decorative element.
 *
 * @example
 * // As a card background
 * <AuroraGradient className="rounded-3xl p-8">
 *   <h2>Your content</h2>
 * </AuroraGradient>
 *
 * @example
 * // With custom colors
 * <AuroraGradient variant="purple">
 *   <h2>Purple theme</h2>
 * </AuroraGradient>
 */

type AuroraVariant = 'default' | 'emerald' | 'purple' | 'sunset' | 'ocean' | 'minimal'

type AuroraGradientProps = {
  children?: React.ReactNode
  className?: string
  variant?: AuroraVariant
  showNoise?: boolean
  intensity?: 'subtle' | 'normal' | 'vibrant'
  as?: 'div' | 'section' | 'header' | 'article'
}

// Gradient configurations for each variant
const gradientVariants: Record<AuroraVariant, string> = {
  // Original FrankX signature (emerald + cyan + amber)
  default: `
    radial-gradient(circle at top, rgba(16,185,129,0.35), transparent 55%),
    radial-gradient(circle at 25% 60%, rgba(34,211,238,0.25), transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(245,158,11,0.2), transparent 55%)
  `,
  // Emerald focus (for growth/nature content)
  emerald: `
    radial-gradient(circle at top, rgba(16,185,129,0.4), transparent 60%),
    radial-gradient(circle at 30% 70%, rgba(52,211,153,0.25), transparent 50%),
    radial-gradient(circle at 75% 50%, rgba(16,185,129,0.15), transparent 55%)
  `,
  // Purple theme (for creative/spiritual content)
  purple: `
    radial-gradient(circle at top, rgba(147,51,234,0.35), transparent 55%),
    radial-gradient(circle at 25% 60%, rgba(168,85,247,0.25), transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(236,72,153,0.2), transparent 55%)
  `,
  // Sunset theme (warm, inspirational)
  sunset: `
    radial-gradient(circle at top, rgba(251,146,60,0.35), transparent 55%),
    radial-gradient(circle at 25% 60%, rgba(245,158,11,0.25), transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(239,68,68,0.2), transparent 55%)
  `,
  // Ocean theme (calm, professional)
  ocean: `
    radial-gradient(circle at top, rgba(6,182,212,0.35), transparent 55%),
    radial-gradient(circle at 25% 60%, rgba(59,130,246,0.25), transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(99,102,241,0.2), transparent 55%)
  `,
  // Minimal (subtle, one color)
  minimal: `
    radial-gradient(circle at 50% 0%, rgba(16,185,129,0.2), transparent 70%)
  `,
}

// Intensity multipliers
const intensityOpacity: Record<string, number> = {
  subtle: 0.5,
  normal: 0.7,
  vibrant: 1.0,
}

// Noise SVG as data URI
const noiseSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E`

export default function AuroraGradient({
  children,
  className,
  variant = 'default',
  showNoise = true,
  intensity = 'normal',
  as: Component = 'div',
}: AuroraGradientProps) {
  const baseOpacity = intensityOpacity[intensity]

  return (
    <Component
      className={cn(
        'relative overflow-hidden bg-slate-950/70',
        className
      )}
    >
      {/* Main gradient layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: gradientVariants[variant],
          opacity: baseOpacity,
        }}
      />

      {/* Noise texture layer */}
      {showNoise && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          aria-hidden
          style={{
            backgroundImage: `url("${noiseSvg}")`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </Component>
  )
}

/**
 * Standalone gradient background CSS for use in custom components
 * Import this in your component's style or use with cn()
 */
export const auroraGradientCSS = {
  default: gradientVariants.default,
  emerald: gradientVariants.emerald,
  purple: gradientVariants.purple,
  sunset: gradientVariants.sunset,
  ocean: gradientVariants.ocean,
  minimal: gradientVariants.minimal,
  noise: `url("${noiseSvg}")`,
}
