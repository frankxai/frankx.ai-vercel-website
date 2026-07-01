'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { ArrowRight, Calendar, CheckCircle2, Loader2 } from 'lucide-react'

import { INTENTS, INTENT_LABEL, INTENT_24H_ARTIFACT, type Intent } from '@/lib/intake-types'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

const INITIAL_INTENT: Intent = 'general'

interface Props {
  /** Pre-select an intent (e.g. when linked from /build with ?intent=sprint). */
  defaultIntent?: Intent
  /** Render the form in the cream/serif palette used on /engagements/strategic-advisor. */
  palette?: 'dark' | 'cream'
}

const isValidEmail = (s: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim()) && s.length <= 200

export function ContactForm({ defaultIntent = INITIAL_INTENT, palette = 'dark' }: Props) {
  const [intent, setIntent] = useState<Intent>(defaultIntent)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>(
    'idle',
  )
  const [error, setError] = useState<string | null>(null)
  const [ackSent, setAckSent] = useState(false)
  const [emailHint, setEmailHint] = useState<string | null>(null)
  const [messageLength, setMessageLength] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)
  const liveRegionId = useId()
  const errorId = useId()
  const emailErrorId = useId()

  // Reflect a deep-linked intent (?intent=...) if it changes after mount.
  useEffect(() => {
    setIntent(defaultIntent)
  }, [defaultIntent])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setError(null)
    setEmailHint(null)

    const form = e.currentTarget
    const data = new FormData(form)
    const emailValue = String(data.get('email') || '').trim()

    // Client-side email check — saves a roundtrip on obvious typos.
    if (!isValidEmail(emailValue)) {
      setStatus('idle')
      setEmailHint('That email looks off — double-check before sending?')
      ;(form.elements.namedItem('email') as HTMLInputElement | null)?.focus()
      return
    }

    const payload = {
      intent,
      name: String(data.get('name') || '').trim(),
      email: emailValue,
      company: String(data.get('company') || '').trim(),
      message: String(data.get('message') || '').trim(),
      website: String(data.get('website') || ''), // honeypot
      // 'use client' + form submit handler → window is always defined here.
      source: window.location.pathname,
      consent: data.get('consent') === 'on',
    }

    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok && json.ok) {
        setStatus('done')
        setAckSent(Boolean(json.ackSent))
        form.reset()
        setMessageLength(0)
        // Scroll the success surface into view — important on mobile where
        // the submit button might be below the fold after keyboard collapse.
        requestAnimationFrame(() => {
          document.getElementById(liveRegionId)?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        })
      } else {
        setStatus('error')
        setError(json.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setError('Network error. Please try again or email frank@frankx.ai.')
    }
  }

  // ── Palette tokens — keep the two themes side-by-side for sanity ───────────
  const t = palette === 'cream' ? CREAM : DARK

  if (status === 'done') {
    return (
      <div
        id={liveRegionId}
        role="status"
        aria-live="polite"
        className={t.successCard}
      >
        <CheckCircle2 className={`mx-auto h-10 w-10 ${t.successIcon}`} />
        <h3 className={`mt-5 text-xl font-semibold ${t.successTitle}`}>
          Got it. Your message is in.
        </h3>
        <p className={`mx-auto mt-3 max-w-md text-sm leading-6 ${t.successBody}`}>
          {ackSent
            ? "A confirmation just hit your inbox naming the 24-hour artifact you'll receive next: "
            : "Within 24 hours you'll receive "}
          <span className={t.successAccent}>{INTENT_24H_ARTIFACT[intent]}</span>.
          A real reply from Frank follows within 1–2 working days.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href={MEET_AND_GROW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={t.successPrimary}
          >
            <Calendar className="h-4 w-4" />
            Book the intro call now
          </a>
          <button
            type="button"
            onClick={() => {
              setStatus('idle')
              requestAnimationFrame(() =>
                (formRef.current?.elements.namedItem('name') as HTMLInputElement | null)?.focus(),
              )
            }}
            className={t.successSecondary}
          >
            Send another
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact Frank"
      data-testid="contact-form"
      className="space-y-5"
    >
      {/* Intent selector — a single-choice group. Styled as buttons but
          exposed to assistive tech as a real radiogroup: aria-pressed models
          independent toggles (any subset could be true), which is the wrong
          semantics for "pick exactly one". */}
      <fieldset>
        <legend className={t.legend}>What's this about?</legend>
        <div
          role="radiogroup"
          aria-label="What's this about?"
          className="mt-2 grid grid-cols-1 gap-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
        >
          {INTENTS.map((i) => (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={intent === i}
              onClick={() => setIntent(i)}
              className={`min-h-[44px] rounded-lg border px-3 py-3 text-left text-[13px] font-medium leading-tight transition ${
                intent === i ? t.intentActive : t.intentInactive
              }`}
            >
              {INTENT_LABEL[i]}
            </button>
          ))}
        </div>
        <p className={`mt-3 text-[12px] leading-5 ${t.helper}`}>
          Within 24 hours you'll get{' '}
          <span className={t.helperAccent}>{INTENT_24H_ARTIFACT[intent]}</span>.
        </p>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={t.label}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={200}
            autoComplete="name"
            inputMode="text"
            enterKeyHint="next"
            spellCheck={false}
            className={t.input}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className={t.label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            inputMode="email"
            enterKeyHint="next"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-invalid={emailHint ? 'true' : 'false'}
            aria-describedby={emailHint ? emailErrorId : undefined}
            onChange={() => emailHint && setEmailHint(null)}
            className={`${t.input} ${emailHint ? t.inputError : ''}`}
            placeholder="you@company.com"
          />
          {emailHint && (
            <p id={emailErrorId} role="alert" aria-live="polite" className={t.fieldError}>
              {emailHint}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="company" className={t.label}>
          Company <span className={t.labelMuted}>(optional)</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          maxLength={200}
          autoComplete="organization"
          inputMode="text"
          enterKeyHint="next"
          className={t.input}
          placeholder="Where you work"
        />
      </div>

      <div>
        <label htmlFor="message" className={t.label}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={4000}
          rows={5}
          enterKeyHint="send"
          onChange={(e) => setMessageLength(e.currentTarget.value.length)}
          className={`${t.input} resize-y py-3`}
          placeholder={messagePlaceholder(intent)}
        />
        <p className={`mt-1.5 text-right text-[11px] tabular-nums ${t.counter}`}>
          {messageLength}/4000
        </p>
      </div>

      {/* Honeypot — hidden from humans, catches bots */}
      <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className={t.consent}>
        <input
          name="consent"
          type="checkbox"
          required
          className={`mt-0.5 h-[18px] w-[18px] flex-shrink-0 rounded ${t.consentBox}`}
        />
        <span>
          I consent to FrankX storing this message to respond. No marketing without
          opt-in.
        </span>
      </label>

      {status === 'error' && error && (
        <p
          id={errorId}
          role="alert"
          aria-live="assertive"
          className={t.error}
        >
          {error}
        </p>
      )}

      {/* Live region for screen readers — covers submitting + done states. */}
      <div id={liveRegionId} role="status" aria-live="polite" className="sr-only">
        {status === 'submitting' && 'Sending your message to Frank…'}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={t.submit}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Reaching Frank's inbox…
          </>
        ) : (
          <>
            Send to Frank
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  )
}

function messagePlaceholder(intent: Intent): string {
  switch (intent) {
    case 'workshop':
      return 'Team size, current stack, what you want them to walk out with.'
    case 'sprint':
      return 'The build, the stack, the deadline, and what success looks like.'
    case 'partnership':
      return 'Who you are, what the partnership shape is, and what you need from Frank.'
    case 'press':
      return 'Outlet, angle, deadline. Sample questions welcome.'
    case 'advisory':
      return 'The decision in front of you and what good would look like.'
    case 'executive':
      return 'The problem you named, the scale you operate at, and the timeframe.'
    default:
      return 'What are you building, and where can Frank help?'
  }
}

// ── Palette tokens ──────────────────────────────────────────────────────────
// Keep them as JS objects so a single source of truth is easy to scan.
// `text-base` is 16px (browser default) — critical for iOS to NOT auto-zoom
// the viewport on focus.

const DARK = {
  legend:
    'block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400',
  label: 'mb-1.5 block text-sm font-medium text-slate-300',
  labelMuted: 'text-slate-500',
  helper: 'text-slate-500',
  helperAccent: 'text-cyan-300/90',
  input:
    'min-h-[44px] w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/40',
  inputError: 'border-rose-400/60 focus:border-rose-400/80 focus:ring-rose-400/30',
  fieldError: 'mt-1.5 text-[12px] leading-5 text-rose-300',
  counter: 'text-slate-500',
  intentActive:
    'border-cyan-300/60 bg-cyan-300/10 text-white shadow-[0_0_0_1px_rgba(103,232,249,0.15)_inset]',
  intentInactive:
    'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-slate-200',
  consent: 'flex items-start gap-2.5 text-sm leading-5 text-slate-400',
  consentBox:
    'border-white/20 bg-white/5 text-cyan-400 focus:ring-2 focus:ring-cyan-300/40',
  error:
    'rounded-lg border border-rose-400/30 bg-rose-500/[0.06] px-4 py-3 text-sm text-rose-200',
  submit:
    'inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 active:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]',
  successCard:
    'rounded-2xl border border-emerald-400/30 bg-emerald-500/[0.06] p-7 sm:p-8 text-center',
  successIcon: 'text-emerald-300',
  successTitle: 'text-white',
  successBody: 'text-slate-300/90',
  successAccent: 'text-emerald-200',
  successPrimary:
    'inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]',
  successSecondary:
    'inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]',
} as const

const CREAM = {
  legend:
    'block text-[10px] uppercase tracking-[0.32em] text-[#999] font-serif',
  label: 'mb-1.5 block text-xs uppercase tracking-[0.2em] text-[#666] font-serif',
  labelMuted: 'text-[#aaa] normal-case tracking-normal',
  helper: 'text-[#777] font-serif',
  helperAccent: 'text-[#111]',
  input:
    'min-h-[44px] w-full border-0 border-b border-[#d6d4cb] bg-transparent px-0 py-2.5 text-base text-[#111] placeholder:text-[#bbb] focus:border-[#111] focus:outline-none focus:ring-0 font-serif',
  inputError: 'border-[#a33] focus:border-[#a33]',
  fieldError: 'mt-1.5 text-[12px] leading-5 text-[#a33] font-serif',
  counter: 'text-[#999] font-serif',
  intentActive:
    'border-[#111] bg-white text-[#111] font-serif shadow-[0_0_0_1px_rgba(17,17,17,0.05)_inset]',
  intentInactive:
    'border-[#d6d4cb] bg-white text-[#666] hover:border-[#999] hover:text-[#111] font-serif',
  consent: 'flex items-start gap-2.5 text-sm leading-5 text-[#666] font-serif',
  consentBox:
    'border-[#bbb] bg-white text-[#111] focus:ring-2 focus:ring-[#111]/20',
  error:
    'border border-[#a33]/30 bg-[#a33]/[0.04] px-4 py-3 text-sm text-[#a33] font-serif',
  submit:
    'inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-[#111] px-6 py-3.5 text-xs uppercase tracking-[0.32em] font-serif text-white transition hover:bg-[#222] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafaf7]',
  successCard: 'border border-[#e8e6df] bg-white p-7 sm:p-10 text-center',
  successIcon: 'text-[#111]',
  successTitle: 'text-[#111] font-serif',
  successBody: 'text-[#333] font-serif',
  successAccent: 'text-[#111]',
  successPrimary:
    'inline-flex items-center gap-2 bg-[#111] px-5 py-3 text-xs uppercase tracking-[0.32em] font-serif text-white transition hover:bg-[#222]',
  successSecondary:
    'inline-flex items-center gap-2 border border-[#d6d4cb] bg-white px-5 py-3 text-xs uppercase tracking-[0.32em] font-serif text-[#333] transition hover:border-[#111] hover:text-[#111]',
} as const
