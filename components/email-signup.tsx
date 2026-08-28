'use client'

import { useState, useId, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'
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
}: EmailSignupProps) {
  const router = useRouter()
  const hpId = useId()
  const emailId = useId()
  const nameId = useId()
  const statusId = useId()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  // Honeypot — a hidden field real users never see. Bots that auto-fill inputs
  // trip it, and the API silently discards those submissions.
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
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
