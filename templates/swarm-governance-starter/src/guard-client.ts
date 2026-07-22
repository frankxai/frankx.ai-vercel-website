/**
 * Spend-cap checking with two backends, selected by environment:
 *
 *  1. GUARD_MCP_COMMAND set → spawn the sibling agent-payments-guard MCP server
 *     as a LOCAL child process over stdio and call its `check_spend_cap` tool.
 *     The guard adds Ed25519 mandate verification and a durable per-day spend
 *     ledger. Any transport error, tool error, or garbled result resolves to
 *     `reject` — never a pass, and never a silent fallback to weaker checks.
 *
 *  2. Otherwise → a local caps file (CAPS_PATH, defaults to ./swarm.example.json)
 *     whose `streams` map uses the guard's caps.json shape:
 *     { "streams": { "<name>": { "per_transaction": n, "per_day": n, "currency": "EUR" } } }
 *     The local check enforces per_transaction and currency only; durable
 *     per-day accounting is what the guard adds.
 *
 * Both backends fail closed: unreadable config, unknown verdicts, and missing
 * amounts all reject.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { z } from "zod";

export type CapVerdict = "within-cap" | "escalate" | "reject";

export interface CapCheck {
  verdict: CapVerdict;
  reason: string;
  source: "guard-mcp" | "local-caps";
}

export interface SpendCheck {
  check(stream: string, amount: number | undefined, currency: string | undefined): Promise<CapCheck>;
  close(): Promise<void>;
}

// ---------------------------------------------------------------------------
// Guard-MCP backend
// ---------------------------------------------------------------------------

/**
 * The seam tests mock: something that calls one MCP tool and returns the raw
 * result. The real implementation is an MCP SDK client over stdio.
 */
export type ToolCaller = (name: string, args: Record<string, unknown>) => Promise<unknown>;

const capVerdictSchema = z.enum(["within-cap", "escalate", "reject"]);

/**
 * Parse a raw `check_spend_cap` result. Anything unexpected — an error result,
 * a missing/unknown verdict, a non-object — resolves to `reject`.
 */
export function parseCapResult(raw: unknown): { verdict: CapVerdict; reason: string } {
  if (typeof raw !== "object" || raw === null) {
    return { verdict: "reject", reason: "guard returned a non-object result — failing closed" };
  }
  const result = raw as { isError?: boolean; structuredContent?: unknown };
  if (result.isError) {
    return { verdict: "reject", reason: "guard returned an error result — failing closed" };
  }
  const structured = result.structuredContent as { verdict?: unknown; reason?: unknown } | undefined;
  const parsed = capVerdictSchema.safeParse(structured?.verdict);
  if (!parsed.success) {
    return { verdict: "reject", reason: "guard returned no recognizable verdict — failing closed" };
  }
  return {
    verdict: parsed.data,
    reason: typeof structured?.reason === "string" ? structured.reason : "no reason given",
  };
}

/**
 * Wrap a ToolCaller as a SpendCheck. Every failure mode — the caller throwing,
 * the result being garbage — resolves to `reject`.
 */
export function guardSpendCheck(call: ToolCaller, close: () => Promise<void> = async () => {}): SpendCheck {
  return {
    async check(stream, amount, currency) {
      if (!Number.isFinite(amount) || (amount as number) <= 0 || !currency) {
        return {
          verdict: "reject",
          reason: "missing or non-finite amount/currency — failing closed",
          source: "guard-mcp",
        };
      }
      try {
        const raw = await call("check_spend_cap", {
          charge: {
            // The guard keys replay protection on mandateId; a fresh id per
            // check means we consult caps, not mandate verification (which is
            // the guard's verify_mandate tool, upstream of this check).
            mandateId: `sg_${randomUUID()}`,
            amount,
            currency,
            stream,
          },
        });
        return { ...parseCapResult(raw), source: "guard-mcp" };
      } catch (err) {
        return {
          verdict: "reject",
          reason: `guard unreachable or errored — failing closed: ${(err as Error).message}`,
          source: "guard-mcp",
        };
      }
    },
    close,
  };
}

/**
 * Spawn the guard over stdio (a local child process — no network) and return
 * a SpendCheck backed by a real MCP client. The guard reads its caps from its
 * own CAPS_PATH, so the starter forwards the same file it would use for the
 * local fallback — one policy file drives both backends.
 */
export async function connectGuard(command: string, capsPath: string): Promise<SpendCheck> {
  const { Client } = await import("@modelcontextprotocol/sdk/client/index.js");
  const { StdioClientTransport, getDefaultEnvironment } = await import(
    "@modelcontextprotocol/sdk/client/stdio.js"
  );

  const [cmd, ...args] = command.split(/\s+/).filter(Boolean);
  if (!cmd) throw new Error("GUARD_MCP_COMMAND is empty");

  const client = new Client({ name: "swarm-governance-starter", version: "0.1.0" });
  const transport = new StdioClientTransport({
    command: cmd,
    args,
    env: { ...getDefaultEnvironment(), CAPS_PATH: resolve(capsPath) },
  });
  await client.connect(transport);

  return guardSpendCheck(
    (name, toolArgs) => client.callTool({ name, arguments: toolArgs }),
    () => client.close(),
  );
}

// ---------------------------------------------------------------------------
// Local caps fallback
// ---------------------------------------------------------------------------

const streamCapsSchema = z.object({
  per_transaction: z.number().positive(),
  per_day: z.number().positive(),
  currency: z.string().min(1),
});

// Non-strict: swarm.example.json carries extra keys (coordinator, workers, …)
// that a caps reader ignores.
const capsFileSchema = z.object({ streams: z.record(streamCapsSchema) });

/**
 * A SpendCheck backed by a local caps file. The file is re-read on every check
 * so edits apply immediately — and a broken edit rejects every spend until it
 * is fixed. Fail closed on bad policy.
 */
export function localSpendCheck(capsPath: string): SpendCheck {
  return {
    async check(stream, amount, currency) {
      const local = (verdict: CapVerdict, reason: string): CapCheck => ({
        verdict,
        reason,
        source: "local-caps",
      });
      if (!Number.isFinite(amount) || (amount as number) <= 0 || !currency) {
        return local("reject", "missing or non-finite amount/currency — failing closed");
      }
      let caps: z.infer<typeof capsFileSchema>;
      try {
        caps = capsFileSchema.parse(JSON.parse(readFileSync(capsPath, "utf8")));
      } catch (err) {
        return local("reject", `caps file unreadable or invalid — failing closed: ${(err as Error).message}`);
      }
      const streamCaps = caps.streams[stream] ?? caps.streams["default"];
      if (!streamCaps) {
        return local("escalate", `no cap configured for stream '${stream}' (and no 'default') — human decision required`);
      }
      if (currency !== streamCaps.currency) {
        return local("reject", `currency '${currency}' ≠ cap currency '${streamCaps.currency}' — no silent conversion`);
      }
      if ((amount as number) > streamCaps.per_transaction) {
        return local("escalate", `${amount} ${currency} exceeds per-transaction cap ${streamCaps.per_transaction} ${streamCaps.currency}`);
      }
      return local(
        "within-cap",
        `${amount} ${currency} within per-transaction cap ${streamCaps.per_transaction} ${streamCaps.currency}; ` +
          "durable per-day accounting requires the payments guard",
      );
    },
    close: async () => {},
  };
}

/**
 * Select the backend from the environment: GUARD_MCP_COMMAND → real guard over
 * stdio; otherwise the local caps file at CAPS_PATH (default ./swarm.example.json).
 */
export async function createSpendCheck(env: NodeJS.ProcessEnv = process.env): Promise<CapCheckBackend> {
  const command = env["GUARD_MCP_COMMAND"]?.trim();
  const capsPath = env["CAPS_PATH"]?.trim() || "./swarm.example.json";
  if (command) {
    return { backend: "guard-mcp", spendCheck: await connectGuard(command, capsPath) };
  }
  return { backend: "local-caps", spendCheck: localSpendCheck(capsPath) };
}

export interface CapCheckBackend {
  backend: "guard-mcp" | "local-caps";
  spendCheck: SpendCheck;
}
