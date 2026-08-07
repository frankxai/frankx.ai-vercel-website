/**
 * Append-only audit log.
 *
 * ⚠️ UNAUDITED reference implementation. NOT FOR LIVE FUNDS.
 *
 * Invariant: no money action exists without a prior audit entry, and if the log
 * write fails the action fails. The log is append-only — never edited, never
 * deleted, never reordered.
 *
 * Each entry persists to a JSONL file IN ADDITION to an in-memory mirror. A
 * failed disk write throws, so the action fails closed. The on-disk JSONL is
 * the durable record; the in-memory array is a fast read mirror loaded at
 * construction.
 */

import { appendFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname } from "node:path";

/** An append-only audit record. The log is never edited or deleted. */
export interface AuditEntry {
  ts: number;
  action: string;
  mandateId?: string;
  amount?: number;
  currency?: string;
  verdict?: string;
  reason?: string;
  actor?: string;
}

export class AuditLog {
  private readonly entries: AuditEntry[] = [];
  private readonly path: string;

  /** @param filePath the JSONL audit file. The parent dir is created. */
  constructor(filePath: string) {
    this.path = filePath;
    mkdirSync(dirname(this.path), { recursive: true });
    this.load();
  }

  /** Load prior entries from the JSONL file into the in-memory mirror. */
  private load(): void {
    if (!existsSync(this.path) || !statSync(this.path).isFile()) return;
    for (const line of readFileSync(this.path, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        // Re-freeze on load: the append-only log stays immutable in memory too.
        this.entries.push(Object.freeze(JSON.parse(trimmed) as AuditEntry));
      } catch {
        // A corrupt line is skipped on read but never rewritten — the file is
        // append-only and history is not edited.
      }
    }
  }

  /**
   * Append an entry. Persists to JSONL FIRST (the durable record), then mirrors
   * it in memory. Throws on a malformed entry OR a failed disk write so the
   * caller can fail the action closed — an unloggable decision must not
   * proceed. Append-first ordering: if the write throws, nothing is mirrored.
   */
  append(entry: Omit<AuditEntry, "ts"> & { ts?: number }): AuditEntry {
    if (!entry.action || typeof entry.action !== "string") {
      throw new Error("audit append failed: missing action — failing closed");
    }
    // Freeze so a stored decision can never be edited in place after the fact.
    const stored: AuditEntry = Object.freeze({ ...entry, ts: entry.ts ?? Date.now() });
    appendFileSync(this.path, JSON.stringify(stored) + "\n", "utf8");
    this.entries.push(stored);
    return stored;
  }

  /** Read-only snapshot. Returns a copy so callers cannot mutate the log. */
  all(): readonly AuditEntry[] {
    return [...this.entries];
  }

  size(): number {
    return this.entries.length;
  }

  /** The JSONL file backing this log. */
  filePath(): string {
    return this.path;
  }
}
