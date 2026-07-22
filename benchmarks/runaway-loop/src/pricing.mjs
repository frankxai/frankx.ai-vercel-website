// Cost-per-step pricing. Deliberately simple and overridable — see README.
//
// A "step" here is one tool-call round trip: the model reads the current
// context, decides on a tool call, and gets a result back. Its token cost is
// dominated by the growing conversation history, not by the tool result
// itself, which is why cost scales with step count rather than task
// complexity once a loop stops making progress.

// Blended $/1M-token rate, illustrative — a mid-tier model's blended
// input+output price as of 2026-06. Override with STEP_PRICE_PER_M to keep
// the cost receipt honest if your model/pricing differs.
export const PRICE_PER_M = Number(process.env.STEP_PRICE_PER_M || 3.0)

// Cost of a single step in USD, given its token count and the price constant.
export function stepCostUsd(tokens, pricePerM = PRICE_PER_M) {
  return (tokens / 1_000_000) * pricePerM
}
