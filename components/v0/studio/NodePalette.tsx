"use client"

import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { NODE_CATEGORY_LABELS, type NodeCategory } from "@/lib/v0/foundry/types"
import { CATEGORY_ACCENT, CATEGORY_ICON } from "./node-meta"

/**
 * Left palette. Adds typed nodes to the canvas. Grouped by pipeline stage so
 * the mental model reads sources -> direction -> generate -> refine -> deliver.
 */

interface PaletteGroup {
  label: string
  hint: string
  categories: NodeCategory[]
}

const GROUPS: PaletteGroup[] = [
  { label: "Sources", hint: "Briefs and reference material", categories: ["input", "reference"] },
  { label: "Direction", hint: "Creative intent", categories: ["direction"] },
  {
    label: "Generate",
    hint: "Multimodal generation stages",
    categories: ["image-generation", "video-generation", "3d-generation"],
  },
  { label: "Refine", hint: "Transform, branch, review", categories: ["transform", "compare", "review"] },
  { label: "Deliver", hint: "Rights-checked output", categories: ["export"] },
]

const CATEGORY_HINT: Record<NodeCategory, string> = {
  input: "Brief or prompt seed",
  reference: "Owned reference assets",
  direction: "Art / prompt direction",
  "image-generation": "Image adapter stage",
  "video-generation": "Video adapter stage",
  "3d-generation": "3D adapter stage",
  transform: "Retouch / condition",
  compare: "A/B comparison (2 inputs)",
  review: "Human checkpoint",
  export: "Rights-checked delivery",
}

export function NodePalette({
  onAdd,
  workflowTitle,
  nodeCount,
}: {
  onAdd: (category: NodeCategory) => void
  workflowTitle: string
  nodeCount: number
}) {
  return (
    <nav aria-label="Node palette" className="flex h-full flex-col bg-[#111113]">
      <div className="shrink-0 border-b border-[#1e1e1e] px-4 py-3">
        <p className="font-mono text-[10px] uppercase tracking-wide text-[#8a8a93]">Workflow</p>
        <p className="truncate font-display text-sm font-medium text-[#f4f4f5]">{workflowTitle}</p>
        <p className="mt-0.5 font-mono text-[11px] text-[#5c5c64]">{nodeCount} nodes</p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
        <p className="mb-2 px-1 text-[11px] text-[#8a8a93]">Add a node, then connect its ports on the canvas.</p>
        <div className="flex flex-col gap-4">
          {GROUPS.map((group) => (
            <div key={group.label}>
              <div className="mb-1.5 flex items-baseline justify-between px-1">
                <span className="font-mono text-[10px] uppercase tracking-wide text-[#8a8a93]">{group.label}</span>
                <span className="text-[10px] text-[#5c5c64]">{group.hint}</span>
              </div>
              <div className="flex flex-col gap-1">
                {group.categories.map((category) => {
                  const Icon = CATEGORY_ICON[category]
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => onAdd(category)}
                      className="group flex items-center gap-2.5 rounded-md border border-transparent px-2 py-2 text-left transition-colors hover:border-[#1e1e1e] hover:bg-[#0a0a0b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]/50"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-[#1e1e1e] bg-[#0a0a0b]">
                        <Icon className={cn("h-3.5 w-3.5", CATEGORY_ACCENT[category])} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] text-[#f4f4f5]">
                          {NODE_CATEGORY_LABELS[category]}
                        </span>
                        <span className="block truncate text-[11px] text-[#5c5c64]">{CATEGORY_HINT[category]}</span>
                      </span>
                      <Plus
                        className="h-3.5 w-3.5 shrink-0 text-[#5c5c64] transition-colors group-hover:text-[#10b981]"
                        aria-hidden="true"
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}
