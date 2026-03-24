'use client'

import { cn } from '@/lib/utils'

interface GlowCardProps {
  children: React.ReactNode
  color?: string
  className?: string
}

export function GlowCard({ children, color = 'violet', className }: GlowCardProps) {
  const colorMap: Record<string, string> = {
    violet: 'rgba(139, 92, 246, 0.15)',
    cyan: 'rgba(6, 182, 212, 0.15)',
    emerald: 'rgba(16, 185, 129, 0.15)',
    rose: 'rgba(244, 63, 94, 0.15)',
    amber: 'rgba(245, 158, 11, 0.15)',
    blue: 'rgba(59, 130, 246, 0.15)',
  }

  const glowColor = colorMap[color] || colorMap.violet

  return (
    <div
      className={cn(
        'relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-300',
        className
      )}
      style={{
        boxShadow: `0 0 40px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.05)`,
      }}
    >
      {children}
    </div>
  )
}
