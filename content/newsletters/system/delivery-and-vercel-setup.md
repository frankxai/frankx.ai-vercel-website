# Newsletter Delivery and Vercel Setup

This file is the operator checklist for making the FrankX Newsletter Intelligence cockpit work end to end on the main Vercel site.

## Delivery Roles

Gmail MCP is for internal preview packets only. It is useful when Frank wants a review email immediately, but it is not the production newsletter platform.

Resend is the transactional and test layer:

- welcome email
- confirmation links
- unsubscribe links
- single-recipient test sends
- contact and topic operations
- fallback delivery

Beehiiv is the recommended growth and publishing layer:

- newsletter publish
- archive/growth tooling
- analytics
- referrals
- sponsorship readiness
- audience operations

The repo remains the source of truth for:

- issue MDX
- variants
- simulation reports
- approval packets
- planned calendar
- cockpit inventory

Substack is out of scope for V1 unless it becomes a deliberate mirror.

## Required Environment Variables

Local `.env.local`:

```bash
RESEND_API_KEY="re_xxx"
RESEND_AUDIENCE_ID="4d2e913e-6903-4dd4-8749-c02cdb844331"
EMAIL_TOKEN_SECRET="generate-a-long-random-secret"
NEWSLETTER_PUBLISH_APPROVAL_TOKEN="generate-a-second-long-random-secret"
NEXT_PUBLIC_SITE_URL="https://frankx.ai"
SITE_URL="https://frankx.ai"
```

Beehiiv, when ready:

```bash
BEEHIIV_API_KEY="..."
BEEHIIV_PUBLICATION_ID="..."
```

Optional sender override for local preview scripts:

```bash
NEWSLETTER_PREVIEW_FROM="Frank <frank@mail.frankx.ai>"
```

## Vercel CLI Commands

Run from `C:\Users\frank\starlight\repos\frankx.ai-vercel-website`.

```powershell
vercel env add RESEND_API_KEY production
vercel env add RESEND_API_KEY preview
vercel env add RESEND_API_KEY development

vercel env add RESEND_AUDIENCE_ID production
vercel env add EMAIL_TOKEN_SECRET production
vercel env add NEWSLETTER_PUBLISH_APPROVAL_TOKEN production
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add SITE_URL production

vercel env add BEEHIIV_API_KEY production
vercel env add BEEHIIV_PUBLICATION_ID production
```

For preview and development, repeat the non-public secrets if those environments need real email tests.

## Local Verification

```powershell
npm run type-check
npx next build
node scripts/send-newsletter-preview.mjs friemerx@gmail.com
```

The `send-newsletter-preview.mjs` script sends a single-recipient internal review packet. It is not a broadcast tool.

## Production Verification

After deployment:

1. Open `https://frankx.ai/admin/newsletter`.
2. Confirm Issues 1-5 appear under tracked editions.
3. Confirm Issues 6-12 appear in the planned calendar.
4. Open `https://frankx.ai/api/admin/newsletter/inventory` while authenticated.
5. Test confirmation and unsubscribe links with a seeded test contact.
6. Create a Beehiiv draft only after the approval packet is reviewed.

## Approval Rule

No live newsletter publish should happen unless all are true:

- issue status is promoted from `draft` to `staged`
- approval packet is reviewed
- experiment approval state is `approved-for-live`
- `NEWSLETTER_PUBLISH_APPROVAL_TOKEN` is supplied intentionally
- provider target is explicit

This keeps the system useful, powerful, and hard to accidentally misuse.
