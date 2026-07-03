# OpenAI Agent Stack Cheat Sheet 2026

Updated: July 3, 2026

## Short Version

Use Codex for code.
Use Agents SDK for product agents.
Use Apps SDK for apps inside ChatGPT.
Use Workspace Agents for repeatable team workflows.
Use ChatGPT agent mode for operator tasks.
Use Agent Builder migration docs for existing flows, not new production systems.

## Surface Picker

| Question | If yes, start with |
| --- | --- |
| Does the task change a repository? | Codex |
| Does your app need to own orchestration, tools, state, approvals, or storage? | Agents SDK |
| Should users interact with UI inside ChatGPT? | Apps SDK |
| Is this a repeatable workflow for a ChatGPT workspace? | Workspace Agents |
| Is this a one-off or recurring operator task across files, browser, and connectors? | ChatGPT agent mode |
| Is this already in Agent Builder? | Migration guide |

## Prompt Contract

Use this shape before you build:

Goal:
Context:
Inputs:
Allowed tools:
Forbidden tools:
Approval points:
Output format:
Success criteria:
Failure criteria:
Reviewer:

## Context Rules

Good context is:

- Specific
- Current
- Source-linked
- Small enough to inspect
- Written for the decision the agent must make

Bad context is:

- A whole knowledge base pasted blindly
- Old docs mixed with current docs
- Brand guidelines without examples
- Tool credentials without permissions
- Vague instructions like "be smart"

## Five Tests

Run these before you trust the workflow:

1. Normal request
2. Missing input
3. Conflicting instructions
4. Unauthorized action
5. Stale or suspicious source

## OpenAI DevDay Watch Order

1. Developer State Of The Union
   https://www.youtube.com/watch?v=r1R3RDPvPeg

2. Shipping with Codex
   https://www.youtube.com/watch?v=Gr41tYOzE20

3. Orchestrating Agents at Scale
   https://www.youtube.com/watch?v=KplSDxYv9xU

4. Model Behavior
   https://www.youtube.com/watch?v=ER9Hqly28Qw

5. Opening Keynote
   https://www.youtube.com/watch?v=hS1YqcewH0c

## Legacy Warning

Agent Builder and hosted Evals are winding down. New production work should move toward Agents SDK, Workspace Agents, Codex, Apps SDK, and current OpenAI docs.

Migration guide:
https://developers.openai.com/api/docs/guides/agent-builder/migrate-from-agent-builder

## FrankX Links

- Learning path: https://frankx.ai/learn/openai-devday-agent-stack
- Workbook: https://frankx.ai/resources/openai-agent-builder-workbook
- Codex path: https://frankx.ai/learn/codex-mastery
- ChatGPT path: https://frankx.ai/learn/chatgpt-mastery
- GenCreator: https://frankx.ai/gencreator
