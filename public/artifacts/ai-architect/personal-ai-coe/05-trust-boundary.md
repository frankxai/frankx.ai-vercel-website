# Trust boundary — personal AI centre of excellence

A personal system is where trust tiers get sloppiest, because everything feels like T0. It is not:
the notes are T0, the fetched page in the middle of the summary is T3, and the loop that reads both
does not know the difference unless the code makes it structural.

Tiers: **T0** private local · **T1** scoped project · **T2** external tools · **T3** untrusted
content. A model's output becomes T3 once it has read T3 content — which is why a brief that
summarises a fetched page is itself T3 and why nothing in this system publishes.

## Inputs and their tiers

| input | source | tier | where it lands |
|---|---|---|---|
| local notes | `~/notes`, written by the operator | T0 | data position, labelled `<local_note>` |
| run logs and ledger | `~/.coe/runs/`, written by the loops | T1 | data position |
| long-term memory | `~/.coe/memory/`, promoted by the operator | T0 | data position, labelled `<memory>` |
| inbox export | messages written by other people | T3 | data position, labelled `<untrusted_message>` |
| fetched web pages | the open web | T3 | data position, labelled `<untrusted_web>` |
| loop definitions and prompts | the repository | T1 | instruction position — operator-authored |
| a brief that summarised T3 content | the model | T3 | read by a person, never fed back as instruction |

## trace

**A fetched web page (T3).**

1. Source: a URL the operator pasted into an ad-hoc session, or a subscribed feed item.
2. Fetch call: `packages/tools/src/fetch.ts:L21`. The tool returns `{url, title, text}` — a
   structured record, not a string that can be pasted anywhere.
3. Entry into the prompt: `packages/prompt/src/context.ts:L33` wraps `text` as
   `<untrusted_web src="...">…</untrusted_web>` in the **user** message. The system message is
   assembled at `packages/prompt/src/context.ts:L12` from repository files only; no fetched or
   inbox text can reach it, because the assembler takes a typed `SystemParts` object with no
   free-text field.
4. **The label line is `packages/prompt/src/context.ts:L33.`** Every consumer goes through it:
   `rg -l "buildContext\(" -tsrc` returns 3 files, all in `packages/loops/`.

**An inbox message (T3).** Same wrapper, different tag: `<untrusted_message>` at
`packages/prompt/src/context.ts:L39`. Different tag on purpose — a message from a person the
operator knows and a page from the open web deserve different scepticism, and merging them into one
"context" blob throws that distinction away.

**A local note (T0).** Wrapped as `<local_note>` at `packages/prompt/src/context.ts:L27`. Labelled
even though it is trusted, so that the model can distinguish the operator's own words from a
stranger's — which is the distinction the whole file is about.

## Tool surface

| tool | irreversible | tier | human gate |
|---|---|---|---|
| read_notes | no | T0 | none needed — read only, scoped to `~/notes` |
| search_memory | no | T0 | none needed — read only |
| fetch_url | no | T3 source, T2 call | none — read only, and its output is labelled at the trace line above |
| write_brief | no | T1 | none — writes only under `~/.coe/briefs/`, overwritable and disposable |
| promote_memory | yes | T0 | `destructive` — the operator accepts each candidate individually in the evening ledger, at most seven a night |
| delete_memory | yes | T0 | `destructive` — requires the memory id echoed back in the same session before it runs |
| run_backup | yes in effect | T2 | **none, and the restore has never been tested — finding F1, severity high** |
| send / publish | — | — | no such tool exists. `external_send` and `publish` are enforced by absence, not by policy |

Finding **F1**: `run_backup` writes an encrypted archive to object storage nightly. The archive is
not the risk; the missing half is. The restore step calls a binary that does not resolve on this
machine (`command -v restic` → exit 1, `07-runbook.md` step 5r), so the rollback for the memory
store has never run. Severity high, because the memory store is the only artifact in this system
that is expensive to lose. This is why `gate.operate` is `FAIL`.

Finding **F2**: every gate in the table above is held by the same person who requests it, usually
in the same minute. This is inherent to a one-person system and cannot be engineered away; what can
be done is to keep the number of gated actions small (three tools) and the batch size small (seven
candidates a night), so that approval stays an act rather than a reflex. Named, not solved.

## OWASP GenAI LLM Top 10 2026

IDs and titles are quoted from the plugin's vendored mirror at
`skills/trust-boundary/references/owasp-genai-llm-top10-2026.md`, which records
<https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/> as its source with a retrieval date
of 2026-08-22. An automated fetch of that page returned HTTP 403 on 2026-08-23, so re-read the live
page by hand before quoting anything beyond a title.

| ID | Risk | This system |
|---|---|---|
| LLM01:2026 | Prompt injection | Addressed — the trace above; T3 text is labelled at `packages/prompt/src/context.ts:L33` and the system message is assembled from a typed object with no free-text field. Tested by `injection-001` and `injection-002` |
| LLM02:2026 | Sensitive information disclosure | Partly addressed — T0 notes and T3 web text share one context window in ad-hoc sessions, so a crafted page could try to get a note quoted back. Nothing leaves the machine except prompt content sent to the provider, so the blast radius is the provider, not the public. Recorded, not solved |
| LLM03:2026 | Excessive agency | Addressed — eight tools, five read-only, no send and no publish. `promote_memory` and `delete_memory` are the only writes to anything expensive |
| LLM04:2026 | Supply chain | Addressed — one call seam names the provider (`packages/model/src/route.ts:L14`); dependencies are pinned in the lockfile. Gap `g2` (other harnesses on the machine with unaudited read access under `~/.coe/`) is the live version of this risk here |
| LLM05:2026 | Data and model poisoning | Addressed structurally — memory is written only by the promote step, one candidate at a time, with its source. A poisoned page can propose a fact; it cannot promote one |
| LLM06:2026 | Unbounded consumption | Addressed — every loop has a token budget in code at `packages/loops/src/run.ts:L58`, and the loop truncates and says so rather than continuing |
| LLM07:2026 | Misinformation | Partly addressed — every summarised item carries a link back to its source, so a claim is checkable in one click. Whether the operator clicks is not something the system can control |
| LLM08:2026 | Hidden context exposure | Addressed — the system message is repository files only, and the brief prints which sources it read |
| LLM09:2026 | Vector and embedding weaknesses | `[not addressed]` — no vector store; memory is a local file store with an on-disk index (`packages/memory/src/store.ts:L9`). Not applicable rather than unhandled |
| LLM10:2026 | Improper output handling | Addressed — loop output is written to markdown files and read by a person. Nothing is passed to a shell, and the one place output could reach a shell (a suggested command in a brief) is text the operator retypes |

## What would change these answers

Connecting the mail account. Adding a publish path. Letting a loop promote memory without the
operator. Any of those makes this a different system, and the `secure` stage runs again before it
ships rather than after.

Generated by AI Architect · https://www.frankx.ai/ai-architect
