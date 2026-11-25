# Win the AI Client delivery rehearsal

Run this from the commerce checkout with its locked dependencies and Node 22.13+.
Build the ZIP in the Academy checkout with its own packaging script. Obtain the
expected archive SHA-256 and full curriculum commit ID from the publisher before
running the rehearsal. Only the receipt belongs in the public PR.

```sh
node --test scripts/tests/academy-delivery-rehearsal.test.mjs scripts/tests/glass-sandbox-fulfillment.test.mjs
node scripts/commerce/rehearse-academy-delivery.mjs /tmp/win-the-ai-client-0.1.zip "$ACADEMY_ARCHIVE_SHA256" "$ACADEMY_SOURCE_COMMIT" /tmp/retrieved-academy-edition.zip
```

The second command writes the exact downloaded ZIP at the unused output path.
The source revision is a publisher assertion. The runner verifies the archive
digest and binds it to that revision through checkout, replay and retrieval. It
does not rebuild the curriculum or prove the origin of the publisher assertion.

The runner uses the existing test checkout, Stripe SDK signature verifier,
SQLite ledger and authenticated private-download handler from #1236. Identity,
Stripe transport, provider reads and private storage are local fixtures. The one
minor currency unit and nonexistent price ID are fixture inputs. They carry no
commercial pricing meaning. Output remains local even if access is later revoked.

Release work remains with #552 and #1317. Admission requires a single merchant,
approved artifact/terms/price, real buyer auth and private storage, test-mode
purchase and refund receipts plus the required review. The fixture registers
no catalogue entry or public route. Its database is temporary and modelled
subjects are synthetic. No external provider receives a request.
