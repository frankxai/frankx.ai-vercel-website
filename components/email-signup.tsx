'use client'

import { useState, useId, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'
import {
  MAX_PAIN_LENGTH,
  PAIN_PROMPT,
  PRICE_BANDS,
  PRICE_PROMPT,
  ROLE_PROMPT,
  rolesFor,
  type PriceBand,
} from '@/lib/diagnostic/demand'
import { cn } from '@/lib/utils'

interface EmailSignupProps {
  listType?:
    | 'newsletter'
    | 'creation-chronicles'
    | 'ai-architect'
    | 'founder-stack'
    | 'inner-circle'
    | 'music-lab'
    | 'arcanea'
    | 'investor'
    | 'courses-waitlist'
    | 'ikigai-branding'
    | 'agentic-builder-lab'
    | 'premium-packs'
    | 'all'
  source?: string
  placeholder?: string
  buttonText?: string
  className?: string
  redirectTo?: string
  showName?: boolean
  compact?: boolean
  /**
   * Product registry id this signup is attributed to. Posted with the signup so a
   * per-product CTA never lands as an anonymous row on a shared list.
   */
  intent?: string
  /** Human label for `intent`, used in the step-2 copy so the questions are clearly scoped. */
  intentLabel?: string
  /**
   * Ask the three demand questions after the email is captured (AGENTS.md §5c). Step 2 is
   * fully skippable and never gates the signup — the person is already on the list.
   */
  askDemand?: boolean
}

export function EmailSignup({
  listType = 'newsletter',
  source,
  placeholder = 'you@company.com',
  buttonText = 'Subscribe',
  className,
  redirectTo,
  showName = false,
  compact = false,
  intent,
  intentLabel,
  askDemand = false,
}: EmailSignupProps) {
  const router = useRouter()
  const hpId = useId()
  const emailId = useId()
  const nameId = useId()
  const statusId = useId()
  const painId = useId()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  // Honeypot — a hidden field real users never see. Bots that auto-fill inputs
  // trip it, and the API silently discards those submissions.
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [priceBand, setPriceBand] = useState<PriceBand | ''>('')
  const [role, setRole] = useState('')
  const [pain, setPain] = useState('')
  const [demandStatus, setDemandStatus] = useState<'idle' | 'loading' | 'done' | 'skipped'>('idle')
  const normalizedPlaceholder = `${placeholder.replace(/[.…]+$/, '')}…`

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
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: showName ? name : undefined,
          listType,
          source,
          intent,
          website,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setStatus('success')
      trackEvent('signal_loop_submit_success', {
        list_type: listType,
        surface: source || 'unspecified',
      })

      // Redirect after success with stream context
      if (redirectTo) {
        const separator = redirectTo.includes('?') ? '&' : '?'
        const url = `${redirectTo}${separator}stream=${listType}`
        setTimeout(() => {
          router.push(url)
        }, 1500)
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
      trackEvent('signal_loop_submit_error', {
        list_type: listType,
        surface: source || 'unspecified',
      })
    }
  }

  // Step 2. Sent to /api/demand rather than /api/subscribe because the subscribe route
  // short-circuits on an existing contact and would drop the answers. A failure is
  // deliberately silent: the signup already succeeded and nothing here is worth undoing it.
  const submitDemand = async (e: FormEvent) => {
    e.preventDefault()
    if (!priceBand && !role && !pain.trim()) {
      setDemandStatus('skipped')
      return
    }
    setDemandStatus('loading')
    try {
      await fetch('/api/demand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, intent, priceBand, role, pain: pain.trim() }),
      })
      trackEvent('demand_signal_captured', {
        list_type: listType,
        intent: intent || 'unspecified',
        price_band: priceBand || 'skipped',
      })
    } catch {
      /* Already on the list. The answers are a bonus, never a blocker. */
    }
    setDemandStatus('done')
  }

  const demandStep = (
    <form onSubmit={submitDemand} className="mt-6 space-y-5 border-t border-white/10 pt-6">
      <div>
        <p className="text-sm font-medium text-slate-200">
          Three optional questions{intentLabel ? ` about ${intentLabel}` : ''}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Skip any of them. Your answers decide what gets built first and what it costs.
        </p>
      </div>

      <fieldset>
        <legend className="text-sm text-slate-300">{PRICE_PROMPT}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRICE_BANDS.map((band) => (
            <button
              key={band.value}
              type="button"
              aria-pressed={priceBand === band.value}
              onClick={() => setPriceBand(priceBand === band.value ? '' : band.value)}
              className={cn(
                'min-h-11 rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400',
                priceBand === band.value
                  ? 'border-purple-400 bg-purple-500/20 text-white'
                  : 'border-slate-700 text-slate-300 hover:border-slate-500',
              )}
            >
              {band.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm text-slate-300">{ROLE_PROMPT}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {rolesFor(intent).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={role === option}
              onClick={() => setRole(role === option ? '' : option)}
              className={cn(
                'min-h-11 rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400',
                role === option
                  ? 'border-purple-400 bg-purple-500/20 text-white'
                  : 'border-slate-700 text-slate-300 hover:border-slate-500',
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor={painId} className="block text-sm text-slate-300">
          {PAIN_PROMPT}
        </label>
        <textarea
          id={painId}
          rows={2}
          maxLength={MAX_PAIN_LENGTH}
          value={pain}
          onChange={(e) => setPain(e.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="One line is enough…"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={demandStatus === 'loading'}
          className="min-h-11 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:from-blue-500 hover:to-purple-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 disabled:opacity-50"
        >
          {demandStatus === 'loading' ? 'Saving…' : 'Send my answers'}
        </button>
        <button
          type="button"
          onClick={() => setDemandStatus('skipped')}
          className="min-h-11 rounded-xl px-6 py-3 text-sm font-medium text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        >
          Skip
        </button>
      </div>
    </form>
  )

  const honeypotField = (
    <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden">
      <input
        id={hpId}
        aria-hidden="true"
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
    </div>
  )

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className={cn('relative', className)}>
        {honeypotField}
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor={emailId} className="sr-only">
            Email address
          </label>
          <input
            id={emailId}
            type="email"
            name="email"
            autoComplete="email"
            spellCheck={false}
            required
            aria-describedby={statusId}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={normalizedPlaceholder}
            disabled={status === 'loading' || status === 'success'}
            className="w-full min-w-0 flex-1 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="min-h-11 w-full rounded-full bg-emerald-400 px-6 py-2 font-semibold text-[#07120d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {status === 'loading'
              ? 'Subscribing…'
              : status === 'success'
                ? 'Subscribed'
                : buttonText}
          </button>
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-400">
          Occasional FrankX field notes. Unsubscribe anytime.{' '}
          <Link
            href="/privacy"
            className="underline decoration-slate-600 underline-offset-2 hover:text-white"
          >
            Privacy details
          </Link>
          .
        </p>

        {status === 'error' && errorMessage && (
          <div
            id={statusId}
            role="alert"
            aria-live="assertive"
            className="mt-2 text-sm text-red-400"
          >
            {errorMessage}
          </div>
        )}
        {status === 'success' && (
          <div
            id={statusId}
            role="status"
            aria-live="polite"
            className="mt-2 text-sm text-emerald-400"
          >
            You are subscribed.
          </div>
        )}
      </form>
    )
  }

  return (
    <div className={cn('w-full max-w-md', className)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {honeypotField}
        {showName && (
          <div>
            <label htmlFor={nameId} className="block text-sm font-medium text-slate-300 mb-2">
              First Name (optional)
            </label>
            <input
              type="text"
              id={nameId}
              name="name"
              autoComplete="given-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your first name…"
              disabled={status === 'loading' || status === 'success'}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder:text-slate-400 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
            />
          </div>
        )}

        <div>
          <label htmlFor={emailId} className="block text-sm font-medium text-slate-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id={emailId}
            name="email"
            autoComplete="email"
            spellCheck={false}
            aria-describedby={statusId}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={normalizedPlaceholder}
            disabled={status === 'loading' || status === 'success'}
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder:text-slate-400 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className={cn(
            'w-full rounded-xl px-6 py-3 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50',
            status === 'success'
              ? 'bg-emerald-600 text-white'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500',
          )}
        >
          {status === 'loading' && 'Subscribing…'}
          {status === 'success' && 'Subscribed'}
          {status === 'idle' && buttonText}
          {status === 'error' && 'Try Again'}
        </button>

        {status === 'error' && errorMessage && (
          <div
            id={statusId}
            role="alert"
            aria-live="assertive"
            className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
          >
            {errorMessage}
          </div>
        )}
        {status === 'success' && (
          <div
            id={statusId}
            role="status"
            aria-live="polite"
            className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-400"
          >
            You are subscribed.
            {redirectTo && <span className="mt-1 block">Redirecting…</span>}
          </div>
        )}
      </form>

      {askDemand && status === 'success' && demandStatus === 'idle' && demandStep}
      {askDemand && status === 'success' && demandStatus === 'done' && (
        <p role="status" aria-live="polite" className="mt-6 text-sm text-emerald-400">
          Recorded. That is what decides build order.
        </p>
      )}
      {askDemand && status === 'success' && demandStatus === 'skipped' && (
        <p role="status" aria-live="polite" className="mt-6 text-sm text-slate-400">
          Skipped. You are on the list either way.
        </p>
      )}

      <p className="mt-4 text-xs text-slate-500 text-center">
        Occasional FrankX field notes. Unsubscribe anytime.{' '}
        <Link
          href="/privacy"
          className="underline decoration-slate-600 underline-offset-2 hover:text-slate-300"
        >
          Privacy details
        </Link>
        .
      </p>
    </div>
  )
}
