'use client'

import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface IntakeFormProps {
  /**
   * Pre-selects the workshop dropdown. Must match one of the option values below
   * (or omit to default to the placeholder).
   */
  defaultWorkshop?: string
  /** Accent color for the submit button. Defaults to cyan. */
  accent?: 'cyan' | 'violet' | 'amber'
  /** Optional container className override. */
  className?: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

interface FormValues {
  fullName: string
  email: string
  linkedin: string
  company: string
  role: string
  workshop: string
  location: string
  format: 'in-person' | 'virtual' | 'hybrid' | ''
  notes: string
  consent: boolean
}

const EMPTY_VALUES: FormValues = {
  fullName: '',
  email: '',
  linkedin: '',
  company: '',
  role: '',
  workshop: '',
  location: '',
  format: '',
  notes: '',
  consent: false,
}

const WORKSHOP_OPTIONS: { value: string; label: string }[] = [
  { value: 'ikigai-content-studio', label: 'Ikigai + AI Content Studio (3–4h)' },
  { value: 'sovereign-leadership', label: 'Sovereign Leadership: Human-Centric AI (2h)' },
  { value: 'personal-ai-coe', label: 'Personal AI Center of Excellence (90m)' },
  { value: 'custom', label: 'Custom format — tell me what you need' },
]

const ACCENT_BUTTON: Record<NonNullable<IntakeFormProps['accent']>, string> = {
  cyan: 'from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400',
  violet: 'from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400',
  amber: 'from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400',
}

const ACCENT_RING: Record<NonNullable<IntakeFormProps['accent']>, string> = {
  cyan: 'focus:ring-cyan-500/40',
  violet: 'focus:ring-violet-500/40',
  amber: 'focus:ring-amber-500/40',
}

export function IntakeForm({
  defaultWorkshop,
  accent = 'cyan',
  className,
}: IntakeFormProps) {
  const [values, setValues] = useState<FormValues>({
    ...EMPTY_VALUES,
    workshop: defaultWorkshop ?? '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  function validate(v: FormValues): string | null {
    if (!v.fullName.trim()) return 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) return 'Please enter a valid email address.'
    if (!v.company.trim()) return 'Please enter your company or organization.'
    if (!v.role.trim()) return 'Please enter your role.'
    if (!v.workshop) return 'Please choose a workshop interest.'
    if (!v.location.trim()) return 'Please enter your location or timezone.'
    if (!v.format) return 'Please choose a preferred format.'
    if (!v.consent) return 'Please confirm you understand how your details will be used.'
    return null
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const err = validate(values)
    if (err) {
      setErrorMessage(err)
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/workshop-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(
          data?.error || data?.message || 'Submission failed. Please try again.',
        )
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      )
    }
  }

  const inputBase = cn(
    'w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-zinc-500',
    'bg-white/[0.04] border border-white/[0.08]',
    '[backdrop-filter:blur(12px)_saturate(160%)]',
    'focus:outline-none focus:ring-2 focus:border-transparent transition-all',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    ACCENT_RING[accent],
  )

  const labelBase = 'block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-1.5'

  const isDisabled = status === 'loading' || status === 'success'

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.04] p-8 sm:p-10 text-center',
          '[backdrop-filter:blur(20px)_saturate(160%)]',
          className,
        )}
      >
        <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Thanks — we got it.</h3>
        <p className="text-sm text-zinc-400 max-w-md mx-auto">
          Frank will be in touch within 48 hours with next steps, dates, and a short call invite
          if it is a fit on both sides.
        </p>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6 sm:p-8',
        '[backdrop-filter:blur(20px)_saturate(160%)]',
        '[box-shadow:0_8px_32px_-8px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]',
        className,
      )}
      noValidate
    >
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="sm:col-span-1">
          <label htmlFor="intake-fullName" className={labelBase}>
            Full name
          </label>
          <input
            id="intake-fullName"
            type="text"
            required
            autoComplete="name"
            disabled={isDisabled}
            value={values.fullName}
            onChange={(e) => update('fullName', e.target.value)}
            className={inputBase}
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="intake-email" className={labelBase}>
            Email
          </label>
          <input
            id="intake-email"
            type="email"
            required
            autoComplete="email"
            disabled={isDisabled}
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            className={inputBase}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="intake-linkedin" className={labelBase}>
            LinkedIn URL <span className="text-zinc-600 normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="intake-linkedin"
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://linkedin.com/in/..."
            disabled={isDisabled}
            value={values.linkedin}
            onChange={(e) => update('linkedin', e.target.value)}
            className={inputBase}
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="intake-company" className={labelBase}>
            Company / org
          </label>
          <input
            id="intake-company"
            type="text"
            required
            autoComplete="organization"
            disabled={isDisabled}
            value={values.company}
            onChange={(e) => update('company', e.target.value)}
            className={inputBase}
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="intake-role" className={labelBase}>
            Role
          </label>
          <input
            id="intake-role"
            type="text"
            required
            autoComplete="organization-title"
            disabled={isDisabled}
            value={values.role}
            onChange={(e) => update('role', e.target.value)}
            className={inputBase}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="intake-workshop" className={labelBase}>
            Workshop interest
          </label>
          <select
            id="intake-workshop"
            required
            disabled={isDisabled}
            value={values.workshop}
            onChange={(e) => update('workshop', e.target.value)}
            className={cn(inputBase, 'appearance-none bg-[#0d0d0f]')}
          >
            <option value="" disabled>
              Choose a format
            </option>
            {WORKSHOP_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#0d0d0f]">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="intake-location" className={labelBase}>
            Location / timezone
          </label>
          <input
            id="intake-location"
            type="text"
            required
            placeholder="e.g. Amsterdam (CET)"
            disabled={isDisabled}
            value={values.location}
            onChange={(e) => update('location', e.target.value)}
            className={inputBase}
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="intake-format" className={labelBase}>
            Preferred format
          </label>
          <select
            id="intake-format"
            required
            disabled={isDisabled}
            value={values.format}
            onChange={(e) => update('format', e.target.value as FormValues['format'])}
            className={cn(inputBase, 'appearance-none bg-[#0d0d0f]')}
          >
            <option value="" disabled>
              Choose one
            </option>
            <option value="in-person" className="bg-[#0d0d0f]">In-person</option>
            <option value="virtual" className="bg-[#0d0d0f]">Virtual</option>
            <option value="hybrid" className="bg-[#0d0d0f]">Hybrid</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="intake-notes" className={labelBase}>
            Notes <span className="text-zinc-600 normal-case tracking-normal">(optional)</span>
          </label>
          <textarea
            id="intake-notes"
            rows={4}
            placeholder="Context, constraints, audience, desired outcomes..."
            disabled={isDisabled}
            value={values.notes}
            onChange={(e) => update('notes', e.target.value)}
            className={cn(inputBase, 'resize-y')}
          />
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 cursor-pointer text-sm text-zinc-400">
        <input
          type="checkbox"
          required
          disabled={isDisabled}
          checked={values.consent}
          onChange={(e) => update('consent', e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/[0.04] accent-cyan-500 focus:ring-2 focus:ring-cyan-500/40"
        />
        <span>
          I understand Frank will contact me within 48h and may store my details in a private CRM.
        </span>
      </label>

      <button
        type="submit"
        disabled={isDisabled}
        className={cn(
          'mt-6 inline-flex items-center justify-center gap-2 w-full sm:w-auto',
          'px-6 py-3 rounded-xl text-sm font-semibold text-white',
          'bg-gradient-to-r transition-all',
          'disabled:opacity-60 disabled:cursor-not-allowed',
          ACCENT_BUTTON[accent],
        )}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Request a conversation
          </>
        )}
      </button>

      <AnimatePresence>
        {status === 'error' && errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 p-3 rounded-xl border border-rose-500/20 bg-rose-500/[0.06] text-rose-300 text-sm"
            role="alert"
          >
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-4 text-xs text-zinc-500">
        Frank replies within 48 hours on weekdays. Pricing and logistics are scoped on the first call.
      </p>
    </form>
  )
}
