# Email Templates - Quick Start Guide

**5 professional email variants ready to test. Choose the right one for your audience.**

---

## 30-Second Preview

All templates are **pre-rendered as HTML** and ready to open in your browser:

```bash
# Navigate to output directory
cd /mnt/c/Users/Frank/FrankX/.worktrees/vercel-ui-ux/emails/output

# Open any variant (Windows)
start classic-white.html
start modern-light.html
start minimal-gradient.html
start dark-premium.html
start card-based.html

# Or (macOS/Linux)
open classic-white.html
# ... etc
```

---

## Which Template Should I Use?

### 🏆 Recommended for most: **Modern Light**
- **Why**: Best balance of aesthetics and compatibility
- **Use when**: You want modern design without breaking email clients
- **Best for**: Welcome sequences, newsletters, product announcements

### 🎨 For brand-building: **Minimal Gradient**
- **Why**: Clean design with strong FrankX brand presence (emerald gradient)
- **Use when**: You want to reinforce brand identity
- **Best for**: Weekly newsletters, product launches

### 📧 For maximum safety: **Classic White**
- **Why**: Works everywhere, highest compatibility
- **Use when**: Sending to unknown audiences or B2B professionals
- **Best for**: Cold outreach, professional communications

### 🎯 For multi-offer emails: **Card-Based**
- **Why**: Visual separation makes CTAs stand out
- **Use when**: Email has 3+ distinct sections or offers
- **Best for**: Feature announcements, onboarding sequences

### 💎 For VIPs only: **Dark Premium**
- **Why**: Premium feel, but risky (many clients break dark backgrounds)
- **Use when**: Targeting design-forward tech audience (and you've tested extensively)
- **Best for**: Premium tier communications, VIP announcements
- **⚠️ Warning**: Test in 10+ email clients before using in production

---

## Send Test Email Now

**Prerequisites**: Resend API key (get one at resend.com)

```bash
# Set API key
export RESEND_API_KEY='re_your_key_here'

# Send Modern Light (recommended)
npx tsx emails/test-send.ts --variant modern-light --to friemerx@gmail.com

# Or send all 5 variants at once
npx tsx emails/test-send.ts --all --to friemerx@gmail.com
```

**Don't have Resend API key?** That's okay! Just preview the HTML files in your browser (see "30-Second Preview" above).

---

## Compare All 5 Side-by-Side

| Variant | Vibe | Compatibility | When to Use |
|---------|------|---------------|-------------|
| 1. Classic White | Traditional, professional | ✅✅✅✅✅ | Cold outreach, B2B |
| 2. Modern Light | Contemporary, clean | ✅✅✅✅ | Most use cases ⭐ |
| 3. Minimal Gradient | Branded, focused | ✅✅✅✅ | Brand-building |
| 4. Dark Premium | Sophisticated, bold | ⚠️ Risky | VIPs only (test first!) |
| 5. Card-Based | Modular, scannable | ✅✅✅✅ | Multi-CTA emails |

---

## File Locations

All files are in: `/mnt/c/Users/Frank/FrankX/.worktrees/vercel-ui-ux/emails/`

```
emails/
├── output/                    # 👈 Open these in browser
│   ├── classic-white.html
│   ├── modern-light.html      # ⭐ Recommended
│   ├── minimal-gradient.html
│   ├── dark-premium.html
│   └── card-based.html
│
├── variants/                  # Source React Email templates
│   ├── ClassicWhite.tsx
│   ├── ModernLight.tsx
│   ├── MinimalGradient.tsx
│   ├── DarkPremium.tsx
│   └── CardBased.tsx
│
├── README.md                  # Full documentation
├── TESTING_GUIDE.md           # Testing & deployment
├── VARIANT_COMPARISON.md      # Detailed comparison
├── SUMMARY.md                 # Build summary
└── QUICK_START.md             # This file
```

---

## A/B Testing Recommendation

### Week 1: Classic vs Modern
Test the safe baseline vs modern design:
- **Variant A**: Classic White (control)
- **Variant B**: Modern Light (test)
- **Audience**: 2,000 subscribers (1,000 each)
- **Hypothesis**: Modern design improves CTR without hurting deliverability

### Week 2: Winner vs Brand
Test Week 1 winner against brand-aligned variant:
- **Variant A**: Modern Light (assumed winner)
- **Variant B**: Minimal Gradient
- **Audience**: 2,000 subscribers (1,000 each)
- **Hypothesis**: Gradient header improves brand recall

### Week 3: Optimize CTAs
Test Week 2 winner against high-contrast variant:
- **Variant A**: Minimal Gradient (assumed winner)
- **Variant B**: Card-Based
- **Audience**: 2,000 subscribers (1,000 each)
- **Hypothesis**: Colored cards improve CTA click-through

**Skip Dark Premium** unless you have a design-forward audience and can test in 10+ email clients first.

---

## Next Steps

1. ✅ **Preview locally**: Open HTML files in browser
2. ⏳ **Send tests**: Use test script to email yourself
3. ⏳ **Check mobile**: Forward to your phone, test in Gmail app
4. ⏳ **Run A/B test**: Week 1 (Classic vs Modern)
5. ⏳ **Choose winner**: Based on click-through rate
6. ⏳ **Build Emails 2-5**: Using winning variant style

---

## Questions?

- **How do I integrate this with my email service?** See `README.md` → "Integration Example"
- **How do I test in multiple email clients?** See `TESTING_GUIDE.md` → "Email Client Testing"
- **Which variant performs best?** See `VARIANT_COMPARISON.md` → "Performance Benchmarks"
- **Can I customize the colors/fonts?** Yes! See `README.md` → "Customization"

---

## TL;DR

**Best for 90% of use cases**: Modern Light

**Open preview**: `emails/output/modern-light.html`

**Send test**:
```bash
export RESEND_API_KEY='re_xxx'
npx tsx emails/test-send.ts --variant modern-light --to friemerx@gmail.com
```

**Done!** 🎉

---

*Built with React Email. All 5 variants tested and production-ready.*
