# Google measurement setup and result contract

The admin dashboard, HTTP routes and Node CLI share the readers in `lib/observability/`.
Every view returns `status`, `data`, `source` and `issues`. Status is `ok`, `not_configured`,
`unauthorized`, `upstream_error` or `partial`. Missing data stays null. Production has no
simulated traffic, keyword, indexing or demand fallback.

## Verify identities before configuration

Record the real GA4 property ID from Google Analytics Property Details. A property ID,
web stream ID and `G-...` measurement ID are different identifiers. No existing numeric
example establishes this site's identity. Verify the stream's website URL and the actual
`hostName` values used by frankx.ai and www.frankx.ai. Check production and preview traffic
separately before treating a property report as the site's baseline.

Required non-secret configuration:

- `GA4_PROPERTY_ID`: verified numeric property ID; no default.
- `GA4_HOSTNAMES`: comma-separated verified hostnames, without scheme/path. Historical
  reports filter by these names, not by the entire property.
- `GA4_STREAM_ID`: verified numeric web stream ID for realtime reporting. Realtime uses
  `streamId`, not the historical `hostName` dimension. Verify stream-to-host association.
- `GOOGLE_SEARCH_CONSOLE_SITE_URL`: exact verified domain property (`sc-domain:...`) or
  HTTPS URL-prefix property. No fallback from the application URL.

Google read authorization can use existing environment-managed service-account configuration:
`GOOGLE_SERVICE_ACCOUNT_JSON`, `GOOGLE_CLIENT_EMAIL` plus `GOOGLE_PRIVATE_KEY`, or
`GOOGLE_APPLICATION_CREDENTIALS` pointing at a protected credentials file. Never commit
keys or paste secret values into a report. Keep permissions minimal: GA4 Viewer and the
appropriate Search Console read access. Google Analytics Data API and Search Console API
must already be enabled and the service account granted access to the exact properties.
This change provisions no project, key, subscription or permission.

## Interpret reports accurately

- Each result identifies provider, configured property, host scope, requested window,
  reporting timezone when returned, retrieval time, maturity limits and row coverage.
- GA4 historical reports end yesterday in the provider's reporting timezone. Processing
  completeness remains unverified; source metadata does not assert a settled-through date.
- Search Console requests final Web data with Pacific calendar dates and a three-day lag.
  That lag is a conservative request window, not independent proof that data is settled.
- GSC totals use a separate dimensionless property request. Never sum top query rows to
  construct property totals; anonymized queries and row limits reduce coverage.
- GA4 acquisition percentages describe the returned source rows' sessions, not unique
  users or property-wide conversion attribution. Top-page metrics are page reports,
  not a landing-page or accepted-delivery report.
- GA4 reports must match the requested metric/dimension headers and row shape before
  an omitted row set can count as observed empty. A bare HTTP 200 object is unavailable,
  not measured zero. Blank metrics are invalid. Ratios with no denominator remain null.
- Realtime currently requests aggregate active users only; unqueried active pages remain null.
- The dashboard labels the committed snapshot's window and timestamp. A failed window
  request retains that snapshot with an error, and stale responses cannot replace it.
- A failed daily-trend request leaves a valid overview `partial`, with null trends.
- Inspection results come only from Google. No missing fetch, mobile or canonical field
  becomes a passing verdict. Inspection is not a live crawling test.
- Business demand counts are unavailable until an actual lead/order/delivery ledger is
  connected. Pageviews cannot substitute for purchases, accepted delivery or retention.

The Indexing API is limited to Google's supported content types; it is not a generic
instant-indexing API for blog articles. Use normal discovery/sitemaps and URL Inspection
where applicable. No indexing or ranking is guaranteed.

## Consumers and commands

Admin: `/admin/analytics`. HTTP endpoints remain under `/api/admin/observability/`.
Reports with unavailable sources return `success: false` and an explicit status. Unconfigured
sources use HTTP 503; provider authorization/upstream failures use 502. Mixed data uses
HTTP 200 with `status: partial` and `success: false`. These statuses do not bypass admin auth.

The CLI requires Node 22.18+ for native TypeScript loading and shares the adapters:

```sh
pnpm run analytics:summary
pnpm run analytics:gsc -- --days=28
pnpm run analytics:ga4 -- --days=28
pnpm run analytics:opportunities
pnpm run analytics:inspect -- --inspect=https://www.frankx.ai/blog/example
node scripts/observability/analytics-cli.mjs --json
```

Load environment through the invoking runtime/secret manager or Node's `--env-file`
option. The CLI no longer silently reads a workstation `.env.local` into its process.
It exits 2 for incomplete/unavailable reports, while preserving partial observations.
No MCP deployment or registration is established by the presence of these files.

## Acceptance receipt still needed

A source-only repair does not prove provider configuration or event collection. Verify one
permitted production pageview and one meaningful action at the provider; verify preview
exclusion, DNT/GPC suppression and destination correctness. Record actual provider results,
release SHA, timezone and settled-data limits. Never turn a blocked check into zero traffic.
