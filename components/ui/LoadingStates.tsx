'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Skeleton Loader Components
export function SkeletonText({ className, lines = 1 }: { className?: string; lines?: number }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-slate-700/30 rounded animate-pulse"
          style={{ width: `${60 + ((i * 17) % 35)}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        />
      ))}
    </div>
  )
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn('rounded-xl border border-slate-700/30 bg-slate-800/20 p-6', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-4">
        <div className="h-6 bg-slate-700/30 rounded animate-pulse w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-slate-700/30 rounded animate-pulse" />
          <div className="h-4 bg-slate-700/30 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-slate-700/30 rounded animate-pulse w-4/6" />
        </div>
        <div className="h-10 bg-slate-700/30 rounded animate-pulse w-32" />
      </div>
    </motion.div>
  )
}

export function SkeletonProduct({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn('rounded-2xl border border-slate-700/30 bg-slate-800/20 p-8', className)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="space-y-6">
        {/* Badge */}
        <div className="h-6 bg-slate-700/30 rounded-full animate-pulse w-24" />

        {/* Title and subtitle */}
        <div className="space-y-2">
          <div className="h-8 bg-slate-700/30 rounded animate-pulse w-4/5" />
          <div className="h-6 bg-slate-700/30 rounded animate-pulse w-3/5" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-slate-700/30 rounded animate-pulse" />
          <div className="h-4 bg-slate-700/30 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-slate-700/30 rounded animate-pulse w-4/6" />
        </div>

        {/* Features */}
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="h-5 w-5 bg-slate-700/30 rounded animate-pulse" />
              <div className="h-4 bg-slate-700/30 rounded animate-pulse flex-1" />
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="space-y-3 p-4 rounded-xl bg-slate-700/10">
          <div className="flex space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-4 bg-slate-700/30 rounded animate-pulse" />
            ))}
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-700/30 rounded animate-pulse" />
            <div className="h-4 bg-slate-700/30 rounded animate-pulse w-4/5" />
          </div>
          <div className="h-4 bg-slate-700/30 rounded animate-pulse w-32" />
        </div>

        {/* Price and CTA */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 bg-slate-700/30 rounded animate-pulse w-16" />
            <div className="h-6 bg-slate-700/30 rounded animate-pulse w-12" />
          </div>
          <div className="h-12 bg-slate-700/30 rounded-xl animate-pulse" />
        </div>
      </div>
    </motion.div>
  )
}

// Loading Spinners
export function SpinnerIcon({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn('w-6 h-6 border-2 border-slate-600 border-t-slate-200 rounded-full', className)}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  )
}

export function PulseLoader({ className }: { className?: string }) {
  return (
    <div className={cn('flex space-x-2', className)}>
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-purple-500 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )
}

// Page Loading Overlays
export function PageLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <motion.div
      className="fixed inset-0 bg-void/80 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center space-y-4">
        <SpinnerIcon className="w-8 h-8 mx-auto" />
        <p className="text-slate-300">{message}</p>
      </div>
    </motion.div>
  )
}

export function ContentLoader({ children, isLoading, fallback }: {
  children: React.ReactNode
  isLoading: boolean
  fallback?: React.ReactNode
}) {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {fallback || <SkeletonCard />}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}
