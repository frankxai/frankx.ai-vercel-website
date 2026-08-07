export default function VaultLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <div className="mx-auto max-w-6xl px-6 pt-32 pb-16">
        {/* Header skeleton */}
        <div className="mb-12">
          <div className="mb-4 h-4 w-32 animate-pulse rounded bg-white/5" />
          <div className="mb-3 h-10 w-80 animate-pulse rounded bg-white/5" />
          <div className="h-5 w-64 animate-pulse rounded bg-white/5" />
        </div>

        {/* Filter bar skeleton */}
        <div className="mb-8 flex gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9 w-24 animate-pulse rounded-full bg-white/5" />
          ))}
        </div>

        {/* Collection grid skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
              <div className="aspect-[4/3] animate-pulse bg-white/5" />
              <div className="p-5">
                <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-white/5" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
