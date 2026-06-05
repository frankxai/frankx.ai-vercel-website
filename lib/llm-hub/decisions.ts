/**
 * Decision matrix — "pick your constraint → get a recommendation."
 * The fastest path from "which model?" to an answer. Each row maps a
 * single dominant constraint to a primary pick + runner-up, with the
 * one-line reason. Model ids reference the registry (use the `id` field so
 * each link resolves to a pre-rendered /llm-hub/[id] page).
 *
 * Refreshed to the June 2026 frontier (Opus 4.8 / GPT-5.5 / Grok 4.3 /
 * DeepSeek V4 / Qwen3.7-Max / Kimi K2.6 / Gemma 4 / gpt-oss / Phi-4).
 * Every reason cites a figure carried in the registry; verified-vs-vendor
 * distinctions live in the per-model pages.
 */

export interface DecisionRow {
  constraint: string
  primaryId: string
  altId?: string
  reason: string
}

export const DECISION_MATRIX: DecisionRow[] = [
  {
    constraint: 'Hardest reasoning + knowledge work',
    primaryId: 'claude-opus-4-8',
    altId: 'gpt-5.5',
    reason: 'Tops the intelligence index — GDPval-AA 1890 and SWE-Bench Pro 69.2% lead the field.',
  },
  {
    constraint: 'Agentic coding + computer use',
    primaryId: 'gpt-5.5',
    altId: 'claude-opus-4-8',
    reason: 'Best published computer-use scores (84.9% GDPval, 78.7% OSWorld); Opus 4.8 counters on SWE-Bench Pro.',
  },
  {
    constraint: 'Lowest cost (closed frontier)',
    primaryId: 'grok-4.3',
    altId: 'gemini-3-5-flash',
    reason: 'Fourth-best intelligence (AA 53) at the cheapest frontier price — $1.25/$2.50 per 1M.',
  },
  {
    constraint: 'Top open weights',
    primaryId: 'kimi-k2.6',
    altId: 'deepseek-v4',
    reason: 'Highest open-weights intelligence (AA Index 54); DeepSeek V4 is the close, MIT-licensed runner-up.',
  },
  {
    constraint: 'Lowest cost (open weights)',
    primaryId: 'deepseek-v4',
    altId: 'gpt-oss',
    reason: 'Frontier-class coding (80.6% SWE-bench Verified) at open-weight economics under MIT.',
  },
  {
    constraint: 'Longest context',
    primaryId: 'grok-4.3',
    altId: 'gpt-5.5',
    reason: '2M-token native window; GPT-5.5 offers 1M at GA.',
  },
  {
    constraint: 'Native voice + broad multimodal',
    primaryId: 'gpt-5.5',
    altId: 'gemini-3-5-pro',
    reason: 'Native audio modality plus the widest general multimodal coverage.',
  },
  {
    constraint: 'Widest modality (incl. video)',
    primaryId: 'gemini-3-5-pro',
    altId: 'gemini-3-5-flash',
    reason: 'Google’s top reasoning tier across text/vision/audio/video (Pro in preview; Flash is the GA workhorse).',
  },
  {
    constraint: 'EU data sovereignty',
    primaryId: 'mistral-large-2512',
    altId: 'deepseek-v4',
    reason: 'Apache 2.0, EU-resident endpoints, self-hostable frontier on a single 8×H200 node.',
  },
  {
    constraint: 'Self-host / own the weights',
    primaryId: 'deepseek-v4',
    altId: 'llama-4-maverick',
    reason: 'Open-weight MoE frontier; Llama 4 for a permissive license + native multimodality.',
  },
  {
    constraint: 'Run on one consumer GPU',
    primaryId: 'gemma-4',
    altId: 'gpt-oss',
    reason: 'Gemma 4 31B runs in ~18GB at Q4 (LMArena 1452); gpt-oss-20b is the ~16GB reasoning alternative.',
  },
  {
    constraint: 'Laptop / edge (smallest footprint)',
    primaryId: 'phi-4',
    altId: 'gemma-4',
    reason: 'MIT-licensed 3.8B–15B STEM specialist that runs on a laptop; Gemma 4’s E2B/E4B tiers go smaller still.',
  },
]
