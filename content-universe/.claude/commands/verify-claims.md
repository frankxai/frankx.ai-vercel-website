# Verify Claims

Fact-check content and verify all claims with sources.

## Parameters
- `<content-file>` - Path to content file (relative to content-universe/)

## Usage
```
/verify-claims blogs/conscious-ai/ai-ethics-post.md
/verify-claims books/year-of-creator/chapter-5.md
```

## What This Does

Activates **Truth Weaver** to thoroughly fact-check content:

1. **Identify Claims**: Find all factual statements requiring verification
2. **Check Sources**: Verify citations exist and are credible
3. **Cross-Reference**: Validate claims match sources
4. **Flag Issues**: Mark unverified claims and needed corrections
5. **Suggest Sources**: Recommend credible sources for unsourced claims

## Output

You'll receive a detailed verification report:

### Verification Summary
- **Total Claims**: [Number]
- **Verified**: [Number] ✓
- **Needs Source**: [Number] ⚠️
- **Needs Verification**: [Number] ⚠️
- **Correction Needed**: [Number] ❌

### Detailed Report

**[VERIFIED] Claims** ✓
```
Claim: "47% of creators earn over $100K annually"
Source: Creator Economy Report 2024, SignalFire
Date: 2024-03
Status: VERIFIED
```

**[NEEDS SOURCE] Claims** ⚠️
```
Claim: "AI music tools have democratized production"
Issue: No source provided
Suggested source: Suno AI user statistics, industry reports
Action: Add citation or rephrase as opinion
```

**[NEEDS VERIFICATION] Claims** ⚠️
```
Claim: "Studies show productivity increases 40% with AI"
Source provided: Generic "studies show"
Issue: Vague attribution, needs specific study
Action: Replace with specific research citation
```

**[CORRECTION NEEDED] Claims** ❌
```
Claim: "ChatGPT has 1 billion users"
Source: [Citation]
Issue: Source actually says "100 million users"
Action: Correct number or update to latest data
```

## Claim Categories Checked

### Statistical Claims
- Numbers, percentages, growth rates
- Market sizes, user counts
- Performance metrics
- Trend data

### Expert Attributions
- Quotes from named experts
- "According to [Person]" statements
- Research citations
- Author claims

### Historical Facts
- Dates and timelines
- Events and milestones
- Company histories
- Product launches

### Case Study Details
- Names and companies
- Outcomes and results
- Timeframes
- Specific metrics

## Verification Standards

For each claim, checks:
- [ ] Source exists and is cited?
- [ ] Source is credible and authoritative?
- [ ] Source is recent (within 2 years for tech)?
- [ ] Claim accurately reflects source?
- [ ] Attribution is specific (not generic)?
- [ ] No logical contradictions?

## Action Items

Based on verification, you'll get:
- **[BLOCKING]** issues that must be fixed before publication
- **[WARNING]** issues that should be addressed
- **[RECOMMEND]** improvements for credibility

## What Happens Next

Verification report saved to:
`content-universe/_universe/verification-reports/<content-id>.md`

You can then:
1. Fix blocking issues (required)
2. Address warnings (recommended)
3. Re-run verification to confirm
4. Proceed to `/publish` when clean

---

**Time estimate**: 5-15 minutes depending on content length and claim count.
