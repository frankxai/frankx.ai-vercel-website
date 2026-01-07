#!/bin/bash
# Setup script for all MCP servers
# This script clones, installs, and configures MCP servers for Claude Code integration

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "🔌 MCP Server Setup for AFFiNE Workspace"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print step headers
print_step() {
    echo -e "${BLUE}▶ $1${NC}"
}

# Function to print success messages
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Function to print warnings
print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# ==========================================
# 1. OBSIDIAN MCP SERVER
# ==========================================
print_step "Setting up Obsidian MCP Server..."

if [ ! -d "obsidian-mcp" ]; then
    git clone https://github.com/cyanheads/obsidian-mcp-server.git obsidian-mcp
    cd obsidian-mcp
    npm install
    npm run rebuild
    cd ..
    print_success "Obsidian MCP installed"
else
    print_warning "Obsidian MCP already exists, skipping..."
fi

# Create setup guide
cat > obsidian-mcp/SETUP.md <<'EOF'
# Obsidian MCP Server Setup

## Prerequisites

1. **Install Obsidian**: Download from https://obsidian.md
2. **Install Obsidian Local REST API Plugin**:
   - Open Obsidian
   - Go to Settings → Community Plugins → Browse
   - Search for "Local REST API"
   - Install and enable the plugin
3. **Configure API Key**:
   - In Obsidian, go to Settings → Local REST API
   - Generate an API key (or use the default if provided)
   - Copy this key for the next step

## Configuration

Create a `.env` file in this directory:

```bash
# Obsidian REST API Configuration
OBSIDIAN_API_KEY=your_api_key_here
OBSIDIAN_BASE_URL=http://127.0.0.1:27123
OBSIDIAN_VERIFY_SSL=false
OBSIDIAN_ENABLE_CACHE=true
```

## Add to Claude Code

```bash
claude mcp add obsidian-mcp \
  --command "npx" \
  --args "obsidian-mcp-server" \
  --env OBSIDIAN_API_KEY=your_api_key_here \
  --env OBSIDIAN_BASE_URL=http://127.0.0.1:27123
```

Or manually edit `~/.config/claude/mcp.json`:

```json
{
  "mcpServers": {
    "obsidian-mcp": {
      "command": "npx",
      "args": ["obsidian-mcp-server"],
      "env": {
        "OBSIDIAN_API_KEY": "your_api_key_here",
        "OBSIDIAN_BASE_URL": "http://127.0.0.1:27123"
      }
    }
  }
}
```

## Testing

1. Start Obsidian (ensure Local REST API plugin is running)
2. In Claude Code: `claude mcp list`
3. Test: Ask Claude to "list all notes in my Obsidian vault"

## Troubleshooting

- **Connection refused**: Ensure Obsidian is running and Local REST API plugin is enabled
- **401 Unauthorized**: Check API key is correct
- **SSL errors**: Set `OBSIDIAN_VERIFY_SSL=false` for HTTP connections
EOF

echo ""

# ==========================================
# 2. EXCALIDRAW MCP SERVER
# ==========================================
print_step "Setting up Excalidraw MCP Server..."

if [ ! -d "excalidraw-mcp" ]; then
    git clone https://github.com/yctimlin/mcp_excalidraw.git excalidraw-mcp
    cd excalidraw-mcp
    npm install
    cd ..
    print_success "Excalidraw MCP installed"
else
    print_warning "Excalidraw MCP already exists, skipping..."
fi

# Create setup guide
cat > excalidraw-mcp/SETUP.md <<'EOF'
# Excalidraw MCP Server Setup

## Architecture

This MCP server consists of two components:
1. **Canvas Server**: Web-based Excalidraw canvas (runs on port 3000)
2. **MCP Server**: Claude Code integration (runs on port 8000)

## Installation

Already completed by setup script.

## Running the Servers

### Start Canvas Server (Web UI)
```bash
cd excalidraw-mcp
npm run start:canvas
# Access at http://localhost:3000
```

### Start MCP Server (for Claude)
```bash
cd excalidraw-mcp
npm run start:mcp
# Runs on http://localhost:8000
```

### Run Both (Recommended)
```bash
cd excalidraw-mcp
npm run dev
```

## Add to Claude Code

```bash
claude mcp add excalidraw-mcp \
  --command "node" \
  --args "$(pwd)/excalidraw-mcp/dist/index.js"
```

Or manually edit `~/.config/claude/mcp.json`:

```json
{
  "mcpServers": {
    "excalidraw-mcp": {
      "command": "node",
      "args": ["/full/path/to/excalidraw-mcp/dist/index.js"],
      "env": {}
    }
  }
}
```

## Usage Examples

1. **Create a diagram**:
   ```
   "Create an Excalidraw diagram showing a three-tier web architecture"
   ```

2. **Convert Mermaid to Excalidraw**:
   ```
   "Convert this Mermaid diagram to Excalidraw:
   graph TD
   A[User] --> B[API]
   B --> C[Database]"
   ```

3. **View in browser**: Open http://localhost:3000 to see diagrams in real-time

## File Storage

Diagrams are saved as JSON files in:
- `excalidraw-mcp/diagrams/` (or configured directory)
- Files can be version controlled in Git
- Compatible with Excalidraw's import/export

## Troubleshooting

- **Port conflicts**: Change ports in `excalidraw-mcp/config.json`
- **Canvas not loading**: Ensure `npm run start:canvas` is running
- **MCP connection failed**: Verify MCP server is running on port 8000
EOF

echo ""

# ==========================================
# 3. PLANE MCP SERVER
# ==========================================
print_step "Setting up Plane MCP Server..."

if [ ! -d "plane-mcp" ]; then
    mkdir -p plane-mcp
    cd plane-mcp
    npm init -y
    npm install @makeplane/plane-mcp-server
    cd ..
    print_success "Plane MCP installed"
else
    print_warning "Plane MCP already exists, skipping..."
fi

# Create setup guide
cat > plane-mcp/SETUP.md <<'EOF'
# Plane MCP Server Setup

## Prerequisites

1. **Plane Account**: Sign up at https://plane.so or self-host
2. **API Token**: Generate from Workspace Settings → API Tokens
3. **Workspace Slug**: Find in your Plane URL (plane.so/workspace-slug/...)

## Configuration

Create a `.env` file in this directory:

```bash
# Plane API Configuration
PLANE_API_KEY=your_plane_api_token_here
PLANE_WORKSPACE_SLUG=your-workspace-slug
PLANE_API_HOST_URL=https://api.plane.so/
```

For self-hosted Plane, change `PLANE_API_HOST_URL` to your instance URL.

## Add to Claude Code

```bash
claude mcp add plane-mcp \
  --command "npx" \
  --args "@makeplane/plane-mcp-server" \
  --env PLANE_API_KEY=your_api_key \
  --env PLANE_WORKSPACE_SLUG=your-workspace-slug
```

Or manually edit `~/.config/claude/mcp.json`:

```json
{
  "mcpServers": {
    "plane-mcp": {
      "command": "npx",
      "args": ["@makeplane/plane-mcp-server"],
      "env": {
        "PLANE_API_KEY": "your_plane_api_token",
        "PLANE_WORKSPACE_SLUG": "your-workspace-slug",
        "PLANE_API_HOST_URL": "https://api.plane.so/"
      }
    }
  }
}
```

## Usage Examples

1. **List projects**:
   ```
   "Show me all projects in my Plane workspace"
   ```

2. **Create issue**:
   ```
   "Create a new issue in Plane project 'FrankX AI' with title 'Implement voice synthesis'"
   ```

3. **Sync with GitHub**:
   ```
   "Take my Plane issue 'Fix authentication bug' and create a GitHub issue"
   ```

4. **Track cycles**:
   ```
   "List all issues in the current sprint cycle"
   ```

## Available Tools

The Plane MCP server provides 30+ tools including:
- Project management (create, list, update)
- Issue tracking (create, search, assign, update)
- Cycle management (sprints)
- Module organization
- Work logs and time tracking
- Labels and tags
- Team member management

## Troubleshooting

- **401 Unauthorized**: Verify API token is correct and active
- **404 Not Found**: Check workspace slug matches your Plane workspace
- **Connection timeout**: Verify `PLANE_API_HOST_URL` is reachable
EOF

echo ""

# ==========================================
# SUMMARY & NEXT STEPS
# ==========================================
echo ""
echo "=========================================="
print_success "All MCP servers installed successfully!"
echo "=========================================="
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Configure each server:"
echo "   - Obsidian MCP: Follow ${SCRIPT_DIR}/obsidian-mcp/SETUP.md"
echo "   - Excalidraw MCP: Follow ${SCRIPT_DIR}/excalidraw-mcp/SETUP.md"
echo "   - Plane MCP: Follow ${SCRIPT_DIR}/plane-mcp/SETUP.md"
echo ""
echo "2. Add servers to Claude Code:"
echo "   Use the 'claude mcp add' commands in each SETUP.md file"
echo ""
echo "3. Test integration:"
echo "   claude mcp list"
echo ""
echo "4. Start using:"
echo "   Ask Claude to interact with your notes, diagrams, and projects!"
echo ""
echo "📚 Documentation: See ${SCRIPT_DIR}/README.md for usage examples"
echo ""
