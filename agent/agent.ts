import { defineAgent } from 'eve'

export default defineAgent({
  model: 'anthropic/claude-sonnet-5',
  reasoning: 'medium',
  compaction: { thresholdPercent: 0.72 },
  limits: {
    maxInputTokensPerSession: 180_000,
    maxOutputTokensPerSession: 18_000,
    sessionTimeoutMs: 24 * 60 * 60 * 1_000,
  },
})
