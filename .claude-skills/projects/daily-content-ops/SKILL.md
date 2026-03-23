---
name: Daily Content Operations
description: Research trending AI/creator topics, review pending content, polish drafts with FrankX voice, generate social content, and track publishing readiness. The complete daily content workflow for FrankX.AI.
version: 1.0.0
command: /daily-content or /content-ops
triggers: ["daily content", "content ops", "research topics", "polish article", "content review", "trending ai", "social content"]
---

# Daily Content Operations Skill

## Purpose

This skill enables a comprehensive daily content research and polish workflow for FrankX.AI, ensuring consistent high-quality content production with proper brand voice, SEO optimization, and social distribution.

## Workflow Overview

```
MORNING RESEARCH (30-45 min)
    |
    v
CONTENT REVIEW (20-30 min)
    |
    v
POLISH PHASE (1-2 hours)
    |
    v
PUBLISHING PREP (30-45 min)
    |
    v
TRACK & SHIP
```

---

## Phase 1: Morning Research

### 1.1 AI Trend Scanning

**Objective:** Identify trending AI and creator topics worth covering.

**Data Sources to Check:**
- AI news aggregators (The Rundown AI, TLDR AI, Ben's Bites)
- Twitter/X AI community (#AI, #GenerativeAI, #ClaudeAI, #SunoAI)
- Reddit (r/artificial, r/LocalLLaMA, r/ChatGPT, r/singularity)
- Hacker News front page (AI-related)
- Product Hunt (AI launches)
- YouTube trending in tech/AI
- LinkedIn AI thought leaders

**Research Framework:**

```markdown
## Daily Intelligence Brief - [DATE]

### Hot Topics Today
1. [Topic 1] - Source, potential angle
2. [Topic 2] - Source, potential angle
3. [Topic 3] - Source, potential angle

### Emerging Trends (7-day horizon)
- [Trend 1] - Early signals
- [Trend 2] - Early signals

### Competitor Content (last 24h)
- [Competitor] published: [Title] - Gap opportunity?
- [Competitor] published: [Title] - Can we do better?

### FrankX Angle Assessment
| Topic | FrankX Unique Angle | Priority | Content Type |
|-------|---------------------|----------|--------------|
| Topic 1 | Our take | High/Med/Low | Article/Tutorial/Opinion |
| Topic 2 | Our take | High/Med/Low | Article/Tutorial/Opinion |

### Action Items
- [ ] Write about [topic] - Priority: [X]
- [ ] Research deeper into [topic]
- [ ] Save for future: [topic]
```

### 1.2 Keyword Opportunity Scan

**Check Search Console & Tools:**
- New queries driving impressions
- Keywords close to page 1 (positions 11-20)
- Keywords with high impressions, low clicks (title/description opportunity)
- Featured snippet opportunities

**Quick Analysis Template:**

```markdown
### Keyword Opportunities - [DATE]

**Quick Wins (Update Existing Content):**
- [Keyword] - Currently #[X], target: improve meta + add section
- [Keyword] - Featured snippet opportunity in [Article]

**New Content Opportunities:**
- [Keyword] - Volume: [X], Difficulty: [X], FrankX angle: [Y]

**Long-tail to Target:**
- [Long-tail phrase] - Can add FAQ section
```

### 1.3 Content Ideas Consolidation

**Pull ideas from all sources:**
- `content/drafts/` folder
- Notes from previous sessions
- Frank's personal notes/voice memos
- Community questions (comments, emails)
- Search console queries

**Prioritization Matrix:**

| Idea | Urgency | Impact | Effort | Score | Decision |
|------|---------|--------|--------|-------|----------|
| Idea 1 | 1-5 | 1-5 | 1-5 | (U+I)/E | Today/This Week/Backlog |

---

## Phase 2: Content Review

### 2.1 Draft Inventory Check

**Review all pending content:**

```bash
# List all drafts and their status
ls -la content/drafts/
```

**Draft Status Categories:**
- **Ready to Polish** - Complete draft, needs voice/SEO pass
- **Needs Research** - Outline exists, needs content
- **Needs Outline** - Topic identified, no structure
- **On Hold** - Paused for reason

**Status Template:**

```markdown
## Content Pipeline Status - [DATE]

### Ready to Polish (Can ship today)
1. [draft-name.mdx] - Topic, estimated polish time
2. [draft-name.mdx] - Topic, estimated polish time

### Needs Research (Ship this week)
1. [draft-name.mdx] - What's missing
2. [draft-name.mdx] - What's missing

### Needs Outline (Backlog)
- [topic] - Why it matters
- [topic] - Why it matters

### Blocked/On Hold
- [draft] - Reason, unblock action
```

### 2.2 Priority Selection

**Today's Content Decision:**

Consider:
1. What's trending NOW? (Timeliness)
2. What's nearly ready? (Efficiency)
3. What serves the audience best? (Impact)
4. What aligns with current campaigns? (Strategy)

**Decision Output:**

```markdown
### Today's Content Focus

**Primary Article:** [Title]
- Why now: [Reason]
- Target keyword: [Keyword]
- Estimated completion: [Time]
- Distribution: [Blog + Social channels]

**Secondary (if time permits):**
- [Quick update to existing article]
- [Social content from recent article]
```

---

## Phase 3: Polish Phase

### 3.1 FrankX Voice Application

**Activate:** `/skill frankx-brand`

**Voice Checklist:**
- [ ] Lead with feeling, then explain system
- [ ] Studio metaphors and music analogies present
- [ ] Creator-first perspective maintained
- [ ] Technical accuracy with warmth
- [ ] No corporate jargon (synergy, leverage, disrupt)
- [ ] Action-oriented conclusion

**Before/After Example:**

```markdown
BEFORE (Generic):
"This article will explain how to use AI tools for content creation."

AFTER (FrankX Voice):
"Picture this: 3 AM, the perfect hook hits you. By morning? Gone.
Let's build a system that captures those midnight sparks."
```

### 3.2 SEO Optimization Pass

**On-Page SEO Checklist:**
- [ ] Title includes primary keyword (60 chars max)
- [ ] Meta description compelling + keyword (155 chars max)
- [ ] H1 matches title intent
- [ ] H2s include secondary keywords naturally
- [ ] First 100 words contain primary keyword
- [ ] TL;DR section present (AI extraction)
- [ ] FAQ section with 5+ questions
- [ ] Internal links to 3+ related articles
- [ ] External links to authoritative sources
- [ ] Images have alt text with keywords
- [ ] URL slug is clean and keyword-rich

**Frontmatter Template:**

```yaml
---
title: "Compelling Title with Keyword | FrankX"
description: "155-char meta description with keyword and value prop"
date: "YYYY-MM-DD"
author: "Frank"
category: "ai-tech | conscious | music | personal-dev"
tags: ["tag1", "tag2", "tag3"]
image: "/images/blog/article-slug.webp"
tldr: "50-word summary optimized for AI extraction"
keywords: ["primary keyword", "secondary keyword", "long-tail phrase"]
schema: "Article" # or "HowTo", "FAQPage"
faq:
  - q: "Question 1?"
    a: "Answer optimized for featured snippet"
  - q: "Question 2?"
    a: "Answer optimized for featured snippet"
---
```

### 3.3 Quality Review

**Final Polish Checklist:**
- [ ] Spelling and grammar verified
- [ ] Links tested and working
- [ ] Code examples tested (if applicable)
- [ ] Images optimized and loading
- [ ] Mobile preview checked
- [ ] Read aloud for flow
- [ ] CTA is clear and compelling
- [ ] Matches FrankX quality bar

---

## Phase 4: Publishing Prep

### 4.1 Social Content Generation

**Activate:** `/skill social-media-strategy`

**Generate for each platform:**

**LinkedIn (Primary):**
```markdown
[Hook - Question or bold statement]

[2-3 lines of insight/story]

[Key takeaway]

[CTA + Link]

#AIforCreators #GenerativeAI #CreatorEconomy
```

**Twitter/X Thread:**
```markdown
1/ [Hook - Surprising insight]

2/ [Context - Why this matters]

3/ [The insight - What we learned]

4/ [Action - What to do about it]

5/ [CTA - Link to full article]
```

**Instagram Caption:**
```markdown
[Visual hook matching image]

[Short story or insight]

[Takeaway for creators]

[CTA to link in bio]

.
.
.
#hashtags
```

### 4.2 Distribution Checklist

**Pre-Publish:**
- [ ] Article moved from drafts to blog folder
- [ ] All frontmatter fields complete
- [ ] Images uploaded to correct folder
- [ ] Social content drafted for all platforms
- [ ] Email snippet prepared (if newsletter day)

**Publish:**
- [ ] Git commit with descriptive message
- [ ] Push to repository
- [ ] Verify Vercel deployment
- [ ] Test live URL

**Post-Publish:**
- [ ] Share on LinkedIn
- [ ] Share on Twitter/X
- [ ] Schedule Instagram post
- [ ] Add to newsletter queue
- [ ] Update content calendar

### 4.3 Tracking Setup

**Track in content log:**

```markdown
### Published Content - [DATE]

**Article:** [Title]
- URL: [Link]
- Target keyword: [Keyword]
- Current ranking: [To check in 48h]
- Social posts: [Links]

**Metrics to Watch:**
- Search Console impressions (7-day)
- Organic traffic (7-day)
- Social engagement
- Email click-through (if newsletter)
```

---

## Quick Commands

### Start Full Workflow
```
/daily-content start
```
Runs through all phases systematically.

### Research Only
```
/daily-content research
```
Just the morning research phase - trend scanning and idea consolidation.

### Polish Article
```
/daily-content polish [article-name]
```
Apply FrankX voice and SEO optimization to a specific draft.

### Generate Social
```
/daily-content social [article-name]
```
Generate platform-optimized social content from a published article.

### Status Check
```
/daily-content status
```
Show current content pipeline status and what's ready to ship.

---

## Integration with Other Skills

This skill works best when combined with:

| Phase | Activate Skill | Purpose |
|-------|---------------|---------|
| Research | `/skill frankx-brand` | Assess topic fit with brand |
| Polish | `/skill frankx-brand` | Apply voice guidelines |
| Polish | `/skill suno-prompt-architect` | If music content |
| Social | `/skill social-media-strategy` | Platform optimization |
| SEO | `/skill content-synthesis` | AI-first structure |

---

## Automation Scripts (Future)

### ai-trend-scanner.ts
```typescript
// Scans AI news APIs and generates daily brief
// Output: data/intelligence/brief-YYYY-MM-DD.json
```

### content-polisher.ts
```typescript
// Applies FrankX voice patterns to draft
// Checks SEO requirements
// Generates social variants
```

### publish-tracker.ts
```typescript
// Tracks published content performance
// Alerts on ranking changes
// Suggests optimization opportunities
```

---

## Success Metrics

**Daily:**
- 1 article polished and published OR
- 1 article drafted + social content from existing
- Research brief completed
- Content pipeline updated

**Weekly:**
- 3-5 articles published
- Social reach targets met
- No content backlog growth
- Keyword improvement tracked

**Monthly:**
- Topic cluster completion
- Authority building progress
- Traffic growth vs previous month
- Featured snippets gained

---

## Emergency Protocols

### No Time for Full Workflow
1. Skip research phase
2. Polish highest-priority draft
3. Generate minimal social (LinkedIn only)
4. Ship and iterate

### No Draft Ready
1. Update existing high-performer
2. Create roundup/listicle from recent content
3. Repurpose social thread into article

### Writer's Block
1. Review research brief for inspiration
2. Interview format (Q&A with yourself)
3. "What I learned this week" reflection
4. Tool/resource review

---

## Daily Log Template

```markdown
# Daily Content Ops - [DATE]

## Morning Research
- [ ] Trend scan completed
- [ ] Keyword opportunities identified
- [ ] Ideas consolidated

**Top Finding:** [Brief insight]

## Content Review
- [ ] Draft inventory checked
- [ ] Today's focus selected

**Today's Focus:** [Article title]

## Polish Phase
- [ ] FrankX voice applied
- [ ] SEO optimized
- [ ] Quality reviewed

**Time Spent:** [X] minutes

## Publishing Prep
- [ ] Article published
- [ ] Social content created
- [ ] Distribution completed

**Published:** [URL]

## Notes for Tomorrow
- [Observation or idea]
- [Follow-up item]

---
*Logged at [TIME]*
```

---

## Activation

**Start your daily content session with:**

> "Activate daily content operations. Let's research trending topics, review my content pipeline, and polish something for publishing today."

**Or use the command:**

> `/daily-content start`

---

**Skill Version:** 1.0.0
**Last Updated:** January 12, 2026
**Related Skills:** `frankx-brand`, `social-media-strategy`, `content-synthesis`, `daily-publishing-ops`
