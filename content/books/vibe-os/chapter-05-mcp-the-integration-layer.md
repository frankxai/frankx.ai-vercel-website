# MCP -- The Integration Layer

Every tool in the previous chapters -- Next.js, Vercel, n8n, Resend, Vercel Blob -- is powerful on its own. But a creator platform is not a collection of tools. It is a system where tools connect, communicate, and coordinate. The integration layer is what turns twenty independent services into one coherent infrastructure.

MCP -- Model Context Protocol -- is the standard that makes this integration possible. It is a protocol developed by Anthropic that allows AI agents (like Claude Code) to interact with external tools, data sources, and services through a unified interface. Instead of switching between browser tabs, dashboards, and terminal windows to manage your infrastructure, you interact with everything through a single conversation.

This chapter covers how MCP works, how the 21 servers in Frank's stack are organized, how to configure them, and the performance considerations that determine how many you can run simultaneously.

---

## I. The Three Primitives

MCP defines three types of capabilities that a server can expose:

**Resources** are data that the AI can read. A filesystem MCP server exposes files as resources. A database MCP server exposes tables and queries as resources. Resources are passive -- the AI requests them when it needs information.

**Tools** are actions that the AI can perform. A Vercel MCP server exposes deployment management as tools. A Resend MCP server exposes email sending as tools. Tools are active -- the AI calls them to make things happen.

**Prompts** are pre-defined interaction patterns that the AI can use. A code review MCP server might expose a "review this pull request" prompt that structures the review process. Prompts are templates -- they guide the AI's behavior for specific tasks.

In practice, most MCP servers expose tools. The frankx.ai stack uses tools almost exclusively: deploy a site, send an email, create a workflow, generate an image, read a Slack channel. Resources and prompts are useful for more complex scenarios but are less common in current server implementations.

### How a Tool Call Works

When you tell Claude Code "check if the latest deployment succeeded," here is what happens:

1. Claude Code recognizes that this requires the Vercel MCP server
2. It calls the `list_deployments` tool with the project identifier
3. The MCP client (built into Claude Code) sends a JSON-RPC request to the Vercel MCP server process
4. The MCP server calls Vercel's REST API with the appropriate authentication
5. The API response is formatted and returned to Claude Code
6. Claude Code interprets the result and reports it in natural language

All of this happens in 1-3 seconds. The user sees: "The latest deployment (commit abc123) succeeded at 2:34 PM. Build time was 62 seconds."

---

## II. The 21 MCP Servers

Frank's stack runs 21 MCP servers, organized into four clusters based on function.

### Development Cluster (6 servers)

| Server         | Purpose                           | Tools |
|----------------|-----------------------------------|-------|
| Playwright     | Browser automation and testing    | 18    |
| Memory         | Persistent knowledge graph        | 10    |
| Sequential Thinking | Structured reasoning chains  | 1     |
| v0             | UI component generation           | 5     |
| Figma          | Design file access and analysis   | 12    |
| MCP Doctor     | MCP server health diagnostics     | 4     |

**Playwright** is the most versatile development server. It can navigate to a URL, take a screenshot, fill forms, click buttons, and read page content. This enables automated testing workflows: deploy a preview, navigate to it with Playwright, verify the page renders correctly, check that links work, and report any issues.

**Memory** provides a persistent knowledge graph that survives across conversations. It stores entities (projects, decisions, configurations) and relations between them. This means Claude Code can remember that "the last time we changed the CSP header, it broke Suno embeds" without you restating the context.

### Content Cluster (3 servers)

| Server         | Purpose                           | Tools |
|----------------|-----------------------------------|-------|
| Resend         | Email creation and management     | 30+   |
| Nanobanana     | Image generation via Gemini       | 4     |
| Canva          | Design creation and export        | 25+   |

**Resend** is the most heavily used content server. It handles every email operation: sending transactional emails, managing contact lists, creating broadcasts, tracking deliveries. The full tool set includes contact management, audience segmentation, domain configuration, and webhook management -- all accessible from the command line.

**Nanobanana** bridges Claude Code to Google's Gemini image generation models. When Frank needs a blog hero image, a book cover concept, or a social media graphic, the workflow is:

```
"Generate a hero image for a blog post about AI architecture.
Dark background, abstract geometric patterns in emerald and cyan,
16:9 aspect ratio."
```

Claude Code calls the Nanobanana MCP server, which sends the prompt to Gemini 3 Pro Image (or Gemini 3.1 Flash Image for faster generation), and returns the generated image as a file. The image is saved to the repository, committed, and deployed with the content. Total time from prompt to published image: under 60 seconds.

### Automation Cluster (2 servers)

| Server         | Purpose                           | Tools |
|----------------|-----------------------------------|-------|
| n8n MCP        | Workflow management               | 16    |
| Vercel         | Deployment and monitoring         | 17    |

These two servers are covered in detail in the previous chapters. Together, they allow Claude Code to manage the entire deployment and automation infrastructure without leaving the terminal.

### Intelligence Cluster (4 servers)

| Server         | Purpose                           | Tools |
|----------------|-----------------------------------|-------|
| Notion         | Document and database access      | 12    |
| Slack          | Channel reading and messaging     | 12    |
| Linear         | Issue tracking and project mgmt   | 25+   |
| Web search/fetch | Internet access and research   | 2     |

**Slack** integration is bidirectional. Claude Code can read Slack channels to check what the n8n workflows have posted (content atomizer output, intelligence reports, error notifications), and it can send messages to channels for notifications or status updates.

**Notion** provides access to the project's planning documents, meeting notes, and knowledge base. Instead of switching to Notion to check a planning document, Claude Code reads it directly through MCP.

### Plugin Servers (6 additional)

Beyond the core 21, several specialized servers are available but loaded on demand:

| Server            | Purpose                              |
|-------------------|--------------------------------------|
| Music Lab         | Music catalog and production tools   |
| Visual Studio     | Image analysis and editing           |
| Product Launcher  | Product creation workflows           |
| Brand Architect   | Brand consistency checking           |

These are not loaded by default because of memory constraints (discussed in section V). They activate when the conversation topic requires them.

---

## III. Configuration

MCP servers are configured in Claude Code's settings files. There are three levels of configuration:

**Global** (`~/.claude/settings.json`) -- Servers available in every project.

**Project** (`.claude/settings.json` in the repo) -- Servers specific to this project.

**Local** (`.claude/settings.local.json`) -- Personal server configurations not committed to the repository.

A typical server configuration:

```json
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "npx",
      "args": ["-y", "@leonardoaalves/n8n-mcp-server"],
      "env": {
        "N8N_BASE_URL": "https://your-instance.railway.app",
        "N8N_API_KEY": "your-api-key"
      }
    },
    "nanobanana": {
      "command": "npx",
      "args": ["-y", "nano-banana@latest"],
      "env": {
        "GEMINI_API_KEY": "your-gemini-key",
        "OUTPUT_DIR": "/path/to/output"
      }
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@anthropic/memory-mcp-server"],
      "env": {
        "MEMORY_FILE": "/path/to/memory.json"
      }
    }
  }
}
```

Each server is a separate process launched by Claude Code at session startup. The `command` and `args` specify how to start the server. The `env` object provides credentials and configuration.

### Credential Management

MCP server credentials follow the same principle as Vercel environment variables: secrets never appear in committed code. The pattern:

- API keys go in `.claude/settings.local.json` (git-ignored)
- The global `~/.claude/settings.json` contains servers that need system-wide credentials
- Project-level `.claude/settings.json` contains only server references, not secrets

For servers configured through the Claude.ai plugin system (Vercel, Slack, Notion, Figma, Canva, Linear), credentials are managed by Anthropic's OAuth flow. You authorize the integration once, and the MCP server receives tokens automatically.

---

## IV. Server Profiles for Different Work Types

Not every task requires all 21 servers. Loading unnecessary servers wastes memory and slows startup. The solution is conceptual profiles -- groups of servers activated based on the type of work.

### Writing Profile (8 servers)

When the task is content creation -- writing blog posts, book chapters, or email sequences:

- Memory (context from previous sessions)
- Resend (email delivery for lead magnets)
- Nanobanana (hero image generation)
- Slack (posting content for review)
- Sequential Thinking (structured reasoning for complex topics)
- Web search (research and fact-checking)
- Notion (reference documents)
- v0 (UI component prototyping for interactive content)

### Development Profile (10 servers)

When the task is code changes -- building features, fixing bugs, deploying updates:

- Vercel (deployment monitoring)
- n8n MCP (workflow management)
- Playwright (browser testing)
- Memory (codebase context)
- Figma (design reference)
- MCP Doctor (server health)
- Slack (error notifications)
- Linear (issue tracking)
- Sequential Thinking (architectural decisions)
- v0 (component generation)

### Publishing Profile (6 servers)

When the task is deploying content to production:

- Vercel (deployment)
- n8n MCP (trigger content atomizer)
- Resend (subscriber notification)
- Slack (publication announcement)
- Nanobanana (last-minute image needs)
- Memory (deployment history)

In practice, Claude Code loads all configured servers at startup and the user does not manually switch profiles. But understanding which servers are needed for which tasks helps when optimizing for memory constraints.

---

## V. Performance Considerations

Running 21 MCP servers simultaneously has real resource implications. On a 12GB RAM WSL environment, the numbers are:

| Metric                  | Value                        |
|-------------------------|------------------------------|
| Total memory (21 servers) | ~600MB - 1.7GB             |
| Average per server      | ~30-80MB                     |
| Startup time            | 10-30 seconds                |
| Session limit (12GB)    | 3 sessions smooth, 4 light swap, 5+ thrashing |

### Memory Budgeting

Each MCP server runs as a separate Node.js process (most servers are JavaScript/TypeScript). A minimal server uses approximately 30MB. Servers with larger dependencies (Playwright, Canva) can use 80-120MB.

On a machine with 12GB of RAM:

- WSL base: ~2GB
- Claude Code process: ~500MB
- 21 MCP servers: ~1.2GB average
- Available for builds/processes: ~8.3GB

This is comfortable for a single session. Running multiple Claude Code sessions simultaneously (for parallel work on different branches) reduces the available memory proportionally.

### Startup Optimization

The 10-30 second startup time for all servers is mostly spent on `npx` resolving and downloading packages. Two strategies reduce this:

1. **Local installation.** Instead of `npx -y package-name`, install the MCP server globally with `npm install -g package-name` and reference the local binary. This eliminates the download step.

2. **Lazy loading.** Some servers support lazy initialization, where the process starts immediately but defers heavy operations (like database connections or API authentication) until the first tool call. This reduces perceived startup time.

### Known Issues

The `chroma-mcp` server (used by some memory systems) has a known bug where the worker service spawns duplicate instances per session, consuming approximately 2.1GB of memory for what should be a 200MB process. The fix is to use HTTP shared mode or avoid the server entirely. The Memory MCP server from Anthropic does not have this issue.

---

## VI. Building a Custom MCP Server

One of the most powerful aspects of MCP is that building a server is simple. A minimal MCP server in JavaScript requires approximately 50 lines of code.

Here is the structure of a custom MCP server that exposes a single tool:

```javascript
#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

const server = new Server(
  { name: 'my-custom-server', version: '1.0.0' },
  { capabilities: { tools: {} } }
)

// Define available tools
server.setRequestHandler('tools/list', async () => ({
  tools: [
    {
      name: 'check_status',
      description: 'Check the status of a service',
      inputSchema: {
        type: 'object',
        properties: {
          service: {
            type: 'string',
            description: 'The service name to check',
          },
        },
        required: ['service'],
      },
    },
  ],
}))

// Handle tool calls
server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'check_status') {
    const service = request.params.arguments.service
    // Your custom logic here
    const status = await checkService(service)
    return {
      content: [{ type: 'text', text: `${service}: ${status}` }],
    }
  }
})

// Start the server
const transport = new StdioServerTransport()
await server.connect(transport)
```

Register it in your Claude Code settings:

```json
{
  "mcpServers": {
    "my-custom-server": {
      "command": "node",
      "args": ["/path/to/my-server.js"]
    }
  }
}
```

This pattern opens up integration with any service that has an API. If you use a tool that does not have an MCP server, you can build one in an afternoon. The MCP SDK handles all the protocol details -- you write the logic for listing tools, handling calls, and returning results.

---

## VII. The Nanobanana MCP: Image Generation from the Terminal

The Nanobanana MCP server deserves special attention because it solves one of the most common friction points in content creation: generating images without leaving the writing environment.

### How It Works

Nanobanana wraps Google's Gemini image generation models and exposes them as MCP tools:

| Tool              | Purpose                                    |
|-------------------|--------------------------------------------|
| `generate_image`  | Generate an image from a text prompt       |
| `upload_file`     | Upload a reference image for editing       |
| `show_output_stats` | View generation history and statistics  |
| `maintenance`     | Cleanup and cache management               |

The generation workflow:

1. Claude Code receives a request: "Generate a hero image for this blog post"
2. Claude Code crafts a detailed prompt based on the blog content and brand visual DNA
3. The `generate_image` tool sends the prompt to Gemini
4. The generated image is saved to the specified output directory
5. Claude Code moves it to the correct location in `public/images/`
6. The image is referenced in the blog post's frontmatter

### Model Selection

Nanobanana supports three Gemini models:

| Model                    | Speed    | Quality  | Best For                  |
|--------------------------|----------|----------|---------------------------|
| Gemini 3.1 Flash Image   | Fast     | Good     | Rapid iteration, drafts   |
| Gemini 3 Pro Image       | Moderate | Excellent | Final hero images, covers |
| Gemini 2.5 Flash Image   | Fast     | Good     | Legacy, subject consistency |

For blog hero images, the typical workflow is: generate 2-3 options with Flash (fast, cheap), select the best composition, then regenerate with Pro for maximum quality. The total time for a publication-ready hero image is 2-5 minutes, including prompt refinement.

### Brand Visual DNA

The `data/brand-visual-dna.json` file defines the visual standards for all generated images:

- Color palette: dark backgrounds, emerald/cyan accents, amber highlights
- Style: abstract geometric, clean composition, no text in images
- Mood: technical, sophisticated, forward-looking
- Constraints: no faces (avoids uncanny valley), no stock photo aesthetics

Claude Code references this file when crafting image generation prompts, ensuring visual consistency across all generated assets without manual art direction.

---

## VIII. The Integration Principle

The real value of MCP is not any individual server. It is the elimination of context-switching.

Without MCP, the workflow for publishing a blog post is:

1. Write the post in the terminal (Claude Code)
2. Switch to a browser, open Gemini, generate a hero image
3. Download the image, move it to the right directory
4. Switch to Vercel dashboard, check if the previous deployment succeeded
5. Push the commit, switch back to Vercel to monitor the build
6. Switch to n8n dashboard, manually trigger the Content Atomizer
7. Switch to Slack, review the atomized content
8. Switch to Resend dashboard, verify subscriber list
9. Send the newsletter

With MCP, the same workflow is:

1. Write the post (Claude Code)
2. "Generate a hero image for this post" (Nanobanana MCP)
3. "Push to production and monitor the deployment" (Git + Vercel MCP)
4. "Trigger the content atomizer" (n8n MCP)
5. "Check the Slack output" (Slack MCP)
6. "Send the newsletter to subscribers" (Resend MCP)

Six steps instead of nine, all in one terminal window, all in one conversation. The cognitive overhead of managing multiple browser tabs, remembering dashboard URLs, and maintaining mental context across tools is eliminated.

This is what infrastructure should feel like: invisible. You think about what you want to accomplish -- publish a blog post, notify subscribers, distribute to social media -- and the tools execute. MCP is the protocol that makes the tools feel like a single system instead of twenty disconnected services.

The $50 architecture is not just cheap. It is integrated. And integration, more than any individual tool choice, is what makes a one-person studio feel like a team.
