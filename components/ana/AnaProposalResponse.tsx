'use client'

import { useId, useState } from 'react'
import { ArrowRight, CheckCircle2, Loader2, LockKeyhole } from 'lucide-react'

type Decision = {
  id: string
  label: string
  description: string
}

type Priority = {
  id: string
  label: string
}

export function AnaProposalResponse({
  proposalId,
  eyebrow = 'Your response',
  title,
  intro,
  decisions,
  priorities,
}: {
  proposalId: string
  eyebrow?: string
  title: string
  intro: string
  decisions: Decision[]
  priorities: Priority[]
}) {
  const formId = useId()
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [ackSent, setAckSent] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setError(null)

    const form = event.currentTarget
    const data = new FormData(form)
    const decisionId = String(data.get('decision') || '')
    const decision = decisions.find((item) => item.id === decisionId)
    const selectedPriorityIds = data.getAll('priorities').map(String)
    const selectedPriorities = priorities
      .filter((item) => selectedPriorityIds.includes(item.id))
      .map((item) => item.label)
    const comments = String(data.get('comments') || '').trim()

    const message = [
      `Proposal: ${proposalId}`,
      `Decision: ${decision?.label || decisionId}`,
      `Priorities: ${selectedPriorities.length > 0 ? selectedPriorities.join('; ') : 'None selected'}`,
      `Comments: ${comments || 'No additional comments'}`,
      'Boundary: This response requests discussion or pilot planning only. It is not purchase, launch, data-processing, identity, or publication approval.',
    ].join('\n')

    const payload = {
      intent: 'partnership',
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      company: 'Ana collaboration review',
      message,
      website: String(data.get('website') || ''),
      source: window.location.pathname,
      consent: data.get('consent') === 'on',
    }

    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await response.json().catch(() => ({}))

      if (response.ok && json.ok) {
        setAckSent(Boolean(json.ackSent))
        setStatus('done')
        form.reset()
        return
      }

      setStatus('error')
      setError(json.error || 'The response could not be delivered. Please try again.')
    } catch {
      setStatus('error')
      setError('Network error. Please try again later.')
    }
  }

  if (status === 'done') {
    return (
      <div role="status" aria-live="polite" className="rounded-[2rem] border border-emerald-300/25 bg-emerald-300/[0.065] p-7 text-center sm:p-9">
        <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-200" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-semibold text-[#fff8e9]">Frank has your response.</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#fff8e9]/[0.65]">
          {ackSent ? 'A confirmation was also sent to the email you entered. ' : ''}
          Frank can now prepare the next conversation. Nothing has been purchased, launched, or made public.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 rounded-full border border-white/[0.15] px-4 py-2 text-sm font-semibold text-[#fff8e9]/75 transition hover:border-white/[0.35] hover:text-[#fff8e9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e4bd83]"
        >
          Send another response
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2.3rem] border border-white/10 bg-[#0b0a08]/[0.86] p-5 shadow-[0_30px_110px_rgba(0,0,0,0.36)] sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d3a66d]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#fff8e9] sm:text-4xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-[#fff8e9]/60 sm:text-base sm:leading-7">{intro}</p>

      <fieldset className="mt-8">
        <legend className="text-sm font-semibold text-[#fff8e9]">Which direction feels right?</legend>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {decisions.map((decision) => {
            const id = `${formId}-${decision.id}`
            return (
              <label key={decision.id} htmlFor={id} className="group relative cursor-pointer rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-4 transition hover:border-[#e4bd83]/[0.35] has-[:checked]:border-[#e4bd83]/[0.65] has-[:checked]:bg-[#e4bd83]/10">
                <input id={id} name="decision" value={decision.id} type="radio" required className="peer sr-only" />
                <span className="block text-sm font-semibold text-[#fff8e9]">{decision.label}</span>
                <span className="mt-2 block text-xs leading-5 text-[#fff8e9]/[0.52]">{decision.description}</span>
                <span className="absolute right-4 top-4 h-3.5 w-3.5 rounded-full border border-white/25 peer-checked:border-[4px] peer-checked:border-[#e4bd83]" aria-hidden="true" />
              </label>
            )
          })}
        </div>
      </fieldset>

      <fieldset className="mt-7">
        <legend className="text-sm font-semibold text-[#fff8e9]">What should Frank prepare next?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {priorities.map((priority) => {
            const id = `${formId}-${priority.id}`
            return (
              <label key={priority.id} htmlFor={id} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-white/[0.09] bg-white/[0.025] px-4 py-3 text-sm text-[#fff8e9]/[0.68] transition hover:border-white/[0.22] has-[:checked]:border-emerald-300/[0.35] has-[:checked]:bg-emerald-300/[0.06] has-[:checked]:text-[#fff8e9]">
                <input id={id} name="priorities" value={priority.id} type="checkbox" className="h-4 w-4 rounded border-white/25 bg-black/20 text-emerald-400 focus:ring-emerald-300/50" />
                {priority.label}
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className="mb-1.5 block text-sm font-medium text-[#fff8e9]/[0.72]">Name</label>
          <input id={`${formId}-name`} name="name" type="text" required maxLength={200} autoComplete="name" className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 text-sm text-[#fff8e9] placeholder:text-white/30 focus:border-[#e4bd83]/[0.55] focus:outline-none focus:ring-1 focus:ring-[#e4bd83]/[0.55]" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className="mb-1.5 block text-sm font-medium text-[#fff8e9]/[0.72]">Email</label>
          <input id={`${formId}-email`} name="email" type="email" required maxLength={200} autoComplete="email" className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 text-sm text-[#fff8e9] placeholder:text-white/30 focus:border-[#e4bd83]/[0.55] focus:outline-none focus:ring-1 focus:ring-[#e4bd83]/[0.55]" placeholder="you@company.com" />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={`${formId}-comments`} className="mb-1.5 block text-sm font-medium text-[#fff8e9]/[0.72]">Comments or changes</label>
        <textarea id={`${formId}-comments`} name="comments" maxLength={2000} rows={5} className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-[#fff8e9] placeholder:text-white/30 focus:border-[#e4bd83]/[0.55] focus:outline-none focus:ring-1 focus:ring-[#e4bd83]/[0.55]" placeholder="What should change, what feels useful, or what would you like to discuss?" />
        <p className="mt-2 flex items-start gap-2 text-xs leading-5 text-[#fff8e9]/[0.42]">
          <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Do not include client, employee, candidate, health, billing, or other sensitive data here.
        </p>
      </div>

      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input id={`${formId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="mt-5 flex items-start gap-2.5 text-sm leading-6 text-[#fff8e9]/[0.55]">
        <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-emerald-400 focus:ring-emerald-300/50" />
        <span>I consent to FrankX storing this response so Frank can follow up. No marketing without a separate opt-in.</span>
      </label>

      {status === 'error' && error ? (
        <p role="alert" className="mt-5 rounded-xl border border-rose-300/25 bg-rose-300/[0.06] px-4 py-3 text-sm text-rose-100">{error}</p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === 'submitting'} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f4dfbd] px-6 py-3 text-sm font-semibold text-[#17120d] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e4bd83] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0a08]">
          {status === 'submitting' ? (
            <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />Sending response…</>
          ) : (
            <>Send my response to Frank<ArrowRight className="h-4 w-4" aria-hidden="true" /></>
          )}
        </button>
        <p className="text-xs leading-5 text-[#fff8e9]/[0.38]">Planning signal only. No purchase, launch, or publication approval.</p>
      </div>
    </form>
  )
}
