'use client'

import { ReactNode } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// ============================================================================
// TYPES
// ============================================================================

type BentoVariant = 'default' | 'glass' | 'tech' | 'soul' | 'feature'

interface BentoGridProps {
  children: ReactNode
  cols?: 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

interface BentoItemProps {
  children: ReactNode
  colSpan?: 1 | 2
  rowSpan?: 1 | 2
  variant?: BentoVariant
  icon3D?: string
  iconPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'center'
  iconSize?: 'sm' | 'md' | 'lg'
  className?: string
}

// ============================================================================
// STYLES
// ============================================================================

const gridCols = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
}

const gapSizes = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
}

const colSpans = {
  1: '',
  2: 'md:col-span-2',
}

const rowSpans = {
  1: '',
  2: 'md:row-span-2',
}

const variants: Record<BentoVariant, string> = {
  default: 'bg-white/[0.02] border-white/10 hover:border-white/20',
  glass: 'bg-white/[0.03] border-white/10 backdrop-blur-xl hover:bg-white/[0.05]',
  tech: 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40',
  soul: 'bg-violet-500/5 border-violet-500/20 hover:border-violet-500/40',
  feature: 'bg-gradient-to-br from-white/[0.04] to-white/[0.01] border-white/15 hover:border-white/25',
}

const iconPositions = {
  'top-right': '-top-4 -right-4',
  'top-left': '-top-4 -left-4',
  'bottom-right': '-bottom-4 -right-4',
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
}

const iconSizes = {
  sm: 'w-16 h-16',
  md: 'w-20 h-20',
  lg: 'w-28 h-28',
}

// ============================================================================
// COMPONENTS
// ============================================================================

export function BentoGrid({ children, cols = 3, gap = 'md', className }: BentoGridProps) {
  return (
    <div className={cn('grid', gridCols[cols], gapSizes[gap], className)}>
      {children}
    </div>
  )
}

export function BentoItem({
  children,
  colSpan = 1,
  rowSpan = 1,
  variant = 'default',
  icon3D,
  iconPosition = 'top-right',
  iconSize = 'md',
  className,
}: BentoItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300',
        variants[variant],
        colSpans[colSpan],
        rowSpans[rowSpan],
        className
      )}
    >
      {/* Floating 3D Icon */}
      {icon3D && (
        <motion.div
          className={cn(
            'absolute opacity-40 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none',
            iconPositions[iconPosition],
            iconSizes[iconSize]
          )}
          animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image
            src={icon3D}
            alt=""
            fill
            className="object-contain drop-shadow-xl"
            sizes={iconSize === 'lg' ? '112px' : iconSize === 'md' ? '80px' : '64px'}
          />
        </motion.div>
      )}
      
      {children}
    </motion.div>
  )
}

// ============================================================================
// EXPORTS
// ============================================================================

export default BentoGrid
