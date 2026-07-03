'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, CheckCircle2, Download, Mail } from 'lucide-react'

const downloads = [
  {
    label: 'Workbook',
    href: '/downloads/openai-agent-builder-workbook-2026.md',
  },
  {
    label: 'Cheat sheet',
    href: '/downloads/openai-agent-builder-cheatsheet-2026.md',
  },
  {
    label: 'Notion guide',
    href: '/downloads/openai-agent-notion-template.md',
  },
]

export default function OpenAIAgentWorkbookSignup() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          listType: 'openai-agent-workbook',
          source: 'openai-agent-builder-workbook',
        }),
      })
      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message || 'Workbook unlocked. Check your email for the pack as well.')
        return
      }

      if (typeof data.error === 'string' && data.error.toLowerCase().includes('already subscribed')) {
        setStatus('success')
        setMessage('You are already subscribed, so the pack is unlocked here.')
        return
      }

      setStatus('error')
      setMessage(data.error || 'Something went wrong. Please try again.')
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-5 sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
          <Mail className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Get the free pack</h2>
          <p className="mt-1 text-sm leading-relaxed text-white/62">
            Workbook, cheat sheet, and Notion-ready guide. Built for creators, AI architects, and operators turning OpenAI updates into shipped workflows.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block">
          <span className="sr-only">First name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-emerald-300/60"
          />
        </label>
        <label className="block">
          <span className="sr-only">Email address</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-emerald-300/60"
          />
        </label>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'submitting' ? 'Sending...' : 'Send the workbook'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {message && (
        <p className={`mt-4 text-sm ${status === 'error' ? 'text-rose-300' : 'text-emerald-200'}`}>
          {message}
        </p>
      )}

      <div className="mt-5 border-t border-white/10 pt-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
          Direct Downloads
        </p>
        <div className="space-y-2">
          {downloads.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white transition-colors hover:border-emerald-300/40 hover:bg-white/[0.07]"
            >
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                {item.label}
              </span>
              <Download className="h-4 w-4 text-white/50" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
