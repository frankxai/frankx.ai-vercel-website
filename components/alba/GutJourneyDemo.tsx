'use client'

import { useState } from 'react'
import {
  Check,
  ClipboardCheck,
  FileHeart,
  NotebookTabs,
  Salad,
  ScanSearch,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

import { trackEvent } from '@/lib/analytics'

type JourneyStage = {
  id: string
  number: string
  short: string
  title: string
  description: string
  artifactLabel: string
  artifactTitle: string
  artifactLines: readonly string[]
  inputsUsed: readonly string[]
  inputsExcluded: readonly string[]
  owner: string
  icon: LucideIcon
}

const JOURNEY: readonly JourneyStage[] = [
  {
    id: 'context',
    number: '01',
    short: 'Context',
    title: 'Start with family reality.',
    description:
      'A parent chooses the minimum data scope, confirms allergy status, and names the foods and constraints that shape an ordinary week.',
    artifactLabel: 'Fictional family context',
    artifactTitle: 'Milo · age band 5–8',
    artifactLines: [
      'Goal: make food variety easier',
      'Safe bases: oats, yogurt, pasta, peas, apples',
      'Learning foods: lentils, berries',
      'Reality: 25-minute prep · five school days',
    ],
    inputsUsed: ['Parent consent', 'Age band', 'Allergy gate', 'Food preferences'],
    inputsExcluded: ['Name or birth date', 'Symptoms', 'Raw health record'],
    owner: 'Parent',
    icon: NotebookTabs,
  },
  {
    id: 'interpretation',
    number: '02',
    short: 'Science',
    title: 'Use an approved interpretation—not raw data.',
    description:
      'A qualified partner adapter supplies only reviewed goals, permitted food categories, evidence grade, and claim boundaries.',
    artifactLabel: 'Approved science envelope',
    artifactTitle: 'Partner-reviewed · v0.1',
    artifactLines: [
      'Goal: increase food variety',
      'Permitted categories: legumes, whole grains, fruit',
      'Excluded: diagnosis, treatment, guaranteed outcomes',
      'Human review: available when the gate requires it',
    ],
    inputsUsed: ['Adapter identity', 'Review date', 'Evidence grade', 'Claims scope'],
    inputsExcluded: ['Sequencing file', 'Taxa table', 'Free-text clinical inference'],
    owner: 'Licensed science partner',
    icon: ScanSearch,
  },
  {
    id: 'first-week',
    number: '03',
    short: 'First week',
    title: 'Compile one week that can survive Tuesday.',
    description:
      'Each meal begins with a familiar base, introduces at most one optional learning food, and preserves a fallback.',
    artifactLabel: 'Tuesday dinner',
    artifactTitle: 'Build-your-own pasta bowls',
    artifactLines: [
      'Safe base: pasta + peas',
      'Learning food: lentil tomato spoon on the side',
      'Fallback: familiar plain sauce',
      'Prep: 22 minutes · lunchbox leftovers reserved',
    ],
    inputsUsed: ['Safe candidate set', 'Prep ceiling', 'School rhythm', 'Budget band'],
    inputsExcluded: ['Medical diet therapy', 'Supplements', 'Outcome promises'],
    owner: 'Public planning core + parent review',
    icon: Salad,
  },
  {
    id: 'reflection',
    number: '04',
    short: 'Reflection',
    title: 'Learn from behavior, without inventing biology.',
    description:
      'The weekly review records what was offered, tasted, accepted, or skipped—and what was practical for the family.',
    artifactLabel: 'Parent-reviewed observation',
    artifactTitle: 'Week one · neutral summary',
    artifactLines: [
      'Offered twice · tasted once',
      'Best moment: family-style serving',
      'Friction: Thursday prep ran long',
      'Next experiment: repeat once; keep the same fallback',
    ],
    inputsUsed: ['Parent observations', 'Practicality', 'Food acceptance', 'Routine friction'],
    inputsExcluded: ['Causal claims', 'Symptom interpretation', 'Microbiome change claim'],
    owner: 'Parent',
    icon: ClipboardCheck,
  },
  {
    id: 'handoff',
    number: '05',
    short: 'Handoff',
    title: 'Give the coach a sharper conversation.',
    description:
      'A concise handoff separates parent observations, system provenance, and questions that require qualified judgment.',
    artifactLabel: 'Coach handoff',
    artifactTitle: 'Three useful questions',
    artifactLines: [
      'Is the pace of food exposure appropriate?',
      'Which approved category should we prioritize next?',
      'Does anything here require clinician review?',
      'Parent approval recorded before export',
    ],
    inputsUsed: ['Approved weekly summary', 'Adapter provenance', 'Open questions'],
    inputsExcluded: ['Unreviewed notes', 'Diagnosis', 'Automated care decision'],
    owner: 'Qualified coach / clinician',
    icon: FileHeart,
  },
] as const

export function GutJourneyDemo() {
  const [activeId, setActiveId] = useState<string>(JOURNEY[0].id)
  const activeIndex = JOURNEY.findIndex((stage) => stage.id === activeId)
  const active = JOURNEY[activeIndex]

  return (
    <div
      id="journey"
      className="scroll-mt-8 overflow-hidden rounded-[2rem] border border-[#183c30]/10 bg-white shadow-[0_28px_100px_rgba(31,64,51,0.12)]"
    >
      <div className="border-b border-[#183c30]/10 px-5 py-5 sm:px-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#52675f]">
              Fictional journey · no personal data
            </p>
            <p className="mt-1 text-sm font-semibold text-[#173c30]">
              From approved context to coach handoff
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#edf5ef] px-3 py-1.5 text-[11px] font-semibold text-[#32664e]">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Gates active
          </span>
        </div>

        <div
          aria-hidden="true"
          className="relative mt-5 h-px overflow-hidden bg-[#dbe8de]"
        >
          <div
            className="absolute inset-y-0 left-0 bg-[#3d8a62] transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${((activeIndex + 1) / JOURNEY.length) * 100}%` }}
          />
        </div>

        <div
          className="mt-4 grid grid-cols-5 gap-1"
          role="tablist"
          aria-label="Fictional family gut journey"
        >
          {JOURNEY.map((stage) => {
            const Icon = stage.icon
            const selected = stage.id === active.id

            return (
              <button
                key={stage.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="gut-journey-panel"
                onClick={() => {
                  setActiveId(stage.id)
                  trackEvent('alba_gut_journey_stage_selected', {
                    stage: stage.id,
                  })
                }}
                className={`group flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-2xl px-1 py-2 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d8a62] motion-reduce:transition-none ${
                  selected
                    ? 'bg-[#173c30] text-white'
                    : 'text-[#465c54] hover:bg-[#f3f7f2] hover:text-[#173c30]'
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${selected ? 'text-[#bfe2c8]' : 'text-[#789188]'}`}
                  aria-hidden="true"
                />
                <span className="hidden text-[10px] font-semibold sm:block">
                  {stage.short}
                </span>
                <span className="text-[9px] font-semibold sm:hidden">
                  {stage.number}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div
        id="gut-journey-panel"
        role="tabpanel"
        className="grid lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="border-b border-[#183c30]/10 bg-[#f4f0e7] p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <p className="font-mono text-xs font-semibold text-[#32664e]">
            {active.number} / 05
          </p>
          <h2 className="mt-4 max-w-md text-2xl font-semibold tracking-[-0.03em] text-[#173c30] sm:text-3xl">
            {active.title}
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-[#52675f]">
            {active.description}
          </p>

          <div className="mt-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#52675f]">
              Authority at this stage
            </p>
            <p className="mt-2 text-sm font-semibold text-[#173c30]">
              {active.owner}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#52675f]">
            {active.artifactLabel}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#173c30]">
            {active.artifactTitle}
          </h3>
          <ul className="mt-5 space-y-3">
            {active.artifactLines.map((line) => (
              <li
                key={line}
                className="flex items-start gap-2.5 text-sm leading-6 text-[#52675f]"
              >
                <Check
                  className="mt-1 h-4 w-4 shrink-0 text-[#3d8a62]"
                  aria-hidden="true"
                />
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-7 grid gap-4 border-t border-[#183c30]/10 pt-6 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#32664e]">
                Used
              </p>
              <p className="mt-2 text-xs leading-5 text-[#52675f]">
                {active.inputsUsed.join(' · ')}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#824c45]">
                Deliberately excluded
              </p>
              <p className="mt-2 text-xs leading-5 text-[#52675f]">
                {active.inputsExcluded.join(' · ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
