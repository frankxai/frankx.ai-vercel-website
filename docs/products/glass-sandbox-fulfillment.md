# Glass Core Essential / sandbox fulfillment candidate

Source dependency: existing draft [paid delivery repair #1075](https://github.com/frankxai/frankx.ai-vercel-website/pull/1075), head `cd15bb475b9bbc47d80470bc7f93c1496e8f10b3`. This is a stacked follow-up. It neither replaces that repair nor changes the live webhook/download routes. Production admission must resolve #1075's stale/conflicted base and integrate both changes through their owning review gates.

## Implemented scope

One existing SKU: `aurora-ui-kit`, edition `essential`, €79 sandbox price hypothesis. `GlassRelease` binds the server Price ID, currency/amount, exact SDI source revision and immutable artifact ID/bytes/SHA-256. It pins a terms version/hash with `sandbox-rehearsal-only` scope; the host must supply its persisted explicit acceptance record (subject, exact terms hash and acceptance time). The attempt/entitlement snapshots this record. Draft terms are not an operative commercial license grant. The actual release values must come from the approved artifact manifest; the tests use a small empty ZIP fixture, not a fabricated paid purchase or the commercial archive.

The server-only service has no route, default provider transport, marketing subscription or email send. The host must supply its authenticated server session and existing storage/transaction adapters. This code does not authenticate a user from a supplied email, body field, query parameter or self-asserted header.

The local rehearsal executes:

1. Use the actual Stripe SDK to create a test Session through an explicit transport. The host supplies authenticated identity, persisted terms acceptance, HTTPS origin (or loopback HTTP for the local rehearsal) and stable purchase attempt key. Browser price/owner/metadata fields are ignored; same-origin POST is required. Pin the canonical server Price and metadata, use a stable provider idempotency key, and bind the returned `cs_test_` session to that subject/release/acceptance.
2. Verify raw event bytes with the installed Stripe SDK and a test signing secret. Bound input to 64 KiB and body time to ten seconds. Reject live/configuration mismatch and connected-account events.
3. Re-read the paid session and line items through an explicit test transport. Require a single quantity-one Price, exact amount/currency/source/edition and a test-mode paid Session. A success URL or metadata alone grants nothing.
4. Commit the event and one entitlement atomically. Unique event IDs and purchase binding prevent replay or owner changes. A confirmed positive refund revokes access conservatively; a refund-before-payment tombstone prevents delayed callbacks from restoring it.
5. Authenticate the download through the host session, verify ownership/current entitlement, read only a configured private object and check its bytes/hash before returning it. Public buckets, unlisted keys, source mismatch, revoked access and corrupted content fail closed. Response is private/no-store, attachment and nosniff.

`scripts/commerce/glass-sandbox-sqlite.mjs` is a real file-backed transactional adapter for **offline rehearsal only**. Tests close/reopen it and verify persisted grant/revocation. Never use this adapter as business truth on Vercel's ephemeral filesystem. The same domain interface has a Supabase transaction-RPC adapter; `glass-sandbox-ledger-proposal.sql` is a service-role-only schema/function proposal, **not an applied migration or a proven cloud database**. It keeps transactional truth in the existing Supabase/Postgres architecture. RLS, role grants, concurrency/replay and restore must be verified on a dedicated sandbox DB before wiring.

`glassSandboxCheckout` and `stripeSandboxReads` use the real installed Stripe SDK with an explicitly supplied fetch transport, five-second SDK timeout, no network retries and `sk_test_` enforcement. Fixture tests exercise the actual SDK checkout-create and Session/line-item/Charge request paths, including canonical request fields and idempotency. No Stripe request was made during this work. `supabasePrivateArtifactReader` exercises the expected existing storage client's bucket-metadata and download APIs with fixtures; no bucket was created, uploaded, made private or remotely read here.

## Loopback HTTP preview

Run `node scripts/commerce/glass-sandbox-harness.mjs /tmp/glass-fixture.sqlite` and open the printed `http://127.0.0.1` URL. This scripts-only server mounts checkout, raw signed webhook and authenticated download handlers, plus clearly labeled fixture payment/refund controls. The server grants a local fixture identity using an HttpOnly/SameSite signed cookie; this is not customer authentication. It binds loopback only, refuses production mode, uses no secrets/environment credentials, makes no external/provider request and returns only an empty ZIP fixture. The automated HTTP test verifies the mounted chain, replay, unauthorized download and refund revocation. This URL is a local fixture preview, not a deployed or provider-connected checkout.

## Existing owner and remaining integration

Canonical product identity is reused from `lib/product-fulfillment.ts`. The original `app/api/webhooks/stripe/route.ts` keeps ignoring test-mode events before email, and `/api/download/purchased` remains the older HMAC-link behavior. Existing public Blob URLs are **not** made private by this patch. No claim that production customer downloads are now authenticated/private is made.

The host's future sandbox route must use the existing authenticated session, record explicit acceptance and create checkout through this bound `glassSandboxCheckout` service, call the service and use a private artifact mapping. The legacy SDI checkout-preparation helper does not provide this buyer/artifact/acceptance binding and cannot substitute for it. It must not accept browser-supplied Price IDs, source hashes, subject IDs or object keys. No sandbox endpoints are exposed yet; implementing a public route before these verified owner adapters/credentials exist would disguise fixture success as a real commerce integration.

## Verification commands and release gate

`node --test scripts/tests/glass-sandbox-fulfillment.test.mjs` runs real Stripe signature verification, durable SQLite transactions, restart, duplicate/reordered/refund events, scope/owner/config denials, provider fact mismatch, private content/hash denial, bounded failures and SDK/storage adapter fixtures. `pnpm run test:checkout-sku` includes this file alongside #1075's existing suite.

Local verification on this candidate: combined checkout/fulfillment suite **35/35 passing**, strict full TypeScript **passing**, strict language audit **2649 files / 0 hits**. Full lint on the final candidate: **0 errors / 8 existing warnings**; focused lint on the added service also passes. A full `npm run build` initially stopped at the optional missing sibling AIS checkout; `CI=1 npm run build` passed prebuild using the repository's supported optional AIS skip, then the operating system **killed** Next.js during production compilation. A successful full build is therefore an open gate, not a claimed pass.

Connected Stripe discovery currently exposes only live account context. Therefore genuine sandbox purchase, signed provider delivery, provider refund, cloud RPC concurrency and private download rehearsal remain **blocked**, not passed. No new live product, Price, checkout, payment, email, entitlement, object, secret or production state was created.

Before launch: configure a genuine Stripe sandbox and test-only server credentials through the approved secret mechanism; review/apply the sandbox-only Postgres proposal; verify the existing authentication adapter and private storage owner; pin the approved SDI archive; complete provider purchase/retry/refund/download rehearsals including cross-user denial; obtain different-provider substantive review under this repository's release routing; approve source license/tax/refund/support terms separately; then request explicit owner approval for release. No part of this candidate supplies that approval.

Official references consulted: [Stripe post-payment events](https://docs.stripe.com/payments/existing-customers?platform=web&ui=stripe-hosted), [Stripe automated testing](https://docs.stripe.com/automated-testing), [Node SQLite](https://nodejs.org/api/sqlite.html). Source existence, adapter fixture behavior, provider connectivity and customer acceptance remain separate evidence levels.
