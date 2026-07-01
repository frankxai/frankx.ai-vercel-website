'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'

import { INTENTS, INTENT_LABEL, type Intent } from '@/lib/intake-types'

const INITIAL_INTENT: Intent = 'general'

interface Props {
  /** Pre-select an intent (e.g. when linked from /build with ?intent=sprint). */
  defaultIntent?: Intent
}

export function ContactForm({ defaultIntent = INITIAL_INTENT }: Props) {
  const [intent, setIntent] = useState<Intent>(defaultIntent)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>(
    'idle',
  )
  const [error, setError] = useState<string | null>(null)
  const [ackSent, setAckSent] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setError(null)

    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      intent,
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      company: String(data.get('company') || ''),
      message: String(data.get('message') || ''),
      website: String(data.get('website') || ''), // honeypot
      // 'use client' + form submit handler → window is always defined here.
      source: window.location.pathname,
      consent: data.get('consent') === 'on',
    }

    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok && json.ok) {
        setStatus('done')
        setAckSent(Boolean(json.ackSent))
        form.reset()
      } else {
        setStatus('error')
        setError(json.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setError('Network error. Please try again or email frank@frankx.ai.')
    }
  }

  if (status === 'done') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-emerald-400/30 bg-emerald-500/[0.06] p-8 text-center"
      >
        <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-300" />
        <h3 className="mt-4 text-xl font-semibold text-white">Got it.</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-300/90">
          {ackSent
            ? 'Your message reached Frank directly, and a confirmation just hit your inbox.'
            : 'Your message reached Frank directly.'}{' '}
          A real reply follows within 1–2 working days.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-semibold text-emerald-300 underline-offset-4 hover:underline"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Intent selector — a single-choice group. Styled as buttons but
          exposed to assistive tech as a real radiogroup: aria-pressed models
          independent toggles (any subset could be true), which is the wrong
          semantics for "pick exactly one". */}
      <fieldset>
        <legend className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          What's this about?
        </legend>
        <div role="radiogroup" aria-label="What's this about?" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {INTENTS.map((i) => (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={intent === i}
              onClick={() => setIntent(i)}
              className={`rounded-lg border px-3 py-2.5 text-left text-[13px] font-medium leading-tight transition ${
                intent === i
                  ? 'border-cyan-300/60 bg-cyan-300/10 text-white'
                  : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-slate-200'
              }`}
            >
              {INTENT_LABEL[i]}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-300">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={200}
            autoComplete="name"
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-1 focus:ring-cyan-300/50"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-1 focus:ring-cyan-300/50"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-slate-300">
          Company <span className="text-slate-500">(optional)</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          maxLength={200}
          autoComplete="organization"
          className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-1 focus:ring-cyan-300/50"
          placeholder="Where you work"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={4000}
          rows={5}
          className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-1 focus:ring-cyan-300/50"
          placeholder="What are you building, and where can Frank help?"
        />
      </div>

      {/* Honeypot — hidden from humans, catches bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-2.5 text-sm text-slate-400">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-cyan-400 focus:ring-cyan-300/50"
        />
        <span>
          I consent to FrankX storing this message to respond. No marketing without
          opt-in.
        </span>
      </label>

      {status === 'error' && error && (
        <p
          role="alert"
          className="rounded-lg border border-rose-400/30 bg-rose-500/[0.06] px-4 py-3 text-sm text-rose-200"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send to Frank
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  )
}
