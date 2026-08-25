export default function V0Loading() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] px-5 pb-24 pt-32 text-white" aria-busy="true">
      <div className="mx-auto max-w-7xl">
        <div className="h-3 w-44 animate-pulse rounded-full bg-white/10 motion-reduce:animate-none" />
        <div className="mt-8 h-20 max-w-4xl animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />
        <div className="mt-4 h-20 max-w-2xl animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />
        <div className="mt-14 h-80 animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.03] motion-reduce:animate-none" />
        <span className="sr-only">Loading the Vertical Product Foundry</span>
      </div>
    </main>
  )
}
