/**
 * Spend caps — the "is it within cap?" gate.
 *
 * ⚠️ UNAUDITED reference implementation. NOT FOR LIVE FUNDS.
 *
 * Caps are OPERATOR POLICY loaded from a JSON file (see caps.example.json) —
 * the calling agent can never supply its own caps as tool input. Two ceilings
 * per stream: per_transaction and per_day (24h window). Over ANY cap →
 * ESCALATE, never auto-approve. A consumed mandate replayed → REJECT.
 *
 * Durable: the consumed-mandate set and spend events persist to a JSONL ledger
 * that is replayed on construction, so replay protection and per-day totals
 * survive a restart.
 */

import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname } from "node:path";
import { z } from "zod";
import type { Charge } from "./mandate.js";

// ---------------------------------------------------------------------------
// Cap config (caps.json). zod-validated: a malformed file throws, and the tool
// layer maps that throw to a REJECT verdict — fail closed on bad policy.
// ---------------------------------------------------------------------------

export const streamCapsSchema = z.object({
  per_transaction: z.number().positive(),
  per_day: z.number().positive(),
  currency: z.string().min(1).max(10),
});

export const capsConfigSchema = z.object({
  streams: z.record(z.string(), streamCapsSchema),
});

export type StreamCaps = z.infer<typeof streamCapsSchema>;
export type CapsConfig = z.infer<typeof capsConfigSchema>;

/**
 * Load and validate the caps file. Throws on a missing, unreadable, or
 * malformed file — callers map the throw to a REJECT verdict. Read on every
 * check so cap edits apply immediately and a broken edit fails closed
 * immediately.
 */
export function loadCaps(path: string): CapsConfig {
  return capsConfigSchema.parse(JSON.parse(readFileSync(path, "utf8")));
}

/** Caps for a stream: exact entry, else the "default" entry, else undefined. */
export function capsForStream(config: CapsConfig, stream: string): StreamCaps | undefined {
  return config.streams[stream] ?? config.streams["default"];
}

// ---------------------------------------------------------------------------
// The durable spend ledger: consumed-mandate set + per-day accumulation.
// ---------------------------------------------------------------------------

export interface CapResult {
  verdict: "within-cap" | "reject" | "escalate";
  reason: string;
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** One durable commit event line in the JSONL ledger. */
interface LedgerEvent {
  mandateId: string;
  ts: number;
  amount: number;
  stream: string;
}

/**
 * Holds the consumed-mandate set and the approved-spend records. One instance
 * per server process. Injectable clock for deterministic tests. State persists
 * to JSONL and reloads on construction.
 */
export class SpendLedger {
  private readonly consumed = new Set<string>();
  /**
   * Time-windowed records for the per-day cap. Pruned to the last DAY_MS on
   * every check so the array cannot grow unbounded — records older than the
   * daily window carry no per-day signal.
   */
  private records: Array<{ ts: number; amount: number; stream: string }> = [];
  private readonly path: string;

  /** @param filePath the JSONL ledger file. The parent dir is created. */
  constructor(filePath: string) {
    this.path = filePath;
    mkdirSync(dirname(this.path), { recursive: true });
    this.load();
  }

  /**
   * Replay the durable event log to rebuild in-memory state: every committed
   * mandate id re-enters the consumed set (replay protection survives restart)
   * and recent events seed the per-day window.
   */
  private load(): void {
    if (!existsSync(this.path)) return;
    for (const line of readFileSync(this.path, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      let ev: LedgerEvent;
      try {
        ev = JSON.parse(trimmed) as LedgerEvent;
      } catch {
        continue; // skip a corrupt line; durable history is never rewritten
      }
      if (!ev.mandateId || typeof ev.amount !== "number") continue;
      this.consumed.add(ev.mandateId);
      this.records.push({ ts: ev.ts, amount: ev.amount, stream: ev.stream });
    }
  }

  /** True if this mandate id has already been consumed (i.e. a replay). */
  isConsumed(mandateId: string): boolean {
    return this.consumed.has(mandateId);
  }

  private prune(now: number): void {
    const cutoff = now - DAY_MS;
    this.records = this.records.filter((r) => r.ts > cutoff);
  }

  private spentTodayOnStream(stream: string, now: number): number {
    const cutoff = now - DAY_MS;
    return this.records
      .filter((r) => r.stream === stream && r.ts > cutoff)
      .reduce((sum, r) => sum + r.amount, 0);
  }

  /**
   * Evaluate a charge against a stream's caps. Does NOT mutate state — call
   * `commit` separately, and only after the audit entry is durably written
   * (audit-first).
   */
  check(charge: Charge, caps: StreamCaps, now: number = Date.now()): CapResult {
    this.prune(now);

    // Replay guard first: a consumed mandate is never re-spendable.
    if (this.consumed.has(charge.mandateId)) {
      return { verdict: "reject", reason: `replay: mandate ${charge.mandateId} already consumed` };
    }

    if (!Number.isFinite(charge.amount) || charge.amount <= 0) {
      return { verdict: "reject", reason: `invalid charge amount '${String(charge.amount)}'` };
    }

    // The cap is defined in one currency; a charge in another is a reject —
    // never a silent conversion.
    if (charge.currency !== caps.currency) {
      return {
        verdict: "reject",
        reason:
          `currency mismatch: caps for stream '${charge.stream}' are ${caps.currency}, ` +
          `charge is ${charge.currency}`,
      };
    }

    if (charge.amount > caps.per_transaction) {
      return {
        verdict: "escalate",
        reason:
          `over per-transaction cap: ${charge.amount.toFixed(2)} ${charge.currency} ` +
          `> ${caps.per_transaction.toFixed(2)}`,
      };
    }

    const day = this.spentTodayOnStream(charge.stream, now) + charge.amount;
    if (day > caps.per_day) {
      return {
        verdict: "escalate",
        reason:
          `over per-day cap on stream '${charge.stream}': ` +
          `${day.toFixed(2)} ${charge.currency} > ${caps.per_day.toFixed(2)}`,
      };
    }

    return {
      verdict: "within-cap",
      reason: `within all caps (tx ${charge.amount.toFixed(2)} / day ${day.toFixed(2)} ${charge.currency})`,
    };
  }

  /**
   * Consume the mandate and record the spend. Throws if the mandate was already
   * consumed — the caller must `check` first. Single-use is absolute.
   *
   * Durability: the event is appended to the JSONL ledger FIRST. If that write
   * throws, no in-memory state mutates — there is no consumed mandate without a
   * durable record of it, so replay protection cannot be lost to a crash.
   */
  commit(charge: Charge, now: number = Date.now()): void {
    if (this.consumed.has(charge.mandateId)) {
      throw new Error(`refusing to re-consume mandate ${charge.mandateId}`);
    }
    const ev: LedgerEvent = {
      mandateId: charge.mandateId,
      ts: now,
      amount: charge.amount,
      stream: charge.stream,
    };
    appendFileSync(this.path, JSON.stringify(ev) + "\n", "utf8");
    this.consumed.add(charge.mandateId);
    this.records.push({ ts: now, amount: charge.amount, stream: charge.stream });
  }

  /** The JSONL file backing this ledger. */
  filePath(): string {
    return this.path;
  }
}
