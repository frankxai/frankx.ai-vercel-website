# Newsletter Contacts migration — staged draft

Status: BLOCKED for production. Extends issue #478; does not migrate the sender.

The two public signup routes use Resend Contacts rather than legacy Audience contact endpoints. The shared helper distinguishes a successful lookup from provider conflicts, errors and failed creation. Existing contacts are reported as already on file and are never rewritten by a repeated public signup. Resource-only requests omit the newsletter Segment. New contacts carry explicit Topic choices and conditional Segment membership in one creation payload. Unknown property fallback retains targeting and preferences.

Configuration requires RESEND_SEGMENT_ID alongside the existing Resend key. No provider IDs or credentials should be supplied by the browser. Missing targeting fails closed. Do not deploy with incomplete configuration.

Confirmed newsletter enrollment currently returns 503 without writes after checking global suppression. This is intentional: an email-bound expiring HMAC proves control of a link but does not serialize competing consent changes or invalidate stale links. The previously attempted Topic PATCH followed by Segment POST could restore membership after a completed withdrawal. That POST was removed. Confirmed withdrawal removes Segment membership before updating Topics; partial failure must be reconciled before activation.

## Release requirements

- Authoritative per-contact/program consent revision, stale-token rejection and transactional outbox, with one durable workflow owner.
- Test concurrent creation/upsert semantics against a designated test contact; omitted global suppression must be verified against current provider behavior.
- Sender migration under #478: exact approved artifact and recipient cohort, current Topic opt-in plus global suppression enforcement, immutable provider ID, idempotency and partial delivery reconciliation. Existing send.mjs is unchanged.
- Signed webhook validation, replay deduplication, suppression reconciliation and consent history.
- Required full build and CI success; independent review tied to the final revision.
- Test-address delivery, preference/withdrawal checks and email-client rendering before a real cohort.

## Validation

pnpm run test:email-safety includes both the existing email safety contracts and the new helper/route behavior tests. Tests use fixture credentials and mocked provider responses. They do not send messages or prove deliverability. Deployment, production configuration and provider updates are separate actions.
