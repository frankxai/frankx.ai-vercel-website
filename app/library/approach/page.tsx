import { Metadata } from 'next';
import Link from 'next/link';
import { bookReviews } from '@/data/book-reviews';

const SITE_URL = 'https://frankx.ai';
const REPO_URL = 'https://github.com/frankxai/library-os';

export const metadata: Metadata = {
  title: 'The Library OS — How I Turn Every Book Into a Permanent Asset | FrankX',
  description:
    'The open-source Library Intelligence System. Capture, extract, enrich, and publish every book you read into a permanent deep-dive on your own website. Works with Claude, ChatGPT, Codex, Gemini, or by hand.',
  keywords: [
    'Library OS',
    'library intelligence system',
    'book knowledge system',
    'personal knowledge management',
    'reading system',
    'build your own library website',
    'Next.js book template',
    'AI book review template',
    'Claude Code library',
  ],
  alternates: { canonical: `${SITE_URL}/library/approach` },
  openGraph: {
    title: 'The Library OS — The Open-Source Library Intelligence System',
    description:
      'Capture, extract, enrich, and publish every book you read into a permanent deep-dive on your own website.',
    type: 'article',
    url: `${SITE_URL}/library/approach`,
    siteName: 'FrankX',
  },
};

const deepDives = bookReviews.filter(
  (r) => (r.quotes?.length ?? 0) > 0 && (r.chapters?.length ?? 0) > 0
);

function ArticleJsonLd() {
  const url = `${SITE_URL}/library/approach`;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Library', item: `${SITE_URL}/library` },
          { '@type': 'ListItem', position: 3, name: 'Approach', item: url },
        ],
      },
      {
        '@type': 'TechArticle',
        headline: 'The Library OS — How I Turn Every Book Into a Permanent Asset',
        description:
          'Open-source system for building a persistent digital library from every book you read. Schema-driven, AEO-first, portable across AI tools and static-site generators.',
        url,
        author: { '@type': 'Person', name: 'Frank', url: SITE_URL },
        publisher: { '@type': 'Organization', name: 'FrankX', url: SITE_URL },
        datePublished: '2026-04-24',
        dateModified: '2026-04-24',
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        keywords:
          'library intelligence, book knowledge system, AEO, personal knowledge management, Next.js template',
        articleSection: ['Systems', 'Open Source', 'Knowledge Management'],
      },
      {
        '@type': 'SoftwareSourceCode',
        name: 'Library OS',
        codeRepository: REPO_URL,
        programmingLanguage: 'TypeScript',
        runtimePlatform: 'Next.js 14+',
        license: 'MIT',
        author: { '@type': 'Person', name: 'Frank', url: SITE_URL },
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

const stages = [
  {
    index: '01',
    title: 'Capture',
    accent: 'emerald',
    body: 'Every signal belongs somewhere. A photo of handwritten margin notes, a Kindle highlights export, a voice memo after a walk, a book title in a text file. You are not yet organizing — you are refusing to let a thought leave the system.',
    input: 'photo · text · audio · kindle export · ISBN',
  },
  {
    index: '02',
    title: 'Extract',
    accent: 'amber',
    body: 'The Library OS pulls structure from the raw: a TL;DR, five key insights, a Best-For audience, a starter FAQ. This is the baseline review. It already beats a Goodreads rating. You have now read the book twice — once with your eyes, once with your schema.',
    input: '/library-add "Book Title"',
  },
  {
    index: '03',
    title: 'Enrich',
    accent: 'violet',
    body: 'Deepen. The book-distiller subagent curates 10–20 quotes and distils every chapter into a key-idea plus summary. The research command adds external reading with *why it pairs* and videos with kind + duration. Every layer makes the book more citable — by you, by Google, by any LLM that ever needs to quote it.',
    input: '/library-deepen {slug}  →  /library-research {slug}',
  },
  {
    index: '04',
    title: 'Publish',
    accent: 'cyan',
    body: 'One commit, and the book becomes a permanent URL. TOC, anchor-linked sections, JSON-LD schema (BreadcrumbList · Article · Review · FAQPage · Quotation), Open Graph covers, canonical URLs. It will outlive the habit that produced it.',
    input: '/library/{slug}',
  },
];

const workflowRows = [
  {
    signal: 'Handwritten note',
    capture: 'Photo on phone',
    extract: 'Claude mobile vision → structured fields',
    publish: 'Deep-dive on your site',
  },
  {
    signal: 'Kindle highlights',
    capture: 'Export CSV / clippings.txt',
    extract: 'Book distiller → quotes[]',
    publish: 'Quotes section live with chapter refs',
  },
  {
    signal: 'Voice memo on a walk',
    capture: 'Record + transcribe',
    extract: 'Extract insights + bestFor',
    publish: 'keyInsights render on the index',
  },
  {
    signal: 'Book title only',
    capture: '/library-add',
    extract: 'Baseline review from training knowledge',
    publish: 'Starter entry, ready to deepen',
  },
];

const aiAdapters = [
  {
    tool: 'Claude Code',
    native: true,
    note: 'Three slash commands (/library-add, /library-deepen, /library-research) + the book-distiller subagent + library-os skill. This is the canonical implementation.',
  },
  {
    tool: 'ChatGPT / Claude.ai (web)',
    native: false,
    note: 'Paste the command prompt from .claude/commands/library-*.md, paste the book details, get the structured TypeScript back, paste into data/book-reviews.ts.',
  },
  {
    tool: 'Cursor / Codex / Gemini CLI',
    native: false,
    note: 'The command files are plain-text instructions. Any capable AI pair-programmer can execute them. The skill file doubles as documentation.',
  },
  {
    tool: 'Pen & paper',
    native: false,
    note: 'The schema and template work without any AI. A hand-curated library of 20 books is more valuable than an LLM-scraped library of 500.',
  },
];

const deploymentTargets = [
  {
    stack: 'Next.js (App Router)',
    effort: 'Zero',
    note: 'Direct. Copy app/library/, app/books/types.ts, data/book-reviews.ts, public/images/library/ into your Next.js repo. One command deploy on Vercel.',
  },
  {
    stack: 'Astro / Starlight',
    effort: 'Small',
    note: 'Port app/library/ to src/pages/library/, use .astro for layout. Data schema and JSON-LD shape remain identical.',
  },
  {
    stack: 'SvelteKit',
    effort: 'Small',
    note: 'routes/library/+page.svelte + routes/library/[slug]/+page.svelte. The schema and render-logic are framework-neutral.',
  },
  {
    stack: 'Hugo / Jekyll / 11ty',
    effort: 'Medium',
    note: 'Each BookReview becomes a markdown file with YAML frontmatter. Templates consume the same fields. Build-time static HTML.',
  },
  {
    stack: 'Plain HTML',
    effort: 'Medium',
    note: 'A 60-line build script renders the data to static pages. The JSON-LD schema works with no framework at all.',
  },
];

const stats = [
  { label: 'Books live', value: String(bookReviews.length) },
  { label: 'Deep-dives', value: String(deepDives.length) },
  {
    label: 'Quotes cited',
    value: String(bookReviews.reduce((n, r) => n + (r.quotes?.length ?? 0), 0)),
  },
  {
    label: 'Chapters distilled',
    value: String(bookReviews.reduce((n, r) => n + (r.chapters?.length ?? 0), 0)),
  },
];

const accentBg: Record<string, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  amber: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  violet: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
  cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
};

const accentLine: Record<string, string> = {
  emerald: 'bg-emerald-500/60',
  amber: 'bg-amber-500/60',
  violet: 'bg-violet-500/60',
  cyan: 'bg-cyan-500/60',
};

export default function LibraryApproachPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <ArticleJsonLd />

      {/* Back link */}
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-4">
        <Link
          href="/library"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
        >
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
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Library
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/3 w-[540px] h-[540px] bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-[420px] h-[420px] bg-violet-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-[360px] h-[360px] bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 pt-12 pb-24">
          <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400/70 mb-6">
            The Library OS
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            Build your library.
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              Own it forever.
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl">
            The open-source system for capturing every book you read into a permanent,
            intelligent, citation-ready hub on your own website. Kindle highlights die in
            Kindle. Notion docs scatter. A library on your own domain, in git, becomes a
            compounding asset that outlives every tool you use to build it.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.027 2.748-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.847-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.578.688.48C19.137 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub — library-os
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
            <a
              href={`https://vercel.com/new/clone?repository-url=${encodeURIComponent(
                REPO_URL
              )}&project-name=my-library&repository-name=my-library`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 76 65" fill="currentColor" aria-hidden>
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </svg>
              Deploy with Vercel
            </a>
            <Link
              href="/library"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium hover:bg-amber-500/20 transition-colors"
            >
              See it live →
            </Link>
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
              >
                <div className="text-3xl md:text-4xl font-bold text-white tabular-nums">
                  {s.value}
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-white/40 mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-4">
          The Problem
        </p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white">
          Your reading doesn&apos;t compound.
        </h2>
        <div className="mt-8 space-y-5 text-white/60 text-[17px] leading-relaxed max-w-3xl">
          <p>
            Readers forget up to ninety percent of what they read within a week. Kindle
            highlights die in Kindle. Notion docs scatter into three-nested folders you
            will never reopen. Goodreads knows what you read but not what you{' '}
            <em>took</em> from it.
          </p>
          <p>
            The cost is invisible but enormous. Every book you&apos;ve read is capital.
            Without a system to compound it, that capital depreciates to zero the moment
            the book goes back on the shelf.
          </p>
          <p className="text-white/80">
            The Library OS is the system that makes it compound.
          </p>
        </div>
      </section>

      {/* The Workflow — four stages */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-4">
          The Workflow
        </p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-4">
          Four stages. One permanent asset.
        </h2>
        <p className="text-white/50 max-w-2xl mb-12 text-[15px]">
          Every book follows the same path. The system is the repeatability. No snowflakes,
          no bespoke one-offs — one schema, one template, one command pipeline.
        </p>

        <div className="space-y-6">
          {stages.map((stage) => (
            <div
              key={stage.index}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10"
            >
              <div className="flex-shrink-0 flex md:flex-col items-start gap-4 md:gap-6 md:w-40">
                <span
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl border text-sm font-mono font-semibold ${
                    accentBg[stage.accent]
                  }`}
                >
                  {stage.index}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold text-white">{stage.title}</h3>
                  <div className={`mt-2 w-8 h-px ${accentLine[stage.accent]}`} />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <p className="text-white/70 leading-relaxed text-[15.5px]">{stage.body}</p>
                <code className="inline-block px-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.06] text-[12.5px] font-mono text-white/60">
                  {stage.input}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Signal → Publish matrix */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-4">
          How any input becomes a permanent page
        </p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-12">
          From signal to shipped.
        </h2>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
          <div className="hidden md:grid grid-cols-4 gap-0 border-b border-white/[0.06] text-[11px] uppercase tracking-[0.18em] text-white/40">
            <div className="p-5">Signal</div>
            <div className="p-5 border-l border-white/[0.06]">Capture</div>
            <div className="p-5 border-l border-white/[0.06]">Extract</div>
            <div className="p-5 border-l border-white/[0.06]">Publish</div>
          </div>
          {workflowRows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-4 gap-0 border-b border-white/[0.04] last:border-b-0 text-[14px]"
            >
              <div className="p-5 font-medium text-white/85">{row.signal}</div>
              <div className="p-5 md:border-l border-white/[0.06] text-white/60">
                {row.capture}
              </div>
              <div className="p-5 md:border-l border-white/[0.06] text-white/60">
                {row.extract}
              </div>
              <div className="p-5 md:border-l border-white/[0.06] text-white/60">
                {row.publish}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case studies — live deep dives */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-4">
          Live Deep-Dives
        </p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-4">
          This is what a book looks like when it compounds.
        </h2>
        <p className="text-white/50 max-w-2xl mb-12 text-[15px]">
          Two books run through the full pipeline. Click in — every section the TOC
          promises is real, every quote has its chapter, every recommendation earns its
          place.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {deepDives.map((r) => (
            <Link
              key={r.slug}
              href={`/library/${r.slug}`}
              className="group block rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-amber-500/20 hover:bg-amber-500/[0.02] transition-all p-6"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-amber-400/70 mb-3">
                Deep-dive
              </p>
              <h3 className="text-2xl font-bold text-white group-hover:text-amber-200 transition-colors">
                {r.title}
              </h3>
              <p className="text-sm text-white/50 mt-1">by {r.author}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {r.quotes && (
                  <span className="px-2.5 py-1 text-[11px] uppercase tracking-wider rounded-full bg-rose-500/10 text-rose-300/80 border border-rose-500/15">
                    {r.quotes.length} quotes
                  </span>
                )}
                {r.chapters && (
                  <span className="px-2.5 py-1 text-[11px] uppercase tracking-wider rounded-full bg-violet-500/10 text-violet-300/80 border border-violet-500/15">
                    {r.chapters.length} chapters
                  </span>
                )}
                {r.continueReading && (
                  <span className="px-2.5 py-1 text-[11px] uppercase tracking-wider rounded-full bg-cyan-500/10 text-cyan-300/80 border border-cyan-500/15">
                    {r.continueReading.length} related
                  </span>
                )}
                {r.videos && (
                  <span className="px-2.5 py-1 text-[11px] uppercase tracking-wider rounded-full bg-red-500/10 text-red-300/80 border border-red-500/15">
                    {r.videos.length} videos
                  </span>
                )}
              </div>
              {r.tldr && (
                <p className="mt-5 text-[14.5px] text-white/60 leading-relaxed line-clamp-3">
                  {r.tldr}
                </p>
              )}
              <span className="inline-flex items-center gap-1 mt-5 text-[12px] text-amber-400/70 group-hover:text-amber-300 transition-colors">
                Explore the deep-dive
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Architecture — the spine */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-4">
          Architecture
        </p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-4">
          The schema is the spine.
        </h2>
        <p className="text-white/50 max-w-2xl mb-10 text-[15px]">
          Everything — the index, the deep-dive page, the JSON-LD schema graph, the
          cross-framework portability — flows from a single TypeScript interface.
          Interchangeable template, immutable spine.
        </p>

        <div className="rounded-2xl border border-white/[0.06] bg-black/40 p-6 md:p-8 overflow-x-auto">
          <pre className="text-[13px] leading-relaxed text-white/70 font-mono whitespace-pre">
{`interface BookReview {
  // Identity
  slug, title, author, coverImage, rating, reviewDate, categories, readingTime

  // Core content
  keyInsights: string[]   // exactly 5
  bestFor: string[]       // 3–4

  // AEO layer (optional, strongly recommended)
  tldr?: string
  faq?: Array<{ q, a }>
  publicationYear?: number

  // Deep-dive layer (optional — progressive depth)
  quotes?: BookQuote[]                  // text, chapter, context
  chapters?: BookChapterSummary[]       // number, title, keyIdea, summary
  continueReading?: RelatedReadingItem[]
  videos?: BookVideo[]

  // Wiring
  amazonUrl?: string
  relatedBook?: string    // links to your own books
  hasCover?: boolean      // gates next/image render
}`}
          </pre>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Progressive depth',
              body: 'Books without optional fields render as reviews. Books with all fields render as hubs. One template, many depths.',
            },
            {
              title: 'AEO-first schema',
              body: 'BreadcrumbList + Article + Review + FAQPage + Quotation. Up to 30+ schema nodes per hub page. Maximum LLM citation surface.',
            },
            {
              title: 'Framework-neutral',
              body: 'The spine is TypeScript data + JSON-LD emission. The template layer can be Next.js, Astro, Svelte, Hugo, or plain HTML.',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
            >
              <h3 className="text-[15px] font-semibold text-white mb-2">{card.title}</h3>
              <p className="text-[13.5px] text-white/55 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-AI compatibility */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-4">
          Cross-AI · Cross-Tool
        </p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-4">
          The intelligence lives in the workflow.
        </h2>
        <p className="text-white/50 max-w-2xl mb-10 text-[15px]">
          Claude Code is the canonical implementation. It&apos;s not the only one. The
          same schema, the same command prompts, the same curation standards work
          everywhere intelligence is rented or owned.
        </p>

        <div className="space-y-3">
          {aiAdapters.map((a) => (
            <div
              key={a.tool}
              className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]"
            >
              <div className="flex items-center gap-3 sm:w-56 flex-shrink-0">
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    a.native ? 'bg-emerald-400' : 'bg-white/30'
                  }`}
                  aria-hidden
                />
                <h3 className="text-[15px] font-semibold text-white">{a.tool}</h3>
                {a.native && (
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300/80 border border-emerald-500/20">
                    native
                  </span>
                )}
              </div>
              <p className="text-[14px] text-white/60 leading-relaxed flex-1">{a.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Deployment targets */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-4">
          Deploy Anywhere
        </p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-10">
          Pick your stack. Keep the spine.
        </h2>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
          <div className="hidden md:grid grid-cols-[200px_120px_1fr] gap-0 border-b border-white/[0.06] text-[11px] uppercase tracking-[0.18em] text-white/40">
            <div className="p-5">Stack</div>
            <div className="p-5 border-l border-white/[0.06]">Port effort</div>
            <div className="p-5 border-l border-white/[0.06]">Notes</div>
          </div>
          {deploymentTargets.map((t, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[200px_120px_1fr] gap-0 border-b border-white/[0.04] last:border-b-0 text-[14px]"
            >
              <div className="p-5 font-medium text-white/85">{t.stack}</div>
              <div className="p-5 md:border-l border-white/[0.06] text-white/60 font-mono text-[13px]">
                {t.effort}
              </div>
              <div className="p-5 md:border-l border-white/[0.06] text-white/60 leading-relaxed">
                {t.note}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The future */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-4">
          Where it&apos;s going
        </p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-10">
          The next primitives.
        </h2>

        <div className="space-y-6 text-white/60 text-[16px] leading-relaxed">
          <div className="flex gap-5 items-start">
            <span className="flex-shrink-0 mt-1 w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400/90 text-sm font-mono font-semibold">
              i
            </span>
            <p>
              <strong className="text-white/85">Image ingestion.</strong> Handwritten
              notes → photo → Claude mobile vision → structured extraction → handover to
              Claude Code on desktop for implementation. The note never touches a
              third-party tool that can delete it.
            </p>
          </div>
          <div className="flex gap-5 items-start">
            <span className="flex-shrink-0 mt-1 w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-300/90 text-sm font-mono font-semibold">
              ii
            </span>
            <p>
              <strong className="text-white/85">Bulk import.</strong> Kindle My
              Clippings.txt, Readwise export, Goodreads CSV → one command, dozens of
              books ingested as baseline entries. Deepen selectively by merit, not
              completeness.
            </p>
          </div>
          <div className="flex gap-5 items-start">
            <span className="flex-shrink-0 mt-1 w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300/90 text-sm font-mono font-semibold">
              iii
            </span>
            <p>
              <strong className="text-white/85">Voice-memo pipeline.</strong> Record a
              thought after a walk. Transcription → ambient capture → attached as a new
              insight or quote on the right book&apos;s entry. The library stays
              gardened.
            </p>
          </div>
          <div className="flex gap-5 items-start">
            <span className="flex-shrink-0 mt-1 w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-300/90 text-sm font-mono font-semibold">
              iv
            </span>
            <p>
              <strong className="text-white/85">Shared library graphs.</strong> Opt-in,
              far future. Discover which books your peers have deep-dived. Cite each
              other&apos;s curated quotes. Build a distributed research substrate from
              individually-owned libraries.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="rounded-3xl border border-amber-500/15 bg-gradient-to-br from-amber-500/[0.06] via-transparent to-violet-500/[0.04] p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400/80 mb-4">
              Start building
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Your library is already there.
              <br />
              It&apos;s just not on your site yet.
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mt-6 text-[16px] leading-relaxed">
              Fork the template. Deploy to Vercel. Ingest your first book. In under an
              hour you have a permanent, intelligent, schema-rich entry on your own
              domain. In six months you have a library that compounds.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                View on GitHub
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
              <a
                href={`https://vercel.com/new/clone?repository-url=${encodeURIComponent(
                  REPO_URL
                )}&project-name=my-library&repository-name=my-library`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Deploy to Vercel
              </a>
              <Link
                href="/library"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium hover:bg-amber-500/20 transition-colors"
              >
                Browse the live library
              </Link>
            </div>
            <p className="mt-10 text-[12px] text-white/30">
              MIT licensed · Built on Next.js App Router · Published on frankx.ai
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
