import { TrackedLink } from '@/components/analytics/TrackedLink'

export default function TallinnOfferNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-void px-5 text-center text-white">
      <div>
        <p className="text-sm font-medium text-slate-500">Session format not found</p>
        <h1 className="mt-4 font-display text-4xl font-semibold">Explore the public Tallinn studio formats.</h1>
        <TrackedLink
          href="/experiences/tallinn-2026"
          eventName="tallinn_studio_recovery_clicked"
          eventProperties={{ action: 'return_from_missing_format' }}
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
        >
          See the Tallinn Session Studio
        </TrackedLink>
      </div>
    </main>
  )
}
