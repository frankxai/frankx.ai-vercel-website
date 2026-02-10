'use client'

import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Mail, X, Loader2, CheckCircle, Music, Gift, Sparkles } from 'lucide-react'

interface VibeOSEmailModalProps {
  isOpen: boolean
  onClose: () => void
  pdfUrl: string
  sessionId: string
}

export default function VibeOSEmailModal({ isOpen, onClose, pdfUrl, sessionId }: VibeOSEmailModalProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/send-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          pdfTitle: 'Vibe OS Bonus Prompts',
          pdfUrl,
          guideSlug: 'vibe-os-bonus',
          sessionId,
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to send email')
      }

      setIsSuccess(true)
      setTimeout(() => {
        onClose()
        setTimeout(() => {
          setEmail('')
          setName('')
          setIsSuccess(false)
        }, 300)
      }, 3000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send email'
      setError(errorMessage)
      console.error('Email send error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-void/95 backdrop-blur-2xl border border-violet-500/20 p-8 shadow-2xl shadow-violet-500/20 transition-all relative">
                {/* Ambient glow effects */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-xl p-2 text-white/55 transition-all hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>

                {isSuccess ? (
                  <div className="relative py-8 text-center">
                    {/* Success animation */}
                    <div className="relative mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center">
                      <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-br from-violet-500/40 to-emerald-500/40" />
                      <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-violet-500/30 to-emerald-500/30" />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-400/50 bg-void">
                        <CheckCircle className="h-10 w-10 text-emerald-400" />
                      </div>
                    </div>

                    <h3 className="font-display mb-3 text-3xl font-bold text-white">
                      Bonuses Incoming! 🎁
                    </h3>
                    <p className="mb-2 text-lg text-white/80">
                      Hey <span className="font-medium text-violet-300">{name}</span>, check your inbox
                    </p>
                    <p className="text-sm text-white/50">
                      5 Advanced Genre Prompts heading to {email}
                    </p>

                    <div className="mt-6 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-4">
                      <div className="flex items-center justify-center gap-2 text-sm text-violet-200">
                        <Music className="h-4 w-4" />
                        <span>Your creative edge just leveled up</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    {/* Header */}
                    <div className="mb-8 text-center">
                      <div className="relative mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/20 to-cyan-500/20">
                        <Gift className="h-7 w-7 text-violet-300" />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 blur-xl" />
                      </div>

                      <Dialog.Title className="font-display mb-3 text-2xl font-bold text-white md:text-3xl">
                        Unlock 5 Bonus Prompts
                      </Dialog.Title>
                      <p className="text-white/60">
                        You can already download the guide.<br />
                        <span className="text-sm text-violet-300">Get these exclusive extras via email:</span>
                      </p>
                    </div>

                    {/* Bonus List */}
                    <div className="mb-6 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2 text-white/80">
                          <Sparkles className="h-4 w-4 text-violet-400" />
                          <span>5 Advanced Genre Prompts (exclusive)</span>
                        </li>
                        <li className="flex items-center gap-2 text-white/80">
                          <Mail className="h-4 w-4 text-cyan-400" />
                          <span>Weekly Suno tips & new techniques</span>
                        </li>
                        <li className="flex items-center gap-2 text-white/80">
                          <Music className="h-4 w-4 text-emerald-400" />
                          <span>Early access to new guides</span>
                        </li>
                      </ul>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="vibe-name" className="mb-2 block text-sm font-medium text-white/80">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="vibe-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 transition-all focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 hover:border-white/20"
                          placeholder="Your creative name"
                        />
                      </div>

                      <div>
                        <label htmlFor="vibe-email" className="mb-2 block text-sm font-medium text-white/80">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="vibe-email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 transition-all focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 hover:border-white/20"
                          placeholder="creator@example.com"
                        />
                      </div>

                      {error && (
                        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                          <p className="mb-2 text-sm font-medium text-red-300">⚠️ {error}</p>
                          <p className="text-xs text-white/50">
                            Don&apos;t worry - you can still{' '}
                            <a
                              href={pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 underline"
                              onClick={() => setTimeout(onClose, 100)}
                            >
                              download the main guide
                            </a>
                            {' '}right now.
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-4 font-semibold text-white shadow-[0_20px_60px_rgba(139,92,246,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_25px_70px_rgba(139,92,246,0.5)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isLoading ? (
                            <>
                              <Loader2 className="h-5 w-5 animate-spin" />
                              <span>Sending bonuses...</span>
                            </>
                          ) : (
                            <>
                              <Gift className="h-5 w-5 transition-transform group-hover:rotate-12" />
                              <span>Send Me the Bonuses</span>
                            </>
                          )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 to-purple-500/20 opacity-0 transition-opacity group-hover:opacity-100" />
                      </button>

                      <p className="text-center text-xs text-white/55">
                        🔒 No spam, ever. Unsubscribe with one click.
                      </p>
                    </form>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
