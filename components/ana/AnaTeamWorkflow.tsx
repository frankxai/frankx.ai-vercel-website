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
  onSelect: () => void
  className?: string
}) {
  const Icon = iconByStage[stage.id]

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className={`group min-h-20 rounded-[1.4rem] border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e4bd83] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0a08] ${
        active
          ? 'border-[#e4bd83]/[0.65] bg-[#e4bd83]/[0.14] shadow-[0_18px_60px_rgba(228,189,131,0.11)]'
          : 'border-white/10 bg-white/[0.035] hover:border-white/25 hover:bg-white/[0.06]'
      } ${className}`}
    >
      <span className="flex items-start gap-3">
        <span
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${
            active
              ? 'border-[#e4bd83]/[0.45] bg-[#e4bd83]/[0.14] text-[#f8dfb7]'
              : 'border-white/10 bg-black/20 text-white/[0.55] group-hover:text-white/80'
          }`}
        >
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
        <span>
          <span className="block font-mono text-[10px] tracking-[0.18em] text-[#d3a66d]">
            {stage.number}
          </span>
          <span className="mt-1 block text-sm font-semibold text-[#fff8e9]">
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
    <span className="grid h-7 w-7 shrink-0 place-items-center text-[#d3a66d]/[0.65]" aria-hidden="true">
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
      className="overflow-hidden rounded-[2.4rem] border border-white/10 bg-[#0b0a08]/90 shadow-[0_34px_130px_rgba(0,0,0,0.42)]"
    >
      <div className="border-b border-white/10 px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d3a66d]">
              One client, one clear path
            </p>
            <h2 id="ana-workflow-title" className="mt-2 text-2xl font-semibold tracking-tight text-[#fff8e9] sm:text-3xl">
              Explore Ana's real operating sequence
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#fff8e9]/[0.55]">
            Select any stage to see what the team prepares, what AI may do, and where human approval remains required.
          </p>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-6 xl:grid-cols-[1.08fr_0.92fr]">
        <nav aria-label="Ana HR workflow stages" className="rounded-[1.9rem] border border-white/[0.08] bg-black/20 p-3 sm:p-4">
          <div className="mb-3 flex items-center gap-3 rounded-[1.35rem] border border-emerald-300/[0.15] bg-emerald-300/[0.055] p-3">
            <StageButton
              stage={stage('board')}
              active={activeId === 'board'}
              onSelect={() => setActiveId('board')}
              className="flex-1"
            />
            <span className="hidden text-xs leading-5 text-emerald-100/[0.55] sm:block">
              Always on
            </span>
          </div>

          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            <StageButton
              stage={stage('first-call')}
              active={activeId === 'first-call'}
              onSelect={() => setActiveId('first-call')}
              className="flex-1"
            />
            <span className="hidden sm:block"><FlowArrow /></span>
            <span className="sm:hidden"><FlowArrow vertical /></span>
            <StageButton
              stage={stage('kickoff')}
              active={activeId === 'kickoff'}
              onSelect={() => setActiveId('kickoff')}
              className="flex-1"
            />
          </div>

          <div className="my-2 flex justify-center"><FlowArrow vertical /></div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.55rem] border border-white/[0.08] bg-white/[0.025] p-2.5">
              <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/[0.38]">
                Recruiting lane
              </p>
              <div className="flex flex-col items-stretch gap-2">
                <StageButton
                  stage={stage('job-description')}
                  active={activeId === 'job-description'}
                  onSelect={() => setActiveId('job-description')}
                />
                <div className="flex justify-center"><FlowArrow vertical /></div>
                <StageButton
                  stage={stage('recruiting')}
                  active={activeId === 'recruiting'}
                  onSelect={() => setActiveId('recruiting')}
                />
              </div>
            </div>

            <div className="rounded-[1.55rem] border border-white/[0.08] bg-white/[0.025] p-2.5">
              <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/[0.38]">
                Commercial lane
              </p>
              <div className="flex flex-col items-stretch gap-2">
                <StageButton
                  stage={stage('offer')}
                  active={activeId === 'offer'}
                  onSelect={() => setActiveId('offer')}
                />
                <div className="flex justify-center"><FlowArrow vertical /></div>
                <StageButton
                  stage={stage('invoice')}
                  active={activeId === 'invoice'}
                  onSelect={() => setActiveId('invoice')}
                />
              </div>
            </div>
          </div>

          <div className="my-2 flex justify-center"><FlowArrow vertical /></div>
          <StageButton
            stage={stage('handoff')}
            active={activeId === 'handoff'}
            onSelect={() => setActiveId('handoff')}
            className="w-full"
          />
        </nav>

        <div aria-live="polite" className="rounded-[1.9rem] border border-[#e4bd83]/20 bg-[linear-gradient(145deg,rgba(228,189,131,0.10),rgba(255,255,255,0.035),rgba(25,82,63,0.08))] p-5 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-xs tracking-[0.18em] text-[#d3a66d]">
              STAGE {active.number}
            </span>
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-3 py-1 text-[11px] font-semibold text-emerald-100/80">
              Available in v1
            </span>
          </div>
          <h3 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-[#fff8e9]">
            {active.title}
          </h3>
          <p className="mt-4 text-base leading-7 text-[#fff8e9]/[0.65]">{active.purpose}</p>

          <dl className="mt-7 grid gap-3">
            {[
              ['Team prepares', active.teamRole],
              ['AI may help', active.aiRole],
              ['Approval required', active.approval],
              ['Stage output', active.output],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.35rem] border border-white/[0.09] bg-black/20 p-4">
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#d3a66d]">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-[#fff8e9]/[0.68]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
