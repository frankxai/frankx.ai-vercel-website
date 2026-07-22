'use client'

import { useState, FormEvent } from 'react'

/**
 * Native RSVP for the MVU lab — hosted entirely on frankx.ai, no third-party
 * event tool. Posts to /api/subscribe (mvu-tallinn-2026), which segments the
 * contact, records the intention, and emails Frank for the by-hand approval.
 *
 * The intention line is the point: asking someone to name what they want to
 * leave with turns a click into a small commitment, and gives Frank a real
 * basis for who to seat. It's optional so it never becomes a wall.
 */
export function LabRsvp({ confirmed }: { confirmed: boolean }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [intention, setIntention] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

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
          intention,
          listType: 'mvu-tallinn-2026',
          source: 'mvu-lab-page',
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(data.message || '')
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
        <p className="font-medium text-tech-light">You’re on the list — check your email.</p>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          I approve each seat by hand to keep the room small. If there’s a place for
          you, you’ll get the time, the address, and one thing to bring. If it fills
          first, I’ll tell you straight — no waitlist theatre.
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

      <textarea
        value={intention}
        onChange={(e) => setIntention(e.target.value)}
        placeholder="Optional — what do you want to still be doing a month from now?"
        rows={2}
        maxLength={280}
        aria-label="What you want to leave with"
        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 transition-colors focus:border-tech-primary/50 focus:outline-none focus:ring-2 focus:ring-tech-primary/20"
        disabled={status === 'loading'}
      />

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-xl bg-tech-primary px-6 py-3.5 font-semibold text-void transition-colors hover:bg-tech-light disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-8"
      >
        {status === 'loading' ? 'Sending…' : confirmed ? 'Request a seat' : 'Put my name down'}
      </button>

      {status === 'error' && (
        <p className="text-sm text-red-400" role="alert">
          {message}
        </p>
      )}

      <p className="text-xs leading-relaxed text-white/35">
        {confirmed
          ? 'Requesting a seat isn’t a guaranteed ticket — I confirm each one by hand to keep the room right. One honest note from me either way.'
          : 'This tells me whether to run the lab at all. If enough people want it, I’ll set a time and come back to you. Nothing else, ever.'}
      </p>
    </form>
  )
}
