'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

/**
 * The passcode gate for the Strategic Advisor door.
 * Intentionally restrained: single field, no help text, no "request access"
 * link. If you don't have the passcode, this page isn't for you.
 *
 * UX notes:
 * - autoFocus on the input so a returning passcode-holder can paste-and-go
 *   from a password manager without a second click.
 * - The submit is a real button (>=44px tap target), not a link-styled control.
 * - Error message uses role="alert" + aria-live so screen readers announce it.
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
    <div className="min-h-screen bg-[#fafaf7] text-[#111] flex items-center justify-center px-6 py-20">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm"
        aria-label="Strategic Advisor passcode gate"
      >
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#999] mb-10 sm:mb-12">
          Private
        </p>
        <label
          htmlFor="passcode"
          className="block text-xs uppercase tracking-[0.28em] text-[#666] mb-3 font-serif"
        >
          Passcode
        </label>
        <input
          id="passcode"
          name="passcode"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          inputMode="text"
          enterKeyHint="go"
          aria-invalid={status === 'error' ? 'true' : 'false'}
          onChange={() => status === 'error' && setStatus('idle')}
          className={`w-full border-0 border-b bg-transparent px-0 py-3 text-base font-serif text-[#111] placeholder:text-[#bbb] focus:outline-none transition-colors ${
            status === 'error'
              ? 'border-[#a33] focus:border-[#a33]'
              : 'border-[#ccc] focus:border-[#111]'
          }`}
        />
        {error && (
          <p
            role="alert"
            aria-live="polite"
            className="mt-4 text-xs text-[#a33] font-serif"
          >
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-10 inline-flex min-h-[44px] items-center gap-3 bg-[#111] px-7 py-3 text-xs uppercase tracking-[0.32em] text-white transition-colors hover:bg-[#222] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafaf7]"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Verifying
            </>
          ) : (
            'Enter'
          )}
        </button>
      </form>
    </div>
  )
}
