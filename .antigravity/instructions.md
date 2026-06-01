# Antigravity-Native ACOS Operating Instructions

This document defines the federation and coordination standards for the **Antigravity (Gemini)** AI agent operating in the `FrankX` and `agentic-creator-os` workspaces. Follow these instructions to dynamically load, define, and run any of ACOS's 99+ specialized agents.

---

## 1. Dynamic Agent Discovery & Registration

You have a registry scanner and cache at:
- Parser Script: [acos-agy-registry.mjs](file:///c:/Users/frank/starlight/repos/FrankX/scripts/lib/acos-agy-registry.mjs)
- Registry Cache: [agents-registry.json](file:///c:/Users/frank/starlight/repos/FrankX/.antigravity/agents-registry.json)

### The Registration Protocol

When a task requires a specialized ACOS agent (see triggering mapping below):
1. **Fetch Agent Specs:** Run the parser to retrieve the dynamic JSON configuration:
   ```bash
   node scripts/lib/acos-agy-registry.mjs <agent-name>
   ```
   Or read it directly from the cache at `.antigravity/agents-registry.json`.
2. **Define Subagent:** Invoke the `define_subagent` tool with the parsed values:
   - `name`: Parsed `name`
   - `description`: Parsed `description`
   - `system_prompt`: Parsed `system_prompt` (pre-compiled with voice guidelines)
   - `enable_write_tools`: Parsed `enable_write_tools`
   - `enable_mcp_tools`: Parsed `enable_mcp_tools`
   - `enable_subagent_tools`: Parsed `enable_subagent_tools`
3. **Execute Task:** Invoke the subagent using `invoke_subagent` with the exact payload and file paths.

---

## 2. Intent → Agent Trigger Mapping

Use the following lookup table to resolve which specialist agent to define and invoke:

| Task Domain | Keyword / Trigger | Dispatched ACOS Agent |
|---|---|---|
| **Quality & Gate** | "publish", "deploy", "is this on-brand", "integrity check", "audit" | `integrity-guard` |
| **SEO & Citations** | "seo", "rankings", "keywords", "structured data" | `seo-specialist` |
| **Research Hub** | "research", "arxiv", "fetch sources", "literature search" | `research-orchestrator` |
| **Banned Research** | "autoresearch brief", " Karpathy digit" | `autoresearcher` |
| **Music Production** | "suno", "music", "lyrics", "master track" | `music-producer` |
| **Visual / Design** | "generate image", "infographic", "visual system", "cover" | `visual-creation-council` |
| **UI Components** | "landing page ui", "React component", "responsive style" | `visual-v0-generate` |
| **Workshop OS** | "prep workshop", "debrief", "amplify attendee" | `workshop-orchestrator` |
| **Prompt Engineering** | "optimize prompt", "evaluate prompt", "psychometrics" | `prompt-conductor` |

---

## 3. Multi-Agent Swarm Orchestration

For complex, multi-step creative or engineering pipelines, do not try to do all the work yourself. Instead, coordinate a parallel or sequential swarm of dynamic subagents:

### The Landing Page Swarm
```
   [Main Coordinator: Gemini]
               │
               ├─► Define & Invoke [visual-frontend-designer] (UI design spec)
               │                                │
               ├─► Define & Invoke [visual-v0-generate] (Writes React code)
               │                                │
               ├─► Define & Invoke [seo-specialist] (Audit metadata & schema)
               │                                │
               └─► Define & Invoke [integrity-guard] (Assert brand voice)
```

### The Content Release Swarm
```
   [Main Coordinator: Gemini]
               │
               ├─► Define & Invoke [research-newsletter] (Synthesizes raw news)
               │                                │
               ├─► Define & Invoke [content-hook-engineer] (Generates hooks)
               │                                │
               └─► Define & Invoke [integrity-guard] (Validates voice & claims)
```

### Handoff Protocol

When passing state between subagents in a swarm, follow `AGENT_PROTOCOL.md` strictly:
1. Provide a markdown summary of what was completed by the previous agent.
2. Specify the exact file paths on disk.
3. Pass clear, actionable outcomes for the next subagent in the sequence.
4. Update `task.md` at each stage to ensure the overall pipeline remains highly visible to the user.

---

*Federalized, permissionless, and blazingly fast. Let the swarm build.*
