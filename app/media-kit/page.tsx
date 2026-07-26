import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Download,
  ExternalLink,
  Mail,
  Mic,
  Music,
  Newspaper,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

import JsonLd from '@/components/seo/JsonLd'
import { createMetadata, siteConfig } from '@/lib/seo'
import { socialLinks } from '@/lib/social-links'

export const metadata = createMetadata({
  title: 'Frank Riemer Media Kit | FrankX',
  description:
    'Media kit for Frank Riemer: AI Architect, FrankX founder, AI music creator, speaker topics, story angles, public proof, and press contact.',
  path: '/media-kit',
  keywords: [
    'Frank Riemer media kit',
    'FrankX media kit',
    'Frank Riemer speaker',
    'AI Architect speaker',
    'AI creator systems',
    'AI music creator',
    'attention and recovery systems',
  ],
  image: '/images/portraits/frank-presenting-oracle-2025.jpg',
})

const proofPoints = [
  {
    label: 'Professional background',
    value: 'AI Architect & Creator',
    note: 'Enterprise AI and cloud architecture patterns translated into independent creator systems.',
  },
  {
    label: 'Creator lab',
    value: '12,000+ AI songs',
    note: 'A large Suno-based music practice used to study taste, state, workflow, and creative output.',
  },
  {
    label: 'Public system',
    value: 'FrankX.ai',
    note: 'A working hub for AI architecture, creator systems, music experiments, and Signal Loop notes.',
  },
  {
    label: 'Home base',
    value: 'Amsterdam',
    note: 'Available for podcasts, panels, workshops, written interviews, and selected partner work.',
  },
]

const storyAngles = [
  {
    title: 'Human-led AI creator systems',
    description:
      'How creators can use agents, skills, prompts, and private workflows without losing taste, judgment, or authorship.',
  },
  {
    title: 'AI music as a serious creative lab',
    description:
      'What 12,000+ generated songs reveal about iteration, style, mood, memory, and the difference between generation and direction.',
  },
  {
    title: 'Peak state without performance theater',
    description:
      'Attention, recovery, environment, and review loops for builders who want clearer work without miracle claims or medical overreach.',
  },
  {
    title: 'From enterprise AI to one-person systems',
    description:
      'What public, non-confidential enterprise AI patterns teach about governance, evaluation, operating rhythm, and shipping with care.',
  },
]

const speakerTopics = [
  'The human operating system behind useful AI',
  'Agentic creator workflows that keep judgment in the loop',
  'What AI music teaches about taste and creative direction',
  'Peak state systems for creators, without biohacking theater',
  'The personal AI Center of Excellence',
]

const quickFacts = [
  ['Name', 'Frank Riemer'],
  ['Brand', 'FrankX'],
  ['Title', 'AI Architect'],
  ['Based in', 'Amsterdam, Netherlands'],
  ['Public hub', 'https://www.frankx.ai'],
  ['Contact', 'frank@frankx.ai'],
]

const boundaries = [
  'FrankX is independent and is not affiliated with, endorsed by, or sponsored by Oracle.',
  'Oracle references should use former/alumni language and avoid implying current endorsement.',
  'Peak-state and performance conversations are educational and personal-operating-system oriented, not medical advice.',
  'Partner or sponsor work should disclose commercial context and fit the FrankX usefulness standard.',
]

const siteUrl = siteConfig.url

const personSchema = {
  '@id': `${siteUrl}/#frank-riemer`,
  name: 'Frank Riemer',
  alternateName: 'FrankX',
  jobTitle: 'AI Architect',
  url: `${siteUrl}/frank-riemer`,
  image: `${siteUrl}/images/portraits/frank-presenting-oracle-2025.jpg`,
  alumniOf: {
    '@type': 'Organization',
    name: 'Oracle',
  },
  brand: {
    '@type': 'Brand',
    name: 'FrankX',
    url: siteUrl,
  },
  sameAs: [
    socialLinks.linkedin,
    socialLinks.github,
    socialLinks.suno,
    socialLinks.twitter,
  ],
  knowsAbout: [
    'AI architecture',
    'agentic workflows',
    'AI creator systems',
    'AI music creation',
    'attention and recovery systems',
    'personal AI operating systems',
  ],
}

const mediaKitSchema = {
  '@id': `${siteUrl}/media-kit#page`,
  name: 'Frank Riemer Media Kit',
  description:
    'Media kit for Frank Riemer, AI Architect and founder of FrankX, including biography, proof points, story angles, speaking topics, and press contact.',
  url: `${siteUrl}/media-kit`,
  about: {
    '@id': `${siteUrl}/#frank-riemer`,
  },
  publisher: {
    '@type': 'Brand',
    name: 'FrankX',
    url: siteUrl,
  },
}

export default function MediaKitPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="relative overflow-hidden pt-32">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/portraits/frank-presenting-oracle-2025.jpg"
            alt=""
            fill
            priority
            className="object-cover object-[36%_50%] opacity-[0.24]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-[#0a0a0b]/88 to-[#0a0a0b]/50" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0b] to-transparent" />
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-emerald-300/70">
              FrankX Media Kit
            </p>
            <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">
              Frank Riemer brings AI systems back to the human.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/62 sm:text-xl">
              AI Architect, FrankX founder, and AI music creator. Frank translates
              enterprise-scale AI patterns into practical creator systems, Signal Loop field
              notes, and peak-state routines that keep work grounded.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/38">
              Independent project. AI Architect & Creator. FrankX is not affiliated with,
              endorsed by, or sponsored by Oracle.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:frank@frankx.ai?subject=Media%20or%20speaking%20request"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
              >
                Book or interview Frank
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <Link
                href="/bio"
                className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] px-7 py-4 text-sm font-semibold text-white/80 backdrop-blur transition hover:bg-white/10"
              >
                Read full bio
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/portraits/frank-presenting-oracle-2025.jpg"
                alt="Frank Riemer presenting AI architecture"
                fill
                className="object-cover object-[38%_50%]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="mt-5 flex items-start gap-3">
              <Download className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
              <div>
                <p className="text-sm font-semibold text-white">Press portrait</p>
                <a
                  href="/images/portraits/frank-presenting-oracle-2025.jpg"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-sm text-white/48 transition hover:text-emerald-300"
                >
                  Open image
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-16">
        <div className="mx-auto grid max-w-6xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {proofPoints.map((point) => (
            <div key={point.label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/34">
                {point.label}
              </p>
              <p className="mt-3 text-xl font-semibold tracking-tight text-white">{point.value}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/50">{point.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-cyan-300/60">
              Story angles
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Useful angles for podcasts, panels, interviews, and partner media.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/55">
              The strongest FrankX stories show a mechanism: how a human captures signal, uses AI
              carefully, tests claims, and turns the result into work other people can inspect.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {storyAngles.map((angle) => (
              <div key={angle.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
                <Sparkles className="mb-5 h-5 w-5 text-cyan-300" />
                <h3 className="text-lg font-semibold text-white">{angle.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/52">{angle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-7">
            <Mic className="mb-5 h-6 w-6 text-emerald-300" />
            <h2 className="text-2xl font-bold tracking-tight">Speaking topics</h2>
            <div className="mt-6 space-y-3">
              {speakerTopics.map((topic) => (
                <div key={topic} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                  <p className="text-sm leading-relaxed text-white/62">{topic}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-7">
            <ShieldCheck className="mb-5 h-6 w-6 text-amber-300" />
            <h2 className="text-2xl font-bold tracking-tight">Editorial boundaries</h2>
            <div className="mt-6 space-y-3">
              {boundaries.map((boundary) => (
                <div key={boundary} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                  <p className="text-sm leading-relaxed text-white/62">{boundary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-emerald-300/60">
              Quick reference
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Facts, links, and public surfaces.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            <dl className="divide-y divide-white/10 border-y border-white/10">
              {quickFacts.map(([label, value]) => (
                <div key={label} className="grid gap-2 py-4 sm:grid-cols-[150px_1fr]">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
                    {label}
                  </dt>
                  <dd className="text-sm text-white/75">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="space-y-3">
              <Link
                href="/newsletter"
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-white/20 hover:bg-white/[0.055]"
              >
                <span className="flex items-center gap-3 text-sm font-medium text-white/70">
                  <Newspaper className="h-4 w-4 text-emerald-300" />
                  Signal Loop
                </span>
                <ArrowRight className="h-4 w-4 text-white/30 transition group-hover:translate-x-1 group-hover:text-emerald-300" />
              </Link>
              <Link
                href="/peak-performance"
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-white/20 hover:bg-white/[0.055]"
              >
                <span className="flex items-center gap-3 text-sm font-medium text-white/70">
                  <Sparkles className="h-4 w-4 text-rose-300" />
                  Peak State Systems
                </span>
                <ArrowRight className="h-4 w-4 text-white/30 transition group-hover:translate-x-1 group-hover:text-rose-300" />
              </Link>
              <a
                href={socialLinks.suno}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-white/20 hover:bg-white/[0.055]"
              >
                <span className="flex items-center gap-3 text-sm font-medium text-white/70">
                  <Music className="h-4 w-4 text-amber-300" />
                  Suno catalog
                </span>
                <ExternalLink className="h-4 w-4 text-white/30 transition group-hover:text-amber-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-emerald-300/60">
            Contact
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            For interviews, panels, podcasts, and partner media.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55">
            Send the audience, format, date, and what you want people to leave with. The best
            conversations are specific enough to be useful.
          </p>
          <a
            href="mailto:frank@frankx.ai?subject=Media%20or%20speaking%20request"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            <Mail className="h-4 w-4" />
            frank@frankx.ai
          </a>
        </div>
      </section>

      <JsonLd type="Person" data={personSchema} id="media-kit-person" />
      <JsonLd type="CollectionPage" data={mediaKitSchema} id="media-kit-page" />
    </main>
  )
}
