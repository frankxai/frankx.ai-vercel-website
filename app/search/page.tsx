import Search from '@/components/search/Search'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Search',
  description: 'Search for content on the FrankX.ai website.',
  path: '/search',
})

export default function SearchPage() {
  return <Search />
}