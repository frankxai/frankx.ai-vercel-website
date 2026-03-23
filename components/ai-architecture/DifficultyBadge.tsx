import { cn } from '@/lib/utils'
import type { DifficultyLevel } from '@/types/ai-architecture'
import { DIFFICULTY_META } from '@/types/ai-architecture'

interface DifficultyBadgeProps {
  level: DifficultyLevel
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

const sizeClasses = {
  sm: 'px-1.5 py-0.5 text-[10px]',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-3 py-1 text-sm',
}

const colorClasses: Record<DifficultyLevel, string> = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  advanced: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  expert: 'bg-red-500/20 text-red-400 border-red-500/30',
}

export function DifficultyBadge({
  level,
  size = 'md',
  showLabel = true,
  className,
}: DifficultyBadgeProps) {
  const meta = DIFFICULTY_META[level]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border font-medium',
        sizeClasses[size],
        colorClasses[level],
        className
      )}
    >
      {showLabel ? meta.name : meta.name.charAt(0)}
    </span>
  )
}

export default DifficultyBadge
