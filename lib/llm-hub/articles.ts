/**
 * Maps a registry model key to its FrankX deep-dive analysis article slug
 * (under /blog/[slug]). Single source of truth for model ↔ article interlinking,
 * consumed by the LLM Hub model pages and the sitemap.
 *
 * Keyed by registry KEY (the canonical id after normaliseModel), so callers pass
 * the same identifier used for /llm-hub/[slug] routing.
 */
export const MODEL_ARTICLES: Record<string, string> = {
  'claude-opus-4-8': 'claude-opus-4-8-analysis-2026',
  'gpt-5-5': 'gpt-5-5-analysis-2026',
  'gemini-3-5-pro': 'gemini-3-5-pro-analysis-2026',
  'grok-4-3': 'grok-4-3-analysis-2026',
  'deepseek-v4': 'deepseek-v4-analysis-2026',
  'qwen3-7-max': 'qwen3-max-analysis-2026',
  'kimi-k2-6': 'kimi-k2-analysis-2026',
  'gemma-4': 'gemma-3-analysis-2026',
  'llama-4-maverick': 'llama-4-analysis-2026',
  'mistral-large-3': 'mistral-large-3-analysis-2026',
  'gpt-oss': 'gpt-oss-analysis-2026',
  'phi-4': 'phi-analysis-2026',
}

/** Returns the deep-dive article slug for a model key, if one exists. */
export function articleForModel(key?: string): string | undefined {
  return key ? MODEL_ARTICLES[key] : undefined
}
