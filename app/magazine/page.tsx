import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import JsonLd from '@/components/seo/JsonLd'
import { createMetadata, siteConfig } from '@/lib/seo'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { getAllBlogPostSummaries, type BlogPostSummary } from '@/lib/blog'
import { getAllGuides } from '@/lib/guides'
import { getJournalEntrySummaries, formatJournalDate } from '@/lib/journal'
import { getPublishedBooks } from '@/app/books/lib/books-registry'

const PAGE_PATH = '/magazine'

export const metadata = createMetadata({
  title: 'FrankX Magazine: AI Architecture, Agents, Books, and Creative Work',
  description:
    'The FrankX editorial front page: long reads on AI architecture and infrastructure, agent playbooks, intelligence dispatches, music and creativity, books, guides, and working notes by Frank Riemer.',
  path: PAGE_PATH,
  keywords: [
    'frankx magazine',
    'ai architecture articles',
    'ai agents magazine',
    'ai infrastructure writing',
    'creator systems',
    'frank riemer writing',
    'ai music essays',
  ],
})

/**
 * Departments map the existing blog categories into a small, stable editorial
 * structure. Unknown categories fall through to the archive rather than
 * creating new departments automatically.
 */
const DEPARTMENTS: Array<{
  id: string
  title: string
  deck: string
  categories: string[]
  more: { label: string; href: string }
}> = [
  {
    id: 'architecture',
    title: 'Architecture and infrastructure',
    deck: 'Reference systems, clouds, models, and the machines underneath them.',
    categories: ['AI Architecture', 'Enterprise AI', 'AI & Systems'],
    more: { label: 'AI Architecture hub', href: '/ai-architecture' },
  },
  {
    id: 'agents',
    title: 'Agents and creator systems',
    deck: 'Skills, workflows, and the operating habits that keep agent work shippable.',
    categories: ['Creator Systems', 'Tutorials', 'AI Tools', 'Creator Tools', 'AI Education'],
    more: { label: 'AI agent playbooks', href: '/playbooks' },
  },
  {
    id: 'dispatches',
    title: 'Intelligence dispatches',
    deck: 'Short, dated reads on what changed in AI and what it means for builders.',
    categories: ['Intelligence Dispatches', 'Product Updates'],
    more: { label: 'Research hubs', href: '/research' },
  },
  {
    id: 'creative',
    title: 'Music and creativity',
    deck: 'AI music production, creative practice, and the inner game of making things.',
    categories: ['Music Intelligence', 'Creativity', 'Consciousness'],
    more: { label: 'Music', href: '/music' },
  },
]

// The magazine is the editorial lane. Commercial comparisons and personal-
// finance reviews stay in the archive; a post makes the front page only when
// its title or tags sit inside the FrankX subject area.
const EDITORIAL_SUBJECT =
  /\b(ai|agents?|agentic|llms?|models?|claude|gpt|gemini|codex|mcp|skills?|architect(ure)?|infrastructure|gpus?|compute|music|suno|songs?|creat(or|ors|ive|ivity|ion)|founders?|intelligence|research|workflows?|prompts?|automation|systems?)\b/i

function isEditorial(post: BlogPostSummary) {
  return EDITORIAL_SUBJECT.test(`${post.title} ${(post.tags ?? []).join(' ')}`) &&
    !/\b(vs\.?|versus|safe in|bank|iban)\b/i.test(post.title)
}

const BOOK_SHELF_SIZE = 6

function formatDate(date: string) {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return ''
  return parsed.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function isLocalImage(src?: string): src is string {
  return Boolean(src && src.startsWith('/'))
}

function StoryRow({ post }: { post: BlogPostSummary }) {
  return (
    <li>
      <Link href={`/blog/${post.slug}`} className="group block py-4">
        <span className="block text-base font-semibold leading-snug text-white transition group-hover:text-emerald-200">
          {post.title}
        </span>
        <span className="mt-1 block text-xs text-white/40">
          {formatDate(post.date)}
          {post.readingTime ? ` · ${post.readingTime}` : ''}
        </span>
      </Link>
    </li>
  )
}

export default function MagazinePage() {
  // Only canonical, self-hosted articles appear on the front page.
  const archive = getAllBlogPostSummaries().filter((post) => !post.canonical)
  const posts = archive.filter(isEditorial)
  const cover = posts.find((post) => post.flagship || post.featured) ?? posts[0]
  const inThisIssue = posts.filter((post) => post.slug !== cover?.slug).slice(0, 4)
  const shown = new Set([cover?.slug, ...inThisIssue.map((post) => post.slug)])

  const departments = DEPARTMENTS.map((department) => ({
    ...department,
    posts: posts
      .filter((post) => department.categories.includes(post.category) && !shown.has(post.slug))
      .slice(0, 4),
  })).filter((department) => department.posts.length > 0)

  const longReads = posts
    .filter((post) => post.category === 'Flagship' && post.slug !== cover?.slug)
    .slice(0, 3)

  const library = getPublishedBooks('en')
  const books = library.slice(0, BOOK_SHELF_SIZE)
  const guides = getAllGuides().slice(0, 4)
  const notes = getJournalEntrySummaries().slice(0, 4)

  const latestDate = posts[0]?.date ? new Date(posts[0].date) : new Date()
  const issueLabel = Number.isNaN(latestDate.getTime())
    ? 'Current issue'
    : latestDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  const pageUrl = `${siteConfig.url}${PAGE_PATH}`
  const featured = [cover, ...inThisIssue, ...departments.flatMap((d) => d.posts)].filter(
    (post): post is BlogPostSummary => Boolean(post),
  )

  const collectionSchema = {
    '@id': `${pageUrl}#collection`,
    name: 'FrankX Magazine',
    url: pageUrl,
    description:
      'Editorial front page for FrankX: AI architecture and infrastructure, agents and creator systems, intelligence dispatches, music and creativity, books, and guides.',
    publisher: { '@id': `${siteConfig.url}/#organization` },
    author: { '@id': `${siteConfig.url}/#frank-riemer` },
    hasPart: [
      ...featured.map((post) => ({
        '@type': 'Article',
        headline: post.title,
        url: `${siteConfig.url}/blog/${post.slug}`,
        datePublished: post.date,
        ...(post.lastUpdated ? { dateModified: post.lastUpdated } : {}),
        articleSection: post.category,
      })),
      ...library.map((book) => ({
        '@type': 'Book',
        name: book.title,
        url: `${siteConfig.url}/books/${book.slug}`,
      })),
    ],
  }

  return (
    <>
      <JsonLd type="CollectionPage" data={collectionSchema} />
      <JsonLd
        type="BreadcrumbList"
        data={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Magazine', url: PAGE_PATH },
        ])}
      />

      <main className="min-h-screen bg-[#0a0a0b] text-white">
        {/* Masthead */}
        <header className="border-b border-white/5 px-6 pb-12 pt-32 lg:pt-40">
          <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-medium tracking-[0.08em] text-emerald-300/70">{issueLabel}</p>
              <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                FrankX Magazine
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
                Long reads, field notes, and books from a working AI architect: how the systems are built, how
                agents are run, and what it takes to keep making things that matter.
              </p>
            </div>
            <nav aria-label="Magazine sections" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/50">
              {departments.map((department) => (
                <a key={department.id} href={`#${department.id}`} className="hover:text-white">
                  {department.title}
                </a>
              ))}
              {books.length > 0 && (
                <a href="#books" className="hover:text-white">
                  Books
                </a>
              )}
              <a href="#notes" className="hover:text-white">
                Guides and notes
              </a>
            </nav>
          </div>
        </header>

        {/* Cover story + in this issue */}
        {cover && (
          <section aria-label="Cover story" className="border-b border-white/5 px-6 py-16 lg:py-20">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
              <article>
                <Link href={`/blog/${cover.slug}`} className="group block">
                  {isLocalImage(cover.image) && (
                    <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-[2rem] border border-white/10">
                      <Image
                        src={cover.image}
                        alt=""
                        fill
                        priority
                        sizes="(min-width: 1024px) 66vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.01]"
                      />
                    </div>
                  )}
                  <p className="text-xs text-emerald-300/70">Cover story · {cover.category}</p>
                  <h2 className="mt-3 font-display text-3xl font-semibold leading-tight transition group-hover:text-emerald-100 sm:text-4xl">
                    {cover.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
                    {cover.tldr || cover.description}
                  </p>
                  <p className="mt-4 text-xs text-white/40">
                    {formatDate(cover.date)}
                    {cover.readingTime ? ` · ${cover.readingTime}` : ''}
                  </p>
                </Link>
              </article>
              <aside aria-labelledby="in-this-issue">
                <h2 id="in-this-issue" className="text-sm font-semibold text-white/80">
                  In this issue
                </h2>
                <ol className="mt-2 divide-y divide-white/5">
                  {inThisIssue.map((post) => (
                    <StoryRow key={post.slug} post={post} />
                  ))}
                </ol>
                <Link
                  href="/blog"
                  className="mt-6 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white"
                >
                  Full archive of {archive.length} articles
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </aside>
            </div>
          </section>
        )}

        {/* Departments */}
        <section aria-label="Departments" className="border-b border-white/5 px-6 py-20 lg:py-24">
          <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-16 md:grid-cols-2">
            {departments.map((department) => (
              <section key={department.id} id={department.id} aria-labelledby={`${department.id}-title`} className="scroll-mt-24">
                <h2 id={`${department.id}-title`} className="font-display text-2xl font-semibold">
                  {department.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{department.deck}</p>
                <ol className="mt-4 divide-y divide-white/5 border-t border-white/5">
                  {department.posts.map((post) => (
                    <StoryRow key={post.slug} post={post} />
                  ))}
                </ol>
                <Link
                  href={department.more.href}
                  className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-300/80 hover:text-emerald-200"
                >
                  {department.more.label}
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </section>
            ))}
          </div>
        </section>

        {/* Long reads */}
        {longReads.length > 0 && (
          <section aria-labelledby="long-reads" className="border-b border-white/5 px-6 py-20 lg:py-24">
            <div className="mx-auto max-w-6xl">
              <h2 id="long-reads" className="font-display text-2xl font-semibold sm:text-3xl">
                Long reads
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {longReads.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 transition hover:border-emerald-400/30"
                  >
                    <span className="block font-display text-lg font-semibold leading-snug">{post.title}</span>
                    <span className="mt-3 block text-sm leading-relaxed text-white/55">{post.description}</span>
                    <span className="mt-4 block text-xs text-white/40">{post.readingTime}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Books */}
        {books.length > 0 && (
          <section id="books" aria-labelledby="books-title" className="scroll-mt-24 border-b border-white/5 px-6 py-20 lg:py-24">
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 id="books-title" className="font-display text-2xl font-semibold sm:text-3xl">
                    Books
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-white/50">
                    Written to be read cover to cover, free to read online.
                  </p>
                </div>
                <Link href="/books" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
                  All {library.length} books
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
                {books.map((book) => (
                  <Link key={book.slug} href={`/books/${book.slug}`} className="group block">
                    <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                      {isLocalImage(book.coverImage) && (
                        <Image
                          src={book.coverImage}
                          alt={`Cover of ${book.title}`}
                          fill
                          sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 45vw"
                          className="object-cover transition duration-500 group-hover:scale-[1.02]"
                        />
                      )}
                    </div>
                    <p className="mt-3 text-sm font-semibold leading-snug text-white">{book.title}</p>
                    {book.subtitle && <p className="mt-1 text-xs leading-snug text-white/45">{book.subtitle}</p>}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Guides + working notes */}
        <section id="notes" aria-label="Guides and working notes" className="scroll-mt-24 border-b border-white/5 px-6 py-20 lg:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold">Guides from the work</h2>
              <ol className="mt-4 divide-y divide-white/5 border-t border-white/5">
                {guides.map((guide) => (
                  <li key={guide.slug}>
                    <Link href={`/guides/${guide.slug}`} className="group block py-4">
                      <span className="block text-base font-semibold text-white group-hover:text-emerald-200">
                        {guide.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-white/50">{guide.description}</span>
                    </Link>
                  </li>
                ))}
              </ol>
              <Link href="/guides" className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-300/80 hover:text-emerald-200">
                All guides
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">Working notes</h2>
              <ol className="mt-4 divide-y divide-white/5 border-t border-white/5">
                {notes.map((note) => (
                  <li key={note.slug}>
                    <Link href={`/journal/${note.slug}`} className="group block py-4">
                      <span className="block text-base font-semibold text-white group-hover:text-emerald-200">
                        {note.title}
                      </span>
                      <span className="mt-1 block text-xs text-white/40">{formatJournalDate(note.date, 'short')}</span>
                    </Link>
                  </li>
                ))}
              </ol>
              <Link href="/journal" className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-300/80 hover:text-emerald-200">
                The journal
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* One CTA */}
        <section className="px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Get the next issue in your inbox.</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60">
              One letter when there is something worth reading. No funnel tricks.
            </p>
            <Link
              href="/newsletter"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-[#0a0a0b] transition hover:bg-emerald-400"
            >
              Subscribe to the letter
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
