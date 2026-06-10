import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, AlertCircle, Heart } from 'lucide-react'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Unsubscribed | FrankX',
  description:
    'Newsletter unsubscribe confirmation.',
  path: '/newsletter/unsubscribe',
})

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<{ status?: string }>
}

export default async function NewsletterUnsubscribePage({ searchParams }: PageProps) {
  const params = await searchParams
  const status = params.status || 'missing'

  const content =
    status === 'ok'
      ? {
          icon: <Heart className="mx-auto mb-4 h-12 w-12 text-rose-300" />,
          title: 'You\'re unsubscribed.',
          body: 'You won\'t receive any more newsletter issues. Thanks for being on the list while you were — no hard feelings.',
          showResubscribe: true,
        }
      : status === 'invalid'
      ? {
          icon: <AlertCircle className="mx-auto mb-4 h-12 w-12 text-amber-400" />,
          title: 'This unsubscribe link isn\'t valid',
          body: 'The link may have expired or been tampered with. The unsubscribe link at the bottom of any newsletter issue will work. If you can\'t find one, email frank@frankx.ai and Frank will remove you directly.',
          showResubscribe: false,
        }
      : status === 'missing'
      ? {
          icon: <AlertCircle className="mx-auto mb-4 h-12 w-12 text-amber-400" />,
          title: 'Unsubscribe link incomplete',
          body: 'This page expects an email + token in the URL. Use the unsubscribe link at the bottom of any newsletter issue.',
          showResubscribe: false,
        }
      : {
          icon: <AlertCircle className="mx-auto mb-4 h-12 w-12 text-amber-400" />,
          title: 'Something went wrong on our side',
          body: 'We couldn\'t unsubscribe you right now. Please try the link again in a few minutes, or email frank@frankx.ai and Frank will remove you directly.',
          showResubscribe: false,
        }

  return (
    <main className="min-h-[80vh] bg-[#0a0a0b] py-24 px-6">
      <div className="mx-auto max-w-xl">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.32em] text-zinc-500">
          Newsletter · unsubscribe
        </p>
        <div
          className={`rounded-2xl border p-8 text-center ${
            status === 'ok'
              ? 'border-rose-500/20 bg-rose-500/[0.04]'
              : 'border-amber-500/20 bg-amber-500/[0.04]'
          }`}
        >
          {content.icon}
          <h1 className="mb-3 text-2xl font-semibold text-white">{content.title}</h1>
          <p className="text-zinc-300 leading-relaxed">{content.body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {content.showResubscribe && (
              <Link
                href="/newsletter"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/90 hover:bg-white/5 transition-colors"
              >
                Resubscribe if you change your mind
              </Link>
            )}
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90 transition-colors"
            >
              Back to frankx.ai
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
