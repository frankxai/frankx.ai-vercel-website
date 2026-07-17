import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getBookBySlug } from '@/app/books/lib/books-registry'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'The Wordless Laws — Series',
  description:
    'Book One conceals twelve forces of a life. Book Two names them and hands you practices. Free to read online.',
  path: '/books/series/the-wordless-laws',
  keywords: [
    'the wordless laws',
    'frank riemer',
    'self development series',
    'manifestation practice',
    'laws of life',
  ],
})

export default function WordlessLawsSeriesPage() {
  const bookOne = getBookBySlug('the-wordless-laws')
  const bookTwo = getBookBySlug('the-wordless-laws-book-two')

  if (!bookOne || !bookTwo) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#08080f] text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.12),_transparent_55%)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-500/[0.07] blur-[120px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-16 sm:pt-32">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors mb-10 text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Books
          </Link>

          <p className="text-xs uppercase tracking-[0.28em] text-amber-400/70 mb-5">FrankX · Flagship Series</p>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] mb-6">
            <span className="bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100/80 bg-clip-text text-transparent">
              The Wordless Laws
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/45 max-w-2xl leading-relaxed mb-6">
            Twelve forces that shape every life. First you feel them. Then you learn to work them.
          </p>
          <p className="text-base text-white/55 max-w-2xl leading-relaxed mb-10">
            This is not another named framework dump. Book One withholds the labels on purpose — so recognition
            hits as your own. Book Two breaks the silence: tradition, science, practice, and experiments you can
            run in days. Written by Frank Riemer for people building lives — and agentic systems — that compound.
          </p>

          <div className="flex flex-wrap gap-3 text-xs text-white/40 mb-14">
            <span className="px-3 py-1 rounded-full border border-white/10">Free online</span>
            <span className="px-3 py-1 rounded-full border border-white/10">2 volumes</span>
            <span className="px-3 py-1 rounded-full border border-white/10">28 chapters</span>
            <span className="px-3 py-1 rounded-full border border-white/10">PDF available</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                book: bookOne,
                badge: 'Book One · Concealed',
                order: 'Start here',
                accent: 'from-indigo-400/20 to-amber-400/10',
              },
              {
                book: bookTwo,
                badge: 'Book Two · The Practice',
                order: 'Then name & train',
                accent: 'from-amber-400/20 to-indigo-400/10',
              },
            ].map(({ book, badge, order, accent }) => (
              <Link
                key={book.slug}
                href={`/books/${book.slug}`}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/20 transition-all overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-40 group-hover:opacity-60 transition-opacity`} />
                <div className="relative p-6 sm:p-8 flex gap-5">
                  <div className="relative w-28 sm:w-32 aspect-[2/3] rounded-lg overflow-hidden shadow-2xl shadow-black/50 flex-shrink-0">
                    {book.coverImage && (
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-amber-300/70 mb-2">{badge}</p>
                    <h2 className="font-serif text-2xl font-bold text-white mb-1 leading-tight group-hover:text-amber-50 transition-colors">
                      {book.title.replace('The Wordless Laws, Book Two: ', '')}
                    </h2>
                    <p className="text-sm text-white/40 mb-3">{book.subtitle}</p>
                    <p className="text-sm text-white/55 leading-relaxed line-clamp-4 flex-1">{book.description}</p>
                    <span className="inline-flex items-center gap-2 mt-5 text-sm text-white/50 group-hover:text-emerald-400 transition-colors">
                      {order}
                      <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/5">
        <h2 className="font-serif text-3xl font-bold mb-6">Reading order</h2>
        <ol className="space-y-4 text-white/60 leading-relaxed">
          <li>
            <span className="text-amber-200/80 font-medium">1.</span> Read Book One slowly — one law per week if you can.
            Let recognition land before labels.
          </li>
          <li>
            <span className="text-amber-200/80 font-medium">2.</span> Open Book Two only after at least three laws have
            rearranged something concrete in your week.
          </li>
          <li>
            <span className="text-amber-200/80 font-medium">3.</span> Run one experiment per force. Keep an evidence
            journal. The laws reward proof, not quotes.
          </li>
        </ol>
        <p className="mt-10 text-sm text-white/40">
          Part of the FrankX library — free online, built in public with agentic craft. Companion craft volume:{' '}
          <Link href="/books/the-book-of-secrets" className="text-white/70 underline underline-offset-4 hover:text-white">
            The Book of Secrets
          </Link>
          .
        </p>
      </section>
    </div>
  )
}
