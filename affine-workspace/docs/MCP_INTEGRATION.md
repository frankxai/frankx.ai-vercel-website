# MCP Integration Guide

Deep dive into Model Context Protocol integration for AFFiNE workspace.

## What is MCP?

**Model Context Protocol (MCP)** is an open protocol that standardizes how AI applications connect to data sources and tools. Think of it as a universal adapter that lets Claude Code access your:

- 📝 Knowledge bases (Obsidian, AFFiNE)
- 🎨 Creative tools (Excalidraw, tldraw)
- 📊 Project management (Plane, Linear, GitHub)
- 🗄️ Databases, APIs, and more

### Why MCP Matters

Traditional approach:
```
You → Claude → Manual copy/paste → Your tools
```

With MCP:
```
You → Claude → MCP Servers → Direct tool integration
```

**Benefits**:
- ✅ No manual data transfer
- ✅ Real-time synchronization
- ✅ Context-aware AI operations
- ✅ Automated workflows

---

## MCP Architecture

### Overview

```
┌─────────────────────────────────────────────────────┐
│                   Claude Code                       │
│                  (MCP Client)                       │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ Model Context Protocol
                  │
     ┌────────────┼────────────┬────────────────────┐
     │            │            │                    │
     ▼            ▼            ▼                    ▼
┌─────────┐ ┌─────────┐ ┌──────────┐ ┌──────────────┐
│Obsidian │ │Excali-  │ │  Plane   │ │   Custom     │
│   MCP   │ │draw MCP │ │   MCP    │ │   MCP...     │
└────┬────┘ └────┬────┘ └────┬─────┘ └──────┬───────┘
     │           │           │              │
     ▼           ▼           ▼              ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────┐
│Obsidian │ │Excali-  │ │Plane API│ │Your Data... │
│  Vault  │ │draw     │ │         │ │             │
│(Local)  │ │(Local)  │ │(Cloud)  │ │             │
└─────────┘ └─────────┘ └─────────┘ └─────────────┘
```

### Components

1. **MCP Client** (Claude Code/Desktop)
   - Discovers and connects to MCP servers
   - Routes AI requests to appropriate servers
   - Aggregates responses

2. **MCP Server** (obsidian-mcp, excalidraw-mcp, etc.)
   - Exposes tools/resources to Claude
   - Handles authentication
   - Executes operations on data sources

3. **Data Source** (Your tools/services)
   - Obsidian vault (local files)
   - Excalidraw canvas (local/web)
   - Plane workspace (API)

---

## MCP Server Details

### 1. Obsidian MCP Server

**Repository**: https://github.com/cyanheads/obsidian-mcp-server

**Architecture**:
```
Claude Code → MCP Server → Obsidian Local REST API → Obsidian App → Vault Files
```

**Capabilities**:

| Tool | Description | Example |
|------|-------------|---------|
| `list_notes` | List all notes in vault | "Show all notes tagged #ai" |
| `read_note` | Read specific note | "Read my daily note" |
| `write_note` | Create/update note | "Create note 'AI Ideas'" |
| `search_notes` | Full-text search | "Find notes mentioning MCP" |
| `get_tags` | List all tags | "What tags do I use?" |
| `update_frontmatter` | Modify YAML metadata | "Set status: published" |

**Data Flow Example**:

Request: "Create a note about MCP in my Obsidian vault"

```
1. Claude Code → obsidian-mcp-server
2. MCP validates request
3. Calls Obsidian Local REST API
   POST http://127.0.0.1:27123/vault/notes
   Headers: Authorization: Bearer API_KEY
   Body: {
     "path": "MCP/Introduction.md",
     "content": "# MCP Introduction\n\n..."
   }
4. Obsidian creates file
5. Response → MCP → Claude
6. Claude confirms: "Created note at MCP/Introduction.md"
```

**Configuration**:

```json
{
  "mcpServers": {
    "obsidian-mcp": {
      "command": "npx",
      "args": ["obsidian-mcp-server"],
      "env": {
        "OBSIDIAN_API_KEY": "your_api_key",
        "OBSIDIAN_BASE_URL": "http://127.0.0.1:27123",
        "OBSIDIAN_ENABLE_CACHE": "true"
      }
    }
  }
}
```

**Security Notes**:
- ✅ Runs locally (127.0.0.1)
- ✅ No cloud transmission
- ⚠️ API key in environment (not Git)
- ⚠️ Requires Obsidian app running

---

### 2. Excalidraw MCP Server

**Repository**: https://github.com/yctimlin/mcp_excalidraw

**Architecture**:
```
Claude Code → MCP Server → Excalidraw Canvas Server → JSON Files
                              ↓
                         WebSocket → Browser (Live Preview)
```

**Capabilities**:

| Tool | Description | Example |
|------|-------------|---------|
| `create_diagram` | New Excalidraw diagram | "Create flowchart" |
| `add_element` | Add shape/text/arrow | "Add rectangle with text" |
| `convert_mermaid` | Mermaid → Excalidraw | "Convert this diagram" |
| `export_png` | Export as PNG | "Save as image" |
| `list_diagrams` | Show all diagrams | "What diagrams exist?" |

**Data Flow Example**:

Request: "Create a system architecture diagram"

```
1. Claude analyzes request → generates structure
2. Calls excalidraw-mcp tools:
   - create_diagram("system-architecture")
   - add_element(type: "rectangle", text: "Frontend")
   - add_element(type: "rectangle", text: "API")
   - add_element(type: "arrow", from: frontend, to: api)
3. MCP Server updates canvas state
4. WebSocket pushes to browser
5. Browser at localhost:3000 shows diagram in real-time
6. Saves JSON to diagrams/system-architecture.excalidraw
```

**Configuration**:

```json
{
  "mcpServers": {
    "excalidraw-mcp": {
      "command": "node",
      "args": ["/full/path/to/excalidraw-mcp/dist/index.js"],
      "env": {
        "CANVAS_PORT": "3000",
        "MCP_PORT": "8000",
        "STORAGE_PATH": "./diagrams"
      }
    }
  }
}
```

**File Format**:

Excalidraw files are JSON:
```json
{
  "type": "excalidraw",
  "version": 2,
  "elements": [
    {
      "id": "abc123",
      "type": "rectangle",
      "x": 100,
      "y": 100,
      "width": 200,
      "height": 100,
      "text": "Frontend"
    }
  ]
}
```

These can be:
- Version controlled in Git ✅
- Opened in Excalidraw web app ✅
- Exported to PNG/SVG ✅

---

### 3. Plane MCP Server

**Repository**: https://github.com/makeplane/plane-mcp-server

**Architecture**:
```
Claude Code → MCP Server → Plane REST API → Plane Cloud/Self-hosted
```

**Capabilities** (30+ tools):

| Tool | Description | Example |
|------|-------------|---------|
| `list_projects` | Get all projects | "Show my projects" |
| `create_issue` | New task/issue | "Create bug report" |
| `update_issue` | Modify existing issue | "Mark as completed" |
| `list_cycles` | Get sprint cycles | "Show current sprint" |
| `create_cycle` | New sprint | "Start Sprint 5" |
| `assign_issue` | Assign to team member | "Assign to @frank" |

**Data Flow Example**:

Request: "Create task in FrankX AI project: Implement voice synthesis"

```
1. Claude Code → plane-mcp
2. MCP calls: create_issue({
     workspace: "frankx-workspace",
     project: "frankx-ai",
     title: "Implement voice synthesis",
     description: "...",
     priority: "high"
   })
3. MCP Server → Plane API
   POST https://api.plane.so/api/v1/workspaces/{ws}/projects/{proj}/issues
   Headers:
     Authorization: Bearer PLANE_API_KEY
     Content-Type: application/json
4. Plane creates issue
5. Returns issue ID, URL
6. Claude confirms: "Created issue #123: https://app.plane.so/..."
```

**Configuration**:

```json
{
  "mcpServers": {
    "plane-mcp": {
      "command": "npx",
      "args": ["@makeplane/plane-mcp-server"],
      "env": {
        "PLANE_API_KEY": "your_api_token",
        "PLANE_WORKSPACE_SLUG": "your-workspace",
        "PLANE_API_HOST_URL": "https://api.plane.so/"
      }
    }
  }
}
```

**Security Notes**:
- ⚠️ API key has full workspace access
- ✅ Scope to read-only if possible
- ✅ Rotate tokens regularly
- ⚠️ Cloud-based (data leaves localhost)

---

## Claude Code MCP Configuration

### Location

MCP servers are configured in:
- **Claude Code**: `~/.config/claude/mcp.json`
- **Claude Desktop**: `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS)

### Full Configuration Example

`~/.config/claude/mcp.json`:

```json
{
  "mcpServers": {
    "obsidian-mcp": {
      "command": "npx",
      "args": ["obsidian-mcp-server"],
      "env": {
        "OBSIDIAN_API_KEY": "your_obsidian_api_key",
        "OBSIDIAN_BASE_URL": "http://127.0.0.1:27123",
        "OBSIDIAN_VERIFY_SSL": "false",
        "OBSIDIAN_ENABLE_CACHE": "true"
      }
    },
    "excalidraw-mcp": {
      "command": "node",
      "args": ["/home/user/affine-workspace/mcp/excalidraw-mcp/dist/index.js"],
      "env": {
        "CANVAS_PORT": "3000",
        "MCP_PORT": "8000",
        "STORAGE_PATH": "/home/user/affine-workspace/mcp/excalidraw-mcp/diagrams"
      }
    },
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

### Environment Variables

**Best Practice**: Store secrets in shell environment, reference in config

```bash
# ~/.bashrc or ~/.zshrc
export OBSIDIAN_API_KEY="your_key"
export PLANE_API_KEY="your_key"
```

Then in `mcp.json`:
```json
{
  "env": {
    "OBSIDIAN_API_KEY": "${OBSIDIAN_API_KEY}"
  }
}
```

---

## Testing MCP Integration

### 1. Verify MCP Servers

```bash
# List configured servers
claude mcp list

# Expected output:
# obsidian-mcp    ✓ Connected
# excalidraw-mcp  ✓ Connected
# plane-mcp       ✓ Connected
```

### 2. Test Individual Servers

**Obsidian**:
```
Claude, please list all notes in my Obsidian vault
```

**Excalidraw**:
```
Claude, create a simple flowchart with 3 boxes in Excalidraw
```

**Plane**:
```
Claude, list all projects in my Plane workspace
```

### 3. Test Cross-Server Integration

```
Claude, do this workflow:
1. Read my Obsidian note "Project Ideas"
2. Create a new project in Plane based on the ideas
3. Generate an Excalidraw mindmap of the project structure
```

### 4. Debug Connection Issues

```bash
# Check MCP server logs
claude mcp logs obsidian-mcp

# Test server directly
curl -H "Authorization: Bearer $OBSIDIAN_API_KEY" \
  http://127.0.0.1:27123/

# Verify environment variables
claude mcp config obsidian-mcp
```

---

## Advanced MCP Topics

### Custom MCP Servers

You can build your own MCP server for any data source.

**Example**: AFFiNE MCP Server (hypothetical)

```typescript
// affine-mcp-server/index.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server({
  name: 'affine-mcp',
  version: '1.0.0'
});

// Register tools
server.setRequestHandler('tools/list', async () => ({
  tools: [
    {
      name: 'read_affine_doc',
      description: 'Read document from AFFiNE',
      inputSchema: {
        type: 'object',
        properties: {
          docId: { type: 'string' }
        }
      }
    }
  ]
}));

server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'read_affine_doc') {
    const doc = await fetchAFFiNEDoc(request.params.arguments.docId);
    return { content: [{ type: 'text', text: doc }] };
  }
});

const transport = new StdioServerTransport();
server.connect(transport);
```

### MCP Server Discovery

Claude Code automatically discovers servers in `mcp.json`, but you can also:

1. **List available servers**: `claude mcp search`
2. **Install from registry**: `claude mcp install <server-name>`
3. **Add manually**: Edit `~/.config/claude/mcp.json`

### Security Considerations

**Principle of Least Privilege**:
- Use read-only API keys when possible
- Scope tokens to specific projects/workspaces
- Rotate credentials regularly

**Data Privacy**:
- Obsidian MCP: 100% local, no cloud ✅
- Excalidraw MCP: Local by default ✅
- Plane MCP: Cloud API (data transmitted) ⚠️

**Access Control**:
- Review what permissions each MCP server requests
- Audit MCP server code if sensitive data involved
- Use separate vaults/workspaces for public vs private data

---

## Troubleshooting

### "MCP server not found"

```bash
# Check if server is in config
claude mcp list

# Verify command path
which npx
which node

# Test command directly
npx obsidian-mcp-server --help
```

### "Connection refused"

**Obsidian MCP**:
- Is Obsidian running? ✓
- Is Local REST API plugin enabled? ✓
- Correct port (27123)? ✓

**Excalidraw MCP**:
- Is canvas server running? `npm run start:canvas`
- Is MCP server running? `npm run start:mcp`
- Ports 3000 & 8000 available? ✓

### "Authentication failed"

```bash
# Verify API keys
echo $OBSIDIAN_API_KEY
echo $PLANE_API_KEY

# Test API directly
curl -H "Authorization: Bearer $OBSIDIAN_API_KEY" \
  http://127.0.0.1:27123/vault/
```

### Performance Issues

**Obsidian MCP slow**:
- Enable caching: `OBSIDIAN_ENABLE_CACHE=true`
- Index large vaults in advance

**Excalidraw MCP slow**:
- Limit diagram complexity
- Export to PNG for static views

**Plane MCP timeouts**:
- Check API rate limits
- Use pagination for large queries

---

## Resources

### Official Documentation
- [Model Context Protocol Docs](https://modelcontextprotocol.io)
- [Claude Code MCP Guide](https://code.claude.com/docs/en/mcp)
- [Anthropic MCP SDK](https://github.com/anthropics/anthropic-sdk-typescript)

### MCP Server Registries
- [Awesome MCP Servers](https://github.com/serpvault/awesome-mcp-servers)
- [MCPServers.org](https://mcpservers.org)
- [MCP Market](https://mcpmarket.com)

### Community
- [MCP Discord](https://discord.gg/modelcontextprotocol)
- [Reddit r/ClaudeCode](https://reddit.com/r/ClaudeCode)
- GitHub Discussions in MCP server repos

---

## Next Steps

1. **Explore More Servers**: Browse [awesome-mcp-servers](https://github.com/serpvault/awesome-mcp-servers)
2. **Build Custom Server**: Integrate your own tools/databases
3. **Share Workflows**: Document and share your MCP workflows
4. **Contribute**: Improve existing MCP servers with PRs

---

**MCP unlocks the full potential of AI-assisted knowledge work.** Experiment, iterate, and build your perfect system! 🚀
