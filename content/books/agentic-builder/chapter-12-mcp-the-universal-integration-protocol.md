# Chapter 12: MCP -- The Universal Integration Protocol

> "The most important property of a program is whether it accomplishes the intention of its user."
> -- C.A.R. Hoare

---

## I. The Integration Problem

Before MCP, every AI provider invented its own tool integration layer. OpenAI had function calling with a specific JSON schema. Anthropic had tool use with a different JSON schema. Google had function declarations with yet another format. LangChain introduced tool classes. AutoGen used function maps. CrewAI had tool decorators. Semantic Kernel had plugins. Each was incompatible with the others.

If you built a tool for Claude, it did not work with GPT. If you built a tool for GPT, it did not work with Gemini. If you built a tool in LangChain, it did not work in CrewAI. The fragmentation was total.

This is the integration tax. Every tool author pays it by maintaining multiple implementations of the same capability. Every agent builder pays it by writing adapter layers between incompatible interfaces. Every organization pays it by locking into a single provider's tool ecosystem because the switching cost is too high.

The integration tax is not a new problem. The history of computing is a history of interface standardization solving exactly this problem. USB replaced a dozen proprietary connectors. HTTP replaced a dozen proprietary network protocols. SQL replaced a dozen proprietary query languages. REST replaced a dozen proprietary RPC mechanisms. In each case, the standard was not technically superior to every proprietary alternative -- it was universally adopted, which made it categorically more valuable.

MCP is that standard for agent-tool interaction.

---

## II. What MCP Actually Is

The Model Context Protocol, released by Anthropic in November 2024, is a client-server protocol that defines how AI applications (clients) connect to external data sources and tools (servers). It uses JSON-RPC 2.0 as its wire format and defines three categories of capabilities that a server can expose.

The architecture is straightforward. An MCP client (Claude Desktop, Claude Code, Cursor, or any application that implements the protocol) connects to one or more MCP servers. Each server exposes capabilities through a standardized interface. The client discovers what capabilities are available, presents them to the language model, and routes the model's requests to the appropriate server.

```
[LLM] <-> [MCP Client] <-> [MCP Server A: GitHub]
                        <-> [MCP Server B: Database]
                        <-> [MCP Server C: Filesystem]
```

The client handles the model interaction. The server handles the domain logic. Neither needs to know the implementation details of the other. This separation is the source of MCP's power: a server built once works with every compliant client.

---

## III. The Three Primitives

MCP defines three primitive types that a server can expose. Each serves a distinct purpose in the agent-tool interaction model.

### Resources

Resources are data that the server makes available to the client. They are the read side of the protocol -- structured information that the model can access but not modify through the resource interface itself.

A resource has a URI, a name, a description, and content that can be text or binary. Resources are analogous to GET endpoints in REST: they provide information without side effects.

```typescript
// Resource definition in an MCP server
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "config://app/settings",
        name: "Application Settings",
        description: "Current application configuration values",
        mimeType: "application/json"
      },
      {
        uri: "docs://api/reference",
        name: "API Reference",
        description: "Complete API documentation for the service",
        mimeType: "text/markdown"
      }
    ]
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (uri === "config://app/settings") {
    const settings = await loadSettings();
    return {
      contents: [{
        uri,
        mimeType: "application/json",
        text: JSON.stringify(settings, null, 2)
      }]
    };
  }

  throw new McpError(ErrorCode.InvalidRequest, `Unknown resource: ${uri}`);
});
```

Use resources for: configuration data, documentation, reference material, database schemas, system state -- anything the model needs to read to make informed decisions about tool use.

### Tools

Tools are functions that the server exposes for the model to invoke. They are the write side of the protocol -- operations that produce side effects, query external systems, or perform computations. Tools are what make agents agentic.

A tool has a name, a description, and an input schema defined using JSON Schema. The description is critical: the model reads it to decide when and how to use the tool.

```typescript
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "query_database",
        description:
          "Execute a read-only SQL query against the analytics database. " +
          "Returns results as a JSON array of objects. Tables available: " +
          "users, events, transactions. Maximum 1000 rows returned. " +
          "Use this when you need to look up specific data points or " +
          "calculate aggregates.",
        inputSchema: {
          type: "object",
          properties: {
            sql: {
              type: "string",
              description: "A read-only SQL query (SELECT only, no mutations)"
            }
          },
          required: ["sql"]
        }
      },
      {
        name: "create_issue",
        description:
          "Create a new issue in the project tracker. Returns the " +
          "issue ID and URL. Use this when the user wants to track " +
          "a bug, feature request, or task.",
        inputSchema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Issue title (concise, under 100 characters)"
            },
            body: {
              type: "string",
              description: "Detailed description with reproduction steps if applicable"
            },
            labels: {
              type: "array",
              items: { type: "string" },
              description: "Labels to apply: 'bug', 'feature', 'enhancement', 'docs'"
            }
          },
          required: ["title", "body"]
        }
      }
    ]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "query_database": {
      const results = await executeReadOnlyQuery(args.sql as string);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(results, null, 2)
        }]
      };
    }
    case "create_issue": {
      const issue = await tracker.createIssue({
        title: args.title as string,
        body: args.body as string,
        labels: (args.labels as string[]) || []
      });
      return {
        content: [{
          type: "text",
          text: `Created issue #${issue.id}: ${issue.url}`
        }]
      };
    }
    default:
      throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
  }
});
```

The input schema is a contract. The model generates arguments that conform to the schema; the server validates them. This is stronger than prompt-engineered tool use, where argument structure was a suggestion. With MCP, it is a specification.

### Prompts

Prompts are reusable templates that the server provides to the client. They define structured interaction patterns -- predefined workflows that the user can invoke by name, with the server supplying the prompt text and the client filling in dynamic arguments.

```typescript
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "code_review",
        description: "Review code for bugs, security issues, and style",
        arguments: [
          {
            name: "language",
            description: "Programming language of the code",
            required: true
          },
          {
            name: "code",
            description: "The code to review",
            required: true
          }
        ]
      }
    ]
  };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "code_review") {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text:
              `Review this ${args?.language} code for:\n` +
              `1. Bugs and logic errors\n` +
              `2. Security vulnerabilities\n` +
              `3. Performance issues\n` +
              `4. Style and readability\n\n` +
              `Code:\n\`\`\`${args?.language}\n${args?.code}\n\`\`\``
          }
        }
      ]
    };
  }

  throw new McpError(ErrorCode.InvalidRequest, `Unknown prompt: ${name}`);
});
```

Prompts are the least understood of the three primitives because their purpose is subtle. They codify domain expertise into reusable interaction patterns. A security team can publish a `threat_model` prompt that ensures threat modeling follows organizational standards. A data team can publish a `data_quality_check` prompt that applies consistent validation criteria. The prompt author encodes the expertise; the model applies it.

---

## IV. Building an MCP Server from Scratch

Here is a complete MCP server -- a project management tool that exposes tasks through all three primitives. This is approximately 100 lines of working code.

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";

// --- In-memory task store ---

interface Task {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "done";
  created: string;
}

const tasks: Map<string, Task> = new Map();
let nextId = 1;

// --- Server setup ---

const server = new Server(
  { name: "task-manager", version: "1.0.0" },
  { capabilities: { tools: {}, resources: {}, prompts: {} } }
);

// --- Resources: read current task state ---

server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [{
    uri: "tasks://all",
    name: "All Tasks",
    description: "Current list of all tasks with status",
    mimeType: "application/json"
  }]
}));

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  if (request.params.uri === "tasks://all") {
    return {
      contents: [{
        uri: "tasks://all",
        mimeType: "application/json",
        text: JSON.stringify([...tasks.values()], null, 2)
      }]
    };
  }
  throw new McpError(ErrorCode.InvalidRequest, "Unknown resource");
});

// --- Tools: create and update tasks ---

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "create_task",
      description: "Create a new task. Returns the task ID.",
      inputSchema: {
        type: "object",
        properties: {
          title: { type: "string", description: "Task title" }
        },
        required: ["title"]
      }
    },
    {
      name: "update_task_status",
      description: "Update a task's status to todo, in_progress, or done.",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string", description: "Task ID" },
          status: {
            type: "string",
            enum: ["todo", "in_progress", "done"],
            description: "New status"
          }
        },
        required: ["id", "status"]
      }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "create_task") {
    const id = String(nextId++);
    const task: Task = {
      id,
      title: args!.title as string,
      status: "todo",
      created: new Date().toISOString()
    };
    tasks.set(id, task);
    return { content: [{ type: "text", text: `Created task ${id}: "${task.title}"` }] };
  }

  if (name === "update_task_status") {
    const task = tasks.get(args!.id as string);
    if (!task) {
      return { content: [{ type: "text", text: `Task ${args!.id} not found` }], isError: true };
    }
    task.status = args!.status as Task["status"];
    return { content: [{ type: "text", text: `Task ${task.id} status: ${task.status}` }] };
  }

  throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
});

// --- Prompts: structured task planning ---

server.setRequestHandler(ListPromptsRequestSchema, async () => ({
  prompts: [{
    name: "plan_sprint",
    description: "Plan a sprint by breaking a goal into tasks",
    arguments: [{
      name: "goal",
      description: "The sprint goal to decompose into tasks",
      required: true
    }]
  }]
}));

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  if (request.params.name === "plan_sprint") {
    const currentTasks = [...tasks.values()];
    return {
      messages: [{
        role: "user",
        content: {
          type: "text",
          text:
            `Plan a sprint for this goal: "${request.params.arguments?.goal}"\n\n` +
            `Current tasks:\n${JSON.stringify(currentTasks, null, 2)}\n\n` +
            `Break the goal into 3-7 concrete tasks. For each task, use the ` +
            `create_task tool. Consider dependencies and ordering.`
        }
      }]
    };
  }
  throw new McpError(ErrorCode.InvalidRequest, "Unknown prompt");
});

// --- Start the server ---

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Task Manager MCP server running on stdio");
}

main().catch(console.error);
```

That is a complete, functional MCP server. Save it as `server.ts`, install `@modelcontextprotocol/sdk`, and connect it to any MCP-compatible client. The server exposes resources (task list), tools (create and update tasks), and prompts (sprint planning) through a single standardized interface.

---

## V. The Server Lifecycle

An MCP server goes through a defined lifecycle that every implementation must handle correctly. Understanding this lifecycle is essential for building servers that behave predictably under real-world conditions.

### Initialization

When a client connects, it sends an `initialize` request containing its protocol version and capabilities. The server responds with its own protocol version and the capabilities it supports. This handshake establishes what both sides can do.

```
Client -> Server: initialize {
  protocolVersion: "2025-03-26",
  capabilities: { roots: { listChanged: true } },
  clientInfo: { name: "claude-code", version: "1.0.0" }
}

Server -> Client: {
  protocolVersion: "2025-03-26",
  capabilities: { tools: {}, resources: {}, prompts: {} },
  serverInfo: { name: "task-manager", version: "1.0.0" }
}

Client -> Server: notifications/initialized
```

The `capabilities` object in the server's response tells the client which of the three primitives this server supports. A server can support any subset: tools only, resources and tools, all three, or even none (a server that only exposes notifications).

### Capability Negotiation

Capability negotiation is not just a formality. It determines the protocol surface area for the session. If a server does not declare `tools` in its capabilities, the client will not send `tools/list` or `tools/call` requests. If the server does not declare `resources`, the client will not attempt to read resources.

This means you can build servers incrementally. Start with tools only. Add resources when your server has data worth exposing. Add prompts when you have interaction patterns worth codifying. The protocol scales with your implementation.

### Request Handling

After initialization, the client sends requests based on the negotiated capabilities. The request-response pattern follows JSON-RPC 2.0: each request has an `id`, a `method`, and optional `params`. The server responds with the same `id` and either a `result` or an `error`.

Servers must handle requests for all declared capabilities. If you declared `tools` in your capabilities, you must handle `tools/list` and `tools/call`. If you declared `resources`, you must handle `resources/list` and `resources/read`. Failing to handle a declared capability is a protocol violation.

### Shutdown

The protocol defines a clean shutdown sequence. The client sends a `close` notification, and the server releases resources and exits. In stdio transport, the server also shuts down when the parent process terminates (stdin closes).

Clean shutdown matters for servers that maintain state. A database server needs to close connections. A file-watching server needs to release file handles. A server managing external processes needs to terminate them. The shutdown handler is your cleanup hook.

```typescript
server.onclose = async () => {
  await database.close();
  await fileWatcher.stop();
  process.exit(0);
};
```

---

## VI. Transport Options

MCP defines two transport mechanisms, each optimized for different deployment scenarios.

### Stdio Transport

In stdio transport, the client spawns the server as a child process. Communication flows through standard input and standard output. Each message is a JSON-RPC object delimited by newlines.

```
Client Process <-- stdin/stdout --> Server Process (child)
```

Stdio is the default for local servers. It requires zero network configuration, works behind firewalls, needs no authentication (the server runs as the same user), and has minimal latency. When you configure an MCP server in Claude Desktop or Claude Code, you specify a command to execute, and the client spawns that command as a child process.

```json
{
  "mcpServers": {
    "task-manager": {
      "command": "npx",
      "args": ["tsx", "server.ts"],
      "env": { "DATABASE_URL": "postgres://localhost/tasks" }
    }
  }
}
```

Use stdio when: the server runs on the same machine as the client, the server needs access to local resources (filesystem, local databases, local processes), or the server is a developer tool intended for single-user operation.

### HTTP with Server-Sent Events (Streamable HTTP)

HTTP transport runs the server as a standalone web service. The client connects over HTTP, using Server-Sent Events for server-to-client streaming and POST requests for client-to-server messages.

```
Client <-- HTTP/SSE --> Server (remote, standalone process)
```

HTTP transport supports remote deployment: the server can run on a different machine, in a container, behind a load balancer. It also supports multiple concurrent clients, which stdio does not (each stdio connection is a dedicated process).

```typescript
import { StreamableHTTPServerTransport } from
  "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";

const app = express();

app.post("/mcp", async (req, res) => {
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => crypto.randomUUID(),
  });
  await server.connect(transport);
  await transport.handleRequest(req, res);
});

app.listen(3001, () => {
  console.log("MCP server listening on http://localhost:3001/mcp");
});
```

Use HTTP when: the server serves multiple users, the server runs in a cloud environment, the server needs to be accessible from different machines, or the server integrates with infrastructure that speaks HTTP (load balancers, API gateways, monitoring).

### Choosing Between Them

The decision matrix is simple:

| Factor | Stdio | HTTP |
|--------|-------|------|
| Deployment | Local, single user | Remote, multi-user |
| Authentication | Implicit (OS user) | Explicit (tokens, OAuth) |
| Latency | Minimal | Network-dependent |
| Concurrency | One client per process | Multiple clients |
| Firewall | No concerns | Requires open ports |
| State | Per-process | Shared or per-session |

Most MCP servers start as stdio and migrate to HTTP when they need to serve a team. The server code does not change -- only the transport layer and the startup configuration.

---

## VII. The MCP Ecosystem

The MCP ecosystem has grown from Anthropic's initial release to over 1,400 published servers as of early 2026. This growth is the strongest signal that the protocol has achieved the network effects necessary for a standard to succeed.

### Discovery

The primary directory is [mcp.so](https://mcp.so), which indexes servers by category, provider, and capability. Categories span the full range of developer infrastructure: databases (PostgreSQL, MongoDB, Redis), version control (GitHub, GitLab), cloud providers (AWS, GCP, Vercel), communication (Slack, email), file systems, web scraping, and specialized domains from bioinformatics to financial data.

Anthropic also maintains an official registry of reviewed servers, and major providers ship their own: Vercel, Stripe, Sentry, Linear, Notion, and Figma all maintain first-party MCP servers.

### Distribution

MCP servers distribute through package managers. The standard pattern for TypeScript servers is npm:

```bash
# Install and run an MCP server
npx @modelcontextprotocol/server-postgres

# Or install globally
npm install -g @anthropic/mcp-server-github
```

Python servers distribute through pip and uvx. The protocol is language-agnostic; the SDK has official implementations in TypeScript and Python, with community implementations in Go, Rust, Java, and C#.

### Composition

The real power of the ecosystem is composition. A single MCP client can connect to multiple servers simultaneously, and the model sees all their capabilities as a unified toolset. You can compose a custom environment by selecting servers:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@anthropic/mcp-server-github"],
      "env": { "GITHUB_TOKEN": "${GITHUB_TOKEN}" }
    },
    "postgres": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres", "${DATABASE_URL}"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "/home/user/projects"]
    }
  }
}
```

With this configuration, an agent can read your codebase, query your database, and create GitHub issues -- all through standardized interfaces, all composable without custom integration code. Each server is developed, tested, and maintained independently. The protocol is the integration layer.

---

## VIII. Publishing Your Server

Building a server that works on your machine is step one. Publishing a server that works on anyone's machine requires attention to packaging, documentation, and versioning.

### Packaging

The standard packaging for a TypeScript MCP server:

```json
{
  "name": "@yourorg/mcp-server-yourservice",
  "version": "1.0.0",
  "type": "module",
  "bin": {
    "mcp-server-yourservice": "./dist/index.js"
  },
  "files": ["dist"],
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.12.0"
  },
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

The `bin` field is important. It allows users to run your server with `npx @yourorg/mcp-server-yourservice` without installing it globally. The `files` field ensures only built output ships in the package.

### Documentation

Server documentation needs to answer three questions:

1. **What does this server do?** List every resource, tool, and prompt with descriptions.
2. **How do I configure it?** Environment variables, command-line arguments, required credentials.
3. **How do I connect it?** Client configuration snippets for Claude Desktop, Claude Code, and other popular clients.

A README that answers these three questions is sufficient. A README that does not answer any of them is useless regardless of how much else it contains.

### Versioning

MCP servers should follow semantic versioning with particular attention to tool changes:

- **Patch** (1.0.0 -> 1.0.1): Bug fixes, internal improvements. No changes to tool names, descriptions, or schemas.
- **Minor** (1.0.0 -> 1.1.0): New tools, resources, or prompts added. Existing interfaces unchanged.
- **Major** (1.0.0 -> 2.0.0): Breaking changes to existing tool interfaces -- renamed tools, changed schemas, removed capabilities.

Breaking changes in MCP servers are more disruptive than in typical libraries because agents develop behavioral patterns around tool descriptions. If you rename `create_issue` to `new_issue`, every agent configuration that references the old name breaks, and every prompt that mentions the old name becomes stale. Treat tool interfaces as public API surfaces.

---

## IX. MCP and the Future of Agent Infrastructure

MCP is not the final word on agent-tool interaction. It will evolve. But it has achieved the critical mass that makes it the foundation rather than a competitor. The number of servers, the number of clients, and the number of organizations building on MCP have crossed the threshold where the protocol's value comes from its ubiquity rather than its technical merits.

The implications for builders are concrete. Build your tools as MCP servers, and they work everywhere. Build them as framework-specific integrations, and they work in one place. The engineering effort is comparable. The reach is not.

Chapter 2 taught you how tools connect reasoning to reality. This chapter taught you how MCP standardizes that connection into a protocol that scales across providers, frameworks, and organizations. The next chapter addresses the organizational patterns that make agentic systems succeed beyond the individual builder -- how teams, departments, and enterprises adopt the patterns in this book.
