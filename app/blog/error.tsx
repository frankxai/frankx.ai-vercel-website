'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react'

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Blog error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center">
      {/* Aurora Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative text-center px-6 max-w-lg">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-red-500/10 border border-red-500/20 mb-8">
          <AlertCircle className="h-10 w-10 text-red-400" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>

        <p className="text-white/60 mb-8 leading-relaxed">
          We hit a snag loading this article. This has been logged and we&apos;ll look into it.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>

          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to articles
          </Link>
        </div>

        {error.digest && (
          <p className="mt-8 text-xs text-white/30 font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
