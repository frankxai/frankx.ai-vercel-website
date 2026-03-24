# The Builder's Toolkit

> "Give me six hours to chop down a tree and I will spend the first four sharpening the axe."
> — Abraham Lincoln

---

## I. The Essential Stack

Nine chapters of architecture and theory. This chapter is the practical reference — the specific tools, frameworks, and resources that an agentic builder needs in 2026.

This is not a comprehensive catalog. It is a curated selection of the tools that have proven themselves in production. Each recommendation comes from direct experience — I have used these tools, encountered their limitations, and chosen them despite (and sometimes because of) those limitations.

---

## II. Language Models

| Model | Provider | Best For | Cost (per 1M tokens) |
|-------|----------|----------|---------------------|
| Claude Opus 4 | Anthropic | Complex reasoning, code generation, long context | $15 input / $75 output |
| Claude Sonnet 4 | Anthropic | Fast reasoning, most tasks, cost-efficient | $3 input / $15 output |
| Claude Haiku 4.5 | Anthropic | Classification, routing, simple tasks | $0.25 input / $1.25 output |
| GPT-4o | OpenAI | Multimodal, vision, function calling | $2.50 input / $10 output |
| Gemini 2.5 Flash | Google | Fast inference, grounding, long context | $0.15 input / $0.60 output |
| Llama 3.3 70B | Meta (open) | Self-hosted, privacy-sensitive tasks | Free (compute cost only) |

**The model selection framework:**

Use the cheapest model that handles the task correctly. Do not default to the most expensive model. Classification tasks: Haiku. Standard reasoning: Sonnet. Complex architecture decisions: Opus. Image understanding: GPT-4o or Gemini.

Route by complexity, not by habit.

---

## III. Agent Frameworks

| Framework | Language | Pattern | Best For |
|-----------|----------|---------|----------|
| Claude Agent SDK | TS/Python | Tool use + computer use | Production Claude agents |
| LangGraph | Python | Graph-based workflows | Complex multi-step agents |
| CrewAI | Python | Role-based multi-agent | Team-simulation patterns |
| AutoGen | Python | Conversational multi-agent | Research and experimentation |
| Mastra | TypeScript | Agent + workflow | TypeScript-first teams |
| Vercel AI SDK | TypeScript | Streaming + tool use | Next.js integrated agents |

**The framework selection framework:**

If you are building with Claude: use the Claude Agent SDK. It provides native tool use, computer use, and the tightest integration with Claude's capabilities.

If you need complex multi-step workflows with conditional branching: use LangGraph. The graph abstraction maps naturally to workflow design.

If you are building in Next.js: use the Vercel AI SDK. It provides streaming, tool use, and seamless integration with the React server component model.

Do not use more than one framework per project unless you have a specific reason. Framework proliferation creates maintenance burden without proportional capability gain.

---

## IV. MCP Servers (Top 20)

The MCP ecosystem has 1,400+ servers. These 20 are the most useful for an agentic builder:

**Development:**
1. `@modelcontextprotocol/server-github` — Repository management, issues, PRs
2. `vercel-mcp-server` — Deployments, build logs, project management
3. `@anthropic/mcp-memory-server` — Persistent knowledge graph
4. `@playwright/mcp` — Browser automation, testing, screenshots

**Data:**
5. `@modelcontextprotocol/server-postgres` — PostgreSQL database operations
6. `@modelcontextprotocol/server-sqlite` — SQLite for local databases
7. `@supabase/mcp-server` — Supabase database + auth management

**Content:**
8. `@nanobanana/mcp` — Image generation (Gemini 3 Pro Image)
9. `@resend/mcp` — Email operations
10. `@firecrawl/mcp-server` — Web scraping, content extraction

**Communication:**
11. `@slack/mcp-server` — Slack messaging and channel management
12. `@notion/mcp-server` — Notion pages, databases, comments
13. `@linear/mcp-server` — Issue tracking, project management

**Automation:**
14. `n8n-mcp` — Workflow management, execution monitoring
15. `@modelcontextprotocol/server-sequential-thinking` — Structured reasoning

**Design:**
16. `@figma/mcp-server` — Design context, component mapping
17. `@canva/mcp-server` — Design generation, brand kit access
18. `@v0/mcp-server` — UI component generation

**Search & Research:**
19. `@tavily/mcp-server` — Web search, content extraction
20. `@exa/mcp-server` — Semantic search, similar content discovery

Install these with `npx` — most require only an API key and a single configuration entry.

---

## V. Development Tools

**IDE:** Claude Code (CLI) or Cursor (GUI). Both provide AI-powered development. Claude Code is terminal-first and integrates with MCP. Cursor is editor-first and integrates with VS Code. Choose based on your workflow preference — terminal people choose Claude Code, visual people choose Cursor.

**Version Control:** Git + GitHub. Non-negotiable. Every project, every agent, every configuration is version-controlled. The git history is your audit trail, your rollback mechanism, and your collaboration platform.

**TypeScript:** The language of choice for agentic development. Type safety prevents the class of bugs that are hardest to debug in agent systems — malformed tool inputs, incorrect response parsing, and schema mismatches. If you are building agents, learn TypeScript.

**Testing:** Vitest for unit tests. Playwright for browser automation tests. Custom evaluation scripts for agent behavior tests. Testing is not optional — untested agents are liabilities.

**Deployment:** Vercel for web applications and serverless functions. Railway for long-running processes (n8n, databases, custom servers). Cloudflare Workers for edge logic. The trio covers every deployment pattern an agentic builder needs.

---

## VI. Learning Resources

**Documentation:**
- Anthropic's Claude documentation: the most comprehensive AI API documentation available
- MCP specification: the protocol reference
- LangGraph documentation: graph-based agent patterns

**Books:**
- This one (you are reading it)
- "AI Engineering" by Chip Huyen — production ML systems
- "Designing Data-Intensive Applications" by Martin Kleppmann — distributed systems fundamentals
- "The Personal AI CoE" by Frank Riemer — enterprise AI frameworks for individuals

**Communities:**
- MCP Discord: the protocol community
- Claude Code Discord: practitioner community
- Hacker News: general AI engineering discussion
- X/Twitter: real-time AI development discourse

**Practice:**
- Build one agent per month. Not for production — for learning. Each agent teaches different lessons: tool use, memory, orchestration, evaluation. After 12 agents, you will have encountered every common pattern and most common failure modes.

---

## VII. The Toolkit Philosophy

Tools are means, not ends. The builder who masters three tools produces better output than the builder who collects thirty.

Select your tools once. Master them over months. Replace them only when a tool demonstrably fails to serve your needs — not when a shinier alternative appears.

The toolkit is complete. The architecture is described. The practices are documented. The future is sketched.

What remains is the building.

Build.
