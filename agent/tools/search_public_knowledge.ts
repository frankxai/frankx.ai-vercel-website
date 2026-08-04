import { defineTool } from 'eve/tools'
import { z } from 'zod'
import { PUBLIC_KNOWLEDGE_DOMAINS, publicCorpusInfo, searchPublicCorpus } from '../lib/search-public-corpus'

export default defineTool({
  description: 'Search FrankX public essays, pages, approved identity facts, and operating principles. Use before making claims about Frank, FrankX, or Frank’s methods. Results include public URLs for citations.',
  inputSchema: z.object({
    query: z.string().trim().min(2).max(320),
    domains: z.array(z.enum(PUBLIC_KNOWLEDGE_DOMAINS)).max(5).default([]),
    limit: z.number().int().min(1).max(12).default(8),
  }),
  execute({ query, domains, limit }) {
    return {
      corpus: publicCorpusInfo(),
      results: searchPublicCorpus({ query, domains, limit }),
      citationRule: 'Cite supporting results with their public URL. Mark synthesis or inference explicitly.',
    }
  },
})
