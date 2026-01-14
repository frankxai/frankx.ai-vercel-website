import type { Metadata } from 'next'
import { metadata as linksMetadata, linksPageSchema } from './metadata'

export const metadata: Metadata = linksMetadata

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(linksPageSchema),
        }}
      />
    </>
  )
}
