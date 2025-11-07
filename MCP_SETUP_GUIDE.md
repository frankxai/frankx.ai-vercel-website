# MCP Setup Guide for FrankX.AI Website Development

**Date**: 2025-11-07
**Purpose**: Enable high-end web design team capabilities with proper MCP integrations

---

## Overview

To transform the website development workflow from basic development to high-end design team quality, we need these MCP servers configured:

### Critical MCPs (Required)
1. ✅ **Playwright MCP** - Visual testing and screenshots
2. ✅ **Vercel MCP** - Deployment, analytics, and performance
3. ✅ **GitHub MCP** - Proper PR workflow

### Recommended MCPs
4. ⚠️ **Notion MCP** - Design documentation
5. ⚠️ **Linear MCP** - Task management
6. ✅ **Nano Banana MCP** - Already configured

---

## Current Status

### ✅ Already Configured
- **Nano Banana MCP**: Image generation (working)
  - Used for generating visuals and mockups

### ❌ Missing (Critical)
- **Playwright MCP**: Not configured
- **Vercel MCP**: Not configured
- **GitHub MCP**: Not configured

---

## Setup Instructions

### 1. Playwright MCP

**Purpose**: Browser automation, screenshots, visual testing

**Installation**:
```bash
# Install Playwright MCP server
npm install -g @modelcontextprotocol/server-playwright

# Or using npx (no installation needed)
npx @modelcontextprotocol/server-playwright
```

**Configuration** (add to Claude Code MCP config):
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-playwright"],
      "env": {}
    }
  }
}
```

**Usage in Sessions**:
```typescript
// Capture screenshot
playwright.screenshot({
  url: "https://frankx-ai-vercel-website-git-v3-frankx-projects.vercel.app",
  selector: "#hero",
  viewport: { width: 1920, height: 1080 }
})

// Test on mobile
playwright.screenshot({
  url: "https://frankx.ai",
  viewport: { width: 375, height: 812 }
})

// Navigate and interact
playwright.navigate({ url: "https://frankx.ai/assessment" })
playwright.click({ selector: "button#start-assessment" })
```

**Where Screenshots Are Saved**:
- Default: MCP server temp directory
- Recommended: Configure output to `/mnt/c/Users/Frank/FrankX/FrankX.AI - Vercel Website/screenshots/`

---

### 2. Vercel MCP

**Purpose**: Deployment management, analytics, performance monitoring

**Installation**:
```bash
# Install Vercel MCP server
npm install -g @modelcontextprotocol/server-vercel

# Or check if there's an official Vercel MCP (as of Nov 2025)
# Search: https://github.com/modelcontextprotocol/servers
```

**Authentication**:
```bash
# Get Vercel API token
# 1. Go to https://vercel.com/account/tokens
# 2. Create new token with name "Claude Code MCP"
# 3. Copy token

# Set environment variable
export VERCEL_TOKEN="your-token-here"
```

**Configuration**:
```json
{
  "mcpServers": {
    "vercel": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-vercel"],
      "env": {
        "VERCEL_TOKEN": "your-token-here"
      }
    }
  }
}
```

**Usage in Sessions**:
```typescript
// Get current deployment info
vercel.getDeployment({
  project: "frankx-ai-vercel-website",
  branch: "v3"
})

// Get analytics
vercel.getAnalytics({
  project: "frankx-ai-vercel-website",
  metrics: ["bounceRate", "timeOnPage", "conversionRate"],
  timeRange: "7d"
})

// Trigger preview deployment
vercel.deploy({
  project: "frankx-ai-vercel-website",
  branch: "feature/hero-improvements"
})

// Run Lighthouse audit
vercel.runLighthouse({
  url: "https://preview-url.vercel.app"
})
```

---

### 3. GitHub MCP

**Purpose**: Repository management, PR creation, issue tracking

**Installation**:
```bash
# Install GitHub MCP server
npm install -g @modelcontextprotocol/server-github

# Or using npx
npx @modelcontextprotocol/server-github
```

**Authentication**:
```bash
# Create GitHub Personal Access Token
# 1. Go to https://github.com/settings/tokens
# 2. Generate new token (classic)
# 3. Scopes needed:
#    - repo (full control)
#    - workflow (if using GitHub Actions)
# 4. Copy token

# Set environment variable
export GITHUB_TOKEN="your-github-token"
```

**Configuration**:
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-github-token"
      }
    }
  }
}
```

**Usage in Sessions**:
```typescript
// Create feature branch
github.createBranch({
  owner: "frankxai",
  repo: "frankx.ai-vercel-website",
  name: "feature/2025-11-07-hero-improvements",
  from: "v3"
})

// Create PR
github.createPR({
  owner: "frankxai",
  repo: "frankx.ai-vercel-website",
  title: "✨ Improve homepage hero clarity",
  body: "## Changes\n- Reduced CTAs from 3 to 1\n- Improved headline clarity\n\n## Screenshots\n[before/after]",
  head: "feature/2025-11-07-hero-improvements",
  base: "v3",
  reviewers: ["frankxai"]
})

// Search issues
github.searchIssues({
  owner: "frankxai",
  repo: "frankx.ai-vercel-website",
  query: "label:bug label:ux is:open"
})
```

---

### 4. Notion MCP (Recommended)

**Purpose**: Design documentation, strategy tracking

**Installation**:
```bash
npm install -g @modelcontextprotocol/server-notion
```

**Authentication**:
```bash
# Create Notion integration
# 1. Go to https://www.notion.so/my-integrations
# 2. Create new integration
# 3. Copy Internal Integration Token
# 4. Share your workspace pages with the integration

export NOTION_TOKEN="your-notion-token"
```

**Configuration**:
```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-notion"],
      "env": {
        "NOTION_TOKEN": "your-notion-token"
      }
    }
  }
}
```

---

### 5. Linear MCP (Recommended)

**Purpose**: Task management, sprint planning

**Installation**:
```bash
npm install -g @modelcontextprotocol/server-linear
```

**Authentication**:
```bash
# Get Linear API key
# 1. Go to https://linear.app/settings/api
# 2. Create new API key
# 3. Copy key

export LINEAR_API_KEY="your-linear-key"
```

**Configuration**:
```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-linear"],
      "env": {
        "LINEAR_API_KEY": "your-linear-key"
      }
    }
  }
}
```

---

## Complete MCP Configuration File

**Location**: `~/.config/claude-code/mcp.json` or wherever Claude Code reads MCP config

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-playwright"],
      "env": {}
    },
    "vercel": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-vercel"],
      "env": {
        "VERCEL_TOKEN": "your-vercel-token-here"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-github-token-here"
      }
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-notion"],
      "env": {
        "NOTION_TOKEN": "your-notion-token-here"
      }
    },
    "linear": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-linear"],
      "env": {
        "LINEAR_API_KEY": "your-linear-key-here"
      }
    },
    "nano-banana": {
      "command": "npx",
      "args": ["-y", "@nano-banana/mcp-server"],
      "env": {
        "NANO_BANANA_API_KEY": "your-existing-key"
      }
    }
  }
}
```

---

## Testing MCP Connections

After configuration, test each MCP:

### Test Playwright
```bash
# In Claude Code session:
playwright.screenshot({ url: "https://google.com", viewport: { width: 1920, height: 1080 } })
```

Expected: Screenshot captured successfully

### Test Vercel
```bash
vercel.getDeployment({ project: "frankx-ai-vercel-website" })
```

Expected: Returns deployment information

### Test GitHub
```bash
github.getRepository({ owner: "frankxai", repo: "frankx.ai-vercel-website" })
```

Expected: Returns repo information

---

## Environment Variables Setup

**For persistent configuration**, add to `~/.bashrc` or `~/.zshrc`:

```bash
# MCP Tokens
export VERCEL_TOKEN="your-vercel-token"
export GITHUB_TOKEN="your-github-token"
export NOTION_TOKEN="your-notion-token"
export LINEAR_API_KEY="your-linear-key"
export NANO_BANANA_API_KEY="your-nano-banana-key"
```

**Security Notes**:
- ⚠️ Never commit tokens to Git
- ⚠️ Use environment variables, not hardcoded values
- ⚠️ Rotate tokens regularly
- ⚠️ Use minimal required scopes for tokens

---

## Troubleshooting

### MCP Not Found
```bash
# Clear npx cache
rm -rf ~/.npm/_npx

# Try manual installation
npm install -g @modelcontextprotocol/server-[name]
```

### Authentication Errors
```bash
# Verify token is set
echo $VERCEL_TOKEN
echo $GITHUB_TOKEN

# Re-export if needed
export VERCEL_TOKEN="your-token"
```

### Permission Errors
```bash
# Check GitHub token scopes at:
https://github.com/settings/tokens

# Check Vercel token permissions at:
https://vercel.com/account/tokens
```

---

## Impact on Workflow

### Before MCP Setup (Current)
- ❌ No screenshots of changes
- ❌ No Lighthouse comparisons
- ❌ No real analytics data (only estimates)
- ❌ Direct pushes to v3 branch
- ❌ No visual evidence of improvements

### After MCP Setup (High-End Team)
- ✅ Before/after screenshots for every change
- ✅ Lighthouse score comparisons
- ✅ Real analytics data (actual bounce rate, conversions)
- ✅ Proper PR workflow with rich documentation
- ✅ Preview deployments for testing
- ✅ Visual evidence of all improvements

---

## Next Steps

1. **Immediate** (Do Today):
   - [ ] Set up Playwright MCP
   - [ ] Set up GitHub MCP
   - [ ] Test both MCPs work

2. **High Priority** (This Week):
   - [ ] Set up Vercel MCP
   - [ ] Configure screenshot output directory
   - [ ] Update workflow to use MCPs

3. **Medium Priority** (Next Week):
   - [ ] Set up Notion MCP (if using Notion)
   - [ ] Set up Linear MCP (if using Linear)
   - [ ] Document MCP usage in team guide

---

## Resources

- **MCP Documentation**: https://modelcontextprotocol.io/docs
- **MCP Servers Repository**: https://github.com/modelcontextprotocol/servers
- **Claude Code MCP Guide**: https://docs.claude.com/en/docs/claude-code/model-context-protocol

---

**Last Updated**: 2025-11-07
**Owner**: FrankX Website Development Team
**Status**: Setup Required - Critical for high-end design workflow
