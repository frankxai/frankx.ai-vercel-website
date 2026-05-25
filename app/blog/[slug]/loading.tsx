export default function ArticleLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Aurora Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <article className="relative pt-28 pb-24">
        <div className="px-6">
          <div className="mx-auto max-w-4xl space-y-8">
            {/* Breadcrumb skeleton */}
            <div className="flex gap-2">
              <div className="h-4 w-32 rounded-full bg-white/10 animate-pulse" />
              <div className="h-4 w-4 rounded-full bg-white/5" />
              <div className="h-4 w-64 rounded-full bg-white/10 animate-pulse" />
            </div>

            {/* Category & Meta skeleton */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="h-7 w-28 rounded-full bg-emerald-500/10 animate-pulse" />
              <div className="h-5 w-36 rounded-full bg-white/10 animate-pulse" />
              <div className="h-5 w-24 rounded-full bg-white/10 animate-pulse" />
            </div>

            {/* Title skeleton - large */}
            <div className="space-y-4">
              <div className="h-14 w-full rounded-2xl bg-white/10 animate-pulse" />
              <div className="h-14 w-4/5 rounded-2xl bg-white/10 animate-pulse" />
            </div>

            {/* Description skeleton */}
            <div className="space-y-2 max-w-3xl">
              <div className="h-7 w-full rounded-xl bg-white/5 animate-pulse" />
              <div className="h-7 w-3/4 rounded-xl bg-white/5 animate-pulse" />
            </div>

            {/* Author Card skeleton */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-5 w-20 rounded-full bg-white/10 animate-pulse" />
                    <div className="h-4 w-44 rounded-full bg-white/5 animate-pulse" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-10 w-24 rounded-2xl bg-white/5 animate-pulse" />
                  <div className="h-10 w-24 rounded-2xl bg-white/5 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Hero Image skeleton */}
            <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[16/9] bg-gradient-to-br from-white/5 to-white/[0.02] animate-pulse">
              <div className="w-full h-full flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-white/10 animate-pulse" />
              </div>
            </div>

            {/* Reading Goal skeleton */}
            <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-6">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-emerald-500/20 animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 rounded-full bg-emerald-500/20 animate-pulse" />
                  <div className="h-4 w-full rounded-xl bg-white/5 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="px-6 pt-12">
          <div className="mx-auto max-w-4xl space-y-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-8 w-2/5 rounded-xl bg-white/10 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-5 w-full rounded-xl bg-white/5 animate-pulse" />
                  <div className="h-5 w-full rounded-xl bg-white/5 animate-pulse" />
                  <div className="h-5 w-11/12 rounded-xl bg-white/5 animate-pulse" />
                  <div className="h-5 w-4/5 rounded-xl bg-white/5 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
