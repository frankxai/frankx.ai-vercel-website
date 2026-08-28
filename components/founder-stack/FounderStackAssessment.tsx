'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react'

import { EmailSignup } from '@/components/email-signup'
import { trackEvent } from '@/lib/analytics'
import {
  founderLayers,
  founderStackQuestions,
  founderStackScale,
  scoreFounderStack,
  type FounderStackAnswers,
  type FounderStackResult,
} from '@/lib/founder-stack'

export function FounderStackAssessment() {
  const [answers, setAnswers] = useState<FounderStackAnswers>({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [error, setError] = useState('')
  const [result, setResult] = useState<FounderStackResult | null>(null)
  const hasStarted = useRef(false)
  const questionHeadingRef = useRef<HTMLLegendElement>(null)
  const resultHeadingRef = useRef<HTMLHeadingElement>(null)
  const previousQuestionIndex = useRef(currentIndex)

  const question = founderStackQuestions[currentIndex]
  const selected = question ? answers[question.id] : undefined
  const progress = result
    ? 100
    : Math.round((currentIndex / founderStackQuestions.length) * 100)

  useEffect(() => {
    if (!result) return

    const focusFrame = window.requestAnimationFrame(() => {
      resultHeadingRef.current?.focus()
    })
    return () => window.cancelAnimationFrame(focusFrame)
  }, [result])

  useEffect(() => {
    if (result || previousQuestionIndex.current === currentIndex) return

    previousQuestionIndex.current = currentIndex
    const focusFrame = window.requestAnimationFrame(() => {
      questionHeadingRef.current?.focus()
    })
    return () => window.cancelAnimationFrame(focusFrame)
  }, [currentIndex, result])

  function choose(value: number) {
    if (!question) return

    if (!hasStarted.current) {
      hasStarted.current = true
      trackEvent('founder_stack_started', { version: 'v1' })
    }

    setAnswers((current) => ({ ...current, [question.id]: value }))
    setError('')
  }

  function next() {
    if (!question || !selected) {
      setError('Choose the answer that is most true today.')
      return
    }

    if (currentIndex === founderStackQuestions.length - 1) {
      const scored = scoreFounderStack({ ...answers, [question.id]: selected })
      setResult(scored)
      trackEvent('founder_stack_completed', {
        phase: scored.phase.toLowerCase(),
        constraint: scored.constraint?.key ?? 'tie',
        tied_constraints: scored.tiedConstraints
          .map((layer) => layer.key)
          .join(','),
        version: 'v1',
      })
      return
    }

    setCurrentIndex((index) => index + 1)
    setError('')
  }

  function back() {
    setCurrentIndex((index) => Math.max(0, index - 1))
    setError('')
  }

  function restart() {
    setAnswers({})
    setCurrentIndex(0)
    setResult(null)
    setError('')
    hasStarted.current = false
  }

  if (result) {
    const constraint = result.constraint
    const tiedNames = result.tiedConstraints
      .map((layer) => layer.name)
      .join(', ')

    return (
      <section
        aria-labelledby="founder-stack-result"
        aria-live="polite"
        className="rounded-[2rem] border border-white/10 bg-[#0d1111] p-5 shadow-[0_32px_100px_rgba(0,0,0,0.32)] sm:p-8 lg:p-10"
      >
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[0.86fr_1.14fr] lg:gap-14">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-300/75">
              Your Founder Stack · {result.phase}
            </p>
            <h2
              id="founder-stack-result"
              ref={resultHeadingRef}
              tabIndex={-1}
              className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-white outline-none sm:text-5xl"
            >
              {constraint
                ? `Strengthen ${constraint.name} first.`
                : 'No single constraint is leading.'}
            </h2>
            <p className="mt-5 text-base leading-7 text-white/65">
              {constraint
                ? 'Your lowest layer is not a verdict. It is the part of the stack most likely to make progress elsewhere expensive right now.'
                : `${tiedNames} share your lowest score. The map cannot honestly name one first move from these answers.`}
            </p>

            <div className="mt-8 border-y border-white/10 py-6">
              <p className="text-sm font-semibold text-white">Your next move</p>
              <p className="mt-2 text-sm leading-6 text-white/65">
                {constraint
                  ? constraint.action
                  : 'Review the tied layers below and start with the one causing the most costly repeated friction this month.'}
              </p>
            </div>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              {constraint && (
                <Link
                  href={constraint.primaryHref}
                  onClick={() =>
                    trackEvent('founder_stack_cta_clicked', {
                      constraint: constraint.key,
                      destination: constraint.primaryHref,
                    })
                  }
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#07120d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0d1111]"
                >
                  {constraint.primaryLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
              <button
                type="button"
                onClick={restart}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/72 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Retake the map
              </button>
            </div>
          </div>

          <div>
            <div className="space-y-5" aria-label="Founder Stack scores">
              {result.scores.map((layer) => {
                const isLowest = result.tiedConstraints.some(
                  (candidate) => candidate.key === layer.key,
                )
                return (
                  <div key={layer.key}>
                    <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                      <span className="font-medium text-white">{layer.name}</span>
                      <span className="font-mono text-xs text-white/55">
                        {layer.score}/100
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
                      <div
                        className={
                          isLowest
                            ? 'h-full rounded-full bg-emerald-300'
                            : 'h-full rounded-full bg-white/28'
                        }
                        style={{ width: `${layer.score}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 rounded-[1.5rem] border border-emerald-300/15 bg-emerald-300/[0.045] p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200/75">
                Keep the map
              </p>
              <p className="mt-3 text-sm leading-6 text-white/68">
                Join the Founder Field Notes for practical systems, Human Layer
                research, and new Founder Stack tools. The wider newsletter hub
                remains available whenever you want to explore other streams.
              </p>
              <EmailSignup
                listType="founder-stack"
                source={`founder-stack-${constraint?.key ?? 'tie'}`}
                buttonText="Send me the field notes"
                placeholder="Founder email"
                compact
                className="mt-5"
              />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!question) return null

  const currentLayer = founderLayers.find(
    (layer) => layer.key === question.layer,
  )

  return (
    <section
      aria-labelledby="founder-stack-question"
      className="rounded-[2rem] border border-white/10 bg-[#0d1111] p-5 shadow-[0_32px_100px_rgba(0,0,0,0.32)] sm:p-8 lg:p-10"
    >
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Question {currentIndex + 1} of {founderStackQuestions.length}:{' '}
        {question.prompt}
      </p>
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-300/75">
          {currentLayer?.number} · {currentLayer?.name}
        </p>
        <p className="font-mono text-[10px] text-white/48" aria-live="polite">
          {currentIndex + 1} / {founderStackQuestions.length}
        </p>
      </div>

      <div
        className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.07]"
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full bg-emerald-300 transition-[width] duration-200 motion-reduce:transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>

      <fieldset className="mt-10">
        <legend
          id="founder-stack-question"
          ref={questionHeadingRef}
          tabIndex={-1}
          className="max-w-3xl text-2xl font-semibold leading-tight tracking-[-0.025em] text-white outline-none sm:text-3xl"
        >
          {question.prompt}
        </legend>
        <p className="mt-3 text-sm leading-6 text-white/55">
          Answer for the company as it operates now, not the version you are
          building toward.
        </p>

        <div className="mt-8 grid gap-3">
          {founderStackScale.map((option) => {
            const isSelected = selected === option.value
            return (
              <label
                key={option.value}
                className={`group flex min-h-14 cursor-pointer items-center justify-between gap-4 rounded-2xl border px-4 py-3 transition-colors ${isSelected ? 'border-emerald-300/45 bg-emerald-300/[0.08]' : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.035]'}`}
              >
                <span className="flex items-center gap-4">
                  <input
                    type="radio"
                    name={question.id}
                    value={option.value}
                    checked={isSelected}
                    onChange={() => choose(option.value)}
                    className="h-5 w-5 border-white/30 bg-transparent text-emerald-400 focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-[#0d1111]"
                  />
                  <span className="text-sm font-medium text-white/75 group-hover:text-white">
                    {option.label}
                  </span>
                </span>
                {isSelected && (
                  <Check
                    className="h-4 w-4 text-emerald-300"
                    aria-hidden="true"
                  />
                )}
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
        <button
          type="button"
          onClick={back}
          disabled={currentIndex === 0}
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </button>
        <div className="flex flex-col items-end gap-2">
          {error && (
            <p role="alert" className="text-sm text-rose-300">
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={next}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#07120d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0d1111]"
          >
            {currentIndex === founderStackQuestions.length - 1
              ? 'See my map'
              : 'Next question'}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
