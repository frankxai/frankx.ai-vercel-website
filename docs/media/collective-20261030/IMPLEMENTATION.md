# Companion studio implementation

2 November 2026. Quality owner: #706. Starting main: `fc83e77c7068a1052cee40198226d1ca4c75c30b`. Existing collection source: `d884c764786941ceedc27f8f45e71426e8c281b2`. Both are retained in the integration history.

The job is to choose an existing image, give it a specific website/content purpose and hand an exact placement brief to another designer or agent. This implementation reuses the sixteen-asset collection. It adds one route, local review loading, import/export, a persistent shortlist, a bundle builder and six proposed placements. It creates no store, server upload API, account, approval service or homepage change.

## Working flow

`/design-lab/collective` is a noindex review utility. Its server render contains public-safe catalog metadata and five useful starting placements. The browser reads a review JSON supplied by the owner. Every image must match the registered asset ID, version, byte count, WebP signature and SHA-256. The whole file validates before replacing the loaded artwork. Image object URLs stay in memory and are revoked when replaced or unmounted.

Select a brand, surface and intended page/story. Shortlisting stores those fields and exact pins locally when browser storage is available. Export preserves asset/version/rendition hashes, alt text, review notes, crop intent and rights state. Import rejects unknown, duplicate, stale-version or stale-rendition entries. The older picker shortlist format remains accepted and is upgraded with the current rendition hash. Imported approval fields are discarded. A placement brief always has `publication_approved: false`.

The updated private HTML picker supports the same placement brief format with its existing sixteen embedded WebPs. It is a recovery and selection artifact. Its image bytes were verified unchanged during the update. The original master ZIP remains an immutable dated snapshot.

Build a browser review file from the extracted owner collection:

```sh
node scripts/media/build-companion-review.mjs /path/to/extracted-collection /path/to/new-review-bundle.json
```

The builder validates source pins, path containment, size, MIME signature and checksums. It writes a new file exclusively. The result contains only the sixteen registered WebPs and their pins, not native-source masters, prompts, private notes, credentials or Atlas record IDs. The observed file is 7,888,993 bytes; decoded image payload is 5,914,178 bytes.

## First placements

`placement-proposals.json` records exact pins and the job/constraint for six uses. All are proposals:

| Scene | Intended use | Keep in view |
|---|---|---|
| Living archive | Library editorial introduction | Original covers and attribution remain authoritative |
| Wolf crossing | Learning-route orientation | Native prerequisites and progress carry the actual guidance |
| Whale listening | Music essay or research note | The actual track or cited research is the evidence |
| Robot repair | GenCreator build journal | Pair the image with an inspectable finished artifact |
| Turtle tide | Portrait story about patient maintenance | Preserve the pebble, water path and plants |
| Connected habitat | Optional Design Lab discovery image | Noncanonical scene; no factual architecture or homepage replacement |

Place imagery around discovery and storytelling. Keep dense work surfaces focused on the user's artifact and controls. Use bounded cutouts only after edge review on the target background. Preserve the established FrankX identity and each portfolio brand's own character/canon decisions. External guest renditions remain private until their intended use is cleared.

The source widths bound placement size: a 1672px wide image supports roughly 836 CSS pixels at DPR2. Larger hero uses need a larger reviewed source; do not claim the current files are 4K. A new crop or pixel edit creates a new rendition and requires its own review.

## Checks and release

Run `npm run test:companion-selection` (or the equivalent pnpm script). The existing CI job runs this after lint; no new runner/job, install step, permission or draft behavior is added. This explicitly checks the route because the repository's broad TypeScript/lint configuration excludes Design Lab.

Seven behavioral tests cover old-format recovery, context bounds, unknown/duplicate/stale pins, forged approvals, rendition mismatches and altered image payloads. The exact real sixteen-image bundle was also verified. Keep browser behavior, full repository build and deployment evidence separate from those checks. The accompanying implementation receipt records their actual outcomes.

Canonical publishing still follows the existing Vercel-first media policy. This route does not infer approval, publish binaries or change production placements. The old publisher patch is historical source only: it must not be applied over this route or treated as an authenticated approval service. Publication needs an authorized ingest/publisher, current release records, reviewed target renditions and a verified deployment through the owning repository.

Rollback is additive: revert the companion route, selection module, scripts, test/CI entry and proposal records through a normal PR. Keep the original asset IDs, masters, private review records and immutable historical packets. No existing public route or homepage section is removed.
