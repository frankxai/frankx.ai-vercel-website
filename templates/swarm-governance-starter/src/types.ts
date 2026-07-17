/**
 * The typed governance contract: what an action IS, and what a verdict on it
 * looks like. Nothing in this template executes actions — it classifies them,
 * checks them against IAM and spend caps, and records the decision.
 */

/**
 * The three escalation tiers, in order of increasing gravity. Every proposed
 * action resolves to exactly one:
 *
 *  - `autonomous`            — the agent may execute now (reversible, in-scope, no money)
 *  - `coordinator-approval`  — the coordinator role must sign off first
 *  - `human-approval`        — a human must decide; the harness only ever
 *                              produces a pending object for this tier
 */
export const TIERS = ["autonomous", "coordinator-approval", "human-approval"] as const;
export type Tier = (typeof TIERS)[number];

/** Order of gravity — used to take the stricter of two tiers, never the looser. */
const TIER_ORDER: Record<Tier, number> = {
  autonomous: 0,
  "coordinator-approval": 1,
  "human-approval": 2,
};

/** The stricter of two tiers. Escalation can be raised, never lowered. */
export function stricter(a: Tier, b: Tier): Tier {
  return TIER_ORDER[a] >= TIER_ORDER[b] ? a : b;
}

/** A role is either the (one) coordinator or a worker. Its `profile` names an IAM profile. */
export type RoleKind = "coordinator" | "worker";

export interface Role {
  name: string;
  kind: RoleKind;
  /** Key into iam.json `profiles`. A role without a profile can do nothing. */
  profile: string;
}

/**
 * The action kinds the ladder knows how to classify. Anything outside this
 * list fails closed to `human-approval` — an unknown action is never assumed
 * safe.
 */
export const ACTION_KINDS = [
  "read", //          read-only research
  "draft", //         produce content/spec/audit — not yet public
  "tool-call", //     invoke a named tool, optionally on a path (IAM-checked)
  "publish", //       make something public under the swarm's name
  "spend", //         spend money against a stream budget
  "delete", //        destroy data
  "send", //          fire an external side effect (email, post, webhook)
  "config-change", // edit the swarm's own governance config
] as const;
export type ActionKind = (typeof ACTION_KINDS)[number];

/** An action proposed by a role. The harness classifies it; it does not run it. */
export interface Action {
  kind: ActionKind;
  /** The IAM profile name of the proposing role. */
  role: string;
  /** Which budget stream (spend lane) the action belongs to. */
  stream: string;
  /** One line a human can act on. */
  description: string;
  /** For `tool-call`: the tool being invoked. */
  tool?: string;
  /** For `tool-call`: the path the tool targets, if any. */
  path?: string;
  /** For `spend`: the amount. Missing or non-finite → treated as over-cap. */
  amount?: number;
  /** For `spend`: the currency. Must match the stream cap's currency. */
  currency?: string;
  /** True if the effect cannot be undone. Forces `human-approval`. */
  irreversible?: boolean;
}

/** Result of classification: the required tier plus a traceable reason. */
export interface Classification {
  tier: Tier;
  reason: string;
}

/**
 * What the harness resolved for one proposed action. `denied` means the action
 * never reaches the ladder (IAM said no, or the ledger could not record the
 * decision). The two `pending-*` outcomes are hand-offs — the harness never
 * marks anything approved on its own.
 */
export type VerdictOutcome =
  | "execute"
  | "pending-coordinator-approval"
  | "pending-human-approval"
  | "denied";

export interface Verdict {
  outcome: VerdictOutcome;
  tier?: Tier;
  reason: string;
  /** The ordered gates that produced this verdict (for the trace + ledger). */
  gates: string[];
}
