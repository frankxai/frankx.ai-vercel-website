export default function CoursesLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <div className="mx-auto max-w-6xl px-6 pt-32 pb-16">
        {/* Header skeleton */}
        <div className="mb-16 max-w-4xl">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-12 w-12 animate-pulse rounded-xl bg-white/5" />
            <div className="h-3 w-40 animate-pulse rounded bg-white/5" />
          </div>
          <div className="mb-3 h-12 w-[28rem] animate-pulse rounded bg-white/5" />
          <div className="mb-2 h-8 w-96 animate-pulse rounded bg-white/5" />
          <div className="h-5 w-80 animate-pulse rounded bg-white/5" />
        </div>

        {/* Filter skeleton */}
        <div className="mb-8 flex gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9 w-28 animate-pulse rounded-full bg-white/5" />
          ))}
        </div>

        {/* Course cards skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="h-11 w-11 animate-pulse rounded-xl bg-white/5" />
                <div className="h-6 w-16 animate-pulse rounded-full bg-white/5" />
              </div>
              <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-white/5" />
              <div className="mb-1 h-4 w-full animate-pulse rounded bg-white/5" />
              <div className="mb-5 h-4 w-2/3 animate-pulse rounded bg-white/5" />
              <div className="space-y-2">
                <div className="h-3 w-32 animate-pulse rounded bg-white/5" />
                <div className="h-3 w-28 animate-pulse rounded bg-white/5" />
                <div className="h-3 w-36 animate-pulse rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
