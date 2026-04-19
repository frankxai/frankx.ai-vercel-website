# n8n -- The Automation Layer

Automation is the multiplier that turns a one-person operation into what feels like a team. Without automation, every action requires manual intervention: publish a blog post, then manually write social media threads, then manually format a newsletter snippet, then manually email subscribers, then manually check if anyone downloaded anything. With automation, you publish the post and the infrastructure handles the rest.

n8n is the orchestration engine for frankx.ai. It is an open-source workflow automation platform, self-hosted on Railway for approximately $7 per month. It runs 25 active workflows that handle content distribution, email sequences, intelligence gathering, catalog synchronization, and operational reporting.

This chapter covers the architecture, the real workflows, the webhook patterns, and the hard-won lessons that prevent you from spending three hours debugging why your workflow silently stopped firing.

---

## I. Why n8n Over Zapier

The decision to use n8n over Zapier, Make, or any other automation platform came down to three factors.

**Cost.** Zapier's equivalent plan for 25 active workflows with webhook triggers costs $50-100 per month. n8n self-hosted costs the price of a Railway container: approximately $7 per month based on actual compute usage. Over a year, this saves $500-1,100.

**Control.** n8n is self-hosted, which means the workflow definitions, execution logs, and credentials live on infrastructure you control. There is no vendor lock-in. If Railway doubles their prices tomorrow, you can move the n8n container to any Docker host in an afternoon. The workflow JSON exports are portable.

**Flexibility.** n8n allows arbitrary JavaScript code in Function nodes, direct HTTP requests to any API, and custom webhook endpoints. Zapier's equivalent features require premium plans and have execution time limits that can break complex workflows.

The trade-off is operational overhead. With Zapier, you never think about uptime, updates, or container health. With self-hosted n8n, you are responsible for keeping it running. In practice, Railway handles this well -- the container auto-restarts on failure, and n8n has been stable enough that manual intervention has been needed fewer than five times in six months of operation.

---

## II. n8n on Railway

Railway is a cloud platform that runs Docker containers with usage-based billing. The n8n deployment is a single container with the following configuration:

| Setting               | Value                                    |
|-----------------------|------------------------------------------|
| Image                 | `n8nio/n8n:latest`                       |
| Memory                | ~512MB average                           |
| Storage               | Persistent volume for SQLite database    |
| Port                  | 5678 (internal), public URL via Railway  |
| Cost                  | ~$7/month based on actual compute usage  |

Key environment variables:

```
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=[redacted]
N8N_TRUST_PROXY=true
WEBHOOK_URL=https://[railway-url].railway.app
```

The `N8N_TRUST_PROXY=true` variable is critical when running behind Railway's reverse proxy. Without it, n8n cannot correctly determine the external URL for webhooks, causing webhook registration to fail silently.

---

## III. The 25 Active Workflows

The workflows fall into five categories. Each workflow is identified by an internal ID and triggered by either a schedule (cron), a webhook, or a manual trigger.

### Content Distribution (4 workflows)

**Content Atomizer** (`X5qZYPNayRMspuYX`)
- Trigger: Webhook at `/atomize`
- Input: Blog post URL or content payload
- Process: AI (Gemini Flash Lite) breaks the article into a Twitter/X thread (4-6 tweets), a LinkedIn post, and a newsletter snippet
- Output: All three formats posted to Slack #content channel for review
- Cost per execution: ~$0.001 (Gemini Flash Lite token cost)

This workflow is the most valuable single automation in the stack. Writing a 3,000-word blog post takes 2-3 hours. The Content Atomizer turns it into three distribution formats in under 10 seconds. Without it, repurposing a blog post for social media would take an additional 30-60 minutes of manual writing.

**Newsletter Engine** (webhook-triggered)
- Trigger: Webhook from Mega Orchestrator or manual
- Input: Content index from frankx.ai
- Process: Formats latest content into newsletter template, sends via Resend
- Output: Newsletter delivered to subscriber list

**RSS Monitor** (daily schedule)
- Trigger: Cron, daily at 9 AM UTC
- Input: RSS feeds from competitor blogs, industry publications, AI research
- Process: Checks for new posts, filters by relevance keywords
- Output: Summary posted to Slack with links and key takeaways

**Content Studio Trigger** (webhook)
- Trigger: Called from frankx.ai `/api/content-studio/trigger` route
- Process: Coordinates content creation and publishing pipeline
- Output: Status updates back to the content studio dashboard

### Email Automation (2 workflows)

**Email Nurture Sequence** (webhook-triggered)
- Trigger: Webhook from frankx.ai signup forms
- Input: Email address, signup source, lead magnet requested
- Process: Calls frankx.ai `/api/welcome-sequence` endpoint on a 3-day cadence
- Emails sent:
  - Day 0: PDF delivery + welcome message
  - Day 3: Follow-up with related content
  - Day 7: Value-driven engagement + community invitation

**Coaching Application Notifier** (webhook)
- Trigger: Called when `/api/coaching-apply` receives a submission
- Process: Formats application data, sends notification to personal channel
- Output: Slack notification with applicant details

### Intelligence Gathering (4 workflows)

**Morning Brief** (daily schedule, 7 AM UTC)
- Trigger: Cron
- Process: Aggregates AI news, tech headlines, and creator economy updates
- Output: Formatted intelligence report delivered to Slack

**Strategic Brief** (weekly schedule, Monday 8 AM UTC)
- Trigger: Cron
- Process: Deeper analysis of weekly trends, competitive landscape
- Output: Strategic summary with recommended actions

**Intelligence Hub** (webhook-triggered)
- Trigger: Manual or scheduled
- Process: Runs targeted intelligence queries on specific topics
- Output: Research summaries posted to designated channels

**CoinGecko Pulse** (daily schedule)
- Trigger: Cron, daily at 8 AM UTC
- Process: Fetches crypto market data from CoinGecko API
- Output: Market summary for personal portfolio monitoring

### Operational (3 workflows)

**Mega Orchestrator** (webhook + schedule)
- Trigger: Multiple routes via webhook parameter
- Routes: CONTENT, NEWSLETTER, INTELLIGENCE, REPORT
- Process: Central dispatcher that calls other workflows based on the requested operation
- This is the master workflow that coordinates cross-workflow operations

**ACOS Skills Monitor** (weekly schedule)
- Trigger: Cron, weekly
- Process: Checks for updates to ACOS skill repositories
- Output: Summary of new or updated skills

**Music Catalog Sync** (`AEalmmG7xGSmq6Wh`, daily at 8 AM UTC)
- Trigger: Cron + webhook at `/music-sync`
- Process: Checks Suno catalog for new tracks, updates `data/inventories/frankx/music.json`
- Output: New track notifications, inventory update

### Infrastructure (2+ workflows)

Various monitoring, health check, and maintenance workflows that keep the system running and report anomalies.

---

## IV. Webhook Architecture

Webhooks are the primary integration pattern between frankx.ai and n8n. The architecture is bidirectional: Next.js API routes call n8n webhooks, and n8n workflows call Next.js API routes.

### Next.js to n8n

When a user action on the website needs to trigger an automation, the API route sends an HTTP POST to the n8n webhook URL:

```typescript
// app/api/content-studio/trigger/route.ts
export async function POST(request: NextRequest) {
  const { action, payload } = await request.json()

  // Trigger n8n workflow
  const response = await fetch(
    `${process.env.N8N_WEBHOOK_URL}/atomize`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, payload }),
    }
  )

  return NextResponse.json({ triggered: true })
}
```

The n8n webhook URL is stored as an environment variable. The API route fires and forgets -- it does not wait for the n8n workflow to complete. This is important because n8n workflows can take 10-30 seconds to execute (especially when calling AI APIs), and you do not want to hold the HTTP connection open that long.

### n8n to Next.js

When an n8n workflow needs to interact with the website's data or APIs, it calls the Next.js API routes:

```
n8n HTTP Request Node:
  URL: https://frankx.ai/api/welcome-sequence
  Method: POST
  Body: { email, step: 1, source: "n8n-nurture" }
  Headers: { Authorization: "Bearer ${ADMIN_SECRET}" }
```

This bidirectional pattern means the website and the automation layer are loosely coupled. Either system can be updated independently. If you replace n8n with a different automation tool, the Next.js API routes do not change. If you rebuild the website on a different framework, the n8n workflows just need new webhook URLs.

---

## V. The Content Atomizer in Detail

This is the most instructive workflow to examine in detail because it demonstrates the full pattern: webhook trigger, AI processing, multi-channel output, and human review.

### Workflow Nodes (6 total)

1. **Webhook** -- Receives POST request at `/atomize` with blog post content
2. **Extract Content** -- Parses the incoming payload, extracts title, body, URL
3. **AI Atomize (Gemini Flash Lite)** -- Sends content to Gemini with a structured prompt:
   - "Create a 4-6 tweet thread summarizing this article. First tweet must hook. Last tweet must link."
   - "Create a LinkedIn post (150-250 words) with a professional angle."
   - "Create a newsletter snippet (2-3 sentences) with a read-more link."
4. **Format Output** -- Structures the AI response into three separate outputs
5. **Post to Slack** -- Sends all three formats to the #content channel for review
6. **Respond** -- Returns 200 OK to the webhook caller

### Why Gemini, Not Claude

The Content Atomizer uses Gemini Flash Lite for atomization, not Claude. This is a deliberate architectural decision. Claude Code handles the original content creation -- writing the blog post, editing it, optimizing for SEO. But the atomization step (breaking existing content into smaller formats) is a simpler task that does not require Claude's reasoning capabilities. Gemini Flash Lite is fast, cheap (fractions of a cent per call), and good enough for repurposing tasks.

This principle -- use the right model for the right task -- applies throughout the stack. Claude for creation and reasoning. Gemini for transformation and image generation. The expensive model does the hard work. The cheap model does the routine work.

### Why Slack Review

The workflow posts to Slack instead of automatically publishing to social media. This is intentional. AI-generated social content is good enough to save 90% of the writing time, but it is not good enough to publish without review. The human-in-the-loop step takes 30 seconds: read the thread, fix any awkward phrasing, approve or edit, then manually post.

This is the correct automation boundary. Automate the generation. Keep the judgment human.

---

## VI. Webhook Lessons Learned

These lessons cost hours of debugging each. They are documented here so they cost you minutes of reading instead.

### Lesson 1: Always Set httpMethod Explicitly

When creating a Webhook node in n8n, always set the `httpMethod` property to `POST` explicitly. The default behavior can vary between n8n versions, and some webhook triggers silently accept GET requests but lose the POST body. This manifests as workflows that trigger but receive empty data.

### Lesson 2: Always Include webhookId

Every Webhook node should have a `webhookId` property in its configuration. Without it, n8n generates a random ID on workflow activation, which changes every time the workflow is deactivated and reactivated. This means any external service calling the webhook URL will break after a reactivation.

Set the `webhookId` to a stable value:

```json
{
  "webhookId": "content-atomizer-main",
  "httpMethod": "POST",
  "path": "atomize"
}
```

### Lesson 3: Deactivate and Reactivate After Updates

When you modify a workflow that uses webhooks, you must deactivate and reactivate the workflow for the webhook to re-register with n8n's internal router. Simply saving the workflow is not sufficient. The webhook endpoint will continue serving the old version until the workflow is toggled.

This is the single most common cause of "I updated my workflow but nothing changed." The fix is always: deactivate, wait 2 seconds, reactivate.

### Lesson 4: Railway URL Stability

Railway assigns a public URL to each service. This URL is stable as long as the service exists, but it changes if you delete and recreate the service. Store the n8n webhook base URL as an environment variable in Vercel:

```
N8N_WEBHOOK_URL=https://your-service.railway.app/webhook
```

If you ever need to migrate n8n to a different host, you update one environment variable instead of modifying every API route that calls n8n.

---

## VII. The n8n MCP Server

Claude Code can create, modify, and manage n8n workflows through the n8n MCP server. This is how new workflows get built: instead of clicking through the n8n visual editor, you describe the workflow in natural language and Claude Code translates it into n8n's workflow JSON format.

Available MCP tools:

| Tool                       | Purpose                                |
|----------------------------|----------------------------------------|
| `n8n_list_workflows`       | List all workflows with status         |
| `n8n_get_workflow`         | Get workflow definition and nodes      |
| `n8n_create_workflow`      | Create new workflow from JSON          |
| `n8n_update_full_workflow`  | Replace entire workflow definition     |
| `n8n_update_partial_workflow` | Update specific nodes                |
| `n8n_test_workflow`        | Execute workflow with test data        |
| `n8n_validate_workflow`    | Check workflow for configuration errors|
| `n8n_executions`           | View recent execution logs             |
| `n8n_health_check`         | Verify n8n instance is running         |
| `n8n_autofix_workflow`     | Attempt automatic error resolution     |

The typical workflow creation process:

1. Describe the desired workflow in conversation: "Create a workflow that triggers daily at 8 AM, fetches the latest blog posts from the RSS feed, and posts a summary to Slack."
2. Claude Code generates the workflow JSON with the correct node types, connections, and configuration.
3. The `n8n_create_workflow` tool uploads the workflow to the n8n instance.
4. The `n8n_test_workflow` tool runs it with sample data to verify it works.
5. The workflow is activated.

This means the entire automation layer is managed from the same terminal where code is written and content is created. There is no context-switching to a separate automation platform UI.

---

## VIII. Workflow Design Principles

After building and maintaining 25 workflows over six months, these principles have emerged:

**One workflow, one responsibility.** Each workflow does one thing. The Content Atomizer atomizes content. The Email Nurture sends emails. The Morning Brief delivers intelligence. This makes debugging straightforward: if social media content is wrong, you look at the Content Atomizer. If emails are not sending, you look at the Email Nurture.

**Webhooks over polling.** When possible, trigger workflows with webhooks instead of polling schedules. Webhooks execute immediately when an event occurs. Polling introduces latency (up to the full polling interval) and wastes compute on checks that find nothing new.

**Slack as the review layer.** Every workflow that generates content for external publication routes through Slack first. This provides a review opportunity, an audit trail, and a notification channel in one step.

**Idempotent operations.** Every workflow should be safe to run twice. If the Content Atomizer processes the same blog post twice, it should not create duplicate social media content. This is achieved by checking for existing content before creating new entries, or by designing outputs that naturally deduplicate (posting to Slack is harmless if duplicated; publishing to social media is not).

**Error notifications.** Every workflow has an error handler that posts to a dedicated Slack channel. Silent failures are the most dangerous failures. If a workflow breaks at 3 AM, you should know about it at 8 AM, not three weeks later when you notice the newsletter has not been sent.

---

## IX. Cost Breakdown

| Component       | Monthly Cost | Annual Cost | Equivalent SaaS       |
|-----------------|-------------|-------------|----------------------|
| Railway compute | ~$7         | ~$84        | -                    |
| n8n license     | $0 (open source) | $0     | Zapier: $600-1,200/yr |
| AI API calls    | ~$2         | ~$24        | -                    |
| Slack (free)    | $0          | $0          | -                    |
| **Total**       | **~$9**     | **~$108**   | **$600-1,200**       |

The entire automation layer -- 25 workflows, daily intelligence reports, content atomization, email sequences, catalog synchronization -- costs less than two months of a basic Zapier plan.
