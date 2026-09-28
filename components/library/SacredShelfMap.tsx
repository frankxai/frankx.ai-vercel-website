import Link from 'next/link';
import { sacredDepth } from '@/data/sacred-depth';
import type { LibraryBook } from '@/lib/library-search';

// Editorial routes: each question names texts that address it directly, in a suggested order.
const questions: Array<{ question: string; slugs: string[]; note: string }> = [
  { question: 'How should I act when duty and conscience pull apart?', slugs: ['bhagavad-gita', 'analects', 'tanakh'], note: 'Arjuna on the battlefield, Confucius on role and ritual, the prophets on justice.' },
  { question: 'What is the self, and is it what I think it is?', slugs: ['upanishads', 'heart-sutra', 'zhuangzi'], note: 'Three answers that disagree in instructive ways: atman, emptiness, and a dream of a butterfly.' },
  { question: 'How do people live with suffering and loss?', slugs: ['dhammapada', 'bible', 'guru-granth-sahib'], note: 'Training the mind, lament and hope, devotion sung in community.' },
  { question: 'What do we owe one another?', slugs: ['quran', 'tattvartha-sutra', 'kitab-i-aqdas'], note: 'Obligation to the vulnerable, non-harm to every living being, law for a new community.' },
  { question: 'What does attention practice look like in the source texts?', slugs: ['yoga-sutras', 'vijnana-bhairava-tantra', 'avesta'], note: 'A step-by-step discipline, 112 entry points, and daily prayer at the fire.' },
];

const regions: Array<{ title: string; traditions: string[] }> = [
  { title: 'West Asia', traditions: ['Judaism', 'Christianity', 'Islam', 'Zoroastrianism', 'Bahá’í Faith'] },
  { title: 'South Asia', traditions: ['Hindu traditions', 'Classical Yoga', 'Shaiva Tantra', 'Buddhism', 'Mahayana Buddhism', 'Jainism', 'Sikhism'] },
  { title: 'East Asia', traditions: ['Daoism', 'Confucian traditions'] },
];

export function SacredShelfMap({ books, traditions }: { books: LibraryBook[]; traditions: Record<string, string> }) {
  const bySlug = new Map(books.map(book => [book.slug, book]));
  return <div className="space-y-16 pt-4">
    <section aria-labelledby="begin-with-question">
      <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/80">Begin with a question</p>
      <h2 id="begin-with-question" className="mt-2 font-display text-2xl text-white sm:text-3xl">Start from what you are asking</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65">Each route pairs texts that answer the same question differently. Read them side by side; the disagreements teach as much as the overlaps.</p>
      <ol className="mt-6 grid gap-4 md:grid-cols-2">
        {questions.map(route => <li key={route.question} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <h3 className="text-base font-medium leading-snug text-white">{route.question}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">{route.note}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {route.slugs.map(slug => bySlug.get(slug) ? <Link key={slug} href={`/library/${slug}`} prefetch={false} className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 text-sm text-emerald-100 hover:border-emerald-300/50 focus-visible:ring-2 focus-visible:ring-emerald-300">{bySlug.get(slug)!.title} →</Link> : null)}
          </div>
        </li>)}
      </ol>
    </section>

    <section aria-labelledby="shelf-map">
      <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/80">Map of the shelf</p>
      <h2 id="shelf-map" className="mt-2 font-display text-2xl text-white sm:text-3xl">Where each text comes from</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65">Grouped by the region where each tradition took shape, not by rank or date. Where a public-domain translation exists, one passage from it is shown; each guide names the translator and links the page.</p>
      <div className="mt-8 space-y-10">
        {regions.map(region => {
          const rows = books.filter(book => region.traditions.includes(traditions[book.slug] ?? ''));
          if (!rows.length) return null;
          return <div key={region.title}>
            <h3 className="border-b border-white/10 pb-2 text-sm font-semibold uppercase tracking-[0.14em] text-white/70">{region.title}</h3>
            <ul className="divide-y divide-white/[0.06]">
              {rows.map(book => {
                const depth = sacredDepth[book.slug];
                const quote = depth?.translation.rightsBasis === 'public-domain' ? depth.quotes[0] : undefined;
                return <li key={book.slug}>
                  <Link href={`/library/${book.slug}`} prefetch={false} className="group grid gap-2 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:grid-cols-[14rem_1fr] sm:gap-8">
                    <div>
                      <p className="font-medium text-white group-hover:text-emerald-200">{book.title}</p>
                      <p className="mt-1 text-xs text-white/55">{traditions[book.slug]}{depth ? ` · ${depth.facts.firstRead.split(';')[0]}` : ''}</p>
                    </div>
                    <div className="min-w-0">
                      {depth && <p className="text-sm text-white/60">{depth.facts.form}</p>}
                      {quote && <p className="mt-2 line-clamp-2 font-serif text-[15px] italic leading-relaxed text-white/80">“{quote.text}”<span className="not-italic text-xs text-white/45"> — {quote.locator}</span></p>}
                    </div>
                  </Link>
                </li>;
              })}
            </ul>
          </div>;
        })}
      </div>
    </section>
  </div>;
}
