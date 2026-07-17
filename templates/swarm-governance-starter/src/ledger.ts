/**
 * Append-only decision ledger: who proposed what, which tier it classified to,
 * what the verdict was, and why. JSONL on disk — never edited, never deleted,
 * never reordered.
 *
 * Invariant (same discipline as the sibling agent-payments-guard's audit log):
 * no governed action proceeds without a prior ledger entry, and if the write
 * fails the action fails. An unrecordable decision is a denied decision.
 */

import { appendFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname } from "node:path";

import type { Tier, VerdictOutcome } from "./types.js";

/** One recorded decision. Frozen on write — history is not edited. */
export interface LedgerEntry {
  ts: number;
  /** The role that proposed the action. */
  actor: string;
  /** The action kind (or the raw string for unknown kinds). */
  kind: string;
  description: string;
  tier?: Tier;
  outcome: VerdictOutcome;
  reason: string;
  gates: string[];
}

export class DecisionLedger {
  private readonly entries: LedgerEntry[] = [];
  private readonly path: string;

  /** @param filePath the JSONL ledger file. The parent dir is created. */
  constructor(filePath: string) {
    this.path = filePath;
    mkdirSync(dirname(this.path), { recursive: true });
    this.load();
  }

  private load(): void {
    if (!existsSync(this.path) || !statSync(this.path).isFile()) return;
    for (const line of readFileSync(this.path, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        this.entries.push(Object.freeze(JSON.parse(trimmed) as LedgerEntry));
      } catch {
        // A corrupt line is skipped on read but never rewritten — append-only
        // means history is not repaired in place.
      }
    }
  }

  /**
   * Append an entry. Persists to JSONL FIRST (the durable record), then
   * mirrors it in memory. Throws on a malformed entry OR a failed disk write
   * so the caller can fail the action closed. Append-first ordering: if the
   * write throws, nothing is mirrored.
   */
  append(entry: Omit<LedgerEntry, "ts"> & { ts?: number }): LedgerEntry {
    if (!entry.actor || !entry.kind || !entry.outcome) {
      throw new Error("ledger append failed: missing actor/kind/outcome — failing closed");
    }
    const stored: LedgerEntry = Object.freeze({ ...entry, ts: entry.ts ?? Date.now() });
    appendFileSync(this.path, JSON.stringify(stored) + "\n", "utf8");
    this.entries.push(stored);
    return stored;
  }

  /** Read-only snapshot. Returns a copy so callers cannot mutate the log. */
  all(): readonly LedgerEntry[] {
    return [...this.entries];
  }

  size(): number {
    return this.entries.length;
  }

  filePath(): string {
    return this.path;
  }
}
