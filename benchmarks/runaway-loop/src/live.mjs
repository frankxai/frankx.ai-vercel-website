// Optional live leg: runs a real, tiny agent loop against a real model to
// confirm the offline simulation's mechanism holds outside the simulator.
// BYOK: the key comes from the environment and is never persisted or logged.
//
// This is NOT the primary number. It exists to sanity-check the offline
// result against one real model call sequence, on one scenario, with a real
// stop condition. It is not a claim about how often production agents
// actually run away — see the README's scope section.

const ENDPOINT = 'https://api.openai.com/v1/chat/completions'

// A single scenario, deliberately built so a naive "keep calling the tool
// until you're confident" agent will loop: the tool always returns a result
// the model is told to treat as untrustworthy, so nothing in the transcript
// satisfies a naive stopping condition. A capped run stops anyway because
// the harness enforces the cap, not because the model decided to stop.
const LIVE_SCENARIO = {
  system:
    'You are debugging a failing test. You have one tool, `check_test`, which reports test status. ' +
    'The tool result will always say the test still fails and suggest trying again with a small tweak. ' +
    'Call the tool, then decide whether to call it again or explain your fix. Do not fabricate success.',
  tool: {
    type: 'function',
    function: {
      name: 'check_test',
      description: 'Runs the test suite and returns pass/fail status.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  // Always the same canned tool result — this is what makes the loop
  // non-convergent under a naive policy. A real integration would call a
  // real test runner; this benchmark's live leg isolates the loop mechanism.
  toolResult: JSON.stringify({ status: 'fail', hint: 'try adjusting the tolerance slightly and re-check' }),
}

async function chatStep(apiKey, model, messages, tools) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model, messages, tools, tool_choice: 'auto' }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Chat API error ${res.status}: ${body.slice(0, 300)}`)
  }
  const json = await res.json()
  return { message: json.choices[0].message, usage: json.usage }
}

// Runs the live scenario for at most `cap` tool-call steps. Returns the
// actual step count and token usage so the caller can compute a real cost
// next to the simulated one.
export async function runLive(apiKey, { cap = 6, model = 'gpt-4o-mini' } = {}) {
  const messages = [
    { role: 'system', content: LIVE_SCENARIO.system },
    { role: 'user', content: 'The test is failing. Please debug it.' },
  ]
  let steps = 0
  let totalTokens = 0
  let stoppedBy = 'model'

  for (let i = 0; i < cap; i++) {
    const { message, usage } = await chatStep(apiKey, model, messages, [LIVE_SCENARIO.tool])
    totalTokens += usage?.total_tokens || 0
    messages.push(message)

    const call = message.tool_calls?.[0]
    if (!call) {
      // Model stopped calling the tool on its own — converged before the cap.
      break
    }
    steps++
    messages.push({
      role: 'tool',
      tool_call_id: call.id,
      content: LIVE_SCENARIO.toolResult,
    })
    if (i === cap - 1) stoppedBy = 'cap'
  }

  return { steps, totalTokens, stoppedBy, cap }
}
