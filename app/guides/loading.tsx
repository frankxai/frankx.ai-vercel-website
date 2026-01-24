'use client'

/**
 * Premium loading skeleton for Guides page
 * Uses shimmer animation for perceived performance
 */
export default function GuidesLoading() {
  return (
    <div className="min-h-screen bg-void">
      {/* Hero skeleton */}
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-16">
        <div className="max-w-3xl">
          <div className="skeleton skeleton-text w-40 mb-6" />
          <div className="skeleton skeleton-title w-4/5 mb-4" />
          <div className="skeleton skeleton-title w-2/3 mb-8" />
          <div className="skeleton skeleton-text w-3/4" />
        </div>
      </div>

      {/* Guides grid skeleton */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-6"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="skeleton w-10 h-10 rounded-lg" />
                <div className="skeleton skeleton-text w-20" />
              </div>
              <div className="skeleton skeleton-title w-full mb-3" />
              <div className="skeleton skeleton-text w-full mb-2" />
              <div className="skeleton skeleton-text w-4/5 mb-4" />
              <div className="flex gap-2">
                <div className="skeleton h-6 w-16 rounded-full" />
                <div className="skeleton h-6 w-20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
