import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getReviewBySlug } from '@/data/book-reviews';

const SITE_URL = 'https://frankx.ai';
const PAGE_URL = `${SITE_URL}/library/rockstar-energy`;

const STUDY_QUESTION =
  'What are they doing that makes people feel reality is more alive around them?';

export const metadata: Metadata = {
  title: 'Rockstar Energy & Mindset — A Reading Path | FrankX Library',
  description:
    'A reading path in taste, scenes, persona, and the artist’s inner state — deep-dive book reviews, Brian Eno’s concept of scenius, and a watch list. Keith Richards, Patti Smith, Rick Rubin, David Byrne, Miles Davis, Andy Warhol, Bob Dylan, Kim Gordon, Jeff Chang, and the scenes that made them.',
  keywords: [
    'rockstar energy',
    'rockstar mindset',
    'scenius',
    'Brian Eno scenius',
    'creative scene',
    'Keith Richards Life',
    'Patti Smith Just Kids',
    'Rick Rubin The Creative Act',
    'Miles Davis autobiography',
    'reading list for creators',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Rockstar Energy & Mindset — A Reading Path',
    description:
      'A reading path of book deep-dives, the concept of scenius, and a watch list — in taste, scenes, persona, and the artist’s inner state.',
    type: 'website',
    url: PAGE_URL,
    siteName: 'FrankX Library',
    images: [
      {
        url: '/images/library/library-collection-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Rockstar Energy & Mindset — a FrankX Library reading path',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rockstar Energy & Mindset — A Reading Path',
    description: 'Book deep-dives, scenius, and a watch list. Taste, scenes, persona, inner state.',
    images: ['/images/library/library-collection-hero.jpg'],
  },
};

// The reading path. Order is deliberate: the three core books first, then the
// five archetype-training reads. `why` is the one-line reason each book earns
// its place in the stack. Card data (rating / cover) is pulled live from the
// review entry where present.
type StackEntry = {
  slug: string;
  title: string;
  author: string;
  year: number;
  tier: 'core' | 'archetype' | 'expansion';
  why: string;
};

const STACK: StackEntry[] = [
  {
    slug: 'life-keith-richards',
    title: 'Life',
    author: 'Keith Richards',
    year: 2010,
    tier: 'core',
    why: 'How a person becomes inseparable from a sound, an attitude, a tribe, and a visual silhouette. Loose-but-mythic rockstar energy, with the drug years as cautionary shadow, not glamour.',
  },
  {
    slug: 'just-kids',
    title: 'Just Kids',
    author: 'Patti Smith',
    year: 2010,
    tier: 'core',
    why: 'The sacred-alliance counterweight to the macho myth. You do not need networking — you need one or two creative alliances and a scene where the future recognizes itself.',
  },
  {
    slug: 'the-creative-act',
    title: 'The Creative Act',
    author: 'Rick Rubin',
    year: 2023,
    tier: 'core',
    why: 'The inner-state manual. Not “make content” — how to be tuned enough that creation passes through you. Your lifestyle must make you more receptive, not merely more stimulated.',
  },
  {
    slug: 'how-music-works',
    title: 'How Music Works',
    author: 'David Byrne',
    year: 2012,
    tier: 'archetype',
    why: 'Context shapes art; rooms create behavior. Byrne’s “creation in reverse” — the venue precedes and shapes the work — plus the clearest honest math on how a working musician actually earns.',
  },
  {
    slug: 'meet-me-in-the-bathroom',
    title: 'Meet Me in the Bathroom',
    author: 'Lizzy Goodman',
    year: 2017,
    tier: 'archetype',
    why: 'How the early-2000s NYC indie scene actually formed — an oral history of scenius in real time, and how the internet changed the way scenes are born and burn out.',
  },
  {
    slug: 'please-kill-me',
    title: 'Please Kill Me',
    author: 'Legs McNeil & Gillian McCain',
    year: 1996,
    tier: 'archetype',
    why: 'Punk as velocity, attitude, and scene mutation. The definitive oral history of how stripping things down and refusing permission becomes its own innovation — costs included.',
  },
  {
    slug: 'popism',
    title: 'POPism',
    author: 'Andy Warhol & Pat Hackett',
    year: 1980,
    tier: 'archetype',
    why: 'Persona, the Factory, fame-as-system. Warhol engineered a studio-scene and a public self as deliberate creative instruments — surface as a strategy, not a lack.',
  },
  {
    slug: 'miles-the-autobiography',
    title: 'Miles: The Autobiography',
    author: 'Miles Davis with Quincy Troupe',
    year: 1989,
    tier: 'archetype',
    why: 'Cool, originality, style as a weapon. Six decades of reinvention — bebop to cool to modal to fusion — from a man who refused to repeat a success even once.',
  },
  {
    slug: 'our-band-could-be-your-life',
    title: 'Our Band Could Be Your Life',
    author: 'Michael Azerrad',
    year: 2001,
    tier: 'expansion',
    why: 'The DIY scene bible. Thirteen American underground bands who built their own labels, tours, and press before permission — proof that self-made infrastructure, not luck, is how a scene outlasts its moment.',
  },
  {
    slug: 'cant-stop-wont-stop',
    title: 'Can’t Stop Won’t Stop',
    author: 'Jeff Chang',
    year: 2005,
    tier: 'expansion',
    why: 'How a whole culture ignites from constraint. The Bronx, the block party, and the four elements — hip-hop as the clearest modern case study in scenius, and proof the thesis reaches far past rock.',
  },
  {
    slug: 'm-train',
    title: 'M Train',
    author: 'Patti Smith',
    year: 2015,
    tier: 'expansion',
    why: 'Just Kids turned inward. The daily texture of a creative life — café, ritual, grief, attention — and how presence is built from small repeated acts, not big moments.',
  },
  {
    slug: 'chronicles-volume-one',
    title: 'Chronicles: Volume One',
    author: 'Bob Dylan',
    year: 2004,
    tier: 'expansion',
    why: 'Reinvention and mystique from the inside. How Dylan absorbed a tradition whole, then broke from it — identity as something you build, protect, and refuse to over-explain.',
  },
  {
    slug: 'girl-in-a-band',
    title: 'Girl in a Band',
    author: 'Kim Gordon',
    year: 2015,
    tier: 'expansion',
    why: 'Art-school thinking applied to music, and a clear-eyed lens on the downtown scene. How the No Wave / NYC context became the material — and what collaboration costs when it ends.',
  },
  {
    slug: 'beastie-boys-book',
    title: 'Beastie Boys Book',
    author: 'Michael Diamond & Adam Horovitz',
    year: 2018,
    tier: 'expansion',
    why: 'Friendship as the engine. Three kids who moved from hardcore to hip-hop to art-pop by owning their own studio and outgrowing every persona — joy treated as a creative discipline.',
  },
];

// The watch list — the non-book half of the stack. Archetype training in
// motion. Links are resilient YouTube searches (same convention as the video
// sections on review pages) so they never dead-link to a removed upload.
type WatchEntry = {
  title: string;
  meta: string;
  lesson: string;
  href: string;
};

const WATCH_LIST: WatchEntry[] = [
  {
    title: 'Freddie Mercury at Live Aid',
    meta: 'Queen · Wembley, 1985',
    lesson: 'Crowd command, not approval-seeking. One performer conducting 72,000 people as a single instrument.',
    href: 'https://www.youtube.com/results?search_query=Queen+Live+Aid+1985+full',
  },
  {
    title: 'Prince — live performances',
    meta: 'Any era · start with the 2007 Super Bowl',
    lesson: 'Erotic precision plus total craft. Showmanship and musicianship at the same maximum, never trading one for the other.',
    href: 'https://www.youtube.com/results?search_query=Prince+live+performance+best',
  },
  {
    title: 'David Bowie — interviews',
    meta: 'Career-spanning',
    lesson: 'Reinvention as architecture. Watch him talk through persona, risk, and feeding your work from outside its own field.',
    href: 'https://www.youtube.com/results?search_query=David+Bowie+best+interviews',
  },
  {
    title: 'Rick Rubin — interviews',
    meta: 'Tetragrammaton · 60 Minutes · Tim Ferriss',
    lesson: 'Stillness behind cultural force. The least technical man in the room producing across every genre by protecting his receptivity.',
    href: 'https://www.youtube.com/results?search_query=Rick+Rubin+interview+creative+act',
  },
  {
    title: 'Studio 54 — documentaries',
    meta: 'e.g. “Studio 54” (2018)',
    lesson: 'Door policy, myth, exclusivity — and the excess-shadow. How a room engineered scarcity into legend, and what it cost.',
    href: 'https://www.youtube.com/results?search_query=Studio+54+documentary+2018',
  },
  {
    title: 'Almost Famous',
    meta: 'Cameron Crowe · 2000',
    lesson: 'The romance of the road — and the cost of worshipping chaos. The fan, the band, and the line between access and self-erasure.',
    href: 'https://www.youtube.com/results?search_query=Almost+Famous+2000+trailer',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-3.5 w-3.5 ${star <= rating ? 'text-amber-400' : 'text-white/10'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Library', item: `${SITE_URL}/library` },
          { '@type': 'ListItem', position: 3, name: 'Rockstar Energy & Mindset', item: PAGE_URL },
        ],
      },
      {
        '@type': 'CollectionPage',
        name: 'Rockstar Energy & Mindset — A Reading Path',
        description:
          'A reading path of book deep-dives, the concept of scenius, and a watch list. Taste, scenes, persona, and the artist’s inner state.',
        url: PAGE_URL,
        isPartOf: { '@type': 'WebSite', name: 'FrankX', url: SITE_URL },
        about: STUDY_QUESTION,
      },
      {
        '@type': 'ItemList',
        name: 'Rockstar Energy & Mindset — Books',
        numberOfItems: STACK.length,
        itemListElement: STACK.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/library/${b.slug}`,
          name: `${b.title} by ${b.author}`,
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function BookCard({ entry, index }: { entry: StackEntry; index: number }) {
  const review = getReviewBySlug(entry.slug);
  const published = Boolean(review);

  const inner = (
    <article className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 group-hover:border-white/[0.12] group-hover:bg-white/[0.04]">
      <div className="flex items-start gap-4">
        {review?.hasCover ? (
          <div className="w-14 h-[84px] rounded-lg border border-white/10 overflow-hidden flex-shrink-0 bg-white/5">
            <Image
              src={review.coverImage}
              alt={`${entry.title} by ${entry.author} — book cover`}
              width={112}
              height={168}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-14 h-[84px] rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center">
            <span className="text-2xl font-serif text-white/20">{entry.title.charAt(0)}</span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[11px] text-orange-300/70">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/30">
              {entry.tier === 'core' ? 'Core' : 'Archetype'}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-orange-200 transition-colors leading-snug">
            {entry.title}
          </h3>
          <p className="text-sm text-white/40">
            {entry.author} · {entry.year}
          </p>
          {review && (
            <div className="mt-2">
              <StarRating rating={review.rating} />
            </div>
          )}
        </div>
      </div>
      <p className="text-[14px] text-white/65 leading-relaxed mt-4">{entry.why}</p>
      <span className="inline-flex items-center gap-1 mt-4 text-[12px] text-orange-300/70 group-hover:text-orange-200 transition-colors">
        {published ? 'Read the deep-dive' : 'Deep-dive coming soon'}
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </span>
    </article>
  );

  return published ? (
    <Link href={`/library/${entry.slug}`} className="group block">
      {inner}
    </Link>
  ) : (
    <div className="group block">{inner}</div>
  );
}

export default function RockstarEnergyPage() {
  const coreBooks = STACK.filter((b) => b.tier === 'core');
  const archetypeBooks = STACK.filter((b) => b.tier === 'archetype');
  const expansionBooks = STACK.filter((b) => b.tier === 'expansion');

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <JsonLd />

      {/* Hero */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-1/4 w-96 h-96 bg-orange-500/[0.07] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-rose-500/[0.05] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <Link
            href="/library"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Library
          </Link>
          <p className="text-orange-300/80 text-xs sm:text-sm tracking-[0.24em] uppercase mb-4">
            A Reading Path
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white mb-6">
            Rockstar Energy{' '}
            <span className="bg-gradient-to-r from-orange-300 via-rose-300 to-amber-300 bg-clip-text text-transparent">
              &amp; Mindset
            </span>
          </h1>
          <p className="text-[17px] md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Not a genre playlist — a study path. A stack of books, one concept, and a watch list,
            on how taste, scenes, persona, and inner state combine into the thing we call presence.
            Read for the architecture behind the myth, not the myth itself.
          </p>
        </div>
      </section>

      {/* The study question */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="rounded-2xl border border-orange-500/15 bg-orange-500/[0.04] p-7 sm:p-8 text-center">
          <p className="text-[10px] uppercase tracking-[0.24em] text-orange-300/70 mb-4">
            The study question for all of them
          </p>
          <p className="text-xl sm:text-2xl text-white/90 font-light italic leading-relaxed">
            “{STUDY_QUESTION}”
          </p>
          <p className="text-sm text-white/50 leading-relaxed mt-5 max-w-xl mx-auto">
            Hold this against every book and every performance below. The answer is never one
            thing — it’s the sound, the room, the tribe, the silhouette, and the inner state all
            arriving at once.
          </p>
        </div>
      </section>

      {/* Scenius — the featured concept */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="rounded-3xl border border-violet-500/[0.16] bg-gradient-to-br from-violet-500/[0.05] to-transparent p-8 sm:p-10">
          <p className="text-[10px] uppercase tracking-[0.24em] text-violet-300/80 mb-3">
            The concept · Brian Eno
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">Scenius</h2>
          <p className="text-[15.5px] text-white/75 leading-relaxed mb-4">
            Brian Eno coined <span className="italic">scenius</span> as a counter to the
            lone-genius myth: genius is not only an individual trait, it is the intelligence and
            intuition of a whole cultural scene. Great work tends to come not from solitary
            outliers but from fertile environments — clusters of people, ideas, venues, and
            rivalries that raise everyone’s ceiling at once.
          </p>
          <p className="text-[15.5px] text-white/75 leading-relaxed mb-6">
            It reframes the whole stack below. Stop trying to become the lone genius. Build — or
            join — the environment where genius becomes normal. Every book here is, in part, a
            case study in scenius: the Chelsea Hotel, CBGB, the Factory, Nellcôte, early-2000s
            New York.
          </p>
          <a
            href="https://austinkleon.com/2017/05/12/scenius/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-violet-300/80 hover:text-violet-200 transition-colors border border-violet-500/20 rounded-full px-4 py-2 bg-violet-500/5 hover:bg-violet-500/10"
          >
            Austin Kleon on scenius
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </section>

      {/* The books — core */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-8 h-px bg-orange-500/50" />
          <h2 className="text-xl font-semibold text-white">Start here — the core three</h2>
        </div>
        <p className="text-sm text-white/40 mb-8 ml-11">
          Immersion, sacred alliance, and inner state. Read these first; they set the frame for
          everything else.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {coreBooks.map((entry) => (
            <BookCard key={entry.slug} entry={entry} index={STACK.indexOf(entry)} />
          ))}
        </div>
      </section>

      {/* The books — archetype training */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-8 h-px bg-orange-500/50" />
          <h2 className="text-xl font-semibold text-white">Archetype training — the scenes</h2>
        </div>
        <p className="text-sm text-white/40 mb-8 ml-11">
          Context, persona, velocity, and reinvention — read these as field studies in how
          scenes form and how style becomes a weapon.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {archetypeBooks.map((entry) => (
            <BookCard key={entry.slug} entry={entry} index={STACK.indexOf(entry)} />
          ))}
        </div>
      </section>

      {/* The books — expansion: voice, genre & reinvention */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-8 h-px bg-orange-500/50" />
          <h2 className="text-xl font-semibold text-white">Go deeper — voice, genre &amp; reinvention</h2>
        </div>
        <p className="text-sm text-white/40 mb-8 ml-11">
          The same thesis, wider aperture — the DIY underground, hip-hop’s birth, the creative
          interior, and reinvention across folk, No Wave, and art-pop. Scenes and selves, beyond
          rock.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {expansionBooks.map((entry) => (
            <BookCard key={entry.slug} entry={entry} index={STACK.indexOf(entry)} />
          ))}
        </div>
      </section>

      {/* Watch list */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-8 h-px bg-red-400/60" />
          <h2 className="text-xl font-semibold text-white">The watch list</h2>
        </div>
        <p className="text-sm text-white/40 mb-8 ml-11">
          Archetype training in motion. Watch each one against the study question — what,
          precisely, are they doing?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {WATCH_LIST.map((w) => (
            <a
              key={w.title}
              href={w.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-red-400/20 hover:bg-red-500/[0.03] transition-all"
            >
              <span className="flex-shrink-0 mt-0.5 w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-semibold text-white group-hover:text-red-200 transition-colors leading-snug">
                  {w.title}
                </h3>
                <p className="text-[12px] text-white/40 mt-0.5">{w.meta}</p>
                <p className="text-[13.5px] text-white/60 leading-relaxed mt-2">{w.lesson}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-32">
        <div className="rounded-3xl border border-amber-500/10 bg-amber-500/[0.03] p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-3">
            One breakdown like this, every Friday.
          </h2>
          <p className="text-[16px] text-white/60 max-w-lg mx-auto mb-7 leading-relaxed">
            The Library is built in public. Get one book breakdown and one spotlight from the
            operating loop each week.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium hover:bg-amber-500/20 transition-colors focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              Subscribe free
            </Link>
            <Link
              href="/library"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium hover:bg-white/10 hover:text-white/80 transition-colors"
            >
              Back to the full Library
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
