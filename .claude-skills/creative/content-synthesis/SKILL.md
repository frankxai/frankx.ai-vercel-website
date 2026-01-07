# Content Synthesis Skill

## Overview
Transform research signals, trends, and intelligence into structured, AI-optimized content that ranks and gets cited.

## The Synthesis Process

### Signal → Pattern → Framework → Voice → Schema

```
1. SIGNAL CAPTURE
   └── News, trends, search data, competitor content

2. PATTERN RECOGNITION
   └── What questions are being asked?
   └── What gaps exist in current content?
   └── What unique angle can we provide?

3. FRAMEWORK DEVELOPMENT
   └── Structure the narrative arc
   └── Map the transformation journey
   └── Design the FAQ section

4. VOICE APPLICATION
   └── Apply FrankX brand voice
   └── Inject musician-technologist perspective
   └── Balance technical depth with accessibility

5. SCHEMA OPTIMIZATION
   └── Select appropriate schemas
   └── Generate TL;DR summary
   └── Structure for AI extraction
```

## AI-First Article Template

### Frontmatter Structure
```yaml
---
title: "[Keyword]: [Benefit or Question Answered]"
description: "[155 chars max with primary keyword and value prop]"
date: "YYYY-MM-DD"
lastUpdated: "YYYY-MM-DD"
author: "Frank Villanueva"
category: "[agentic-ai | music-production | creator-tools | tutorials]"
tags: ["tag1", "tag2", "tag3"]
image: "/images/blog/[slug].svg"

# AI-First Fields
tldr: "[50-word summary that directly answers the main question]"
faq:
  - q: "What is [topic]?"
    a: "[Direct answer in 1-2 sentences]"
  - q: "How do I [action]?"
    a: "[Actionable answer]"
  - q: "Why is [topic] important?"
    a: "[Value-focused answer]"
  - q: "What are the benefits of [topic]?"
    a: "[List key benefits]"
  - q: "How does [topic] compare to [alternative]?"
    a: "[Comparison answer]"
schema: ["Article", "FAQPage"]
keywords: ["primary keyword", "secondary keyword", "long-tail keyword"]
---
```

### Body Structure
```markdown
# [H1 with Primary Keyword]

<Callout type="tip">
**TL;DR**: [Exact copy of tldr field - AI prioritizes callouts]
</Callout>

[Opening hook - 1-2 sentences that capture attention]

[Definition or explanation - directly answer "what is X?" in the first paragraph]

## What is [Topic]?

[Comprehensive definition with context. Include the primary keyword naturally.]

## Why [Topic] Matters for [Audience]

[Connect to reader's needs. Show the transformation possible.]

## How to [Action] with [Topic]: Step-by-Step

1. **Step One: [Action Verb]**
   [Explanation with specific details]

2. **Step Two: [Action Verb]**
   [Explanation with specific details]

3. **Step Three: [Action Verb]**
   [Explanation with specific details]

## [Topic] Best Practices

- **Practice 1**: [Explanation]
- **Practice 2**: [Explanation]
- **Practice 3**: [Explanation]

## Common [Topic] Mistakes to Avoid

1. [Mistake] - [Why it's a problem] - [Solution]
2. [Mistake] - [Why it's a problem] - [Solution]

## FAQ: [Topic] Questions Answered

### What is [topic]?
[Answer - can be more detailed than frontmatter version]

### How do I get started with [topic]?
[Actionable steps]

### What tools do I need for [topic]?
[Tool recommendations with links]

### How long does it take to [achieve outcome]?
[Realistic timeline]

### What are common mistakes with [topic]?
[Summary of mistakes section]

## Conclusion

[Summary of key points]

[Internal link to related pillar content]

[Call to action - newsletter, product, or next article]
```

## TL;DR Writing Guidelines

### The 50-Word Rule
Every TL;DR must:
- Be exactly 40-60 words
- Start with a direct answer to the title question
- Include 1-2 key benefits
- End with a hint at the method or solution

### TL;DR Examples

**Bad**: "This article covers agentic AI and why it matters."

**Good**: "Agentic AI systems autonomously plan and execute complex tasks without human oversight. Unlike chatbots that wait for prompts, agentic AI proactively solves problems. This guide shows you how to build your first agent using Claude's SDK in under 30 minutes."

## FAQ Generation Process

### Step 1: Question Mining
Source questions from:
- Google "People Also Ask" boxes
- Reddit/forum discussions
- Search console query reports
- Competitor FAQ sections
- Common support tickets

### Step 2: Answer Optimization
Each answer should:
- Start with a direct response (no "Well..." or "It depends...")
- Be 2-4 sentences maximum
- Include a specific example when possible
- Link to detailed sections for more info

### Step 3: Schema Alignment
Ensure FAQ frontmatter matches FAQ section:
```yaml
faq:
  - q: "What is agentic AI?"
    a: "Agentic AI refers to AI systems that can autonomously plan, reason, and execute multi-step tasks. Unlike traditional chatbots, agentic AI takes initiative and completes complex workflows independently."
```

## Intelligence Briefing Template

When synthesizing daily intelligence into content:

```markdown
# Intelligence Brief: [Topic]
**Date**: YYYY-MM-DD
**Source Signals**: [List 3-5 sources analyzed]

## Signal Summary
[What are people/AI searching for?]

## Pattern Analysis
[What gaps exist? What's being asked that isn't being answered well?]

## Content Opportunity
**Title**: [Proposed article title]
**Primary Keyword**: [Target keyword]
**Search Intent**: [Informational | Transactional | Navigational]
**Difficulty**: [Low | Medium | High]
**Unique Angle**: [What makes our take different?]

## Proposed Outline
1. [Section 1]
2. [Section 2]
3. [Section 3]
4. FAQ Section

## Schema Recommendation
- Primary: [Article | HowTo | Guide]
- Secondary: [FAQPage]

## Internal Linking Strategy
- Link TO: [Existing pillar content]
- Link FROM: [Update these existing articles to link to new content]
```

## Content-to-Schema Conversion

### Extracting Schema from Content
```typescript
// Example: Extracting FAQ schema from MDX content
function extractFAQSchema(content: string): FAQSchema {
  const faqSection = content.match(/## FAQ.*?(?=##|$)/s)
  const questions = faqSection.match(/### (.+?)\n(.+?)(?=###|$)/gs)

  return {
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: extractQuestion(q),
      acceptedAnswer: {
        '@type': 'Answer',
        text: extractAnswer(q)
      }
    }))
  }
}
```

## Voice Guidelines

### The FrankX Voice
- **Technical Authority**: Oracle-level expertise made accessible
- **Creative Warmth**: Musician's intuition in explaining concepts
- **Practical Focus**: Always actionable, never just theoretical
- **Authentic Vulnerability**: Share the learning journey, not just wins

### Voice Examples

**Too Corporate**: "Implementing agentic AI solutions requires careful consideration of enterprise governance frameworks."

**Too Casual**: "AI agents are like super cool robot helpers that do stuff for you!"

**FrankX Voice**: "I spent two years at Oracle helping enterprises adopt AI before realizing the same technology could help independent creators work smarter. Here's how to build an AI agent that handles your repetitive tasks while you focus on what matters—creating."

## Quality Checklist

### Before Synthesis
- [ ] Gathered 3+ source signals
- [ ] Identified unique angle
- [ ] Defined target keyword and intent
- [ ] Mapped internal linking opportunities

### During Synthesis
- [ ] TL;DR written (50 words)
- [ ] FAQ section with 5+ questions
- [ ] Question-based H2s
- [ ] Clear definitions for technical terms
- [ ] FrankX voice applied throughout

### After Synthesis
- [ ] Schema frontmatter complete
- [ ] Internal links added (3+ minimum)
- [ ] Meta description optimized
- [ ] Image/visual elements planned
- [ ] CTA included in conclusion
