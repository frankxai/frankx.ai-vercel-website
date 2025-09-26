'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { resourceCollections } from '@/lib/hub'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 }
}

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
          {resourceCollections.map((collection) => (
            <motion.article
              key={collection.id}
              className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8 backdrop-blur flex flex-col"
              {...fadeUp}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-heading-4 font-semibold">{collection.title}</h3>
              <p className="mt-3 text-body-sm text-neutral-300 leading-relaxed">{collection.description}</p>
              <p className="mt-4 text-xs uppercase tracking-widest text-white/70">Ideal for</p>
              <p className="mt-1 text-sm text-white/80 leading-relaxed">{collection.focus}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {collection.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/15 transition"
                    >
                      <div>
                        <p className="font-semibold text-white">{item.label}</p>
                        <p className="text-xs text-white/70">{item.type}</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:text-white" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
