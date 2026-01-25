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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-2xl border border-cyan-500/20 p-8 shadow-2xl shadow-cyan-500/30 transition-all relative">
                {/* Aurora Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 rounded-3xl blur-2xl -z-10" />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all group"
                  aria-label="Close"
                >
                  <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {isSuccess ? (
                  // Success state - Studio celebration
                  <div className="text-center py-8">
                    <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full animate-pulse opacity-50" />
                      <div className="relative w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-950 rounded-full flex items-center justify-center border-2 border-cyan-400/30">
                        <CheckCircle className="w-10 h-10 text-cyan-400" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3 font-['Poppins']">
                      It's On The Way! ✨
                    </h3>
                    <p className="text-gray-300 text-lg mb-2">
                      Check your inbox, <span className="text-cyan-400 font-medium">{name}</span>
                    </p>
                    <p className="text-gray-400 text-sm">
                      <strong className="text-white">{pdfTitle}</strong> just landed at {email}
                    </p>
                    <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-600/10 border border-cyan-500/20">
                      <p className="text-sm text-gray-300">
                        💡 While you wait, explore our other creator guides
                      </p>
                    </div>
                  </div>
                ) : (
                  // Form state - Creator-first energy
                  <>
                    <div className="mb-8">
                      <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 mx-auto mb-5 backdrop-blur-sm">
                        <Mail className="w-7 h-7 text-cyan-400" />
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-purple-600/30 rounded-2xl blur-xl" />
                      </div>
                      <Dialog.Title className="text-2xl md:text-3xl font-bold text-white text-center mb-3 font-['Poppins']">
                        Your Guide Awaits
                      </Dialog.Title>
                      <p className="text-gray-300 text-center text-base leading-relaxed">
                        Get <strong className="text-white">{pdfTitle}</strong> delivered to your inbox.<br/>
                        <span className="text-sm text-gray-400">Same framework I use in the studio.</span>
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all hover:border-gray-600"
                          placeholder="Frank Guzman"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all hover:border-gray-600"
                          placeholder="frank@example.com"
                        />
                      </div>

                      {/* Optional fields */}
                      <details className="group">
                        <summary className="flex items-center justify-between cursor-pointer text-sm text-cyan-400 hover:text-cyan-300 transition-colors mb-3">
                          <span className="font-medium">📝 Tell us more (optional)</span>
                          <svg className="w-4 h-4 transform group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="space-y-3 mt-3 pt-3 border-t border-gray-800">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label htmlFor="company" className="block text-xs font-medium text-gray-400 mb-2">
                                Company
                              </label>
                              <input
                                type="text"
                                id="company"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                placeholder="Your company"
                              />
                            </div>

                            <div>
                              <label htmlFor="role" className="block text-xs font-medium text-gray-400 mb-2">
                                Role
                              </label>
                              <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                              >
                                <option value="">Your role...</option>
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
                              What interests you most?
                            </label>
                            <select
                              id="interest"
                              value={primaryInterest}
                              onChange={(e) => setPrimaryInterest(e.target.value)}
                              className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                            >
                              <option value="">Choose your vibe...</option>
                              <option value="ai-tools">AI Tools & Workflows</option>
                              <option value="music-creation">Music Creation with AI</option>
                              <option value="content-creation">Content Creation</option>
                              <option value="technical-learning">Technical Learning</option>
                              <option value="systems">Systems & Architecture</option>
                              <option value="community">Community & Realm</option>
                            </select>
                          </div>

                          <div>
                            <label htmlFor="referral" className="block text-xs font-medium text-gray-400 mb-2">
                              How did you find us?
                            </label>
                            <select
                              id="referral"
                              value={referralSource}
                              onChange={(e) => setReferralSource(e.target.value)}
                              className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                            >
                              <option value="">Select source...</option>
                              <option value="search">Search Engine</option>
                              <option value="social">Social Media</option>
                              <option value="linkedin">LinkedIn</option>
                              <option value="twitter">Twitter/X</option>
                              <option value="youtube">YouTube</option>
                              <option value="referral">Friend/Colleague</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                      </details>

                      {error && (
                        <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 backdrop-blur-sm">
                          <p className="text-red-300 text-sm mb-3 font-medium">⚠️ {error}</p>
                          {htmlFallbackUrl && (
                            <a
                              href={htmlFallbackUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/80 hover:bg-gray-700 text-white text-sm font-medium transition-all backdrop-blur-sm hover:scale-105"
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
                              <span>Get HTML Version</span>
                            </a>
                          )}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full group relative flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                            <span className="relative z-10">Sending to your inbox...</span>
                          </>
                        ) : (
                          <>
                            <Mail className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
                            <span className="relative z-10">Send My Guide →</span>
                          </>
                        )}
                      </button>

                      <div className="text-center space-y-1">
                        <p className="text-xs text-gray-400">
                          🔒 Your email stays with us. Zero spam, pure value.
                        </p>
                        <p className="text-[10px] text-gray-500">
                          Join 10,000+ creators crafting with AI
                        </p>
                      </div>
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
