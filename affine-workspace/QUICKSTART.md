# AFFiNE Workspace - Quick Start Guide

Get your AI-powered knowledge workspace running in 10 minutes.

## Prerequisites

- **Docker & Docker Compose** installed
- **Node.js 18+** and npm
- **Git**

```bash
# Verify
docker --version && docker compose version && node --version
```

---

## Step 1: Deploy AFFiNE (5 minutes)

```bash
cd affine-workspace/infra

# Configure environment
cp .env.example .env

# IMPORTANT: Edit .env and change:
# - DB_PASSWORD (strong password)
# - SERVER_SECRET (run: openssl rand -hex 32)
nano .env

# Start AFFiNE
chmod +x scripts/*.sh
./scripts/start_affine.sh
```

✅ **Access AFFiNE**: http://localhost:8787

---

## Step 2: Install MCP Servers (3 minutes)

```bash
cd ../mcp

# Install all MCP servers
chmod +x setup_mcp_servers.sh
./setup_mcp_servers.sh
```

---

## Step 3: Configure MCP (2 minutes)

### Option A: Obsidian MCP

**Requirements**: Obsidian app + Local REST API plugin

```bash
# Install plugin in Obsidian
# Settings → Community Plugins → Browse → "Local REST API"

# Get API key from plugin settings, then:
claude mcp add obsidian-mcp \
  --command "npx" \
  --args "obsidian-mcp-server" \
  --env OBSIDIAN_API_KEY=your_key_here \
  --env OBSIDIAN_BASE_URL=http://127.0.0.1:27123
```

### Option B: Excalidraw MCP

```bash
cd mcp/excalidraw-mcp

# Start canvas & MCP server
npm run dev

# In new terminal:
claude mcp add excalidraw-mcp \
  --command "node" \
  --args "$(pwd)/dist/index.js"
```

✅ **Canvas**: http://localhost:3000

### Option C: Plane MCP

**Requirements**: Plane account + API token

```bash
# Get token: Plane → Settings → API Tokens
claude mcp add plane-mcp \
  --command "npx" \
  --args "@makeplane/plane-mcp-server" \
  --env PLANE_API_KEY=your_token \
  --env PLANE_WORKSPACE_SLUG=your-workspace
```

---

## Step 4: Test Integration (1 minute)

```bash
# Verify MCP servers
claude mcp list

# Should show connected servers ✓
```

**Test with Claude**:
```
"List all notes in my Obsidian vault"
"Create a simple diagram in Excalidraw"
"Show my Plane projects"
```

---

## What You Can Do Now

### Knowledge Management
```
"Create an Obsidian note about AI workflow automation"
"Search my vault for notes tagged #productivity"
```

### Visual Thinking
```
"Create an Excalidraw mindmap of my project ideas"
"Generate a system architecture diagram"
```

### Project Management
```
"List all open tasks in my Plane workspace"
"Create a new sprint cycle for next week"
```

### Cross-Platform Workflows
```
"Read my Obsidian daily note and create tasks in Plane"
"Convert my roadmap to GitHub issues and Excalidraw diagram"
```

---

## Management Commands

```bash
# AFFiNE
cd affine-workspace/infra
./scripts/start_affine.sh      # Start
./scripts/stop_affine.sh       # Stop
./scripts/backup_affine.sh     # Backup
./scripts/logs_affine.sh       # View logs

# MCP Servers
claude mcp list                # Check status
claude mcp logs <server>       # View logs
```

---

## Next Steps

1. ✅ **Explore AFFiNE**: Create docs, boards, organize knowledge
2. 📖 **Read Full Guide**: [README.md](README.md)
3. 🔧 **Advanced Setup**: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
4. 🚀 **Learn Workflows**: [docs/WORKFLOWS.md](docs/WORKFLOWS.md)

---

## Troubleshooting

**AFFiNE won't start**:
```bash
# Check logs
./scripts/logs_affine.sh

# Common: port conflict
# Fix: Change AFFINE_PORT in .env
```

**MCP not connecting**:
```bash
# Verify servers
claude mcp list

# Check if required services are running
# - Obsidian: App must be running
# - Excalidraw: Run npm run dev
# - Plane: Verify API token
```

**Need help?**:
- Check [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed troubleshooting
- Review [docs/MCP_INTEGRATION.md](docs/MCP_INTEGRATION.md) for MCP details

---

**That's it!** You now have an AI-powered knowledge workspace. 🎉

Ask Claude to help you build custom workflows specific to your needs!
