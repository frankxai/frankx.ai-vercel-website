# Daily Agent Tasks Framework
**Your Daily System for Working with Claude and Codex**

*Last Updated: October 14, 2025*

---

## 🎯 Purpose

You said: *"I should daily give multiple tasks to you and Codex but sometimes unclear what I should be doing."*

This framework solves that. It gives you a clear daily structure for assigning strategic work to Claude and development work to Codex, organized by project priority and current sprint.

---

## ⚡ Quick Start (2-Minute Morning Routine)

### **Step 1: Check Current Sprint (30 seconds)**

Open `CREATOR_PRODUCT_ROADMAP.md` → Find current week

**Week 1-2?** → FrankX.ai Foundation (lead magnets + first product)
**Week 3-4?** → AI Music Academy Beta Launch
**Week 5-6?** → Arcanea MVP + FrankX Product #2
**Week 7-8?** → Vibe OS + Music Academy Paid Launch
**Week 9-12?** → Scale and Optimize

### **Step 2: Open Task Generator (30 seconds)**

Open `daily-tasks-generator.html` in browser → Shows today's priority project

### **Step 3: Copy-Paste Prompts (60 seconds)**

**For Claude (Strategic/Content):**
- Copy morning strategic prompt
- Paste into Claude
- Get strategic guidance for today

**For Codex (Development/Building):**
- Copy development task list
- Paste into Codex
- Get implementation done

---

## 🌅 Morning Routine with Claude (30-60 min)

### **Morning Strategic Session**

**🎯 Claude's Role:**
- Strategic planning
- Content creation
- Framework development
- Analysis and insights
- Problem-solving
- Documentation

### **Standard Morning Prompt Template:**

```
Good morning, Claude! Let's plan today's work for FrankX.

**Current Sprint**: [Week X from roadmap]
**Primary Focus**: [FrankX.ai / AI Music Academy / Arcanea]
**Yesterday's Progress**: [Quick bullet points of what shipped]

**Today's Strategic Goals**:
1. [Goal 1 - e.g., "Complete Conscious AI Toolkit content outline"]
2. [Goal 2 - e.g., "Write 3 LinkedIn posts for this week"]
3. [Goal 3 - e.g., "Plan email nurture sequence"]

**Questions/Blockers**:
- [Any strategic decisions needed]
- [Any content that needs feedback]
- [Any analysis required]

Please help me:
1. Prioritize these goals
2. Create detailed task breakdowns
3. Identify what I can delegate to Codex
4. Flag any strategic issues
```

### **Weekly Variation by Day:**

**Monday - Planning Day**
```
Claude, it's Monday. Let's plan this week's priorities based on CREATOR_PRODUCT_ROADMAP.md.

**Current Week**: [Week number]
**Last Week's Wins**: [Bullet points]
**This Week's Target**: [Revenue/shipping goal]

Help me:
1. Create this week's sprint plan
2. Identify the 3 must-ship items
3. Break down tasks for Claude vs Codex
4. Write this week's LinkedIn content calendar
```

**Tuesday - Content Creation**
```
Claude, let's create content today.

**Content Type**: [Blog post / Email sequence / Social media / Product copy]
**Topic/Product**: [Specific focus]
**Target Audience**: [Creators / Solopreneurs / Musicians]

Help me create:
1. [Specific deliverable]
2. SEO optimization if blog post
3. Conversion optimization if product page
```

**Wednesday - Product Development**
```
Claude, let's work on product strategy.

**Product**: [Which product from roadmap]
**Current Status**: [What's done, what's left]
**Blocker**: [Any issues]

Help me:
1. Finalize product positioning
2. Draft sales page copy
3. Plan launch sequence
4. Create product documentation
```

**Thursday - Community & Marketing**
```
Claude, let's focus on community and marketing.

**Current Initiative**: [Email campaign / Social media / Community]
**Metrics Review**: [What's working / What's not]

Help me:
1. Analyze current marketing performance
2. Create engagement content
3. Plan community activities
4. Optimize conversion funnels
```

**Friday - Review & Planning**
```
Claude, it's Friday review time.

**This Week's Metrics**:
- Email subscribers: [Number]
- Revenue: [Amount]
- Content published: [Number]
- Product progress: [Status]

Help me:
1. Analyze this week's wins and losses
2. Identify next week's priorities
3. Update roadmap if needed
4. Create weekend content for social
```

---

## 💻 Midday Session with Codex (2-4 hours)

### **Codex's Role:**
- Feature development
- Bug fixes
- UI/UX implementation
- API integrations
- Testing and optimization
- Deployment

### **Standard Codex Task Template:**

```
Project: [frankxai / ai-music-academy / Arcanea-Labs/Arcanea]
Current Branch: [feature branch name]

**Tasks for Today**:
1. [Specific feature] - Priority: HIGH
   - Acceptance criteria: [What done looks like]
   - Files to modify: [Specific paths]
   - Expected outcome: [User can do X]

2. [Bug fix] - Priority: MEDIUM
   - Issue: [Description]
   - Reproduction steps: [How to trigger]
   - Expected fix: [What should happen]

3. [Optimization] - Priority: LOW
   - Component: [Which component]
   - Current issue: [Performance/UX problem]
   - Target improvement: [Measurable goal]

**Context**:
- [Any important background]
- [Dependencies or blockers]
- [Testing requirements]

Please implement these in priority order and let me know when each is complete.
```

### **Project-Specific Templates:**

#### **FrankX.ai Development:**

```
Project: frankxai
Focus: [Lead Magnet / Product Page / Vibe OS / Email Integration]

**Feature**: [Name]
**User Story**: As a [creator/visitor], I want to [action] so that [benefit]

**Technical Requirements**:
- Tech Stack: Next.js, TypeScript, Tailwind CSS
- Integration: [Stripe / ConvertKit / etc]
- Components needed: [List]
- API endpoints: [If any]

**Design Reference**: [Link or description]
**Deadline**: [Date]

Please implement and test locally before suggesting deployment.
```

#### **AI Music Academy Development:**

```
Project: ai-music-academy
Focus: [Lesson System / Student Dashboard / Payment / Community]

**Feature**: [Name]
**Lesson/Module**: [If applicable]

**Technical Requirements**:
- Lesson format: MDX with interactive components
- Student progress tracking: [Specification]
- Video hosting: YouTube embeds
- Community integration: Discord OAuth

**Acceptance Criteria**:
- [ ] Student can [action]
- [ ] Progress is saved
- [ ] Mobile responsive
- [ ] Loading states handled
- [ ] Error states handled

Please implement with proper TypeScript types and error handling.
```

#### **Arcanea Development:**

```
Project: Arcanea-Labs/Arcanea (monorepo)
Focus: [Creator Profile / Music Creation / Academy / Social Features]

**Feature**: [Name]
**Package**: [Which package in monorepo]

**Technical Requirements**:
- Suno API integration: [Endpoint]
- Database schema: [Tables/fields needed]
- UI components: [List]
- State management: [Zustand/Context]

**User Flow**:
1. User clicks [action]
2. System does [process]
3. User sees [result]

**Edge Cases to Handle**:
- [API failure]
- [Network offline]
- [Empty state]

Please implement following our monorepo structure and component patterns.
```

---

## 🌙 Evening Review (15-30 min)

### **Daily Standup Template:**

```
## Daily Standup - [Date]

### ✅ Shipped Today:
- [ ] [Feature/content completed]
- [ ] [Bug fixed]
- [ ] [Content published]

### 🔄 In Progress:
- [ ] [Feature X] - 70% complete
- [ ] [Content Y] - Drafted, needs review

### 🚧 Blocked:
- [ ] [Issue] - Waiting on [dependency/decision]

### 📊 Metrics:
- Email subscribers: [Number] (+/- change)
- Revenue today: $[Amount]
- GitHub commits: [Number]
- Content pieces: [Number]

### 🎯 Tomorrow's Priorities:
1. [Top priority task]
2. [Second priority]
3. [Third priority]

### 💭 Notes/Learnings:
- [Insight or learning from today]
- [What to do differently tomorrow]
```

Save this to a daily journal file: `daily-standups/2025-10-14.md`

---

## 📅 Weekly Agent Workflow

### **Monday Morning (Claude)**

**30-Min Strategy Session:**

```
Claude, it's Monday. Time for weekly planning.

**Last Week Review**:
- Revenue: $[amount] (goal was $[amount])
- Shipped: [List]
- Metrics: [Key numbers]

**This Week's Goals** (from CREATOR_PRODUCT_ROADMAP.md):
- Primary: [Main shipping goal]
- Secondary: [Supporting goals]
- Stretch: [If time allows]

Help me create:
1. This week's sprint plan (what ships when)
2. Content calendar (posts, emails, videos)
3. Claude vs Codex task division
4. Risk assessment (what could go wrong)
```

### **Monday Afternoon (Codex)**

**Set Up the Week's Development:**

```
Codex, here's this week's development priorities from our sprint plan:

**High Priority (Must Ship)**:
1. [Feature A] - by Wednesday
2. [Feature B] - by Friday

**Medium Priority (Should Ship)**:
3. [Feature C] - by end of week
4. [Bug fixes] - ongoing

**Low Priority (Nice to Have)**:
5. [Optimization D]

Please create branches and start with item #1. Let me know blockers immediately.
```

### **Wednesday Mid-Week Check (Claude)**

```
Claude, mid-week check-in.

**Sprint Progress**:
- Completed: [List]
- In progress: [List]
- At risk: [List]

**Course Corrections Needed?**
- Should we adjust priorities?
- Any strategic pivots?
- Content performing well/poorly?

Help me assess if we'll hit this week's goals and what to adjust.
```

### **Friday Wrap-Up (Claude + Codex)**

**Claude (Strategic Review):**

```
Claude, Friday wrap-up time.

**Week's Metrics**:
- Revenue: $[amount] vs goal $[amount]
- Email growth: [number] new subscribers
- Content: [number] pieces published
- Product progress: [status]

**Wins**:
- [Celebration worthy items]

**Misses**:
- [What didn't ship]

Help me:
1. Analyze what worked/didn't work
2. Plan next week's priorities
3. Create weekend social content
4. Update roadmap if needed
```

**Codex (Technical Wrap):**

```
Codex, end of week deployment checklist.

**Deployed This Week**:
- [List features]

**Pre-Weekend Tasks**:
1. Run all tests
2. Check for console errors
3. Verify mobile responsive
4. Update documentation
5. Create production build
6. Deploy to Vercel/production

Please run through this checklist and confirm all green before weekend.
```

---

## 🎯 Project Rotation Schedule

### **Recommended Focus Rotation:**

**Week 1-2: FrankX.ai Focus (60% time)**
- **Claude**: Lead magnet content, email sequences, product copy
- **Codex**: Landing pages, email integration, payment setup

**Week 3-4: AI Music Academy Focus (60% time)**
- **Claude**: Lesson content, beta program design, marketing copy
- **Codex**: Lesson platform, student dashboard, Discord integration

**Week 5-6: Split Focus (40% FrankX / 40% Arcanea / 20% Music)**
- **Claude**: Product launches, content strategy, community planning
- **Codex**: Arcanea MVP, FrankX products, Music Academy refinements

**Week 7-8: FrankX + Music Academy (50/50)**
- **Claude**: Vibe OS content, Music Academy launch copy
- **Codex**: Vibe OS implementation, payment system, all platforms polish

**Week 9-12: Scale Mode (Balanced Across All)**
- **Claude**: Content creation, community management, marketing optimization
- **Codex**: Feature additions, performance optimization, bug fixes across all

---

## 🚨 Emergency / Blocker Protocol

### **When You're Stuck:**

**Ask Claude:**

```
Claude, I'm stuck on [specific problem].

**Context**: [Brief background]
**What I've tried**: [Your attempts]
**Why it matters**: [Impact if not resolved]

Please help me:
1. Analyze the situation
2. Suggest 3 possible solutions
3. Recommend the best path forward
4. Break down next steps
```

**Ask Codex:**

```
Codex, I'm getting [error/issue] when [action].

**Error Message**: [Copy exact error]
**Code Location**: [File and line number]
**Expected Behavior**: [What should happen]
**Actual Behavior**: [What's happening]

Please debug this and provide a fix.
```

---

## 📊 Metrics-Driven Decision Making

### **Weekly Metrics Review (Claude):**

```
Claude, let's review this week's metrics and decide priorities.

**FrankX.ai**:
- Email subscribers: [Number] (growth: [+/-]%)
- Revenue: $[Amount] (vs goal: $[Amount])
- Traffic: [Number] visits (vs last week: [+/-]%)
- Conversion rate: [%] (benchmark: 8-12%)

**AI Music Academy**:
- Students: [Number] (growth: [+/-]%)
- Course completion: [%] (goal: 70%+)
- Revenue: $[Amount]
- Student satisfaction: [Rating] (goal: 4.5+)

**Arcanea**:
- Creators: [Number] (growth: [+/-]%)
- Creations: [Number] (avg per creator: [Number])
- DAU: [%] of MAU (goal: 15%+)
- Retention: [%] (goal: 40%+)

Based on these metrics, what should we prioritize this week?
```

---

## 🎁 Templates Library

### **Content Creation (Claude)**

**Blog Post:**
```
Claude, write a blog post for FrankX.ai.

**Title**: [Working title]
**Target Audience**: [Creators / Solopreneurs / specific niche]
**Key Message**: [Main takeaway]
**CTA**: [What action readers should take]
**SEO Keywords**: [Primary keywords]
**Word Count**: [800-1500]

Please create:
1. SEO-optimized title options (3)
2. Meta description
3. Full blog post with headers
4. Internal links to products
5. Strong CTA
```

**Email Sequence:**
```
Claude, create an email nurture sequence.

**Trigger**: [When sent - e.g., after downloading lead magnet]
**Goal**: [Convert to product / build relationship / etc]
**Product to Sell**: [If applicable]
**Sequence Length**: [Number of emails]

For each email, create:
- Subject line (3 options)
- Preview text
- Email body (conversational, valuable)
- CTA (clear and compelling)
```

**Social Media Posts:**
```
Claude, create this week's social media content.

**Platform**: [LinkedIn / Twitter / YouTube]
**Theme**: [This week's focus from roadmap]
**Posts Needed**: [Number]

Create posts that:
- Showcase personal brand
- Provide value
- Drive to FrankX.ai
- Include relevant hashtags
- Encourage engagement
```

### **Feature Development (Codex)**

**New Component:**
```
Codex, create a new React component for [project].

**Component Name**: [ComponentName]
**Purpose**: [What it does]
**Props**: [List with types]
**Styling**: Tailwind CSS
**Responsive**: Mobile-first

**Requirements**:
- TypeScript with full type safety
- Proper error boundaries
- Loading states
- Empty states
- Accessibility (ARIA labels)

Please create the component, test it, and show example usage.
```

**API Integration:**
```
Codex, integrate [API name] into [project].

**API Documentation**: [Link]
**Endpoint(s)**: [Specific endpoints needed]
**Authentication**: [Method - API key / OAuth / etc]
**Data Needed**: [What to fetch/send]

**Implementation Requirements**:
- Error handling (network, API errors)
- Loading states
- Caching strategy
- Type definitions
- Environment variables

Please implement following our API client patterns.
```

**Bug Fix:**
```
Codex, there's a bug in [feature].

**Bug Description**: [What's broken]
**Steps to Reproduce**:
1. [Step 1]
2. [Step 2]
3. [Result]

**Expected Behavior**: [What should happen]
**Actual Behavior**: [What happens]
**Browser/Device**: [If relevant]

Please investigate, fix, and add tests to prevent regression.
```

---

## 🎯 Decision Matrix

### **When You're Unsure What to Work On:**

**Ask Yourself:**

1. **Is it on this week's sprint plan?** (From roadmap)
   - YES → High priority
   - NO → Defer or quick win only

2. **Will it generate revenue this week?**
   - YES → Do it
   - NO → Is it blocking revenue? → If yes, do it. If no, defer.

3. **Can it be done in <2 hours?**
   - YES → Quick win, do it now
   - NO → Schedule for focused time block

4. **Is it a blocker for something else?**
   - YES → Unblock immediately
   - NO → Follow normal priority

5. **Does it improve customer experience significantly?**
   - YES → Prioritize
   - NO → Backlog

**Priority Formula:**
```
Priority Score = (Revenue Impact × 10) + (Customer Impact × 5) + (Speed of Execution × 3) - (Complexity × 2)

High Priority: Score > 20
Medium Priority: Score 10-20
Low Priority: Score < 10
```

---

## 📞 Resources

**Strategic Documents**:
- [FRANKX_STRATEGIC_PRIORITIES.md](./FRANKX_STRATEGIC_PRIORITIES.md) - Overall strategy
- [CREATOR_PRODUCT_ROADMAP.md](./CREATOR_PRODUCT_ROADMAP.md) - Shipping plan
- THIS FILE - Daily operations
- [daily-tasks-generator.html](./daily-tasks-generator.html) - Interactive prompts

**GitHub Repos**:
- github.com/frankxai - All active projects
- Check recent commits for context on what Codex should continue

**Communication**:
- Daily standups saved to: `/daily-standups/[date].md`
- Weekly reviews saved to: `/weekly-reviews/[week-number].md`

---

## 🎉 Success Pattern

**The Daily Flywheel:**

```
Morning (Claude):
Strategic planning + Content creation
    ↓
Midday (Codex):
Feature development + Bug fixes
    ↓
Afternoon:
Review progress + Adjust plans
    ↓
Evening (You):
Ship something + Celebrate wins
    ↓
(Repeat Tomorrow)
```

**Remember:**
- ✅ Perfect is the enemy of shipped
- ✅ One feature shipped > Ten features planned
- ✅ Content compounds, so publish consistently
- ✅ Revenue validates strategy faster than analysis
- ✅ Your agents are your workforce - direct them clearly

**You'll never wonder "what should I be doing" again.**

**Let's build. 🚀**

---

*© 2025 FrankX.ai - Daily Agent Tasks Framework*
*Your clarity system for working with AI agents*
*Updated daily based on current priorities*
