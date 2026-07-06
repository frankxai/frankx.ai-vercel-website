import Link from 'next/link'
import { CheckCircle2, TriangleAlert } from 'lucide-react'

type UnsubscribePageProps = {
  searchParams?: Promise<{ status?: string; reason?: string }>
}

export const metadata = {
  title: 'Newsletter Unsubscribe | FrankX',
  robots: { index: false, follow: false },
}

export default async function NewsletterUnsubscribePage({ searchParams }: UnsubscribePageProps) {
  const params = await searchParams
  const status = params?.status || 'unsubscribed'
  const isUnsubscribed = status === 'unsubscribed'

  return (
    <main className="min-h-screen bg-[#0a0a0b] px-6 pt-28 text-white">
      <section className="mx-auto max-w-xl rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
          {isUnsubscribed ? <CheckCircle2 className="h-6 w-6" /> : <TriangleAlert className="h-6 w-6" />}
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {isUnsubscribed ? 'You are unsubscribed' : 'Unsubscribe needs attention'}
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/60">
          {isUnsubscribed
            ? 'Your email has been marked as unsubscribed in the newsletter provider.'
            : 'The unsubscribe link was invalid, expired, or could not update the email provider.'}
        </p>
        <Link
          href="/newsletter/preferences"
          className="mt-6 inline-flex rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
        >
          Manage preferences
        </Link>
      </section>
    </main>
  )
}
