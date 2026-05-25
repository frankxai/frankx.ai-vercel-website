export default function WatchLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] px-4 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-12">
          <div className="h-4 w-24 bg-white/5 rounded mb-4 animate-pulse" />
          <div className="h-10 w-72 bg-white/5 rounded mb-3 animate-pulse" />
          <div className="h-5 w-96 bg-white/5 rounded animate-pulse" />
        </div>
        {/* Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden animate-pulse">
              <div className="aspect-video bg-white/5" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-20 bg-white/5 rounded" />
                <div className="h-5 w-full bg-white/5 rounded" />
                <div className="h-4 w-3/4 bg-white/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
