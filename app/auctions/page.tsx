'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Gavel, Clock } from 'lucide-react'
import AuctionCard from '@/components/auctions/AuctionCard'
import auctions from '@/data/auctions.json'

export default function AuctionsPage() {
  const activeAuctions = auctions.filter(a => a.status === 'active' || a.status === 'upcoming')
  const featuredAuctions = activeAuctions.filter(a => a.featured)
  const otherAuctions = activeAuctions.filter(a => !a.featured)

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-red-500/5" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-amber-500/8 rounded-full blur-[150px]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-10">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-white/70">Auctions</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-8">
              <Gavel className="w-4 h-4" />
              Live Auctions
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Limited{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Drops
              </span>
            </h1>

            <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10">
              Exclusive experiences, limited edition prints, and one-of-a-kind builds.
              Each auction is a chance to own something that won&apos;t be offered again.
            </p>

            <div className="flex items-center justify-center gap-6 text-white/40 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Time-limited</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{activeAuctions.length} Active</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Auctions */}
      {featuredAuctions.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Featured
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAuctions.map((auction, index) => (
              <motion.div
                key={auction.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AuctionCard auction={auction} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Other Auctions */}
      {otherAuctions.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <h2 className="text-xl font-bold text-white mb-6">All Auctions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherAuctions.map((auction, index) => (
              <motion.div
                key={auction.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AuctionCard auction={auction} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">How Auctions Work</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Browse', description: 'Find exclusive items — limited edition prints, coaching sessions, custom builds.' },
              { step: '02', title: 'Buy Now or Bid', description: 'Skip the wait with Buy Now, or place a bid and compete for the best price.' },
              { step: '03', title: 'Win & Receive', description: 'Winners get instant delivery for digital items, or booking links for experiences.' },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="text-3xl font-bold text-amber-400/30 mb-2">{item.step}</div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}
