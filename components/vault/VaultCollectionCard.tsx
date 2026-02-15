'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Image as ImageIcon } from 'lucide-react'
import type { VaultCollection } from '@/lib/vault-types'

export function VaultCollectionCard({
  collection,
  index,
}: {
  collection: VaultCollection
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        href={`/vault/${collection.id}`}
        className={`group relative block overflow-hidden rounded-2xl border ${collection.borderAccent} bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-500`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={collection.coverImage}
            alt={collection.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/40 to-transparent" />

          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/70 text-sm">
            <ImageIcon className="w-4 h-4" />
            <span>{collection.count} assets</span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {collection.name}
            </h3>
            <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
          </div>
          <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
            {collection.description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
