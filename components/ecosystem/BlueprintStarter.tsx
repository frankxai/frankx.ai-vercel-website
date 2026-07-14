'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

type BlueprintKind = 'student' | 'life'

interface StarterPlan {
  id: string
  label: string
  title: string
  outcome: string
  inputs: string[]
  steps: string[]
  reviewGate: string
  boundary: string
}

const STUDENT_PLANS: StarterPlan[] = [
  {
    id: 'technical-project',
    label: 'Technical project',
    title: 'First week: technical project control loop',
    outcome: 'A working project brief, source queue, repository state, and one reviewable implementation slice.',
    inputs: ['Assignment or problem statement', 'Current repository or notebook', 'Marking rubric or acceptance criteria'],
    steps: [
      'Write the problem, constraints, and acceptance criteria in one page.',
      'Create a source queue with a reason for reading each source.',
      'Record the current repository state, known failures, and next smallest test.',
      'Implement one bounded slice and attach the command output or screenshot.',
      'Review the slice against the rubric before expanding scope.',
    ],
    reviewGate: 'A human can trace the implementation decision back to the assignment, source, and test evidence.',
    boundary: 'The system may organize and challenge the work; it may not fabricate results or represent generated work as independent authorship.',
  },
  {
    id: 'thesis',
    label: 'Thesis or paper',
    title: 'First week: thesis evidence loop',
    outcome: 'A bounded question, claim map, source queue, uncertainty log, and supervisor-ready review packet.',
    inputs: ['Research question or working topic', 'Supervisor feedback', 'Existing bibliography and draft fragments'],
    steps: [
      'Rewrite the research question with scope, population, method, and exclusions.',
      'Map the claims the paper must support and the evidence each claim requires.',
      'Separate sources into read, extract, challenge, and reject queues.',
      'Draft one argument section with citations and explicit uncertainty notes.',
      'Prepare three specific supervisor questions tied to the current draft.',
    ],
    reviewGate: 'Every substantive claim is traceable to a source, and every unresolved uncertainty is visible before review.',
    boundary: 'The researcher owns the argument, citation integrity, interpretation, and final submission.',
  },
  {
    id: 'evidence-review',
    label: 'Evidence review',
    title: 'First week: evidence review control loop',
    outcome: 'A structured question, dated source set, extraction table, disagreement log, and human-reviewed synthesis.',
    inputs: ['Review question', 'Inclusion and exclusion criteria', 'Approved databases or source collections'],
    steps: [
      'Define the question and inclusion criteria before searching.',
      'Record search dates, databases, search strings, and result counts.',
      'Extract methods, populations, outcomes, limitations, and conflicts into one table.',
      'Log disagreements and evidence gaps instead of averaging them away.',
      'Write a synthesis that separates findings, interpretation, and open questions.',
    ],
    reviewGate: 'A reviewer can reproduce the source path and distinguish evidence from interpretation.',
    boundary: 'Research and study support only. No diagnosis, treatment recommendation, or patient-specific conclusion.',
  },
]

const LIFE_PLANS: StarterPlan[] = [
  {
    id: 'operations',
    label: 'Daily operations',
    title: 'First week: commitments and admin loop',
    outcome: 'One trusted view of commitments, recurring admin, waiting items, and decisions that need review.',
    inputs: ['Calendars and task lists', 'Recurring bills and admin dates', 'Open loops currently held in memory'],
    steps: [
      'Collect active commitments into one inbox without reorganizing them yet.',
      'Classify each item as do, schedule, wait, delegate, or archive.',
      'Create a recurring-admin register with owner, date, evidence, and next review.',
      'Choose the three commitments that define a successful week.',
      'Run a 20-minute review and record what changed.',
    ],
    reviewGate: 'Every active commitment has an owner, next action, date, or explicit decision to stop.',
    boundary: 'Agents may prepare and remind. Bookings, payments, messages, and account changes require approval.',
  },
  {
    id: 'knowledge',
    label: 'Knowledge and memory',
    title: 'First week: retrievable knowledge loop',
    outcome: 'A small, searchable set of source-backed notes connected to decisions and active work.',
    inputs: ['Notes, highlights, and voice memos', 'Active projects', 'Questions worth revisiting'],
    steps: [
      'Choose one canonical capture inbox and stop creating new destinations.',
      'Convert ten useful items into source-backed notes with dates and links.',
      'Connect each note to a project, person, question, or decision.',
      'Create one decision record showing what evidence changed your view.',
      'Review what should stay private, be shared, or be deleted.',
    ],
    reviewGate: 'A future reader can tell where the note came from, why it matters, and what decision it informed.',
    boundary: 'Private memory stays mounted behind access controls and is never copied into public repositories or model prompts by default.',
  },
  {
    id: 'business-creator',
    label: 'Business and creator work',
    title: 'First week: operator command spine',
    outcome: 'A visible link between one business priority, one creative output, its evidence, and the next decision.',
    inputs: ['Current business constraint', 'Active creative brief', 'Customer or audience evidence'],
    steps: [
      'Name one business outcome and the evidence that would count as progress.',
      'Select one creative artifact that directly supports that outcome.',
      'Define the research, production, review, and distribution owners.',
      'Attach the artifact, source material, and approval state to one record.',
      'Review the result and choose the next experiment without changing pricing or sending externally.',
    ],
    reviewGate: 'The output is connected to a real business question, inspectable evidence, and a named human decision.',
    boundary: 'Customer sends, pricing, contracts, spend, and production changes remain human-gated.',
  },
  {
    id: 'legacy',
    label: 'Family and legacy',
    title: 'First week: family-safe record loop',
    outcome: 'One consented, source-backed story record with clear access and preservation decisions.',
    inputs: ['One story or event', 'Available source material', 'People whose consent or context is required'],
    steps: [
      'Choose one bounded story and identify who can speak to it.',
      'Record consent, access expectations, and what must remain private.',
      'Collect dates, names, images, recordings, and source provenance.',
      'Draft the story while separating memory, evidence, and uncertainty.',
      'Review the record with the people represented before preserving or sharing it.',
    ],
    reviewGate: 'The people represented understand the record, its access level, and how it may be used.',
    boundary: 'Consent, dignity, privacy, and correction rights take precedence over completeness or automation.',
  },
]

function formatPlan(plan: StarterPlan): string {
  return [
    plan.title,
    '',
    `Outcome: ${plan.outcome}`,
    '',
    'Inputs:',
    ...plan.inputs.map((input) => `- ${input}`),
    '',
    'First-week loop:',
    ...plan.steps.map((step, index) => `${index + 1}. ${step}`),
    '',
    `Review gate: ${plan.reviewGate}`,
    `Boundary: ${plan.boundary}`,
  ].join('\n')
}

export default function BlueprintStarter({ kind }: { kind: BlueprintKind }) {
  const plans = kind === 'student' ? STUDENT_PLANS : LIFE_PLANS
  const [selectedId, setSelectedId] = useState(plans[0].id)
  const [copied, setCopied] = useState(false)
  const selectedPlan = plans.find((plan) => plan.id === selectedId) ?? plans[0]

  async function copyPlan() {
    await navigator.clipboard.writeText(formatPlan(selectedPlan))
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="starter" className="border-y border-white/[0.08] bg-[#0d0d0f] py-14 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-cyan-300">Build your first-week system</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Start with one bounded loop.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Choose the pressure you need to make visible. The result is a concrete starter plan you can take into your own workspace.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Starter plan type">
          {plans.map((plan) => {
            const selected = plan.id === selectedPlan.id
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedId(plan.id)}
                aria-pressed={selected}
                className={`min-h-11 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0f] ${
                  selected
                    ? 'border-cyan-400/50 bg-cyan-400/[0.08] text-white'
                    : 'border-white/[0.1] bg-white/[0.02] text-zinc-400 hover:border-white/[0.2] hover:text-zinc-200'
                }`}
              >
                {plan.label}
              </button>
            )
          })}
        </div>

        <div className="mt-6 rounded-lg border border-white/[0.1] bg-black/30 p-6 sm:p-8" aria-live="polite">
          <div className="flex flex-col gap-5 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">{selectedPlan.title}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">{selectedPlan.outcome}</p>
            </div>
            <button
              type="button"
              onClick={copyPlan}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-white/[0.14] px-3.5 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-white/[0.28] hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-300" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy plan'}
            </button>
          </div>

          <div className="mt-7 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <h4 className="text-sm font-medium text-zinc-500">Bring these inputs</h4>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-300">
                {selectedPlan.inputs.map((input) => (
                  <li key={input} className="border-l border-cyan-400/40 pl-3">{input}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-zinc-500">First-week loop</h4>
              <ol className="mt-3 space-y-3">
                {selectedPlan.steps.map((step, index) => (
                  <li key={step} className="grid grid-cols-[2rem_1fr] gap-2 text-sm leading-relaxed text-zinc-300">
                    <span className="font-mono text-xs text-cyan-300">0{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-8 grid gap-5 border-t border-white/[0.08] pt-6 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium text-zinc-500">Review gate</h4>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{selectedPlan.reviewGate}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-zinc-500">Boundary</h4>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{selectedPlan.boundary}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
