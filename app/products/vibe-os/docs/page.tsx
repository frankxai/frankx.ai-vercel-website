import Link from 'next/link'
import { ArrowLeft, Book, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Vibe OS Documentation | FrankX.ai',
  description: 'Preview the proposed Vibe OS method while the app and template remain in development.',
}

export default function VibeOSDocsPage() {
  return (
    <main className="relative min-h-screen bg-void">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(6,182,212,0.1),transparent_50%)]" />
      </div>

      {/* Header */}
      <div className="relative border-b border-white/10 bg-space/50 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <Link
            href="/products/vibe-os"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Vibe OS
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative mx-auto max-w-4xl px-6 py-16">
        {/* Hero */}
        <div className="mb-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
            <Book className="h-4 w-4" />
            Concept notes
          </div>
          <h1 className="font-display mb-4 text-4xl font-bold text-white sm:text-5xl">
            Vibe OS is still in development
          </h1>
          <p className="text-lg text-white/70">
            These notes explain the proposed method. They are not instructions for an available app or template.
          </p>
        </div>

        {/* Quick Start */}
        <div className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="mb-4 text-2xl font-bold text-white">A manual experiment</h2>
          <p className="mb-6 text-white/60">You can test the underlying idea with a private note or spreadsheet. This is not a Vibe OS deliverable.</p>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-bold text-cyan-300">
                1
              </div>
              <div>
                <h3 className="font-semibold text-white">Choose your own private log</h3>
                <p className="mt-1 text-sm text-white/60">
                  Use a note or spreadsheet you already control. No official Vibe OS template is available.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-bold text-emerald-300">
                2
              </div>
              <div>
                <h3 className="font-semibold text-white">Log your first energy check-in</h3>
                <p className="mt-1 text-sm text-white/60">
                  Record your current energy level (1-5) and what you're working on. Do this 3-4 times throughout your day.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm font-bold text-violet-300">
                3
              </div>
              <div>
                <h3 className="font-semibold text-white">Review your patterns after one week</h3>
                <p className="mt-1 text-sm text-white/60">
                  Look for patterns in your energy levels and identify your peak creative hours.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-sm font-bold text-amber-300">
                4
              </div>
              <div>
                <h3 className="font-semibold text-white">Test one schedule change</h3>
                <p className="mt-1 text-sm text-white/60">
                  Treat any pattern as a hypothesis, then test one small scheduling change.
                </p>
              </div>
            </li>
          </ol>
        </div>

        {/* Core Concepts */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-white">Core concepts</h2>
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 text-lg font-semibold text-white">Creative states</h3>
              <p className="text-white/70">
                The proposed model defines a creative state as a note about energy, focus, and working mode. The manual experiment records those observations in your own notes or spreadsheet.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 text-lg font-semibold text-white">Energy tracking</h3>
              <p className="text-white/70">
                For the manual experiment, record an energy score from 1 to 5 beside the work you attempted. Review several entries before deciding whether a pattern is useful.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 text-lg font-semibold text-white">Workflow planning</h3>
              <p className="text-white/70">
                Treat a possible match between a task and an observed state as a hypothesis. Test one small schedule change and record what happened.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 text-lg font-semibold text-white">Pattern review</h3>
              <p className="text-white/70">
                Review your own observations for recurring conditions. Do not assume a pattern until your notes support it.
              </p>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-cyan-500/5 p-8">
          <h2 className="mb-4 text-xl font-semibold text-white">Product status</h2>
          <div className="space-y-4">
            <Link
              href="/products/vibe-os"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-[background-color,border-color] hover:border-white/20 hover:bg-white/10"
            >
              <ArrowRight className="h-5 w-5 text-cyan-400" />
              <div>
                <div className="font-semibold text-white">View the product status</div>
                <div className="text-sm text-white/60">Return to the Vibe OS concept overview</div>
              </div>
            </Link>

          </div>
        </div>

        {/* Support */}
        <div className="mt-12 text-center">
          <p className="text-sm text-white/50">
            Need help or have questions?{' '}
            <a
              href="mailto:frank@frankx.ai?subject=Vibe%20OS%20Question"
              className="text-cyan-400 underline-offset-4 transition-colors hover:underline"
            >
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
