'use client'

import { use, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Shield, Gavel, Check, AlertCircle, Loader2 } from 'lucide-react'
import CountdownTimer from '@/components/auctions/CountdownTimer'
import auctions from '@/data/auctions.json'
import { notFound } from 'next/navigation'

export default function AuctionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const auction = auctions.find(a => a.slug === id)

  if (!auction) return notFound()

  const isCompleted = auction.status === 'completed'
  const currentPrice = auction.winningBid || auction.startingBid

  // Form State
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bidAmount, setBidAmount] = useState(String(auction.startingBid))
  const [proposal, setProposal] = useState('')
  
  // Status State
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch('/api/auctions/bid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          auctionId: auction.id,
          bidAmount,
          proposal,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setName('')
        setEmail('')
        setProposal('')
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error('Submission error:', err)
      setError('A network error occurred. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <section className="relative pt-24 pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-cyan-500/5" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/40 text-sm mb-10">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/auctions" className="hover:text-white transition-colors">Auctions</Link>
            <span>/</span>
            <span className="text-white/70 truncate">{auction.title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`relative aspect-[16/10] rounded-2xl overflow-hidden border ${
                isCompleted ? 'border-white/5 opacity-70 grayscale' : 'border-white/10'
              }`}>
                <Image
                  src={auction.item.images[0]}
                  alt={auction.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Edition badge */}
              {auction.edition && (
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/60 text-sm">
                  <Shield className="w-4 h-4" />
                  Edition: {auction.edition}
                </div>
              )}
            </motion.div>

            {/* Details Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-xs uppercase tracking-widest text-amber-400/70 mb-2 block">
                {auction.item.category}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {auction.title}
              </h1>

              <p className="text-white/50 leading-relaxed mb-8">
                {auction.description}
              </p>

              {/* Countdown or Acquisition Details */}
              {isCompleted ? (
                <div className="mb-8 p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-1">
                    <Check className="w-4 h-4" />
                    Drop Completed & Acquired
                  </div>
                  <p className="text-sm text-white/65 leading-relaxed">
                    This limited edition item was successfully acquired by an anonymous creator. Follow the page or join the newsletter for upcoming drops.
                  </p>
                </div>
              ) : (
                <div className="mb-8">
                  <div className="flex items-center gap-2 text-white/40 text-sm mb-3">
                    <Clock className="w-4 h-4" />
                    <span>Time remaining to submit proposals</span>
                  </div>
                  <CountdownTimer endTime={auction.endTime} />
                </div>
              )}

              {/* Bidding/Acquisition Status Block */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 mb-6">
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/[0.06]">
                  <div>
                    <span className="text-xs text-white/40">
                      {isCompleted ? 'Final Valuation' : 'Starting Price'}
                    </span>
                    <div className="text-3xl font-bold text-white">${currentPrice}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-white/40">Drop Status</span>
                    <div className={`text-lg font-semibold font-mono ${
                      isCompleted ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {isCompleted ? 'Closed' : 'Accepting Proposals'}
                    </div>
                  </div>
                </div>

                {isCompleted ? (
                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] text-center">
                    <p className="text-sm text-white/40">
                      To suggest a similar custom project or inquire about upcoming drops, reach out to{' '}
                      <a href="mailto:frank@frankx.ai" className="text-amber-400 hover:underline">frank@frankx.ai</a>.
                    </p>
                  </div>
                ) : (
                  <div>
                    {success ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-center"
                      >
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-3">
                          <Check className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Proposal Submitted</h3>
                        <p className="text-sm text-white/60 leading-relaxed">
                          Your silent bid and project proposal have been registered. Frank reviews all submissions personally to verify alignment and will follow up with you.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-1.5">
                          <Gavel className="w-4 h-4 text-amber-400" />
                          Submit Silent Bid & Proposal
                        </h3>

                        {error && (
                          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{error}</span>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-xs text-white/40 mb-1.5 font-medium">Full Name</label>
                            <input
                              type="text"
                              id="name"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="e.g. Witali Riemer"
                              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-xs text-white/40 mb-1.5 font-medium">Email Address</label>
                            <input
                              type="email"
                              id="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="e.g. witali@mail.com"
                              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="bid" className="block text-xs text-white/40 mb-1.5 font-medium">Silent Bid Amount ($)</label>
                          <input
                            type="number"
                            id="bid"
                            required
                            min={auction.startingBid}
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                          />
                        </div>

                        <div>
                          <label htmlFor="proposal" className="block text-xs text-white/40 mb-1.5 font-medium">Project Outline / Goals</label>
                          <textarea
                            id="proposal"
                            required
                            rows={4}
                            value={proposal}
                            onChange={(e) => setProposal(e.target.value)}
                            placeholder="Describe your current setup, project goals, and what you need assistance with (at least 20 characters)..."
                            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-500/50 transition-colors resize-none leading-relaxed"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Processing Proposal...
                            </>
                          ) : (
                            'Submit Bid & Proposal'
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>

              {/* Item details */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
                <h3 className="text-sm font-semibold text-white mb-3">Item Details</h3>
                <p className="text-sm text-white/45 leading-relaxed">
                  {auction.item.details}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
