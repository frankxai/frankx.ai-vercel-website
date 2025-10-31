# Add Case Study

Add a verified case study to the shared research library.

## Parameters
- `<topic>` - Topic/category for the case study
- `<name>` - Person or company name
- `[details]` - Optional: Inline details or will prompt

## Usage
```
/add-case-study "ai-music-production" "Sarah Chen"
/add-case-study "creator-economy" "TechCrafter Studios" "Bootstrap to $500K ARR in 18 months using AI tools"
```

## What This Does

Creates a verified case study entry in the shared library:

1. **Prompt for Details** (if not provided):
   - Background (who/what)
   - Challenge (problem faced)
   - Solution (what they did)
   - Outcome (results achieved)
   - Source (verification)
2. **Verify Information**: Truth Weaver checks credibility
3. **Add to Library**: Saves to shared case study repository
4. **Tag by Topics**: Makes searchable across content
5. **Update Knowledge Graph**: Tracks usage across content

## Output

A complete case study entry:

```markdown
## Case Study: [Name/Company]

**Topic**: [Topic/Category]
**Date**: [When this happened or was documented]
**Verification**: [Source link or note]

### Background
[Who they are, starting point, context]

### Challenge
[The specific problem or goal they had]

### Solution
[What they did - specific actions, tools, strategies]

### Outcome
[Measurable results - numbers, timeframes, achievements]

### Key Quotes
"[Any notable quotes from subject]"

### Lessons
- [Key takeaway 1]
- [Key takeaway 2]
- [Key takeaway 3]

### Verification Status
[VERIFIED / PARTIAL / NEEDS FOLLOW-UP]

### Source
[Link, interview date, publication, etc.]

### Tags
[ai-music, creator-economy, bootstrapping, etc.]

### Usable In
- [ ] Blog posts about [topic]
- [ ] Book chapters on [theme]
- [ ] Course modules for [lesson]
- [ ] Social content (inspirational stories)
```

## Case Study Template

If you don't provide details, you'll be prompted:

1. **Who**: Person/company name and brief description
2. **When**: Timeframe of the story
3. **Starting Point**: Where they began (contrast with outcome)
4. **Challenge**: Specific problem they faced
5. **What They Did**: Actions, tools, strategies (step by step)
6. **Results**: Specific, measurable outcomes
7. **Time to Result**: How long it took
8. **Quote** (optional): Their words about the experience
9. **Source**: How you verified this (link, interview, publication)
10. **Tags**: Topics this relates to

## Quality Standards

Every case study must have:
- **Specific Details**: Names, numbers, dates (not generic)
- **Measurable Outcomes**: Concrete results, not vague "success"
- **Verification**: Source that can be checked
- **Realistic**: Believable, not too-good-to-be-true
- **Relevant**: Useful for FrankX content themes

## What Happens Next

Case study saved to:
`content-universe/_universe/case-studies/<category>/<name-slug>.md`

And indexed in:
`content-universe/_universe/case-study-index.json`

You can then:
1. Search case studies by topic when creating content
2. Reference in blogs, chapters, courses
3. Track which content uses this case study
4. Update as more info becomes available

**Auto-suggest when**: Creating content on related topics

---

**Time estimate**: 5-10 minutes for complete case study entry.
