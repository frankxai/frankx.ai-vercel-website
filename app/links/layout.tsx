import type { Metadata } from 'next'
import { metadata as linksMetadata, linksPageSchema } from './metadata'

export const metadata: Metadata = linksMetadata

/**
 * Safely serializes JSON-LD schema with XSS protection
 * Escapes </script> tags and other potentially dangerous sequences
 */
function safeJsonLdSerializer(schema: object): string {
  return JSON.stringify(schema)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
}

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Pre-serialize at build time for security
  const safeSchema = safeJsonLdSerializer(linksPageSchema)

  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeSchema,
        }}
      />
    </>
  )
}
