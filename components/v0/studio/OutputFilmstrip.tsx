"use client"

import { useState } from "react"
import {
  Check,
  Clapperboard,
  Columns2,
  Film,
  ShieldCheck,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { ApprovalState, EngineStatus, FoundryOutput } from "@/lib/v0/foundry/types"
import { EmptyState } from "./Surfaces"

/**
 * Bottom output/provenance filmstrip. Supports A/B compare selection, approval,
 * rejection with a note, and opening the provenance panel.
 */

const APPROVAL_STYLE: Record<ApprovalState, { label: string; cls: string }> = {
  pending: { label: "Pending review", cls: "text-[#8a8a93]" },
  approved: { label: "Approved", cls: "text-[#10b981]" },
  rejected: { label: "Rejected", cls: "text-[#e26d6d]" },
}

interface FilmstripProps {
  outputs: FoundryOutput[]
  compareSelection: string[]
  engineStatus: EngineStatus
  onToggleCompare: (id: string) => void
  onSetApproval: (id: string, approval: ApprovalState, note?: string) => void
  onOpenProvenance: (id: string) => void
  onOpenCompare: () => void
}

export function OutputFilmstrip({
  outputs,
  compareSelection,
  engineStatus,
  onToggleCompare,
  onSetApproval,
  onOpenProvenance,
  onOpenCompare,
}: FilmstripProps) {
  const [rejectingId, setRejectingId] = useState<string | null>(null)
  const [noteDraft, setNoteDraft] = useState("")

  const confirmReject = () => {
    if (rejectingId) onSetApproval(rejectingId, "rejected", noteDraft.trim() || undefined)
    setRejectingId(null)
    setNoteDraft("")
  }

  return (
    <section aria-label="Outputs and provenance" className="flex h-full flex-col bg-[#111113]">
      <div className="flex h-10 shrink-0 items-center gap-3 border-b border-[#1e1e1e] px-4">
        <Film className="h-4 w-4 text-[#8a8a93]" aria-hidden="true" />
        <span className="font-mono text-[10px] uppercase tracking-wide text-[#8a8a93]">Outputs</span>
        <span className="font-mono text-[11px] text-[#5c5c64]">{outputs.length}</span>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCompare}
            disabled={compareSelection.length < 2}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[12px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]/50",
              compareSelection.length >= 2
                ? "border-[#06b6d4]/50 text-[#06b6d4] hover:bg-[#06b6d4]/10"
                : "cursor-not-allowed border-[#1e1e1e] text-[#5c5c64]",
            )}
          >
            <Columns2 className="h-3.5 w-3.5" aria-hidden="true" />
            Compare A/B
          </button>
        </div>
      </div>

      {outputs.length === 0 ? (
        <div className="min-h-0 flex-1">
          <EmptyState
            icon={Clapperboard}
            title={engineStatus === "running" ? "Generating outputs…" : "No outputs yet"}
            description={
              engineStatus === "running"
                ? "The run token is advancing along the active path. Outputs resolve in sequence."
                : "Press Run workflow to produce deterministic demo outputs with full provenance."
            }
          />
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-x-auto">
          <ul className="flex h-full items-stretch gap-3 px-4 py-2 lg:py-3">
            {outputs.map((output) => {
              const compareIndex = compareSelection.indexOf(output.id)
              const approval = APPROVAL_STYLE[output.approval]
              return (
                <li
                  key={output.id}
                  className={cn(
                    "flex w-[calc(100vw-32px)] max-w-[360px] shrink-0 overflow-hidden rounded-lg border bg-[#0a0a0b]",
                    compareIndex >= 0 ? "border-[#06b6d4]" : "border-[#1e1e1e]",
                  )}
                >
                  <div className="relative w-[132px] shrink-0 border-r border-[#1e1e1e] sm:w-[152px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={output.posterSrc || "/placeholder.svg"}
                      alt={output.alt}
                      width={152}
                      height={152}
                      loading="lazy"
                      className="h-full w-full bg-[#16161a] object-contain"
                    />
                    {compareIndex >= 0 ? (
                      <span className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded bg-[#06b6d4] font-mono text-[11px] font-semibold text-[#04131a]">
                        {compareIndex === 0 ? "A" : "B"}
                      </span>
                    ) : null}
                    {output.storyboard ? (
                      <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-[#f4f4f5]">
                        <Clapperboard className="h-3 w-3" aria-hidden="true" /> Storyboard demo
                      </span>
                    ) : null}
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-1 p-2 sm:gap-1.5 sm:p-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-[13px] text-[#f4f4f5]">{output.label}</p>
                      <p className="font-mono text-[10px] text-[#5c5c64]">
                        {output.modality}  /  {output.aspectRatio}
                      </p>
                    </div>
                    <p className={cn("font-mono text-[10px]", approval.cls)}>{approval.label}</p>

                    <div className="mt-auto flex items-center gap-1">
                      <StripButton
                        label="Select for A/B compare"
                        active={compareIndex >= 0}
                        onClick={() => onToggleCompare(output.id)}
                        icon={Columns2}
                      />
                      <StripButton
                        label="Approve output"
                        active={output.approval === "approved"}
                        activeCls="border-[#10b981]/60 text-[#10b981]"
                        onClick={() => onSetApproval(output.id, "approved")}
                        icon={ThumbsUp}
                      />
                      <StripButton
                        label="Reject output with note"
                        active={output.approval === "rejected"}
                        activeCls="border-[#e26d6d]/60 text-[#e26d6d]"
                        onClick={() => {
                          setRejectingId(output.id)
                          setNoteDraft(output.rejectionNote ?? "")
                        }}
                        icon={ThumbsDown}
                      />
                      <StripButton
                        label="View provenance"
                        onClick={() => onOpenProvenance(output.id)}
                        icon={ShieldCheck}
                      />
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {rejectingId ? (
        <div className="shrink-0 border-t border-[#1e1e1e] bg-[#16161a] px-4 py-3">
          <label htmlFor="reject-note" className="mb-1.5 block font-mono text-[10px] uppercase tracking-wide text-[#8a8a93]">
            Rejection note
          </label>
          <div className="flex items-center gap-2">
            <input
              id="reject-note"
              type="text"
              autoFocus
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing) confirmReject()
                if (e.key === "Escape") setRejectingId(null)
              }}
              placeholder="What needs to change?"
              className="h-9 flex-1 rounded-md border border-[#1e1e1e] bg-[#0a0a0b] px-2.5 text-[13px] text-[#f4f4f5] placeholder:text-[#5c5c64] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e26d6d]/40"
            />
            <button
              type="button"
              onClick={confirmReject}
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#e26d6d]/50 bg-[#e26d6d]/10 px-3 text-[13px] text-[#e26d6d] hover:bg-[#e26d6d]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e26d6d]"
            >
              <Check className="h-4 w-4" aria-hidden="true" /> Save
            </button>
            <button
              type="button"
              onClick={() => setRejectingId(null)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#1e1e1e] text-[#8a8a93] hover:text-[#f4f4f5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]/50"
              aria-label="Cancel rejection"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}

function StripButton({
  label,
  icon: Icon,
  onClick,
  active,
  activeCls = "border-[#06b6d4]/60 text-[#06b6d4]",
}: {
  label: string
  icon: typeof ShieldCheck
  onClick: () => void
  active?: boolean
  activeCls?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]/50",
        active ? activeCls : "border-[#1e1e1e] text-[#8a8a93] hover:border-[#2a2a2e] hover:text-[#f4f4f5]",
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
    </button>
  )
}
