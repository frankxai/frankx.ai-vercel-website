'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

// =============================================================================
// BENTO GRID - 2026 Design System Component
// =============================================================================
// Modern asymmetric grid layout popularized by Apple, Linear, and Vercel
// Features: Variable sizing, glass effects, 3D icon integration, hover states
// =============================================================================

interface BentoItemProps {
  /** Grid column span: 1, 2, or 'full' */
  colSpan?: 1 | 2 | 'full'
  /** Grid row span */
  rowSpan?: 1 | 2
  /** Card variant */
  variant?: 'default' | 'glass' | 'tech' | 'soul' | 'feature'
  /** Optional link wrapper */
  href?: string
  /** 3D icon path (from /images/3d/premium/) */
  icon3D?: string
  /** Icon position */
  iconPosition?: 'top-right' | 'bottom-right' | 'center' | 'background'
  /** Icon size */
  iconSize?: 'sm' | 'md' | 'lg' | 'xl'
  /** Main content */
  children: ReactNode
  /** Additional className */
  className?: string
  /** Title for the card */
  title?: string
  /** Description text */
  description?: string
  /** Small label/tag */
  label?: string
  /** Label color variant */
  labelVariant?: 'tech' | 'soul' | 'neutral'
}

const colSpanClasses = {
  1: 'col-span-1',
  2: 'col-span-1 md:col-span-2',
  full: 'col-span-1 md:col-span-2 lg:col-span-3',
}

const rowSpanClasses = {
  1: 'row-span-1',
  2: 'row-span-1 md:row-span-2',
}

const variantClasses = {
  default: 'bg-[#111113]/80 border-white/10 hover:border-white/20',
  glass: 'bg-[#111113]/60 backdrop-blur-xl border-white/5 hover:border-white/15',
  tech: 'bg-[#111113]/80 border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
  soul: 'bg-[#111113]/80 border-amber-500/20 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
  feature: 'bg-gradient-to-br from-[#111113] to-[#18181b] border-white/10 hover:border-white/25',
}

const iconSizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-20 h-20',
  lg: 'w-32 h-32',
  xl: 'w-48 h-48',
}

const iconPositionClasses = {
  'top-right': 'absolute -top-4 -right-4',
  'bottom-right': 'absolute -bottom-4 -right-4',
  'center': 'mx-auto',
  'background': 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10',
}

const labelVariantClasses = {
  tech: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  soul: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  neutral: 'bg-white/10 text-white/70 border-white/20',
}

export function BentoItem({
  colSpan = 1,
  rowSpan = 1,
  variant = 'default',
  href,
  icon3D,
  iconPosition = 'top-right',
  iconSize = 'md',
  children,
  className,
  title,
  description,
  label,
  labelVariant = 'neutral',
}: BentoItemProps) {
  const shouldReduceMotion = useReducedMotion()

  const content = (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl border p-6 transition-all duration-300',
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        variantClasses[variant],
        href && 'cursor-pointer',
        className
      )}
      whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}
      transition={{ duration: 0.3, ease: [0.33, 0.01, 0, 1] }}
    >
      {/* 3D Icon */}
      {icon3D && (
        <motion.div
          className={cn(
            iconPositionClasses[iconPosition],
            iconSizeClasses[iconSize],
            iconPosition !== 'background' && 'drop-shadow-2xl'
          )}
          animate={
            shouldReduceMotion || iconPosition === 'background'
              ? undefined
              : { y: [0, -8, 0] }
          }
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image
            src={icon3D}
            alt=""
            fill
            className="object-contain"
            sizes="(max-width: 768px) 80px, 128px"
          />
        </motion.div>
      )}

      {/* Label */}
      {label && (
        <span
          className={cn(
            'inline-block px-3 py-1 text-xs font-medium rounded-full border mb-4',
            labelVariantClasses[labelVariant]
          )}
        >
          {label}
        </span>
      )}

      {/* Title */}
      {title && (
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      )}

      {/* Description */}
      {description && (
        <p className="text-white/60 text-sm leading-relaxed mb-4">{description}</p>
      )}

      {/* Custom content */}
      {children}

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}

interface BentoGridProps {
  /** Grid columns on large screens */
  cols?: 2 | 3 | 4
  /** Gap between items */
  gap?: 'sm' | 'md' | 'lg'
  children: ReactNode
  className?: string
}

const gapClasses = {
  sm: 'gap-3',
  md: 'gap-4 md:gap-6',
  lg: 'gap-6 md:gap-8',
}

const colClasses = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
}

export function BentoGrid({
  cols = 3,
  gap = 'md',
  children,
  className,
}: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid auto-rows-[minmax(200px,auto)]',
        colClasses[cols],
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  )
}

// =============================================================================
// EXAMPLE USAGE
// =============================================================================
//
// <BentoGrid cols={3} gap="md">
//   <BentoItem
//     colSpan={2}
//     variant="tech"
//     icon3D="/images/3d/premium/rocket-dynamic.webp"
//     iconPosition="top-right"
//     iconSize="lg"
//     label="New"
//     labelVariant="tech"
//     title="Launch Your AI Journey"
//     description="Get started with our comprehensive AI toolkit"
//   >
//     <Button>Get Started</Button>
//   </BentoItem>
//
//   <BentoItem
//     variant="soul"
//     icon3D="/images/3d/premium/star-dynamic.webp"
//     iconSize="md"
//     title="Premium Content"
//   >
//     <p>Exclusive resources</p>
//   </BentoItem>
//
//   <BentoItem variant="glass" colSpan="full">
//     <FeatureShowcase />
//   </BentoItem>
// </BentoGrid>

export default BentoGrid
