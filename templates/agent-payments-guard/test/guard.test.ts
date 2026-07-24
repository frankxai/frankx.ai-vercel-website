/**
 * Guard tests — the load-bearing proof that the gate FAILS CLOSED.
 *
 * Unit tests hit the verify pipeline / ledger / audit log directly. E2E tests
 * start the real server in-process and drive it through an MCP SDK client over
 * an InMemoryTransport pair — including the defining invariant: exactly four
 * verify-only tools exist, and none of them can move money.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";

import { buildServer } from "../src/index.js";
import { signMandate, verifyMandate, type Charge, type Mandate } from "../src/mandate.js";
import { SpendLedger, type StreamCaps } from "../src/caps.js";
import { AuditLog } from "../src/audit.js";

const NOW = 1_750_000_000_000; // fixed clock for deterministic unit tests
const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

const CAPS_FIXTURE = {
  streams: {
    payments: { per_transaction: 500, per_day: 1000, currency: "EUR" },
    default: { per_transaction: 25, per_day: 100, currency: "EUR" },
  },
};

const STREAM_CAPS: StreamCaps = CAPS_FIXTURE.streams.payments;

function tmpDir(prefix: string): string {
  return mkdtempSync(join(tmpdir(), prefix));
}

/** Mint a genuine Ed25519 mandate against the dev key. */
function devMandate(overrides: Partial<Mandate> = {}): Mandate {
  const base: Omit<Mandate, "signature"> = {
    mandateId: `m_${Math.random().toString(36).slice(2)}`,
    subject: "stream:payments",
    amount: 49.0,
    currency: "EUR",
    expiresAt: Date.now() + HOUR,
    issuerKeyId: "k_dev",
    ...overrides,
  };
  return { ...base, signature: signMandate(base) };
}

function chargeFor(m: Mandate, overrides: Partial<Charge> = {}): Charge {
  return {
    mandateId: m.mandateId,
    amount: m.amount,
    currency: m.currency,
    stream: "payments",
    ...overrides,
  };
}

/** Connect a fresh in-process client+server pair against a temp data dir. */
async function connect(opts: { capsRaw?: string } = {}): Promise<{
  client: Client;
  dir: string;
  close: () => Promise<void>;
}> {
  const dir = tmpDir("guard-e2e-");
  const capsPath = join(dir, "caps.json");
  writeFileSync(capsPath, opts.capsRaw ?? JSON.stringify(CAPS_FIXTURE));
  const server = buildServer({
    capsPath,
    auditPath: join(dir, "audit.jsonl"),
    ledgerPath: join(dir, "ledger.jsonl"),
  });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const client = new Client({ name: "guard-test", version: "0.1.0" });
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  return {
    client,
    dir,
    close: async () => {
      await client.close();
      await server.close();
      rmSync(dir, { recursive: true, force: true });
    },
  };
}

/** Pull the structured verdict out of a callTool result. */
function verdictOf(result: unknown): string {
  const sc = (result as { structuredContent?: { verdict?: string } }).structuredContent;
  assert.ok(sc, "expected structuredContent on the tool result");
  return String(sc.verdict);
}

// ---------------------------------------------------------------------------
// The defining invariant.
// ---------------------------------------------------------------------------

test("E2E: exactly the 4 verify-only tools exist; NONE moves money", async () => {
  const { client, close } = await connect();
  try {
    const { tools } = await client.listTools();
    const names = tools.map((t) => t.name).sort();
    assert.deepEqual(names, [
      "check_spend_cap",
      "record_audit_entry",
      "require_human_approval",
      "verify_mandate",
    ]);
    // No settlement surface exists — no tool name even hints at moving money.
    const forbidden = /transfer|pay|settle|move|send|withdraw|disburse|payout/i;
    for (const n of names) {
      assert.ok(!forbidden.test(n), `forbidden money-movement tool exposed: ${n}`);
    }
  } finally {
    await close();
  }
});

// ---------------------------------------------------------------------------
// verify_mandate — "was this authorized?"
// ---------------------------------------------------------------------------

test("E2E: a valid Ed25519 mandate → verified", async () => {
  const { client, close } = await connect();
  try {
    const m = devMandate();
    const res = await client.callTool({
      name: "verify_mandate",
      arguments: { mandate: m, charge: chargeFor(m) },
    });
    assert.equal(verdictOf(res), "verified");
  } finally {
    await close();
  }
});

test("E2E: a FORGED signature → reject", async () => {
  const { client, close } = await connect();
  try {
    const m = devMandate();
    const forged: Mandate = { ...m, signature: Buffer.alloc(64, 9).toString("base64") };
    const res = await client.callTool({
      name: "verify_mandate",
      arguments: { mandate: forged, charge: chargeFor(forged) },
    });
    assert.equal(verdictOf(res), "reject");
  } finally {
    await close();
  }
});

test("unit: a TAMPERED amount (signature no longer matches) → reject", () => {
  const m = devMandate({ expiresAt: NOW + HOUR });
  const tampered: Mandate = { ...m, amount: 4900.0 }; // bumped amount, original signature
  const r = verifyMandate(tampered, chargeFor(tampered), { now: NOW });
  assert.equal(r.verdict, "reject");
  assert.match(r.reason, /signature invalid/);
});

test("unit: an EXPIRED mandate → reject", () => {
  const m = devMandate({ expiresAt: NOW - HOUR });
  const r = verifyMandate(m, chargeFor(m), { now: NOW });
  assert.equal(r.verdict, "reject");
  assert.match(r.reason, /expired/);
});

test("unit: an AMOUNT-MISMATCHED charge → reject", () => {
  const m = devMandate({ expiresAt: NOW + HOUR }); // authorizes 49.00 EUR
  const r = verifyMandate(m, chargeFor(m, { amount: 490.0 }), { now: NOW });
  assert.equal(r.verdict, "reject");
  assert.match(r.reason, /amount mismatch/);
});

test("unit: a CURRENCY-MISMATCHED charge → reject", () => {
  const m = devMandate({ expiresAt: NOW + HOUR });
  const r = verifyMandate(m, chargeFor(m, { currency: "USD" }), { now: NOW });
  assert.equal(r.verdict, "reject");
  assert.match(r.reason, /currency mismatch/);
});

test("unit: an UNSIGNED mandate → reject (missing signature is never a pass)", () => {
  const m = devMandate({ expiresAt: NOW + HOUR });
  const unsigned = { ...m, signature: "" } as Mandate;
  const r = verifyMandate(unsigned, chargeFor(unsigned), { now: NOW });
  assert.equal(r.verdict, "reject");
  assert.match(r.reason, /malformed/);
});

// ---------------------------------------------------------------------------
// check_spend_cap — "is it within cap?" (caps come from caps.json, never input)
// ---------------------------------------------------------------------------

test("E2E: an over-cap charge → escalate (never auto-approved)", async () => {
  const { client, close } = await connect();
  try {
    const res = await client.callTool({
      name: "check_spend_cap",
      arguments: {
        charge: { mandateId: "m_overcap", amount: 5000, currency: "EUR", stream: "payments" },
      },
    });
    assert.equal(verdictOf(res), "escalate");
  } finally {
    await close();
  }
});

test("E2E: a REPLAYED mandate → reject on BOTH tools", async () => {
  const { client, close } = await connect();
  try {
    const m = devMandate({ amount: 100 });
    const charge = chargeFor(m);

    // First spend consumes the mandate (within cap).
    const first = await client.callTool({ name: "check_spend_cap", arguments: { charge } });
    assert.equal(verdictOf(first), "within-cap");

    // Replay of the same mandate id through the cap check → reject.
    const replay = await client.callTool({ name: "check_spend_cap", arguments: { charge } });
    assert.equal(verdictOf(replay), "reject");

    // And a re-verify of the consumed mandate → reject too (single-use gate).
    const reverify = await client.callTool({
      name: "verify_mandate",
      arguments: { mandate: m, charge },
    });
    assert.equal(verdictOf(reverify), "reject");
  } finally {
    await close();
  }
});

test("unit: per-day accumulation → escalate on the charge that breaks the cap", () => {
  const dir = tmpDir("guard-day-");
  try {
    const ledger = new SpendLedger(join(dir, "ledger.jsonl"));
    // Three 400s = 1200 on the day; first two commit, third breaks the 1000 daily cap.
    ledger.commit({ mandateId: "d1", amount: 400, currency: "EUR", stream: "payments" }, NOW);
    ledger.commit({ mandateId: "d2", amount: 400, currency: "EUR", stream: "payments" }, NOW);
    const r = ledger.check(
      { mandateId: "d3", amount: 400, currency: "EUR", stream: "payments" },
      STREAM_CAPS,
      NOW,
    );
    assert.equal(r.verdict, "escalate");
    assert.match(r.reason, /over per-day cap/);
    // A day later the window has moved on: the same charge is within cap again.
    const nextDay = ledger.check(
      { mandateId: "d4", amount: 400, currency: "EUR", stream: "payments" },
      STREAM_CAPS,
      NOW + DAY + 1,
    );
    assert.equal(nextDay.verdict, "within-cap");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("unit: a charge in the wrong currency for the stream's caps → reject", () => {
  const dir = tmpDir("guard-ccy-");
  try {
    const ledger = new SpendLedger(join(dir, "ledger.jsonl"));
    const r = ledger.check(
      { mandateId: "c1", amount: 10, currency: "USD", stream: "payments" },
      STREAM_CAPS, // caps are EUR
      NOW,
    );
    assert.equal(r.verdict, "reject");
    assert.match(r.reason, /currency mismatch/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("E2E: a stream with no configured cap (and no default) → escalate", async () => {
  const { client, close } = await connect({
    capsRaw: JSON.stringify({
      streams: { payments: { per_transaction: 500, per_day: 1000, currency: "EUR" } },
    }),
  });
  try {
    const res = await client.callTool({
      name: "check_spend_cap",
      arguments: {
        charge: { mandateId: "m_nostream", amount: 10, currency: "EUR", stream: "unconfigured" },
      },
    });
    assert.equal(verdictOf(res), "escalate");
  } finally {
    await close();
  }
});

test("E2E: a malformed caps file → reject everything (fail closed)", async () => {
  const { client, close } = await connect({ capsRaw: "not json {{" });
  try {
    const res = await client.callTool({
      name: "check_spend_cap",
      arguments: {
        charge: { mandateId: "m_badcaps", amount: 10, currency: "EUR", stream: "payments" },
      },
    });
    assert.equal(verdictOf(res), "reject");
  } finally {
    await close();
  }
});

test("unit: DURABILITY — replay protection survives a restart (new ledger, same file)", () => {
  const dir = tmpDir("guard-durable-");
  try {
    const path = join(dir, "ledger.jsonl");
    const c: Charge = { mandateId: "m_persist", amount: 100, currency: "EUR", stream: "payments" };

    const first = new SpendLedger(path);
    assert.equal(first.check(c, STREAM_CAPS, NOW).verdict, "within-cap");
    first.commit(c, NOW); // durable consume

    // Simulate a restart: a brand-new instance loads the JSONL from disk.
    const restarted = new SpendLedger(path);
    assert.equal(restarted.isConsumed("m_persist"), true);
    const replay = restarted.check(c, STREAM_CAPS, NOW);
    assert.equal(replay.verdict, "reject");
    assert.match(replay.reason, /replay/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// require_human_approval — never auto-approves
// ---------------------------------------------------------------------------

test("E2E: require_human_approval returns a PENDING object, never approved", async () => {
  const { client, close } = await connect();
  try {
    const res = await client.callTool({
      name: "require_human_approval",
      arguments: {
        charge: { mandateId: "m_pa", amount: 5000, currency: "EUR", stream: "payments" },
        reason: "over per-transaction cap",
      },
    });
    const sc = (res as { structuredContent?: Record<string, unknown> }).structuredContent;
    assert.ok(sc);
    assert.equal(sc.status, "pending-human-approval");
    assert.equal((sc as { approved?: unknown }).approved, undefined);
  } finally {
    await close();
  }
});

// ---------------------------------------------------------------------------
// Audit — a failed write fails the action
// ---------------------------------------------------------------------------

test("unit: a failed audit write throws and mirrors NOTHING (fail closed)", () => {
  const dir = tmpDir("guard-audit-");
  try {
    const path = join(dir, "audit.jsonl");
    const log = new AuditLog(path);
    // Make the audit path unwritable: a directory where the file should be.
    mkdirSync(path);
    assert.throws(() => log.append({ action: "check_spend_cap" }));
    assert.equal(log.size(), 0); // no in-memory record for an unpersisted decision
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("unit: an audit entry with no action FAILS CLOSED (throws)", () => {
  const dir = tmpDir("guard-audit-action-");
  try {
    const log = new AuditLog(join(dir, "audit.jsonl"));
    // @ts-expect-error deliberately malformed to prove the guard throws
    assert.throws(() => log.append({ verdict: "verified" }), /missing action/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("E2E: audit-write failure → tool errors AND the mandate is NOT consumed", async () => {
  const dir = tmpDir("guard-audit-fail-");
  try {
    const capsPath = join(dir, "caps.json");
    writeFileSync(capsPath, JSON.stringify(CAPS_FIXTURE));
    const ledgerPath = join(dir, "ledger.jsonl");
    const auditPath = join(dir, "audit.jsonl");

    const server = buildServer({ capsPath, auditPath, ledgerPath });
    // Break the audit log AFTER construction: writes now hit a directory.
    mkdirSync(auditPath);

    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    const client = new Client({ name: "guard-test", version: "0.1.0" });
    await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);

    const charge = { mandateId: "m_auditfail", amount: 100, currency: "EUR", stream: "payments" };
    const res = await client.callTool({ name: "check_spend_cap", arguments: { charge } });
    assert.equal((res as { isError?: boolean }).isError, true); // verdict withheld

    await client.close();
    await server.close();

    // Same durable ledger, working audit log: the mandate must still be
    // spendable — the failed-audit call consumed nothing.
    const server2 = buildServer({ capsPath, auditPath: join(dir, "audit2.jsonl"), ledgerPath });
    const [ct2, st2] = InMemoryTransport.createLinkedPair();
    const client2 = new Client({ name: "guard-test-2", version: "0.1.0" });
    await Promise.all([server2.connect(st2), client2.connect(ct2)]);
    const retry = await client2.callTool({ name: "check_spend_cap", arguments: { charge } });
    assert.equal(verdictOf(retry), "within-cap");
    await client2.close();
    await server2.close();
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("E2E: record_audit_entry appends; a blank action FAILS CLOSED", async () => {
  const { client, close } = await connect();
  try {
    const ok = await client.callTool({
      name: "record_audit_entry",
      arguments: { action: "human_approved", reason: "operator approved pa_x out of band" },
    });
    assert.equal(
      (ok as { structuredContent?: { recorded?: boolean } }).structuredContent?.recorded,
      true,
    );
    const bad = await client.callTool({ name: "record_audit_entry", arguments: { action: "" } });
    assert.equal((bad as { isError?: boolean }).isError, true);
  } finally {
    await close();
  }
});
