'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'

import {
  DIMENSIONS,
  SCALE,
  TOTAL_QUESTIONS,
  clearStoredScan,
  scoreScan,
  storeScan,
  type ScanResult,
} from '@/lib/founder-signal'

const EASE = [0.16, 1, 0.3, 1] as const

type Stage = number | 'result'

export function SignalScan({ applyHref }: { applyHref: string }) {
  const reduce = useReducedMotion()
  const [stage, setStage] = useState<Stage>(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const headingRef = useRef<HTMLParagraphElement>(null)

  const answeredCount = Object.keys(answers).length

  const activeDimension = typeof stage === 'number' ? DIMENSIONS[stage] : null

  const dimensionComplete = useMemo(() => {
    if (!activeDimension) return false
    return activeDimension.questions.every((q) => answers[q.id] !== undefined)
  }, [activeDimension, answers])

  const result: ScanResult | null = useMemo(
    () => (stage === 'result' ? scoreScan(answers) : null),
    [stage, answers]
  )

  // Hand the reading to the application form further down the page.
  useEffect(() => {
    if (result) storeScan(result)
  }, [result])

  const select = useCallback((questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }, [])

  const advance = useCallback(() => {
    setStage((prev) => {
      if (prev === 'result') return prev
      return prev === DIMENSIONS.length - 1 ? 'result' : prev + 1
    })
    // Move focus to the new step heading so keyboard and screen-reader users
    // are not stranded at the bottom of the previous step.
    window.requestAnimationFrame(() => headingRef.current?.focus())
  }, [])

  const back = useCallback(() => {
    setStage((prev) => {
      if (prev === 'result') return DIMENSIONS.length - 1
      return Math.max(0, prev - 1)
    })
    window.requestAnimationFrame(() => headingRef.current?.focus())
  }, [])

  const restart = useCallback(() => {
    clearStoredScan()
    setAnswers({})
    setStage(0)
    window.requestAnimationFrame(() => headingRef.current?.focus())
  }, [])

  return (
    <div className="rounded-3xl border border-white/10 bg-space/80 p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-sm sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <p
          ref={headingRef}
          tabIndex={-1}
          className="text-sm font-semibold text-white outline-none"
        >
          {result
            ? 'Your signal reading'
            : `${activeDimension?.name}. ${activeDimension?.premise}`}
        </p>
        <p className="shrink-0 font-mono text-xs text-white/55">
          {result ? 'Complete' : `${answeredCount} of ${TOTAL_QUESTIONS}`}
        </p>
      </div>

      <div
        className="mt-4 flex gap-1.5"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={TOTAL_QUESTIONS}
        aria-valuenow={answeredCount}
        aria-label="Scan progress"
      >
        {DIMENSIONS.map((dimension, index) => {
          const done = dimension.questions.filter(
            (q) => answers[q.id] !== undefined
          ).length
          return (
            <span
              key={dimension.id}
              className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/10"
            >
              <motion.span
                className="block h-full rounded-full bg-tech-light"
                initial={false}
                animate={{ scaleX: done / dimension.questions.length }}
                style={{ transformOrigin: 'left' }}
                transition={
                  reduce ? { duration: 0 } : { duration: 0.45, ease: EASE }
                }
                aria-hidden="true"
              />
              <span className="sr-only">
                {dimension.name}: {done} of {dimension.questions.length}
                {index === DIMENSIONS.length - 1 ? '' : ', '}
              </span>
            </span>
          )
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {result ? (
          <motion.div
            key="result"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <ScanResultPanel
              result={result}
              applyHref={applyHref}
              onRestart={restart}
            />
          </motion.div>
        ) : (
          <motion.div
            key={activeDimension!.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="mt-7 space-y-7">
              {activeDimension!.questions.map((question) => (
                <fieldset key={question.id}>
                  <legend className="text-[15px] leading-6 text-white/85">
                    {question.statement}
                  </legend>
                  <div className="mt-3 grid grid-cols-5 gap-1.5">
                    {SCALE.map((option) => {
                      const checked = answers[question.id] === option.value
                      return (
                        <label
                          key={option.value}
                          className={[
                            'cursor-pointer rounded-xl border px-1 py-2.5 text-center text-[11px] font-medium transition',
                            'focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-tech-light',
                            checked
                              ? 'border-tech-light/60 bg-tech-light/15 text-white'
                              : 'border-white/10 bg-void/60 text-white/50 hover:border-white/25 hover:text-white/80',
                          ].join(' ')}
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={option.value}
                            checked={checked}
                            onChange={() => select(question.id, option.value)}
                            className="sr-only"
                          />
                          {option.label}
                        </label>
                      )
                    })}
                  </div>
                </fieldset>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={back}
                disabled={stage === 0}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-white/50 transition hover:text-white disabled:pointer-events-none disabled:opacity-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tech-light"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back
              </button>
              <button
                type="button"
                onClick={advance}
                disabled={!dimensionComplete}
                className="inline-flex items-center gap-2 rounded-full bg-tech-light px-5 py-2.5 text-sm font-semibold text-void transition hover:bg-white active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                {stage === DIMENSIONS.length - 1 ? 'See the reading' : 'Continue'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            {!dimensionComplete && (
              <p className="mt-3 text-right text-xs text-white/55">
                Answer all three to continue.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ScanResultPanel({
  result,
  applyHref,
  onRestart,
}: {
  result: ScanResult
  applyHref: string
  onRestart: () => void
}) {
  return (
    <div className="mt-7">
      <div className="flex items-end gap-4">
        <p className="text-6xl font-semibold leading-none tracking-[-0.04em] text-white">
          {result.percent}
          <span className="text-2xl text-white/55">%</span>
        </p>
        <p className="pb-1 text-lg font-semibold text-tech-light">
          {result.band.name}
        </p>
      </div>

      <p className="mt-5 text-[15px] leading-7 text-white/70">
        {result.band.verdict}
      </p>

      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6">
        {result.dimensions.map((entry) => (
          <div key={entry.dimension.id}>
            <dt className="text-xs font-medium text-white/60">
              {entry.dimension.name}
            </dt>
            <dd className="mt-1 text-2xl font-semibold tracking-tight text-white">
              {entry.percent}
              <span className="text-sm text-white/55">%</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 rounded-2xl border border-tech-light/25 bg-tech-light/[0.07] p-5">
        <p className="text-sm font-semibold text-white">
          Your thinnest layer is {result.weakest.dimension.name.toLowerCase()}.
        </p>
        <p className="mt-2 text-sm leading-6 text-white/65">
          {result.weakest.dimension.failure}
        </p>
      </div>

      <p className="mt-6 text-sm leading-6 text-white/50">
        Nothing here was sent anywhere. The scoring runs in your browser, and the
        questions are published in the open so you can argue with them.
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <a
          href={applyHref}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-tech-light px-5 py-3 text-sm font-semibold text-void transition hover:bg-white active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
        >
          Apply for the pilot
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/70 transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Run it again
        </button>
      </div>
    </div>
  )
}
