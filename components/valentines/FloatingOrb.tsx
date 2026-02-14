'use client'

import { cn } from '@/lib/utils'

interface FloatingOrbProps {
  title: string
  description: string
  icon?: React.ReactNode
  className?: string
  glowColor?: 'rose' | 'gold' | 'violet' | 'teal'
  delay?: number
}

const glowStyles = {
  rose: 'group-hover:shadow-rose-500/20',
  gold: 'group-hover:shadow-amber-500/20',
  violet: 'group-hover:shadow-violet-500/20',
  teal: 'group-hover:shadow-teal-500/20',
}

const accentStyles = {
  rose: 'from-rose-500/20 to-rose-500/5',
  gold: 'from-amber-500/20 to-amber-500/5',
  violet: 'from-violet-500/20 to-violet-500/5',
  teal: 'from-teal-500/20 to-teal-500/5',
}

const iconColors = {
  rose: 'text-rose-400/60',
  gold: 'text-amber-400/60',
  violet: 'text-violet-400/60',
  teal: 'text-teal-400/60',
}

export function FloatingOrb({
  title,
  description,
  icon,
  className,
  glowColor = 'rose',
  delay = 0,
}: FloatingOrbProps) {
  return (
    <div
      className={cn(
        'group relative p-6 md:p-8 rounded-2xl',
        'bg-white/[0.03] backdrop-blur-sm border border-white/[0.06]',
        'hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-500',
        'hover:shadow-2xl',
        glowStyles[glowColor],
        'animate-gentle-float',
        className
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Background glow on hover */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl',
          accentStyles[glowColor]
        )}
      />

      {icon && (
        <div className={cn('mb-4 text-2xl', iconColors[glowColor])}>
          {icon}
        </div>
      )}

      <h3 className="font-display text-xl md:text-2xl text-white/90 mb-3 font-light">
        {title}
      </h3>
      <p className="font-body-serif text-sm md:text-base text-white/50 leading-relaxed italic">
        {description}
      </p>
    </div>
  )
}
