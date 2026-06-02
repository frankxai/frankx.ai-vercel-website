'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { RefreshCw, Home, Mail, ArrowRight } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

const isProd = process.env.NODE_ENV === 'production'

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Surface to the browser console — Vercel captures server-side digests
    // automatically via the next/error logging pipeline. We don't run our own
    // telemetry endpoint, so don't claim we do in the UI.
    console.error('Application error:', error)
  }, [error])

  const mailtoBody = `Hi Frank,\n\nSomething broke on frankx.ai.\n\nReference: ${error.digest || 'no-digest'}\nTime: ${new Date().toISOString()}\n\nWhat I was trying to do:\n`

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 py-20">
      <div className="max-w-xl w-full mx-auto text-center">
        {/* Watermark */}
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[6rem] sm:text-[7rem] font-bold leading-none tracking-tight text-white/[0.04] select-none mb-2"
        >
          500
        </motion.p>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="-mt-8 mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white/90 mb-3 tracking-tight">
            Something on this page hit an unexpected state
          </h1>
          <p className="text-sm text-white/40 max-w-md mx-auto leading-relaxed">
            Usually a refresh clears it. If it keeps happening, email Frank with the
            reference below and he&apos;ll take a look.
          </p>
        </motion.div>

        {/* Reference card — only digest, never the raw message in prod */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8"
        >
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs font-mono">
              <div className="flex items-baseline gap-2">
                <span className="text-white/30">reference</span>
                <span className="text-white/70 truncate">{error.digest || 'no-digest-available'}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-white/30">timestamp</span>
                <span className="text-white/70">{new Date().toISOString().slice(0, 19) + 'Z'}</span>
              </div>
            </div>
            {!isProd && error.message && (
              <p className="mt-3 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-rose-300/80 break-words">
                {error.message}
              </p>
            )}
          </div>
        </motion.div>

        {/* Primary actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
        >
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/25 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh this page
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white border border-white/[0.08] hover:border-white/20 transition-colors"
          >
            <Home className="w-4 h-4" />
            Return home
          </Link>
        </motion.div>

        {/* Secondary destinations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center justify-center"
        >
          <Link
            href="/library"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors"
          >
            Library <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/inner-circle"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors"
          >
            Inner Circle <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors"
          >
            Newsletter <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Mailto */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="mt-10"
        >
          <Link
            href={`mailto:frank@frankx.ai?subject=${encodeURIComponent(`frankx.ai error · ${error.digest || 'no-digest'}`)}&body=${encodeURIComponent(mailtoBody)}`}
            className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            <Mail className="w-3 h-3" /> Email Frank with this reference
          </Link>
        </motion.div>

        {/* Footer mark */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-12 text-[10px] font-mono text-white/10"
        >
          frankx.ai // FRANK-&#937;
        </motion.p>
      </div>
    </div>
  )
}
