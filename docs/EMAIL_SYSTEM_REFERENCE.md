# 📧 FrankX.AI Email System - Complete Reference Guide

**Status**: ✅ Production Ready
**Last Updated**: January 14, 2026
**Resend API**: Configured in Vercel

---

## 🎯 Quick Start

### Send Test Email (Right Now)
```bash
curl -X POST https://frankx.ai/api/test-email \
  -H "Content-Type: application/json" \
  -d '{
    "recipientEmail": "friemerx@gmail.com",
    "recipientName": "Frank",
    "templateType": "test",
    "testMessage": "Testing the FrankX email system!"
  }'
```

### Use in Production Code
```typescript
import { pdfDeliveryEmail } from '@/lib/email-templates'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const email = pdfDeliveryEmail({
  recipientName: 'Sarah',
  pdfTitle: 'The Creator\'s Soulbook',
  pdfUrl: 'https://frankx.ai/pdf-templates/soulbook-guide.html'
})

await resend.emails.send({
  from: 'Frank from FrankX.AI <frank@frankx.ai>',
  to: ['sarah@example.com'],
  subject: email.subject,
  html: email.html
})
```

---

## 📦 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER ACTIONS                              │
│  (Downloads PDF, Signs up, Makes purchase)                   │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│               YOUR WEBSITE (Next.js/Vercel)                  │
│  API Routes: /api/send-pdf, /api/newsletter, /api/test-email│
└───────────┬──────────────────────────┬──────────────────────┘
            │                          │
            ▼                          ▼
┌───────────────────────┐   ┌──────────────────────────────┐
│   VERCEL KV (Redis)   │   │    RESEND (Transactional)    │
│   Temporary Storage   │   │   Instant Email Delivery     │
│   - Lead capture      │   │   - PDF delivery emails      │
│   - Analytics         │   │   - Welcome emails           │
│   - Rate limiting     │   │   - Password resets          │
└───────────┬───────────┘   └──────────────────────────────┘
            │
            │ Sync via API (future)
            ▼
┌───────────────────────────────────────────────────────────┐
│          CONVERTKIT (Marketing Automation)                 │
│  - Newsletter management                                   │
│  - Email sequences (drip campaigns)                        │
│  - Audience segmentation                                   │
│  - Broadcast emails                                        │
└───────────────────────────────────────────────────────────┘
```

---

## 🎨 Available Email Templates

All templates in `/lib/email-templates.ts` with FrankX branding:

### 1. PDF Delivery Email
```typescript
import { pdfDeliveryEmail } from '@/lib/email-templates'

const email = pdfDeliveryEmail({
  recipientName: 'Frank',
  pdfTitle: 'The Creator\'s Soulbook',
  pdfUrl: 'https://frankx.ai/pdf-templates/soulbook-guide.html',
  guideDescription: 'Optional description'
})
```

**Features:**
- Warm greeting: "Your Guide Just Landed, {name}! ✨"
- Studio narrative: "Same frameworks I used to create 500+ AI songs..."
- FrankX color palette (cyan-purple gradients)
- Poppins + Inter fonts
- Download CTA with gradient button

### 2. Newsletter Welcome Email
```typescript
import { newsletterWelcomeEmail } from '@/lib/email-templates'

const email = newsletterWelcomeEmail({
  recipientName: 'Sarah'
})
```

**Features:**
- "Welcome to the Studio, {name}! 🎵"
- Lists benefits (weekly insights, exclusive guides, behind-the-scenes)
- 2 CTAs: Download guides + Read blog
- Personal message: "Hit reply anytime"

### 3. Test Email
```typescript
import { testEmail } from '@/lib/email-templates'

const email = testEmail({
  recipientName: 'Frank',
  testMessage: 'Custom test message here'
})
```

**Features:**
- System check confirmation
- Lists all working components
- Timestamp for debugging
- Custom message support

### 4. Community Broadcast
```typescript
import { communityBroadcastEmail } from '@/lib/email-templates'

const email = communityBroadcastEmail({
  recipientName: 'Creator',
  headline: 'New Course Launch: AI Music Production',
  bodyContent: '<p>Exciting news from the studio...</p>',
  ctaText: 'Enroll Now',
  ctaUrl: 'https://frankx.ai/courses/ai-music'
})
```

**Features:**
- Flexible headline and body content
- Optional CTA button
- Maintains FrankX brand consistency
- Perfect for announcements, product launches, updates

---

## 🚀 API Endpoints

### Test Email Endpoint
**POST** `/api/test-email`

```typescript
// Request body
{
  recipientEmail: string          // Required
  recipientName?: string          // Optional, default: "Creator"
  templateType?: 'test' | 'welcome' | 'broadcast'  // Default: 'test'
  testMessage?: string            // For test template
  headline?: string               // For broadcast template
  bodyContent?: string            // For broadcast template
  ctaText?: string                // For broadcast template
  ctaUrl?: string                 // For broadcast template
}

// Success response
{
  success: true,
  emailId: "abc123",              // Resend email ID
  message: "test email sent successfully",
  template: "test",
  timestamp: "2026-01-14T..."
}

// Error response
{
  error: "RESEND_API_KEY is not configured",
  message: "Add RESEND_API_KEY to your environment",
  troubleshooting: {
    1: "Verify RESEND_API_KEY is correct",
    2: "Ensure sender email is verified",
    3: "Check Resend dashboard for logs"
  }
}
```

**Examples:**
```bash
# Test email
curl -X POST https://frankx.ai/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"recipientEmail":"you@example.com","templateType":"test"}'

# Welcome email
curl -X POST https://frankx.ai/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"recipientEmail":"you@example.com","recipientName":"Sarah","templateType":"welcome"}'

# Broadcast email
curl -X POST https://frankx.ai/api/test-email \
  -H "Content-Type: application/json" \
  -d '{
    "recipientEmail":"you@example.com",
    "recipientName":"Frank",
    "templateType":"broadcast",
    "headline":"New Product Launch",
    "bodyContent":"<p>Exciting news...</p>",
    "ctaText":"Learn More",
    "ctaUrl":"https://frankx.ai"
  }'
```

---

## 🛠️ Environment Variables

### Required (Vercel Dashboard)
```bash
RESEND_API_KEY=re_your_api_key_here        # From resend.com/api-keys
RESEND_FROM_EMAIL=frank@frankx.ai          # Verified sender email
```

### Optional (Future ConvertKit Integration)
```bash
CONVERTKIT_API_KEY=your_api_key_here
CONVERTKIT_FORM_ID=your_form_id_here
```

### How to Set in Vercel
1. Go to [vercel.com/dashboard](https://vercel.com)
2. Select project: `frankx-website`
3. Settings → Environment Variables
4. Add each variable
5. Redeploy (or wait for auto-deploy)

---

## 🎯 Resend vs ConvertKit Strategy

### Resend = Transactional (Instant, Triggered)
**Use For:**
- ✅ PDF delivery (user downloads → instant email)
- ✅ Welcome emails (user signs up → instant)
- ✅ Password resets (user clicks reset → instant)
- ✅ Purchase receipts (user buys → instant)

**Pricing:** $0.10 per 1,000 emails
**Free Tier:** 100 emails/day, 3,000/month

### ConvertKit = Marketing Automation (Ongoing Relationship)
**Use For:**
- ✅ Weekly newsletters to all subscribers
- ✅ 7-day welcome sequence (automated drip)
- ✅ Audience segmentation by interest
- ✅ Product launch campaigns
- ✅ Subscriber management dashboard

**Pricing:** $9-$25/month (scales with subscribers)
**Free Tier:** Up to 1,000 subscribers

### Recommended Approach
**Phase 1 (Now):** Resend only for transactional emails
**Phase 2 (100+ subscribers):** Add ConvertKit for newsletters
**Phase 3 (1,000+ subscribers):** Full automation with sequences

---

## 📊 Data Flow & Storage

### Lead Capture Flow
```
1. User downloads PDF
   ↓
2. RESEND sends email (instant)
   ↓
3. Lead saved to VERCEL KV (temp storage, 30-90 days)
   {
     email: "user@example.com",
     name: "John Doe",
     company: "Tech Corp",
     role: "developer",
     primaryInterest: "ai-tools",
     referralSource: "search",
     guideId: "soulbook",
     timestamp: 1736902400000
   }
   ↓
4. CONVERTKIT sync (future, hourly/daily)
   - Adds to main subscriber list
   - Tags by interest
   - Starts welcome sequence
```

### Where Data Lives

| System | Purpose | Retention | Cost |
|--------|---------|-----------|------|
| **Vercel KV** | Fast cache, rate limiting | 30-90 days | ~$10/mo |
| **Resend** | Email delivery logs | 30 days | $0.10/1K emails |
| **ConvertKit** | Permanent subscriber CRM | Lifetime | $9-25/mo |

---

## 🧪 Testing & Debugging

### CLI Tool (Local Development)
```bash
# Navigate to project
cd "/mnt/c/Users/Frank/FrankX/FrankX.AI - Vercel Website"

# Send test email
node scripts/send-test-email.mjs friemerx@gmail.com

# Send welcome email
node scripts/send-test-email.mjs friemerx@gmail.com welcome

# Send broadcast email
node scripts/send-test-email.mjs friemerx@gmail.com broadcast
```

### Via Website (User-Facing)
1. Go to: https://frankx.ai/downloads/preview/soulbook
2. Click "Get Via Email"
3. Enter email: `friemerx@gmail.com`
4. Submit form
5. Check inbox

### Check Delivery Status
1. Go to: [resend.com/emails](https://resend.com/emails)
2. View all sent emails
3. Check delivery status
4. View email content
5. See open/click tracking (if enabled)

---

## 🎨 Brand Styling

All templates follow FrankX brand guidelines:

### Colors
```css
/* Primary gradients */
--cyan: #06b6d4;
--purple: #8B5CF6;
--purple-dark: #9333ea;

/* Backgrounds */
--deep-navy: #0F172A;
--midnight: #1E293B;

/* Text */
--white: #ffffff;
--gray-light: #CBD5E1;
--gray-medium: #94a3b8;
--gray-dark: #64748b;
```

### Typography
```css
/* Headings */
font-family: 'Poppins', sans-serif;
font-weight: 600-700;

/* Body */
font-family: 'Inter', sans-serif;
font-weight: 400-500;
```

### Design Elements
- ✅ Glassmorphic cards with backdrop blur
- ✅ Aurora gradient backgrounds
- ✅ Rounded corners (16px-24px border-radius)
- ✅ Soft shadows for depth
- ✅ Smooth transitions (300ms)

---

## 💡 Best Practices

### Email Deliverability
1. ✅ Verify domain in Resend dashboard (frankx.ai)
2. ✅ Set up SPF, DKIM, DMARC records
3. ✅ Use real sender email (frank@frankx.ai, not noreply@)
4. ✅ Include physical address in footer (CAN-SPAM compliance)
5. ✅ Make unsubscribe easy and visible

### Content Best Practices
1. ✅ Mobile-responsive design (50%+ opens on mobile)
2. ✅ Plain text fallback for email clients
3. ✅ Clear CTA button (not just text link)
4. ✅ Personal greeting (use {name})
5. ✅ Keep subject lines under 50 characters

### Data Privacy
1. ✅ GDPR compliance: clear consent
2. ✅ Privacy policy link in every email
3. ✅ Easy unsubscribe (1-click)
4. ✅ Never sell/share email addresses
5. ✅ Secure API keys (never commit to git)

---

## 🚨 Troubleshooting

### "Failed to send email"
**Checklist:**
- [ ] Is `RESEND_API_KEY` set in Vercel?
- [ ] Is sender domain verified in Resend?
- [ ] Check Resend dashboard for error logs
- [ ] Are you within free tier limits?

### "Email not delivered"
**Checklist:**
- [ ] Check spam/junk folder
- [ ] Verify SPF/DKIM records are set up
- [ ] Try sending to different email provider
- [ ] Check Resend dashboard delivery status

### "ConvertKit not syncing" (Future)
**Checklist:**
- [ ] Check API key is correct
- [ ] Verify form ID exists
- [ ] Check subscriber limit (free = 1,000)
- [ ] Review ConvertKit activity log

---

## 📚 Resources

- **Resend Docs**: https://resend.com/docs
- **Resend Dashboard**: https://resend.com/emails
- **ConvertKit API**: https://developers.convertkit.com
- **Email HTML Best Practices**: https://www.campaignmonitor.com/dev-resources/
- **Vercel KV Docs**: https://vercel.com/docs/storage/vercel-kv

---

## 🎯 Next Steps

### Immediate (Today)
- [x] Set RESEND_API_KEY in Vercel ✅ Done
- [ ] Send test email to friemerx@gmail.com
- [ ] Verify domain in Resend for production
- [ ] Test PDF delivery flow end-to-end

### Short-term (This Week)
- [ ] Document sender domain verification process
- [ ] Create email template variations for different guides
- [ ] Set up email analytics tracking
- [ ] Test deliverability across email providers

### Medium-term (This Month)
- [ ] Integrate ConvertKit when you reach 100+ subscribers
- [ ] Build automated sync: Vercel KV → ConvertKit
- [ ] Create welcome email sequence (5-7 emails)
- [ ] Set up weekly newsletter template

### Long-term (This Quarter)
- [ ] Implement audience segmentation by interest
- [ ] Build product-specific email sequences
- [ ] A/B test email copy and CTAs
- [ ] Track lifetime value per subscriber

---

**System Status**: ✅ Production-ready
**Last Test**: Pending (send test email)
**Maintenance**: Review monthly, update templates as needed

**Need Help?** Email frank@frankx.ai or check docs at frankx.ai/docs
