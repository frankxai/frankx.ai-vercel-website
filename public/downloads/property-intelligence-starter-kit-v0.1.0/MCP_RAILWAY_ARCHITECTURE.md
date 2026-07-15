# MCP And Railway Architecture

The hosted agent layer is a focused MCP server that exposes safe property operations to Codex, Claude Code, and compatible agent hosts.

## Deployment Shape

```text
Vercel portal
  -> secure API routes
  -> database and storage
  -> sanitized GitHub issues

Codex / Claude Code
  -> property-os MCP server on Railway
  -> approved GitHub content
  -> runtime API with least-privilege token
```

## MCP Server Responsibilities

The MCP server should be single-purpose: property operations only. It should not become a general browser, shell, or credential broker.

## Resources

- `property://profiles` returns public-safe property and unit metadata.
- `property://knowledge` returns approved FAQ and policy articles.
- `property://listing-drafts` returns draft summaries without private renter data.
- `property://tickets/sanitized` returns sanitized support ticket summaries.
- `property://approvals/pending` returns owner decisions that need review.

## Tools

- `property_search_facts(query, scope)` searches approved facts only.
- `listing_create_draft(propertySlug, channel, objective)` creates a draft and missing-fact checklist.
- `inquiry_prepare_reply(inquiryId)` drafts a reply with required owner approvals.
- `maintenance_triage(ticketId)` classifies urgency and next owner action.
- `approval_create(subject, risk, summary)` creates an owner approval record.
- `privacy_scan_text(text, targetRepo)` blocks private data before public/template movement.
- `runtime_health()` checks database, storage, GitHub, and portal status.

## Prompts

- `weekly_owner_review(propertySlug)`
- `listing_refresh(propertySlug, channel)`
- `renter_faq_gap_analysis(propertySlug)`
- `partner_install_readiness(clientType)`

## Required Environment

- `PROPERTY_OS_API_URL`
- `PROPERTY_OS_API_TOKEN`
- `GITHUB_TOKEN_READONLY` for approved source content
- `GITHUB_ISSUE_TOKEN_LIMITED` for sanitized issue creation
- `DATABASE_URL` when the MCP server reads runtime summaries directly

## Security Rules

- Use least-privilege tokens.
- Redact renter names, access codes, payments, lease files, identity documents, and owner-private financials.
- Log every tool call with timestamp, caller, tool, risk level, and sanitized summary.
- Return structured errors with suggested owner action.
- Rate-limit expensive or external API tools.
- Keep live publication, renter messaging, vendor dispatch, and access-secret disclosure out of v1.

## Railway Service Checklist

1. Create Railway service from the MCP server repo/folder.
2. Set environment variables manually in Railway.
3. Add health check route or `runtime_health` smoke command.
4. Run MCP smoke test before connecting production agents.
5. Rotate tokens after any failed public/privacy scan.
