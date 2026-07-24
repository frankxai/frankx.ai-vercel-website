/**
 * Creator Workflow Foundry - core type contracts.
 *
 * These types are the shared contract between the data layer (seed workflows,
 * adapters, run engine, storage) and the UI. Keep model logic out of JSX and
 * lean on these types so Codex can swap the demo adapters for real providers
 * without touching the surface.
 */

export const FOUNDRY_SCHEMA_VERSION = "1.0.0" as const

/** Typed node categories the canvas understands. */
export type NodeCategory =
  | "input"
  | "reference"
  | "direction"
  | "image-generation"
  | "video-generation"
  | "3d-generation"
  | "transform"
  | "compare"
  | "review"
  | "export"

/** The three generative modalities a generation node can target. */
export type Modality = "image" | "video" | "3d"

/** Per-node run lifecycle. */
export type RunState =
  | "idle"
  | "queued"
  | "running"
  | "review-needed"
  | "complete"
  | "failed"

/** Rights posture attached to an asset or output. */
export type RightsStatus =
  | "owned-generated"
  | "internal-review"
  | "cleared"
  | "restricted"

/** Editable fields surfaced in the inspector. Not every field applies to every category. */
export interface NodeFields {
  prompt?: string
  direction?: string
  aspectRatio?: "1:1" | "4:5" | "3:2" | "16:9" | "9:16" | "2:3"
  /** Seconds - video only. */
  duration?: number
  outputFormat?: string
  seed?: number
  /** 1-10 guidance / quality dial. */
  guidance?: number
  rightsNote?: string
  /** Free-form note for input / reference / review nodes. */
  note?: string
}

/** A single input or output port on a node. */
export interface NodePort {
  id: string
  /** Modality-ish data kind that flows through the port. */
  kind: "brief" | "reference" | "direction" | Modality | "any"
  label: string
}

export interface FoundryNodeData {
  [key: string]: unknown
  label: string
  category: NodeCategory
  modality?: Modality
  /** Adapter id this node runs on (generation nodes only). */
  adapterId?: string
  /** Cannot be deleted from the graph (e.g. required export / input). */
  required?: boolean
  fields: NodeFields
  inputs: NodePort[]
  outputs: NodePort[]
  /** Transient run state, mutated by the run engine. */
  runState: RunState
  /** Id of the output produced on the most recent run, if any. */
  outputId?: string
  /** Human failure reason when runState is "failed". */
  failureReason?: string
}

/** Serializable node (mirrors @xyflow/react node shape, provider-neutral). */
export interface FoundryNode {
  id: string
  type: "foundry"
  position: { x: number; y: number }
  data: FoundryNodeData
}

export interface FoundryEdge {
  id: string
  source: string
  target: string
  sourceHandle?: string
  targetHandle?: string
}

export interface Workflow {
  schemaVersion: string
  id: string
  version: number
  title: string
  summary: string
  /** Ordered node ids describing the intended linear reading for mobile. */
  stepOrder: string[]
  nodes: FoundryNode[]
  edges: FoundryEdge[]
  updatedAt: string
}

/** Provenance record - every output must expose this. */
export interface Provenance {
  workflowId: string
  workflowVersion: number
  runId: string
  sourceAssetIds: string[]
  adapterId: string
  adapterVersion: string
  promptRevision: number
  seed: number
  timestamp: string
  rightsStatus: RightsStatus
  /** Placeholder - real checksum is generated at export time by the backend. */
  exportChecksum: string
}

export type ApprovalState = "pending" | "approved" | "rejected"

/** A produced output shown in the filmstrip. */
export interface FoundryOutput {
  id: string
  nodeId: string
  runId: string
  modality: Modality
  label: string
  /** Local, owned poster/thumbnail path. */
  posterSrc: string
  alt: string
  /** For video: a labeled storyboard/timeline demo, never a fake playable file. */
  storyboard?: { frameSrc: string; caption: string }[]
  aspectRatio: string
  approval: ApprovalState
  rejectionNote?: string
  provenance: Provenance
}

/** Adapter contract - provider-neutral. Demo adapters are deterministic and offline. */
export interface AdapterMeta {
  id: string
  version: string
  modality: Modality
  label: string
  /** Demo adapters must be clearly labeled so nobody mistakes them for a live model. */
  isDemo: boolean
  description: string
}

export interface AdapterRequest {
  node: FoundryNode
  workflow: Workflow
  runId: string
  sourceAssetIds: string[]
}

export interface AdapterResult {
  output: FoundryOutput
}

export interface GenerationAdapter extends AdapterMeta {
  run: (req: AdapterRequest) => Promise<AdapterResult>
}

/** Overall run status for the engine. */
export type EngineStatus =
  | "idle"
  | "running"
  | "review-needed"
  | "complete"
  | "failed"
  | "cancelled"

export interface RunEvent {
  type: "node-state" | "output" | "token" | "status"
  nodeId?: string
  runState?: RunState
  output?: FoundryOutput
  /** Edge id the run token is currently traversing. */
  edgeId?: string
  status?: EngineStatus
  failureReason?: string
}

export const NODE_CATEGORY_LABELS: Record<NodeCategory, string> = {
  input: "Input",
  reference: "Reference",
  direction: "Direction",
  "image-generation": "Image generation",
  "video-generation": "Video generation",
  "3d-generation": "3D generation",
  transform: "Transform",
  compare: "Compare",
  review: "Review",
  export: "Export",
}

export const RUN_STATE_LABELS: Record<RunState, string> = {
  idle: "Idle",
  queued: "Queued",
  running: "Running",
  "review-needed": "Review needed",
  complete: "Complete",
  failed: "Failed",
}

export const RIGHTS_LABELS: Record<RightsStatus, string> = {
  "owned-generated": "Owned  /  generated",
  "internal-review": "Internal review",
  cleared: "Cleared",
  restricted: "Restricted",
}
