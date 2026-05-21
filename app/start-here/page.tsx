import Link from 'next/link'
import { ArrowRight, Sparkles, BookOpen, Code2, Layers } from 'lucide-react'
import { EmailSignup } from '@/components/email-signup'
import { createMetadata } from '@/lib/seo'
import { products } from '@/data/products'

export const metadata = createMetadata({
  title: 'Start Here — Build Your First AI Agent',
  description:
    'Free 8-page handout + 10-day email primer course on the six primitives of an AI agent. No card. No fluff. Just the mental model that transfers across every framework.',
  path: '/start-here',
})

const featuredProduct = products.find((p) => p.slug === 'six-primitives-toolkit')

export default function StartHerePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero — restraint first */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.04] to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Free primer · No card required
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-[1.05]">
            The six primitives of an AI agent.
            <br />
            <span className="text-zinc-400">Learn them once. Use them forever.</span>
          </h1>
          <p className="text-lg text-zinc-300 leading-relaxed mb-8 max-w-2xl">
            Every AI agent is made of six primitives — model, tool, memory, loop, spec, deploy.
            Learn them once, and every new framework becomes a 30-minute exercise instead of a
            month-long investment. The Primer is an 8-page handout plus a 10-day email course
            that teaches you the mental model that transfers across every stack.
          </p>

          {/* Email gate */}
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.03] p-6 sm:p-8 max-w-xl">
            <p className="text-sm font-medium text-zinc-300 mb-1.5">
              Get the free Six Primitives Primer
            </p>
            <p className="text-xs text-zinc-500 mb-4">
              8-page handout PDF + 10-day email course. Unsubscribe in one click.
            </p>
            <EmailSignup
              listType="courses-waitlist"
              placeholder="you@work.com"
              buttonText="Send me the primer"
              compact
            />
          </div>

          {/* Trust strip */}
          <p className="text-xs text-zinc-500 mt-6 max-w-xl">
            Built on the open{' '}
            <Link href="/starlight-intelligence-system" className="underline hover:text-zinc-300">
              Starlight Intelligence Protocol
            </Link>
            . The Primer is CC-BY-SA. The starter repo is MIT. We never sell your email.
          </p>
        </div>
      </section>

      {/* What you'll get — three cards */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-white mb-8 tracking-tight">
            What you receive — for free
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <BookOpen className="w-6 h-6 text-cyan-400 mb-3" />
              <h3 className="text-base font-semibold text-white mb-2">The Six Primitives Handout</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                8-page polished PDF. Print, pin, photograph. CC-BY-SA — share with your team.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <Layers className="w-6 h-6 text-cyan-400 mb-3" />
              <h3 className="text-base font-semibold text-white mb-2">10-day email course</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                One opinionated email per day. Each teaches one primitive with code samples
                and a tiny exercise. Done in 10 minutes per day.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <Code2 className="w-6 h-6 text-cyan-400 mb-3" />
              <h3 className="text-base font-semibold text-white mb-2">Starter repo + Agent Card</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                MIT-licensed reference implementation on GitHub. One pre-validated A2A Agent Card
                template you can adapt and fork.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The honest path forward */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-4 tracking-tight">
              The honest path forward
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed mb-3">
              The Primer is real. Not a watered-down sample. You can build a working agent on
              just the free material — and many of you will.
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-3">
              When you want the polished pocket book, the 30-card Agent Card library, the
              50-pattern production cookbook, and a community of practitioners shipping agents,
              the{' '}
              <Link href="/build/six-primitives-toolkit" className="text-cyan-400 hover:text-cyan-300 underline">
                Toolkit
              </Link>{' '}
              is where most builders settle. €197, lifetime, 30-day refund. That's the
              workhorse tier.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We never push the upgrade in the email course. If the Primer is enough, it's
              enough. Pay only when paying actually saves you time.
            </p>
          </div>
        </div>
      </section>

      {/* Reading order — alternative entries */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-white mb-5 tracking-tight">
            Or jump in differently
          </h2>
          <div className="space-y-2">
            <Link
              href="/blog/six-primitives-ai-agent"
              className="flex items-start justify-between p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <div className="pr-4">
                <p className="text-sm font-medium text-white mb-1 group-hover:text-cyan-300">
                  Read the long-form essay
                </p>
                <p className="text-xs text-zinc-400">
                  The full argument for the six primitives — 10-min read.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 flex-shrink-0 mt-0.5" />
            </Link>
            <Link
              href="/workshops/build-first-ai-agent"
              className="flex items-start justify-between p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <div className="pr-4">
                <p className="text-sm font-medium text-white mb-1 group-hover:text-cyan-300">
                  Ship in 90 minutes — the workshop
                </p>
                <p className="text-xs text-zinc-400">
                  Live build + deploy + Agent Card. The fastest path to a working artifact.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 flex-shrink-0 mt-0.5" />
            </Link>
            <Link
              href="/build"
              className="flex items-start justify-between p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <div className="pr-4">
                <p className="text-sm font-medium text-white mb-1 group-hover:text-cyan-300">
                  See all five tiers
                </p>
                <p className="text-xs text-zinc-400">
                  €7 Pack · €197 Toolkit · €497 Mastery · €997 Architect · Founder's Circle.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 flex-shrink-0 mt-0.5" />
            </Link>
            <Link
              href="/founders-circle"
              className="flex items-start justify-between p-4 rounded-xl border border-rose-500/20 bg-rose-500/[0.03] hover:bg-rose-500/[0.06] transition-colors group"
            >
              <div className="pr-4">
                <p className="text-sm font-medium text-white mb-1 group-hover:text-rose-300">
                  Founder's Circle (10 seats / quarter)
                </p>
                <p className="text-xs text-zinc-400">
                  4 hours of Frank's time per quarter. By application. €2,997.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-rose-400 flex-shrink-0 mt-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom — restate the offer */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Whether you stop at the free Primer or go all the way to the Founder's Circle,
            you'll know more about AI agents than 99% of the people writing about them.
            Start with the free version.
          </p>
        </div>
      </section>
    </div>
  )
}
