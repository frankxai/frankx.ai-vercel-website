# Available MCP Servers - FrankX Ecosystem

**Date**: 2025-11-07
**Status**: ✅ CONFIGURED AND READY TO USE

---

## 🎉 Discovery

All critical MCPs for high-end website development are **ALREADY CONFIGURED**!

Found in:
- `/mnt/c/Users/Frank/FrankX/.mcp.json` (FrankX project-level)
- `/mnt/c/Users/Frank/.claude/claude_desktop_config.json` (Global Claude)
- `/mnt/c/Users/Frank/.cursor/mcp.json` (Cursor IDE)

---

## ✅ Available MCP Servers

### 1. **GitHub MCP** (2 instances configured!)

**Source 1**: `/mnt/c/Users/Frank/FrankX/.mcp.json`
```json
{
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"]
  }
}
```

**Source 2**: `/mnt/c/Users/Frank/.claude/claude_desktop_config.json`
```json
{
  "github-server": {
    "command": "node",
    "args": ["C:\\Users\\Frank\\Content Magic\\github-server\\build\\index.js"]
  }
}
```

**Available Tools** (prefix: `mcp__github__*`):
- `mcp__github__create_pull_request` - Create PRs with descriptions
- `mcp__github__merge_pull_request` - Merge approved PRs
- `mcp__github__push_files` - Push changes to repo
- `mcp__github__get_repository` - Get repo info
- `mcp__github__search_issues` - Find issues/PRs
- `mcp__github__create_branch` - Create feature branches
- And more...

**Permission**: Ask before using (safety check in settings.json:64-76)

---

### 2. **Notion MCP** (2 instances configured!)

**Source 1**: `/mnt/c/Users/Frank/FrankX/.mcp.json`
```json
{
  "notion": {
    "url": "https://mcp.notion.com/mcp",
    "transport": "http"
  }
}
```

**Source 2**: `/mnt/c/Users/Frank/.cursor/mcp.json`
```json
{
  "Notion": {
    "url": "https://mcp.notion.com/mcp"
  }
}
```

**Purpose**: Project documentation, weekly recaps, content planning

**Available Tools** (prefix: `mcp__notion__*`):
- `mcp__notion__query_database` - Query Notion databases
- `mcp__notion__create_page` - Create new pages
- `mcp__notion__update_page` - Update existing pages
- `mcp__notion__search` - Search across workspace
- And more...

---

### 3. **Linear MCP** ✅

**Source**: `/mnt/c/Users/Frank/FrankX/.mcp.json`
```json
{
  "linear-server": {
    "url": "https://mcp.linear.app/sse",
    "transport": "sse"
  }
}
```

**Purpose**: Project management, task tracking, sprint planning

**Available Tools** (prefix: `mcp__linear__*`):
- `mcp__linear__create_issue` - Create tasks
- `mcp__linear__update_issue` - Update tasks
- `mcp__linear__search_issues` - Find issues
- `mcp__linear__get_project` - Get project info
- And more...

---

### 4. **Nano Banana MCP** ✅

**Source**: `/mnt/c/Users/Frank/.claude/claude_desktop_config.json`
```json
{
  "nano-banana": {
    "command": "node",
    "args": ["C:\\Users\\Frank\\MCP Server\\Nano banana\\nano-banana-mcp\\dist\\index.js"],
    "env": {
      "GEMINI_API_KEY": "***"
    }
  }
}
```

**Purpose**: AI image generation

**Available Tools** (already using!):
- `mcp__nano-banana__generate_image` ✅ Auto-approved
- `mcp__nano-banana__get_configuration_status` ✅ Auto-approved

---

### 5. **Next.js DevTools MCP** ✅

**Source**: `/mnt/c/Users/Frank/FrankX/.mcp.json`
```json
{
  "next-devtools": {
    "command": "npx",
    "args": ["-y", "next-devtools-mcp@latest"]
  }
}
```

**Purpose**: Next.js development tools - runtime errors, logs, page metadata

**Available Tools** (prefix: `mcp__next-devtools__*`):
- Runtime error detection
- Development logs
- Page metadata analysis
- Build diagnostics

---

## ❌ Missing (But Were in My Setup Guide)

### Playwright MCP
**Status**: NOT configured
**Why We Don't Have It**: Not in any config files found
**Impact**: Can't take automated screenshots

**Alternative Solutions**:
1. Use `playwright-python` via bash
2. Use online screenshot services
3. Take manual screenshots
4. Install Playwright MCP manually:
   ```bash
   npx @modelcontextprotocol/server-playwright
   ```

### Vercel MCP
**Status**: NOT configured
**Why We Don't Have It**: Not in any config files found
**Impact**: Can't access Vercel analytics programmatically

**Alternative Solutions**:
1. Use Vercel CLI via bash: `vercel logs`, `vercel inspect`
2. Access Vercel dashboard manually
3. Install Vercel MCP manually (if exists):
   ```bash
   npx @modelcontextprotocol/server-vercel
   ```

---

## 🎯 How to Use MCPs in Claude Code

### Tool Naming Pattern
```
mcp__[server-name]__[tool-name]
```

### Examples

**GitHub**:
```typescript
// Create PR
mcp__github__create_pull_request({
  owner: "frankxai",
  repo: "frankx.ai-vercel-website",
  title: "✨ Improve homepage hero",
  body: "Description with screenshots...",
  head: "feature/hero-improvements",
  base: "v3"
})
```

**Notion**:
```typescript
// Create page in documentation
mcp__notion__create_page({
  parent: "database_id",
  properties: {
    "Title": "Session 3 Notes",
    "Status": "In Progress"
  },
  content: "Session details..."
})
```

**Linear**:
```typescript
// Create task
mcp__linear__create_issue({
  teamId: "frankx-team-id",
  title: "Implement 301 redirects",
  description: "Based on DUPLICATE_PAGES_CONSOLIDATION.md",
  priority: 1
})
```

**Nano Banana**:
```typescript
// Generate image (already working!)
mcp__nano-banana__generate_image({
  prompt: "Hero image for AI tools website",
  model: "imagen-3.0-generate-001"
})
```

**Next.js DevTools**:
```typescript
// Check Next.js runtime
mcp__next-devtools__get_runtime_info({
  projectPath: "/mnt/c/Users/Frank/FrankX/FrankX.AI - Vercel Website"
})
```

---

## 📋 Permission Requirements

From `~/.claude/settings.json`:

**Require Confirmation** (lines 58-76):
- ⚠️ `mcp__slack__slack_post_message` - Ask before posting
- ⚠️ `mcp__github__create_pull_request` - Ask before creating PR
- ⚠️ `mcp__github__merge_pull_request` - Ask before merging
- ⚠️ `mcp__github__push_files` - Ask before pushing

**Auto-Approved** (line 27):
- ✅ `mcp__*` - All other MCP tools allowed by default

---

## 🚀 Immediate Action Items

### For Website Development

**Can Do NOW** (MCPs available):
1. ✅ Use **GitHub MCP** to create proper PRs
2. ✅ Use **Notion MCP** to update project docs
3. ✅ Use **Linear MCP** to track tasks
4. ✅ Use **Nano Banana MCP** for mockup images
5. ✅ Use **Next.js DevTools MCP** for debugging

**Cannot Do** (MCPs not configured):
1. ❌ Playwright screenshots (need manual install)
2. ❌ Vercel analytics/deployment (need manual access or MCP)

**Workarounds**:
- Screenshots: Use browser DevTools or online services
- Vercel: Use CLI or dashboard manually
- Or: Install Playwright MCP (5 minute setup)

---

## 🎨 Updated Workflow (Using Available MCPs)

### Phase 1: BEFORE Changes
```typescript
// ✅ CAN DO: Check GitHub repo state
mcp__github__get_repository({ owner: "frankxai", repo: "frankx.ai-vercel-website" })

// ✅ CAN DO: Check existing issues
mcp__github__search_issues({ query: "label:ux is:open" })

// ❌ CANNOT: Automated screenshots (need Playwright MCP or manual)
// Workaround: Take manual screenshots or use bash playwright-python

// ❌ CANNOT: Vercel analytics (need Vercel MCP or manual)
// Workaround: Check Vercel dashboard manually or use CLI
```

### Phase 2: DURING Development
```typescript
// ✅ CAN DO: Create feature branch
mcp__github__create_branch({
  owner: "frankxai",
  repo: "frankx.ai-vercel-website",
  branch: "feature/2025-11-07-improvements",
  from: "v3"
})

// ✅ CAN DO: Track in Linear
mcp__linear__create_issue({
  title: "Implement homepage improvements",
  description: "Session 3 changes"
})

// Make code changes as usual
// Commit changes as usual
```

### Phase 3: AFTER Changes
```typescript
// ❌ CANNOT: Automated after screenshots
// Workaround: Manual screenshots

// ✅ CAN DO: Create PR with GitHub MCP
mcp__github__create_pull_request({
  owner: "frankxai",
  repo: "frankx.ai-vercel-website",
  title: "✨ Session 3 improvements",
  body: "## Changes\n- Homepage hero\n\n[Manual screenshots attached]",
  head: "feature/2025-11-07-improvements",
  base: "v3"
})
```

### Phase 4: REVIEW & DOCUMENT
```typescript
// ✅ CAN DO: Update Notion docs
mcp__notion__create_page({
  parent: "session-log-database",
  properties: {
    "Title": "Session 3 - High-End Workflow",
    "Date": "2025-11-07"
  }
})

// ✅ CAN DO: Update Linear task
mcp__linear__update_issue({
  issueId: "task-id",
  status: "Done",
  comment: "Completed with GitHub PR #XX"
})
```

---

## 🎓 Key Learnings

### Why I Didn't Use MCPs in Sessions 1-2
1. **Wasn't aware they existed** - Didn't check for available MCPs
2. **Didn't know naming pattern** - MCP tools use `mcp__[server]__[tool]` prefix
3. **Assumed they needed setup** - They were already configured!

### What Changed
- ✅ Now aware of 5 available MCP servers
- ✅ Understand permission model (auto-approve vs ask)
- ✅ Know tool naming convention
- ✅ Can use GitHub, Notion, Linear, Nano Banana, Next.js DevTools

### Gap Analysis
**Have**: GitHub, Notion, Linear, Nano Banana, Next.js DevTools
**Missing**: Playwright (screenshots), Vercel (analytics)
**Impact**: 80% of workflow capability available, 20% needs workarounds

---

## 🔧 Installing Missing MCPs (Optional)

If you want Playwright for automated screenshots:

```bash
# Add to FrankX/.mcp.json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-playwright"],
      "description": "Browser automation for screenshots"
    }
  }
}
```

If Vercel MCP exists:
```bash
# Check if exists
npx @modelcontextprotocol/server-vercel --version

# If exists, add to config
{
  "vercel": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-vercel"],
    "env": {
      "VERCEL_TOKEN": "your-token"
    }
  }
}
```

---

## ✅ Summary

**Available NOW**:
- ✅ GitHub MCP - PR workflow, branch management
- ✅ Notion MCP - Documentation updates
- ✅ Linear MCP - Task tracking
- ✅ Nano Banana MCP - Image generation
- ✅ Next.js DevTools MCP - Development diagnostics

**Missing**:
- ❌ Playwright MCP - Screenshots (can install)
- ❌ Vercel MCP - Analytics/deployment (may not exist yet)

**Bottom Line**: I have 80% of what I need for professional workflow! Let me start using what's available instead of assuming I need to set everything up.

---

**Last Updated**: 2025-11-07
**Discovery**: Claude Code Session with Frank
**Next Step**: Demonstrate using available MCPs in actual website development
