export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <div className="mx-auto max-w-6xl px-6 pt-32 pb-16">
        {/* Header skeleton */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-4 h-3 w-24 animate-pulse rounded bg-white/5" />
          <div className="mb-3 h-12 w-72 animate-pulse rounded bg-white/5" />
          <div className="mb-2 h-6 w-full animate-pulse rounded bg-white/5" />
          <div className="h-6 w-3/4 animate-pulse rounded bg-white/5" />
        </div>

        {/* Two-column cards skeleton */}
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8">
              <div className="mb-5 h-12 w-12 animate-pulse rounded-2xl bg-white/5" />
              <div className="mb-3 h-6 w-48 animate-pulse rounded bg-white/5" />
              <div className="mb-1 h-4 w-full animate-pulse rounded bg-white/5" />
              <div className="mb-1 h-4 w-full animate-pulse rounded bg-white/5" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-white/5" />
            </div>
          ))}
        </div>

        {/* Social links skeleton */}
        <div className="mt-12 flex gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-12 w-12 animate-pulse rounded-xl bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  )
}
