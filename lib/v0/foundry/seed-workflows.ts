import {
  FOUNDRY_SCHEMA_VERSION,
  type FoundryEdge,
  type FoundryNode,
  type FoundryNodeData,
  type Modality,
  type NodeCategory,
  type NodeFields,
  type Workflow,
} from "./types"

/** Adapter ids the demo registry knows how to run. */
export const ADAPTER_FOR_MODALITY: Record<Modality, string> = {
  image: "demo-image-v1",
  video: "demo-video-v1",
  "3d": "demo-3d-v1",
}

const GEN_CATEGORIES: NodeCategory[] = [
  "image-generation",
  "video-generation",
  "3d-generation",
]

function modalityForCategory(category: NodeCategory): Modality | undefined {
  if (category === "image-generation") return "image"
  if (category === "video-generation") return "video"
  if (category === "3d-generation") return "3d"
  return undefined
}

interface NodeSpec {
  id: string
  label: string
  category: NodeCategory
  x: number
  y: number
  required?: boolean
  fields?: NodeFields
  /** number of input ports (default 1, 0 for pure sources) */
  inputs?: number
  /** number of output ports (default 1, 0 for terminal) */
  outputs?: number
}

function makeNode(spec: NodeSpec): FoundryNode {
  const modality = modalityForCategory(spec.category)
  const inputCount = spec.inputs ?? (spec.category === "input" || spec.category === "reference" ? 0 : 1)
  const outputCount = spec.outputs ?? (spec.category === "export" ? 0 : 1)

  const inputs = Array.from({ length: inputCount }, (_, i) => ({
    id: `${spec.id}-in-${i}`,
    kind: "any" as const,
    label: inputCount > 1 ? `Input ${String.fromCharCode(65 + i)}` : "Input",
  }))
  const outputs = Array.from({ length: outputCount }, (_, i) => ({
    id: `${spec.id}-out-${i}`,
    kind: (modality ?? "any") as FoundryNodeData["inputs"][number]["kind"],
    label: "Output",
  }))

  const data: FoundryNodeData = {
    label: spec.label,
    category: spec.category,
    modality,
    adapterId: modality ? ADAPTER_FOR_MODALITY[modality] : undefined,
    required: spec.required,
    fields: spec.fields ?? {},
    inputs,
    outputs,
    runState: "idle",
  }

  return { id: spec.id, type: "foundry", position: { x: spec.x, y: spec.y }, data }
}

function edge(source: string, target: string, sourceHandle?: string, targetHandle?: string): FoundryEdge {
  return {
    id: `e-${source}-${target}`,
    source,
    target,
    sourceHandle: sourceHandle ?? `${source}-out-0`,
    targetHandle: targetHandle ?? `${target}-in-0`,
  }
}

const COL = 260
const ROW = 150

/* -------------------------------------------------------------------------- */
/* Workflow 1 - Product photography                                            */
/* -------------------------------------------------------------------------- */
const productPhotographyNodes: FoundryNode[] = [
  makeNode({ id: "pp-brief", label: "Creative brief", category: "input", x: 0, y: 0, required: true, fields: { note: "Matte ceramic bottle, seamless charcoal set, soft key from camera-left." } }),
  makeNode({ id: "pp-refs", label: "Reference set", category: "reference", x: 0, y: ROW, fields: { note: "3 studio lighting references, 1 material swatch." } }),
  makeNode({ id: "pp-image", label: "Image generation", category: "image-generation", x: COL, y: ROW / 2, inputs: 2, fields: { prompt: "Studio product photo, matte charcoal ceramic bottle, softbox key left, rim light, seamless graphite backdrop", aspectRatio: "1:1", outputFormat: "PNG", seed: 41207, guidance: 7, rightsNote: "Generated, owned by studio." } }),
  makeNode({ id: "pp-retouch", label: "Retouch", category: "transform", x: COL * 2, y: ROW / 2, fields: { direction: "Clean seam, balance highlight rolloff, keep texture." } }),
  makeNode({ id: "pp-review", label: "Art direction review", category: "review", x: COL * 3, y: ROW / 2, fields: { note: "Confirm label alignment and reflection." } }),
  makeNode({ id: "pp-export", label: "Export", category: "export", x: COL * 4, y: ROW / 2, required: true, fields: { outputFormat: "PNG  /  sRGB" } }),
]
const productPhotographyEdges: FoundryEdge[] = [
  edge("pp-brief", "pp-image", undefined, "pp-image-in-0"),
  edge("pp-refs", "pp-image", undefined, "pp-image-in-1"),
  edge("pp-image", "pp-retouch"),
  edge("pp-retouch", "pp-review"),
  edge("pp-review", "pp-export"),
]

/* -------------------------------------------------------------------------- */
/* Workflow 2 - Launch film                                                    */
/* -------------------------------------------------------------------------- */
const launchFilmNodes: FoundryNode[] = [
  makeNode({ id: "lf-brief", label: "Creative brief", category: "input", x: 0, y: 0, required: true, fields: { note: "30s launch teaser, low-key, teal volumetric light." } }),
  makeNode({ id: "lf-story", label: "Storyboard", category: "direction", x: COL, y: 0, fields: { direction: "Six beats: reveal, orbit, detail, context, logo hold, CTA." } }),
  makeNode({ id: "lf-keys", label: "Keyframes", category: "image-generation", x: COL * 2, y: 0, fields: { prompt: "Cinematic keyframe, matte-black device, teal volumetric beams, reflective floor", aspectRatio: "16:9", outputFormat: "PNG", seed: 88123, guidance: 6 } }),
  makeNode({ id: "lf-video", label: "Video generation", category: "video-generation", x: COL * 3, y: 0, fields: { prompt: "Slow orbit around device, haze, teal light", aspectRatio: "16:9", duration: 8, outputFormat: "MP4 (poster demo)", seed: 88123, guidance: 6, rightsNote: "Generated, owned by studio." } }),
  makeNode({ id: "lf-audio", label: "Audio note", category: "transform", x: COL * 4, y: 0, fields: { note: "Sub-bass swell on reveal, cut music on logo hold." } }),
  makeNode({ id: "lf-review", label: "Review", category: "review", x: COL * 5, y: 0, fields: { note: "Check pacing against 30s cut." } }),
  makeNode({ id: "lf-export", label: "Export", category: "export", x: COL * 6, y: 0, required: true, fields: { outputFormat: "MP4  /  H.264" } }),
]
const launchFilmEdges: FoundryEdge[] = [
  edge("lf-brief", "lf-story"),
  edge("lf-story", "lf-keys"),
  edge("lf-keys", "lf-video"),
  edge("lf-video", "lf-audio"),
  edge("lf-audio", "lf-review"),
  edge("lf-review", "lf-export"),
]

/* -------------------------------------------------------------------------- */
/* Workflow 3 - Identity study (branch + compare)                              */
/* -------------------------------------------------------------------------- */
const identityStudyNodes: FoundryNode[] = [
  makeNode({ id: "id-refs", label: "Reference set", category: "reference", x: 0, y: ROW / 2, fields: { note: "Geometric monogram references, 2 palettes." } }),
  makeNode({ id: "id-dir", label: "Prompt direction", category: "direction", x: COL, y: ROW / 2, fields: { direction: "Precise geometric monogram, generous negative space, high contrast." } }),
  makeNode({ id: "id-var-a", label: "Variant branch A", category: "image-generation", x: COL * 2, y: -ROW / 2, fields: { prompt: "Concentric emerald arcs, single angular stroke", aspectRatio: "1:1", outputFormat: "PNG", seed: 1201, guidance: 8 } }),
  makeNode({ id: "id-var-b", label: "Variant branch B", category: "image-generation", x: COL * 2, y: ROW + ROW / 2, fields: { prompt: "Interlocking cyan right-angle segments, implied cube", aspectRatio: "1:1", outputFormat: "PNG", seed: 1202, guidance: 8 } }),
  makeNode({ id: "id-compare", label: "Compare A/B", category: "compare", x: COL * 3, y: ROW / 2, inputs: 2 }),
  makeNode({ id: "id-export", label: "Approved export", category: "export", x: COL * 4, y: ROW / 2, required: true, fields: { outputFormat: "SVG + PNG" } }),
]
const identityStudyEdges: FoundryEdge[] = [
  edge("id-refs", "id-dir"),
  edge("id-dir", "id-var-a"),
  edge("id-dir", "id-var-b"),
  edge("id-var-a", "id-compare", "id-var-a-out-0", "id-compare-in-0"),
  edge("id-var-b", "id-compare", "id-var-b-out-0", "id-compare-in-1"),
  edge("id-compare", "id-export"),
]

/* -------------------------------------------------------------------------- */
/* Workflow 4 - Product 3D study                                               */
/* -------------------------------------------------------------------------- */
const product3dNodes: FoundryNode[] = [
  makeNode({ id: "td-turntable", label: "Reference turntable", category: "reference", x: 0, y: 0, fields: { note: "12-frame turntable of physical prototype." } }),
  makeNode({ id: "td-cond", label: "Image conditioning", category: "transform", x: COL, y: 0, fields: { direction: "Lock silhouette, neutral studio gradient." } }),
  makeNode({ id: "td-3d", label: "3D adapter", category: "3d-generation", x: COL * 2, y: 0, fields: { prompt: "Matte white earbud case, soft GI, subtle emerald/cyan reflections", aspectRatio: "1:1", outputFormat: "GLB (poster demo)", seed: 5309, guidance: 7, rightsNote: "Generated, owned by studio." } }),
  makeNode({ id: "td-mat", label: "Material review", category: "review", x: COL * 3, y: 0, fields: { note: "Verify roughness and edge highlights." } }),
  makeNode({ id: "td-export", label: "Web-ready export", category: "export", x: COL * 4, y: 0, required: true, fields: { outputFormat: "GLB  /  Draco" } }),
]
const product3dEdges: FoundryEdge[] = [
  edge("td-turntable", "td-cond"),
  edge("td-cond", "td-3d"),
  edge("td-3d", "td-mat"),
  edge("td-mat", "td-export"),
]

function nowIso() {
  // Fixed timestamp keeps seed data deterministic across reloads.
  return "2026-02-11T09:00:00.000Z"
}

export const SEED_WORKFLOWS: Workflow[] = [
  {
    schemaVersion: FOUNDRY_SCHEMA_VERSION,
    id: "wf-product-photography",
    version: 4,
    title: "Product photography",
    summary: "Brief to export for a single studio product image.",
    stepOrder: ["pp-brief", "pp-refs", "pp-image", "pp-retouch", "pp-review", "pp-export"],
    nodes: productPhotographyNodes,
    edges: productPhotographyEdges,
    updatedAt: nowIso(),
  },
  {
    schemaVersion: FOUNDRY_SCHEMA_VERSION,
    id: "wf-launch-film",
    version: 2,
    title: "Launch film",
    summary: "Storyboard-driven teaser with keyframes and a video stage.",
    stepOrder: ["lf-brief", "lf-story", "lf-keys", "lf-video", "lf-audio", "lf-review", "lf-export"],
    nodes: launchFilmNodes,
    edges: launchFilmEdges,
    updatedAt: nowIso(),
  },
  {
    schemaVersion: FOUNDRY_SCHEMA_VERSION,
    id: "wf-identity-study",
    version: 4,
    title: "Identity study",
    summary: "Two variant branches compared before an approved export.",
    stepOrder: ["id-refs", "id-dir", "id-var-a", "id-var-b", "id-compare", "id-export"],
    nodes: identityStudyNodes,
    edges: identityStudyEdges,
    updatedAt: nowIso(),
  },
  {
    schemaVersion: FOUNDRY_SCHEMA_VERSION,
    id: "wf-product-3d",
    version: 1,
    title: "Product 3D study",
    summary: "Reference turntable to a web-ready 3D export.",
    stepOrder: ["td-turntable", "td-cond", "td-3d", "td-mat", "td-export"],
    nodes: product3dNodes,
    edges: product3dEdges,
    updatedAt: nowIso(),
  },
]

export const DEFAULT_WORKFLOW_ID = "wf-product-photography"

export function getSeedWorkflow(id: string): Workflow | undefined {
  return SEED_WORKFLOWS.find((w) => w.id === id)
}

/** Deep clone so callers can mutate freely without touching the seed. */
export function cloneWorkflow(workflow: Workflow): Workflow {
  return structuredClone(workflow)
}

export const GENERATION_CATEGORIES = GEN_CATEGORIES
