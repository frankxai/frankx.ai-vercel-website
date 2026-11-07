/**
 * viewer.v1 for FrankX.
 *
 * FrankX authenticates a single admin account. Its commerce is one-time Stripe
 * products; no recurring plan exists. This adapter tells that truth: an
 * authenticated admin gets an `admin` plan with no paid subscription and
 * product offers whose availability comes from the same sale-status and
 * configuration gate as `/api/checkout`.
 *
 * Pure and dependency-free so it can be tested without NextAuth or a build.
 */

import {
  CHECKOUT_PRODUCTS,
  type CheckoutProduct,
} from "./checkout-products.ts";
import { stripeCheckoutGate } from "./checkout-gate.ts";

export const VIEWER_SCHEMA = "viewer.v1";

export type ViewerOffer = {
  id: string;
  kind: "product";
  label: string;
  available: boolean;
  reason: string | null;
};

export type Viewer = {
  schema: typeof VIEWER_SCHEMA;
  user: { id: string; email: string };
  member: boolean;
  paid: boolean;
  plan: { id: "admin"; name: string; status: "active" };
  entitlements: { adminDashboard: true; customerAccount: false };
  offers: ViewerOffer[];
  nextOffer: ViewerOffer | null;
  generatedAt: string;
};

export type OfferInput = {
  id: string;
  label: string;
  available: boolean;
  reason?: string | null;
};

/** The checkout products, mapped to offers with their real purchase gate. */
export function offersFromEnv(
  env: Record<string, string | undefined>,
  products: Record<string, CheckoutProduct> = CHECKOUT_PRODUCTS,
): OfferInput[] {
  return Object.entries(products).map(([id, product]) => {
    const gate = stripeCheckoutGate(
      {
        status: product.status,
        priceId: env[product.priceEnv] ?? "",
      },
      env.STRIPE_SECRET_KEY,
    );
    if (!gate.ok) {
      return {
        id,
        label: product.name,
        available: false,
        reason:
          gate.refusal === "checkout_gated"
            ? "Not for sale yet."
            : "Checkout is not configured.",
      };
    }
    return { id, label: product.name, available: true, reason: null };
  });
}

export function buildAdminViewer(input: {
  user: { id: string; email: string };
  offers: OfferInput[];
  now?: Date;
}): Viewer {
  const offers: ViewerOffer[] = input.offers.map((offer) => ({
    id: offer.id,
    kind: "product",
    label: offer.label,
    available: offer.available === true,
    reason: offer.available === true ? null : (offer.reason ?? null),
  }));

  return {
    schema: VIEWER_SCHEMA,
    user: { id: input.user.id, email: input.user.email },
    member: true,
    paid: false,
    plan: { id: "admin", name: "FrankX admin", status: "active" },
    entitlements: { adminDashboard: true, customerAccount: false },
    offers,
    nextOffer: offers.find((offer) => offer.available) ?? null,
    generatedAt: (input.now ?? new Date()).toISOString(),
  };
}
