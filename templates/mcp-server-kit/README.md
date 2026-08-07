# MCP Server Kit

A TypeScript [Model Context Protocol](https://modelcontextprotocol.io) server starter. **Pattern: a single capability module served over two transports** — run it on stdio for local editor clients (Claude Code, Cursor) or over streamable HTTP for remote/networked clients. Ships with two example tools and one resource.

> This is a standalone Node server, not a Next.js app, so there's no Deploy-to-Vercel button. Run it locally or host it anywhere Node runs.

## What's inside

- **Two tools** (`src/tools.ts`) — `sum` (pure computation) and `get_weather` (an I/O-shaped tool stubbed with canned data, ready to swap for a real API call).
- **One resource** — `info://server`, a readable JSON document describing the server.
- **Two transports** (`src/index.ts`) — stdio (default) and streamable HTTP (`--http`), with per-session management for HTTP.

## Quickstart

1. **Install**

   ```bash
   npm install
   ```

2. **Run on stdio** (for local clients)

   ```bash
   npm run dev          # tsx, no build step
   # or
   npm run build && npm start
   ```

3. **Run over HTTP** (for remote clients)

   ```bash
   npm run dev:http     # serves http://localhost:3000/mcp
   ```

   Configure the port via `PORT` (see `.env.example`).

## Add it to a client

### Claude Code

```bash
# stdio (local) — point it at the built entry or use tsx for dev
claude mcp add server-kit -- node /absolute/path/to/dist/index.js

# streamable HTTP (after `npm run dev:http`)
claude mcp add --transport http server-kit http://localhost:3000/mcp
```

### Cursor

Add to `~/.cursor/mcp.json` (or the project's `.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "server-kit": {
      "command": "node",
      "args": ["/absolute/path/to/dist/index.js"]
    }
  }
}
```

For the HTTP transport, use `{ "url": "http://localhost:3000/mcp" }` instead of `command`/`args`.

## Make it real

- Replace the `get_weather` body with a real `fetch`, reading the API key from `process.env`.
- Add tools with `server.registerTool(...)` and resources with `server.registerResource(...)` — both are in `src/tools.ts`.
- For HTTP in production, put the server behind auth and TLS, and validate the `Origin` header.

## Recommended tools

These are plain links today and will later be swapped for affiliate links:

- [Vercel](https://vercel.com) — host the HTTP transport on serverless or a Node runtime
- [Supabase](https://supabase.com) — back a tool with Postgres
- [Pinecone](https://pinecone.io) — expose vector search as an MCP tool
- [Langfuse](https://langfuse.com) — trace tool calls and usage

## Scope (be honest)

This is a **starting point, not a turnkey production system.** It demonstrates the MCP server shape with both transports. For production add: authentication and authorization on the HTTP transport, input validation beyond the schema (rate limits, size caps), structured error handling, logging/observability, and tests for each tool. Build up from here.

---

Built by Frank Riemer · [frankx.ai/ai-architecture](https://frankx.ai/ai-architecture)
