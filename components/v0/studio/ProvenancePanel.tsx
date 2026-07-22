"use client"

import { RIGHTS_LABELS, type FoundryOutput, type Provenance } from "@/lib/v0/foundry/types"
import { Modal } from "./Modal"

/**
 * Provenance panel. Single mode shows the full provenance ledger for one
 * output; compare mode places two selected outputs side by side. Every field
 * required by the trust contract is exposed here.
 */

interface ProvenancePanelProps {
  mode: "single" | "compare"
  outputs: FoundryOutput[]
  onClose: () => void
}

function Row({ label, value, mono = true }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[#1e1e1e] py-1.5 last:border-0">
      <span className="font-mono text-[10px] uppercase tracking-wide text-[#8a8a93]">{label}</span>
      <span className={`max-w-[60%] break-words text-right text-[12px] text-[#f4f4f5] ${mono ? "font-mono" : ""}`}>
        {value}
      </span>
    </div>
  )
}

function ProvenanceLedger({ p }: { p: Provenance }) {
  return (
    <div className="rounded-md border border-[#1e1e1e] bg-[#0a0a0b] px-3 py-1">
      <Row label="Workflow" value={`${p.workflowId}  /  v${p.workflowVersion}`} />
      <Row label="Run ID" value={p.runId} />
      <Row label="Sources" value={p.sourceAssetIds.length ? p.sourceAssetIds.join(", ") : "-"} />
      <Row label="Adapter" value={`${p.adapterId}  /  ${p.adapterVersion}`} />
      <Row label="Prompt rev" value={`#${p.promptRevision}`} />
      <Row label="Seed" value={String(p.seed)} />
      <Row label="Timestamp" value={p.timestamp} />
      <Row label="Rights" value={RIGHTS_LABELS[p.rightsStatus]} mono={false} />
      <Row label="Checksum" value={p.exportChecksum} />
    </div>
  )
}

function OutputBlock({ output }: { output: FoundryOutput }) {
  return (
    <div className="space-y-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={output.posterSrc || "/placeholder.svg"}
        alt={output.alt}
        width={480}
        height={270}
        className="aspect-video w-full rounded-md border border-[#1e1e1e] bg-[#16161a] object-cover"
      />
      <div>
        <p className="text-[13px] text-[#f4f4f5]">{output.label}</p>
        <p className="font-mono text-[11px] text-[#5c5c64]">
          {output.modality}  /  {output.aspectRatio}  /  {output.approval}
        </p>
      </div>
      {output.rejectionNote ? (
        <p className="rounded border border-[#e26d6d]/40 bg-[#e26d6d]/10 px-2 py-1.5 text-[12px] text-[#e26d6d]">
          Rejection note: {output.rejectionNote}
        </p>
      ) : null}
      {output.storyboard ? (
        <div>
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wide text-[#8a8a93]">
            Storyboard demo (not a playable file)
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {output.storyboard.map((frame, i) => (
              <div key={i} className="overflow-hidden rounded border border-[#1e1e1e]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={frame.frameSrc || "/placeholder.svg"}
                  alt={frame.caption}
                  width={90}
                  height={51}
                  className="aspect-video w-full object-cover"
                />
                <p className="truncate px-1 py-0.5 text-center font-mono text-[8px] text-[#5c5c64]">
                  {frame.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <ProvenanceLedger p={output.provenance} />
    </div>
  )
}

export function ProvenancePanel({ mode, outputs, onClose }: ProvenancePanelProps) {
  if (outputs.length === 0) return null

  return (
    <Modal
      title={mode === "compare" ? "Compare outputs A / B" : "Output provenance"}
      onClose={onClose}
      widthClass={mode === "compare" ? "max-w-3xl" : "max-w-md"}
    >
      <div className="p-4">
        {mode === "compare" ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {outputs.slice(0, 2).map((o, i) => (
              <div key={o.id}>
                <p className="mb-2 inline-flex items-center gap-1.5 font-mono text-[11px] text-[#06b6d4]">
                  <span className="flex h-4 w-4 items-center justify-center rounded bg-[#06b6d4]/20 text-[10px]">
                    {i === 0 ? "A" : "B"}
                  </span>
                  Variant {i === 0 ? "A" : "B"}
                </p>
                <OutputBlock output={o} />
              </div>
            ))}
          </div>
        ) : (
          <OutputBlock output={outputs[0]} />
        )}
      </div>
    </Modal>
  )
}
