// Deterministic context-eviction simulator. No LLM call, no randomness.
//
// This does NOT measure "does the model get the answer right" — that
// requires a real model and is out of scope for the offline leg (see the
// optional live mode in live.mjs). It measures a strictly upstream,
// mechanical question: given a conversation that grows past a fixed token
// budget, does a fact planted at a given point in the conversation still
// EXIST in the context that gets sent to the model at all?
//
// That's the structural precondition for recall. A model cannot recover a
// fact that a naive context-management strategy already evicted, no matter
// how good the model is. This benchmark measures the eviction, not the
// recall.
//
// Three strategies are compared per (scenario, needle-depth) pair:
//   - fifo: naive sliding window — keep only the most-recent turns that fit
//     the budget, oldest turns evicted first as the conversation grows.
//   - keep-first-and-last: reserve a fixed number of the EARLIEST turns
//     (system prompt, task framing) unconditionally, then fill the rest of
//     the budget with the most-recent turns. This trades window size for a
//     preserved anchor — it is not a strict win over fifo (see README); a
//     needle that lands in the true middle is still at risk under both.
//   - retrieval-augmented: the needle is addressed by content, not by
//     recency, so a system that retrieves-on-demand rather than replaying
//     the raw transcript always has it available regardless of window size.
//     This is the structural ceiling the other two are compared against —
//     it is not a claim that retrieval always finds the RIGHT chunk (that's
//     the retrieval-miss benchmark's question), only that content indexed
//     for lookup isn't subject to eviction the way a raw transcript window is.

export const NEEDLE_DEPTHS = [0.1, 0.5, 0.9] // fraction of the conversation at which the needle turn lands
export const ANCHOR_TURNS = 10 // keep-first-and-last: earliest turns always preserved, unconditionally
export const STRATEGIES = ['fifo', 'keep-first-and-last', 'retrieval-augmented']

// How many of the most-recent turns fit inside a token budget.
function recentWindowSize(budgetTokens, avgTokensPerTurn) {
  return Math.max(0, Math.floor(budgetTokens / avgTokensPerTurn))
}

function survivesFifo(turnIndex, totalTurns, budgetTokens, avgTokensPerTurn) {
  const windowSize = recentWindowSize(budgetTokens, avgTokensPerTurn)
  return turnIndex >= totalTurns - windowSize
}

function survivesKeepFirstAndLast(turnIndex, totalTurns, budgetTokens, avgTokensPerTurn) {
  const anchorTurns = Math.min(ANCHOR_TURNS, totalTurns)
  if (turnIndex < anchorTurns) return true
  const anchorCostTokens = anchorTurns * avgTokensPerTurn
  const remainingBudget = Math.max(0, budgetTokens - anchorCostTokens)
  const windowSize = recentWindowSize(remainingBudget, avgTokensPerTurn)
  return turnIndex >= totalTurns - windowSize
}

function survivesRetrievalAugmented() {
  return true
}

// Simulates one scenario across the fixed NEEDLE_DEPTHS. Returns, per depth,
// whether the needle turn survives to the end of the conversation under each
// strategy.
export function simulateScenario(scenario) {
  const { total_turns, avg_tokens_per_turn, context_budget_tokens } = scenario
  const windowSizeTurns = recentWindowSize(context_budget_tokens, avg_tokens_per_turn)

  const perDepth = NEEDLE_DEPTHS.map((depth) => {
    const turnIndex = Math.floor(depth * (total_turns - 1))
    return {
      depth,
      turn_index: turnIndex,
      fifo: survivesFifo(turnIndex, total_turns, context_budget_tokens, avg_tokens_per_turn),
      'keep-first-and-last': survivesKeepFirstAndLast(turnIndex, total_turns, context_budget_tokens, avg_tokens_per_turn),
      'retrieval-augmented': survivesRetrievalAugmented(),
    }
  })

  return {
    id: scenario.id,
    name: scenario.name,
    total_turns,
    avg_tokens_per_turn,
    context_budget_tokens,
    window_size_turns: windowSizeTurns,
    window_covers_full_session: windowSizeTurns >= total_turns,
    per_depth: perDepth,
  }
}
