# Content Status

View dashboard of all content projects and their status.

## Parameters
- `[filter]` - Optional: Filter by status, pillar, or format

## Usage
```
/content-status
/content-status drafting
/content-status conscious-ai
/content-status books
```

## What This Does

Queries the knowledge graph and displays comprehensive content overview:

1. **Scan All Content**: Check status across all formats
2. **Group by Status**: In progress, complete, published
3. **Show Metrics**: Performance data for published content
4. **Identify Opportunities**: Repurposing and gaps
5. **Highlight Priorities**: What needs attention

## Output

### Content Overview Dashboard

**Books** (2 active)
- Year of the Creator
  - Status: Drafting
  - Progress: 6/12 chapters complete
  - Next: Chapter 7 (due: 2025-06-01)
  - Repurposing: 3 blog posts ready to extract

**Blog Posts** (42 published, 5 drafts)
- Conscious AI: 18 published | 2 drafts
- Business Intelligence: 12 published | 1 draft
- Creative Innovation: 9 published | 2 drafts
- Community: 3 published | 0 drafts

Top performers (last 30 days):
1. [Title] - 5.2K views, 320 shares ⭐ Ready for chapter expansion
2. [Title] - 3.8K views, 180 shares ⭐ Create thread series
3. [Title] - 2.1K views, 95 shares

**Courses** (1 active, 2 planned)
- AI Music Academy
  - Status: In production
  - Progress: 3/6 modules complete
  - Next: Module 4 filming (week of 2025-06-05)

**Social Content** (127 threads, 64 LinkedIn posts)
- This month: 18 threads, 12 LinkedIn posts
- Avg engagement: 12.3K impressions/thread
- Top thread: [Topic] - 45K impressions, 2.1K likes

### Content Gaps Identified
- [ ] No conscious-ai content this week
- [ ] Business intelligence pillar at 20% (target: 25%)
- [ ] Community pillar underserved (10% vs target 15%)
- [ ] No video content in 2 weeks

### Repurposing Opportunities
1. Blog "Suno AI Guide" (1.8K shares) → Book chapter + Course module
2. Chapter 5 "Music Revolution" → Blog series (3 posts) + Thread campaign
3. Course Module 2 → Lead magnet PDF + Email sequence

### This Week's Priorities
**Monday**: Blog post (Business Intelligence pillar)
**Tuesday**: Complete Chapter 7
**Wednesday**: Module 4 lesson scripts
**Thursday**: Thread campaign (Music Revolution)
**Friday**: Community spotlight blog

### Performance Summary (30 days)
- Blog traffic: 45.2K visitors (+23% vs last month)
- Social reach: 580K impressions (+41% vs last month)
- Email growth: +1,240 subscribers (+18% vs last month)
- Course enrollments: 89 new students (+12% vs last month)

## Filter Options

### By Status
- `drafting` - In-progress content
- `review` - Ready for review/editing
- `scheduled` - Queued for publishing
- `published` - Live content

### By Pillar
- `conscious-ai` - Conscious AI Integration content
- `business-intelligence` - Strategic Business Intelligence
- `creative-innovation` - Creative & Innovation Excellence
- `community` - Community & Collaboration

### By Format
- `books` - Book projects
- `blogs` - Blog posts
- `courses` - Course modules
- `social` - Social media content

## What Happens Next

Use insights to:
1. Prioritize creation (fill gaps)
2. Execute repurposing (maximize value)
3. Optimize publishing schedule
4. Track toward goals

Quick actions:
- `/blog-post <pillar> <topic>` - Fill content gap
- `/repurpose <high-performer> <format>` - Maximize value
- `/publish <content>` - Release scheduled content

---

**Time estimate**: Instant dashboard generation.
