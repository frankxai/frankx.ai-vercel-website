import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { mdxComponents } from '@/components/blog/MDXComponents'
import { getBlogPost } from '@/lib/blog'

export default async function IntelligenceAtlas() {
  const post = await getBlogPost('frankx-intelligence-atlas-volume-1')

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center">
        <h1 className="text-heading-1 font-bold text-white">{post.title}</h1>
        <p className="mt-4 text-body text-neutral-400">{post.description}</p>
      </div>

      <div className="mt-12">
        <div className="prose prose-invert max-w-none">
          <MDXRemote source={post.content} components={mdxComponents as any} />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-heading-2 font-semibold text-white">Executive Summary</h2>
        <div className="mt-6 prose prose-invert max-w-none">
          <p>The FrankX Intelligence Atlas Vol. I is a 10,000-word flagship report on the 2025 intelligence landscape, from frontier labs to open-source ecosystems, adoption metrics, and builder-ready frameworks.</p>
          <ul>
            <li>Agent adoption is mainstream.</li>
            <li>Frontier labs accelerate agentic scaffolding.</li>
            <li>Open-source momentum compounds.</li>
            <li>FrankX systems provide implementation gravity.</li>
            <li>Governance and safety stay front-and-center.</li>
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-heading-2 font-semibold text-white">Call to Action</h2>
        <div className="mt-6 prose prose-invert max-w-none">
          <p>Ready to install the OS? Start with:</p>
          <ul>
            <li><Link href="/products/1" className="text-primary-200 hover:text-primary-100 underline-offset-4 hover:underline">Creative AI Toolkit</Link> - prompts, workflows, and quick wins.</li>
            <li><Link href="/products/2" className="text-primary-200 hover:text-primary-100 underline-offset-4 hover:underline">Agentic Creator OS Blueprint</Link> - the full system we use internally to ship Golden Age of Intelligence and more.</li>
          </ul>
          <p>Bundle them and youâ€™ll have your Agentic Creator OS running in weeks, not quarters.</p>
        </div>
      </div>
    </div>
  )
}






