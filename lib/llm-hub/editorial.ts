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
    tagline: 'Google’s top reasoning tier — announced, not yet shipped. Verdict pending GA.',
    bestFor: [
      'Hard reasoning where Flash hits its ceiling (once GA)',
      'Workloads needing 2M context across the widest modality set (targeted)',
      'Heavy video/audio multimodal reasoning',
    ],
    watchOut: 'Still in limited Vertex preview as of June 5, 2026 — no model card, no benchmarks, no pricing. GA targeted for June. Build on Gemini 3.5 Flash in the meantime.',
    creatorUse: 'The one to watch for agentic video/multimodal pipelines once GA confirms Deep Think numbers. For now, route creator agent work to Gemini 3.5 Flash.',
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
  'claude-opus-4-8': {
    tagline: 'Modest version bump, real frontier gains — tops the intelligence index at the same price as 4.7.',
    bestFor: [
      'Hard agentic coding and codebase-scale migrations',
      'Long-horizon autonomous work with a clear up-front spec',
      'Economically valuable knowledge work (leads GDPval-AA at 1890)',
    ],
    watchOut: 'Loses Terminal-Bench 2.1 to GPT-5.5; narrates more and asks more by default than 4.7, so prompts may need re-tuning. GPQA/USAMO numbers are vendor-claimed.',
    creatorUse: 'Single-pass long-form drafts (128K output) and full-archive synthesis (1M context). Re-baseline any style prompts written against 4.7’s clipped voice — 4.8 is warmer by default.',
    openrouterId: 'anthropic/claude-opus-4.8',
  },
  'claude-sonnet-4-6': {
    tagline: 'The mid-tier that started eating the flagship’s lunch — most of Opus 4.6 at $3/$15.',
    bestFor: ['Production coding and integrations', 'Content generation at scale', '1M-context work without flagship pricing'],
    watchOut: 'For the hardest reasoning and agentic-coding tasks, Opus 4.8 still pulls ahead.',
    creatorUse: 'The reliable default for content-engine workflows — route to Opus 4.8 only when the task earns it.',
    openrouterId: 'anthropic/claude-sonnet-4.6',
  },
  'claude-opus-4-6': {
    tagline: 'Previous reasoning + long-context flagship — superseded by Opus 4.8.',
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
  'grok-4-3': {
    tagline: 'Fourth-best frontier intelligence at roughly the cheapest frontier price, with the fastest output in its tier.',
    bestFor: [
      'High-volume cost-sensitive inference (classification, extraction, summarization)',
      'Latency-sensitive agentic tool loops',
      'Native video-input and voice-cloning workflows',
    ],
    watchOut: 'Context window dropped 2M → 1M; per-token price doubles past 200K tokens in a single request; reasoning is always-on so trivial calls cost slightly more.',
    creatorUse: 'Native video input removes a transcription step for footage analysis; Custom Voices enables narration and conversational agents at a flat per-minute rate.',
    openrouterId: 'x-ai/grok-4.3',
  },
  'grok-4-1': {
    tagline: 'Previous Grok flagship — 2M context, superseded by Grok 4.3.',
    bestFor: ['Workloads not yet migrated to 4.3', '2M-context tasks (4.3 dropped to 1M)'],
    openrouterId: 'x-ai/grok-4.1',
  },
  'gpt-5-5': {
    tagline: 'OpenAI’s agentic flagship: best-in-class computer-use and knowledge-work scores, at double the price.',
    bestFor: [
      'Terminal-agent and Codex-style autonomous loops',
      'Computer-use / OSWorld automation',
      'Long-context reasoning over large codebases and corpora',
    ],
    watchOut: 'Output is $30/1M and the published 1M context can shrink in practice (~258K reported in Codex). The 2x price only pays off if your workload is output-heavy enough to capture the ~40% token-efficiency savings. Trails Opus 4.8 on GDPval-AA and SWE-Bench Pro.',
    creatorUse: 'Strong for multi-step agentic pipelines and long-document synthesis; for real-time voice use the separate gpt-realtime-2 family, not GPT-5.5 directly.',
    openrouterId: 'openai/gpt-5.5',
  },
  'gpt-5-2-pro': {
    tagline: 'Previous OpenAI flagship — superseded by GPT-5.5.',
    bestFor: ['Workloads not yet migrated to GPT-5.5', 'Broad multimodal reasoning'],
    watchOut: 'Reasoning benchmarks trail current-generation flagships.',
    openrouterId: 'openai/gpt-5.2-pro',
  },
  'gemini-3-pro': {
    tagline: 'Prior Gemini Pro tier — superseded by the Gemini 3.5 line (Flash GA, Pro in preview).',
    bestFor: ['Workloads not yet migrated to Gemini 3.5', '2M-context multimodal tasks'],
    openrouterId: 'google/gemini-3-pro',
  },
  'llama-4-maverick': {
    tagline: 'Open-weight MoE leadership — 400B total, 17B active, runs on one H100.',
    bestFor: ['Self-hosted / sovereign deployments', 'Fine-tuning ecosystems', 'Cost-controlled inference at scale'],
    creatorUse: 'The base for creators who want to own and fine-tune their model.',
    openrouterId: 'meta-llama/llama-4-maverick',
  },
  'deepseek-v4': {
    tagline: 'Open-weight frontier-class coding at one-sixth the price — MIT-licensed, 1M context, self-hostable.',
    bestFor: ['Budget coding agents at scale', 'Open-weight self-hosting and fine-tuning', 'Cost-anchor for routing decisions'],
    watchOut: 'Trails the closed frontier (Opus 4.8, GPT-5.5) on agentic SWE, security, and hardest reasoning; CAISI puts it ~8 months behind. Many spec-sheet numbers are vendor-claimed, and the compressed 1M context can degrade exact long-context retrieval.',
    creatorUse: 'Run a capable coding agent on your own hardware (Flash, 284B) without per-token API costs, or use the cheap Pro API for reasoning work.',
    openrouterId: 'deepseek/deepseek-v4-pro',
  },
  'deepseek-v3-2': {
    tagline: 'Prior DeepSeek line — superseded by V4 (open-weight, MIT).',
    bestFor: ['Workloads not yet migrated to V4'],
    openrouterId: 'deepseek/deepseek-v3.2',
  },
  'kimi-k2-6': {
    tagline: 'The open-weight model that ties GPT-5.5-class coding at one-eighth the price.',
    bestFor: [
      'Long-horizon agentic coding and Agent Swarm workloads',
      'Self-hosting near-frontier coding quality under a permissive license',
      'Cost-sensitive, high-volume agentic pipelines',
    ],
    watchOut: 'Most coding/reasoning benchmarks are Moonshot’s own evals (vendor-claimed); it trails Opus 4.8 and GPT-5.5 on the neutral intelligence index and on SWE-Bench Verified. Running a 1T MoE well is a real infra project.',
    creatorUse: 'Cheap, self-hostable engine for code generation, UI/UX scaffolding, and multi-agent research swarms where you want frontier-ish quality without frontier pricing or data leaving your environment.',
    openrouterId: 'moonshotai/kimi-k2.6',
  },
  'qwen3-7-max': {
    tagline: 'Alibaba’s closed-weight agent flagship: top-5 intelligence, 1M context, and 35-hour autonomy at half the Western-frontier price.',
    bestFor: [
      'High-volume, verifiable long-horizon agentic workloads',
      'Teams on the Anthropic Messages protocol wanting a cheaper drop-in to trial',
      'Context-heavy agents that benefit from the 90% cached-input discount',
    ],
    watchOut: 'Closed-weight / API-only (no self-host), undisclosed architecture, and a verbose reasoner whose effective cost-per-task exceeds the per-token rate; trails Opus 4.8 on aggregate and hardest coding.',
    creatorUse: 'Drive long autonomous coding/optimization runs and batch refactors via Claude Code or Qwen Code; route expensive-failure work to Opus.',
    openrouterId: 'qwen/qwen3.7-max',
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
