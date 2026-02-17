import { getAllPosts, getAllAccounts, getPostStats } from '@/lib/content-studio/posts'
import ContentStudioClient from './ContentStudioClient'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Content Studio - Multi-Platform Social Media Management',
  description: 'Create, schedule, and publish content across LinkedIn, Twitter, and Instagram from one unified dashboard.',
  path: '/content-studio',
})

export default function ContentStudioPage() {
  const posts = getAllPosts()
  const accounts = getAllAccounts()
  const stats = getPostStats()

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Aurora Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative pt-28 pb-24">
        <div className="px-6">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white tracking-tight">
                Content Studio
              </h1>
              <p className="mt-4 text-lg text-white/60 max-w-3xl">
                Create, schedule, and publish content across all platforms from one unified dashboard.
              </p>
            </div>

            {/* Client-side interactive content */}
            <ContentStudioClient
              initialPosts={posts}
              accounts={accounts}
              stats={stats}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
