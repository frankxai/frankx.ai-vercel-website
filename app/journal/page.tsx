import type { Metadata } from 'next'
import { metadata as blogMetadata } from '@/app/blog/page'

export { default } from '@/app/blog/page'

export const metadata: Metadata = {
  ...blogMetadata,
  alternates: { canonical: '/blog' },
  robots: {
    index: false,
    follow: true,
  },
}
