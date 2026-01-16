# Link Content

Create relationships between content pieces in the knowledge graph.

## Parameters
- `<content-1>` - First content piece (file path or ID)
- `<content-2>` - Second content piece (file path or ID)
- `[relationship]` - Optional: Relationship type (default: "related")

## Relationship Types
- `repurposed-to` - Content A was expanded/adapted into Content B
- `repurposed-from` - Content B originated from Content A
- `related` - Content covers similar topics/themes
- `series` - Part of same series/collection
- `prerequisite` - Content A should be read before B
- `follow-up` - Content B continues/deepens Content A

## Usage
```
/link-content blogs/ai-music-intro.md books/year-of-creator/chapter-5.md repurposed-to
/link-content chapter-1.md chapter-2.md series
/link-content module-1 module-2 prerequisite
```

## What This Does

Updates the knowledge graph with content relationships:

1. **Identify Content**: Locate both pieces in the graph
2. **Validate Relationship**: Ensure relationship type makes sense
3. **Create Edge**: Add bidirectional link in graph
4. **Update Metadata**: Add cross-references to content files
5. **Suggest Related Links**: Find other potential connections

## Output

### Relationship Created

```
Content A: Blog Post - "AI Music Production for Non-Musicians"
Content B: Book Chapter 5 - "The Music Revolution Nobody Expected"

Relationship: A [repurposed-to] B
Direction: Bidirectional (A→B and B←A)

Added to knowledge graph: ✓
Cross-references updated: ✓
```

### Content Metadata Updated

**In blog post footer:**
```markdown
---
**Expanded in**: [Chapter 5: The Music Revolution Nobody Expected](../../books/year-of-creator/chapter-5.md)
**Related**: [Course: AI Music Academy Module 1](../../courses/ai-music-academy/module-1/)
---
```

**In book chapter header:**
```markdown
---
**Originally published as**: [Blog: AI Music Production for Non-Musicians](../../blogs/creative-innovation/ai-music-intro.md)
**Course adaptation**: [AI Music Academy Module 5](../../courses/ai-music-academy/module-5/)
---
```

### Suggested Additional Links

Based on themes and topics, you might also want to link:
1. [Content C] - Shares "creator-economy" theme
2. [Content D] - Similar "democratization" concept
3. [Content E] - Complementary "AI tools" topic

## Benefits of Linking

### For Content Strategy
- See which ideas span multiple formats
- Identify content clusters and themes
- Track content lineage and evolution

### For Readers
- Discover related content
- Follow learning paths
- See topic progressions

### For SEO
- Internal linking strategy
- Topical authority building
- Content clustering

### For Repurposing
- Find high-value content to expand
- Identify gaps in coverage
- Plan content series

## Knowledge Graph Visualization

Your content relationships will look like:

```
Blog: AI Music Intro
  ├─[repurposed-to]─→ Chapter 5: Music Revolution
  ├─[related]────────→ Blog: Suno AI Guide
  └─[series]─────────→ Blog: AI Music Part 2

Chapter 5: Music Revolution
  ├─[repurposed-from]─→ Blog: AI Music Intro
  ├─[repurposed-to]───→ Course Module 5
  └─[related]─────────→ Chapter 4: AI Creative Suite

Course Module 5: Music Production
  ├─[repurposed-from]─→ Chapter 5
  ├─[prerequisite]────→ Module 4 (must complete first)
  └─[follow-up]───────→ Module 6 (continues learning)
```

## What Happens Next

Relationships saved to:
`content-universe/_universe/knowledge-graph.json`

And you can:
1. View full graph with `/theme-map`
2. Find related content when creating
3. Build series and learning paths
4. Generate "you might also like" sections

---

**Time estimate**: 1-2 minutes to create relationship and update metadata.
