'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, CalendarDays } from 'lucide-react'
import { fadeUp } from '@/lib/motion'

import { atlasActions, atlasMetrics, atlasVolumes } from '@/lib/intelligence-atlas'

export default function IntelligenceAtlasSpotlight() {
  const upcomingAtlasVolumes = atlasVolumes.filter((volume) => volume.number !== 1).slice(0, 3)

  return (
    <section id="intelligence-atlas" className="bg-midnight-950 py-24 px-6">
      <div className="max-w-7xl mx-auto text-white">
        <motion.div className="max-w-3xl" {...fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs uppercase tracking-widest text-white/70">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Intelligence Atlas 2025
          </span>
          <h2 className="mt-4 text-heading-2 font-semibold text-balance">
            Track the 100,000-word roadmap guiding FrankX creators, executives, and families.
          </h2>
          <p className="mt-4 text-body text-neutral-300">
            Volume I ships today with adoption metrics, governance rituals, and builder-ready frameworks. Nine companion volumes follow monthly, converting field research into playbooks you can deploy.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <motion.article
            className="rounded-4xl border border-neutral-800 bg-gradient-to-br from-primary-500/15 via-neutral-900 to-neutral-950 p-10 backdrop-blur"
            {...fadeUp}
            transition={{ duration: 0.35 }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">
              Volume I — Architecting the Agentic Era
            </div>
            <h3 className="mt-4 text-heading-3 font-semibold text-white">
              Go inside the flagship report fueling the atlas.
            </h3>
            <p className="mt-3 text-body-sm text-neutral-300 leading-relaxed">
              Use the executive summary, adoption heat map, agent readiness assessments, and governance toolkits to align your team. Then keep pace with the roadmap by subscribing to atlas alerts and contribution calls.
            </p>
            <div className="mt-8 space-y-4">
              {atlasActions.map((action) => {
                const isExternal = action.href.startsWith('http') || action.href.startsWith('mailto:')

                const actionContent = (
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">{action.title}</p>
                      <p className="mt-1 text-xs text-white/70 leading-relaxed">{action.description}</p>
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50 whitespace-nowrap">
                      {action.label}
                    </span>
                  </div>
                )

                if (isExternal) {
                  return (
                    <a
                      key={action.href}
                      href={action.href}
                      className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition hover:border-white/25 hover:bg-white/10"
                    >
                      {actionContent}
                    </a>
                  )
                }

                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition hover:border-white/25 hover:bg-white/10"
                  >
                    {actionContent}
                  </Link>
                )
              })}
            </div>
          </motion.article>

          <motion.div className="grid gap-8" {...fadeUp} transition={{ duration: 0.4 }}>
            <div className="grid gap-6 sm:grid-cols-3">
              {atlasMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/75 backdrop-blur"
                >
                  <div className="text-3xl font-semibold text-white">{metric.value}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.35em] text-white/60">{metric.label}</div>
                  <p className="mt-3 text-xs leading-relaxed">{metric.detail}</p>
                </div>
              ))}
            </div>

            <div className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white">Upcoming volumes</h4>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/60">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  2025 cadence
                </span>
              </div>
              <div className="mt-4 space-y-4">
                {upcomingAtlasVolumes.map((volume) => (
                  <div key={volume.number} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-white">{volume.title}</p>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/50">
                        {volume.status}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-white/70 leading-relaxed">{volume.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.35em] text-white/60">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{volume.release}</span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{volume.wordCount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
