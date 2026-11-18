# University Commons resource editions

The [registry](../../content/university/resources.json) owns resource identities, teaching objectives, rights evidence, review decisions and source metadata. The existing audience paths own the ordered practicums. The catalogue offers the original featured selection and an opt-in view of additional reviewed resources. Four practicums work without client-side search. Commercial catalogues continue to own product identities and delivery. Institutional strategy stays private. A review decision applies to the stated use at the pinned revision.

## November 2026 · edition 2026.11.1

First edition proposed for editorial review on 18 November. Of 24 inspected records, 14 support a bounded reading or manual exercise, four have a local replay receipt, and six are held. All 24 pinned sources returned anonymous HTTP 200 with bytes matching the Git tree. A catalogue file is evidence of a listing. Its presence alone cannot establish delivery. The [foundation PR](https://github.com/frankxai/frankx.ai-vercel-website/pull/1274) supplies 25 featured entries including six derived challenges and readings. Two are the same works as this edition: teaching-contract (uc-0007) and quote-protocol (uc-0020). Both retain their original route IDs. The 16 additional eligible entries are discoverable under the catalogue’s supplement filter. Six held entries are excluded from both views. These counts overlap.

Stable IDs survive renames, new editions, changes of owner and link repairs. Keep retired IDs as tombstones. Allocate the next unused number for a different intellectual work. Use an existing product ID as an alias when available. Raw source is the immutable reference. Readers receive the accessible entry point for the bounded use. Unknown author or source edition is null. Publisher, byline, copyright holder and Commons review date have different meanings.

### Replay receipts

- **uc-0008 / uc-0009.** At [da3ecf69](https://github.com/frankxai/research-intelligence-os/tree/da3ecf6983e71c81788efc887059264528fa82a5/collaboration), Python 3.12.14 with jsonschema 4.26.0 passed all five upstream checks. From repository root run `python -m unittest discover -s collaboration -p 'test_*.py' -v`. Inputs include a synthetic retrieval proposal. An accepted record without evidence must fail. The valid fully populated example only demonstrates the contract.
- **uc-0021.** At [a9e4ea02](https://github.com/Agentic-Income/agentic-income-skills/tree/a9e4ea02284116d1c25a89b13729219b276ec49a), Node 24.22.1 ran the guide’s synthetic init, intake, repeat intake, show and owner export. One inspection produced a fictional EUR 120.00 subtotal, unchanged ID and revision 1 on repeat, and a packet receipt with outbound disabled. The first export from a manually selected subset failed because the packaged licence was missing. Restoring the upstream licence and retrying succeeded. Start from a complete checkout. Keep the owner packet local.
- **uc-0023.** In a clean checkout of the same revision, `npm ci --ignore-scripts` followed by `npm run income:validate -- examples/request-to-quote-desk/income-system.json` passed. An earlier subset without dependencies failed to load Ajv. This validates the example manifest only. The quote engine is a separate resource.
- **uc-0004.** The public PDF opened anonymously. Text extraction and PDF metadata inspection found four tagged pages, a generic document title and a multi-column reading-order concern. Provide a linear equivalent before assigning it.

### Repair queue

| IDs | Observed issue | Acceptance for reconsideration |
| --- | --- | --- |
| uc-0001, uc-0016 | Chapters exist in source. Tested public chapter paths returned 404. | Confirm their intended publication state, approve the reader route, verify title and body anonymously. |
| uc-0002 | Dated setup guide uses a different executable from the [upstream quickstart](https://code.claude.com/docs/en/quickstart). | Update install, entitlements and login. Run a clean setup and record OS, binary version and cost. |
| uc-0004 | Accessible download, unclear linear reading order. | Review keyboard and screen-reader navigation and provide a usable linear text edition. |
| uc-0015 | Public design proposal, reserved rights, unresolved canon. | Scope teaching use with the rights holder or select an original learner-created world. |
| uc-0024 | Landing page available. Catalogue omits the delivery block. | Fulfilment owner verifies permitted test delivery and actual file contents. An external store may differ. |

## Monthly editorial review

The curator reviews on the first Monday of each month, 10:00 Europe/Amsterdam. Use public sources and the existing Commons PR or merged registry. The curator can propose changes. The owner accepts publication. Subject reviewers check provider-specific instructions, research claims and creative permissions when affected.

| Lane | Check against | Replay or editorial test |
| --- | --- | --- |
| ChatGPT/Codex | OpenAI product docs and versioned Codex releases; review uc-0003 | Trace one workflow from permission choice through review. Separate durable ownership advice from plan-specific UI. |
| Claude Code | Anthropic quickstart, CLI reference and changelog; review uc-0002 | Test executable, login description and help output in a clean environment. Record which steps require an entitlement. |
| Agent systems | Pinned skill manifests, runtime releases, schemas and owner controls | Repeat one safe synthetic input, one rejected case and one export. Review host-specific portability claims individually. |
| Research methods | Original protocol, code, dependencies, fixture changes and correction notices | Run a positive and negative test. Compare the research question and acceptance rule with the previous edition. |
| Creative AI | Source edition, model or tool release, permission record and export format | Test an editable output such as SRT or a rights-cleared original. Record human correction and accessible alternative. |

For each affected ID compare source revision, rights scope, learner-facing URL, required payment or account, and expected output with the last accepted edition. Fail closed on broken access, changed rights or unsupported results. An unavailable credential yields an unverified live workflow; the free offline route can retain its own decision.

**No material change.** Record review date, checks and retained pin in a review receipt. Leave text and edition intact. **Correction.** Increment the edition suffix and list affected IDs, old and new pins, changed behaviour and replay result. **Changed prerequisite or outcome.** Issue a new dated edition and retain the previous Git revision. **Withdrawal.** Remove the entry from learning paths and retain the ID, evidence and reason. A path must contain only eligible IDs. Re-run validation after each edit.

Changelog entries contain date, edition, ID, action, before/after revision, reason, evidence, owner and unresolved limitations. Skip cosmetic rewrites. Escalate a broken required route at discovery rather than waiting for the next sweep.

## Optional expansions

All four paths include the complete exercise, output and acceptance criterion. An institution could separately commission a marked second attempt for students, a facilitator rehearsal for professors, an independent replication for researchers, or a synthetic workflow review for founders. These are proposed services. Scope instructor time, permissions and costs before quoting. Keep purchases, registration, mailing lists, publication of learner work and sponsor visibility optional. The private offer catalogue owns terms.
