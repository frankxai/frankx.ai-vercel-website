import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassmorphicCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function GlassmorphicCard({ children, className, onClick }: GlassmorphicCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative p-6 rounded-2xl",
        "bg-slate-900/40 backdrop-blur-xl",
        "border border-slate-800/50",
        "shadow-lg shadow-slate-950/50",
        className
      )}
    >
      {children}
    </div>
  )
}
