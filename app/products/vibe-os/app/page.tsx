import Link from 'next/link'
import { ArrowLeft, Calendar, Zap, TrendingUp, Settings } from 'lucide-react'

export const metadata = {
  title: 'Vibe OS App - Creative State Management | FrankX.ai',
  description: 'Track your creative energy, optimize your workflow, and ship consistently.',
}

export default function VibeOSAppPage() {
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
            Back to Product Page
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative mx-auto max-w-4xl px-6 py-16">
        {/* Coming Soon Banner */}
        <div className="mb-12 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-400">
            <Zap className="h-4 w-4" />
            In Development
          </div>
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Vibe OS App Coming Soon
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            We're building the web app. In the meantime, download the Notion template to start tracking your creative states today.
          </p>
        </div>

        {/* Features Preview */}
        <div className="mb-12">
          <h2 className="mb-6 text-xl font-semibold text-white">
            What's Coming in the App
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Energy Tracking</h3>
              <p className="text-sm text-white/60">
                Log your creative energy levels throughout the day with one-click logging and automated pattern detection.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Analytics Dashboard</h3>
              <p className="text-sm text-white/60">
                Visualize your productivity patterns, peak hours, and creative cycles with interactive charts.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Smart Scheduling</h3>
              <p className="text-sm text-white/60">
                Get AI-powered suggestions for when to schedule different types of creative work based on your patterns.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                <Settings className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Workflow Templates</h3>
              <p className="text-sm text-white/60">
                Pre-built workflows for different creative tasks matched to your energy states and focus modes.
              </p>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-cyan-500/5 p-8">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Start Now with the Notion Template
          </h2>
          <p className="mb-6 text-white/70">
            Get the Vibe OS Notion dashboard and start tracking your creative states while we build the web app. It's free and ready to use today.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/products/vibe-os#download"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Download Notion Template
            </Link>
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
            >
              Get Launch Updates
            </Link>
          </div>
        </div>

        {/* Updates */}
        <div className="mt-12 text-center">
          <p className="text-sm text-white/50">
            Want to contribute or follow development?{' '}
            <a
              href="mailto:hello@frankx.ai?subject=Vibe%20OS%20Development"
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
