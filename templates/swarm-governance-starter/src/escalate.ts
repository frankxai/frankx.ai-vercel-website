/**
 * escalate.ts — the safety spine. classify() routes every proposed action to
 * exactly one tier: autonomous / coordinator-approval / human-approval.
 *
 * The shape is ported (de-branded) from the escalation classifier in
 * github.com/frankxai/starlight-swarm: a pure function, evaluated top-down,
 * FIRST matching rule wins, hardest stop first. That ordering is the safety
 * property — irreversibility and money can never be downgraded by a more
 * permissive later rule.
 *
 * Fail-closed invariants (all tested):
 *  - a null/undefined/malformed action → human-approval
 *  - an unknown action kind → human-approval (unknown is never assumed safe)
 *  - a spend with no cap-check result → human-approval (money never rides on doubt)
 *  - a cap check that rejected, escalated, or errored → human-approval
 *  - a within-cap spend still needs the coordinator — money is never autonomous
 */

import type { Action, Classification, Tier } from "./types.js";
import { ACTION_KINDS, stricter } from "./types.js";
import type { CapCheck } from "./guard-client.js";

/** Kinds that always need a human, no matter what the flags say. */
const ALWAYS_HUMAN: readonly string[] = ["delete", "send", "config-change"];

/** Context classify() needs beyond the action itself. */
export interface EscalationContext {
  /**
   * Result of the spend-cap check (guard MCP or local caps). Required for
   * `spend` actions — absent means no verdict exists, which fails closed.
   */
  capCheck?: CapCheck;
  /**
   * The proposing role's spend floor from IAM (`spendFloor()`). When present,
   * a spend resolves to the stricter of the computed tier and this floor.
   */
  spendTierFloor?: Tier;
}

/** classify() — the single source of truth for "who decides". */
export function classify(action: Action | null | undefined, ctx: EscalationContext = {}): Classification {
  // A missing action fails closed to the highest tier. Never let nothing pass.
  if (!action || typeof action !== "object") {
    return {
      tier: "human-approval",
      reason: "invalid or missing action — failing closed to the highest tier",
    };
  }

  // An action kind the ladder does not know is never assumed safe.
  if (!(ACTION_KINDS as readonly string[]).includes(action.kind)) {
    return {
      tier: "human-approval",
      reason: `unknown action kind '${String(action.kind)}' — failing closed to human approval`,
    };
  }

  // Irreversible effects → human, always. Highest stop after validity.
  if (action.irreversible || ALWAYS_HUMAN.includes(action.kind)) {
    return {
      tier: "human-approval",
      reason:
        "irreversible or externally visible side effect (delete/send/config-change). " +
        "Agents prepare; humans commit.",
    };
  }

  // Money. Never autonomous; over-cap or unverified never below human.
  if (action.kind === "spend") {
    const cap = ctx.capCheck;
    if (!cap) {
      return {
        tier: "human-approval",
        reason: "spend proposed with no cap-check verdict — money never rides on doubt",
      };
    }
    if (cap.verdict !== "within-cap") {
      return {
        tier: "human-approval",
        reason: `spend ${cap.verdict === "escalate" ? "over cap" : "rejected by cap check"} (${cap.reason}) — never auto-approve`,
      };
    }
    const tier = stricter("coordinator-approval", ctx.spendTierFloor ?? "coordinator-approval");
    return {
      tier,
      reason: `spend within cap (${cap.reason}) — money still needs ${tier === "human-approval" ? "a human" : "the coordinator"}, never autonomous`,
    };
  }

  // Public, binding actions under the swarm's name → coordinator signs off.
  if (action.kind === "publish") {
    return {
      tier: "coordinator-approval",
      reason: "publishing under the swarm's name — the coordinator gates public output",
    };
  }

  // Reversible, in-scope work: read, draft, tool-call (IAM-checked separately).
  return {
    tier: "autonomous",
    reason: "reversible, in-scope work with no money and no public side effect",
  };
}

/** Convenience predicate — does this action require a human in the loop? */
export function requiresHuman(action: Action, ctx: EscalationContext = {}): boolean {
  return classify(action, ctx).tier === "human-approval";
}
