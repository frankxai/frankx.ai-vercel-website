import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Hammer,
  Heart,
  Home,
  MapPin,
  Shield,
  Sparkles
} from 'lucide-react'

const SITE_URL = 'https://frankx.ai'

export const metadata: Metadata = {
  title: 'Witali Riemer — The Silent Builder | FrankX',
  description:
    'A memorial page for Witali Riemer: Volga German, father, builder, and the source of the builder ethics behind FrankX.',
  alternates: {
    canonical: `${SITE_URL}/witali`,
  },
  openGraph: {
    title: 'Witali Riemer — The Silent Builder',
    description:
      'The story of a father who arrived with little the system recognized and built a family foundation anyway.',
    url: `${SITE_URL}/witali`,
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'Witali Riemer — The Silent Builder',
    description:
      'A memorial page for the builder ethics, family infrastructure, and father-code Witali passed down.',
  },
}

const facts = [
  {
    value: '21',
    label: 'years old when he returned to Germany with a young family',
  },
  {
    value: '4',
    label: 'two-story houses built by hand with the family',
  },
  {
    value: '200m²',
    label: 'approximate size of each house he brought into reality',
  },
  {
    value: '5–15',
    label: 'the childhood years I spent beside him on construction sites',
  },
]

const timeline = [
  {
    year: 'Kazakhstan',
    title: 'Born as a Volga German, Russian-speaking',
    text:
      'He came from a line that understood exile, scarcity, family duty, and the difference between a homeland in theory and a homeland that actually receives you.',
  },
  {
    year: 'Age 21',
    title: 'Returned to Germany with a family to feed',
    text:
      'His credentials were not recognized. The money he carried had little force. There was no easy restart, no warm system waiting to validate him.',
  },
  {
    year: 'Seesen',
    title: 'He built anyway',
    text:
      'Kitchens. Renovations. Houses. Foundations. He did not wait until life became fair. He used his hands, his standards, and his refusal to drift.',
  },
  {
    year: 'Now',
    title: 'The foundation still carries',
    text:
      'The houses still stand. The rental income still flows. The family still lives inside decisions he made before the next generation could understand them.',
  },
]

const inheritances = [
  {
    icon: Hammer,
    title: 'Building is the argument',
    text:
      'He did not debate a system that refused to recognize him. He built proof on its soil.',
  },
  {
    icon: Sparkles,
    title: 'Vision precedes resource',
    text:
      'He saw the red klinker house before the money, certainty, or easy permission existed.',
  },
  {
    icon: Home,
    title: 'Home is sacred infrastructure',
    text:
      'A home is not decoration. It is the base layer for safety, family, memory, and possibility.',
  },
  {
    icon: Shield,
    title: 'No permission-seeking',
    text:
      'Validation can arrive late. Work starts now. Reality respects what is repeatedly made real.',
  },
]

function JsonLd() {
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Witali Riemer — The Silent Builder',
    description: metadata.description,
    author: {
      '@type': 'Person',
      name: 'Frank Riemer',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'FrankX',
      url: SITE_URL,
    },
    datePublished: '2026-07-09',
    dateModified: '2026-07-09',
    mainEntityOfPage: `${SITE_URL}/witali`,
    about: ['Witali Riemer', 'family legacy', 'builder ethics', 'Volga Germans'],
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Witali', item: `${SITE_URL}/witali` },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
    />
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-amber-300/70">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-zinc-400">{description}</p>
    </div>
  )
}

export default function WitaliPage() {
  return (
    <main className="min-h-screen bg-[#080807] text-white">
      <JsonLd />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.18),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(120,113,108,0.12),transparent_30%),linear-gradient(180deg,#11100c_0%,#080807_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080807] to-transparent" />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-28 sm:pb-24 sm:pt-36 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-amber-200/80">
              <Heart className="h-3.5 w-3.5" />
              Eight years today
            </div>
            <h1 className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Witali Riemer,
              <span className="block text-amber-200">the silent builder.</span>
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-8 text-zinc-300 sm:text-2xl sm:leading-9">
              My father was a Volga German, born in Kazakhstan, Russian-speaking, and returned to
              Germany at 21 with a young family and almost nothing the system recognized. He was
              not handed status, capital, or a clean path. He built anyway.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/father-code"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-200 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-100"
              >
                Read the father code
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#line"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                See the line
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div
              key={fact.value}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20"
            >
              <p className="font-display text-3xl font-semibold text-amber-200">{fact.value}</p>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <SectionHeading
          eyebrow="The story"
          title="He arrived with nothing official enough to matter — then made himself undeniable."
          description="Germany was supposed to be homeland. In practice it was a reset: credentials unrecognized, money weakened, goodwill absent. His answer was not resentment. His answer was work."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-amber-300/15 bg-amber-300/[0.06] p-7">
            <MapPin className="h-8 w-8 text-amber-200" />
            <h3 className="mt-5 font-display text-2xl font-semibold text-white">
              The red klinker house
            </h3>
            <p className="mt-4 text-base leading-7 text-zinc-300">
              He saw a ruin and read it as future. Other people saw risk, cost, mud,
              structural problems, rain, debt, and years of labor. He saw gardens, family,
              shelter, fruit trees, children growing up with room to run, and a place that
              could become more valuable because someone was willing to suffer for the vision.
            </p>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              I grew up on those sites from around age five to fifteen. At the time, it often
              felt like the opposite of freedom. Later I understood: it was my first school in
              reality.
            </p>
          </div>

          <div className="space-y-4">
            {timeline.map((item) => (
              <div
                key={`${item.year}-${item.title}`}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/70">
                  {item.year}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <SectionHeading
            eyebrow="What remains"
            title="His love was structural."
            description="Not every father teaches through speeches. Some fathers teach by carrying weight, making decisions, building shelter, and refusing to let their family drift."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {inheritances.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-[#080807] p-6"
                >
                  <Icon className="h-7 w-7 text-amber-200" />
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{item.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="line" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="The line"
              title="Brick, wood, concrete, hands. Language, code, AI, systems. Same line."
              description="The medium changed. The mandate did not: create something that can carry life after you are gone."
            />
            <div className="mt-8 space-y-5 text-base leading-8 text-zinc-300">
              <p>
                My father built houses. My brother continues the physical real-estate and
                construction line. I translate the same builder code into digital architecture:
                AI systems, essays, music, brands, and worlds.
              </p>
              <p>
                This page is not the raw wound. The most intimate family archive belongs in a
                protected place. What belongs here is the portable wisdom: work before applause,
                foundation before fantasy, stewardship before performance.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-amber-300/20 bg-gradient-to-br from-amber-300/12 to-white/[0.03] p-8">
            <BookOpen className="h-8 w-8 text-amber-200" />
            <blockquote className="mt-6 font-display text-3xl font-semibold leading-tight text-white">
              “I do not carry him as pressure. I carry him as a line.”
            </blockquote>
            <p className="mt-6 text-sm leading-6 text-zinc-400">
              The task is not to perform achievement loudly enough to quiet grief. The task is to
              make the wisdom portable without sacrificing the sacredness of the memory.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-zinc-300">
                <CalendarDays className="h-3.5 w-3.5" />
                July 9
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Eight years. The foundation still holds.
              </h2>
            </div>
            <div className="space-y-4 text-base leading-8 text-zinc-300">
              <p>
                Papa, you are no longer here the way you once were. But what you built still
                stands: in the houses, in the family, in the standards, in the way I now build.
              </p>
              <p>
                You taught me that vision comes before resource, that work can be dignity, and
                that love sometimes looks like a foundation strong enough for the next generation
                to stand on.
              </p>
              <Link
                href="/father-code"
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-200 transition hover:text-amber-100"
              >
                Continue into the Father Code
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
