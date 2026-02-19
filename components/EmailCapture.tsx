'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, Check, AlertCircle, Loader2 } from 'lucide-react'

type EmailCaptureProps = {
  product?: string
  placeholder?: string
  buttonText?: string
  className?: string
}

export default function EmailCapture({
  product = 'general',
  placeholder = 'Enter your email',
  buttonText = 'Get Early Access',
  className = '',
}: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, product }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message || 'Successfully subscribed!')
        setEmail('')
        setName('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl border-2 border-green-500/30 bg-green-500/10 p-6 ${className}`}
      >
        <div className="flex items-center gap-3 text-green-400">
          <Check className="h-6 w-6 flex-shrink-0" />
          <div>
            <p className="font-semibold">{message}</p>
            <p className="text-sm text-green-300/70 mt-1">Check your email for next steps.</p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
          disabled={status === 'loading'}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition-all hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Subscribing...
            </>
          ) : (
            <>
              <Mail className="h-5 w-5" />
              {buttonText}
            </>
          )}
        </button>
      </div>

      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-red-400"
        >
          <AlertCircle className="h-4 w-4" />
          {message}
        </motion.div>
      )}
    </form>
  )
}
