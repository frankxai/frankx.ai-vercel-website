# Golden Path Delivery System

**Complete infrastructure for $297 product sales and delivery**

---

## Architecture Overview

### 1. Sales Page
**Location**: `/soulbook/golden-path`
**Status**: ✅ Complete
**Features**:
- Conversion-optimized layout
- 3-pillar framework explanation  
- Social proof (testimonials, 1,200+ users)
- FAQ section
- 30-day guarantee
- Multiple CTAs

### 2. Checkout Flow
**Integration**: Lemon Squeezy
**Components**:
- `CheckoutButton.tsx` (✅ Complete)
- `/api/checkout/create-session` (✅ Complete)

**Flow**:
1. User clicks "Get Instant Access" button
2. API creates Lemon Squeezy checkout session
3. User redirected to LS hosted checkout
4. Payment processed by Lemon Squeezy
5. Webhook triggers delivery

### 3. Webhook Handler
**Endpoint**: `/api/checkout/webhook`
**Trigger**: Lemon Squeezy order.success event

**Actions on successful payment**:
1. Verify webhook signature
2. Extract customer email + order ID
3. Generate secure download link
4. Send welcome email with PDF link (via Resend)
5. Log purchase to database/JSON

**Implementation** (TBD):
```typescript
// app/api/checkout/webhook/route.ts
export async function POST(request: NextRequest) {
  const signature = request.headers.get('x-signature')
  const body = await request.json()
  
  // Verify webhook authenticity
  if (!verifySignature(signature, body)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }
  
  const { customer_email, order_id, product_id } = body
  
  // Generate download link
  const downloadLink = generateSecureLink(order_id)
  
  // Send email via Resend MCP
  await sendWelcomeEmail({
    to: customer_email,
    downloadLink,
    orderNumber: order_id
  })
  
  return NextResponse.json({ success: true })
}
```

### 4. Email Delivery
**Service**: Resend (via MCP)
**From**: frank@mail.frankx.ai (verified domain)

**Welcome Email Template**:
```
Subject: Your Golden Path Workbook is Ready

Hi there,

Welcome to the Golden Path! Your 4-week transformation starts now.

Download your workbook:
[Secure Download Link - expires in 24 hours]

What's next:
1. Download the PDF (80 pages)
2. Print or use digitally (fillable PDF included)
3. Start Week 1: Awareness & Systems Thinking
4. Follow the daily practices

Need help? Reply to this email.

— Frank
```

### 5. Download Page
**Location**: `/downloads/golden-path/[orderId]`
**Security**: Order ID validation

**Page Content**:
- Order confirmation
- Download button (PDF)
- Quick start guide
- Upsell to $697/$897 tiers
- Support link

**Implementation** (TBD):
```typescript
// app/downloads/golden-path/[orderId]/page.tsx
export default async function DownloadPage({ params }) {
  const { orderId } = await params
  
  // Validate order exists
  const order = await validateOrder(orderId)
  if (!order) notFound()
  
  return (
    <div>
      <h1>Your Golden Path Workbook</h1>
      <a href={`/products/golden-path-workbook.pdf`} download>
        Download PDF (12.3 MB)
      </a>
    </div>
  )
}
```

---

## Product File Structure

```
public/products/
└── golden-path-workbook.pdf (TBD - needs design + generation)

data/orders/
└── golden-path-orders.jsonl (purchase log)

app/soulbook/golden-path/
├── page.tsx (✅ sales page)
└── DELIVERY_SYSTEM.md (this file)

app/downloads/golden-path/[orderId]/
└── page.tsx (TBD - download page)

app/api/checkout/
├── create-session/route.ts (✅ session creation)
└── webhook/route.ts (TBD - payment processing)

components/soulbook/
└── CheckoutButton.tsx (✅ checkout component)
```

---

## Environment Variables Needed

```bash
# Lemon Squeezy
LEMON_SQUEEZY_API_KEY=your_api_key
LEMON_SQUEEZY_STORE_ID=your_store_id
LEMON_SQUEEZY_PRODUCT_ID=your_product_id  # Golden Path
LEMON_SQUEEZY_WEBHOOK_SECRET=your_webhook_secret

# Resend (email)
RESEND_API_KEY=your_resend_key  # Already configured

# Product URLs
NEXT_PUBLIC_SITE_URL=https://frankx.ai
```

---

## Lemon Squeezy Setup Steps

1. **Create Product**:
   - Go to lemonsqueezy.com dashboard
   - Products → New Product
   - Name: "The Golden Path Workbook"
   - Price: $297 (one-time)
   - Add product description + images

2. **Get Product ID**:
   - Copy product ID from URL
   - Add to env vars

3. **Configure Webhook**:
   - Settings → Webhooks → New Webhook
   - URL: `https://frankx.ai/api/checkout/webhook`
   - Events: Select `order_created`
   - Copy webhook secret to env

4. **Test Checkout**:
   - Use test mode
   - Complete purchase flow
   - Verify webhook fires
   - Check email delivery

---

## Email Template (HTML)

**File**: `lib/email-templates/golden-path-welcome.ts`

```typescript
export const goldenPathWelcomeEmail = (data: {
  firstName?: string
  downloadLink: string
  orderNumber: string
}) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .button { display: inline-block; background: #10B981; color: white; 
              padding: 16px 32px; text-decoration: none; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Your Golden Path Workbook is Ready</h1>
    <p>Welcome to the 4-week transformation program.</p>
    
    <a href="${data.downloadLink}" class="button">
      Download Your Workbook (PDF)
    </a>
    
    <p>Order #${data.orderNumber}</p>
    
    <p>What's next:</p>
    <ol>
      <li>Download the 80-page PDF</li>
      <li>Start Week 1: Awareness & Systems Thinking</li>
      <li>Follow the daily practices</li>
      <li>Complete all exercises</li>
    </ol>
    
    <p>Need help? Reply to this email.</p>
    
    <p>— Frank<br>frankx.ai</p>
  </div>
</body>
</html>
`
```

---

## Revenue Tracking

**File**: `data/orders/golden-path-orders.jsonl`

Each line:
```json
{
  "orderId": "ord_abc123",
  "productId": "golden-path",
  "customerEmail": "user@example.com",
  "amount": 297,
  "currency": "USD",
  "status": "completed",
  "downloadLink": "https://frankx.ai/downloads/golden-path/ord_abc123",
  "purchasedAt": "2026-02-17T01:30:00Z",
  "emailSent": true,
  "emailSentAt": "2026-02-17T01:30:05Z"
}
```

**Analytics Endpoint**: `/api/admin/revenue/golden-path`
- Total revenue
- Number of sales
- Conversion rate (visitors → buyers)
- Email delivery success rate

---

## Phase 2 Status

### ✅ Complete
- Sales page
- Checkout button component
- Checkout session API
- System architecture documented

### 🚧 Pending (Manual Setup Required)
1. Create Lemon Squeezy account + product
2. Generate PDF workbook (80 pages, designed)
3. Implement webhook handler
4. Create email template
5. Build download page
6. Test full flow
7. Add revenue tracking

### Next: Phase 3 (Sales Page Optimization)
- A/B testing framework
- Conversion analytics
- Exit-intent popup
- Testimonial collection system
- Upsell flow to $697/$897 tiers

---

**Estimated completion**: 4-6 hours for remaining implementation + PDF design
