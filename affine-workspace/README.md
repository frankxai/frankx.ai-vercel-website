# AFFiNE Workspace with Deep AI Integration

A self-hosted knowledge management system combining **AFFiNE** with **Claude Code MCP servers** for next-level AI-powered productivity.

## 🎯 What You Get

### Core Platform: AFFiNE
- **Self-hosted** workspace at `http://localhost:8787`
- **Privacy-first**: All data stays on your machine
- **Markdown/JSON** knowledge base
- **Visual whiteboarding** with blocks and diagrams
- **Persistent storage** with automatic backups

### AI Integration: MCP Servers
Three specialized MCP servers connect Claude Code/Desktop to your workspace:

1. **📝 Obsidian MCP** - Read/write/search Markdown notes
2. **🎨 Excalidraw MCP** - Create diagrams programmatically with live canvas
3. **📊 Plane MCP** - Project/task management automation

### Git/GitHub Integration
- **Version control** for your knowledge base
- **Markdown exports** from AFFiNE → Git → GitHub
- **Automated backups** via GitHub Actions (optional)

## 🚀 Quick Start

### 1. Deploy AFFiNE

```bash
cd affine-workspace/infra

# Copy environment template
cp .env.example .env

# IMPORTANT: Edit .env and change these:
# - DB_PASSWORD (use a strong password)
# - SERVER_SECRET (generate with: openssl rand -hex 32)
nano .env

# Start AFFiNE
./scripts/start_affine.sh
```

Access AFFiNE at: **http://localhost:8787**

### 2. Install MCP Servers

```bash
cd ../mcp

# Install all MCP servers
./setup_mcp_servers.sh

# Follow individual setup guides:
# - mcp/obsidian-mcp/SETUP.md
# - mcp/excalidraw-mcp/SETUP.md
# - mcp/plane-mcp/SETUP.md
```

### 3. Connect to Claude Code

```bash
# List available MCP servers
claude mcp list

# Example: Add Obsidian MCP
claude mcp add obsidian-mcp \
  --command "npx" \
  --args "obsidian-mcp-server" \
  --env OBSIDIAN_API_KEY=your_key_here
```

See `mcp/README.md` for detailed integration instructions.

### 4. Start Creating

Now you can use Claude to interact with your entire workspace:

```
"Read my AFFiNE board 'AI Project Roadmap' and create GitHub issues"
"Create an Excalidraw diagram showing my system architecture"
"Search my Obsidian vault for notes about AI music"
```

## 📂 Repository Structure

```
affine-workspace/
├── infra/                      # Docker deployment
│   ├── docker-compose.yml      # AFFiNE services
│   ├── .env.example            # Configuration template
│   ├── .gitignore              # Docker-specific ignores
│   └── scripts/                # Management scripts
│       ├── start_affine.sh     # Start services
│       ├── stop_affine.sh      # Stop services
│       ├── restart_affine.sh   # Restart services
│       ├── backup_affine.sh    # Backup data
│       └── logs_affine.sh      # View logs
│
├── mcp/                        # MCP servers
│   ├── obsidian-mcp/           # Markdown/notes MCP
│   ├── excalidraw-mcp/         # Diagramming MCP
│   ├── plane-mcp/              # Project mgmt MCP
│   ├── setup_mcp_servers.sh    # Install all servers
│   └── README.md               # MCP documentation
│
├── affine-backups/             # Backup storage
│   └── exports/                # Database + file exports
│
├── docs/                       # Additional documentation
│   ├── DEPLOYMENT.md           # Deployment guide
│   ├── MCP_INTEGRATION.md      # MCP setup details
│   └── WORKFLOWS.md            # Example workflows
│
├── .gitignore                  # Global Git ignores
└── README.md                   # This file
```

## 🛠️ Management Commands

### AFFiNE Services

```bash
cd infra

# Start AFFiNE
./scripts/start_affine.sh

# Stop AFFiNE
./scripts/stop_affine.sh

# Restart AFFiNE
./scripts/restart_affine.sh

# View logs
./scripts/logs_affine.sh [service_name]

# Backup data
./scripts/backup_affine.sh [backup_name]
```

### MCP Servers

```bash
cd mcp

# Install all servers
./setup_mcp_servers.sh

# Check status
claude mcp list

# Start Excalidraw canvas (for diagramming)
cd excalidraw-mcp && npm run dev
```

## 💡 Usage Examples

### Example 1: Knowledge Base → GitHub

**Scenario**: Convert AFFiNE roadmap to GitHub issues

```
You: "Take my AFFiNE board 'FrankX AI Roadmap' and break it into GitHub issues"

Claude:
1. Reads AFFiNE board via Plane MCP
2. Extracts tasks and milestones
3. Creates structured GitHub issues
4. Links back to AFFiNE for tracking
```

### Example 2: Diagram Generation

**Scenario**: Create system architecture diagram

```
You: "Read my AFFiNE doc 'Vision.md' and create a whiteboard diagram in Excalidraw"

Claude:
1. Reads Vision.md via Obsidian MCP
2. Analyzes architecture described in the doc
3. Generates Excalidraw diagram via MCP
4. Opens live canvas at http://localhost:3000
5. Saves diagram JSON to Git
```

### Example 3: Cross-Platform Sync

**Scenario**: Sync tasks across platforms

```
You: "Sync tasks from AFFiNE → GitHub → update Excalidraw and MD files"

Claude:
1. Lists tasks from AFFiNE/Plane
2. Creates/updates GitHub issues
3. Updates Excalidraw kanban board
4. Generates Markdown summary
5. Commits changes to Git
```

## 🔐 Security & Privacy

### Data Sovereignty
- **All data stays local** (or on your private server)
- **No cloud dependencies** for core functionality
- **Encrypted backups** recommended for external storage

### Secrets Management
- **Never commit** `.env` files to Git
- **Rotate secrets** regularly (DB_PASSWORD, API keys)
- **Use strong passwords**: Generate with `openssl rand -hex 32`

### API Security
- **MCP API keys**: Store in environment variables only
- **Obsidian REST API**: Runs locally (127.0.0.1)
- **Plane tokens**: Workspace-scoped, revocable

## 📦 Backup & Restore

### Automated Backups

```bash
# Create backup
./infra/scripts/backup_affine.sh

# Backups stored in: affine-backups/exports/
# Format: affine-backup-YYYYMMDD-HHMMSS.tar.gz
```

### Restore from Backup

```bash
cd affine-backups/exports/affine-backup-20250116-120000

# Stop AFFiNE
cd ../../infra
./scripts/stop_affine.sh

# Restore database
docker compose exec -T postgres psql -U affine affine < database.sql

# Restore storage
docker compose cp storage affine_app:/app/storage

# Start AFFiNE
./scripts/start_affine.sh
```

### Git-Based Backups

```bash
# Initialize Git repo
git init
git add .
git commit -m "Initial AFFiNE workspace setup"

# Push to GitHub
git remote add origin https://github.com/yourusername/affine-workspace.git
git push -u origin main
```

**Note**: Large binary files (database dumps, uploads) are Git-ignored. Use Git for:
- Configuration files
- Scripts
- Documentation
- Markdown exports
- Excalidraw diagram JSONs (source)

## 🔧 Troubleshooting

### AFFiNE Won't Start

```bash
# Check logs
./scripts/logs_affine.sh

# Common issues:
# - Port 8787 already in use → Change AFFINE_PORT in .env
# - Database connection failed → Check DB_PASSWORD in .env
# - Permission denied → Run: sudo chown -R $USER:$USER .
```

### MCP Server Connection Failed

```bash
# Verify MCP servers are running
claude mcp list

# For Obsidian:
# - Ensure Obsidian app is running
# - Check Local REST API plugin is enabled
# - Verify API key matches

# For Excalidraw:
# - Start canvas: cd mcp/excalidraw-mcp && npm run dev
# - Check http://localhost:3000 is accessible

# For Plane:
# - Verify API token is valid
# - Check workspace slug is correct
```

### Docker Issues

```bash
# Reset everything (WARNING: deletes data)
docker compose down -v

# Rebuild containers
docker compose up -d --build

# Check Docker resources
docker system df
docker system prune  # Clean up unused resources
```

## 🚀 Advanced Configuration

### Custom Domain

Edit `infra/docker-compose.yml`:

```yaml
services:
  affine:
    environment:
      AFFINE_SERVER_HOST: affine.yourdomain.com
```

Add reverse proxy (nginx, Caddy, Traefik).

### External Database

Replace `postgres` service in `docker-compose.yml` with external PostgreSQL connection string.

### AI Features

Enable built-in AFFiNE AI features in `.env`:

```bash
ENABLE_AI=true
ENABLE_COPILOT=true
OPENAI_API_KEY=sk-...
```

### SMTP for Notifications

Add to `.env`:

```bash
AFFINE_SMTP_HOST=smtp.gmail.com
AFFINE_SMTP_PORT=587
AFFINE_SMTP_USER=your-email@gmail.com
AFFINE_SMTP_PASSWORD=your-app-password
```

## 📚 Documentation

- [Deployment Guide](docs/DEPLOYMENT.md) - Detailed deployment instructions
- [MCP Integration](docs/MCP_INTEGRATION.md) - Advanced MCP configurations
- [Workflows](docs/WORKFLOWS.md) - Example AI-powered workflows
- [AFFiNE Official Docs](https://docs.affine.pro) - Upstream documentation
- [Claude Code MCP](https://code.claude.com/docs/en/mcp) - MCP protocol details

## 🤝 Contributing

This is a personal workspace template. Feel free to:
- Fork and customize for your needs
- Share improvements and workflows
- Report issues or suggest MCP servers

## 📄 License

This workspace configuration is MIT licensed.

Individual components:
- AFFiNE: [License](https://github.com/toeverything/AFFiNE/blob/canary/LICENSE)
- Obsidian MCP: Apache 2.0
- Excalidraw MCP: MIT
- Plane MCP: MIT

## 🙏 Credits

Built on the shoulders of giants:
- [AFFiNE](https://affine.pro) - Privacy-focused knowledge workspace
- [Anthropic Claude](https://claude.ai) - AI assistant with MCP support
- [Model Context Protocol](https://modelcontextprotocol.io) - LLM integration standard
- MCP server authors: cyanheads, yctimlin, makeplane

---

**Ready to supercharge your knowledge work?** Start with `./infra/scripts/start_affine.sh` 🚀
