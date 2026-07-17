/**
 * The four verify-only tools. There is NO transfer/pay/settle/move_funds tool —
 * none exists, by design. This surface produces verdicts and pending-approval
 * objects; humans approve capital.
 *
 * ⚠️ UNAUDITED reference implementation. NOT FOR LIVE FUNDS.
 *
 * Audit-first: verify_mandate, check_spend_cap, and require_human_approval each
 * write their own audit entry before returning. If that write fails, the
 * verdict is withheld and the tool returns an error result — an unloggable
 * decision must not proceed. In check_spend_cap the audit entry lands BEFORE
 * the mandate is consumed, so no spend is ever recorded without a prior entry.
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { randomUUID } from "node:crypto";
import { z } from "zod";

import { verifyMandate, type Charge, type Mandate } from "./mandate.js";
import { capsForStream, loadCaps, type CapResult, type SpendLedger } from "./caps.js";
import type { AuditLog } from "./audit.js";

export interface GuardDeps {
  ledger: SpendLedger;
  audit: AuditLog;
  /** Path to the operator-owned caps.json. Never supplied by the calling agent. */
  capsPath: string;
}

/** A pending-approval object. NEVER carries `approved: true` — humans resolve it. */
export interface PendingApproval {
  pendingApprovalId: string;
  status: "pending-human-approval";
  reason: string;
  charge: Charge;
  createdAt: number;
}

// ---- Zod schemas (input validation is itself a fail-closed gate) ----

const mandateSchema = z.object({
  mandateId: z.string().min(1).max(100),
  subject: z.string().min(1).max(256),
  amount: z.number().positive(),
  currency: z.string().min(1).max(10),
  expiresAt: z.number().int(),
  issuerKeyId: z.string().min(1).max(100),
  signature: z.string().min(1).max(256),
});

const chargeSchema = z.object({
  mandateId: z.string().min(1).max(100),
  amount: z.number().positive(),
  currency: z.string().min(1).max(10),
  stream: z.string().min(1).max(100),
});

function textResult(text: string, structured: Record<string, unknown>) {
  return {
    content: [{ type: "text" as const, text }],
    structuredContent: structured,
  };
}

/** The fail-closed error result for a failed audit write. */
function auditFailure(err: unknown) {
  const message = (err as Error).message;
  return {
    content: [
      {
        type: "text" as const,
        text: `AUDIT WRITE FAILED — verdict withheld, action must not proceed: ${message}`,
      },
    ],
    structuredContent: { recorded: false, error: message },
    isError: true,
  };
}

export function registerGuardTools(server: McpServer, deps: GuardDeps): void {
  server.registerTool(
    "verify_mandate",
    {
      title: "Verify Mandate",
      description:
        "Verify a signed AP2-style mandate against a proposed charge. FAILS CLOSED: " +
        "rejects unsigned, forged, expired, amount-mismatched, already-consumed, or " +
        "malformed mandates. Writes its own audit entry; if that write fails, the " +
        "verdict is withheld. Does not move money.",
      inputSchema: { mandate: mandateSchema, charge: chargeSchema },
      // Not readOnly: the tool appends to the audit log. Never destructive.
      annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
    },
    async ({ mandate, charge }) => {
      const result = verifyMandate(mandate as Mandate, charge as Charge, {
        isConsumed: (id) => deps.ledger.isConsumed(id),
      });
      try {
        deps.audit.append({
          action: "verify_mandate",
          mandateId: mandate.mandateId,
          amount: charge.amount,
          currency: charge.currency,
          verdict: result.verdict,
          reason: result.reason,
        });
      } catch (err) {
        return auditFailure(err);
      }
      return textResult(`${result.verdict.toUpperCase()}: ${result.reason}`, { ...result });
    },
  );

  server.registerTool(
    "check_spend_cap",
    {
      title: "Check Spend Cap",
      description:
        "Check a charge against the operator's per-transaction / per-day caps " +
        "(loaded from caps.json — the caller can never supply caps) and the " +
        "single-use replay guard. Over any cap → 'escalate' (NEVER auto-approve). " +
        "Replayed mandate, currency mismatch, or unreadable caps file → 'reject'. " +
        "The audit entry is written before the mandate is consumed; a failed write " +
        "withholds the verdict and consumes nothing. Does not move money.",
      inputSchema: { charge: chargeSchema },
      annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
    },
    async ({ charge }) => {
      let result: CapResult;
      try {
        const config = loadCaps(deps.capsPath);
        const caps = capsForStream(config, charge.stream);
        result = caps
          ? deps.ledger.check(charge as Charge, caps)
          : {
              verdict: "escalate",
              reason:
                `no cap configured for stream '${charge.stream}' (and no 'default' entry) — ` +
                `human decision required`,
            };
      } catch (err) {
        // Missing/malformed caps file: fail closed, reject everything.
        result = {
          verdict: "reject",
          reason: `caps config unreadable or invalid — failing closed: ${(err as Error).message}`,
        };
      }

      // Audit-first: the durable record lands BEFORE the mandate is consumed.
      try {
        deps.audit.append({
          action: "check_spend_cap",
          mandateId: charge.mandateId,
          amount: charge.amount,
          currency: charge.currency,
          verdict: result.verdict,
          reason: result.reason,
        });
      } catch (err) {
        return auditFailure(err); // and do NOT commit — nothing was consumed
      }

      // Consume the mandate only on a clean within-cap verdict (single-use).
      if (result.verdict === "within-cap") {
        deps.ledger.commit(charge as Charge);
      }
      return textResult(`${result.verdict.toUpperCase()}: ${result.reason}`, { ...result });
    },
  );

  server.registerTool(
    "record_audit_entry",
    {
      title: "Record Audit Entry",
      description:
        "Append an entry to the append-only audit log (e.g. the human's out-of-band " +
        "decision, or a settlement note from a downstream rail). A failed write fails " +
        "the action. Entries are never edited or deleted.",
      inputSchema: {
        action: z.string().min(1).describe("What happened, e.g. 'human_approved'"),
        mandateId: z.string().optional(),
        amount: z.number().optional(),
        currency: z.string().optional(),
        verdict: z.enum(["verified", "reject", "within-cap", "escalate"]).optional(),
        reason: z.string().optional(),
        actor: z.string().optional(),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
    },
    async (args) => {
      try {
        const entry = deps.audit.append(args);
        return textResult(`recorded audit entry #${deps.audit.size()} (${entry.action})`, {
          recorded: true,
          entry: { ...entry },
        });
      } catch (err) {
        return auditFailure(err);
      }
    },
  );

  server.registerTool(
    "require_human_approval",
    {
      title: "Require Human Approval",
      description:
        "Escalate a charge to the human gate. Returns a PENDING-approval object. " +
        "NEVER auto-approves — a human resolves it out of band. Use for over-cap " +
        "spend, a new rail, a new vendor, or any irreversible action.",
      inputSchema: { charge: chargeSchema, reason: z.string().min(1) },
      annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
    },
    async ({ charge, reason }) => {
      const pending: PendingApproval = {
        pendingApprovalId: `pa_${randomUUID()}`,
        status: "pending-human-approval",
        reason,
        charge: charge as Charge,
        createdAt: Date.now(),
      };
      try {
        deps.audit.append({
          action: "require_human_approval",
          mandateId: charge.mandateId,
          amount: charge.amount,
          currency: charge.currency,
          reason,
        });
      } catch (err) {
        return auditFailure(err);
      }
      return textResult(`ESCALATED to human gate: ${pending.pendingApprovalId} (${reason})`, {
        ...pending,
      });
    },
  );
}
