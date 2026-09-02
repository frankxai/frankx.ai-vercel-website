import { EmailSignup } from '@/components/email-signup'
import { listTypeForIntent, sanitizeIntent, WAITLIST_INTENTS } from '@/lib/diagnostic/waitlist-intents'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Waitlist | FrankX',
  description:
    'Join the FrankX waitlist for planned courses, product launches, and early-access announcements.',
  path: '/waitlist',
})

type WaitlistPageProps = {
  searchParams?: {
    intent?: string
  }
}

export default function WaitlistPage({ searchParams }: WaitlistPageProps) {
  // The intent is recorded either way, so attribution from /checkout/[slug] survives. Only
  // an intent the registry knows may put a label on the page — a hand-crafted query string
  // must never be able to name a product back at the visitor.
  const intent = sanitizeIntent(searchParams?.intent)
  const selected = WAITLIST_INTENTS[intent]

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="mx-auto max-w-3xl px-6 py-20 pt-28 space-y-8">
        <header className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70">FrankX Waitlist</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {selected ? selected.label : 'Get early access updates'}
          </h1>
          <p className="text-white/65 text-lg leading-relaxed">
            {selected
              ? 'Not on sale yet. Join, then tell me what you would pay for it — that is what decides what gets built first.'
              : 'Join once and get launch updates for planned courses and product releases.'}
          </p>
        </header>

        {selected && (
          <section className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-sm text-cyan-100/90">
            Interest tagged: <span className="font-semibold">{selected.label}</span>
          </section>
        )}

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <EmailSignup
            listType={listTypeForIntent(intent)}
            source="waitlist"
            intent={intent || undefined}
            intentLabel={selected?.label}
            askDemand
            showName
            buttonText="Join Waitlist"
            placeholder="you@company.com"
          />
        </section>
      </div>
    </main>
  )
}
