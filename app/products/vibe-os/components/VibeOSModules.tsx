'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Library, Workflow, Heart, Sliders } from 'lucide-react'
import type { ProductModule } from '@/types/products'

const CONCEPT_NOTES_HREF = '/products/vibe-os/docs'
const moduleIcons = [Library, Workflow, Heart, Sliders]

export default function VibeOSModules({ modules }: { modules: ProductModule[] }) {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-void via-space to-void" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_30%_at_50%_0%,rgba(139,92,246,0.08),transparent_50%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-300/70">Proposed app scope</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            What a future app could support
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/60">
            These are design directions, not available modules. The concept notes explain a manual experiment you can run with tools you already control.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {modules.map((module, index) => {
              const Icon = moduleIcons[index % moduleIcons.length]
              return (
                <motion.article
                  key={module.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="spotlight-card p-6"
                >
                  <Icon className="h-5 w-5 text-cyan-300" />
                  <h3 className="mt-4 font-semibold text-white">{module.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{module.description}</p>
                </motion.article>
              )
            })}
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-full rounded-[2rem] border border-cyan-400/20 bg-cyan-500/[0.06] p-8">
            <BookOpen className="h-7 w-7 text-cyan-300" />
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200/70">Try the idea manually</p>
            <h3 className="mt-3 text-2xl font-bold text-white">Start with the concept notes</h3>
            <p className="mt-4 leading-relaxed text-white/65">
              Set up a private log in a note or spreadsheet, record a few observations, and review them as hypotheses. No signup is required.
            </p>
            <Link
              href={CONCEPT_NOTES_HREF}
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-6 py-3 font-semibold text-cyan-100 transition-[color,background-color,border-color] hover:border-cyan-200/50 hover:bg-cyan-400/15 hover:text-white"
            >
              Read the concept notes
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
