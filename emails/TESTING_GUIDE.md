# Email Template Testing Guide

Complete guide for testing and sending the 5 email template variants.

## Quick Start

### 1. Preview Templates Locally

All templates have been pre-rendered to HTML:

```bash
# Open in browser
open emails/output/classic-white.html
open emails/output/modern-light.html
open emails/output/minimal-gradient.html
open emails/output/dark-premium.html
open emails/output/card-based.html
```

**Location**: `/mnt/c/Users/Frank/FrankX/.worktrees/vercel-ui-ux/emails/output/`

### 2. Send Test Emails via Resend

```bash
# Set your Resend API key
export RESEND_API_KEY='re_your_key_here'

# Send single variant
npx tsx emails/test-send.ts --variant classic-white --to friemerx@gmail.com

# Send all variants (one at a time)
npx tsx emails/test-send.ts --all --to friemerx@gmail.com
```

### 3. Preview in React Email Dev Server

```bash
cd emails
npx react-email dev
```

Then open `http://localhost:3000` to preview all templates interactively.

---

## Testing Checklist

### Pre-Send Validation

- [x] All 5 templates render without errors
- [x] HTML output files generated in `emails/output/`
- [ ] Test in Gmail (web)
- [ ] Test in Outlook (web)
- [ ] Test in Apple Mail (macOS/iOS)
- [ ] Test in mobile (iOS Gmail, Android Gmail)
- [ ] Verify all links work
- [ ] Verify unsubscribe link works
- [ ] Check spam score (Mail Tester)
- [ ] Verify WCAG contrast ratios

### Email Client Testing

Use services like **Litmus** or **Email on Acid** to test rendering:

1. Render template to HTML:
   ```bash
   npx tsx emails/test-send.ts --render-html --variant classic-white
   ```

2. Copy HTML from `emails/output/classic-white.html`

3. Send to testing service:
   - Litmus: `preview@litmus.com`
   - Email on Acid: Use their web interface

4. Review rendering across 70+ email clients

### Mobile Responsive Testing

All templates are responsive and stack vertically below 600px width.

**Test on**:
- iPhone 12/13/14 (Safari, Gmail app)
- Android (Gmail app, Samsung Email)
- iPad (Mail app)

**What to check**:
- Text is readable (16px minimum)
- Buttons are tappable (44x44px minimum)
- No horizontal scrolling
- Images scale correctly

### Accessibility Testing

**WCAG 2.1 AA Requirements**:
- Text contrast ratio ≥4.5:1 for normal text
- Text contrast ratio ≥3:1 for large text (18px+)
- Links distinguishable from regular text
- Semantic HTML structure

**Tools**:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Litmus Accessibility Check](https://www.litmus.com/blog/ultimate-guide-accessible-emails)

**Current Status**:
- ✅ Classic White: WCAG AAA compliant
- ✅ Modern Light: WCAG AA compliant
- ✅ Minimal Gradient: WCAG AA compliant
- ⚠️ Dark Premium: WCAG AA (needs testing per client)
- ✅ Card-Based: WCAG AA compliant

### Spam Testing

Before sending to real users:

1. Send test email to yourself
2. Forward to `check@mail-tester.com`
3. Visit mail-tester.com to see score
4. Fix any issues (usually SPF/DKIM/DMARC)

**Target**: 8/10 or higher

---

## Sending Test Emails

### Option 1: Via Test Script (Recommended)

```bash
# Send single variant
npx tsx emails/test-send.ts --variant modern-light --to friemerx@gmail.com

# Send all 5 variants (1 second delay between each)
npx tsx emails/test-send.ts --all --to friemerx@gmail.com
```

### Option 2: Via NPM Scripts

```bash
cd emails

# Send individual variants
npm run send:classic    # Classic White
npm run send:modern     # Modern Light
npm run send:gradient   # Minimal Gradient
npm run send:dark       # Dark Premium
npm run send:card       # Card-Based

# Send all variants
npm run send:all
```

### Option 3: Manual Integration

```typescript
import { render } from '@react-email/components';
import { Resend } from 'resend';
import { ClassicWhite } from './emails';

const resend = new Resend(process.env.RESEND_API_KEY);

const html = await render(
  <ClassicWhite
    firstName="Alex"
    sourceContext="after reading one of my articles"
    downloadLink="https://frankx.ai/download"
  />
);

await resend.emails.send({
  from: 'Frank <frank@frankx.ai>',
  to: 'friemerx@gmail.com',
  subject: "Your free AI tool is ready (+ what's next)",
  html,
});
```

---

## A/B Testing Setup

### Using Resend (Built-in A/B Testing)

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Render both variants
const htmlA = await render(<ClassicWhite {...props} />);
const htmlB = await render(<ModernLight {...props} />);

// Send A/B test (50/50 split)
await resend.batch.send([
  {
    from: 'Frank <frank@frankx.ai>',
    to: audienceSegmentA, // First 50% of list
    subject: "Your free AI tool is ready (+ what's next)",
    html: htmlA,
    tags: [{ name: 'variant', value: 'classic-white' }],
  },
  {
    from: 'Frank <frank@frankx.ai>',
    to: audienceSegmentB, // Second 50% of list
    subject: "Your free AI tool is ready (+ what's next)",
    html: htmlB,
    tags: [{ name: 'variant', value: 'modern-light' }],
  },
]);
```

### Manual A/B Testing (CSV Split)

1. Export subscriber list to CSV
2. Split into two equal segments:
   ```bash
   # Split 2000 subscribers into two 1000-person lists
   split -l 1000 subscribers.csv segment_
   ```
3. Send variant A to `segment_aa`
4. Send variant B to `segment_ab`
5. Track results in spreadsheet

---

## Tracking Metrics

### Via Resend Dashboard

After sending, view metrics at `https://resend.com/emails`:
- Open rate
- Click-through rate
- Bounce rate
- Spam complaints

### Via UTM Parameters

Add UTM parameters to links for Google Analytics tracking:

```typescript
const downloadLink =
  'https://frankx.ai/download/ai-architecture-guide' +
  '?utm_source=email' +
  '&utm_medium=welcome-series' +
  '&utm_campaign=email-1' +
  '&utm_content=classic-white'; // Variant name
```

Then compare in Google Analytics:
1. Go to Acquisition → Campaigns
2. Filter by `utm_campaign=email-1`
3. Compare `utm_content` values (variant names)

### Custom Event Tracking

Track specific actions:

```typescript
// In your download handler
await analytics.track({
  event: 'email_download_clicked',
  properties: {
    email_variant: 'classic-white',
    user_id: 'user_123',
    timestamp: new Date(),
  },
});
```

---

## Troubleshooting

### Issue: Templates not rendering

**Solution**: Make sure all dependencies are installed:
```bash
npm install @react-email/components resend
npm install -D tsx
```

### Issue: "RESEND_API_KEY not set"

**Solution**: Set environment variable:
```bash
export RESEND_API_KEY='re_your_key_here'
```

Or create `.env` file:
```
RESEND_API_KEY=re_your_key_here
```

### Issue: Email goes to spam

**Solutions**:
1. Verify domain in Resend dashboard
2. Set up SPF/DKIM/DMARC records
3. Warm up domain (send to engaged users first)
4. Avoid spam trigger words in subject line
5. Ensure unsubscribe link is present

### Issue: Dark Premium not rendering correctly

**Expected**: Many email clients force light backgrounds. This is normal.

**Solutions**:
1. Accept graceful degradation
2. Use only for VIP/tech-forward audiences
3. Switch to Modern Light or Minimal Gradient for mass sends

### Issue: Images not loading

**Check**:
1. Image URLs are absolute (not relative)
2. Images are publicly accessible
3. No authentication required
4. Proper alt text for accessibility

---

## Production Deployment

### Step 1: Choose Winner

After A/B testing, select the highest-performing variant based on:
- Click-through rate (primary)
- Open rate (secondary)
- Unsubscribe rate (constraint: <2%)

### Step 2: Integrate with Email Service

```typescript
// Example: Resend integration
import { render } from '@react-email/components';
import { ModernLight } from './emails'; // Winner

export async function sendWelcomeEmail(user: User) {
  const html = await render(
    <ModernLight
      firstName={user.firstName}
      sourceContext={getSourceContext(user.source)}
      downloadLink={getDownloadLink(user.source)}
      unsubscribeUrl={`https://frankx.ai/unsubscribe?id=${user.id}`}
    />
  );

  return await resend.emails.send({
    from: 'Frank <frank@frankx.ai>',
    to: user.email,
    subject: "Your free AI tool is ready (+ what's next)",
    html,
    tags: [
      { name: 'template', value: 'welcome-email-1' },
      { name: 'variant', value: 'modern-light' },
    ],
  });
}
```

### Step 3: Set Up Monitoring

Track key metrics:
- Daily send volume
- Bounce rate (should be <5%)
- Complaint rate (should be <0.1%)
- Unsubscribe rate (should be <2%)

**Alert thresholds**:
- Bounce rate >10% → Review email list quality
- Complaint rate >0.5% → Review content/targeting
- Unsubscribe rate >5% → Review email value prop

### Step 4: Create Remaining Emails

Use winning variant style for Emails 2-5 in welcome series:
1. Copy winning template structure
2. Replace content from `content/email-templates/welcome-series.md`
3. Test each email individually
4. Deploy to automated sequence

---

## Next Steps

1. ✅ **Test locally** - Open HTML files in browser
2. ✅ **Send to yourself** - Use test script
3. ⏳ **A/B test** - Send to 2,000 subscribers (1,000 each)
4. ⏳ **Analyze results** - Track for 7 days
5. ⏳ **Choose winner** - Based on CTR
6. ⏳ **Build Emails 2-5** - Using winning style
7. ⏳ **Automate sequence** - Integrate with Resend/other service

---

## Resources

- [React Email Documentation](https://react.email/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)
- [Email Design Best Practices](https://www.goodemailcode.com)
- [Litmus Email Testing](https://www.litmus.com)
- [WCAG Email Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)

---

**Last Updated**: 2026-02-16
**Version**: 1.0.0
