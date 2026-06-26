import Link from 'next/link';
import Image from 'next/image';
import { socialLinks } from '@/lib/social-links';
import { createMetadata, siteConfig } from '@/lib/seo';
import {
  Linkedin,
  Github,
  Mail,
  Music,
  ArrowRight,
  Mic,
  Download,
  ExternalLink,
} from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';
import CopyableBio from './CopyableBio';

// ─── Bio source-of-truth ────────────────────────────────────────────────
// One file, three canonical lengths. When asked for a bio, send the page —
// or copy the length that fits.

const ONE_LINE =
  'Frank Riemer is an AI Architect at Oracle EMEA AI Center of Excellence and the creator of 12,000+ AI songs.';

const SHORT_BIO = `Frank Riemer is an AI Architect at Oracle's EMEA AI Center of Excellence, where he designs enterprise AI systems. By night, he is the creator of 12,000+ AI songs and the author of *The Golden Age of Intelligence*. He adapts enterprise-grade AI frameworks for individual creators at frankx.ai. Based in Amsterdam.`;

const LONG_BIO = `Frank Riemer is an AI Architect at Oracle's EMEA AI Center of Excellence, where he designs Center-of-Excellence frameworks and agentic systems for enterprise teams across Europe. The same six-pillar architecture he works with in enterprise settings — Strategy, Governance, Talent, Technology, Data, Ethics — he scales down for individuals at frankx.ai, the personal AI Center of Excellence.

By night, he is one of the most prolific AI music creators in the world — 12,000+ tracks produced through Suno and the surrounding stack — and the author of *The Golden Age of Intelligence*, a visionary manifesto on the convergence of human and artificial intelligence.

His work bridges three disciplines: enterprise AI architecture, generative creator workflows, and the contemplative traditions that, three thousand years before neuroscience, mapped the operation of the human brain. He writes, ships, and creates daily.

Originally from a Volga German family that rebuilt itself across three displaced generations, Frank lives in Amsterdam, on the water.`;

// ─── Speaker topics ─────────────────────────────────────────────────────

const SPEAKER_TOPICS = [
  {
    title: 'The Personal AI Center of Excellence',
    summary:
      'How the same six-pillar architecture I use in enterprise AI work — Strategy / Governance / Talent / Technology / Data / Ethics — translates to one human life.',
  },
  {
    title: 'Enterprise Agentic Systems in 2026',
    summary:
      'What is real, what is hype, and how to deploy multi-agent AI inside regulated organizations without losing brand equity.',
  },
  {
    title: 'The Golden Age of Intelligence',
    summary:
      'The convergence of human and artificial intelligence — what neuroscience confirms, what the ancients knew, and how to deploy both.',
  },
  {
    title: '12,000 Songs: AI Music as Creative System',
    summary:
      'Three years of daily AI music creation, what it taught me about the difference between generation and collaboration, and the state-induction music protocols I now run on myself.',
  },
  {
    title: 'Building the Agentic Creator OS',
    summary:
      'The open-source operating system for solo creators who want enterprise discipline without enterprise overhead.',
  },
  {
    title: 'AI for Families and Communities',
    summary:
      'How to introduce AI safely and creatively to children, parents, and communities — the framework I use with my own family.',
  },
];

// ─── Selected work ──────────────────────────────────────────────────────

const SELECTED_WORK = [
  {
    label: 'Book',
    title: 'The Golden Age of Intelligence',
    summary: 'Visionary manifesto on the convergence of human and AI intelligence.',
    href: '/books/golden-age-of-intelligence',
  },
  {
    label: 'System',
    title: 'ACOS — Agentic Creator OS',
    summary: 'The operating system for the personal AI Center of Excellence.',
    href: '/acos',
  },
  {
    label: 'Library',
    title: 'Library OS',
    summary: 'Open-source book intelligence system. Continuous deep-dive reading hub.',
    href: '/library',
  },
  {
    label: 'Music',
    title: '12,000+ AI tracks',
    summary: 'Three years of daily creation across genre, mood, and state-induction.',
    href: 'https://suno.com/@frankx',
    external: true,
  },
  {
    label: 'Workshops',
    title: 'Workshop OS',
    summary: 'Live workshops on AI architecture, creator systems, and applied wisdom.',
    href: '/workshops',
  },
  {
    label: 'Research',
    title: 'Research Hub',
    summary: 'Daily intelligence on AI, neuroscience, and frontier capability.',
    href: '/research',
  },
];

// ─── Press / Quick facts ────────────────────────────────────────────────

const QUICK_FACTS = [
  ['Role', 'AI Architect, Oracle EMEA AI Center of Excellence'],
  ['Based', 'Amsterdam, Netherlands'],
  ['Languages', 'English, German, Russian'],
  ['Songs released', '12,000+ via Suno'],
  ['Books published', 'The Golden Age of Intelligence (2026)'],
  ['Open source', 'github.com/frankxai'],
];

export const metadata = createMetadata({
  title: 'Bio · Frank Riemer | FrankX',
  description:
    'Press bio, speaker topics, and media kit for Frank Riemer — AI Architect at Oracle EMEA, creator of 12,000+ AI songs, and author of The Golden Age of Intelligence.',
  path: '/bio',
  keywords: [
    'Frank Riemer bio',
    'Frank Riemer media kit',
    'FrankX media kit',
    'AI Architect',
    'AI keynote speaker',
    'AI creator systems',
    'Suno AI creator',
  ],
  image: '/images/portraits/frank-presenting-oracle-2025.jpg',
});

export default function BioPage() {
  return (
    <>
      <JsonLd
        type="Person"
        data={{
          name: 'Frank Riemer',
          alternateName: 'FrankX',
          jobTitle: 'AI Architect',
          worksFor: {
            '@type': 'Organization',
            name: 'Oracle EMEA AI Center of Excellence',
          },
          description: ONE_LINE,
          url: `${siteConfig.url}/bio`,
          image: `${siteConfig.url}/images/portraits/frank-presenting-oracle-2025.jpg`,
          sameAs: [
            socialLinks.linkedin,
            socialLinks.github,
            socialLinks.suno,
            socialLinks.youtube,
            socialLinks.instagram,
          ],
          knowsAbout: [
            'Artificial Intelligence',
            'Enterprise AI Architecture',
            'Generative AI',
            'AI Music Production',
            'Agentic Systems',
            'Personal AI Center of Excellence',
          ],
          birthPlace: { '@type': 'Place', name: 'Volga German diaspora' },
          homeLocation: { '@type': 'Place', name: 'Amsterdam, Netherlands' },
        }}
      />

      <main id="main" className="relative min-h-screen bg-[#0a0a0b] text-white">
        {/* Ambient backdrop — single tech-spectrum glow, restrained */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div
            className="absolute -top-40 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)',
              filter: 'blur(128px)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.012]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        {/* ─── Hero ───────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-6">
              Bio · Press Kit · Media
            </p>
            <h1 className="font-bold leading-[1.05] tracking-tight text-white text-5xl sm:text-6xl lg:text-7xl mb-8">
              Frank Riemer
            </h1>
            <p className="text-xl sm:text-2xl text-white/70 leading-relaxed max-w-2xl mb-10">
              AI Architect by day. Creator by night. Author of{' '}
              <Link
                href="/books/golden-age-of-intelligence"
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                The Golden Age of Intelligence
              </Link>
              .
            </p>

            {/* Primary CTA + secondary links — one primary max */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:hello@frankx.ai"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all hover:bg-white/90"
              >
                <Mail className="h-4 w-4" /> Invite to speak
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href="https://github.com/frankxai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href="https://suno.com/@frankx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white"
              >
                <Music className="h-4 w-4" /> Suno
              </a>
            </div>
          </div>
        </section>

        {/* ─── Cinematic image break ──────────────────────────────── */}
        <section className="relative border-t border-white/5">
          <div className="mx-auto max-w-7xl">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src="/images/portraits/frank-presenting-oracle-2025.jpg"
                alt="Frank Riemer presenting AI architecture"
                fill
                priority
                className="object-cover object-[36%_50%]"
                sizes="(min-width: 1280px) 1280px, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent" />
            </div>
          </div>
        </section>

        {/* ─── The bio (three lengths, copy-able) ─────────────────── */}
        <section className="relative py-24 lg:py-32 border-t border-white/5">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
              Bio
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Three lengths. Copy what fits.
            </h2>
            <p className="text-base text-white/60 mb-12 max-w-xl">
              For podcast intros, conference programs, press releases, or anywhere a bio is asked of me.
            </p>

            <div className="space-y-10">
              <CopyableBio label="One-line" content={ONE_LINE} />
              <CopyableBio label="Short — ~60 words" content={SHORT_BIO} />
              <CopyableBio label="Long — ~200 words" content={LONG_BIO} markdown />
            </div>
          </div>
        </section>

        {/* ─── Speaker topics ─────────────────────────────────────── */}
        <section className="relative py-24 lg:py-32 border-t border-white/5">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
              Speaking
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              What I speak on
            </h2>
            <p className="text-base text-white/60 max-w-xl mb-12">
              Keynotes, fireside chats, executive workshops, and creator masterclasses. Tailored to the audience; never canned.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SPEAKER_TOPICS.map((topic) => (
                <div
                  key={topic.title}
                  className="rounded-xl bg-[#111113] border border-white/5 p-6 hover:border-white/10 hover:bg-[#1a1a1f] transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <Mic className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                    <h3 className="text-lg font-semibold text-white leading-snug">
                      {topic.title}
                    </h3>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed pl-7">
                    {topic.summary}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="mailto:hello@frankx.ai?subject=Speaking%20invitation"
                className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Invite me to speak <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ─── Selected work ──────────────────────────────────────── */}
        <section className="relative py-24 lg:py-32 border-t border-white/5">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
              Work
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Selected work
            </h2>
            <p className="text-base text-white/60 max-w-xl mb-12">
              The systems, books, and bodies of work that compose what I do. Each link goes deeper.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SELECTED_WORK.map((item) => {
                const inner = (
                  <div className="h-full rounded-xl bg-[#111113] border border-white/5 p-6 hover:border-white/10 hover:bg-[#1a1a1f] transition-all">
                    <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
                      {item.label}
                    </p>
                    <h3 className="text-lg font-semibold text-white leading-snug mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/55 leading-relaxed">
                      {item.summary}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-white/40 group-hover:text-white/60 transition-colors">
                      Open
                      {item.external ? (
                        <ExternalLink className="h-3 w-3" />
                      ) : (
                        <ArrowRight className="h-3 w-3" />
                      )}
                    </div>
                  </div>
                );
                return item.external ? (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    {inner}
                  </a>
                ) : (
                  <Link key={item.title} href={item.href} className="group block">
                    {inner}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Quick facts ────────────────────────────────────────── */}
        <section className="relative py-24 lg:py-32 border-t border-white/5">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
              Facts
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-12">
              Quick reference
            </h2>

            <dl className="divide-y divide-white/5 border-y border-white/5">
              {QUICK_FACTS.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-5"
                >
                  <dt className="text-[11px] tracking-[0.25em] uppercase text-white/40 font-medium pt-0.5">
                    {k}
                  </dt>
                  <dd className="sm:col-span-2 text-base text-white/85">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ─── Press image ────────────────────────────────────────── */}
        <section className="relative py-24 lg:py-32 border-t border-white/5">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
              Imagery
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              For press use
            </h2>
            <p className="text-base text-white/60 max-w-xl mb-10">
              The public speaking portrait above is available for editorial use with attribution. For headshots, commissioned portraiture, or event-specific assets, get in touch.
            </p>

            <div className="rounded-xl bg-[#111113] border border-white/5 p-6">
              <div className="flex items-start gap-3">
                <Download className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <p className="text-sm text-white/85 mb-1">
                    <strong className="text-white">Speaking portrait:</strong>{' '}
                    <a
                      href="/images/portraits/frank-presenting-oracle-2025.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      frank-presenting-oracle-2025.jpg
                    </a>{' '}
                    — editorial web use
                  </p>
                  <p className="text-xs text-white/45">
                    Credit: <em>Frank Riemer / FrankX.AI</em>. Editorial use only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── The story (short, links to /about) ─────────────────── */}
        <section className="relative py-24 lg:py-32 border-t border-white/5">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
              Story
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-8">
              The longer version
            </h2>
            <div className="space-y-5 text-lg leading-[1.7] text-white/65 mb-10">
              <p>
                I come from a Volga German family — three generations displaced, each one rebuilding from nothing. My father built houses; my brother builds solar businesses. My medium is different — AI systems and music — but the instinct is the same.
              </p>
              <p>
                I spend my days at Oracle, designing AI Center-of-Excellence frameworks for large companies in Europe. I spend my evenings at frankx.ai, where the same six-pillar architecture is freely available to any individual who wants to operate at that level.
              </p>
              <p>
                The bridge is the work. The full version of how I got here lives in <Link href="/about" className="text-emerald-400 hover:text-emerald-300 transition-colors">/about</Link> — including the family story, the music, the books that shaped the books I now write.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Read the full story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ─── Contact ────────────────────────────────────────────── */}
        <section className="relative py-24 lg:py-32 border-t border-white/5">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
              Contact
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
              Reach me directly
            </h2>
            <p className="text-base text-white/60 max-w-xl mx-auto mb-10">
              For speaking, advisory, press, partnerships, or anything else that deserves a real reply.
            </p>
            <a
              href="mailto:hello@frankx.ai"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all hover:bg-white/90"
            >
              <Mail className="h-4 w-4" /> hello@frankx.ai
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
