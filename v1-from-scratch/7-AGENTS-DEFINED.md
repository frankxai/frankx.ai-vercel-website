# The 7 Content Refinement Agents
**Date**: 2025-11-19
**Purpose**: Behind-the-scenes helpers that refine Frank's content
**Philosophy**: Frank creates, agents polish, Frank approves

---

## 🎯 CORE PRINCIPLE

**Agents are assistants, not replacements.**

- Frank writes the first draft
- Frank creates the music
- Frank decides strategy
- **Agents help make it better**

No "daily competitions." No "watch them work." Just: better content, faster.

---

## 📝 THE 7 AGENTS

### 1. Newsletter Agent

**Primary Role**: Weekly newsletter creation

**Workflow**:
1. Frank shares rough thoughts/topics for the week
2. Agent compiles into structured draft
3. Suggests 3 subject line options
4. Formats for ConvertKit
5. Frank reviews, edits, approves
6. Agent schedules send

**Tools**:
- Claude (Sonnet 4.5) for drafting
- ConvertKit API for scheduling
- Analytics data for topic suggestions

**Autonomy Level**: Medium
- Can draft fully
- Cannot send without Frank's approval

**Output Example**:
```
Subject Lines (pick one):
1. "What I learned building AI agents this week"
2. "500 Suno songs later: my production workflow"
3. "The music+code combination that changed everything"

Draft:
[Personal greeting]
[Main story/insight]
[Practical takeaway]
[Next week preview]
[Signature]
```

---

### 2. Blog Agent

**Primary Role**: Blog post refinement and SEO

**Workflow**:
1. Frank writes rough draft in Notion or doc
2. Agent improves:
   - Clarity and structure
   - Flow between paragraphs
   - Examples and code snippets
   - SEO optimization (meta, headings)
3. Preserves Frank's voice 100%
4. Frank reviews, tweaks, approves
5. Agent exports to MDX and commits

**Tools**:
- Claude (Sonnet 4.5) for editing
- Notion MCP for drafts
- SEO tools for optimization
- GitHub MCP for commits

**Autonomy Level**: Medium
- Can suggest heavy edits
- Cannot publish without approval
- Preserves voice obsessively

**Quality Checks**:
- Readability score > 70
- Code examples tested
- Links valid
- Images optimized
- Frank's voice intact

---

### 3. Music Agent

**Primary Role**: Suno catalog management

**Workflow**:
1. Frank creates tracks on Suno
2. Agent:
   - Organizes into playlists/collections
   - Writes track descriptions
   - Creates "workflow breakdown" posts
   - Manages embedding on site
3. Frank reviews descriptions
4. Agent updates music page

**Tools**:
- Suno API (if available) or manual links
- Claude for descriptions
- Notion for catalog database

**Autonomy Level**: Medium-High
- Can organize and describe
- Can publish to music page
- Frank spot-checks periodically

**Output Example**:
```
Track: "Midnight Code Sessions"
Genre: Ambient Electronic
Mood: Focus, Flow State
Created: Nov 15, 2025
Prompt Technique: [Frank's workflow]
Use Case: Deep work sessions

[Suno Embed]
[Download Link if available]
```

---

### 4. Resource Agent

**Primary Role**: Create downloadable guides from content

**Workflow**:
1. Frank publishes blog post
2. Agent identifies: "This would make a good guide"
3. Agent creates:
   - PDF version (formatted beautifully)
   - Notion template version
   - Code snippet repo (if applicable)
   - Checklist version
4. Frank reviews
5. Agent adds to /resources page

**Tools**:
- Claude for formatting
- Markdown to PDF converter
- Notion template creator
- GitHub for code repos

**Autonomy Level**: High
- Can create resource versions automatically
- Frank reviews monthly, not per item

**Example Transformations**:
- Blog post → PDF guide
- Tutorial → Notion template
- Code article → GitHub repo
- Workflow post → Checklist

---

### 5. Tools Agent

**Primary Role**: Build simple micro-apps and utilities

**Workflow**:
1. Frank says: "I want a tool that does X"
2. Agent:
   - Clarifies requirements
   - Builds MVP with Claude Code
   - Creates tool page
   - Writes documentation
3. Frank tests and approves
4. Agent deploys to /tools/[slug]

**Tools**:
- Claude (Sonnet 4.5) for coding
- Next.js for tool framework
- Vercel for deployment

**Autonomy Level**: Medium
- Can build full tools
- Frank must test before public
- Can iterate based on feedback

**Example Tools**:
- Suno prompt generator
- AI workflow calculator
- Music mood matcher
- Code snippet formatter

---

### 6. Research Agent

**Primary Role**: Compile research and fact-check

**Workflow**:
1. Frank is writing about topic X
2. Agent:
   - Finds supporting sources
   - Fact-checks technical claims
   - Compiles related research
   - Suggests citations
3. Frank reviews and integrates
4. Agent maintains knowledge base

**Tools**:
- Claude with web search
- Perplexity for research
- Notion for knowledge base
- Linear for tracking research tasks

**Autonomy Level**: High
- Can research independently
- Provides sources, Frank decides what to use

**Output Example**:
```
Topic: "MCP Server Development"

Key Sources Found:
1. [Official MCP Docs] - Best practices
2. [GitHub Examples] - Real implementations
3. [Community Discussions] - Common issues

Fact Checks:
✅ "MCP supports stdio transport" - Confirmed
✅ "Can use HTTP/SSE transport" - Confirmed
⚠️ "MCP 2.0 released" - Actually still 1.0

Related Topics to Explore:
- Agent orchestration patterns
- Multi-server architectures
```

---

### 7. Social Agent

**Primary Role**: Adapt content for social platforms

**Workflow**:
1. Frank publishes blog post or music
2. Agent creates variations:
   - Twitter/X thread (10 tweets)
   - LinkedIn post (professional angle)
   - Reddit post (community specific)
   - YouTube description (if video)
3. Frank reviews and schedules
4. Agent handles cross-posting

**Tools**:
- Claude for adaptation
- Buffer/Hootsuite for scheduling
- Analytics for performance tracking

**Autonomy Level**: Medium
- Can create all variations
- Frank approves before posting
- Can schedule approved content

**Example Adaptations**:

**Blog Post**: "Building Production AI Agents"

**Twitter Thread**:
```
1/ Just published my guide to production AI agents.
Here's what 2 years of building taught me 🧵

2/ Lesson 1: Start with one agent, not a swarm...

[8 more tweets]

10/ Full guide with code examples on my blog [link]
```

**LinkedIn**:
```
After deploying AI agents in production for 2 years at Oracle,
I've learned what actually works vs. what sounds good in theory.

Here are the 3 patterns that matter most:
[Professional, detailed]
```

---

## 🔄 AGENT COLLABORATION PATTERNS

### Pattern 1: Newsletter Creation (Multi-Agent)
1. **Research Agent**: Compiles week's best topics
2. **Newsletter Agent**: Drafts full email
3. **Social Agent**: Creates teaser posts
4. Frank approves all three
5. All publish simultaneously

### Pattern 2: Blog Post to Resources (Sequential)
1. **Blog Agent**: Polishes Frank's draft
2. Frank approves and publishes
3. **Resource Agent**: Creates PDF/template versions
4. **Social Agent**: Creates promotion posts
5. Frank spot-checks resources

### Pattern 3: Music Release (Coordinated)
1. Frank creates track on Suno
2. **Music Agent**: Writes description, adds to catalog
3. **Newsletter Agent**: Includes in next week's email
4. **Social Agent**: Creates release announcement
5. Frank approves all messaging

---

## 🛠️ TECHNICAL IMPLEMENTATION

### Where Agents Work
- **Notion**: Draft storage, collaboration, approval workflows
- **n8n**: Automation triggers and workflows
- **GitHub**: Code commits, automated publishing
- **Local**: Some agents run via Claude Code directly

### Agent Execution Modes

**1. On-Demand** (Frank triggers):
```
Frank: "Blog Agent, polish this draft"
Agent: [works on draft]
Agent: "Ready for review in Notion"
Frank: [reviews, approves]
Agent: "Published to frankx.ai/blog/[slug]"
```

**2. Scheduled** (Automated):
```
Every Wednesday 9am:
→ Newsletter Agent compiles draft
→ Notifies Frank in Slack
→ Frank reviews by noon
→ Agent schedules send for 3pm
```

**3. Triggered** (Event-based):
```
Blog post published →
→ Resource Agent creates guides
→ Social Agent creates posts
→ All queued for Frank's review
```

### Quality Gates
Every agent output includes:
- **Confidence score**: How sure the agent is
- **Changes made**: What it modified
- **Requires review**: Yes/No flag
- **Approval needed by**: Deadline if time-sensitive

---

## 📊 AGENT PERFORMANCE TRACKING

### Metrics (Monthly Review)

**Newsletter Agent**:
- Drafts created vs. sent
- Open rate (target >40%)
- Frank's edit % (lower = agent improving)

**Blog Agent**:
- Posts refined vs. published
- SEO score improvements
- Frank's approval rate

**Music Agent**:
- Tracks organized per month
- Description quality (Frank rates 1-5)
- Catalog completeness

**Resource Agent**:
- Resources created from posts
- Download counts
- Conversion to paid products

**Tools Agent**:
- Tools built vs. launched
- Tool usage metrics
- User feedback ratings

**Research Agent**:
- Research requests completed
- Accuracy of fact-checks
- Time saved for Frank

**Social Agent**:
- Posts created vs. approved
- Engagement rates
- Frank's modification %

---

## ✅ SUCCESS CRITERIA

### Agent is Successful When:
1. Frank says "This saved me time"
2. Frank's edits decrease over time (agent learning)
3. Content quality stays high or improves
4. Publishing frequency increases
5. Frank can focus on creating, not formatting

### Agent Needs Improvement When:
1. Frank rewrites >50% of output
2. Voice doesn't sound like Frank
3. Errors or inaccuracies present
4. More work to review than to do it himself
5. Frank avoids using it

---

## 🚀 ROLLOUT PLAN

### Phase 1 (Week 1): Core Agents
- [ ] Newsletter Agent setup
- [ ] Blog Agent setup
- [ ] Test with 1-2 real drafts
- [ ] Refine based on Frank's feedback

### Phase 2 (Week 2): Content Agents
- [ ] Music Agent setup
- [ ] Resource Agent setup
- [ ] Integrate with existing content

### Phase 3 (Week 3): Expansion
- [ ] Tools Agent setup
- [ ] Research Agent setup
- [ ] Social Agent setup

### Phase 4 (Week 4): Automation
- [ ] n8n workflows for all agents
- [ ] Notion approval dashboards
- [ ] Performance tracking dashboard

---

**Remember**: Agents are tools to amplify Frank's output, not replace his voice or creativity.
