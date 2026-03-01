'use client'

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BookDownloadGateProps {
  bookSlug: string
  bookTitle: string
  themeColor?: string
  className?: string
}

export default function BookDownloadGate({
  bookSlug,
  bookTitle,
  themeColor = 'emerald',
  className = '',
}: BookDownloadGateProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [downloadUrl, setDownloadUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const colorMap: Record<string, { border: string; bg: string; text: string; button: string; glow: string }> = {
    rose:    { border: 'border-rose-500/20', bg: 'from-rose-500/5', text: 'text-rose-400', button: 'from-rose-600 to-rose-500', glow: 'bg-rose-500/10' },
    red:     { border: 'border-red-500/20', bg: 'from-red-500/5', text: 'text-red-400', button: 'from-red-600 to-red-500', glow: 'bg-red-500/10' },
    emerald: { border: 'border-emerald-500/20', bg: 'from-emerald-500/5', text: 'text-emerald-400', button: 'from-emerald-600 to-emerald-500', glow: 'bg-emerald-500/10' },
    violet:  { border: 'border-violet-500/20', bg: 'from-violet-500/5', text: 'text-violet-400', button: 'from-violet-600 to-violet-500', glow: 'bg-violet-500/10' },
    amber:   { border: 'border-amber-500/20', bg: 'from-amber-500/5', text: 'text-amber-400', button: 'from-amber-600 to-amber-500', glow: 'bg-amber-500/10' },
    gold:    { border: 'border-yellow-500/20', bg: 'from-yellow-500/5', text: 'text-yellow-400', button: 'from-yellow-600 to-yellow-500', glow: 'bg-yellow-500/10' },
    sky:     { border: 'border-sky-500/20', bg: 'from-sky-500/5', text: 'text-sky-400', button: 'from-sky-600 to-sky-500', glow: 'bg-sky-500/10' },
  }

  const colors = colorMap[themeColor] || colorMap.emerald

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) {
      setErrorMessage('Please enter your email')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productSlug: bookSlug, email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Download failed')
      }

      setDownloadUrl(data.file.url)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <div className={`relative rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.bg} via-transparent to-transparent p-6 sm:p-8 ${className}`}>
      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl ${colors.glow} flex items-center justify-center mb-4`}>
        <svg className={`w-5 h-5 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-white mb-1">
        Download {bookTitle} as PDF
      </h3>
      <p className="text-sm text-white/50 mb-5">
        Get the full book as a beautifully designed PDF. Free — just enter your email.
      </p>

      <AnimatePresence mode="wait">
        {status === 'success' && downloadUrl ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Your PDF is ready
            </div>
            <a
              href={downloadUrl}
              download
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${colors.button} text-white font-semibold hover:opacity-90 transition-opacity`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </a>
            <p className="text-xs text-white/30">
              Check your email for updates on new books and chapters.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={status === 'loading'}
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 text-sm"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`px-5 py-2.5 bg-gradient-to-r ${colors.button} text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap`}
              >
                {status === 'loading' ? 'Sending...' : 'Get PDF'}
              </button>
            </div>

            {status === 'error' && errorMessage && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-xs"
              >
                {errorMessage}
              </motion.p>
            )}

            <p className="text-xs text-white/30">
              No spam. Unsubscribe anytime.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
