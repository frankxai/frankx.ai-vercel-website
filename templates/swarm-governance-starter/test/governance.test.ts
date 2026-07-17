/**
 * The proof suite. What it demonstrates:
 *  - IAM is deny-by-default: no config, unknown role, unlisted tool,
 *    out-of-scope path, denied path, and global-deny path all deny.
 *  - Every escalation branch, including the fail-closed defaults: null
 *    action, unknown kind, spend without a cap verdict.
 *  - The ledger is append-only and a failed write throws (so callers deny).
 *  - The guard client fails closed at the MCP boundary (mocked — the sibling
 *    server is never required) and the local caps fallback enforces
 *    per-transaction + currency, failing closed on bad policy files.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { can, loadIam, spendFloor, globToRegExp, type IamConfig } from "../src/iam.js";
import { classify } from "../src/escalate.js";
import { DecisionLedger } from "../src/ledger.js";
import {
  guardSpendCheck,
  localSpendCheck,
  parseCapResult,
  type ToolCaller,
} from "../src/guard-client.js";
import { stricter, type Action } from "../src/types.js";

const iam: IamConfig = {
  version: "1",
  profiles: {
    "research-worker": {
      allowedTools: ["read_file", "search"],
      allowedPaths: ["research/**", "content/**"],
      deniedPaths: [],
      maxSpendTier: "none",
    },
    "ops-worker": {
      allowedTools: ["run_command", "write_file"],
      allowedPaths: ["scripts/**"],
      deniedPaths: ["scripts/deploy/**"],
      maxSpendTier: "coordinator-approval",
    },
    "cautious-spender": {
      allowedTools: [],
      allowedPaths: [],
      deniedPaths: [],
      maxSpendTier: "human-approval",
    },
  },
  globalDeny: { paths: [".env*", "**/secrets/**"] },
};

function spendAction(overrides: Partial<Action> = {}): Action {
  return {
    kind: "spend",
    role: "ops-worker",
    stream: "infra",
    amount: 10,
    currency: "EUR",
    description: "test spend",
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// IAM — deny by default
// ---------------------------------------------------------------------------

test("iam: no config loaded denies everything", () => {
  assert.equal(can(null, "research-worker", "read_file", "research/a.md").allowed, false);
  assert.equal(can(undefined, "research-worker", "read_file").allowed, false);
});

test("iam: unknown role denies", () => {
  const d = can(iam, "ghost-role", "read_file", "research/a.md");
  assert.equal(d.allowed, false);
  assert.match(d.reason, /unknown role/);
});

test("iam: tool not explicitly allowed denies", () => {
  const d = can(iam, "research-worker", "write_file", "research/a.md");
  assert.equal(d.allowed, false);
  assert.match(d.reason, /not in allowedTools/);
});

test("iam: allowed tool on in-scope path allows", () => {
  assert.equal(can(iam, "research-worker", "read_file", "research/notes/a.md").allowed, true);
  assert.equal(can(iam, "research-worker", "search").allowed, true); // pathless tool
});

test("iam: path outside allowed globs denies", () => {
  const d = can(iam, "research-worker", "read_file", "lib/payments/stripe.ts");
  assert.equal(d.allowed, false);
  assert.match(d.reason, /outside/);
});

test("iam: deniedPaths overrides allowedPaths", () => {
  assert.equal(can(iam, "ops-worker", "write_file", "scripts/build.sh").allowed, true);
  const d = can(iam, "ops-worker", "write_file", "scripts/deploy/prod.sh");
  assert.equal(d.allowed, false);
  assert.match(d.reason, /denied for role/);
});

test("iam: global deny beats every profile", () => {
  for (const path of [".env", "config/.env.local", "app/secrets/key.txt"]) {
    const d = can(iam, "research-worker", "read_file", path);
    assert.equal(d.allowed, false, `expected deny for ${path}`);
    assert.match(d.reason, /global deny/);
  }
});

test("iam: spendFloor is deny for 'none', missing role, or missing config", () => {
  assert.equal(spendFloor(iam, "research-worker"), "deny");
  assert.equal(spendFloor(iam, "ghost-role"), "deny");
  assert.equal(spendFloor(null, "ops-worker"), "deny");
  assert.equal(spendFloor(iam, "ops-worker"), "coordinator-approval");
  assert.equal(spendFloor(iam, "cautious-spender"), "human-approval");
});

test("iam: loadIam parses the shipped iam.json and throws on bad files", () => {
  const shipped = loadIam("iam.json"); // npm test runs from the package root
  assert.ok(shipped.profiles["coordinator"]);
  assert.throws(() => loadIam(join(tmpdir(), "does-not-exist-iam.json")));
  const dir = mkdtempSync(join(tmpdir(), "sgs-iam-"));
  const bad = join(dir, "iam.json");
  writeFileSync(bad, "{ not json");
  assert.throws(() => loadIam(bad));
  writeFileSync(bad, JSON.stringify({ version: "1", profiles: { x: {} } })); // missing required fields
  assert.throws(() => loadIam(bad));
});

test("iam: glob matching handles ** and * and basename patterns", () => {
  assert.equal(globToRegExp("content/**").test("content/a/b.md"), true);
  assert.equal(globToRegExp("content/**").test("lib/a.ts"), false);
  assert.equal(globToRegExp("*.pem").test("server.pem"), true);
  assert.equal(globToRegExp("*.pem").test("server.pem.md"), false);
});

// ---------------------------------------------------------------------------
// Escalation — every branch, fail-closed defaults included
// ---------------------------------------------------------------------------

test("escalate: null/undefined action fails closed to human-approval", () => {
  assert.equal(classify(null).tier, "human-approval");
  assert.equal(classify(undefined).tier, "human-approval");
});

test("escalate: unknown action kind fails closed to human-approval", () => {
  const c = classify({ ...spendAction(), kind: "deploy-to-prod" as Action["kind"] });
  assert.equal(c.tier, "human-approval");
  assert.match(c.reason, /unknown action kind/);
});

test("escalate: delete, send, config-change always reach the human", () => {
  for (const kind of ["delete", "send", "config-change"] as const) {
    assert.equal(classify({ ...spendAction(), kind, amount: undefined }).tier, "human-approval");
  }
});

test("escalate: the irreversible flag forces human-approval on any kind", () => {
  const c = classify({ kind: "draft", role: "r", stream: "s", description: "d", irreversible: true });
  assert.equal(c.tier, "human-approval");
});

test("escalate: spend with no cap verdict fails closed to human-approval", () => {
  const c = classify(spendAction());
  assert.equal(c.tier, "human-approval");
  assert.match(c.reason, /no cap-check verdict/);
});

test("escalate: rejected or over-cap spend goes to human-approval", () => {
  for (const verdict of ["reject", "escalate"] as const) {
    const c = classify(spendAction(), {
      capCheck: { verdict, reason: "test", source: "local-caps" },
    });
    assert.equal(c.tier, "human-approval");
  }
});

test("escalate: within-cap spend needs the coordinator — never autonomous", () => {
  const c = classify(spendAction(), {
    capCheck: { verdict: "within-cap", reason: "test", source: "local-caps" },
  });
  assert.equal(c.tier, "coordinator-approval");
});

test("escalate: a role's spend floor can raise the tier, never lower it", () => {
  const within = { capCheck: { verdict: "within-cap" as const, reason: "t", source: "local-caps" as const } };
  const raised = classify(spendAction(), { ...within, spendTierFloor: "human-approval" });
  assert.equal(raised.tier, "human-approval");
  const notLowered = classify(spendAction(), { ...within, spendTierFloor: "autonomous" });
  assert.equal(notLowered.tier, "coordinator-approval");
});

test("escalate: publish needs the coordinator; read/draft/tool-call are autonomous", () => {
  assert.equal(classify({ kind: "publish", role: "r", stream: "s", description: "d" }).tier, "coordinator-approval");
  for (const kind of ["read", "draft", "tool-call"] as const) {
    assert.equal(classify({ kind, role: "r", stream: "s", description: "d" }).tier, "autonomous");
  }
});

test("types: stricter() picks the graver tier in both directions", () => {
  assert.equal(stricter("autonomous", "human-approval"), "human-approval");
  assert.equal(stricter("human-approval", "autonomous"), "human-approval");
  assert.equal(stricter("coordinator-approval", "coordinator-approval"), "coordinator-approval");
});

// ---------------------------------------------------------------------------
// Ledger — append-only, failed write throws
// ---------------------------------------------------------------------------

test("ledger: appends persist to JSONL and survive reload", () => {
  const dir = mkdtempSync(join(tmpdir(), "sgs-ledger-"));
  const path = join(dir, "decisions.jsonl");
  const ledger = new DecisionLedger(path);
  ledger.append({
    actor: "ops-worker",
    kind: "spend",
    description: "test",
    tier: "coordinator-approval",
    outcome: "pending-coordinator-approval",
    reason: "within cap",
    gates: ["escalate.classify"],
  });
  assert.equal(ledger.size(), 1);
  const reloaded = new DecisionLedger(path);
  assert.equal(reloaded.size(), 1);
  assert.equal(reloaded.all()[0]?.actor, "ops-worker");
});

test("ledger: a malformed entry throws (fail closed)", () => {
  const dir = mkdtempSync(join(tmpdir(), "sgs-ledger-"));
  const ledger = new DecisionLedger(join(dir, "decisions.jsonl"));
  assert.throws(() =>
    ledger.append({ actor: "", kind: "spend", description: "d", outcome: "denied", reason: "r", gates: [] }),
  );
  assert.equal(ledger.size(), 0);
});

test("ledger: a failed disk write throws and mirrors nothing", () => {
  const dir = mkdtempSync(join(tmpdir(), "sgs-ledger-"));
  const asDirectory = join(dir, "decisions.jsonl");
  mkdirSync(asDirectory); // the ledger path is a directory → append must fail
  const ledger = new DecisionLedger(asDirectory);
  assert.throws(() =>
    ledger.append({ actor: "a", kind: "read", description: "d", outcome: "execute", reason: "r", gates: [] }),
  );
  assert.equal(ledger.size(), 0);
});

// ---------------------------------------------------------------------------
// Guard client — mocked MCP boundary + local caps fallback
// ---------------------------------------------------------------------------

test("guard-client: parseCapResult fails closed on garbage", () => {
  assert.equal(parseCapResult(null).verdict, "reject");
  assert.equal(parseCapResult("nope").verdict, "reject");
  assert.equal(parseCapResult({ isError: true, structuredContent: { verdict: "within-cap" } }).verdict, "reject");
  assert.equal(parseCapResult({ structuredContent: { verdict: "approve-everything" } }).verdict, "reject");
  assert.equal(parseCapResult({ structuredContent: {} }).verdict, "reject");
});

test("guard-client: parseCapResult passes through the three real verdicts", () => {
  for (const verdict of ["within-cap", "escalate", "reject"] as const) {
    const parsed = parseCapResult({ structuredContent: { verdict, reason: "because" } });
    assert.equal(parsed.verdict, verdict);
    assert.equal(parsed.reason, "because");
  }
});

test("guard-client: a healthy guard round-trip carries the verdict through", async () => {
  const calls: Array<{ name: string; args: Record<string, unknown> }> = [];
  const caller: ToolCaller = async (name, args) => {
    calls.push({ name, args });
    return { structuredContent: { verdict: "escalate", reason: "over cap" } };
  };
  const check = await guardSpendCheck(caller).check("infra", 250, "EUR");
  assert.deepEqual(check, { verdict: "escalate", reason: "over cap", source: "guard-mcp" });
  assert.equal(calls[0]?.name, "check_spend_cap");
  const charge = calls[0]?.args["charge"] as Record<string, unknown>;
  assert.equal(charge["amount"], 250);
  assert.equal(charge["stream"], "infra");
});

test("guard-client: a throwing guard resolves to reject, never a pass", async () => {
  const caller: ToolCaller = async () => {
    throw new Error("transport down");
  };
  const check = await guardSpendCheck(caller).check("infra", 10, "EUR");
  assert.equal(check.verdict, "reject");
  assert.match(check.reason, /failing closed/);
});

test("guard-client: missing amount rejects before the guard is even called", async () => {
  let called = false;
  const caller: ToolCaller = async () => {
    called = true;
    return {};
  };
  const spendCheck = guardSpendCheck(caller);
  assert.equal((await spendCheck.check("infra", undefined, "EUR")).verdict, "reject");
  assert.equal((await spendCheck.check("infra", NaN, "EUR")).verdict, "reject");
  assert.equal((await spendCheck.check("infra", -5, "EUR")).verdict, "reject");
  assert.equal((await spendCheck.check("infra", 10, undefined)).verdict, "reject");
  assert.equal(called, false);
});

function writeCaps(contents: unknown): string {
  const dir = mkdtempSync(join(tmpdir(), "sgs-caps-"));
  const path = join(dir, "caps.json");
  writeFileSync(path, typeof contents === "string" ? contents : JSON.stringify(contents));
  return path;
}

const caps = {
  streams: {
    default: { per_transaction: 25, per_day: 100, currency: "EUR" },
    infra: { per_transaction: 100, per_day: 400, currency: "EUR" },
  },
};

test("local caps: within-cap, over-cap, and currency mismatch", async () => {
  const check = localSpendCheck(writeCaps(caps));
  assert.equal((await check.check("infra", 30, "EUR")).verdict, "within-cap");
  assert.equal((await check.check("infra", 250, "EUR")).verdict, "escalate");
  assert.equal((await check.check("infra", 30, "USD")).verdict, "reject");
});

test("local caps: unknown stream falls back to default; no default escalates", async () => {
  const withDefault = localSpendCheck(writeCaps(caps));
  assert.equal((await withDefault.check("mystery", 10, "EUR")).verdict, "within-cap");
  assert.equal((await withDefault.check("mystery", 30, "EUR")).verdict, "escalate"); // default cap is 25
  const noDefault = localSpendCheck(
    writeCaps({ streams: { infra: caps.streams.infra } }),
  );
  assert.equal((await noDefault.check("mystery", 10, "EUR")).verdict, "escalate");
});

test("local caps: missing or malformed caps file rejects everything", async () => {
  const missing = localSpendCheck(join(tmpdir(), "no-such-caps.json"));
  assert.equal((await missing.check("infra", 10, "EUR")).verdict, "reject");
  const malformed = localSpendCheck(writeCaps("{ not json"));
  assert.equal((await malformed.check("infra", 10, "EUR")).verdict, "reject");
  const wrongShape = localSpendCheck(writeCaps({ streams: { infra: { per_transaction: -1 } } }));
  assert.equal((await wrongShape.check("infra", 10, "EUR")).verdict, "reject");
});

test("local caps: the shipped swarm.example.json doubles as a valid caps file", async () => {
  const check = localSpendCheck("swarm.example.json"); // npm test runs from the package root
  assert.equal((await check.check("content", 40, "EUR")).verdict, "within-cap");
  assert.equal((await check.check("content", 60, "EUR")).verdict, "escalate");
});
