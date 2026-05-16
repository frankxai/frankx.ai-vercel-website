import type { Metadata } from 'next'

/**
 * Unlisted proposal segment.
 *
 * Every route under /partnerships/proposal/* is noindex. The URL is shared
 * by Frank directly with one recipient. robots.txt also disallows this
 * segment as belt-and-suspenders.
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
    },
  },
}

export default function ProposalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
