# Lemon Squeezy checkout activation runbook

`/checkout/[slug]` (`app/checkout/[slug]/page.tsx`) is a fail-closed
checkout page on the Lemon Squeezy rail. With no env configuration,
every visit renders the product's real name and price from
`data/products.json` plus a launch-list path (`/waitlist?intent=<slug>`) and a link
to the product page. No 404, no dead buy button, no fake confirmation.

## Checkout gates

A live buy button renders only when all gates pass:

1. **Registry gate** — the slug resolves to a product in `data/products.json`
   whose `offer.primaryPrice` is greater than 0. Unknown slug → `notFound()`.
   Free product → routed to its product page, no checkout.
2. **Wiring gate** — the canonical product ID appears in
   `LEMON_PRODUCT_VARIANT_ENV_KEYS` in `lib/product-fulfillment.ts`.
   The configured numeric variant ID must be unique across this map. Currently wired:

   | Slug | Price (registry) | Env var holding the variant ID |
   |---|---|---|
   | `starter-kit` | €97 | `LEMON_SQUEEZY_VARIANT_STARTER_KIT` |
   | `command-center-template` | €497 | `LEMON_SQUEEZY_VARIANT_COMMAND_CENTER_TEMPLATE` |

3. **Config gate** — `isConfigured()` from `lib/lemon-squeezy.ts` returns true
   (both `LEMON_SQUEEZY_API_KEY` and `LEMON_SQUEEZY_STORE_ID` set) AND the
   product's variant env var from the table above is non-empty.
4. **Delivery gate** — the paid catalog product has allowed PDF/ZIP files in
   `delivery.files`, and a dedicated `PRODUCT_DOWNLOAD_SECRET` is configured
   with at least 32 bytes. Existing legacy display filenames do not establish
   artifact availability.
5. **Receipt and callback gate** — `RESEND_API_KEY`, the provider's webhook
   secret and an explicit live-mode policy are present. Lemon requires
   `LEMON_SQUEEZY_EXPECT_TEST_MODE=false`; Stripe requires its existing live
   secret/restricted API key and Price-ID binding. Missing email or callback
   prerequisites cannot open a payable checkout.

Any gate failing → the not-open page. Passing these code gates alone does not
authorize a paid launch; see the fulfillment blockers below.

## Activation checklist (Frank only)

1. In the Lemon Squeezy dashboard, create the store and the two products; note
   each product's **variant ID** and the store's **subdomain** (the `<store>` in
   `https://<store>.lemonsqueezy.com`).
2. In Vercel project settings, set:
   - `LEMON_SQUEEZY_API_KEY` — API key from Settings → API.
   - `LEMON_SQUEEZY_STORE_ID` — the store **subdomain** (e.g. `frankx`). See the
     known-issue note below before setting this.
   - `LEMON_SQUEEZY_VARIANT_STARTER_KIT` — variant ID for the €97 Starter Kit.
   - `LEMON_SQUEEZY_VARIANT_COMMAND_CENTER_TEMPLATE` — variant ID for the €497
     Command Center Template.
   - `LEMON_SQUEEZY_WEBHOOK_SECRET` — for order fulfillment via
     `app/api/webhooks/lemon-squeezy/route.ts` (point the store webhook at
     `/api/webhooks/lemon-squeezy`, event `order_created`).
   - `PRODUCT_DOWNLOAD_SECRET` — a dedicated random download-signing secret;
     do not reuse provider credentials or webhook secrets. Keep it server-only.
   - `RESEND_API_KEY` — transactional receipt delivery must be configured before
     checkout can open.
   - `LEMON_SQUEEZY_EXPECT_TEST_MODE` — explicit `false` for live receipt
     fulfillment. A separate sandbox callback environment can use `true` to
     validate mode isolation; it acknowledges matching sandbox events without
     sending product emails or minting download links. Missing/mixed mode fails
     closed. Order and first-order-item `test_mode` must agree with this policy.
3. Redeploy so the env vars take effect.
4. Verify: visit `/checkout/starter-kit` and `/checkout/command-center-template`,
   confirm the buy button opens the hosted Lemon Squeezy checkout with the right
   price, and verify test-mode webhook isolation. Sandbox events do not send
   real product receipts. Test
   delivery with the injected provider fixtures until a separate reviewed
   non-production artifact/email lane exists. Test expired and modified links as well.

## Fulfillment behavior and remaining launch blockers

Signed `order_created` callbacks must report `status: paid`. The provider's
`first_order_item.variant_id` selects the canonical catalog ID; display titles
and checkout `custom_data` do not grant product access. Stripe checkout and
callbacks share the existing `STRIPE_PRODUCT_PRICE_ENV_KEYS` bindings; callbacks
read authoritative line items and require one charged item, quantity one, the
configured Price ID, and the catalog currency. Missing configuration, rejected
payment evidence or failed provider reads send no product email.

Product emails use the catalog's exact Blob keys and the implemented
`/api/download/purchased?token=...` handler. The HMAC bearer token binds one
canonical product and file for 24 hours. The handler rechecks the current catalog,
fetches only the fixed Blob origin without redirects, checks PDF/ZIP content
types and streams an attachment with `private, no-store`. Email provider failures
return an error so delivery is not falsely acknowledged.

Receipt text derives link lifetime from the signing TTL. Purchase HTML escapes
customer/product/file names and URL attributes; unsafe receipt URLs are omitted.
Transactional purchase and subscription callbacks never enroll or resubscribe
customers in marketing audiences. Explicit newsletter opt-in flows are unchanged.
Stripe delayed-payment success uses the same paid-session/Price checks as
checkout completion; test-mode events never send real product receipts.

This patch does **not** make the existing public Blob origin private. Links can
be forwarded until expiry; they are not one-time entitlements. Paid launch stays
blocked until the merchant verifies the real artifacts and provider configuration,
accepts or fixes public-asset exposure, and validates replay/idempotency and
refund/reversal handling. Retried callbacks can currently send duplicate emails.
These controls are separate from the route's bearer-token verification.

## Known issue in `lib/lemon-squeezy.ts` (flagged, not fixed)

The lib uses `LEMON_SQUEEZY_STORE_ID` for two incompatible things:

- `buildDirectCheckoutUrl()` (used by this page) builds
  `https://${STORE_ID}.lemonsqueezy.com/checkout/buy/<variantId>` — that needs
  the store **subdomain**.
- `createCheckoutUrl()` (currently has no callers) sends `STORE_ID` as the JSON:API
  store relationship — that needs the **numeric** store ID.

Since only the direct-URL path is in use, set the subdomain. If
`createCheckoutUrl()` ever gets a caller, split these into two env vars first.
