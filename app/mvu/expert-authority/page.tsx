import ExpertAuthorityExperience from '@/components/expert-authority/ExpertAuthorityExperience'
import { createMetadata } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata = createMetadata({
  title: 'Expert Authority Intelligence System',
  description:
    'Diagnose the five engines that turn expertise into authority, products, traffic, conversion, and a compounding AI operating system.',
  path: '/mvu/expert-authority',
  image: '/mvu/expert-authority/opengraph-image',
  keywords: [
    'expert authority',
    'authority intelligence',
    'knowledge business',
    'creator operating system',
    'expert diagnostic',
  ],
})

export default function ExpertAuthorityPage() {
  return <ExpertAuthorityExperience />
}
