import Link from 'next/link'
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Zap, TrendingUp, Settings } from 'lucide-react'

export const metadata = {
  title: 'Vibe OS App - Creative State Management | FrankX.ai',
  description: 'Development status and proposed scope for the unreleased Vibe OS app.',
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
            Back to product page
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative mx-auto max-w-4xl px-6 py-16">
        {/* Coming Soon Banner */}
        <div className="mb-12 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-400">
            <Zap className="h-4 w-4" />
            In development
          </div>
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
            The Vibe OS app is not available yet
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            This is a development preview. There is no public app or verified template to download today.
          </p>
        </div>

        {/* Features Preview */}
        <div className="mb-12">
          <h2 className="mb-6 text-xl font-semibold text-white">
            Proposed app scope
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Energy tracking</h3>
              <p className="text-sm text-white/60">
                A simple check-in for recording energy and the work in progress.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Analytics dashboard</h3>
              <p className="text-sm text-white/60">
                Review recorded check-ins and look for patterns worth testing.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Smart scheduling</h3>
              <p className="text-sm text-white/60">
                Explore scheduling suggestions based on the observations you choose to record.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                <Settings className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Workflow templates</h3>
              <p className="text-sm text-white/60">
                Draft workflows for different creative tasks and focus conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Interest Section */}
        <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-cyan-500/5 p-8">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Interested in the direction?
          </h2>
          <p className="mb-6 text-white/70">
            Read the concept notes to test the idea manually. This does not create an app account or promise access to the unreleased app.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/products/vibe-os/docs"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-lg"
            >
              Read the concept notes
              <BookOpen className="h-4 w-4" />
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Updates */}
        <div className="mt-12 text-center">
          <p className="text-sm text-white/50">
            Want to contribute or follow development?{' '}
            <a
              href="mailto:frank@frankx.ai?subject=Vibe%20OS%20Development"
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
