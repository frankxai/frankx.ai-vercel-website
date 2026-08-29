'use client'

import { type ChangeEvent, FormEvent, useRef, useState } from 'react'

import { trackEvent } from '@/lib/analytics'

const founderContexts = [
  { value: 'founder', label: 'Founder / co-founder' },
  { value: 'solopreneur', label: 'Solopreneur' },
  { value: 'coach', label: 'Coach or expert-led founder' },
  { value: 'executive', label: 'C-level operator' },
  { value: 'advisor', label: 'Investor or family-office advisor' },
  { value: 'other', label: 'Another decision-making role' },
] as const

const timingOptions = [
  { value: 'next-quarter', label: 'The next available quarter' },
  { value: 'later', label: 'A later quarter' },
  { value: 'exploring', label: 'I am exploring fit' },
] as const

const relationshipOptions = [
  { value: 'none', label: 'No Oracle relationship' },
  { value: 'customer', label: 'Oracle customer' },
  { value: 'partner', label: 'Oracle partner or supplier' },
  { value: 'employee', label: 'Oracle employee or contractor' },
  { value: 'other', label: 'Another relationship to disclose' },
] as const

const inputClass =
  'w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/35 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-rose-400/65 disabled:opacity-50'

const initialForm = {
  name: '',
  email: '',
  company: '',
  link: '',
  founderContext: '',
  decision: '',
  tried: '',
  firstCall: '',
  oracleRelationship: '',
  timing: '',
  consent: false,
  website: '',
}

export function FoundersCircleApplicationForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [ackSent, setAckSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const hasStarted = useRef(false)

  const set =
    (key: Exclude<keyof typeof form, 'consent'>) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((current) => ({ ...current, [key]: event.target.value }))

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/founders-circle/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok)
        throw new Error(data.error || 'The application could not be submitted.')
      setAckSent(data.ackSent === true)
      setStatus('success')
      setForm(initialForm)
      trackEvent('founders_circle_apply_success', {
        surface: 'founders_circle_application',
      })
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'The application could not be submitted.',
      )
      trackEvent('founders_circle_apply_error', {
        surface: 'founders_circle_application',
      })
    }
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.055] p-8"
        role="status"
        aria-live="polite"
      >
        <p className="text-lg font-semibold text-white">
          Application received.
        </p>
        <p className="mt-3 text-sm leading-6 text-white/65">
          {ackSent
            ? 'A confirmation is on its way. Frank reviews applications personally and will reply by email after the fit and conflict check.'
            : 'The application reached Frank, but no confirmation email was sent. Frank reviews applications personally and will reply after the fit and conflict check.'}
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={() => {
        if (hasStarted.current) return
        hasStarted.current = true
        trackEvent('founders_circle_apply_start', {
          surface: 'founders_circle_application',
        })
      }}
      className="space-y-6"
      aria-busy={status === 'loading'}
      noValidate={false}
    >
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="circle-website">Website</label>
        <input
          id="circle-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={set('website')}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="circle-name"
            className="mb-2 block text-sm font-medium text-white/72"
          >
            Name
          </label>
          <input
            id="circle-name"
            name="name"
            required
            autoComplete="name"
            value={form.name}
            onChange={set('name')}
            maxLength={200}
            disabled={status === 'loading'}
            className={inputClass}
            placeholder="Your name…"
          />
        </div>
        <div>
          <label
            htmlFor="circle-email"
            className="mb-2 block text-sm font-medium text-white/72"
          >
            Email
          </label>
          <input
            id="circle-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            spellCheck={false}
            value={form.email}
            onChange={set('email')}
            maxLength={200}
            disabled={status === 'loading'}
            className={inputClass}
            placeholder="you@company.com…"
          />
        </div>
        <div>
          <label
            htmlFor="circle-company"
            className="mb-2 block text-sm font-medium text-white/72"
          >
            Company or working name
          </label>
          <input
            id="circle-company"
            name="company"
            required
            autoComplete="organization"
            value={form.company}
            onChange={set('company')}
            maxLength={200}
            disabled={status === 'loading'}
            className={inputClass}
            placeholder="Company or working name…"
          />
        </div>
        <div>
          <label
            htmlFor="circle-link"
            className="mb-2 block text-sm font-medium text-white/72"
          >
            Link <span className="text-white/45">(optional)</span>
          </label>
          <input
            id="circle-link"
            name="link"
            type="url"
            autoComplete="url"
            spellCheck={false}
            value={form.link}
            onChange={set('link')}
            maxLength={500}
            disabled={status === 'loading'}
            className={inputClass}
            placeholder="https://company.com…"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="circle-context"
          className="mb-2 block text-sm font-medium text-white/72"
        >
          Founder context
        </label>
        <select
          id="circle-context"
          name="founderContext"
          autoComplete="off"
          required
          value={form.founderContext}
          onChange={set('founderContext')}
          disabled={status === 'loading'}
          className={inputClass}
        >
          <option value="" disabled>
            Select the closest context
          </option>
          {founderContexts.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-[#111113]"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="circle-decision"
          className="mb-2 block text-sm font-medium text-white/72"
        >
          What consequential decision are you facing?
        </label>
        <textarea
          id="circle-decision"
          name="decision"
          autoComplete="off"
          required
          rows={4}
          maxLength={1200}
          aria-describedby="circle-decision-limit"
          value={form.decision}
          onChange={set('decision')}
          disabled={status === 'loading'}
          className={inputClass}
          placeholder="Name the decision, what makes it difficult, and what is at stake…"
        />
        <p id="circle-decision-limit" className="mt-2 text-xs text-white/45">
          Up to 1,200 characters.
        </p>
      </div>

      <div>
        <label
          htmlFor="circle-tried"
          className="mb-2 block text-sm font-medium text-white/72"
        >
          What have you already tried or ruled out?
        </label>
        <textarea
          id="circle-tried"
          name="tried"
          autoComplete="off"
          required
          rows={3}
          maxLength={900}
          aria-describedby="circle-tried-limit"
          value={form.tried}
          onChange={set('tried')}
          disabled={status === 'loading'}
          className={inputClass}
          placeholder="Include the paths you do not want to repeat…"
        />
        <p id="circle-tried-limit" className="mt-2 text-xs text-white/45">
          Up to 900 characters.
        </p>
      </div>

      <div>
        <label
          htmlFor="circle-first-call"
          className="mb-2 block text-sm font-medium text-white/72"
        >
          What would make the first working session valuable?
        </label>
        <textarea
          id="circle-first-call"
          name="firstCall"
          autoComplete="off"
          required
          rows={3}
          maxLength={900}
          aria-describedby="circle-first-call-limit"
          value={form.firstCall}
          onChange={set('firstCall')}
          disabled={status === 'loading'}
          className={inputClass}
          placeholder="A decision, architecture, challenge, or concrete output…"
        />
        <p id="circle-first-call-limit" className="mt-2 text-xs text-white/45">
          Up to 900 characters.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="circle-oracle"
            className="mb-2 block text-sm font-medium text-white/72"
          >
            Oracle relationship
          </label>
          <select
            id="circle-oracle"
            name="oracleRelationship"
            autoComplete="off"
            required
            value={form.oracleRelationship}
            onChange={set('oracleRelationship')}
            disabled={status === 'loading'}
            className={inputClass}
          >
            <option value="" disabled>
              Select one
            </option>
            {relationshipOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-[#111113]"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="circle-timing"
            className="mb-2 block text-sm font-medium text-white/72"
          >
            Timing
          </label>
          <select
            id="circle-timing"
            name="timing"
            autoComplete="off"
            required
            value={form.timing}
            onChange={set('timing')}
            disabled={status === 'loading'}
            className={inputClass}
          >
            <option value="" disabled>
              Select one
            </option>
            {timingOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-[#111113]"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm leading-6 text-white/65">
        <input
          type="checkbox"
          name="consent"
          required
          checked={form.consent}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              consent: event.target.checked,
            }))
          }
          disabled={status === 'loading'}
          className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent text-rose-300 focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 focus:ring-offset-[#0d1111]"
        />
        <span>
          I consent to FrankX processing these answers to review and respond to
          my application.
        </span>
      </label>

      <div aria-live="polite">
        {status === 'error' && errorMessage && (
          <p className="rounded-xl border border-red-400/20 bg-red-400/[0.07] p-4 text-sm text-red-200">
            {errorMessage}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-rose-300 px-7 py-3 text-sm font-semibold text-[#1d0a11] transition-colors hover:bg-rose-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {status === 'loading' ? 'Submitting…' : 'Submit application'}
      </button>

      <p className="text-xs leading-5 text-white/50">
        Do not include trade secrets, health information, or other sensitive
        material. Submission starts a fit and conflict review; it does not
        create an advisory relationship or confidentiality agreement.
      </p>
    </form>
  )
}
