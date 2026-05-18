import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Github, Layers, BookOpen, Sparkles, Building2, Wrench } from 'lucide-react';
import { EmailSignup } from '@/components/email-signup';
import { bookReviews } from '@/data/book-reviews';

const SITE_URL = 'https://frankx.ai';
const PAGE_URL = `${SITE_URL}/library/build`;
const REPO_URL = 'https://github.com/frankxai/library-os';

export const metadata: Metadata = {
  title: 'Build Your Library — The Open-Source Library OS | FrankX',
  description:
    'Turn every book you read into a permanent, SEO-indexed deep-dive on your own website. Free open-source repo. Paid tiers in design — waitlist only.',
  keywords: [
    'Library OS',
    'book knowledge system',
    'personal library website',
    'Next.js book template',
    'AI book deep-dive',
    'book review website',
    'authority site books',
    'reading list website',
    'open source PKM',
    'second brain alternative',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Build Your Library — Open-Source Library OS',
    description:
      'Every book you read becomes a permanent asset on your own website. Free repo. Paid tiers in design — waitlist only.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'FrankX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build Your Library — Library OS',
    description: 'Permanent book deep-dives on your own domain. Free repo, waitlist for paid tiers.',
  },
};

const totalBooks = bookReviews.length;
const deepDiveBooks = bookReviews.filter(
  (r) => (r.quotes?.length ?? 0) > 0 && (r.chapters?.length ?? 0) > 0
);
const totalQuotes = bookReviews.reduce((acc, r) => acc + (r.quotes?.length ?? 0), 0);
const totalChapters = bookReviews.reduce((acc, r) => acc + (r.chapters?.length ?? 0), 0);

type Tier = {
  id: 'oss' | 'starter' | 'curator' | 'dfy' | 'enterprise';
  name: string;
  status: string;
  tagline: string;
  description: string;
  features: string[];
  cta: { label: string; href: string; external?: boolean };
  featured?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  color: 'slate' | 'emerald' | 'violet' | 'amber' | 'rose';
};

const tiers: Tier[] = [
  {
    id: 'oss',
    name: 'Open Source',
    status: 'Available',
    tagline: 'The foundation',
    description: 'Clone the repo, run the commands, publish your library. MIT-licensed. No strings.',
    features: [
      'Next.js 14 starter (App Router, RSC)',
      'BookReview schema + JSON-LD generators',
      '3 slash commands (/library-add, deepen, research)',
      'Cross-AI portable prompts (Claude, ChatGPT, Codex, Gemini)',
      '/library + /library/[slug] + /library/approach scaffolding',
      'Cover prompt pack (Nano Banana / NB Pro)',
    ],
    cta: { label: 'View on GitHub', href: REPO_URL, external: true },
    icon: Github,
    color: 'slate',
  },
  {
    id: 'starter',
    name: 'Starter Kit',
    status: 'In design — waitlist',
    tagline: 'Fork-and-go',
    description: 'A pre-configured fork seeded with 10 starter book entries and 1 deep-dive — so your library looks credible on day one.',
    features: [
      'Pre-configured fork with brand-neutral theme',
      '10 seeded book entries across genres',
      '1 fully-deepened example (quotes + chapters + recs)',
      'Vercel deploy button — live in 5 minutes',
      'PDF: "The 50-Book Authority Library Playbook"',
      'Discord access for setup support',
    ],
    cta: { label: 'Join the waitlist', href: '#signup' },
    icon: BookOpen,
    color: 'emerald',
  },
  {
    id: 'curator',
    name: "Curator's OS",
    status: 'In design — waitlist',
    tagline: 'The full system',
    description: 'Everything in Starter, plus 50 fully-deepened book entries — you skip 50+ hours of curation and ship an instant authority site.',
    features: [
      'Everything in Starter Kit',
      '50 deep-dived books (quotes, chapters, summaries)',
      'Theme builder — Scholarly, Modern, Minimalist',
      'Cross-AI deepen suite (paste-into-anything)',
      'Newsletter integration (ConvertKit / Beehiiv)',
      'Private community + monthly office hours',
      'Lifetime updates',
    ],
    cta: { label: 'Join the waitlist', href: '#signup' },
    icon: Layers,
    color: 'violet',
    featured: true,
  },
  {
    id: 'dfy',
    name: 'Done-For-You',
    status: 'In design — waitlist',
    tagline: 'I build it on your domain',
    description: 'I build a 50-book deepened library on your domain, voice-matched to your existing content. You wake up with an authority asset that ranks.',
    features: [
      'Voice extraction from your existing content',
      '50 books fully deepened (quotes, chapters, recs)',
      'Custom branding + cover treatment',
      'Deployed to your domain (Vercel / your host)',
      '30-day post-launch optimization sprint',
      'Lifetime access to Curator\'s OS updates',
      'Private 1:1 onboarding call',
    ],
    cta: { label: 'Join the waitlist', href: '#signup' },
    icon: Wrench,
    color: 'amber',
  },
  {
    id: 'enterprise',
    name: 'Enterprise / Publisher',
    status: 'By conversation',
    tagline: 'Multi-author libraries',
    description: 'For publishers, universities, and content companies running multi-author book corpora at scale.',
    features: [
      'Multi-author admin + roles',
      'API seeding + maintenance hooks',
      'Custom AI agents trained on your corpus',
      'White-label theme + brand system',
      'Annual maintenance contract',
      'Direct line to Frank for architecture',
    ],
    cta: { label: 'Talk to Frank', href: '/contact?topic=library-enterprise' },
    icon: Building2,
    color: 'rose',
  },
];

const colorMap: Record<Tier['color'], { ring: string; accent: string; chipBg: string; chipText: string }> = {
  slate: { ring: 'ring-white/10', accent: 'text-white', chipBg: 'bg-white/5', chipText: 'text-white/60' },
  emerald: { ring: 'ring-emerald-400/30', accent: 'text-emerald-300', chipBg: 'bg-emerald-500/10', chipText: 'text-emerald-200' },
  violet: { ring: 'ring-violet-400/40', accent: 'text-violet-300', chipBg: 'bg-violet-500/10', chipText: 'text-violet-200' },
  amber: { ring: 'ring-amber-400/30', accent: 'text-amber-300', chipBg: 'bg-amber-500/10', chipText: 'text-amber-200' },
  rose: { ring: 'ring-rose-400/30', accent: 'text-rose-300', chipBg: 'bg-rose-500/10', chipText: 'text-rose-200' },
};

const faqs = [
  {
    q: 'Why publish book deep-dives publicly instead of keeping them in Notion?',
    a: 'Notion notes die when you cancel the subscription, change tools, or just stop opening the app. Library OS publishes them as your own SEO-indexed website with JSON-LD schema. Each book becomes a long-tail SEO asset that ranks, attracts readers, and demonstrates intellectual depth — for years.',
  },
  {
    q: 'How is this different from Goodreads, Readwise, or BookTok?',
    a: 'Those are platforms — you rent attention inside someone else\'s app. Library OS is your own domain, your own design, your own JSON-LD, your own SEO. You own the asset. Goodreads gets the traffic; Library OS gets you the traffic.',
  },
  {
    q: 'Do I need to be a developer to use the open-source repo?',
    a: 'You need to be comfortable with one terminal command (clone) and one click (Vercel deploy). If you can publish a Next.js site, you can run Library OS. If you can\'t — that\'s exactly what the Starter Kit and Done-For-You tiers will exist for. Both are on the waitlist.',
  },
  {
    q: 'Are the paid tiers available now?',
    a: 'No. The OSS repo is the only thing shipping right now. Starter Kit, Curator\'s OS, and Done-For-You are in design — they go to the waitlist first when ready. No pricing is set. No drip sequence. One honest email when the kits open.',
  },
  {
    q: 'Can I see a real one running?',
    a: `Yes — frankx.ai/library is the canonical reference. ${totalBooks} books, ${deepDiveBooks.length} fully deepened, ${totalQuotes}+ quotes, ${totalChapters}+ chapter summaries. Every page on this site uses the same schema and template you get with the OSS repo.`,
  },
  {
    q: 'What about AI hallucinations? Won\'t the quotes be fabricated?',
    a: 'The Library OS workflow has anti-hallucination guardrails baked in: never fabricate verbatim quotes — paraphrases go in `context`, not `text`. Never invent video URLs. Every recommendation in "Continue Reading" must state the connection explicitly. The system enforces this through the prompt design, not just goodwill.',
  },
];

function ArticleJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Library', item: `${SITE_URL}/library` },
          { '@type': 'ListItem', position: 3, name: 'Build', item: PAGE_URL },
        ],
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Library OS',
        description: 'Open-source book intelligence system. Capture, extract, enrich, and publish every book into a permanent deep-dive on your own website.',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        url: REPO_URL,
        license: 'https://opensource.org/licenses/MIT',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
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

export default function LibraryBuildPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white">
      <ArticleJsonLd />

      {/* HERO */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.04] blur-[120px]" />
          <div className="absolute top-20 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/[0.04] blur-[120px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <Link
            href="/library/approach"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/5 px-4 py-1.5 text-xs font-medium text-emerald-200 mb-8 hover:bg-emerald-500/10 transition"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Open-source · MIT-licensed · Read the manifesto
          </Link>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Every book you read,
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-emerald-200 to-violet-300 bg-clip-text text-transparent">
              a permanent asset
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
            Library OS turns the books you read into deep-dives on your own SEO-indexed website — with quotes, chapter summaries, JSON-LD schema, and the connections between ideas. Free open-source foundation. Paid tiers in design — waitlist only.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-white/90 transition"
            >
              <Github className="h-4 w-4" />
              Clone the repo
            </Link>
            <Link
              href="#signup"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Join the waitlist
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: totalBooks.toString(), label: 'books' },
              { value: deepDiveBooks.length.toString(), label: 'deep-dives' },
              { value: `${totalQuotes}+`, label: 'quotes' },
              { value: `${totalChapters}+`, label: 'chapter summaries' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-5">
                <div className="text-2xl md:text-3xl font-bold text-white">{s.value}</div>
                <div className="text-[11px] tracking-wider uppercase text-white/40 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/40">
            Live on{' '}
            <Link href="/library" className="underline decoration-white/20 hover:decoration-emerald-400">
              frankx.ai/library
            </Link>{' '}
            · this is the canonical reference implementation
          </p>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-20 lg:py-28 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
            The Problem
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
            Your book notes are dying inside other people&apos;s apps.
          </h2>
          <div className="prose prose-invert prose-lg max-w-none text-white/70 space-y-5">
            <p>
              You highlight in Kindle. Sync to Readwise. Tag in Notion. Mind-map in Obsidian. And then — silence. The insights compound nowhere. You can&apos;t link to them. They don&apos;t rank. They don&apos;t bring you readers. They die when you cancel the subscription.
            </p>
            <p>
              Goodreads gets the traffic. BookTok gets the attention. You get the receipts in someone else&apos;s database.
            </p>
            <p className="text-white">
              Library OS is the opposite move. Every book you read becomes a deep-dive on{' '}
              <em>your own domain</em>, with{' '}
              <em>your own JSON-LD schema</em>, ranking for{' '}
              <em>your own keywords</em>. Permanent. Public. Yours.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 lg:py-28 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4 text-center">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">
            Three commands. One schema. Permanent assets.
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                cmd: '/library-add',
                title: 'Capture',
                desc: 'Add any book in 30 seconds. TL;DR, 5 insights, FAQ, cover. Idempotent — run it on a book that already exists, it just updates.',
              },
              {
                cmd: '/library-deepen',
                title: 'Extract',
                desc: 'Pulls quotes (with chapter + context) and chapter-by-chapter summaries. Anti-hallucination guardrails: paraphrases go in `context`, never in `text`.',
              },
              {
                cmd: '/library-research',
                title: 'Enrich',
                desc: 'Adds curated "Continue Reading" recommendations (with the connection stated) and "Go Deeper" video links. Never invents URLs.',
              },
            ].map((step) => (
              <div key={step.cmd} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <code className="inline-block rounded-md bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300 font-mono mb-4">
                  {step.cmd}
                </code>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 text-sm text-white/60">
            <p className="mb-2">
              <strong className="text-white/80">Cross-AI portable.</strong> The commands ship as plain-text prompts. They work in Claude Code, ChatGPT, Codex, Gemini CLI, Cursor — or pasted by hand into any chat interface.
            </p>
            <p>
              <strong className="text-white/80">No lock-in.</strong> The data is plain TypeScript (
              <code className="text-emerald-300/80">data/book-reviews.ts</code>) following a public schema. Export, migrate, fork — your library is yours.
            </p>
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section id="tiers" className="py-20 lg:py-28 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
              The tiers
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Free foundation. Paid leverage in design.
            </h2>
            <p className="text-base text-white/60 max-w-2xl mx-auto">
              The repo is MIT — clone it and ship today. Everything beyond the repo is in design and on the waitlist. No pricing is set, no drip sequence, no marketing automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {tiers.map((tier) => {
              const c = colorMap[tier.color];
              const Icon = tier.icon;
              return (
                <article
                  key={tier.id}
                  className={`relative rounded-2xl border p-6 flex flex-col ${
                    tier.featured
                      ? 'border-violet-400/40 bg-violet-500/[0.04] ring-1 ring-violet-400/30'
                      : 'border-white/[0.08] bg-white/[0.02]'
                  }`}
                >
                  {tier.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-500/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                      Most leverage
                    </span>
                  )}

                  <div className={`mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg ${c.chipBg} ${c.accent}`}>
                    <Icon className="h-4 w-4" />
                  </div>

                  <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                  <p className={`text-xs mt-0.5 mb-4 ${c.chipText}`}>{tier.tagline}</p>

                  <div className="mb-4">
                    <span className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${c.chipBg} ${c.accent}`}>
                      {tier.status}
                    </span>
                  </div>

                  <p className="text-sm text-white/55 leading-relaxed mb-5">{tier.description}</p>

                  <ul className="space-y-2 mb-6 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-white/70">
                        <Check className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${c.accent}`} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={tier.cta.href}
                    {...(tier.cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      tier.featured
                        ? 'bg-violet-500 text-white hover:bg-violet-400'
                        : tier.id === 'oss'
                        ? 'bg-white text-black hover:bg-white/90'
                        : 'border border-white/15 bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    {tier.cta.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* OSS FLYWHEEL */}
      <section className="py-20 lg:py-28 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
            Why open source
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
            The repo is the gift. Everything else is in design.
          </h2>
          <div className="prose prose-invert prose-lg max-w-none text-white/70 space-y-5">
            <p>
              The Library OS repo will always be MIT. You can clone it, fork it, white-label it, sell your own service on top of it. We&apos;d be honored.
            </p>
            <p>
              The paid tiers exist on paper — Starter Kit, Curator&apos;s OS, Done-For-You — because some people want the asset without the curation work. None of them ships today. The waitlist gets the first honest signal when one does.
            </p>
            <p className="text-white">
              Same pattern as Tailwind, Vercel, Plausible, ConvertKit. Give the foundation. Build the leverage in public. Ship when it&apos;s real.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4 text-center">
            Questions
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">
            Frequently asked
          </h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 open:bg-white/[0.04] transition"
              >
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                  <span className="text-base font-medium text-white">{f.q}</span>
                  <span className="text-white/40 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm text-white/60 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNUP */}
      <section id="signup" className="py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Join the waitlist
          </h2>
          <p className="text-base text-white/60 mb-8">
            Starter Kit, Curator&apos;s OS, and Done-For-You are in design. No pricing is set. Drop your email and you&apos;ll get one honest message when there&apos;s something real to share.
          </p>
          <EmailSignup
            listType="newsletter"
            placeholder="you@domain.com"
            buttonText="Join the waitlist"
          />
          <p className="mt-6 text-xs text-white/40">
            No drip sequence. No marketing automation. One message when we ship.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-white/40">
            <Link href="/library" className="hover:text-white transition">Browse the live library</Link>
            <span>·</span>
            <Link href="/library/approach" className="hover:text-white transition">Read the manifesto</Link>
            <span>·</span>
            <Link href={REPO_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">View on GitHub</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
