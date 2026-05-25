export default function MusicLabLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <div className="mx-auto max-w-6xl px-6 pt-32 pb-16">
        {/* Header skeleton */}
        <div className="mb-16">
          <div className="mb-4 h-4 w-28 animate-pulse rounded bg-white/5" />
          <div className="mb-3 h-12 w-96 animate-pulse rounded bg-white/5" />
          <div className="mb-2 h-5 w-80 animate-pulse rounded bg-white/5" />
          <div className="h-5 w-64 animate-pulse rounded bg-white/5" />
        </div>

        {/* Stats row skeleton */}
        <div className="mb-12 flex gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <div className="mb-1 h-8 w-20 animate-pulse rounded bg-white/5" />
              <div className="h-4 w-24 animate-pulse rounded bg-white/5" />
            </div>
          ))}
        </div>

        {/* Content grid skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
              <div className="mb-4 h-10 w-10 animate-pulse rounded-xl bg-white/5" />
              <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-white/5" />
              <div className="mb-1 h-4 w-full animate-pulse rounded bg-white/5" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
