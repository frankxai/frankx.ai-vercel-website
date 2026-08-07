import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { isInitializeRequest } from '@modelcontextprotocol/sdk/types.js';
import express, { type Request, type Response, type NextFunction } from 'express';
import { randomUUID } from 'node:crypto';
import { registerCapabilities } from './tools.js';

const SERVER_INFO = { name: 'mcp-server-kit', version: '0.1.0' };

function buildServer(): McpServer {
  const server = new McpServer(SERVER_INFO);
  registerCapabilities(server);
  return server;
}

// ---------------------------------------------------------------------------
// stdio transport — the default. This is what Claude Code / Cursor launch when
// they spawn the server as a child process.
// ---------------------------------------------------------------------------
async function runStdio(): Promise<void> {
  const server = buildServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // Logs MUST go to stderr on stdio — stdout carries the protocol.
  console.error('mcp-server-kit running on stdio');
}

// ---------------------------------------------------------------------------
// Streamable HTTP transport — for remote / networked clients. One server +
// transport per session, keyed by the `mcp-session-id` header.
// ---------------------------------------------------------------------------
// Origins allowed to reach the HTTP transport. A browser tab open on the same
// machine (or another host on the local network) can otherwise reach this
// server — a known MCP local-exposure / DNS-rebinding risk. Override via
// ALLOWED_ORIGINS (comma-separated) for a real deployment.
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? 'http://localhost,http://127.0.0.1')
  .split(',')
  .map((o) => o.trim());

function originAllowed(req: Request): boolean {
  const origin = req.headers.origin;
  if (!origin) return true; // non-browser clients (curl, MCP CLI) send no Origin header
  return ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed));
}

async function runHttp(): Promise<void> {
  const app = express();
  app.use(express.json());
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (!originAllowed(req)) {
      res.status(403).send('Origin not allowed. Set ALLOWED_ORIGINS to permit it.');
      return;
    }
    next();
  });

  const transports: Record<string, StreamableHTTPServerTransport> = {};

  app.post('/mcp', async (req: Request, res: Response) => {
    const sessionId = req.headers['mcp-session-id'] as string | undefined;
    let transport = sessionId ? transports[sessionId] : undefined;

    if (!transport && isInitializeRequest(req.body)) {
      // New session: create a transport and wire it to a fresh server.
      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        onsessioninitialized: (id) => {
          transports[id] = transport!;
        },
      });
      transport.onclose = () => {
        if (transport!.sessionId) delete transports[transport!.sessionId];
      };
      await buildServer().connect(transport);
    }

    if (!transport) {
      res.status(400).json({
        jsonrpc: '2.0',
        error: { code: -32000, message: 'No valid session. Send an initialize request first.' },
        id: null,
      });
      return;
    }

    await transport.handleRequest(req, res, req.body);
  });

  // GET (server-sent events) and DELETE (session teardown) share one handler.
  const sessionRequest = async (req: Request, res: Response) => {
    const sessionId = req.headers['mcp-session-id'] as string | undefined;
    const transport = sessionId ? transports[sessionId] : undefined;
    if (!transport) {
      res.status(400).send('Invalid or missing session ID.');
      return;
    }
    await transport.handleRequest(req, res);
  };
  app.get('/mcp', sessionRequest);
  app.delete('/mcp', sessionRequest);

  const port = Number(process.env.PORT) || 3000;
  // Bind to loopback by default — 0.0.0.0 would expose this to the local
  // network. Set HOST=0.0.0.0 explicitly for a real networked deployment
  // (and keep ALLOWED_ORIGINS tight if you do).
  const host = process.env.HOST || '127.0.0.1';
  app.listen(port, host, () => {
    console.error(`mcp-server-kit running on http://${host}:${port}/mcp`);
  });
}

async function main(): Promise<void> {
  if (process.argv.includes('--http')) {
    await runHttp();
  } else {
    await runStdio();
  }
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
