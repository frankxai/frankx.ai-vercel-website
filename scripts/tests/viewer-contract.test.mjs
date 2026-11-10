import assert from "node:assert/strict";
import { test } from "node:test";
import { CHECKOUT_PRODUCTS, NOT_FOR_SALE } from "../../lib/checkout-products.ts";
import {
  VIEWER_SCHEMA,
  buildAdminViewer,
  offersFromEnv,
} from "../../lib/viewer-contract.ts";

const now = new Date("2026-11-07T12:00:00.000Z");
const user = { id: "admin-1", email: "admin@frankx.ai" };
const fullyConfigured = {
  STRIPE_SECRET_KEY: "sk_test_x",
  ...Object.fromEntries(
    Object.values(CHECKOUT_PRODUCTS).map((product) => [
      product.priceEnv,
      `price_${product.priceEnv.toLowerCase()}`,
    ]),
  ),
};

test("an admin session maps to a truthful viewer.v1 account", () => {
  const viewer = buildAdminViewer({
    user,
    offers: offersFromEnv(fullyConfigured),
    now,
  });
  assert.equal(viewer.schema, VIEWER_SCHEMA);
  assert.deepEqual(viewer.user, user);
  assert.equal(viewer.member, true);
  assert.equal(viewer.paid, false);
  assert.deepEqual(viewer.plan, {
    id: "admin",
    name: "FrankX admin",
    status: "active",
  });
  assert.deepEqual(viewer.entitlements, {
    adminDashboard: true,
    customerAccount: false,
  });
  assert.equal(viewer.generatedAt, now.toISOString());
});

test("every checkout product is represented, and the current closed status wins over configuration", () => {
  const offers = offersFromEnv(fullyConfigured);
  assert.equal(offers.length, Object.keys(CHECKOUT_PRODUCTS).length);
  assert.ok(offers.every((offer) => offer.available === false));
  assert.ok(offers.every((offer) => offer.reason === "Not for sale yet."));

  const viewer = buildAdminViewer({ user, offers, now });
  assert.equal(viewer.nextOffer, null);
});

test("a for-sale product becomes available; a closed one does not", () => {
  const offers = offersFromEnv(
    {
      STRIPE_SECRET_KEY: "sk_test_x",
      PRICE_OPEN: "price_open",
    },
    {
      open: { name: "Open product", priceEnv: "PRICE_OPEN", amount: 100, status: "for sale" },
      closed: { name: "Closed product", priceEnv: "PRICE_OPEN", amount: 100, status: NOT_FOR_SALE },
    },
  );
  const byId = Object.fromEntries(offers.map((offer) => [offer.id, offer]));
  assert.equal(byId.open.available, true);
  assert.equal(byId.open.reason, null);
  assert.equal(byId.closed.available, false);
  assert.equal(byId.closed.reason, "Not for sale yet.");
});

test("a for-sale product without a price is unavailable, not silently sold", () => {
  const offers = offersFromEnv(
    { STRIPE_SECRET_KEY: "sk_test_x" },
    {
      open: { name: "Open product", priceEnv: "PRICE_MISSING", amount: 100, status: "for sale" },
    },
  );
  assert.equal(offers[0].available, false);
  assert.equal(offers[0].reason, "Checkout is not configured.");
});

test("missing Stripe configuration makes even a for-sale product unavailable", () => {
  const offers = offersFromEnv(
    { PRICE_OPEN: "price_open" },
    {
      open: { name: "Open product", priceEnv: "PRICE_OPEN", amount: 100, status: "for sale" },
    },
  );
  assert.equal(offers[0].available, false);
  assert.equal(offers[0].reason, "Checkout is not configured.");
});

test("only an explicit true becomes an available offer", () => {
  const viewer = buildAdminViewer({
    user,
    offers: [
      { id: "a", label: "A", available: false, reason: "Not ready." },
      { id: "b", label: "B", available: true },
    ],
    now,
  });
  assert.equal(viewer.offers[0].available, false);
  assert.equal(viewer.offers[0].reason, "Not ready.");
  assert.equal(viewer.nextOffer?.id, "b");
});

test("the contract never invents a subscription or a paid plan", () => {
  const viewer = buildAdminViewer({
    user,
    offers: offersFromEnv(fullyConfigured),
    now,
  });
  assert.equal(viewer.paid, false);
  assert.equal(viewer.entitlements.customerAccount, false);
  assert.equal("subscription" in viewer.plan, false);
});
