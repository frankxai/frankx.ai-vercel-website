# Evaluation and Trust

> "Measurement is the first step that leads to control and eventually to improvement."
> — H. James Harrington

---

## I. The Trust Gap

You have built an agent. It reasons. It uses tools. It remembers. It coordinates with other agents.

How do you know it works?

Not "does it produce output" — any agent produces output. "Does it produce correct, reliable, trustworthy output?" This is the evaluation question, and it is the question that separates demo agents from production agents.

The trust gap is the distance between "the agent produced a response" and "I trust the agent's response enough to act on it." Closing this gap requires evaluation — systematic, repeatable measurement of agent behavior across a range of inputs and conditions.

---

## II. The Evaluation Framework

Agent evaluation has three dimensions:

**Correctness.** Is the agent's output factually accurate? When the agent says "the Vercel build succeeded," did the build actually succeed? When the agent says "this code has no bugs," does the code actually have no bugs? Correctness is binary at the atomic level — each claim is either right or wrong — but probabilistic at the system level, where the relevant metric is the error rate over many interactions.

**Reliability.** Does the agent produce consistent results for the same input? If you ask the agent to deploy an application ten times, does it succeed ten times? Or does it succeed seven times, fail twice due to timeout handling, and produce an error once due to an edge case in the deployment script? Reliability measures the agent's consistency — its ability to produce the same quality of output under the same conditions.

**Alignment.** Does the agent do what you intended? Correctness measures whether the output is factually right. Alignment measures whether the output serves the user's actual goal. An agent that correctly summarizes the wrong document is correct but misaligned. An agent that deploys the right code to the wrong environment is correct but misaligned. Alignment is the hardest dimension to evaluate because it requires understanding intent, not just output.

---

## III. Evaluation Methods

**Automated testing.** Write test cases for your agent the way you write test cases for software. Define inputs, expected outputs, and pass/fail criteria. Run the tests on every agent update.

```typescript
// Agent evaluation test
const testCases = [
  {
    input: "What is the current deployment status?",
    expectedBehavior: "calls get_deployment tool",
    expectedOutputContains: ["status", "production"],
  },
  {
    input: "Deploy the latest changes",
    expectedBehavior: "calls deploy tool with confirmation",
    mustNotDo: "deploy without asking for confirmation",
  },
  {
    input: "Delete all user data",
    expectedBehavior: "refuses the request",
    expectedOutputContains: ["cannot", "destructive"],
  },
]
```

These tests catch regressions — cases where the agent's behavior changes unintentionally after an update. They do not catch novel failures, which require the next method.

**Adversarial testing.** Deliberately attempt to break the agent. Send malformed inputs. Ask contradictory questions. Request actions the agent should refuse. Attempt prompt injection. Provide misleading context. The adversarial tester's goal is to find the boundary between "the agent handles this correctly" and "the agent fails" — and to push that boundary outward with each iteration.

**Shadow evaluation.** Run the agent alongside a human performing the same task. Compare the agent's output to the human's output. Where they diverge, investigate why. Shadow evaluation reveals alignment failures that automated tests miss — because the human's output represents the intended behavior.

**Production monitoring.** Once deployed, monitor the agent's behavior in production. Log every tool call, every response, every user interaction. Review a random sample weekly. This is the only evaluation method that catches real-world failure modes — the edge cases, environmental variations, and user behaviors that test suites cannot anticipate.

---

## IV. The Quality Gate Pattern for Agents

Adapt the quality gate pattern from software deployment:

**Gate 1: Unit tests pass.** Every handler function, every tool implementation, every response formatter has unit tests. All must pass before the agent is deployed.

**Gate 2: Integration tests pass.** The agent correctly interacts with all external services. Database queries return expected results. API calls succeed. Deployment triggers actually deploy.

**Gate 3: Adversarial tests pass.** The agent correctly handles the known adversarial cases. Prompt injection is blocked. Destructive operations require confirmation. Malformed inputs produce graceful errors.

**Gate 4: Shadow evaluation.** The agent's output matches human output within acceptable tolerance on a sample of representative tasks.

**Gate 5: Canary deployment.** Deploy the agent to a subset of users or use cases. Monitor for one week. If no issues emerge, expand to full deployment.

Five gates. Each gate catches a different category of failure. Skipping any gate increases the probability of production failure — and production failure erodes the trust that the agent's value depends on.

---

## V. The Human-in-the-Loop Pattern

For high-stakes agents — agents that handle financial transactions, send communications, or modify production infrastructure — the evaluation framework includes a human in the loop.

Three patterns:

**Approval before action.** The agent plans the action, presents it to the human for approval, and executes only after receiving confirmation. This is the safest pattern and the most intrusive — the human must be present and attentive for every high-stakes operation.

**Notification after action.** The agent executes the action and immediately notifies the human. The human can review and reverse if necessary. This pattern is less intrusive but requires a reliable reversal mechanism — you must be able to undo the agent's action if it was wrong.

**Audit after the fact.** The agent executes autonomously, with all actions logged. A human reviews the log periodically (daily or weekly). This pattern is the least intrusive and is appropriate for agents with established trust — agents that have been evaluated, monitored, and verified over extended periods.

The progression is a trust gradient: new agents start with approval-before-action and graduate to audit-after-the-fact as they demonstrate reliability. No agent starts at the end of the gradient. Trust is earned through demonstrated competence, not declared by architecture.

---

## VI. Metrics That Matter

**Success rate.** Percentage of interactions where the agent achieved the user's goal. Target: 95%+ for production agents. Below 90% indicates a fundamental issue with the agent's reasoning or tool configuration.

**Error rate by type.** Not just total errors — errors categorized by type: tool failure, reasoning failure, alignment failure, hallucination, refusal when action was appropriate. Each error type has a different root cause and a different fix.

**Latency distribution.** Not average latency — the distribution. An agent with average 2-second latency but a P99 of 30 seconds has a very different user experience than one with average 2-second latency and P99 of 3 seconds. The tail matters more than the average.

**Cost per interaction.** Total cost (API tokens + tool calls + compute) per user interaction. This metric determines whether the agent is economically viable at scale. An agent that costs $0.50 per interaction to run is fine for 100 daily users and catastrophic for 100,000.

**Trust score (subjective).** How much do the humans who use this agent trust it? Survey them. Ask: "If this agent told you to deploy to production, would you do it without checking?" The trust score is the ultimate evaluation metric — it measures whether the entire evaluation pipeline is producing an agent that humans actually rely on.

---

## VII. Building Trust Over Time

Trust is not a feature you ship. It is a relationship you build.

The evaluation framework is the mechanism for building trust — systematically, measurably, over time. Each test that passes, each monitoring review that confirms reliability, each adversarial challenge that the agent handles correctly deposits into the trust account.

The trust account compounds. An agent that has been reliable for twelve months is trusted more than an agent that has been reliable for twelve days. This compound trust is the most valuable output of the evaluation framework — more valuable than any single metric, more valuable than any specific test result.

Build the evaluation framework. Run it continuously. Let the trust compound.

The agent that earns trust becomes the agent that people rely on.

And reliable agents are the only agents worth building.
