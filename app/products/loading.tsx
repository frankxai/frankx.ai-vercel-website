export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <div className="mx-auto max-w-6xl px-6 pt-32 pb-16">
        {/* Header skeleton */}
        <div className="mb-16">
          <div className="mb-4 h-4 w-36 animate-pulse rounded bg-white/5" />
          <div className="mb-3 h-12 w-80 animate-pulse rounded bg-white/5" />
          <div className="h-5 w-96 animate-pulse rounded bg-white/5" />
        </div>

        {/* Product cards skeleton */}
        <div className="grid gap-8 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
              <div className="mb-6 flex items-start justify-between">
                <div className="h-14 w-14 animate-pulse rounded-xl bg-white/5" />
                <div className="h-6 w-16 animate-pulse rounded-full bg-white/5" />
              </div>
              <div className="mb-2 h-7 w-3/4 animate-pulse rounded bg-white/5" />
              <div className="mb-1 h-4 w-full animate-pulse rounded bg-white/5" />
              <div className="mb-6 h-4 w-2/3 animate-pulse rounded bg-white/5" />
              <div className="h-10 w-32 animate-pulse rounded-lg bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
