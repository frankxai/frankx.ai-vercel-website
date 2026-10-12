import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import { createFrankxMcpServer } from '@/lib/mcp/frankx-server'
import { getClientIdentifier, mcpRatelimit } from '@/lib/ratelimit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type JsonRpcMessage = { method?: unknown; params?: { arguments?: unknown } }

/**
 * `arguments` is optional on tools/call, but SDK 1.30 validates a missing value against the tool's object schema
 * and rejects it, so frankx_list_products() without arguments failed. SDK v2 defaults it to {}; delete this then.
 */
function withDefaultArguments(message: JsonRpcMessage): JsonRpcMessage {
  if (message?.method !== 'tools/call' || !message.params || message.params.arguments !== undefined) return message
  return { ...message, params: { ...message.params, arguments: {} } }
}

async function parsedBody(request: Request): Promise<unknown> {
  if (request.method !== 'POST') return undefined
  try {
    const body = await request.clone().json()
    return Array.isArray(body) ? body.map(withDefaultArguments) : withDefaultArguments(body)
  } catch {
    // Not JSON: let the transport produce its own parse error.
    return undefined
  }
}

// Stateless: every request gets its own server and transport, so nothing is held between calls.
// POST is the tool surface. Count it before building a server so a flood cannot allocate one.
async function handle(request: Request): Promise<Response> {
  if (request.method === 'POST') {
    const { success } = await mcpRatelimit.limit(`mcp:ip:${getClientIdentifier(request)}`)
    if (!success) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again in a minute.' }),
        {
          status: 429,
          headers: {
            'content-type': 'application/json',
            'retry-after': '60',
            'cache-control': 'no-store',
          },
        },
      )
    }
  }

  const server = createFrankxMcpServer()
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  })
  await server.connect(transport)
  const body = await parsedBody(request)
  return body === undefined ? transport.handleRequest(request) : transport.handleRequest(request, { parsedBody: body })
}

export { handle as DELETE, handle as GET, handle as POST }
