'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function ConnectNewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email) return

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, listType: 'inner-circle' }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.message ?? 'Subscription failed')
      }

      trackEvent('connect_waitlist_signed_up', { listType: 'inner-circle' })
      setStatus('success')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-5 backdrop-blur">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-amber-300" aria-hidden />
        <p className="text-sm font-semibold text-white">Join the inner circle</p>
      </div>
      <p className="mb-3 text-xs leading-relaxed text-white/60">
        Weekly drops on AI architecture, music, and the systems behind FrankX. No noise.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'submitting' || status === 'success'}
          placeholder="you@domain.com"
          aria-describedby="connect-newsletter-status"
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 backdrop-blur focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'submitting' || status === 'success'}
          className="rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-400 px-5 py-3 text-sm font-semibold text-black shadow-[0_10px_30px_-10px_rgba(16,185,129,0.55)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
        >
          {status === 'submitting' ? '…' : status === 'success' ? 'Joined' : 'Join'}
        </button>
      </form>
      <div
        id="connect-newsletter-status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-2.5 min-h-[1.25rem] text-xs"
      >
        {status === 'success' && (
          <div className="flex items-center gap-1.5 text-emerald-300">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
            <span>Welcome. Check your inbox.</span>
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center gap-1.5 text-amber-300">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden />
            <span>{errorMessage || 'Something went wrong — try again.'}</span>
          </div>
        )}
      </div>
    </div>
  )
}
