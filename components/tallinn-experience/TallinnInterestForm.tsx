'use client'

import { useRef, useState } from 'react'
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react'

import {
  TALLINN_TIME_WINDOWS,
  TALLINN_VALIDATION_GATE,
} from '@/data/tallinn-experiences'
import {
  TALLINN_ATTENDANCE_INTENTS,
  TALLINN_ROLE_LENSES,
} from '@/lib/tallinn-interest/options'
import { trackEvent } from '@/lib/analytics'

interface FormExperience {
  slug: string
  title: string
}

interface TallinnInterestFormProps {
  experiences: readonly FormExperience[]
  defaultExperienceSlug: string
  lockExperience?: boolean
  captureEnabled: boolean
}

const roleLabel: Record<(typeof TALLINN_ROLE_LENSES)[number], string> = {
  creator: 'Creator',
  'solo-founder': 'Solo founder',
  'team-leader': 'Team leader',
  'people-ops': 'People / HR',
  other: 'Other',
}

const intentLabel: Record<(typeof TALLINN_ATTENDANCE_INTENTS)[number], string> = {
  exploring: 'Interested, still deciding',
  likely: 'Likely if the session fits',
  'ready-if-time-works': 'Ready if a listed time works',
}

const VARIANT_ID_RE = /^[a-z0-9-]{1,60}$/

function safeVariant() {
  const params = new URLSearchParams(window.location.search)
  const candidate = params.get('variant') || params.get('ref') || 'default'
  return VARIANT_ID_RE.test(candidate) ? candidate : 'default'
}

function createSubmissionId() {
  const cryptoApi = typeof window !== 'undefined' ? window.crypto : undefined
  if (typeof cryptoApi?.randomUUID === 'function') return cryptoApi.randomUUID()

  const bytes = new Uint8Array(16)
  if (typeof cryptoApi?.getRandomValues === 'function') {
    cryptoApi.getRandomValues(bytes)
  } else {
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Math.floor(Math.random() * 256)
    }
  }

  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0'))
  return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10).join('')}`
}

export function TallinnInterestForm({
  experiences,
  defaultExperienceSlug,
  lockExperience = false,
  captureEnabled,
}: TallinnInterestFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)
  const submissionId = useRef<string | null>(null)

  if (!captureEnabled) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.06] p-6 text-amber-50 sm:p-7"
      >
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden="true" />
          <div>
            <h3 className="text-lg font-semibold text-white">Interest collection is not open yet.</h3>
            <p className="mt-3 text-sm leading-6 text-amber-50/90">
              The concept is under review. No form is active, and nothing on this page will be stored or sent. To comment, reply directly to the person who shared this link.
            </p>
            <p className="mt-3 text-xs leading-5 text-amber-100/65">
              No personal data will be stored and no email will be sent from this page.
            </p>
          </div>
        </div>
      </div>
    )
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setMessage(null)

    const form = event.currentTarget
    const data = new FormData(form)
    submissionId.current ||= createSubmissionId()

    const payload = {
      fullName: String(data.get('fullName') || ''),
      email: String(data.get('email') || ''),
      experienceSlug: String(data.get('experienceSlug') || defaultExperienceSlug),
      variantId: safeVariant(),
      roleLens: String(data.get('roleLens') || ''),
      attendanceIntent: String(data.get('attendanceIntent') || ''),
      slotIds: data.getAll('slotIds').map(String),
      companyOrProject: String(data.get('companyOrProject') || ''),
      note: String(data.get('note') || ''),
      aftercareConsent: data.get('aftercareConsent') === 'on',
      consentToContact: data.get('consentToContact') === 'on',
      submissionId: submissionId.current,
      website: String(data.get('website') || ''),
    }

    if (payload.slotIds.length === 0) {
      setStatus('error')
      setMessage('Choose at least one possible time.')
      return
    }

    trackEvent('tallinn_interest_submit_attempted', {
      experience_slug: payload.experienceSlug,
      variant_id: payload.variantId,
      role_lens: payload.roleLens,
      attendance_intent: payload.attendanceIntent,
      slot_count: payload.slotIds.length,
      capture_mode: captureEnabled ? 'live' : 'review',
    })

    try {
      const response = await fetch('/api/tallinn-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await response.json().catch(() => ({}))
      if (response.ok && json.ok) {
        trackEvent('tallinn_interest_submit_succeeded', {
          experience_slug: payload.experienceSlug,
          variant_id: payload.variantId,
          capture_mode: json.reviewMode ? 'review' : 'live',
          duplicate: Boolean(json.duplicate),
        })
        setStatus('done')
        setMessage(json.message || 'Thank you — we received your interest.')
        form.reset()
        submissionId.current = null
      } else {
        trackEvent('tallinn_interest_submit_failed', {
          experience_slug: payload.experienceSlug,
          variant_id: payload.variantId,
          stage: 'provider_response',
          status_code: response.status,
        })
        setStatus('error')
        setMessage(json.error || 'Something went wrong. Please try again.')
      }
    } catch {
      trackEvent('tallinn_interest_submit_failed', {
        experience_slug: payload.experienceSlug,
        variant_id: payload.variantId,
        stage: 'network',
      })
      setStatus('error')
      setMessage('We could not send this right now. Please try again or email frank@frankx.ai.')
    }
  }

  if (status === 'done') {
    return (
      <div role="status" aria-live="polite" className="py-4 text-center">
        <CheckCircle2 className="mx-auto h-9 w-9 text-emerald-300" aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl font-semibold text-white">
          Thank you — we received your interest.
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-300">{message}</p>
        <p className="mx-auto mt-3 max-w-lg text-xs leading-5 text-slate-500">
          We will contact you only if at least {TALLINN_VALIDATION_GATE.minimumConfirmed} people confirm the same time. This is still not a booking.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {lockExperience ? (
        <input type="hidden" name="experienceSlug" value={defaultExperienceSlug} />
      ) : (
        <div>
          <label htmlFor="experienceSlug" className="block text-sm font-semibold text-white">
            Session you are interested in
          </label>
          <select
            id="experienceSlug"
            name="experienceSlug"
            defaultValue={defaultExperienceSlug}
            className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-[#0a0d12] px-4 text-sm text-white focus:border-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-300/60"
          >
            {experiences.map((experience) => (
              <option key={experience.slug} value={experience.slug}>
                {experience.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-white">Name</label>
          <input
            id="fullName"
            name="fullName"
            required
            maxLength={200}
            autoComplete="name"
            className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 text-sm text-white placeholder:text-slate-600 focus:border-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-300/60"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-white">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 text-sm text-white placeholder:text-slate-600 focus:border-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-300/60"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="roleLens" className="block text-sm font-semibold text-white">Your role</label>
          <select
            id="roleLens"
            name="roleLens"
            required
            defaultValue=""
            className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-[#0a0d12] px-4 text-sm text-white focus:border-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-300/60"
          >
            <option value="" disabled>Choose one</option>
            {TALLINN_ROLE_LENSES.map((role) => (
              <option key={role} value={role}>{roleLabel[role]}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="companyOrProject" className="block text-sm font-semibold text-white">
            Company or project <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <input
            id="companyOrProject"
            name="companyOrProject"
            maxLength={200}
            autoComplete="organization"
            className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 text-sm text-white placeholder:text-slate-600 focus:border-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-300/60"
            placeholder="What you are building"
          />
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-white">How likely are you to attend?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {TALLINN_ATTENDANCE_INTENTS.map((intent) => (
            <label key={intent} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-slate-300 has-[:checked]:border-emerald-300/55 has-[:checked]:bg-emerald-300/[0.08] has-[:checked]:text-white">
              <input
                type="radio"
                name="attendanceIntent"
                value={intent}
                required
                className="h-4 w-4 border-white/30 bg-transparent text-emerald-400 focus:ring-emerald-300/60"
              />
              {intentLabel[intent]}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-white">Which times could work?</legend>
        <p className="mt-1 text-xs leading-5 text-slate-500">Choose every provisional time that could work. The official Mindvalley University agenda takes priority.</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {TALLINN_TIME_WINDOWS.map((slot) => (
            <label key={slot.id} className="flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm leading-6 text-slate-300 has-[:checked]:border-cyan-300/55 has-[:checked]:bg-cyan-300/[0.08] has-[:checked]:text-white">
              <input
                type="checkbox"
                name="slotIds"
                value={slot.id}
                className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent text-cyan-400 focus:ring-cyan-300/60"
              />
              {slot.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="note" className="block text-sm font-semibold text-white">
          What do you want to leave with? <span className="font-normal text-slate-500">(optional)</span>
        </label>
        <textarea
          id="note"
          name="note"
          maxLength={800}
          rows={4}
          aria-describedby="note-guidance"
          className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-300/60"
          placeholder="One useful outcome is enough. Please do not include health or therapy details."
        />
        <p id="note-guidance" className="mt-2 text-xs leading-5 text-slate-500">
          Please do not include health information or private candidate, employee, client, or therapy details.
        </p>
      </div>

      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-3 border-t border-white/10 pt-5">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-300">
          <input
            name="consentToContact"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent text-cyan-400 focus:ring-cyan-300/60"
          />
          <span>
            I agree that FrankX may use and store the details I submit only to assess and coordinate this proposed Tallinn session and contact me about it. My details will not be added to a newsletter or used for unrelated marketing. I can request access or deletion at frank@frankx.ai. See the{' '}
            <a href="/privacy" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">Privacy Notice</a>.
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-400">
          <input
            name="aftercareConsent"
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent text-emerald-400 focus:ring-emerald-300/60"
          />
          <span>If the session runs, send me the completed materials and one session-related check-in seven days later.</span>
        </label>
      </div>

      {status === 'error' && message ? (
        <p role="alert" className="rounded-xl border border-rose-300/25 bg-rose-300/[0.06] px-4 py-3 text-sm leading-6 text-rose-100">
          {message}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Share my interest
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
        <p className="text-xs leading-5 text-slate-500">
          This only shares your interest. It is not a ticket, booking, or payment.
        </p>
      </div>
    </form>
  )
}
