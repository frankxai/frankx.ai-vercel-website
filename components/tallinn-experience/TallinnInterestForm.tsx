'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react'

import {
  TALLINN_AMPLIFIER_OUTCOMES,
  TALLINN_AMPLIFIER_ROLES,
  type TallinnAmplifierOutcome,
  type TallinnAmplifierRole,
} from '@/data/tallinn-studio'
import { trackEvent } from '@/lib/analytics'

interface TallinnInterestFormProps {
  defaultRole?: TallinnAmplifierRole
  defaultOutcome?: TallinnAmplifierOutcome
}

export function TallinnInterestForm({
  defaultRole = 'speaker',
  defaultOutcome = 'participant-artifact',
}: TallinnInterestFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)
  const [ackSent, setAckSent] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setMessage(null)

    const form = event.currentTarget
    const data = new FormData(form)
    const role = String(data.get('role') || defaultRole) as TallinnAmplifierRole
    const outcome = String(data.get('outcome') || defaultOutcome) as TallinnAmplifierOutcome
    const roleLabel = TALLINN_AMPLIFIER_ROLES.find((item) => item.id === role)?.label ?? role
    const outcomeLabel =
      TALLINN_AMPLIFIER_OUTCOMES.find((item) => item.id === outcome)?.label ?? outcome
    const context = String(data.get('context') || '').trim()

    const payload = {
      intent: 'workshop',
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      company: String(data.get('company') || ''),
      source: window.location.pathname,
      message: [
        'Tallinn Tribe Studio interest',
        `Role: ${roleLabel}`,
        `Desired outcome: ${outcomeLabel}`,
        `Context: ${context || '(not provided)'}`,
      ].join('\n'),
      website: String(data.get('website') || ''),
      consent: data.get('consent') === 'on',
    }

    trackEvent('tallinn_studio_interest_attempted', {
      role,
      outcome,
    })

    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await response.json().catch(() => ({}))

      if (!response.ok || !json.ok) {
        throw new Error(json.error || 'Something went wrong. Please try again.')
      }

      trackEvent('tallinn_studio_interest_succeeded', { role, outcome })
      setAckSent(Boolean(json.ackSent))
      setStatus('done')
      form.reset()
    } catch (error) {
      trackEvent('tallinn_studio_interest_failed', { role, outcome })
      setStatus('error')
      setMessage(
        error instanceof Error
          ? error.message
          : 'We could not send this right now. Please email frank@frankx.ai.',
      )
    }
  }

  if (status === 'done') {
    return (
      <div role="status" aria-live="polite" className="py-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-300" aria-hidden="true" />
        <h3 className="mt-5 font-display text-3xl font-semibold tracking-[-0.025em] text-white">
          Your signal reached Frank.
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-300">
          {ackSent
            ? 'A confirmation is in your inbox. A real reply follows within 1–2 working days.'
            : 'A real reply follows within 1–2 working days.'}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-semibold text-cyan-300 underline decoration-cyan-300/30 underline-offset-4 hover:decoration-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          Share another idea
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="tallinn-role" className="block text-sm font-semibold text-white">
            I am here as a…
          </label>
          <select
            id="tallinn-role"
            name="role"
            defaultValue={defaultRole}
            className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-[#0a0d12] px-4 text-sm text-white focus:border-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-300/60"
          >
            {TALLINN_AMPLIFIER_ROLES.map((role) => (
              <option key={role.id} value={role.id}>
                {role.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tallinn-outcome" className="block text-sm font-semibold text-white">
            I want to create…
          </label>
          <select
            id="tallinn-outcome"
            name="outcome"
            defaultValue={defaultOutcome}
            className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-[#0a0d12] px-4 text-sm text-white focus:border-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-300/60"
          >
            {TALLINN_AMPLIFIER_OUTCOMES.map((outcome) => (
              <option key={outcome.id} value={outcome.id}>
                {outcome.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="tallinn-name" className="block text-sm font-semibold text-white">
            Name
          </label>
          <input
            id="tallinn-name"
            name="name"
            required
            maxLength={200}
            autoComplete="name"
            placeholder="Your name"
            className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 text-sm text-white placeholder:text-slate-600 focus:border-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-300/60"
          />
        </div>
        <div>
          <label htmlFor="tallinn-email" className="block text-sm font-semibold text-white">
            Email
          </label>
          <input
            id="tallinn-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="you@example.com"
            className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 text-sm text-white placeholder:text-slate-600 focus:border-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-300/60"
          />
        </div>
      </div>

      <div>
        <label htmlFor="tallinn-company" className="block text-sm font-semibold text-white">
          Tribe, project, or venue <span className="font-normal text-slate-500">(optional)</span>
        </label>
        <input
          id="tallinn-company"
          name="company"
          maxLength={200}
          autoComplete="organization"
          placeholder="Who or what is behind the room?"
          className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 text-sm text-white placeholder:text-slate-600 focus:border-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-300/60"
        />
      </div>

      <div>
        <label htmlFor="tallinn-context" className="block text-sm font-semibold text-white">
          What should Frank understand? <span className="font-normal text-slate-500">(optional)</span>
        </label>
        <textarea
          id="tallinn-context"
          name="context"
          maxLength={2400}
          rows={5}
          placeholder="Your audience, existing session, venue, idea, constraints, or the result you want people to leave with."
          className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm leading-6 text-white placeholder:text-slate-600 focus:border-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-300/60"
        />
        <p className="mt-2 text-xs leading-5 text-slate-500">
          Do not include private participant, health, employment, or therapy information.
        </p>
      </div>

      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="tallinn-website">Website</label>
        <input id="tallinn-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-300">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent text-cyan-400 focus:ring-cyan-300/60"
        />
        <span>
          I agree that FrankX may store these details only to respond to this interest. No newsletter or unrelated marketing without a separate opt-in. See the{' '}
          <a
            href="/privacy"
            className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
          >
            Privacy Notice
          </a>
          .
        </span>
      </label>

      {status === 'error' && message ? (
        <div role="alert" className="rounded-xl border border-rose-300/25 bg-rose-300/[0.06] px-4 py-3 text-sm leading-6 text-rose-100">
          <p>{message}</p>
          <a
            href="mailto:frank@frankx.ai?subject=Tallinn%20Tribe%20Studio"
            className="mt-2 inline-flex items-center gap-2 font-semibold text-white underline decoration-white/30 underline-offset-4"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Email Frank instead
          </a>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]"
        >
          {status === 'submitting' ? (
            'Sending…'
          ) : (
            <>
              Register interest
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
        <p className="text-xs leading-5 text-slate-500">
          Interest only. No ticket, payment, or venue promise.
        </p>
      </div>
    </form>
  )
}
