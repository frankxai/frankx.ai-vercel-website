# Google Analytics 4 & Search Console Setup Guide for FrankX & Agents

This guide explains how to connect Google Analytics 4 (GA4) and Google Search Console (GSC) to the FrankX platform and the Starlight autonomous agent fleet (Hermes, Claude Code, Codex, Antigravity, Kilo).

---

## Architecture Overview

```
Google Cloud (GCP)
  ├── Google Analytics Data API (GA4)
  └── Google Search Console API (GSC)
         │
         ▼  (Service Account RS256 JWT Auth)
┌──────────────────────────────────────────────────────────────┐
│ FrankX Observability Engine (lib/observability/)             │
│                                                              │
│  ├── Human Dashboard UI (/admin/analytics)                  │
│  ├── Machine API Endpoints (/api/admin/observability/*)     │
│  ├── Agent CLI (pnpm run analytics:summary)                 │
│  └── Agent MCP Server (starlight-observability)              │
└──────────────────────────────────────────────────────────────┘
         │
         ▼
Autonomous Agents (Hermes, Claude, Codex, Kilo, Antigravity)
```

> [!NOTE]
> The system includes high-fidelity simulation fallbacks. If GCP credentials are not yet configured, all dashboards, APIs, CLI commands, and MCP tools will function immediately using realistic data marked `isSimulated: true`.

---

## Step 1: Create a Google Cloud Service Account

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Select your project (or create one named `FrankX-Intelligence`).
3. Navigate to **IAM & Admin** → **Service Accounts**.
4. Click **Create Service Account**:
   - **Service account name**: `frankx-observability-agent`
   - **Service account ID**: `frankx-observability-agent`
   - Description: `Agentic access for GA4, GSC, and SEO intelligence`
5. Click **Done** (no project-level IAM roles are required; permissions are granted directly inside GA4 and Search Console).
6. Click on your new service account → **Keys** tab → **Add Key** → **Create new key** → select **JSON**.
7. Download the `.json` file securely.

---

## Step 2: Enable Google APIs in Google Cloud

In the Google Cloud Console, navigate to **APIs & Services** → **Library** and enable:
1. **Google Search Console API** (or *Search Console API* / *Webmasters API*)
2. **Google Analytics Data API** (v1beta)
3. *(Optional)* **Web Search Indexing API** (for instant URL indexing submissions)

---

## Step 3: Grant Access in Search Console and GA4

### A. Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console).
2. Select your property (`frankx.ai` or `sc-domain:frankx.ai`).
3. In the left sidebar, click **Settings** (bottom) → **Users and permissions**.
4. Click **Add User**:
   - **Email address**: Paste the service account email (e.g. `frankx-observability-agent@<project-id>.iam.gserviceaccount.com`).
   - **Permission**: **Full** (or **Restricted / Read** for read-only access).
5. Click **Add**.

### B. Google Analytics 4 (GA4)
1. Go to [Google Analytics](https://analytics.google.com/).
2. Click the gear icon (**Admin**) at the bottom-left.
3. Under **Property**, click **Property Access Management**.
4. Click the blue **+** button → **Add users**:
   - **Email address**: Paste the service account email.
   - **Role**: **Viewer** (or **Analyst**).
5. Note your **Property ID** (displayed under Property Details, e.g. `13609240621`).

---

## Step 4: Configure Credentials in FrankX

Choose either of the two methods below:

### Option A: Place the JSON Key in `private/` (Recommended)
Rename your downloaded JSON file to `google-credentials.json` and place it in:
```
C:\Users\frank\starlight\repos\frankx.ai-vercel-website\private\google-credentials.json
```
*(This path is already in `.gitignore` and protected from accidental commits).*

### Option B: Environment Variables in `.env.local`
Alternatively, add the following to `C:\Users\frank\starlight\repos\frankx.ai-vercel-website\.env.local`:
```bash
# GA4 & Search Console Agent Access
GA4_PROPERTY_ID=13609240621
GOOGLE_SEARCH_CONSOLE_SITE_URL=sc-domain:frankx.ai
GOOGLE_CLIENT_EMAIL=frankx-observability-agent@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

---

## How Agents and You Use the Data

### 1. Visual Web Dashboard
Visit:
```
https://frankx.ai/admin/analytics
```
Features:
- Real-time active users (pulsing indicator).
- Top Google Search queries with Clicks, Impressions, CTR, and Position.
- Keyword Opportunities radar highlighting queries ranking 5–20 with high impressions.
- Interactive Google Index Inspector.
- Daily traffic velocity charts.
- "Copy Agent Brief" button.

### 2. Terminal CLI Commands for Agents
Any agent or script can run:
```bash
# Full executive briefing in Markdown (ready for LLM context or weekly reports)
pnpm run analytics:summary

# Keyword opportunities analysis
pnpm run analytics:opportunities

# Search Console queries
pnpm run analytics:gsc --days=28

# GA4 Traffic and Landing Pages
pnpm run analytics:ga4 --days=30

# Inspect any URL indexing status
pnpm run analytics:inspect https://frankx.ai/blog/08-golden-age-of-intelligence

# Raw JSON output for script piping
node scripts/observability/analytics-cli.mjs --json
```

### 3. Agent MCP Server (`starlight-observability`)
Registered in `.mcp.json`. Agents can invoke:
- `get_analytics_summary({ days })`
- `get_search_queries({ days, limit })`
- `get_keyword_opportunities({ days })`
- `inspect_url_indexing({ url })`
- `get_realtime_traffic()`

### 4. HTTP Endpoints
- `GET /api/admin/observability/summary`: Unified JSON metrics
- `GET /api/admin/observability/summary?format=markdown`: Formatted Markdown report
- `GET /api/admin/observability/search-console`: GSC metrics
- `GET /api/admin/observability/analytics`: GA4 metrics
- `POST /api/admin/observability/inspect`: Indexing inspection body `{ "url": "..." }`
