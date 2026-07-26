'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  Brain,
  Filter,
  Music,
  Sparkles,
  Sunrise,
  PenLine,
  NotebookPen,
  FlaskConical,
  Eye,
  Hammer,
  Repeat,
  type LucideIcon,
} from 'lucide-react'
import type { Mechanism, Experiment, Exercise, IdentityTier } from '@/data/manifestation'

// Shared lucide icon resolver — keeps data files string-keyed and pages clean.
const iconMap: Record<string, LucideIcon> = {
  Brain,
  Filter,
  Music,
  Sparkles,
  Sunrise,
  PenLine,
  NotebookPen,
  FlaskConical,
  Eye,
  Hammer,
  Repeat,
}

function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = iconMap[name] ?? Sparkles
  return <Cmp className={className} />
}

const gradeStyle: Record<Mechanism['grade'], { label: string; cls: string }> = {
  evidence: { label: 'Evidence-backed', cls: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
  practice: { label: 'Useful practice', cls: 'bg-violet-500/10 text-violet-300 border-violet-500/20' },
  belief: { label: 'Belief, held lightly', cls: 'bg-amber-500/10 text-amber-300 border-amber-500/20' },
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string
  title: string
  intro?: string
}) {
  return (
    <div className="max-w-3xl mb-10">
      {eyebrow && (
        <p className="text-[11px] tracking-[0.25em] uppercase text-violet-300/70 mb-3">{eyebrow}</p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
      {intro && <p className="text-lg text-white/60">{intro}</p>}
    </div>
  )
}

export function MechanismGrid({ mechanisms }: { mechanisms: Mechanism[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {mechanisms.map((m, i) => {
        const g = gradeStyle[m.grade]
        return (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.05 * i }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-7"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="inline-flex p-3 rounded-xl bg-violet-500/10 text-violet-300">
                <Icon name={m.icon} className="w-6 h-6" />
              </div>
              <span className={`text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border ${g.cls}`}>
                {g.label}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{m.title}</h3>
            <p className="text-white/60 mb-4">{m.description}</p>
            <p className="text-sm text-white/40 border-t border-white/5 pt-3">
              <span className="text-white/55 font-medium">Why it works: </span>
              {m.evidence}
            </p>
          </motion.div>
        )
      })}
    </div>
  )
}

const tagLabel: Record<Experiment['tag'], string> = {
  imagination: 'Imagination',
  attention: 'Attention',
  state: 'State',
  ai: 'AI',
  system: 'System',
}

export function ExperimentList({ experiments }: { experiments: Experiment[] }) {
  return (
    <div className="space-y-5">
      {experiments.map((x, i) => (
        <motion.div
          key={x.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.04 * i }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-7"
        >
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
              {tagLabel[x.tag]}
            </span>
            <span className="text-xs text-white/40">{x.duration}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{x.title}</h3>
          <p className="text-white/55 italic mb-4">
            <span className="not-italic text-white/40 text-sm uppercase tracking-wide mr-2">Hypothesis</span>
            {x.hypothesis}
          </p>
          <ol className="space-y-2 mb-4">
            {x.protocol.map((step, si) => (
              <li key={si} className="flex gap-3 text-white/65">
                <span className="shrink-0 w-6 h-6 rounded-full bg-white/5 text-white/50 text-xs flex items-center justify-center mt-0.5">
                  {si + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="text-sm text-white/50 border-t border-white/5 pt-3">
            <span className="text-emerald-300/80 font-medium">Measure: </span>
            {x.measure}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

export function ExerciseGrid({ exercises }: { exercises: Exercise[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {exercises.map((ex, i) => (
        <motion.div
          key={ex.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.04 * i }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex p-2.5 rounded-xl bg-violet-500/10 text-violet-300">
              <Icon name={ex.icon} className="w-5 h-5" />
            </div>
            <span className="text-xs text-white/40">{ex.duration}</span>
          </div>
          <h3 className="font-bold text-white mb-1.5">{ex.title}</h3>
          <p className="text-sm text-white/50 mb-4">{ex.description}</p>
          <ul className="space-y-1.5">
            {ex.steps.map((s, si) => (
              <li key={si} className="flex gap-2 text-sm text-white/60">
                <ArrowRight className="w-3.5 h-3.5 text-violet-300/60 mt-1 shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  )
}

export function IdentityProgression({ tiers }: { tiers: IdentityTier[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {tiers.map((t, i) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.08 * i }}
          className={`relative rounded-2xl border p-7 ${
            i === 1
              ? 'border-violet-500/30 bg-gradient-to-br from-violet-500/[0.06] to-transparent'
              : 'border-white/10 bg-white/[0.02]'
          }`}
        >
          <span className="text-[11px] tracking-[0.2em] uppercase text-white/40">Stage {i + 1}</span>
          <h3 className="text-2xl font-bold text-white mt-2 mb-1">{t.name}</h3>
          <p className="text-violet-300/80 mb-4">{t.tagline}</p>
          <p className="text-white/60 mb-5">{t.description}</p>
          <ul className="space-y-2">
            {t.markers.map((m, mi) => (
              <li key={mi} className="flex gap-2.5 text-sm text-white/65">
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-violet-400 mt-2" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  )
}

export function FaqList({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6"
        >
          <summary className="cursor-pointer font-semibold text-white list-none flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
            {faq.question}
            <ArrowRight className="w-4 h-4 text-white/30 group-open:rotate-90 transition-transform shrink-0" />
          </summary>
          <p className="text-white/60 mt-3">{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}
