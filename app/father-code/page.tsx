import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Flame,
  Hammer,
  Handshake,
  Heart,
  Home,
  Network,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react'

const SITE_URL = 'https://frankx.ai'

export const metadata: Metadata = {
  title: 'The Father Code — Builder Ethics for the Age of AI | FrankX',
  description:
    'A principle system drawn from Witali Riemer: vision before resource, building as proof, home as infrastructure, and human agency in the age of AI.',
  alternates: {
    canonical: `${SITE_URL}/father-code`,
  },
  openGraph: {
    title: 'The Father Code — Builder Ethics for the Age of AI',
    description:
      'A public translation of Witali Riemer’s builder ethics for founders, families, creators, and fatherless people who need a code that carries.',
    url: `${SITE_URL}/father-code`,
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'The Father Code',
    description:
      'Builder ethics for people creating lives, families, companies, and futures in the age of AI.',
  },
}

const principles = [
  {
    number: '01',
    icon: Sparkles,
    title: 'Vision precedes resource',
    text:
      'See the house before the money, papers, welcome, certainty, or category exists. Resource follows committed vision more often than it precedes it.',
  },
  {
    number: '02',
    icon: Hammer,
    title: 'Building is the argument',
    text:
      'Do not exhaust yourself debating systems that refuse to recognize you. Build proof until reality has to answer.',
  },
  {
    number: '03',
    icon: Shield,
    title: 'No permission-seeking',
    text:
      'Validation may come late. The work cannot. Start before the institution, market, or audience knows how to name what you are making.',
  },
  {
    number: '04',
    icon: Home,
    title: 'Home is sacred infrastructure',
    text:
      'Shelter is not lifestyle. A good home is the base layer for safety, intimacy, discipline, memory, and future possibility.',
  },
  {
    number: '05',
    icon: Heart,
    title: 'Work is love made structural',
    text:
      'Labor is not punishment when it carries a family. Work can become protection, dignity, and care made visible.',
  },
  {
    number: '06',
    icon: CheckCircle2,
    title: 'Excellence must speak',
    text:
      'Quiet greatness is noble, but hidden excellence can become underpaid greatness. Let the work speak — then learn to make it heard.',
  },
  {
    number: '07',
    icon: Users,
    title: 'Leadership creates the frame',
    text:
      'A household, company, or creative world drifts without direction. Leadership is not domination. It is the willingness to carry the frame.',
  },
  {
    number: '08',
    icon: Handshake,
    title: 'Relationships are load-bearing',
    text:
      'No serious build survives without people: family, friends, neighbors, customers, helpers, lenders, teachers, witnesses.',
  },
  {
    number: '09',
    icon: Brain,
    title: 'AI amplifies agency; it does not replace it',
    text:
      'Tools can multiply output. They cannot give you ethics, standards, taste, backbone, duty, or a reason worth building for.',
  },
  {
    number: '10',
    icon: Flame,
    title: 'Build beyond your lifetime',
    text:
      'The real test is not whether the work flatters you now. The test is whether someone not yet born can stand inside what you made.',
  },
]

const audiences = [
  'Fatherless people who need a usable code, not a vague ache.',
  'Immigrant sons and daughters whose families had to rebuild without recognition.',
  'Founders and AI builders drowning in digital abstraction and forgetting physical reality.',
  'Men and women building homes, companies, art, systems, and family lines under pressure.',
]

const videoSeeds = [
  {
    title: 'Vision precedes resource',
    hook: 'My father saw the house before the money existed.',
  },
  {
    title: 'Building is the argument',
    hook: 'He did not debate Germany for rejecting his credentials. He built four houses on German soil.',
  },
  {
    title: 'Work is not punishment',
    hook: 'As a kid, I thought construction sites were stealing my freedom. Later I realized they were giving me backbone.',
  },
  {
    title: 'The danger of humility',
    hook: 'My father let the work speak for itself. Sometimes the world cannot hear quiet excellence.',
  },
  {
    title: 'No permission-seeking',
    hook: 'Some people wait until the world validates them. Builders start before the papers arrive.',
  },
  {
    title: 'AI still needs human standards',
    hook: 'AI can automate tasks. It cannot give you ethics, taste, grit, or responsibility.',
  },
]

function JsonLd() {
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Father Code — Builder Ethics for the Age of AI',
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
    mainEntityOfPage: `${SITE_URL}/father-code`,
    about: principles.map((principle) => principle.title).join(', '),
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Father Code', item: `${SITE_URL}/father-code` },
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

export default function FatherCodePage() {
  return (
    <main className="min-h-screen bg-[#080807] text-white">
      <JsonLd />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.2),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(234,179,8,0.1),transparent_28%),linear-gradient(180deg,#11100c_0%,#080807_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080807] to-transparent" />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-28 sm:pb-24 sm:pt-36 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-amber-200/80">
              <Network className="h-3.5 w-3.5" />
              Builder ethics for the age of AI
            </div>
            <h1 className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              The Father Code
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-8 text-zinc-300 sm:text-2xl sm:leading-9">
              A principle system drawn from Witali Riemer: father, immigrant, craftsman, and
              builder. Not nostalgia. Not masculinity theater. A code for building homes,
              companies, systems, and futures that can carry other people.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/witali"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-200 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-100"
              >
                Read Witali’s story
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#principles"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                Enter the code
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="rounded-[2rem] border border-amber-300/20 bg-gradient-to-br from-amber-300/12 to-white/[0.03] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-amber-300/70">
                The boundary
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Share the lesson. Protect the wound.
              </h2>
            </div>
            <div className="space-y-4 text-base leading-8 text-zinc-300">
              <p>
                The raw family video and transcript are source artifacts, not public fuel. The
                deathbed layer stays sacred. What becomes public is the distilled wisdom: the code
                he lived loudly enough for his family to inherit.
              </p>
              <p>
                This is how private grief becomes clean transmission: not exposure, not trauma
                bait, not a performance of pain — edited wisdom made useful for people who need a
                father-line they can practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="principles" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <SectionHeading
          eyebrow="The Witali Code"
          title="Ten principles that turn memory into a usable operating system."
          description="The point is not to imitate the exact medium of his work. The point is to inherit the standards beneath it."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {principles.map((principle) => {
            const Icon = principle.icon
            return (
              <article
                key={principle.number}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <Icon className="h-7 w-7 text-amber-200" />
                  <span className="font-display text-sm font-semibold text-white/20">
                    {principle.number}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-white">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{principle.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading
              eyebrow="Who needs this"
              title="Not everyone needs your exact biography. Many people need the code hidden inside it."
              description="The archetype is father. The access point is builder. The relevance is universal."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {audiences.map((audience) => (
                <div
                  key={audience}
                  className="rounded-2xl border border-white/10 bg-[#080807] p-5"
                >
                  <Users className="h-5 w-5 text-amber-200" />
                  <p className="mt-4 text-sm leading-6 text-zinc-300">{audience}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Short-form spine"
          title="The content should start from principles, not from the wound."
          description="Each piece can be 45–90 seconds: one hook, one memory, one principle, one application for builders now."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {videoSeeds.map((seed) => (
            <div
              key={seed.title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/70">
                {seed.title}
              </p>
              <p className="mt-4 text-base leading-7 text-zinc-300">“{seed.hook}”</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-zinc-300">
                <Heart className="h-3.5 w-3.5" />
                The transfer
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Make the wisdom portable.
              </h2>
            </div>
            <div className="space-y-4 text-base leading-8 text-zinc-300">
              <p>
                The public work is not to make Witali into a brand. The public work is to translate
                what he lived into a code that helps people build with dignity, standards, and
                responsibility.
              </p>
              <p>
                He built with brick, wood, concrete, and hands. You build with language, code, AI,
                music, systems, and worlds. Different material. Same line.
              </p>
              <Link
                href="/witali"
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-200 transition hover:text-amber-100"
              >
                Return to Witali’s memorial page
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
