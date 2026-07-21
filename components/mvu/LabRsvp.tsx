'use client'

import { useState, FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'

/**
 * RSVP for the MVU lab.
 *
 * Two states, chosen server-side by whether a Luma URL exists:
 *  - Luma live  → a single clear button to the real RSVP page.
 *  - Not yet    → inline interest capture (reuses /api/subscribe with the
 *                 mvu-tallinn-2026 list + labInterest flag) so demand is
 *                 measured even before the event exists. This is the signal
 *                 behind the week-two go/no-go.
 */
export function LabRsvp({ rsvpUrl }: { rsvpUrl: string }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  if (rsvpUrl) {
    return (
      <a
        href={rsvpUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-tech-primary px-7 py-3.5 font-semibold text-void transition-colors hover:bg-tech-light"
      >
        RSVP on Luma
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </a>
    )
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          listType: 'mvu-tallinn-2026',
          labInterest: true,
          source: 'mvu-lab-page',
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'Got it — you’re on the list.')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error — try again?')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-tech-primary/30 bg-tech-primary/5 p-6" role="status">
        <p className="font-medium text-tech-light">{message}</p>
        <p className="mt-2 text-sm text-white/60">
          If the lab runs, you’ll get the time, place, and a confirmation link. If
          not enough people want it, I’ll tell you that too — no spam either way.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          autoComplete="name"
          aria-label="Name"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 transition-colors focus:border-tech-primary/50 focus:outline-none focus:ring-2 focus:ring-tech-primary/20"
          disabled={status === 'loading'}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          autoComplete="email"
          inputMode="email"
          aria-label="Email"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 transition-colors focus:border-tech-primary/50 focus:outline-none focus:ring-2 focus:ring-tech-primary/20"
          disabled={status === 'loading'}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-xl bg-tech-primary px-6 py-3.5 font-semibold text-void transition-colors hover:bg-tech-light disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-8"
      >
        {status === 'loading' ? 'Sending…' : 'Register interest'}
      </button>
      {status === 'error' && (
        <p className="text-sm text-red-400" role="alert">
          {message}
        </p>
      )}
      <p className="text-xs leading-relaxed text-white/35">
        Registering interest isn’t a ticket — it tells me whether to run the lab.
        One note from me if it happens, nothing otherwise.
      </p>
    </form>
  )
}
