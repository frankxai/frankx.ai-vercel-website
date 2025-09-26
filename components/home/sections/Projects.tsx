'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'

import { projectMilestones } from '@/lib/hub'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 }
}

const statusStyles: Record<'shipping' | 'in-progress' | 'incubating', string> = {
  shipping: 'border-emerald-400/50 bg-emerald-500/10 text-emerald-200',
  'in-progress': 'border-amber-400/50 bg-amber-500/10 text-amber-200',
  incubating: 'border-sky-400/50 bg-sky-500/10 text-sky-200'
}

export default function Projects() {
  return (
    <section id="projects" className="bg-midnight-950 py-24 px-6">
      <div className="max-w-7xl mx-auto text-white">
        <motion.div className="max-w-3xl" {...fadeUp}>
          <h2 className="text-heading-2 font-semibold text-balance">Ship logs & manuscripts in motion</h2>
          <p className="mt-4 text-body text-neutral-300">
            Track the releases, books, and platform upgrades as they move from incubation to launch.
            Every milestone includes a doorway into the work.
          </p>
        </motion.div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {projectMilestones.map((milestone) => (
            <motion.article
              key={milestone.title}
              className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6 backdrop-blur"
              {...fadeUp}
            >
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest ${statusStyles[milestone.status]}`}
              >
                <CalendarDays className="w-4 h-4" aria-hidden="true" />
                {milestone.status.replace('-', ' ')}
              </span>
              <h3 className="mt-4 text-heading-5 font-semibold text-white">{milestone.title}</h3>
              <p className="mt-3 text-body-sm text-neutral-300 leading-relaxed">{milestone.description}</p>
              <p className="mt-3 text-xs text-white/60 uppercase tracking-widest">Focus</p>
              <p className="text-sm text-white/75">{milestone.focus}</p>
              {milestone.eta && (
                <p className="mt-4 text-xs text-white/60">{milestone.eta}</p>
              )}
              {milestone.cta && (
                <Link
                  href={milestone.cta.href}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition"
                >
                  {milestone.cta.label}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
