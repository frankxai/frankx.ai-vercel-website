'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Sparkles } from 'lucide-react'
import FrankOmega from '@/components/FrankOmega'

export default function NewsletterCTA() {
  return (
    <>
      {/* How it works — Aurora accented */}
      <section className="relative border-t border-white/5 py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 right-0 h-56 w-72 rounded-full bg-cyan-500/[0.05] blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-48 w-60 rounded-full bg-violet-500/[0.04] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
              How it works
            </h2>
            <p className="text-slate-400">
              Each stream is independent. Subscribe to what matters.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Pick your streams',
                desc: 'Choose one or all. Each has its own cadence and content type.',
              },
              {
                step: '02',
                title: 'Get curated content',
                desc: 'Not repurposed blog posts. Original insights crafted for each stream.',
              },
              {
                step: '03',
                title: 'Stay in control',
                desc: 'Manage each stream independently. Unsubscribe from one without losing others.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6"
              >
                <div className="mb-3 text-2xl font-bold text-white/10">
                  {item.step}
                </div>
                <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-violet-900/20 to-cyan-900/20 p-10 text-center overflow-hidden"
          >
            {/* Aurora orbs inside card */}
            <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-violet-500/[0.12] blur-[80px] pointer-events-none" aria-hidden />
            <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-cyan-500/[0.10] blur-[80px] pointer-events-none" aria-hidden />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full bg-emerald-500/[0.06] blur-[60px] pointer-events-none" aria-hidden />
            <div className="relative mx-auto mb-6">
              <FrankOmega variant="pixar-blue" size="sm" glow rounded />
            </div>
            <h2 className="relative mb-3 text-2xl font-bold text-white sm:text-3xl">
              Not sure which stream?
            </h2>
            <p className="relative mx-auto mb-4 max-w-md text-slate-400">
              Start with Creation Chronicles — it covers everything and
              you&apos;ll see what resonates.
            </p>
            <p className="relative mx-auto mb-8 max-w-sm text-xs text-blue-400/60 italic">
              &ldquo;When there&apos;s something honest to share, you&apos;ll get one note. No drip sequence. No fluff.&rdquo; — FRANK-Ω
            </p>
            <div className="relative flex flex-wrap justify-center gap-4">
              <a
                href="#creation-chronicles"
                className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" />
                Start with the main stream
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/blog"
                className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-all hover:bg-white/5"
              >
                Read the blog first
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
