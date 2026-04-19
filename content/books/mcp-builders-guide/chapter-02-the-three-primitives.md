# The Three Primitives

> "Simplicity is the ultimate sophistication."
> — Leonardo da Vinci

---

MCP has three primitives. Not thirty. Not thirteen. Three.

Every MCP server, from the simplest file reader to the most complex cloud orchestration layer, is built from three building blocks: Resources, Tools, and Prompts. Understanding these three primitives is understanding MCP. Everything else is implementation detail.

---

## I. Resources: What the Server Knows

A Resource is data that the server exposes to the AI client. Read-only. Declarative. The AI can see it but cannot change it through the Resource interface.

Think of Resources as windows into your system. The AI looks through the window, sees the data, and uses what it sees to inform its responses.

Examples of Resources:
- A database server exposes table schemas and query results as Resources
- A file system server exposes directory listings and file contents
- A GitHub server exposes repository structure, branch lists, and file trees
- A project management server exposes issue lists, sprint boards, and team assignments

Resources are **pulled by the client**, not pushed by the server. The AI client discovers what Resources are available and requests the ones it needs. This pull model means the AI only loads context that is relevant to the current task — an efficiency pattern that matters when context windows have token limits.

```typescript
// Minimal Resource implementation
server.setResourceHandler(async (uri) => {
  if (uri === 'config://app-settings') {
    return {
      contents: [{
        uri: 'config://app-settings',
        mimeType: 'application/json',
        text: JSON.stringify(await loadSettings())
      }]
    }
  }
})
```

That is a complete Resource. Ten lines. The server exposes application settings as a readable JSON document. Any MCP client that connects to this server can now ask the AI: "What are the current application settings?" The AI reads the Resource and answers accurately — not from training data, but from live system data.

---

## II. Tools: What the Server Can Do

A Tool is an action that the server can perform. Unlike Resources (read-only), Tools change state. They create, update, delete, deploy, send, query, and transform.

Think of Tools as the hands of the AI. Resources are the eyes — the AI sees. Tools are the hands — the AI acts.

Examples of Tools:
- A deployment server has a `deploy` Tool that pushes code to production
- A database server has a `query` Tool that executes SQL statements
- An email server has a `send_email` Tool that dispatches messages
- An image generation server has a `generate` Tool that creates visuals

Tools have **input schemas** — JSON Schema definitions that describe what parameters the Tool accepts. This is critical: the schema tells the AI exactly what inputs are required, what types they should be, and what values are valid. The AI reads the schema and generates the correct input without the user needing to specify the format.

```typescript
// Minimal Tool implementation
server.setToolHandler(async (name, args) => {
  if (name === 'create-issue') {
    const result = await github.createIssue({
      title: args.title,
      body: args.body,
      labels: args.labels || []
    })
    return { content: [{ type: 'text', text: `Issue #${result.number} created` }] }
  }
})
```

Twelve lines. The server can now create GitHub issues. When a user says "create an issue about the login bug," the AI reads the Tool's schema, generates the appropriate `title` and `body`, calls the Tool, and reports the result.

The separation between Resources (read) and Tools (write) is a deliberate safety pattern. Resources cannot cause harm — they only expose information. Tools can cause harm — they change state. This separation allows fine-grained permission control: you can give an AI access to Resources without giving it access to Tools, or restrict which Tools are available in which contexts.

---

## III. Prompts: What the Server Suggests

Prompts are pre-built instruction templates that the server provides to the AI client. They encode common workflows, best practices, and domain-specific patterns.

Think of Prompts as recipes. Resources are ingredients (data). Tools are kitchen equipment (capabilities). Prompts are recipes that combine ingredients and equipment into specific outcomes.

Examples of Prompts:
- A database server provides a Prompt template: "Generate a SQL query for {table} that finds {criteria}"
- A code review server provides: "Review this code for {language} best practices, focusing on {area}"
- A content server provides: "Write a blog post about {topic} following the {style} voice guide"

```typescript
// Minimal Prompt implementation
server.setPromptHandler(async (name) => {
  if (name === 'analyze-data') {
    return {
      messages: [{
        role: 'user',
        content: {
          type: 'text',
          text: 'Analyze the following dataset. Focus on trends, outliers, and actionable insights. Present findings as a structured report with sections for Summary, Key Findings, and Recommendations.'
        }
      }]
    }
  }
})
```

Prompts are the least-used primitive, but potentially the most powerful for teams. A well-designed Prompt library ensures that every team member gets consistent, high-quality AI interactions — regardless of their individual prompting skill. The Prompt encodes the organization's expertise into reusable templates.

---

## IV. How the Three Primitives Work Together

A real-world example: a project management MCP server for Linear.

**Resources:**
- `issues://active` — list of active issues with status, assignee, priority
- `projects://current` — current projects with milestones and deadlines
- `team://members` — team members with roles and availability

**Tools:**
- `create_issue` — creates a new issue with title, description, labels, assignee
- `update_status` — changes an issue's status (todo → in_progress → done)
- `add_comment` — adds a comment to an existing issue

**Prompts:**
- `sprint-planning` — "Review active issues, suggest prioritization based on deadlines and dependencies"
- `standup-summary` — "Summarize yesterday's progress, today's plan, and blockers for each team member"

With these three primitives configured, a user can say:

"What issues are blocking the release?" → AI reads Resources, finds blocked issues
"Create a bug report for the login timeout" → AI uses the create_issue Tool
"Run the standup summary" → AI uses the Prompt template with current Resource data

Three primitives. Infinite applications. The simplicity is the point.

---

## V. The Design Principle

The three-primitive architecture is not an accident. It is a deliberate design choice that mirrors the most successful standards in computing:

- **HTTP** has methods: GET (read), POST (create), PUT (update), DELETE (remove)
- **SQL** has operations: SELECT (read), INSERT (create), UPDATE (modify), DELETE (remove)
- **MCP** has primitives: Resources (read), Tools (act), Prompts (guide)

Each of these standards succeeded because they reduced infinite complexity to a small number of composable operations. The power does not come from the individual operations — it comes from their composition. A single HTTP GET is trivial. Millions of HTTP GETs composed into the World Wide Web changed civilization.

MCP's three primitives will follow the same trajectory. Each individual Resource, Tool, or Prompt is simple. Thousands of them, composed across hundreds of servers, connected to every AI client — that composition is what transforms AI from a conversation into an operating system for everything.

Build with the primitives. The composition will emerge.
