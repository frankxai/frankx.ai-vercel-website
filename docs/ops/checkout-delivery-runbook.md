# Checkout and Product Delivery Runbook

## Scope

FrankX Stripe checkout is implemented in `app/api/checkout/route.ts`; Stripe delivery events are
handled by `app/api/webhooks/stripe/route.ts`. The production source is
`frankx.ai-vercel-website`, not the private authoring repository.

The money path fails closed. A checkout session is created only when all of these are true:

1. `STRIPE_SECRET_KEY` is present.
2. The product ID is explicitly supported.
3. Its named Stripe Price environment variable is non-empty and has a `price_...` ID.
4. The product registry and delivery configuration both exist.
5. The product registry declares at least one canonical Vercel Blob artifact.

Never put environment values in tickets, logs, receipts, or this document.

## Product contract

| Product ID | Price key | Delivery state |
| --- | --- | --- |
| `agentic-creator-os` | `STRIPE_PRICE_ACOS` | Enabled; four registry Blob keys verified HTTP 200 on 2026-07-10 |
| `suno-prompt-library` | `STRIPE_PRICE_SUNO` | Blocked; all three registry Blob keys returned HTTP 404 on 2026-07-10 |
| `creative-ai-toolkit` | `STRIPE_PRICE_TOOLKIT` | Blocked until canonical registry artifacts are declared |

The product ID is copied to both Checkout Session and Payment Intent metadata as
`productSlug`. The webhook resolves that exact ID through the registry and delivery configuration;
aliases are not accepted.

`checkoutEnabled` in `lib/delivery.ts` is the explicit release switch. Set it to `true` only after
every registry artifact has been verified at its public Blob URL and the focused tests pass. The
public product CTAs for Creative AI Toolkit and Suno remain on their existing external provider;
this gate changes only the internal Stripe route.

## Delivery behavior

- Product email sends use `stripe-checkout/<event-id>` as the Resend idempotency key.
- `checkout.session.completed` and `checkout.session.async_payment_succeeded` are accepted, but
  fulfillment occurs only when `payment_status` is `paid`.
- Missing metadata, delivery configuration, provider configuration, and provider errors produce a
  retryable failure and a non-2xx webhook response.
- Missing customer email or an unconfirmed payment produces a non-retryable failure receipt and no
  delivery.
- Audience-update failure is logged separately and never changes an already successful product
  delivery.

Every attempt writes a `starlight.delivery_receipt.v1` structured log containing Stripe event and
session IDs, product ID, provider status, retryability, and the provider message ID. Customer name
and email are deliberately excluded.

## Local verification

No secret or network access is required:

```powershell
npm run test:checkout
npm run type-check:checkout
```

The focused test covers missing and malformed prices, missing delivery artifacts, Stripe metadata,
paid-only fulfillment, Resend idempotency, retry classification, Blob redirect URLs, and PII-free
receipts.

Run the repository-wide `npm run type-check` and build gate from a full checkout before opening the
release PR; the focused configuration exists so this money path can be checked independently.

For an integration verification, use Stripe sandbox events and a non-production Resend audience.
Do not perform a live purchase merely to test this path. Confirm the event delivery response and
the matching receipt in Vercel logs before promoting.

## Rollback

Revert the checkout, webhook, `lib/checkout.ts`, `lib/stripe-delivery.ts`, and `lib/delivery.ts`
changes as one unit. If delivery is impaired, remove or unset the affected Stripe Price environment
key to block new checkouts while preserving webhook retries for already-paid sessions.
