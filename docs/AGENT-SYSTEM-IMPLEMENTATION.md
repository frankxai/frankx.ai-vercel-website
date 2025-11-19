# FrankX.ai Agent System - Technical Implementation Blueprint
**Date**: 2025-11-19
**Prerequisites**: Read `FRANKX-AI-COLLECTIVE-FOUNDATION.md` first
**Status**: READY TO BUILD

---

## ARCHITECTURE OVERVIEW

```
Frank (Orchestrator)
    ↓
n8n Automation Hub
    ↓
┌─────────────────────────────────────────────┐
│  5 Domain Agents (Autonomous)               │
│  - Newsletter Agent (Claude)                │
│  - Blog Agent (Multi-LLM)                   │
│  - Product Agent (Gemini)                   │
│  - Landing Page Agent (Claude)              │
│  - Funnel Agent (OpenAI)                    │
└─────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────┐
│  Infrastructure                             │
│  - Notion (Planning & Collaboration)        │
│  - GitHub (Version Control)                 │
│  - Vercel (Hosting & Analytics)             │
│  - ConvertKit (Email)                       │
│  - Nano Banana (Image Generation)           │
└─────────────────────────────────────────────┘
```

---

## FILE STRUCTURE

```
FrankX.AI - Vercel Website/
├── agents/
│   ├── config/
│   │   ├── newsletter-agent.json       # Newsletter Agent config
│   │   ├── blog-agent.json             # Blog Agent config
│   │   ├── product-agent.json          # Product Agent config
│   │   ├── landing-page-agent.json     # Landing Page Agent config
│   │   └── funnel-agent.json           # Funnel Agent config
│   ├── prompts/
│   │   ├── newsletter/
│   │   │   ├── draft-weekly.md         # Weekly newsletter prompt
│   │   │   ├── analyze-engagement.md   # Engagement analysis prompt
│   │   │   └── suggest-topics.md       # Topic suggestion prompt
│   │   ├── blog/
│   │   │   ├── daily-competition.md    # Daily LLM competition prompt
│   │   │   ├── meta-analysis.md        # Competition analysis prompt
│   │   │   └── quality-scoring.md      # Quality scoring criteria
│   │   ├── product/
│   │   │   ├── optimize-page.md        # Product page optimization
│   │   │   ├── analyze-conversion.md   # Conversion analysis
│   │   │   └── pricing-review.md       # Pricing review prompt
│   │   ├── landing-page/
│   │   │   ├── create-variation.md     # A/B test variation
│   │   │   ├── headline-test.md        # Headline testing
│   │   │   └── cta-optimization.md     # CTA optimization
│   │   └── funnel/
│   │       ├── analyze-dropoff.md      # Drop-off analysis
│   │       ├── sequence-optimization.md # Email sequence optimization
│   │       └── journey-mapping.md      # User journey mapping
│   └── logs/
│       ├── 2025-11-19-actions.json     # Daily agent action log
│       └── performance-metrics.json    # Performance tracking
├── n8n/
│   ├── workflows/
│   │   ├── daily-competition.json      # Daily blog competition
│   │   ├── newsletter-compile.json     # Weekly newsletter
│   │   ├── product-optimization.json   # Product page A/B tests
│   │   ├── landing-page-test.json      # Landing page variations
│   │   └── engagement-tracking.json    # Analytics collection
│   └── templates/
│       ├── llm-api-call.json           # Template for LLM API calls
│       ├── notion-sync.json            # Notion sync template
│       └── git-commit.json             # Auto-commit template
├── app/
│   ├── agents/
│   │   ├── page.tsx                    # Agents overview page
│   │   ├── [agentId]/
│   │   │   └── page.tsx                # Individual agent page
│   │   └── live-feed/
│   │       └── page.tsx                # Live agent activity feed
│   └── competition/
│       ├── page.tsx                    # Competition overview
│       ├── [date]/
│       │   └── page.tsx                # Daily competition page
│       └── leaderboard/
│           └── page.tsx                # Monthly leaderboard
└── lib/
    ├── agents/
    │   ├── types.ts                    # Agent type definitions
    │   ├── scheduler.ts                # Agent task scheduling
    │   └── quality-scorer.ts           # Content quality scoring
    └── llm/
        ├── providers.ts                # LLM provider configs
        ├── competition.ts              # Competition logic
        └── metrics.ts                  # Metrics collection
```

---

## AGENT CONFIGURATION SCHEMA

### Example: Newsletter Agent Config

**File**: `/agents/config/newsletter-agent.json`

```json
{
  "agentId": "newsletter-agent",
  "name": "Newsletter Agent",
  "domain": "Weekly newsletter creation and ConvertKit management",
  "llmProvider": "claude",
  "llmModel": "claude-sonnet-4.5",
  "autonomyLevel": 2,
  "capabilities": [
    "draft-newsletter",
    "analyze-engagement",
    "suggest-topics",
    "schedule-send",
    "track-opens"
  ],
  "schedule": {
    "draft": "Wednesday 09:00 PT",
    "review": "Wednesday 12:00 PT",
    "send": "Wednesday 15:00 PT"
  },
  "qualityThresholds": {
    "readabilityScore": 70,
    "engagementPrediction": 0.4
  },
  "notionDatabase": "newsletter-planning",
  "gitBranch": "newsletter-drafts",
  "permissions": {
    "createDrafts": true,
    "publishWithoutApproval": false,
    "modifyTemplates": true,
    "accessAnalytics": true
  }
}
```

---

## N8N WORKFLOW IMPLEMENTATION

### Workflow 1: Daily Blog Competition

**File**: `/n8n/workflows/daily-competition.json`

**Trigger**: Every day at 6:00 AM PT

**Steps**:
1. **Get Daily Topic**
   - Node: HTTP Request
   - Endpoint: `/api/agents/blog/get-topic`
   - Returns: `{ topic, category, targetAudience }`

2. **Generate Competition Prompt**
   - Node: Code
   - Input: Daily topic
   - Output: Standardized prompt for all LLMs

3. **Call 5 LLM APIs (Parallel)**
   - Node: HTTP Request (×5)
   - Endpoints:
     - `https://api.anthropic.com/v1/messages` (Claude)
     - `https://api.openai.com/v1/chat/completions` (OpenAI)
     - `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent` (Gemini)
     - `https://api.x.ai/v1/chat/completions` (xAI Grok)
     - `https://api.deepseek.com/v1/chat/completions` (DeepSeek)

4. **Format as Blog Posts**
   - Node: Code
   - Convert LLM outputs to MDX format
   - Add bylines and competition metadata
   - Generate slugs

5. **Score Quality**
   - Node: Code
   - Run quality scoring algorithm
   - Check threshold (70/100 minimum)
   - Flag low-quality posts

6. **Create Notion Entries**
   - Node: Notion API
   - Create entries in "FrankX Content Planning" database
   - Status: "Ready for Review" (if quality > 70)
   - Status: "Needs Revision" (if quality < 70)

7. **Notify Frank**
   - Node: Send Email / Slack
   - Summary of 5 posts
   - Quality scores
   - Link to review in Notion

8. **Auto-Publish After 24h** (if not vetoed)
   - Node: Wait (24 hours)
   - Check if Frank vetoed
   - If not vetoed, export to MDX
   - Git commit and push
   - Trigger Vercel deploy

**Error Handling**:
- If LLM API fails, retry 3x with exponential backoff
- If quality score fails, send to manual review
- If Git commit fails, alert Frank immediately

---

### Workflow 2: Evening Meta-Analysis

**File**: `/n8n/workflows/meta-analysis.json`

**Trigger**: Every day at 10:00 PM PT

**Steps**:
1. **Fetch Analytics**
   - Get Vercel Analytics data for today's posts
   - Metrics: views, time on page, scroll depth, social shares

2. **Calculate Winner**
   - Combine engagement metrics
   - Apply weighted scoring:
     - Views: 20%
     - Time on page: 30%
     - Scroll depth: 25%
     - Social shares: 25%

3. **Generate Meta-Post**
   - Use Claude to write comparison analysis
   - Include:
     - Today's topic
     - All 5 posts with summaries
     - Winning post and why
     - What we learned
     - Vote for your favorite (poll)

4. **Update Leaderboard**
   - Update monthly competition scores
   - Notion database: "LLM Competition Results"

5. **Publish & Share**
   - Export meta-post to MDX
   - Git commit
   - Share on social with competition results

---

### Workflow 3: Weekly Newsletter Compilation

**File**: `/n8n/workflows/newsletter-compile.json`

**Trigger**: Every Wednesday at 9:00 AM PT

**Steps**:
1. **Analyze Week's Content**
   - Fetch all blog posts from past 7 days
   - Get engagement metrics
   - Identify top performers

2. **Call Newsletter Agent (Claude)**
   - Prompt: `/agents/prompts/newsletter/draft-weekly.md`
   - Input: Top posts, metrics, Frank's notes
   - Output: Newsletter draft

3. **Create Notion Draft**
   - Database: "newsletter-planning"
   - Include: Subject line options, body, CTAs

4. **Notify Frank**
   - Slack: "Newsletter draft ready"
   - Link to Notion for review

5. **Send to ConvertKit** (after Frank approval)
   - ConvertKit API: Create broadcast
   - Schedule for 3:00 PM PT same day

---

## MCP INTEGRATION SETUP

### Add n8n MCP to Config

**File**: `/mnt/c/Users/Frank/FrankX/.mcp.json`

```json
{
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"]
  },
  "notion": {
    "url": "https://mcp.notion.com/mcp",
    "transport": "http"
  },
  "linear-server": {
    "url": "https://mcp.linear.app/sse",
    "transport": "sse"
  },
  "next-devtools": {
    "command": "npx",
    "args": ["-y", "next-devtools-mcp@latest"]
  },
  "n8n": {
    "url": "https://your-n8n-instance.com/webhook/mcp",
    "transport": "http",
    "env": {
      "N8N_API_KEY": "your-n8n-api-key"
    }
  }
}
```

### n8n MCP Functions

**Expose via webhooks**:

1. `trigger_workflow(workflowId: string, data?: object)`
   - Manually trigger any workflow
   - Used by Claude to run workflows on-demand

2. `get_workflow_status(workflowId: string)`
   - Check if workflow is running
   - Get last execution results

3. `list_workflows()`
   - View all available workflows
   - See schedules and statuses

4. `get_execution_history(workflowId: string, limit: number)`
   - View past executions
   - Debug failures

5. `update_workflow(workflowId: string, updates: object)`
   - Modify workflow logic
   - Change schedules

---

## NOTION DATABASE STRUCTURES

### Database 1: FrankX Content Planning

**Properties**:
- **Title** (Title): Post title
- **Status** (Select): Draft, Ready for Review, Approved, Published, Needs Revision
- **Agent** (Select): Newsletter, Blog, Product, Landing Page, Funnel
- **LLM** (Select): Claude, Gemini, OpenAI, xAI, DeepSeek
- **Competition Date** (Date): For daily competition posts
- **Quality Score** (Number): 0-100
- **Engagement** (Number): Views/time on page
- **Slug** (Text): URL slug
- **Published URL** (URL): Link to live post
- **Frank Notes** (Text): Frank's feedback
- **Created By Agent** (Checkbox): Auto-created vs manual
- **Category** (Multi-select): AI, Music, Systems, Personal, Tutorial

### Database 2: LLM Competition Results

**Properties**:
- **Date** (Date): Competition date
- **Topic** (Title): Daily topic
- **Winner** (Select): Claude, Gemini, OpenAI, xAI, DeepSeek
- **Claude Score** (Number): 0-100
- **Gemini Score** (Number): 0-100
- **OpenAI Score** (Number): 0-100
- **xAI Score** (Number): 0-100
- **DeepSeek Score** (Number): 0-100
- **Total Views** (Number): Combined views
- **Meta Post URL** (URL): Link to analysis
- **What We Learned** (Text): Key insights

### Database 3: Agent Performance Tracking

**Properties**:
- **Agent** (Title): Agent name
- **Week** (Date): Week starting
- **Tasks Completed** (Number): Total tasks
- **Tasks Failed** (Number): Failures
- **Success Rate** (Formula): Completed / (Completed + Failed)
- **Quality Avg** (Number): Average quality score
- **Frank Interventions** (Number): Times Frank had to step in
- **Autonomy Level** (Select): 1, 2, 3
- **Performance Notes** (Text): Weekly summary

---

## API ENDPOINTS TO BUILD

### 1. Agent Blog Topic Generator

**Endpoint**: `GET /api/agents/blog/get-topic`

**Response**:
```json
{
  "topic": "Building Autonomous AI Agents with n8n",
  "category": "AI Systems",
  "targetAudience": "Technical creators",
  "keywords": ["n8n", "automation", "AI agents", "workflows"],
  "competitionDate": "2025-11-19",
  "promptTemplate": "Write a comprehensive guide on [topic]..."
}
```

### 2. Quality Scorer

**Endpoint**: `POST /api/agents/quality-score`

**Body**:
```json
{
  "content": "Full blog post content...",
  "metadata": {
    "llm": "claude",
    "topic": "n8n automation"
  }
}
```

**Response**:
```json
{
  "score": 85,
  "breakdown": {
    "readability": 80,
    "technicalAccuracy": 90,
    "actionability": 85,
    "examples": 90,
    "structure": 80
  },
  "meetsThreshold": true,
  "suggestions": [
    "Add more concrete examples",
    "Include code snippets"
  ]
}
```

### 3. Competition Leaderboard

**Endpoint**: `GET /api/competition/leaderboard?month=2025-11`

**Response**:
```json
{
  "month": "2025-11",
  "rankings": [
    {
      "llm": "claude",
      "wins": 12,
      "avgScore": 87,
      "totalPosts": 30,
      "winRate": 0.4
    },
    {
      "llm": "gemini",
      "wins": 10,
      "avgScore": 85,
      "totalPosts": 30,
      "winRate": 0.33
    }
  ],
  "stats": {
    "totalCompetitions": 30,
    "avgQuality": 84,
    "totalViews": 45000
  }
}
```

### 4. Agent Activity Feed

**Endpoint**: `GET /api/agents/activity?limit=20`

**Response**:
```json
{
  "activities": [
    {
      "timestamp": "2025-11-19T14:30:00Z",
      "agent": "blog-agent",
      "action": "published_post",
      "details": {
        "title": "Building Autonomous AI Agents",
        "llm": "claude",
        "url": "/blog/building-autonomous-ai-agents",
        "competitionDate": "2025-11-19"
      }
    },
    {
      "timestamp": "2025-11-19T14:15:00Z",
      "agent": "landing-page-agent",
      "action": "optimized_conversion",
      "details": {
        "page": "/products/vibe-os",
        "improvement": "+12% conversion",
        "variation": "Headline test B"
      }
    }
  ]
}
```

---

## QUALITY SCORING ALGORITHM

### Content Quality Dimensions

**1. Readability (0-100)**
- Flesch Reading Ease score
- Average sentence length
- Paragraph structure
- Use of subheadings

**2. Technical Accuracy (0-100)**
- Fact-checking against known sources
- Code examples validity (if applicable)
- Citations and references
- Consistency with Frank's documented knowledge

**3. Actionability (0-100)**
- Number of concrete examples
- Step-by-step instructions
- Downloadable resources mentioned
- Clear next steps

**4. Structure (0-100)**
- Introduction clarity
- Logical flow
- Conclusion strength
- Use of formatting (bold, lists, code blocks)

**5. Engagement Potential (0-100)**
- Hook strength
- Storytelling elements
- Questions posed
- Call-to-action clarity

**Overall Score**: Weighted average
- Readability: 20%
- Technical Accuracy: 25%
- Actionability: 25%
- Structure: 15%
- Engagement Potential: 15%

**Threshold**: 70/100 to publish

---

## GITHUB AUTOMATION

### Auto-Commit from Agents

**Workflow**: When agent publishes content

1. Agent exports to MDX file
2. Git commands via MCP:
   ```bash
   git add content/blog/{slug}.mdx
   git commit -m "🤖 Blog Agent (Claude): {title}

   Competition: {date}
   Quality Score: {score}/100
   Auto-published after 24h review period"
   git push origin main
   ```

3. Vercel auto-deploys

**Commit Message Template**:
```
🤖 {Agent Name} ({LLM}): {Action}

{Details}
- Domain: {domain}
- Autonomy Level: {level}
- Quality Score: {score}/100
- Approval: {auto/manual}

[View in Notion]({notion-url})
```

---

## DEPLOYMENT CHECKLIST

### Phase 1: Infrastructure Setup
- [ ] Configure n8n MCP in `.mcp.json`
- [ ] Create Notion databases (3 databases)
- [ ] Set up agent config files (5 configs)
- [ ] Create agent prompt templates (15 prompts)
- [ ] Build API endpoints (4 endpoints)

### Phase 2: Workflow Development
- [ ] n8n: Daily blog competition workflow
- [ ] n8n: Evening meta-analysis workflow
- [ ] n8n: Weekly newsletter workflow
- [ ] n8n: Product optimization workflow
- [ ] n8n: Engagement tracking workflow

### Phase 3: Frontend Development
- [ ] `/agents` overview page
- [ ] `/agents/[agentId]` individual agent pages
- [ ] `/competition` daily competition page
- [ ] `/competition/leaderboard` monthly rankings
- [ ] Live agent activity feed component

### Phase 4: Testing
- [ ] Run 1-day test competition (5 LLMs)
- [ ] Verify quality scoring works
- [ ] Test auto-publishing after 24h
- [ ] Verify Git commits automated
- [ ] Check Vercel deployments

### Phase 5: Launch
- [ ] Update homepage with new hero message
- [ ] Add "Meet the Agents" section
- [ ] Enable all daily workflows
- [ ] Announce to community
- [ ] Monitor first week closely

---

## MONITORING & ALERTS

### Daily Health Checks

**Alert Frank if**:
- Any LLM API fails to respond in competition
- Quality scores below 70 for >50% of posts
- Git commit fails
- Vercel deployment fails
- Agent makes unauthorized change (security breach)
- Newsletter draft not ready by noon Wednesday
- Competition meta-post not published by 11 PM

**Dashboard Metrics** (Notion or custom):
- Agent success rate (by agent, by day)
- LLM competition standings
- Content quality trends
- Engagement metrics
- Frank's intervention rate
- Infrastructure uptime

---

*This implementation blueprint provides everything needed to build the FrankX.ai autonomous agent system. Start with Phase 1 and build incrementally.*
