"use client"

import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { NODE_CATEGORY_LABELS } from "@/lib/v0/foundry/types"
import type { FxNode } from "./use-foundry-studio"
import { CATEGORY_ACCENT, CATEGORY_ICON, RUN_STATE_STYLE } from "./node-meta"

/**
 * Mobile step list. A purpose-built linear reading of the workflow's execution
 * order - not a shrunken canvas. Tapping a step opens the inspector sheet.
 */
export function MobileStepList({
  steps,
  selectedNodeId,
  activeNodeId,
  onSelectNode,
}: {
  steps: FxNode[]
  selectedNodeId: string | null
  activeNodeId: string | null
  onSelectNode: (id: string) => void
}) {
  return (
    <ol aria-label="Workflow steps" className="flex flex-col">
      {steps.map((node, index) => {
        const Icon = CATEGORY_ICON[node.data.category]
        const state = RUN_STATE_STYLE[node.data.runState]
        const StateIcon = state.icon
        const selected = node.id === selectedNodeId
        const active = node.id === activeNodeId
        return (
          <li key={node.id} className="relative">
            {index < steps.length - 1 ? (
              <span
                className="absolute left-[27px] top-[46px] h-[calc(100%-30px)] w-px bg-[#1e1e1e]"
                aria-hidden="true"
              />
            ) : null}
            <button
              type="button"
              onClick={() => onSelectNode(node.id)}
              aria-current={selected ? "true" : undefined}
              className={cn(
                "flex min-h-[56px] w-full items-center gap-3 border-b border-[#1e1e1e] px-4 py-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#10b981]/50",
                selected ? "bg-[#16161a]" : "bg-[#111113] active:bg-[#16161a]",
              )}
            >
              <span
                className={cn(
                  "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-[#0a0a0b]",
                  active ? "border-[#10b981]" : "border-[#1e1e1e]",
                )}
              >
                <Icon className={cn("h-4 w-4", CATEGORY_ACCENT[node.data.category])} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] text-[#f4f4f5]">{node.data.label}</span>
                <span className="mt-0.5 flex items-center gap-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-[#5c5c64]">
                    {NODE_CATEGORY_LABELS[node.data.category]}
                  </span>
                  <span className={cn("flex items-center gap-1 font-mono text-[10px]", state.text)}>
                    <StateIcon className={cn("h-3 w-3", state.spin && "animate-spin")} aria-hidden="true" />
                    {state.label}
                  </span>
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-[#5c5c64]" aria-hidden="true" />
            </button>
          </li>
        )
      })}
    </ol>
  )
}
