'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Image as ImageIcon } from 'lucide-react'
import type { VaultCollection } from '@/lib/vault-types'
import { VaultGrid } from '@/components/vault/VaultGrid'

export function VaultCollectionClient({
  collection,
}: {
  collection: VaultCollection
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />

        {/* Cover image background (blurred) */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src={collection.coverImage}
            alt=""
            fill
            className="object-cover blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/50 text-sm mb-10">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <Link href="/vault" className="hover:text-white transition-colors">Vault</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/70">{collection.name}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${collection.accent} border ${collection.borderAccent} text-white/70 text-sm font-medium mb-6`}>
              <ImageIcon className="w-4 h-4" />
              {collection.count} assets
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              {collection.name}
            </h1>

            <p className="text-lg text-white/50 max-w-3xl mb-8">
              {collection.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <VaultGrid assets={collection.assets} />
      </section>

      {/* Back to Vault */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <Link
          href="/vault"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to ArcaneaVault
        </Link>
      </section>
    </div>
  )
}
