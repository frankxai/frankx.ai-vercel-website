import Link from 'next/link'
import { CheckCircle2, TriangleAlert } from 'lucide-react'

type ConfirmPageProps = {
  searchParams?: Promise<{ status?: string; reason?: string }>
}

export const metadata = {
  title: 'Newsletter Confirmation | FrankX',
  robots: { index: false, follow: false },
}

export default async function NewsletterConfirmPage({ searchParams }: ConfirmPageProps) {
  const params = await searchParams
  const status = params?.status || 'confirmed'
  const isConfirmed = status === 'confirmed'

  return (
    <main className="min-h-screen bg-[#0a0a0b] px-6 pt-28 text-white">
      <section className="mx-auto max-w-xl rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
          {isConfirmed ? <CheckCircle2 className="h-6 w-6" /> : <TriangleAlert className="h-6 w-6" />}
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {isConfirmed ? 'You are confirmed' : 'Confirmation needs attention'}
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/60">
          {isConfirmed
            ? 'Your newsletter subscription is active. The next issue will land when it is approved and scheduled.'
            : 'The confirmation link was invalid, expired, or could not update the email provider. Try subscribing again or reply to Frank directly.'}
        </p>
        <Link
          href="/newsletter"
          className="mt-6 inline-flex rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-300"
        >
          Back to newsletter
        </Link>
      </section>
    </main>
  )
}
