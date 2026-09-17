import type { Metadata } from 'next';
import Link from 'next/link';
import { libraryBooks } from '@/lib/library-catalog';
import { LibraryExplorer } from '@/components/library/LibraryExplorer';
import { CollectionCards } from '@/components/library/CollectionCards';

const LIBRARY_URL = 'https://www.frankx.ai/library';
type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const value = (input: string | string[] | undefined) => typeof input === 'string' ? input : '';

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const filtered = Boolean(params.q || params.category || params.sort);
  const title = 'The Library — Books, Reading Guides & Curated Collections';
  const description = 'Find books by title, author, tradition, or idea. Explore sacred texts, Michael Singer, philosophy, creativity, and business with reading guides and edition notes.';
  return {
    title,
    description,
    alternates: { canonical: LIBRARY_URL },
    ...(filtered ? { robots: { index: false, follow: true } } : {}),
    openGraph: { title, description, url: LIBRARY_URL, type: 'website', images: [{ url: `${LIBRARY_URL}/opengraph-image`, width: 1200, height: 630, alt: 'The FrankX Library — curated books and reading guides' }] },
    twitter: { card: 'summary_large_image', title, description, images: [`${LIBRARY_URL}/opengraph-image`] },
  };
}

export default async function LibraryPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Library', item: LIBRARY_URL },
      ] },
      { '@type': 'CollectionPage', '@id': LIBRARY_URL, name: 'The FrankX Library', url: LIBRARY_URL,
        mainEntity: { '@type': 'ItemList', numberOfItems: libraryBooks.length, itemListElement: libraryBooks.map((book, index) => ({ '@type': 'ListItem', position: index + 1, name: `${book.title} — ${book.author}`, url: `${LIBRARY_URL}/${book.slug}` })) } },
    ],
  };
  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <header className="mx-auto max-w-6xl px-6 pb-10 pt-28 sm:pt-32">
        <p className="mb-4 text-sm text-emerald-200">The reading room</p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">The Library</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">Find a book for the question you’re carrying. Follow a reading path through philosophy, spiritual traditions, creative work, and building a life of your own.</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <span className="text-white/65">{libraryBooks.length} books · 6 curated collections</span>
          <Link href="/library/quotes" className="text-emerald-200 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-emerald-300">Browse quotes</Link>
          <Link href="/library/approach" className="text-white/75 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-emerald-300">How the Library is built</Link>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6">
        <LibraryExplorer books={libraryBooks} initial={{ q: value(params.q), category: value(params.category), sort: value(params.sort) || 'recent' }}>
          <CollectionCards />
          <Link href="/library/rockstar-energy" className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-300/20 px-5 py-5 focus-visible:ring-2 focus-visible:ring-emerald-300">
            <span><span className="block text-xs text-emerald-200">Featured reading path</span><span className="mt-1 block text-lg font-semibold text-white">Rockstar Energy &amp; Mindset</span></span>
            <span className="text-sm text-white/70">Taste, scenes, and the artist’s inner state →</span>
          </Link>
        </LibraryExplorer>
      </div>
      {/* Research articles grounded in this collection */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="rounded-2xl border border-cyan-500/[0.16] bg-cyan-500/[0.03] p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
            <h2 className="text-xl font-semibold text-white">Research grounded in this collection</h2>
            <span className="text-[10px] uppercase tracking-[0.18em] text-cyan-200">flagship article</span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed mb-5">
            Some of the books in this library are not just reading recommendations &mdash; they
            are sources for deep research articles. Where four library books cluster around
            one idea, you can read the meta-article that synthesises them.
          </p>
          <Link
            href="/research/blue-zones-ikigai-ai-era"
            className="group block rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.16] p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
          >
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 mb-2">
              Blue Zones &middot; Ikigai &middot; AI Era
            </p>
            <h3 className="text-base font-semibold text-white mb-2">
              The four library books behind one Japanese word
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Kamiya (1966), Buettner (2005), Garc&iacute;a &amp; Miralles (2016), Mogi (2017) &mdash; the
              lineage of ikigai from psychiatric foundation to global bestseller, with an
              honest reckoning of the 2014 Western Venn. 12-minute read.
            </p>
          </Link>

          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <Link
              href="/workshops/ikigai-branding"
              prefetch={false}
              className="group block rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.025] hover:border-white/[0.12] p-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 mb-1.5">
                Walk the practice
              </p>
              <p className="text-sm font-semibold text-white">Ikigai &amp; Branding workshop</p>
              <p className="text-xs text-white/55 mt-1 leading-relaxed">
                10 chapters, 13 prompts. Free. 75-minute self-guided walk.
              </p>
            </Link>
            <Link
              href="/research/conscious-ai-operating-systems"
              prefetch={false}
              className="group block rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.025] hover:border-white/[0.12] p-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 mb-1.5">
                Adjacent research
              </p>
              <p className="text-sm font-semibold text-white">Conscious AI Operating Systems</p>
              <p className="text-xs text-white/55 mt-1 leading-relaxed">
                The architectural answer to the meaning question.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* FrankX Books CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.03] p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            What I carried forward.
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-6">
            Some of these sources changed how I build, teach, and create. My books turn that
            reading into original frameworks, with the influences kept visible.
          </p>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium hover:bg-emerald-500/20 transition-colors"
          >
            Explore FrankX books
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
