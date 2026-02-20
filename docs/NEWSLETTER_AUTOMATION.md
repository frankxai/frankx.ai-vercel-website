# Newsletter Automation Architecture

## Overview

This document explains the FrankX newsletter automation system, including when to use N8N vs Claude Code agentic automation.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        NEWSLETTER SYSTEM                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐     │
│  │  CONTENT        │    │  SUBSCRIBERS    │    │  DELIVERY       │     │
│  │  (MDX Files)    │───▶│  (Resend)       │───▶│  (Resend API)   │     │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘     │
│         │                       │                      │                │
│         ▼                       ▼                      ▼                │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐     │
│  │  Archive        │    │  Dashboard      │    │  React Email    │     │
│  │  /newsletter/   │    │  /dashboard/    │    │  Templates      │     │
│  │  archive/       │    │  newsletter/    │    │  /emails/       │     │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘     │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                         AUTOMATION LAYER                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  CLAUDE CODE (Agentic - Primary)                                  │  │
│  │  ├── Content curation from blog posts                            │  │
│  │  ├── Newsletter draft generation                                 │  │
│  │  ├── Voice calibration to FrankX style                          │  │
│  │  └── API calls to send broadcasts                                │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  N8N / CRON (Scheduled - Optional)                                │  │
│  │  ├── Weekly reminder to create newsletter                        │  │
│  │  ├── Auto-archive sent newsletters                               │  │
│  │  └── Subscriber analytics sync                                   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Do You Need N8N?

### Short Answer: **Not Required, But Nice to Have**

| Task | Claude Code | N8N | Recommendation |
|------|-------------|-----|----------------|
| Curate blog content | ✅ Best | ❌ | Claude Code |
| Write newsletter draft | ✅ Best | ❌ | Claude Code |
| Send broadcast | ✅ Yes | ✅ Yes | Either |
| Schedule weekly sends | ❌ No | ✅ Best | N8N or Vercel Cron |
| Sync to CRM | ❌ No | ✅ Best | N8N |
| Auto-archive issues | ✅ Yes | ✅ Yes | Either |

### When to Use N8N

Use N8N if you want:
1. **Scheduled automation** - "Every Thursday at 10am, send newsletter"
2. **Multi-service integration** - Sync subscribers to Notion, Airtable, etc.
3. **Complex workflows** - If-then logic across multiple services
4. **No-code team members** - Visual workflow builder

### When Claude Code is Better

Use Claude Code agentic automation for:
1. **Content creation** - AI writes better newsletters than templates
2. **Smart curation** - Reading blog posts and extracting insights
3. **Voice consistency** - Maintaining FrankX tone
4. **One-off sends** - "Send this week's newsletter now"

---

## Automation Workflows

### Workflow 1: Weekly Newsletter (Claude Code)

**Trigger**: Manual command or Vercel Cron

```
User: "Create this week's newsletter"

Claude Code:
1. Read content/blog/*.mdx from last 7 days
2. Extract top 3 articles with key insights
3. Generate newsletter draft with:
   - Personal greeting
   - Article summaries
   - Quick tip
   - Personal note
   - CTA
4. Show draft for approval
5. On approval: POST /api/newsletter/broadcast
6. Save to content/newsletters/XXX-title.mdx
```

### Workflow 2: Scheduled Send (N8N or Vercel Cron)

**Trigger**: Every Thursday at 10am ET

```
N8N Workflow:
1. HTTP Request → GET /api/newsletter/stats
2. If draft exists in queue:
   - HTTP Request → POST /api/newsletter/broadcast
   - Slack notification: "Newsletter sent to X subscribers"
3. If no draft:
   - Slack notification: "No newsletter queued for today"
```

### Workflow 3: New Subscriber Welcome (Vercel Edge Function)

**Trigger**: POST /api/newsletter/subscribe

```
1. Add contact to Resend Audiences
2. Send welcome email (template: welcome-series-1)
3. Schedule follow-up emails:
   - Day 3: Best articles email
   - Day 7: Personal story email
   - Day 14: Product invitation
```

---

## Email Template System

### Template Types

| Template | Purpose | File |
|----------|---------|------|
| `weekly-digest` | Main weekly newsletter | `emails/templates/weekly-digest.tsx` |
| `announcement` | Product launches, big news | `emails/templates/announcement.tsx` |
| `welcome-series` | New subscriber onboarding | `emails/templates/welcome-*.tsx` |
| `personal` | Direct, personal emails | `emails/templates/personal.tsx` |

### Creating New Templates

```tsx
// emails/templates/my-template.tsx
import { EmailLayout, EmailHeading, EmailText, EmailButton } from '../components/Layout'

export default function MyTemplate({ name, content }) {
  return (
    <EmailLayout preview="Preview text here">
      <EmailHeading>Hello {name}!</EmailHeading>
      <EmailText>{content}</EmailText>
      <EmailButton href="https://frankx.ai">Learn More</EmailButton>
    </EmailLayout>
  )
}
```

### Preview Templates

```bash
# Install React Email CLI
npm install @react-email/cli -D

# Start preview server
npx react-email dev --dir emails
```

---

## Newsletter Archive (SEO)

### URL Structure

```
/newsletter                     # Subscribe page
/newsletter/archive             # All past issues
/newsletter/archive/001-welcome # Individual issue
```

### SEO Benefits

1. **Indexable Content** - Each issue is a unique page
2. **Schema Markup** - Article schema for rich results
3. **Internal Linking** - Issues link to blog posts
4. **Fresh Content** - Weekly updates signal activity
5. **Keyword Targeting** - Each issue targets different terms

### Sitemap Integration

Add to `app/sitemap.ts`:

```typescript
import { getAllNewsletters } from '@/lib/newsletters'

// In generateSitemap():
const newsletters = getAllNewsletters()
const newsletterUrls = newsletters.map((n) => ({
  url: `${baseUrl}/newsletter/archive/${n.slug}`,
  lastModified: new Date(n.date),
  changeFrequency: 'monthly',
  priority: 0.6,
}))
```

---

## Recommended Setup

### Phase 1: Manual with Claude Code (Now)

1. ✅ Newsletter system built (Resend Audiences)
2. ✅ Email templates (React Email)
3. ✅ Archive pages (SEO)
4. ⏳ Configure Resend API key
5. ⏳ Test first newsletter

### Phase 2: Add Scheduling (Optional)

1. Add Vercel Cron for weekly reminders
2. Or set up N8N for complex workflows
3. Add welcome email sequence

### Phase 3: Full Automation (Future)

1. AI auto-curates weekly content
2. Draft review in Slack/Discord
3. One-click approve and send
4. Auto-archive and notify

---

## Commands

### Claude Code Commands

```
"Draft this week's newsletter"
"Send the newsletter to all subscribers"
"How many subscribers do we have?"
"Add user@example.com to the newsletter"
"Archive last week's newsletter"
```

### API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/newsletter/subscribe` | POST | Add subscriber |
| `/api/newsletter/broadcast` | POST | Send newsletter |
| `/api/newsletter/stats` | GET | Get statistics |

---

## Next Steps

1. **Configure Resend** - Set API key in Vercel
2. **Test Subscribe** - Try the /newsletter page
3. **Send First Issue** - Use dashboard or API
4. **Set Up Archive** - Save issues as MDX files
5. **Optional: Add N8N** - For scheduled automation
