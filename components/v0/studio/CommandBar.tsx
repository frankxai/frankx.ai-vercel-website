"use client"

import {
  Ban,
  Frame,
  Maximize2,
  Play,
  RotateCcw,
  Save,
  SlidersHorizontal,
  UploadCloud,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { FoundryStudio } from "./use-foundry-studio"
import { StatusChip } from "./Surfaces"

/**
 * Compact top command bar. Holds identity, workflow selection, run controls,
 * and workflow persistence. The single primary control is the Run pill.
 */

function IconButton({
  label,
  onClick,
  icon: Icon,
  active,
}: {
  label: string
  onClick: () => void
  icon: typeof Frame
  active?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-md border border-[#1e1e1e] bg-[#111113] text-[#8a8a93] transition-colors hover:border-[#2a2a2e] hover:text-[#f4f4f5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]/50",
        active && "border-[#06b6d4]/60 text-[#06b6d4]",
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  )
}

interface CommandBarProps {
  studio: FoundryStudio
  onOpenImportExport: () => void
}

export function CommandBar({ studio, onOpenImportExport }: CommandBarProps) {
  const {
    meta,
    seedWorkflows,
    savedIds,
    loadWorkflow,
    engineStatus,
    run,
    cancel,
    resumeReview,
    restartFromFailed,
    fitView,
    save,
    dirty,
    failNextRun,
    setFailNextRun,
  } = studio

  const savedOnly = savedIds.filter((id) => !seedWorkflows.some((w) => w.id === id))

  const renderRunControl = () => {
    if (engineStatus === "running") {
      return (
        <PrimaryPill onClick={cancel} icon={Ban} tone="cancel">
          Cancel run
        </PrimaryPill>
      )
    }
    if (engineStatus === "review-needed") {
      return (
        <PrimaryPill onClick={resumeReview} icon={Play}>
          Resume run
        </PrimaryPill>
      )
    }
    if (engineStatus === "failed") {
      return (
        <PrimaryPill onClick={restartFromFailed} icon={RotateCcw}>
          Restart from failed
        </PrimaryPill>
      )
    }
    return (
      <PrimaryPill onClick={run} icon={Play}>
        Run workflow
      </PrimaryPill>
    )
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[#1e1e1e] bg-[#111113] px-3 sm:px-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#1e1e1e] bg-[#0a0a0b]">
          <SlidersHorizontal className="h-4 w-4 text-[#10b981]" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h1 className="truncate font-display text-[15px] font-semibold leading-tight text-[#f4f4f5]">
            Visual Foundry
          </h1>
          <p className="hidden truncate text-[11px] leading-tight text-[#8a8a93] sm:block">
            Compose image, video, and 3D generation as a reusable workflow.
          </p>
        </div>
      </div>

      <div className="ml-1 hidden items-center gap-2 md:flex">
        <label htmlFor="wf-select" className="sr-only">
          Load workflow
        </label>
        <select
          id="wf-select"
          value={meta.id}
          onChange={(e) => loadWorkflow(e.target.value)}
          className="h-9 max-w-[200px] cursor-pointer rounded-md border border-[#1e1e1e] bg-[#0a0a0b] px-2.5 font-sans text-[13px] text-[#f4f4f5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]/50"
        >
          <optgroup label="Seeded workflows">
            {seedWorkflows.map((w) => (
              <option key={w.id} value={w.id}>
                {w.title}  /  v{w.version}
              </option>
            ))}
          </optgroup>
          {savedOnly.length ? (
            <optgroup label="Saved in this browser">
              {savedOnly.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </optgroup>
          ) : null}
        </select>
        {dirty ? (
          <span className="font-mono text-[10px] text-[#06b6d4]" title="Unsaved edits">
            edited
          </span>
        ) : null}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden sm:block">
          <StatusChip status={engineStatus} />
        </div>
        <IconButton
          label="Inject demo failure on next run"
          onClick={() => setFailNextRun(!failNextRun)}
          icon={SlidersHorizontal}
          active={failNextRun}
        />
        <IconButton label="Fit view" onClick={fitView} icon={Maximize2} />
        <IconButton label="Save to this browser" onClick={save} icon={Save} />
        <IconButton label="Import / export JSON" onClick={onOpenImportExport} icon={UploadCloud} />
        {renderRunControl()}
      </div>
    </header>
  )
}

function PrimaryPill({
  children,
  onClick,
  icon: Icon,
  tone = "run",
}: {
  children: React.ReactNode
  onClick: () => void
  icon: typeof Play
  tone?: "run" | "cancel"
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full px-4 font-sans text-[13px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113]",
        tone === "run"
          ? "bg-[#10b981] text-[#04120c] hover:bg-[#0fca8f] focus-visible:ring-[#10b981]"
          : "border border-[#e26d6d]/60 bg-[#e26d6d]/10 text-[#e26d6d] hover:bg-[#e26d6d]/20 focus-visible:ring-[#e26d6d]",
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {children}
    </button>
  )
}
