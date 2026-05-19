# /newsletter-publish

Fans a finalized newsletter issue out to Resend + Beehiiv + RSS (Substack auto-imports).

## Usage

```
/newsletter-publish <path/to/issue.mdx> [--dry-run] [--skip-dry-run]
```

## Default Behavior

**Dry-run first.** Always. The publisher refuses to skip dry-run unless explicitly told.

## Flow

1. Invoke `newsletter-publisher` agent.
2. Agent runs the publish script in dry-run mode:
   ```bash
   npx tsx scripts/newsletter-publish.ts <path> --dry-run
   ```
   Sends only to `frank@frankx.ai` with `[DRY]` subject prefix.
3. User confirms Gmail + Apple Mail render look good.
4. Agent runs live:
   ```bash
   npx tsx scripts/newsletter-publish.ts <path>
   ```
5. Agent reports: Resend broadcast ID, Beehiiv post ID, RSS URL, ledger entry.

## Refusal Conditions

The publisher will refuse to send if:
- `RESEND_API_KEY` is unset
- Frontmatter is incomplete or `status: draft`
- Subject > 60 chars
- Multiple CTAs in body
- `--skip-dry-run` requested on any stream except `inner-circle`

## Substack Setup (one-time, manual)

For the three streams the user wants on Substack (Creation Chronicles, AI Architect Dispatch, Music Letters), connect the publication to:

```
https://frankx.ai/newsletters/<stream>/rss.xml
```

Substack pulls automatically. No action needed per-issue.
