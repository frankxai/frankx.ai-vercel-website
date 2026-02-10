export default function AIWorldLoading() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="relative pt-28 pb-24 px-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="h-10 w-40 rounded-xl bg-white/10 animate-pulse" />
          <div className="h-6 w-80 rounded-xl bg-white/5 animate-pulse" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-3">
                <div className="h-6 w-6 rounded bg-emerald-500/20 animate-pulse" />
                <div className="h-5 w-3/4 rounded-lg bg-white/10 animate-pulse" />
                <div className="h-4 w-full rounded-lg bg-white/5 animate-pulse" />
                <div className="h-4 w-2/3 rounded-lg bg-white/5 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
