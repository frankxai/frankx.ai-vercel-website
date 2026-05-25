export default function GalleryLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] px-4 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-12">
          <div className="h-4 w-24 bg-white/5 rounded mb-4 animate-pulse" />
          <div className="h-10 w-64 bg-white/5 rounded mb-3 animate-pulse" />
          <div className="h-5 w-80 bg-white/5 rounded animate-pulse" />
        </div>
        {/* Masonry skeleton */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="mb-4 rounded-xl bg-white/[0.03] border border-white/5 overflow-hidden animate-pulse"
              style={{ height: `${200 + (i % 3) * 80}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
