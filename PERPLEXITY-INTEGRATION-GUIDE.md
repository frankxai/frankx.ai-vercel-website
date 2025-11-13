# Perplexity Pages Integration Guide
**How to populate the Research Library with your Perplexity Pages and other content**

---

## Quick Start (5 Minutes)

1. Open `/lib/research.ts`
2. Add your Perplexity Page to the `researchPages` array
3. Commit and deploy - it appears automatically!

---

## Step-by-Step Tutorial

### Step 1: Create a Perplexity Page

1. Go to [Perplexity.ai](https://www.perplexity.ai)
2. Research your topic thoroughly
3. Click **"Create Page"** to generate a shareable Perplexity Page
4. Copy the public URL (e.g., `https://www.perplexity.ai/page/your-research-topic-abc123`)

**Pro Tip**: Perplexity Pages are perfect for:
- Deep research summaries (10+ sources synthesized)
- Technical guides with references
- Comparative analyses
- State-of-the-art reviews

---

### Step 2: Add to Research Library

**File**: `/lib/research.ts`

**Template**:
```typescript
{
  id: 'unique-slug-here',
  title: 'Your Research Title',
  description: 'Brief one-sentence description (100-150 chars)',
  url: 'https://www.perplexity.ai/page/your-actual-url',
  type: 'perplexity', // or 'pdf' or 'internal'
  category: 'agentic-ai', // See categories below
  tags: ['tag1', 'tag2', 'tag3', 'tag4'],
  dateAdded: '2025-01-13',
  researchHours: 12, // Estimate your research time
  summary: '200-word summary describing key findings, methodology, and value. This appears on the card preview and helps users decide if they want to read the full page.'
}
```

---

### Step 3: Choose the Right Category

**Available Categories**:

| Category ID | Display Name | Best For |
|-------------|--------------|----------|
| `agentic-ai` | Agentic AI Systems | Multi-agent systems, orchestration, LangGraph, AutoGen, production patterns |
| `generative-ai` | Generative AI | LLMs, prompt engineering, fine-tuning, RAG, embeddings |
| `ai-music` | AI Music Production | Suno AI, music generation, composition techniques, audio ML |
| `creative-systems` | Creative Systems | Workflows, tools, methodologies, creative automation |

**How to Decide**:
- **Agentic AI**: Does it involve autonomous agents or multi-step reasoning?
- **Generative AI**: Is it about LLMs, text/image generation, or prompt engineering?
- **AI Music**: Music production, sound design, or audio ML?
- **Creative Systems**: Workflows, tools, or creative processes?

---

### Step 4: Write an Effective Summary

**Formula**:
```
[Hook: Why this matters] + [What you researched] + [Key findings/insights] + [Who benefits]
```

**Example - Good Summary**:
```
Production-grade LangGraph deployments require careful attention to state management, persistent checkpointing, and horizontal scaling patterns. This research analyzes 50+ enterprise implementations to identify five critical architecture decisions that determine system reliability. Covers Redis-based state persistence, error recovery strategies, observability integration, and cost optimization techniques. Essential reading for AI engineers moving from prototype to production with complex agentic workflows.
```

**Example - Bad Summary**:
```
This is about LangGraph and how to use it in production.
```

**Why the difference?**:
- ✅ Good: Specific numbers (50+ implementations, 5 decisions)
- ✅ Good: Clear value proposition (prototype → production)
- ✅ Good: Technical specifics (Redis, error recovery, observability)
- ✅ Good: Target audience (AI engineers)
- ❌ Bad: Vague and generic

---

### Step 5: Estimate Research Hours

**Guidelines**:
- **Quick synthesis**: 2-4 hours (scanning 5-10 sources)
- **Standard research**: 5-10 hours (deep reading, testing concepts)
- **Comprehensive analysis**: 10-20 hours (multiple experiments, code testing)
- **Deep investigation**: 20+ hours (weeks of exploration, production validation)

**Be Honest**: These hours build your authority. "47+ hours of research" is more credible than "10,000 hours" (which feels inflated).

---

## Real-World Examples

### Example 1: LangGraph Production Guide

```typescript
{
  id: 'langgraph-production-deployment',
  title: 'LangGraph Production Deployment Patterns',
  description: 'Complete guide to deploying LangGraph agents in production with monitoring, scaling, and error handling',
  url: 'https://www.perplexity.ai/page/langgraph-production-xyz',
  type: 'perplexity',
  category: 'agentic-ai',
  tags: ['langgraph', 'production', 'deployment', 'monitoring', 'scaling'],
  dateAdded: '2025-01-13',
  researchHours: 15,
  summary: 'Moving LangGraph from prototype to production requires architectural decisions that standard tutorials skip. This research synthesizes learnings from 30+ enterprise deployments, covering state management with Redis, persistent checkpointing strategies, horizontal scaling patterns, comprehensive error handling, and observability integration with DataDog/New Relic. Includes real-world performance benchmarks: 500+ concurrent agents, sub-200ms response times, 99.9% uptime. Critical for teams scaling beyond proof-of-concept into production workloads.'
}
```

### Example 2: Suno Advanced Techniques

```typescript
{
  id: 'suno-v4-advanced-composition',
  title: 'Suno v4/v4.5 Advanced Composition Techniques',
  description: 'Professional music production with Suno AI: prompt engineering, style transfer, and iterative refinement',
  url: 'https://www.perplexity.ai/page/suno-advanced-xyz',
  type: 'perplexity',
  category: 'ai-music',
  tags: ['suno', 'music-production', 'prompts', 'composition', 'techniques'],
  dateAdded: '2025-01-13',
  researchHours: 22,
  summary: 'After generating 500+ tracks with Suno v4/v4.5, clear patterns emerge for professional-quality output. This guide covers advanced prompt structures (genre blending, vocal direction, instrumental layering), style transfer techniques for cross-genre fusion, and iterative refinement workflows for achieving specific sonic characteristics. Includes 50+ proven prompt templates, analysis of what makes prompts succeed or fail, and production tips for commercial-ready tracks. Based on hands-on experimentation and pattern recognition across hundreds of generations.'
}
```

### Example 3: Internal Deep-Dive (Not Perplexity)

```typescript
{
  id: 'oracle-adk-production-guide',
  title: 'Oracle Agent Development Kit: Production Patterns',
  description: 'Enterprise agentic applications on OCI with multi-agent orchestration and function tools',
  url: '/research/oracle-adk-guide', // Internal page
  type: 'internal',
  category: 'agentic-ai',
  tags: ['oracle', 'adk', 'oci', 'enterprise', 'agents'],
  dateAdded: '2025-01-13',
  researchHours: 25,
  summary: 'Oracle Agent Development Kit enables production agentic apps on OCI with enterprise-grade features: multi-agent orchestration, function tools, streaming responses, and OCI service integration. This guide documents real-world implementations from three Fortune 500 deployments, covering agent design patterns, error handling strategies, cost optimization (60% reduction vs alternatives), and integration with Oracle Database 23ai vector search. Includes production checklist, monitoring setup, and disaster recovery patterns specific to OCI infrastructure.'
}
```

### Example 4: PDF Download

```typescript
{
  id: 'prompt-engineering-playbook-2025',
  title: 'Prompt Engineering Playbook 2025',
  description: '50-page guide with 200+ tested prompts for Claude, GPT-4, and Gemini',
  url: '/downloads/prompt-engineering-playbook-2025.pdf', // PDF file
  type: 'pdf',
  category: 'generative-ai',
  tags: ['prompts', 'engineering', 'claude', 'gpt4', 'gemini', 'guide'],
  dateAdded: '2025-01-13',
  researchHours: 30,
  summary: 'Comprehensive 50-page playbook distilling 12 months of prompt engineering experiments with Claude Sonnet 4.5, GPT-4 Turbo, and Gemini Pro. Contains 200+ battle-tested prompts organized by use case: code generation, technical writing, creative ideation, data analysis, and system design. Each prompt includes variations, expected outputs, and troubleshooting tips. Based on 10,000+ API calls and production deployments across 15 client projects. Immediately actionable templates that save hours of trial-and-error.'
}
```

---

## Advanced Features

### Linking Research to Blog Posts

The content graph system automatically links research pages to blog posts with shared tags.

**To maximize internal linking**:
1. Use consistent tags across blog posts and research
2. Tag research pages with specific technologies (e.g., `langgraph`, not just `ai`)
3. Add 4-6 tags per research page for better matching

**Example**:
- Blog post tags: `['langgraph', 'agents', 'production']`
- Research page tags: `['langgraph', 'production', 'deployment']`
- **Result**: Auto-linked with "Shared Tags" badge

---

### Topic Clusters

Research pages automatically participate in topic clusters.

**File**: `/lib/content-graph.ts` (lines 28-48)

**Add research to clusters**:
```typescript
'agentic-ai': {
  pillar: 'what-is-agentic-ai', // Blog post slug
  cluster: [
    'langgraph-production-guide', // Blog post
    'langgraph-production-deployment', // Research page ID!
    'multi-agent-systems'
  ]
}
```

**Effect**: Research page gets +40 relevance score when linked to cluster content

---

### Display Customization

**Research Library Page**: `/app/library/research/page.tsx`

**Customize per category**:
- Edit `RESEARCH_CATEGORIES` in `/lib/types/research.ts` (lines 22-45)
- Change category names, descriptions, or icons
- Icons available: `Bot`, `Sparkles`, `Music`, `Lightbulb`, `FileText`, etc.

**Example customization**:
```typescript
'agentic-ai': {
  id: 'agentic-ai',
  name: 'Agentic AI & Automation', // Changed name
  description: 'Your custom description here',
  icon: 'Bot', // Options: Bot, Sparkles, Music, Lightbulb, FileText
  pages: [] // Auto-populated
}
```

---

## Maintenance & Updates

### Updating Research Hours

As you add more research pages, the total is calculated automatically:

**Function**: `getTotalResearchHours()` in `/lib/research.ts`

It sums all `researchHours` values and displays prominently on `/library/research`.

### Archiving Old Research

To remove outdated research:
1. Open `/lib/research.ts`
2. Delete or comment out the entry
3. Commit and deploy

**Alternative**: Add `archived: true` field and filter in UI:
```typescript
export function getAllResearchPages(): ResearchPage[] {
  return researchPages
    .filter(page => !page.archived) // Add this line
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
}
```

---

## SEO & Marketing Tips

### 1. Research Hours Positioning

**Current strategy**: "47+ hours of research"

**Why it works**:
- Builds authority ("I've done the work")
- Differentiates from AI-generated content farms
- Shows commitment and expertise

**How to leverage**:
- Mention in social posts: "Just published 22 hours of Suno research"
- Use in email newsletters: "This week's 15-hour deep-dive..."
- Add to About page: "500+ hours of documented research"

### 2. Perplexity Page Benefits

**For you**:
- Comprehensive, citable research
- Shows your process (transparency = trust)
- Easy to share on social media

**For readers**:
- See your sources and methodology
- Can explore references themselves
- Higher trust than unsourced blog posts

### 3. Content Types Differentiation

**Strategy**:
- **Blog Posts**: Personal voice, experiments, tutorials
- **Research Pages**: Objective analysis, synthesized findings
- **PDFs**: Comprehensive guides, actionable templates

**Content marketing flow**:
```
1. Create Perplexity Page (research)
2. Write blog post (personal take + tutorial)
3. Link blog → research
4. Create PDF guide (monetization path)
```

---

## Troubleshooting

### Q: My research page doesn't appear

**Check**:
1. File saved: `/lib/research.ts`
2. Valid JavaScript syntax (check commas, quotes)
3. `id` is unique (no duplicates)
4. Deployed to Vercel (git push triggers rebuild)

**Test locally**:
```bash
npm run dev
# Visit http://localhost:3000/library/research
```

### Q: Hash links don't work

**Example**: `/library/research#agentic-ai` doesn't scroll

**Solution**: Research page uses category sections, not individual anchors. Each card has its category.

**Alternative**: Link directly: `/library/research` (shows all)

### Q: Related content not showing research pages

**Check**:
1. Research page has tags
2. Blog post has tags
3. At least 1 shared tag
4. Build completed (ISR revalidation may take up to 1 hour)

**Force refresh**:
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Q: Images not showing on research cards

**Research pages don't have images by default**. To add:

1. Add `thumbnail` field:
```typescript
{
  id: 'my-research',
  // ... other fields
  thumbnail: '/images/research/my-research-cover.jpg'
}
```

2. Update `ResearchPage` type in `/lib/types/research.ts`:
```typescript
export interface ResearchPage {
  // ... existing fields
  thumbnail?: string // Add this line
}
```

3. Update research card component to display thumbnails

---

## Best Practices Summary

### ✅ DO:
- Write detailed 200-word summaries
- Be specific with tags (4-6 per page)
- Estimate research hours honestly
- Link Perplexity Pages for credibility
- Update regularly (weekly/monthly additions)
- Use consistent category assignment

### ❌ DON'T:
- Copy-paste AI-generated summaries
- Use vague tags like "ai" or "tech"
- Inflate research hours unrealistically
- Leave fields empty (always fill description, summary, tags)
- Archive everything (curate your best work)

---

## Next Steps

1. **Create your first Perplexity Page** on a topic you're researching
2. **Add it to** `/lib/research.ts` using the template above
3. **Commit and push** to GitHub (Vercel auto-deploys)
4. **Share on social media**: "Just published X hours of research on Y"
5. **Link from blog posts** to build internal linking

---

## Resources

- **Perplexity AI**: https://www.perplexity.ai
- **Research Library (Live)**: https://frankx.ai/library/research
- **Content Graph Docs**: See `V5-CONTENT-SYSTEM-SUMMARY.md`
- **Internal Linking**: See `lib/content-graph.ts`

---

**Questions?** Check `/lib/research.ts` for working examples or review existing research pages on your live site.

**Ready to build your research library?** Start with just one Perplexity Page and build from there. Consistency beats perfection.
