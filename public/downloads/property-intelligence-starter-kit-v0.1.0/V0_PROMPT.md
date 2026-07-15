# v0 / Vercel Template Prompt

Build a premium rental-property operating portal for Property Intelligence OS.

Use Next.js App Router and a restrained, property-first interface. The first viewport must show the property or operating state, not generic SaaS decoration.

Required routes:

- `/`
- `/properties/[slug]`
- `/properties/[slug]/inquire`
- `/stay/[accessCode]`
- `/support`
- `/owner`
- `/admin/setup`
- `/admin/listings`
- `/admin/integrations`
- `/admin/agent-runs`

Required API behavior:

- inquiry submission returns route, owner action, approval state, and audit ID
- support submission classifies urgency and blocks repair promises
- agent run logging records role, trigger, output risk, route, and owner action
- listing dry-run returns channel payload and blocks live publication
- runtime health reports demo/database-ready mode and blocked v1 actions

Design rules:

- property media leads
- owner-review state is visible
- missing facts are shown
- mobile is intentionally composed
- no text overlap
- no fake AI autonomy claims
- no access, payment, lease, or private renter data in public content

V1 blocked actions:

- publish listing
- send renter message
- dispatch vendor
- approve applicant
- disclose access secret
- change price or availability
