/**
 * Public read surface for agents. Account, checkout, admin, and webhook
 * routes stay out of this document.
 */
export const publicOpenApi = {
  openapi: '3.1.0',
  info: {
    title: 'FrankX public API',
    version: '1.0.0',
    summary: 'Read-only quotes, the daily dare, article markdown, 404 suggestions, a vCard, and the MCP server.',
    description:
      'Public read routes on frankx.ai. Prices, checkout, account data, admin tools, and webhooks are not in this document. The canonical host is https://www.frankx.ai.',
    contact: {
      name: 'FrankX',
      url: 'https://www.frankx.ai/contact',
      email: 'frank@frankx.ai',
    },
  },
  externalDocs: {
    description: 'Agent index',
    url: 'https://www.frankx.ai/llms.txt',
  },
  servers: [{ url: 'https://www.frankx.ai' }],
  tags: [
    { name: 'library', description: 'Quotes from the public library reviews.' },
    { name: 'dare', description: 'The public 30-day dare.' },
    { name: 'content', description: 'Published articles as markdown.' },
    { name: 'discovery', description: 'Suggestions for an unknown site path.' },
    { name: 'contact', description: 'A downloadable contact card.' },
    { name: 'mcp', description: 'Read-only Model Context Protocol server.' },
  ],
  paths: {
    '/api/quote/today': {
      get: {
        operationId: 'getQuoteToday',
        tags: ['library'],
        summary: 'Quote for the current date',
        description:
          'Returns one library quote chosen from the date. The same date and timezone return the same quote. tz is an IANA timezone name. The default is UTC. An unrecognized name fails the request.',
        parameters: [
          {
            name: 'tz',
            in: 'query',
            required: false,
            description: 'IANA timezone used to choose the calendar date. Default UTC.',
            schema: { type: 'string', default: 'UTC', examples: ['UTC', 'Europe/Berlin'] },
          },
        ],
        responses: {
          '200': {
            description: 'The quote for that date.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/QuoteToday' },
              },
            },
          },
          '503': {
            description: 'The library has no quotes to rotate.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/QuoteError' },
              },
            },
          },
        },
      },
    },
    '/api/quote/random': {
      get: {
        operationId: 'getRandomQuotes',
        tags: ['library'],
        summary: 'Random library quotes',
        description:
          'Returns up to count quotes from the public library. Filter with author (substring, case-insensitive) or book (exact review slug). count is an integer from 1 to 20. The default is 1.',
        parameters: [
          {
            name: 'author',
            in: 'query',
            required: false,
            description: 'Case-insensitive substring of the book author.',
            schema: { type: 'string' },
          },
          {
            name: 'book',
            in: 'query',
            required: false,
            description: 'Exact library review slug.',
            schema: { type: 'string' },
          },
          {
            name: 'count',
            in: 'query',
            required: false,
            description: 'How many quotes to return, from 1 to 20. Default 1.',
            schema: { type: 'integer', minimum: 1, maximum: 20, default: 1 },
          },
        ],
        responses: {
          '200': {
            description: 'One or more matching quotes.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RandomQuotes' },
              },
            },
          },
          '404': {
            description: 'No quote matches the filters.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/QuoteError' },
              },
            },
          },
        },
      },
    },
    '/api/dare/today': {
      get: {
        operationId: 'getDailyDare',
        tags: ['dare'],
        summary: 'Dare for the current date',
        description:
          'Returns the dare for the calendar date in tz. The quest is a fixed sequence of 30 days. The same date and timezone return the same dare. tz is an IANA timezone name. The default is UTC. An unrecognized name is read as UTC.',
        parameters: [
          {
            name: 'tz',
            in: 'query',
            required: false,
            description: 'IANA timezone used to choose the calendar date. Default UTC.',
            schema: { type: 'string', default: 'UTC', examples: ['UTC', 'Europe/Berlin'] },
          },
        ],
        responses: {
          '200': {
            description: 'The dare for that date.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/DailyDare' },
              },
            },
          },
        },
      },
    },
    '/api/md': {
      get: {
        operationId: 'exportBlogMarkdown',
        tags: ['content'],
        summary: 'Blog article as markdown',
        description:
          'Returns one published blog article as markdown. path must be /blog/<slug>. A missing path is plain text with status 400. An unknown slug, or a path that is not a blog article, is plain text with status 404.',
        parameters: [
          {
            name: 'path',
            in: 'query',
            required: true,
            description: 'Article path, for example /blog/agentic-ai-roadmap-2025.',
            schema: { type: 'string', examples: ['/blog/agentic-ai-roadmap-2025'] },
          },
        ],
        responses: {
          '200': {
            description: 'The article in markdown.',
            content: {
              'text/markdown': {
                schema: { type: 'string' },
              },
            },
          },
          '400': {
            description: 'The path query is missing. Body is the text "Missing path parameter".',
            content: {
              'text/plain': {
                schema: { type: 'string', const: 'Missing path parameter' },
              },
            },
          },
          '404': {
            description:
              'No article exists at that path. Body is "Not found" for an unknown blog slug, or "Content type not supported for markdown export" for any other path.',
            content: {
              'text/plain': {
                schema: { type: 'string' },
              },
            },
          },
        },
      },
    },
    '/api/404/match': {
      get: {
        operationId: 'matchUnknownPath',
        tags: ['discovery'],
        summary: 'Suggest a public page for an unknown path',
        description:
          'Returns up to five public pages that resemble path. This does not redirect. An absolute URL or a protocol-relative path is read as /. aliasHit is a curated destination when the path is a known alias, and null otherwise.',
        parameters: [
          {
            name: 'path',
            in: 'query',
            required: false,
            description: 'Site path to match. Default /.',
            schema: { type: 'string', default: '/', examples: ['/ikigaii'] },
          },
        ],
        responses: {
          '200': {
            description: 'Suggestions. matches is empty when nothing is close.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/PathMatch' },
              },
            },
          },
        },
      },
    },
    '/api/vcard': {
      get: {
        operationId: 'getVCard',
        tags: ['contact'],
        summary: 'Download the public vCard',
        description: 'Returns the public contact card as text/vcard.',
        responses: {
          '200': {
            description: 'A vCard file.',
            headers: {
              'Content-Disposition': {
                description: 'Attachment filename for the card.',
                schema: { type: 'string' },
              },
            },
            content: {
              'text/vcard': {
                schema: { type: 'string' },
              },
            },
          },
        },
      },
    },
    '/api/mcp': {
      get: {
        operationId: 'openMcpSession',
        tags: ['mcp'],
        summary: 'Open the MCP stream',
        description:
          'Streamable HTTP entry for the read-only frankx MCP server. The server is stateless and does not require a key. Tool calls go to POST.',
        responses: {
          '200': {
            description: 'Protocol response from the MCP transport.',
            content: {
              'application/json': {
                schema: { type: 'object', additionalProperties: true },
              },
            },
          },
        },
      },
      post: {
        operationId: 'callMcp',
        tags: ['mcp'],
        summary: 'Send one MCP JSON-RPC message',
        description:
          'Post a JSON-RPC 2.0 message. Read-only tools are frankx_search_site (query, optional limit 1-25), frankx_get_article (slug, optional maxChars and offset), and frankx_list_products (optional limit 1-100). initialize and tools/list follow the MCP protocol. Anonymous POST is limited to 30 requests per minute per address. A 429 includes Retry-After: 60.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/McpRequest' },
              examples: {
                search: {
                  summary: 'Search the public site',
                  value: {
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'tools/call',
                    params: {
                      name: 'frankx_search_site',
                      arguments: { query: 'agentic architecture', limit: 8 },
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'JSON-RPC result from the MCP server.',
            content: {
              'application/json': {
                schema: { type: 'object', additionalProperties: true },
              },
            },
          },
          '429': {
            description: 'The address exceeded 30 POST requests in a minute.',
            headers: {
              'Retry-After': {
                description: 'Seconds to wait before the next POST.',
                schema: { type: 'string', const: '60' },
              },
            },
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/McpRateLimit' },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Quote: {
        type: 'object',
        required: ['text', 'author', 'source', 'sourceSlug', 'permalink', 'shareImage'],
        properties: {
          text: { type: 'string' },
          chapter: { type: ['string', 'null'] },
          context: { type: ['string', 'null'] },
          author: { type: 'string' },
          source: { type: 'string', description: 'Book title.' },
          sourceSlug: { type: 'string', description: 'Library review slug.' },
          permalink: { type: 'string', format: 'uri' },
          shareImage: { type: 'string', format: 'uri' },
        },
      },
      QuoteMeta: {
        type: 'object',
        required: ['source', 'license', 'attribution_required'],
        properties: {
          source: { type: 'string' },
          license: { type: 'string' },
          attribution_required: { type: 'boolean' },
          rotation: { type: 'string' },
        },
      },
      QuoteToday: {
        type: 'object',
        required: ['date', 'timezone', 'total', 'quote', 'meta'],
        properties: {
          date: { type: 'string', description: 'Calendar date YYYY-MM-DD in the requested timezone.' },
          timezone: { type: 'string' },
          total: { type: 'integer', minimum: 1 },
          quote: { $ref: '#/components/schemas/Quote' },
          meta: { $ref: '#/components/schemas/QuoteMeta' },
        },
      },
      RandomQuotes: {
        type: 'object',
        required: ['count', 'total', 'quotes', 'meta'],
        properties: {
          count: { type: 'integer', minimum: 1 },
          total: { type: 'integer', minimum: 1 },
          quotes: {
            type: 'array',
            items: { $ref: '#/components/schemas/Quote' },
          },
          meta: { $ref: '#/components/schemas/QuoteMeta' },
        },
      },
      QuoteError: {
        type: 'object',
        required: ['error', 'total'],
        properties: {
          error: { type: 'string' },
          total: { type: 'integer', const: 0 },
        },
      },
      DailyDare: {
        type: 'object',
        required: ['date', 'timezone', 'day', 'questLength', 'chapter', 'dare', 'permalink', 'meta'],
        properties: {
          date: { type: 'string' },
          timezone: { type: 'string' },
          day: { type: 'integer', minimum: 1 },
          questLength: { type: 'integer', const: 30 },
          chapter: {
            type: 'object',
            required: ['id', 'title', 'principle', 'days', 'book'],
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              principle: { type: 'string' },
              days: {
                type: 'array',
                description: 'Inclusive first and last day of the chapter in the 30-day quest.',
                prefixItems: [{ type: 'integer' }, { type: 'integer' }],
                minItems: 2,
                maxItems: 2,
                items: { type: 'integer' },
              },
              book: { type: 'string', format: 'uri' },
            },
          },
          dare: {
            type: 'object',
            required: ['title', 'mindStretch', 'prompt', 'mindConcept', 'goodDeed'],
            properties: {
              title: { type: 'string' },
              mindStretch: { type: 'string' },
              prompt: {
                type: 'object',
                required: ['framing', 'title', 'content'],
                properties: {
                  framing: { type: 'string' },
                  title: { type: ['string', 'null'] },
                  content: { type: ['string', 'null'] },
                },
              },
              mindConcept: { type: 'string' },
              goodDeed: { type: 'string' },
            },
          },
          permalink: { type: 'string', format: 'uri' },
          meta: {
            type: 'object',
            required: ['source', 'rotation'],
            properties: {
              source: { type: 'string' },
              rotation: { type: 'string' },
            },
          },
        },
      },
      PathMatch: {
        type: 'object',
        required: ['matches', 'topConfidence', 'aliasHit'],
        properties: {
          matches: {
            type: 'array',
            items: {
              type: 'object',
              required: ['href', 'type', 'score', 'matchedOn'],
              properties: {
                href: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
                tags: { type: 'array', items: { type: 'string' } },
                type: { type: 'string' },
                score: {
                  type: 'number',
                  minimum: 0,
                  maximum: 1,
                  description: '0 is the closest match.',
                },
                matchedOn: { type: 'string' },
              },
            },
          },
          topConfidence: { type: 'number', minimum: 0, maximum: 1 },
          aliasHit: {
            type: ['string', 'null'],
            description: 'Curated destination for a known alias, or null.',
          },
        },
      },
      McpRequest: {
        type: 'object',
        required: ['jsonrpc', 'method'],
        properties: {
          jsonrpc: { type: 'string', const: '2.0' },
          id: { type: ['string', 'number', 'null'] },
          method: { type: 'string' },
          params: { type: 'object', additionalProperties: true },
        },
      },
      McpRateLimit: {
        type: 'object',
        required: ['error'],
        properties: {
          error: { type: 'string', const: 'Too many requests. Please try again in a minute.' },
        },
      },
    },
  },
}
