import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Confirm your subscription | FrankX',
  description:
    'Confirmation step for the AI Architect Newsletter.',
  path: '/newsletter/confirm',
})

// Don't index — this is a transactional landing page
export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<{ status?: string }>
}

function StatusContent({ status }: { status: string }) {
  if (status === 'ok') {
    return (
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-emerald-400" />
        <h1 className="mb-3 text-2xl font-semibold text-white">You&apos;re confirmed.</h1>
        <p className="text-zinc-300 leading-relaxed">
          Welcome to the AI Architect Newsletter. You&apos;ll receive the next issue when it ships
          — no drip sequence, no marketing automation. One honest message when there&apos;s
          something real to share.
        </p>
        <p className="mt-6 text-sm text-zinc-400">
          You can unsubscribe at any time from the link at the bottom of any issue.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/newsletter/archive"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90 transition-colors"
          >
            Read past issues
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/90 hover:bg-white/5 transition-colors"
          >
            Back to frankx.ai
          </Link>
        </div>
      </div>
    )
  }

  // Error states
  const errorCopy: Record<string, { title: string; body: string }> = {
    missing: {
      title: 'Confirmation link incomplete',
      body: 'The confirmation link is missing required information. Please use the link from your confirmation email exactly as it arrived.',
    },
    invalid: {
      title: 'This confirmation link isn’t valid',
      body: 'The link may have expired, been tampered with, or already been used. Try subscribing again — we’ll send a fresh confirmation link.',
    },
    error: {
      title: 'Something went wrong on our side',
      body: 'We couldn’t confirm your subscription right now. Please try the link again in a few minutes, or reach Frank at frank@frankx.ai if it keeps failing.',
    },
  }

  const copy = errorCopy[status] || errorCopy.error

  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-8 text-center">
      <AlertCircle className="mx-auto mb-4 h-12 w-12 text-amber-400" />
      <h1 className="mb-3 text-2xl font-semibold text-white">{copy.title}</h1>
      <p className="text-zinc-300 leading-relaxed">{copy.body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/newsletter"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/90 hover:bg-white/5 transition-colors"
        >
          Try again
        </Link>
      </div>
    </div>
  )
}

async function ConfirmInner({ status }: { status: string }) {
  return <StatusContent status={status} />
}

export default async function NewsletterConfirmPage({ searchParams }: PageProps) {
  const params = await searchParams
  const status = params.status || 'missing'

  return (
    <main className="min-h-[80vh] bg-[#0a0a0b] py-24 px-6">
      <div className="mx-auto max-w-xl">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.32em] text-zinc-500">
          Newsletter · confirmation
        </p>
        <Suspense fallback={<div className="text-zinc-400 text-center">Loading…</div>}>
          <ConfirmInner status={status} />
        </Suspense>
      </div>
    </main>
  )
}
