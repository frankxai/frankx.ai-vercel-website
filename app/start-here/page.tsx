import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, BookOpen, Code2, Layers } from 'lucide-react'
import { EmailSignup } from '@/components/email-signup'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Start Here — Build Your First AI Agent',
  description:
    'Read the free First Agent Primer: a practical guide to the six primitives, a working TypeScript agent, deployment, an Agent Card, and evaluation.',
  path: '/start-here',
})

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
            The First Agent Primer is available to read now. It covers the mental model, a working
            TypeScript build, deployment, an Agent Card, and a small evaluation harness.
          </p>

          {/* Direct guide access and optional newsletter signup */}
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.03] p-6 sm:p-8 max-w-xl">
            <Link
              href="/guides/first-agent-primer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-[#07120d] transition-colors hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              Read the free primer
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="mt-6 text-sm font-medium text-zinc-300">Follow the work</p>
            <p className="mb-4 mt-1.5 text-xs leading-relaxed text-zinc-500">
              Subscribe to occasional FrankX field notes and receive the standard welcome email.
              This signup does not deliver a PDF or an automated course.
            </p>
            <EmailSignup
              listType="newsletter"
              source="start-here"
              placeholder="you@work.com"
              buttonText="Subscribe to field notes"
              compact
            />
          </div>

          {/* Trust strip */}
          <p className="text-xs text-zinc-500 mt-6 max-w-xl">
            Built on the open{' '}
            <Link href="/starlight-intelligence-system" className="underline hover:text-zinc-300">
              Starlight Intelligence Protocol
            </Link>
            . The written Primer is public and does not require an email address.
          </p>
        </div>
      </section>

      {/* The six primitives, visualized */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
            <Image
              src="/images/blog/generated/six-primitives-ai-agent-premium-hero.png"
              alt="Six glowing glass modules connected to a central core — the six primitives of an AI agent: model, tool, memory, loop, spec, deploy"
              width={1672}
              height={941}
              sizes="(max-width: 768px) 100vw, 768px"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* What you'll get — three cards */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-white mb-8 tracking-tight">
            What you can use now
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <BookOpen className="w-6 h-6 text-cyan-400 mb-3" />
              <h3 className="text-base font-semibold text-white mb-2">The written primer</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Read the six-primitive mental model directly on the site, without an email gate.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <Layers className="w-6 h-6 text-cyan-400 mb-3" />
              <h3 className="text-base font-semibold text-white mb-2">A working build path</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Follow the TypeScript example from local setup through a public Vercel deployment.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <Code2 className="w-6 h-6 text-cyan-400 mb-3" />
              <h3 className="text-base font-semibold text-white mb-2">Agent Card and evaluation</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Add an A2A Agent Card and run three evaluation cases against the finished agent.
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
              The written Primer is public now. You can use it to build and evaluate a working
              agent without joining an email list.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Start with the guide, run the examples, and keep the parts that fit your stack.
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
          </div>
        </div>
      </section>

      {/* Bottom — restate the offer */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Start with the public Primer. You can read it without joining a list, then use the
            examples to build and evaluate your first agent.
          </p>
        </div>
      </section>
    </div>
  )
}
