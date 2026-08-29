import Link from 'next/link'
import { ArrowRight, LockKeyhole } from 'lucide-react'

import { EmailSignup } from '@/components/email-signup'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Inner Circle Notes — Interest List',
  description:
    'A possible deeper editorial lane for implementation notes. Not currently a paid membership or open program.',
  path: '/inner-circle',
})

export default function InnerCirclePage() {
  return (
    <main tabIndex={-1} className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(245,158,11,0.12),transparent_34%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-4xl px-5 pb-20 pt-32 text-center sm:px-8 lg:pb-28 lg:pt-40">
          <LockKeyhole
            className="mx-auto h-6 w-6 text-amber-200"
            aria-hidden="true"
          />
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.24em] text-amber-200/75">
            Private build notes · interest list
          </p>
          <h1 className="mt-6 text-5xl font-bold tracking-[-0.045em] sm:text-6xl">
            Inner Circle is not currently open.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/66">
            The name is reserved for a possible deeper editorial lane:
            implementation notes, system decisions, and work-in-progress
            receipts. It is not currently a paid membership, live community, or
            available product.
          </p>
          <div className="mx-auto mt-10 max-w-xl rounded-[1.5rem] border border-amber-300/15 bg-amber-300/[0.035] p-6 text-left sm:p-8">
            <p className="text-sm leading-6 text-white/65">
              Join the interest list only if you want one note when the scope,
              cadence, and operating contract are real. No payment is collected.
            </p>
            <EmailSignup
              listType="inner-circle"
              source="inner-circle-interest"
              buttonText="Register interest"
              placeholder="Founder email"
              compact
              className="mt-5"
            />
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/newsletter"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white/70 underline decoration-white/25 underline-offset-8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
            >
              Read the public Signal Loop
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/founders-circle"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white/70 underline decoration-white/25 underline-offset-8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
            >
              Looking for strategic access? Founder’s Circle
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
