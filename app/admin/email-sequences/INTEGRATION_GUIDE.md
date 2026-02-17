# Email Sequences Integration Guide

Complete system for automated email campaigns with Resend integration.

---

## System Overview

```
Subscriber signs up
        ↓
API creates subscriber + enrolls in welcome sequence
        ↓
Scheduler creates 5 email deliveries (Day 0, 3, 7, 14, 30)
        ↓
Cron job runs every 15 minutes
        ↓
Processes pending deliveries → Sends via Resend
        ↓
Tracks opens, clicks, conversions
```

---

## Architecture

### 1. Data Layer
**Location**: `data/email-sequences/email-sequences.json`

**Structure**:
```json
{
  "subscribers": [/* Subscriber objects */],
  "sequences": [/* Sequence configurations */],
  "templates": [/* Email templates */],
  "deliveries": [/* Scheduled/sent emails */],
  "lastUpdated": "ISO date"
}
```

### 2. Type System
**Location**: `types/email-sequences.ts`

**Key Types**:
- `Subscriber` - Email, source, tags, engagement metrics
- `EmailSequence` - Steps, triggers, targeting rules
- `EmailDelivery` - Scheduled/sent emails with tracking
- `EmailTemplate` - HTML content with variable support

### 3. Library Functions
**Location**: `lib/email-sequences/`

**Modules**:
- `subscribers.ts` - CRUD operations, enrollment, tags
- `sequences.ts` - Sequence management, analytics
- `sender.ts` - Template rendering, Resend integration
- `scheduler.ts` - Delivery processing, automation

### 4. API Routes
**Endpoints**:
- `GET /api/email-sequences/subscribers` - List/filter subscribers
- `POST /api/email-sequences/subscribers` - Create + auto-enroll
- `GET /api/email-sequences/sequences` - List sequences + analytics
- `POST /api/email-sequences/process` - Process pending deliveries (cron)

### 5. Dashboard
**Location**: `/admin/email-sequences`

**Features**:
- Subscriber stats (total, active, churn rate)
- Sequence performance (open rate, click rate)
- Recent activity feed
- Email step breakdown

---

## Resend MCP Integration

### Current State
The `sender.ts` file has a **mock implementation**:

```typescript
// TODO: Call Resend MCP
console.log('[Email Sender] Would send email:', {...})
```

### Integration Steps

**1. Install Resend MCP** (if not already configured)

Check if Resend MCP is available:
```bash
claude mcp list | grep resend
```

If not installed:
```bash
# Add Resend MCP (exact command may vary based on MCP setup)
claude mcp add resend
```

**2. Update `lib/email-sequences/sender.ts`**

Replace the mock section with actual Resend MCP call:

```typescript
import { ToolSearch } from '@/tools/mcp'

export async function sendEmail({
  subscriber,
  template,
  step,
  sequenceId
}: SendEmailParams): Promise<SendEmailResult> {
  try {
    const { subject, bodyHtml, bodyText } = renderTemplate(template, subscriber, step)
    
    // Load Resend MCP tool
    const resendTools = await ToolSearch({ query: 'select:mcp__resend__send-email' })
    
    if (!resendTools || resendTools.length === 0) {
      throw new Error('Resend MCP not available')
    }
    
    // Send via Resend MCP
    const result = await resendTools[0].call({
      from: 'frank@mail.frankx.ai',
      to: subscriber.email,
      subject,
      html: bodyHtml,
      text: bodyText,
      tags: [
        { name: 'sequence', value: sequenceId },
        { name: 'step', value: step.id }
      ]
    })
    
    return {
      success: true,
      providerId: result.id
    }
  } catch (error) {
    console.error('[Email Sender] Error:', error)
    
    return {
      success: false,
      error: {
        code: 'SEND_FAILED',
        message: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}
```

**3. Configure Resend API Key**

Add to `.env.local`:
```bash
RESEND_API_KEY=re_your_api_key_here
```

**4. Verify Domain**

Ensure `mail.frankx.ai` is verified in Resend dashboard:
- Go to resend.com/domains
- Add `mail.frankx.ai`
- Add DNS records (MX, TXT, DKIM)
- Wait for verification (5-30 minutes)

**5. Set Up Webhooks** (for tracking opens/clicks)

In Resend dashboard:
- Go to Webhooks → Create Webhook
- URL: `https://frankx.ai/api/email-sequences/webhook`
- Events: `email.opened`, `email.clicked`, `email.bounced`

Create the webhook handler:
```typescript
// app/api/email-sequences/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { markDeliveryAsOpened, markDeliveryAsClicked } from '@/lib/email-sequences/sequences'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { type, data } = body
  
  // Find delivery by provider ID
  const deliveryId = data.tags?.find(t => t.name === 'delivery')?.value
  
  if (!deliveryId) {
    return NextResponse.json({ error: 'Delivery ID not found' }, { status: 400 })
  }
  
  switch (type) {
    case 'email.opened':
      await markDeliveryAsOpened(deliveryId)
      break
    
    case 'email.clicked':
      await markDeliveryAsClicked(deliveryId, data.url)
      break
    
    case 'email.bounced':
      // TODO: Handle bounces
      break
  }
  
  return NextResponse.json({ success: true })
}
```

---

## Vercel Cron Setup

**File**: `vercel.json` (create in project root)

```json
{
  "crons": [{
    "path": "/api/email-sequences/process",
    "schedule": "*/15 * * * *"
  }]
}
```

**Schedule Explanation**:
- `*/15 * * * *` = Every 15 minutes
- Adjust frequency based on volume (e.g., `*/5` for every 5 minutes)

**Environment Variable**:
```bash
CRON_SECRET=random_string_here
```

Set in Vercel dashboard: Settings → Environment Variables

---

## HTML Email Templates

### Current State
Templates in `content/email-templates/welcome-series.md` are **plain text**.

### Converting to HTML

**Option 1: Use React Email** (recommended)

```bash
npm install react-email @react-email/components
```

Create template:
```tsx
// emails/WelcomeEmail.tsx
import { Html, Body, Container, Heading, Text, Link } from '@react-email/components'

export default function WelcomeEmail({ firstName, downloadLink }) {
  return (
    <Html>
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f4f4f4' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
          <Heading>Hey {firstName},</Heading>
          <Text>Welcome. I'm Frank.</Text>
          <Text>You just signed up. Here's what you requested:</Text>
          <Link href={downloadLink}>Download your resource</Link>
        </Container>
      </Body>
    </Html>
  )
}
```

Render to HTML:
```typescript
import { render } from '@react-email/render'
import WelcomeEmail from '@/emails/WelcomeEmail'

const html = render(<WelcomeEmail firstName="John" downloadLink="..." />)
```

**Option 2: MJML** (more advanced)

```bash
npm install mjml
```

Create `.mjml` template and compile to HTML.

**Option 3: Plain HTML** (quickest)

Store HTML directly in `templates[].bodyHtml` in the JSON data.

---

## Adding Subscribers

### Via API
```typescript
const response = await fetch('/api/email-sequences/subscribers', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    firstName: 'John',
    source: 'blog',
    tags: ['ai-architect'],
    enrollInWelcome: true
  })
})
```

### Via Form
Create signup form:
```tsx
// components/EmailSignup.tsx
'use client'

export default function EmailSignup({ source = 'blog' }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    await fetch('/api/email-sequences/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        source,
        enrollInWelcome: true
      })
    })
    
    setLoading(false)
    setEmail('')
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Subscribing...' : 'Get Updates'}
      </button>
    </form>
  )
}
```

---

## Testing

### Manual Testing

**1. Create Test Subscriber**:
```bash
curl -X POST https://frankx.ai/api/email-sequences/subscribers \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "Test",
    "source": "blog",
    "enrollInWelcome": true
  }'
```

**2. Trigger Delivery Processing** (dev mode):
```bash
curl http://localhost:3000/api/email-sequences/process
```

**3. Check Logs**:
Look for `[Email Sender] Would send email:` in console.

### Production Testing

**1. Use Test Email**:
- Subscribe with your own email
- Check inbox for emails
- Verify timing (Day 3 email arrives 72 hours later)

**2. Monitor Analytics**:
- Go to `/admin/email-sequences`
- Check open rates, click rates
- Verify step progression

**3. Test Unsubscribe**:
- Click unsubscribe link in email
- Verify subscriber status changes to `unsubscribed`
- Confirm no more emails sent

---

## Performance Goals

| Metric | Target | Current |
|--------|--------|---------|
| Open Rate | >40% | TBD |
| Click Rate | >8% | TBD |
| Unsubscribe Rate | <2% | TBD |
| Delivery Rate | >98% | TBD |
| Conversion Rate | >3% | TBD |

---

## Next Steps

1. **Integrate Resend MCP** - Replace mock sender with actual API calls
2. **Convert templates to HTML** - Use React Email or MJML
3. **Set up Vercel Cron** - Deploy `vercel.json` config
4. **Configure webhooks** - Track opens/clicks via Resend webhooks
5. **Add signup forms** - Embed `EmailSignup` component on key pages
6. **Test welcome sequence** - Subscribe with test email, verify full flow
7. **Monitor performance** - Check `/admin/email-sequences` dashboard
8. **Build Phase 2** - Nurture campaigns, re-engagement flows

---

## File Structure Summary

```
.
├── app/
│   ├── admin/email-sequences/
│   │   ├── page.tsx                          # Dashboard
│   │   └── INTEGRATION_GUIDE.md             # This file
│   └── api/email-sequences/
│       ├── subscribers/route.ts              # Subscriber management
│       ├── sequences/route.ts                # Sequence analytics
│       └── process/route.ts                  # Cron delivery processor
├── lib/email-sequences/
│   ├── subscribers.ts                        # Subscriber CRUD
│   ├── sequences.ts                          # Sequence + delivery ops
│   ├── sender.ts                             # Email sending (TODO: Resend)
│   └── scheduler.ts                          # Automation engine
├── types/email-sequences.ts                  # TypeScript definitions
├── data/email-sequences/
│   └── email-sequences.json                  # JSON storage
├── content/email-templates/
│   └── welcome-series.md                     # Email copy (plain text)
└── vercel.json                               # Cron config (TODO)
```

---

**Status**: Infrastructure complete, Resend integration pending.
