'use client'

import { Suspense, type FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Check, Loader2, Mail, ArrowLeft } from 'lucide-react'

const TOPICS = [
  { id: 'newsletter', label: 'Signal Loop', description: 'The weekly note on AI systems, creative output, and clearer work' },
  { id: 'music-suno', label: 'Music Lab', description: 'New releases, Suno prompts, production techniques' },
  { id: 'product-updates', label: 'Product Updates', description: 'New tools, courses, and digital products' },
] as const

type Status = 'idle' | 'loading' | 'confirmation' | 'saved' | 'error'

function tokenTopics(token: string) {
  try {
    const payload = token.split('.')[0]
    if (!payload) return null
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
    const decoded = JSON.parse(atob(padded)) as { topics?: unknown }
    if (!Array.isArray(decoded.topics)) return null
    const topics: unknown[] = decoded.topics
    const allowed = new Set<string>(TOPICS.map((topic) => topic.id))
    if (topics.some((topic) => typeof topic !== 'string' || !allowed.has(topic))) {
      return null
    }
    return TOPICS.map((topic) => topic.id).filter((topic) => topics.includes(topic))
  } catch {
    return null
  }
}

function PreferencesContent() {
  const searchParams = useSearchParams()
  const preferenceToken = searchParams.get('token') ?? ''
  const confirmedTopics = useMemo(() => tokenTopics(preferenceToken), [preferenceToken])
  const [email, setEmail] = useState('')
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(confirmedTopics ?? ['newsletter']),
  )
  const [status, setStatus] = useState<Status>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const selectedTopics = TOPICS.map((topic) => topic.id).filter((topic) => selected.has(topic))
  const tokenMatchesSelection =
    Boolean(preferenceToken) &&
    confirmedTopics !== null &&
    selectedTopics.join(',') === confirmedTopics.join(',')

  const toggle = (id: string) => {
    setStatus('idle')
    setStatusMessage('')
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email) {
      setStatus('error')
      setStatusMessage('Enter the email address that should own these preferences.')
      return
    }
    setStatus('loading')
    setStatusMessage('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          topics: selectedTopics,
          preferenceToken: tokenMatchesSelection ? preferenceToken : undefined,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.confirmationRequired) {
        setStatus('confirmation')
        setStatusMessage(
          data.message || 'Check your inbox. Nothing changes until you confirm ownership.',
        )
      } else if (res.ok) {
        setStatus('saved')
        setStatusMessage(data.message || 'Your verified email preferences are saved.')
      } else {
        setStatus('error')
        setStatusMessage(data.error || 'The preferences could not be saved. Please try again.')
      }
    } catch {
      setStatus('error')
      setStatusMessage('The preferences could not be saved. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 py-16">
      <div className="mx-auto max-w-lg">
        <Link
          href="/newsletter"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/60"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Newsletter
        </Link>

        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
            <Mail className="h-5 w-5 text-violet-400" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Email Preferences
          </h1>
        </div>

        <p className="mb-8 text-sm leading-relaxed text-white/50">
          Saving changes requires email confirmation. FrankX sends a short-lived
          link with no email address in the URL; open it and re-enter the same
          email to apply the requested topics. This page does not display your
          current provider settings, so select the complete set you want to receive.
        </p>

        {preferenceToken && (
          <p className="mb-6 rounded-xl border border-violet-400/20 bg-violet-400/[0.06] p-4 text-sm leading-6 text-violet-100/80">
            Confirmation link loaded. The server will verify it after you re-enter
            the email that received it. Changing the selected topics sends a new
            confirmation instead.
          </p>
        )}

        <form onSubmit={handleSave}>
          <div className="mb-6">
            <label
              htmlFor="preference-email"
              className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/55"
            >
              Your email
            </label>
            <input
              id="preference-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              spellCheck={false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com…"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 transition-colors focus-visible:border-violet-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
            />
          </div>

          {/* Topic toggles */}
          <div className="mb-8 space-y-3">
            {TOPICS.map((topic) => {
              const isOn = selected.has(topic.id)
              return (
                <button
                  type="button"
                  key={topic.id}
                  onClick={() => toggle(topic.id)}
                  aria-pressed={isOn}
                  aria-describedby={`topic-${topic.id}-description`}
                  className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 ${
                    isOn
                      ? 'border-violet-500/30 bg-violet-500/[0.06]'
                      : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition-colors ${
                      isOn
                        ? 'border-violet-500 bg-violet-500'
                        : 'border-white/20 bg-transparent'
                    }`}
                  >
                    {isOn && <Check className="h-3 w-3 text-white" aria-hidden="true" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{topic.label}</p>
                    <p
                      id={`topic-${topic.id}-description`}
                      className="mt-0.5 text-xs text-white/55"
                    >
                      {topic.description}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Save button */}
          <button
            type="submit"
            disabled={!email || status === 'loading'}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === 'loading' ? (
              <Loader2
                className="h-4 w-4 animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
            ) : status === 'saved' ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                Preferences saved
              </>
            ) : tokenMatchesSelection ? (
              'Confirm preferences'
            ) : (
              'Send confirmation'
            )}
          </button>

          <div className="mt-3 text-center text-xs" aria-live="polite">
            {status === 'confirmation' && (
              <p className="text-violet-200">{statusMessage}</p>
            )}
            {status === 'saved' && (
              <p className="text-emerald-300">{statusMessage}</p>
            )}
            {status === 'error' && (
              <p className="text-red-300">{statusMessage}</p>
            )}
          </div>
        </form>

        {/* Unsubscribe option */}
        <div className="mt-12 border-t border-white/[0.06] pt-6 text-center">
          <p className="text-xs text-white/30">
            Want to unsubscribe from everything?{' '}
            <Link href="/unsubscribe" className="text-white/50 underline hover:text-white/70">
              Unsubscribe here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function PreferencesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f]">
          <Loader2
            className="h-6 w-6 animate-spin text-violet-400 motion-reduce:animate-none"
            aria-label="Loading email preferences"
          />
        </div>
      }
    >
      <PreferencesContent />
    </Suspense>
  )
}
