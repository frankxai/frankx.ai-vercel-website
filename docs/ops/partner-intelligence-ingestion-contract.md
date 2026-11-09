# Partner Intelligence Ingestion Contract (Gmail -> PartnerStack -> Registry)

This document defines the repeatable operator and agent contract for ingesting partner program notifications (e.g., PartnerStack, Impact, direct vendor emails) into the canonical FrankX partner registry (`data/affiliate/programs.json`, `data/affiliate/programs.csv`, `data/outbound-links.ts`, and `lib/tools/record.ts`) without creating duplicate CMS stores or leaking private credentials.

## 1. Canonical Data Sources & Flow

```text
[Gmail Partner Notification]
        │
        ▼
[1. Source Verification & Triage]
  - Verify sender domain (e.g. partnerstackmail.com, elevenlabs.io)
  - Verify live HTTP redirect chain & PartnerStack dashboard terms
  - Classify decision: ADOPT / HOLD / SKIP
        │
        ▼
[2. Canonical Registry Update (Human-Reviewed PR)]
  - data/affiliate/programs.json (source of truth for ProgramSource & ToolRecord)
  - data/affiliate/programs.csv (tabular export mirror)
  - data/outbound-links.ts (server-side /go/[slug] hop resolution)
  - lib/affiliates/affiliate-manager.ts (MDX <ArticleRecommendation> & <AffiliateCTA>)
        │
        ▼
[3. Automated Guardrails & Freshness Fallback]
  - 45-day freshness check in sponsorDecision() (lib/tools/record.ts)
  - Stale or unverified records automatically fall back to non-affiliate productUrl
```

## 2. Ingestion Rules & Deduplication Contract

1. **Single Registry Key (`id` / `toolSlug`)**:
   - Every partner tool is keyed by `toolSlug(tool)` (for example, `elevenlabs`).
   - Do not create separate JSON files or parallel CMS collections for partner cards.
2. **Primary Hop URL vs Candidate URLs**:
   - Store only one live verified tracking URL in `ourLink` (e.g. `https://try.elevenlabs.io/uc8prmq6tiyt`).
   - Store secondary, historical, or unverified vanity links in `candidateUrls[]` so operators have an audit trail without routing public traffic to unverified hops.
   - Public pages and MDX guides must link to `/go/<slug>` (for example, `/go/elevenlabs`) with `prefetch={false}` and `rel="sponsored noopener"`.
3. **Plan-Tier Commission Accuracy**:
   - Record exact plan-tier commission rates in `commissionDetails[]` and `enterpriseIncluded` rather than summarizing with a single inflated headline percentage.
4. **45-Day Freshness Window**:
   - `sponsorDecision()` in `lib/tools/record.ts` requires `evidence === 'first-party'` and `verifiedOn` within 45 days of the render timestamp.
   - When a record ages past 45 days without re-verification, `builderEmbeds()` automatically downgrades the control from `Sponsored` (`rel="sponsored noopener"`) to `Editorial` (`rel="noopener"`) pointing to the clean vendor origin.
5. **Privacy & Credential Hygiene**:
   - Never commit PartnerStack dashboard session cookies, raw inbox headers, personal email addresses, or `ELEVENLABS_API_KEY` secrets into repository files.
   - Analytics events (`trackEvent`) must pass `sanitizeAnalyticsProperties()` and never include full URLs, query parameters, or PII keys.

## 3. November 2026 Partner Triage Ledger

| Candidate | Source Signal | Verification Result | Decision | Action Taken |
|---|---|---|---|---|
| **ElevenLabs** | PartnerStack acceptance & link update (`try.elevenlabs.io`) | Verified `https://try.elevenlabs.io/uc8prmq6tiyt` HTTP 302 -> `https://elevenlabs.io/?pscd=try.elevenlabs.io&ps_partner_key=uc8prmq6tiyt...`. Confirmed 22% recurring for 12m on Starter/Creator/Pro/Scale, 11% for 12m on Business, Enterprise excluded, 90-day cookie. Kept legacy `7x6qh6upgry8` and unverified `frankriemer` in `candidateUrls`. | **ADOPT** | Updated `data/affiliate/programs.json`, `data/outbound-links.ts`, `/resources/builder-stack`, `/guides/elevenlabs-voice-guide`, `/partners`, and `/api/voice/audio-briefing`. |
| **Ironstone Design (`ironstonedesign.com`)** | Inbound / candidate review | Outside FrankX core AI software, agentic engineering, and creator production stack; no first-party production usage on `frankx.ai`. | **HOLD** | Excluded from public `/resources` and `data/affiliate/programs.json` until a verified first-party workflow exists. |
