# PDF System Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Set Up Environment

Add to `.env.local`:

```bash
RESEND_API_KEY=your_api_key_here
```

Get your Resend API key from: https://resend.com/api-keys

### 2. Add Your PDF Files

Place PDF files in `/public/guides/`:

```
public/
└── guides/
    ├── soulbook-guide.pdf
    ├── vibe-os-guide.pdf
    └── creator-ai-toolkit.pdf
```

### 3. Create a Guide Page

Create `/app/guides/[slug]/preview.tsx`:

```tsx
'use client'

import EnhancedPDFViewer from '@/components/ui/EnhancedPDFViewer'
import GuideTestimonials from '@/components/guides/GuideTestimonials'

export default function GuidePreview() {
  return (
    <div className="min-h-screen bg-[#030712] pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* PDF Viewer with Analytics */}
        <EnhancedPDFViewer
          url="/guides/soulbook-guide.pdf"
          title="The Soulbook Framework"
          guideSlug="soulbook-guide"
          description="Complete guide to consciousness-aligned creation"
          showEmailButton={true}
          showDownloadCounter={true}
        />

        {/* Testimonials */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            What Creators Are Saying
          </h2>
          <GuideTestimonials guideSlug="soulbook-guide" />
        </div>
      </div>
    </div>
  )
}
```

### 4. Test the System

1. **View the guide**: Navigate to `/guides/soulbook-guide/preview`
2. **Download PDF**: Click the download button
3. **Request email**: Click "Email Me" and fill form
4. **Check analytics**: Visit `/dashboard/pdf-analytics`
5. **View leads**: Visit `/dashboard/leads`

### 5. Verify Email Delivery

Check your inbox for the PDF delivery email with:
- Professional FrankX branding
- Download link
- Next steps section

## 📊 View Your Analytics

### Analytics Dashboard

Visit: http://localhost:3000/dashboard/pdf-analytics

You'll see:
- Total views, downloads, leads
- Engagement metrics (completion rate, time spent)
- Top performing guides
- Recent activity feed

### Leads Dashboard

Visit: http://localhost:3000/dashboard/leads

You'll see:
- All captured leads
- Search and filter tools
- CSV export button
- Lead details (company, role, interests)

## 🎨 Customize Components

### Change Brand Colors

Edit component files to match your brand:

```tsx
// From cyan-purple gradient
className="from-cyan-500 to-purple-600"

// To your colors
className="from-blue-500 to-pink-600"
```

### Customize Email Templates

Edit files in `/email-templates/`:
- `pdf-delivery.tsx` - Immediate delivery
- `follow-up-3-day.tsx` - First follow-up
- `follow-up-7-day.tsx` - Advanced tips

### Add Custom Fields

Edit `/components/ui/PDFEmailModal.tsx`:

```tsx
// Add new field
<div>
  <label>Company Size</label>
  <select
    value={companySize}
    onChange={(e) => setCompanySize(e.target.value)}
  >
    <option value="1-10">1-10</option>
    <option value="11-50">11-50</option>
    <option value="51-200">51-200</option>
    <option value="201+">201+</option>
  </select>
</div>
```

Then update the API call to include the new field.

## 🔧 Common Customizations

### 1. Add More Guides

```tsx
const guides = [
  {
    slug: 'new-guide',
    title: 'New Guide Title',
    pdfUrl: '/guides/new-guide.pdf',
    description: 'Guide description',
    thumbnailUrl: '/images/new-guide-thumb.png',
    pageCount: 35
  }
]
```

### 2. Change Email Sending Logic

Edit `/app/api/send-pdf/route.ts`:

```typescript
// Add conditions for when to send emails
if (lead.primaryInterest === 'ai-tools') {
  // Send specialized AI tools email
} else {
  // Send general email
}
```

### 3. Add Analytics Events

Track custom events:

```typescript
import { trackPDFView } from '@/lib/client-analytics'

// Track specific action
trackPDFView(guideSlug, title, pagesViewed, timeSpent, completionRate)
```

### 4. Customize Dashboard

Edit dashboard components:
- `/app/dashboard/pdf-analytics/PDFAnalyticsDashboard.tsx`
- `/app/dashboard/leads/LeadsDashboard.tsx`

Add new metrics, charts, or filters as needed.

## 📈 Track Key Metrics

Monitor these in your analytics dashboard:

1. **Conversion Rate**: Views → Downloads → Leads
2. **Engagement**: Completion rate, time spent
3. **Lead Quality**: % with company info filled
4. **Top Performers**: Which guides convert best

## 🐛 Troubleshooting

### PDF Not Loading?

```bash
# Check file exists
ls public/guides/your-guide.pdf

# Check file size (should be < 10MB)
du -h public/guides/your-guide.pdf
```

### Analytics Not Working?

```bash
# Check data directory exists and is writable
mkdir -p data
chmod 755 data

# Verify data files are being created
ls -la data/
```

### Email Not Sending?

```bash
# Verify environment variable
echo $RESEND_API_KEY

# Check Resend domain verification
# Visit: https://resend.com/domains
```

## 🚢 Deploy to Production

### 1. Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add RESEND_API_KEY
```

### 2. Set Up Monitoring

Add to Vercel dashboard:
- Analytics enabled
- Error tracking
- Performance monitoring

### 3. Add Dashboard Authentication

Implement auth middleware (see main docs).

### 4. Set Up Email Automation

Use Resend webhooks or build scheduler for follow-up emails.

## 🎯 Next Steps

1. **Add more guides** to `/public/guides/`
2. **Customize email templates** to match your voice
3. **Set up dashboard auth** for security
4. **Monitor analytics** weekly
5. **Optimize conversion** based on data

## 💡 Pro Tips

1. **A/B test email subject lines** - Track open rates
2. **Segment leads by interest** - Send targeted content
3. **Follow up manually** - High-touch for quality leads
4. **Share analytics** - Show social proof on landing pages
5. **Optimize PDFs** - Compress for faster loading

## 📚 Full Documentation

See `/docs/PDF_SYSTEM.md` for complete technical documentation.

---

**Need Help?**

- Review the full docs
- Check component code for inline comments
- Test in development first
- Deploy to staging before production

**Built for FrankX.AI** with premium design and conversion optimization.
