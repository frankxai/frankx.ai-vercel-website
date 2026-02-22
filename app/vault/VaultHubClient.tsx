'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Search } from 'lucide-react'
import type { VaultCollection } from '@/lib/vault-types'
import { VaultCollectionCard } from '@/components/vault/VaultCollectionCard'
import { VaultStats } from '@/components/vault/VaultStats'

export function VaultHubClient({
  collections,
  totalAssets,
  totalCollections,
  totalSize,
  formats,
}: {
  collections: VaultCollection[]
  totalAssets: number
  totalCollections: number
  totalSize: number
  formats: Record<string, number>
}) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCollections = useMemo(() => {
    if (!searchQuery) return collections
    const q = searchQuery.toLowerCase()
    return collections.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
    )
  }, [collections, searchQuery])

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[128px]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Visual Asset Library
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Arcanea
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
                Vault
              </span>
            </h1>

            <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10">
              The complete visual asset library. Every AI-generated image, infographic,
              mascot concept, and architectural diagram — organized and browsable.
            </p>

            <VaultStats
              totalAssets={totalAssets}
              totalCollections={totalCollections}
              totalSize={totalSize}
              formats={formats}
            />
          </motion.div>
        </div>
      </section>

      {/* Search */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search collections..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-cyan-500/40 focus:outline-none transition-colors"
          />
        </div>
      </section>

      {/* Collections Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollections.map((collection, i) => (
            <VaultCollectionCard
              key={collection.id}
              collection={collection}
              index={i}
            />
          ))}
        </div>

        {filteredCollections.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">No collections match &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-cyan-400 hover:text-cyan-300 text-sm"
            >
              Clear search
            </button>
          </div>
        )}
      </section>

      {/* Cross-link to Gallery */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 text-center">
          <p className="text-white/50 mb-4">
            Looking for the curated art exhibition?
          </p>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
          >
            Visit the Gallery
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  )
}
