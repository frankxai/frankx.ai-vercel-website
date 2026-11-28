# ACOS Creator Kit release

The FrankX store slug is `agentic-creator-os`. The existing price is USD 47, one time. The public example is at `/acos#creator-kit`. The paid addition is Release Desk, an offline HTML exercise with three cases and Markdown export.

| Input | Value |
| --- | --- |
| Merchant archive | ACOS-Release-Desk-v1.zip |
| Archive SHA-256 | 09b2997d74751c64e91b758999fe90d0069466dbdd68d113bb8597ce813233e1 |
| Expected member | ACOS-Release-Desk.html |
| Member SHA-256 | 66f17484b8cba242973a5d8e52e13a09d8c6df734f2e962b0eb7fd00eb3c0304 |
| Buyer exercise | Load a worked case, change the owner, export a Markdown handoff and inspect its evidence reference |
| Tracked destinations | /acos?utm_source=linkedin&utm_medium=social&utm_campaign=2026-11-acos-fieldnote#creator-kit and /acos?utm_source=newsletter&utm_medium=email&utm_campaign=2026-11-acos-fieldnote#creator-kit |

Keep the paid archive in private release storage. The reference PDFs are already public. The catalog path is a proposed fulfillment mapping. Verify private object access, the actual signed buyer download and the checksum before reviewing a change to the shared sale status. Confirm the package description, price, live delivery and terms with the offer owner.

## Purchase reconciliation

The signed-in Stripe Events API is the source for the private purchase projection. It supports replay and makes successful delayed payments visible. The browser reports engagement. The payment-intent ID identifies a purchase, the refund ID identifies a refund, and source labels express the campaign entry the visitor used. A forwarded social link retains its campaign label. The report does not infer advertising causality.

Run the following in the report runtime with an environment-bound restricted Stripe key. Set STRIPE_REPORT_RESTRICTED_KEY using the runtime credential binding. The reader needs Events, PaymentIntents and Checkout Sessions read. The command takes an Amsterdam calendar date and an explicit mode.

```sh
node --experimental-strip-types scripts/commerce/acos-revenue.mjs 2026-11-22 test
```

A closed day inside Stripe event retention is required. Store private dated snapshots for longer history. Inspect coverage before quoting totals. Full and partial refunds enter on the success day. Merchant fees, payouts and tax are outside these cash-activity totals.

## Handoff

The release editor sends the product slug, edition, promise and evidence reference to the engineer. The engineer hands an immutable revision and preview to the reviewer. The sandbox reviewer returns checkout, paid event, fulfillment, archive digest and refund references. A second operator reconciles the monetary events and checks that a replay yields one purchase. The publisher receives approved copy and a campaign link. The merchant owner controls live credentials and availability. No secret value belongs in these handoffs.

The first paid announcement requires agreement on the purchased contents and an actual sandbox purchase-to-file receipt. Release copies, screenshots and public samples do not fulfill a paid order.
