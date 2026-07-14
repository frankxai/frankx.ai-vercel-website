'use client'

import { useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Handshake,
  LayoutDashboard,
  ReceiptText,
  SearchCheck,
  Users,
} from 'lucide-react'

import {
  anaWorkflowStages,
  type AnaWorkflowStage,
} from '@/data/ana-collaboration'

const iconByStage: Record<AnaWorkflowStage['id'], typeof LayoutDashboard> = {
  board: LayoutDashboard,
  'first-call': Users,
  kickoff: Handshake,
  'job-description': FileText,
  offer: FileCheck2,
  recruiting: SearchCheck,
  invoice: ReceiptText,
  handoff: ClipboardCheck,
}

function StageButton({
  stage,
  active,
  onSelect,
  className = '',
}: {
  stage: AnaWorkflowStage
  active: boolean
  onSelect: (stageId: AnaWorkflowStage['id']) => void
  className?: string
}) {
  const Icon = iconByStage[stage.id]
  const tabId = `ana-workflow-tab-${stage.id}`
  const panelId = 'ana-workflow-panel'

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const currentIndex = anaWorkflowStages.findIndex((item) => item.id === stage.id)
    let nextIndex: number | null = null

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % anaWorkflowStages.length
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + anaWorkflowStages.length) % anaWorkflowStages.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = anaWorkflowStages.length - 1
    }

    if (nextIndex === null) return
    event.preventDefault()
    const nextStage = anaWorkflowStages[nextIndex]
    onSelect(nextStage.id)
    requestAnimationFrame(() => {
      document.getElementById(`ana-workflow-tab-${nextStage.id}`)?.focus()
    })
  }

  return (
    <button
      id={tabId}
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={panelId}
      tabIndex={active ? 0 : -1}
      onClick={() => onSelect(stage.id)}
      onKeyDown={handleKeyDown}
      className={`group min-h-20 rounded-[1.4rem] border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ana-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ana-obsidian ${
        active
          ? 'border-ana-gold/[0.65] bg-ana-gold/[0.14] shadow-ana-glow'
          : 'border-white/10 bg-white/[0.035] hover:border-white/25 hover:bg-white/[0.06]'
      } ${className}`}
    >
      <span className="flex items-start gap-3">
        <span
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${
            active
              ? 'border-ana-gold/[0.45] bg-ana-gold/[0.14] text-ana-cream'
              : 'border-white/10 bg-black/20 text-white/[0.55] group-hover:text-white/80'
          }`}
        >
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
        <span>
          <span className="block font-mono text-[10px] tracking-[0.12em] text-ana-gold">
            {stage.number}
          </span>
          <span className="mt-1 block text-sm font-semibold text-ana-cream">
            {stage.shortLabel}
          </span>
        </span>
      </span>
    </button>
  )
}

function FlowArrow({ vertical = false }: { vertical?: boolean }) {
  const Icon = vertical ? ArrowDown : ArrowRight
  return (
    <span className="grid h-7 w-7 shrink-0 place-items-center text-ana-gold/[0.65]" aria-hidden="true">
      <Icon className="h-4 w-4" />
    </span>
  )
}

export function AnaTeamWorkflow() {
  const [activeId, setActiveId] = useState<AnaWorkflowStage['id']>('first-call')
  const active =
    anaWorkflowStages.find((stage) => stage.id === activeId) ?? anaWorkflowStages[1]

  const stage = (id: AnaWorkflowStage['id']) =>
    anaWorkflowStages.find((item) => item.id === id)!

  return (
    <section
      aria-labelledby="ana-workflow-title"
      className="overflow-hidden rounded-[2.4rem] border border-white/10 bg-ana-obsidian/90 shadow-[0_34px_130px_rgba(0,0,0,0.42)]"
    >
      <div className="border-b border-white/10 px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">
              One client journey, clearly shared
            </p>
            <h2 id="ana-workflow-title" className="mt-2 text-2xl font-semibold tracking-tight text-ana-cream sm:text-3xl">
              Review the path your team already runs
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-ana-cream/[0.55]">
            Select a stage to see who owns the work, how AI can support preparation, and which decision stays human.
          </p>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div role="tablist" aria-label="Ana HR workflow stages" className="rounded-[1.9rem] border border-white/[0.08] bg-black/20 p-3 sm:p-4">
          <div className="mb-3 flex items-center gap-3 rounded-[1.35rem] border border-emerald-300/[0.15] bg-emerald-300/[0.055] p-3">
            <StageButton
              stage={stage('board')}
              active={activeId === 'board'}
              onSelect={setActiveId}
              className="flex-1"
            />
            <span className="hidden text-xs leading-5 text-emerald-100/[0.55] sm:block">
              Current view
            </span>
          </div>

          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            <StageButton
              stage={stage('first-call')}
              active={activeId === 'first-call'}
              onSelect={setActiveId}
              className="flex-1"
            />
            <span className="hidden sm:block"><FlowArrow /></span>
            <span className="sm:hidden"><FlowArrow vertical /></span>
            <StageButton
              stage={stage('kickoff')}
              active={activeId === 'kickoff'}
              onSelect={setActiveId}
              className="flex-1"
            />
          </div>

          <div className="my-2 flex justify-center"><FlowArrow vertical /></div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.55rem] border border-white/[0.08] bg-white/[0.025] p-2.5">
              <p className="px-2 pb-2 text-[10px] font-semibold tracking-[0.08em] text-white/[0.38]">
                Recruiting lane
              </p>
              <div className="flex flex-col items-stretch gap-2">
                <StageButton
                  stage={stage('job-description')}
                  active={activeId === 'job-description'}
                  onSelect={setActiveId}
                />
                <div className="flex justify-center"><FlowArrow vertical /></div>
                <StageButton
                  stage={stage('recruiting')}
                  active={activeId === 'recruiting'}
                  onSelect={setActiveId}
                />
              </div>
            </div>

            <div className="rounded-[1.55rem] border border-white/[0.08] bg-white/[0.025] p-2.5">
              <p className="px-2 pb-2 text-[10px] font-semibold tracking-[0.08em] text-white/[0.38]">
                Commercial lane
              </p>
              <div className="flex flex-col items-stretch gap-2">
                <StageButton
                  stage={stage('offer')}
                  active={activeId === 'offer'}
                  onSelect={setActiveId}
                />
                <div className="flex justify-center"><FlowArrow vertical /></div>
                <StageButton
                  stage={stage('invoice')}
                  active={activeId === 'invoice'}
                  onSelect={setActiveId}
                />
              </div>
            </div>
          </div>

          <div className="my-2 flex justify-center"><FlowArrow vertical /></div>
          <StageButton
            stage={stage('handoff')}
            active={activeId === 'handoff'}
            onSelect={setActiveId}
            className="w-full"
          />
        </div>

        <div
          id="ana-workflow-panel"
          role="tabpanel"
          aria-labelledby={`ana-workflow-tab-${active.id}`}
          tabIndex={0}
          className="rounded-[1.9rem] border border-ana-gold/20 bg-ana-stage p-5 sm:p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ana-gold"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-xs tracking-[0.12em] text-ana-gold">
              Stage {active.number}
            </span>
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-3 py-1 text-[11px] font-semibold text-emerald-100/80">
              Prepared for review
            </span>
          </div>
          <h3 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-ana-cream">
            {active.title}
          </h3>
          <p className="mt-4 text-base leading-7 text-ana-cream/[0.65]">{active.purpose}</p>

          <dl className="mt-7 grid gap-3">
            {[
              ['Team owns', active.teamRole],
              ['AI supports', active.aiRole],
              ['Decision owner', active.approval],
              ['Ready output', active.output],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.35rem] border border-white/[0.09] bg-black/20 p-4">
                <dt className="flex items-center gap-2 text-xs font-semibold tracking-[0.06em] text-ana-gold">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-ana-cream/[0.68]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
