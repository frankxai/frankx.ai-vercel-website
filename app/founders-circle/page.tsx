import { redirect } from 'next/navigation'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Advisory route moved — FrankX',
  description:
    'Founder’s Circle is not accepting applications. The current path begins with one recurring workflow.',
  path: '/founders-circle',
  noindex: true,
})

export default function FoundersCirclePage() {
  redirect('/work-with-me#contact')
}
