export function normalizeFAQText(value: unknown): string

export function extractFAQFromBody(content: string): Array<{ question: string; answer: string }>

export function generateSchemaForFile(filepath: string): Promise<{
  slug: string
  schema: {
    '@context': string
    '@graph': Array<Record<string, unknown>>
  }
  stats: { faqCount: number; hasImage: boolean; hasTldr: boolean }
} | null>
