# Agent Payments Guard

> ⚠️ **UNAUDITED reference implementation** — study it, adapt it, get a real security review before live funds.

**Your agent gets no transfer tool — it gets a gate.** A TypeScript, fail-closed, verify-only [Model Context Protocol](https://modelcontextprotocol.io) server you drop between your agents and any settlement rail. It answers two questions before money moves:

1. **Was this authorized?** — verify the Ed25519-signed mandate: signed, unexpired, amount-matched, single-use.
2. **Is it within cap?** — enforce per-transaction and per-day spend caps from an operator-owned policy file, with replay protection that survives restarts.

It never settles anything. There is no `transfer`, `pay`, `settle`, or `move_funds` tool — none exists, by design (the test suite asserts this by name). The server produces **verdicts** and **pending-approval objects**; humans approve capital.

## The four tools

| Tool | Question | Output |
|---|---|---|
| `verify_mandate` | Was this charge authorized? | `verified` \| `reject` + one-line reason |
| `check_spend_cap` | Is it within the operator's caps? | `within-cap` \| `escalate` \| `reject` + reason |
| `record_audit_entry` | Is there a durable record? | Append-only JSONL entry; a failed write fails the action |
| `require_human_approval` | Does a human need to decide? | A `pending-human-approval` object — never `approved` |

Caps are loaded from `caps.json`, not from tool input — **the calling agent can never supply its own ceilings.** Every verdict tool writes its own audit entry before returning; in `check_spend_cap` the entry lands before the mandate is consumed.

## Fail closed, always

When the guard is uncertain, it rejects. A false reject costs a retry; a false approve costs money that does not come back.

| Situation | Verdict |
|---|---|
| Signature invalid, forged, or issuer key unknown | **REJECT** |
| Mandate expired (or no valid expiry) | **REJECT** |
| Charge amount ≠ mandate amount (any currency mismatch counts) | **REJECT** |
| Mandate already consumed (replay) | **REJECT** |
| Caps file missing, unreadable, or malformed | **REJECT** |
| Charge currency ≠ the stream's cap currency | **REJECT** |
| Spend over per-transaction or per-day cap | **ESCALATE** — never auto-approve |
| Stream has no configured cap (and no `default`) | **ESCALATE** — human decision required |
| Audit log write fails | **FAIL the action** — verdict withheld, nothing consumed |

## Where it sits: authorize vs. settle

The agentic-payments landscape splits into **authorization** ("was this allowed?") and **settlement** ("how does money move?"). Per the upstream repo's June-2026 protocol survey: **AP2** (Agent Payments Protocol — Google-led, Apache 2.0) is the authorization primitive: a cryptographically signed mandate proving a user authorized a specific purchase for a specific amount; it explicitly does not move money. **x402** (Coinbase + the Cloudflare-backed x402 Foundation) settles by reviving HTTP `402 Payment Required` with onchain USDC on Base and Solana. **ACP** (Agentic Commerce Protocol — OpenAI + Stripe, beta) settles card-side via a Shared Payment Token so the agent never sees card details; it powers ChatGPT Instant Checkout.

This guard sits entirely on the **authorize** side and is **rail-agnostic**: verify the AP2-style mandate, enforce the caps, and only then let whichever rail you use settle elsewhere. Holding a settlement credential is never permission to exceed a cap.

```
mandate ──"was this authorized?"──► [ verify_mandate + check_spend_cap ] ──► your rail settles
(authorization)                      (this guard — fail-closed)              (x402 / ACP / …)
```

## Quick start

```bash
npm install
npm test              # builds + runs the fail-closed proof suite
cp caps.example.json caps.json   # your spend policy — edit it
npm run build && npm start       # stdio mode
```

### Add it to a client (stdio)

```bash
# Claude Code
claude mcp add payments-guard -- node /absolute/path/to/dist/src/index.js
```

Claude Desktop (`claude_desktop_config.json`) or Cursor (`.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "payments-guard": {
      "command": "node",
      "args": ["/absolute/path/to/dist/src/index.js"]
    }
  }
}
```

### HTTP mode (remote clients)

```bash
npm run start:http    # serves http://127.0.0.1:3000/mcp
```

Binds to loopback by default — set `HOST=0.0.0.0` only for a deliberate networked deployment, and keep `ALLOWED_ORIGINS` tight if you do (the Origin allowlist mitigates local-network / DNS-rebinding access). Config in `.env.example`. For production add auth and TLS in front.

## Cap configuration

`caps.json` maps **stream** names (whatever spend lanes your system uses — `content`, `infra`, …) to ceilings:

```json
{
  "streams": {
    "default": { "per_transaction": 25, "per_day": 100, "currency": "EUR" },
    "content": { "per_transaction": 50, "per_day": 200, "currency": "EUR" }
  }
}
```

- `per_transaction` — hard ceiling per charge. Over it → `escalate`.
- `per_day` — rolling 24h total per stream, backed by a durable ledger. Over it → `escalate`.
- `currency` — the caps' currency. A charge in any other currency → `reject` (no silent conversion).
- A stream without an entry falls back to `default`; no `default` either → `escalate`.
- The file is re-read on every check: edits apply immediately, and a broken edit makes every charge reject until you fix it. Fail closed on bad policy.

## Mandates and keys

A mandate is signed over a canonical payload (`mandateId|subject|amount|currency|expiresAt|issuerKeyId`) with **real Ed25519** via `node:crypto`, verified against the issuer's public key. The built-in `k_dev` keypair is generated from a fixed, **publicly known** seed so the template is self-contained and testable — it must never authorize live funds. Register real issuer public keys via environment:

```bash
GUARD_ISSUER_PUBKEY_k_prod="-----BEGIN PUBLIC KEY-----..."   # PEM or base64 SPKI DER
```

Unknown issuer key id → signature verification fails → reject. This is an AP2-*style* mandate check, not a full AP2 deployment: there is no issuer key distribution, revocation, or certificate chain here.

## What the tests prove

`npm test` compiles everything and drives the real server in-process through an MCP SDK client:

- Exactly four verify-only tools exist; none matches `transfer|pay|settle|move|send|withdraw|disburse|payout`.
- A valid Ed25519 mandate verifies; forged, tampered, expired, amount-mismatched, currency-mismatched, and unsigned mandates all reject.
- A replayed mandate rejects on both tools, and replay protection survives a restart (durable JSONL ledger).
- Over-cap spend escalates — never auto-approves. Per-day accumulation escalates on the breaching charge.
- A malformed caps file rejects everything; an unconfigured stream escalates.
- A failed audit write errors the tool call and consumes nothing.
- `require_human_approval` returns a pending object that never carries `approved`.

## What this deliberately does not do

No settlement (x402/ACP/card rails are downstream, not here). No custody of funds or keys to funds. No production AP2 key lifecycle. No multi-party consensus (the escalation boundary here is a human). This is a **teaching-grade reference, not the full product** — the maintained upstream with the swarm doctrine, agents, and protocol docs is [frankxai/payment-intelligence-system](https://github.com/frankxai/payment-intelligence-system).

---

Built by [Frank Riemer](https://frankx.ai) · MIT · part of [frankx.ai/ai-architecture](https://frankx.ai/ai-architecture).
