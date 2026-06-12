import Link from 'next/link'
import { ArrowLeft, Book, Download, Zap } from 'lucide-react'

export const metadata = {
  title: 'Vibe OS Documentation | FrankX.ai',
  description: 'Learn how to use Vibe OS for creative state management and energy tracking.',
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
            Documentation
          </div>
          <h1 className="font-display mb-4 text-4xl font-bold text-white sm:text-5xl">
            Vibe OS Documentation
          </h1>
          <p className="text-lg text-white/70">
            Everything you need to start managing your creative energy and optimizing your workflow.
          </p>
        </div>

        {/* Quick Start */}
        <div className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="mb-4 text-2xl font-bold text-white">Quick Start</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-bold text-cyan-300">
                1
              </div>
              <div>
                <h3 className="font-semibold text-white">Download the Notion Template</h3>
                <p className="mt-1 text-sm text-white/60">
                  Get the Vibe OS dashboard template and duplicate it to your Notion workspace.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-bold text-emerald-300">
                2
              </div>
              <div>
                <h3 className="font-semibold text-white">Log Your First Energy Check-In</h3>
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
                <h3 className="font-semibold text-white">Review Your Patterns After 1 Week</h3>
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
                <h3 className="font-semibold text-white">Optimize Your Schedule</h3>
                <p className="mt-1 text-sm text-white/60">
                  Schedule deep creative work during your peak hours and admin tasks during lower-energy windows.
                </p>
              </div>
            </li>
          </ol>
        </div>

        {/* Core Concepts */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-white">Core Concepts</h2>
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 text-lg font-semibold text-white">Creative States</h3>
              <p className="text-white/70">
                Your creative state is the combination of your energy level, focus quality, and mental mode. Vibe OS helps you track these states to understand when you do your best work.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 text-lg font-semibold text-white">Energy Tracking</h3>
              <p className="text-white/70">
                Log your energy levels on a 1-5 scale throughout the day. Over time, patterns emerge showing your natural energy cycles and peak productivity windows.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 text-lg font-semibold text-white">Workflow Optimization</h3>
              <p className="text-white/70">
                Match your tasks to your energy states. Schedule creative work during high-energy peaks, meetings during moderate energy, and admin work during low-energy periods.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 text-lg font-semibold text-white">Pattern Recognition</h3>
              <p className="text-white/70">
                After 1-2 weeks of tracking, review your data to identify patterns. Most creators find they have 2-4 hours of peak creative energy per day.
              </p>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-cyan-500/5 p-8">
          <h2 className="mb-4 text-xl font-semibold text-white">Resources</h2>
          <div className="space-y-4">
            <Link
              href="/products/vibe-os#download"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10"
            >
              <Download className="h-5 w-5 text-cyan-400" />
              <div>
                <div className="font-semibold text-white">Notion Template</div>
                <div className="text-sm text-white/60">Download the complete Vibe OS dashboard</div>
              </div>
            </Link>

            <Link
              href="/products/vibe-os/app"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10"
            >
              <Zap className="h-5 w-5 text-emerald-400" />
              <div>
                <div className="font-semibold text-white">Web App (Coming Soon)</div>
                <div className="text-sm text-white/60">See what's coming in the web version</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Support */}
        <div className="mt-12 text-center">
          <p className="text-sm text-white/50">
            Need help or have questions?{' '}
            <a
              href="mailto:hello@frankx.ai?subject=Vibe%20OS%20Question"
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
