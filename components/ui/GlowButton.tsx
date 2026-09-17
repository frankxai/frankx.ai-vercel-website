'use client'

import { useReducedMotion } from 'framer-motion'
import { useMouseGlow } from '@/lib/hooks/useMouseGlow'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const glowColors: Record<string, string> = {
  emerald: '16, 185, 129',
  cyan: '6, 182, 212',
  violet: '139, 92, 246',
  white: '255, 255, 255',
}

interface GlowButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  color?: keyof typeof glowColors
  className?: string
  href?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit'
  target?: string
  rel?: string
}

const sizeClasses = {
  sm: 'px-4 py-2.5 text-sm rounded-full min-h-[40px] gap-1.5',
  md: 'px-5 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base rounded-full min-h-[44px] gap-2',
  lg: 'px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg rounded-full min-h-[48px] gap-2 sm:gap-3',
}

const variantBase = {
  primary:
    'bg-white text-black font-semibold hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]',
  secondary:
    'bg-transparent text-white/70 hover:text-white font-medium border border-white/10 hover:border-white/20 hover:bg-white/5',
}

export function GlowButton({
  children,
  variant = 'primary',
  size = 'md',
  color = 'emerald',
  className,
  href,
  onClick,
  disabled,
  type = 'button',
  target,
  rel,
}: GlowButtonProps) {
  const shouldReduceMotion = useReducedMotion()
  const rgb = glowColors[color] || glowColors.emerald

  const { cardRef: containerRef, glowRef, handlers } = useMouseGlow<HTMLDivElement>({
    rgb,
    radius: 180,
    opacity: variant === 'primary' ? 0.12 : 0.2,
  })
  // Respect prefers-reduced-motion — omit handlers entirely when active
  const pointerHandlers = shouldReduceMotion || disabled
    ? {}
    : {
        onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => {
          if (event.pointerType === 'mouse' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            handlers.onPointerMove(event)
          }
        },
        onPointerLeave: handlers.onPointerLeave,
      }

  const sharedClasses = cn(
    'relative inline-flex items-center justify-center overflow-hidden transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out motion-reduce:transition-none',
    sizeClasses[size],
    variantBase[variant],
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]',
    !disabled && 'motion-safe:[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-px motion-safe:active:scale-[0.98] focus-visible:!transform-none',
    className
  )

  const glowOverlay = (
    <div
      ref={glowRef}
      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200 motion-reduce:hidden"
      aria-hidden="true"
    />
  )

  if (href) {
    const isExternal = href.startsWith('http')
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        event.preventDefault()
        return
      }
      onClick?.()
    }

    return (
      <div ref={containerRef} {...pointerHandlers} className="inline-block">
        {isExternal ? (
          <a href={href} target={target || '_blank'} rel={rel || 'noopener noreferrer'} className={sharedClasses} aria-disabled={disabled || undefined} tabIndex={disabled ? -1 : undefined} onClick={handleClick}>
            {glowOverlay}
            <span className="relative z-10 flex items-center gap-inherit">{children}</span>
          </a>
        ) : (
          <Link href={href} className={sharedClasses} aria-disabled={disabled || undefined} tabIndex={disabled ? -1 : undefined} onClick={handleClick}>
            {glowOverlay}
            <span className="relative z-10 flex items-center gap-inherit">{children}</span>
          </Link>
        )}
      </div>
    )
  }

  return (
    <button
      ref={containerRef as any}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={sharedClasses}
      onPointerMove={shouldReduceMotion || disabled ? undefined : (event) => {
        if (event.pointerType === 'mouse' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
          (handlers.onPointerMove as unknown as React.PointerEventHandler<HTMLButtonElement>)(event)
        }
      }}
      onPointerLeave={shouldReduceMotion || disabled ? undefined : handlers.onPointerLeave}
    >
      {glowOverlay}
      <span className="relative z-10 flex items-center gap-inherit">{children}</span>
    </button>
  )
}
