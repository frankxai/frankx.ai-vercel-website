'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Lightbulb } from 'lucide-react'
import {
  IkigaiState,
  IKIGAI_STORAGE_KEY,
  emptyIkigai,
  ikigaiSteps,
} from './types'
import { CoachGPTCard } from './CoachGPTCard'

interface IkigaiWizardProps {
  value: IkigaiState
  onChange: (next: IkigaiState) => void
}

export function IkigaiWizard({ value, onChange }: IkigaiWizardProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = localStorage.getItem(IKIGAI_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<IkigaiState>
        onChange({ ...emptyIkigai, ...parsed })
      }
    } catch {
      /* ignore */
    }
    setHydrated(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') return
    try {
      localStorage.setItem(IKIGAI_STORAGE_KEY, JSON.stringify(value))
    } catch {
      /* quota exceeded or private mode — silent */
    }
  }, [value, hydrated])

  const step = ikigaiSteps[stepIndex]
  const currentValue = value[step.key]
  const progress = ((stepIndex + 1) / ikigaiSteps.length) * 100
  const isLast = stepIndex === ikigaiSteps.length - 1
  const completed = ikigaiSteps.filter((s) => value[s.key].trim().length > 0).length

  return (
    <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
      {/* Progress rail */}
      <div className="px-6 sm:px-8 pt-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Step {stepIndex + 1} of {ikigaiSteps.length}
          </p>
          <p className="text-xs text-zinc-500">
            {completed}/{ikigaiSteps.length} answered
          </p>
        </div>
        <div className="relative h-1 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-400 to-amber-400"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.key}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
          className="p-6 sm:p-8 space-y-5"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-violet-300 mb-2">
              {step.label}
            </p>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              {step.question}
            </h3>
            <p className="mt-3 text-sm text-zinc-400 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span>{step.hint}</span>
            </p>
          </div>

          {/* Examples */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
              Examples
            </p>
            <ul className="space-y-1.5">
              {step.examples.map((ex, i) => (
                <li
                  key={i}
                  className="text-sm text-zinc-400 flex items-start gap-2"
                >
                  <span className="text-zinc-600 mt-0.5">—</span>
                  <span>{ex}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Textarea */}
          <textarea
            value={currentValue}
            onChange={(e) =>
              onChange({ ...value, [step.key]: e.target.value })
            }
            placeholder="Write your answer here. Specificity beats volume."
            className="w-full h-36 px-4 py-3 bg-[#0a0a0b] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/20 resize-none leading-relaxed"
          />

          {/* Coach deep-link */}
          <CoachGPTCard
            seedPrompt={step.coachSeed}
            label={`Think with Coach GPT on "${step.label}"`}
          />

          {/* Nav */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
              disabled={stepIndex === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            {isLast ? (
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                <Check className="w-4 h-4" />
                Map complete — scroll to synthesis
              </div>
            ) : (
              <button
                onClick={() =>
                  setStepIndex((i) => Math.min(ikigaiSteps.length - 1, i + 1))
                }
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-400 hover:to-violet-500 transition-colors shadow-lg shadow-violet-500/20"
              >
                Next step
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Step dots */}
      <div className="px-6 sm:px-8 pb-6 flex items-center justify-center gap-2">
        {ikigaiSteps.map((s, i) => {
          const isActive = i === stepIndex
          const isAnswered = value[s.key].trim().length > 0
          return (
            <button
              key={s.key}
              onClick={() => setStepIndex(i)}
              aria-label={`Go to step ${i + 1}: ${s.label}`}
              className={`h-2 rounded-full transition-all ${
                isActive
                  ? 'w-8 bg-violet-400'
                  : isAnswered
                    ? 'w-2 bg-emerald-400/60 hover:bg-emerald-400'
                    : 'w-2 bg-white/[0.12] hover:bg-white/20'
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}
