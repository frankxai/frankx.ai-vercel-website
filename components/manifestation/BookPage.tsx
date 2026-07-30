'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BookOpen, Check, X, Sparkles } from 'lucide-react'
import { SectionHeading, ExperimentList } from '@/components/manifestation/shared'
import type { BookPrinciple, Experiment } from '@/data/manifestation'

export interface BookPageProps {
  title: string
  author: string
  year: number
  oneLine: string
  honestTake: string
  principlesHeading: string
  principlesIntro: string
  principles: BookPrinciple[]
  whatWorked?: string[]
  whatToIgnore?: string[]
  experiments: Experiment[]
  experimentsIntro: string
}

export default function BookPage(props: BookPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/12 via-transparent to-transparent" />
        <div className="relative max-w-3xl mx-auto px-6">
          <Link
            href="/manifestation"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Manifestation hub
          </Link>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 text-xs text-white/40 mb-4">
              <BookOpen className="w-4 h-4" /> {props.author} · {props.year}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">{props.title}</h1>
            <p className="text-xl text-white/60">{props.oneLine}</p>
          </motion.div>
        </div>
      </section>

      {/* Honest take */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.05] to-transparent p-8">
          <p className="text-[11px] tracking-[0.2em] uppercase text-amber-300/70 mb-3">My honest take</p>
          <p className="text-lg text-white/70 leading-relaxed">{props.honestTake}</p>
        </div>
      </section>

      {/* Principles: claim → reframe */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <SectionHeading title={props.principlesHeading} intro={props.principlesIntro} />
        <div className="space-y-4">
          {props.principles.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.04 * i }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7"
            >
              <h3 className="text-lg font-bold text-white mb-3">{p.name}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1.5">The claim</p>
                  <p className="text-white/60">{p.claim}</p>
                </div>
                <div className="rounded-xl bg-violet-500/[0.04] border border-violet-500/15 p-4">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-violet-300/70 mb-1.5">The grounded reframe</p>
                  <p className="text-white/75">{p.reframe}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What worked / what to ignore */}
      {(props.whatWorked || props.whatToIgnore) && (
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <div className="grid md:grid-cols-2 gap-5">
            {props.whatWorked && (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-7">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-400" /> What worked
                </h3>
                <ul className="space-y-3">
                  {props.whatWorked.map((w, i) => (
                    <li key={i} className="flex gap-2.5 text-white/65">
                      <Check className="w-4 h-4 text-emerald-400/70 mt-1 shrink-0" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {props.whatToIgnore && (
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.03] p-7">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <X className="w-5 h-5 text-rose-400" /> What to ignore
                </h3>
                <ul className="space-y-3">
                  {props.whatToIgnore.map((w, i) => (
                    <li key={i} className="flex gap-2.5 text-white/65">
                      <X className="w-4 h-4 text-rose-400/70 mt-1 shrink-0" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Experiments */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <SectionHeading eyebrow="Test it yourself" title="Try these" intro={props.experimentsIntro} />
        <ExperimentList experiments={props.experiments} />
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.07] to-transparent p-8 text-center">
          <div className="inline-flex p-3 rounded-xl bg-violet-500/10 text-violet-300 mb-5">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Run it as a loop</h2>
          <p className="text-white/60 mb-6 max-w-xl mx-auto">
            The books are the starting point. The practice is a daily loop — vision, felt state,
            attention, action, shipped. The 10-day quest walks you through it.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/manifestation/quest"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
            >
              Start the quest <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/manifestation"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white/80 font-medium rounded-full hover:bg-white/5 transition-colors"
            >
              Back to the hub
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
