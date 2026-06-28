import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

// Register two example tools and one resource on the given server.
// Keep tool bodies pure and side-effect-light; read secrets from process.env.
export function registerCapabilities(server: McpServer): void {
  // -------------------------------------------------------------------------
  // Tool 1: a deterministic computation. No I/O, easy to test.
  // -------------------------------------------------------------------------
  server.registerTool(
    'sum',
    {
      title: 'Sum numbers',
      description: 'Add a list of numbers and return the total.',
      inputSchema: {
        numbers: z.array(z.number()).describe('The numbers to add'),
      },
    },
    async ({ numbers }) => {
      const total = numbers.reduce((acc, n) => acc + n, 0);
      return {
        content: [{ type: 'text', text: String(total) }],
      };
    }
  );

  // -------------------------------------------------------------------------
  // Tool 2: a tiny "I/O-shaped" tool. Returns canned data so the kit runs with
  // no external API. Swap the body for a real fetch (read the key from env).
  // -------------------------------------------------------------------------
  server.registerTool(
    'get_weather',
    {
      title: 'Get weather',
      description: 'Get the current weather for a city (example: returns stubbed data).',
      inputSchema: {
        city: z.string().describe('City name, e.g. "Vienna"'),
      },
    },
    async ({ city }) => {
      // --- Replace with a real call, e.g.:
      // const key = process.env.WEATHER_API_KEY;
      // const res = await fetch(`https://api.example.com/weather?q=${city}&key=${key}`);
      const stub = { city, tempC: 21, conditions: 'Clear', source: 'stubbed' };
      return {
        content: [{ type: 'text', text: JSON.stringify(stub, null, 2) }],
      };
    }
  );

  // -------------------------------------------------------------------------
  // Resource: a static document the client can read. Resources are addressable
  // by URI; this one is exposed at `info://server`.
  // -------------------------------------------------------------------------
  server.registerResource(
    'server-info',
    'info://server',
    {
      title: 'Server info',
      description: 'Basic information about this MCP server.',
      mimeType: 'application/json',
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: 'application/json',
          text: JSON.stringify(
            {
              name: 'mcp-server-kit',
              tools: ['sum', 'get_weather'],
              transports: ['stdio', 'streamable-http'],
            },
            null,
            2
          ),
        },
      ],
    })
  );
}
