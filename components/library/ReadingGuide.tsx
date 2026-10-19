import Link from 'next/link';
import type { BookReview } from '@/app/books/types';
import { getReviewBySlug } from '@/data/book-reviews';

export function ReadingGuide({ guide }: { guide: NonNullable<BookReview['guide']> }) {
  return <section aria-labelledby="reading-guide-heading" className="mx-auto max-w-3xl px-6 pb-12">
    <div className="border-t border-white/15 pt-8">
      <p className="text-sm text-emerald-200">{guide.tradition} · {guide.kind}</p>
      <h2 id="reading-guide-heading" className="mt-3 text-2xl font-semibold text-white">Before you begin</h2>
      <p className="mt-4 text-base leading-relaxed text-white/75">{guide.context}</p>
      <p className="mt-4 text-xs text-white/65">{guide.claimBasis === 'Symbolic' ? 'Reading lens: symbolic and religious interpretation; historical details are identified through the sources below.' : guide.claimBasis === 'Established' ? 'Reading lens: historical and textual study. The author’s interpretations remain attributed.' : 'Reading lens: experiential teaching and interpretation; personal testimony is attributed to its author.'}</p>
      <h3 className="mt-8 text-lg font-semibold text-white">Choose an edition</h3>
      <p className="mt-3 text-base leading-relaxed text-white/75">{guide.editionNote}</p>
      <h3 className="mt-8 text-lg font-semibold text-white">A path through the book</h3>
      <ol className="mt-4 space-y-5">
        {guide.readingPath.map((step, index) => <li key={step.title} className="flex gap-4"><span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-300/30 text-sm text-emerald-200">{index + 1}</span><div><h4 className="font-medium text-white">{step.title}</h4><p className="mt-1 text-sm leading-relaxed text-white/75">{step.note}</p></div></li>)}
      </ol>
      <h3 id="edition-sources" className="mt-8 text-lg font-semibold text-white">Sources & editions</h3>
      <ul className="mt-4 space-y-4">{guide.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-emerald-200 underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-emerald-300">{source.title} ↗</a><p className="text-sm text-white/65">{source.note}</p></li>)}</ul>
      <p className="mt-6 text-xs leading-relaxed text-white/65">An editorial reading guide with original summaries and source links. Modern translations remain the work of their named translators.</p>
      <h3 className="mt-8 text-lg font-semibold text-white">Read alongside</h3>
      <nav aria-label="Related reading guides" className="mt-3 flex flex-wrap gap-3">{guide.relatedSlugs.map(slug => {
        const book = getReviewBySlug(slug);
        return book ? <Link key={slug} href={`/library/${slug}`} className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-4 text-sm text-emerald-100 hover:border-emerald-300/50 focus-visible:ring-2 focus-visible:ring-emerald-300">{book.title} →</Link> : null;
      })}</nav>
    </div>
  </section>;
}
