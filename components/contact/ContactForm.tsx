'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'

import { INTENTS, INTENT_LABEL, type Intent } from '@/lib/intake-types'
import { buildPartnershipBrief, PARTNERSHIP_BUDGETS, PARTNERSHIP_KINDS } from '@/lib/partnership-brief'
import { trackEvent } from '@/lib/analytics'

const INITIAL_INTENT: Intent = 'general'

/**
 * Roving-tabindex arrow navigation for the intent radiogroup. The WAI-ARIA
 * APG radio pattern requires Left/Up → previous, Right/Down → next (with
 * wraparound), selection following focus — role="radiogroup"/"radio" without
 * this leaves the group correctly announced but not actually operable the
 * way a screen-reader user expects (Tab still visits every option instead
 * of one stop with arrow-key selection).
 */
function handleIntentKeyDown(
  e: React.KeyboardEvent<HTMLDivElement>,
  setIntent: (i: Intent) => void,
) {
  const { key } = e
  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(key)) return
  e.preventDefault()

  const currentIndex = INTENTS.indexOf(
    (e.target as HTMLElement).dataset.intent as Intent,
  )
  if (currentIndex === -1) return

  const delta = key === 'ArrowLeft' || key === 'ArrowUp' ? -1 : 1
  const nextIndex = (currentIndex + delta + INTENTS.length) % INTENTS.length
  const nextIntent = INTENTS[nextIndex]
  setIntent(nextIntent)

  const group = (e.target as HTMLElement).closest('[role="radiogroup"]')
  const nextButton = group?.querySelector<HTMLButtonElement>(
    `[data-intent="${nextIntent}"]`,
  )
  nextButton?.focus()
}

interface Props {
  /** Pre-select an intent (e.g. when linked from /build with ?intent=sprint). */
  defaultIntent?: Intent
  /** Structured brief on the existing partnership hub; general contact is unchanged. */
  partnershipBrief?: boolean
}

export function ContactForm({ defaultIntent = INITIAL_INTENT, partnershipBrief = false }: Props) {
  const [intent, setIntent] = useState<Intent>(defaultIntent)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>(
    'idle',
  )
  const [error, setError] = useState<string | null>(null)
  const [ackSent, setAckSent] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'submitting') return
    setStatus('submitting')
    setError(null)

    const form = e.currentTarget
    const data = new FormData(form)
    let message = String(data.get('message') || '')
    try {
      if (partnershipBrief) message = buildPartnershipBrief(data)
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Please check the brief.')
      return
    }
    const payload = {
      intent: partnershipBrief ? 'partnership' : intent,
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      company: String(data.get('company') || ''),
      message,
      website: String(data.get('website') || ''), // honeypot
      // 'use client' + form submit handler → window is always defined here.
      source: partnershipBrief ? '/partnerships#architecture-brief' : window.location.pathname,
      consent: data.get('consent') === 'on',
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15_000)
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok && json.ok) {
        setStatus('done')
        setAckSent(Boolean(json.ackSent))
        if (partnershipBrief && !payload.website) {
          try {
            trackEvent('partnership_brief_received', { surface: 'partnerships', source: 'architecture-brief' })
          } catch {
            // Measurement cannot turn accepted delivery into a failed submission.
          }
        }
        form.reset()
      } else {
        setStatus('error')
        setError(json.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setError('Delivery could not be confirmed. Your draft is still here. You can retry or email frank@frankx.ai; mention a possible duplicate when retrying.')
    } finally {
      clearTimeout(timeout)
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
          {partnershipBrief ? 'Frank will review the brief before agreeing scope or a delivery date.' : 'A real reply follows within 1–2 working days.'}
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
      {!partnershipBrief && <fieldset>
        <legend className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          What's this about?
        </legend>
        <div
          role="radiogroup"
          aria-label="What's this about?"
          onKeyDown={(e) => handleIntentKeyDown(e, setIntent)}
          className="grid grid-cols-2 gap-2 sm:grid-cols-3"
        >
          {INTENTS.map((i) => (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={intent === i}
              data-intent={i}
              tabIndex={intent === i ? 0 : -1}
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
      </fieldset>}

      {partnershipBrief && (
        <fieldset className="space-y-5">
          <legend className="mb-3 text-sm font-semibold text-white">Your architecture brief</legend>
          <div>
            <label htmlFor="briefKind" className="mb-1.5 block text-sm font-medium text-slate-300">What would you like to propose?</label>
            <select id="briefKind" name="briefKind" required className="w-full rounded-lg border border-white/20 bg-[#171915] px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
              {Object.entries(PARTNERSHIP_KINDS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="productUrl" className="mb-1.5 block text-sm font-medium text-slate-300">Product or documentation URL</label>
            <input id="productUrl" name="productUrl" type="url" required maxLength={300} placeholder="https://" className="w-full rounded-lg border border-white/20 bg-white/[0.03] px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300" />
          </div>
          <div>
            <label htmlFor="audience" className="mb-1.5 block text-sm font-medium text-slate-300">Who should be able to use the result?</label>
            <input id="audience" name="audience" required maxLength={200} className="w-full rounded-lg border border-white/20 bg-white/[0.03] px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-slate-300">Budget range</label>
              <select id="budget" name="budget" required defaultValue="" className="w-full rounded-lg border border-white/20 bg-[#171915] px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                <option value="" disabled>Select a range</option>
                {PARTNERSHIP_BUDGETS.map(value => <option key={value} value={value}>{value}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="preferredDate" className="mb-1.5 block text-sm font-medium text-slate-300">Preferred date (optional)</label>
              <input id="preferredDate" name="preferredDate" type="date" className="w-full rounded-lg border border-white/20 bg-[#171915] px-4 py-3 text-sm text-white [color-scheme:dark] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300" />
            </div>
          </div>
        </fieldset>
      )}

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
          {partnershipBrief ? 'Task and useful result' : 'Message'}
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={partnershipBrief ? 2000 : 4000}
          rows={5}
          className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-1 focus:ring-cyan-300/50"
          placeholder={partnershipBrief ? 'What should someone accomplish with your product? Include the current setup and the result they should be able to reproduce.' : 'What are you building, and where can Frank help?'}
        />
        {partnershipBrief && <p className="mt-2 text-xs leading-5 text-slate-400">Up to 2,000 characters. Keep credentials and private customer data out of the brief. Sending a brief starts a conversation; scope and fees are agreed separately.</p>}
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
          {' '}<a href="/privacy" className="underline underline-offset-4">Privacy policy</a>
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
            {partnershipBrief ? 'Send the brief' : 'Send to Frank'}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  )
}
