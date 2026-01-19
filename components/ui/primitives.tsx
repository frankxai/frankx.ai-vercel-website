// @ts-nocheck - Polymorphic component types are complex with strict mode
import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...inputs: Array<string | false | null | undefined>) => twMerge(clsx(inputs))

type SurfaceTone = 'base' | 'glass' | 'highlight' | 'transparent'
type SurfacePadding = 'none' | 'sm' | 'md' | 'lg'

const surfaceToneMap: Record<SurfaceTone, string> = {
  base: 'surface-base',
  glass: 'surface-glass',
  highlight: 'surface-highlight',
  transparent: 'bg-transparent border border-white/10',
}

const surfacePaddingMap: Record<SurfacePadding, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-10',
}

export type SurfaceProps<T extends ElementType = 'div'> = {
  as?: T
  tone?: SurfaceTone
  padding?: SurfacePadding
  glow?: boolean
  className?: string
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Surface<T extends ElementType = 'div'>({
  as,
  tone = 'glass',
  padding = 'md',
  glow,
  className,
  children,
  ...rest
}: SurfaceProps<T>) {
  const Component = (as ?? 'div') as ElementType

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<T>)}
      className={cn(
        'relative overflow-hidden rounded-3xl transition-shadow duration-300',
        surfaceToneMap[tone],
        glow && tone !== 'transparent' ? 'shadow-brand-glow' : undefined,
        surfacePaddingMap[padding],
        className,
      )}
    >
      {children}
    </Component>
  )
}

type SectionHeadingProps = {
  id?: string
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  actions,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('space-y-4', align === 'center' && 'text-center', className)}>
      {eyebrow ? <span className="eyebrow-text inline-flex items-center gap-2">{eyebrow}</span> : null}
      <div className={cn('space-y-3', align === 'center' && 'mx-auto max-w-3xl')}>
        <h2 id={id} className="text-3xl font-semibold text-white md:text-4xl">{title}</h2>
        {description ? (
          <p className="text-base text-white/70 md:text-lg">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className={cn('flex flex-wrap gap-3', align === 'center' ? 'justify-center' : 'justify-start')}>
          {actions}
        </div>
      ) : null}
    </div>
  )
}

type PillVariant = 'brand' | 'glass' | 'outline'

type PillProps = {
  variant?: PillVariant
  icon?: ReactNode
  children: ReactNode
  className?: string
}

export function Pill({ variant = 'glass', icon, children, className }: PillProps) {
  const base = 'inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em]'

  const variantClass: Record<PillVariant, string> = {
    brand: 'bg-gradient-to-r from-brand-500 to-aurora-500 text-white shadow-brand-glow',
    glass: 'bg-white/10 text-white/80 border border-white/15 backdrop-blur-sm',
    outline: 'border border-white/20 text-white/70 backdrop-blur-sm',
  }

  return (
    <span className={cn(base, variantClass[variant], className)}>
      {icon ? <span className="flex h-4 w-4 items-center justify-center">{icon}</span> : null}
      {children}
    </span>
  )
}

type BulletListProps = {
  items: Array<{ title: string; description?: string; icon?: ReactNode }>
  tone?: 'brand' | 'aurora' | 'neutral'
  className?: string
}

export function BulletList({ items, tone = 'neutral', className }: BulletListProps) {
  const marker: Record<'brand' | 'aurora' | 'neutral', string> = {
    brand: 'bg-gradient-to-br from-brand-500 to-pulse-500',
    aurora: 'bg-gradient-to-br from-aurora-400 to-brand-500',
    neutral: 'bg-white/15',
  }

  return (
    <ul className={cn('space-y-4 text-sm text-white/75', className)}>
      {items.map((item) => (
        <li key={item.title} className="flex items-start gap-3">
          <span className={cn('mt-1 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold', marker[tone])}>
            {item.icon ?? '+'}
          </span>
          <div className="space-y-1">
            <p className="text-white/90 font-medium">{item.title}</p>
            {item.description ? <p className="text-white/70 text-xs leading-relaxed">{item.description}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  )
}

type StatBlockProps = {
  value: string
  label: string
  description?: string
  icon?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function StatBlock({ value, label, description, icon, align = 'left', className }: StatBlockProps) {
  return (
    <div className={cn(
      'rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm',
      align === 'center' && 'text-center',
      className,
    )}>
      <div className={cn('flex items-center gap-3 text-white', align === 'center' && 'justify-center')}>
        {icon ? (
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-lg">
            {icon}
          </span>
        ) : null}
        <span className="text-3xl font-semibold">{value}</span>
      </div>
      <p className={cn('mt-2 text-xs uppercase tracking-[0.32em] text-white/60', align === 'center' && 'mx-auto')}>{label}</p>
      {description ? <p className="mt-3 text-sm text-white/70 leading-relaxed">{description}</p> : null}
    </div>
  )
}
