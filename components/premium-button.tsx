import Link from 'next/link'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PremiumButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PremiumButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className
}: PremiumButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900",
    {
      // Variants
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 focus:ring-purple-500":
        variant === 'primary',
      "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 hover:border-slate-600 focus:ring-slate-500":
        variant === 'secondary',

      // Sizes
      "px-3 py-1.5 text-sm": size === 'sm',
      "px-6 py-3 text-base": size === 'md',
      "px-8 py-4 text-lg": size === 'lg',
    },
    className
  )

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={baseStyles}>
      {children}
    </button>
  )
}
