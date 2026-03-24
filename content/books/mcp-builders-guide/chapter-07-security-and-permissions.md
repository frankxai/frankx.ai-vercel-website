# Security and Permissions

> "The price of freedom is eternal vigilance."
> — Thomas Jefferson (attributed)

---

An MCP server that can read your database can also read your passwords. An MCP server that can deploy code can also deploy malware. An MCP server that can send emails can also send spam.

This is not a theoretical concern. It is the design reality of any system that gives AI access to tools with real-world consequences. Security in MCP is not an afterthought — it is the difference between a useful system and a dangerous one.

This chapter covers how to build MCP servers that are powerful enough to be useful and constrained enough to be safe.

---

## I. The Permission Model

MCP uses a client-side permission model. The AI client (Claude Code, Cursor) asks the user for permission before executing any Tool. The user sees: the tool name, the parameters, and a description of what will happen. They can approve, deny, or modify the request.

This is the first line of defense. The user is always in the loop.

But user-in-the-loop is not enough. Users get fatigued. They click "approve" without reading. They trust the system after enough successful operations. The second and third lines of defense must be in the server itself.

---

## II. Server-Side Safety Patterns

**Pattern 1: Read-only by default.**

Every Resource should be read-only. This is enforced by the protocol — Resources cannot write. But Tools can. The safety pattern: make your server Resource-heavy and Tool-light. Expose data through Resources (safe). Expose actions through Tools only when necessary (requires caution).

A database server should expose schemas and query results as Resources. It should only expose write operations (INSERT, UPDATE, DELETE) as Tools if the use case genuinely requires them. Most analytical use cases need only SELECT — and SELECT through a Resource, not a Tool, eliminates the risk of accidental data modification.

**Pattern 2: Input validation.**

Every Tool should validate its inputs before executing. Not just type-checking — semantic validation.

```javascript
server.tool('run-query', 'Execute a SQL query', { query: { type: 'string' } },
  async ({ query }) => {
    // Reject destructive queries
    const forbidden = ['DROP', 'DELETE', 'TRUNCATE', 'ALTER', 'INSERT', 'UPDATE']
    const upper = query.toUpperCase().trim()
    if (forbidden.some(f => upper.startsWith(f))) {
      return { content: [{ type: 'text', text: 'Error: Only SELECT queries are allowed.' }] }
    }
    // Execute the query
    const result = await db.query(query)
    return { content: [{ type: 'text', text: JSON.stringify(result.rows) }] }
  }
)
```

This pattern ensures that even if the AI generates a destructive query, the server rejects it. The AI cannot bypass the validation because the validation runs in the server, not in the AI.

**Pattern 3: Scoped access.**

An MCP server should access only what it needs. A deployment server should not have database credentials. A database server should not have deployment keys. Each server has its own scope, its own credentials, and its own access boundaries.

This is the principle of least privilege — the same principle that governs enterprise security, applied to MCP servers. A server with access to everything is a server that can break everything. A server with access to one thing can break only that one thing.

**Pattern 4: Audit logging.**

Every Tool invocation should be logged — who called it, what parameters were passed, what the result was, and when it happened. Not for surveillance. For debugging, accountability, and the ability to answer "what happened?" when something goes wrong.

```javascript
server.tool('deploy', 'Deploy to production', { branch: { type: 'string' } },
  async ({ branch }) => {
    console.log(`[AUDIT] deploy called: branch=${branch}, time=${new Date().toISOString()}`)
    // ... deployment logic
  }
)
```

---

## III. Authentication Patterns

MCP servers often need to authenticate with external services — APIs, databases, cloud providers. Three patterns:

**Environment variables.** Store secrets in environment variables, never in code. The server reads `process.env.DATABASE_URL` at startup. The secret never appears in the source code, the git history, or the MCP protocol messages.

**Token rotation.** Use short-lived tokens instead of permanent credentials. OAuth tokens that expire and refresh automatically are safer than API keys that live forever.

**Credential isolation.** Each MCP server has its own credentials. If the Vercel server is compromised, the database credentials are not exposed — they live in a different server with a different process and different environment variables.

---

## IV. The Safety Mindset

Security in MCP is not about building walls. It is about building appropriate constraints.

A server that can do nothing is safe but useless. A server that can do everything is useful but dangerous. The architect's job is to find the balance — the minimum set of capabilities that makes the server genuinely useful, with every unnecessary capability removed.

Before adding a Tool to your server, ask three questions:
1. What damage could this Tool cause if misused?
2. Can the same outcome be achieved through a safer mechanism (Resource instead of Tool)?
3. What validation prevents the worst-case scenario?

These questions are not bureaucratic overhead. They are the engineering discipline that makes MCP servers trustworthy — and trustworthiness is what makes the entire ecosystem viable.

Build servers that are powerful. Build them safe. The ecosystem depends on builders who take both seriously.
