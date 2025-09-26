import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { createMetadata } from '@/lib/seo'

import SearchClient from './SearchClient'

export const metadata = createMetadata({
  title: 'Search the FrankX Intelligence Hub',
  description:
    'Use semantic search to find essays, resources, and templates across the FrankX Intelligence Hub.',
  keywords: ['frankx search', 'conscious ai resources', 'intelligence hub index'],
  path: '/search',
})

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <main className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-4xl">
          <SearchClient />
        </div>
      </main>
      <Footer />
    </div>
  )
}
