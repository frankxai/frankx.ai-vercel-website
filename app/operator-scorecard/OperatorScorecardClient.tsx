'use client'

import { useMemo, useState, type FormEvent } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Lock, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react'

import { QUESTIONS, scoreScorecard, type ScorecardResult } from '@/lib/scorecard/engine'
import { CTA_BY_TIER } from '@/lib/scorecard/cta'
import { DimensionRadar } from '@/components/scorecard/DimensionRadar'

type Stage = 'intro' | 'question' | 'gate' | 'report'

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export default function OperatorScorecardClient() {
  const shouldReduceMotion = useReducedMotion()
  const [stage, setStage] = useState<Stage>('intro')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [gateError, setGateError] = useState<string | null>(null)

  const totalQuestions = QUESTIONS.length
  const activeQuestion = QUESTIONS[step]
  const chosenOptionId = activeQuestion ? answers[activeQuestion.id] : undefined

  const result: ScorecardResult | null = useMemo(() => {
    if (stage === 'question' || stage === 'intro') return null
    return scoreScorecard(answers)
  }, [stage, answers])

  const progress = stage === 'intro' ? 0 : Math.round(((step + (chosenOptionId ? 1 : 0)) / totalQuestions) * 100)

  function selectAnswer(optionId: string) {
    if (!activeQuestion) return
    setAnswers((prev) => ({ ...prev, [activeQuestion.id]: optionId }))
  }

  function goNext() {
    if (step < totalQuestions - 1) {
      setStep((s) => s + 1)
    } else {
      setStage('gate')
    }
  }

  function goBack() {
    if (step > 0) setStep((s) => s - 1)
  }

  async function submitEmail(e: FormEvent) {
    e.preventDefault()
    setGateError(null)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setGateError('Enter a valid email address.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          listType: 'operator-scorecard',
          source: 'operator-scorecard',
        }),
      })

      if (res.ok) {
        setStage('report')
        return
      }

      const data = await res.json().catch(() => ({}))
      // Graceful dev fallback: if the email service simply isn't configured
      // locally (no RESEND_API_KEY), don't block the report behind a 500 —
      // only block on real validation errors (bad email, already subscribed).
      if (res.status === 500 && /not configured/i.test(data?.error ?? '')) {
        setStage('report')
        return
      }

      setGateError(data?.error ?? 'Could not save your email. Please try again.')
    } catch {
      // Network failure in local dev — same graceful fallback.
      setStage('report')
    } finally {
      setSubmitting(false)
    }
  }

  function restart() {
    setStage('intro')
    setStep(0)
    setAnswers({})
    setGateError(null)
  }

  return (
    <div className="min-h-screen bg-[#05070a] text-white">
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-32">
        <AnimatePresence mode="wait">
          {stage === 'intro' && (
            <motion.div
              key="intro"
              initial={shouldReduceMotion ? undefined : 'hidden'}
              animate="visible"
              variants={fade}
              className="space-y-10 text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                FrankX Agent Stack Benchmark
              </span>
              <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">
                You&apos;ll hire your next team from a config file.
                <br />
                Find out what yours is missing.
              </h1>
              <p className="mx-auto max-w-2xl text-base text-white/70 md:text-lg">
                11 questions across the six things that separate a person who prompts well from an
                operator running a real agentic stack. No email required to see your level.
              </p>
              <div className="flex flex-col items-center gap-4">
                <button
                  type="button"
                  onClick={() => setStage('question')}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-emerald-400"
                >
                  Grade my agent stack
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">
                  ~5 minutes &middot; free instant result &middot; 4 tiers
                </p>
              </div>
            </motion.div>
          )}

          {stage === 'question' && activeQuestion && (
            <motion.div
              key={`q-${activeQuestion.id}`}
              initial={shouldReduceMotion ? undefined : 'hidden'}
              animate="visible"
              variants={fade}
              className="space-y-8"
            >
              <div className="space-y-3">
                <div
                  className="flex justify-between font-mono text-xs uppercase tracking-[0.25em] text-white/50"
                  aria-live="polite"
                >
                  <span>
                    Question {step + 1} of {totalQuestions}
                  </span>
                  <span>{progress}% complete</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-emerald-500"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: 'easeOut' }}
                  />
                </div>
              </div>

              <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
                <h2 id={`question-${activeQuestion.id}`} className="text-xl font-semibold text-white md:text-2xl">
                  {activeQuestion.prompt}
                </h2>
                <div className="space-y-3" role="radiogroup" aria-labelledby={`question-${activeQuestion.id}`}>
                  {activeQuestion.options.map((option) => {
                    const isSelected = chosenOptionId === option.id
                    return (
                      <button
                        type="button"
                        key={option.id}
                        onClick={() => selectAnswer(option.id)}
                        role="radio"
                        aria-checked={isSelected}
                        className={clsx(
                          'w-full rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left text-sm transition-colors hover:border-emerald-500/40 hover:bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400',
                          isSelected && 'border-emerald-500/60 bg-emerald-500/10'
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={clsx(
                              'mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/30',
                              isSelected && 'border-emerald-400 bg-emerald-400'
                            )}
                          >
                            {isSelected ? <CheckCircle2 className="h-3.5 w-3.5 text-black" aria-hidden="true" /> : null}
                          </span>
                          <span className="text-white/85">{option.label}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={step === 0}
                    className={clsx(
                      'inline-flex items-center gap-1.5 text-sm font-medium text-white/50 transition hover:text-white',
                      step === 0 && 'invisible'
                    )}
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!chosenOptionId}
                    className={clsx(
                      'inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400',
                      !chosenOptionId && 'cursor-not-allowed opacity-40'
                    )}
                  >
                    {step < totalQuestions - 1 ? 'Next' : 'See my level'}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === 'gate' && result && (
            <motion.div
              key="gate"
              initial={shouldReduceMotion ? undefined : 'hidden'}
              animate="visible"
              variants={fade}
              className="space-y-10"
            >
              <FreeReveal result={result} />

              <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-7 md:p-9">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-emerald-300">
                  <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                  Full report locked
                </div>
                <h3 className="mt-3 text-xl font-semibold text-white md:text-2xl">
                  Your #1 gap is {result.ceiling.name} — the fix takes under 10 minutes.
                </h3>
                <p className="mt-2 max-w-xl text-sm text-white/70">
                  Enter your email for your full six-dimension breakdown, your named ceiling, and the exact
                  three moves that close it fastest.
                </p>

                <form onSubmit={submitEmail} className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="scorecard-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="scorecard-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="flex-1 rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? 'Unlocking…' : 'Unlock my full report'}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </form>
                {gateError ? <p className="mt-2 text-sm text-red-400">{gateError}</p> : null}
                <p className="mt-3 flex items-center gap-1.5 text-xs text-white/40">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  No spam. One report email, then the AI Architect newsletter. Unsubscribe anytime.
                </p>
              </div>
            </motion.div>
          )}

          {stage === 'report' && result && (
            <motion.div
              key="report"
              initial={shouldReduceMotion ? undefined : 'hidden'}
              animate="visible"
              variants={fade}
              className="space-y-10"
            >
              <FreeReveal result={result} />

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
                <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">
                  Your six-dimension breakdown
                </h3>
                <div className="mt-6">
                  <DimensionRadar scores={result.dimensionScores} />
                </div>
              </div>

              <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-7 md:p-9">
                <div className="font-mono text-xs uppercase tracking-[0.25em] text-amber-300">
                  Your named ceiling
                </div>
                <h3 className="mt-3 text-xl font-semibold text-white md:text-2xl">{result.ceiling.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{result.ceiling.description}</p>

                <ol className="mt-6 space-y-3">
                  {result.ceiling.actions.map((action, i) => (
                    <li key={action} className="flex gap-3 rounded-lg border border-white/10 bg-black/20 p-4 text-sm text-white/80">
                      <span className="font-mono text-amber-300">{i + 1}</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <TierCtaCard tierId={result.tier.id} />

              <div className="flex flex-col items-center gap-3 pt-2 text-center">
                <button type="button" onClick={restart} className="text-sm font-medium text-white/50 transition hover:text-white">
                  Retake the scorecard
                </button>
                <p className="max-w-md text-xs text-white/35">
                  Know someone assembling their stack alone? Send them this benchmark — grading your team
                  next is the fastest way to see where delegation actually lives.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function FreeReveal({ result }: { result: ScorecardResult }) {
  return (
    <div className="space-y-4 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-300">
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        Your result — free, no email required
      </span>
      <div className="flex items-end justify-center gap-4">
        <span className="font-mono text-6xl font-bold text-white md:text-7xl">{result.totalScore}</span>
        <span className="mb-2 font-mono text-lg text-white/40">/100</span>
      </div>
      <h2 className="text-2xl font-semibold text-white md:text-3xl">{result.tier.label}</h2>
      <p className="mx-auto max-w-xl text-sm text-white/70 md:text-base">{result.tier.description}</p>
    </div>
  )
}

function TierCtaCard({ tierId }: { tierId: keyof typeof CTA_BY_TIER }) {
  const cta = CTA_BY_TIER[tierId]
  return (
    <div className="rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 to-transparent p-7 md:p-9">
      <div className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-300">{cta.eyebrow}</div>
      <h3 className="mt-3 text-xl font-semibold text-white md:text-2xl">{cta.headline}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/70">{cta.body}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href={cta.ctaHref}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
        >
          {cta.ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link
          href={cta.secondaryHref}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
        >
          {cta.secondaryLabel}
        </Link>
      </div>
    </div>
  )
}
