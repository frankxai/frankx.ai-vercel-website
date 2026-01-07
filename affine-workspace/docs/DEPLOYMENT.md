# AFFiNE Workspace - Deployment Guide

Complete step-by-step deployment guide for setting up your self-hosted AFFiNE workspace with MCP integration.

## Prerequisites

### Required Software

1. **Docker & Docker Compose**
   ```bash
   # Verify installation
   docker --version          # Should be 20.10+
   docker compose version    # Should be 2.0+
   ```

2. **Node.js & npm** (for MCP servers)
   ```bash
   # Verify installation
   node --version    # Should be 18+
   npm --version     # Should be 8+
   ```

3. **Git**
   ```bash
   git --version     # Should be 2.30+
   ```

### Optional Software

- **Obsidian** (for Obsidian MCP integration)
- **Plane account** (for project management MCP)

## Step-by-Step Deployment

### Phase 1: AFFiNE Core Setup

#### 1.1 Navigate to Infrastructure Directory

```bash
cd affine-workspace/infra
```

#### 1.2 Configure Environment

```bash
# Copy example environment file
cp .env.example .env

# Generate strong secrets
DB_PASSWORD=$(openssl rand -hex 16)
SERVER_SECRET=$(openssl rand -hex 32)

# Edit .env file
nano .env
```

**Required changes in `.env`:**

```bash
# Set strong passwords
DB_PASSWORD=<paste generated password>
SERVER_SECRET=<paste generated secret>

# Optional: Change port (default 8787)
AFFINE_PORT=8787

# Optional: Enable AI features
ENABLE_AI=true
ENABLE_COPILOT=true
```

#### 1.3 Start AFFiNE Services

```bash
# Make scripts executable (first time only)
chmod +x scripts/*.sh

# Start AFFiNE
./scripts/start_affine.sh
```

**Expected output:**
```
🚀 Starting AFFiNE Workspace...
================================
📥 Pulling latest Docker images...
🔧 Starting services...
⏳ Waiting for services to be healthy...
✅ AFFiNE is starting up!

🌐 Access your workspace at: http://localhost:8787
```

#### 1.4 Verify Deployment

```bash
# Check service status
docker compose ps

# All services should show "healthy"
# NAME              STATUS
# affine_app        Up (healthy)
# affine_postgres   Up (healthy)
# affine_redis      Up (healthy)

# View logs
./scripts/logs_affine.sh
```

#### 1.5 Access AFFiNE

Open browser to: **http://localhost:8787**

- Create your admin account
- Set up your first workspace
- Explore the interface

---

### Phase 2: MCP Server Integration

#### 2.1 Install All MCP Servers

```bash
cd ../mcp

# Run automated setup
./setup_mcp_servers.sh
```

This will:
- Clone all three MCP server repositories
- Install dependencies
- Create setup guides for each server

---

#### 2.2 Configure Obsidian MCP

**Prerequisites:**
- Obsidian installed on your system
- Obsidian vault created

**Steps:**

1. **Install Obsidian Local REST API Plugin**
   ```
   Obsidian → Settings → Community Plugins → Browse
   Search: "Local REST API"
   Install & Enable
   ```

2. **Generate API Key**
   ```
   Obsidian → Settings → Local REST API
   Copy the API key (or generate new)
   ```

3. **Configure MCP Server**
   ```bash
   cd obsidian-mcp

   # Create .env file
   cat > .env <<EOF
   OBSIDIAN_API_KEY=your_api_key_here
   OBSIDIAN_BASE_URL=http://127.0.0.1:27123
   OBSIDIAN_VERIFY_SSL=false
   OBSIDIAN_ENABLE_CACHE=true
   EOF
   ```

4. **Add to Claude Code**
   ```bash
   claude mcp add obsidian-mcp \
     --command "npx" \
     --args "obsidian-mcp-server" \
     --env OBSIDIAN_API_KEY=your_api_key \
     --env OBSIDIAN_BASE_URL=http://127.0.0.1:27123
   ```

5. **Test**
   ```
   Ask Claude: "List all notes in my Obsidian vault"
   ```

---

#### 2.3 Configure Excalidraw MCP

**Steps:**

1. **Navigate to Excalidraw MCP**
   ```bash
   cd excalidraw-mcp
   ```

2. **Start the Canvas & MCP Server**
   ```bash
   # Run both services
   npm run dev

   # Or run separately:
   # Terminal 1: npm run start:canvas
   # Terminal 2: npm run start:mcp
   ```

3. **Verify Canvas**
   - Open browser to: http://localhost:3000
   - You should see an Excalidraw canvas

4. **Add to Claude Code**
   ```bash
   # Get full path
   MCP_PATH=$(pwd)

   claude mcp add excalidraw-mcp \
     --command "node" \
     --args "$MCP_PATH/dist/index.js"
   ```

5. **Test**
   ```
   Ask Claude: "Create an Excalidraw diagram showing a simple flowchart"
   ```
   Then check http://localhost:3000 to see the diagram!

---

#### 2.4 Configure Plane MCP

**Prerequisites:**
- Plane account (https://plane.so or self-hosted)
- Workspace created

**Steps:**

1. **Generate Plane API Token**
   ```
   Plane → Workspace Settings → API Tokens
   Create new token → Copy
   ```

2. **Get Workspace Slug**
   ```
   From your Plane URL:
   https://app.plane.so/your-workspace-slug/projects
                       ^^^^^^^^^^^^^^^^^^^^^
   ```

3. **Configure MCP Server**
   ```bash
   cd plane-mcp

   # Create .env file
   cat > .env <<EOF
   PLANE_API_KEY=your_plane_api_token
   PLANE_WORKSPACE_SLUG=your-workspace-slug
   PLANE_API_HOST_URL=https://api.plane.so/
   EOF
   ```

4. **Add to Claude Code**
   ```bash
   claude mcp add plane-mcp \
     --command "npx" \
     --args "@makeplane/plane-mcp-server" \
     --env PLANE_API_KEY=your_api_key \
     --env PLANE_WORKSPACE_SLUG=your-workspace-slug
   ```

5. **Test**
   ```
   Ask Claude: "List all projects in my Plane workspace"
   ```

---

### Phase 3: Git Integration

#### 3.1 Initialize Git Repository

```bash
cd affine-workspace

# Initialize repo
git init

# Add files
git add .

# Create initial commit
git commit -m "Initial AFFiNE workspace setup

- AFFiNE Docker deployment on port 8787
- Obsidian MCP for Markdown knowledge base
- Excalidraw MCP for AI-powered diagramming
- Plane MCP for project management
- Automated backup scripts
"
```

#### 3.2 Push to GitHub

```bash
# Create repo on GitHub first, then:
git remote add origin https://github.com/yourusername/affine-workspace.git
git branch -M main
git push -u origin main
```

#### 3.3 Setup GitHub Backups (Optional)

Create `.github/workflows/backup.yml`:

```yaml
name: Backup AFFiNE Data

on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM
  workflow_dispatch:      # Manual trigger

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Backup AFFiNE
        run: ./infra/scripts/backup_affine.sh

      - name: Upload to Artifacts
        uses: actions/upload-artifact@v4
        with:
          name: affine-backup-${{ github.run_number }}
          path: affine-backups/exports/*.tar.gz
          retention-days: 30
```

---

## Post-Deployment Configuration

### Enable AFFiNE AI Features

If you have OpenAI or Anthropic API keys:

```bash
# Edit infra/.env
ENABLE_AI=true
ENABLE_COPILOT=true
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```

Restart AFFiNE:
```bash
./infra/scripts/restart_affine.sh
```

### Setup Regular Backups

Add to crontab:
```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * /path/to/affine-workspace/infra/scripts/backup_affine.sh
```

### Configure Reverse Proxy (Optional)

For production deployment with HTTPS:

**Nginx example:**
```nginx
server {
    listen 443 ssl;
    server_name affine.yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:8787;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

---

## Verification Checklist

Use this checklist to verify everything is working:

- [ ] AFFiNE accessible at http://localhost:8787
- [ ] Can create and edit documents in AFFiNE
- [ ] PostgreSQL database is persisting data
- [ ] Redis cache is working
- [ ] Backup script runs successfully
- [ ] Obsidian MCP can read notes: `claude mcp list` shows obsidian-mcp
- [ ] Excalidraw MCP can create diagrams: Canvas at http://localhost:3000
- [ ] Plane MCP can list projects
- [ ] Git repository initialized and pushed to GitHub
- [ ] All secrets changed from defaults

---

## Troubleshooting

### AFFiNE Services Not Starting

```bash
# Check Docker status
docker compose ps

# Check logs for errors
./scripts/logs_affine.sh

# Common fixes:
# 1. Port conflict
#    - Change AFFINE_PORT in .env
#    - Restart: ./scripts/restart_affine.sh

# 2. Database connection failed
#    - Verify DB_PASSWORD in .env matches
#    - Check postgres logs: ./scripts/logs_affine.sh postgres

# 3. Volume permissions
#    - Fix ownership: sudo chown -R $USER:$USER .
```

### MCP Servers Not Connecting

```bash
# Verify Claude Code configuration
claude mcp list

# Should show:
# - obsidian-mcp
# - excalidraw-mcp
# - plane-mcp

# If missing, re-add:
cd mcp/<server-name>
# Follow setup instructions in SETUP.md
```

### Obsidian MCP: Connection Refused

```bash
# Ensure Obsidian is running
# Verify Local REST API plugin is enabled:
#   Obsidian → Settings → Community Plugins → Local REST API (should be ON)

# Test API directly:
curl -H "Authorization: Bearer YOUR_API_KEY" http://127.0.0.1:27123/
```

### Excalidraw MCP: Canvas Not Loading

```bash
cd mcp/excalidraw-mcp

# Check if services are running
ps aux | grep excalidraw

# Restart services
pkill -f excalidraw
npm run dev

# Check http://localhost:3000
```

---

## Next Steps

Once deployment is complete:

1. **Explore AFFiNE**: Create documents, boards, and organize your knowledge
2. **Test MCP Integration**: Ask Claude to interact with your data
3. **Setup Workflows**: See `docs/WORKFLOWS.md` for examples
4. **Regular Backups**: Test restore process at least once
5. **Customize**: Adjust ports, features, and integrations to your needs

---

**Deployment Status**: ✅ Complete

Your AFFiNE workspace with AI superpowers is ready!
