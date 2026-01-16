# MCP Servers Inventory & Best Practices

> Last updated: January 2026
> Purpose: On-demand MCP server activation for FrankX ecosystem

## Quick Reference

### Currently Active
```bash
claude mcp list
```
- **nano-banana** - Gemini image generation
- **lyric-genius** - AI-powered lyric writing

---

## Tier 1: Official Anthropic Plugins (Recommended)

These are pre-configured in Claude Code marketplace - just enable with `/plugin`:

| Plugin | Purpose | Enable Command |
|--------|---------|----------------|
| **github** | GitHub repos, issues, PRs | `/plugin enable github@claude-plugins-official` |
| **playwright** | Browser automation, testing | `/plugin enable playwright@claude-plugins-official` |
| **vercel** | Deployments, domains, projects | `/plugin enable vercel@claude-plugins-official` |
| **notion** | Workspaces, databases, pages | `/plugin enable Notion@claude-plugins-official` |
| **slack** | Read Slack channels | `/plugin enable slack@claude-plugins-official` |
| **linear** | Project management | `/plugin enable linear@claude-plugins-official` |
| **supabase** | Database, auth, storage | `/plugin enable supabase@claude-plugins-official` |
| **firebase** | Firebase services | `/plugin enable firebase@claude-plugins-official` |
| **sentry** | Error monitoring | `/plugin enable sentry@claude-plugins-official` |
| **stripe** | Payments | `/plugin enable stripe@claude-plugins-official` |
| **figma** | Design files | `/plugin enable figma@claude-plugins-official` |
| **atlassian** | Jira/Confluence | `/plugin enable atlassian@claude-plugins-official` |

### Enable All Essential Plugins
```bash
# Core development
/plugin enable github@claude-plugins-official
/plugin enable playwright@claude-plugins-official
/plugin enable vercel@claude-plugins-official

# Productivity
/plugin enable Notion@claude-plugins-official
/plugin enable slack@claude-plugins-official
/plugin enable linear@claude-plugins-official

# Infrastructure
/plugin enable supabase@claude-plugins-official
```

---

## Tier 2: Official Reference MCP Servers

From [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers):

### Filesystem (Secure file operations)
```bash
claude mcp add -s user --transport stdio filesystem -- npx -y @modelcontextprotocol/server-filesystem /mnt/c/Users/Frank
```

### Git (Repository management)
```bash
claude mcp add -s user --transport stdio git -- npx -y @modelcontextprotocol/server-git
```

### Fetch (Web content)
```bash
claude mcp add -s user --transport stdio fetch -- npx -y @modelcontextprotocol/server-fetch
```

### Memory (Persistent knowledge graph)
```bash
claude mcp add -s user --transport stdio memory -- npx -y @modelcontextprotocol/server-memory
```

### Sequential Thinking (Complex problem solving)
```bash
claude mcp add -s user --transport stdio sequential-thinking -- npx -y @modelcontextprotocol/server-sequential-thinking
```

---

## Tier 3: Community Top-Rated Servers

### GitHub Official Server (Go implementation)
```bash
# Requires GITHUB_PERSONAL_ACCESS_TOKEN
claude mcp add -s user --transport stdio github-server --env GITHUB_PERSONAL_ACCESS_TOKEN=your_token -- npx -y @anthropic-ai/github-mcp-server
```

### Brave Search
```bash
# Requires BRAVE_API_KEY from https://brave.com/search/api/
claude mcp add -s user --transport stdio brave-search --env BRAVE_API_KEY=your_key -- npx -y @anthropic-ai/brave-search-mcp-server
```

### Puppeteer (Headless browser)
```bash
claude mcp add -s user --transport stdio puppeteer -- npx -y @anthropic-ai/puppeteer-mcp-server
```

### Postgres Database
```bash
claude mcp add -s user --transport stdio postgres --env POSTGRES_CONNECTION_STRING=your_connection -- npx -y @anthropic-ai/postgres-mcp-server
```

### SQLite Database
```bash
claude mcp add -s user --transport stdio sqlite -- npx -y @anthropic-ai/sqlite-mcp-server /path/to/database.db
```

---

## Tier 4: Remote/Hosted MCP Servers (SSE/HTTP)

### Sentry (Error tracking)
```bash
claude mcp add -s user --transport http sentry https://mcp.sentry.dev/mcp
```

### Composio (1000+ tool integrations)
```bash
claude mcp add -s user --transport http composio https://mcp.composio.dev/
```

---

## Tier 5: FrankX Custom Servers

### Nano Banana (Already configured)
```bash
# Image generation via Gemini 2.5 Flash
claude mcp add -s user --transport stdio nano-banana --env GEMINI_API_KEY=your_key -- node /mnt/c/Users/Frank/mcp-servers/nano-banana-mcp/dist/index.js
```

### Lyric Genius (Already configured)
```bash
# AI lyric writing
claude mcp add -s user --transport stdio lyric-genius -- node "/mnt/c/Users/Frank/MCP Server/lyric-genius-mcp/dist/index.js"
```

---

## Best Practices

### 1. Scope Strategy
- **`-s user`**: Global servers available in all projects
- **`-s project`**: Project-specific servers (stored in `.claude.json`)
- **`-s local`**: Session-only (default)

### 2. Environment Variables
Store sensitive keys in `~/.bashrc` or use a `.env` loader:
```bash
export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxx
export BRAVE_API_KEY=BSA_xxx
export OPENAI_API_KEY=sk-xxx
```

### 3. On-Demand Activation Pattern
Don't load all servers at once. Use this pattern:
```bash
# Only enable when needed
claude mcp add -s local playwright -- npx -y @anthropic-ai/playwright-mcp-server

# Check what's running
claude mcp list

# Remove when done
claude mcp remove playwright
```

### 4. Server Health Monitoring
```bash
# Check all server connections
claude mcp list

# Get details on a specific server
claude mcp get nano-banana
```

---

## Recommended Setup for FrankX

### Phase 1: Essential (Now)
- [x] nano-banana (image generation)
- [x] lyric-genius (music/lyrics)
- [ ] github plugin
- [ ] vercel plugin
- [ ] playwright plugin

### Phase 2: Productivity (Next)
- [ ] Notion plugin
- [ ] Linear plugin
- [ ] memory server

### Phase 3: Advanced (As needed)
- [ ] Brave Search
- [ ] PostgreSQL
- [ ] Composio

---

## Quick Activation Script

Save as `~/.claude/scripts/mcp-activate.sh`:

```bash
#!/bin/bash

case "$1" in
  "dev")
    echo "Activating development servers..."
    claude mcp add -s local github-server -- npx -y @anthropic-ai/github-mcp-server
    claude mcp add -s local playwright -- npx -y @anthropic-ai/playwright-mcp-server
    ;;
  "content")
    echo "Activating content servers..."
    claude mcp add -s local fetch -- npx -y @modelcontextprotocol/server-fetch
    claude mcp add -s local memory -- npx -y @modelcontextprotocol/server-memory
    ;;
  "all")
    echo "Activating all servers..."
    $0 dev
    $0 content
    ;;
  "list")
    claude mcp list
    ;;
  "clear")
    echo "Removing session servers..."
    claude mcp remove github-server 2>/dev/null
    claude mcp remove playwright 2>/dev/null
    claude mcp remove fetch 2>/dev/null
    claude mcp remove memory 2>/dev/null
    ;;
  *)
    echo "Usage: mcp-activate.sh [dev|content|all|list|clear]"
    ;;
esac
```

---

## Sources

- [Official MCP Servers](https://github.com/modelcontextprotocol/servers)
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers)
- [MCP Directory (1200+ servers)](https://mcp-awesome.com/)
- [Vercel MCP Docs](https://vercel.com/docs/mcp)
- [Claude Code Plugins](https://code.claude.com/docs/en/discover-plugins)
- [Anthropic MCP Announcement](https://www.anthropic.com/news/model-context-protocol)
