import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SparkBorderProps {
  children: ReactNode
  className?: string
  color?: 'emerald' | 'cyan' | 'purple' | 'amber' | 'gradient'
  speed?: 'slow' | 'normal' | 'fast'
  hoverOnly?: boolean
  /** Background color for the inner mask. Defaults to dark card background. */
  bg?: string
}

const colorMap: Record<string, string> = {
  emerald: '#10b981',
  cyan: '#06b6d4',
  purple: '#AB47C7',
  amber: '#f59e0b',
}

export default function SparkBorder({
  children,
  className,
  color = 'emerald',
  speed = 'normal',
  hoverOnly = true,
  bg = '#0a0f1a',
}: SparkBorderProps) {
  const duration = { slow: '6s', normal: '4s', fast: '2s' }[speed]

  const gradient =
    color === 'gradient'
      ? 'conic-gradient(from 0deg, transparent 55%, #10b981 68%, #06b6d4 76%, #AB47C7 84%, transparent 92%)'
      : `conic-gradient(from 0deg, transparent 55%, ${colorMap[color]}40 68%, ${colorMap[color]} 78%, ${colorMap[color]}40 88%, transparent 92%)`

  const visibilityClass = hoverOnly
    ? 'opacity-0 group-hover:opacity-100'
    : 'opacity-100'

  const glowVisibilityClass = hoverOnly
    ? 'opacity-0 group-hover:opacity-40'
    : 'opacity-25'

  return (
    <div className={cn('relative group rounded-2xl', className)}>
      {/* Spark beam — rotating conic gradient */}
      <div
        className={cn(
          'absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-500',
          visibilityClass
        )}
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: gradient,
            animation: `spin ${duration} linear infinite`,
          }}
        />
      </div>

      {/* Ambient glow (blurred copy for soft halo) */}
      <div
        className={cn(
          'absolute inset-0 rounded-[inherit] overflow-hidden blur-md transition-opacity duration-500',
          glowVisibilityClass
        )}
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: gradient,
            animation: `spin ${duration} linear infinite`,
          }}
        />
      </div>

      {/* Inner mask — covers center, revealing only the border edge */}
      <div
        className="absolute inset-px rounded-[calc(1rem-1px)]"
        style={{ backgroundColor: bg }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
