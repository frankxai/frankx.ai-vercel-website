export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Aurora Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative pt-28 pb-24 px-6">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Breadcrumb skeleton */}
          <div className="flex gap-2">
            <div className="h-4 w-32 rounded-full bg-white/10 animate-pulse" />
            <div className="h-4 w-4 rounded-full bg-white/5" />
            <div className="h-4 w-48 rounded-full bg-white/10 animate-pulse" />
          </div>

          {/* Category & Meta skeleton */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="h-7 w-24 rounded-full bg-emerald-500/10 animate-pulse" />
            <div className="h-5 w-32 rounded-full bg-white/10 animate-pulse" />
            <div className="h-5 w-20 rounded-full bg-white/10 animate-pulse" />
          </div>

          {/* Title skeleton */}
          <div className="space-y-4">
            <div className="h-12 w-full rounded-2xl bg-white/10 animate-pulse" />
            <div className="h-12 w-3/4 rounded-2xl bg-white/10 animate-pulse" />
          </div>

          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-6 w-full rounded-xl bg-white/5 animate-pulse" />
            <div className="h-6 w-5/6 rounded-xl bg-white/5 animate-pulse" />
          </div>

          {/* Author Card skeleton */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 animate-pulse" />
              <div className="space-y-2">
                <div className="h-5 w-24 rounded-full bg-white/10 animate-pulse" />
                <div className="h-4 w-40 rounded-full bg-white/5 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Hero Image skeleton */}
          <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video bg-white/5 animate-pulse" />

          {/* Content skeleton */}
          <div className="space-y-6 pt-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-8 w-1/3 rounded-xl bg-white/10 animate-pulse" />
                <div className="h-4 w-full rounded-xl bg-white/5 animate-pulse" />
                <div className="h-4 w-full rounded-xl bg-white/5 animate-pulse" />
                <div className="h-4 w-4/5 rounded-xl bg-white/5 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
