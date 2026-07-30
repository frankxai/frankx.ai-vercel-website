# Lemon Squeezy checkout activation runbook

`/checkout/[slug]` (`app/checkout/[slug]/page.tsx`) is a fail-closed, triple-gated
checkout page on the Lemon Squeezy rail. With no env configuration — the state
production ships in — every visit renders the product's real name and price from
`data/products.json` plus a launch-list path (`/waitlist?intent=<slug>`) and a link
to the product page. No 404, no dead buy button, no fake confirmation.

## The triple gate

A live buy button renders only when ALL three gates pass:

1. **Registry gate** — the slug resolves to a product in `data/products.json`
   whose `offer.primaryPrice` is greater than 0. Unknown slug → `notFound()`.
   Free product → routed to its product page, no checkout.
2. **Wiring gate** — the slug appears in the hardcoded `PRODUCT_VARIANT_ENV_KEYS`
   map in `app/checkout/[slug]/page.tsx`. Currently wired:

   | Slug | Price (registry) | Env var holding the variant ID |
   |---|---|---|
   | `starter-kit` | €97 | `LEMON_SQUEEZY_VARIANT_STARTER_KIT` |
   | `command-center-template` | €497 | `LEMON_SQUEEZY_VARIANT_COMMAND_CENTER_TEMPLATE` |

3. **Config gate** — `isConfigured()` from `lib/lemon-squeezy.ts` returns true
   (both `LEMON_SQUEEZY_API_KEY` and `LEMON_SQUEEZY_STORE_ID` set) AND the
   product's variant env var from the table above is non-empty.

Any gate failing → the honest not-open page. No env vars are set in production
today, so nothing is live until Frank sets them.

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
3. Redeploy so the env vars take effect.
4. Verify: visit `/checkout/starter-kit` and `/checkout/command-center-template`,
   confirm the buy button opens the hosted Lemon Squeezy checkout with the right
   price, and run a test-mode order end to end (webhook → confirmation email).

## Known issue in `lib/lemon-squeezy.ts` (flagged, not fixed)

The lib uses `LEMON_SQUEEZY_STORE_ID` for two incompatible things:

- `buildDirectCheckoutUrl()` (used by this page) builds
  `https://${STORE_ID}.lemonsqueezy.com/checkout/buy/<variantId>` — that needs
  the store **subdomain**.
- `createCheckoutUrl()` (currently has no callers) sends `STORE_ID` as the JSON:API
  store relationship — that needs the **numeric** store ID.

Since only the direct-URL path is in use, set the subdomain. If
`createCheckoutUrl()` ever gets a caller, split these into two env vars first.
