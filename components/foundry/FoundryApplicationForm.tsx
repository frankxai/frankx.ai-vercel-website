'use client'

import { useRef, useState, FormEvent } from 'react'

import { trackEvent } from '@/lib/analytics'

const STAGES = [
  { value: 'idea', label: 'Idea — validating' },
  { value: 'pre-launch', label: 'Pre-launch — building' },
  { value: 'revenue', label: 'Revenue — selling' },
  { value: 'scaling', label: 'Scaling — growing' },
] as const

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/35 transition-colors focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 disabled:opacity-50'

export function FoundryApplicationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    link: '',
    building: '',
    why: '',
    stage: '',
    consent: false,
    website: '', // honeypot — hidden from humans, bots fill it
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const hasStarted = useRef(false)

  const set = (key: Exclude<keyof typeof form, 'consent'>) =>
    (e: { target: { value: string } }) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')
    try {
      const res = await fetch('/api/foundry/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setStatus('success')
      trackEvent('foundry_apply_success', { surface: 'foundry_application' })
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'The application could not be submitted. Review the fields and try again.',
      )
      trackEvent('foundry_apply_error', { surface: 'foundry_application' })
    }
  }

  if (status === 'success') {
    return (
      <div
        aria-live="polite"
        className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center"
      >
        <p className="text-lg font-semibold text-white">Application received.</p>
        <p className="mt-2 text-sm text-white/60">
          Frank reads every one personally and will reply after the fit review.
          This application does not subscribe you to marketing.
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
        trackEvent('foundry_apply_start', { surface: 'foundry_application' })
      }}
      className="space-y-5"
      aria-busy={status === 'loading'}
    >
      {/* Honeypot — visually hidden and excluded from the tab order */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="foundry-website">Website</label>
        <input
          id="foundry-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={set('website')}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="foundry-name" className="mb-2 block text-sm font-medium text-white/70">
            Name
          </label>
          <input
            id="foundry-name"
            name="name"
            type="text"
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
          <label htmlFor="foundry-email" className="mb-2 block text-sm font-medium text-white/70">
            Email
          </label>
          <input
            id="foundry-email"
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
          <label htmlFor="foundry-company" className="mb-2 block text-sm font-medium text-white/70">
            Business / brand
          </label>
          <input
            id="foundry-company"
            name="company"
            type="text"
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
          <label htmlFor="foundry-link" className="mb-2 block text-sm font-medium text-white/70">
            Link <span className="text-white/40">(optional)</span>
          </label>
          <input
            id="foundry-link"
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
        <label htmlFor="foundry-building" className="mb-2 block text-sm font-medium text-white/70">
          What are you building?
        </label>
        <textarea
          id="foundry-building"
          name="building"
          required
          autoComplete="off"
          rows={3}
          maxLength={1500}
          aria-describedby="foundry-building-limit"
          value={form.building}
          onChange={set('building')}
          disabled={status === 'loading'}
          className={inputClass}
          placeholder="The product, the customer, and the honest one-paragraph version…"
        />
        <p id="foundry-building-limit" className="mt-2 text-xs text-white/45">
          Up to 1,500 characters.
        </p>
      </div>

      <div>
        <label htmlFor="foundry-why" className="mb-2 block text-sm font-medium text-white/70">
          Why does it matter?
        </label>
        <textarea
          id="foundry-why"
          name="why"
          required
          autoComplete="off"
          rows={3}
          maxLength={1500}
          aria-describedby="foundry-why-limit"
          value={form.why}
          onChange={set('why')}
          disabled={status === 'loading'}
          className={inputClass}
          placeholder="Tell Frank why this work matters and who it should serve…"
        />
        <p id="foundry-why-limit" className="mt-2 text-xs text-white/45">
          Up to 1,500 characters.
        </p>
      </div>

      <div>
        <label htmlFor="foundry-stage" className="mb-2 block text-sm font-medium text-white/70">
          Stage
        </label>
        <select
          id="foundry-stage"
          name="stage"
          required
          autoComplete="off"
          value={form.stage}
          onChange={set('stage')}
          disabled={status === 'loading'}
          className={inputClass}
        >
          <option value="" disabled>
            Select a stage
          </option>
          {STAGES.map((s) => (
            <option key={s.value} value={s.value} className="bg-[#111113]">
              {s.label}
            </option>
          ))}
        </select>
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
          className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent text-emerald-400 focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-[#0d1111]"
        />
        <span>
          I consent to FrankX processing these answers to review and respond to my application.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-10"
      >
        {status === 'loading' ? 'Submitting…' : 'Submit Application'}
      </button>

      <div aria-live="polite">
        {status === 'error' && errorMessage && (
          <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
            {errorMessage}
          </p>
        )}
      </div>

      <p className="text-xs text-white/40">
        Applications are read personally. This form does not add you to a newsletter or marketing
        sequence.
      </p>
    </form>
  )
}
