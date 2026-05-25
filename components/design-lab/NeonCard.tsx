'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import ShimmerCard from '@/components/ui/ShimmerCard'

type NeonColor = 'emerald' | 'amber' | 'violet' | 'cyan'

const accentGradients: Record<NeonColor, string> = {
  emerald: 'from-emerald-400 to-cyan-400',
  amber: 'from-amber-400 to-rose-400',
  violet: 'from-violet-400 to-purple-400',
  cyan: 'from-cyan-400 to-blue-400',
}

const shimmerMap: Record<NeonColor, 'emerald' | 'gold' | 'brand' | 'ice'> = {
  emerald: 'emerald',
  amber: 'gold',
  violet: 'brand',
  cyan: 'ice',
}

interface NeonCardProps {
  children: ReactNode
  color?: NeonColor
  className?: string
}

/**
 * NeonCard — ShimmerCard wrapper with gradient accent line.
 *
 * Features:
 * - 2px tall, 12px wide accent line that expands to full width on hover
 * - ShimmerCard shimmer border activates on hover
 * - Section-specific color theming
 */
export function NeonCard({ children, color = 'emerald', className }: NeonCardProps) {
  return (
    <ShimmerCard
      color={shimmerMap[color]}
      hoverOnly
      speed="normal"
      bg="#0a0f1a"
      className={cn('group', className)}
    >
      <div className="p-5 sm:p-6">
        {/* Gradient accent line — expands on hover */}
        <div className="relative h-0.5 mb-5 overflow-hidden rounded-full">
          <div
            className={cn(
              'absolute top-0 left-0 h-full rounded-full bg-gradient-to-r transition-all duration-500',
              'w-3 group-hover:w-full',
              accentGradients[color],
            )}
          />
          <div className="w-full h-full bg-white/[0.06]" />
        </div>

        {children}
      </div>
    </ShimmerCard>
  )
}
