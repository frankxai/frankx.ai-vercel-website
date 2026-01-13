'use client'

import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Mail, X, Loader2, CheckCircle } from 'lucide-react'

interface PDFEmailModalProps {
  isOpen: boolean
  onClose: () => void
  pdfTitle: string
  pdfUrl: string
  guideSlug: string
  sessionId: string
  htmlFallbackUrl?: string
}

export default function PDFEmailModal({ isOpen, onClose, pdfTitle, pdfUrl, guideSlug, sessionId, htmlFallbackUrl }: PDFEmailModalProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [primaryInterest, setPrimaryInterest] = useState('')
  const [referralSource, setReferralSource] = useState('')
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
          pdfTitle,
          pdfUrl,
          guideSlug,
          sessionId,
          company: company || undefined,
          role: role || undefined,
          primaryInterest: primaryInterest || undefined,
          referralSource: referralSource || undefined
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to send email')
      }

      setIsSuccess(true)
      setTimeout(() => {
        onClose()
        // Reset form
        setTimeout(() => {
          setEmail('')
          setName('')
          setCompany('')
          setRole('')
          setPrimaryInterest('')
          setReferralSource('')
          setIsSuccess(false)
        }, 300)
      }, 2000)
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
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-cyan-500/20 p-6 shadow-2xl shadow-cyan-500/20 transition-all">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

                {isSuccess ? (
                  // Success state
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">Check Your Email!</h3>
                    <p className="text-gray-400">
                      We've sent <strong className="text-white">{pdfTitle}</strong> to {email}
                    </p>
                  </div>
                ) : (
                  // Form state
                  <>
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <Dialog.Title className="text-2xl font-semibold text-white text-center mb-2">
                        Get PDF via Email
                      </Dialog.Title>
                      <p className="text-gray-400 text-center text-sm">
                        We'll send <strong className="text-white">{pdfTitle}</strong> straight to your inbox
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                          placeholder="your@email.com"
                        />
                      </div>

                      {/* Optional fields */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="company" className="block text-xs font-medium text-gray-400 mb-2">
                            Company (Optional)
                          </label>
                          <input
                            type="text"
                            id="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                            placeholder="Your company"
                          />
                        </div>

                        <div>
                          <label htmlFor="role" className="block text-xs font-medium text-gray-400 mb-2">
                            Role (Optional)
                          </label>
                          <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                          >
                            <option value="">Select role</option>
                            <option value="creator">Creator/Artist</option>
                            <option value="developer">Developer</option>
                            <option value="designer">Designer</option>
                            <option value="marketer">Marketer</option>
                            <option value="founder">Founder/CEO</option>
                            <option value="student">Student</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="interest" className="block text-xs font-medium text-gray-400 mb-2">
                          Primary Interest (Optional)
                        </label>
                        <select
                          id="interest"
                          value={primaryInterest}
                          onChange={(e) => setPrimaryInterest(e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        >
                          <option value="">What interests you most?</option>
                          <option value="ai-tools">AI Tools & Workflows</option>
                          <option value="music-creation">Music Creation with AI</option>
                          <option value="content-creation">Content Creation</option>
                          <option value="technical-learning">Technical Learning</option>
                          <option value="consciousness">Consciousness & Transformation</option>
                          <option value="community">Community & Realm</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="referral" className="block text-xs font-medium text-gray-400 mb-2">
                          How did you find us? (Optional)
                        </label>
                        <select
                          id="referral"
                          value={referralSource}
                          onChange={(e) => setReferralSource(e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        >
                          <option value="">Select source</option>
                          <option value="search">Search Engine</option>
                          <option value="social">Social Media</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="twitter">Twitter/X</option>
                          <option value="youtube">YouTube</option>
                          <option value="referral">Friend/Colleague</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {error && (
                        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                          <p className="text-red-400 text-sm mb-3">{error}</p>
                          {htmlFallbackUrl && (
                            <a
                              href={htmlFallbackUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium transition-all"
                              onClick={() => {
                                setTimeout(() => {
                                  setError(null)
                                  onClose()
                                }, 100)
                              }}
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span>Download HTML Version Instead</span>
                            </a>
                          )}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-medium transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Mail className="w-5 h-5" />
                            <span>Send to My Email</span>
                          </>
                        )}
                      </button>

                      <p className="text-xs text-gray-500 text-center">
                        We respect your privacy. No spam, ever.
                      </p>
                    </form>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
