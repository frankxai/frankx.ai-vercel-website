# Lemon Squeezy checkout activation runbook

> **Provider status, checked 18 November 2026.** Lemon Squeezy's site and docs
> state that it has stopped accepting new sign-ups and will shut down on
> 31 March 2027 ([announcement](https://www.lemonsqueezy.com/blog/saying-goodbye-to-lemon-squeezy),
> dated 16 November 2026). Step 1 of the checklist below, creating a store,
> is no longer possible for a new account. Do not activate this rail until
> Frank rules on which payment rail the site uses. The page and its gate stay
> in place and closed.
>
> If this rail is ever opened on an existing account, rework the webhook first:
> `app/api/webhooks/lemon-squeezy/route.ts` derives the product from the order's
> display name and answers 200 when it cannot deliver. "The Command Center
> Template" becomes `the-command-center-template`, which matches no product, so
> that order would be charged and acknowledged with no email sent.

`/checkout/[slug]` (`app/checkout/[slug]/page.tsx`) is a fail-closed, triple-gated
checkout page on the Lemon Squeezy rail. In the state production ships in,
every visit renders the product's real name and price from
`data/products.json` plus a launch-list path (`/waitlist?intent=<slug>`) and a link
to the product page. No 404, no dead buy button, no fake confirmation.

## The gates

The gate is `lemonSqueezyCheckoutUrl()` in `lib/lemon-squeezy.ts`, covered by
`scripts/tests/paid-delivery.test.mjs`. A live buy button renders only when ALL
four gates pass:

1. **Registry gate** — the slug resolves to a product in `data/products.json`
   whose `offer.primaryPrice` is greater than 0. Unknown slug → `notFound()`.
   Free product → routed to its product page, no checkout.
2. **For-sale gate** — the product's row in `lib/checkout-products.ts`, looked
   up by product id, has a status that starts with `for sale`. Every row ships
   as `pre-stage (not for sale)`. Changing one is a reviewed pull request, the
   same rule `lib/checkout-gate.ts` applies to Stripe, so env vars alone cannot
   open a checkout.
3. **Wiring gate** — the slug appears in the `LEMON_SQUEEZY_VARIANT_ENV_KEYS`
   map in `lib/lemon-squeezy.ts`. Currently wired:

   | Slug | Price (registry) | Env var holding the variant ID |
   |---|---|---|
   | `starter-kit` | €97 | `LEMON_SQUEEZY_VARIANT_STARTER_KIT` |
   | `command-center-template` | €497 | `LEMON_SQUEEZY_VARIANT_COMMAND_CENTER_TEMPLATE` |

4. **Config gate** — `isConfigured()` from `lib/lemon-squeezy.ts` returns true
   (both `LEMON_SQUEEZY_API_KEY` and `LEMON_SQUEEZY_STORE_ID` set) AND the
   product's variant env var from the table above is non-empty.

Any gate failing → the honest not-open page. No product is marked for sale
today, so nothing is live.

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
3. In a reviewed pull request, change the product's status in
   `lib/checkout-products.ts` to one that starts with `for sale`.
4. Redeploy so the env vars take effect.
5. Verify: visit `/checkout/starter-kit` and `/checkout/command-center-template`,
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
