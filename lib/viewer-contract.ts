/**
 * viewer.v1 for FrankX.
 *
 * FrankX has admin credentials, not customer accounts, and its commerce is
 * one-time Stripe products, not subscriptions. This adapter tells that truth:
 * an authenticated admin gets an `admin` plan with no paid subscription and
 * product offers whose availability comes from the same env gate as
 * `/api/checkout`.
 *
 * Pure and dependency-free so it can be tested without NextAuth or a build.
 */

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

/** The three products `/api/checkout` knows how to sell. */
export const PRODUCT_OFFERS = [
  {
    id: "creative-ai-toolkit",
    label: "Creative AI Toolkit",
    priceEnv: "STRIPE_PRICE_TOOLKIT",
  },
  {
    id: "agentic-creator-os",
    label: "ACOS Creator Kit",
    priceEnv: "STRIPE_PRICE_ACOS",
  },
  {
    id: "suno-prompt-library",
    label: "Suno Prompt Pack",
    priceEnv: "STRIPE_PRICE_SUNO",
  },
] as const;

/**
 * Product availability mirrors the checkout route: a Stripe secret plus the
 * product's price id. Anything missing is unavailable with a reason, not a
 * dead buy button.
 */
export function offersFromEnv(
  env: Record<string, string | undefined>,
): OfferInput[] {
  const stripeReady = Boolean(env.STRIPE_SECRET_KEY?.trim());
  return PRODUCT_OFFERS.map((offer) => {
    if (!stripeReady) {
      return {
        id: offer.id,
        label: offer.label,
        available: false,
        reason: "Stripe checkout is not configured.",
      };
    }
    if (!env[offer.priceEnv]?.trim()) {
      return {
        id: offer.id,
        label: offer.label,
        available: false,
        reason: `${offer.priceEnv} is not configured.`,
      };
    }
    return {
      id: offer.id,
      label: offer.label,
      available: true,
      reason: null,
    };
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
