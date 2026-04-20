# Building Your First Server

> "The best way to learn is to build."
> — Every engineer who ever shipped

---

You are about to build an MCP server. Not read about one. Not watch a tutorial about one. Build one. In under fifty lines of code.

The server you build in this chapter will expose a simple tool — a weather lookup — through the MCP protocol. By the end, any MCP-compatible AI client (Claude Code, Cursor, VS Code) will be able to call your server and get weather data through natural language.

This is the smallest useful server. It teaches you every concept you need without burying you in complexity.

---

## I. The Setup

You need three things:
1. Node.js installed (version 18 or higher)
2. A terminal
3. A text editor

Create a new directory and initialize the project:

```bash
mkdir my-first-mcp-server
cd my-first-mcp-server
npm init -y
npm install @modelcontextprotocol/sdk
```

The `@modelcontextprotocol/sdk` package provides the TypeScript/JavaScript implementation of the MCP protocol. It handles transport, message formatting, error handling, and connection management. You provide the logic — what your server knows and what it can do.

---

## II. The Server

Create a file called `server.js`:

```javascript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new McpServer({
  name: 'weather-server',
  version: '1.0.0',
});

// Define a Tool: get current weather
server.tool(
  'get-weather',
  'Get the current weather for a city',
  {
    city: {
      type: 'string',
      description: 'The city name (e.g., Amsterdam, Berlin, New York)',
    },
  },
  async ({ city }) => {
    // In production, call a real weather API
    // For learning, we return simulated data
    const weather = {
      Amsterdam: { temp: '14°C', condition: 'Partly cloudy', humidity: '72%' },
      Berlin: { temp: '11°C', condition: 'Overcast', humidity: '68%' },
      'New York': { temp: '18°C', condition: 'Sunny', humidity: '55%' },
    };

    const data = weather[city] || { temp: 'Unknown', condition: 'City not found', humidity: 'N/A' };

    return {
      content: [{
        type: 'text',
        text: `Weather in ${city}: ${data.temp}, ${data.condition}. Humidity: ${data.humidity}`,
      }],
    };
  }
);

// Connect via stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);
```

That is a complete MCP server. Thirty-seven lines. It defines one Tool (`get-weather`) that accepts a city name and returns weather data.

---

## III. What Just Happened

Let us walk through the architecture:

**Line 1-2: Imports.** The SDK provides two key classes: `McpServer` (the server logic) and `StdioServerTransport` (the communication channel). Stdio transport means the server communicates through standard input/output — the simplest transport, perfect for local development.

**Line 4-7: Server creation.** You give the server a name and version. These appear in the MCP client's server list — like a business card for your server.

**Line 10-33: Tool definition.** The `server.tool()` method takes four arguments:
1. The tool name (`get-weather`)
2. A description (the AI reads this to decide when to use the tool)
3. An input schema (what parameters the tool accepts)
4. A handler function (what happens when the tool is called)

The input schema is JSON Schema — the same standard used by REST APIs, OpenAPI, and every modern web framework. If you have written a JSON Schema before, you already know how to define MCP tool inputs.

**Line 35-36: Transport connection.** The server connects to the stdio transport and waits for messages from the client.

---

## IV. Connecting to Claude Code

To use your server with Claude Code, add it to your MCP configuration. Open your Claude Code settings and add:

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": ["server.js"],
      "cwd": "/path/to/my-first-mcp-server"
    }
  }
}
```

Now start Claude Code. Your weather server is connected. Try:

"What's the weather in Amsterdam?"

Claude reads the tool description, recognizes this is a weather query, calls the `get-weather` tool with `{ city: "Amsterdam" }`, and returns: "Weather in Amsterdam: 14°C, Partly cloudy. Humidity: 72%."

You just gave an AI the ability to check the weather. Through a protocol. In thirty-seven lines.

---

## V. From Toy to Production

The weather server is a toy. Here is how each element scales to production:

**The simulated data becomes an API call.** Replace the hardcoded weather object with a fetch to OpenWeatherMap, WeatherAPI, or any weather service. The MCP server becomes a bridge between the AI and the API — handling authentication, rate limiting, and response formatting.

**The single tool becomes a toolkit.** Add more tools: `get-forecast` for multi-day predictions, `get-alerts` for weather warnings, `compare-cities` for side-by-side comparison. Each tool is another `server.tool()` call — the pattern is the same.

**The stdio transport becomes HTTP.** For servers that need to run remotely — on a server, in the cloud, as a shared service — replace `StdioServerTransport` with the HTTP transport. The protocol stays the same. The transport changes. This is why MCP separates protocol from transport — you can change how the server communicates without changing what it does.

**Error handling becomes robust.** The production server validates inputs, catches API failures, implements retries, and returns structured error messages that help the AI recover gracefully.

---

## VI. Your Second Server

Now build something useful. Here are three servers that take less than an hour each:

**1. A file search server.** Expose your project's file system as a Resource. Add a Tool that searches file contents by regex. Now Claude Code can search your entire codebase through natural language — "find all files that import the auth module."

**2. A database query server.** Connect to your PostgreSQL or SQLite database. Expose table schemas as Resources. Add a Tool that runs read-only SQL queries. Now the AI can answer "how many users signed up this week?" by querying your actual data.

**3. A deployment status server.** Connect to Vercel, Netlify, or your CI/CD platform. Expose deployment history as a Resource. Add a Tool that checks build status. Now "is the latest deploy healthy?" returns a real answer instead of a guess.

Each of these servers follows the same pattern: import the SDK, define Resources and Tools, connect the transport. The pattern does not change. The domain does.

---

## VII. The Builder's Mindset

The MCP ecosystem has 1,400+ servers. That sounds like a lot. It is not. Consider every API you interact with — Stripe, Twilio, Notion, Linear, Figma, your company's internal tools. Each one is a potential MCP server. Each one would give the AI hands where it currently has none.

The people who build MCP servers now are not just building tools. They are building infrastructure. And infrastructure, once established, compounds.

Your first server is thirty-seven lines. Your tenth will be a hundred. Your hundredth will be the one that changes how you work.

Start building.
