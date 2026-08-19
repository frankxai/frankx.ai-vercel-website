# Install Runbook

Use this runbook to install Property Intelligence OS for one owner or one small agency.

## Phase 0: Decide Scope

- Choose owner install, agency install, or community demo.
- Confirm country/market assumptions.
- Confirm listing channels.
- Confirm what is out of scope for v1.

## Phase 1: Create Repos

1. Fork or copy `property-os-template`.
2. Fork or copy `property-portal-template`.
3. Create a private owner workspace from the template.
4. Keep the strategy/source repo private unless intentionally publishing a sanitized kit.

## Phase 2: Content Intake

Required public-safe inputs:

- property name and slug
- unit types
- public amenities
- public rules
- neighborhood guide
- listing photo candidates
- common renter questions
- escalation policy without private phone numbers in public files

Private inputs stay in runtime storage or private owner workspace:

- renter names
- access codes
- payment details
- identity documents
- signed leases
- unresolved disputes
- private owner financials

## Phase 3: Portal Setup

1. Add sample-safe property content.
2. Configure inquiry, support, owner, admin, and listing routes.
3. Connect database and storage only after the static demo is approved.
4. Add environment variables in Vercel.
5. Run local gates.
6. Deploy preview.
7. Run desktop and mobile visual QA.

## Phase 4: Agent Setup

1. Copy agent role markdown.
2. Copy skills and commands.
3. Configure MCP server only with least-privilege tokens.
4. Run agent dry-runs:
   - create inquiry
   - draft reply
   - create listing draft
   - classify maintenance
   - create approval
   - privacy scan public artifact

## Phase 5: Owner Handoff

Owner must be able to:

- update approved property facts
- review inquiries
- approve or reject draft replies
- see urgent support escalations
- inspect listing drafts
- run weekly review
- know which actions AI is blocked from taking

## Phase 6: Retainer Loop

Weekly managed operations:

- update FAQ gaps
- refresh listings
- review support/tickets
- audit agent runs
- capture before/after proof
- propose next improvement
