import { curatedTemplates, graphStats } from "./blueprints"
import { teardowns } from "./teardowns"

export type TemplateStatus =
  | "interactive-prototype"
  | "reference-architecture"
  | "planned"

export interface ArchitectureLayer {
  id: string
  title: string
  responsibility: string
}

export interface TemplatePackage {
  slug: string
  name: string
  category: string
  summary: string
  status: TemplateStatus
  sourceClass: "frankx-first-party"
  proofRoute: string
  previewKey?: string
  poster: string
  posterAlt: string
  capabilities: string[]
  architecture: ArchitectureLayer[]
  releaseGates: string[]
}

export const catalogSnapshot = {
  observedAt: "2026-07-17T00:00:00Z",
  communityTemplates: graphStats.templates,
  graphConnections: graphStats.connections,
  categories: graphStats.categories,
  architectureTeardowns: teardowns.length,
} as const

export const sourceLegend = [
  {
    id: "frankx-first-party",
    label: "FrankX first-party",
    note: "Implemented in this repository and verified through the FrankX release gates.",
  },
  {
    id: "v0-community-gallery",
    label: "v0 community gallery",
    note: "Outbound reference observed on v0.app. Listing does not imply official authorship or code redistribution.",
  },
  {
    id: "vercel-template-marketplace",
    label: "Vercel marketplace",
    note: "Outbound reference to a Vercel template. License and deployment terms stay with its publisher.",
  },
] as const

export const templatePackages: TemplatePackage[] = [
  {
    slug: "visual-foundry",
    name: "Visual Foundry",
    category: "Multimodal workflow studio",
    summary:
      "A node-based studio for composing image, video, and 3D work with typed ports, review gates, reusable graphs, and visible provenance.",
    status: "interactive-prototype",
    sourceClass: "frankx-first-party",
    proofRoute: "/v0/studio",
    previewKey: "visual-foundry",
    poster: "/images/v0-foundry/launch-film-poster.png",
    posterAlt:
      "A black creative device on a restrained studio stage with cyan light.",
    capabilities: [
      "Typed image, video, 3D, transform, compare, review, and export nodes",
      "Cycle-safe DAG editing with deterministic local demo runs",
      "A/B approval, rejection notes, provenance, import, and export",
      "Purpose-built mobile step view instead of a compressed node canvas",
    ],
    architecture: [
      {
        id: "brief",
        title: "Brief and references",
        responsibility:
          "Normalize intent, rights, aspect ratios, source assets, and output constraints.",
      },
      {
        id: "graph",
        title: "Typed creation graph",
        responsibility:
          "Compose provider-neutral nodes and reject invalid, duplicate, or cyclic connections.",
      },
      {
        id: "providers",
        title: "Provider adapters",
        responsibility:
          "Route image, video, and 3D jobs server-side with secrets, moderation, and spend controls.",
      },
      {
        id: "review",
        title: "Human review",
        responsibility:
          "Compare outputs, annotate decisions, approve rights posture, and resume only after review.",
      },
      {
        id: "delivery",
        title: "Export and provenance",
        responsibility:
          "Produce renditions, checksums, source lineage, and channel-specific delivery packages.",
      },
    ],
    releaseGates: [
      "Prototype adapters are deterministic demos; live providers remain server-only work.",
      "Production persistence, authorization, moderation, and rate limits are not yet implemented.",
      "Video output is a storyboard poster and 3D output is a study image, not a playable clip or GLB.",
    ],
  },
  {
    slug: "multimodal-creation-graph",
    name: "Multimodal Creation Graph",
    category: "Reference architecture",
    summary:
      "An original workflow-to-tool architecture for premium generative production, informed by modern node-based creative products without copying their trade dress or assets.",
    status: "reference-architecture",
    sourceClass: "frankx-first-party",
    proofRoute: "/v0/studio",
    poster: "/images/v0-foundry/product-3d-study.png",
    posterAlt:
      "A graphite folded-ribbon object surrounding a suspended glass core.",
    capabilities: [
      "Multi-model generation lanes with explicit cost, latency, and rights policies",
      "Professional transforms for crop, mask, relight, depth, upscale, and compositing",
      "Workflow compiler that can publish a simplified task-specific tool",
      "Evaluation ledger for prompt, seed, model, source, reviewer, and export lineage",
    ],
    architecture: [
      {
        id: "canvas",
        title: "Composition canvas",
        responsibility:
          "Versioned graph, layers, typed ports, node groups, reusable subgraphs, and collaborative comments.",
      },
      {
        id: "compiler",
        title: "Workflow compiler",
        responsibility:
          "Convert an approved graph into a constrained operator-facing tool with only necessary controls.",
      },
      {
        id: "orchestrator",
        title: "Generation orchestrator",
        responsibility:
          "Queue jobs, route providers, enforce budgets, retry safely, and preserve idempotency.",
      },
      {
        id: "asset-plane",
        title: "Asset and rights plane",
        responsibility:
          "Store immutable sources, derivatives, masks, 3D files, renditions, licenses, and checksums.",
      },
      {
        id: "evaluation",
        title: "Evaluation and observability",
        responsibility:
          "Score quality, trace latency and spend, capture review decisions, and support reproducible reruns.",
      },
      {
        id: "delivery",
        title: "Channel delivery",
        responsibility:
          "Render web, social, campaign, motion, and marketplace variants from one approved master.",
      },
    ],
    releaseGates: [
      "Provider contracts require isolated server adapters and per-model capability tests.",
      "Generated media must pass the 30-point visual gate and human rights review.",
      "Live video and 3D generation require explicit provider, spend, storage, and moderation approval.",
    ],
  },
]

export const curatedCommunityTemplates = curatedTemplates.map((template) => ({
  ...template,
  sourceClass: "v0-community-gallery" as const,
  observedAt: catalogSnapshot.observedAt,
}))

export function getTemplatePackage(
  slug: string,
): TemplatePackage | undefined {
  return templatePackages.find((template) => template.slug === slug)
}
