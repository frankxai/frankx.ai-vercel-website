'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Loader2, Mail, ArrowLeft } from 'lucide-react'

const TOPICS = [
  { id: 'newsletter', label: 'Signal Loop', description: 'The weekly note on AI systems, creative output, and clearer work' },
  { id: 'music-suno', label: 'Music Lab', description: 'New releases, Suno prompts, production techniques' },
  { id: 'product-updates', label: 'Product Updates', description: 'New tools, courses, and digital products' },
]

type Status = 'idle' | 'loading' | 'saved' | 'error'

function PreferencesContent() {
  const searchParams = useSearchParams()
  const emailParam = searchParams.get('email') || ''
  const [email, setEmail] = useState(emailParam)
  const [selected, setSelected] = useState<Set<string>>(new Set(['newsletter']))
  const [status, setStatus] = useState<Status>('idle')

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleSave = async () => {
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          listType: selected.has('music-suno') ? 'music-lab' : 'newsletter',
          topics: Array.from(selected),
        }),
      })
      if (res.ok) setStatus('saved')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 py-16">
      <div className="mx-auto max-w-lg">
        <Link
          href="/newsletter"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/60"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Newsletter
        </Link>

        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
            <Mail className="h-5 w-5 text-violet-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Email Preferences
          </h1>
        </div>

        <p className="mb-8 text-sm leading-relaxed text-white/50">
          Choose which updates you want to receive. You can change these anytime.
        </p>

        {/* Email input */}
        <div className="mb-6">
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/30">
            Your email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20"
          />
        </div>

        {/* Topic toggles */}
        <div className="mb-8 space-y-3">
          {TOPICS.map((topic) => {
            const isOn = selected.has(topic.id)
            return (
              <motion.button
                key={topic.id}
                onClick={() => toggle(topic.id)}
                className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all ${
                  isOn
                    ? 'border-violet-500/30 bg-violet-500/[0.06]'
                    : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition-all ${
                    isOn
                      ? 'border-violet-500 bg-violet-500'
                      : 'border-white/20 bg-transparent'
                  }`}
                >
                  {isOn && <Check className="h-3 w-3 text-white" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{topic.label}</p>
                  <p className="mt-0.5 text-xs text-white/40">{topic.description}</p>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={!email || status === 'loading'}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-violet-500 disabled:opacity-40"
        >
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : status === 'saved' ? (
            <>
              <Check className="h-4 w-4" />
              Preferences saved
            </>
          ) : (
            'Save preferences'
          )}
        </button>

        {status === 'error' && (
          <p className="mt-3 text-center text-xs text-red-400">
            Something went wrong. Please try again.
          </p>
        )}

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
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f]">
        <Loader2 className="h-6 w-6 animate-spin text-violet-400" />
      </div>
    }>
      <PreferencesContent />
    </Suspense>
  )
}
