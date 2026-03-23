'use client'

import { cn } from '@/lib/utils'

interface QuoteCardProps {
  quote: string
  author: string
  source?: string
  className?: string
  variant?: 'default' | 'large' | 'intimate' | 'wisdom'
  accentColor?: 'rose' | 'gold' | 'violet' | 'teal'
}

export function QuoteCard({
  quote,
  author,
  source,
  className,
  variant = 'default',
  accentColor = 'rose',
}: QuoteCardProps) {
  const accentMap = {
    rose: {
      border: 'from-rose-500/20 via-transparent to-rose-500/10',
      glow: 'from-rose-500/10 to-transparent',
      cite: 'text-rose-300/70',
      line: 'from-rose-500/30',
    },
    gold: {
      border: 'from-amber-500/20 via-transparent to-amber-500/10',
      glow: 'from-amber-500/10 to-transparent',
      cite: 'text-amber-300/70',
      line: 'from-amber-500/30',
    },
    violet: {
      border: 'from-violet-500/20 via-transparent to-violet-500/10',
      glow: 'from-violet-500/10 to-transparent',
      cite: 'text-violet-300/70',
      line: 'from-violet-500/30',
    },
    teal: {
      border: 'from-teal-500/20 via-transparent to-teal-500/10',
      glow: 'from-teal-500/10 to-transparent',
      cite: 'text-teal-300/70',
      line: 'from-teal-500/30',
    },
  }

  const accent = accentMap[accentColor]

  return (
    <div
      className={cn(
        'relative p-8 rounded-2xl backdrop-blur-sm border border-white/5',
        'bg-gradient-to-br from-white/[0.03] to-white/[0.01]',
        'animate-breathe',
        variant === 'large' && 'p-10 md:p-14',
        variant === 'intimate' && 'p-6 md:p-10 text-center',
        variant === 'wisdom' && 'p-6 md:p-8',
        className
      )}
    >
      {/* Subtle glow behind the card */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl bg-gradient-to-br -z-10 blur-xl opacity-50',
          accent.glow
        )}
      />

      <blockquote
        className={cn(
          'font-serif italic leading-relaxed text-white/90',
          variant === 'large'
            ? 'text-xl md:text-2xl lg:text-3xl'
            : variant === 'wisdom'
              ? 'text-base md:text-lg'
              : 'text-lg md:text-xl'
        )}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>

      <footer className="mt-4 flex items-center gap-3">
        <div
          className={cn(
            'h-px flex-1 bg-gradient-to-r to-transparent',
            accent.line
          )}
        />
        <cite
          className={cn(
            'text-sm not-italic tracking-wide whitespace-nowrap',
            accent.cite
          )}
        >
          {author}
          {source && (
            <span className="text-white/30 ml-1">— {source}</span>
          )}
        </cite>
      </footer>
    </div>
  )
}
