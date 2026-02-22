export default function StartLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <div className="mx-auto max-w-6xl px-6 pt-32 pb-16">
        {/* Header skeleton */}
        <div className="mb-16">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-10 w-10 animate-pulse rounded-xl bg-white/5" />
            <div className="h-4 w-28 animate-pulse rounded bg-white/5" />
          </div>
          <div className="mb-3 h-12 w-72 animate-pulse rounded bg-white/5" />
          <div className="mb-2 h-12 w-56 animate-pulse rounded bg-white/5" />
          <div className="h-5 w-96 animate-pulse rounded bg-white/5" />
        </div>

        {/* Journey paths grid skeleton */}
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
              <div className="mb-6 flex items-start justify-between">
                <div className="h-14 w-14 animate-pulse rounded-xl bg-white/5" />
                <div className="h-5 w-20 animate-pulse rounded bg-white/5" />
              </div>
              <div className="mb-1 h-3 w-24 animate-pulse rounded bg-white/5" />
              <div className="mb-2 h-7 w-48 animate-pulse rounded bg-white/5" />
              <div className="mb-1 h-4 w-full animate-pulse rounded bg-white/5" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
