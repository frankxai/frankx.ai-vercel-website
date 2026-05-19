# Newsletter Platforms — Setup & Sync

FrankX newsletters ship to three platforms in parallel, then we drop the worst performers based on real data. This doc tracks the setup steps for each platform and the experiment we're running.

## Platforms

### 1. Resend (primary)

- Audience ID: `4d2e913e-6903-4dd4-8749-c02cdb844331`
- Topic IDs:
  - `newsletter` — `b613f6ff-9c56-4b4c-86df-9217843c5d78`
  - `music-suno` — `018a5159-10c8-4595-8ecc-63d7a2c6b442`
  - `product-updates` — `811064ed-7444-45db-9a2a-fd8c83a21053`
- Env: `RESEND_API_KEY`
- Publisher uses the Broadcasts API: `POST /broadcasts` then `POST /broadcasts/:id/send`

### 2. Beehiiv (secondary)

- One publication, posts tagged by stream id (`creation-chronicles`, `ai-architect`, etc.)
- Subscribers self-segment by tag interests
- Env vars: `BEEHIIV_API_KEY`, `BEEHIIV_PUBLICATION_ID`
- Publisher uses API v2: `POST /publications/:id/posts` with `content_tags: [streamId]`

### 3. Substack (RSS auto-import)

Substack has no public publish API. We publish per-stream RSS feeds; Substack imports them automatically.

Three streams ship to Substack for the experiment:

| Stream | Substack URL | RSS Source |
|--------|--------------|------------|
| Creation Chronicles | TBD | `https://frankx.ai/newsletters/creation-chronicles/rss.xml` |
| AI Architect Dispatch | TBD | `https://frankx.ai/newsletters/ai-architect/rss.xml` |
| FrankX Music Letters | TBD | `https://frankx.ai/newsletters/music-lab/rss.xml` |

**Setup (one-time, per Substack publication):**

1. Create Substack publication.
2. Settings → Imports → "Import from RSS"
3. Paste the RSS URL above.
4. Substack pulls new items roughly every 30 minutes.

The other three streams (arcanea, investor, inner-circle) skip Substack for now.

## The Experiment

For 4 sends per stream (≈ 4 weeks for weekly streams, 8 weeks for bi-weekly), publish to all three platforms. After that:

- **Decision metric**: clicks-per-sent (open rates are inflated by Apple Mail Privacy Protection — ignore them).
- **Rule**: keep platforms within 15% of the leader; drop the rest.

The `newsletter-analyst` agent reviews the ledger (`data/newsletter-experiments.json`) and the per-platform stats APIs and writes a summary to `docs/newsletter-experiments-log.md` after each round.

## Local Development

```bash
# Preview an issue in a browser (dev only)
npm run dev
open http://localhost:3000/newsletters/preview/ai-architect/2026-05-19-subagent-patterns

# Validate an RSS feed
curl http://localhost:3000/newsletters/ai-architect/rss.xml

# Dry-run publish (sends to frank@frankx.ai only, [DRY] subject prefix)
npx tsx scripts/newsletter-publish.ts content/newsletters/ai-architect/2026-05-19-subagent-patterns.mdx --dry-run

# Live publish
npx tsx scripts/newsletter-publish.ts content/newsletters/ai-architect/2026-05-19-subagent-patterns.mdx
```

## Notes

- RSS endpoint is rendered on-demand from `content/newsletters/<stream>/` files where `status: published`. Draft issues are excluded.
- The preview route is gated by `NODE_ENV === 'production'`. To enable previews in production set `NEWSLETTER_PREVIEW=enabled` (don't, unless you've added auth).
- Subject lines are tracked in `subjectVariants[]` in frontmatter for future A/B testing — the publisher currently uses index 0.
