'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { keywordClusters } from '@/lib/hub'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 }
}

export default function KeywordClusters() {
  return (
    <section id="search" className="bg-midnight-950 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div className="max-w-3xl" {...fadeUp}>
          <h2 className="text-heading-2 font-semibold text-white text-balance">
            Built around the searches you and your agents run
          </h2>
          <p className="mt-4 text-body text-neutral-300">
            These keyword constellations guide the site architecture, ensuring every query leads to
            depth, clarity, and an action you can take next.
          </p>
        </motion.div>
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {keywordClusters.map((cluster) => (
            <motion.article
              key={cluster.cluster}
              className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6"
              {...fadeUp}
            >
              <h3 className="text-heading-5 font-semibold text-white">{cluster.cluster}</h3>
              <p className="mt-2 text-body-sm text-neutral-300 leading-relaxed">{cluster.intent}</p>
              <div className="mt-4 text-xs text-primary-400 font-semibold uppercase tracking-widest">
                Primary Keyword
              </div>
              <p className="text-sm text-white mt-1">{cluster.primaryKeyword}</p>
              <div className="mt-4 text-xs uppercase tracking-widest text-neutral-400">
                Supporting Signals
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {cluster.supportingKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full bg-secondary-800 text-secondary-200 px-3 py-1 text-xs"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <Link
                href={cluster.link}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-400 hover:underline"
              >
                Explore cornerstone content
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
