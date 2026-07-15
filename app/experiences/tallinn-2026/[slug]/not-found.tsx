import Link from 'next/link'

export default function TallinnOfferNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#08090b] px-5 text-center text-white">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Session not available</p>
        <h1 className="mt-4 font-display text-4xl font-semibold">This session is not part of the current Tallinn proposal.</h1>
        <Link
          href="/experiences/tallinn-2026"
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
        >
          See all Tallinn sessions
        </Link>
      </div>
    </main>
  )
}
