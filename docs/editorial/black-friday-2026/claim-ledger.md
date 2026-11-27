# Claim ledger: Black Friday 2026 (Higgsfield + ElevenLabs)

Article: `content/blog/black-friday-2026-higgsfield-elevenlabs-ai-stack.mdx`
Reviewer: independent commercial verification (did not write the article)
Checked: 2026-11-26, 22:52 to 22:56 UTC, live vendor pages via Firecrawl (`maxAge: 0`)
Full ledger: [`claim-ledger.json`](./claim-ledger.json) (64 claims)

| Status | Count |
|---|---|
| verified | 46 |
| corrected | 12 |
| unverifiable | 4 |
| false | 2 |

## Blockers (fix before publish)

1. **The Higgsfield plan sale ends Nov 27, 00:00 UTC (7pm ET on Nov 26).** `higgsfield.ai/pricing.md` gives that end time. The HTML countdown read `01:08:00` at 22:52 UTC. The article says the page shows no fixed end date (C03). The tldr reads as if both offers end Dec 1 (C02). After that time the $30 Plus and $45 Ultra prices, the $459 combined figure and the cost-per-output table may no longer hold. The Market add-ons run until Nov 30.
2. **The Higgsfield affiliate link is not live in code (C61).** `programs.json` has Higgsfield `verifiedOn`/`checkedOn` = 2026-10-10. On 2026-11-26 that is 47 days old, and `SPONSOR_MAX_AGE_DAYS` is 45, so `sponsorDecision` returns `stale-verification` with `sponsored: false`. As a result the card has no `rel="sponsored"` and no affiliate line beside it, and `/go/higgsfield` sends readers to plain `https://higgsfield.ai`. The disclosure still calls the Higgsfield links affiliate links, which is not true right now. The fix is one of two: re-verify the link and update the dates in the data file, or change the disclosure. `signupUrl` `https://higgsfield.ai/ambassador-program` now returns 404. The live program page is `https://higgsfield.ai/affiliate`.

## Corrections (old → new)

See the reviewer handback or the `correction` field in the JSON. Affected claims: C02, C03, C08, C12, C21, C33, C34, C35, C51, C53, C55, C57, C60, C61, C62.

## Affiliate integrity

- `elevenlabs` resolves to `/go/elevenlabs`, `sponsored: true`, rel `sponsored noopener`, and the card shows its affiliate line. The record is fresh (2026-11-05) and expires 2026-12-20.
- `higgsfield` resolves to `/go/higgsfield`, `sponsored: false` (stale). See blocker 2.
- The disclosure sits at the top, before the first affiliate control. That placement is correct. The wording claims too much (C61, C62).
- Program terms: ElevenLabs bans paid search and brand bidding, false coupon promises and misstating the relationship, and requires FTC disclosure. Higgsfield bans paid ads, brand bidding and posting to coupon or cashback sites. The article breaks none of these. Removing "needs no code" (C34) avoids an unsourced claim about codes.

## Claims audit

`pnpm run claims:audit:strict` passes ("no high-risk claim patterns detected"). The script only scans `app`, `components`, `lib` and `data`, so it does not read `content/blog`. I applied the same regex set to the article by hand and got 0 hits.
