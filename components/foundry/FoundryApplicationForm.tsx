'use client'

import { useState, FormEvent } from 'react'

const STAGES = [
  { value: 'idea', label: 'Idea — validating' },
  { value: 'pre-launch', label: 'Pre-launch — building' },
  { value: 'revenue', label: 'Revenue — selling' },
  { value: 'scaling', label: 'Scaling — growing' },
] as const

const inputClass =
  'w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-transparent disabled:opacity-50 transition-all'

export function FoundryApplicationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    link: '',
    building: '',
    why: '',
    stage: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
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
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
        <p className="text-lg font-semibold text-white">Application received.</p>
        <p className="mt-2 text-sm text-white/60">
          Frank reads every one personally — you&apos;ll hear back within a few days, and a
          confirmation is on its way to your inbox. No drip campaign follows.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="foundry-name" className="mb-2 block text-sm font-medium text-white/70">
            Name
          </label>
          <input
            id="foundry-name"
            type="text"
            required
            value={form.name}
            onChange={set('name')}
            disabled={status === 'loading'}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="foundry-email" className="mb-2 block text-sm font-medium text-white/70">
            Email
          </label>
          <input
            id="foundry-email"
            type="email"
            required
            value={form.email}
            onChange={set('email')}
            disabled={status === 'loading'}
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor="foundry-company" className="mb-2 block text-sm font-medium text-white/70">
            Business / brand
          </label>
          <input
            id="foundry-company"
            type="text"
            required
            value={form.company}
            onChange={set('company')}
            disabled={status === 'loading'}
            className={inputClass}
            placeholder="Company or working name"
          />
        </div>
        <div>
          <label htmlFor="foundry-link" className="mb-2 block text-sm font-medium text-white/70">
            Link <span className="text-white/40">(optional)</span>
          </label>
          <input
            id="foundry-link"
            type="url"
            value={form.link}
            onChange={set('link')}
            disabled={status === 'loading'}
            className={inputClass}
            placeholder="https://"
          />
        </div>
      </div>

      <div>
        <label htmlFor="foundry-building" className="mb-2 block text-sm font-medium text-white/70">
          What are you building?
        </label>
        <textarea
          id="foundry-building"
          required
          rows={3}
          value={form.building}
          onChange={set('building')}
          disabled={status === 'loading'}
          className={inputClass}
          placeholder="The product, the customer, the honest one-paragraph version."
        />
      </div>

      <div>
        <label htmlFor="foundry-why" className="mb-2 block text-sm font-medium text-white/70">
          Why does it matter?
        </label>
        <textarea
          id="foundry-why"
          required
          rows={3}
          value={form.why}
          onChange={set('why')}
          disabled={status === 'loading'}
          className={inputClass}
          placeholder="Sustainable, healthcare, and meaningful businesses get priority — tell us where yours stands."
        />
      </div>

      <div>
        <label htmlFor="foundry-stage" className="mb-2 block text-sm font-medium text-white/70">
          Stage
        </label>
        <select
          id="foundry-stage"
          required
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

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-10"
      >
        {status === 'loading' ? 'Submitting…' : 'Submit Application'}
      </button>

      {status === 'error' && errorMessage && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
          {errorMessage}
        </p>
      )}

      <p className="text-xs text-white/40">
        Applications are read personally. You get one confirmation email and a decision — nothing
        else lands in your inbox.
      </p>
    </form>
  )
}
