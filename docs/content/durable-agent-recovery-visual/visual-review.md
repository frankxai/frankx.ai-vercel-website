# Durable recovery visual commission — DRAFT

Captured 2026-10-22T08:48:08Z. Governing skill: govern-media-fabric, asset-contract and flagship-visual-system. No media binary, provider write, approval event or placement change was made. The deterministic Mermaid specifications are Git source, not approved web masters/renditions.

Reader job: decide which interrupted calls can replay and which require external reconciliation. Thesis: a persisted intent does not prove that an external effect did or did not happen.

## Three directions

1. **Character narrative — the stopped handoff.** An operator pauses a duplicate publication while a second investigator checks the external receipt. A small human silhouette is the accountable actor; use a human schematic rather than invent canonical droids. Hierarchy: held action → confirmed receipt → continuation. This makes accountability the first read. No candidate artwork exists; any later crew version requires approved canonical sheets.
2. **Architecture world — two ledgers, one gap.** The separate SQLite files become two restrained planes, connected by an effect path with a visible interruption before its outcome record. Exact diagram anchors every illustrative element. Hierarchy: persistence separation → failure boundary → reconcile path. This makes the missing atomic transaction the first read. Recommended for factual explanation, not selected/approved.
3. **Editorial symbol — the unsent receipt.** A single paper receipt has left the action tray but has not reached the ledger; a hand holds the retry stamp above it. No anthropomorphic crew, logos or fake interface. Hierarchy: missing acknowledgement → consequence of stamping twice. This makes ambiguity the first read. A caption must identify the scene as metaphor, never evidence of a real product.

Pairwise decision: architecture world beats narrative for teaching two separate persistence stores; narrative beats symbol for showing accountable reconciliation; symbol beats architecture at thumbnail simplicity. These are producer judgments for review, not taste scores or an approved selection. None has been generated.

## Exact specification and failure boundaries

`architecture.mmd` derives from replay_lab.py connect/effect/run/reconcile. `recovery-states.mmd` derives from run's recorded state branches. Stable packet nodes and edges map to these labels. Python subprocess restart is manual through the test harness; there is no queue, scheduler, cloud adapter, real model or vendor service in the experiment.

Two SQLite files commit independently. Failure injected via os._exit(17) after an effect but before log outcome preserves the effect while leaving started state. A done log result is reused. A safe read repeats its simulated effect. A never action returns uncertain/exit3. Explicit reconciliation checks external count exactly1 before marking done. Reconciliation is a CLI operation in this model, not a secured production approval gate. No diagram should imply atomicity across files, exactly-once infrastructure, automatic reconciliation, remote trust zones or Vercel topology.

## Six roles and creation status

| Role | State | Useful treatment |
|---|---|---|
| Narrative hero | Planned | One uncertain handoff; no generated text/marks |
| Exact architecture | Source specification created | Mermaid two-store topology plus recovery branch diagram; no approved SVG/PNG export |
| Decision comparison | Planned | Exact table: done/reuse, started-safe/retry, started-never/reconcile; model-specific limits |
| Workflow scene | Planned | Three-frame interrupted write → uncertain → checked external receipt; symbolic caption |
| OG | Planned | Short live typography and two-ledger motif; no long baked title |
| Mobile native | Planned | Vertical panels and 4:5 composition; deliberately different layout, not crop |

## Benchmark: four current primary pages, document evidence only

All opened at the timestamp above via text retrieval. This is a current document/information hierarchy benchmark; **desktop/mobile visual captures and image inspection are not available**, so composition, characters, palette, first visual read and responsive behavior remain unverified.

- Vercel, https://vercel.com/blog/making-every-harness-durable (19 October 2026): explicit interrupted-run comparison precedes log/policy explanation. Apply a failure/recovery sequence before abstract topology. Do not copy composition or imply our model is its runtime.
- Anthropic, https://www.anthropic.com/research/effective-harnesses-for-long-running-agents (26 November 2025): chapter navigation separates environment setup and continuation. Apply task-level grouping. Do not represent context-window continuity as identical to durable external calls.
- OpenAI, https://openai.com/index/introducing-agentkit/ (6 October 2025, updated June 3 2026): visibly dated lifecycle notice before workflow sections. Apply explicit product-readiness/lifecycle labeling. Do not use historical Agent Builder as a current recommendation; notice says withdrawal from November30.
- Supabase, https://supabase.com/docs/guides/queues (current undated docs): feature-level claims and links to API/extension. Apply scoped labels tied to implementation evidence. Do not import its queue/delivery guarantees into our SQLite model.

No competitor graphics, logos, captures or characters were copied. Failed initial Vercel guessed URL was replaced by the verified source URL. A text reopen does not satisfy the flagship visual capture gate.

## Governance and review

Character exemption proposed for this exact technical diagram and material metaphor: people/droids add no information to an algorithm whose nodes are processes, records and files. This is not a canonical crew exemption for future narrative production. No character reference was discovered or invented. If direction1 uses canonical crew, reference approval is a new prerequisite.

No third-party marks are required: this compares recovery states, not vendors. All six asset IDs are draft identities only, without provider registration. Git holds specification. Future approved binary masters/renditions route to Vercel Blob; metadata/approval event to Supabase; placements resolve through an approved manifest. No credentials or writes are configured in this lane.

Source specifications need architecture review against code and tests; art-direction, rights and real responsive reviews are pending with named independent reviewers. Producer has not self-certified those lanes. Contrast tokens, measured label legibility, actual desktop/mobile/social layouts, final alt text, checksum/dimensions/rights metadata, canonical content crosslink and rendered export remain pending. Release is blocked. Rollback: no placement changed; supersede this draft version rather than overwrite an approved asset.

## Deterministic SVG implementation specification (not rendered)

Keep Mermaid as the Git master specification. A reviewed SVG rendition should use a 1200×1200 viewBox with a top-down flow, at most three nodes abreast, 64-unit outer padding, 20px minimum labels and 2px minimum edges at desktop design size. Each node needs its stable packet ID on the SVG group; edge groups retain edge IDs. Use system sans text, no vendor fonts or external assets. Initial token proposal: background #0b0d10, text #e8eef5, state/edge accent #64b5f6, uncertainty #fbbf24. Contrast and legibility remain measured-review tasks, not passed claims.

Render exact labels and arrows as SVG text/path elements; never generated raster text. Add SVG title and desc identifying the local teaching model and separate stores. Dashed boundary means interruption/independent commit, never an authorization boundary. Unknown/incomplete state must use text plus line pattern, not color alone. A vertical mobile layout should separate topology from the three-state decision table; do not shrink the full diagram to illegible labels. Preserve a nearby HTML ordered explanation and comparison table as the no-image reading path. Expected rendition dimensions above are targets until actual export and responsive inspection.
