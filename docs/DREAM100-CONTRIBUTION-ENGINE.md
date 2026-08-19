# Dream 100 Contribution Engine

## Purpose

The Dream 100 is an attention and contribution system, not a prospect list. It keeps FrankX and GenCreator close to consequential work while protecting the trust required for long-term partnerships.

Canonical public data lives in `data/dream100/registry.json`. FrankX publishes the canonical API at `/api/dream100`. GenCreator accepts that API only when the schema and 100-member invariant pass; otherwise it serves its bundled snapshot.

## The daily loop

1. **Observe** — inspect official release notes, papers, demos, changelogs, and primary creator artifacts published in the last 24 hours.
2. **Verify** — retain the source URL, source date, supported claims, and verification level. Do not draft from a social summary when a primary source exists.
3. **Translate** — write one architecture consequence for FrankX and one creator mechanism or proof practice for GenCreator.
4. **Contribute** — propose a small artifact that would be useful even if no relationship follows.
5. **Review** — a human decides whether to publish, correct, defer, or discard. No automatic outreach.

Run the local brief with:

```bash
pnpm dream100:brief
```

## Editorial contract

A Signal separates five things:

- observation;
- evidence supported by the source;
- FrankX architecture interpretation;
- GenCreator creator translation;
- one useful contribution.

Claims stay attributable. Analysis is labeled by structure. Every public signal links to the source receipt.

## Relationship stages

`observe → understand → contribute → converse → collaborate`

The private cockpit at `/admin/dream-100` stores relationship memory and the next contribution. It never sends, publishes, or executes external actions. Private notes use Vercel KV when configured and fail closed when storage is unavailable.

## Publishing a new edition

1. Update the canonical FrankX registry and increment `snapshotId`.
2. Copy the identical snapshot to GenCreator.
3. Run the contract tests in both repositories.
4. Verify the source link, date, member ID, and all three evidence statements.
5. Review desktop and mobile renders for `/signals`, the signal detail, `/dream-100`, `/showcase`, and the showcase detail.
6. Merge through the normal preview and production release path.

