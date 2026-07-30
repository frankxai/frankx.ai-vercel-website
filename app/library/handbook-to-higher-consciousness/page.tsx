import type { Metadata } from 'next';
import Link from 'next/link';
import {
  coreOperatingModel,
  criticalReading,
  fiveLearningStages,
  fiveMethods,
  handbookSources,
  handbookToHigherConsciousnessReview as review,
  sevenCenters,
  twelvePathways,
  type ManualItem,
} from '@/data/handbook-to-higher-consciousness';

const SITE_URL = 'https://frankx.ai';
const CANONICAL = `${SITE_URL}/library/${review.slug}`;

export const metadata: Metadata = {
  title: `${review.title} by ${review.author} — Complete System Map`,
  description:
    'A source-backed field manual to Ken Keyes Jr.’s complete Living Love system: 16 insights, Seven Centers, Twelve Pathways, Five Methods, five learning stages, applications, and a modern critical reading.',
  keywords: [
    'Handbook to Higher Consciousness summary',
    'Ken Keyes Jr',
    'Seven Centers of Consciousness',
    'Twelve Pathways',
    'Living Love',
    'non-attachment',
    'unconditional love',
  ],
  alternates: { canonical: CANONICAL },
  authors: [{ name: 'Frank' }],
  openGraph: {
    title: 'Handbook to Higher Consciousness — Complete System Map',
    description:
      'The complete Living Love operating system, translated into a source-backed modern field manual.',
    type: 'article',
    url: CANONICAL,
    siteName: 'FrankX Library',
    publishedTime: review.reviewDate,
    images: [
      {
        url: `${CANONICAL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Handbook to Higher Consciousness — complete system map',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Handbook to Higher Consciousness — Complete System Map',
    description: 'Seven Centers. Twelve Pathways. Five Methods. One modern field manual.',
    images: [`${CANONICAL}/opengraph-image`],
  },
};

const toc = [
  ['short-answer', 'Short answer'],
  ['key-insights', '16 insights'],
  ['complete-system', 'Complete system'],
  ['seven-centers', 'Seven Centers'],
  ['twelve-pathways', 'Twelve Pathways'],
  ['five-methods', 'Five Methods'],
  ['learning-stages', 'Five stages'],
  ['application', '90-second practice'],
  ['modern-reading', 'Modern reading'],
  ['sources', 'Sources'],
  ['faq', 'FAQ'],
] as const;

function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Library', item: `${SITE_URL}/library` },
          { '@type': 'ListItem', position: 3, name: review.title, item: CANONICAL },
        ],
      },
      {
        '@type': 'Article',
        headline: `${review.title} by ${review.author} — Complete System Map`,
        description: review.tldr,
        url: CANONICAL,
        image: `${CANONICAL}/opengraph-image`,
        author: { '@type': 'Person', name: 'Frank', url: SITE_URL },
        publisher: { '@type': 'Organization', name: 'FrankX', url: SITE_URL },
        datePublished: review.reviewDate,
        dateModified: review.reviewDate,
        articleSection: review.categories,
        citation: handbookSources.map((source) => source.url),
        mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
      },
      {
        '@type': 'Book',
        name: review.title,
        author: { '@type': 'Person', name: review.author },
        datePublished: String(review.publicationYear),
        isbn: '0960068880',
        sameAs: review.amazonUrl,
      },
      {
        '@type': 'FAQPage',
        mainEntity: review.faq?.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
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

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.24em] text-amber-300/75">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
        {title}
      </h2>
      {body && <p className="mt-4 text-base leading-relaxed text-white/55">{body}</p>}
    </div>
  );
}

function ManualGrid({
  items,
  columns = 'md:grid-cols-2',
}: {
  items: ManualItem[];
  columns?: string;
}) {
  return (
    <div className={`grid gap-3 ${columns}`}>
      {items.map((item) => (
        <article
          key={`${item.number}-${item.name}`}
          className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-colors hover:border-amber-300/20 hover:bg-amber-300/[0.025]"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-9 min-w-9 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-2 text-xs font-semibold text-amber-200">
              {item.number}
            </span>
            <div>
              <h3 className="font-semibold text-white">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/52">{item.signal}</p>
              <p className="mt-3 border-l border-amber-300/25 pl-3 text-sm leading-relaxed text-white/75">
                {item.practice}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function HandbookToHigherConsciousnessPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070708] text-white">
      <JsonLd />

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-48 top-12 h-[34rem] w-[34rem] rounded-full bg-amber-400/[0.055] blur-[120px]" />
        <div className="absolute -right-40 top-[38rem] h-[30rem] w-[30rem] rounded-full bg-violet-500/[0.045] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-28 lg:px-8">
        <Link
          href="/library"
          className="inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          <span aria-hidden="true">←</span>
          Back to Library
        </Link>

        <header className="grid gap-10 pb-14 pt-10 lg:grid-cols-[1fr_20rem] lg:items-end">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-amber-200/70">
              <span className="rounded-full border border-amber-300/20 bg-amber-300/[0.055] px-3 py-1.5">
                Source-backed field manual
              </span>
              <span>{review.publicationYear}</span>
              <span aria-hidden="true">·</span>
              <span>{review.readingTime}</span>
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
              Handbook to Higher Consciousness
            </h1>
            <p className="mt-5 text-xl text-white/50">Ken Keyes Jr.</p>
            <div
              className="mt-5 flex items-center gap-3"
              aria-label={`${review.rating} out of 5 stars`}
            >
              <span className="tracking-[0.16em] text-amber-300" aria-hidden="true">
                ★★★★☆
              </span>
              <span className="text-xs text-white/35">FrankX critical edition</span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">System checksum</p>
            <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07]">
              {[
                ['16', 'Insights'],
                ['07', 'Centers'],
                ['12', 'Pathways'],
                ['05+', 'Methods'],
              ].map(([value, label]) => (
                <div key={label} className="bg-[#0b0b0d] p-4">
                  <p className="text-2xl font-semibold text-amber-200">{value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/35">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-white/40">
              Complete architecture, practical translation, and explicit limits. No quote dump.
            </p>
          </div>
        </header>

        <nav
          aria-label="Guide contents"
          className="mb-14 flex gap-2 overflow-x-auto border-y border-white/[0.07] py-4"
        >
          {toc.map(([href, label]) => (
            <a
              key={href}
              href={`#${href}`}
              className="shrink-0 rounded-full border border-white/[0.08] px-3 py-1.5 text-xs text-white/45 transition hover:border-amber-300/25 hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              {label}
            </a>
          ))}
        </nav>

        <section id="short-answer" className="scroll-mt-24 pb-20">
          <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="rounded-3xl border border-amber-300/15 bg-amber-300/[0.035] p-6 sm:p-8">
              <p className="text-[10px] uppercase tracking-[0.24em] text-amber-200/70">
                The short answer
              </p>
              <p className="mt-5 text-lg leading-relaxed text-white/82">{review.tldr}</p>
            </div>
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">
                FrankX synthesis
              </p>
              <p className="mt-5 text-2xl font-medium leading-snug tracking-[-0.02em] text-white sm:text-3xl">
                Want intensely. Love without coercion. Act decisively. Require no result to certify
                your wholeness.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-white/48">
                Non-attachment is not low ambition. It is the removal of psychological blackmail
                from ambition.
              </p>
            </div>
          </div>
        </section>

        <section id="key-insights" className="scroll-mt-24 pb-24">
          <SectionHeading
            eyebrow="Distillation"
            title="The 16 insights worth carrying"
            body="The book’s durable operating logic, separated from its period language and maximal claims."
          />
          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-2">
            {review.keyInsights.map((insight, index) => (
              <article key={insight} className="bg-[#0a0a0c] p-6">
                <p className="text-[10px] font-semibold tracking-[0.18em] text-amber-200/60">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{insight}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="complete-system" className="scroll-mt-24 pb-24">
          <SectionHeading
            eyebrow="Operating model"
            title="The complete loop"
            body="Keyes’s architecture is a control-system rewrite: detect the compulsory outcome, separate fact from program, convert demand into preference, restore range, and learn from recurrence."
          />
          <ManualGrid items={coreOperatingModel} />
        </section>

        <section id="seven-centers" className="scroll-mt-24 pb-24">
          <SectionHeading
            eyebrow="State detection"
            title="The Seven Centers of Consciousness"
            body="Use the scale as a moment-to-moment diagnostic, never as a spiritual caste system. Every center can appear in one day—or one conversation."
          />
          <ManualGrid items={sevenCenters} columns="md:grid-cols-2 lg:grid-cols-3" />
        </section>

        <section id="twelve-pathways" className="scroll-mt-24 pb-24">
          <SectionHeading
            eyebrow="Replacement instructions"
            title="The Twelve Pathways, paraphrased"
            body="The original pathways are grouped around freedom, presence, relationship, and conscious awareness. These are functional translations, not reproduced text."
          />
          <ManualGrid items={twelvePathways} columns="md:grid-cols-2 lg:grid-cols-3" />
        </section>

        <section id="five-methods" className="scroll-mt-24 pb-24">
          <SectionHeading
            eyebrow="Meditation in action"
            title="Five Methods + the consciousness doubler"
            body="The system is designed for ordinary life: arguments, work, desire, disappointment, and decision—not withdrawal from them."
          />
          <ManualGrid items={fiveMethods} columns="md:grid-cols-2 lg:grid-cols-3" />
        </section>

        <section id="learning-stages" className="scroll-mt-24 pb-24">
          <SectionHeading
            eyebrow="Progress model"
            title="Measure recovery latency"
            body="The mature metric is not “never feel activated.” It is how early awareness enters the sequence and how quickly effective choice returns."
          />
          <div className="relative space-y-3 before:absolute before:bottom-8 before:left-[1.1rem] before:top-8 before:w-px before:bg-amber-300/15">
            {fiveLearningStages.map((stage) => (
              <article
                key={stage.number}
                className="relative grid gap-4 rounded-2xl border border-white/[0.07] bg-[#0a0a0c] p-5 sm:grid-cols-[3rem_1fr]"
              >
                <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/25 bg-[#0f0e0b] text-xs font-semibold text-amber-200">
                  {stage.number}
                </span>
                <div>
                  <h3 className="font-semibold text-white">{stage.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{stage.signal}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{stage.practice}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="application" className="scroll-mt-24 pb-24">
          <div className="rounded-[2rem] border border-amber-300/20 bg-gradient-to-br from-amber-300/[0.09] via-amber-300/[0.025] to-violet-400/[0.035] p-7 sm:p-10">
            <p className="text-[10px] uppercase tracking-[0.24em] text-amber-200/75">
              Apply it now · 90 seconds
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              The demand audit
            </h2>
            <ol className="mt-7 grid gap-3 md:grid-cols-5">
              {[
                ['01', 'Fact', 'Name what happened without motive, story, or forecast.'],
                ['02', 'Emotion', 'Name the feeling and locate its activation in the body.'],
                ['03', 'Demand', 'Complete: “I am demanding that…”'],
                ['04', 'Preference', 'Keep the desired result; remove the ultimatum.'],
                ['05', 'Action', 'Choose the smallest effective move available now.'],
              ].map(([number, title, body]) => (
                <li key={number} className="rounded-2xl border border-white/10 bg-black/15 p-4">
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-amber-200/65">
                    {number}
                  </span>
                  <h3 className="mt-2 text-sm font-semibold">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/55">{body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-7 rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="text-sm leading-relaxed text-white/75">
                “I strongly prefer this outcome, and I remain able to love, think, and act when
                reality differs.”
              </p>
            </div>
          </div>
        </section>

        <section id="modern-reading" className="scroll-mt-24 pb-24">
          <SectionHeading
            eyebrow="Critical edition"
            title="What survives—and what needs qualification"
            body="The book is strongest as contemplative engineering. It weakens when metaphor is presented as neuroscience or inner agency expands into total causation."
          />
          <div className="overflow-hidden rounded-3xl border border-white/[0.07]">
            {criticalReading.map((item, index) => (
              <article
                key={item.principle}
                className={`grid gap-5 bg-[#0a0a0c] p-6 lg:grid-cols-[0.35fr_0.825fr_0.825fr] ${
                  index > 0 ? 'border-t border-white/[0.07]' : ''
                }`}
              >
                <h3 className="font-semibold text-white">{item.principle}</h3>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-300/65">Keep</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{item.keep}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-amber-300/65">Qualify</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{item.qualify}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="sources" className="scroll-mt-24 pb-24">
          <SectionHeading
            eyebrow="Evidence ledger"
            title="Sources & provenance"
            body="Primary text for fidelity; bibliographic and authorial context for provenance; contemporary research for calibration."
          />
          <div className="grid gap-3 md:grid-cols-2">
            {handbookSources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition hover:border-amber-300/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-amber-200/55">
                      {source.kind}
                    </p>
                    <h3 className="mt-2 text-sm font-semibold leading-snug text-white/85 group-hover:text-amber-100">
                      {source.label}
                    </h3>
                  </div>
                  <span className="text-white/25 transition group-hover:text-amber-200" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-white/42">{source.note}</p>
              </a>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-white/35">
            Rights posture: transformative analysis. This page intentionally excludes extended
            quotations and chapter reproduction.
          </p>
        </section>

        <section id="faq" className="scroll-mt-24 pb-20">
          <SectionHeading eyebrow="Reader questions" title="FAQ" />
          <div className="space-y-3">
            {review.faq?.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 open:border-amber-300/15"
              >
                <summary className="cursor-pointer list-none pr-8 text-sm font-semibold text-white/80 marker:hidden">
                  {item.q}
                  <span className="float-right text-amber-200/55 transition group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/55">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-7 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-amber-200/65">
                Continue the architecture
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                Build a vision that directs you without imprisoning you.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/50">
                Connect outcome-independent action to your identity, manifestation practice, and
                operating system.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/manifestation"
                className="rounded-full border border-amber-300/25 bg-amber-300/[0.07] px-5 py-2.5 text-sm font-medium text-amber-100 transition hover:bg-amber-300/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                Manifestation
              </Link>
              <Link
                href="/soulbook"
                className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-white/65 transition hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Soulbook
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
