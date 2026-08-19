'use client'

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRight, ArrowLeft, Lock, ShieldCheck, ShieldAlert, Building2, CheckCircle2 } from 'lucide-react'

import { QUESTIONS, scoreReadiness, type ReadinessResult } from '@/lib/ai-coe-readiness/engine'
import { CTA_BY_TIER } from '@/lib/ai-coe-readiness/cta'
import { DimensionRadar } from '@/components/scorecard/DimensionRadar'

type Stage = 'intro' | 'question' | 'reveal' | 'report'

const ACCENT = '#22d3ee' // cyan-400 — enterprise register, distinct from the Operator Scorecard's emerald

// The AI CoE Readiness Assessment is the enterprise twin of the Operator Scorecard, reusing
// its scoring engine pattern and GSAP choreography. The register here is deliberately more
// restrained: no hover hints, no playful asides — a director reading this on a laptop before
// a board meeting should feel this was built by someone who has run this in production.
//
// State changes fire immediately and synchronously — GSAP only ever decorates the entrance of
// whatever just became true (see OperatorScorecardClient.tsx's decorator-not-driver pattern;
// this file does not reintroduce the rAF-gated-state bug that pattern fixed).
export default function AiCoeReadinessClient() {
  const prefersReducedMotion = Boolean(useReducedMotion())
  const [stage, setStage] = useState<Stage>('intro')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [gateError, setGateError] = useState<string | null>(null)
  const [revealBeat, setRevealBeat] = useState(0) // 0 none, 1 score, 2 +radar, 3 +tier/gate

  const totalQuestions = QUESTIONS.length
  const activeQuestion = QUESTIONS[step]
  const chosenOptionId = activeQuestion ? answers[activeQuestion.id] : undefined

  const result: ReadinessResult = useMemo(() => scoreReadiness(answers), [answers])

  // ---- Cross-stage transitions ("one camera-like movement") -------------
  const stageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion || !stageRef.current) return
      gsap.fromTo(stageRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' })
    },
    { dependencies: [stage, prefersReducedMotion] },
  )

  // ---- Question-to-question transitions ----------------------------------
  const questionRef = useRef<HTMLDivElement>(null)
  const directionRef = useRef<1 | -1>(1)

  useGSAP(
    () => {
      if (stage !== 'question' || prefersReducedMotion || !questionRef.current) return
      const direction = directionRef.current
      gsap.fromTo(
        questionRef.current,
        { opacity: 0, x: direction * 18 },
        { opacity: 1, x: 0, duration: 0.24, ease: 'power3.out' },
      )
    },
    { dependencies: [step, stage, prefersReducedMotion] },
  )

  function selectAnswer(optionId: string) {
    if (!activeQuestion) return
    setAnswers((prev) => ({ ...prev, [activeQuestion.id]: optionId }))
  }

  function goNext() {
    if (!chosenOptionId) return
    if (step < totalQuestions - 1) {
      directionRef.current = 1
      setStep((s) => s + 1)
    } else {
      setStage('reveal')
    }
  }

  function goBack() {
    if (step === 0) return
    directionRef.current = -1
    setStep((s) => s - 1)
  }

  // ---- Keyboard nav: arrows + enter + number-key shortcuts (1-4) ---------
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    optionRefs.current = []
  }, [step])

  useEffect(() => {
    if (stage !== 'question' || !activeQuestion) return

    function focusOption(idx: number) {
      optionRefs.current[idx]?.focus()
    }

    function onKeyDown(e: KeyboardEvent) {
      const options = activeQuestion!.options
      const currentIndex = options.findIndex((o) => o.id === answers[activeQuestion!.id])

      if (e.key >= '1' && e.key <= '4') {
        const idx = Number(e.key) - 1
        if (idx < options.length) {
          e.preventDefault()
          selectAnswer(options[idx].id)
          focusOption(idx)
        }
        return
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        const next = currentIndex < 0 ? 0 : (currentIndex + 1) % options.length
        selectAnswer(options[next].id)
        focusOption(next)
        return
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        const prev = currentIndex < 0 ? options.length - 1 : (currentIndex - 1 + options.length) % options.length
        selectAnswer(options[prev].id)
        focusOption(prev)
        return
      }
      if (e.key === 'Enter') {
        if (answers[activeQuestion!.id]) {
          e.preventDefault()
          goNext()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, activeQuestion, answers, step])

  // ---- Selected state: a quick, non-bouncy "switch engaging" pulse -------
  const dotRefs = useRef<Map<string, HTMLSpanElement>>(new Map())

  useGSAP(
    () => {
      if (!chosenOptionId || prefersReducedMotion) return
      const dot = dotRefs.current.get(chosenOptionId)
      if (!dot) return
      gsap.fromTo(dot, { scale: 0.55 }, { scale: 1, duration: 0.16, ease: 'power3.out' })
    },
    { dependencies: [chosenOptionId, prefersReducedMotion] },
  )

  // ---- Intro: one choreographed staggered entrance -----------------------
  const introRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (stage !== 'intro' || prefersReducedMotion || !introRef.current) return
      const items = introRef.current.querySelectorAll('[data-intro-item]')
      gsap.fromTo(
        items,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08 },
      )
    },
    { dependencies: [stage, prefersReducedMotion] },
  )

  // ---- Reveal: the held moment (beats 1-3, then the gate) -----------------
  useEffect(() => {
    if (stage !== 'reveal') {
      setRevealBeat(0)
      return
    }
    if (prefersReducedMotion) {
      setRevealBeat(3)
      return
    }
    setRevealBeat(0)
    const t1 = window.setTimeout(() => setRevealBeat(1), 20)
    const t2 = window.setTimeout(() => setRevealBeat(2), 1300)
    const t3 = window.setTimeout(() => setRevealBeat(3), 2500)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
    }
  }, [stage, prefersReducedMotion])

  const scoreRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (stage !== 'reveal' || revealBeat < 1 || !scoreRef.current) return
      if (prefersReducedMotion) {
        scoreRef.current.textContent = String(result.totalScore)
        return
      }
      const proxy = { val: 0 }
      gsap.to(proxy, {
        val: result.totalScore,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          if (scoreRef.current) scoreRef.current.textContent = String(Math.round(proxy.val))
        },
      })
    },
    { dependencies: [stage, revealBeat, result.totalScore, prefersReducedMotion] },
  )

  const tierBlockRef = useRef<HTMLDivElement>(null)
  const gateBlockRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (revealBeat < 3 || prefersReducedMotion) return
      if (tierBlockRef.current) {
        gsap.fromTo(tierBlockRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
      }
      if (gateBlockRef.current) {
        gsap.fromTo(
          gateBlockRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.15 },
        )
      }
    },
    { dependencies: [revealBeat, prefersReducedMotion] },
  )

  // ---- Report: the ceiling named with weight, then the risk exposure -----
  const ceilingNameRef = useRef<HTMLHeadingElement>(null)
  const ceilingDescRef = useRef<HTMLParagraphElement>(null)
  const riskBlockRef = useRef<HTMLDivElement>(null)
  const actionItemRefs = useRef<(HTMLLIElement | null)[]>([])
  const reportRestRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (stage !== 'report' || prefersReducedMotion || !ceilingNameRef.current) return
      const tl = gsap.timeline()
      tl.fromTo(
        ceilingNameRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' },
      )
      if (ceilingDescRef.current) {
        tl.fromTo(
          ceilingDescRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
          '-=0.2',
        )
      }
      if (riskBlockRef.current) {
        tl.fromTo(
          riskBlockRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
          '-=0.15',
        )
      }
      const items = actionItemRefs.current.filter((i): i is HTMLLIElement => i !== null)
      if (items.length) {
        tl.fromTo(
          items,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.12, ease: 'power3.out' },
          '-=0.1',
        )
      }
      if (reportRestRef.current) {
        tl.fromTo(
          reportRestRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' },
          '+=0.1',
        )
      }
    },
    { dependencies: [stage, prefersReducedMotion, result.ceiling.dimension] },
  )

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
          listType: 'ai-architect',
          source: 'ai-coe-readiness',
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
    setEmail('')
    setRevealBeat(0)
  }

  return (
    <div className="min-h-screen bg-[#05070a] text-white">
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-32">
        <div ref={stageRef}>
          {stage === 'intro' && (
            <div ref={introRef} className="space-y-10 text-center">
              <span
                data-intro-item
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300"
              >
                <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                AI CoE Readiness Assessment
              </span>
              <h1 data-intro-item className="text-balance text-4xl font-semibold leading-tight md:text-5xl">
                Your AI strategy was written by people who&apos;ve never run an agent overnight.
                <br />
                Find out where yours actually stands.
              </h1>
              <p data-intro-item className="mx-auto max-w-xl text-base text-white/70 md:text-lg">
                12 questions across the six dimensions that separate a strategy deck from a governed,
                in-production AI Center of Excellence.
              </p>
              <div data-intro-item className="flex flex-col items-center gap-4">
                <button
                  type="button"
                  onClick={() => setStage('question')}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-cyan-400 px-8 py-4 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070a]"
                >
                  Assess our AI CoE readiness
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">
                  ~6 minutes &middot; free instant result &middot; 5 maturity levels
                </p>
              </div>
            </div>
          )}

          {stage === 'question' && activeQuestion && (
            <div className="space-y-4">
              <div className="flex justify-between font-mono text-xs uppercase tracking-[0.25em] text-white/50" aria-live="polite">
                <span>
                  Question {step + 1} of {totalQuestions}
                </span>
              </div>

              <div ref={questionRef} className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
                <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <h2 id={`question-${activeQuestion.id}`} className="text-xl font-semibold text-white md:text-2xl">
                    {activeQuestion.prompt}
                  </h2>
                  <div aria-hidden="true" className="shrink-0 self-center sm:self-start" style={{ width: 72, height: 72 }}>
                    <DimensionRadar
                      scores={result.dimensionScores}
                      mode="mini"
                      size={72}
                      color={ACCENT}
                      reducedMotion={prefersReducedMotion}
                    />
                  </div>
                </div>

                <div className="space-y-3" role="radiogroup" aria-labelledby={`question-${activeQuestion.id}`}>
                  {activeQuestion.options.map((option, idx) => {
                    const isSelected = chosenOptionId === option.id
                    return (
                      <button
                        type="button"
                        key={option.id}
                        ref={(el) => {
                          optionRefs.current[idx] = el
                        }}
                        onClick={() => selectAnswer(option.id)}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={isSelected || (chosenOptionId === undefined && idx === 0) ? 0 : -1}
                        className={clsx(
                          'w-full min-h-[44px] rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left text-sm transition-[color,background-color,border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/[0.05] hover:shadow-[0_8px_24px_-12px_rgba(34,211,238,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300',
                          isSelected && 'border-cyan-400/60 bg-cyan-400/10',
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={clsx(
                              'mt-0.5 inline-flex h-4 w-4 shrink-0 origin-center items-center justify-center rounded-full border border-white/30 transition-colors duration-150',
                              isSelected && 'border-cyan-300 bg-cyan-300',
                            )}
                            ref={(el) => {
                              if (el) dotRefs.current.set(option.id, el)
                            }}
                          >
                            {isSelected ? <CheckCircle2 className="h-3.5 w-3.5 text-slate-950" aria-hidden="true" /> : null}
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
                      'inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-white/50 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300',
                      step === 0 && 'invisible',
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
                      'inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300',
                      !chosenOptionId && 'cursor-not-allowed opacity-40',
                    )}
                  >
                    {step < totalQuestions - 1 ? 'Next' : 'See our readiness level'}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                <p className="text-center font-mono text-[10px] uppercase tracking-widest text-white/25">
                  &uarr;&darr; choose &middot; 1&ndash;4 jump &middot; enter continue
                </p>
              </div>
            </div>
          )}

          {stage === 'reveal' && (
            <div className="space-y-10">
              <div className="space-y-4 text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">
                  <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Free read — no email required
                </span>
                <div className="flex items-end justify-center gap-4">
                  <span
                    ref={scoreRef}
                    className="font-mono text-6xl font-bold tabular-nums text-white md:text-7xl"
                  >
                    0
                  </span>
                  <span className="mb-2 font-mono text-lg text-white/40">/100</span>
                </div>
              </div>

              {revealBeat >= 2 && (
                <div>
                  <DimensionRadar
                    scores={result.dimensionScores}
                    color={ACCENT}
                    strokeReveal
                    reducedMotion={prefersReducedMotion}
                  />
                </div>
              )}

              {revealBeat >= 3 && (
                <>
                  <div ref={tierBlockRef} className="space-y-3 text-center">
                    <h2 className="text-2xl font-semibold text-white md:text-3xl">{result.tier.label}</h2>
                    <p className="mx-auto max-w-xl text-sm text-white/60 md:text-base">{result.tier.tierLine}</p>
                  </div>

                  <div
                    ref={gateBlockRef}
                    className="rounded-2xl border border-cyan-400/25 bg-cyan-400/5 p-7 md:p-9"
                  >
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-cyan-300">
                      <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                      Full readiness report
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-white md:text-2xl">
                      Your full readiness report is ready — where should it live?
                    </h3>
                    <p className="mt-2 max-w-xl text-sm text-white/70">
                      One dimension is capping every other score, and it carries a named risk exposure.
                      The report has both, plus the three moves that close it fastest.
                    </p>

                    <form onSubmit={submitEmail} className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <label htmlFor="ai-coe-readiness-email" className="sr-only">
                        Work email address
                      </label>
                      <input
                        id="ai-coe-readiness-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="min-h-[44px] flex-1 rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                      />
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {submitting ? 'Unlocking…' : 'Send my report'}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </form>
                    {gateError ? <p className="mt-2 text-sm text-red-400">{gateError}</p> : null}
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-white/40">
                      <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      No spam. One report email, then the AI Architect dispatch. Unsubscribe anytime.
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {stage === 'report' && (
            <div className="space-y-10">
              <div className="space-y-3 text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">
                  <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Your result
                </span>
                <div className="flex items-end justify-center gap-3">
                  <span className="font-mono text-4xl font-bold tabular-nums text-white">{result.totalScore}</span>
                  <span className="mb-1 font-mono text-base text-white/40">/100</span>
                </div>
                <p className="text-lg font-semibold text-white">{result.tier.label}</p>
                <p className="mx-auto max-w-xl text-sm text-white/60">{result.tier.description}</p>
              </div>

              <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-7 md:p-9">
                <div className="font-mono text-xs uppercase tracking-[0.25em] text-amber-300">Your named ceiling — fix this first</div>
                <h3 ref={ceilingNameRef} className="mt-3 text-xl font-semibold text-white md:text-2xl">
                  {result.ceiling.name}
                </h3>
                <p ref={ceilingDescRef} className="mt-2 text-sm leading-relaxed text-white/70">
                  {result.ceiling.description}
                </p>

                <div ref={riskBlockRef} className="mt-5 flex gap-3 rounded-lg border border-rose-500/25 bg-rose-500/[0.06] p-4">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-rose-100/90">{result.ceiling.riskExposure}</p>
                </div>

                <ol className="mt-6 space-y-3">
                  {result.ceiling.actions.map((action, i) => (
                    <li
                      key={action}
                      ref={(el) => {
                        actionItemRefs.current[i] = el
                      }}
                      className="flex gap-3 rounded-lg border border-white/10 bg-black/20 p-4 text-sm text-white/80"
                    >
                      <span className="font-mono text-amber-300">{i + 1}</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div ref={reportRestRef} className="space-y-10">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">
                    Your six-dimension breakdown
                  </h3>
                  <div className="mt-6">
                    <DimensionRadar scores={result.dimensionScores} color={ACCENT} reducedMotion={prefersReducedMotion} />
                  </div>
                </div>

                <TierCtaCard tierId={result.tier.id} />

                <div className="flex flex-col items-center gap-3 pt-2 text-center">
                  <button
                    type="button"
                    onClick={restart}
                    className="min-h-[44px] text-sm font-medium text-white/50 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    Retake the assessment
                  </button>
                  <p className="max-w-md text-xs text-white/35">
                    Assessing this for a peer or a partner team? Send them this benchmark — the fastest way
                    to see whether their program has a real operating model behind it.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function TierCtaCard({ tierId }: { tierId: keyof typeof CTA_BY_TIER }) {
  const cta = CTA_BY_TIER[tierId]
  return (
    <div className="rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-cyan-400/10 to-transparent p-7 md:p-9">
      <div className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300">{cta.eyebrow}</div>
      <h3 className="mt-3 text-xl font-semibold text-white md:text-2xl">{cta.headline}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/70">{cta.body}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href={cta.ctaHref}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          {cta.ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link
          href={cta.secondaryHref}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          {cta.secondaryLabel}
        </Link>
      </div>
    </div>
  )
}
