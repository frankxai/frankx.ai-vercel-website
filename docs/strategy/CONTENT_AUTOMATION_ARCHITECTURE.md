# FrankX Content Automation Architecture

**Version**: 1.0 | February 2026

---

## Overview

Three-layer content automation: Generation (AI) → Queue (review) → Distribution (MCP).

```
Blog Post Published
       ↓
/generate-social ← Claude Code command
       ↓
┌──────────────────────────────────────┐
│         social-queue.json             │
│  twitter: [thread]     status: draft  │
│  linkedin: [post]      status: draft  │
│  newsletter: [snippet] status: draft  │
└──────────────────────────────────────┘
       ↓ (review + approve)
┌──────────────────────────────────────┐
│         Distribution Layer            │
│  X/Twitter  → Zapier MCP (planned)   │
│  LinkedIn   → Zapier MCP (planned)   │
│  Newsletter → Resend MCP (ready)     │
│  Slack      → Slack MCP (ready)      │
└──────────────────────────────────────┘
```

## Components

### 1. Content Generation (`/generate-social`)

**Location**: `.claude/commands/generate-social.md`

Generates platform-optimized content from:
- Blog post slugs (reads MDX directly)
- Topics or announcements
- "latest" keyword for most recent post

**Output**: Formatted content for X thread, LinkedIn post, newsletter snippet.

**Voice**: Direct, technical, confident. No emojis. No guru language. Specific numbers and results.

### 2. Social Queue (`data/social-queue.json`)

JSON-based queue for content review before posting.

```json
{
  "id": "social-2026-0209-acos-v7",
  "source": "acos-zero-to-production-quickstart",
  "createdAt": "2026-02-09T17:00:00Z",
  "status": "draft | approved | posted | archived",
  "platforms": {
    "twitter": { "content": ["tweet1", "tweet2", ...], "status": "draft" },
    "linkedin": { "content": "full post", "status": "draft" },
    "newsletter": { "subject": "", "preview": "", "body": "", "status": "draft" }
  }
}
```

### 3. Distribution Connectors

| Platform | Method | Status | Setup |
|----------|--------|--------|-------|
| X/Twitter | Zapier MCP → Post Tweet | Planned | `zapier.com` → Add Action → "Post Tweet" |
| LinkedIn | Zapier MCP → Create Share | Planned | `zapier.com` → Add Action → "Create Share Update" |
| Newsletter | Resend MCP | Ready | Already configured |
| Slack | Slack MCP | Ready | Already configured |
| Notion | Notion MCP | Ready | Content calendar tracking |

### 4. Zapier Setup Guide

To enable social posting:

1. Go to https://actions.zapier.com/
2. Add action: **X (Twitter) → Create Tweet**
3. Add action: **LinkedIn → Create Share Update**
4. The actions will appear as new tools in the Zapier MCP
5. Use `/generate-social` → review → post via MCP tools

## Workflow

### Daily Content Distribution

```
1. Write blog post or have topic ready
2. Run: /generate-social latest
3. Review generated content in terminal
4. Edit if needed (content saved to social-queue.json)
5. Approve and post:
   - Slack MCP → share in #content channel
   - (Future) Zapier MCP → post to X + LinkedIn
   - Resend MCP → newsletter when ready
```

### Weekly Automation

```
Monday:    Review social-queue.json for week's content
Tuesday:   Generate social for any new blog posts
Wednesday: LinkedIn focus day (longer posts)
Thursday:  Newsletter compilation
Friday:    X thread day (technical content)
```

## Content Formats by Platform

### X/Twitter
- Thread of 5-8 tweets
- First tweet = hook (question or bold claim)
- Last tweet = CTA with link
- No hashtags, no emojis
- Max 280 chars per tweet

### LinkedIn
- 150-300 word post
- Hook in first 2 lines (visible before "see more")
- Professional but personal
- 3-5 hashtags at very end only
- "Link in comments" CTA

### Newsletter
- Subject under 50 chars
- Preview text 40-90 chars
- 2-3 paragraph summary
- Personal voice, links to full post

## Metrics (via Vercel Analytics)

Track after each distribution:
- Blog views spike after social post
- Referral source breakdown
- Newsletter open rate
- Social engagement (manual check until analytics API)

---

*Build what matters. Distribute what ships.*
