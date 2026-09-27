import { CheckCircle2, CircleDashed } from 'lucide-react'

export default function VibeOSSocialProof() {
  return (
    <section className="relative border-y border-white/[0.06] bg-space/50 py-20">
      <div className="mx-auto grid max-w-5xl gap-6 px-6 md:grid-cols-2">
        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.06] p-8">
          <CheckCircle2 className="h-6 w-6 text-emerald-300" />
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-emerald-200/70">Available now</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">A product-specific interest list</h2>
          <p className="mt-3 leading-relaxed text-white/60">
            Your response is attributed to Vibe OS and asks what you would actually use, so it can inform the release decision.
          </p>
        </div>
        <div className="rounded-3xl border border-amber-500/20 bg-amber-500/[0.06] p-8">
          <CircleDashed className="h-6 w-6 text-amber-300" />
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-amber-200/70">Not released</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">The app and template</h2>
          <p className="mt-3 leading-relaxed text-white/60">
            There is no public app, verified Notion template, checkout, or promised launch date yet.
          </p>
        </div>
      </div>
    </section>
  )
}
