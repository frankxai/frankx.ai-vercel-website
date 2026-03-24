'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp } from '@/lib/motion'

import { resourceCollections } from '@/lib/hub'
import { GlowCard } from '@/components/ui/glow-card'

// Cycle through accent colors for the three resource collections
const collectionColors = ['violet', 'cyan', 'amber'] as const

export default function Resources() {
  return (
    <section id="resources" className="bg-midnight-950 py-24 px-6">
      <div className="max-w-7xl mx-auto text-white">
        <motion.div className="max-w-3xl" {...fadeUp}>
          <h2 className="text-heading-2 font-semibold text-balance">Resource universes for every mission</h2>
          <p className="mt-4 text-body text-neutral-300">
            Choose the path that matches your current momentum. Every item links directly into the
            operating system we build together.
          </p>
        </motion.div>
        <div className="mt-14 grid lg:grid-cols-3 gap-8">
          {resourceCollections.map((collection, i) => (
            <motion.div key={collection.id} {...fadeUp} transition={{ duration: 0.3 }}>
              <GlowCard color={collectionColors[i % collectionColors.length]} className="p-8 h-full flex flex-col">
                <h3 className="text-heading-4 font-semibold text-white">{collection.title}</h3>
                <p className="mt-3 text-body-sm text-white/60 leading-relaxed">{collection.description}</p>
                <p className="mt-4 text-xs uppercase tracking-widest text-white/40">Ideal for</p>
                <p className="mt-1 text-sm text-white/70 leading-relaxed">{collection.focus}</p>
                <ul className="mt-6 space-y-2.5 text-sm flex-1">
                  {collection.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 hover:bg-white/[0.08] hover:border-white/[0.16] transition-all duration-200"
                      >
                        <div>
                          <p className="font-semibold text-white">{item.label}</p>
                          <p className="text-xs text-white/50">{item.type}</p>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
