# Founder identity reference · 0.1.0

Implementation owner: OpenAI Codex. Review candidate only. Owning issue: [#1062](https://github.com/frankxai/frankx.ai-vercel-website/issues/1062), character continuity wave. Owning request: Recover and Deploy the Real Mini Frank Across My Venture Portfolio, 17 November 2026. Base: `a2ecff4adbc548904d1c07821a34e8e2d4095b64`. No artwork release or production deployment is authorized by this change.

## Identity and release

`host.frank` remains the stable identity. Reference authority is `2026-10-09.4`. The actual model sheet, installed reference bundle, recovered Library copy, current Drive bytes and a Figma raw-image export share an independently measured SHA-256. Private source identifiers, image bytes and recovery evidence stay outside this public repository.

Identity approval, rights clearance and exact-rendition publication approval are separate. `data/founder-identity.release.json` intentionally contains no public rendition. Public pages therefore render the founder's name and story link. No generated substitute, new mascot, chat launcher or live-agent indicator is used.

The private evidence report records a conflict with an estate character JSON's beard and glasses descriptions. Preserve the recovered model-sheet pixels. Resolving that prose conflict is a separate owner decision; this PR does not edit canon locks.

## Shared implementation

`components/founder-identity` and `lib/founder-identity` form one versioned source implementation. The components provide Founder Signature, Founder Presence, Package Guide, Trust and Ownership, and Cross-Brand Attribution. The brand configuration keeps attribution subordinate to each brand. Other-brand trust links stay empty until their actual routes are verified. No copied legal language or invented business registration numbers.

The artwork adapter resolves an exact manifest ID, identity, source hash, approved rendition hash, rights, decision reference, brand and placement. Missing or ambiguous references render no artwork. The private review harness exposes the internal layout only in memory to compose proposed artwork; the public FounderPresence API has no artwork injection slot. The harness must never be imported by a production route.

FrankX `/about` uses Founder Signature and existing trust destinations. The existing generic product route reuses catalogue module titles and its existing availability decision. It adds no prices, checkout, guarantees or delivery promises. Product-specific routes still need individual adapters. Catalogue entries are content evidence, not proof of commercial availability.

## Delivery and accessibility

Use immutable local public copies named by SHA-256, archived in the existing R2 media fabric. Next Image supplies responsive edge variants. Signature is 96 CSS pixels; Presence uses `(max-width: 700px) 100vw, 480px`. Keep original aspect ratio, width and height. Use a separately reviewed crop for each placement; do not silently crop or redraw the likeness. No Drive URLs, expiring links or private originals in rendered HTML. No new service, dependency or infrastructure.

All controls are native links; focus is visible and targets are at least 44 pixels. Text stays visible throughout. Image-only opacity motion runs once, with a reduced-motion override. No live status, typing or chat affordance. Brand-specific color and typography must be checked in the consuming site before migration.

## Migration order

1. Review the private original/proposal comparison and resolve exact public rendition rights and placement approval. Do not equate model-sheet reference approval with permission to publish the complete sheet.
2. Archive approved public derivatives in the existing R2 system, independently read back their hashes, add local immutable copies and release receipts, then run the release test. Originals remain private.
3. Review FrankX About and the generic product page on mobile/desktop, keyboard and reduced motion. Check dedicated product templates individually. Preserve existing URLs, prices and commercial gates.
4. Pin this source version into Starlight, Arcanea and GenCreator through their own draft PRs. Verify the current repository and deployed revision first; similarly named organization copies are not interchangeable. Use concise attribution outside Arcanea fiction, project accountability for Starlight, creator authorship for GenCreator.
5. Run each repository's checks and obtain substantive independent review at the final PR head. Production rollout requires Frank's explicit approval. Rollback is a revert of the consuming-site integration; remove revoked rendition entries and their public copies without altering private masters.

## Checks

`node --experimental-strip-types --test scripts/tests/founder-identity.test.mjs` checks release gates, missing/ambiguous references, byte integrity and package content requirements. Run the repository's type-check, lint, strict language audit and production build. Passing contract tests are not a WCAG certification, measured performance result or independent design review.
