/**
 * Decision matrix — "pick your constraint → get a recommendation."
 * The fastest path from "which model?" to an answer. Each row maps a
 * single dominant constraint to a primary pick + runner-up, with the
 * one-line reason. Model ids reference the registry.
 */

export interface DecisionRow {
  constraint: string
  primaryId: string
  altId?: string
  reason: string
}

export const DECISION_MATRIX: DecisionRow[] = [
  {
    constraint: 'Lowest cost (closed)',
    primaryId: 'gemini-3-5-flash',
    altId: 'claude-haiku-4-5',
    reason: 'Frontier agentic performance at less than half the cost of comparable flagships.',
  },
  {
    constraint: 'Lowest cost (open weights)',
    primaryId: 'deepseek-v3-2',
    altId: 'qwen3-coder-next',
    reason: 'Frontier-class reasoning at fraction-of-a-cent economics under MIT license.',
  },
  {
    constraint: 'Hardest reasoning',
    primaryId: 'claude-opus-4-6',
    altId: 'gpt-5-2-pro',
    reason: '#1 ARC-AGI-2 (68.8%) and OSWorld (72.7%).',
  },
  {
    constraint: 'Agentic coding',
    primaryId: 'gemini-3-5-flash',
    altId: 'claude-opus-4-6',
    reason: '76.2% Terminal-Bench 2.1 and 83.6% MCP Atlas at low cost.',
  },
  {
    constraint: 'Longest context',
    primaryId: 'grok-4-1',
    altId: 'gemini-3-pro',
    reason: '2M-token native context with aggressive pricing.',
  },
  {
    constraint: 'Native voice',
    primaryId: 'gpt-5-2-pro',
    reason: 'Native audio modality with no close runner-up.',
  },
  {
    constraint: 'Multimodal understanding',
    primaryId: 'gemini-3-pro',
    altId: 'gpt-5-2-pro',
    reason: 'Widest modality support; 81% MMMU-Pro.',
  },
  {
    constraint: 'Video generation',
    primaryId: 'gemini-omni',
    reason: 'Native frontier video gen with natural-language editing.',
  },
  {
    constraint: 'EU data sovereignty',
    primaryId: 'mistral-large-3',
    altId: 'command-a-reasoning',
    reason: 'Paris-based, full EU residency; Apache-licensed small-model pairing.',
  },
  {
    constraint: 'Self-host / own the weights',
    primaryId: 'llama-4-maverick',
    altId: 'deepseek-v3-2',
    reason: 'Open-weight MoE (400B/17B) that runs on a single H100.',
  },
]
