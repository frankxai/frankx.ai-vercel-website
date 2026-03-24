# The Transport Layer

> "All problems in computer science can be solved by another level of indirection."
> — David Wheeler

---

MCP does not care how messages travel. The protocol defines what messages look like — their shape, their structure, their meaning. The transport layer decides how they move between client and server.

There are two transports. They solve different problems. Choosing the wrong one costs you time, security, or both.

---

## I. stdio: The Local Standard

stdio stands for standard input/output. Every process on every operating system has it. When you type in a terminal, you write to stdin. When a program prints output, it writes to stdout.

The MCP stdio transport is exactly what it sounds like: the server reads JSON-RPC messages from stdin, writes responses to stdout. The AI client manages the server as a child process. The server lives and dies with the client session.

This is the right transport for local servers. Servers that run on the same machine as the AI client. Servers that read the local filesystem, execute local commands, or access local databases.

Here is what stdio looks like in code:

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new McpServer({
  name: 'my-local-server',
  version: '1.0.0',
});

// ... register your tools and resources ...

const transport = new StdioServerTransport();
await server.connect(transport);
```

Four lines of transport code. That is all. The SDK handles the rest: message framing, request/response correlation, capability negotiation.

When Claude Code starts, it reads its configuration file and spawns each configured server as a child process. The server's stdout connects directly to Claude's stdin and vice versa. No network. No ports. No TLS configuration. The operating system provides the pipe.

The configuration that tells Claude Code to use your stdio server looks like this:

```json
{
  "mcpServers": {
    "my-local-server": {
      "command": "node",
      "args": ["/absolute/path/to/server.js"],
      "env": {
        "DATABASE_URL": "postgresql://localhost:5432/mydb"
      }
    }
  }
}
```

The `command` and `args` fields tell Claude Code how to spawn the process. Environment variables passed in `env` are available to the server at startup. This is how credentials reach local servers: not through the network, but through the process environment.

### When stdio breaks

stdio fails in one specific situation: when the server needs to outlive the client session. Each Claude Code session spawns fresh child processes. When the session ends, the processes die. Any server state — in-memory caches, open connections, background jobs — dies with it.

For most tools this is fine. A filesystem server has no meaningful state. A git server reads from disk every time. But a server that maintains expensive connections to external systems pays the reconnection cost every session. A server that accumulates learned behavior across sessions cannot use stdio.

The other failure mode: you cannot share a stdio server between multiple clients. If two Claude Code windows are open simultaneously, each spawns its own server process. For stateless servers this is harmless. For servers with rate limits, licensed APIs, or singleton resources, two processes means two instances of the same problem.

---

## II. HTTP/SSE: The Remote Standard

HTTP with Server-Sent Events is the transport for servers that run independently of the client. The server is a process you start once, it stays running, and any number of clients connect to it over the network.

SSE — Server-Sent Events — is how the server pushes messages back to the client over a persistent HTTP connection. The client opens an HTTP connection and keeps it open. The server streams newline-delimited events down the pipe. The client sends requests via standard HTTP POST to a separate endpoint.

The pattern looks like this:

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import express from 'express';

const app = express();
app.use(express.json());

const server = new McpServer({
  name: 'my-remote-server',
  version: '1.0.0',
});

// ... register your tools and resources ...

const transports: Record<string, SSEServerTransport> = {};

app.get('/sse', async (req, res) => {
  const transport = new SSEServerTransport('/messages', res);
  transports[transport.sessionId] = transport;

  res.on('close', () => {
    delete transports[transport.sessionId];
  });

  await server.connect(transport);
});

app.post('/messages', async (req, res) => {
  const sessionId = req.query.sessionId as string;
  const transport = transports[sessionId];

  if (!transport) {
    res.status(404).send('Session not found');
    return;
  }

  await transport.handlePostMessage(req, res, req.body);
});

app.listen(3000);
```

The server runs on port 3000. Clients connect to `/sse` for the event stream and POST to `/messages` for requests. Sessions are identified by a `sessionId` query parameter that the transport assigns on connection.

The Claude Code configuration for an HTTP/SSE server:

```json
{
  "mcpServers": {
    "my-remote-server": {
      "url": "https://my-server.example.com/sse",
      "headers": {
        "Authorization": "Bearer ${MY_API_KEY}"
      }
    }
  }
}
```

Instead of `command` and `args`, you provide a `url`. The server is already running somewhere — Claude Code just connects to it.

### When to choose HTTP/SSE

The decision is simple. Local tool that reads local resources: use stdio. Everything else: use HTTP/SSE.

More precisely, use HTTP/SSE when:

- The server needs to persist across client sessions (connection pools, caches, learned state)
- Multiple clients need to share the same server instance
- The server wraps an external API that has rate limits you want to manage centrally
- You need to deploy the server separately from the client (to a container, to the cloud)
- The server requires dedicated infrastructure (a database connection pool that stays warm)

I run 21 MCP servers in my daily workflow. Fourteen use stdio — filesystem access, git operations, local database queries, local script execution. Seven use HTTP/SSE — the servers that wrap external APIs, manage shared state, or need to stay running between sessions.

---

## III. Connection Lifecycle

Understanding the lifecycle prevents a class of bugs that show up as mysterious errors at startup or unexplained disconnections mid-session.

### stdio lifecycle

```
Claude Code starts
       ↓
Reads settings.json, finds server config
       ↓
Spawns server process: node /path/to/server.js
       ↓
Sends initialize request over stdin
       ↓
Server responds with capabilities
       ↓
[Normal operation: tools called, resources read]
       ↓
Claude Code session ends
       ↓
Server process receives SIGTERM
       ↓
Server process exits
```

The `initialize` exchange is the capability negotiation. The client tells the server what protocol version it supports and what client capabilities it has. The server responds with what it offers: which tools, which resources, which prompts. After that handshake, both sides know what is available.

If your server crashes during initialization — a missing environment variable, a failed database connection, an import error — Claude Code reports it as "Server failed to start." The error appears in Claude Code's output, not in a log file. Build your startup code to fail loudly with clear error messages. Cryptic startup failures waste disproportionate debugging time.

### HTTP/SSE lifecycle

```
Your server starts (separate process, stays running)
       ↓
Claude Code connects: GET /sse
       ↓
SSE connection established, sessionId assigned
       ↓
Initialize exchange over SSE + POST
       ↓
[Normal operation]
       ↓
Claude Code session ends
       ↓
SSE connection closes
       ↓
Server removes session from transports map
       ↓
Server continues running, waits for next connection
```

The server outlives the connection. This is the whole point. Connection loss does not mean server crash. You can reconnect and get a fresh session on the same running server.

---

## IV. Authentication Patterns

Authentication is where many MCP servers get it wrong. The protocol provides the mechanism; you implement the policy.

### stdio: environment variables

For local servers, the operating system is your security boundary. Only the user who can run the server process has access to the server's capabilities. Credentials live in the process environment or in config files that only that user can read.

```json
{
  "mcpServers": {
    "database-server": {
      "command": "node",
      "args": ["/path/to/db-server.js"],
      "env": {
        "DATABASE_URL": "postgresql://user:password@localhost:5432/prod"
      }
    }
  }
}
```

The password never travels over a network. It is in the process environment, which is only readable by the owning user and root. This is sufficient security for local development and single-user workstations.

### HTTP/SSE: bearer tokens

Remote servers need explicit authentication. The standard approach is Bearer token authentication in the Authorization header.

Server-side validation:

```typescript
app.use('/sse', (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authorization required' });
    return;
  }

  const token = authHeader.slice(7);

  if (token !== process.env.MCP_API_KEY) {
    res.status(403).json({ error: 'Invalid token' });
    return;
  }

  next();
});
```

Client-side configuration uses environment variable substitution so the token never appears in plain text in the config file:

```json
{
  "mcpServers": {
    "remote-server": {
      "url": "https://api.example.com/mcp/sse",
      "headers": {
        "Authorization": "Bearer ${MCP_REMOTE_TOKEN}"
      }
    }
  }
}
```

For production servers that multiple users will access, JWT tokens with subject claims let you implement per-user authorization: the same server endpoint, but each user's token encodes what they are allowed to do.

---

## V. Error Handling

The transport layer has its own category of errors, separate from application errors in your tools and resources.

### Connection errors

When a stdio server fails to start, Claude Code logs the error and marks the server as unavailable. Your other configured servers continue working. One broken server does not break the session.

When an HTTP/SSE server is unreachable, the client receives a connection error immediately. Claude Code reports this to the user. The behavior is the same: that server is unavailable, everything else continues.

Build your servers to give Claude Code enough information to report usefully:

```typescript
process.on('SIGTERM', async () => {
  console.error('Server shutting down gracefully');
  await server.close();
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error.message);
  console.error(error.stack);
  process.exit(1);
});
```

Write errors to stderr, not stdout. The MCP protocol uses stdout for protocol messages. Anything you write to stdout that is not a valid JSON-RPC message will corrupt the protocol stream. This mistake produces errors that look like protocol corruption but are actually debug log statements in the wrong stream.

### Tool errors

Transport errors and tool errors are different categories. A tool error — the SQL query failed, the API returned 404, the file does not exist — is a normal application event. Return it as a tool result, not as a transport error:

```typescript
server.tool('read-record', 'Read a database record', { id: { type: 'string' } },
  async ({ id }) => {
    try {
      const record = await db.findById(id);

      if (!record) {
        return {
          content: [{ type: 'text', text: `Record ${id} not found` }],
          isError: true
        };
      }

      return {
        content: [{ type: 'text', text: JSON.stringify(record, null, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Database error: ${error.message}` }],
        isError: true
      };
    }
  }
);
```

The `isError: true` flag tells the AI client that the tool call did not succeed. The AI will tell the user what went wrong and can suggest alternatives. If you throw an exception instead, the transport layer catches it and reports a protocol error — which is technically correct but gives the AI less information to work with.

---

## VI. How My 21 Servers Connect

My production setup divides cleanly across the two transports.

Fourteen stdio servers handle local operations: filesystem access in two project directories, git operations, TypeScript compilation checks, ESLint, a local PostgreSQL query interface, local script execution, and Claude Code's built-in tools. These servers start with each session and die with it. Their statelessness is a feature — each session starts clean.

Seven HTTP/SSE servers handle external integrations: the Vercel deployment interface, the GitHub API wrapper, the Resend email API, the n8n automation webhook bridge, the Notion content database, the Linear project tracker, and a Supabase data layer that maintains a warm connection pool to my cloud PostgreSQL instance. These servers run as persistent processes on my local machine, started via a process manager that keeps them alive between sessions.

The Supabase server is the clearest example of why transport choice matters. Opening a PostgreSQL connection takes 200-500ms. A session might make forty database calls. If that server used stdio, it would reconnect on every session startup — a noticeable delay. As an HTTP/SSE server, the connection pool stays warm. The first database call of every session is as fast as the fortieth.

The choice is not about protocol sophistication. It is about matching the server's operational characteristics to the right transport. Local and stateless: stdio. Persistent and shared: HTTP/SSE.

Build the right one for the job. The connection model is the architecture.
