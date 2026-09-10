# FrankX Release Procedure

FrankX uses two connected release surfaces:

- `/changelog` explains meaningful outcomes to readers and links to public evidence.
- GitHub Releases records the technical tag boundary and generated pull-request notes.

## Prepare

1. Group changes by user, creator, research, operator, or trust outcome.
2. Add or update `data/changelog-updates.json`; do not publish raw commit metrics or invent a version.
3. Run `pnpm changelog:validate`, `pnpm type-check`, the relevant contract tests, and the production build.
4. Inspect the changelog index and newest detail page at desktop and mobile widths.

### `/work/[slug]` release gate

When `app/work/[slug]` or `content/work` changes:

1. Run `pnpm run test:build-integrity` and `pnpm run build`. The build must emit only `live` and `past` engagement slugs with `fallback: false`.
2. On the exact preview deployment, record HTTP receipts for `/work`, every emitted public slug, one draft or private slug, one missing slug, and one malformed slug. Public routes must return `200`; every non-public route must return a controlled `404`; none may return `5xx`.
3. Check Vercel runtime errors for `/work/[slug]` before promotion. Attach the deployment ID, Git SHA, response receipts, and error-query window to the pull request.
4. After production promotion, repeat the route matrix against `www.frankx.ai` and observe Vercel for at least 24 hours. The release stays open until there is no recurrence of `Page changed from static to dynamic at runtime`.

## Draft the GitHub release

1. Create and push an annotated semantic-version tag such as `v0.3.0` only after the release boundary is agreed.
2. The `Draft GitHub Release` workflow creates a draft with generated notes from `.github/release.yml`.
3. Review the draft for accurate grouping, links, contributor credit, security language, and required artifacts or attestations.

## Publish

Publishing is a deliberate human gate. Once a release is ready for immutable publication, confirm the tag target and attached artifacts first; then publish the reviewed draft in GitHub. Do not move or reuse a published tag.
