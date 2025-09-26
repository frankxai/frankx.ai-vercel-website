'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { updateEntries } from '@/lib/hub'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 }
}

export default function Updates() {
  return (
    <section id="updates" className="bg-midnight-950 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div className="max-w-3xl" {...fadeUp}>
          <h2 className="text-4xl font-semibold text-white text-balance">Latest intelligence drops</h2>
          <p className="mt-4 text-white/70">
            Stay ahead with the newest essays, resources, and program milestones. Each update is
            designed to be actionable for you and the teams you lead.
          </p>
        </motion.div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {updateEntries.map((entry) => (
            <motion.article
              key={entry.href}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              {...fadeUp}
              transition={{ duration: 0.4 }}
            >
              <div className="text-xs font-semibold uppercase tracking-widest text-sky-300">
                {entry.type}
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">
                <Link href={entry.href} className="hover:text-primary-600 dark:hover:text-sky-300 transition">
                  {entry.title}
                </Link>
              </h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{entry.summary}</p>
              <div className="mt-6 flex items-center justify-between text-xs text-white/60">
                <span>
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                <Link href={entry.href} className="inline-flex items-center gap-1 font-semibold">
                  Read
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
