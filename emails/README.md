# Email Templates - React Email

Professional email templates for A/B testing, built with [@react-email/components](https://react.email).

## 5 Template Variants

### 1. Classic White
- **Style**: White background (#FFFFFF), navy text, simple and clean
- **Inspiration**: ConvertKit, Substack
- **Best For**: Maximum compatibility across email clients, builds trust
- **Use Case**: Professional newsletters, cold outreach

### 2. Modern Light
- **Style**: Light gray background (#F8F9FA), card-based sections with shadows
- **Inspiration**: Beehiiv
- **Best For**: Visual hierarchy, easy to scan
- **Use Case**: Content-heavy emails, multiple CTAs

### 3. Minimal Gradient
- **Style**: White base with emerald gradient header
- **Inspiration**: Linear, Notion emails
- **Best For**: Contemporary brand feel, focused content
- **Use Case**: Product updates, announcements

### 4. Dark Premium
- **Style**: Dark navy (#0F172A) with glassmorphic cards, includes light mode fallback
- **Inspiration**: FrankX brand design system
- **Best For**: Premium positioning (note: some email clients don't render dark well)
- **Use Case**: Premium product launches, VIP communications
- **Warning**: Test extensively before using - dark backgrounds have limited email client support

### 5. Card-Based Modular
- **Style**: White background with distinct colored cards per section
- **Inspiration**: Lemon Squeezy
- **Best For**: Multiple content blocks, clear CTAs
- **Use Case**: Onboarding sequences, feature announcements

## Quick Start

### Render to HTML (for Resend/email delivery)

```typescript
import { render } from '@react-email/components';
import { ClassicWhite } from './emails';

const html = await render(
  <ClassicWhite
    firstName="Alex"
    sourceContext="after reading one of my articles"
    downloadLink="https://frankx.ai/download"
  />
);

// Send via Resend
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'Frank <frank@frankx.ai>',
  to: 'user@example.com',
  subject: "Your free AI tool is ready (+ what's next)",
  html,
});
```

### Preview in Browser

```bash
# Install React Email CLI
npm install -g react-email

# Start preview server
cd emails
react-email dev
```

Then open `http://localhost:3000` to preview all templates.

## Template Props

All variants accept the same props:

```typescript
interface EmailProps {
  firstName?: string;          // Default: "there"
  sourceContext?: string;      // Default: "to stay updated"
  downloadLink?: string;       // Default: "https://frankx.ai/download"
  unsubscribeUrl?: string;     // Default: "https://frankx.ai/unsubscribe"
}
```

## File Structure

```
emails/
├── variants/               # 5 template variants
│   ├── ClassicWhite.tsx
│   ├── ModernLight.tsx
│   ├── MinimalGradient.tsx
│   ├── DarkPremium.tsx
│   └── CardBased.tsx
├── components/             # Shared components
│   ├── EmailHeader.tsx
│   ├── EmailFooter.tsx
│   └── EmailButton.tsx
├── preview/                # Preview wrapper
│   └── WelcomeEmail.tsx
├── index.ts               # Exports + metadata
└── README.md
```

## A/B Testing Strategy

### Recommended Test Sequence

1. **Week 1**: Test Classic White vs Modern Light (safe baseline)
2. **Week 2**: Test winner vs Minimal Gradient (brand alignment)
3. **Week 3**: Test winner vs Card-Based (CTA optimization)
4. **Week 4**: Test Dark Premium (if brand positioning justifies risk)

### Key Metrics

| Metric | Target | Formula |
|--------|--------|---------|
| Open Rate | >40% | Opens / Delivered |
| Click Rate | >8% | Clicks / Opens |
| Unsubscribe | <2% | Unsubs / Delivered |
| Conversion | >3% | Conversions / Clicks |

### Testing Tools

- **Resend**: Built-in A/B testing (50/50 split)
- **Litmus**: Email client rendering tests
- **Email on Acid**: Cross-client compatibility

## Email Client Compatibility

### ✅ Excellent Support (All variants)
- Apple Mail (macOS/iOS)
- Gmail (web, iOS, Android)
- Outlook (web)
- Yahoo Mail
- ProtonMail

### ⚠️ Limited Support
- Outlook 2016-2021 (Windows) - Use Classic White or Card-Based
- Dark Premium - Some clients force light backgrounds

### Test Before Sending
Always preview in multiple clients before production:
```bash
# Using Litmus or Email on Acid
# 1. Render to HTML
# 2. Send test to preview@litmus.com or similar
# 3. Check rendering across 70+ clients
```

## Customization

### Brand Colors
Edit in each template file:
```typescript
// Primary brand color (emerald green)
color: '#10B981'

// Dark brand color
backgroundColor: '#0F172A'

// Accent colors
color: '#059669'  // Darker emerald
color: '#34D399'  // Lighter emerald
```

### Typography
All templates use system font stack:
```css
font-family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
```

### Button Styles
Modify `components/EmailButton.tsx`:
- `variant="primary"` - Emerald background
- `variant="secondary"` - Dark background
- `variant="ghost"` - Transparent with border

## Production Checklist

Before sending to real users:

- [ ] Test all links (download, unsubscribe, website)
- [ ] Verify variables render correctly (firstName, sourceContext)
- [ ] Check mobile responsive (test on iOS + Android)
- [ ] Preview in 5+ email clients
- [ ] Validate HTML (no broken tags)
- [ ] Check spam score (use Mail Tester)
- [ ] Add alt text to images (if any)
- [ ] Verify unsubscribe link works
- [ ] Test with real email address first

## Next Steps

1. **Choose winner from A/B test**
2. **Create remaining 4 welcome series emails** (Days 3, 7, 14, 30)
3. **Build nurture campaigns** (weekly newsletter template)
4. **Add transactional emails** (purchase confirmation, password reset)

## Resources

- [React Email Docs](https://react.email)
- [Resend API](https://resend.com/docs)
- [Email Design Best Practices](https://www.goodemailcode.com)
- [WCAG Email Accessibility](https://www.w3.org/WAI/standards-guidelines/wcag/)

---

**Template Author**: FrankX Email Team
**Last Updated**: 2026-02-16
**Version**: 1.0.0
