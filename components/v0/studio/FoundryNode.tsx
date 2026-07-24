"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import { AlertTriangle, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import type { FoundryNodeData } from "@/lib/v0/foundry/types"
import { CATEGORY_ACCENT, CATEGORY_ICON, RUN_STATE_STYLE } from "./node-meta"

/**
 * Custom @xyflow/react node. Presentation only - all mutation flows through the
 * studio hook. Ports render as accessible handles; run state is shown with a
 * label + dot (never color alone).
 */
type FoundryNodeProps = NodeProps & { data: FoundryNodeData; selected?: boolean }

function handleTop(index: number, count: number): string {
  if (count <= 1) return "50%"
  const step = 100 / (count + 1)
  return `${step * (index + 1)}%`
}

function FoundryNodeComponent({ data, selected }: FoundryNodeProps) {
  const Icon = CATEGORY_ICON[data.category]
  const accent = CATEGORY_ACCENT[data.category]
  const state = RUN_STATE_STYLE[data.runState]
  const StateIcon = state.icon

  return (
    <div
      className={cn(
        "w-[184px] rounded-lg border bg-[#111113] text-left transition-colors",
        selected
          ? "border-[#10b981] shadow-[0_0_0_1px_var(--color-fx-emerald)]"
          : "border-[#1e1e1e] hover:border-[#2a2a2e]",
        data.runState === "running" && "border-[#10b981]",
        data.runState === "failed" && "border-[#e26d6d]",
      )}
    >
      {/* input handles */}
      {data.inputs.map((port, i) => (
        <Handle
          key={port.id}
          id={port.id}
          type="target"
          position={Position.Left}
          style={{ top: handleTop(i, data.inputs.length) }}
          aria-label={`${port.label} input`}
        />
      ))}

      <div className="flex items-center gap-2 border-b border-[#1e1e1e] px-3 py-2">
        <Icon className={cn("h-4 w-4 shrink-0", accent)} aria-hidden="true" />
        <span className="truncate font-sans text-[13px] font-medium text-[#f4f4f5]">{data.label}</span>
        {data.required ? (
          <Lock className="ml-auto h-3 w-3 shrink-0 text-[#5c5c64]" aria-label="Required node" />
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <span className="font-mono text-[10px] uppercase tracking-wide text-[#5c5c64]">
          {data.modality ?? data.category}
        </span>
        <span className={cn("flex items-center gap-1 font-mono text-[10px]", state.text)}>
          <StateIcon className={cn("h-3 w-3", state.spin && "animate-spin")} aria-hidden="true" />
          {state.label}
        </span>
      </div>

      {data.runState === "failed" && data.failureReason ? (
        <div className="flex items-start gap-1.5 border-t border-[#1e1e1e] px-3 py-2 text-[11px] leading-snug text-[#e26d6d]">
          <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
          <span className="line-clamp-2">{data.failureReason}</span>
        </div>
      ) : null}

      {/* output handles */}
      {data.outputs.map((port, i) => (
        <Handle
          key={port.id}
          id={port.id}
          type="source"
          position={Position.Right}
          style={{ top: handleTop(i, data.outputs.length) }}
          aria-label={`${port.label} output`}
        />
      ))}
    </div>
  )
}

export const FoundryNode = memo(FoundryNodeComponent)
