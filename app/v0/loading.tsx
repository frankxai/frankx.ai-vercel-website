export default function V0Loading() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] px-5 pb-16 pt-28 text-white" aria-busy="true">
      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-[1600px] gap-10 sm:px-3 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <div>
          <div className="h-3 w-48 animate-pulse rounded-full bg-white/10 motion-reduce:animate-none" />
          <div className="mt-8 h-16 max-w-lg animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none sm:h-24" />
          <div className="mt-4 h-16 max-w-md animate-pulse rounded-2xl bg-white/[0.07] motion-reduce:animate-none sm:h-24" />
          <div className="mt-8 h-20 max-w-lg animate-pulse rounded-2xl bg-white/[0.05] motion-reduce:animate-none" />
        </div>
        <div className="h-[540px] animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.04] motion-reduce:animate-none sm:h-[700px]" />
        <span className="sr-only">Loading the Product Foundry</span>
      </div>
    </main>
  )
}
