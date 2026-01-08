# SEO Intelligence Skill

## Overview
Advanced SEO and AI search optimization strategies for content that AI agents (ChatGPT, Perplexity, Claude) discover, extract, and cite.

## AI Search Behavior Patterns

### How AI Agents Search
1. **Query Expansion**: AI agents expand user queries into multiple search variations
2. **Structured Data Priority**: JSON-LD schema is extracted before body content
3. **FAQ Extraction**: Question-answer pairs are primary citation targets
4. **Freshness Signals**: dateModified and lastUpdated affect ranking
5. **Authority Signals**: Consistent topic coverage builds topical authority

### What AI Agents Cite
- Clear, definitive answers in the first 100 words
- FAQ sections with explicit Q&A structure
- Step-by-step tutorials (HowTo schema)
- Definitions and explanations of technical terms
- Unique data, research, or original frameworks

## Citation-Friendly Content Structure

### The AI-First Article Template
```markdown
---
title: "[Primary Keyword]: [Benefit Statement]"
description: "[150 chars with keyword and value prop]"
tldr: "[50-word summary - AI extracts this first]"
date: "YYYY-MM-DD"
lastUpdated: "YYYY-MM-DD"
keywords: ["keyword1", "keyword2", "keyword3"]
faq:
  - q: "What is [topic]?"
    a: "[Direct 1-2 sentence answer]"
  - q: "How do I [action]?"
    a: "[Actionable response]"
schema: ["Article", "FAQPage"]
---

# [H1 with Primary Keyword]

<Callout type="tip">
**TL;DR**: [Repeat the tldr - AI extracts callouts prominently]
</Callout>

## What is [Topic]?
[Definition in first sentence. Expand with context.]

## How to [Action]: Step-by-Step Guide
1. **Step One**: [Clear instruction]
2. **Step Two**: [Clear instruction]
...

## [Question-Based H2 Matching Search Intent]
[Direct answer in first sentence]

## FAQ: [Topic] Questions Answered

### What is [topic]?
[Answer]

### How does [topic] work?
[Answer]

### Why should I use [topic]?
[Answer]

## Conclusion
[Summary with internal link to related pillar content]
```

## Topic Cluster Strategy

### Building Topical Authority
1. **Pillar Content**: Comprehensive guides (3000+ words)
2. **Cluster Content**: Specific subtopics linking to pillar
3. **Internal Linking**: 3+ contextual links per article
4. **Content Freshness**: Update pillar content quarterly

### Example Cluster: Agentic AI
```
Pillar: "What is Agentic AI: Complete 2025 Guide"
├── Cluster: "Agentic AI vs Traditional AI: Key Differences"
├── Cluster: "How to Build Your First AI Agent"
├── Cluster: "Best Agentic AI Tools for Creators"
├── Cluster: "Agentic Workflows: 10 Practical Examples"
└── Cluster: "Enterprise Agentic AI: Governance Framework"
```

## Schema Markup Strategy

### Required Schemas by Content Type
| Content Type | Primary Schema | Secondary Schema |
|--------------|----------------|------------------|
| Blog Post    | Article        | FAQPage          |
| Tutorial     | HowTo          | Article          |
| Course Page  | Course         | FAQPage          |
| Resource Hub | ItemList       | WebPage          |

### Schema Implementation Checklist
- [ ] Article schema with all required fields
- [ ] FAQPage schema for all Q&A sections
- [ ] BreadcrumbList for navigation context
- [ ] Author schema with sameAs links
- [ ] Organization schema on homepage

## AI-First Content Checklist

### Before Publishing
- [ ] TL;DR in callout within first 100 words
- [ ] Primary keyword in H1 and first paragraph
- [ ] Question-based H2s (2-3 minimum)
- [ ] FAQ section with 5+ questions
- [ ] Clear definitions for all technical terms
- [ ] datePublished and lastUpdated in frontmatter
- [ ] 3+ internal links to related content
- [ ] Schema markup specified in frontmatter
- [ ] Meta description under 155 characters with keyword

### Content Quality Gates
- [ ] Answers the primary question in first 2 sentences
- [ ] Provides unique value (data, framework, perspective)
- [ ] Structured for scanning (bullets, numbered lists, tables)
- [ ] No keyword stuffing (1-2% density max)
- [ ] Mobile-optimized formatting

## Daily Intelligence Brief Format

```markdown
# Daily AI Search Intelligence Brief
**Date**: YYYY-MM-DD
**Scout**: SEO Intelligence Scout

## Top Trending Topics
1. [Topic] - [Brief description] - [Opportunity score: 1-10]
2. [Topic] - [Brief description] - [Opportunity score: 1-10]

## Keyword Opportunities
| Keyword | Volume | Difficulty | Current Rank | Action |
|---------|--------|------------|--------------|--------|
| [kw]    | [vol]  | [diff]     | [rank]       | [next] |

## Competitor Moves
- [Competitor] published [content] targeting [keyword]
- [Competitor] updated [old content] with [new angle]

## Content Recommendations
1. **Quick Win**: [Topic that can rank within 30 days]
2. **Strategic**: [Topic for long-term authority building]
3. **Trending**: [Emerging topic to capture early]

## Internal Linking Opportunities
- Link [new article] to [existing article] (context: [reason])
```

## Performance Metrics

### Key Indicators
- **Organic Sessions**: Week-over-week growth
- **AI Citations**: Mentions in ChatGPT/Perplexity responses
- **Featured Snippets**: Position 0 rankings
- **Time on Page**: Content engagement signal
- **Schema Validation**: Error-free structured data

### Monthly Review Cadence
1. Review top 10 performing articles
2. Identify content gaps from search console
3. Update stale content (>6 months old)
4. Audit internal linking structure
5. Analyze competitor new content
