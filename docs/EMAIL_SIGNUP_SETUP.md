# Email Signup System Setup Guide

## Architecture Overview

The site now has a complete internal email signup system that integrates with ConvertKit for email marketing.

**Flow:**
1. User enters email on frankx.ai (any page with EmailSignup component)
2. Email sent to our API endpoint `/api/subscribe`
3. API forwards to ConvertKit via their API
4. ConvertKit manages subscriber, sends sequences
5. User redirected to `/thank-you` page

## Required: ConvertKit Configuration

### Step 1: Get Your ConvertKit API Key

1. Go to https://app.convertkit.com/account_settings/advanced_settings
2. Click "Show" next to "API Secret"
3. Copy the API key

### Step 2: Get Your Form IDs

You need 3 form IDs (or can use the same form for all):

1. **Creation Chronicles Form**: https://app.convertkit.com/forms
   - Find your "Creation Chronicles" form
   - Click to edit
   - URL will show form ID: `convertkit.com/forms/XXXXXX/edit`
   - Copy `XXXXXX`

2. **Inner Circle Form**:
   - Same process for Inner Circle waitlist form

3. **Newsletter Form**:
   - Same process for general newsletter form

### Step 3: Add Environment Variables to Vercel

Go to your Vercel project settings:

```bash
# Required
CONVERTKIT_API_KEY=your_api_secret_here
CONVERTKIT_CREATION_CHRONICLES_FORM_ID=123456
CONVERTKIT_INNER_CIRCLE_FORM_ID=789012
CONVERTKIT_NEWSLETTER_FORM_ID=345678

# Optional (for Resend welcome emails)
RESEND_API_KEY=re_your_key_here
```

**In Vercel Dashboard:**
1. Go to your project
2. Settings → Environment Variables
3. Add each variable above
4. Select "Production", "Preview", and "Development"
5. Click "Save"
6. Redeploy your site (Vercel will prompt)

### Step 4: Test the Integration

1. Go to https://frankx.ai/creation-chronicles
2. Enter your email in the signup form
3. Check that:
   - ✅ Success message appears
   - ✅ Redirects to /thank-you
   - ✅ Email appears in ConvertKit dashboard
   - ✅ ConvertKit sends confirmation email

## Optional: Resend Welcome Emails

If you want instant welcome emails (in addition to ConvertKit sequences):

### Step 1: Get Resend API Key

1. Go to https://resend.com/api-keys
2. Create new API key
3. Copy the key

### Step 2: Add to Vercel

```bash
RESEND_API_KEY=re_your_key_here
```

### Step 3: Create Welcome Email Template

Create `/email-templates/welcome.tsx`:

```tsx
export default function WelcomeEmail({ name }: { name?: string }) {
  return (
    <div>
      <h1>Welcome to FrankX, {name || 'friend'}!</h1>
      <p>Thanks for joining the journey...</p>
    </div>
  )
}
```

### Step 4: Update API Route

The API route at `/app/api/subscribe/route.ts` is ready to send Resend emails.
Just uncomment the Resend section once you have the API key configured.

## Usage in Code

### Basic Usage

```tsx
import { EmailSignup } from '@/components/email-signup'

// On any page
<EmailSignup
  listType="creation-chronicles"
  placeholder="Your email address"
  buttonText="Join the Dispatch"
/>
```

### With Redirect

```tsx
<EmailSignup
  listType="inner-circle"
  redirectTo="/thank-you"
  showName={true}
/>
```

### Compact Variant

```tsx
<EmailSignup
  listType="newsletter"
  compact={true}
  className="max-w-md"
/>
```

## Available List Types

- `"newsletter"` - General FrankX newsletter
- `"creation-chronicles"` - Creation Chronicles dispatch
- `"inner-circle"` - Inner Circle waitlist

Each type maps to its own ConvertKit form (configured via env vars).

## Troubleshooting

### "Email service not configured"
- Check that `CONVERTKIT_API_KEY` is set in Vercel
- Check that the form ID for your `listType` is set
- Redeploy after adding env vars

### "Failed to subscribe"
- Check ConvertKit API key is correct (it's the "API Secret", not "API Key")
- Check form IDs are numeric and correct
- Check Vercel function logs for details

### Duplicate Email Error
- This is normal! ConvertKit prevents duplicate signups
- User sees: "This email is already subscribed!"

## Migration from External Forms

Old flow:
```tsx
<a href="https://frankx.ck.page/creation-chronicles">Subscribe</a>
```

New flow:
```tsx
<EmailSignup listType="creation-chronicles" />
```

**Benefits:**
- ✅ User stays on your site (better UX)
- ✅ Custom thank you page with next steps
- ✅ Consistent branding
- ✅ Better conversion tracking
- ✅ Can add Resend welcome emails
- ✅ Full control over the experience

## Testing Checklist

- [ ] Add ConvertKit API key to Vercel
- [ ] Add all 3 form IDs to Vercel
- [ ] Redeploy site
- [ ] Test signup on /creation-chronicles
- [ ] Verify subscriber appears in ConvertKit
- [ ] Test signup on /inner-circle
- [ ] Test duplicate email (should show friendly error)
- [ ] Verify /thank-you page displays correctly
- [ ] Check ConvertKit sequences are triggered

## Next Steps

Once ConvertKit is working:
1. Replace all external ConvertKit links with internal EmailSignup components
2. (Optional) Add Resend for instant welcome emails
3. Monitor conversion rates in Vercel Analytics
4. A/B test different copy and CTAs
