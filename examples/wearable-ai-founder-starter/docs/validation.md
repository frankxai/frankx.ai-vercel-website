# Validation receipt

Verified: 2026-11-13. Runtime: Node.js v24.22.1. No npm dependencies installed.

| Check | Result | Scope |
| --- | --- | --- |
| `npm test` | PASS, 17/17 | Node Web Request/Response route, policy and actual HTTP flow tests |
| Actual HTTP smoke | PASS, 200 | Spawned loopback Node server; authenticated `/capabilities` returned mock-only status |
| Native SDK build | NOT RUN | No Meta/Android SDK sources or toolchain in this backend example |
| Physical glasses | NOT RUN | Device profiles are explicitly mock |
| Paid live inference | NOT RUN | Raw provider request/response contract tested with injected HTTP response |
| Vercel standalone preview | NOT DEPLOYED | Documented `fetch` entry point staged; cloud build/routing unverified |
| Production tool action | DISABLED | Only explicit local in-memory save; Vercel preview cannot confirm actions |
| Durable memory/billing | NOT IMPLEMENTED | Process-local demo counters and receipts only |

The 17 tests exercise: complete mock flow and replay rejection; authentication; capability inflation; malformed/prototype profile and capability rejection; non-object JSON rejection on both POST routes; fresh/purpose-scoped consent; separate cloud consent; image URL/MIME/base64/size checks; nonce/action binding; expiry; model injection cannot choose a tool or self-approve; concurrent budget reservation; preview action disablement; JSON/content-type/body size; official Responses API multimodal shape/raw parsing; sanitized upstream errors; complete propose/confirm behavior through a spawned loopback HTTP server.

Independent review fixes: profile lookup now requires a string and an own registry key before dereferencing; capability negotiation ignores inherited values; both POST routes reject null/array/scalar JSON with 400. The README explicitly states that the same bearer can automate confirmation and that CLI approval is illustrative, not proof of human presence.

The fixture is a 1×1 PNG. It tests transport, not visual reasoning quality. A real authorized image, enabled image-input model, explicit cloud consent and API project are required to evaluate actual multimodal inference.

Production adoption must connect the established identity/tenant, durable confirmation, gateway, redaction, storage, audit, usage and MCP contracts. This kit deliberately does not claim these existing systems have been integrated.
