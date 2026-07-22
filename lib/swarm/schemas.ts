/**
 * Council output schemas. Isolated from executor.ts so the orchestrator can
 * import the schemas without pulling in the `ai` SDK / gateway client.
 */

import { z } from 'zod'

// Analysis + risk agents emit a structured verdict.
export const AgentVerdict = z.object({
  stance: z.string().describe('The agent’s position in one or two sentences'),
  evidence: z.array(z.string()).describe('2-4 concrete evidence points backing the stance'),
  confidence: z.enum(['high', 'medium', 'low']),
})
export type AgentVerdictT = z.infer<typeof AgentVerdict>

// The portfolio-manager (synthesis) emits ranked opportunities + gated actions.
export const SynthesisOutput = z.object({
  summary: z.string().describe('One-paragraph synthesis of the debate'),
  ranked_opportunities: z.array(
    z.object({
      thesis: z.string(),
      conviction: z.enum(['high', 'medium', 'low']),
    }),
  ),
  proposed_actions: z.array(
    z.object({
      instrument: z.string(),
      side: z.enum(['buy', 'sell', 'hold']),
      size_band: z.string().describe('e.g. "1-2% of portfolio" — a band, never a raw amount'),
      rationale: z.string(),
      // Hard-coded: the hosted side proposes only. Execution is a human act
      // through the local trade-gate MCP.
      requires_human_approval: z.literal(true),
    }),
  ),
  data_integrity_flags: z.array(z.string()).describe('Anything stale, missing, or assumed'),
})
export type SynthesisOutputT = z.infer<typeof SynthesisOutput>
