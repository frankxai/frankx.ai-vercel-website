import {
  type AdapterRequest,
  type AdapterResult,
  type FoundryOutput,
  type GenerationAdapter,
  type Modality,
  type Provenance,
} from "./types"

/**
 * DEMO ADAPTERS - deterministic, offline, and clearly labeled.
 *
 * These never call a paid model or a live API. They return owned, generated
 * poster assets based on a fixed node->poster map so a run is fully
 * reproducible. Codex replaces these with real provider adapters implementing
 * the same GenerationAdapter contract (see integration notes in the manifest).
 */

const OWNED_POSTERS = {
  productPhotography: "/images/v0-foundry/product-photography.png",
  launchFilm: "/images/v0-foundry/launch-film-poster.png",
  identityA: "/images/v0-foundry/identity-variant-a.png",
  identityB: "/images/v0-foundry/identity-variant-b.png",
  product3d: "/images/v0-foundry/product-3d-study.png",
} as const

/** Node-specific poster mapping keeps demo outputs meaningful and deterministic. */
const POSTER_BY_NODE: Record<string, { src: string; alt: string }> = {
  "pp-image": { src: OWNED_POSTERS.productPhotography, alt: "Studio product photo: matte charcoal ceramic bottle on a seamless graphite backdrop." },
  "lf-keys": { src: OWNED_POSTERS.launchFilm, alt: "Cinematic keyframe: matte-black device on a reflective floor lit by teal volumetric beams." },
  "lf-video": { src: OWNED_POSTERS.launchFilm, alt: "Poster frame for the launch film video stage; a labeled storyboard demo, not a playable file." },
  "id-var-a": { src: OWNED_POSTERS.identityA, alt: "Identity variant A: concentric emerald arcs with a single angular stroke." },
  "id-var-b": { src: OWNED_POSTERS.identityB, alt: "Identity variant B: interlocking cyan geometric segments forming an abstract spatial frame." },
  "td-3d": { src: OWNED_POSTERS.product3d, alt: "3D study poster: folded graphite ribbon wrapped around a translucent glass core." },
}

const POSTER_BY_MODALITY: Record<Modality, { src: string; alt: string }> = {
  image: { src: OWNED_POSTERS.productPhotography, alt: "Generated image output on a dark studio backdrop." },
  video: { src: OWNED_POSTERS.launchFilm, alt: "Generated video poster frame on a dark studio backdrop." },
  "3d": { src: OWNED_POSTERS.product3d, alt: "Generated 3D study poster on a neutral studio gradient." },
}

function resolvePoster(nodeId: string, modality: Modality) {
  return POSTER_BY_NODE[nodeId] ?? POSTER_BY_MODALITY[modality]
}

function buildProvenance(req: AdapterRequest, adapterId: string, adapterVersion: string, seed: number): Provenance {
  return {
    workflowId: req.workflow.id,
    workflowVersion: req.workflow.version,
    runId: req.runId,
    sourceAssetIds: req.sourceAssetIds,
    adapterId,
    adapterVersion,
    promptRevision: 1,
    seed,
    timestamp: new Date().toISOString(),
    rightsStatus: "owned-generated",
    exportChecksum: "- generated at export time -",
  }
}

function buildOutput(
  req: AdapterRequest,
  modality: Modality,
  adapterId: string,
  adapterVersion: string,
  extra?: Partial<FoundryOutput>,
): FoundryOutput {
  const { node } = req
  const seed = node.data.fields.seed ?? 0
  const poster = resolvePoster(node.id, modality)
  return {
    id: `out-${req.runId}-${node.id}`,
    nodeId: node.id,
    runId: req.runId,
    modality,
    label: node.data.label,
    posterSrc: poster.src,
    alt: poster.alt,
    aspectRatio: node.data.fields.aspectRatio ?? "1:1",
    approval: "pending",
    provenance: buildProvenance(req, adapterId, adapterVersion, seed),
    ...extra,
  }
}

export const imageDemoAdapter: GenerationAdapter = {
  id: "demo-image-v1",
  version: "1.0.0-demo",
  modality: "image",
  label: "Local image (Demo)",
  isDemo: true,
  description: "Deterministic offline image stage. Returns an owned generated poster; no live model call.",
  async run(req) {
    return { output: buildOutput(req, "image", this.id, this.version) } satisfies AdapterResult
  },
}

export const videoDemoAdapter: GenerationAdapter = {
  id: "demo-video-v1",
  version: "1.0.0-demo",
  modality: "video",
  label: "Local video (Demo)",
  isDemo: true,
  description: "Deterministic offline video stage. Returns a poster plus a labeled storyboard timeline - never a fake playable file.",
  async run(req) {
    const storyboard = [
      { frameSrc: OWNED_POSTERS.launchFilm, caption: "Beat 1  /  Reveal" },
      { frameSrc: OWNED_POSTERS.launchFilm, caption: "Beat 2  /  Orbit" },
      { frameSrc: OWNED_POSTERS.launchFilm, caption: "Beat 3  /  Detail" },
      { frameSrc: OWNED_POSTERS.launchFilm, caption: "Beat 4  /  Logo hold" },
    ]
    return { output: buildOutput(req, "video", this.id, this.version, { storyboard }) } satisfies AdapterResult
  },
}

export const threeDDemoAdapter: GenerationAdapter = {
  id: "demo-3d-v1",
  version: "1.0.0-demo",
  modality: "3d",
  label: "Local 3D (Demo)",
  isDemo: true,
  description: "Deterministic offline 3D stage. Returns an owned turntable poster; a real GLB is produced by a provider adapter in production.",
  async run(req) {
    return { output: buildOutput(req, "3d", this.id, this.version) } satisfies AdapterResult
  },
}

export const DEMO_ADAPTERS: GenerationAdapter[] = [imageDemoAdapter, videoDemoAdapter, threeDDemoAdapter]

export function getAdapter(id: string | undefined): GenerationAdapter | undefined {
  return DEMO_ADAPTERS.find((a) => a.id === id)
}

export { OWNED_POSTERS }
