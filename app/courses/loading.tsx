'use client'

/**
 * Premium loading skeleton for Courses page
 * Uses shimmer animation for perceived performance
 */
export default function CoursesLoading() {
  return (
    <div className="min-h-screen bg-void">
      {/* Hero skeleton */}
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-16">
        <div className="max-w-3xl">
          <div className="skeleton skeleton-text w-36 mb-6" />
          <div className="skeleton skeleton-title w-4/5 mb-4" />
          <div className="skeleton skeleton-title w-1/2 mb-8" />
          <div className="skeleton skeleton-text w-2/3" />
        </div>
      </div>

      {/* Courses grid skeleton */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="skeleton h-48 w-full" />
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  <div className="skeleton h-6 w-20 rounded-full" />
                  <div className="skeleton h-6 w-24 rounded-full" />
                </div>
                <div className="skeleton skeleton-title w-full mb-3" />
                <div className="skeleton skeleton-text w-full mb-2" />
                <div className="skeleton skeleton-text w-3/4 mb-6" />
                <div className="flex items-center justify-between">
                  <div className="skeleton h-8 w-24 rounded" />
                  <div className="skeleton h-10 w-28 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
