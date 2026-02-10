# FrankX Social Media Publishing Tracker

**Last Updated:** 2026-01-27
**Part of ACOS (Agentic Creator OS)**

---

## Publishing Strategy

### Primary Platforms (Focus Here)
| Platform | Format | Frequency | Best Time | Audience |
|----------|--------|-----------|-----------|----------|
| **LinkedIn** | 1:1 image + long post | 1x/day | 8-10am EST | Enterprise AI, Oracle |
| **Twitter/X** | 1:1 image + thread | 2-3x/day | 9am, 1pm, 5pm EST | Tech, AI, Creators |
| **YouTube** | 16:9 thumbnail | 1-2x/week | Weekends | Deep technical |

### Secondary Platforms (Repurpose)
| Platform | Format | Frequency | Content |
|----------|--------|-----------|---------|
| Instagram Feed | 1:1 carousel | 3x/week | Visual summaries |
| Instagram Stories | 9:16 | Daily | Behind scenes |
| TikTok | 9:16 vertical | 2x/week | Quick tips |

---

## Content Pipeline Status

### Staging (_staging/)
| Date Added | Blog Source | Platform | Image | Caption | Status |
|------------|-------------|----------|-------|---------|--------|
| 2026-01-27 | reader-first-golden-age | LinkedIn | pending | pending | 🟡 In Progress |
| 2026-01-27 | conscious-ai-integration-os | LinkedIn | pending | pending | 🟡 In Progress |
| 2026-01-27 | golden-age-of-intelligence | LinkedIn | pending | pending | 🟡 In Progress |
| 2026-01-27 | production-llm-agents-oci-3 | LinkedIn | pending | pending | 🟡 In Progress |

---

## Published Content Log

### January 2026

| Date | Platform | Post Title | Image | Link | Impressions | Engagement | Notes |
|------|----------|------------|-------|------|-------------|------------|-------|
| - | - | - | - | - | - | - | Start tracking here |

---

## Performance Summary

### Weekly Metrics
| Week | LinkedIn Impr. | Twitter Impr. | Top Post | Learnings |
|------|----------------|---------------|----------|-----------|
| W4 Jan | - | - | - | Baseline week |

### Best Performing Content Types
1. TBD - Need 2 weeks data
2. TBD
3. TBD

---

## Workflow: Blog → Social

```
1. Blog published on frankx.ai
       ↓
2. /factory generates social remix pack:
   - LinkedIn post (1:1 image + caption)
   - Twitter thread (1:1 image + thread)
   - Instagram (1:1 + 9:16 story)
   - YouTube thumbnail (16:9)
       ↓
3. Assets saved to _staging/[blog-slug]/
       ↓
4. Review & approve
       ↓
5. Schedule/post manually (for now)
       ↓
6. Move to _published/[date]/
       ↓
7. Track metrics after 24-48 hrs
       ↓
8. Weekly analysis → refine strategy
```

---

## Quick Commands

```bash
# Generate social pack for a blog
/factory social-remix [blog-slug]

# Generate image for specific platform
/frankx-infogenius "[topic]" aspect=1:1
/frankx-infogenius "[topic]" aspect=9:16

# Check staging queue
ls public/social/_staging/

# Move to published
mv public/social/_staging/[slug] public/social/_published/$(date +%Y-%m-%d)/
```

---

## Platform API Status

| Platform | API Available | MCP Server | Status |
|----------|---------------|------------|--------|
| LinkedIn | Yes | Community | 🟡 Setup needed |
| Twitter/X | Yes | Community | 🟡 Setup needed |
| YouTube | Yes | Google | 🟡 Setup needed |
| Instagram | Business API | Meta | 🟡 Setup needed |
| TikTok | Limited | None | ❌ Manual only |

### Future Automation Options
1. **Claude Code MCPs** - Direct API integration (preferred)
2. **n8n** - For complex multi-step workflows
3. **Buffer/Hootsuite** - If manual scheduling preferred

---

## Content Templates

### LinkedIn Post Template
```
[HOOK - 1 line that stops scroll]

[3-5 line story or insight from the blog]

Key takeaways:
→ Point 1
→ Point 2
→ Point 3

[CTA - Read full guide or ask question]

#AI #AIAgents #EnterpriseAI #CreatorEconomy
```

### Twitter Thread Template
```
🧵 [HOOK]

1/ [Main insight]

2/ [Supporting point]

3/ [Example or data]

4/ [Actionable takeaway]

5/ Full breakdown here: [LINK]

RT if this helps!
```

---

*Tracker maintained by ACOS. Update daily for best results.*
