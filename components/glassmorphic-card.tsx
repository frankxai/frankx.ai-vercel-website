import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'subtle' | 'strong' | 'crystal' | 'tech' | 'soul' | 'bridge'

interface GlassmorphicCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  /** Visual variant — controls bg/border tone. Accepted for backward compat with callers across app/. */
  variant?: Variant
  /** Border-color override (Tailwind class). Accepted for backward compat. */
  border?: string
}

const variantClass: Record<Variant, string> = {
  default: 'bg-slate-900/40 border-slate-800/50',
  subtle: 'bg-slate-900/20 border-slate-800/30',
  strong: 'bg-slate-900/60 border-slate-700/60',
  crystal: 'bg-slate-900/30 border-white/10',
  tech: 'bg-emerald-950/30 border-emerald-500/20',
  soul: 'bg-amber-950/30 border-amber-500/20',
  bridge: 'bg-violet-950/30 border-violet-500/20',
}

export function GlassmorphicCard({
  children,
  className,
  onClick,
  variant = 'default',
  border,
}: GlassmorphicCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative p-6 rounded-2xl',
        'backdrop-blur-xl',
        'shadow-lg shadow-slate-950/50',
        'border',
        variantClass[variant],
        border, // explicit border override wins
        className
      )}
    >
      {children}
    </div>
  )
}
