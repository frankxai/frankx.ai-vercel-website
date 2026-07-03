# OpenAI Agent Builder Workbook 2026

Updated: July 3, 2026
Publisher: FrankX.AI

## What This Is

This workbook turns the official OpenAI DevDay sessions into a practical build plan for creators, operators, founders, and AI architects.

Important current note: OpenAI has announced that Agent Builder and hosted Evals are winding down and will be unavailable after November 30, 2026. Use this workbook to migrate existing Agent Builder thinking into forward-looking surfaces: Codex, Agents SDK, Apps SDK, Workspace Agents, and ChatGPT agent mode.

## Official Starting Points

- DevDay: https://openai.com/devday/
- Codex docs: https://developers.openai.com/codex
- Agents SDK guide: https://developers.openai.com/api/docs/guides/agents
- Apps SDK docs: https://developers.openai.com/apps-sdk
- Workspace Agents docs: https://developers.openai.com/workspace-agents
- Agent Builder migration: https://developers.openai.com/api/docs/guides/agent-builder/migrate-from-agent-builder

## Session Map

1. Opening Keynote
   - YouTube: https://www.youtube.com/watch?v=hS1YqcewH0c
   - Use it for: platform direction and mental model.

2. Developer State Of The Union
   - YouTube: https://www.youtube.com/watch?v=r1R3RDPvPeg
   - Use it for: API, Codex, and developer roadmap.

3. Shipping with Codex
   - YouTube: https://www.youtube.com/watch?v=Gr41tYOzE20
   - Use it for: software agent workflow design.

4. Context Engineering and Coding Agents with Cursor
   - YouTube: https://www.youtube.com/watch?v=3KAI__5dUn0
   - Use it for: context discipline and agent harnesses.

5. Orchestrating Agents at Scale
   - YouTube: https://www.youtube.com/watch?v=KplSDxYv9xU
   - Use it for: production agent patterns.

6. Model Behavior
   - YouTube: https://www.youtube.com/watch?v=ER9Hqly28Qw
   - Use it for: tone, style, UX, and user-facing agent behavior.

## The Decision Matrix

| Workflow shape | Best first surface | Why |
| --- | --- | --- |
| Repo task, code change, review loop | Codex | It is built for engineering work and verification loops. |
| Product agent with custom tools and state | Agents SDK | Your app owns orchestration and approvals. |
| Interactive app inside ChatGPT | Apps SDK | The app belongs in the ChatGPT conversation. |
| Repeatable team process in ChatGPT | Workspace Agents | Teams can publish and trigger shared workflows. |
| Personal operator task | ChatGPT agent mode | Browser, files, connectors, and reasoning live together. |
| Existing Agent Builder flow | Migration path | Export and rebuild in Agents SDK or Workspace Agents. |

## Exercise 1: Pick One Workflow

Write one recurring workflow you want to improve.

- Name:
- Who uses it:
- Current process:
- Trigger:
- Inputs:
- Output:
- How often it runs:
- What goes wrong today:
- Why it matters:

Score it from 1 to 5:

- Recurs weekly:
- Has clear inputs:
- Has measurable output:
- Safe to test in small scope:
- Saves or creates meaningful value:

Proceed only if the total score is 18 or higher.

## Exercise 2: Write The Agent Contract

Agent name:

Purpose:

The agent should:

The agent must not:

Required inputs:

Optional inputs:

Tools allowed:

Tools forbidden:

Human approval required before:

Done means:

Failure means:

## Exercise 3: Context Pack

Add only the context the workflow needs.

- Goal statement:
- Target user:
- Brand or voice rules:
- Relevant examples:
- Source links:
- Existing docs:
- Constraints:
- Output format:
- Review checklist:

Remove anything that does not change the agent's decision.

## Exercise 4: Build Surface Choice

Choose one:

- Codex
- Agents SDK
- Apps SDK
- Workspace Agents
- ChatGPT agent mode
- Migration from Agent Builder

Why this surface:

Why not the other surfaces:

What you will prototype first:

What you will not build yet:

## Exercise 5: Evaluation Loop

Define five tests before the demo.

1. Happy path:
2. Missing input:
3. Ambiguous request:
4. Unsafe or unauthorized action:
5. Bad source or stale context:

For each test, record:

- Expected behavior:
- Actual behavior:
- Fix needed:
- Reviewer:

## Exercise 6: One Week Sprint

Day 1: Watch the core DevDay sessions and fill Exercise 1.

Day 2: Write the agent contract and context pack.

Day 3: Build the smallest possible version.

Day 4: Run the five tests.

Day 5: Add approval points and logging.

Day 6: Demo to one trusted person.

Day 7: Decide: ship, revise, or archive.

## GenCreator Bridge

Bring one artifact into the upcoming GenCreator community:

- A workflow contract
- A demo recording
- A before/after result
- A failure mode others can learn from
- A reusable prompt or context template

Community path: https://frankx.ai/gencreator

## Final Checklist

- I watched at least two official OpenAI sessions.
- I chose one workflow.
- I picked one surface.
- I wrote the agent contract.
- I defined tools and permissions.
- I added human approvals.
- I ran five tests.
- I captured failure modes.
- I know the next iteration.
