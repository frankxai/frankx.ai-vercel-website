'use client'

import { use } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, Shield, Gavel } from 'lucide-react'
import CountdownTimer from '@/components/auctions/CountdownTimer'
import CheckoutButton from '@/components/commerce/CheckoutButton'
import auctions from '@/data/auctions.json'
import { notFound } from 'next/navigation'

export default function AuctionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const auction = auctions.find(a => a.slug === id)

  if (!auction) return notFound()

  const currentPrice = auction.currentBid > 0 ? auction.currentBid : auction.startingBid

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <section className="relative pt-24 pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent" />

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
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10">
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

            {/* Details */}
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

              {/* Countdown */}
              <div className="mb-8">
                <div className="flex items-center gap-2 text-white/40 text-sm mb-3">
                  <Clock className="w-4 h-4" />
                  <span>Ends in</span>
                </div>
                <CountdownTimer endTime={auction.endTime} />
              </div>

              {/* Pricing */}
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 mb-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <span className="text-xs text-white/40">
                      {auction.bidCount > 0 ? 'Current bid' : 'Starting bid'}
                    </span>
                    <div className="text-3xl font-bold text-white">${currentPrice}</div>
                    {auction.bidCount > 0 && (
                      <span className="text-xs text-white/30">{auction.bidCount} bids</span>
                    )}
                  </div>
                  {auction.buyNowPrice && (
                    <div>
                      <span className="text-xs text-white/40">Reserve at</span>
                      <div className="text-3xl font-bold text-amber-400">${auction.buyNowPrice}</div>
                      <span className="text-xs text-white/30">Skip the bidding</span>
                    </div>
                  )}
                </div>

                {/* Reserve button */}
                {auction.buyNowPrice && (
                  <CheckoutButton
                    variantId={auction.lemonSqueezy?.productId || undefined}
                    price={auction.buyNowPrice}
                    label="Reserve invite"
                    size="lg"
                    className="w-full justify-center"
                  />
                )}

                {/* Bid placeholder */}
                <div className="mt-4 p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] text-center">
                  <Gavel aria-hidden className="w-5 h-5 text-white/30 mx-auto mb-2" />
                  <p className="text-sm text-white/40">
                    Live bidding opens at launch. Reserve now to secure this item at the listed price.
                  </p>
                </div>
              </div>

              {/* Item details */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <h3 className="text-sm font-semibold text-white mb-3">Item details</h3>
                <p className="text-sm text-white/45 leading-relaxed mb-4">
                  {auction.item.details}
                </p>
                <p className="text-xs text-white/35">
                  Questions about this drop?{' '}
                  <a
                    href="mailto:frank@frankx.ai"
                    className="text-cyan-400 underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] rounded"
                  >
                    frank@frankx.ai
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
