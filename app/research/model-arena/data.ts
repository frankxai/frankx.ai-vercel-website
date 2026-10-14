// Starlight / FrankX Model Arena — display data (updated 2026-10-14 for Round 6 Gemini 4 Argon Proving Ground)
// Source of truth: worktree runs + published receipts in public/research/arena-receipts/*.json.
// Add new rounds after verified harness execution + cross-provider checker sign-off where applicable.

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

// Reference vendor-reported card retained for longitudinal comparison alongside first-party receipts.
export const PUBLISHED_BENCHMARKS: PublishedBenchmarks = {
  model: 'Claude Sonnet 5',
  released: '2026-06-30',
  items: [
    {
      metric: 'SWE-bench Verified (vendor-reported)',
      values: { 'Claude Sonnet 5': '82.1%', 'Claude Opus 4.8': '80.8%', 'Claude Sonnet 4.6': '72.7%' },
    },
    {
      metric: 'OSWorld Computer Use (vendor-reported)',
      values: { 'Claude Sonnet 5': '74.2%', 'Claude Opus 4.8': '72.5%', 'Claude Sonnet 4.6': '61.4%' },
    },
    {
      metric: 'Starlight Arena Round 6 (first-party receipt)',
      values: { 'Claude Sonnet 5': '5/5 PASS ($0.059)', 'Gemini 4 Argon': '5/5 PASS ($0.041)', 'Claude Opus 5': '5/5 PASS ($0.110)' },
    },
  ],
  pricing: '$3.00 / $15.00 per million input/output tokens ($0.30 cached input; verified 2026-10-14)',
  note: 'Claude Sonnet 5 remains the everyday single-file and multi-file TypeScript/React workhorse, while Gemini 4 Argon undercuts it by 33% on uncached input and 67% on cached 1M-context loops.',
  sources: [
    { label: 'Anthropic Model Documentation', url: 'https://docs.anthropic.com/en/docs/about-claude/models' },
    { label: 'Starlight Round 6 Receipt (JSON)', url: '/research/arena-receipts/2026-10-14-r6-gemini-4-argon-proving-ground.json' },
  ],
}

// October 2026 & August 2026 Wave cards (synthesized from first-party receipts + public vendor reports for routing guidance)
export const OCTOBER_2026_WAVE_BENCHMARKS: PublishedBenchmarks[] = [
  {
    model: 'Gemini 4 Argon',
    released: '2026-10-08',
    items: [
      {
        metric: 'Starlight Arena Round 6 (first-party receipt)',
        values: { 'Gemini 4 Argon': '5/5 PASS ($0.0414)', 'Claude Opus 5': '5/5 PASS ($0.1100)', 'GPT-5.5': '3/5 PASS ($0.0540)' },
      },
      {
        metric: 'Context / Cached Input Economics',
        values: { 'Gemini 4 Argon': '1,048,576 tokens / $0.10 per 1M cached (95% discount)' },
      },
      {
        metric: 'Mean Task Latency (Round 6)',
        values: { 'Gemini 4 Argon': '1,976 ms', 'Claude Sonnet 5': '2,156 ms', 'Claude Fable 5.1': '3,080 ms' },
      },
    ],
    pricing: '$2.00 / $10.00 per 1M input/output ($0.10/1M cached input promo through 2026-11-30)',
    note: 'Measured in Round 6 (/research/arena-receipts/2026-10-14-r6-gemini-4-argon-proving-ground.json). Passed Next.js 16 RSC normalization, WCAG AA UI matrix, 7-rule editorial constraint stack, provenance pushback (at thinking=high), and Langfuse Cloud EU adapter.',
    sources: [
      { label: 'Starlight Round 6 Receipt', url: '/research/arena-receipts/2026-10-14-r6-gemini-4-argon-proving-ground.json' },
      { label: 'Gemini 4 Argon Deep-Dive Analysis', url: '/blog/gemini-4-argon-analysis-2026' },
    ],
  },
  {
    model: 'Claude Opus 5 & Claude Fable 5.1',
    released: '2026-08-24 / 2026-06-15',
    items: [
      {
        metric: 'Starlight Arena Round 6 (first-party receipt)',
        values: { 'Claude Opus 5': '5/5 PASS', 'Claude Fable 5.1': '5/5 PASS' },
      },
      {
        metric: 'Primary Separation Lane',
        values: { 'Opus 5': 'Adversarial architecture & security review', 'Fable 5.1': '7-rule constraint stacks & book-grade prose' },
      },
    ],
    pricing: 'Opus 5: $5.00 / $25.00 per 1M ($0.50 cached) · Fable 5.1: $15.00 / $75.00 per 1M',
    note: 'Retain clear superiority on adversarial multi-turn code/security review (Crown Gate) and literary voice where subtle spec contradictions must be caught on the first turn without prompt hints.',
    sources: [
      { label: 'Round 5 Fable 5.1 Receipt', url: '/research/arena-receipts/2026-06-15-r5-fable51-vs-fable5-vs-opus48.json' },
      { label: 'Argon vs Opus 5 Comparison', url: '/llm-hub/compare/gemini-4-argon-vs-claude-opus-5' },
    ],
  },
  {
    model: 'GPT-6 Astra & GPT-5.5',
    released: '2026-09-07 / 2026-05-14',
    items: [
      {
        metric: 'Math & Symbolic Verification',
        values: { 'GPT-6 Astra': 'AIME / formal proof leader', 'GPT-5.5': '3/5 PASS in Round 6' },
      },
      {
        metric: 'Named Round 6 Caveat (GPT-5.5)',
        values: { 'UI Contrast': '2.6:1 muted text (missed 4.5:1 AA)', 'Word Window': '274w vs 265w cap' },
      },
    ],
    pricing: 'GPT-6 Astra: $4.00 / $16.00 per 1M · GPT-5.5: $2.50 / $10.00 per 1M',
    note: 'Strong symbolic math, JSON schema synthesis, and cross-provider checker diversity. Enforce explicit CSS contrast tokens and post-generation word-count checks in automated pipelines.',
    sources: [
      { label: 'Argon vs GPT-5.5 Comparison', url: '/llm-hub/compare/gemini-4-argon-vs-gpt-5-5' },
      { label: 'LLM Intelligence Hub', url: '/llm-hub' },
    ],
  },
  {
    model: 'Grok 4.6 & Gemini 3.8 Flash',
    released: '2026-08-12 / 2026-09-18',
    items: [
      {
        metric: 'High-Throughput & Live Grounding',
        values: { 'Gemini 3.8 Flash': '380+ tok/s ($0.15 / $0.60)', 'Grok 4.6': 'Real-time X/web adversarial search ($2 / $6)' },
      },
    ],
    pricing: 'Gemini 3.8 Flash: $0.15 / $0.60 per 1M · Grok 4.6: $2.00 / $6.00 per 1M',
    note: 'Default fast-lane pair: Gemini 3.8 Flash handles high-volume classification, routing, and CI triage; Grok 4.6 handles live-search claim verification and red-team counter-arguments.',
    sources: [
      { label: 'Model Routing Matrix', url: '/llm-hub' },
    ],
  },
]

// Backwards-compatible export alias
export const AUGUST_2026_WAVE_BENCHMARKS = OCTOBER_2026_WAVE_BENCHMARKS

export interface ArenaTask {
  id: string
  category: string
  winner: string
}

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

// ROUNDS array is for public-report orientation entries only.
// Harness-measured rounds (Rounds 1–6) come directly from receipt files in public/research/arena-receipts/
// via lib/intelligence/receipts.ts — the page renders those via getReceipts().
export const ROUNDS: ArenaRound[] = [
  {
    id: 'august-2026-wave-routing',
    date: '2026-08-17',
    title: 'August 2026 Wave — Public-Report Orientation',
    card: 'New releases (Grok 4.6, Gemini 3.7 Flash, DeepSeek-V4-Pro, Qwen3.8-27B) mapped to likely lanes — orchestration, fast volume agentic, open/local value — from vendor-reported benchmarks. Vendor-reported strengths: Grok 4.6 on orchestration-style agentic work, Gemini 3.7 Flash on high-speed coding volume, Qwen3.8-27B on consumer-hardware viability, DeepSeek-V4-Pro on cost-per-capability.',
    contestants: ['Grok 4.6', 'Gemini 3.7 Flash', 'DeepSeek-V4-Pro', 'Qwen3.8-27B'],
    judged: false,
    evidence: 'public-reports',
    tally: 'No harness tally — vendor-reported strengths only',
    headline: 'Vendor reports point to a strong agentic/speed wave. Note: Gemini 4 Argon has since graduated from orientation to a full first-party measured receipt in Round 6 (2026-10-14).',
    tasks: [],
    receiptUrl: null,
  },
]

export const ROUTING_IMPLICATIONS = [
  {
    lane: '1M multimodal repo + UI/UX synthesis ($0.10/M cached)',
    call: 'Gemini 4 Argon (Round 6 receipt)',
    why: 'Passed 5/5 tasks in Round 6 at $2/$10 ($0.10 cached input through Nov 30, 2026) and 1.98s mean latency; set thinking=high when policy pushback is required.',
  },
  {
    lane: 'Deep judgment, security review & literary craft',
    call: 'Claude Opus 5 / Claude Fable 5.1',
    why: 'Retained leadership on subtle specification contradictions (Round 2 & Round 5 receipts) and zero-slop long-form editorial voice.',
  },
  {
    lane: 'Daily full-stack TypeScript, React 19 & Next.js 16 build',
    call: 'Claude Sonnet 5 or Gemini 4 Argon',
    why: 'Both passed 5/5 in Round 6; use Sonnet 5 for surgical multi-file diffs and Argon when pinning >200K repo context.',
  },
  {
    lane: 'Swarm / Queen orchestration + live web/X verification',
    call: 'Grok 4.6 (Hermes)',
    why: 'Agentic post-training + live search grounding for claim audits and external market checks.',
  },
  {
    lane: 'High-volume triage, classification & sub-second routing',
    call: 'Gemini 3.8 Flash ($0.15 / $0.60)',
    why: '380+ tokens/sec output speed at <8% of frontier input cost for bounded mechanical tasks.',
  },
  {
    lane: 'Cost-sensitive or local multi-agent systems',
    call: 'Qwen3.8-27B or DeepSeek-V4-Pro',
    why: 'Open weights (Apache 2.0) and budget-friendly API tiers for high-volume background workers.',
  },
  {
    lane: 'Verify / checker (mandatory CROSS-MODEL-GATE)',
    call: 'Rotate provider different from maker (Opus 5 ↔ Argon ↔ GPT-6 Astra)',
    why: 'Independent provider verification catches model-family blind spots before merge.',
  },
]

export const CAVEATS = [
  'Strict provenance separation: External vendor claims (data/model-registry.json) are never copied into First-Party Measured receipt scores (public/research/arena-receipts/*.json).',
  'Gemini 4 Argon thinking-depth sensitivity: Argon passed Task 4 (governance contradiction pushback) at thinking=high, but at thinking=low it prioritizes speed over challenging flawed premises.',
  'Cached-input falsifier: Argon’s $0.10/1M cached input rate requires prefix stability >= 65% across multi-turn agent loops; dynamic system-prompt mutation invalidates the cache.',
  'Benchmark license hygiene: SWE-bench figures are cited as headline percentages only (CC BY-NC 4.0 prohibits commercial redistribution of raw task datasets).',
]

export const FAQS = [
  {
    question: 'How does Gemini 4 Argon change multi-agent routing in October 2026?',
    answer: 'Gemini 4 Argon ($2.00/$10.00 per 1M tokens, $0.10/1M cached input) passed 5/5 tasks in Round 6 at 1,976 ms mean latency — roughly 2.7x cheaper than Claude Opus 5 and 7.6x cheaper than Claude Fable 5.1 on the same suite. It is now our primary route for 1M-context repository analysis, multimodal UI/UX verification, and cached coding loops.',
  },
  {
    question: 'Why does the Arena strictly separate External Registry claims from First-Party Measured Receipts?',
    answer: 'Vendor launch posts cherry-pick favorable prompt harnesses and temperatures. On this page, a model only earns a First-Party Measured badge when a committed JSON receipt in public/research/arena-receipts/ records the exact task prompt, mechanical verification command, latency, and cost. Unmeasured models remain explicitly labeled as External Registry entries.',
  },
  {
    question: 'When should engineering teams still pay a premium for Claude Opus 5 or Claude Fable 5.1?',
    answer: 'Route to Claude Opus 5 ($5/$25) for adversarial security/architecture review (Crown Gate) and complex root-cause debugging where subtle specification contradictions must be caught on the first turn. Route to Claude Fable 5.1 ($15/$75) for dense 7-rule editorial constraint stacks and flagship narrative prose.',
  },
  {
    question: 'Why did Gemini 4 Argon require thinking=high on Task 4 (Governance Contradiction Pushback)?',
    answer: 'In Round 6 Task 4, the prompt asked the model to copy vendor-reported SWE-bench numbers into row.measured when first-party receipts were missing. At thinking=high, Argon immediately refused and cited our provenance invariant. In ablation testing at thinking=low, Argon attempted to satisfy the user prompt literally. Always enforce thinking=high on governance and security gates.',
  },
  {
    question: 'How does the 95% cached-input discount ($0.10/1M) work in practice, and when does it fail?',
    answer: 'Keeping a 400,000-token repository warm across 20 iterative agent turns costs $0.88 on Gemini 4 Argon with context caching versus $4.24 on Claude Sonnet 5 and $7.00 on Claude Opus 5. The falsifier is prefix churn: if dynamic timestamps or un-ordered tool definitions mutate the prompt prefix and drop cache hit rates below 65%, effective input cost rises above $1.10/1M.',
  },
  {
    question: 'How can I reproduce Round 6 locally and inspect the traces in Langfuse Cloud EU?',
    answer: 'Run `node --experimental-strip-types tools/arena/run-argon-eval.ts` inside Starlight-Intelligence-System to execute the mechanical verification checks and emit the JSON receipts, then run `npm run intelligence:check` and `npm run test:intelligence-layer` in frankx.ai-vercel-website to verify schema and provenance invariants.',
  },
]

export interface MethodologyStep {
  name: string
  text: string
}

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    name: 'Standardized Task Envelopes',
    text: 'Every contestant receives the identical task prompt, constraint stack, and mechanical stop condition. Each committed receipt JSON records the exact verification command used.',
  },
  {
    name: 'Deterministic + Visual Verification',
    text: 'Coding and constraint tasks are verified by node:test assertions and regex/word-count gates; UI tasks are verified for WCAG AA contrast (>= 4.5:1) and inspected via the CDP Browser Hub (:9223).',
  },
  {
    name: 'Maker ≠ Checker Cross-Verification',
    text: 'Consequential outputs are verified by an independent model family (e.g., Claude Opus 5 reviewing Gemini 4 Argon, or Argon reviewing Sonnet 5) and logged to Langfuse Cloud EU.',
  },
  {
    name: 'Durable Proof Receipts',
    text: 'Every harness run commits an immutable JSON receipt under public/research/arena-receipts/ containing task-level pass/partial/fail verdicts, latency_ms, cost_usd, and evaluator field notes.',
  },
]

export const AUGUST_WAVE_NOTE = 'August 2026 orientation entries are compiled from public vendor reports where no harness receipt exists. Gemini 4 Argon graduated to a full first-party measured receipt in Round 6 (2026-10-14).'