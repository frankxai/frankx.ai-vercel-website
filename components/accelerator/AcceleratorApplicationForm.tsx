'use client'

import { useState, FormEvent } from 'react'

const ROUTES = [
  { value: 'program', label: 'Accelerator / venture studio / portfolio program' },
  { value: 'fund', label: 'Fund / angel syndicate / micro-VC' },
  { value: 'partner', label: 'White-label / regional partner' },
  { value: 'founder', label: 'Founder — I may need Foundry instead' },
] as const

const SIZES = [
  { value: '1-10', label: '1–10 companies / year' },
  { value: '11-30', label: '11–30 companies / year' },
  { value: '31-100', label: '31–100 companies / year' },
  { value: '100+', label: '100+ companies / year' },
  { value: 'pre', label: 'Pre-launch program' },
] as const

const inputClass =
  'w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/60 focus:border-transparent disabled:opacity-50 transition-all'

export function AcceleratorApplicationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    route: '',
    building: '',
    why: '',
    size: '',
    link: '',
    website: '', // honeypot
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
      const res = await fetch('/api/accelerator/apply', {
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
      <div
        aria-live="polite"
        className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-8 text-center"
      >
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
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="accelerator-website">Website</label>
        <input
          id="accelerator-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={set('website')}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="accelerator-name" className="mb-2 block text-sm font-medium text-white/70">
            Name
          </label>
          <input
            id="accelerator-name"
            required
            className={inputClass}
            value={form.name}
            onChange={set('name')}
            disabled={status === 'loading'}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="accelerator-email" className="mb-2 block text-sm font-medium text-white/70">
            Email
          </label>
          <input
            id="accelerator-email"
            type="email"
            required
            className={inputClass}
            value={form.email}
            onChange={set('email')}
            disabled={status === 'loading'}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="accelerator-organization"
            className="mb-2 block text-sm font-medium text-white/70"
          >
            Organization
          </label>
          <input
            id="accelerator-organization"
            required
            className={inputClass}
            value={form.organization}
            onChange={set('organization')}
            disabled={status === 'loading'}
          />
        </div>
        <div>
          <label htmlFor="accelerator-role" className="mb-2 block text-sm font-medium text-white/70">
            Your role
          </label>
          <input
            id="accelerator-role"
            required
            className={inputClass}
            placeholder="GP, program lead, studio partner…"
            value={form.role}
            onChange={set('role')}
            disabled={status === 'loading'}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="accelerator-route" className="mb-2 block text-sm font-medium text-white/70">
            Route
          </label>
          <select
            id="accelerator-route"
            required
            className={inputClass}
            value={form.route}
            onChange={set('route')}
            disabled={status === 'loading'}
          >
            <option value="">Select…</option>
            {ROUTES.map((r) => (
              <option key={r.value} value={r.value} className="bg-[#0a0a0b]">
                {r.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="accelerator-size" className="mb-2 block text-sm font-medium text-white/70">
            Program size
          </label>
          <select
            id="accelerator-size"
            required
            className={inputClass}
            value={form.size}
            onChange={set('size')}
            disabled={status === 'loading'}
          >
            <option value="">Select…</option>
            {SIZES.map((s) => (
              <option key={s.value} value={s.value} className="bg-[#0a0a0b]">
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="accelerator-link" className="mb-2 block text-sm font-medium text-white/70">
          Site or portfolio link (optional)
        </label>
        <input
          id="accelerator-link"
          type="url"
          className={inputClass}
          placeholder="https://"
          value={form.link}
          onChange={set('link')}
          disabled={status === 'loading'}
        />
      </div>

      <div>
        <label htmlFor="accelerator-building" className="mb-2 block text-sm font-medium text-white/70">
          What program do you run — or want to equip?
        </label>
        <textarea
          id="accelerator-building"
          required
          rows={4}
          className={inputClass}
          value={form.building}
          onChange={set('building')}
          disabled={status === 'loading'}
        />
      </div>

      <div>
        <label htmlFor="accelerator-why" className="mb-2 block text-sm font-medium text-white/70">
          Why now? What should a pilot improve in 90 days?
        </label>
        <textarea
          id="accelerator-why"
          required
          rows={4}
          className={inputClass}
          value={form.why}
          onChange={set('why')}
          disabled={status === 'loading'}
        />
      </div>

      {status === 'error' ? (
        <p className="text-sm text-rose-400" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-white/90 disabled:opacity-50 sm:w-auto"
      >
        {status === 'loading' ? 'Sending…' : 'Apply for a program pilot'}
      </button>
      <p className="text-xs text-white/40">
        Application-only. No guaranteed funding, returns, or automatic investment decisions.
        Software and operating systems only — humans approve capital and outreach.
      </p>
    </form>
  )
}
