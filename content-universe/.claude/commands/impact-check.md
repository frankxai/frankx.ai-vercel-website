# Impact Check

Verify content has actionable frameworks, specific examples, and creates transformation.

## Parameters
- `<content-file>` - Path to content (relative to content-universe/)
- `[threshold]` - Optional: "strict" | "standard" | "lenient" (default: standard)

## Thresholds
- `strict` - For how-to guides, courses, frameworks (must be highly actionable)
- `standard` - For blog posts, chapters (good balance)
- `lenient` - For thought leadership, opinion pieces (ideas-focused)

## Usage
```
/impact-check blogs/conscious-ai/ai-framework.md strict
/impact-check books/year-of-creator/chapter-5.md
/impact-check social/threads/thought-leadership.md lenient
```

## What This Does

Activates **Impact Engineer** to assess actionability and transformation potential:

1. **Framework Detection**: Find actionable systems and methodologies
2. **Example Quality**: Assess specificity and usefulness
3. **Action Steps**: Verify clear next steps
4. **Platitude Scan**: Detect vague advice without implementation
5. **Transformation Score**: Rate change-creation potential

## Output

### Impact Assessment Report

```markdown
## Impact Assessment: [Content Title]

### Overall Impact Score: 78/100 (Good - Some improvements needed)

Breakdown:
- Frameworks: 85/100 ✓
- Examples: 70/100 ⚠️ Needs improvement
- Action Steps: 90/100 ✓
- Platitude-Free: 65/100 ⚠️ Found some generic advice
- Transformation Potential: 80/100 ✓

**Status**: PASS with recommendations
**Content Type**: How-to guide
**Threshold**: Standard

---

### Framework Analysis

**Frameworks Found**: 2

1. **The AI Amplifier Framework** (Lines 45-89) ✓
   - Clear steps: ✓ 4 specific steps
   - Implementation guidance: ✓ Present
   - Success criteria: ✓ Defined
   - Time estimate: ✓ "30 minutes per cycle"
   - Obstacles addressed: ✓ 3 common challenges
   - Examples: ⚠️ Only 1 example (needs 2-3)

   Quality: GOOD (8/10)
   Recommendation: Add 1-2 more application examples

2. **The 3 C's of Content** (Lines 134-156) ✓
   - Memorable: ✓ (acronym-based)
   - Specific: ✓ Each C defined clearly
   - Actionable: ⚠️ Could use more implementation detail
   - Testable: ✓ Can measure success

   Quality: GOOD (7/10)
   Recommendation: Add assessment quiz or checklist

**Missing**: No troubleshooting section for frameworks
**Suggestion**: Add "Common Mistakes" section with fixes

---

### Example Quality Assessment

**Examples Found**: 5
**Specific Examples**: 3/5 ⚠️
**Generic Examples**: 2/5 ⚠️

**Specific Examples** ✓

1. **Sarah Chen Example** (Line 67)
   - Specificity: ✓ Name, outcome ($50K → $150K), timeframe (6 months)
   - Credibility: ⚠️ No verification source
   - Relevance: ✓ Directly illustrates framework
   - Details: ✓ Specific actions mentioned

   Quality: GOOD (8/10)
   Recommendation: Add source/verification if possible

2. **TechCrafter Studios** (Line 123)
   - Specificity: ✓ Company, metrics (10K → 100K followers)
   - Process: ✓ Described their approach
   - Results: ✓ Measurable outcomes

   Quality: EXCELLENT (9/10)

**Generic Examples** ⚠️

3. **"Imagine you're a creator..."** (Line 89)
   - Issue: Hypothetical, not real
   - Impact: Low credibility
   - Fix: Replace with real case study

   Quality: POOR (3/10)
   **ACTION REQUIRED**: Replace with verified example

4. **"Many creators find success..."** (Line 201)
   - Issue: Vague, no specifics
   - Impact: No proof
   - Fix: "47% of creators earn $100K+" with source

   Quality: POOR (2/10)
   **ACTION REQUIRED**: Add specific data or example

**Recommendation**: Replace 2 generic examples with specific, verified cases

---

### Action Steps Analysis

**Clear Next Steps**: ✓ Present

**Call to Action** (Lines 245-258) ✓
- Specific: ✓ "Start with Step 1 of the AI Amplifier Framework"
- Achievable: ✓ Can do immediately
- Time-bound: ✓ "Spend 30 minutes today"
- Valuable: ✓ Clear benefit stated

Quality: EXCELLENT (9/10)

**Implementation Guidance**: ✓
- Step-by-step: ✓ 4 clear steps
- Resources needed: ✓ Listed
- Time required: ✓ Specified
- Success looks like: ✓ Defined

**Potential Obstacles** (Lines 178-195)
- Addressed: ✓ 3 common challenges
- Solutions provided: ✓ For each challenge
- Realistic: ✓ Acknowledges difficulties

Quality: GOOD (8/10)
Recommendation: Add 1-2 more obstacles (common feedback from users)

---

### Platitude Detection

**Platitudes Found**: 4 ⚠️

1. **"Be more productive with AI"** (Line 23)
   - Issue: Vague, no HOW
   - Impact: Empty advice
   - Fix: "Use this 3-step process to cut content creation time from 8 hours to 3"

   **ACTION REQUIRED**: Replace with specific method

2. **"Stay consistent and you'll see results"** (Line 198)
   - Issue: Generic motivation, no actionable path
   - Impact: Doesn't help reader take action
   - Fix: "Post 3x per week using the content calendar template (link)"

   **ACTION REQUIRED**: Make specific and actionable

3. **"Believe in yourself"** (Line 234)
   - Issue: Motivational fluff, no utility
   - Impact: Wastes reader's time
   - Fix: Either remove or replace with specific confidence-building exercise

   **ACTION REQUIRED**: Remove or replace

4. **"Success takes time"** (Line 167)
   - Issue: True but not helpful
   - Impact: No actionable guidance
   - Fix: "Most creators see results in 30-90 days using this framework"

   **ACTION REQUIRED**: Add specificity and timeframe

**Platitude-Free Score**: 65/100 ⚠️
**Target**: >80
**Gap**: Need to remove/replace 4 platitudes

---

### Transformation Potential

**Reader Journey**:
- **Start State**: Overwhelmed by AI, not using effectively
- **End State**: Confident, using AI Amplifier Framework, 3x output
- **Transformation**: Clear ✓

**Measurable Outcomes** (Defined in content):
1. ✓ Reduce content creation time from 8 hours to 3 hours
2. ✓ Increase output from 1 post/week to 3 posts/week
3. ⚠️ "Better quality" (not measurable)

**Recommendation**: Replace "better quality" with measurable metric
Example: "Engagement rate increases by 40% on average"

**Sustainability**: ✓
- Framework can be repeated
- Long-term application shown
- Not a one-time trick

**Transformational Elements**:
- Identity shift: ✓ "From AI skeptic to AI amplifier"
- Skill building: ✓ Specific capabilities gained
- Behavioral change: ✓ New workflows established
- Mindset shift: ✓ Reframing AI as tool not threat

Transformation Score: 80/100 ✓

---

### Improvements Needed

**REQUIRED** (To reach 85+ impact score):
1. Replace 2 generic examples with specific, verified cases
2. Remove/replace 4 platitudes with actionable advice
3. Add verification sources for case studies

**RECOMMENDED** (To reach 90+ impact score):
4. Add 1-2 more application examples for main framework
5. Add troubleshooting section
6. Add 1-2 more common obstacles
7. Make "better quality" outcome measurable
8. Add assessment quiz or checklist

---

### Enhanced Version Preview

**Current** (Generic):
"Many creators find success with AI. Be more productive and stay consistent."

**Enhanced** (Specific):
"Sarah Chen cut her content creation time from 8 hours to 3 using the AI Amplifier Framework. She now publishes 3 posts weekly (up from 1) with 40% higher engagement. Here's her exact process:"

**Impact**: +350% specificity, +100% credibility, actionable

---

### Quality Standards by Threshold

#### Strict Threshold (How-to Guides, Courses)
- [ ] 2+ detailed frameworks with examples
- [ ] 5+ specific, verified examples
- [ ] Zero platitudes
- [ ] Step-by-step implementation
- [ ] Measurable outcomes defined
- [ ] Troubleshooting included
- [ ] Resources/tools listed
- [ ] Success criteria clear

#### Standard Threshold (Blog Posts, Chapters)
- [x] 1+ actionable framework
- [~] 3+ specific examples (have 3 of 5)
- [~] Minimal platitudes (4 found, max 2)
- [x] Clear action steps
- [x] Outcomes defined
- [ ] Obstacles addressed (present but could expand)

#### Lenient Threshold (Thought Leadership, Opinion)
- [x] Ideas are clear
- [x] Perspective is valuable
- [x] Some actionability present
- [x] Inspires thought or action

**Current Status**: Meets STANDARD threshold with improvements
**Target**: 85+ for publication

---

## What Happens Next

### Option 1: Auto-Enhance (Recommended)
Run automatic improvements:
```
/impact-check blogs/ai-framework.md enhance
```

Will:
- Replace generic examples with placeholders for real examples
- Remove platitudes, suggest specific alternatives
- Add framework enhancement suggestions
- Boost score to 85+

### Option 2: Manual Improvements
Fix issues yourself using report:
1. Replace 2 generic examples
2. Remove/replace 4 platitudes
3. Add sources for case studies
4. Re-run impact check to verify

### Option 3: Accept As-Is
If score is acceptable for your goals:
- Standard threshold: 70+ okay for drafts
- Publication threshold: 80+ recommended
- Excellence threshold: 90+ for flagship content

Current score: 78 - Acceptable for draft, should improve before publishing

Quick next steps:
- `/enhance-prose` - Will also catch some of these issues
- `/verify-claims` - Add sources for case studies
- `/publish` - Once score is 85+

---

**Time estimate**: 3-7 minutes for comprehensive impact assessment.
