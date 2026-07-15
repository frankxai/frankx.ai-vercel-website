# Success Gates

Do not claim a Property Intelligence OS install is production-ready until these gates pass.

## Owner Gate

- Owner can update approved property facts.
- Owner can review and approve agent drafts.
- Owner knows every blocked v1 action.
- Owner has an urgent escalation path outside AI.

## Renter Gate

- Renter can find common stay/rental information.
- Renter can submit a support request.
- Renter can express renewal/extension interest.
- Renter never sees private owner notes or another renter's data.

## Listing Gate

- Listing draft has channel, headline, description, amenities, rules, missing facts, photo checklist, and owner approval state.
- Publication is manual in v1 unless a terms-approved integration is enabled.
- Draft blocks price, availability, legal, and energy/required-disclosure claims when facts are missing.

## Agent Gate

- Every agent run has role, trigger, input source, output, risk, and approval state.
- Inquiry, listing, support, privacy, and weekly-review dry-runs pass.
- Agents draft but do not send, publish, dispatch, approve, or disclose secrets.

## MCP Gate

- `runtime_health` passes.
- MCP tools use structured input schemas.
- Tools return structured output and suggested owner actions.
- Tool calls are audit logged.
- Tokens are least privilege.

## Portal Gate

- `lint`, `typecheck`, `build`, and smoke checks pass for the portal.
- Desktop and mobile visual QA pass.
- First viewport shows property or operating state.
- No text overlap.
- Real property media or real product proof is used.
- Vercel preview is verified before production handoff.

## Public Release Gate

- Privacy scan passes.
- Download ZIP and checksum exist.
- Manifest lists included files and blocked v1 actions.
- Public page links to the kit, partner guide, v0 prompt, and architecture.
- No private owner/renter facts appear in public artifacts.
