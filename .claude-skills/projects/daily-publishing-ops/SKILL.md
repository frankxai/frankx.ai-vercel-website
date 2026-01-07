# Daily Publishing Operations Skill

## Overview
Systematic daily workflow for transforming FrankX.AI into a media publishing powerhouse with AI-first content production.

## Daily Operations Cadence

### Morning Block (6:30 - 9:30 AM ET)

#### 6:30 - 7:30 AM: Signal Scan
**Agent**: SEO Intelligence Scout

```bash
# Run the AI trend scanner
npm run ai:scan
```

**Activities**:
- Scan AI news RSS feeds (The Rundown AI, TLDR AI, etc.)
- Check Google Trends for AI-related spikes
- Review competitor new content (last 24 hours)
- Analyze search console for new query opportunities
- Generate daily intelligence brief

**Output**: `data/intelligence/brief-YYYY-MM-DD.json`

#### 7:30 - 9:30 AM: Content Planning
**Agent**: Content Synthesis Engine

**Activities**:
- Review intelligence brief
- Identify top 3 content opportunities
- Draft article outline for today's piece
- Update content calendar
- Prepare FAQ section and schema strategy

**Output**: Structured outline in `content/drafts/`

### Studio Block (9:30 AM - 12:30 PM ET)

#### 9:30 - 12:30 PM: Content Production
**Agent**: Creation Engine

**Activities**:
- Write primary article (targeting 1500-2500 words)
- Apply AI-first template structure
- Generate TL;DR and FAQ sections
- Add internal links (3+ minimum)
- Create or source header image

**Output**: Complete MDX file in `content/blog/`

### Activation Block (1:30 - 3:30 PM ET)

#### 1:30 - 2:30 PM: Pre-Publish QA
**Agent**: Content Synthesis Engine

```bash
# Validate content before publishing
npm run content:validate
```

**Checklist**:
- [ ] Frontmatter complete (title, description, date, author)
- [ ] AI-first fields present (tldr, faq, keywords)
- [ ] Schema specified
- [ ] FAQ section has 5+ questions
- [ ] Internal links present
- [ ] Meta description under 155 chars

#### 2:30 - 3:30 PM: Publishing & Distribution
**Agent**: Creation Engine

**Activities**:
- Final review and publish
- Generate schema files
- Update sitemap and RSS
- Queue social media posts
- Send to email subscribers (if newsletter day)

```bash
# Generate schema from content
npm run schema:generate

# Deploy to Vercel
git add . && git commit -m "Publish: [Article Title]" && git push
```

### Debrief Block (4:00 - 5:00 PM ET)

#### 4:00 - 5:00 PM: Performance Review
**Agent**: Soul Strategist

**Activities**:
- Review yesterday's content performance
- Document what's working/not working
- Identify optimization opportunities
- Update topic cluster progress
- Plan tomorrow's priority content

**Output**: Notes in `docs/daily-logs/YYYY-MM-DD.md`

## Weekly Anchors

| Day | Content Type | Primary Agent | Output |
|-----|--------------|---------------|--------|
| Monday | Intelligence Briefing | SEO Scout + Synthesis | Article + FAQ |
| Tuesday | Technical Tutorial | Technical Translator | HowTo + FAQ |
| Wednesday | Deep Dive Guide | Creation Engine | Long-form + FAQ |
| Thursday | Tool/Resource Review | Technical Translator | Article + FAQ |
| Friday | Creator Dispatch | Creation Engine | Community + FAQ |

### Weekly Planning (Sunday Evening)
- Review week's performance metrics
- Identify top 5 content priorities
- Map internal linking opportunities
- Update topic cluster progress
- Set weekly publishing goals

## Monthly Operations

### Week 1: Topic Cluster Expansion
- Publish 1 new pillar piece
- Add 3+ cluster articles
- Update existing pillar with new links

### Week 2: Content Refresh
- Update top 5 articles with fresh data
- Add FAQ sections to older content
- Improve internal linking

### Week 3: Experimentation
- Test new content formats
- Try new keywords/topics
- A/B test headlines

### Week 4: Analysis & Planning
- Full performance review
- Update content roadmap
- Competitor analysis
- Set next month's goals

## Automation Scripts

### ai-trend-scanner.mjs
```javascript
// Scans AI news sources and generates intelligence brief
// Output: data/intelligence/brief-YYYY-MM-DD.json

const sources = [
  { name: 'The Rundown AI', rss: '...' },
  { name: 'TLDR AI', rss: '...' },
  { name: 'AI News', rss: '...' },
]

const keywords = [
  'agentic ai', 'claude', 'chatgpt', 'mcp',
  'ai agents', 'prompt engineering', 'suno ai'
]
```

### content-publisher.mjs
```javascript
// Pre-publish validation gate
// Checks: frontmatter, AI-first fields, FAQ presence, links

const requiredFields = ['title', 'description', 'date', 'author']
const aiFirstFields = ['tldr', 'faq', 'keywords', 'schema']
const minFAQCount = 5
const minInternalLinks = 3
```

### generate-schema.mjs
```javascript
// Extracts FAQ from MDX and generates JSON-LD
// Output: data/schemas/[slug]-schema.json

// 1. Parse MDX frontmatter for FAQ array
// 2. Extract FAQ section from body
// 3. Merge and dedupe
// 4. Generate FAQPage + Article schema
// 5. Validate schema structure
```

## NPM Scripts

```json
{
  "scripts": {
    "ai:scan": "node scripts/ai-trend-scanner.mjs",
    "content:validate": "node scripts/content-publisher.mjs",
    "schema:generate": "node scripts/generate-schema.mjs",
    "morning:ops": "npm run ai:scan && npm run roadmap:check",
    "publish:validate": "npm run content:validate && npm run schema:generate",
    "daily:report": "node scripts/daily-report.mjs"
  }
}
```

## Performance Metrics Dashboard

### Daily Tracking
- Articles published: [count]
- Words written: [count]
- FAQ questions added: [count]
- Internal links created: [count]

### Weekly Tracking
- Organic sessions: [count] vs last week
- New keyword rankings: [count]
- Featured snippets won: [count]
- AI citations detected: [count]

### Monthly Tracking
- Total articles: [count]
- Topic clusters completed: [count]
- Pillar articles published: [count]
- Authority score trend: [direction]

## Emergency Protocols

### Content Emergency
If no content ready by noon:
1. Pull from evergreen drafts folder
2. Update existing high-performing article
3. Create roundup from recent content

### Technical Emergency
If site issues prevent publishing:
1. Document content in notion backup
2. Prepare for batch publish when resolved
3. Notify audience of temporary delay

## Integration with CLAUDE.md Agents

### Agent Handoffs

```
Morning Signal Scan
    └── SEO Intelligence Scout generates brief
        └── Content Synthesis Engine creates outline
            └── Creation Engine writes content
                └── Soul Strategist reviews impact

Publishing Flow
    └── Content Synthesis Engine validates
        └── Creation Engine publishes
            └── Soul Strategist tracks performance
```

### Activation Sequences

**Full Day Ops**:
"Activate daily publishing operations with full signal scan, content production, and publishing workflow."

**Quick Content**:
"Skip signal scan, proceed directly to content production using yesterday's brief."

**Analysis Only**:
"Run performance analysis and optimization recommendations without new content production."
