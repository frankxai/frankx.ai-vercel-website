import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Unsubscribe — FrankX',
  description: 'Manage your subscription to FrankX content streams. Unsubscribe from all email or adjust topic preferences.',
  robots: { index: false, follow: false },
}

export default function UnsubscribePage() {
  return (
    <main className="min-h-screen bg-void px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Newsletter
        </Link>

        <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Unsubscribe from everything
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-white/70">
          To unsubscribe from all email streams, reply <strong className="text-white">UNSUBSCRIBE</strong> to any FrankX email, or send a one-line request to the address below. You will be removed from every list within 24 hours.
        </p>

        <a
          href="mailto:frank@frankx.ai?subject=Unsubscribe&body=Please%20unsubscribe%20me%20from%20all%20FrankX%20email%20streams."
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-emerald-500 px-8 py-4 font-semibold text-void transition-colors hover:bg-emerald-400"
        >
          <Mail className="h-5 w-5" />
          Email frank@frankx.ai to unsubscribe
        </a>

        <div className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
          <h2 className="text-lg font-semibold text-white">Prefer to adjust, not leave?</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/65">
            Most readers find one stream they want and drop the rest. You can keep what serves you and let the rest go.
          </p>
          <Link
            href="/newsletter/preferences"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 underline decoration-emerald-300/30 underline-offset-4 hover:text-emerald-200"
          >
            Adjust topic preferences instead →
          </Link>
        </div>
      </div>
    </main>
  )
}
