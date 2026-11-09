# viewer.v1 on FrankX, and the Clerk scope decision

- Status: built on `agent/opencode/viewer-contract-2026-11-07`; draft PR; no migration
- Date: 7 November 2026
- Author: OpenCode build lane
- Base revision: `83bbe5686` (`origin/main`, 7 November 2026)
- Scope: `lib/viewer-contract.ts`, `app/api/v1/me/**`, `scripts/tests/viewer-contract.test.mjs`, CI wiring

## What FrankX actually has

Measured in this checkout:

- **Auth:** NextAuth v5 with a single credentials provider for the admin account (`lib/auth.ts`). There are no customer accounts, OAuth providers, or registration.
- **Commerce:** one-time Stripe products from the shared `lib/checkout-products.ts` registry handled by `app/api/checkout`. All 16 products currently carry `pre-stage (not for sale)`; no recurring plan exists.
- **Protection:** `proxy.ts` gates `/dashboard`, `/admin` and related APIs by session; `/api/v1/me` authenticates itself.

The adapter therefore reports an **admin** viewer, not a customer subscription. It does not invent a paid plan.

## Goals

1. Serve `viewer.v1` from the existing NextAuth session with no client-supplied identity.
2. Report `paid: false`, an `admin` plan, and explicit entitlements.
3. Map one-time product offers with the same registry and the same sale-status plus configuration gate as checkout.
4. Fail closed: 401 without a session; unavailable offers carry a reason and are not a `nextOffer`.
5. Add a CI test so the mapping cannot drift.

## Non-goals

- No customer signup, OAuth, password reset, or account management.
- No subscription plan, recurring billing, or entitlement that does not exist.
- No Stripe API call and no checkout creation from this route.
- No UI consumer in this slice.

## Design

| Concern | Decision | Reason |
| --- | --- | --- |
| Identity | `auth()` from `lib/auth` | one NextAuth instance, server-verified session |
| Plan | `admin`, `paid: false` | FrankX admin access is not a customer subscription |
| Entitlements | `adminDashboard: true`, `customerAccount: false` | truthful capability flags |
| Offers | the shared `CHECKOUT_PRODUCTS` registry, `kind: product` | the only commerce that exists; no drift from checkout |
| Availability | `stripeCheckoutGate` from `lib/checkout-gate.ts` | same sale status, Stripe key and price id as checkout |
| Caching | `private, no-store`, `no-referrer` | account data must not be cached |
| Errors | 401 with private headers | no fabricated viewer |

## Acceptance criteria

| # | Criterion | Evidence | Status |
| --- | --- | --- | --- |
| 1 | Admin mapping, no paid plan, entitlements | `scripts/tests/viewer-contract.test.mjs` | 7/7 pass (run 2026-11-07) |
| 2 | Offer availability matches sale status and Stripe config; closed products yield reasons and no `nextOffer` | same test file | pass |
| 3 | Type-check, lint, language gate, build | CI workflow | recorded in the PR |
| 4 | Live probe | requires deploy + admin session | not claimed |

## Rollout

Additive route; no migration and no environment change. Deploy, then call `/api/v1/me` signed out (401) and with the admin session (200 with `viewer.v1`). Product offers appear only when their status starts with `for sale` and their Stripe price is configured.

## Rollback

Revert the branch. No data, grants or policies were added.

## Risk

- **Admin-only endpoint.** It is a truthful account read, not a customer account system. If FrankX adds customer accounts, this adapter must map that provider and a real plan before it can serve customers.
- **One registry.** `/api/checkout` and the viewer both read `lib/checkout-products.ts` and `lib/checkout-gate.ts`, so a product cannot be offered without the same gate that checkout enforces. Opening a product remains a reviewed status edit. The `data/products.ts` catalog is a marketing catalogue, not the checkout registry, so it is deliberately not used here.

## Clerk adapter scope decision (Starlight source)

Measured: `repos/starlight-intelligence-web` uses Clerk, with no root middleware in the checkout and no customer subscription surface identified. Registry guidance keeps Clerk for the Starlight mission work and forbids replacing an existing provider without a product reason.

Decision: **do not build a Clerk adapter now.** There is no customer-facing Starlight account or subscription offer for it to serve, and an internal Clerk session mapped to `viewer.v1` would add a surface without a user. Revisit when either condition is true:

1. A Starlight surface needs authenticated customer account data, or
2. A Starlight subscription or paid offer exists with a readiness gate.

When that happens, the adapter should follow this shape: verify the Clerk session server-side, map `userId`/primary email to the viewer, read entitlements from the Starlight source of truth (not the client), and return no offers until a priced, ready offer exists. It must not copy another site's plan ids.

## Portfolio status after this slice

| Site | Auth | viewer.v1 | Offers |
| --- | --- | --- | --- |
| gencreator.ai | Supabase | yes, dashboard + API | stage offers, readiness-gated |
| arcanea.ai | Supabase | yes, settings + API | Polar plans and packs, checkout-gated |
| frankx.ai | NextAuth admin | yes, API (this slice) | three Stripe products, env-gated |
| Starlight source | Clerk | deferred by decision above | none identified |
| realityarchitect.ai | none | not applicable until accounts exist | none identified |
