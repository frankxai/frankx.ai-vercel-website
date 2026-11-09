import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { EmailSignup } from '@/components/email-signup'

/**
 * The hub's only newsletter door, plus the two community links that shipped
 * beside it before.
 */
export default function NewsletterBlock() {
  return (
    <section aria-labelledby="newsletter-title" className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-12">
          <h2
            id="newsletter-title"
            className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl"
          >
            Stay current
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/60">
            Weekly briefs on AI architecture, production patterns and emerging
            technology, with the sources kept in view.
          </p>
          <EmailSignup
            listType="newsletter"
            compact
            placeholder="you@example.com"
            buttonText="Get the briefs"
            className="mt-8 max-w-md"
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/inner-circle"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-[#0a0a0b] transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              Join Inner Circle
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/[0.12] px-7 text-sm font-medium text-white/80 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              Read latest articles
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
