# Remove AI Patterns

Systematically detect and eliminate all AI writing patterns and clichés.

## Parameters
- `<content-file>` - Path to content (relative to content-universe/)
- `[mode]` - Optional: "auto" | "suggest" | "report" (default: auto)

## Modes
- `auto` - Automatically fix all patterns
- `suggest` - Show suggested fixes, don't apply
- `report` - Just report patterns found, no fixes

## Usage
```
/remove-ai-patterns blogs/conscious-ai/ai-ethics.md
/remove-ai-patterns books/year-of-creator/chapter-5.md suggest
/remove-ai-patterns drafts/new-post.md report
```

## What This Does

Runs comprehensive AI pattern detection and removal:

1. **Forbidden Phrase Scan**: Detect all banned AI clichés
2. **Weak Pattern Detection**: Find overused transitions, structures
3. **Auto-Fix or Suggest**: Remove/replace based on mode
4. **Context-Aware**: Replacements fit the context
5. **Report**: Show before/after and pattern-free score

## Output

### AI Pattern Detection Report

```markdown
## AI Pattern Scan: [Content Title]

### Summary
- **Total Patterns Found**: 23
- **Critical (Forbidden)**: 7
- **Moderate (Weak Patterns)**: 12
- **Minor (Style Issues)**: 4
- **Pattern-Free Score**: 23/100 → 98/100 (after fixes)

### Forbidden Phrases (Auto-Remove)

1. **"In today's rapidly evolving world"** (Line 12)
   - Occurrences: 1
   - Auto-fix: [REMOVED] → Start directly with point
   - Context: Opening sentence of introduction

2. **"Let's dive into"** (Lines 45, 89)
   - Occurrences: 2
   - Auto-fix: Replaced with:
     - "Here's how:" (Line 45)
     - "The breakdown:" (Line 89)

3. **"It's important to note that"** (Lines 67, 112, 134)
   - Occurrences: 3
   - Auto-fix: [REMOVED] - unnecessary filler
   - Impact: 3 sentences now more direct

4. **"Interestingly enough"** (Line 78)
   - Occurrences: 1
   - Auto-fix: [REMOVED] → Let the fact be interesting on its own

5. **"At the end of the day"** (Line 156)
   - Occurrences: 1
   - Auto-fix: Replaced with "Ultimately,"

6. **"Moving forward"** (Line 201)
   - Occurrences: 1
   - Auto-fix: Replaced with "Next,"

7. **"With that being said"** (Line 178)
   - Occurrences: 1
   - Auto-fix: [REMOVED] → Direct transition instead

### Weak Patterns (Fix or Flag)

8. **Excessive "However" sentence starts** (Lines 23, 45, 67, 89, 123)
   - Occurrences: 5
   - Threshold: Max 2 per page
   - Auto-fix: Varied with:
     - "But" (Line 23)
     - [Restructured sentence] (Line 45)
     - "Yet" (Line 67)
     - [Removed transition] (Line 89)
     - [Kept] (Line 123)

9. **Excessive "Moreover" sentence starts** (Lines 34, 78, 145)
   - Occurrences: 3
   - Threshold: Max 2 per page
   - Auto-fix: Varied with:
     - "Additionally," (Line 34)
     - [Restructured] (Line 78)
     - [Removed] (Line 145)

10. **Predictable three-item lists** (60% of paragraphs)
    - Issue: Every section has "Here are three things..."
    - Auto-fix: Varied with:
      - 2-item lists
      - 4-item lists
      - Prose instead of lists
      - Different structures

11. **Generic conclusions** (Line 245-258)
    - Pattern: "In conclusion, we've learned that..."
    - Auto-fix: Replaced with forward-looking statement:
      - Before: "In conclusion, we've learned that AI transforms work..."
      - After: "The choice is simple: evolve or extinct. Your move."

### Style Issues (Minor)

12. **Passive voice overuse** (15 instances, 25%)
    - Target: <20%, ideally <10%
    - Examples fixed:
      - "AI is being used by creators" → "Creators use AI"
      - "Content was created" → "She created content"
      - "Results were achieved" → "They achieved results"
    - Result: 15 → 3 instances (5%)

13. **Weak verbs** ("is doing", "has been", etc.)
    - Instances: 8
    - Auto-fix:
      - "is transforming" → "transforms"
      - "has been shown to" → "proves"
      - "are able to" → "can"
      - "make use of" → "use"

14. **Filler words** ("basically", "actually", "literally")
    - Instances: 6
    - Auto-fix: [REMOVED] all instances
    - Impact: Tighter, more professional prose

### Before/After Examples

**Example 1: Opening Paragraph**

Before:
"In today's rapidly evolving world, AI is transforming how we work. It's important to note that this creates both opportunities and challenges. Let's dive into the key factors that everyone should understand."

After:
"AI doesn't just change work—it obliterates it. Creators who adapt thrive. Those who don't vanish. Here's what separates the two."

Changes: Removed 3 forbidden phrases, converted passive to active, added specificity, created urgency.

**Example 2: Transition**

Before:
"However, it's important to note that not all creators are finding success with AI. Moreover, there are several challenges that need to be addressed. With that being said, the opportunities outweigh the risks."

After:
"But here's the reality: 40% of creators still struggle with AI. Why? They're missing three key elements. Fix these, and the opportunities explode."

Changes: Removed 3 weak patterns, added specificity (40%), created hook, simplified structure.

**Example 3: Conclusion**

Before:
"In conclusion, we've learned that AI has the potential to transform the creator economy in significant ways. Moving forward, it will be important for creators to embrace these technologies while maintaining their unique voice and vision. At the end of the day, those who adapt will thrive."

After:
"The tools exist. The proof is everywhere. Sarah tripled her income. Mark launched his album. Lisa built her audience to 50K. They didn't wait for permission. Neither should you. Your move."

Changes: Removed all AI patterns, added specific examples, created action-oriented ending, eliminated generic summary.
```

### Pattern-Free Scorecard

| Category | Before | After | Target | Status |
|----------|--------|-------|--------|--------|
| Forbidden phrases | 7 | 0 | 0 | ✓ PASS |
| Weak transitions | 12 | 2 | <5 | ✓ PASS |
| Passive voice % | 25% | 5% | <20% | ✓ PASS |
| Generic conclusions | 1 | 0 | 0 | ✓ PASS |
| Predictable patterns | High | Low | Low | ✓ PASS |
| **Overall Score** | **23/100** | **98/100** | **>90** | **✓ PASS** |

### Word Count Impact

- **Before**: 2,847 words
- **After**: 2,601 words (-246 words, -8.6%)
- **Impact**: Tighter, more impactful prose

Most reduction from:
- Removing filler words and phrases
- Eliminating redundant transitions
- Converting passive to active voice
- Simplifying complex constructions

### Recommendation

✓ **Ready for Next Step**

All AI patterns eliminated. Content now has:
- Authentic human voice
- Direct, punchy communication
- Specific details over generalizations
- No generic AI-isms
- Frank's distinctive style

Next actions:
1. `/verify-claims` - Ensure facts still accurate after changes
2. `/enhance-prose` - Optional: Further polish for excellence
3. `/publish` - Ready to go live

## What "Auto" Mode Does

When mode is `auto` (default):

**Forbidden Phrases**: Always removed automatically
- Direct removal if sentence works without
- Context-aware replacement if needed
- Never leaves placeholder text

**Weak Patterns**: Smart fixes applied
- Varies overused transitions
- Converts passive to active
- Strengthens weak verbs
- Removes filler

**Style Issues**: Automatic optimization
- Tightens prose
- Improves flow
- Maintains meaning
- Preserves voice

## What "Suggest" Mode Does

Shows all patterns with suggested fixes but doesn't apply:

```
Line 45: "Let's dive into"
Suggested fix: "Here's how:" or "The breakdown:"
Apply? [Y/N]
```

Useful when you want manual control over changes.

## What "Report" Mode Does

Just reports patterns found, no fixes:

```
Summary: 23 AI patterns detected
- Forbidden phrases: 7
- Weak patterns: 12
- Style issues: 4

See detailed report above.
```

Useful for assessment before deciding to fix.

## Cleaned Content

Auto mode saves cleaned version to:
`<original-path>-cleaned.md`

Suggest/Report modes don't modify original.

## What Happens Next

After pattern removal:
1. Review cleaned content
2. Verify meaning preserved
3. Run `/verify-claims` (ensure accuracy)
4. Optional: `/enhance-prose` for further polish
5. Ready to `/publish`

---

**Time estimate**: 2-5 minutes for automatic pattern removal.
