/**
 * Dry run: walk six scripted actions through the full governance ladder —
 * IAM → spend-cap check → escalation classifier → decision ledger — and print
 * a readable trace. No LLM calls, no network, no side effects beyond the
 * ledger file in .governance/.
 *
 * This file is also the reference for wiring the harness into a real agent
 * loop: `govern()` is the call your loop makes before executing any tool.
 */

import { classify, type EscalationContext } from "./escalate.js";
import { can, loadIam, spendFloor, type IamConfig } from "./iam.js";
import { DecisionLedger } from "./ledger.js";
import { createSpendCheck, type SpendCheck } from "./guard-client.js";
import type { Action, Verdict } from "./types.js";

interface Harness {
  iam: IamConfig | null;
  spendCheck: SpendCheck;
  ledger: DecisionLedger;
}

/**
 * govern() — the whole ladder for one proposed action. Ordering matters:
 *  1. IAM (deny-by-default): out-of-scope tools/paths and forbidden spend
 *     never reach classification.
 *  2. Cap check (spend only): guard MCP when configured, local caps otherwise.
 *  3. classify(): the escalation tier, fail-closed.
 *  4. Ledger: the decision is recorded BEFORE it is returned. A failed write
 *     denies the action — an unrecordable decision must not proceed.
 */
export async function govern(harness: Harness, action: Action): Promise<Verdict> {
  const gates: string[] = [];

  // 1. IAM — deny by default.
  if (action.kind === "tool-call") {
    gates.push("iam.can");
    const decision = can(harness.iam, action.role, action.tool ?? "", action.path);
    if (!decision.allowed) {
      return record(harness, action, { outcome: "denied", reason: `IAM: ${decision.reason}`, gates });
    }
  }
  const ctx: EscalationContext = {};
  if (action.kind === "spend") {
    gates.push("iam.spendFloor");
    const floor = spendFloor(harness.iam, action.role);
    if (floor === "deny") {
      return record(harness, action, {
        outcome: "denied",
        reason: `IAM: role '${action.role}' may not propose spend (maxSpendTier: none)`,
        gates,
      });
    }
    ctx.spendTierFloor = floor;

    // 2. Cap check — guard MCP or local caps, both fail-closed.
    gates.push("spend.checkCap");
    ctx.capCheck = await harness.spendCheck.check(action.stream, action.amount, action.currency);
  }

  // 3. Escalation — fail-closed classification.
  gates.push("escalate.classify");
  const cls = classify(action, ctx);
  const outcome: Verdict["outcome"] =
    cls.tier === "autonomous"
      ? "execute"
      : cls.tier === "coordinator-approval"
        ? "pending-coordinator-approval"
        : "pending-human-approval";

  // 4. Ledger — no decision without a record.
  return record(harness, action, { outcome, tier: cls.tier, reason: cls.reason, gates });
}

/** Append the verdict to the ledger; a failed write downgrades it to denied. */
function record(harness: Harness, action: Action, verdict: Verdict): Verdict {
  try {
    harness.ledger.append({
      actor: action.role,
      kind: String(action.kind),
      description: action.description,
      tier: verdict.tier,
      outcome: verdict.outcome,
      reason: verdict.reason,
      gates: [...verdict.gates, "ledger.append"],
    });
  } catch (err) {
    return {
      outcome: "denied",
      reason: `ledger write failed — no decision without a record: ${(err as Error).message}`,
      gates: [...verdict.gates, "ledger.append"],
    };
  }
  return { ...verdict, gates: [...verdict.gates, "ledger.append"] };
}

// ---------------------------------------------------------------------------
// The scripted walk
// ---------------------------------------------------------------------------

const OUTCOME_LABEL: Record<Verdict["outcome"], string> = {
  execute: "EXECUTE — autonomous, would run now",
  "pending-coordinator-approval": "PENDING — coordinator must approve",
  "pending-human-approval": "PENDING — human must approve",
  denied: "DENIED — never reaches execution",
};

async function main(): Promise<void> {
  const { backend, spendCheck } = await createSpendCheck();
  const harness: Harness = {
    iam: safeLoadIam("./iam.json"),
    spendCheck,
    ledger: new DecisionLedger("./.governance/decisions.jsonl"),
  };

  console.log("swarm-governance-starter — dry run");
  console.log(`spend-cap backend: ${backend}${backend === "local-caps" ? " (set GUARD_MCP_COMMAND to use agent-payments-guard)" : ""}`);
  console.log(`iam: ${harness.iam ? "loaded (deny-by-default)" : "FAILED TO LOAD — every IAM check denies"}`);

  const actions: Action[] = [
    {
      kind: "tool-call",
      role: "research-worker",
      stream: "content",
      tool: "read_file",
      path: "research/competitor-notes.md",
      description: "read competitor notes for the weekly brief",
    },
    {
      kind: "tool-call",
      role: "content-worker",
      stream: "content",
      tool: "write_file",
      path: "lib/payments/stripe.ts",
      description: "edit payment code (out of scope for a content role)",
    },
    {
      kind: "spend",
      role: "ops-worker",
      stream: "infra",
      amount: 30,
      currency: "EUR",
      description: "renew the search-index add-on (30 EUR)",
    },
    {
      kind: "spend",
      role: "ops-worker",
      stream: "infra",
      amount: 250,
      currency: "EUR",
      description: "upgrade the database plan (250 EUR — over the 100 EUR cap)",
    },
    {
      kind: "send",
      role: "content-worker",
      stream: "content",
      description: "send the weekly newsletter to the full list",
    },
    // An action kind the ladder does not know. The `as` cast simulates a
    // caller feeding the harness something outside the contract.
    {
      kind: "deploy-to-prod" as Action["kind"],
      role: "ops-worker",
      stream: "infra",
      description: "deploy current branch to production (unknown kind)",
    },
  ];

  for (const [i, action] of actions.entries()) {
    const verdict = await govern(harness, action);
    console.log(`\n${i + 1}. [${action.role}] ${action.kind}: ${action.description}`);
    console.log(`   gates:   ${verdict.gates.join(" → ")}`);
    console.log(`   verdict: ${OUTCOME_LABEL[verdict.outcome]}`);
    console.log(`   reason:  ${verdict.reason}`);
  }

  console.log(`\nledger: ${harness.ledger.size()} decision(s) on record at ${harness.ledger.filePath()}`);
  console.log("No action was executed. This harness classifies and records; your agent loop executes.");
  await spendCheck.close();
}

function safeLoadIam(path: string): IamConfig | null {
  try {
    return loadIam(path);
  } catch {
    return null; // can() denies everything when handed no IAM — fail closed
  }
}

main().catch((err) => {
  console.error("dry-run failed:", err);
  process.exitCode = 1;
});
