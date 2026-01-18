'use client'

import { clsx } from 'clsx'

/**
 * Skeleton Loader Component
 * Loading placeholders with pulse animation
 */

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-md bg-white/5 backdrop-blur-sm',
        className
      )}
      {...props}
    />
  )
}

// Preset skeleton components for common use cases
function SkeletonCard() {
  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
      <Skeleton className="h-5 w-2/5" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  )
}

function SkeletonButton() {
  return <Skeleton className="h-10 w-24" />
}

function SkeletonAvatar() {
  return <Skeleton className="h-12 w-12 rounded-full" />
}

function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={clsx('h-4', i === lines - 1 ? 'w-3/5' : 'w-full')}
        />
      ))}
    </div>
  )
}

export { Skeleton, SkeletonCard, SkeletonButton, SkeletonAvatar, SkeletonText }
