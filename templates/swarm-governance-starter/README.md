# Swarm Governance Starter

> ⚠️ **Reference harness, not a security boundary** — the IAM here is process discipline against well-behaved code, not containment for a malicious model; OS-level sandboxing is the real containment.

**Routing frameworks decide what your agents do. This decides what they're allowed to do.** A TypeScript starter for the layer most multi-agent demos skip: when you graduate from one agent to a team of agents with a budget, you need roles with scopes, an escalation ladder, and a record of every decision. This is that harness — deliberately **without a single LLM call**, because it is not another agent-loop framework. It is the structure your agent loop runs inside.

Three mechanisms, each fail-closed:

1. **Typed coordinator/worker structure with per-role IAM** (sometimes called queen/worker) — `iam.json` says which tools each role may call and which path globs it may touch. Deny by default: an unlisted tool, an out-of-scope path, an unknown role, or a missing/broken policy file all deny. A global deny list (`.env*`, keys, secrets) beats every profile.
2. **An escalation ladder** — `classify(action)` routes every proposed action to exactly one tier: `autonomous` / `coordinator-approval` / `human-approval`. Evaluated top-down, first match wins, hardest stop first — so irreversibility and money can never be downgraded by a later, more permissive rule. Anything unknown or ambiguous fails closed to `human-approval`.
3. **Spend accountability** — every `spend` passes a cap check before classification. Out of the box that's a local caps file; set one env var and it becomes the sibling [`agent-payments-guard`](../agent-payments-guard) MCP server with durable per-day accounting. Within-cap spend still needs the coordinator — **money is never autonomous**, and over-cap or unverifiable spend always reaches a human.

Every verdict is appended to a JSONL **decision ledger** before it is returned — who proposed, which tier, what verdict, why. A failed ledger write denies the action: an unrecordable decision must not proceed.

## The three tiers

| Tier | Meaning | Examples (from `classify()`) |
|---|---|---|
| `autonomous` | Execute now | read, draft, in-scope tool call — reversible, no money, nothing public |
| `coordinator-approval` | Coordinator signs off first | publish under the swarm's name; **any** within-cap spend |
| `human-approval` | A human decides; the harness only emits a pending object | delete, send, config-change, anything flagged irreversible, over-cap or unverified spend, any unknown action kind |

Fail-closed invariants, all asserted by the test suite: a null action, an unknown kind, a spend with no cap verdict, a cap check that errored, and a broken IAM or caps file all resolve to deny or `human-approval` — never a pass. A role's `maxSpendTier` floor can raise a spend's tier, never lower it.

## Layout

```
iam.json               per-role profiles: allowedTools + path globs + maxSpendTier + globalDeny
swarm.example.json     coordinator + 3 workers + per-stream budgets (guard-caps-compatible shape)
src/types.ts           Action, Role, Tier, Verdict — the typed contract
src/iam.ts             loads + enforces iam.json — can(role, tool, path), deny by default
src/escalate.ts        classify(action, ctx) → tier — the fail-closed ladder
src/ledger.ts          append-only JSONL decision ledger
src/guard-client.ts    spend checks: agent-payments-guard over MCP stdio, or local caps fallback
src/dry-run.ts         govern() — the whole ladder — walked by six scripted actions
test/governance.test.ts  the proof suite (32 tests)
```

## Run the dry run

```bash
npm install
npm test        # builds + runs the fail-closed proof suite
npm run dry-run # walks six scripted actions through the full ladder
```

No API key, no network. Real output:

```
swarm-governance-starter — dry run
spend-cap backend: local-caps (set GUARD_MCP_COMMAND to use agent-payments-guard)
iam: loaded (deny-by-default)

1. [research-worker] tool-call: read competitor notes for the weekly brief
   gates:   iam.can → escalate.classify → ledger.append
   verdict: EXECUTE — autonomous, would run now
   reason:  reversible, in-scope work with no money and no public side effect

2. [content-worker] tool-call: edit payment code (out of scope for a content role)
   gates:   iam.can → ledger.append
   verdict: DENIED — never reaches execution
   reason:  IAM: path 'lib/payments/stripe.ts' is outside role 'content-worker' allowed paths

3. [ops-worker] spend: renew the search-index add-on (30 EUR)
   gates:   iam.spendFloor → spend.checkCap → escalate.classify → ledger.append
   verdict: PENDING — coordinator must approve
   reason:  spend within cap (30 EUR within per-transaction cap 100 EUR; durable per-day accounting requires the payments guard) — money still needs the coordinator, never autonomous

4. [ops-worker] spend: upgrade the database plan (250 EUR — over the 100 EUR cap)
   gates:   iam.spendFloor → spend.checkCap → escalate.classify → ledger.append
   verdict: PENDING — human must approve
   reason:  spend over cap (250 EUR exceeds per-transaction cap 100 EUR) — never auto-approve

5. [content-worker] send: send the weekly newsletter to the full list
   gates:   escalate.classify → ledger.append
   verdict: PENDING — human must approve
   reason:  irreversible or externally visible side effect (delete/send/config-change). Agents prepare; humans commit.

6. [ops-worker] deploy-to-prod: deploy current branch to production (unknown kind)
   gates:   escalate.classify → ledger.append
   verdict: PENDING — human must approve
   reason:  unknown action kind 'deploy-to-prod' — failing closed to human approval

ledger: 6 decision(s) on record at ./.governance/decisions.jsonl
No action was executed. This harness classifies and records; your agent loop executes.
```

## Roles and IAM

`iam.json` ships four example profiles — `coordinator`, `research-worker`, `content-worker`, `ops-worker`. Each declares `allowedTools`, `allowedPaths` (globs: `*` within a segment, `**` across segments, bare patterns like `.env*` match basenames anywhere), optional `deniedPaths`, and a `maxSpendTier`:

- `"none"` — the role cannot propose spend at all (research and content workers).
- `"coordinator-approval"` — within-cap spend resolves to the coordinator (the floor for money).
- `"human-approval"` — every spend from this role reaches a human regardless of caps.

Two deliberate details: the coordinator's own profile denies `iam.json` and `.governance/**` — the swarm cannot edit its own rules or its own ledger through a tool call — and `config-change` actions classify to `human-approval` regardless of role, so governance changes always go through you.

## Plug in real cap enforcement

The local caps fallback enforces per-transaction ceilings and currency from the `streams` map in `swarm.example.json` (same shape as the guard's `caps.json`, so one file serves both). For mandate verification, replay protection, and a durable per-day spend ledger, point the harness at the sibling [`agent-payments-guard`](../agent-payments-guard) template:

```bash
cd ../agent-payments-guard && npm install && npm run build && cd -
GUARD_MCP_COMMAND="node ../agent-payments-guard/dist/src/index.js" npm run dry-run
```

The guard is spawned as a **local child process over MCP stdio** — no network. The starter forwards its caps file to the guard via `CAPS_PATH`, and calls the guard's `check_spend_cap` tool for every spend. Fail-closed at the boundary: a transport error, a tool error, or a garbled result resolves to `reject`, never a pass — and never a silent downgrade to the weaker local check. Upstream doctrine and protocol context: [payment-intelligence-system](https://github.com/frankxai/payment-intelligence-system).

## Bring your own agent loop

This harness is framework-agnostic because the integration point is one function call: before your loop executes any tool, hand the proposed action to the ladder and only proceed on `execute`. With the AI SDK, LangGraph, OpenAI Agents, or a hand-rolled loop, the pattern is the same:

```ts
const verdict = await govern(harness, {
  kind: "tool-call", role: "content-worker", stream: "content",
  tool: "write_file", path: "content/posts/draft.md",
  description: "save the draft",
});
if (verdict.outcome === "execute") await runTool(toolCall); // your loop's executor
else queueForApproval(verdict); // pending-* → surface to coordinator/human; denied → report back to the model
```

`govern()` lives in `src/dry-run.ts` and composes the four gates in order (IAM → cap check → classify → ledger). Copy it into your loop as-is or inline the calls — the modules have no dependency on the dry run.

## What this deliberately does not do

No LLM calls. No network calls (the optional MCP spawn is a local child process). No execution of actions — it classifies, gates, and records; your loop executes. No settlement or money movement of any kind. The escalation spine's shape is ported, de-branded, from [frankxai/starlight-swarm](https://github.com/frankxai/starlight-swarm); the IAM profile shape follows the Agent IAM pattern from [Agentic Creator OS](https://github.com/frankxai/agentic-creator-os).

---

Built by [Frank Riemer](https://frankx.ai) · MIT · part of [frankx.ai/ai-architecture](https://frankx.ai/ai-architecture).
