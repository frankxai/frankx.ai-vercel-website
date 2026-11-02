import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { MDXContent } from '@/components/blog/MDXContent'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'My founder AI stack: from a mobile brief to a verified release',
  description: 'How I combine ChatGPT Work, Claude, Gemini, Grok, and OpenCode, with repository examples, honest model attribution, and a method for judging useful output.',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
  openGraph: { title: 'My founder AI stack: from a mobile brief to a verified release', description: 'How I combine ChatGPT Work, Claude, Gemini, Grok, and OpenCode, with repository examples, honest model attribution, and a method for judging useful output.', type: 'website' },
}

export default async function FounderAiStackReadingProof() {
  // A reading proof must never become a production publication by an accidental merge.
  if (process.env.VERCEL_ENV !== 'preview' && process.env.NODE_ENV === 'production') {
    notFound()
  }

  const raw = await readFile(
    path.join(process.cwd(), 'content/blog/_drafts/founder-ai-stack-mobile-to-production.mdx'),
    'utf8',
  )
  const { data, content } = matter(raw)
  const observedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Amsterdam',
  }).format(new Date('2026-11-02T12:00:00Z'))

  return (
    <main id="main" className="min-h-screen bg-[#0a0a0b] px-4 pb-32 pt-28 text-white sm:px-6 lg:px-8">
      <article aria-labelledby="article-title" className="mx-auto max-w-3xl min-w-0">
        <header className="mb-10 space-y-5">
          <p className="text-sm font-medium text-emerald-300">Draft for review · {observedDate}</p>
          <h1 id="article-title" className="text-balance break-words text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {String(data.title)}
          </h1>
          <p className="text-lg leading-relaxed text-white/80">{String(data.description)}</p>
          <p className="text-sm text-white/70">Frank Riemer · Founder and AI Architect</p>
          <p className="border-l-2 border-emerald-400 pl-4 text-sm leading-relaxed text-white/70">
            Reading proof. Publication and final visual review remain pending.
          </p>
        </header>
        <div className="article-prose min-w-0 break-words">
          <MDXContent source={content} />
        </div>
        <footer className="mt-12 border-t border-white/10 pt-6">
          <Link href="/design-lab" className="inline-flex min-h-11 items-center rounded-full px-4 text-sm text-emerald-300 underline underline-offset-4 hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">
            Back to the design lab
          </Link>
        </footer>
      </article>
    </main>
  )
}
