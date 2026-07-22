import { z } from "zod"
import { FOUNDRY_SCHEMA_VERSION, type Workflow } from "./types"
import { findCycleNodeIds, arePortKindsCompatible } from "./graph"

/**
 * Import validation. Malformed or hostile workflows are rejected with a
 * readable error rather than silently corrupting the canvas. Validation is
 * TRANSACTIONAL at the call site: the studio hook only swaps state when
 * `ok === true`, so a failed import never mutates the live workflow.
 *
 * Layers of defense, in order:
 *   1. Serialized-size ceiling (before parse, cheap DoS guard).
 *   2. Zod shape + string/number bounds + collection-size ceilings.
 *   3. Schema version match.
 *   4. Referential integrity: duplicate node/edge ids, edge endpoints,
 *      handle/port existence, typed-port compatibility.
 *   5. stepOrder integrity.
 *   6. DAG check (fail closed on cycles).
 */

/* ----------------------------- Hard limits ------------------------------- */
export const IMPORT_LIMITS = {
  /** Max serialized JSON size in bytes (~256 KB). */
  maxSerializedBytes: 256 * 1024,
  maxNodes: 200,
  maxEdges: 600,
  /** Max length for any single string field. */
  maxStringLength: 4000,
} as const

const boundedString = (max: number = IMPORT_LIMITS.maxStringLength) => z.string().max(max)

const nodePortSchema = z.object({
  id: boundedString(200).min(1),
  kind: z.enum(["brief", "reference", "direction", "image", "video", "3d", "any"]),
  label: boundedString(200),
})

const nodeFieldsSchema = z.object({
  prompt: boundedString().optional(),
  direction: boundedString().optional(),
  aspectRatio: z.enum(["1:1", "4:5", "3:2", "16:9", "9:16", "2:3"]).optional(),
  duration: z.number().nonnegative().max(3600).optional(),
  outputFormat: boundedString(120).optional(),
  seed: z.number().int().min(0).max(4_294_967_295).optional(),
  guidance: z.number().min(1).max(10).optional(),
  rightsNote: boundedString().optional(),
  note: boundedString().optional(),
})

const nodeSchema = z.object({
  id: boundedString(200).min(1),
  type: z.literal("foundry"),
  position: z.object({ x: z.number().finite(), y: z.number().finite() }),
  data: z.object({
    label: boundedString(200).min(1),
    category: z.enum([
      "input",
      "reference",
      "direction",
      "image-generation",
      "video-generation",
      "3d-generation",
      "transform",
      "compare",
      "review",
      "export",
    ]),
    modality: z.enum(["image", "video", "3d"]).optional(),
    adapterId: boundedString(200).optional(),
    required: z.boolean().optional(),
    fields: nodeFieldsSchema,
    inputs: z.array(nodePortSchema).max(16),
    outputs: z.array(nodePortSchema).max(16),
    runState: z.enum(["idle", "queued", "running", "review-needed", "complete", "failed"]),
    outputId: boundedString(200).optional(),
    failureReason: boundedString().optional(),
  }),
})

const edgeSchema = z.object({
  id: boundedString(200).min(1),
  source: boundedString(200).min(1),
  target: boundedString(200).min(1),
  sourceHandle: boundedString(200).optional().nullable(),
  targetHandle: boundedString(200).optional().nullable(),
})

export const workflowSchema = z.object({
  schemaVersion: boundedString(40),
  id: boundedString(200).min(1),
  version: z.number().int().nonnegative().max(1_000_000),
  title: boundedString(200).min(1),
  summary: boundedString(),
  stepOrder: z.array(boundedString(200)).max(IMPORT_LIMITS.maxNodes),
  nodes: z.array(nodeSchema).min(1).max(IMPORT_LIMITS.maxNodes),
  edges: z.array(edgeSchema).max(IMPORT_LIMITS.maxEdges),
  updatedAt: boundedString(80),
})

export interface ValidationResult {
  ok: boolean
  workflow?: Workflow
  error?: string
}

export function parseWorkflow(raw: unknown): ValidationResult {
  const parsed = workflowSchema.safeParse(raw)
  if (!parsed.success) {
    const first = parsed.error.issues[0]
    const path = first?.path.join(".") || "root"
    return { ok: false, error: `Invalid workflow at "${path}": ${first?.message ?? "unknown error"}.` }
  }

  const data = parsed.data as Workflow

  if (data.schemaVersion !== FOUNDRY_SCHEMA_VERSION) {
    return {
      ok: false,
      error: `Unsupported schema version "${data.schemaVersion}". This build reads ${FOUNDRY_SCHEMA_VERSION}.`,
    }
  }

  // Duplicate node ids.
  const nodeIds = new Set<string>()
  for (const n of data.nodes) {
    if (nodeIds.has(n.id)) {
      return { ok: false, error: `Duplicate node id "${n.id}".` }
    }
    nodeIds.add(n.id)
  }

  // Duplicate edge ids.
  const edgeIds = new Set<string>()
  for (const e of data.edges) {
    if (edgeIds.has(e.id)) {
      return { ok: false, error: `Duplicate edge id "${e.id}".` }
    }
    edgeIds.add(e.id)
  }

  // Build port lookup for endpoint + handle + type checks.
  const byId = new Map(data.nodes.map((n) => [n.id, n]))

  for (const e of data.edges) {
    const sourceNode = byId.get(e.source)
    const targetNode = byId.get(e.target)
    if (!sourceNode || !targetNode) {
      return { ok: false, error: `Edge "${e.id}" references a node that does not exist.` }
    }
    if (e.source === e.target) {
      return { ok: false, error: `Edge "${e.id}" is a self-link, which is not allowed.` }
    }

    // Handle existence (when specified) + resolve the port for type compat.
    const outPort = e.sourceHandle
      ? sourceNode.data.outputs.find((p) => p.id === e.sourceHandle)
      : sourceNode.data.outputs[0]
    const inPort = e.targetHandle
      ? targetNode.data.inputs.find((p) => p.id === e.targetHandle)
      : targetNode.data.inputs[0]
    if (e.sourceHandle && !outPort) {
      return { ok: false, error: `Edge "${e.id}" references a missing output handle "${e.sourceHandle}".` }
    }
    if (e.targetHandle && !inPort) {
      return { ok: false, error: `Edge "${e.id}" references a missing input handle "${e.targetHandle}".` }
    }
    if (!outPort || !inPort) {
      return { ok: false, error: `Edge "${e.id}" cannot resolve a source output or target input port.` }
    }
    if (!arePortKindsCompatible(outPort.kind, inPort.kind)) {
      return {
        ok: false,
        error: `Edge "${e.id}" connects incompatible ports (${outPort.kind} -> ${inPort.kind}).`,
      }
    }
  }

  // stepOrder integrity: must be an EXACT permutation of the node ids - same
  // length, no unknown ids, no duplicates, and no node omitted.
  const stepSeen = new Set<string>()
  for (const id of data.stepOrder) {
    if (!nodeIds.has(id)) {
      return { ok: false, error: `stepOrder references unknown node "${id}".` }
    }
    if (stepSeen.has(id)) {
      return { ok: false, error: `stepOrder lists node "${id}" more than once.` }
    }
    stepSeen.add(id)
  }
  if (stepSeen.size !== nodeIds.size) {
    const missing = [...nodeIds].filter((id) => !stepSeen.has(id))
    return {
      ok: false,
      error: `stepOrder must list every node exactly once; missing: ${missing.join(", ")}.`,
    }
  }

  // DAG check - fail closed on cycles, surface affected ids.
  const cycleNodeIds = findCycleNodeIds(data.nodes, data.edges)
  if (cycleNodeIds.length > 0) {
    return {
      ok: false,
      error: `Workflow contains a cycle involving: ${cycleNodeIds.join(", ")}. Imports must be acyclic (DAG).`,
    }
  }

  return { ok: true, workflow: data }
}

/** Byte length of a UTF-8 string without allocating a Buffer. */
function byteLength(text: string): number {
  if (typeof TextEncoder !== "undefined") return new TextEncoder().encode(text).length
  // Fallback: assume worst-case UTF-16 -> bytes.
  return text.length * 2
}

export function parseWorkflowJson(text: string): ValidationResult {
  if (byteLength(text) > IMPORT_LIMITS.maxSerializedBytes) {
    return {
      ok: false,
      error: `File is too large (limit ${(IMPORT_LIMITS.maxSerializedBytes / 1024).toFixed(0)} KB).`,
    }
  }
  let raw: unknown
  try {
    raw = JSON.parse(text)
  } catch {
    return { ok: false, error: "File is not valid JSON." }
  }
  return parseWorkflow(raw)
}
