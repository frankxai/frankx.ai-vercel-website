'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface EmailSignupProps {
  listType?: 'newsletter' | 'creation-chronicles' | 'ai-architect' | 'inner-circle' | 'music-lab' | 'arcanea' | 'investor' | 'courses-waitlist' | 'ikigai-branding' | 'agentic-builder-lab' | 'all'
  placeholder?: string
  buttonText?: string
  className?: string
  redirectTo?: string
  showName?: boolean
  compact?: boolean
}

export function EmailSignup({
  listType = 'newsletter',
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  className,
  redirectTo,
  showName = false,
  compact = false,
}: EmailSignupProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!email) {
      setErrorMessage('Please enter your email')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: showName ? name : undefined,
          listType,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setStatus('success')

      // Redirect after success with stream context
      if (redirectTo) {
        const separator = redirectTo.includes('?') ? '&' : '?'
        const url = `${redirectTo}${separator}stream=${listType}`
        setTimeout(() => {
          router.push(url)
        }, 1500)
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className={cn('relative', className)} noValidate>
        <div className="flex gap-2">
          <label htmlFor="email-compact" className="sr-only">Email address</label>
          <input
            id="email-compact"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            aria-label="Email address"
            aria-invalid={status === 'error'}
            aria-describedby={status === 'error' ? 'email-compact-error' : status === 'success' ? 'email-compact-success' : undefined}
            required
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500/50 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-emerald-500 hover:to-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
          >
            {status === 'loading' ? 'Subscribing...' : status === 'success' ? '✓' : buttonText}
          </button>
        </div>

        <AnimatePresence>
          {status === 'error' && errorMessage && (
            <motion.div
              id="email-compact-error"
              role="alert"
              aria-live="polite"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-400 text-sm mt-2"
            >
              {errorMessage}
            </motion.div>
          )}
          {status === 'success' && (
            <motion.div
              id="email-compact-success"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-emerald-400 text-sm mt-2"
            >
              You're in. Check your inbox to confirm.
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    )
  }

  return (
    <div className={cn('w-full max-w-md', className)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {showName && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
              First Name (optional)
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your first name"
              disabled={status === 'loading' || status === 'success'}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 transition-all"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            disabled={status === 'loading' || status === 'success'}
            required
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className={cn(
            "w-full px-6 py-3 font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed",
            status === 'success'
              ? "bg-emerald-600 text-white"
              : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500"
          )}
        >
          {status === 'loading' && 'Subscribing...'}
          {status === 'success' && '✓ Subscribed!'}
          {status === 'idle' && buttonText}
          {status === 'error' && 'Try Again'}
        </button>

        <AnimatePresence>
          {status === 'error' && errorMessage && (
            <motion.div
              role="alert"
              aria-live="polite"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
            >
              {errorMessage}
            </motion.div>
          )}
          {status === 'success' && (
            <motion.div
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm"
            >
              You're in. Check your inbox to confirm.
              {redirectTo && <span className="block mt-1">Redirecting...</span>}
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      <p className="mt-4 text-xs text-slate-500 text-center">
        No spam, ever. Unsubscribe anytime.
      </p>
    </div>
  )
}
