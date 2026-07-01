# FrankX Operations System

*One front door. One pipeline. Built 2026-06-22.*

The operating system for how inbound work reaches Frank and moves to close —
plus the agentic cadence that runs the business. Replaces 11 scattered `mailto:`
links with a single typed intake that notifies, acknowledges, records, and tracks.

---

## Why

Before: every "contact Frank" CTA was a `mailto:` into the IONOS inbox. No record,
no auto-acknowledgement, no source attribution, no pipeline. A lead emailed and
then waited in silence; Frank triaged by scrolling mail. Three *other* intake
routes (`workshop-intake`, `coaching-apply`, `cohort/apply`) each had their own
schema and none fed the main `/contact` page.

After: one endpoint, one schema, one durable record, five parallel sinks.

---

## Architecture

```
Visitor → /contact form (picks intent)
            │
            ▼
      POST /api/intake  ──(zod validate + honeypot)──┐
            │                                          │
   ┌────────┼──────────┬───────────┬─────────┬─────────┐
   ▼        ▼          ▼           ▼         ▼
 ① notify  ② auto-ack  ③ Notion    ④ JSONL   ⑤ Slack
 frank@    requester   Inquiries   /admin/   #leads
 frankx.ai (branded)   CRM (DB)    intake    ping
```

Every stage degrades gracefully — a failure in one never blocks the others, and
the API returns `ok:false` (so the form honestly retries) *only* when the inquiry
reached **no** durable sink (no notify, no Notion, no log). Any one = success.

### Files

| File | Role |
|---|---|
| `lib/contact-intake.ts` | Schema, intent taxonomy, the five-stage pipeline. Single source of truth. |
| `app/api/intake/route.ts` | `POST` (pipeline) + `GET` (auth-gated dashboard feed). |
| `components/contact/ContactForm.tsx` | Client form: intent selector, honeypot, optimistic states. |
| `app/contact/page.tsx` | Server shell + JSON-LD + form. Accepts `?intent=` deep-links. |
| `app/admin/intake/page.tsx` | Unified inbox — reads new intake log + folds in legacy workshop entries. |

### Intent taxonomy

`workshop · sprint · partnership · press · advisory · general`

Commercial intents (workshop/sprint/partnership/advisory) route to the booking
nudge in the auto-acknowledgement; informational ones (press/general) route to
the public work instead.

Deep-link any CTA with `?intent=`:
`/contact?intent=sprint` pre-selects "Implementation sprint" in the form.

---

## Environment variables

The system **ships working with just `RESEND_API_KEY`** (notify + auto-ack). Each
additional var lights up another layer. Set in Vercel → Project → Settings → Env.

| Var | Layer | Required? | Value / notes |
|---|---|---|---|
| `RESEND_API_KEY` | notify + auto-ack | **already set** | Existing Resend key. |
| `OPERATOR_EMAIL` | where notifications land | optional | Defaults to `frank@frankx.ai`. |
| `NOTION_TOKEN` | durable CRM | **provision to enable** | Notion internal integration token. **Must be shared with the Inquiries DB** (see below). |
| `NOTION_INQUIRIES_DB_ID` | durable CRM | **provision to enable** | `e41dda59e77549a68623f3fec88269f7` |
| `SLACK_WEBHOOK_URL` | #leads ping | optional | Incoming-webhook URL for your leads channel. |
| `INTAKE_AUDIENCE_ID` | nurture | optional | Resend audience id to add leads to. |
| `NEXT_PUBLIC_BOOKING_URL` | auto-ack CTA | optional | Defaults to `/contact`; set to your Cal.com link to surface booking in the confirmation email. |
| `ADMIN_TOKEN` | dashboard auth | recommended | Gates `GET /api/intake` and `/admin/intake`. |

### Notion CRM — one-time setup

The **Inquiries (CRM)** database is already created:
<https://app.notion.com/p/e41dda59e77549a68623f3fec88269f7>

Pipeline: `New → Triaged → Call booked → Proposal → Won → Lost`. Columns: Name,
Email, Intent, Stage, Company, Source, Message, Received.

To enable writes from production:
1. Create (or reuse) a Notion **internal integration** → copy its token →
   set `NOTION_TOKEN` in Vercel.
2. Open the Inquiries DB → `•••` → **Connections** → add that integration.
   *(Notion writes 404 if the token can't see the DB — this is the #1 gotcha.)*
3. Set `NOTION_INQUIRIES_DB_ID=e41dda59e77549a68623f3fec88269f7`.
4. Submit a test from `/contact` → a row appears in Notion.

Until `NOTION_TOKEN` is set, the CRM stage is skipped cleanly and the JSONL log +
email notification carry the record.

---

## The four layers

1. **Capture** — one front door (`/api/intake`), intent discriminator, mailto as fallback.
2. **Acknowledge** — operator notification (reply-to = requester) + instant branded auto-reply to the requester.
3. **Track** — Notion CRM (durable, survives Vercel restarts) + `/admin/intake` live mirror.
4. **Execute** — the weekly agentic cadence: `/ops` skill in ACOS (triage inbox · advance pipeline · sweep PRs · plan content).

---

## Migration notes & follow-ups

- **Legacy intake routes** (`workshop-intake`, `coaching-apply`, `cohort/apply`)
  still run independently. The dashboard already folds workshop entries into the
  unified view. Next: point those forms at `/api/intake` with the right `intent`
  and retire the duplicate handlers.
- **JSONL is ephemeral on Vercel** (per Fluid Compute instance). Notion is the
  durable source of truth once wired; the JSONL is a local mirror + zero-config fallback.
- **Calendar booking** currently surfaces the booking link in the auto-ack and
  the form's success state. A full Cal.com embed in-flow is the next increment
  (set `NEXT_PUBLIC_BOOKING_URL` to your Cal link to activate the email CTA now).
