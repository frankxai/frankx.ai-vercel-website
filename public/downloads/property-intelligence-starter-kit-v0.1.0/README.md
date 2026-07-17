# Property Intelligence Starter Kit v0.1.0

Public-safe starter kit source for a repo-native rental property operating system.

## Included Workflows

- property profile
- approved renter knowledge base
- listing draft studio
- inquiry draft and approval
- maintenance triage
- vacancy pipeline
- weekly owner dashboard
- agent run ledger
- MCP dry-run tools
- Vercel portal routes
- Railway service architecture
- partner implementation model

## Public Kit Files

- `manifest.json`
- `DOWNLOAD.md`
- `V0_PROMPT.md`
- `PARTNER_IMPLEMENTATION.md`
- `AGENT_TEAM.md`
- `MCP_RAILWAY_ARCHITECTURE.md`
- `INSTALL_RUNBOOK.md`
- `BUSINESS_MODEL.md`
- `SUCCESS_GATES.md`
- `DATA_BOUNDARIES.md`

## Install

1. Copy or clone `property-os-template`.
2. Copy or clone `property-portal-template`.
3. Fill in the public-safe property profile first.
4. Add private details only after `DATA_BOUNDARIES.md` is reviewed.
5. Use Codex or Claude for drafts, not final renter-facing commitments.
6. Run the install checklist in `INSTALL_RUNBOOK.md`.
7. Publish the portal only after visual QA, owner approval, and `SUCCESS_GATES.md`.

## Product Shape

This kit is not a generic property management app. It is a repo-native property operating system:

- owners keep the approved source of truth in GitHub
- renters get a premium self-service portal
- agents draft replies, listings, and runbooks under human approval
- runtime data stays in a secure database, not in public repos
- implementers can sell setup and managed operations as a productized service

## Hard Rules

- No automatic listing posting in v1.
- No automatic renter-facing commitments in v1.
- No private renter data in public/template repos.
- No legal, tax, lease, or payment decisions from AI.
