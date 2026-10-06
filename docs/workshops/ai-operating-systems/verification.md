# Candidate verification

Owning issue: https://github.com/frankxai/frankx.ai-vercel-website/issues/857
Base revision: e982ccdda06cc9a0fa236fc08b8c5ed789460e0a
Date: 2026-10-02. Highest evidenced environment: full local production build and HTTP output.
Status: independently inspected, unpiloted content release candidate; not a production receipt.

## Follow-up review corrections

Current main incorporated: e0840884161bd8c8971fa7acdcb8aedc8ec589eb. Three P2 findings from PR #859 corrected: the imported workshop is explicitly enumerated and its route index regenerated; native download attributes render in both curriculum and detail; learning/download/inquiry actions use existing consent-aware TrackedLink with static event properties. No learner input or private memory is sent in these events.

## Checks

- TypeScript noEmit: pass.
- Repository lint: pass, zero errors and eight existing warnings outside changed copy.
- Strict language audit: pass, 2,600 files and zero hits.
- Strict claims audit: pass within the script's scoped files.
- Changed-guide editorial signals and registry copy scan: zero diagnostic hits; teaching separately reviewed.
- MDX compile/render: pass, twelve explicit lesson anchors and failure explanations.
- Offline lab: eight tests pass, both documented commands checked independently.
- Follow-up offline, privacy and relevant existing workshop contracts: 34 tests pass.
- merge:gate:ci: pass. Its workflow validation/smoke checks explicitly skip absent .claude/workflows fixtures.
- Full CI=true npm run build including all prebuild checks: pass; 1,449 static pages generated and both new static routes emitted. Default eight-worker attempt was killed during generation. Local retry used temporary experimental.cpus=2; repository next.config.mjs restored byte-for-byte after the check. No checks disabled or paid resources provisioned. Temporary build config restored; package changes already accepted in main remain intact.

## Independent verdict

Verifier: workshop_review, separate agent identity, read-only inspection. Final verdict: draft-ready; no remaining content or offline-lab blocker found. Reviewed MDX rendering, source retrieval, fixture behavior, registry and shared workshop provenance contracts. Final source inspection covered disclosure IDs, expanded state, focus treatment and reduced-motion branches. Follow-up emitted HTML independently confirms both native downloads, twelve curriculum disclosures, all twelve guide IDs, compiled event wiring and sitemap discovery. Browser behavior remains a separate evidence limit.

## Evidence limits

No production deployment, learner pilot, certification, checkout, email delivery or recurring refresh automation is claimed. Two YouTube resources are metadata-verified leads; transcripts remain unreviewed. Synthetic tests are in-memory and provide no production authorization or crash recovery.

Cloud browser could not open localhost (ERR_BLOCKED_BY_CLIENT). Candidate-bound deployed preview, desktop interaction inspection and post-deploy revision binding remain pending. Mobile/reflow/reduced-motion visual inspection and analytics transmission are not yet evidenced. The currently advertised browser API has no mobile viewport/emulation capability; do not substitute a desktop crop for mobile proof. This release extends content through existing renderers and does not claim a new flagship visual system. Maker cannot approve its own public flagship release.

Production must follow the protected-main PR flow and native Vercel git integration. Rollback is a revert PR for the accepted candidate commit. Capture production evidence only after deployment, outside the production commit. No private portfolio operating policy was copied or invented; cross-organization runtime integration is a proposed learner exercise.

## Reviewed content hashes

| Artifact | SHA-256 |
| --- | --- |
| content/guides/ai-operating-systems-workshop.mdx | d81c9435249699b5a6c2497bf1c2dc44511a807c07c47bb1749054177b0db183 |
| data/ai-os-workshop.ts | ca53c29c5f6350399e3c25f4823f1f7be2439e98f4f0b0649083d948401609b8 |
| public/workshops/ai-operating-systems/lab.mjs | f91d38b1c1dadf39e3950e44943997f5ba35720cbd681839093844a1ca588bf5 |
| public/workshops/ai-operating-systems/sources.json | de93bd70ae2aa1371ba400e16f7e7b4d3b19c68c791e825083a3aa472d822baa |
| public/workshops/ai-operating-systems/workbook.md | 2d55b3b905fb685a4252d988fda6ecda20c5f6e488fcede66fc37793a8ea5b99 |
| app/workshops/page.tsx | 49dc5a4a9cb137408e79627fc752733370ea9e6d96a1bf077c4ee7f66df67d4b |
| app/workshops/layout.tsx | f9a29f82af5f4e1cc8dee95828edbe329c07de76063dc4dcedd55296ae83df9b |
| app/workshops/[slug]/WorkshopClient.tsx | 958c47a07a812f41f839489012b1645ee1e7656d6b908dae96986e321b98d29c |
| data/workshops.ts | b830faaf77a23e67d12693a3d9ecfe024228691d36779b8caf25256e77cd69dd |
| docs/workshops/ai-operating-systems/lessons.json | a7d804f673bf0d15b154437d7dd3ff19d00d89133e654163316f57968a981c3d |
