'use client'

/**
 * Premium loading skeleton for Resources page
 * Uses shimmer animation for perceived performance
 */
export default function ResourcesLoading() {
  return (
    <div className="min-h-screen bg-void">
      {/* Hero skeleton */}
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-16">
        <div className="max-w-3xl">
          <div className="skeleton skeleton-text w-32 mb-6" />
          <div className="skeleton skeleton-title w-3/4 mb-4" />
          <div className="skeleton skeleton-title w-1/2 mb-8" />
          <div className="skeleton skeleton-text w-2/3" />
        </div>
      </div>

      {/* Category tabs skeleton */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex gap-3 flex-wrap">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton h-10 w-24 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Resources grid skeleton */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="skeleton w-12 h-12 rounded-lg flex-shrink-0" />
                <div className="flex-1">
                  <div className="skeleton skeleton-text w-full mb-2" />
                  <div className="skeleton skeleton-text w-3/4 mb-3" />
                  <div className="skeleton h-5 w-16 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
