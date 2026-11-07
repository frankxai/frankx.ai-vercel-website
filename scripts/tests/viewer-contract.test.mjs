import assert from "node:assert/strict";
import { test } from "node:test";
import {
  VIEWER_SCHEMA,
  buildAdminViewer,
  offersFromEnv,
} from "../../lib/viewer-contract.ts";

const now = new Date("2026-11-07T12:00:00.000Z");
const user = { id: "admin-1", email: "admin@frankx.ai" };
const configuredEnv = {
  STRIPE_SECRET_KEY: "sk_test_x",
  STRIPE_PRICE_TOOLKIT: "price_toolkit",
  STRIPE_PRICE_ACOS: "price_acos",
  STRIPE_PRICE_SUNO: "price_suno",
};

test("an admin session maps to a truthful viewer.v1 account", () => {
  const viewer = buildAdminViewer({
    user,
    offers: offersFromEnv(configuredEnv),
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

test("offers are available only when checkout has both the key and the price", () => {
  const offers = offersFromEnv(configuredEnv);
  assert.equal(offers.length, 3);
  assert.ok(offers.every((offer) => offer.available === true));
  assert.ok(offers.every((offer) => offer.reason === null));

  const viewer = buildAdminViewer({ user, offers, now });
  assert.deepEqual(viewer.nextOffer, {
    id: "creative-ai-toolkit",
    kind: "product",
    label: "Creative AI Toolkit",
    available: true,
    reason: null,
  });
});

test("missing Stripe configuration makes every offer unavailable with a reason", () => {
  const offers = offersFromEnv({});
  assert.ok(offers.every((offer) => offer.available === false));
  assert.ok(
    offers.every((offer) => offer.reason === "Stripe checkout is not configured."),
  );
  const viewer = buildAdminViewer({ user, offers, now });
  assert.equal(viewer.nextOffer, null);
});

test("one missing price id does not hide the other configured products", () => {
  const offers = offersFromEnv({
    ...configuredEnv,
    STRIPE_PRICE_ACOS: "",
  });
  const byId = Object.fromEntries(offers.map((offer) => [offer.id, offer]));
  assert.equal(byId["creative-ai-toolkit"].available, true);
  assert.equal(byId["agentic-creator-os"].available, false);
  assert.equal(
    byId["agentic-creator-os"].reason,
    "STRIPE_PRICE_ACOS is not configured.",
  );
  assert.equal(byId["suno-prompt-library"].available, true);
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
    offers: offersFromEnv(configuredEnv),
    now,
  });
  assert.equal(viewer.paid, false);
  assert.equal(viewer.entitlements.customerAccount, false);
  assert.equal("subscription" in viewer.plan, false);
});
