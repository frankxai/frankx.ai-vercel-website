# Research

Gather comprehensive research, case studies, and sources for a topic.

## Parameters
- `<topic>` - Research topic
- `[depth]` - Optional: "quick" | "standard" | "deep" (default: standard)

## Usage
```
/research "Suno AI music production adoption rates"
/research "Creator economy statistics 2025" deep
```

## What This Does

Activates the **Truth Weaver** agent to conduct thorough research:

1. **Find Case Studies**: 5-10 verified examples with specific details
2. **Gather Statistics**: Key data from credible sources (with citations)
3. **Identify Expert Quotes**: Real quotes or mark what interviews are needed
4. **Explore Contradictions**: Balanced perspectives and counterarguments
5. **Compile Recent Trends**: Latest developments (last 2 years preferred)
6. **Flag Research Gaps**: What requires human verification/interviews

## Output

You'll receive a comprehensive research brief:

### Verified Statistics
- [Statistic] - Source: [Link/Citation] - Date: [YYYY-MM]
- Marked as [VERIFIED] for ready-to-use data

### Case Studies
1. **[Name/Company]** - [Brief summary]
   - Outcome: [Specific result]
   - Source: [Verification link]
   - Status: [VERIFIED / NEEDS RESEARCH]

### Expert Perspectives
- **[Expert Name, Title]**: "[Quote or perspective]"
  - Source: [Interview date / publication]
  - Status: [VERIFIED / NEEDS HUMAN INTERVIEW]

### Contradictions/Challenges
- Counterarguments to consider
- Conflicting data points
- Nuances to address

### Research Gaps
**Needs Human Research:**
- [ ] [Specific item requiring real interview/investigation]
- [ ] [Data point that needs verification]

**Suggested Follow-up:**
- Interview with [expert type]
- Survey of [audience type]
- Analysis of [data source]

## Research Depth Levels

### Quick (5-10 minutes)
- 3-5 verified statistics
- 2-3 case study summaries
- Key expert perspectives
- Basic source list

### Standard (15-20 minutes) - Default
- 5-7 verified statistics
- 5-7 detailed case studies
- Multiple expert quotes
- Balanced perspectives
- Comprehensive source list
- Research gap identification

### Deep (30-45 minutes)
- 10+ verified statistics with historical context
- 10+ detailed case studies across categories
- Expert interviews needed (identified)
- Longitudinal trend analysis
- Contradictions deeply explored
- Comprehensive research roadmap

## Quality Standards

- **Minimum 2 sources** per major claim
- **Specific attributions** (no "experts say")
- **Recent data** preferred (last 2 years for tech/AI)
- **Verification status** clearly marked
- **Source credibility** assessed
- **Bias awareness** maintained

## What Happens Next

Research will be saved to:
`content-universe/_universe/case-studies/<topic-slug>.md`

And you can:
1. Use in blog posts, chapters, courses
2. Add to shared research library
3. Follow up on identified gaps
4. Update knowledge graph with sources

---

**Time estimate**: 5-45 minutes depending on depth level.
