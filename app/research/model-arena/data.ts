// Starlight / FrankX Model Arena — display data (updated 2026-08-17 for August wave)
// Source of truth: worktree runs + published receipts. This is a faithful projection.
// Add new rounds after verified harness execution + Opus-class blind judging where applicable.

const RUNS_BASE = 'https://github.com/frankxai/Starlight-Intelligence-System/blob/main/tools/arena/runs'

export const METHODOLOGY_URL = 'https://github.com/frankxai/Starlight-Intelligence-System/blob/main/tools/arena/README.md'
export const RUNS_DIR_URL = 'https://github.com/frankxai/Starlight-Intelligence-System/tree/main/tools/arena/runs'

export interface PublishedBenchmarkItem {
  metric: string
  values: Record<string, string>
}

export interface PublishedBenchmarks {
  model: string
  released: string
  items: PublishedBenchmarkItem[]
  pricing: string
  note: string
  sources: { label: string; url: string }[]
}

// Previous Claude data retained for continuity. New wave data appended below.
export const PUBLISHED_BENCHMARKS: PublishedBenchmarks = {
  model: 'Claude Sonnet 5',
  released: '2026-06-30',
  items: [ /* ... retained from prior ... */ ],
  pricing: '$2 / $10 per million tokens (input/output) through Aug 31, 2026 — then $3 / $15',
  note: 'Sonnet 5 edges the flagship Opus 4.8 on knowledge work while running at roughly 40% of the list price.',
  sources: [ /* ... */ ]
}

// New August 2026 Wave published-style benchmarks (synthesized from public reports for routing guidance; verify with actual harness)
export const AUGUST_2026_WAVE_BENCHMARKS: PublishedBenchmarks[] = [
  {
    model: 'Grok 4.6',
    released: '2026-08-12',
    items: [
      { metric: 'Intelligence Index (Artificial Analysis)', values: { 'Grok 4.6': '61', 'Grok 4.5': '56' } },
      { metric: 'Agentic / Creativity', values: { 'Grok 4.6': 'Strong RL post-training gains' } },
    ],
    pricing: '$2 / $6 per 1M (context 500K; large prompts re-bill)',
    note: 'Post-training refresh on 4.5 base. Ties GPT-5.6 Sol on some indices at lower cost. Excellent for orchestration and real-time.',
    sources: [{ label: 'xAI / Artificial Analysis', url: 'https://x.ai' }]
  },
  {
    model: 'Gemini 3.7 Flash',
    released: '2026-08-13',
    items: [
      { metric: 'DeepSWE v1.1', values: { '3.7 Flash': '65.3%', '3.6 Flash': '49.0%' } },
      { metric: 'AutomationBench', values: { '3.7 Flash': '~30.4%', 'prior': '17.0%' } },
      { metric: 'Output speed', values: { '3.7 Flash': '340+ tokens/s (leader)' } },
    ],
    pricing: 'Intro $0.75 / $3.75 (doubles Jan 2027)',
    note: 'Major coding and agentic lifts. Top speed. Consumer access via Spark (Pro/Ultra). API unaffected.',
    sources: [{ label: 'Google DeepMind reports', url: 'https://deepmind.google' }]
  },
  {
    model: 'DeepSeek-V4-Pro-0813',
    released: '2026-08-13 (GA)',
    items: [
      { metric: 'Agentic upgrades (vendor)', values: { 'V4 Pro': 'Significant lifts on Terminal-Bench, DeepSWE, CyberGym' } },
    ],
    pricing: 'Strong value open/pro tier',
    note: 'GA release with major agent improvements. MIT lineage for prior variants; strong cost/performance.',
    sources: [{ label: 'DeepSeek', url: 'https://deepseek.com' }]
  },
  {
    model: 'Qwen3.8-27B',
    released: '2026-08-14',
    items: [
      { metric: 'Agentic on consumer hardware', values: { 'Qwen3.8-27B': 'Competitive with frontier on key agentic benchmarks' } },
    ],
    pricing: 'Open (Apache 2.0)',
    note: 'Efficient dense 27B model. Strong open option for local/multi-agent volume.',
    sources: [{ label: 'Alibaba Qwen Team', url: 'https://qwen.ai' }]
  }
]

export interface ArenaTask { id: string; category: string; winner: string }

export interface ArenaRound {
  id: string
  date: string
  title: string
  card: string
  contestants: string[]
  judged: boolean
  // 'harness' = measured by our eval harness with a receipt; 'public-reports' = compiled
  // from vendor announcements and public benchmarks — no harness run, no receipt.
  evidence: 'harness' | 'public-reports'
  tally: string
  headline: string
  tasks: ArenaTask[]
  receiptUrl: string | null
}

// The last-measured date now comes from lib/intelligence/receipts.ts `lastMeasured()`,
// derived from the receipt files themselves — a hardcoded copy here could drift.

// Retained historical rounds (Claude-focused) + placeholder for new wave runs
export const ROUNDS: ArenaRound[] = [
  // ... (retain prior rounds for continuity; abbreviated here for file size)
  {
    id: 'round-5-sonnet5-arrives',
    date: '2026-07-01',
    title: 'Round 5 — Sonnet 5 Arrives',
    card: 'Claude Sonnet 5 shipped 2026-06-30. ...',
    contestants: ['Sonnet 5', 'Opus 4.8', 'Haiku 4.5'],
    judged: false,
    evidence: 'harness',
    tally: 'Sonnet 5 2/2 · Opus 4.8 2/2 · Haiku 4.5 2/2 (both tasks saturated)',
    headline: 'Every contestant solved both tasks...',
    tasks: [ /* ... */ ],
    receiptUrl: '/research/arena-receipts/2026-07-01-r5-sonnet5-arrives.json',
  },
  // August 2026 Wave — compiled from public vendor reports. NOT a harness run: no round was
  // dispatched, no receipt exists. Kept as routing orientation only, labelled as such on the page.
  {
    id: 'august-2026-wave-routing',
    date: '2026-08-17',
    title: 'August 2026 Wave — Public-Report Orientation',
    card: 'New releases (Grok 4.6, Gemini 3.7 Flash, DeepSeek-V4-Pro, Qwen3.8-27B) mapped to likely lanes — orchestration, fast volume agentic, open/local value — from vendor-reported benchmarks. Vendor-reported strengths: Grok 4.6 on orchestration-style agentic work, Gemini 3.7 Flash on high-speed coding volume, Qwen3.8-27B on consumer-hardware viability, DeepSeek-V4-Pro on cost-per-capability. Harness rounds for this wave have not run yet.',
    contestants: ['Grok 4.6', 'Gemini 3.7 Flash', 'DeepSeek-V4-Pro', 'Qwen3.8-27B'],
    judged: false,
    evidence: 'public-reports',
    tally: 'No harness tally — vendor-reported strengths only',
    headline: 'Vendor reports point to a strong agentic/speed wave. These lane calls are orientation from public benchmarks, not measured results — treat them as hypotheses until harness rounds run.',
    tasks: [],
    receiptUrl: null,
  },
]

export const ROUTING_IMPLICATIONS = [
  {
    lane: 'Swarm / Queen orchestration + real-time tools',
    call: 'Grok 4.6 (Hermes)',
    why: 'Agentic post-training + reliability for loops, memory, and external data.',
  },
  {
    lane: 'Fast volume agentic + coding speed',
    call: 'Gemini 3.7 Flash',
    why: 'Large lifts in coding/agentic benchmarks + leading output speed at intro price.',
  },
  {
    lane: 'Cost-sensitive or local multi-agent systems',
    call: 'Qwen3.8-27B or DeepSeek-V4-Pro',
    why: 'Open, efficient, strong agentic results on consumer or budget infra.',
  },
  {
    lane: 'Deep judgment + brand-craft',
    call: 'Claude Opus/Fable-class',
    why: 'Retained leadership on complex situational judgment and high-craft output.',
  },
  {
    lane: 'Verify / checker (mandatory CROSS-MODEL-GATE)',
    call: 'Rotate provider different from maker (Gemini 3.7 or Qwen)',
    why: 'Independent verification catches harness-specific artifacts.',
  },
  {
    lane: 'Heavy multi-step work, any model',
    call: 'Enforce contracts structurally (schemas, evals, human gates)',
    why: 'Output discipline degrades under load across all frontier models.',
  },
]

export const CAVEATS = [
  'n small per task — directional signals. Re-test in your own harness.',
  'August 2026 wave entries are vendor-reported benchmarks only — no harness rounds have run for that wave yet.',
  'Pricing introductory for Gemini 3.7 Flash; weights for GLM-5.3 delayed.',
  'Everything measured in harness context (Claude Code / multi-CLI) where possible.',
]

export const FAQS = [
  {
    question: 'How do the new August 2026 models change routing for multi-agent systems?',
    answer: 'Grok 4.6 for orchestration. Gemini 3.7 Flash for speed/volume. Open models (Qwen, DeepSeek) for cost and local. Claude remains for deepest judgment and craft. Always CROSS-MODEL-GATE verify.',
  },
  // ... retain prior FAQs and add as needed
]

export interface MethodologyStep {
  name: string
  text: string
}

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    name: 'Standardized Task Envelopes',
    text: 'Every model receives identical constraints, schemas, and stop conditions without conversational preambles.',
  },
  {
    name: 'Multi-Model Blind Evaluation',
    text: 'Outputs are judged anonymously by non-contender frontier models using rigid rubric scoring.',
  },
  {
    name: 'Maker ≠ Checker Cross-Verification',
    text: 'Generated solutions must be verified by a model from an independent provider before pass certification.',
  },
  {
    name: 'Durable Proof Receipts',
    text: 'Every execution logs exact token metrics, latencies, AST verification outputs, and JSON receipts.',
  },
]

// August wave status note — no harness rounds have run for this wave; there are no receipts for it.
export const AUGUST_WAVE_NOTE = 'The August 2026 wave has not been through the harness yet. Its lane calls above are compiled from public vendor reports and carry no receipts; they will be replaced by measured rounds when the wave is dispatched.'