'use client'

/**
 * Premium loading skeleton for Products page
 * Uses shimmer animation for perceived performance
 */
export default function ProductsLoading() {
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

      {/* Product grid skeleton */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="skeleton skeleton-image mb-6 rounded-xl" />
              <div className="skeleton skeleton-text w-24 mb-3" />
              <div className="skeleton skeleton-title w-full mb-3" />
              <div className="skeleton skeleton-text w-full mb-2" />
              <div className="skeleton skeleton-text w-3/4 mb-6" />
              <div className="skeleton h-10 w-32 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
