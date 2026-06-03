/**
 * Editorial layer for the LLM Hub.
 *
 * The factual data spine is data/model-registry.json (benchmarks, pricing,
 * specs). This file holds the *opinion* — taglines, "best for" verdicts,
 * creator-specific notes, and the OpenRouter slug used to enrich each model
 * with live pricing. Keyed by registry model id.
 *
 * Keeping editorial separate from the registry keeps the registry clean and
 * machine-mergeable via /new-model, while letting the verdicts evolve freely.
 */

export interface ModelEditorial {
  /** One-line positioning, FrankX voice — confident, understated. */
  tagline: string
  /** Concrete jobs this model is the right pick for. */
  bestFor: string[]
  /** Where it falls short / when to pick something else. */
  watchOut?: string
  /** Creator-specific note (music / image / video / writing), if relevant. */
  creatorUse?: string
  /** OpenRouter slug for live-pricing enrichment (GET /api/v1/models). */
  openrouterId?: string
}

export const MODEL_EDITORIAL: Record<string, ModelEditorial> = {
  'gemini-3-5-flash': {
    tagline: 'Frontier agentic coding at sub-flagship economics — the new default agent runtime.',
    bestFor: [
      'High-volume agentic workloads where cost compounds',
      'MCP-heavy tool-use pipelines (83.6% MCP Atlas)',
      'Long-horizon coding agents that need 1M context cheaply',
    ],
    watchOut: 'Pure abstract reasoning still trails Claude Opus 4.6 (ARC-AGI-2). Vendor benchmarks pending independent reproduction.',
    creatorUse: 'Best price/quality for content-generation agents and bulk drafting loops.',
    openrouterId: 'google/gemini-3.5-flash',
  },
  'gemini-3-5-pro': {
    tagline: 'Google’s top reasoning tier — the Flash counterpart for the heaviest work.',
    bestFor: ['Complex reasoning across the widest modality set', 'Tasks where Flash hits its ceiling'],
    watchOut: 'In testing as of I/O ’26 — full benchmarks land at GA (mid-June 2026).',
    openrouterId: 'google/gemini-3.5-pro',
  },
  'gemini-omni': {
    tagline: 'Native frontier video generation folded into the standard Gemini surface.',
    bestFor: ['Text/audio/image/video → dynamic video', 'Natural-language video editing', 'Enterprise post-production, virtual try-on'],
    watchOut: 'Preview. Head-to-head vs Veo 3 / Sora 2 not yet independently run.',
    creatorUse: 'The one to watch for agentic video pipelines — author, narrate, produce in one tool-use sequence.',
  },
  'gemini-omni-flash': {
    tagline: 'Production-ready video generation at Flash economics.',
    bestFor: ['High-throughput video gen', 'Cost-sensitive creative pipelines'],
    creatorUse: 'Bulk short-form video generation where speed and cost beat cinematic fidelity.',
  },
  'mai-thinking-1': {
    tagline: 'Microsoft’s in-house reasoning flagship — frontier ambitions on MAIA silicon.',
    bestFor: [
      'Watching Microsoft’s full-stack frontier play (chip + model + tuning)',
      'Math/reasoning workloads (vendor-claimed 97% AIME 2025)',
      'Frontier Tuning into custom company-specific agents',
    ],
    watchOut: 'Vendor-claimed at launch — human-rater preference over Sonnet 4.6 and SWE-Bench Pro figures are unreproduced. Await LMArena/ARC/Artificial Analysis before trusting in production.',
    creatorUse: 'One to track, not yet to standardize on. Re-evaluate once independent benchmarks land.',
  },
  'mai-image-2-5': {
    tagline: 'Microsoft’s image model — claimed #2 leaderboard, ahead of Nano Banana 2 on editing.',
    bestFor: ['Image generation and editing pipelines', 'High-volume creative work via the Flash variant'],
    watchOut: 'Leaderboard claim is vendor-stated; the LMArena image arena will confirm or debunk it fast.',
    creatorUse: 'The Flash variant is the interesting one for bulk image-editing loops once it’s live.',
  },
  'mai-code-1-flash': {
    tagline: 'Tiny (5B), IDE-native coding model — the per-keystroke lane, not the architect.',
    bestFor: ['In-editor completion in VS Code / GitHub Copilot CLI', 'High-frequency, low-latency coding assists'],
    watchOut: 'Vendor-claimed 51% SWE-Bench Pro. Benchmark size ≠ how it feels on your repo — pilot before adopting.',
    creatorUse: 'Cheap, fast in-editor help; route real architecture work to a frontier model.',
  },
  'claude-opus-4-6': {
    tagline: 'The reasoning + long-context flagship. THE model for high-stakes synthesis.',
    bestFor: [
      'Abstract reasoning (#1 ARC-AGI-2, 68.8%)',
      'Computer-use agents (#1 OSWorld, 72.7%)',
      '1M-context research synthesis and long agent sessions',
      'Parallel agent orchestration (Agent Teams)',
    ],
    watchOut: 'Premium pricing. For high-volume routine steps, route to a cheaper model.',
    creatorUse: 'The reasoning brain behind serious creator OS builds and multi-file code generation.',
    openrouterId: 'anthropic/claude-opus-4.6',
  },
  'claude-opus-4-5': {
    tagline: 'Previous Anthropic flagship — still strong at coding, superseded by 4.6.',
    bestFor: ['Coding (80.9% SWE-bench Verified)', 'Workloads not yet migrated to 4.6'],
    openrouterId: 'anthropic/claude-opus-4.5',
  },
  'claude-sonnet-4-5': {
    tagline: 'The workhorse — production coding and content at mid-tier cost.',
    bestFor: ['Standard coding and integrations', 'Content generation at scale', 'Moderate-complexity production tasks'],
    creatorUse: 'The reliable default for content-engine workflows.',
    openrouterId: 'anthropic/claude-sonnet-4.5',
  },
  'claude-haiku-4-5': {
    tagline: 'Fast and cheap — classification, routing, high-volume extraction.',
    bestFor: ['Routing and classification', 'Real-time chat', 'High-volume metadata tagging'],
    openrouterId: 'anthropic/claude-haiku-4.5',
  },
  'grok-4-1': {
    tagline: 'Top human-preference Elo with 2M context and aggressive pricing.',
    bestFor: ['Long-context reasoning', 'Real-time / X-grounded tasks', 'Cost-conscious 2M-context workloads'],
    openrouterId: 'x-ai/grok-4.1',
  },
  'gpt-5-2-pro': {
    tagline: 'Broadest multimodal + native voice — the general-purpose default.',
    bestFor: ['Native voice applications', 'Broad multimodal reasoning', 'Widest enterprise integration footprint'],
    watchOut: 'Reasoning benchmarks trail Opus 4.6 on ARC-AGI-2.',
    openrouterId: 'openai/gpt-5.2-pro',
  },
  'gemini-3-pro': {
    tagline: 'Widest modality support with 2M native context.',
    bestFor: ['Multimodal understanding (81% MMMU-Pro)', 'Video + audio + vision reasoning', '2M-context tasks'],
    openrouterId: 'google/gemini-3-pro',
  },
  'llama-4-maverick': {
    tagline: 'Open-weight MoE leadership — 400B total, 17B active, runs on one H100.',
    bestFor: ['Self-hosted / sovereign deployments', 'Fine-tuning ecosystems', 'Cost-controlled inference at scale'],
    creatorUse: 'The base for creators who want to own and fine-tune their model.',
    openrouterId: 'meta-llama/llama-4-maverick',
  },
  'deepseek-v3-2': {
    tagline: 'Frontier-class reasoning at fraction-of-a-cent economics under MIT license.',
    bestFor: ['Budget reasoning at scale', 'Open-weight self-hosting', 'Cost-anchor for routing decisions'],
    openrouterId: 'deepseek/deepseek-v3.2',
  },
  'mistral-large-3': {
    tagline: 'European data sovereignty with a strong open/commercial split.',
    bestFor: ['EU data-residency requirements', 'Multilingual frontier tasks', 'Apache-licensed small-model pairing'],
    openrouterId: 'mistralai/mistral-large-3',
  },
  'qwen3-coder-next': {
    tagline: 'The efficiency breakthrough — 70.6% SWE-bench at 3B active params, Apache 2.0.',
    bestFor: ['Edge / on-device coding', 'Cost-optimized coding agents', 'Open-weight coding pipelines'],
    creatorUse: 'Run a capable coding agent locally without API costs.',
    openrouterId: 'qwen/qwen3-coder-next',
  },
  'command-a-reasoning': {
    tagline: 'Enterprise RAG + retrieval with EU residency.',
    bestFor: ['Enterprise RAG pipelines', 'EU-resident reasoning', 'Tool-use + retrieval workloads'],
    openrouterId: 'cohere/command-a-reasoning',
  },
}

export function getEditorial(modelId: string): ModelEditorial | undefined {
  return MODEL_EDITORIAL[modelId]
}
