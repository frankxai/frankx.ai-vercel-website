import { permanentRedirect } from 'next/navigation'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Applications closed — FrankX',
  description:
    'Founder’s Circle is not accepting applications. The current path begins with one recurring workflow.',
  path: '/founders-circle/apply',
  noindex: true,
})

export default function ApplyPage() {
  permanentRedirect('/work-with-me#contact')
}
