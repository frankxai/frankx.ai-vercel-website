import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import { createFrankxMcpServer } from '@/lib/mcp/frankx-server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Stateless: every request gets its own server and transport, so nothing is held between calls.
async function handle(request: Request): Promise<Response> {
  const server = createFrankxMcpServer()
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  })
  await server.connect(transport)
  return transport.handleRequest(request)
}

export { handle as DELETE, handle as GET, handle as POST }
