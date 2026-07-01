// Deterministic agent-loop simulator. No LLM call, no randomness.
//
// Each scenario defines an `optimal_steps` count (how many tool-call steps a
// converging agent needs) and a `trap` (a fixed, named non-convergent
// behavior an agent can fall into — retrying without new information,
// revisiting a prior state, chasing a moving goalpost, or retrying an
// identical failed call). The trap is not a probability; it is a scripted
// step pattern, so re-running the simulator on the same scenario produces
// the exact same step count every time.
//
// Two policies are simulated per scenario:
//   - uncapped: the agent runs the scenario's trap pattern with no external
//     bound. For every trap except "none" this is defined to never converge
//     on its own — that is the point being demonstrated, not a claim about
//     how often real agents do this. We cut simulation at UNCAPPED_HORIZON
//     purely so the demo terminates; the number to look at is that the
//     uncapped step count hits the horizon while the capped one does not.
//   - capped: the same scenario run under stepCountIs(N), N = a stop
//     condition set to a fixed multiple of optimal_steps (see
//     DEFAULT_CAP_MULTIPLIER). The loop is force-stopped at the cap
//     regardless of whether it converged.
//
// The metric this benchmark reports is cost, not "did it get the task
// right" — that requires a real model and is out of scope for the offline
// leg (see the optional live mode in live.mjs).

export const UNCAPPED_HORIZON = 500 // steps; a ceiling so the demo terminates, not a claim about real agents
export const DEFAULT_CAP_MULTIPLIER = 3 // stepCountIs(optimal_steps * this)

// Runs the scenario's step pattern with no cap. Traps other than "none" are
// defined to loop forever (bounded only by UNCAPPED_HORIZON for the demo).
function simulateUncapped(scenario) {
  if (scenario.trap === 'none') {
    return { steps: scenario.optimal_steps, converged: true, hitHorizon: false }
  }
  // Every non-"none" trap is, by construction, non-convergent under the
  // uncapped policy: the agent keeps taking steps because nothing in the
  // scenario ever satisfies its stopping condition. We stop counting at the
  // horizon so the simulator halts.
  return { steps: UNCAPPED_HORIZON, converged: false, hitHorizon: true }
}

// Runs the scenario's step pattern under a hard step cap (stepCountIs(N)).
function simulateCapped(scenario, cap) {
  if (scenario.trap === 'none') {
    const steps = Math.min(scenario.optimal_steps, cap)
    return { steps, converged: steps === scenario.optimal_steps, hitCap: steps === cap && steps < scenario.optimal_steps }
  }
  // Non-convergent trap: the agent runs until the cap forces a stop.
  return { steps: cap, converged: false, hitCap: true }
}

// Simulates one scenario under both policies. Returns step counts only —
// cost is computed by the caller via pricing.mjs so the price constant stays
// in one place.
export function simulateScenario(scenario, { capMultiplier = DEFAULT_CAP_MULTIPLIER } = {}) {
  const cap = scenario.optimal_steps * capMultiplier
  const uncapped = simulateUncapped(scenario)
  const capped = simulateCapped(scenario, cap)
  return { id: scenario.id, name: scenario.name, trap: scenario.trap, optimal_steps: scenario.optimal_steps, cap, uncapped, capped }
}
