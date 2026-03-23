'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Sparkles, Hexagon, Music, Layers } from 'lucide-react'

const collections = [
  {
    id: 'trading-cards',
    title: 'ACOS Genesis Set',
    subtitle: '40-Card Trading Card Collection',
    description: '22 ACOS Skills, 8 Specialist Agents, and 10 Arcanea Gates. Each card features stats, lore, and a rarity tier. Collect the full set to unlock the complete system.',
    href: '/collectibles/trading-cards',
    icon: Hexagon,
    count: 40,
    priceRange: '$5 – $47',
    accent: 'from-purple-500/15 to-amber-500/15',
    border: 'border-purple-500/30',
    stats: [
      { label: 'Common', value: '12', color: 'text-cyan-400' },
      { label: 'Uncommon', value: '10', color: 'text-emerald-400' },
      { label: 'Rare', value: '8', color: 'text-purple-400' },
      { label: 'Legendary', value: '10', color: 'text-amber-400' },
    ],
    badge: 'Genesis',
  },
  {
    id: 'instruments',
    title: 'Bio-Tech Instruments',
    subtitle: 'Limited Edition Design Prints',
    description: 'Grand pianos with neural network strings. Violins with mycelium acoustics. Each design is a numbered edition — engineering precision meets living intelligence.',
    href: '/collectibles/instruments',
    icon: Music,
    count: 6,
    priceRange: '$27 – $97',
    accent: 'from-cyan-500/15 to-emerald-500/15',
    border: 'border-cyan-500/30',
    stats: [
      { label: 'Designs', value: '6', color: 'text-cyan-400' },
      { label: 'Per Edition', value: '10', color: 'text-white/60' },
    ],
    badge: 'Limited',
  },
  {
    id: 'mixed-drops',
    title: 'Mixed Drops',
    subtitle: 'Weekly Variety Packs',
    description: 'Rotating bundles mixing skill cards, art prints, and prompt packs. Limited to 100 packs per drop. Each week is different — collect them all.',
    href: '/shop',
    icon: Layers,
    count: 100,
    priceRange: '$47/pack',
    accent: 'from-amber-500/15 to-orange-500/15',
    border: 'border-amber-500/30',
    stats: [
      { label: 'Per Week', value: '100', color: 'text-amber-400' },
      { label: 'Items/Pack', value: '3', color: 'text-white/60' },
    ],
    badge: 'Coming Soon',
  },
]

export default function CollectiblesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-amber-500/5" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-10">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-white/70">Collectibles</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Collectibles
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Collect.{' '}
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">
                Trade.
              </span>{' '}
              Own.
            </h1>

            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Digital and physical collectibles from the ACOS ecosystem.
              Trading cards, limited prints, and exclusive drops.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="space-y-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={collection.href}
                className={`group block rounded-2xl border ${collection.border} bg-gradient-to-r ${collection.accent} backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-500 p-6 md:p-8`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                    <collection.icon className="w-8 h-8 text-white/40" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {collection.title}
                      </h2>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/10 text-white/60 border border-white/10">
                        {collection.badge}
                      </span>
                    </div>
                    <p className="text-sm text-white/40 mb-2">{collection.subtitle}</p>
                    <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
                      {collection.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mt-4">
                      {collection.stats.map(stat => (
                        <div key={stat.label} className="flex items-center gap-1.5">
                          <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
                          <span className="text-xs text-white/30">{stat.label}</span>
                        </div>
                      ))}
                      <span className="text-xs text-white/30 ml-auto">{collection.priceRange}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="w-6 h-6 text-white/20 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
