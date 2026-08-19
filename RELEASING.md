# FrankX Release Procedure

FrankX uses two connected release surfaces:

- `/changelog` explains meaningful outcomes to readers and links to public evidence.
- GitHub Releases records the technical tag boundary and generated pull-request notes.

## Prepare

1. Group changes by user, creator, research, operator, or trust outcome.
2. Add or update `data/changelog-updates.json`; do not publish raw commit metrics or invent a version.
3. Run `pnpm changelog:validate`, `pnpm type-check`, the relevant contract tests, and the production build.
4. Inspect the changelog index and newest detail page at desktop and mobile widths.

## Draft the GitHub release

1. Create and push an annotated semantic-version tag such as `v0.3.0` only after the release boundary is agreed.
2. The `Draft GitHub Release` workflow creates a draft with generated notes from `.github/release.yml`.
3. Review the draft for accurate grouping, links, contributor credit, security language, and required artifacts or attestations.

## Publish

Publishing is a deliberate human gate. Once a release is ready for immutable publication, confirm the tag target and attached artifacts first; then publish the reviewed draft in GitHub. Do not move or reuse a published tag.
