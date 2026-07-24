import { ADAPTER_FOR_MODALITY } from "./seed-workflows"
import {
  NODE_CATEGORY_LABELS,
  type FoundryNode,
  type FoundryNodeData,
  type Modality,
  type NodeCategory,
  type NodeFields,
} from "./types"

function modalityForCategory(category: NodeCategory): Modality | undefined {
  if (category === "image-generation") return "image"
  if (category === "video-generation") return "video"
  if (category === "3d-generation") return "3d"
  return undefined
}

function portCounts(category: NodeCategory): { inputs: number; outputs: number } {
  if (category === "input" || category === "reference") return { inputs: 0, outputs: 1 }
  if (category === "export") return { inputs: 1, outputs: 0 }
  if (category === "compare") return { inputs: 2, outputs: 1 }
  return { inputs: 1, outputs: 1 }
}

function defaultFields(category: NodeCategory): NodeFields {
  switch (category) {
    case "image-generation":
      return { prompt: "", aspectRatio: "1:1", outputFormat: "PNG", seed: 1000, guidance: 7 }
    case "video-generation":
      return { prompt: "", aspectRatio: "16:9", duration: 6, outputFormat: "MP4 (poster demo)", seed: 1000, guidance: 6 }
    case "3d-generation":
      return { prompt: "", aspectRatio: "1:1", outputFormat: "GLB (poster demo)", seed: 1000, guidance: 7 }
    case "direction":
      return { direction: "" }
    case "export":
      return { outputFormat: "PNG" }
    default:
      return { note: "" }
  }
}

let counter = 0
function uid(prefix: string) {
  counter += 1
  return `${prefix}-${Date.now().toString(36)}${counter}`
}

export function createNode(category: NodeCategory, position: { x: number; y: number }): FoundryNode {
  const id = uid(category)
  const modality = modalityForCategory(category)
  const { inputs: inCount, outputs: outCount } = portCounts(category)

  const inputs = Array.from({ length: inCount }, (_, i) => ({
    id: `${id}-in-${i}`,
    kind: "any" as const,
    label: inCount > 1 ? `Input ${String.fromCharCode(65 + i)}` : "Input",
  }))
  const outputs = Array.from({ length: outCount }, (_, i) => ({
    id: `${id}-out-${i}`,
    kind: (modality ?? "any") as FoundryNodeData["outputs"][number]["kind"],
    label: "Output",
  }))

  const data: FoundryNodeData = {
    label: NODE_CATEGORY_LABELS[category],
    category,
    modality,
    adapterId: modality ? ADAPTER_FOR_MODALITY[modality] : undefined,
    required: false,
    fields: defaultFields(category),
    inputs,
    outputs,
    runState: "idle",
  }

  return { id, type: "foundry", position, data }
}
