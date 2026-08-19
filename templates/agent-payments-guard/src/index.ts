#!/usr/bin/env node
/**
 * agent-payments-guard — fail-closed, verify-only payments-governance MCP server.
 *
 * ⚠️ UNAUDITED reference implementation. NOT FOR LIVE FUNDS.
 *
 * Your agent gets no transfer tool — it gets a gate. Four verify-only tools:
 *   - verify_mandate          "was this authorized?" (Ed25519, fail closed)
 *   - check_spend_cap         per-tx/day caps from caps.json + replay guard
 *   - record_audit_entry      append-only audit log
 *   - require_human_approval  returns a pending-approval object, never approves
 *
 * There is NO transfer/pay/settle/move_funds tool. None exists, by design.
 *
 * Transports: stdio (default, for local clients) and streamable HTTP (--http),
 * bound to 127.0.0.1 with an Origin allowlist unless configured otherwise.
 * `buildServer` is exported so tests can drive the server in-process.
 */

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { randomUUID } from "node:crypto";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";

import { SpendLedger } from "./caps.js";
import { AuditLog } from "./audit.js";
import { registerGuardTools } from "./tools.js";

const SERVER_INFO = { name: "agent-payments-guard", version: "0.1.0" };

export interface BuildOptions {
  capsPath?: string;
  auditPath?: string;
  ledgerPath?: string;
}

/**
 * Build the verify-only guard server with its own durable state. Paths resolve
 * explicit option → environment → default. Exported so tests can run the server
 * in-process (InMemoryTransport) against temp files.
 */
export function buildServer(opts: BuildOptions = {}): McpServer {
  const capsPath = opts.capsPath ?? process.env.CAPS_PATH ?? "./caps.json";
  const auditPath = opts.auditPath ?? process.env.AUDIT_LOG_PATH ?? "./.guard-data/audit.jsonl";
  const ledgerPath = opts.ledgerPath ?? process.env.LEDGER_PATH ?? "./.guard-data/ledger.jsonl";

  const server = new McpServer(SERVER_INFO);
  registerGuardTools(server, {
    ledger: new SpendLedger(ledgerPath),
    audit: new AuditLog(auditPath),
    capsPath,
  });
  return server;
}

// ---------------------------------------------------------------------------
// stdio transport — the default. This is what Claude Code / Claude Desktop /
// Cursor launch when they spawn the server as a child process.
// ---------------------------------------------------------------------------
async function runStdio(): Promise<void> {
  const server = buildServer();
  await server.connect(new StdioServerTransport());
  // Logs MUST go to stderr on stdio — stdout carries the protocol.
  console.error(
    `${SERVER_INFO.name} ${SERVER_INFO.version} (verify-only, fail-closed) on stdio — NOT FOR LIVE FUNDS`,
  );
}

// ---------------------------------------------------------------------------
// Streamable HTTP transport — for remote/networked clients. Plain node:http
// (no framework dependency). One server + transport per session, keyed by the
// `mcp-session-id` header.
// ---------------------------------------------------------------------------

// Origins allowed to reach the HTTP transport. A browser tab on the same
// machine (or another host on the local network) could otherwise reach this
// server — a known MCP local-exposure / DNS-rebinding risk. Override via
// ALLOWED_ORIGINS (comma-separated) for a real deployment.
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? "http://localhost,http://127.0.0.1")
  .split(",")
  .map((o) => o.trim());

function originAllowed(req: IncomingMessage): boolean {
  const origin = req.headers.origin;
  if (!origin) return true; // non-browser clients (curl, MCP CLI) send no Origin header
  return ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed));
}

const MAX_BODY_BYTES = 1024 * 1024; // 1 MiB — a mandate + charge is tiny; cap the rest out

/** Read and JSON-parse a request body, failing closed on oversize or bad JSON. */
function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on("data", (chunk: Buffer) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error("request body too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        reject(new Error("invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(body));
}

async function runHttp(): Promise<void> {
  const transports: Record<string, StreamableHTTPServerTransport> = {};

  const httpServer = createServer(async (req, res) => {
    try {
      if (!originAllowed(req)) {
        res.writeHead(403, { "content-type": "text/plain" });
        res.end("Origin not allowed. Set ALLOWED_ORIGINS to permit it.");
        return;
      }
      const url = new URL(req.url ?? "/", "http://localhost");
      if (url.pathname !== "/mcp") {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Not found. The MCP endpoint is /mcp.");
        return;
      }

      const sessionId = req.headers["mcp-session-id"] as string | undefined;

      if (req.method === "POST") {
        let body: unknown;
        try {
          body = await readJsonBody(req);
        } catch (err) {
          sendJson(res, 400, {
            jsonrpc: "2.0",
            error: { code: -32700, message: (err as Error).message },
            id: null,
          });
          return;
        }

        let transport = sessionId ? transports[sessionId] : undefined;
        if (!transport && isInitializeRequest(body)) {
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
          sendJson(res, 400, {
            jsonrpc: "2.0",
            error: { code: -32000, message: "No valid session. Send an initialize request first." },
            id: null,
          });
          return;
        }
        await transport.handleRequest(req, res, body);
        return;
      }

      // GET (server-sent events) and DELETE (session teardown).
      if (req.method === "GET" || req.method === "DELETE") {
        const transport = sessionId ? transports[sessionId] : undefined;
        if (!transport) {
          res.writeHead(400, { "content-type": "text/plain" });
          res.end("Invalid or missing session ID.");
          return;
        }
        await transport.handleRequest(req, res);
        return;
      }

      res.writeHead(405, { allow: "GET, POST, DELETE" });
      res.end();
    } catch (err) {
      console.error("http error:", err);
      if (!res.headersSent) res.writeHead(500);
      res.end();
    }
  });

  const port = Number(process.env.PORT) || 3000;
  // Bind to loopback by default — 0.0.0.0 would expose this to the local
  // network. Set HOST=0.0.0.0 explicitly for a real networked deployment
  // (and keep ALLOWED_ORIGINS tight if you do).
  const host = process.env.HOST || "127.0.0.1";
  httpServer.listen(port, host, () => {
    console.error(
      `${SERVER_INFO.name} ${SERVER_INFO.version} (verify-only, fail-closed) on ` +
        `http://${host}:${port}/mcp — NOT FOR LIVE FUNDS`,
    );
  });
}

async function main(): Promise<void> {
  if (process.argv.includes("--http")) {
    await runHttp();
  } else {
    await runStdio();
  }
}

// Only auto-start when run as the entrypoint, not when imported by a test that
// calls buildServer() against an in-process transport.
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error("agent-payments-guard fatal:", err);
    process.exit(1);
  });
}
