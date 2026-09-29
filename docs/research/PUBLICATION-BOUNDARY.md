# Research publication boundary

**Owner:** FrankX public website. **Repair issue:** #824.

The 100 generated domain records remain in Git history as editorial leads. Their previous
source entries were search URLs and self-links, and their confidence/replication fields were
generated from page-level metadata. They cannot support public scientific status.

## Current release behavior

- Seven hubs and the existing domain URLs remain navigable.
- The research RSS channel has no items while every brief is held for review;
  reviewed publications will be added only with their approved dossier.
- The domain routes display a review state and are `noindex` until a reviewed dossier
  replaces the holding page. They are omitted from the XML sitemap.
- The separately published Agentic Life Observatory stays in the sitemap; the
  noindexed source browser is omitted until it has reviewed sources.
- Generated citation leads are retained in `lib/research/sources.ts` but are excluded
  from `domainSources`, the public source projection and JSON-LD.
- The old generator exits before writing. Do not remove that hold to restore output.
- `data/research/approved-claims.json` is an empty publication ledger. The prebuild
  gate checks any candidate for individual source URLs and versions, exact locators,
  status, a complete evidence dossier, distinct drafter/reviewer, and a structured
  review receipt. Nonempty ledgers fail until an external service verifies the
  reviewer's identity, decision and exact reviewed commit. A shaped SHA alone
  is never an attestation.
- The agentic-life audit reports approved claim counts by domain. Its archived
  discovery leads are not counted as publication evidence.
- Passing this gate **does not automatically publish** a claim. A separate reviewed
  PR must bind the approved claim version to its public page and source projection.

## Promotion contract

For a single exemplary dossier, record the question, scope, methods, inclusion and
exclusion criteria, source identity and version, a claim-specific section/table/run
locator, contrary evidence, limitations, correction/retraction check, rights decision,
distinct human reviewer, and exact reviewed commit. Benchmarks need workload, model,
hardware, date, seed/sample and metric definitions. Human and biological studies need
appropriate consent, ethics and domain review.

An independently replicated claim also needs different study IDs and organizations,
plus a dated structured receipt linking the protocol and result. Discovery search
URLs and query links cannot be promoted as direct sources.

Implement a small renderer from approved records; make the HTML and structured data
consume the same release projection. Include the source-check and rights decision in
the immutable review receipt. Promote one dossier at a time and restore indexing
only after the public content and metadata match the reviewed version.

## Portfolio boundary

Research Intelligence OS owns reusable methods and validations. Research Intelligence
Systems owns domain packs and evidence schemas. The portfolio registry in
`frankxai/agentic-ops` owns cross-brand authority. This repo owns FrankX editorial
publication. Private source files stay in their authorized corpus/Drive locations;
public content links to permitted source metadata and original synthesis.
