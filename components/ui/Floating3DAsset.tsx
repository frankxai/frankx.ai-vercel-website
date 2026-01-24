'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Floating3DAssetProps {
  src: string
  alt?: string
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  animation?: 'float' | 'pulse' | 'spin' | 'bounce' | 'none'
  opacity?: number
  blur?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
  delay?: number
}

const sizeMap = {
  xs: { width: 32, height: 32, className: 'w-8 h-8' },
  sm: { width: 48, height: 48, className: 'w-12 h-12' },
  md: { width: 64, height: 64, className: 'w-16 h-16' },
  lg: { width: 96, height: 96, className: 'w-24 h-24' },
  xl: { width: 128, height: 128, className: 'w-32 h-32' },
  '2xl': { width: 192, height: 192, className: 'w-48 h-48' },
}

const positionMap = {
  'top-left': '-top-4 -left-4',
  'top-right': '-top-4 -right-4',
  'bottom-left': '-bottom-4 -left-4',
  'bottom-right': '-bottom-4 -right-4',
  center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
}

const blurMap = {
  none: '',
  sm: 'blur-[2px]',
  md: 'blur-[4px]',
  lg: 'blur-[8px]',
}

const animationVariants = {
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  spin: {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    },
  },
  bounce: {
    y: [0, -15, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeOut',
    },
  },
  none: {},
}

export default function Floating3DAsset({
  src,
  alt = '3D Asset',
  position = 'top-right',
  size = 'md',
  animation = 'float',
  opacity = 100,
  blur = 'none',
  className,
  delay = 0,
}: Floating3DAssetProps) {
  const sizeConfig = sizeMap[size]
  const positionClass = positionMap[position]
  const blurClass = blurMap[blur]

  return (
    <motion.div
      className={cn('absolute pointer-events-none z-10', positionClass, className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: opacity / 100, scale: 1 }}
      transition={{ duration: 0.6, delay }}
    >
      <motion.div
        animate={animation !== 'none' ? animationVariants[animation] : undefined}
        className={cn(sizeConfig.className, blurClass)}
      >
        <Image
          src={src}
          alt={alt}
          width={sizeConfig.width}
          height={sizeConfig.height}
          className="w-full h-full object-contain drop-shadow-2xl"
          priority={false}
        />
      </motion.div>
    </motion.div>
  )
}

// Inline 3D icon for use in cards/lists (not floating)
export function Icon3D({
  src,
  alt = '3D Icon',
  size = 'md',
  className,
}: {
  src: string
  alt?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}) {
  const sizeConfig = sizeMap[size]

  return (
    <div className={cn(sizeConfig.className, 'relative', className)}>
      <Image
        src={src}
        alt={alt}
        width={sizeConfig.width}
        height={sizeConfig.height}
        className="w-full h-full object-contain drop-shadow-lg"
      />
    </div>
  )
}
