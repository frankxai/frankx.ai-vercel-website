'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check, Sparkles } from 'lucide-react'

import { segmentProfiles } from '@/lib/hub'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 }
}

export default function SegmentProfiles() {
  return (
    <section id="segments" className="bg-midnight-950 py-24 px-6">
      <div className="max-w-7xl mx-auto text-white">
        <motion.div className="max-w-3xl" {...fadeUp}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            Designed for every circle
          </span>
          <h2 className="mt-4 text-heading-2 font-semibold text-balance">Your people, your work, your agents.</h2>
          <p className="mt-4 text-body text-neutral-300">
            Whether you are briefing executives, hosting a family workshop, or shipping a new release, these
            pathways show you where to begin and how to integrate each experience.
          </p>
        </motion.div>
        <div className="mt-14 grid lg:grid-cols-2 gap-8">
          {segmentProfiles.map((profile) => (
            <motion.article
              key={profile.id}
              className="h-full rounded-3xl border border-neutral-800 bg-neutral-900 p-8 backdrop-blur"
              {...fadeUp}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center">
                  <profile.icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-heading-4 font-semibold">{profile.title}</h3>
                  <p className="mt-2 text-body-sm text-neutral-300 leading-relaxed">{profile.description}</p>
                </div>
              </div>
              <p className="mt-6 text-body-sm text-neutral-300 leading-relaxed">{profile.transformation}</p>
              <ul className="mt-6 space-y-2 text-sm">
                {profile.needs.map((need) => (
                  <li key={need} className="flex items-start gap-2 text-white/80">
                    <Check className="w-4 h-4 mt-0.5 text-emerald-300" aria-hidden="true" />
                    <span>{need}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                {profile.ctas.map((cta) => (
                  <Link
                    key={cta.href}
                    href={cta.href}
                    className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition"
                  >
                    {cta.label}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/70">
                {profile.keywords.map((keyword) => (
                  <span key={keyword} className="rounded-full border border-white/20 px-3 py-1">
                    {keyword}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
