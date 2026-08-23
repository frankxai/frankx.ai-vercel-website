# Trust boundary — support triage

The ticket body is written by a stranger. Everything in this file follows from that one fact.

Tiers used throughout: **T0** private local · **T1** scoped project · **T2** external tools ·
**T3** untrusted content. A model's own output becomes T3 once it has read T3 content, so the
drafted reply is T3 too, and that is why it lands as an internal note and never as an outbound
message.

## Inputs and their tiers

| input | source | tier | where it lands |
|---|---|---|---|
| ticket subject and body | the customer, via the support platform | T3 | data position, wrapped (see the trace) |
| thread history | the support platform | T3 | data position, same wrapper |
| customer plan tier | the billing table, read by the worker | T1 | data position, as a typed field, never free text |
| retrieved macro text | the macro corpus, written and approved by the support lead | T1 | data position, separately labelled from the ticket |
| queue definitions | `fixtures/queues.yaml`, in the repository | T1 | instruction position — this is operator-authored |
| the drafted reply | the model, after reading T3 | T3 | an internal note, never an outbound message |

## trace

One retrieved and one inbound document, walked end to end.

**Ticket body (T3).**

1. Source: the customer's email, delivered by the support platform's intake webhook.
2. Retrieval call: `apps/api/src/routes/intake.ts:L22` receives the payload and enqueues the
   ticket id only — the body is not read at this point.
3. Read: `apps/worker/src/triage.ts:L18` fetches subject, body and thread from the platform API.
4. Entry into the prompt: `packages/prompt/src/build.ts:L27` wraps the body as
   `<untrusted_ticket>…</untrusted_ticket>` inside the **user** message. The system message is
   built separately at `packages/prompt/src/system.ts:L14`, which names the wrapper and states
   that its contents are data to be classified and never instructions to follow.
5. **The label line is `packages/prompt/src/build.ts:L27`.** It is not ABSENT, and it is not a
   paraphrase: the wrapper is applied there and nowhere else. Every call site goes through it —
   `rg -l "buildPrompt\(" -tsrc` returns 2 files (`apps/worker/src/triage.ts`,
   `apps/worker/src/draft.ts`), both importing from `packages/prompt`.

**Macro text (T1).**

1. Source: the approved macro corpus, authored by the support lead.
2. Retrieval call: `apps/worker/src/retrieve.ts:L31`.
3. Entry into the prompt: the same builder, `packages/prompt/src/build.ts:L44`, wrapped as
   `<approved_macro>` — a different label from the ticket, on purpose. Approved text and
   stranger text carry different authority and must be distinguishable to the model, not merged
   into one context blob because both happen to be "context".

## Tool surface

| tool | irreversible | tier | human gate |
|---|---|---|---|
| fetch_ticket | no | T2 | none needed — read only, scoped to one ticket id |
| search_macros | no | T2 | none needed — read only against the T1 corpus |
| set_route | no | T2 | none — a route is a field a person can change back in one click |
| attach_internal_note | no | T2 | none — an internal note is not visible to the customer |
| promote_index_namespace | yes | T2 | **none — finding F2, severity medium** |
| send_email | — | — | the system holds no send tool. Sending happens in the support platform UI, performed by the support agent. This is the `external_send` gate, and it is enforced by absence rather than by policy |

Finding **F2**: `promote_index_namespace` is irreversible within the run — it swaps the live
search namespace with no human step. Severity medium rather than high, because the previous
namespace is retained for 24 hours and the rollback is one command
(`07-runbook.md`, step 4), and because the blast radius is search quality, not customer
contact. It is recorded here rather than omitted, and it is named in `review.md`. Accepting it
is a decision the platform engineer owns; leaving it undocumented would not have been.

## OWASP GenAI LLM Top 10 2026

IDs and titles are quoted from the plugin's vendored mirror at
`skills/trust-boundary/references/owasp-genai-llm-top10-2026.md`, which records
<https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/> as its source with a retrieval
date of 2026-08-22. An automated fetch of that page returned HTTP 403 on 2026-08-23, so the
titles below are the mirror's; re-read the live page by hand before quoting anything beyond a
title.

| ID | Risk | This system |
|---|---|---|
| LLM01:2026 | Prompt injection | Addressed — the trace above; ticket text is wrapped at `packages/prompt/src/build.ts:L27` and never enters the system message. Tested by `injection-001` and `injection-002` in `06-evals/cases.jsonl` |
| LLM02:2026 | Sensitive information disclosure | Addressed — the drafted reply is T3 and lands as an internal note; nothing reaches a customer without an agent reading it first |
| LLM03:2026 | Excessive agency | Addressed — the tool table above; no send tool exists, and every other tool is read-only or trivially reversible except `promote_index_namespace`, which is finding F2 |
| LLM04:2026 | Supply chain | Partly addressed — the provider SDK is a chosen dependency, but it is imported in three places rather than one, so "which provider, on which path" is not answerable from one file. This is the `model` decision, still OPEN |
| LLM05:2026 | Data and model poisoning | Addressed — nothing is fine-tuned and nothing learns between runs; a correction becomes an eval case only when the support lead promotes it (`02-user-flows.md`, flow 3) |
| LLM06:2026 | Unbounded consumption | Addressed — the loop is a fixed workflow with its exit condition in code at `apps/worker/src/triage.ts:L64`, three attempts, no prompt-level stop instruction |
| LLM07:2026 | Misinformation | Partly addressed — a draft can be confidently wrong; the mitigation is entirely the human review step, which is a control on distribution, not on generation. Named here rather than claimed as solved |
| LLM08:2026 | Hidden context exposure | Addressed — the system message is operator-authored and holds no customer data; the internal note shows the agent exactly what the model saw |
| LLM09:2026 | Vector and embedding weaknesses | Addressed — one tenant, one corpus, and the corpus holds approved macros only, no customer text. If customer text is ever indexed this row stops being true and `05-trust-boundary.md` is rewritten before that ships |
| LLM10:2026 | Improper output handling | Addressed — model output is written to a ticket note as text; it is not passed to a shell, a query builder or a renderer that executes it |

## What would change these answers

Adding a send tool. Indexing customer text. Letting the classifier write to the billing system.
Each of those moves a row above from addressed to unaddressed, and each is a reason to re-run
the `secure` stage rather than to edit a sentence here.

Generated by AI Architect · https://www.frankx.ai/ai-architect
