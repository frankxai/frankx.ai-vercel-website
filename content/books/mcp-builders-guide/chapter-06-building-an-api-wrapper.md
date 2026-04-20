# Building an API Wrapper

> "The interface is the product."
> — Jony Ive

---

There are over 1,400 MCP servers in the ecosystem as of early 2026. The majority of them wrap REST APIs. Weather APIs, Stripe, Slack, Linear, GitHub, Notion, Airtable, Twilio — nearly every service that exposes an HTTP API has an MCP server built around it, or will shortly.

This chapter shows you how to build one from scratch. The pattern is transferable: learn it once and you can wrap any REST API in an afternoon. The example is the Vercel API — deployments, build logs, project management — because it is the API I reach for most often, and because its authentication model is representative of how most modern APIs work.

---

## I. The Pattern

Every REST API wrapper follows the same structure:

1. **Authentication wrapper** — inject credentials into every outgoing request
2. **Rate limiting** — respect API limits, queue excess requests
3. **Response formatting** — transform API responses into text the AI can reason about
4. **Error normalization** — translate HTTP error codes into meaningful messages

Get these four things right and the AI does not know it is talking to an HTTP API. It knows it has tools that produce information. The transport is invisible.

---

## II. The Foundation

```bash
mkdir vercel-mcp-server
cd vercel-mcp-server
npm init -y
npm install @modelcontextprotocol/sdk zod
npm install --save-dev typescript @types/node tsx
```

Create `src/vercel-client.ts` — the authentication and HTTP layer:

```typescript
const VERCEL_API_BASE = 'https://api.vercel.com';

export class VercelClient {
  private token: string;
  private teamId: string | undefined;
  private requestCount = 0;
  private requestWindowStart = Date.now();
  private readonly rateLimit = 60; // requests per minute

  constructor(token: string, teamId?: string) {
    if (!token) throw new Error('Vercel token is required');
    this.token = token;
    this.teamId = teamId;
  }

  private async checkRateLimit(): Promise<void> {
    const now = Date.now();
    const windowAge = now - this.requestWindowStart;

    if (windowAge > 60_000) {
      this.requestCount = 0;
      this.requestWindowStart = now;
    }

    if (this.requestCount >= this.rateLimit) {
      const waitMs = 60_000 - windowAge;
      await new Promise(resolve => setTimeout(resolve, waitMs));
      this.requestCount = 0;
      this.requestWindowStart = Date.now();
    }

    this.requestCount++;
  }

  async get<T>(path: string, params?: Record<string, string>): Promise<T> {
    await this.checkRateLimit();

    const url = new URL(`${VERCEL_API_BASE}${path}`);

    if (this.teamId) {
      url.searchParams.set('teamId', this.teamId);
    }

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
      }
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new VercelApiError(response.status, path, errorBody);
    }

    return response.json() as Promise<T>;
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    await this.checkRateLimit();

    const url = new URL(`${VERCEL_API_BASE}${path}`);
    if (this.teamId) {
      url.searchParams.set('teamId', this.teamId);
    }

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new VercelApiError(response.status, path, errorBody);
    }

    return response.json() as Promise<T>;
  }
}

export class VercelApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly path: string,
    public readonly body: string
  ) {
    super(`Vercel API error ${status} at ${path}: ${body}`);
    this.name = 'VercelApiError';
  }
}
```

The `VercelClient` handles three concerns: authentication (every request gets the Bearer token), team scoping (the optional `teamId` parameter targets personal vs. team accounts), and rate limiting (a simple sliding window that prevents the server from triggering Vercel's 429 responses).

The rate limiter uses a wait rather than an error because the AI may retry failed tool calls, creating a loop. Waiting once and proceeding is cleaner than failing and letting the AI retry.

---

## III. Response Formatting

Raw API responses are JSON objects designed for application consumption. They have good machine-readability and mediocre human-readability. The AI can parse them, but formatting them into structured text makes the AI's responses to users significantly clearer.

Create `src/formatters.ts`:

```typescript
export function formatDeployment(d: VercelDeployment): string {
  const lines = [
    `Deployment: ${d.name}`,
    `  ID:        ${d.uid}`,
    `  Status:    ${d.readyState}`,
    `  URL:       ${d.url ? `https://${d.url}` : 'not available'}`,
    `  Created:   ${new Date(d.createdAt).toLocaleString()}`,
  ];

  if (d.meta?.githubCommitMessage) {
    lines.push(`  Commit:    ${d.meta.githubCommitMessage.split('\n')[0]}`);
  }

  if (d.buildingAt && d.ready) {
    const buildTime = Math.round((d.ready - d.buildingAt) / 1000);
    lines.push(`  Build time: ${buildTime}s`);
  }

  return lines.join('\n');
}

export function formatProject(p: VercelProject): string {
  return [
    `Project: ${p.name}`,
    `  Framework:     ${p.framework || 'unknown'}`,
    `  Latest deploy: ${p.latestDeployments?.[0]?.readyState || 'none'}`,
    `  Node version:  ${p.nodeVersion || 'default'}`,
    `  Updated:       ${new Date(p.updatedAt).toLocaleString()}`,
  ].join('\n');
}

export function formatBuildLog(line: BuildLogLine): string {
  const level = line.type === 'stderr' ? '[ERR]' : '[LOG]';
  const time = new Date(line.created).toISOString().slice(11, 23);
  return `${time} ${level} ${line.text}`;
}

// Type definitions matching Vercel API response shapes
export interface VercelDeployment {
  uid: string;
  name: string;
  url?: string;
  readyState: 'QUEUED' | 'BUILDING' | 'ERROR' | 'CANCELED' | 'READY';
  createdAt: number;
  buildingAt?: number;
  ready?: number;
  meta?: { githubCommitMessage?: string; [key: string]: string | undefined };
}

export interface VercelProject {
  id: string;
  name: string;
  framework?: string;
  nodeVersion?: string;
  updatedAt: number;
  latestDeployments?: Array<{ readyState: string }>;
}

export interface BuildLogLine {
  type: 'stdout' | 'stderr';
  created: number;
  text: string;
}
```

Formatters are where you make judgments about what information matters. The full Vercel deployment object has forty-plus fields. An engineer asking "what's the status of my latest deployment?" needs six. Presenting six clearly is more useful than presenting forty completely.

---

## IV. The Tools

Create `src/tools.ts`:

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { VercelClient, VercelApiError } from './vercel-client.js';
import {
  formatDeployment, formatProject, formatBuildLog,
  VercelDeployment, VercelProject, BuildLogLine
} from './formatters.js';

function handleApiError(error: unknown): { content: [{ type: 'text'; text: string }]; isError: true } {
  if (error instanceof VercelApiError) {
    const messages: Record<number, string> = {
      401: 'Authentication failed. Check your VERCEL_TOKEN.',
      403: 'Access denied. The token may not have permission for this operation.',
      404: 'Not found. The project or deployment ID may be incorrect.',
      429: 'Rate limited. Too many requests to the Vercel API.',
    };
    const message = messages[error.status] || `API error (${error.status}): ${error.body}`;
    return { content: [{ type: 'text', text: message }], isError: true };
  }
  return {
    content: [{ type: 'text', text: `Unexpected error: ${(error as Error).message}` }],
    isError: true
  };
}

export function registerTools(server: McpServer, client: VercelClient): void {
  server.tool(
    'list-deployments',
    'List recent Vercel deployments, optionally filtered by project or state',
    {
      projectId: z.string().optional().describe('Filter by project ID or name'),
      state: z.enum(['QUEUED', 'BUILDING', 'READY', 'ERROR', 'CANCELED']).optional()
        .describe('Filter by deployment state'),
      limit: z.number().int().min(1).max(20).optional()
        .describe('Number of deployments to return (default: 10)'),
    },
    async ({ projectId, state, limit = 10 }) => {
      try {
        const params: Record<string, string> = { limit: String(limit) };
        if (projectId) params.projectId = projectId;
        if (state) params.state = state;

        const data = await client.get<{ deployments: VercelDeployment[] }>(
          '/v6/deployments', params
        );

        if (data.deployments.length === 0) {
          return { content: [{ type: 'text', text: 'No deployments found.' }] };
        }

        const formatted = data.deployments.map(formatDeployment).join('\n\n');
        return { content: [{ type: 'text', text: formatted }] };
      } catch (error) {
        return handleApiError(error);
      }
    }
  );

  server.tool(
    'get-deployment-logs',
    'Get build logs for a specific deployment',
    {
      deploymentId: z.string().describe('The deployment UID (starts with dpl_)'),
      since: z.number().optional().describe('Unix timestamp to fetch logs from'),
      follow: z.boolean().optional().describe('Include streaming logs (default: false)'),
    },
    async ({ deploymentId, since }) => {
      try {
        const params: Record<string, string> = {};
        if (since) params.since = String(since);

        const data = await client.get<{ logs: BuildLogLine[] }>(
          `/v2/deployments/${deploymentId}/events`, params
        );

        if (!data.logs || data.logs.length === 0) {
          return { content: [{ type: 'text', text: 'No build logs available for this deployment.' }] };
        }

        // Errors stand out more when listed separately
        const errors = data.logs.filter(l => l.type === 'stderr');
        const summary = errors.length > 0
          ? `Build log — ${data.logs.length} lines, ${errors.length} errors\n\n`
          : `Build log — ${data.logs.length} lines\n\n`;

        const logText = data.logs.slice(-100).map(formatBuildLog).join('\n');
        return { content: [{ type: 'text', text: summary + logText }] };
      } catch (error) {
        return handleApiError(error);
      }
    }
  );

  server.tool(
    'list-projects',
    'List Vercel projects with their current deployment status',
    {
      limit: z.number().int().min(1).max(20).optional()
        .describe('Number of projects to return (default: 10)'),
    },
    async ({ limit = 10 }) => {
      try {
        const data = await client.get<{ projects: VercelProject[] }>(
          '/v9/projects', { limit: String(limit) }
        );

        if (data.projects.length === 0) {
          return { content: [{ type: 'text', text: 'No projects found.' }] };
        }

        const formatted = data.projects.map(formatProject).join('\n\n');
        return { content: [{ type: 'text', text: formatted }] };
      } catch (error) {
        return handleApiError(error);
      }
    }
  );

  server.tool(
    'get-project',
    'Get detailed information about a specific Vercel project',
    {
      projectId: z.string().describe('Project ID or name'),
    },
    async ({ projectId }) => {
      try {
        const project = await client.get<VercelProject>(`/v9/projects/${projectId}`);
        return { content: [{ type: 'text', text: formatProject(project) }] };
      } catch (error) {
        return handleApiError(error);
      }
    }
  );
}
```

The `handleApiError` function deserves attention. HTTP error codes mean different things in different APIs. Vercel's 403 often means the token is missing the required scope, not that the resource is forbidden. Translating `403` into "Check your token's permissions" is more useful than passing through the raw HTTP status code. Do this translation for every API you wrap — it is what makes the difference between an AI that says "403 Forbidden" and one that says "The token may need the Deployments read permission enabled in your Vercel account."

---

## V. The Server

Create `src/server.ts`:

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { VercelClient } from './vercel-client.js';
import { registerTools } from './tools.js';

const token = process.env.VERCEL_TOKEN;
const teamId = process.env.VERCEL_TEAM_ID;

if (!token) {
  console.error('VERCEL_TOKEN environment variable is required');
  process.exit(1);
}

const client = new VercelClient(token, teamId);

const server = new McpServer({
  name: 'vercel-mcp-server',
  version: '1.0.0',
});

registerTools(server, client);

async function main(): Promise<void> {
  // Verify the token works before accepting connections
  try {
    await client.get('/www/user');
    console.error('Vercel token verified');
  } catch {
    console.error('Failed to verify Vercel token. Check VERCEL_TOKEN is valid.');
    process.exit(1);
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Vercel MCP server started');
}

main().catch((error) => {
  console.error('Server startup failed:', error.message);
  process.exit(1);
});
```

Token verification at startup follows the same principle as database connection verification in the previous chapter. Fail fast. Fail clearly. Do not let the user discover a broken credential forty minutes into a session when they try to use a tool.

The Claude Code configuration:

```json
{
  "mcpServers": {
    "vercel": {
      "command": "node",
      "args": ["/path/to/vercel-mcp-server/dist/server.js"],
      "env": {
        "VERCEL_TOKEN": "${VERCEL_TOKEN}",
        "VERCEL_TEAM_ID": "${VERCEL_TEAM_ID}"
      }
    }
  }
}
```

With this server running, you can tell Claude Code: "What's the status of my last five deployments?" and get a formatted summary. "Show me the build logs for the failed deployment" and get the actual error output from Vercel's build infrastructure. "Which project last deployed successfully?" and get an accurate answer from live data.

---

## VI. Connecting to the 1,400-Server Ecosystem

The MCP ecosystem reached 1,400 servers in early 2026 and is growing roughly forty new servers per week. The majority are exactly this pattern: a REST API wrapped in the three-primitive structure from Chapter 2.

What this means practically: before you build a wrapper, check whether one exists. The official repository at `github.com/modelcontextprotocol/servers` lists servers maintained by Anthropic, the API providers themselves, and the community. Stripe, Twilio, Salesforce, and dozens of other providers have official servers. Using an official server is almost always preferable to building your own — the provider understands their own API's edge cases better than you will from reading documentation.

Build your own when:
- The official server does not exist yet
- The official server does not expose the specific endpoints you need
- You need custom response formatting for your workflow
- You need to add rate limiting or caching that the official server does not implement
- You want to combine multiple APIs into a single server (a unified notifications server that wraps Slack, email, and SMS, for example)

The pattern in this chapter is the template for all of those cases. Authentication wrapper, rate limiter, response formatter, error translator. Everything else is API-specific knowledge.

One extension worth noting: caching. The rate limiter in this chapter prevents you from sending too many requests. A cache prevents you from sending the same request multiple times. For APIs with stable data — project lists, team configurations, deployment metadata older than five minutes — a simple in-memory TTL cache cuts API usage significantly and makes the server feel faster:

```typescript
class SimpleCache {
  private store = new Map<string, { value: unknown; expires: number }>();

  get<T>(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry || Date.now() > entry.expires) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value as T;
  }

  set(key: string, value: unknown, ttlMs: number): void {
    this.store.set(key, { value, expires: Date.now() + ttlMs });
  }
}
```

Inject this into the `VercelClient`, cache `get` requests with a sixty-second TTL, and you reduce your API call volume by fifty to eighty percent for typical interactive sessions.

The interface is the product. Build it so the AI can reason clearly about what it knows and what it can do. The REST API on the other side is an implementation detail.
