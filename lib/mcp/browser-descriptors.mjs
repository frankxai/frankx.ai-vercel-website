/** Public read tools already implemented by /api/mcp; server schemas enforce inputs. */
export const browserDescriptors = [
  {
    name: 'frankx_search_site',
    title: 'Search frankx.ai',
    description: 'Find public articles, guides, tools and product pages by keywords. Returns titles, descriptions, URLs and page types.',
    inputSchema: { type: 'object', properties: {
      query: { type: 'string', minLength: 1, maxLength: 200 },
      limit: { type: 'integer', minimum: 1, maximum: 25, default: 8 },
    }, required: ['query'], additionalProperties: false },
    annotations: { readOnlyHint: true },
  },
  {
    name: 'frankx_get_article',
    title: 'Read a frankx.ai article',
    description: 'Read a public blog article by slug. Returns markdown, canonical URL and pagination. Continue with nextOffset until null.',
    inputSchema: { type: 'object', properties: {
      slug: { type: 'string', pattern: '^[a-z0-9][a-z0-9-]{0,200}$' },
      maxChars: { type: 'integer', minimum: 1000, maximum: 100000, default: 40000 },
      offset: { type: 'integer', minimum: 0, maximum: 10000000, default: 0 },
    }, required: ['slug'], additionalProperties: false },
    annotations: { readOnlyHint: true },
  },
  {
    name: 'frankx_list_products',
    title: 'List frankx.ai products',
    description: 'Read public product names, headlines and page URLs. Pricing and availability require opening the product page. Does not buy or enroll.',
    inputSchema: { type: 'object', properties: {
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 50 },
    }, additionalProperties: false },
    annotations: { readOnlyHint: true },
  },
]
