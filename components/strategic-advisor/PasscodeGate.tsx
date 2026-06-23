'use client'

import { useState } from 'react'

/**
 * The passcode gate for the Executive Concierge door.
 * Intentionally restrained: single field, no help text, no "request access"
 * link. If you don't have the passcode, this page isn't for you.
 */
export function PasscodeGate() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setError(null)

    const passcode = String(new FormData(e.currentTarget).get('passcode') || '')
    try {
      const res = await fetch('/api/private-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      })
      if (res.ok) {
        // Soft reload so the server component re-renders with the cookie set.
        window.location.reload()
        return
      }
      setStatus('error')
      setError('Access denied.')
    } catch {
      setStatus('error')
      setError('Network error. Try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#111] flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#999] mb-10">
          Private
        </p>
        <label htmlFor="passcode" className="block text-sm font-serif text-[#333] mb-3">
          Passcode
        </label>
        <input
          id="passcode"
          name="passcode"
          type="password"
          autoComplete="off"
          autoFocus
          required
          className="w-full border-0 border-b border-[#ccc] bg-transparent px-0 py-2 text-base font-serif text-[#111] placeholder:text-[#bbb] focus:border-[#111] focus:outline-none"
        />
        {error && (
          <p className="mt-4 text-xs text-[#a33] font-serif">{error}</p>
        )}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-8 text-xs uppercase tracking-[0.3em] text-[#666] hover:text-[#111] transition-colors disabled:opacity-50"
        >
          {status === 'submitting' ? 'Verifying…' : 'Enter'}
        </button>
      </form>
    </div>
  )
}
