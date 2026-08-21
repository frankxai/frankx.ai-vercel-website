'use client'

import { useEffect, useMemo, useState } from 'react'
import { Copy } from 'lucide-react'

import { trackEvent } from '@/lib/analytics'

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-void'

type Verdict = 'made' | 'open'

type Option = {
  label: string
  verdict: Verdict
  /** The evidence line that goes into the report, stated as what was found. */
  evidence: string
}

type Decision = {
  id: 'model' | 'loop' | 'trust' | 'run'
  index: string
  /** Fixed-width name used in the report block, matching the skill's output. */
  reportName: string
  title: string
  question: string
  /** One actionable line shown when the decision comes back open. */
  fix: string
  options: [Option, Option, Option]
}

const DECISIONS: Decision[] = [
  {
    id: 'model',
    index: '01',
    reportName: 'Model call seam     ',
    title: 'Where does the model call go?',
    question: 'How many modules import a model provider’s SDK?',
    fix: 'Route every call through one seam before the call-site count grows further.',
    options: [
      { label: 'Exactly one', verdict: 'made', evidence: 'one importing module' },
      { label: 'More than one', verdict: 'open', evidence: 'provider SDK imported in more than one module' },
      { label: 'I have not counted', verdict: 'open', evidence: 'importing modules not counted' },
    ],
  },
  {
    id: 'loop',
    index: '02',
    reportName: 'Orchestration shape ',
    title: 'What shape is the loop?',
    question: 'Where does the loop’s exit condition live?',
    fix: 'Move the exit condition into code — a counter, a budget, or a state machine.',
    options: [
      { label: 'In code — counter, budget, or state machine', verdict: 'made', evidence: 'exit condition bounded in code' },
      { label: 'In the prompt', verdict: 'open', evidence: 'exit condition lives in the prompt' },
      { label: 'I have not located it', verdict: 'open', evidence: 'exit condition not located' },
    ],
  },
  {
    id: 'trust',
    index: '03',
    reportName: 'Trust boundary      ',
    title: 'Where does the trust boundary sit?',
    question: 'Can you point to the line where retrieved text becomes labelled data?',
    fix: 'Fence retrieved text into the data position and gate side effects behind approval.',
    options: [
      { label: 'Yes — fenced, and side effects are gated', verdict: 'made', evidence: 'retrieved text fenced as data; side effects gated' },
      { label: 'No — it reaches the window as plain text', verdict: 'open', evidence: 'no line where retrieved text becomes labelled data' },
      { label: 'I have not traced it', verdict: 'open', evidence: 'boundary not traced' },
    ],
  },
  {
    id: 'run',
    index: '04',
    reportName: 'Long-run home       ',
    title: 'Where does a long run live?',
    question: 'Do you know your longest production run, and your platform’s ceiling?',
    fix: 'Measure the longest real run — not the median — then pick the primitive that outlives it.',
    options: [
      { label: 'Both numbers — and the ceiling is higher', verdict: 'made', evidence: 'longest run and platform ceiling both known; ceiling higher' },
      { label: 'Both numbers — and the ceiling is close or lower', verdict: 'open', evidence: 'longest run crowds or exceeds the platform ceiling' },
      { label: 'I do not know one or both', verdict: 'open', evidence: 'longest run or platform ceiling unknown' },
    ],
  },
]

/**
 * Which open decision to fix first. Trust rises in cost fastest (it scales with
 * tools already shipped), then the runtime home, then the loop, then the seam —
 * the seam is the cheapest to defer, so it goes last.
 */
const FIX_PRIORITY: Decision['id'][] = ['trust', 'run', 'loop', 'model']

type Answers = Record<Decision['id'], number | null>

const EMPTY_ANSWERS: Answers = { model: null, loop: null, trust: null, run: null }

function buildReport(answers: Answers, date: string): string {
  const lines = DECISIONS.map((d, i) => {
    const option = d.options[answers[d.id] as number]
    const verdict = option.verdict === 'made' ? 'MADE' : 'OPEN'
    return `${i + 1}. ${d.reportName}— ${verdict.padEnd(5)} (evidence: ${option.evidence})`
  })
  const firstOpen = FIX_PRIORITY.find((id) => DECISIONS.find((d) => d.id === id)!.options[answers[id] as number].verdict === 'open')
  const fixFirst = firstOpen
    ? (() => {
        const d = DECISIONS.find((entry) => entry.id === firstOpen)!
        return `${d.reportName.trim()} — ${d.fix.charAt(0).toLowerCase()}${d.fix.slice(1)}`
      })()
    : 'Nothing. All four are made — re-run after the next architecture change.'

  return [
    `## Architecture review — self-run, ${date}`,
    '',
    '### The four decisions',
    ...lines,
    '',
    '### Fix first',
    fixFirst,
    '',
    'Rubric: https://www.frankx.ai/ai-architect',
    'Skill (MIT): https://www.frankx.ai/skills/ai-architect-review/SKILL.md',
  ].join('\n')
}

export default function ReviewRunner() {
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'manual'>('idle')
  const [report, setReport] = useState('')

  const answered = DECISIONS.filter((d) => answers[d.id] !== null).length
  const complete = answered === DECISIONS.length

  const openIds = useMemo(
    () =>
      DECISIONS.filter(
        (d) => answers[d.id] !== null && d.options[answers[d.id] as number].verdict === 'open',
      ).map((d) => d.id),
    [answers],
  )
  const fixFirstId = FIX_PRIORITY.find((id) => openIds.includes(id))

  // The report carries a date, so it is built client-side on completion rather
  // than during render — the server never renders the complete state.
  useEffect(() => {
    if (!complete) {
      setReport('')
      return
    }
    setReport(buildReport(answers, new Date().toISOString().slice(0, 10)))
    trackEvent('ai_architect_review_completed', { open_count: openIds.length })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complete])

  const copyReport = async () => {
    trackEvent('ai_architect_review_copied', {})
    try {
      await navigator.clipboard.writeText(report)
      setCopyState('copied')
      setTimeout(() => setCopyState('idle'), 2000)
    } catch {
      setCopyState('manual')
    }
  }

  const reset = () => {
    setAnswers(EMPTY_ANSWERS)
    setCopyState('idle')
    setReport('')
  }

  return (
    <div>
      <div className="space-y-10">
        {DECISIONS.map((decision) => (
          <fieldset key={decision.id}>
            <legend className="flex items-baseline gap-3">
              <span className="font-mono text-xs text-emerald-300">{decision.index}</span>
              <span className="text-lg font-semibold text-white">{decision.title}</span>
            </legend>
            <p className="mt-2 text-sm leading-6 text-slate-400">{decision.question}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {decision.options.map((option, optionIndex) => (
                <label key={option.label} className="relative block">
                  <input
                    type="radio"
                    name={`review-${decision.id}`}
                    className="peer sr-only"
                    checked={answers[decision.id] === optionIndex}
                    onChange={() => {
                      setAnswers((prev) => ({ ...prev, [decision.id]: optionIndex }))
                      setCopyState('idle')
                    }}
                  />
                  <span className="block h-full cursor-pointer rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-sm leading-6 text-slate-300 transition-colors hover:border-white/25 peer-checked:border-emerald-300/60 peer-checked:bg-emerald-400/[0.06] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400/70 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-void">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div aria-live="polite" className="mt-12 rounded-2xl border border-white/[0.1] bg-white/[0.02] p-6 sm:p-8">
        {!complete ? (
          <p className="text-sm text-slate-400">
            {answered} of {DECISIONS.length} answered. The verdict appears when all four are in.
          </p>
        ) : (
          <div>
            <p className="font-mono text-xs text-emerald-300">Verdict</p>
            <ul className="mt-4 space-y-3">
              {DECISIONS.map((decision) => {
                const option = decision.options[answers[decision.id] as number]
                const made = option.verdict === 'made'
                return (
                  <li key={decision.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-xs text-slate-500">{decision.index}</span>
                    <span className="text-sm font-semibold text-white">{decision.title}</span>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${
                        made
                          ? 'border-emerald-300/40 text-emerald-300'
                          : 'border-amber-400/40 text-amber-400'
                      }`}
                    >
                      {made ? 'MADE' : 'OPEN'}
                    </span>
                    {!made ? (
                      <span className="basis-full text-sm leading-6 text-slate-400 sm:basis-auto">
                        {decision.fix}
                      </span>
                    ) : null}
                  </li>
                )
              })}
            </ul>
            <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-6 text-slate-300">
              <span className="text-slate-500">Fix first: </span>
              {fixFirstId
                ? DECISIONS.find((d) => d.id === fixFirstId)!.fix
                : 'Nothing. All four are made — re-run after the next architecture change, because these decisions drift.'}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={copyReport}
                className={`inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-100 ${FOCUS_RING}`}
              >
                <Copy className="h-4 w-4" aria-hidden="true" />
                {copyState === 'copied' ? 'Copied' : 'Copy the report'}
              </button>
              <button
                type="button"
                onClick={reset}
                className={`rounded-sm text-sm text-slate-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white ${FOCUS_RING}`}
              >
                Start over
              </button>
            </div>
            {copyState === 'manual' ? (
              <p className="mt-3 text-sm text-amber-400">
                Clipboard access is blocked here — copy it from the block below.
              </p>
            ) : null}
            <details className="mt-5" open={copyState === 'manual'}>
              <summary
                className={`cursor-pointer list-none rounded-lg text-sm text-slate-400 marker:hidden hover:text-white ${FOCUS_RING}`}
              >
                View as markdown
              </summary>
              <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs leading-6 text-slate-300">
                {report}
              </pre>
            </details>
            <p className="mt-6 text-sm leading-6 text-slate-500">
              This ran against your memory of the codebase. The installable skill below runs the
              same questions against the codebase itself — grep, not recollection.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
