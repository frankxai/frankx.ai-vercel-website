# MCP Servers for AFFiNE Workspace

This directory contains Model Context Protocol (MCP) servers that enable Claude Code and Claude Desktop to interact with your knowledge base, project management tools, and diagramming software.

## Installed MCP Servers

### 1. 📝 Obsidian MCP Server
**Purpose**: Access and manipulate Markdown notes in your Obsidian vault
**Repository**: https://github.com/cyanheads/obsidian-mcp-server
**Features**:
- Read/write/search notes
- Manage tags and frontmatter
- Full vault navigation
- In-memory caching for performance

### 2. 🎨 Excalidraw MCP Server
**Purpose**: Create and edit diagrams programmatically
**Repository**: https://github.com/yctimlin/mcp_excalidraw
**Features**:
- Real-time canvas with live web preview
- AI-powered diagram creation
- Mermaid → Excalidraw conversion
- WebSocket sync

### 3. 📊 Plane MCP Server
**Purpose**: Project/task management integration
**Repository**: https://github.com/makeplane/plane-mcp-server
**Features**:
- Create/manage projects and issues
- Track cycles and modules
- Work logs and automation
- 30+ specialized tools

## Installation Status

Run `./setup_mcp_servers.sh` to install all servers, or install individually following the instructions below.

## Directory Structure

```
mcp/
├── obsidian-mcp/          # Obsidian/Markdown server
├── excalidraw-mcp/        # Diagramming server
├── plane-mcp/             # Project management server
├── setup_mcp_servers.sh   # Installation script
└── claude_mcp_config.json # Claude configuration
```

## Quick Start

1. **Install all MCP servers**:
   ```bash
   ./setup_mcp_servers.sh
   ```

2. **Configure Claude Code**:
   ```bash
   # The setup script will show you the exact commands
   # Example:
   claude mcp add obsidian-mcp npx obsidian-mcp-server
   ```

3. **Test integration**:
   ```bash
   claude mcp list
   ```

## Configuration

Each MCP server requires specific environment variables. See individual setup guides:
- [Obsidian Setup](./obsidian-mcp/SETUP.md)
- [Excalidraw Setup](./excalidraw-mcp/SETUP.md)
- [Plane Setup](./plane-mcp/SETUP.md)

## Usage Examples

Once configured, you can use Claude to:

### Knowledge Base Operations
```
"Read my Obsidian note 'FrankX AI Roadmap.md'"
"Create a new note with my project ideas"
"Search my vault for all notes tagged #ai-music"
```

### Diagram Creation
```
"Create an Excalidraw diagram showing my system architecture"
"Convert this Mermaid diagram to Excalidraw"
"Open the Excalidraw canvas and draw a flowchart for user authentication"
```

### Project Management
```
"Create a GitHub issue from my Plane task 'Implement AI feature'"
"List all open issues in my FrankX project"
"Create a new cycle for the next sprint"
```

## Troubleshooting

### MCP Server Not Found
- Ensure the server is installed: `npm list -g` or check local directory
- Verify Claude Code config: `claude mcp list`

### Connection Errors
- Check if required services are running (Obsidian app, Excalidraw canvas, Plane)
- Verify API keys and environment variables
- Review logs: Check individual server directories for log files

### Permission Issues
- Ensure API tokens have correct permissions
- For Obsidian: Verify Local REST API plugin is enabled

## Alternative MCP Servers

### Markdown Alternatives
- `dbmcco/obsidian-mcp`: Lighter alternative without REST API requirement
- `notes-mcp`: Generic markdown server (no Obsidian required)

### Diagramming Alternatives
- `al1y/mcp-excalidraw`: Alternative implementation with different features
- `tldraw-mcp`: tldraw integration (search on awesome-mcp-servers)

### Project Management Alternatives
- `redmine-mcp`: For Redmine project management
- `linear-mcp`: Linear integration (if you prefer Linear over Plane)

## Resources

- [Model Context Protocol Docs](https://code.claude.com/docs/en/mcp)
- [Awesome MCP Servers](https://github.com/serpvault/awesome-mcp-servers)
- [Claude Code MCP Guide](https://code.claude.com/docs/en/mcp)
