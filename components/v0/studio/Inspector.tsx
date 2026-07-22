"use client"

import { MousePointerSquareDashed, ShieldCheck, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  NODE_CATEGORY_LABELS,
  type FoundryOutput,
  type NodeFields,
} from "@/lib/v0/foundry/types"
import type { FxNode } from "./use-foundry-studio"
import { CATEGORY_ACCENT, CATEGORY_ICON, RUN_STATE_STYLE } from "./node-meta"
import {
  EmptyState,
  NumberField,
  RangeField,
  SelectField,
  TextArea,
  TextField,
} from "./Surfaces"

/** Right inspector. Edits practical, per-category fields for the selected node. */

const ASPECT_OPTIONS = ["1:1", "4:5", "3:2", "16:9", "9:16", "2:3"].map((v) => ({ value: v, label: v }))

interface InspectorProps {
  node: FxNode | null
  outputs: FoundryOutput[]
  onUpdateFields: (nodeId: string, patch: Partial<NodeFields>) => void
  onUpdateLabel: (nodeId: string, label: string) => void
  onDelete: (nodeId: string) => void
  onOpenProvenance: (outputId: string) => void
}

export function Inspector({
  node,
  outputs,
  onUpdateFields,
  onUpdateLabel,
  onDelete,
  onOpenProvenance,
}: InspectorProps) {
  if (!node) {
    return (
      <div className="h-full bg-[#111113]">
        <EmptyState
          icon={MousePointerSquareDashed}
          title="No node selected"
          description="Select a node on the canvas to edit its prompt, controls, and rights note."
        />
      </div>
    )
  }

  const { data } = node
  const fields = data.fields
  const Icon = CATEGORY_ICON[data.category]
  const state = RUN_STATE_STYLE[data.runState]
  const isGen = Boolean(data.modality)
  const relatedOutput = outputs.find((o) => o.nodeId === node.id)

  const set = (patch: Partial<NodeFields>) => onUpdateFields(node.id, patch)

  return (
    <aside aria-label="Node inspector" className="flex h-full flex-col bg-[#111113]">
      <div className="shrink-0 border-b border-[#1e1e1e] px-4 py-3">
        <div className="flex items-center gap-2">
          <Icon className={cn("h-4 w-4", CATEGORY_ACCENT[data.category])} aria-hidden="true" />
          <span className="font-mono text-[10px] uppercase tracking-wide text-[#8a8a93]">
            {NODE_CATEGORY_LABELS[data.category]}
          </span>
          <span className={cn("ml-auto flex items-center gap-1 font-mono text-[10px]", state.text)}>
            <span className={cn("h-1.5 w-1.5 rounded-full", state.dot)} aria-hidden="true" />
            {state.label}
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
        <TextField label="Node label" value={data.label} onChange={(v) => onUpdateLabel(node.id, v)} />

        {isGen ? (
          <div className="flex items-center gap-2 rounded-md border border-[#1e1e1e] bg-[#0a0a0b] px-2.5 py-2">
            <span className="rounded bg-[#06b6d4]/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-[#06b6d4]">
              Demo
            </span>
            <span className="truncate font-mono text-[11px] text-[#8a8a93]">{data.adapterId}</span>
          </div>
        ) : null}

        {(data.category === "input" ||
          data.category === "reference" ||
          data.category === "review" ||
          data.category === "compare") && (
          <TextArea
            label="Note"
            value={fields.note ?? ""}
            onChange={(v) => set({ note: v })}
            placeholder="Operational note for this stage"
          />
        )}

        {(data.category === "direction" || data.category === "transform") && (
          <TextArea
            label="Direction"
            value={fields.direction ?? ""}
            onChange={(v) => set({ direction: v })}
            placeholder="Creative or transform direction"
          />
        )}

        {isGen && (
          <>
            <TextArea
              label="Prompt"
              value={fields.prompt ?? ""}
              onChange={(v) => set({ prompt: v })}
              rows={4}
              placeholder="Describe the intended output"
            />
            <div className="grid grid-cols-2 gap-3">
              <SelectField
                label="Aspect ratio"
                value={fields.aspectRatio ?? "1:1"}
                options={ASPECT_OPTIONS}
                onChange={(v) => set({ aspectRatio: v as NodeFields["aspectRatio"] })}
              />
              {data.modality === "video" ? (
                <NumberField
                  label="Duration (s)"
                  value={fields.duration}
                  min={1}
                  max={60}
                  step={1}
                  onChange={(v) => set({ duration: v })}
                />
              ) : (
                <TextField
                  label="Output format"
                  value={fields.outputFormat ?? ""}
                  onChange={(v) => set({ outputFormat: v })}
                  mono
                />
              )}
            </div>
            {data.modality === "video" ? (
              <TextField
                label="Output format"
                value={fields.outputFormat ?? ""}
                onChange={(v) => set({ outputFormat: v })}
                mono
              />
            ) : null}
            <div className="grid grid-cols-2 gap-3">
              <NumberField label="Seed" value={fields.seed} step={1} onChange={(v) => set({ seed: v })} />
              <div className="flex items-end">
                <div className="w-full">
                  <RangeField
                    label="Guidance"
                    value={fields.guidance ?? 7}
                    onChange={(v) => set({ guidance: v })}
                  />
                </div>
              </div>
            </div>
            <TextField
              label="Rights note"
              value={fields.rightsNote ?? ""}
              onChange={(v) => set({ rightsNote: v })}
              placeholder="Owned, generated, cleared…"
            />
          </>
        )}

        {data.category === "export" && (
          <>
            <TextField
              label="Output format"
              value={fields.outputFormat ?? ""}
              onChange={(v) => set({ outputFormat: v })}
              mono
            />
            <TextField
              label="Rights note"
              value={fields.rightsNote ?? ""}
              onChange={(v) => set({ rightsNote: v })}
              placeholder="Rights posture at delivery"
            />
          </>
        )}

        {relatedOutput ? (
          <button
            type="button"
            onClick={() => onOpenProvenance(relatedOutput.id)}
            className="flex w-full items-center gap-2 rounded-md border border-[#1e1e1e] bg-[#0a0a0b] px-2.5 py-2 text-left text-[12px] text-[#f4f4f5] transition-colors hover:border-[#10b981]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]/50"
          >
            <ShieldCheck className="h-4 w-4 shrink-0 text-[#10b981]" aria-hidden="true" />
            <span className="flex-1">View output provenance</span>
          </button>
        ) : null}
      </div>

      <div className="shrink-0 border-t border-[#1e1e1e] px-4 py-3">
        <button
          type="button"
          onClick={() => onDelete(node.id)}
          disabled={data.required}
          title={data.required ? "Required nodes cannot be deleted" : "Delete node"}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-md border px-3 py-2 text-[13px] transition-colors focus:outline-none focus-visible:ring-2",
            data.required
              ? "cursor-not-allowed border-[#1e1e1e] bg-[#111113] text-[#5c5c64]"
              : "border-[#e26d6d]/40 bg-[#e26d6d]/5 text-[#e26d6d] hover:bg-[#e26d6d]/15 focus-visible:ring-[#e26d6d]",
          )}
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          {data.required ? "Required node" : "Delete node"}
        </button>
      </div>
    </aside>
  )
}
