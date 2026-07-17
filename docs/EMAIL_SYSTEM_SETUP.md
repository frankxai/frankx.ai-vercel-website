# 📧 FrankX.AI Email System Setup Guide

Complete guide to the email and CRM architecture for FrankX.AI.

---

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    USER ACTIONS                              │
│  • Downloads PDF                                             │
│  • Signs up for newsletter                                   │
│  • Submits contact form                                      │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│               YOUR WEBSITE (Next.js/Vercel)                  │
│                                                              │
│  API Routes:                                                 │
│  • /api/send-pdf       → PDF delivery emails                │
│  • /api/newsletter     → Newsletter signups                 │
│  • /api/test-email     → Testing & debugging                │
└───────────┬──────────────────────────┬──────────────────────┘
            │                          │
            ▼                          ▼
┌───────────────────────┐   ┌──────────────────────────────┐
│   VERCEL KV (Redis)   │   │    RESEND (Transactional)    │
│   Temporary Storage   │   │   Instant Email Delivery     │
│                       │   │                              │
│   • Lead capture      │   │   • PDF delivery emails      │
│   • Analytics         │   │   • Welcome emails           │
│   • Session tracking  │   │   • Password resets          │
│   • Rate limiting     │   │   • Order confirmations      │
└───────────┬───────────┘   └──────────────────────────────┘
            │
            │ Sync via API
            ▼
┌───────────────────────────────────────────────────────────┐
│          CONVERTKIT (Marketing Automation)                 │
│          Long-term Relationship Building                   │
│                                                            │
│   • Newsletter management                                  │
│   • Email sequences (drip campaigns)                       │
│   • Audience segmentation                                  │
│   • Broadcast emails                                       │
│   • Subscriber management                                  │
│   • Email analytics & open rates                           │
└───────────────────────────────────────────────────────────┘
```

---

## 🎯 Why Both Resend AND ConvertKit?

### **Resend** = Transactional Emails (Instant, Triggered)
- **Use Case**: User takes action → immediate email response
- **Examples**:
  - User downloads PDF → Instant delivery email
  - User creates account → Welcome email
  - User resets password → Reset link email
  - User makes purchase → Receipt/confirmation

**Pros:**
- ✅ Fast delivery (< 1 second)
- ✅ High deliverability for transactional emails
- ✅ Simple API, easy integration
- ✅ Affordable ($0.10 per 1,000 emails)

**Cons:**
- ❌ No email list management
- ❌ No campaign/sequence builder
- ❌ No audience segmentation
- ❌ Not designed for newsletters

---

### **ConvertKit** = Marketing Automation (Ongoing Relationship)
- **Use Case**: Long-term email marketing and creator relationships
- **Examples**:
  - Weekly newsletter to all subscribers
  - 7-day welcome sequence for new signups
  - Product launch campaigns
  - Audience segmentation by interest

**Pros:**
- ✅ Email list management dashboard
- ✅ Visual sequence/automation builder
- ✅ Audience tagging and segmentation
- ✅ Landing pages and forms
- ✅ Analytics (open rates, click rates)
- ✅ Subscriber management

**Cons:**
- ❌ More expensive ($9-$25+/month)
- ❌ Slower delivery than transactional
- ❌ Overkill for one-off emails

---

## 📋 Complete Setup Checklist

### **1. Resend Setup (Transactional Emails)**

#### Step 1: Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up with GitHub or email
3. Verify your email address

#### Step 2: Get API Key
1. Go to [API Keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Name it: `FrankX-Production`
4. Copy the key (starts with `re_`)

#### Step 3: Verify Sender Domain
**CRITICAL**: You must verify `frankx.ai` to send emails from `frank@frankx.ai`

1. Go to [Domains](https://resend.com/domains)
2. Click "Add Domain"
3. Enter: `frankx.ai`
4. Follow DNS configuration instructions:
   - Add SPF record
   - Add DKIM records (2 records)
   - Add DMARC record
5. Wait for verification (usually < 30 minutes)

**Until verified, you can only send to:**
- Your own email (the one you signed up with)
- Resend test addresses

#### Step 4: Add to Vercel Environment
1. Go to your [Vercel Dashboard](https://vercel.com)
2. Select project: `frankx-website`
3. Go to Settings → Environment Variables
4. Add:
   ```
   RESEND_API_KEY = re_your_actual_key_here
   RESEND_FROM_EMAIL = frank@frankx.ai
   TEST_EMAIL_SECRET = generate-a-long-random-value
   ```
5. Save and redeploy

#### Step 5: Test It
```bash
# Remote deployments require TEST_EMAIL_SECRET (local development does not).
export TEST_EMAIL_SECRET=generate-a-long-random-value
curl -X POST https://frankx.ai/api/test-email \
  -H "Content-Type: application/json" \
  -H "x-test-email-secret: $TEST_EMAIL_SECRET" \
  -d '{
    "recipientEmail": "your@email.com",
    "recipientName": "Your Name",
    "templateType": "test",
    "testMessage": "Testing the Resend integration!"
  }'
```

---

### **2. ConvertKit Setup (Marketing Automation)**

#### Step 1: Create ConvertKit Account
1. Go to [convertkit.com](https://convertkit.com)
2. Sign up (free up to 1,000 subscribers)
3. Complete onboarding

#### Step 2: Get API Key
1. Go to Settings → Advanced
2. Scroll to "API Secret"
3. Click "Show" and copy

#### Step 3: Create Forms
1. Go to "Grow" → "Landing Pages & Forms"
2. Create form: "FrankX Newsletter Signup"
3. Copy Form ID from URL

#### Step 4: Add to Environment Variables
```bash
# In .env.local or Vercel
CONVERTKIT_API_KEY=your_api_key_here
CONVERTKIT_FORM_ID=your_form_id_here
```

#### Step 5: Sync Leads from Vercel KV to ConvertKit
Create a cron job or webhook that runs daily/weekly:

```typescript
// Example: Sync leads to ConvertKit
async function syncLeadsToConvertKit() {
  const leads = await getLeads() // From Vercel KV

  for (const lead of leads) {
    await fetch('https://api.convertkit.com/v3/forms/{formId}/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        email: lead.email,
        first_name: lead.name,
        tags: [lead.primaryInterest] // Segment by interest
      })
    })
  }
}
```

---

## 🔄 Recommended Data Flow

### **When User Downloads PDF:**
1. ✅ **Immediate** → Resend sends PDF delivery email
2. ✅ **Store** → Lead saved to Vercel KV
3. ✅ **Sync** → Lead synced to ConvertKit (within 1 hour)
4. ✅ **Sequence** → ConvertKit triggers welcome sequence

### **When User Signs Up for Newsletter:**
1. ✅ **Immediate** → Resend sends welcome email
2. ✅ **Add** → ConvertKit adds to main list
3. ✅ **Tag** → ConvertKit tags by interest (music, AI, etc.)
4. ✅ **Sequence** → Start automated email sequence

---

## 📝 Available Email Templates

All templates are in `/lib/email-templates.ts` with FrankX branding:

### **1. `pdfDeliveryEmail`**
```typescript
import { pdfDeliveryEmail } from '@/lib/email-templates'

const email = pdfDeliveryEmail({
  recipientName: 'Frank',
  pdfTitle: 'The Creator\'s Soulbook',
  pdfUrl: 'https://frankx.ai/pdf-templates/soulbook-guide.html'
})

// email.subject = "Your The Creator's Soulbook Guide from FrankX.AI"
// email.html = (fully styled HTML)
```

### **2. `newsletterWelcomeEmail`**
```typescript
import { newsletterWelcomeEmail } from '@/lib/email-templates'

const email = newsletterWelcomeEmail({
  recipientName: 'Sarah'
})
```

### **3. `testEmail`**
```typescript
import { testEmail } from '@/lib/email-templates'

const email = testEmail({
  recipientName: 'Frank',
  testMessage: 'Testing the complete email system!'
})
```

### **4. `communityBroadcastEmail`**
```typescript
import { communityBroadcastEmail } from '@/lib/email-templates'

const email = communityBroadcastEmail({
  recipientName: 'Creator',
  headline: 'New Course Launch: AI Music Production',
  bodyContent: '<p>Exciting news...</p>',
  ctaText: 'Enroll Now',
  ctaUrl: 'https://frankx.ai/courses/ai-music'
})
```

---

## 🧪 Testing the System

### **Method 1: API Endpoint (Recommended)**
```bash
# Test email
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{
    "recipientEmail": "friemerx@gmail.com",
    "recipientName": "Frank",
    "templateType": "test",
    "testMessage": "Hey Frank! Testing the complete email system."
  }'

# Welcome email
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{
    "recipientEmail": "friemerx@gmail.com",
    "recipientName": "Frank",
    "templateType": "welcome"
  }'

# Broadcast email
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{
    "recipientEmail": "friemerx@gmail.com",
    "recipientName": "Frank",
    "templateType": "broadcast",
    "headline": "New AI Music Course Launching Soon",
    "bodyContent": "<p>Hey Frank! Wanted to give you early access...</p>",
    "ctaText": "Get Early Access",
    "ctaUrl": "https://frankx.ai/courses"
  }'
```

### **Method 2: Via Website**
1. Go to: https://frankx.ai/downloads/preview/soulbook
2. Click "Get Via Email"
3. Enter your email: `friemerx@gmail.com`
4. Submit form
5. Check inbox

### **Method 3: Resend Dashboard**
1. Go to [resend.com/emails](https://resend.com/emails)
2. View all sent emails
3. Check delivery status
4. View email content

---

## 🗄️ CRM Strategy: Where Data Lives

### **Vercel KV (Redis)** - Short-term Storage
- **Purpose**: Fast, temporary storage for immediate needs
- **Data Stored**:
  - Recent lead captures (last 30 days)
  - Session tracking
  - Rate limiting counters
  - Analytics events
- **Retention**: Auto-expire after 30-90 days
- **Cost**: ~$10/month (included with Vercel Pro)

### **ConvertKit** - Long-term CRM
- **Purpose**: Permanent subscriber database and email marketing
- **Data Stored**:
  - All subscribers (lifetime)
  - Email engagement history
  - Tags and segments
  - Custom fields (interests, purchase history)
- **Retention**: Permanent (until unsubscribe)
- **Cost**: $9-$25/month (scales with subscribers)

### **Recommended Sync Schedule:**
- ⚡ **Immediate**: Resend transactional email
- 🔄 **Hourly**: Sync new Vercel KV leads → ConvertKit
- 📊 **Daily**: Clean up old Vercel KV data
- 📈 **Weekly**: Export analytics to dashboard

---

## 💡 Pro Tips

### **Email Deliverability**
1. ✅ Always verify your domain in Resend
2. ✅ Set up SPF, DKIM, and DMARC records
3. ✅ Use `frank@frankx.ai` (not `noreply@`)
4. ✅ Include physical address in footer (CAN-SPAM)
5. ✅ Make unsubscribe easy and visible

### **Template Best Practices**
1. ✅ Mobile-responsive (50%+ opens on mobile)
2. ✅ Plain text fallback for email clients
3. ✅ Brand colors and fonts (Poppins + Inter)
4. ✅ Clear CTA button (not just text link)
5. ✅ Personal greeting (use `{name}`)

### **Data Privacy**
1. ✅ GDPR compliance: clear consent
2. ✅ Privacy policy link in every email
3. ✅ Easy unsubscribe (1-click)
4. ✅ Don't sell/share email addresses
5. ✅ Secure API keys (never commit to git)

---

## 🚨 Troubleshooting

### **"Failed to send email"**
1. Check: Is `RESEND_API_KEY` set in Vercel?
2. Check: Is sender domain verified?
3. Check: Resend dashboard for error logs
4. Check: Are you on Resend free tier limits?

### **"Email not delivered"**
1. Check spam folder
2. Check Resend dashboard delivery status
3. Verify SPF/DKIM records are set up
4. Try sending to different email provider

### **"ConvertKit not syncing"**
1. Check API key is correct
2. Check form ID exists
3. Check subscriber limit (free = 1,000)
4. Check ConvertKit activity log

---

## 📚 Resources

- **Resend Docs**: https://resend.com/docs
- **ConvertKit API**: https://developers.convertkit.com
- **Email HTML Best Practices**: https://www.campaignmonitor.com/dev-resources/guides/
- **Vercel KV Docs**: https://vercel.com/docs/storage/vercel-kv

---

**Need Help?** Email frank@frankx.ai or check Resend/ConvertKit support.
