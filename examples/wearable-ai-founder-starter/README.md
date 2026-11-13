# Wearable AI Founder Starter Kit

An executable teaching example: **user-authorized image → multimodal observation → reviewable proposal → explicit approval → local note receipt**. Zero runtime dependencies. Native glasses SDKs are **not** included or connected. All device profiles are mocks owned by this example.

## Run the complete local flow

Requirements: Node.js 22 or later; tested with Node.js 24.22.1 on 2026-11-13. No `npm install` is required.

```bash
cp .env.example .env
node --input-type=module -e "import {randomBytes} from 'node:crypto'; console.log(randomBytes(32).toString('hex'))"
```

Replace `DEMO_API_TOKEN` in `.env` with that generated value. Do not commit `.env`.

```bash
npm test
npm start
```

In a second terminal, in this same directory:

```bash
npm run demo
```

The client submits a transparent 1×1 PNG fixture. The **mock** inference response deliberately makes no visual interpretation. Read the displayed proposal; type `approve` to save it to the server's process memory. Any other input leaves the proposal unexecuted. A receipt is returned. No CRM, ticketing, payment, calendar or external MCP action is invoked.

The HTTP server binds to `127.0.0.1`. Stopping it removes proposals, receipts and demo usage. This is an educational local record, not durable memory or a production tool executor.

## Optional real multimodal inference

Set these variables in `.env`:

```dotenv
INFERENCE_MODE=openai
OPENAI_API_KEY=your-private-server-key
OPENAI_MODEL=your-enabled-image-input-model-id
```

`your-enabled-image-input-model-id` is a placeholder, not a package or model recommendation. Select an actual image-capable Responses API model enabled for your API project; no model is silently selected. Restart the server after changing configuration. Replace the fixture `image` in `fixtures/capture.json` with a data URL for an **authorized** PNG/JPEG photo (≤768 KiB decoded). The 1×1 test fixture is not a useful vision task.

The CLI independently requires cloud-processing consent:

```bash
DEMO_ALLOW_CLOUD=yes npm run demo
```

Real mode makes a billable `POST https://api.openai.com/v1/responses` request using `input_text` and `input_image`, `detail: "low"`, `store: false`, and at most 300 output tokens. It uses the raw HTTP response's message/content array. No SDK package is needed. Timeout: 20 seconds. There are no retries. `store:false` controls Responses storage; it is not a zero-retention or no-training guarantee. Consult your provider account/data terms.

**Validation boundary:** the provider request shape and raw response parsing are exercised against a deterministic injected HTTP response. No paid live inference request was run. No native Meta or Android app was compiled or device-tested.

## Endpoints

All routes require `Authorization: Bearer <DEMO_API_TOKEN>`. The token maps to the one fixed server principal `local-demo-founder`; the caller cannot select actor identity in JSON. This is single-user demo authentication, not an identity provider.

| Method | Local route | Behavior |
| --- | --- | --- |
| GET | `/capabilities` | Returns conservative server-owned mock profiles and current mode |
| POST | `/propose` | Validates profile, capture consent, image, budget; returns fixed local-note proposal |
| POST | `/confirm` | Requires exact proposal ID, action hash, secret nonce, and `approve:true`; consumes once |
| GET | `/meter` | Process-local attempted inference count and observed token counts; no billing |

Capture shape is in `fixtures/capture.json`. `consent.grantedAt` must be a current ISO timestamp. Capture consent is scoped to `purpose:"repair-note"`; `cloudInference:true` is separately required in real mode. These flags are assertions supplied by a trusted demo caller; they do not establish actual bystander consent. A production device adapter must originate a user-visible capture event and bind authorization to that event.

The profile intersection rejects unsupported/unknown capabilities rather than accepting a client assertion that a display or camera exists. Profile identifiers must be strings naming an own property of the server registry; arrays, objects and prototype keys cannot alias a profile. Only explicitly supplied own capability values count. Profile names such as `mock-audio-camera` are **application-defined**, not vendor API identifiers. Production requires a server-controlled device registry, SDK-reported permissions, connection state, version checks and, where available, attestation. Do not upgrade these mocks into claims of Samsung or Meta support.

Inference output is data only. The tool name `save_local_note` and destination are fixed by server code. Model output cannot grant approval, choose a tool or call an external service. The actor, action hash, random nonce and 120-second expiry bind confirmation to the exact reviewed proposal. Failed confirmation does not consume it; successful confirmation does. Replay fails within the process. Any client rendering the note must use text nodes, never raw HTML.

**Human-presence boundary:** the same bearer credential can programmatically submit both `/propose` and `/confirm`. The CLI's typed `approve` step illustrates a review interaction; it does not prove human presence or provide independent authorization. Production needs a separately authenticated trusted approval channel or authenticator, bound to the exact transaction and inaccessible to the inference agent. The demo's fixed actor and confirmation nonce provide request binding, not that stronger trust separation.

## Files

```text
api/index.mjs             Vercel preview handler; actions explicitly disabled
fixtures/capture.json     Mock capture event; image fixture and consent template
scripts/demo.mjs          Interactive local review and confirm client
src/app.mjs               Auth, routes, proposal state, budgets, receipts
src/inference.mjs         Mock and official Responses HTTP adapter
src/policy.mjs            Server profile negotiation and input policy
src/server.mjs            Loopback HTTP transport
test/app.test.mjs         Golden flow and policy/injection/HTTP-contract tests
vercel.json              Rewrites all /api/* routes to one function
```

## Vercel preview deployment

The repository includes the documented Node.js Web `fetch` export in `api/index.mjs`. Its `/api/propose` route returns a **non-executable observation preview**, with no confirmation nonce. `/api/confirm` fails closed. In-memory state must not authorize production actions or bill customers across serverless instances.

Use an existing approved Vercel project or a separate preview project rooted at this directory. Framework: Other. Node: 22.x or 24.x. No frontend build command or dependencies. In the project environment settings, set a newly generated `DEMO_API_TOKEN` for **Preview only** and `INFERENCE_MODE=mock`. Do not put the token in public JavaScript or `NEXT_PUBLIC_*` variables.

Import this branch through Vercel's Git integration and deploy a Preview. With an already installed/authenticated Vercel CLI, the equivalent command from this directory is:

```bash
vercel
```

Do not use `--prod`. Exact CLI installation/version must be selected by your environment; this kit does not claim an installed or pinned CLI. Configure `/api/capabilities`, `/api/meter`, and `/api/propose` requests with the bearer token on the server/trusted client. Protect the preview with Vercel deployment access controls as well. The app's 1.1 MB JSON ceiling is deliberately below Vercel's documented 4.5 MB function payload limit.

No remote deployment was performed for this standalone starter. The preview handler is locally exercised by the same Web Request/Response path as the app tests, but cloud routing/build behavior remains unverified until a preview deployment is inspected.

## Production integration boundary

Reuse the existing Starlight identity, gateway, memory and tool-execution contracts after inspection. Keep device adapters thin and route a typed capture event into the shared backend. Before enabling real tools:

- Replace the demo bearer token with per-user, per-tenant identity; keep vendor/API secrets server-side.
- Persist proposals and receipts in a transactional store with atomic consume/idempotency, actor/tenant/action binding, revocation and audit retention.
- Enforce budget reservations in a shared durable counter and reconcile provider usage; process counters are not metered billing.
- Decode/re-encode images, constrain dimensions, strip EXIF, redact sensitive regions when appropriate and minimize retention. Current checks cover MIME framing, signatures, canonical base64 and bytes, not full media sanitization.
- Obtain actual capture/bystander consent appropriate to the workflow. Add deletion/export and a selected data region. Cloud consent must survive a device disconnect/reconnect boundary without becoming blanket authorization.
- Apply destination allowlists and least-privilege tool credentials; persist a human-readable, exact argument preview. Approval comes from a trusted UI/authenticator, never a model statement or an unauthenticated boolean.

## Primary technical sources

Verified 2026-11-13. Publication/update dates are source-owned and should be rechecked before release.

- [OpenAI image inputs guide](https://developers.openai.com/api/docs/guides/images-vision): text plus image/data-URL input.
- [Responses create API](https://developers.openai.com/api/reference/resources/responses/methods/create): request options and raw output envelope.
- [Vercel Node.js runtime](https://vercel.com/docs/functions/runtimes/node-js), page updated 2026-08-11: root `api/`, native ES modules and Web `fetch` handler.
- [Vercel function limits](https://vercel.com/docs/functions/limitations), page updated 2026-08-24: payload bounds.

This starter is original educational code. It contains no Meta, Samsung, Google or other vendor SDK implementation or trademarked assets.
