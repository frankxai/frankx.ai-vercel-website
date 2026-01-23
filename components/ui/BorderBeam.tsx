'use client'

import { cn } from '@/lib/utils'

interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  anchor?: number
  borderWidth?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
}

/**
 * BorderBeam - Animated light beam that travels around element borders
 *
 * Creates a "living border" effect where light appears to move around the
 * perimeter of a card or container, adding premium visual interest.
 *
 * @example
 * <div className="relative overflow-hidden rounded-xl border border-white/10">
 *   <BorderBeam />
 *   <div className="relative z-10">{content}</div>
 * </div>
 */
export default function BorderBeam({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = '#10b981', // tech-primary (emerald)
  colorTo = '#06b6d4',   // tech-secondary (cyan)
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          '--size': size,
          '--duration': duration,
          '--anchor': anchor,
          '--border-width': borderWidth,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          '--delay': `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit]',
        // Mask to show only the border area
        '[mask-clip:padding-box,border-box]',
        '[mask-composite:intersect]',
        // Create the mask shape
        '[mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]',
        // Animated background that creates the beam effect
        'after:absolute after:aspect-square after:w-[calc(var(--size)*1px)]',
        'after:animate-border-beam',
        'after:[animation-delay:var(--delay)]',
        'after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)]',
        // Position the beam
        'after:[offset-anchor:calc(var(--anchor)*1%)_50%]',
        'after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]',
        className
      )}
    />
  )
}

/**
 * BorderBeamCard - Pre-composed card with border beam effect
 *
 * A complete card component with glass effect and animated border beam.
 *
 * @example
 * <BorderBeamCard>
 *   <h3>Creator Studio</h3>
 *   <p>Build your creative workflow</p>
 * </BorderBeamCard>
 */
export function BorderBeamCard({
  children,
  className,
  variant = 'tech',
  beamDuration = 15,
}: {
  children: React.ReactNode
  className?: string
  variant?: 'tech' | 'soul' | 'hybrid'
  beamDuration?: number
}) {
  const colorConfig = {
    tech: { from: '#10b981', to: '#06b6d4' },
    soul: { from: '#f59e0b', to: '#fbbf24' },
    hybrid: { from: '#8b5cf6', to: '#06b6d4' },
  }

  const { from, to } = colorConfig[variant]

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl',
        'border border-white/10',
        'bg-space/40 backdrop-blur-xl',
        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]',
        'transition-all duration-300',
        'hover:border-white/20',
        className
      )}
    >
      <BorderBeam
        colorFrom={from}
        colorTo={to}
        duration={beamDuration}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
