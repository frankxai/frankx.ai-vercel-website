'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, Filter } from 'lucide-react'
import TradingCard from '@/components/collectibles/TradingCard'
import CheckoutButton from '@/components/commerce/CheckoutButton'
import cardData from '@/data/trading-cards.json'

const rarityFilters = ['All', 'common', 'uncommon', 'rare', 'legendary'] as const
const collectionFilters = ['All', 'acos-skills', 'acos-agents', 'arcanea-gates'] as const

const collectionLabels: Record<string, string> = {
  'All': 'All Cards',
  'acos-skills': 'ACOS Skills',
  'acos-agents': 'ACOS Agents',
  'arcanea-gates': 'Arcanea Gates',
}

const rarityLabels: Record<string, string> = {
  'All': 'All Rarities',
  'common': 'Common',
  'uncommon': 'Uncommon',
  'rare': 'Rare',
  'legendary': 'Legendary',
}

export default function TradingCardsPage() {
  const [rarity, setRarity] = useState<string>('All')
  const [collection, setCollection] = useState<string>('All')

  const filtered = useMemo(() => {
    return cardData.cards.filter(card => {
      const matchRarity = rarity === 'All' || card.rarity === rarity
      const matchCollection = collection === 'All' || card.collection === collection
      return matchRarity && matchCollection
    })
  }, [rarity, collection])

  const pricing = cardData.collection.pricing

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-amber-500/5" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-10">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <span>/</span>
            <Link href="/collectibles" className="hover:text-white transition-colors">Collectibles</Link>
            <span>/</span>
            <span className="text-white/70">Trading Cards</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Genesis Set v1.0
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              ACOS{' '}
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">
                Trading Cards
              </span>
            </h1>

            <p className="text-lg text-white/50 max-w-2xl mb-6">
              40 cards. 22 skills. 8 agents. 10 gates. Each card captures a piece of the ACOS
              ecosystem with stats, lore, and rarity tiers. Click any card to flip and reveal its story.
            </p>

            {/* Bundle pricing */}
            <div className="flex flex-wrap items-center gap-4">
              <CheckoutButton price={pricing.completeSetDigital} label="Complete Set (Digital)" size="md" />
              <CheckoutButton price={pricing.boosterPackDigital} label={`Booster Pack (${pricing.boosterPackCards} cards)`} size="md" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-6 pb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Filter className="w-4 h-4 text-white/30" />

          {/* Collection filter */}
          <div className="flex items-center gap-1 flex-wrap">
            {collectionFilters.map(c => (
              <button
                key={c}
                onClick={() => setCollection(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  collection === c
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'bg-white/[0.04] text-white/40 border border-transparent hover:text-white/60'
                }`}
              >
                {collectionLabels[c]}
              </button>
            ))}
          </div>

          <div className="w-px h-4 bg-white/10 hidden sm:block" />

          {/* Rarity filter */}
          <div className="flex items-center gap-1 flex-wrap">
            {rarityFilters.map(r => (
              <button
                key={r}
                onClick={() => setRarity(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  rarity === r
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'bg-white/[0.04] text-white/40 border border-transparent hover:text-white/60'
                }`}
              >
                {rarityLabels[r]}
              </button>
            ))}
          </div>

          <span className="text-xs text-white/30 ml-auto">{filtered.length} cards</span>
        </div>
      </section>

      {/* Card Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index * 0.03, 0.5) }}
            >
              <TradingCard
                card={card as any}
                showPrice
                price={pricing.digital[card.rarity as keyof typeof pricing.digital]}
              />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/40">No cards match your filters.</p>
            <button
              onClick={() => { setRarity('All'); setCollection('All') }}
              className="mt-3 text-purple-400 text-sm hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Set info */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Set Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Individual Cards</h3>
              <div className="space-y-2">
                {(['common', 'uncommon', 'rare', 'legendary'] as const).map(r => (
                  <div key={r} className="flex items-center justify-between">
                    <span className="text-sm text-white/50 capitalize">{r}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-white/70">${pricing.digital[r]} digital</span>
                      <span className="text-white/40">${pricing.physical[r]} physical</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Bundles</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-sm text-white/70">Complete Set (Digital)</span>
                  <span className="text-lg font-bold text-white">${pricing.completeSetDigital}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-sm text-white/70">Complete Set (Physical)</span>
                  <span className="text-lg font-bold text-white">${pricing.completeSetPhysical}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-sm text-white/70">Booster Pack ({pricing.boosterPackCards} cards)</span>
                  <span className="text-lg font-bold text-white">${pricing.boosterPackDigital}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
