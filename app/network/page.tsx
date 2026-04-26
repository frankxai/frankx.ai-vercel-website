import { Suspense } from 'react'
import { buildSitemapGraph } from '@/lib/sitemap/build-graph'
import SitemapHub from '@/components/sitemap/SitemapHub.client'

export const dynamic = 'force-static'
export const revalidate = 3600 // rebuild hourly

export default async function NetworkPage() {
  const graph = await buildSitemapGraph()

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-white/50">
          Loading network…
        </div>
      }
    >
      <SitemapHub graph={graph} />
    </Suspense>
  )
}
