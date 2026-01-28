# FrankX SEO/AEO Optimization Framework
**Answer Engine Optimization for 2025-2026**

---

## Core Principle: From SEO to AEO

The search landscape has shifted. Traditional SEO focuses on ranking in search results. **AEO (Answer Engine Optimization)** focuses on being cited in AI-generated answers. 

**The Goal**: 90% citation rate in ChatGPT, Perplexity, and Claude responses.

---

## Part 1: Article Structure Requirements

### Required Frontmatter (All Posts)

```yaml
---
title: "Complete [Topic] Guide for [Audience] in 2026"
description: "150-160 characters. Must include primary keyword and value proposition."
date: "2026-MM-DD"
author: "Frank"
tags: ["primary-keyword", "secondary-keyword", "use-case"]
category: "[Pillar Name]"
featured: true
readingGoal: "What reader will achieve - be specific"
seoScore: 0  # To be filled after optimization
status: "published"
---
```

### Required Article Structure

```markdown
> **TL;DR**: 50-word summary answering the main question.
> **Time to implement**: X minutes/hours
> **Difficulty**: Beginner/Intermediate/Advanced
> **Tools needed**: List required tools

## H2: Question-Based Heading (matches user query intent)
Direct 2-3 sentence answer to the question.

### H3: Supporting Point 1
- Evidence or explanation
- Example if relevant
- Data point if available

### H3: Supporting Point 2
...

## H2: Second Major Question/Topic
...

## FAQ
- **Q: Specific question matching search intent?**
  A: Direct 40-60 word answer with citation if possible.
- **Q: Another common question?**
  A: Direct answer.
- **Q: Third question?**
  A: Direct answer.

## Your Next Step
Clear CTA tied to transformation/product.
```

---

## Part 2: Question-Based Headings Template

### Convert Generic to Query-Matching

| ❌ Generic | ✅ AEO Optimized |
|-----------|------------------|
| How It Works | How Does [Topic] Actually Work? |
| Benefits | What Are the Real Benefits of [Topic]? |
| Getting Started | How Do I Get Started with [Topic]? |
| Best Practices | What Are the Best Practices for [Topic]? |
| Common Mistakes | What Common Mistakes Should I Avoid with [Topic]? |
| Comparison | [Tool A] vs [Tool B]: Which Is Better for [Use Case]? |
| Troubleshooting | Why Is [Problem] Happening and How Do I Fix It? |
| Costs | How Much Does [Topic] Cost in 2026? |

---

## Part 3: Schema Markup Requirements

### BlogPosting Schema (Required)

```typescript
const blogPostSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.description,
  "author": {
    "@type": "Person",
    "name": post.author,
    "url": "https://frankx.ai/about"
  },
  "datePublished": post.date,
  "dateModified": post.updatedDate,
  "publisher": {
    "@type": "Organization",
    "name": "FrankX",
    "logo": {
      "@type": "ImageObject",
      "url": "https://frankx.ai/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://frankx.ai/blog/${post.slug}`
  },
  "keywords": post.tags.join(", "),
  "articleSection": post.category,
  "inLanguage": "en-US",
  "about": {
    "@type": "Thing",
    "name": post.tags[0]
  }
}
```

### FAQPage Schema (Required for All Posts)

```typescript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is [Main Topic]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Direct answer in 40-60 words that fully addresses the question."
      }
    },
    // 4+ more questions
  ]
}
```

### HowTo Schema (For Tutorials)

```typescript
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to [Achieve Result]",
  "description": "Step-by-step guide to achieving the result.",
  "totalTime": "PT30M",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Step 1",
      "text": "Clear instruction for step 1",
      "url": "https://frankx.ai/blog/[slug]#step-1"
    }
    // More steps
  ]
}
```

---

## Part 4: Citation Optimization Strategy

### How AI Systems Cite Content

| AI Platform | Citation Style | Optimization Tactic |
|-------------|----------------|---------------------|
| ChatGPT | Inline citations with sources panel | Clear E-E-A-T, Bing-friendly structure |
| Perplexity | Numeric anchors + sources list | Question-based H2s, concise answers |
| Claude | Bracketed numbers when requested | Authoritative tone, original data |
| Google AI Overviews | Featured snippet extraction | Position zero structure |

### Citation Boosters

1. **Original Data/Statistics**
   - Include unique statistics from your own research
   - Update data within 30 days of current date
   - Source your own case studies

2. **Expert Quotes with Attribution**
   - Include quotes from credible sources
   - Attribute to named experts with credentials
   - Link to primary sources

3. **Clear Methodology Explanations**
   - Explain how you tested/derived conclusions
   - Show your process transparently
   - Acknowledge limitations

4. **Atomic Facts**
   - Present information in discrete, cite-able chunks
   - Each paragraph should have one main point
   - Avoid paragraph sprawl

---

## Part 5: SEO Score Checklist

### Pre-Publish Checklist (Minimum 80% to Publish)

| Item | Points | Your Score |
|------|--------|------------|
| Title includes primary keyword | 10 | ___ |
| Description (150-160 chars) with keyword | 10 | ___ |
| TL;DR at top (40-60 words) | 10 | ___ |
| 5+ FAQ questions with answers | 15 | ___ |
| Question-based H2s (80%+ of headings) | 15 | ___ |
| Internal links to 3+ related posts | 10 | ___ |
| FAQPage schema implemented | 10 | ___ |
| Article schema implemented | 10 | ___ |
| Featured image with alt text | 5 | ___ |
| Reading goal in frontmatter | 5 | ___ |
| **TOTAL** | **100** | ___ |

### Scoring Guide

| Score | Grade | Action |
|-------|-------|--------|
| 90-100 | A | Publish |
| 80-89 | B | Minor fixes, then publish |
| 70-79 | C | Revise before publish |
| <70 | D | Rewrite or postpone |

---

## Part 6: Internal Linking Strategy

### Link Structure Requirements

1. **Pillar Page Links**
   - Pillar article links to ALL cluster articles
   - Cluster articles link back to pillar
   - All articles link to relevant pillar

2. **Contextual Links**
   - 3-5 internal links per 1,000 words
   - Use descriptive anchor text (not "click here")
   - Link to related content by topic

3. **Link Distribution**
   - Link to newer content from older
   - Cross-link between pillars where relevant
   - Maintain topical relevance

### Link Text Formula

| ❌ Avoid | ✅ Use |
|---------|-------|
| "click here" | "complete Claude Code setup guide" |
| "this article" | "our guide to prompt engineering" |
| "read more" | "learn about agentic workflows" |

---

## Part 7: Performance Tracking

### Metrics to Monitor

| Metric | Tool | Target |
|--------|------|--------|
| Traditional rankings | Ahrefs/SEMrush | Top 3 for 50+ keywords |
| AI citations | Manual + AI platform checks | 90% citation rate |
| Featured snippets | Google Search Console | 20+ featured snippets |
| Click-through rate | GA4 | 15%+ CTR for ranking posts |
| Time on page | GA4 | 4+ minutes average |

### Monthly Audit Checklist

- [ ] Review top 10 ranking keywords
- [ ] Check AI platform citations for key queries
- [ ] Identify featured snippet opportunities
- [ ] Update outdated statistics
- [ ] Add FAQ sections to underperforming posts
- [ ] Refresh content older than 6 months

---

## Part 8: Content Templates

### Pillar Article Template

```markdown
---
title: "Complete [Topic] Guide: [Benefit] in 2026"
description: "170 characters with primary keyword and promise"
date: "2026-MM-DD"
author: "Frank"
tags: ["topic", "how-to", "beginner"]
category: "[Pillar]"
featured: true
readingGoal: "Master [topic] and achieve [specific outcome]"
seoScore: 0
status: "draft"
---

> **TL;DR**: 50 words. What is this? Why does it matter? What will reader achieve?
> **Time**: X hours | **Level**: Beginner/Intermediate | **Tools**: List

## What Is [Topic] and Why It Matters in 2026
[Hook + context + primary keyword in first 100 words]

## The [Topic] Framework
[Core model with visual description]

## Step-by-Step: How to [Main Action]
1. **Step One** - Action with why
2. **Step Two** - Action with tip
3. **Step Three** - Common mistake to avoid
4. **Step Four** - Pro tip for optimization

## [Common Challenge] Explained
[Practical solution section with examples]

## [Comparison] vs [Alternative]
[When to use each, pros/cons table]

## FAQ
- **Q: Question matching search intent?**
  A: Direct answer, 40-60 words.
- **Q: Second question?**
  A: Direct answer.
- **Q: Third question?**
  A: Direct answer.
- **Q: Fourth question?**
  A: Direct answer.
- **Q: Fifth question?**
  A: Direct answer.

## Your Next Step
[Clear CTA - product or next article]
```

### Quick Win Article Template

```markdown
---
title: "[Actionable Title]: [Specific Result]"
description: "150 chars. Action + result promise"
date: "2026-MM-DD"
author: "Frank"
tags: ["action", "result"]
category: "[Pillar]"
featured: false
readingGoal: "Achieve [specific result] in X time"
seoScore: 0
status: "draft"
---

> **TL;DR**: 40 words. What action? What result? How long?

## [Question-Based H2]
[Direct answer + context]

## [Actionable Step]
[How to do it + example]

## [Common Pitfall]
[What goes wrong + how to avoid]

## FAQ
- **Q: Common question?**
  A: Answer.
- **Q: Second question?**
  A: Answer.

## Try This Today
[One specific action to take immediately]
```

---

## Part 9: AEO Copywriting Guidelines

### Answer-First Writing

**First paragraph must answer the question directly:**

❌ *"Before we discuss Claude Code workspaces, let me share some context about how AI development has evolved..."*

✅ *"Claude Code workspaces are persistent development environments where AI agents can maintain context, run terminal commands, and collaborate on code projects across sessions."*

### Concise Answer Format

| ❌ Wordy | ✅ Concise |
|----------|-----------|
| "In order to get the best results, you should..." | "For best results:" |
| "It is important to note that..." | "Note:" |
| "One of the things that makes this powerful..." | "This is powerful because:" |
| "If you're wondering whether this applies to you..." | "Use this if you:" |

### Citation-Worthy Sentences

Each paragraph should contain one atomic fact that could be cited:

❌ *"Claude Code has many features for building AI applications."*

✅ *"Claude Code workspaces support persistent shell sessions, allowing AI agents to run terminal commands, execute build processes, and maintain file system changes across multiple conversation turns."*

---

## Appendix: Checklist Summary

### Before Publishing Any Content

- [ ] Title has primary keyword
- [ ] Description (150-160 chars) has keyword
- [ ] TL;DR at top (40-60 words)
- [ ] 5+ FAQ questions with answers
- [ ] 80%+ question-based H2s
- [ ] 3+ internal links
- [ ] FAQPage schema
- [ ] Article schema
- [ ] Featured image
- [ ] Reading goal in frontmatter
- [ ] SEO Score ≥ 80

---

*Framework Version: 1.0*  
*Last Updated: January 15, 2026*  
*Next Review: February 1, 2026*
