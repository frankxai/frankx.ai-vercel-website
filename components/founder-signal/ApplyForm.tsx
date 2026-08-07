'use client'

import { useState, type FormEvent } from 'react'
import { AlertCircle, ArrowRight, Check, Loader2 } from 'lucide-react'

import { readStoredScan } from '@/lib/founder-signal'

type Status = 'idle' | 'submitting' | 'sent'

const FIELD_CLASS =
  'w-full rounded-xl border border-white/15 bg-void px-4 py-3 text-[15px] text-white placeholder:text-white/55 transition focus:border-tech-light/60 focus:outline-none focus:ring-2 focus:ring-tech-light/40'

export function ApplyForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setError(null)

    const form = event.currentTarget
    const data = new FormData(form)
    const scan = readStoredScan()

    try {
      const response = await fetch('/api/founder-signal/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') ?? ''),
          email: String(data.get('email') ?? ''),
          company: String(data.get('company') ?? ''),
          bodyOfWork: String(data.get('bodyOfWork') ?? ''),
          campaign: String(data.get('campaign') ?? ''),
          drift: String(data.get('drift') ?? ''),
          ...(scan ? { scanPercent: scan.percent, scanBand: scan.band } : {}),
        }),
      })

      const payload = (await response.json()) as { error?: string }

      if (!response.ok) {
        setError(payload.error ?? 'Something went wrong. Please try again.')
        setStatus('idle')
        return
      }

      setStatus('sent')
      form.reset()
    } catch {
      setError('The network dropped that one. Please try again.')
      setStatus('idle')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-3xl border border-tech-light/30 bg-tech-light/[0.07] p-8 text-center">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-tech-light text-void">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="mt-5 text-lg font-semibold text-white">
          That is in front of me.
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/65">
          I read every application myself and reply either way. Check your inbox
          for a confirmation in the next few minutes.
        </p>
      </div>
    )
  }

  const busy = status === 'submitting'

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fs-name" className="mb-2 block text-sm font-medium text-white/80">
            Your name
          </label>
          <input id="fs-name" name="name" type="text" required maxLength={120} className={FIELD_CLASS} />
        </div>
        <div>
          <label htmlFor="fs-email" className="mb-2 block text-sm font-medium text-white/80">
            Email
          </label>
          <input id="fs-email" name="email" type="email" required maxLength={200} className={FIELD_CLASS} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fs-company" className="mb-2 block text-sm font-medium text-white/80">
            Company or role
          </label>
          <input id="fs-company" name="company" type="text" maxLength={200} className={FIELD_CLASS} />
          <p className="mt-2 text-xs text-white/55">Optional.</p>
        </div>
        <div>
          <label htmlFor="fs-work" className="mb-2 block text-sm font-medium text-white/80">
            Link to your body of work
          </label>
          <input
            id="fs-work"
            name="bodyOfWork"
            type="url"
            required
            placeholder="https://"
            maxLength={400}
            className={FIELD_CLASS}
          />
          <p className="mt-2 text-xs text-white/55">
            Site, newsletter, podcast, or channel. Whatever holds the most of you.
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="fs-campaign" className="mb-2 block text-sm font-medium text-white/80">
          What is the live campaign or offer?
        </label>
        <textarea
          id="fs-campaign"
          name="campaign"
          required
          rows={3}
          minLength={20}
          maxLength={2000}
          className={FIELD_CLASS}
        />
        <p className="mt-2 text-xs text-white/55">
          The pilot runs underneath something real that is already scheduled.
        </p>
      </div>

      <div>
        <label htmlFor="fs-drift" className="mb-2 block text-sm font-medium text-white/80">
          Where does your voice get flattened today?
        </label>
        <textarea
          id="fs-drift"
          name="drift"
          required
          rows={3}
          minLength={20}
          maxLength={2000}
          className={FIELD_CLASS}
        />
        <p className="mt-2 text-xs text-white/55">
          Be specific. The honest answer here decides who gets selected.
        </p>
      </div>

      {error && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-error-base/40 bg-error-base/10 px-4 py-3 text-sm text-error-light"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-tech-light px-6 py-3.5 text-sm font-semibold text-void transition hover:bg-white active:scale-[0.99] disabled:cursor-wait disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light sm:w-auto"
      >
        {busy ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          <>
            Apply for the pilot
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-xs leading-5 text-white/55">
        One founder is selected. Your answers reach my inbox and the FrankX
        contact list, nowhere else.
      </p>
    </form>
  )
}
